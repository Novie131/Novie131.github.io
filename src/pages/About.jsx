import { useLang } from '../context/LangContext'
import RichText from '../components/RichText'
import about from '../content/about.json'
import '../styles/About.css'

const { sysInfo, palette, bio, timeline, skills } = about

export default function About() {
  const { lang, t } = useLang()
  return (
    <div className="page about">
      <p className="about-term-header">~/about $ neofetch</p>

      <div className="neofetch-layout">

        {/* ── Left: System Info ─────────────────── */}
        <aside className="sysinfo-panel">
          <div className="si-username">
            <span className="tc-cyan si-user">Cheng KT</span>
            <span className="tc-dim">@</span>
            <span className="tc-text si-host">portfolio</span>
          </div>

          <div className="si-divider" />

          <dl className="si-table">
            {sysInfo.map(({ labelKey, value, valueKey, cls }) => (
              <div key={labelKey} className="si-row">
                <dt className="si-key tc-cyan">{t(labelKey)}</dt>
                <dd className={`si-val ${cls ?? ''}`}>{valueKey ? t(valueKey) : value}</dd>
              </div>
            ))}
          </dl>

          <div className="si-divider" />

          <div className="si-palette">
            {palette.map(c => (
              <span key={c} className="si-swatch" style={{ background: c }} />
            ))}
          </div>
        </aside>

        {/* ── Right: Bio + Skills ───────────────── */}
        <div className="about-main">
          <section className="about-bio">
            <h2 className="section-title">
              <span className="tc-purple">// </span>whoami
            </h2>
            {bio[lang].map((para, i) => <RichText key={i} text={para} />)}
          </section>

          <section className="timeline-section">
            <h2 className="section-title">
              <span className="tc-purple">// </span>timeline
            </h2>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div key={item.id} className={`tl-item tl-${item.color}`}>
                  <div className="tl-left">
                    <span className="tl-year">{item.year}</span>
                    <span className={`tl-type tl-type-${item.type}`}>{item.type}</span>
                  </div>
                  <div className="tl-line">
                    <div className="tl-dot" />
                    {i < timeline.length - 1 && <div className="tl-connector" />}
                  </div>
                  <div className="tl-content">
                    <h3 className="tl-title">{item.title[lang]}</h3>
                    <p className="tl-sub">{item.sub[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="skills-section">
            <h2 className="section-title">
              <span className="tc-purple">// </span>tech_stack.json
            </h2>
            <div className="skills-grid">
              {skills.map(group => (
                <div key={group.id} className="skill-group">
                  <div className="skill-group-header">
                    <span className="skill-tag">{group.tag}</span>
                    <h3>{group.categoryKey ? t(group.categoryKey) : group.category}</h3>
                  </div>
                  <ul className="skill-list">
                    {group.items.map((skill, i) => (
                      <li key={skill.name}>
                        <div className="skill-row">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-pct">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-fill"
                            style={{
                              '--level': `${skill.level}%`,
                              '--delay': `${i * 0.08 + 0.2}s`,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}
