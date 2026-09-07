import {
  Field, TextReq, Area, Num, Color, Select, KeySelect,
  Bilingual, CompactRow, ListSection,
} from '../fields'
import useList from '../useList'
import { COLORS, TEXT_CLASSES, TIMELINE_TYPES } from '../constants'
import { uid } from '../util'
import translations from '../../i18n/translations'

/* 切到「翻譯 key」模式時要有個預設值，不然存下去會是空的 */
const FIRST_VALUE_KEY = Object.keys(translations.zh).find(k => /^si\..*\.val$/.test(k))

export default function AboutEditor({ data, setData }) {
  return (
    <>
      <SysInfo list={data.sysInfo} setList={v => setData({ ...data, sysInfo: v })} />
      <Bio value={data.bio} onChange={v => setData({ ...data, bio: v })} />
      <Timeline list={data.timeline} setList={v => setData({ ...data, timeline: v })} />
      <Skills list={data.skills} setList={v => setData({ ...data, skills: v })} />
      <Palette list={data.palette} setList={v => setData({ ...data, palette: v })} />
    </>
  )
}

/* ── 左側系統資訊表 ───────────────────────────── */
/* 每一列的值可以是固定文字，也可以是翻譯 key（切語言會跟著變）。
   About.jsx 的判斷是 valueKey ? t(valueKey) : value —— 兩者只能擇一，
   所以切換模式時整個物件重建，不留下另一個欄位。 */
function SysInfo({ list, setList }) {
  return (
    <ListSection
      title="系統資訊表"
      addLabel="+ 新增一列"
      hint="關於頁左側那張 neofetch 表。左欄一律是翻譯 key；右欄可選固定文字或翻譯 key。"
      list={list}
      setList={setList}
      blank={() => ({ labelKey: 'si.name', value: '', cls: null })}
      rowTitle={item => translations.zh[item.labelKey] ?? item.labelKey}
    >
      {(item, i, ops) => {
        const isKeyMode = item.valueKey != null
        const setMode = mode => ops.replace(i, mode === 'key'
          ? { labelKey: item.labelKey, valueKey: FIRST_VALUE_KEY, cls: item.cls ?? null }
          : { labelKey: item.labelKey, value: '', cls: item.cls ?? null })

        return (
          <div className="ad-grid-2">
            <Field label="左欄標籤">
              <KeySelect
                value={item.labelKey}
                onChange={v => ops.update(i, { labelKey: v })}
                match={/^si\.(?!.*\.val$)/}
              />
            </Field>

            <Field label="右欄型態" hint="翻譯 key 會隨語言切換">
              <select
                className="ad-input"
                value={isKeyMode ? 'key' : 'text'}
                onChange={e => setMode(e.target.value)}
              >
                <option value="text">固定文字</option>
                <option value="key">翻譯 key</option>
              </select>
            </Field>

            <Field label="右欄內容">
              {isKeyMode
                ? <KeySelect
                    value={item.valueKey}
                    onChange={v => ops.update(i, { valueKey: v })}
                    match={/^si\..*\.val$/}
                  />
                : <TextReq value={item.value} onChange={v => ops.update(i, { value: v })} />}
            </Field>

            <Field label="文字顏色" hint="留空是預設色">
              <Select
                value={item.cls}
                onChange={v => ops.update(i, { cls: v })}
                options={TEXT_CLASSES}
                allowEmpty
              />
            </Field>
          </div>
        )
      }}
    </ListSection>
  )
}

/* ── 自我介紹 ─────────────────────────────────── */
function Bio({ value, onChange }) {
  return (
    <section className="ad-section">
      <div className="ad-section-head">
        <h3>自我介紹</h3>
      </div>
      <p className="ad-note">
        一段一個方框，順序就是顯示順序。支援 <code>**粗體**</code> 標記（由 RichText 渲染）。
        兩種語言都要填，否則切到另一個語言那段會是空的。
      </p>
      <div className="ad-bilingual">
        <Paragraphs
          label="中文"
          list={value.zh}
          setList={v => onChange({ ...value, zh: v })}
        />
        <Paragraphs
          label="English"
          list={value.en}
          setList={v => onChange({ ...value, en: v })}
        />
      </div>
    </section>
  )
}

function Paragraphs({ label, list, setList }) {
  const ops = useList(list, setList)
  return (
    <div className="ad-nested">
      <div className="ad-section-head">
        <h4>{label} <span className="ad-count">{list.length}</span></h4>
        <button type="button" onClick={() => ops.add('')}>+ 新增段落</button>
      </div>
      {list.map((para, i) => (
        <CompactRow
          key={i}
          index={i}
          total={list.length}
          onMove={ops.move}
          onRemove={ops.remove}
        >
          <Area rows={5} value={para} onChange={v => ops.replace(i, v)} />
        </CompactRow>
      ))}
    </div>
  )
}

