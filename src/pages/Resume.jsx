import '../styles/Resume.css'

// ── 請替換為你的真實資料 ──────────────────────────────
const certifications = [
  {
    id: 1,
    title: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    date: '2024',
    credentialId: 'REPLACE-ID',
    link: '#',
    tag: 'GCP',
    color: 'amber',
  },
  {
    id: 2,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'REPLACE-ID',
    link: '#',
    tag: 'AWS',
    color: 'amber',
  },
  {
    id: 3,
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2023',
    credentialId: 'REPLACE-ID',
    link: '#',
    tag: 'ML',
    color: 'cyan',
  },
  {
    id: 4,
    title: 'Meta Back-End Developer Certificate',
    issuer: 'Meta / Coursera',
    date: '2023',
    credentialId: 'REPLACE-ID',
    link: '#',
    tag: 'Backend',
    color: 'purple',
  },
]

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

const courses = [
  {
    id: 1,
    title: 'Deep Learning Specialization',
    issuer: 'Coursera · DeepLearning.AI',
    date: '2024',
    modules: '5 courses',
    link: '#',
    color: 'purple',
  },
  {
    id: 2,
    title: 'LangChain for LLM Application Development',
    issuer: 'DeepLearning.AI',
    date: '2024',
    modules: 'Short course',
    link: '#',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Full Stack Open',
    issuer: 'University of Helsinki',
    date: '2023',
    modules: 'Parts 0–9',
    link: '#',
    color: 'cyan',
  },
  {
    id: 4,
    title: 'CS50: Introduction to Computer Science',
    issuer: 'Harvard / edX',
    date: '2022',
    modules: '11 weeks',
    link: '#',
    color: 'green',
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

export default function Resume() {
  return (
    <div className="page resume">

      <header className="resume-header">
        <p className="resume-prompt">~/resume $ cat resume.json | jq '.'</p>
        <h1>Resume</h1>
        <p className="resume-desc">
          認證、參賽紀錄與自學課程 — 持續學習的完整足跡。
        </p>
      </header>

      {/* ── Certifications ─────────────────────────── */}
      <section className="resume-section">
        <h2 className="resume-section-title">
          <span className="tc-purple">// </span>certifications
          <span className="resume-count">{certifications.length}</span>
        </h2>
        <div className="cert-grid">
          {certifications.map(cert => {
            const c = colorMap[cert.color]
            return (
              <div
                key={cert.id}
                className="cert-card"
                style={{ '--card-accent': c.accent, '--card-bg': c.bg, '--card-border': c.border }}
              >
                <div className="cert-tag">{cert.tag}</div>
                <div className="cert-body">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className="cert-meta">
                    <span className="cert-date">{cert.date}</span>
                    {cert.credentialId !== 'REPLACE-ID' && (
                      <span className="cert-id">ID: {cert.credentialId}</span>
                    )}
                  </div>
                </div>
                {cert.link !== '#' && (
                  <a href={cert.link} className="cert-link" target="_blank" rel="noreferrer">
                    verify →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Competitions ───────────────────────────── */}
      <section className="resume-section">
        <h2 className="resume-section-title">
          <span className="tc-purple">// </span>competitions
          <span className="resume-count">{competitions.length}</span>
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
                  {comp.description && comp.description !== 'REPLACE_DESCRIPTION' && (
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

      {/* ── Courses ────────────────────────────────── */}
      <section className="resume-section">
        <h2 className="resume-section-title">
          <span className="tc-purple">// </span>courses &amp; training
          <span className="resume-count">{courses.length}</span>
        </h2>
        <div className="course-list">
          {courses.map((course, i) => {
            const c = colorMap[course.color]
            return (
              <div
                key={course.id}
                className="course-row"
                style={{ '--card-accent': c.accent }}
              >
                <span className="course-num tc-dim">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="course-body">
                  <span className="course-title">{course.title}</span>
                  <span className="course-issuer">{course.issuer}</span>
                </div>
                <div className="course-right">
                  <span className="course-modules">{course.modules}</span>
                  <span className="course-date">{course.date}</span>
                </div>
                {course.link !== '#' && (
                  <a href={course.link} className="course-link" target="_blank" rel="noreferrer">→</a>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
