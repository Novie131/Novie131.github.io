# Novie131.github.io

Cheng KT 的個人網站 — 以 React + Vite 打造的單頁作品集，部署於 GitHub Pages。

🔗 https://novie131.github.io

## 技術棧

| 項目 | 使用 |
| --- | --- |
| 框架 | React 19 |
| 建置工具 | Vite 8 |
| 路由 | react-router-dom 7（`BrowserRouter`） |
| 樣式 | 原生 CSS（CSS 變數 + 每頁一支樣式表） |
| 內容 | `src/content/*.json` + 本機 admin 編輯器 |
| 影像 | sharp（僅 dev 時使用，上傳自動轉 WebP） |
| Lint | ESLint 9 (flat config) |
| Node | 24（由 Volta 釘住） |

無後端、無 CSS 框架、無狀態管理套件。網站本身是純靜態的：編輯內容的機制只跑在你的本機，線上不存在任何需要維護的端點。

## 開發

```bash
npm install
npm run dev      # 本機開發（Vite dev server + HMR）
npm run build    # 產出 dist/（含每頁 HTML 與 404.html）
npm run preview  # 預覽 build 結果
npm run lint     # ESLint，--max-warnings 0
```

## 編輯內容

網站上所有文字、專案、履歷資料都在 `src/content/*.json`，不寫死在元件裡。

`npm run dev` 之後開 **http://localhost:5173/admin** 就是內容編輯器：作品集與履歷是表單，其餘是附格式驗證的 JSON 編輯器，圖片拖進去會自動壓成 WebP。存檔直接寫回 `src/content/`，**記得 commit，不然不會上線**。

完整操作說明、常見任務與踩雷清單見 **[docs/admin.md](docs/admin.md)**。

這個路由與 `plugins/admin-api.js` 都只在 dev 存在（`import.meta.env.DEV` 分支會被 tree-shake），production build 裡搜不到 admin 相關的任何一行，線上 `/admin` 回 404 —— 所以它不需要任何驗證機制。

內容的幾個約定：

- 雙語欄位一律是 `{ "zh": ..., "en": ... }`；介面標籤（按鈕、區塊標題）則走 `src/i18n/translations.js` 的 `t('key')`，不要在 JSX 裡寫死字串
- 選填欄位（`credentialId`、`link`、`demoLink`、`image`）留 `null` 就不會渲染出對應的元素
- 清單留空陣列時，整個區塊不會出現在頁面上（不會留下空殼標題）
- `about.json` 的自我介紹支援 `**粗體**` 標記，由 `components/RichText.jsx` 渲染 —— 這樣文案才能被序列化，未來接後端不用重寫

## 部署

Push 到 `main` 觸發 `.github/workflows/deploy.yml`：`npm ci` → `npm run build` → 上傳 `dist/` 至 GitHub Pages。

`npm run build` 的第二段 `scripts/postbuild.mjs` 會為每個路由產生實體的 `dist/<route>/index.html`，並注入該頁的 `<title>` / description / og:* / canonical。這件事的重點是 **HTTP 200**：只靠 `404.html` 的話 `/about` 雖然畫面正確，回應碼仍是 404，搜尋引擎不會索引、社群預覽也可能放棄抓取。`404.html` 仍然保留當保險，接住沒被列進 `ROUTES` 的路徑。

**新增頁面時要同步三個地方**，否則新頁面拿不到自己的 meta 也不會有實體 HTML：

1. `src/App.jsx` 的 `<Route>`
2. `src/hooks/usePageMeta.js` 的 `ROUTE_META`
3. `scripts/postbuild.mjs` 的 `ROUTES`（以及 `public/sitemap.xml`）

另外 `vite.config.js` 的 `base: '/'` 不要動 —— 這是 user site（根網域），不是 project site，不需要 repo 名稱前綴。

## 專案結構

```
src/
├── App.jsx              # 路由表、navbar、footer、404
├── main.jsx             # 進入點
├── content/             # ★ 網站所有內容都在這裡
│   ├── projects.json    #   作品集
│   ├── resume.json      #   認證 / 競賽 / 課程
│   ├── about.json       #   自介、時間軸、技能
│   ├── contact.json     #   聯絡方式
│   └── home.json        #   首頁 stats、ticker、終端機文字
├── pages/               # 只負責渲染，不放資料
├── components/
│   ├── NavControls.jsx  #   右下角控制選單（語言、手機版預覽）
│   └── RichText.jsx     #   **粗體** 行內標記
├── hooks/
│   └── usePageMeta.js   #   換頁時同步 title / description / og:*
├── context/             #   LangContext（中英）、ThemeContext（目前鎖定）
├── i18n/translations.js #   介面標籤
├── admin/               # ★ 本機編輯器，不進 production build（見 docs/admin.md）
└── styles/              #   themes.css 為主題變數，其餘對應各頁

plugins/admin-api.js     # dev-only 的 /__admin/* API（存檔、上傳、刪圖）
scripts/postbuild.mjs    # 產生每頁 HTML + 404.html
assets-src/              # 圖片原檔，不會被部署（public/ 裡放壓過的成品）
```

## 效能上的幾個決定

- **頭像** 顯示尺寸只有 64×64，`public/img/avatar.webp` 是 256×256 的 WebP（25 KB）。原檔 1024×1024 PNG（1.9 MB）留在 `assets-src/`，不進 `public/` —— 放在 `public/` 就算沒被引用也會被複製進 `dist/` 一起部署。
- **字型** 只載入 cyber 主題實際用到的 Space Grotesk 與 JetBrains Mono。若重新啟用主題切換，corporate 需要 Inter、blog 需要 Lora，屆時建議「切到該主題才動態插入 `<link>`」而不是無條件全載。
- **路由分割** 首頁同步載入，其餘四頁各自是獨立 chunk。
- **寶可夢 sprite** 只在 pokemon 主題渲染。先前它們永遠在 DOM 裡但被 CSS 藏起來，瀏覽器仍會去 raw.githubusercontent.com 抓 6 張看不見的 GIF。

## 主題系統（目前停用）

`themes.css` 內建四套配色 — `cyber`（未來科技，現行）、`pokemon`（像素 RPG）、`corporate`（企業）、`blog`（部落格），透過 `<html data-theme="...">` 切換。

目前 `ThemeContext` 硬鎖在 `cyber`，`NavControls` 內的主題按鈕與面板已註解掉。要重新啟用：解開 `NavControls.jsx` 的兩段註解、讓 `ThemeContext` 的 `useEffect` 隨 `theme` 更新 `data-theme`，並補回上面提到的字型。
