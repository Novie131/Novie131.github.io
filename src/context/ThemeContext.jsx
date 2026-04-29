import { createContext, useContext, useState, useEffect } from 'react'

export const themes = [
  { id: 'cyber',     label: '未來科技',  icon: '🤖', desc: 'Cyberpunk' },
  { id: 'pokemon',   label: '像素寶可夢', icon: '🎮', desc: 'Pixel RPG' },
  { id: 'corporate', label: '企業正經版', icon: '💼', desc: 'Corporate' },
  { id: 'blog',      label: '個人部落格', icon: '📝', desc: 'Blog'      },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('site-theme') || 'cyber'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('site-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
