import { useLang } from '../context/LangContext'
import '../styles/About.css'

const sysInfo = [
  { labelKey: 'si.name',     value: 'Kai-Tse Cheng',      cls: 'tc-cyan'   },
  { labelKey: 'si.role',     valueKey: 'si.role.val',      cls: 'tc-purple' },
  { labelKey: 'si.os',       value: 'Windows / macOS',     cls: null        },
  { labelKey: 'si.shell',    value: 'bash / zsh',          cls: null        },
  { labelKey: 'si.editor',   value: 'VS Code · Neovim',   cls: null        },
  { labelKey: 'si.uptime',   valueKey: 'si.uptime.val',    cls: 'tc-amber'  },
  { labelKey: 'si.location', value: 'Taiwan',              cls: null        },
  { labelKey: 'si.focus',    value: 'LLM · RAG · DevOps', cls: 'tc-green'  },
]

const skills = [
  {
    category: 'Frontend',
    categoryKey: 'skill.frontend',
    tag: '<UI/>',
    items: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript',      level: 82 },
      { name: 'Tailwind CSS',    level: 88 },
      { name: 'Vite',            level: 85 },
    ],
  },
  {
    category: 'Backend',
    categoryKey: 'skill.backend',
    tag: '{API}',
    items: [
      { name: 'Node.js',          level: 80 },
      { name: 'Python / FastAPI', level: 85 },
      { name: 'PostgreSQL',       level: 75 },
      { name: 'Redis',            level: 70 },
    ],
  },
  {
    category: 'AI / ML',
    tag: '[AI]',
    items: [
      { name: 'PyTorch',            level: 78 },
      { name: 'LangChain',          level: 82 },
      { name: 'Claude / OpenAI API',level: 90 },
      { name: 'RAG · VectorDB',     level: 80 },
    ],
  },
  {
    category: 'DevOps',
    tag: '$_',
    items: [
      { name: 'Docker',          level: 78 },
      { name: 'GitHub Actions',  level: 75 },
      { name: 'Linux',           level: 80 },
      { name: 'AWS / GCP',       level: 68 },
    ],
  },
]

const palette = ['#00e5ff','#a855f7','#00ff9f','#ff2d95','#fbbf24','#60a5fa','#34d399','#f472b6']

const bio = {
  zh: [
    <>我不是從教科書開始學程式的。最初只是想做一個「自己用起來會爽」的工具，結果一路從一個 script 寫到全端系統，從串 API 玩到訓練模型。</>,
    <>現在我最享受的狀態是：一個人從頭把一個想法做到能跑、能用、能給別人看。不管是 CLI 工具、Bot、還是有介面的 Web App — 我喜歡把整條鏈串起來的感覺。</>,
    <>對 <strong>LLM</strong> 和 <strong>AI Agent</strong> 特別著迷。不是因為它潮，而是因為它讓「一個人能做到的事」的上限變高了。我在探索怎麼把這個能力嵌進真實的工作流程裡。</>,
  ],
  en: [
    <>I didn&apos;t start coding from textbooks. I began just wanting to build tools that felt good to use, and ended up going from a single script to full-stack systems, from calling APIs to training models.</>,
    <>What I enjoy most: taking an idea solo from zero to something that runs, works, and can be shown to others. Whether it&apos;s a CLI tool, a bot, or a full web app — I love owning the entire chain.</>,
    <>I&apos;m particularly drawn to <strong>LLMs</strong> and <strong>AI Agents</strong>. Not because they&apos;re trendy, but because they raise the ceiling of what one person can build. I&apos;m exploring how to embed that capability into real workflows.</>,
  ],
}

const timeline = [
  {
    year: '2025/9',
    title: { zh: '臺中科技大學', en: 'NCUT' },
    sub:   { zh: '研究所',       en: 'Graduate School' },
    color: 'cyan',
    type: 'education',
  },
  {
    year: '2023/9',
    title: { zh: '臺中科技大學', en: 'NCUT' },
    sub:   { zh: '二技部',       en: "Bachelor's (Transfer)" },
    color: 'purple',
    type: 'education',
  },
  {
    year: '2023/7',
    title: { zh: '加入 Imac 社群', en: 'Joined Imac Community' },
    sub:   { zh: 'Imac',          en: 'Imac' },
    color: 'green',
    type: 'project',
  },
  {
    year: '2018/9',
    title: { zh: '臺中科技大學', en: 'NCUT' },
    sub:   { zh: '五專部',       en: '5-Year Associate Program' },
    color: 'amber',
    type: 'education',
  },
]

export default function About() {
  const { lang, t } = useLang()
  return (
    <div className="page about">
      <p className="about-term-header">~/about $ neofetch</p>

      <div className="neofetch-layout">

        {/* ── Left: System Info ─────────────────── */}
        <aside className="sysinfo-panel">
          <div className="si-username">
            <span className="tc-cyan si-user">Cheng KT</span>
            <span className="tc-dim">@</span>
            <span className="tc-text si-host">portfolio</span>
          </div>

          <div className="si-divider" />

          <dl className="si-table">
            {sysInfo.map(({ labelKey, value, valueKey, cls }) => (
              <div key={labelKey} className="si-row">
                <dt className="si-key tc-cyan">{t(labelKey)}</dt>
                <dd className={`si-val ${cls ?? ''}`}>{valueKey ? t(valueKey) : value}</dd>
              </div>
            ))}
          </dl>

          <div className="si-divider" />

          <div className="si-palette">
            {palette.map(c => (
              <span key={c} className="si-swatch" style={{ background: c }} />
            ))}
          </div>
        </aside>

        {/* ── Right: Bio + Skills ───────────────── */}
        <div className="about-main">
          <section className="about-bio">
            <h2 className="section-title">
              <span className="tc-purple">// </span>whoami
            </h2>
            {bio[lang].map((para, i) => <p key={i}>{para}</p>)}
          </section>

          <section className="timeline-section">
            <h2 className="section-title">
              <span className="tc-purple">// </span>timeline
            </h2>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div key={i} className={`tl-item tl-${item.color}`}>
                  <div className="tl-left">
                    <span className="tl-year">{item.year}</span>
                    <span className={`tl-type tl-type-${item.type}`}>{item.type}</span>
                  </div>
                  <div className="tl-line">
                    <div className="tl-dot" />
                    {i < timeline.length - 1 && <div className="tl-connector" />}
                  </div>
                  <div className="tl-content">
                    <h3 className="tl-title">{item.title[lang]}</h3>
                    <p className="tl-sub">{item.sub[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="skills-section">
            <h2 className="section-title">
              <span className="tc-purple">// </span>tech_stack.json
            </h2>
            <div className="skills-grid">
              {skills.map(group => (
                <div key={group.category} className="skill-group">
                  <div className="skill-group-header">
                    <span className="skill-tag">{group.tag}</span>
                    <h3>{group.categoryKey ? t(group.categoryKey) : group.category}</h3>
                  </div>
                  <ul className="skill-list">
                    {group.items.map((skill, i) => (
                      <li key={skill.name}>
                        <div className="skill-row">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-pct">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-fill"
                            style={{
                              '--level': `${skill.level}%`,
                              '--delay': `${i * 0.08 + 0.2}s`,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}
