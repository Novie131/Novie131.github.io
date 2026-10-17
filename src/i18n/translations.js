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
    'home.badge':          'AI AGENT · 後端工程師',
    'home.sub':            '打造 AI Agent · 守住資安邊界 · 交付上線系統',
    'home.btn.projects':   '查看作品集',
    'home.btn.about':      '關於我',
    'home.stack':          '主要技術',
    'stat.industry':       '產學合作專案',
    'stat.certs':          '國際證照',
    'stat.articles':       '篇技術文章',
    'stat.events':         '場社群活動',

    // Portfolio
    'port.title':          '精選作品',
    'port.filter.all':     '全部',
    'port.count':          '個作品',
    'port.github':         'GitHub ↗',
    'port.demo':           'Live Demo ↗',
    'port.desc':           '課餘做的開源作品：地端 AI 影片產線、Claude Code Plugin、AR 手機 App、IoT 冷鏈系統與 Go 工具。產學合作專案請見履歷頁。',

    // Contact
    'contact.title':       '聯絡',
    'contact.desc':        '有任何合作機會、技術交流或專案想法，歡迎隨時聯繫。',
    'contact.open':        '目前開放',
    'open.fulltime':       '全職工作機會',
    'open.freelance':      '接案合作',
    'open.aiml':           'AI Agent / 資安技術合作',
    'open.talk':           '技術講座與社群合作',
    'open.oss':            '開源貢獻',

    // Resume
    'resume.title':        '履歷',
    'resume.desc':         '學歷、產學合作、論文、證照與社群經歷。',
    'resume.articles':     '篇',
    'resume.sec.education':  '學歷',
    'resume.sec.experience': '產學合作',
    'resume.sec.publications': '研討會論文',
    'resume.sec.certifications': '證照',
    'resume.sec.competitions': '競賽',
    'resume.sec.community':  '社群與領導',
    'resume.sec.writing':    '技術寫作',
    'resume.sec.courses':    '課程與培訓',
    'resume.sec.events':     '參與的技術活動',
    'resume.verify':       '驗證證照 ↗',

    // Competitions
    'comp.title':          '競賽',
    'comp.desc':           '參賽足跡 — 競賽、黑客松與挑戰賽紀錄。',
    'comp.view':           '查看 →',

    // About — sysInfo labels（名稱與職稱在 about.json 的 identity，不走 i18n）
    'si.edu':        '學歷',
    'si.os':         '作業系統',
    'si.shell':      'Shell',
    'si.editor':     '編輯器',
    'si.uptime':     '資歷',
    'si.location':   '位置',
    'si.focus':      '專注領域',

    // About — sysInfo values
    'si.uptime.val': '3+ 年',
    'si.edu.val':    '臺中科大資工 碩士班',

    // About — 技術棧
    'stack.note': '每項技術都標出實際用過它的專案 —— 這份清單由作品集與產學經歷自動產生。',
    'stack.none': '尚無對應專案',
    'about.title': '關於我',
    'about.bio': '自我介紹',
    'about.timeline': '經歷',
    'about.stack': '技術棧',

    'poke.grass': '！ 野草區域',
    '404.msg':    '❯ Page not found — 頁面不存在',
    'menu.open':  '開啟選單',
    'menu.close': '關閉選單',

    // Page meta（<title> 與 meta description，每頁一組）
    'meta.home.title':      '鄭凱擇 Cheng KT | AI Agent · 後端工程師',
    'meta.home.desc':       '臺中科大資工碩士生，專注 AI Agent、MCP 與零信任資安 — 精誠、仁寶、工研院產學合作經驗。',
    'meta.about.title':     '關於 | Cheng KT',
    'meta.about.desc':      '我的技術背景、學經歷時間軸與技能組成 — AI Agent、身分驗證與資安、後端與資料工程。',
    'meta.portfolio.title': '作品集 | Cheng KT',
    'meta.portfolio.desc':  '地端 AI 影片產線、Claude Code Plugin、AR 手機 App、IoT 冷鏈系統等開源作品。',
    'meta.resume.title':    '履歷 | Cheng KT',
    'meta.resume.desc':     '學歷、產學合作（精誠、仁寶、長茂、工研院）、研討會論文、證照與社群經歷。',
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
    'home.badge':          'AI AGENT · BACKEND ENGINEER',
    'home.sub':            'Building AI agents · Securing the boundaries · Shipping to production',
    'home.btn.projects':   'View projects',
    'home.btn.about':      'About me',
    'home.stack':          'Core stack',
    'stat.industry':       'Industry projects',
    'stat.certs':          'Intl. certifications',
    'stat.articles':       'Tech articles',
    'stat.events':         'Community events',

    // Portfolio
    'port.title':          'Selected Projects',
    'port.filter.all':     'All',
    'port.count':          'projects',
    'port.github':         'GitHub ↗',
    'port.demo':           'Live Demo ↗',
    'port.desc':           'Open-source side projects: a local AI video pipeline, a Claude Code plugin, an AR mobile app, an IoT cold-chain system and Go tooling. Industry work is on the resume page.',

    // Contact
    'contact.title':       'Contact',
    'contact.desc':        'Open to collaborations, technical exchanges, or any project ideas — feel free to reach out.',
    'contact.open':        'Open to',
    'open.fulltime':       'Full-time opportunities',
    'open.freelance':      'Freelance projects',
    'open.aiml':           'AI agent / security collaboration',
    'open.talk':           'Tech talks & community events',
    'open.oss':            'Open source contributions',

    // Resume
    'resume.title':        'Resume',
    'resume.desc':         'Education, industry projects, papers, certifications and community work.',
    'resume.articles':     'articles',
    'resume.sec.education':  'education',
    'resume.sec.experience': 'industry projects',
    'resume.sec.publications': 'publications',
    'resume.sec.certifications': 'certifications',
    'resume.sec.competitions': 'competitions',
    'resume.sec.community':  'community & leadership',
    'resume.sec.writing':    'writing',
    'resume.sec.courses':    'courses & training',
    'resume.sec.events':     'events attended',
    'resume.verify':       'Verify credential ↗',

    // Competitions
    'comp.title':          'Competitions',
    'comp.desc':           'Competition history — contests, hackathons, and challenge records.',
    'comp.view':           'view →',

    // About — sysInfo labels（name / role live in about.json identity）
    'si.edu':        'Education',
    'si.os':         'OS',
    'si.shell':      'Shell',
    'si.editor':     'Editor',
    'si.uptime':     'Uptime',
    'si.location':   'Location',
    'si.focus':      'Focus',

    // About — sysInfo values
    'si.uptime.val': '3+ years',
    'si.edu.val':    'M.S. CSIE, NUTC',

    // About — tech stack
    'stack.note': 'Each technology lists the projects it was actually used in — generated from the portfolio and industry work.',
    'stack.none': 'no project yet',
    'about.title': 'About me',
    'about.bio': 'Introduction',
    'about.timeline': 'Timeline',
    'about.stack': 'Tech stack',

    'poke.grass': '! Tall Grass',
    '404.msg':    '❯ Page not found',
    'menu.open':  'Open menu',
    'menu.close': 'Close menu',

    // Page meta
    'meta.home.title':      'Cheng KT | AI Agent · Backend Engineer',
    'meta.home.desc':       'M.S. student at NUTC focused on AI agents, MCP and zero-trust security — industry projects with SYSTEX, Compal and ITRI.',
    'meta.about.title':     'About | Cheng KT',
    'meta.about.desc':      'Background, timeline and skills — AI agents, identity & security, backend and data engineering.',
    'meta.portfolio.title': 'Projects | Cheng KT',
    'meta.portfolio.desc':  'Open-source work: a local AI video pipeline, a Claude Code plugin, an AR mobile app and an IoT cold-chain system.',
    'meta.resume.title':    'Resume | Cheng KT',
    'meta.resume.desc':     'Education, industry projects, conference papers, certifications and community work.',
    'meta.contact.title':   'Contact | Cheng KT',
    'meta.contact.desc':    'Open to opportunities and collaboration — reach me via Email, GitHub or LinkedIn.',
    'meta.404.title':       '404 | Cheng KT',
    'meta.404.desc':        'Page not found.',
  },
}

export default translations
