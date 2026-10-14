import { useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import projects from '../content/projects.json'
import '../styles/Portfolio.css'

const { items, filters } = projects

export default function Portfolio() {
  const { lang, t } = useLang()
  /* 篩選放在網址（?filter=AI），導覽列的子選單才能直接帶著篩選進來 */
  const [params, setParams] = useSearchParams()
  const active = filters.includes(params.get('filter')) ? params.get('filter') : 'All'
  const setActive = key => setParams(key === 'All' ? {} : { filter: key }, { replace: true })

  const visible = active === 'All'
    ? items
    : items.filter(p => p.category.includes(active))

  return (
    <div className="page portfolio">
      <header className="page-header">
        <p className="page-eyebrow">~/projects</p>
        <h1>{t('port.title')}</h1>
        <p className="page-desc">{t('port.desc')}</p>
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
              <p className="card-category">{project.category}</p>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description[lang]}</p>

              <ul className="project-features">
                {project.features[lang].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <div className="tags project-tech">
                {project.tech.map(tech => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>

              {(project.repoLink || project.demoLink) && (
              <div className="card-footer">
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    className="project-link secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('port.github')}
                  </a>
                )}
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
