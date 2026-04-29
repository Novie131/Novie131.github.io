import { useState } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import { ThemeProvider } from './context/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'
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
  return (
    <div className="page not-found">
      <p className="nf-prompt">~/404 $ cat error.log</p>
      <h1 className="nf-code">404</h1>
      <p className="nf-msg">
        <span className="tc-green">❯</span> Page not found — 頁面不存在
      </p>
      <a href="#/" className="btn btn-outline nf-btn">cd ~/home</a>
    </div>
  )
}

export default function App() {
  const [viewMode, setViewMode] = useState('desktop')
  const toggleView = () => setViewMode(v => v === 'desktop' ? 'mobile' : 'desktop')
  const isMobile = viewMode === 'mobile'

  return (
    <ThemeProvider>
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
          <ul className="nav-links">
            <li><NavLink to="/"         end>~/home</NavLink></li>
            <li><NavLink to="/about"       >~/about</NavLink></li>
            <li><NavLink to="/portfolio"   >~/projects</NavLink></li>
            <li><NavLink to="/resume"       >~/resume</NavLink></li>
            <li><NavLink to="/contact"     >~/contact</NavLink></li>
          </ul>
        </nav>

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

        <button
          className={`view-toggle${isMobile ? ' is-active' : ''}`}
          onClick={toggleView}
          title={isMobile ? '切換回桌機版' : '預覽手機版'}
        >
          <span className="vt-icon">{isMobile ? '🖥️' : '📱'}</span>
          <span className="vt-label">{isMobile ? 'Desktop' : 'Mobile'}</span>
        </button>

        <ThemeSwitcher />

      </div>
    </Router>
    </ThemeProvider>
  )
}
