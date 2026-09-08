import { useLang } from '../context/LangContext'
import RichText from '../components/RichText'
import about from '../content/about.json'
import projects from '../content/projects.json'
import '../styles/About.css'

const { identity, sysInfo, palette, bio, timeline, stack } = about

/**
 * 技術 → 用過它的專案，直接從 projects.json 推導。
 *
 * 技術棧以前是一組自評百分比，跟作品集互相獨立 —— 於是宣稱了站上找不到證據的
 * 技術，又漏掉了真正用過的（例如 Nelo 的 Go）。改成從作品集推導之後，
 * 兩邊不可能對不起來，而且新增專案時這一區會自己更新。
 */
const USED_IN = projects.items.reduce((map, p) => {
  for (const tech of p.tech) (map[tech] ??= []).push(p.title)
  return map
}, {})

export default function About() {
  const { lang, t } = useLang()
  return (
    <div className="page about">
      <p className="about-term-header">~/about $ neofetch</p>

      <div className="neofetch-layout">

        {/* ── Left: System Info ─────────────────── */}
        <aside className="sysinfo-panel">
          <div className="si-identity">
            <span className="si-name">{identity.name}</span>
            <span className="si-role">{identity.role[lang]}</span>
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

        {/* ── Right: Bio + Stack ────────────────── */}
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

          <section className="stack-section">
            <h2 className="section-title">
              <span className="tc-purple">// </span>stack
            </h2>
            <p className="stack-note">{t('stack.note')}</p>

            <div className="stack-groups">
              {stack.map(group => (
                <div key={group.id} className="stack-group">
                  <h3 className="stack-group-title">{group.label[lang]}</h3>
                  <ul className="stack-list">
                    {group.tech.map(tech => (
                      <li key={tech} className="stack-item">
                        <span className="stack-tech">{tech}</span>
                        <span className="stack-where">
                          {USED_IN[tech]
                            ? USED_IN[tech].join(' · ')
                            : <em className="stack-none">{t('stack.none')}</em>}
                        </span>
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
