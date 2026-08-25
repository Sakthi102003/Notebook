import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
    applyTimeTheme,
    getNextManualOverride,
    getThemeOverride,
    setThemeOverride,
    subscribeTimeTheme,
    type EffectiveScheme,
    type ThemeOverride,
} from '../../utils/timeTheme';

export type Theme = ThemeOverride;

interface ThemeContextType {
    theme: Theme;
    scheme: EffectiveScheme;
    toggleTheme: () => void;
    setTheme: (t: ThemeOverride) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => getThemeOverride());
    const [scheme, setScheme] = useState<EffectiveScheme>('light');

    useEffect(() => {
        setThemeOverride(theme);
        setScheme(applyTimeTheme(theme));
    }, [theme]);

    useEffect(() => subscribeTimeTheme(() => theme, setScheme), [theme]);

    const setTheme = useCallback((t: ThemeOverride) => setThemeState(t), []);

    const toggleTheme = useCallback(() => {
        setThemeState(prev => {
            const activeScheme = prev === 'auto' ? scheme : prev;
            return getNextManualOverride(activeScheme);
        });
    }, [scheme]);

    return (
        <ThemeContext.Provider value={{ theme, scheme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
}
