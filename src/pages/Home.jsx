import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import home from '../content/home.json'
import resume from '../content/resume.json'
import projects from '../content/projects.json'
import '../styles/Home.css'

const { avatar, stats, ticker, highlights, featured, pokemon } = home

/* 證照徽章直接讀 resume.json，只取有 Credly 驗證連結的，兩邊不用各維護一份 */
const verifiedCerts = resume.certifications.filter(c => c.badge && c.link)

/* 依 home.json 的順序挑專案；id 打錯或專案被刪時直接略過 */
const featuredProjects = featured
  .map(id => projects.items.find(p => p.id === id))
  .filter(Boolean)

const BUBBLES = [1, 2, 3, 4, 5, 6]

const BW_SPRITE = id =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`

export default function Home() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  /* 寶可夢區塊只在 pokemon 主題渲染 —— 過去它永遠在 DOM 裡但被 CSS 藏起來，
     瀏覽器仍會去 raw.githubusercontent.com 抓 6 張看不見的 GIF。 */
  const showPokemon = theme === 'pokemon'

  return (
    <div className="page home">

      {/* ── Hero ────────────────────────────────────── */}
      {/* 以前右欄是 neofetch 終端機，跟 120px 的小頭像搶視線，又沒傳達任何價值。
          現在頭像放大當唯一主視覺，左欄用一句標語講清楚在做什麼。 */}
      <div className="home-grid">

        <section className="hero-col">
          <span className="hero-badge">{t('home.badge')}</span>

          <h1 className="hero-title">
            <span className="hero-prompt">$ whoami</span>
            <span className="hero-name">Cheng KT</span>
          </h1>

          <p className="hero-tagline">
            {t('home.tagline.pre')}<em>{t('home.tagline.em')}</em>
          </p>

          <p className="hero-sub">{t('home.sub')}</p>

          <div className="hero-actions">
            <Link to="/portfolio" className="btn btn-primary">
              {t('home.btn.projects')} <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-outline">{t('home.btn.about')}</Link>
          </div>
        </section>

        {!showPokemon && (
          <section className="hero-visual" aria-hidden>
            <div className="hero-orbit" />
            <div className="hero-avatar">
              <img
                src={avatar}
                alt=""
                width="256"
                height="256"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            {BUBBLES.map(n => <span key={n} className={`bubble bubble-${n}`} />)}
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

      {/* ── Highlights ──────────────────────────────── */}
      {/* 最有說服力的成績原本都藏在履歷頁，首頁一個都看不到 */}
      <section className="home-block">
        <h2 className="home-block-label">{t('home.proof')}</h2>
        <div className="proof-grid">
          {highlights.map(h => (
            <Link key={h.label} to={h.href} className="proof-card">
              <span className="proof-label">{h.label}</span>
              <span className="proof-text">{h.text[lang]}</span>
            </Link>
          ))}

          {verifiedCerts.length > 0 && (
            <div className="proof-card proof-certs">
              <span className="proof-label">{t('home.proof.certs')}</span>
              <div className="proof-badges">
                {verifiedCerts.map(c => (
                  <a
                    key={c.id}
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="proof-badge"
                    title={c.title}
                  >
                    <img src={c.badge} alt={c.title} width="56" height="56" loading="lazy" decoding="async" />
                    <span>{c.issuer}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured projects ───────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="home-block">
          <div className="home-block-head">
            <h2 className="home-block-label">{t('home.featured')}</h2>
            <Link to="/portfolio" className="home-block-more">{t('home.featured.all')}</Link>
          </div>
          <div className="feat-grid">
            {featuredProjects.map(p => {
              const Card = p.repoLink ? 'a' : Link
              const linkProps = p.repoLink
                ? { href: p.repoLink, target: '_blank', rel: 'noreferrer' }
                : { to: '/portfolio' }
              return (
                <Card key={p.id} className="feat-card" {...linkProps}>
                  <span className="feat-category">{p.category}</span>
                  <h3 className="feat-title">{p.title}</h3>
                  <p className="feat-desc">{p.description[lang]}</p>
                  <div className="tags feat-tech">
                    {p.tech.slice(0, 4).map(tech => <span key={tech} className="tag">{tech}</span>)}
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}

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
