import { useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import projects from '../content/projects.json'
import Zoomable from '../components/Zoomable'
import '../styles/Resume.css'
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

      <section className="resume-section">
        <h2 className="section-title">
          {t('port.section')}
          <span className="resume-count">{visible.length} {t('port.count')}</span>
        </h2>

        <nav className="resume-toc filter-bar" aria-label={t('port.title')}>
          {filters.map(key => (
            <button
              key={key}
              className={`toc-chip${active === key ? ' active' : ''}`}
              aria-pressed={active === key}
              onClick={() => setActive(key)}
            >
              {key === 'All' ? t('port.filter.all') : key}
            </button>
          ))}
        </nav>

        <div className="exp-list project-list">
          {visible.map(project => (
            <article
              key={project.id}
              className={`exp-card project-card${project.featured ? ' featured' : ''}`}
            >
              <Zoomable src={project.image} alt={project.title} closeLabel={t('zoom.close')} />
              <p className="exp-org">{project.category}</p>
              <h3 className="exp-title">{project.title}</h3>
              <p className="exp-summary">{project.description[lang]}</p>

              <ul className="exp-highlights">
                {project.features[lang].map((f, i) => <li key={i}>{f}</li>)}
              </ul>

              <div className="tags rs-tags">
                {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
              </div>

              {(project.repoLink || project.demoLink) && (
                <div className="project-links">
                  {project.repoLink && (
                    <a href={project.repoLink} className="project-link secondary" target="_blank" rel="noreferrer">
                      {t('port.github')}
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} className="project-link primary" target="_blank" rel="noreferrer">
                      {t('port.demo')}
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