/* ── 時間軸 ───────────────────────────────────── */
function Timeline({ list, setList }) {
  return (
    <ListSection
      title="時間軸"
      addLabel="+ 新增項目"
      hint="由上而下就是顯示順序，通常是新到舊。"
      list={list}
      setList={setList}
      blank={() => ({
        id: uid('tl'),
        year: '',
        title: { zh: '', en: '' },
        sub: { zh: '', en: '' },
        color: 'cyan',
        type: 'education',
      })}
      rowTitle={item => item.title?.zh || '（未命名）'}
    >
      {(item, i, ops) => (
        <>
          <div className="ad-grid-2">
            <Field label="時間" hint="例如 2025/9">
              <TextReq value={item.year} onChange={v => ops.update(i, { year: v })} />
            </Field>
            <Field label="類型" hint="只影響左側小標籤的樣式">
              <Select
                value={item.type}
                onChange={v => ops.update(i, { type: v })}
                options={TIMELINE_TYPES}
              />
            </Field>
            <Field label="配色">
              <Select value={item.color} onChange={v => ops.update(i, { color: v })} options={COLORS} />
            </Field>
          </div>

          <Bilingual
            label="標題"
            value={item.title}
            onChange={v => ops.update(i, { title: v })}
            render={(val, set) => <TextReq value={val} onChange={set} />}
          />
          <Bilingual
            label="副標"
            value={item.sub}
            onChange={v => ops.update(i, { sub: v })}
            render={(val, set) => <TextReq value={val} onChange={set} />}
          />
        </>
      )}
    </ListSection>
  )
}

/* ── 技能 ─────────────────────────────────────── */
function Skills({ list, setList }) {
  return (
    <ListSection
      title="技能分類"
      addLabel="+ 新增分類"
      hint="每個分類底下是一組技能與熟練度，熟練度決定進度條長度。"
      list={list}
      setList={setList}
      blank={() => ({
        id: uid('skill'),
        category: '',
        categoryKey: null,
        tag: '',
        items: [],
      })}
      rowTitle={g => g.category || '（未命名）'}
    >
      {(g, i, ops) => (
        <>
          <div className="ad-grid-2">
            <Field label="分類名稱">
              <TextReq value={g.category} onChange={v => ops.update(i, { category: v })} />
            </Field>
            <Field label="標籤" hint="標題左邊的小字，例如 <UI/>">
              <TextReq value={g.tag} onChange={v => ops.update(i, { tag: v })} />
            </Field>
            <Field label="翻譯 key" hint="設了就用翻譯，留空則用上面的分類名稱">
              <KeySelect
                value={g.categoryKey}
                onChange={v => ops.update(i, { categoryKey: v })}
                match={/^skill\./}
                allowEmpty
              />
            </Field>
          </div>

          <SkillItems items={g.items} setItems={v => ops.update(i, { items: v })} />
        </>
      )}
    </ListSection>
  )
}

function SkillItems({ items, setItems }) {
  const ops = useList(items, setItems)
  return (
    <div className="ad-nested">
      <div className="ad-section-head">
        <h4>技能項目 <span className="ad-count">{items.length}</span></h4>
        <button type="button" onClick={() => ops.add({ name: '', level: 70 })}>+ 新增技能</button>
      </div>
      {items.length === 0 && <p className="ad-empty">這個分類還沒有技能項目。</p>}
      {items.map((it, i) => (
        <CompactRow
          key={i}
          index={i}
          total={items.length}
          onMove={ops.move}
          onRemove={ops.remove}
        >
          <div className="ad-crow-grid">
            <Field label="名稱" hint="同一分類內不可重複">
              <TextReq value={it.name} onChange={v => ops.update(i, { name: v })} />
            </Field>
            <Field label="熟練度">
              <Num value={it.level} onChange={v => ops.update(i, { level: v })} />
            </Field>
          </div>
        </CompactRow>
      ))}
    </div>
  )
}

/* ── 色票 ─────────────────────────────────────── */
function Palette({ list, setList }) {
  return (
    <ListSection
      title="色票"
      addLabel="+ 新增顏色"
      hint="系統資訊表下方那排小方塊，純裝飾。"
      list={list}
      setList={setList}
      blank={() => '#00e5ff'}
      compact
    >
      {(hex, i, ops) => <Color value={hex} onChange={v => ops.replace(i, v)} />}
    </ListSection>
  )
}
