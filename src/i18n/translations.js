const translations = {
  zh: {
    // Nav links
    'nav.home':     '~/首頁',
    'nav.about':    '~/關於',
    'nav.projects': '~/作品集',
    'nav.resume':   '~/履歷',
    'nav.contact':  '~/聯絡',

    'theme.cyber.label':     '未來科技',
    'theme.cyber.desc':      'Cyberpunk',
    'theme.pokemon.label':   '像素寶可夢',
    'theme.pokemon.desc':    'Pixel RPG',
    'theme.corporate.label': '企業正經版',
    'theme.corporate.desc':  'Corporate',
    'theme.blog.label':      '個人部落格',
    'theme.blog.desc':       'Blog',

    'panel.style': 'STYLE',
    'panel.lang':  'LANG',
    'lang.zh':     '繁體中文',
    'lang.en':     'English',

    // Home
    'home.badge':          'FULL-STACK · AI 工程師',
    'home.sub':            '打造系統 · 訓練模型 · 交付產品',
    'home.btn.projects':   './查看作品集',
    'home.btn.about':      'cat about.md',
    'stat.years':          '年資歷',
    'stat.projects':       '上線作品',
    'stat.stack':          '技術棧',
    'stat.commits':        '程式提交',

    // Portfolio
    'port.title':          '精選作品',
    'port.filter.all':     '全部',
    'port.count':          '個作品',
    'port.github':         '[GitHub] →',
    'port.demo':           'Live Demo →',
    'port.desc':           '從 Go CLI 工具、AI Bot 到 Chrome Extension，以下專案涵蓋全端開發、LLM 整合與雲端部署的完整實作能力。',

    // Contact
    'contact.title':       '聯絡',
    'contact.desc':        '有任何合作機會、技術交流或專案想法，歡迎隨時聯繫。',
    'open.fulltime':       '全職工作機會',
    'open.freelance':      '接案合作',
    'open.aiml':           'AI / ML 技術合作',
    'open.oss':            '開源貢獻',

    // Resume
    'resume.title':        '履歷',
    'resume.desc':         '認證、參賽紀錄與自學課程 — 持續學習的完整足跡。',
    'resume.verify':       '驗證 →',

    // Competitions
    'comp.title':          '競賽',
    'comp.desc':           '參賽足跡 — 競賽、黑客松與挑戰賽紀錄。',
    'comp.view':           '查看 →',

    // About — sysInfo labels（名稱與職稱在 about.json 的 identity，不走 i18n）
    'si.os':         '作業系統',
    'si.shell':      'Shell',
    'si.editor':     '編輯器',
    'si.uptime':     '資歷',
    'si.location':   '位置',
    'si.focus':      '專注領域',

    // About — sysInfo values
    'si.uptime.val': '3+ 年',

    // About — 技術棧
    'stack.note': '每項技術都標出實際用過它的專案 —— 這份清單由作品集自動產生。',
    'stack.none': '尚無對應專案',

    'poke.grass': '！ 野草區域',
    '404.msg':    '❯ Page not found — 頁面不存在',
    'menu.open':  '開啟選單',
    'menu.close': '關閉選單',

    // Page meta（<title> 與 meta description，每頁一組）
    'meta.home.title':      'Cheng KT | Full-Stack · AI Engineer',
    'meta.home.desc':       '打造系統 · 訓練模型 · 交付產品 — 全端開發、LLM 應用整合與雲端部署。',
    'meta.about.title':     '關於 | Cheng KT',
    'meta.about.desc':      '我的技術背景、學經歷時間軸與技能組成 — 前端、後端、AI / ML 與 DevOps。',
    'meta.portfolio.title': '作品集 | Cheng KT',
    'meta.portfolio.desc':  '從 Go CLI 工具、AI Bot 到 Chrome Extension — 全端開發、LLM 整合與雲端部署的實作專案。',
    'meta.resume.title':    '履歷 | Cheng KT',
    'meta.resume.desc':     '專業認證、參賽紀錄與自學課程 — 持續學習的完整足跡。',
    'meta.contact.title':   '聯絡 | Cheng KT',
    'meta.contact.desc':    '合作機會、技術交流或專案想法，歡迎透過 Email、GitHub 或 LinkedIn 聯繫。',
    'meta.404.title':       '404 | Cheng KT',
    'meta.404.desc':        '頁面不存在。',
  },
  en: {
    // Nav links
    'nav.home':     '~/home',
    'nav.about':    '~/about',
    'nav.projects': '~/projects',
    'nav.resume':   '~/resume',
    'nav.contact':  '~/contact',

    'theme.cyber.label':     'Cyberpunk',
    'theme.cyber.desc':      'Neon future',
    'theme.pokemon.label':   'Pixel Pokémon',
    'theme.pokemon.desc':    'Pixel RPG',
    'theme.corporate.label': 'Corporate',
    'theme.corporate.desc':  'Clean & formal',
    'theme.blog.label':      'Blog',
    'theme.blog.desc':       'Minimal serif',

    'panel.style': 'STYLE',
    'panel.lang':  'LANG',
    'lang.zh':     '繁體中文',
    'lang.en':     'English',

    // Home
    'home.badge':          'FULL-STACK · AI ENGINEER',
    'home.sub':            'Building systems · Training models · Shipping products',
    'home.btn.projects':   './view_projects',
    'home.btn.about':      'cat about.md',
    'stat.years':          'Years coding',
    'stat.projects':       'Projects shipped',
    'stat.stack':          'Tech stack',
    'stat.commits':        'Commits pushed',

    // Portfolio
    'port.title':          'Selected Projects',
    'port.filter.all':     'All',
    'port.count':          'projects',
    'port.github':         '[GitHub] →',
    'port.demo':           'Live Demo →',
    'port.desc':           'From Go CLI tools and AI bots to Chrome extensions — covering full-stack development, LLM integration, and cloud deployment.',

    // Contact
    'contact.title':       'Contact',
    'contact.desc':        'Open to collaborations, technical exchanges, or any project ideas — feel free to reach out.',
    'open.fulltime':       'Full-time opportunities',
    'open.freelance':      'Freelance projects',
    'open.aiml':           'AI / ML collaboration',
    'open.oss':            'Open source contributions',

    // Resume
    'resume.title':        'Resume',
    'resume.desc':         'Certifications, competition records, and self-study courses — a complete record of continuous learning.',
    'resume.verify':       'verify →',

    // Competitions
    'comp.title':          'Competitions',
    'comp.desc':           'Competition history — contests, hackathons, and challenge records.',
    'comp.view':           'view →',

    // About — sysInfo labels（name / role live in about.json identity）
    'si.os':         'OS',
    'si.shell':      'Shell',
    'si.editor':     'Editor',
    'si.uptime':     'Uptime',
    'si.location':   'Location',
    'si.focus':      'Focus',

    // About — sysInfo values
    'si.uptime.val': '3+ years',

    // About — tech stack
    'stack.note': 'Each technology lists the projects it was actually used in — generated from the portfolio.',
    'stack.none': 'no project yet',

    'poke.grass': '! Tall Grass',
    '404.msg':    '❯ Page not found',
    'menu.open':  'Open menu',
    'menu.close': 'Close menu',

    // Page meta
    'meta.home.title':      'Cheng KT | Full-Stack · AI Engineer',
    'meta.home.desc':       'Building systems, training models, shipping products — full-stack development, LLM integration and cloud deployment.',
    'meta.about.title':     'About | Cheng KT',
    'meta.about.desc':      'Background, timeline and skill breakdown — frontend, backend, AI / ML and DevOps.',
    'meta.portfolio.title': 'Projects | Cheng KT',
    'meta.portfolio.desc':  'From Go CLI tooling and AI bots to Chrome extensions — full-stack, LLM integration and cloud deployment work.',
    'meta.resume.title':    'Resume | Cheng KT',
    'meta.resume.desc':     'Certifications, competition records and self-study courses.',
    'meta.contact.title':   'Contact | Cheng KT',
    'meta.contact.desc':    'Open to opportunities and collaboration — reach me via Email, GitHub or LinkedIn.',
    'meta.404.title':       '404 | Cheng KT',
    'meta.404.desc':        'Page not found.',
  },
}

export default translations
