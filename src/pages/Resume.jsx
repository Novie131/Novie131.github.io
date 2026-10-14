import { useLang } from '../context/LangContext'
import resume from '../content/resume.json'
import '../styles/Resume.css'

const {
  education = [], experience = [], publications = [], certifications = [],
  competitions = [], community = [], writing = [], courses = [], events = [],
} = resume

const colorMap = {
  cyan:   { accent: '#00e5ff', bg: 'rgba(0,229,255,0.1)',    border: 'rgba(0,229,255,0.25)'   },
  purple: { accent: '#a855f7', bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.25)'  },
  amber:  { accent: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.25)'  },
  green:  { accent: '#00ff9f', bg: 'rgba(0,255,159,0.1)',    border: 'rgba(0,255,159,0.25)'   },
  pink:   { accent: '#ff2d95', bg: 'rgba(255,45,149,0.1)',   border: 'rgba(255,45,149,0.25)'  },
}

const cardVars = color => {
  const c = colorMap[color] ?? colorMap.cyan
  return { '--card-accent': c.accent, '--card-bg': c.bg, '--card-border': c.border }
}

/* 欄位可以是純字串（專有名詞不翻譯）或 { zh, en } —— 兩種都吃 */
const pick = (v, lang) => (v && typeof v === 'object' ? v[lang] : v)

/* 區塊順序同時決定頁首導覽的順序；空陣列的區塊連同導覽項目一起消失 */
const SECTIONS = [
  ['education', education],
  ['experience', experience],
  ['publications', publications],
  ['certifications', certifications],
  ['competitions', competitions],
  ['community', community],
  ['writing', writing],
  ['courses', courses],
  ['events', events],
].filter(([, list]) => list.length)

/* 空陣列就整個 section 不渲染 — 沒有資料的區塊不該留下空殼 */
function Section({ id, title, count, children }) {
  if (!count) return null
  return (
    <section className="resume-section" id={id}>
      <h2 className="resume-section-title">
        <span className="tc-purple">// </span>{title}
        <span className="resume-count">{count}</span>
      </h2>
      {children}
    </section>
  )
}

function Tags({ list }) {
  if (!list?.length) return null
  return (
    <div className="rs-tags">
      {list.map(tag => <span key={tag} className="rs-tag">{tag}</span>)}
    </div>
  )
}

