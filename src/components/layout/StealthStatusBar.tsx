import { Activity, Zap } from 'lucide-react'
import { useTheme } from '../features/ThemeProvider'

export default function StealthStatusBar() {
    const { theme } = useTheme()

    return (
        <footer
            className="h-6 flex items-center justify-between px-3 text-[10px] font-mono font-bold z-50 transition-all duration-300"
            style={{
                background: 'var(--statusbar-bg)',
                color: 'var(--statusbar-text)',
            }}
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Activity size={10} />
                    <span>SYSTEM_STATUS // ONLINE</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(0,0,0,0.15)' }}>
                    <span>
                        SYSTEM MODE: {theme === 'corporate' ? 'CORPORATE' : 'STEALTH'}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 overflow-hidden">
                    <Zap size={10} className="animate-pulse" />
                    <span className="hidden sm:inline">0 ERRORS</span>
                </div>
                <div className="h-4 w-[1px]" style={{ background: 'rgba(0,0,0,0.20)' }} />
                <span>UTF-8</span>
                <span className="hidden md:inline">TypeScript JSX</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(0,0,0,0.15)' }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: 'var(--statusbar-text)' }} />
                    <span className="text-[9px]">AVAILABLE</span>
                </div>
                <span className="hidden sm:inline">SakthiLabs_v2.0</span>
            </div>
        </footer>
    )
}
