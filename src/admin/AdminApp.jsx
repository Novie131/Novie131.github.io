import { useCallback, useEffect, useMemo, useState } from 'react'
import { Field, Text, Area, Lines, Select, Bilingual, Row } from './fields'
import ImagePicker from './ImagePicker'
import MediaManager from './MediaManager'
import projectsSeed from '../content/projects.json'
import resumeSeed from '../content/resume.json'
import aboutSeed from '../content/about.json'
import contactSeed from '../content/contact.json'
import homeSeed from '../content/home.json'
import './admin.css'

const COLORS = ['cyan', 'purple', 'green', 'amber', 'pink']
const SEEDS = {
  projects: projectsSeed,
  resume: resumeSeed,
  about: aboutSeed,
  contact: contactSeed,
  home: homeSeed,
}
const TABS = [
  { id: 'projects', label: '作品集' },
  { id: 'resume', label: '履歷' },
  { id: 'about', label: '關於' },
  { id: 'contact', label: '聯絡' },
  { id: 'home', label: '首頁' },
  { id: 'media', label: '圖片' },   // 不是內容檔，只管 public/img
]

const clone = v => JSON.parse(JSON.stringify(v))
const uid = prefix => `${prefix}-${Date.now().toString(36)}`
const changed = (a, b) => JSON.stringify(a) !== JSON.stringify(b)

/* ── 清單通用操作 ─────────────────────────────── */
function useList(list, setList) {
  return useMemo(() => ({
    update: (i, patch) => setList(list.map((it, n) => (n === i ? { ...it, ...patch } : it))),
    remove: i => setList(list.filter((_, n) => n !== i)),
    move: (i, dir) => {
      const j = i + dir
      if (j < 0 || j >= list.length) return
      const next = [...list]
      const tmp = next[i]
      next[i] = next[j]
      next[j] = tmp
      setList(next)
    },
    add: item => setList([...list, item]),
  }), [list, setList])
}

/* ── 作品集 ───────────────────────────────────── */
function ProjectsEditor({ data, setData }) {
  const items = data.items
  const setItems = next => setData({ ...data, items: next })
  const ops = useList(items, setItems)

  const blank = () => ({
    id: uid('project'),
    slug: '',
    title: '',
    category: '',
    featured: false,
    description: { zh: '', en: '' },
    features: { zh: [], en: [] },
    tech: [],
    repoLink: '',
    demoLink: null,
    image: null,
  })

  return (
    <>
      <div className="ad-toolbar">
        <button type="button" onClick={() => ops.add(blank())}>+ 新增作品</button>
        <Field label="篩選分類" hint="逗號分隔，第一個必須是 All">
          <Text
            value={data.filters.join(', ')}
            onChange={v => setData({
              ...data,
              filters: String(v ?? '').split(',').map(s => s.trim()).filter(Boolean),
            })}
          />
        </Field>
      </div>

      {items.map((p, i) => (
        <Row
          key={p.id}
          item={p}
          index={i}
          total={items.length}
          title={p.title || '（未命名）'}
          onMove={ops.move}
          onRemove={ops.remove}
        >
          <div className="ad-grid-2">
            <Field label="標題">
              <Text value={p.title} onChange={v => ops.update(i, { title: v })} />
            </Field>
            <Field label="slug" hint="卡片標題列顯示的路徑">
              <Text value={p.slug} onChange={v => ops.update(i, { slug: v })} />
            </Field>
            <Field label="分類" hint="需能被篩選字串命中，例如 AI / Bot">
              <Text value={p.category} onChange={v => ops.update(i, { category: v })} />
            </Field>
            <Field label="精選">
              <input
                type="checkbox"
                checked={!!p.featured}
                onChange={e => ops.update(i, { featured: e.target.checked })}
              />
            </Field>
            <Field label="GitHub 連結">
              <Text value={p.repoLink} onChange={v => ops.update(i, { repoLink: v })} />
            </Field>
            <Field label="Demo 連結" hint="留空則不顯示按鈕">
              <Text value={p.demoLink} onChange={v => ops.update(i, { demoLink: v })} />
            </Field>
          </div>

          <Bilingual
            label="描述"
            value={p.description}
            onChange={v => ops.update(i, { description: v })}
            render={(val, set) => <Area value={val} onChange={set} />}
          />

          <Bilingual
            label="功能重點（一行一項）"
            value={p.features}
            onChange={v => ops.update(i, { features: v })}
            render={(val, set) => <Lines value={val} onChange={set} rows={5} />}
          />

          <Field label="技術標籤（一行一項）">
            <Lines value={p.tech} onChange={v => ops.update(i, { tech: v })} />
          </Field>

          <Field label="封面圖" hint="留空則卡片不顯示圖片">
            <ImagePicker value={p.image} onChange={v => ops.update(i, { image: v })} />
          </Field>
        </Row>
      ))}
    </>
  )
}