export default function Resume() {
  const { lang, t } = useLang()
  const title = key => t(`resume.sec.${key}`)
  return (
    <div className="page resume">

      <header className="resume-header">
        <p className="resume-prompt">~/resume $ cat resume.json | jq '.'</p>
        <h1>{t('resume.title')}</h1>
        <p className="resume-desc">{t('resume.desc')}</p>
        <nav className="resume-toc" aria-label={t('resume.title')}>
          {SECTIONS.map(([key]) => (
            <a key={key} href={`#${key}`} className="toc-chip">{title(key)}</a>
          ))}
        </nav>
      </header>

      <Section id="education" title={title('education')} count={education.length}>
        <div className="edu-list">
          {education.map(edu => (
            <div key={edu.id} className="edu-row" style={cardVars(edu.color)}>
              <span className="edu-period">{edu.period}</span>
              <div className="edu-body">
                <h3 className="edu-degree">{pick(edu.degree, lang)}</h3>
                <p className="edu-school">{pick(edu.school, lang)}</p>
                {edu.note && <p className="edu-note">{pick(edu.note, lang)}</p>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title={title('experience')} count={experience.length}>
        <div className="exp-list">
          {experience.map(exp => (
            <article key={exp.id} className="exp-card" style={cardVars(exp.color)}>
              <p className="exp-org">{pick(exp.org, lang)}</p>
              <h3 className="exp-title">{pick(exp.title, lang)}</h3>
              {exp.roles && <p className="exp-roles">{pick(exp.roles, lang)}</p>}
              <p className="exp-summary">{pick(exp.summary, lang)}</p>
              {exp.highlights?.[lang]?.length > 0 && (
                <ul className="exp-highlights">
                  {exp.highlights[lang].map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
              <Tags list={exp.tech} />
            </article>
          ))}
        </div>
      </Section>

      <Section id="publications" title={title('publications')} count={publications.length}>
        <div className="pub-list">
          {publications.map(pub => (
            <article key={pub.id} className="pub-card" style={cardVars(pub.color)}>
              <span className="pub-scope">{pick(pub.scope, lang)}</span>
              <h3 className="pub-title">{pick(pub.title, lang)}</h3>
              <p className="pub-venue">{pick(pub.venue, lang)}</p>
              {pub.meta && <p className="pub-meta">{pick(pub.meta, lang)}</p>}
              {pub.summary && <p className="pub-summary">{pick(pub.summary, lang)}</p>}
            </article>
          ))}
        </div>
      </Section>

      <Section id="certifications" title={title('certifications')} count={certifications.length}>
        <div className="cert-grid">
          {certifications.map(cert => (
            <div key={cert.id} className="cert-card" style={cardVars(cert.color)}>
              <div className="cert-tag">{cert.tag}</div>
              <div className="cert-body">
                <h3 className="cert-title">{pick(cert.title, lang)}</h3>
                <p className="cert-issuer">{pick(cert.issuer, lang)}</p>
                {(cert.date || cert.credentialId) && (
                  <div className="cert-meta">
                    {cert.date && <span className="cert-date">{cert.date}</span>}
                    {cert.credentialId && <span className="cert-id">ID: {cert.credentialId}</span>}
                  </div>
                )}
              </div>
              {cert.link && (
                <a href={cert.link} className="cert-link" target="_blank" rel="noreferrer">
                  {t('resume.verify')}
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="competitions" title={title('competitions')} count={competitions.length}>
        <div className="comp-grid">
          {competitions.map(comp => (
            <div key={comp.id} className="comp-card" style={cardVars(comp.color)}>
              <div className="comp-card-top">
                <div className="comp-award">{comp.award}</div>
                <span className="comp-date">{comp.date}</span>
              </div>
              <div className="comp-card-body">
                <h3 className="comp-title">{comp.title}</h3>
                <p className="comp-event">{comp.event}</p>
                <p className="comp-organizer">{comp.organizer}</p>
                {comp.description && <p className="comp-desc-text">{comp.description}</p>}
              </div>
              {comp.link && (
                <a href={comp.link} className="comp-link" target="_blank" rel="noreferrer">
                  {t('comp.view')}
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="community" title={title('community')} count={community.length}>
        <div className="comm-list">
          {community.map(item => (
            <div key={item.id} className="comm-row" style={cardVars(item.color)}>
              <span className="comm-period">{item.period}</span>
              <div className="comm-body">
                <h3 className="comm-title">{pick(item.title, lang)}</h3>
                <p className="comm-desc">{pick(item.desc, lang)}</p>
                <Tags list={item.tech} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="writing" title={title('writing')} count={writing.length}>
        <div className="write-grid">
          {writing.map(w => {
            const Tag = w.link ? 'a' : 'div'
            return (
              <Tag
                key={w.id}
                className="write-card"
                {...(w.link && { href: w.link, target: '_blank', rel: 'noreferrer' })}
              >
                <div className="write-top">
                  <span className="write-event">{pick(w.event, lang)}</span>
                  {w.count && <span className="write-count">{w.count} {t('resume.articles')}</span>}
                </div>
                <h3 className="write-title">{pick(w.title, lang)}</h3>
                <p className="write-desc">{pick(w.desc, lang)}</p>
                <Tags list={w.tech} />
              </Tag>
            )
          })}
        </div>
      </Section>

      <Section id="courses" title={title('courses')} count={courses.length}>
        <div className="course-list">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className="course-row"
              style={{ '--card-accent': (colorMap[course.color] ?? colorMap.cyan).accent }}
            >
              <span className="course-num tc-dim">{String(i + 1).padStart(2, '0')}</span>
              <div className="course-body">
                <span className="course-title">{pick(course.title, lang)}</span>
                <span className="course-issuer">{course.issuer}</span>
              </div>
              {(course.modules || course.date) && (
                <div className="course-right">
                  {course.modules && <span className="course-modules">{course.modules}</span>}
                  {course.date && <span className="course-date">{course.date}</span>}
                </div>
              )}
              {course.link && (
                <a href={course.link} className="course-link" target="_blank" rel="noreferrer">→</a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="events" title={title('events')} count={events.length}>
        <ul className="event-list">
          {events.map(ev => (
            <li key={ev.id} className="event-row">
              <span className="event-name">{pick(ev.name, lang)}</span>
              {ev.date && <span className="event-date">{ev.date}</span>}
            </li>
          ))}
        </ul>
      </Section>

    </div>
  )
}
