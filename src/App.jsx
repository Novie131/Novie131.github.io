import { useState } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider, useLang } from './context/LangContext'
import NavControls from './components/NavControls'
import './styles/App.css'
import './styles/themes.css'

/* 用 location.pathname 當 key，換頁時重新 mount → 觸發 CSS 進場動畫 */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="route-wrapper">
      <Routes location={location}>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*"         element={<NotFound />} />
      </Routes>
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
      <a href="#/" className="btn btn-outline nf-btn">cd ~/home</a>
    </div>
  )
}

function AppInner() {
  const { t } = useLang()
  const [viewMode, setViewMode] = useState('desktop')
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleView = () => setViewMode(v => v === 'desktop' ? 'mobile' : 'desktop')
  const isMobile = viewMode === 'mobile'
  const closeMenu = () => setMenuOpen(false)

  return (
    <Router>
      <div className="app-root" data-view={viewMode}>

        <nav className="navbar">
          <div className="logo">
            <span className="logo-dot" />
            <span className="logo-bracket">&lt;</span>
            Novie131
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
            © 2025 Novie131 · crafted with{' '}
            <a href="https://react.dev"  target="_blank" rel="noreferrer">React</a> ×{' '}
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>
            {' '}· [system.online]
          </p>
        </footer>

      </div>
    </Router>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AppInner />
      </LangProvider>
    </ThemeProvider>
  )
}
