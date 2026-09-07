/* 內容 JSON 裡會出現的列舉值 —— 集中在這裡，免得各編輯器各寫一份會漂移。
   這些值最後都會變成 CSS 類別，所以只列出樣式表真的有定義的，
   否則下拉選單會讓你選到一個渲染出來沒有顏色的值。 */

/** 五色全備：履歷卡片（Resume.jsx colorMap）、時間軸（.tl-*）、跑馬燈（.tc-*） */
export const COLORS = ['cyan', 'purple', 'green', 'amber', 'pink']

/** 首頁數據列（.stat-*）與聯絡卡片（.color-*）的樣式表沒有 pink 變體 */
export const COLORS_NO_PINK = ['cyan', 'purple', 'green', 'amber']

/** about.json 的 sysInfo.cls —— 文字顏色類別，定義在 src/styles/App.css */
export const TEXT_CLASSES = ['tc-cyan', 'tc-purple', 'tc-green', 'tc-amber', 'tc-pink']

/** about.json 的 timeline.type —— 對應 .tl-type-* 的四種標籤樣式 */
export const TIMELINE_TYPES = ['education', 'project', 'work', 'award']
