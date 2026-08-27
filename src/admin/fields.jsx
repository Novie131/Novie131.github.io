/* Admin 表單用的小元件 —— 刻意保持樸素，這是只有你自己會看到的工具介面 */

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

export function Select({ value, onChange, options }) {
  return (
    <select className="ad-input" value={value ?? ''} onChange={e => onChange(e.target.value)}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
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

export function Row({ item, index, total, onMove, onRemove, title, children }) {
  return (
    <div className="ad-row">
      <div className="ad-row-head">
        <span className="ad-row-title">{title || item.id || `#${index + 1}`}</span>
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
