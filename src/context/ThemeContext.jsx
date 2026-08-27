import { createContext, useContext, useState, useEffect } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const themes = [
  { id: 'cyber',     icon: '🤖' },
  { id: 'pokemon',   icon: '🎮' },
  { id: 'corporate', icon: '💼' },
  { id: 'blog',      icon: '📝' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Theme switching disabled — locked to 'cyber'
  const [theme, setTheme] = useState('cyber')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'cyber')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
