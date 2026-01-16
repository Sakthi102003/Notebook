import { useRef, useEffect } from 'react'
import {
    Menu,
    X,
    ChevronRight,
    Zap,
} from 'lucide-react'
import { FILE_TREE } from '../../data/navigation'
import EnvironmentWidget from '../features/EnvironmentWidget'

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

                {/* Accent Theme Switcher */}
                <div className="hidden lg:flex items-center gap-1 border border-white/5 bg-black/20 p-1">
                    {[
                        { id: 'blue', color: 'bg-electric-blue' },
                        { id: 'crimson', color: 'bg-crimson' },
                        { id: 'green', color: 'bg-green-500' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                document.documentElement.style.setProperty(
                                    '--accent-color',
                                    t.id === 'blue'
                                        ? '0 229 255'
                                        : t.id === 'crimson'
                                            ? '255 0 60'
                                            : '34 197 94'
                                )
                            }}
                            className={`w-3 h-3 ${t.color} opacity-40 hover:opacity-100 transition-opacity`}
                            title={`Switch to ${t.id} mode`}
                        />
                    ))}
                    <div className="px-2 text-[8px] font-mono text-white/30 uppercase tracking-widest">
                        Theme
                    </div>
                </div>
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