/* ── 履歷：三個結構相同的清單 ─────────────────── */
function ListSection({ title, list, setList, blank, fields }) {
  const ops = useList(list, setList)
  return (
    <section className="ad-section">
      <div className="ad-section-head">
        <h3>{title} <span className="ad-count">{list.length}</span></h3>
        <button type="button" onClick={() => ops.add(blank())}>+ 新增</button>
      </div>

      {list.length === 0 && (
        <p className="ad-empty">目前沒有資料 — 這個區塊不會出現在網站上。</p>
      )}

      {list.map((item, i) => (
        <Row
          key={item.id}
          item={item}
          index={i}
          total={list.length}
          title={item.title || '（未命名）'}
          onMove={ops.move}
          onRemove={ops.remove}
        >
          <div className="ad-grid-2">
            {fields.map(f => (
              <Field key={f.key} label={f.label} hint={f.hint}>
                {f.type === 'color'
                  ? <Select value={item[f.key]} onChange={v => ops.update(i, { [f.key]: v })} options={COLORS} />
                  : <Text value={item[f.key]} onChange={v => ops.update(i, { [f.key]: v })} />}
              </Field>
            ))}
          </div>
        </Row>
      ))}
    </section>
  )
}

function ResumeEditor({ data, setData }) {
  return (
    <>
      <ListSection
        title="專業認證"
        list={data.certifications}
        setList={v => setData({ ...data, certifications: v })}
        blank={() => ({
          id: uid('cert'), title: '', issuer: '', date: '',
          credentialId: null, link: null, tag: '', color: 'cyan',
        })}
        fields={[
          { key: 'title', label: '名稱' },
          { key: 'issuer', label: '發證單位' },
          { key: 'date', label: '年份' },
          { key: 'tag', label: '標籤', hint: '卡片角落的小字' },
          { key: 'credentialId', label: 'Credential ID', hint: '留空則不顯示' },
          { key: 'link', label: '驗證連結', hint: '留空則不顯示驗證按鈕' },
          { key: 'color', label: '配色', type: 'color' },
        ]}
      />

      <ListSection
        title="競賽"
        list={data.competitions}
        setList={v => setData({ ...data, competitions: v })}
        blank={() => ({
          id: uid('comp'), title: '', event: '', organizer: '', date: '',
          award: '', description: '', link: null, color: 'pink',
        })}
        fields={[
          { key: 'title', label: '競賽名稱' },
          { key: 'event', label: '賽事場次' },
          { key: 'organizer', label: '主辦單位' },
          { key: 'date', label: '年份' },
          { key: 'award', label: '獎項' },
          { key: 'description', label: '說明', hint: '可留空' },
          { key: 'link', label: '連結', hint: '可留空' },
          { key: 'color', label: '配色', type: 'color' },
        ]}
      />

      <ListSection
        title="課程"
        list={data.courses}
        setList={v => setData({ ...data, courses: v })}
        blank={() => ({
          id: uid('course'), title: '', issuer: '', date: '',
          modules: '', link: null, color: 'cyan',
        })}
        fields={[
          { key: 'title', label: '課程名稱' },
          { key: 'issuer', label: '開課單位' },
          { key: 'date', label: '年份' },
          { key: 'modules', label: '規模', hint: '例如 5 courses' },
          { key: 'link', label: '連結', hint: '可留空' },
          { key: 'color', label: '配色', type: 'color' },
        ]}
      />
    </>
  )
}

/* ── 其餘：JSON 直編，附解析驗證 ───────────────── */
/* key={tab} 讓切換分頁時整個重掛 —— 編輯中的文字才是 source of truth，
   不需要（也不該）用 effect 把 props 同步回 state。 */
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
        這幾個區塊結構固定，直接編 JSON 最快；格式錯誤會即時提示，錯的時候存不進去。
        關於頁的自我介紹支援 <code>**粗體**</code> 標記。
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
  const [drafts, setDrafts] = useState(() => clone(SEEDS))
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  const isContent = tab in SEEDS
  const data = isContent ? drafts[tab] : null
  const dirty = isContent && changed(data, SEEDS[tab])
  const setData = useCallback(next => setDrafts(d => ({ ...d, [tab]: next })), [tab])

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
      setStatus(`已寫入 ${d.file} — 記得 git commit`)
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
            onClick={() => setTab(t.id)}
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

      <main className="ad-body">
        {tab === 'projects' && <ProjectsEditor data={data} setData={setData} />}
        {tab === 'resume' && <ResumeEditor data={data} setData={setData} />}
        {['about', 'contact', 'home'].includes(tab) && <JsonEditor key={tab} data={data} setData={setData} />}
        {tab === 'media' && <MediaManager />}
      </main>
    </div>
  )
}
