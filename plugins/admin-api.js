/**
 * Dev-only 內容編輯 API。
 *
 * 只在 `npm run dev` 時掛載（apply: 'serve'），不會進 production bundle，
 * 因此線上網站的攻擊面為零 —— 沒有需要保護的端點，也沒有要維護的登入。
 *
 * 端點：
 *   POST /__admin/save    { file, data }              → 寫入 src/content/<file>.json
 *   POST /__admin/upload  { name, dataUrl, maxWidth } → sharp 壓成 WebP 存到 public/img/
 *   GET  /__admin/images                              → 列出 public/img 內容
 *   POST /__admin/delete-image { file }               → 刪除一張圖
 */
import { readdir, writeFile, unlink, stat, mkdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

/* sharp 是原生模組，只有上傳圖片時才需要。
   vite.config.js 會載入這個檔案，所以放在最上層 import 的話，
   CI 上的 production build 也得先把它裝起來、載進來 —— 打包根本用不到它。 */
let sharpPromise
const getSharp = () => (sharpPromise ??= import('sharp').then(m => m.default))

const CONTENT_FILES = ['projects', 'resume', 'about', 'contact', 'home']
const IMG_DIR = 'public/img'
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024

const json = (res, code, body) => {
  res.statusCode = code
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

const readBody = req => new Promise((resolve, reject) => {
  let size = 0
  const chunks = []
  req.on('data', c => {
    size += c.length
    if (size > MAX_UPLOAD_BYTES) {
      reject(new Error(`payload 超過 ${MAX_UPLOAD_BYTES / 1024 / 1024} MB`))
      req.destroy()
      return
    }
    chunks.push(c)
  })
  req.on('end', () => {
    try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) }
    catch { reject(new Error('body 不是合法的 JSON')) }
  })
  req.on('error', reject)
})

/**
 * 只接受同源請求。
 *
 * dev server 開著的時候，你在同一個瀏覽器逛到的任何網站都能對 localhost 送請求。
 * 用 Content-Type: text/plain 可以避開 CORS preflight（算「簡單請求」），
 * 瀏覽器會照送，middleware 若不檢查就會真的把檔案寫下去。
 *
 * 跨來源的請求瀏覽器一定會帶 Origin，所以只要 Origin 存在就驗它；
 * 沒有 Origin 的是非瀏覽器發出的（curl、測試腳本），那不在這個威脅模型裡。
 */
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', '::1'])

const sameOrigin = req => {
  const { origin } = req.headers
  if (!origin) return true
  try {
    return LOCAL_HOSTS.has(new URL(origin).hostname)
  } catch {
    return false
  }
}

/* 只允許安全的檔名，擋掉 ../ 之類的路徑穿越 */
const safeSlug = name =>
  basename(String(name), extname(String(name)))
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'image'

export default function adminApi() {
  return {
    name: 'admin-api',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/__admin/')) return next()

        if (!sameOrigin(req)) {
          server.config.logger.warn(
            `[admin-api] 已拒絕來自 ${req.headers.origin} 的跨來源請求：${req.url}`
          )
          return json(res, 403, { error: '只接受同源請求' })
        }

        try {
          const [path] = req.url.split('?')

          if (path === '/__admin/images' && req.method === 'GET') {
            const dir = join(root, IMG_DIR)
            await mkdir(dir, { recursive: true })
            const names = await readdir(dir)
            const files = await Promise.all(
              names.filter(n => !n.startsWith('.')).map(async n => {
                const s = await stat(join(dir, n))
                return { name: n, url: `/img/${n}`, size: s.size, mtime: s.mtimeMs }
              })
            )
            files.sort((a, b) => b.mtime - a.mtime)
            return json(res, 200, { files })
          }

          if (path === '/__admin/save' && req.method === 'POST') {
            const { file, data } = await readBody(req)
            if (!CONTENT_FILES.includes(file)) {
              return json(res, 400, { error: `未知的內容檔：${file}` })
            }
            if (data === null || typeof data !== 'object') {
              return json(res, 400, { error: 'data 必須是物件' })
            }
            const target = join(root, 'src/content', `${file}.json`)
            await writeFile(target, JSON.stringify(data, null, 2) + '\n', 'utf8')
            return json(res, 200, { ok: true, file: `src/content/${file}.json` })
          }

          if (path === '/__admin/upload' && req.method === 'POST') {
            const { name, dataUrl, maxWidth = 1600 } = await readBody(req)
            const m = /^data:image\/([a-zA-Z+]+);base64,(.+)$/s.exec(dataUrl ?? '')
            if (!m) return json(res, 400, { error: '需要 base64 的 image data URL' })

            const input = Buffer.from(m[2], 'base64')
            const dir = join(root, IMG_DIR)
            await mkdir(dir, { recursive: true })

            const sharp = await getSharp()
            const meta = await sharp(input).metadata()
            const width = Math.min(meta.width ?? maxWidth, maxWidth)
            const out = await sharp(input)
              .rotate()                       // 依 EXIF 轉正，手機拍的照片才不會躺著
              .resize({ width, withoutEnlargement: true })
              .webp({ quality: 82 })
              .toBuffer()

            const filename = `${safeSlug(name)}-${Date.now().toString(36)}.webp`
            await writeFile(join(dir, filename), out)
            return json(res, 200, {
              ok: true,
              url: `/img/${filename}`,
              width,
              before: input.length,
              after: out.length,
            })
          }

          if (path === '/__admin/delete-image' && req.method === 'POST') {
            const { file } = await readBody(req)
            const name = basename(String(file))
            if (!name || name.startsWith('.')) return json(res, 400, { error: '檔名不合法' })
            await unlink(join(root, IMG_DIR, name))
            return json(res, 200, { ok: true })
          }

          return json(res, 404, { error: 'unknown admin endpoint' })
        } catch (err) {
          return json(res, 500, { error: err.message })
        }
      })
    },
  }
}
