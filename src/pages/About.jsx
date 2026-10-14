import { useLang } from '../context/LangContext'
import RichText from '../components/RichText'
import about from '../content/about.json'
import projects from '../content/projects.json'
import resume from '../content/resume.json'
import '../styles/About.css'

const { identity, sysInfo, bio, timeline, stack } = about

/**
 * 技術 → 用過它的專案，直接從 projects.json 與 resume.json 的產學經歷推導。
 *
 * 技術棧以前是一組自評百分比，跟作品集互相獨立 —— 於是宣稱了站上找不到證據的
 * 技術，又漏掉了真正用過的（例如 Nelo 的 Go）。改成從作品推導之後，
 * 兩邊不可能對不起來，而且新增專案時這一區會自己更新。
 * 同一個平台拆成多個子專案時（SYSBrain）共用 short 名稱，這裡去重。
 */
const USED_IN = [
  ...projects.items.map(p => ({ name: p.title, tech: p.tech })),
  ...(resume.experience ?? []).map(e => ({ name: e.short, tech: e.tech })),
].reduce((map, { name, tech }) => {
  for (const t of tech) {
    const list = (map[t] ??= [])
    if (!list.includes(name)) list.push(name)
  }
  return map
}, {})

/* 熱門技術（Python、Docker）會列出六、七個專案，整列變成一大段灰字。
   只顯示前三個，其餘收成 +N，完整清單放在 title 讓滑鼠停留時看得到。 */
const USED_IN_MAX = 3

function UsedIn({ list, none }) {
  if (!list) return <span className="stack-where"><em className="stack-none">{none}</em></span>
  const extra = list.length - USED_IN_MAX
  return (
    <span className="stack-where" title={extra > 0 ? list.join(' · ') : undefined}>
      {list.slice(0, USED_IN_MAX).join(' · ')}
      {extra > 0 && <span className="stack-more"> +{extra}</span>}
    </span>
  )
}

export default function About() {
  const { lang, t } = useLang()
  return (
    <div className="page about">
      <header className="page-header">
        <p className="page-eyebrow">~/about</p>
        <h1>{t('about.title')}</h1>
      </header>

      <div className="neofetch-layout">

        {/* ── Left: System Info ─────────────────── */}
        <aside className="sysinfo-panel">
          <div className="si-identity">
            <span className="si-name">{identity.name}</span>
            <span className="si-role">{identity.role[lang]}</span>
          </div>

          <div className="si-divider" />

          <dl className="si-table">
            {sysInfo.map(({ labelKey, value, valueKey }) => (
              <div key={labelKey} className="si-row">
                <dt className="si-key">{t(labelKey)}</dt>
                <dd className="si-val">{valueKey ? t(valueKey) : value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        {/* ── Right: Bio + Stack ────────────────── */}
        <div className="about-main">
          <section className="about-bio">
            <h2 className="section-title">
              {t('about.bio')}
            </h2>
            {bio[lang].map((para, i) => <RichText key={i} text={para} />)}
          </section>

          <section className="timeline-section">
            <h2 className="section-title">
              {t('about.timeline')}
            </h2>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div key={item.id} className="tl-item">
                  <div className="tl-left">
                    <span className="tl-year">{item.year}</span>
                    <span className="tl-type">{item.type}</span>
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
              {t('about.stack')}
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
                        <UsedIn list={USED_IN[tech]} none={t('stack.none')} />
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
