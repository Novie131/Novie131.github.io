import { useLang } from '../context/LangContext'
import '../styles/Contact.css'

const links = [
  {
    key: 'email',
    label: 'Email',
    value: 'Zkzcfg8520@gmail.com',
    href: null,
    icon: '✉',
    color: 'cyan',
  },
  {
    key: 'email2',
    label: 'Email (alt)',
    value: 'Ckt30014@gmail.com',
    href: null,
    icon: '✉',
    color: 'cyan',
  },
  {
    key: 'github',
    label: 'GitHub',
    value: 'github.com/Novie131',
    href: 'https://github.com/Novie131',
    icon: '⌥',
    color: 'purple',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/kai-tse-cheng',
    href: 'https://www.linkedin.com/in/kai-tse-cheng-ab266835b/',
    icon: '⊕',
    color: 'amber',
  },
  {
    key: 'location',
    label: 'Location',
    value: 'Taiwan 🇹🇼',
    href: 'https://www.google.com/maps/place/Taiwan/',
    icon: '◉',
    color: 'green',
  },
]

const openTo = [
  'Full-time opportunities',
  'Freelance projects',
  'AI / ML collaboration',
  'Open source contributions',
]

export default function Contact() {
  const { t } = useLang()
  return (
    <div className="page contact">
      <header className="contact-header">
        <p className="ct-prompt">~/contact $ cat links.json</p>
        <h1>Contact</h1>
        <p className="ct-desc">{t('contact.desc')}</p>
      </header>

      <div className="contact-body">

        {/* ── Link cards ─────────────────────────── */}
        <section className="links-grid">
          {links.map(link => {
            const isLink = link.href && link.href !== '#'
            const Tag = isLink ? 'a' : 'div'
            return (
              <Tag
                key={link.key}
                className={`link-card color-${link.color}`}
                {...(isLink && {
                  href: link.href,
                  target: link.href.startsWith('http') ? '_blank' : undefined,
                  rel: 'noreferrer',
                })}
              >
                <div className="lc-icon">{link.icon}</div>
                <div className="lc-content">
                  <span className="lc-label">{link.label}</span>
                  <span className="lc-value">{link.value}</span>
                </div>
                {isLink && <span className="lc-arrow">→</span>}
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
            {openTo.map(item => (
              <li key={item}>
                <span className="tc-green">▸</span> {item}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
