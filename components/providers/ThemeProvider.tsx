'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'theme',
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey) as Theme
            if (stored) {
                setTheme(stored)
            }
        } catch (error) {
            console.warn('Failed to load theme from localStorage:', error)
        }
    }, [storageKey])

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        let systemTheme: Theme = 'light'
        if (theme === 'system') {
            systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }

        const activeTheme = theme === 'system' ? systemTheme : theme
        root.classList.add(activeTheme)

        try {
            localStorage.setItem(storageKey, theme)
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error)
        }
    }, [theme, storageKey])

    const value = {
        theme,
        setTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
