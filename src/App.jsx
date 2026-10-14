import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider, useLang } from './context/LangContext'
import usePageMeta from './hooks/usePageMeta'
import NavControls from './components/NavControls'
import projects from './content/projects.json'
import './styles/App.css'
import './styles/themes.css'

/* 首頁同步載入（首屏），其餘頁面切分成獨立 chunk 按需載入 */
import Home from './pages/Home'
const About     = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact   = lazy(() => import('./pages/Contact'))
const Resume    = lazy(() => import('./pages/Resume'))

/* 本機內容編輯器。import.meta.env.DEV 在 production build 會被替換成 false，
   整個分支連同 dynamic import 一起被 tree-shake 掉 —— 線上不存在 /admin。 */
const AdminApp = import.meta.env.DEV ? lazy(() => import('./admin/AdminApp')) : null

/* 導覽列的子選單（桌機 hover／鍵盤 focus 時展開）。
   key 對應各頁 section 的 id；作品集用 ?filter= 直接套用篩選。
   履歷的順序要跟 Resume.jsx 的 SECTIONS 一致。 */
const NAV = [
  { to: '/',          label: 'nav.home', end: true },
  { to: '/about',     label: 'nav.about',
    sub: ['bio', 'timeline', 'stack'].map(k => ({ to: `/about#${k}`, label: `about.${k}` })) },
  { to: '/portfolio', label: 'nav.projects',
    sub: projects.filters.filter(f => f !== 'All').map(f => ({ to: `/portfolio?filter=${encodeURIComponent(f)}`, text: f })) },
  { to: '/resume',    label: 'nav.resume',
    sub: ['education', 'experience', 'publications', 'certifications', 'competitions',
          'community', 'writing', 'courses', 'events'].map(k => ({ to: `/resume#${k}`, label: `resume.sec.${k}` })) },
  { to: '/contact',   label: 'nav.contact' },
]

/* React Router 換頁時不會自己捲到 #hash；頁面又是 lazy 載入，
   目標元素可能晚幾個 frame 才出現，所以用 rAF 重試一小段時間。 */
function useHashScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    let tries = 0
    let raf
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries++ < 90) raf = requestAnimationFrame(seek)
    }
    seek()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
}

/* 用 location.pathname 當 key，換頁時重新 mount → 觸發 CSS 進場動畫 */
function AnimatedRoutes() {
  const location = useLocation()
  usePageMeta()
  useHashScroll()
  return (
    <div key={location.pathname} className="route-wrapper">
      <Suspense fallback={<div className="route-loading" aria-busy="true">❯ loading<span className="cursor-blink">█</span></div>}>
        <Routes location={location}>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/resume"    element={<Resume />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

function NotFound() {
  const { t } = useLang()
  return (
    <div className="page not-found">
      <p className="nf-prompt">~/404 $ cat error.log</p>
      <h1 className="nf-code">404</h1>
      <p className="nf-msg">{t('404.msg')}</p>
      <NavLink to="/" className="btn btn-outline nf-btn">cd ~/home</NavLink>
    </div>
  )
}

function AppInner() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [viewMode, setViewMode] = useState('desktop')
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleView = () => setViewMode(v => v === 'desktop' ? 'mobile' : 'desktop')
  const isMobile = viewMode === 'mobile'
  const closeMenu = () => setMenuOpen(false)

  if (AdminApp && pathname === '/admin') {
    return (
      <Suspense fallback={<p style={{ padding: '2rem' }}>載入編輯器…</p>}>
        <AdminApp />
      </Suspense>
    )
  }

  return (
    <div className="app-root" data-view={viewMode}>

      <nav className="navbar">
        <div className="logo">
          <span className="logo-dot" />
          <span className="logo-bracket">&lt;</span>
          Cheng KT
          <span className="logo-slash">/</span>
          <span className="logo-bracket">&gt;</span>
        </div>
        <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          {NAV.map(item => (
            <li key={item.to} className={`nav-item${item.sub ? ' has-sub' : ''}`}>
              <NavLink to={item.to} end={item.end} onClick={closeMenu}>{t(item.label)}</NavLink>
              {item.sub && (
                <ul className="nav-sub">
                  {item.sub.map(s => (
                    <li key={s.to}>
                      {/* 點完把 focus 移走，否則 :focus-within 會讓選單一直開著 */}
                      <Link to={s.to} onClick={e => { e.currentTarget.blur(); closeMenu() }}>
                        {s.text ?? t(s.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button
          className={`hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? t('menu.close') : t('menu.open')}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
        <NavControls isMobile={isMobile} onToggleView={toggleView} />
      </nav>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu} aria-hidden="true" />}

      <main className="content">
        <AnimatedRoutes />
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Cheng KT · crafted with{' '}
          <a href="https://react.dev"  target="_blank" rel="noreferrer">React</a> ×{' '}
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>
          {' '}· [system.online]
        </p>
      </footer>

    </div>
  )
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <LangProvider>
          <AppInner />
        </LangProvider>
      </ThemeProvider>
    </Router>
  )
}
