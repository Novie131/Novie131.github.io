import { useState, useRef, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import '../styles/NavControls.css'

export default function NavControls({ isMobile, onToggleView }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open && !themeOpen && !langOpen) return
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setThemeOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open, themeOpen, langOpen])

  function handleMainToggle() {
    if (open) {
      setThemeOpen(false)
      setLangOpen(false)
    }
    setOpen(v => !v)
  }

  function handleLangToggle() {
    setThemeOpen(false)
    setLangOpen(v => !v)
  }

  return (
    <div className="nav-controls" ref={ref}>
      {open && (
        <div className="nc-actions">
          {/* 平台切換 */}
          <button
            className={`nc-btn${isMobile ? ' is-active' : ''}`}
            onClick={onToggleView}
            title={isMobile ? '切換回桌機版' : '預覽手機版'}
          >
            <span className="nc-icon" aria-hidden>{isMobile ? '🖥️' : '📱'}</span>
            <span className="nc-label">{isMobile ? 'Desktop' : 'Mobile'}</span>
          </button>

          {/* Theme button disabled
          <button
            className={`nc-btn${themeOpen ? ' is-active' : ''}`}
            onClick={handleThemeToggle}
            title="網站外觀"
          >
            <span className="nc-icon" aria-hidden>🎨</span>
            <span className="nc-label">Theme</span>
          </button>
          */}

          {/* 語言切換 */}
          <button
            className={`nc-btn${langOpen ? ' is-active' : ''}`}
            onClick={handleLangToggle}
            title="切換語言"
          >
            <span className="nc-icon" aria-hidden>🌐</span>
            <span className="nc-label">{lang === 'zh' ? 'ZH' : 'EN'}</span>
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
        {/* 用 SVG 而非 ⚙ 字元：字元大小隨字型而變，各平台顯示不一 */}
        <svg className="nc-toggle-icon" viewBox="0 0 24 24" aria-hidden
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>

      {/* Theme panel disabled
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
        </div>
      )}
      */}

      {/* 語言下拉 */}
      {langOpen && (
        <div className="nc-theme-panel" role="menu">
          <div className="nc-panel-header">{t('panel.lang')}</div>
          {['zh', 'en'].map(langOpt => (
            <button
              key={langOpt}
              className={`nc-theme-option${lang === langOpt ? ' is-active' : ''}`}
              onClick={() => { setLang(langOpt); setLangOpen(false); setOpen(false) }}
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
