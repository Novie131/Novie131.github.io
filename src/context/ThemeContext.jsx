import { createContext, useContext, useState, useEffect } from 'react'

export const themes = [
  { id: 'cyber',     icon: '🤖' },
  { id: 'pokemon',   icon: '🎮' },
  { id: 'corporate', icon: '💼' },
  { id: 'blog',      icon: '📝' },
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
