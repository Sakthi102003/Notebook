import { Activity, Zap } from 'lucide-react'

export default function StealthStatusBar() {
    return (
        <footer className="h-6 bg-electric-blue flex items-center justify-between px-3 text-stealth-900 text-[10px] font-mono font-bold z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Activity size={10} />
                    <span>MAIN*</span>
                </div>
                <div className="flex items-center gap-1">
                    <Zap size={10} />
                    <span>0 ERRORS</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span>UTF-8</span>
                <span>TypeScript JSX</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>AVAILABLE FOR FREELANCE</span>
                </div>
                <span>SakthiLabs_v2.0</span>
            </div>
        </footer>
    )
}
