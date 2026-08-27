import { useState } from 'react'
import { useLang } from '../context/LangContext'
import projects from '../content/projects.json'
import '../styles/Portfolio.css'

const { items, filters } = projects

export default function Portfolio() {
  const { lang, t } = useLang()
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? items
    : items.filter(p => p.category.includes(active))

  return (
    <div className="page portfolio">
      <header className="portfolio-header">
        <p className="port-term-prompt">~/projects $ ls -la --sort=stars</p>
        <h1>{t('port.title')}</h1>
        <p className="port-desc">{t('port.desc')}</p>
      </header>

      <div className="filter-bar">
        {filters.map(key => (
          <button
            key={key}
            className={`filter-btn${active === key ? ' active' : ''}`}
            onClick={() => setActive(key)}
          >
            {key === 'All' ? t('port.filter.all') : key}
          </button>
        ))}
        <span className="filter-count tc-dim">{visible.length} {t('port.count')}</span>
      </div>

      <div className="project-grid">
        {visible.map(project => (
          <div
            key={project.id}
            className={`project-card${project.featured ? ' featured' : ''}`}
          >
            <div className="card-titlebar">
              <div className="tb-dots">
                <span className="tb-dot" style={{ background: '#ff5f57' }} />
                <span className="tb-dot" style={{ background: '#febc2e' }} />
                <span className="tb-dot" style={{ background: '#28c840' }} />
              </div>
              <span className="tb-path">~/projects/{project.slug}</span>
              <span className="card-category">{project.category}</span>
            </div>

            {project.image && (
              <img
                className="card-image"
                src={project.image}
                alt={project.title}
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="card-content">
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description[lang]}</p>

              <ul className="project-features">
                {project.features[lang].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <div className="project-tech">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="card-footer">
                <a
                  href={project.repoLink}
                  className="project-link secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('port.github')}
                </a>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    className="project-link primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('port.demo')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
