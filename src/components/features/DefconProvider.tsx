import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type DefconLevel = 1 | 5;

interface DefconContextType {
    level: DefconLevel;
    setLevel: (level: DefconLevel) => void;
}

const DefconContext = createContext<DefconContextType | undefined>(undefined);

export function DefconProvider({ children }: { children: ReactNode }) {
    const [level, setLevel] = useState<DefconLevel>(5);

    useEffect(() => {
        const root = document.documentElement;
        if (level === 1) {
            root.style.setProperty('--accent-color', '255 0 60');
            root.classList.add('defcon-1');
        } else {
            root.style.setProperty('--accent-color', '0 229 255');
            root.classList.remove('defcon-1');
        }
    }, [level]);

    return (
        <DefconContext.Provider value={{ level, setLevel }}>
            {children}
        </DefconContext.Provider>
    );
}

export function useDefcon() {
    const context = useContext(DefconContext);
    if (context === undefined) {
        throw new Error('useDefcon must be used within a DefconProvider');
    }
    return context;
}

