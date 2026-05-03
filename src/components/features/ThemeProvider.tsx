import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'stealth' | 'corporate';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
            if (saved === 'stealth' || saved === 'corporate') return saved;
        } catch { /* ignore */ }
        return 'stealth';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'corporate') {
            root.setAttribute('data-theme', 'corporate');
        } else {
            root.removeAttribute('data-theme');
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch { /* ignore */ }
    }, [theme]);

    const setTheme = useCallback((t: Theme) => setThemeState(t), []);

    const toggleTheme = useCallback(() => {
        setThemeState(prev => prev === 'stealth' ? 'corporate' : 'stealth');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
}
