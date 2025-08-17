'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleDarkMode } from '@/store/slices/userSlice'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.user.preferences.darkMode)
  const [mounted, setMounted] = useState(false)

  const theme: Theme = darkMode ? 'dark' : 'light'

  const toggleTheme = () => {
    dispatch(toggleDarkMode())
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      
      // Update CSS custom properties
      if (theme === 'dark') {
        root.style.setProperty('--background-start-rgb', '15, 15, 15')
        root.style.setProperty('--background-end-rgb', '26, 26, 26')
        root.style.setProperty('--foreground-rgb', '255, 255, 255')
      } else {
        root.style.setProperty('--background-start-rgb', '255, 255, 255')
        root.style.setProperty('--background-end-rgb', '248, 250, 252')
        root.style.setProperty('--foreground-rgb', '15, 23, 42')
      }
    }
  }, [theme, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
