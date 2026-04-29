import { Link } from 'react-router-dom'
import '../styles/Home.css'


const tickerItems = [
  { label: 'React',          color: 'cyan'   },
  { label: 'Go',             color: 'cyan'   },
  { label: 'Python',         color: 'purple' },
  { label: 'TypeScript',     color: 'cyan'   },
  { label: 'FastAPI',        color: 'green'  },
  { label: 'Node.js',        color: 'green'  },
  { label: 'PostgreSQL',     color: 'amber'  },
  { label: 'Docker',         color: 'cyan'   },
  { label: 'LangChain',      color: 'purple' },
  { label: 'PyTorch',        color: 'purple' },
  { label: 'Gemini API',     color: 'amber'  },
  { label: 'Claude API',     color: 'purple' },
  { label: 'GitHub Actions', color: 'green'  },
  { label: 'Linux',          color: 'amber'  },
  { label: 'Next.js',        color: 'cyan'   },
  { label: 'Redis',          color: 'pink'   },
  { label: 'RAG',            color: 'purple' },
  { label: 'GCP',            color: 'amber'  },
]

const stats = [
  { value: '3+',  label: 'Years coding',    color: 'cyan'   },
  { value: '4',   label: 'Projects shipped', color: 'purple' },
  { value: '18+', label: 'Tech stack',       color: 'green'  },
  { value: '∞',   label: 'Commits pushed',   color: 'amber'  },
]

/* 複製兩次確保無縫迴圈 */
const tickerLoop = [...tickerItems, ...tickerItems]

export default function Home() {
  return (
    <div className="page home">

      {/* ── Hero Grid ───────────────────────────────── */}
      <div className="home-grid">

        {/* Left: Hero */}
        <section className="hero-col">
          <div className="hero-profile">
            <div className="avatar-ring">
              <img src="/img/dogwork.png" alt="Novie131" />
            </div>
            <span className="hero-badge">
              <span className="badge-dot" />
              FULL-STACK · AI ENGINEER
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-prompt">$ whoami</span>
            <span className="hero-name">Novie131</span>
          </h1>

          <p className="hero-sub">
            <span className="tc-green">❯</span> Building systems · Training models · Shipping products
          </p>

          <div className="hero-actions">
            <Link to="/portfolio" className="btn btn-primary">
              ./view_projects <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-outline">cat about.md</Link>
          </div>
        </section>

        {/* Right: Terminal */}
        <section className="terminal-col">
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="tb-dots">
                <span className="tb-dot" style={{ background: '#ff5f57' }} />
                <span className="tb-dot" style={{ background: '#febc2e' }} />
                <span className="tb-dot" style={{ background: '#28c840' }} />
              </div>
              <span className="tb-title">novie131 — zsh — 80×24</span>
            </div>
            <div className="terminal-body">
              <p className="tl d1"><span className="tc-green">❯</span> <span className="tc-amber">neofetch</span></p>
              <p className="tl d2 tl-user">novie131<span className="tc-dim">@</span>portfolio</p>
              <p className="tl d3 tl-sep">─────────────────────</p>
              <p className="tl d4"><span className="tc-cyan">OS     </span> : Web v2025.04</p>
              <p className="tl d5"><span className="tc-cyan">Shell  </span> : react@19.2</p>
              <p className="tl d6"><span className="tc-cyan">Editor </span> : VS Code · Neovim</p>
              <p className="tl d7"><span className="tc-cyan">Uptime </span> : 3+ years</p>
              <p className="tl d8"><span className="tc-cyan">Focus  </span> : LLM · RAG · Full-Stack</p>
              <p className="tl d9">&nbsp;</p>
              <p className="tl d10"><span className="tc-green">❯</span> <span className="tc-amber">./run_model.py</span></p>
              <p className="tl d11">&nbsp;</p>
              <div className="tl d12 tl-progress">
                <span className="tc-dim">training  </span>
                <div className="pg-track"><div className="pg-fill" /></div>
                <span className="tc-green"> 87%</span>
              </div>
              <p className="tl d13"><span className="tc-dim">&gt;</span> loss: <span className="tc-amber">0.0421</span></p>
              <p className="tl d14"><span className="tc-dim">&gt;</span> acc:  <span className="tc-cyan">98.7%</span></p>
              <p className="tl d15">&nbsp;</p>
              <p className="tl d16"><span className="tc-green">❯</span> <span className="cursor-blink">█</span></p>
            </div>
          </div>
        </section>

      </div>

      {/* ── Stats Bar ───────────────────────────────── */}
      <div className="stats-bar">
        {stats.map((s, i) => (
          <div key={i} className={`stat-item stat-${s.color}`}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Tech Ticker ─────────────────────────────── */}
      <div className="ticker-wrap">
        <div className="ticker-fade-left"  />
        <div className="ticker-fade-right" />
        <div className="ticker-track">
          {tickerLoop.map((item, i) => (
            <span key={i} className="ticker-item">
              <span className={`ticker-dot tc-${item.color}`}>◆</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
