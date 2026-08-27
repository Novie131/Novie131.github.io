/**
 * 極簡行內標記渲染器 — 內容存在 JSON 裡，只支援 **粗體**。
 * 這樣文案可以被序列化（後端 / admin 編輯器可直接讀寫），
 * 而不必像過去那樣把 JSX 寫死在 .jsx 檔案裡。
 */
export default function RichText({ text, ...rest }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return (
    <p {...rest}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  )
}
