/** 產生一個不會撞到的 id —— 清單項用它當 React key 與 JSON 裡的識別碼 */
export const uid = prefix => `${prefix}-${Date.now().toString(36)}`

export const clone = v => structuredClone(v)

/** 草稿跟原始檔有沒有差異。內容都是純 JSON，比字串就夠了 */
export const changed = (a, b) => JSON.stringify(a) !== JSON.stringify(b)
