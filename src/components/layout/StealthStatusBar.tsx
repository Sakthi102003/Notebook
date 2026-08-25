import { Heart } from 'lucide-react'

export default function StealthStatusBar() {
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
                    <Heart size={10} />
                    <span>SAKTHI MURUGAN</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(0,0,0,0.15)' }}>
                    <span>BUILT WITH CARE</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(0,0,0,0.15)' }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: 'var(--statusbar-text)' }} />
                    <span className="text-[9px]">AVAILABLE FOR HIRE</span>
                </div>
                <span className="hidden sm:inline">Sakthi Murugan</span>
            </div>
        </footer>
    )
}
