"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "remodely-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(
        () =>
            (typeof window !== "undefined" && localStorage.getItem(storageKey)) as Theme ||
            defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove all theme classes first
        root.classList.remove("light", "dark");

        console.log('Theme provider effect running, theme:', theme);

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            console.log('System theme detected:', systemTheme);
            root.classList.add(systemTheme);
            return;
        }

        console.log('Adding theme class:', theme);
        root.classList.add(theme);

        // Verify the class was added
        console.log('Current html classes:', root.className);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setThemeState(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
