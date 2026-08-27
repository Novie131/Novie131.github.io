/**
 * Build 後處理 — 讓 GitHub Pages 這種純靜態主機也能好好服務 SPA。
 *
 * 1. 為每個路由產生實體檔案 dist/<route>/index.html，並注入該頁的
 *    <title> / description / og:* / canonical。
 *    這一步的重點是「HTTP 200」：只靠 404.html 的話 /about 雖然畫面正確，
 *    回應碼仍是 404，搜尋引擎不會索引，社群預覽也可能直接放棄抓取。
 *
 * 2. 仍然保留 dist/404.html（index.html 的複本）當保險：
 *    未來新增路由卻忘了加進下面的 ROUTES 時，頁面至少還能正常顯示。
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import translations from '../src/i18n/translations.js'

const SITE = 'https://novie131.github.io'
const dist = join(process.cwd(), 'dist')

/* 與 src/App.jsx 的 <Route> 和 src/hooks/usePageMeta.js 保持一致 */
const ROUTES = [
  { path: '/',          key: 'meta.home' },
  { path: '/about',     key: 'meta.about' },
  { path: '/portfolio', key: 'meta.portfolio' },
  { path: '/resume',    key: 'meta.resume' },
  { path: '/contact',   key: 'meta.contact' },
]

const t = key => translations.zh[key] ?? key

/** 換掉某個 meta/link 標籤的屬性值，找不到就原樣返回 */
function setAttr(html, selectorAttr, selectorValue, targetAttr, newValue) {
  const tag = new RegExp(
    `(<(?:meta|link)[^>]*${selectorAttr}="${selectorValue}"[^>]*>)`,
    'i'
  )
  return html.replace(tag, m =>
    m.replace(new RegExp(`${targetAttr}="[^"]*"`, 'i'), `${targetAttr}="${newValue}"`)
  )
}

const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const indexHtml = await readFile(join(dist, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const title = escape(t(`${route.key}.title`))
  const desc = escape(t(`${route.key}.desc`))
  const url = `${SITE}${route.path}`

  let html = indexHtml
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
  html = setAttr(html, 'name', 'description', 'content', desc)
  html = setAttr(html, 'property', 'og:title', 'content', title)
  html = setAttr(html, 'property', 'og:description', 'content', desc)
  html = setAttr(html, 'property', 'og:url', 'content', url)
  html = setAttr(html, 'name', 'twitter:title', 'content', title)
  html = setAttr(html, 'name', 'twitter:description', 'content', desc)
  html = setAttr(html, 'rel', 'canonical', 'href', url)

  if (route.path === '/') {
    await writeFile(join(dist, 'index.html'), html, 'utf8')
  } else {
    const dir = join(dist, route.path.slice(1))
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), html, 'utf8')
  }
  console.log(`postbuild: dist${route.path === '/' ? '' : route.path}/index.html  ${title}`)
}

await copyFile(join(dist, 'index.html'), join(dist, '404.html'))
console.log('postbuild: dist/404.html ← dist/index.html（未知路徑的保險）')
