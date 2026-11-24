import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'
import translations from '../i18n/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(
    () => localStorage.getItem('site-lang') || 'zh'
  )

  /* 切換語言時用 View Transitions API 做整頁交叉淡化：
     瀏覽器先截舊畫面，flushSync 讓 React 同步更新 DOM，再截新畫面互相淡入淡出。
     不支援或使用者開了「減少動態效果」就直接切換，沒有任何副作用。 */
  const setLang = useCallback(next => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) { setLangState(next); return }
    document.documentElement.classList.add('lang-transition')
    const vt = document.startViewTransition(() => flushSync(() => setLangState(next)))
    vt.finished.finally(() => document.documentElement.classList.remove('lang-transition'))
  }, [])

  useEffect(() => {
    localStorage.setItem('site-lang', lang)
  }, [lang])

  const t = key => translations[lang]?.[key] ?? translations.zh[key] ?? key

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangContext)
