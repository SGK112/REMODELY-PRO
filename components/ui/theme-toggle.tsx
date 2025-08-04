'use client'

import { useTheme } from '@/lib/theme-provider'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from './button'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleThemeToggle = () => {
        console.log('🎨 Theme toggle clicked! Current theme:', theme)

        let nextTheme: 'light' | 'dark' | 'system'

        if (theme === 'light') {
            nextTheme = 'dark'
        } else if (theme === 'dark') {
            nextTheme = 'system'
        } else {
            nextTheme = 'light'
        }

        console.log('🎨 Switching to theme:', nextTheme)
        setTheme(nextTheme)

        // Force a small delay to check if the theme actually changed
        setTimeout(() => {
            console.log('🎨 Theme after change:', theme)
            const htmlClasses = document.documentElement.className
            console.log('🎨 HTML classes:', htmlClasses)
        }, 100)
    }

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                disabled
            >
                <Sun className="h-4 w-4" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className="w-9 h-9 p-0 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors border border-slate-300 dark:border-slate-600"
            aria-label={`Toggle theme (current: ${theme})`}
            title={`Current theme: ${theme} - Click to cycle`}
        >
            {theme === 'light' && <Sun className="h-4 w-4 text-yellow-600" />}
            {theme === 'dark' && <Moon className="h-4 w-4 text-blue-400" />}
            {theme === 'system' && <Monitor className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
