import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import '../styles/NavControls.css'

export default function NavControls({ isMobile, onToggleView }) {
  const { theme, setTheme, themes } = useTheme()
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open && !themeOpen) return
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open, themeOpen])

  function handleMainToggle() {
    if (open) setThemeOpen(false)
    setOpen(v => !v)
  }

  return (
    <div className="nav-controls" ref={ref}>
      {/* 向左滑出的兩個動作按鈕 */}
      {open && (
        <div className="nc-actions">
          <button
            className={`nc-btn${isMobile ? ' is-active' : ''}`}
            onClick={onToggleView}
            title={isMobile ? '切換回桌機版' : '預覽手機版'}
          >
            <span className="nc-icon" aria-hidden>{isMobile ? '🖥️' : '📱'}</span>
            <span className="nc-label">{isMobile ? 'Desktop' : 'Mobile'}</span>
          </button>

          <button
            className={`nc-btn${themeOpen ? ' is-active' : ''}`}
            onClick={() => setThemeOpen(v => !v)}
            title="切換主題風格"
          >
            <span className="nc-icon" aria-hidden>🎨</span>
            <span className="nc-label">Theme</span>
          </button>
        </div>
      )}

      {/* 主切換鈕 */}
      <button
        className={`nc-toggle${open ? ' is-open' : ''}`}
        onClick={handleMainToggle}
        aria-label="控制選單"
        aria-expanded={open}
        title="控制選單"
      >
        <span className="nc-toggle-icon" aria-hidden>{open ? '✕' : '⚙'}</span>
      </button>

      {/* 主題下拉選單 */}
      {themeOpen && (
        <div className="nc-theme-panel" role="menu">
          <div className="nc-panel-header">{t('panel.style')}</div>
          {themes.map(themeOpt => (
            <button
              key={themeOpt.id}
              className={`nc-theme-option${theme === themeOpt.id ? ' is-active' : ''}`}
              onClick={() => { setTheme(themeOpt.id); setThemeOpen(false); setOpen(false) }}
              role="menuitem"
            >
              <span className={`nc-swatch nc-swatch-${themeOpt.id}`} />
              <span className="nc-option-info">
                <span className="nc-option-label">{themeOpt.icon} {t(`theme.${themeOpt.id}.label`)}</span>
                <span className="nc-option-desc">{t(`theme.${themeOpt.id}.desc`)}</span>
              </span>
              {theme === themeOpt.id && <span className="nc-check" aria-hidden>✓</span>}
            </button>
          ))}

          <div className="nc-panel-divider" />
          <div className="nc-panel-header">{t('panel.lang')}</div>
          {['zh', 'en'].map(langOpt => (
            <button
              key={langOpt}
              className={`nc-theme-option${lang === langOpt ? ' is-active' : ''}`}
              onClick={() => { setLang(langOpt); setThemeOpen(false); setOpen(false) }}
              role="menuitem"
            >
              <span className={`nc-swatch nc-swatch-lang-${langOpt}`} />
              <span className="nc-option-info">
                <span className="nc-option-label">{t(`lang.${langOpt}`)}</span>
              </span>
              {lang === langOpt && <span className="nc-check" aria-hidden>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
