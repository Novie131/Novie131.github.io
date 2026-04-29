import '../styles/About.css'

const sysInfo = [
  { key: 'Name',     value: 'Novie131',           cls: 'tc-cyan'   },
  { key: 'Role',     value: 'Full-Stack · AI Eng', cls: 'tc-purple' },
  { key: 'OS',       value: 'Windows / macOS',     cls: null        },
  { key: 'Shell',    value: 'bash / zsh',           cls: null        },
  { key: 'Editor',   value: 'VS Code · Neovim',    cls: null        },
  { key: 'Uptime',   value: '3+ years',            cls: 'tc-amber'  },
  { key: 'Location', value: 'Taiwan',              cls: null        },
  { key: 'Focus',    value: 'LLM · RAG · DevOps',  cls: 'tc-green'  },
]

const skills = [
  {
    category: 'Frontend',
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

const timeline = [
  {
    year: '2025/9',
    title: '臺中科技大學',
    sub: '研究所',
    desc: '',
    color: 'cyan',
    type: 'education',
  },
  {
    year: '2023/9',
    title: '臺中科技大學',
    sub: '二技部',
    desc: '',
    color: 'purple',
    type: 'education',
  },
  {
    year: '2023/7',
    title: '加入 Imac 社群',
    sub: 'Imac',
    desc: '',
    color: 'green',
    type: 'project',
  },
  {
    year: '2018/9',
    title: '臺中科技大學',
    sub: '五專部',
    desc: '',
    color: 'amber',
    type: 'education',
  },
]

export default function About() {
  return (
    <div className="page about">
      <p className="about-term-header">~/about $ neofetch</p>

      <div className="neofetch-layout">

        {/* ── Left: System Info ─────────────────── */}
        <aside className="sysinfo-panel">
          <div className="si-username">
            <span className="tc-cyan si-user">novie131</span>
            <span className="tc-dim">@</span>
            <span className="tc-text si-host">portfolio</span>
          </div>

          <div className="si-divider" />

          <dl className="si-table">
            {sysInfo.map(({ key, value, cls }) => (
              <div key={key} className="si-row">
                <dt className="si-key tc-cyan">{key}</dt>
                <dd className={`si-val ${cls ?? ''}`}>{value}</dd>
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
            <p>
              我不是從教科書開始學程式的。最初只是想做一個「自己用起來會爽」的工具，
              結果一路從一個 script 寫到全端系統，從串 API 玩到訓練模型。
            </p>
            <p>
              現在我最享受的狀態是：一個人從頭把一個想法做到能跑、能用、能給別人看。
              不管是 CLI 工具、Bot、還是有介面的 Web App — 我喜歡把整條鏈串起來的感覺。
            </p>
            <p>
              對 <strong>LLM</strong> 和 <strong>AI Agent</strong> 特別著迷。
              不是因為它潮，而是因為它讓「一個人能做到的事」的上限變高了。
              我在探索怎麼把這個能力嵌進真實的工作流程裡。
            </p>
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
                    <h3 className="tl-title">{item.title}</h3>
                    <p className="tl-sub">{item.sub}</p>
                    {item.desc && <p className="tl-desc">{item.desc}</p>}
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
                    <h3>{group.category}</h3>
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
