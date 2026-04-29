import '../styles/Contact.css'

const links = [
  {
    key: 'email',
    label: 'Email',
    value: 'Zkzcfg8520@gmail.com',
    href: 'mailto:Zkzcfg8520@gmail.com',
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
    value: 'linkedin.com/in/novie131',
    href: '#',
    icon: '⊕',
    color: 'amber',
  },
  {
    key: 'location',
    label: 'Location',
    value: 'Taiwan 🇹🇼',
    href: null,
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
  return (
    <div className="page contact">
      <header className="contact-header">
        <p className="ct-prompt">~/contact $ cat links.json</p>
        <h1>Contact</h1>
        <p className="ct-desc">
          有任何合作機會、技術交流或專案想法，歡迎隨時聯繫。
        </p>
      </header>

      <div className="contact-body">

        {/* ── Link cards ─────────────────────────── */}
        <section className="links-grid">
          {links.map(link => (
            <div key={link.key} className={`link-card color-${link.color}`}>
              <div className="lc-icon">{link.icon}</div>
              <div className="lc-content">
                <span className="lc-label">{link.label}</span>
                {link.href && link.href !== '#' ? (
                  <a
                    className="lc-value"
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="lc-value">{link.value}</span>
                )}
              </div>
              {link.href && link.href !== '#' && (
                <span className="lc-arrow">→</span>
              )}
            </div>
          ))}
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
