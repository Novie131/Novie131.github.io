import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import home from '../content/home.json'
import '../styles/Home.css'

const { avatar, stats, ticker, terminal, pokemon } = home
const tickerLoop = [...ticker, ...ticker]

const BW_SPRITE = id =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`

export default function Home() {
  const { t } = useLang()
  const { theme } = useTheme()
  /* 寶可夢區塊只在 pokemon 主題渲染 —— 過去它永遠在 DOM 裡但被 CSS 藏起來，
     瀏覽器仍會去 raw.githubusercontent.com 抓 6 張看不見的 GIF。 */
  const showPokemon = theme === 'pokemon'

  return (
    <div className="page home">

      {/* ── Hero Grid ───────────────────────────────── */}
      <div className="home-grid">

        {/* Left: Hero */}
        <section className="hero-col">
          <div className="hero-profile">
            <div className="avatar-ring">
              <img
                src={avatar}
                alt="Cheng KT"
                width="64"
                height="64"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <span className="hero-badge">
              <span className="badge-dot" />
              {t('home.badge')}
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-prompt">$ whoami</span>
            <span className="hero-name">Cheng KT</span>
          </h1>

          <p className="hero-sub">
            <span className="tc-green">❯</span> {t('home.sub')}
          </p>

          <div className="hero-actions">
            <Link to="/portfolio" className="btn btn-primary">
              {t('home.btn.projects')} <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-outline">{t('home.btn.about')}</Link>
          </div>
        </section>

        {/* Right: Terminal（非 pokemon 主題） */}
        {!showPokemon && (
          <section className="terminal-col">
            <div className="terminal-window">
              <div className="terminal-titlebar">
                <div className="tb-dots">
                  <span className="tb-dot" style={{ background: '#ff5f57' }} />
                  <span className="tb-dot" style={{ background: '#febc2e' }} />
                  <span className="tb-dot" style={{ background: '#28c840' }} />
                </div>
                <span className="tb-title">Cheng KT — zsh — 80×24</span>
              </div>
              <div className="terminal-body">
                <p className="tl d1"><span className="tc-green">❯</span> <span className="tc-amber">neofetch</span></p>
                <p className="tl d2 tl-user">Cheng KT<span className="tc-dim">@</span>portfolio</p>
                <p className="tl d3 tl-sep">─────────────────────</p>
                {terminal.map((row, i) => (
                  <p key={row.key} className={`tl d${i + 4}`}>
                    <span className="tc-cyan">{row.key.padEnd(7)}</span> : {row.value}
                  </p>
                ))}
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
        )}

        {/* Right: 寶可夢玩樂場景（pokemon 主題專用） */}
        {showPokemon && (
          <section className="pokemon-playground">
            <div className="playground-field">
              <span className="pg-cloud" style={{ left: '10%' }}>☁</span>
              <span className="pg-cloud" style={{ left: '38%' }}>☁</span>
              <span className="pg-cloud" style={{ right: '8%'  }}>☁</span>

              {pokemon.playground.map(p => (
                <div key={p.id} className="playground-poke">
                  <img
                    src={BW_SPRITE(p.id)}
                    alt={p.alt}
                    className={`playground-sprite bounce-${p.bounce}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="playground-name">{p.name}</span>
                </div>
              ))}
            </div>
            <div className="playground-ground" />
          </section>
        )}

      </div>

      {/* ── Stats Bar ───────────────────────────────── */}
      <div className="stats-bar">
        {stats.map(s => (
          <div key={s.labelKey} className={`stat-item stat-${s.color}`}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{t(s.labelKey)}</span>
          </div>
        ))}
      </div>

      {/* ── 寶可夢草叢（pokemon 主題專用） ─────────── */}
      {showPokemon && (
        <div className="pokemon-grass-strip">
          <div className="pgs-label">{t('poke.grass')}</div>
          {pokemon.grass.map(p => (
            <div key={p.id} className="grass-poke">
              <img
                src={BW_SPRITE(p.id)}
                alt={p.name}
                className="grass-sprite"
                loading="lazy"
                decoding="async"
              />
              <span className="grass-name">{p.name}</span>
            </div>
          ))}
        </div>
      )}

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
