import { lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider, useLang } from './context/LangContext'
import usePageMeta from './hooks/usePageMeta'
import NavControls from './components/NavControls'
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

/* 用 location.pathname 當 key，換頁時重新 mount → 觸發 CSS 進場動畫 */
function AnimatedRoutes() {
  const location = useLocation()
  usePageMeta()
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
          <li><NavLink to="/"          end onClick={closeMenu}>{t('nav.home')}</NavLink></li>
          <li><NavLink to="/about"         onClick={closeMenu}>{t('nav.about')}</NavLink></li>
          <li><NavLink to="/portfolio"     onClick={closeMenu}>{t('nav.projects')}</NavLink></li>
          <li><NavLink to="/resume"        onClick={closeMenu}>{t('nav.resume')}</NavLink></li>
          <li><NavLink to="/contact"       onClick={closeMenu}>{t('nav.contact')}</NavLink></li>
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
          © 2025 Cheng KT · crafted with{' '}
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
