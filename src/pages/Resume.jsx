import { useLang } from '../context/LangContext'
import resume from '../content/resume.json'
import '../styles/Resume.css'

const { certifications, competitions, courses } = resume

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

/* 空陣列就整個 section 不渲染 — 沒有資料的區塊不該留下空殼 */
function Section({ title, count, children }) {
  if (!count) return null
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <span className="tc-purple">// </span>{title}
        <span className="resume-count">{count}</span>
      </h2>
      {children}
    </section>
  )
}

export default function Resume() {
  const { t } = useLang()
  return (
    <div className="page resume">

      <header className="resume-header">
        <p className="resume-prompt">~/resume $ cat resume.json | jq '.'</p>
        <h1>{t('resume.title')}</h1>
        <p className="resume-desc">{t('resume.desc')}</p>
      </header>

      <Section title="certifications" count={certifications.length}>
        <div className="cert-grid">
          {certifications.map(cert => (
            <div key={cert.id} className="cert-card" style={cardVars(cert.color)}>
              <div className="cert-tag">{cert.tag}</div>
              <div className="cert-body">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-meta">
                  <span className="cert-date">{cert.date}</span>
                  {cert.credentialId && <span className="cert-id">ID: {cert.credentialId}</span>}
                </div>
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

      <Section title="competitions" count={competitions.length}>
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

      <Section title="courses & training" count={courses.length}>
        <div className="course-list">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className="course-row"
              style={{ '--card-accent': (colorMap[course.color] ?? colorMap.cyan).accent }}
            >
              <span className="course-num tc-dim">{String(i + 1).padStart(2, '0')}</span>
              <div className="course-body">
                <span className="course-title">{course.title}</span>
                <span className="course-issuer">{course.issuer}</span>
              </div>
              <div className="course-right">
                <span className="course-modules">{course.modules}</span>
                <span className="course-date">{course.date}</span>
              </div>
              {course.link && (
                <a href={course.link} className="course-link" target="_blank" rel="noreferrer">→</a>
              )}
            </div>
          ))}
        </div>
      </Section>

    </div>
  )
}
