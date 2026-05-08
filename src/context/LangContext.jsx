import { createContext, useContext, useState, useEffect } from 'react'
import translations from '../i18n/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('site-lang') || 'zh'
  )

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

export const useLang = () => useContext(LangContext)
