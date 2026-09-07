/* Admin 表單用的小元件 —— 刻意保持樸素，這是只有你自己會看到的工具介面 */

import translations from '../i18n/translations'
import useList from './useList'

export function Field({ label, hint, children }) {
  return (
    <label className="ad-field">
      <span className="ad-label">
        {label}
        {hint && <em className="ad-hint">{hint}</em>}
      </span>
      {children}
    </label>
  )
}

export function Text({ value, onChange, ...rest }) {
  return (
    <input
      className="ad-input"
      value={value ?? ''}
      onChange={e => onChange(e.target.value || null)}
      {...rest}
    />
  )
}

/** 跟 Text 一樣，但空字串就是空字串 —— 用在不接受 null 的欄位（例如跑馬燈標籤） */
export function TextReq({ value, onChange, ...rest }) {
  return (
    <input
      className="ad-input"
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      {...rest}
    />
  )
}

export function Area({ value, onChange, rows = 3, ...rest }) {
  return (
    <textarea
      className="ad-input ad-area"
      rows={rows}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      {...rest}
    />
  )
}

/** 一行一項的清單編輯（features、tech…） */
export function Lines({ value, onChange, rows = 4 }) {
  return (
    <Area
      rows={rows}
      value={(value ?? []).join('\n')}
      onChange={v => onChange(v.split('\n').map(s => s.trim()).filter(Boolean))}
    />
  )
}

export function Select({ value, onChange, options, allowEmpty = false, emptyLabel = '（無）' }) {
  return (
    <select
      className="ad-input"
      value={value ?? ''}
      onChange={e => onChange(e.target.value || null)}
    >
      {allowEmpty && <option value="">{emptyLabel}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export function Check({ value, onChange }) {
  return (
    <input
      type="checkbox"
      checked={!!value}
      onChange={e => onChange(e.target.checked)}
    />
  )
}

/** 0–100 的程度值：拉桿 + 數字框並排 */
export function Num({ value, onChange, min = 0, max = 100 }) {
  const clamp = n => Math.max(min, Math.min(max, Number.isFinite(n) ? n : min))
  return (
    <span className="ad-num">
      <input
        type="range"
        min={min}
        max={max}
        value={value ?? min}
        onChange={e => onChange(Number(e.target.value))}
      />
      <input
        className="ad-input ad-num-box"
        type="number"
        min={min}
        max={max}
        value={value ?? min}
        onChange={e => onChange(clamp(parseInt(e.target.value, 10)))}
      />
    </span>
  )
}

/** 色票：系統選色器 + 可直接貼 hex 的文字框 */
export function Color({ value, onChange }) {
  const hex = /^#[0-9a-fA-F]{6}$/.test(value ?? '') ? value : '#000000'
  return (
    <span className="ad-color">
      <input type="color" value={hex} onChange={e => onChange(e.target.value)} />
      <input
        className="ad-input"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
      />
    </span>
  )
}

/**
 * i18n key 下拉。
 *
 * 這種欄位以前只能手打，而打錯不會有任何錯誤 —— LangContext 找不到 key 時
 * 會回傳 key 本身，網站上就直接印出「si.nmae」這種字串，JSON 合法、build 也會過。
 * 所以這裡只給選、不給打，並且把該 key 的中文值一起顯示出來。
 */
export function KeySelect({ value, onChange, match, allowEmpty = false }) {
  const keys = Object.keys(translations.zh).filter(k => match.test(k))
  const orphan = value && !keys.includes(value)
  return (
    <select
      className={`ad-input${orphan ? ' ad-invalid' : ''}`}
      value={value ?? ''}
      onChange={e => onChange(e.target.value || null)}
    >
      {allowEmpty && <option value="">（不使用）</option>}
      {orphan && <option value={value}>⚠ {value} — translations.js 裡沒有這個 key</option>}
      {keys.map(k => (
        <option key={k} value={k}>{k} — {translations.zh[k]}</option>
      ))}
    </select>
  )
}

/** 雙語欄位：zh / en 並排 */
export function Bilingual({ label, value, onChange, render }) {
  return (
    <div className="ad-bilingual">
      <Field label={`${label} · 中文`}>
        {render(value?.zh, v => onChange({ ...value, zh: v }))}
      </Field>
      <Field label={`${label} · English`}>
        {render(value?.en, v => onChange({ ...value, en: v }))}
      </Field>
    </div>
  )
}

/** 一般清單項：卡片式，有標題列 */
export function Row({ index, total, onMove, onRemove, title, children }) {
  return (
    <div className="ad-row">
      <div className="ad-row-head">
        <span className="ad-row-title">{title || `#${index + 1}`}</span>
        <div className="ad-row-actions">
          <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0}>↑</button>
          <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1}>↓</button>
          <button type="button" className="ad-danger" onClick={() => onRemove(index)}>刪除</button>
        </div>
      </div>
      <div className="ad-row-body">{children}</div>
    </div>
  )
}

/** 精簡清單項：欄位少、筆數多的清單用（跑馬燈、終端機行、色票…） */
export function CompactRow({ index, total, onMove, onRemove, children }) {
  return (
    <div className="ad-crow">
      <span className="ad-crow-num">{String(index + 1).padStart(2, '0')}</span>
      <div className="ad-crow-body">{children}</div>
      <div className="ad-row-actions">
        <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0}>↑</button>
        <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1}>↓</button>
        <button type="button" className="ad-danger" onClick={() => onRemove(index)}>✕</button>
      </div>
    </div>
  )
}

/**
 * 有標題、計數、新增鈕與空狀態的清單區塊。
 * children 是 render prop：(item, index, ops) => 這一列的內容。
 */
export function ListSection({
  title,
  hint,
  list,
  setList,
  blank,
  addLabel = '+ 新增',
  emptyText,
  rowTitle,
  compact = false,
  children,
}) {
  const ops = useList(list, setList)
  const Item = compact ? CompactRow : Row

  return (
    <section className="ad-section">
      <div className="ad-section-head">
        <h3>{title} <span className="ad-count">{list.length}</span></h3>
        <button type="button" onClick={() => ops.add(blank())}>{addLabel}</button>
      </div>

      {hint && <p className="ad-note">{hint}</p>}

      {list.length === 0 && (
        <p className="ad-empty">
          {emptyText ?? '目前沒有資料 —— 這個區塊不會出現在網站上。'}
        </p>
      )}

      {list.map((item, i) => (
        <Item
          key={item?.id ?? i}
          index={i}
          total={list.length}
          title={rowTitle?.(item, i)}
          onMove={ops.move}
          onRemove={ops.remove}
        >
          {children(item, i, ops)}
        </Item>
      ))}
    </section>
  )
}
