import { useRef, useEffect } from 'react'
import {
    Menu,
    X,
    ChevronRight,
    Zap,
} from 'lucide-react'
import { FILE_TREE } from '../../data/navigation'
import EnvironmentWidget from '../features/EnvironmentWidget'
import { useDefcon } from '../features/DefconProvider'

interface StealthHeaderProps {
    isScrolled: boolean
    activeFile: string
    onNavigate: (id: string) => void
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    mobileMenuOpen: boolean
    setMobileMenuOpen: (open: boolean) => void
}

export default function StealthHeader({
    isScrolled,
    activeFile,
    onNavigate,
    sidebarOpen,
    setSidebarOpen,
    mobileMenuOpen,
    setMobileMenuOpen
}: StealthHeaderProps) {
    const tabsRef = useRef<HTMLDivElement>(null)
    const { level: defconLevel, setLevel: setDefconLevel } = useDefcon()

    useEffect(() => {
        // Scroll active tab into view
        if (tabsRef.current) {
            const activeTab = tabsRef.current.querySelector('[data-active="true"]')
            if (activeTab) {
                activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            }
        }
    }, [activeFile])

    const activeFileInfo = FILE_TREE.find(f => f.id === activeFile)

    return (
        <header
            className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-stealth-900/80 backdrop-blur-md border-b border-white/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="flex items-center justify-between px-4 h-12">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 hover:bg-white/5 text-gray-500 hidden md:block"
                    >
                        <Menu size={18} />
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest">
                        <span className="text-gray-600">STEALTH</span>
                        <ChevronRight size={10} className="text-gray-700" />
                        <span className="text-gray-600">WORKSPACE</span>
                        <ChevronRight size={10} className="text-gray-700" />
                        <span className="text-electric-blue">
                            {activeFileInfo?.category || 'src'}/{activeFileInfo?.label || 'unknown'}
                        </span>
                    </div>
                </div>

                {/* UI Mode Switcher */}
                <button
                    onClick={() => setDefconLevel(defconLevel === 5 ? 1 : 5)}
                    className={`flex items-center justify-center gap-2 border px-3 py-1 ml-auto mr-4 md:mr-0 font-mono tracking-widest text-[10px] transition-all duration-300 ${
                        defconLevel === 1 
                            ? 'bg-crimson/10 border-crimson/50 text-crimson animate-pulse'
                            : 'bg-black/20 border-white/5 text-gray-500 hover:text-white hover:border-electric-blue/30'
                    }`}
                    title="Toggle UI Mode"
                >
                    <span className="hidden sm:inline opacity-70">UI:</span>
                    <span className={`font-bold ${defconLevel === 1 ? 'text-crimson text-glow-crimson' : 'text-electric-blue'}`}>
                        {defconLevel === 5 ? 'GHOST' : 'MATRIX'}
                    </span>
                </button>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className="hidden md:flex items-center gap-6">
                    <EnvironmentWidget />
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-mono">
                        <Zap size={12} className="text-crimson" />
                        Uptime: 99.9%
                    </div>
                </div>

{/* DEFCON Level Switcher (Removed from here, moved to be globally visible) */}
            </div>

            {/* Tabs Bar */}
            <div
                ref={tabsRef}
                className="flex h-10 border-b border-white/5 bg-stealth-800/10 px-2 overflow-x-auto no-scrollbar"
            >
                {FILE_TREE.map((file) => (
                    <button
                        key={`tab-${file.id}`}
                        onClick={() => onNavigate(file.id)}
                        data-active={activeFile === file.id}
                        className={`flex items-center gap-2 px-4 h-full border-r border-white/5 min-w-fit transition-all relative ${activeFile === file.id
                                ? 'bg-stealth-800/40 text-white'
                                : 'text-gray-600 hover:text-gray-400'
                            }`}
                    >
                        <file.icon
                            size={12}
                            className={activeFile === file.id ? 'text-electric-blue' : 'text-gray-700'}
                        />
                        <span className="text-[11px] font-mono">{file.label}</span>
                        {activeFile === file.id && (
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-electric-blue shadow-[0_0_8px_#00E5FF]" />
                        )}
                    </button>
                ))}
            </div>
        </header>
    )
}
