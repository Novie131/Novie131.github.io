import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import '../styles/ThemeSwitcher.css'

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="theme-switcher" ref={ref}>
      {open && (
        <div className="ts-panel" role="menu">
          <div className="ts-header">STYLE</div>
          {themes.map(t => (
            <button
              key={t.id}
              className={`ts-option${theme === t.id ? ' is-active' : ''}`}
              onClick={() => { setTheme(t.id); setOpen(false) }}
              role="menuitem"
              aria-label={`切換到${t.label}風格`}
            >
              <span className={`ts-swatch ts-swatch-${t.id}`} />
              <span className="ts-option-info">
                <span className="ts-option-label">{t.icon} {t.label}</span>
                <span className="ts-option-desc">{t.desc}</span>
              </span>
              {theme === t.id && <span className="ts-check" aria-hidden>✓</span>}
            </button>
          ))}
        </div>
      )}

      <button
        className={`ts-toggle${open ? ' is-open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="切換主題風格"
        aria-expanded={open}
        title="切換主題風格"
      >
        <span className="ts-icon" aria-hidden>🎨</span>
        <span className="ts-label">Theme</span>
      </button>
    </div>
  )
}
