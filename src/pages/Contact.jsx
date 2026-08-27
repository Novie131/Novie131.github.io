import { useLang } from '../context/LangContext'
import contact from '../content/contact.json'
import '../styles/Contact.css'

const { links, openToKeys } = contact

export default function Contact() {
  const { t } = useLang()
  return (
    <div className="page contact">
      <header className="contact-header">
        <p className="ct-prompt">~/contact $ cat links.json</p>
        <h1>{t('contact.title')}</h1>
        <p className="ct-desc">{t('contact.desc')}</p>
      </header>

      <div className="contact-body">

        {/* ── Link cards ─────────────────────────── */}
        <section className="links-grid">
          {links.map(link => {
            const isExternal = link.href?.startsWith('http')
            const Tag = link.href ? 'a' : 'div'
            return (
              <Tag
                key={link.id}
                className={`link-card color-${link.color}`}
                {...(link.href && {
                  href: link.href,
                  ...(isExternal && { target: '_blank', rel: 'noreferrer' }),
                })}
              >
                <div className="lc-icon">{link.icon}</div>
                <div className="lc-content">
                  <span className="lc-label">{link.label}</span>
                  <span className="lc-value">{link.value}</span>
                </div>
                {link.href && <span className="lc-arrow">→</span>}
              </Tag>
            )
          })}
        </section>

        {/* ── Open to ────────────────────────────── */}
        <section className="open-to">
          <h2 className="section-title">
            <span className="tc-purple">// </span>open_to
          </h2>
          <ul className="open-list">
            {openToKeys.map(key => (
              <li key={key}>
                <span className="tc-green">▸</span> {t(key)}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
