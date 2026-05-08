import { useState } from 'react'
import { useLang } from '../context/LangContext'
import '../styles/Portfolio.css'

const projects = [
  {
    id: 1,
    slug: 'nelo',
    title: 'Nelo',
    category: 'AI / DevTools',
    featured: true,
    description: {
      zh: 'Go-based 跨平台 AI 上下文管理工具。自動掃描本地專案原始碼，透過中央 Hub 彙整後輸出，大幅優化 LLM prompt 的 codebase 輸入流程。',
      en: 'A cross-platform AI context manager built in Go. Automatically scans local project source code, aggregates it through a central Hub, and outputs optimized LLM prompt inputs.',
    },
    features: {
      zh: [
        '跨平台支援 — Raspberry Pi 4 / Linux / Windows',
        '自動掃描並合併專案 codebase，減少手動整理',
        'Web Dashboard 即時更新（前端 polling 架構）',
        'localStorage 狀態持久化，重整不遺失資料',
        'CLI 指令 nelo push，一鍵同步至 Hub',
      ],
      en: [
        'Cross-platform — Raspberry Pi 4 / Linux / Windows',
        'Auto-scans and merges codebase, eliminating manual cleanup',
        'Real-time Web Dashboard with frontend polling',
        'localStorage persistence across page reloads',
        'CLI command `nelo push` for one-click Hub sync',
      ],
    },
    tech: ['Go', 'JavaScript', 'HTML', 'Shell'],
    repoLink: 'https://github.com/Novie131/Nelo',
    demoLink: '#',
  },
  {
    id: 2,
    slug: 'google-linebot-adk',
    title: 'LINE AI Bot',
    category: 'AI / Bot',
    featured: false,
    description: {
      zh: '整合 Google ADK 與 Gemini 模型的 LINE 聊天機器人，支援 Function Calling 與繁體中文優化，可部署至 Docker / GCP Cloud Run。',
      en: 'A LINE chatbot integrating Google ADK and Gemini, supporting Function Calling and Traditional Chinese optimization. Deployable to Docker / GCP Cloud Run.',
    },
    features: {
      zh: [
        'Google Gemini AI 回應生成',
        'Function Calling 自訂工具擴充',
        'FastAPI 非同步架構',
      ],
      en: [
        'Google Gemini AI response generation',
        'Custom tool extension via Function Calling',
        'Async FastAPI architecture',
      ],
    },
    tech: ['Python', 'FastAPI', 'Google ADK', 'LINE API', 'Docker'],
    repoLink: 'https://github.com/Novie131/Google_linebot_adk',
    demoLink: '#',
  },
  {
    id: 3,
    slug: 'g-nest',
    title: 'G-Nest',
    category: 'Browser Extension',
    featured: false,
    description: {
      zh: '基於 Gemini API 的 Chrome 瀏覽器擴充功能，為日常瀏覽體驗注入 AI 輔助能力。',
      en: 'A Chrome extension powered by the Gemini API that injects AI-assisted capabilities into everyday browsing.',
    },
    features: {
      zh: [
        'Chrome Extension Manifest V3 架構',
        'Gemini API 整合與呼叫',
        '輕量化 CSS 樣式，零外部依賴',
      ],
      en: [
        'Chrome Extension Manifest V3 architecture',
        'Gemini API integration',
        'Lightweight CSS, zero external dependencies',
      ],
    },
    tech: ['JavaScript', 'CSS', 'Gemini API', 'Chrome API'],
    repoLink: 'https://github.com/Novie131/G-Nest',
    demoLink: '#',
  },
  {
    id: 4,
    slug: 'flask-chatgpt-telegram',
    title: 'ChatGPT Telegram Bot',
    category: 'Chatbot',
    featured: false,
    description: {
      zh: '以 Flask 串接 ChatGPT API 的 Telegram 機器人，快速部署至 Vercel serverless 平台，作為早期 AI 整合實作練習。',
      en: 'A Telegram bot connecting ChatGPT API via Flask, deployed to Vercel serverless — an early AI integration exercise.',
    },
    features: {
      zh: [
        'ChatGPT API 串接與回應處理',
        'Vercel serverless 一鍵部署',
        'Telegram Bot API 訊息收發',
      ],
      en: [
        'ChatGPT API integration and response handling',
        'One-click Vercel serverless deployment',
        'Telegram Bot API messaging',
      ],
    },
    tech: ['Python', 'Flask', 'OpenAI API', 'Vercel'],
    repoLink: 'https://github.com/Novie131/Flask-ChatGPT-TelegramBot-Vercel',
    demoLink: '#',
  },
]

const filters = ['All', 'AI', 'Bot', 'Extension']

export default function Portfolio() {
  const { lang, t } = useLang()
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? projects
    : projects.filter(p => p.category.includes(active))

  return (
    <div className="page portfolio">
      <header className="portfolio-header">
        <p className="port-term-prompt">~/projects $ ls -la --sort=stars</p>
        <h1>Selected Projects</h1>
        <p className="port-desc">{t('port.desc')}</p>
      </header>

      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn${active === f ? ' active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
        <span className="filter-count tc-dim">{visible.length} projects</span>
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

            <div className="card-content">
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description[lang]}</p>

              <ul className="project-features">
                {project.features[lang].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="card-footer">
                <a
                  href={project.repoLink}
                  className="project-link secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  [GitHub] →
                </a>
                {project.demoLink !== '#' && (
                  <a
                    href={project.demoLink}
                    className="project-link primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo →
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
