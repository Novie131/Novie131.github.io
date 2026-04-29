import '../styles/Credentials.css'

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

export default function Credentials() {
  return (
    <div className="page credentials">

      <header className="cred-header">
        <p className="cred-prompt">~/creds $ cat resume.json | jq '.credentials'</p>
        <h1>Credentials</h1>
        <p className="cred-desc">
          持續學習的足跡 — 認證、專業課程與自學紀錄。
        </p>
      </header>

      {/* ── Certifications ─────────────────────────── */}
      <section className="cred-section">
        <h2 className="cred-section-title">
          <span className="tc-purple">// </span>certifications
          <span className="cred-count">{certifications.length}</span>
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

      {/* ── Courses ────────────────────────────────── */}
      <section className="cred-section">
        <h2 className="cred-section-title">
          <span className="tc-purple">// </span>courses &amp; training
          <span className="cred-count">{courses.length}</span>
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
