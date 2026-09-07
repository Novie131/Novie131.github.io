import { useCallback, useEffect, useState } from 'react'
import ProjectsEditor from './editors/ProjectsEditor'
import ResumeEditor from './editors/ResumeEditor'
import AboutEditor from './editors/AboutEditor'
import ContactEditor from './editors/ContactEditor'
import HomeEditor from './editors/HomeEditor'
import MediaManager from './MediaManager'
import { clone, changed } from './util'
import projectsSeed from '../content/projects.json'
import resumeSeed from '../content/resume.json'
import aboutSeed from '../content/about.json'
import contactSeed from '../content/contact.json'
import homeSeed from '../content/home.json'
import './admin.css'

const SEEDS = {
  projects: projectsSeed,
  resume: resumeSeed,
  about: aboutSeed,
  contact: contactSeed,
  home: homeSeed,
}

const EDITORS = {
  projects: ProjectsEditor,
  resume: ResumeEditor,
  about: AboutEditor,
  contact: ContactEditor,
  home: HomeEditor,
}

const TABS = [
  { id: 'projects', label: '作品集' },
  { id: 'resume', label: '履歷' },
  { id: 'about', label: '關於' },
  { id: 'contact', label: '聯絡' },
  { id: 'home', label: '首頁' },
  { id: 'media', label: '圖片' },   // 不是內容檔，只管 public/img
]

/* ── JSON 直編：表單沒涵蓋的欄位（例如首頁的 pokemon）留一條後路 ── */
/* 每次切進來都重新掛載，textarea 的初始值才會是當下的資料 ——
   編輯中的文字是 source of truth，不需要（也不該）用 effect 同步回來。 */
function JsonEditor({ data, setData }) {
  const [text, setText] = useState(() => JSON.stringify(data, null, 2))
  const [error, setError] = useState(null)

  function onEdit(v) {
    setText(v)
    try {
      setData(JSON.parse(v))
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="ad-json">
      <p className="ad-note">
        表單涵蓋不到的欄位可以在這裡改。格式錯誤會即時提示，錯的時候存不進去。
      </p>
      <textarea
        className="ad-input ad-code"
        value={text}
        onChange={e => onEdit(e.target.value)}
        spellCheck={false}
      />
      {error && <p className="ad-error">JSON 格式錯誤：{error}</p>}
    </div>
  )
}

/* ── 主體 ─────────────────────────────────────── */
export default function AdminApp() {
  const [tab, setTab] = useState('projects')
  const [mode, setMode] = useState('form')
  const [seq, setSeq] = useState(0)        // 讓 JsonEditor 在切換時重新掛載
  const [drafts, setDrafts] = useState(() => clone(SEEDS))
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  const isContent = tab in SEEDS
  const data = isContent ? drafts[tab] : null
  const dirty = isContent && changed(data, SEEDS[tab])
  const setData = useCallback(next => setDrafts(d => ({ ...d, [tab]: next })), [tab])
  const Editor = EDITORS[tab]

  function switchTab(id) {
    setTab(id)
    setMode('form')
    setStatus(null)
  }

  function switchMode(m) {
    setMode(m)
    setSeq(s => s + 1)
  }

  /* 有未存檔的修改就攔截關閉／重整 */
  useEffect(() => {
    const anyDirty = Object.keys(SEEDS).some(k => changed(drafts[k], SEEDS[k]))
    if (!anyDirty) return undefined
    const onLeave = e => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  }, [drafts])

  async function save() {
    setSaving(true)
    setStatus(null)
    try {
      const r = await fetch('/__admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: tab, data }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error)
      setStatus(`已寫入 ${d.file} — 記得 ./deploy.sh 才會上線`)
    } catch (err) {
      setStatus(`存檔失敗：${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin">
      <header className="ad-header">
        <h1>~/admin $ edit content</h1>
        <p className="ad-sub">
          本機專用編輯器 · 直接寫入 <code>src/content/*.json</code> · 不會被打包進線上網站
        </p>
      </header>

      <nav className="ad-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            className={`ad-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => switchTab(t.id)}
          >
            {t.label}
            {t.id in SEEDS && changed(drafts[t.id], SEEDS[t.id]) && <span className="ad-dot" />}
          </button>
        ))}
        <div className="ad-save">
          {status && <span className="ad-status">{status}</span>}
          {isContent && (
            <button type="button" className="ad-primary" onClick={save} disabled={saving || !dirty}>
              {saving ? '儲存中…' : dirty ? '儲存這一頁' : '沒有變更'}
            </button>
          )}
        </div>
      </nav>

      {isContent && (
        <div className="ad-modes">
          <button
            type="button"
            className={`ad-mode${mode === 'form' ? ' is-active' : ''}`}
            onClick={() => switchMode('form')}
          >
            表單
          </button>
          <button
            type="button"
            className={`ad-mode${mode === 'json' ? ' is-active' : ''}`}
            onClick={() => switchMode('json')}
          >
            JSON
          </button>
        </div>
      )}

      <main className="ad-body">
        {tab === 'media' && <MediaManager />}
        {isContent && mode === 'form' && <Editor data={data} setData={setData} />}
        {isContent && mode === 'json' && (
          <JsonEditor key={`${tab}-${seq}`} data={data} setData={setData} />
        )}
      </main>
    </div>
  )
}
