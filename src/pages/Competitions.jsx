import '../styles/Competitions.css'

// ── 請替換為你的真實資料 ──────────────────────────────
const competitions = [
  {
    id: 1,
    title: 'REPLACE_COMPETITION_NAME',
    event: 'REPLACE_EVENT',
    organizer: 'REPLACE_ORGANIZER',
    date: '2024',
    award: 'REPLACE_AWARD',
    description: 'REPLACE_DESCRIPTION',
    link: '#',
    color: 'pink',
  },
]
// ─────────────────────────────────────────────────────

const colorMap = {
  cyan:   { accent: '#00e5ff', bg: 'rgba(0,229,255,0.1)',    border: 'rgba(0,229,255,0.25)'   },
  purple: { accent: '#a855f7', bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.25)'  },
  amber:  { accent: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.25)'  },
  green:  { accent: '#00ff9f', bg: 'rgba(0,255,159,0.1)',    border: 'rgba(0,255,159,0.25)'   },
  pink:   { accent: '#ff2d95', bg: 'rgba(255,45,149,0.1)',   border: 'rgba(255,45,149,0.25)'  },
}

export default function Competitions() {
  return (
    <div className="page competitions">

      <header className="comp-header">
        <p className="comp-prompt">~/comps $ cat history.json | jq '.competitions'</p>
        <h1>Competitions</h1>
        <p className="comp-desc">
          參賽足跡 — 競賽、黑客松與挑戰賽紀錄。
        </p>
      </header>

      <section className="comp-section">
        <h2 className="comp-section-title">
          <span className="tc-purple">// </span>competition history
          <span className="comp-count">{competitions.length}</span>
        </h2>

        <div className="comp-grid">
          {competitions.map(comp => {
            const c = colorMap[comp.color]
            return (
              <div
                key={comp.id}
                className="comp-card"
                style={{ '--card-accent': c.accent, '--card-bg': c.bg, '--card-border': c.border }}
              >
                <div className="comp-card-top">
                  <div className="comp-award">{comp.award}</div>
                  <span className="comp-date">{comp.date}</span>
                </div>
                <div className="comp-card-body">
                  <h3 className="comp-title">{comp.title}</h3>
                  <p className="comp-event">{comp.event}</p>
                  <p className="comp-organizer">{comp.organizer}</p>
                  {comp.description && (
                    <p className="comp-desc-text">{comp.description}</p>
                  )}
                </div>
                {comp.link !== '#' && (
                  <a href={comp.link} className="comp-link" target="_blank" rel="noreferrer">
                    view →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
