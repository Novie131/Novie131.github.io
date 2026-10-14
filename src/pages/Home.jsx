import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import home from '../content/home.json'
import '../styles/Home.css'

const { avatar, stats, ticker, terminal, pokemon } = home

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
                width="120"
                height="120"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <span className="hero-badge">{t('home.badge')}</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-prompt">$ whoami</span>
            <span className="hero-name">Cheng KT</span>
          </h1>

          <p className="hero-sub">{t('home.sub')}</p>

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
                  <span className="tb-dot" />
                  <span className="tb-dot" />
                  <span className="tb-dot" />
                </div>
                <span className="tb-title">zsh</span>
              </div>
              {/* 以前後面還有一段 ./run_model.py 的假訓練進度（loss / acc），
                  對不到任何真實專案，被問到反而尷尬 —— 只留 neofetch 的真實資料。 */}
              <div className="terminal-body">
                <p className="tl d1"><span className="tl-prompt">❯</span> neofetch</p>
                <p className="tl d2 tl-user">Cheng KT</p>
                <p className="tl d3 tl-sep">────────────────</p>
                {terminal.map((row, i) => (
                  <p key={row.key} className={`tl d${i + 4}`}>
                    <span className="tl-key">{row.key.padEnd(7)}</span> {row.value}
                  </p>
                ))}
                <p className={`tl d${terminal.length + 4}`}>
                  <span className="tl-prompt">❯</span> <span className="cursor-blink">█</span>
                </p>
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
          <div key={s.labelKey} className="stat-item">
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

      {/* ── Tech stack ──────────────────────────────── */}
      {/* 以前是無限捲動的跑馬燈，每項配一個彩色菱形 —— 畫面永遠在動，
          反而沒人會停下來看。改成靜態的一列標籤，掃一眼就讀完。 */}
      <div className="home-stack">
        <span className="home-stack-label">{t('home.stack')}</span>
        <div className="tags">
          {ticker.map(item => <span key={item.label} className="tag">{item.label}</span>)}
        </div>
      </div>

    </div>
  )
}
