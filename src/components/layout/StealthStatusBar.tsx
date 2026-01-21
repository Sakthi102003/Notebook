import { Activity, Zap, Shield } from 'lucide-react'

interface StealthStatusBarProps {
    powerLevel?: number;
}

export default function StealthStatusBar({ powerLevel = 0 }: StealthStatusBarProps) {
    return (
        <footer className="h-6 bg-electric-blue flex items-center justify-between px-3 text-stealth-900 text-[10px] font-mono font-bold z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Activity size={10} />
                    <span>MAIN*</span>
                </div>
                <div className="flex items-center gap-4 border-l border-stealth-900/20 pl-4">
                    <div className="flex items-center gap-1.5">
                        <Shield size={10} />
                        <span>POWER_LVL:</span>
                        <div className="w-20 h-2 bg-stealth-900/20 rounded-full overflow-hidden border border-stealth-900/10">
                            <div
                                className="h-full bg-stealth-900 transition-all duration-500"
                                style={{ width: `${powerLevel}%` }}
                            />
                        </div>
                        <span className="min-w-[25px]">{powerLevel}%</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 overflow-hidden">
                    <Zap size={10} className="animate-pulse" />
                    <span className="hidden sm:inline">0 ERRORS</span>
                </div>
                <div className="h-4 w-[1px] bg-stealth-900/20" />
                <span>UTF-8</span>
                <span className="hidden md:inline">TypeScript JSX</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px]">AVAILABLE</span>
                </div>
                <span className="hidden sm:inline">SakthiLabs_v2.0</span>
            </div>
        </footer>
    )
}
