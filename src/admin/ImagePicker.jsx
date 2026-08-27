import { useCallback, useEffect, useState } from 'react'

const kb = n => `${Math.round(n / 1024)} KB`

/**
 * 圖片上傳／挑選。上傳時由 dev server 端的 sharp 轉成 WebP、
 * 依 EXIF 轉正並限制最大寬度 —— 手機直接拍的照片丟進來就好。
 */
export default function ImagePicker({ value, onChange, maxWidth = 1600 }) {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

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
        body: JSON.stringify({ name: file.name, dataUrl, maxWidth }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error)
      setMsg(`已壓縮：${kb(d.before)} → ${kb(d.after)}（-${Math.round((1 - d.after / d.before) * 100)}%）`)
      onChange(d.url)
      refresh()
    } catch (err) {
      setMsg(`上傳失敗：${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="ad-imgpicker">
      <div
        className="ad-drop"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); upload(e.dataTransfer.files?.[0]) }}
      >
        {value
          ? <img src={value} alt="" className="ad-preview" />
          : <span className="ad-drop-hint">把圖片拖進來，或點下方選檔</span>}
      </div>

      <div className="ad-imgbar">
        <input type="file" accept="image/*" disabled={busy}
               onChange={e => upload(e.target.files?.[0])} />
        {value && <button type="button" className="ad-danger" onClick={() => onChange(null)}>移除</button>}
      </div>

      {busy && <p className="ad-msg">處理中…</p>}
      {msg && <p className="ad-msg">{msg}</p>}

      {files.length > 0 && (
        <details className="ad-gallery">
          <summary>已上傳的圖片（{files.length}）</summary>
          <div className="ad-thumbs">
            {files.map(f => (
              <button
                type="button"
                key={f.name}
                className={`ad-thumb${value === f.url ? ' is-active' : ''}`}
                onClick={() => onChange(f.url)}
                title={`${f.name} · ${kb(f.size)}`}
              >
                <img src={f.url} alt={f.name} loading="lazy" />
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
