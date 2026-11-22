import { useRef } from 'react'
import '../styles/Zoomable.css'

/**
 * 證書、論文發表照這類「要看得清楚」的圖：卡片裡放縮圖，點了用原生 <dialog> 放大。
 * <dialog> 自帶 Esc 關閉與焦點鎖定，不必自己處理；點背景（dialog 本身）也會關閉。
 */
export default function Zoomable({ src, alt, closeLabel = 'Close', className = '' }) {
  const ref = useRef(null)
  if (!src) return null
  return (
    <>
      <button
        type="button"
        className={`zoom-thumb ${className}`}
        onClick={() => ref.current?.showModal()}
        aria-label={alt}
      >
        <img src={src} alt="" loading="lazy" decoding="async" />
        <span className="zoom-hint" aria-hidden="true">⤢</span>
      </button>
      <dialog
        ref={ref}
        className="zoom-dialog"
        aria-label={alt}
        onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close() }}
      >
        <img src={src} alt={alt} decoding="async" />
        <button
          type="button"
          className="zoom-close"
          onClick={() => ref.current?.close()}
          aria-label={closeLabel}
        >
          ×
        </button>
      </dialog>
    </>
  )
}
