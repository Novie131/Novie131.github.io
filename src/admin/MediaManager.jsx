import { useCallback, useEffect, useState } from 'react'

const kb = n => `${Math.round(n / 1024)} KB`

/**
 * 獨立的圖片管理分頁 —— 上傳、複製網址、刪除。
 * 跟任何欄位解耦：像首頁頭像那種只能在 JSON 編輯器裡填路徑的地方，
 * 在這裡上傳完複製網址貼過去就好，不必去借用其他欄位的上傳器。
 */
export default function MediaManager() {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const [copied, setCopied] = useState(null)

  const refresh = useCallback(async () => {
    const r = await fetch('/__admin/images')
    const d = await r.json()
    setFiles(d.files ?? [])
  }, [])

  useEffect(() => { refresh() }, [refresh])

  async function upload(file) {
    if (!file) return
    setBusy(true)
    setMsg(null)
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.onerror = reject
        fr.readAsDataURL(file)
      })
      const r = await fetch('/__admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, dataUrl, maxWidth: 1600 }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error)
      setMsg(`${d.url} — 已壓縮 ${kb(d.before)} → ${kb(d.after)}（-${Math.round((1 - d.after / d.before) * 100)}%）`)
      refresh()
    } catch (err) {
      setMsg(`上傳失敗：${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function remove(name) {
    if (!window.confirm(`確定刪除 ${name}？頁面上若還在引用它，圖片會變成破圖。`)) return
    const r = await fetch('/__admin/delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: name }),
    })
    const d = await r.json()
    setMsg(r.ok ? `已刪除 ${name}` : `刪除失敗：${d.error}`)
    refresh()
  }

  async function copy(url) {
    await navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="ad-media">
      <p className="ad-note">
        上傳的圖片會自動依 EXIF 轉正、限制最大寬度 1600px 並轉成 WebP，存進 <code>public/img/</code>。
        複製網址後可貼進任何需要圖片路徑的欄位（例如首頁分頁的 <code>avatar</code>）。
      </p>

      <div
        className="ad-drop ad-drop-lg"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); upload(e.dataTransfer.files?.[0]) }}
      >
        <span className="ad-drop-hint">把圖片拖到這裡</span>
      </div>

      <div className="ad-imgbar">
        <input type="file" accept="image/*" disabled={busy}
               onChange={e => upload(e.target.files?.[0])} />
        {busy && <span className="ad-msg">處理中…</span>}
      </div>

      {msg && <p className="ad-msg">{msg}</p>}

      <div className="ad-media-list">
        {files.map(f => (
          <div key={f.name} className="ad-media-item">
            <img src={f.url} alt={f.name} loading="lazy" />
            <div className="ad-media-meta">
              <code>{f.url}</code>
              <span className="ad-msg">{kb(f.size)}</span>
            </div>
            <div className="ad-row-actions">
              <button type="button" onClick={() => copy(f.url)}>
                {copied === f.url ? '已複製' : '複製網址'}
              </button>
              <button type="button" className="ad-danger" onClick={() => remove(f.name)}>刪除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
