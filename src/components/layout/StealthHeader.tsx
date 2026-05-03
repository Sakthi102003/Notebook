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
import ThemeToggle from '../ui/ThemeToggle'

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
            style={{
                backgroundColor: isScrolled ? 'var(--header-bg)' : 'transparent',
                borderBottom: `1px solid ${isScrolled ? 'var(--header-border)' : 'transparent'}`,
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            }}
            className="sticky top-0 z-40 transition-all duration-300"
        >
            <div className="flex items-center justify-between px-4 h-12">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 hidden md:block transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <Menu size={18} />
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest">
                        <span style={{ color: 'var(--text-muted)' }}>STEALTH</span>
                        <ChevronRight size={10} style={{ color: 'var(--text-faint)' }} />
                        <span style={{ color: 'var(--text-muted)' }}>WORKSPACE</span>
                        <ChevronRight size={10} style={{ color: 'var(--text-faint)' }} />
                        <span style={{ color: 'var(--accent-cyan)' }}>
                            {activeFileInfo?.category || 'src'}/{activeFileInfo?.label || 'unknown'}
                        </span>
                    </div>
                </div>

                {/* DEFCON UI Mode Switcher */}
                <button
                    onClick={() => setDefconLevel(defconLevel === 5 ? 1 : 5)}
                    className={`flex items-center justify-center gap-2 border px-3 py-1 ml-auto mr-3 md:mr-2 font-mono tracking-widest text-[10px] transition-all duration-300 ${
                        defconLevel === 1
                            ? 'bg-crimson/10 border-crimson/50 text-crimson animate-pulse'
                            : ''
                    }`}
                    style={defconLevel !== 1 ? {
                        background: 'var(--bg-overlay)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-muted)',
                    } : {}}
                    title="Toggle UI Mode"
                >
                    <span className="hidden sm:inline opacity-70">UI:</span>
                    <span className={`font-bold ${defconLevel === 1 ? 'text-crimson text-glow-crimson' : ''}`}
                        style={defconLevel !== 1 ? { color: 'var(--accent-cyan)' } : {}}>
                        {defconLevel === 5 ? 'GHOST' : 'MATRIX'}
                    </span>
                </button>

                {/* Theme Toggle */}
                <div className="hidden md:flex items-center mr-4">
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className="hidden md:flex items-center gap-6">
                    <EnvironmentWidget />
                    <div className="flex items-center gap-2 text-[10px] uppercase font-mono"
                        style={{ color: 'var(--text-muted)' }}>
                        <Zap size={12} style={{ color: 'var(--accent-red)' }} />
                        Uptime: 99.9%
                    </div>
                </div>
            </div>

            {/* Tabs Bar */}
            <div
                ref={tabsRef}
                className="flex h-10 px-2 overflow-x-auto no-scrollbar"
                style={{
                    borderBottom: '1px solid var(--header-border)',
                    background: 'var(--bg-elevated)',
                }}
            >
                {FILE_TREE.map((file) => (
                    <button
                        key={`tab-${file.id}`}
                        onClick={() => onNavigate(file.id)}
                        data-active={activeFile === file.id}
                        className="flex items-center gap-2 px-4 h-full min-w-fit transition-all relative"
                        style={{
                            borderRight: '1px solid var(--border-subtle)',
                            background: activeFile === file.id ? 'var(--tab-active-bg)' : 'transparent',
                            color: activeFile === file.id ? 'var(--text-primary)' : 'var(--text-muted)',
                        }}
                    >
                        <file.icon
                            size={12}
                            style={{ color: activeFile === file.id ? 'var(--accent-cyan)' : 'var(--text-faint)' }}
                        />
                        <span className="text-[11px] font-mono">{file.label}</span>
                        {activeFile === file.id && (
                            <div
                                className="absolute top-0 left-0 w-full h-[2px]"
                                style={{
                                    background: 'var(--tab-active-indicator)',
                                    boxShadow: `0 0 8px var(--tab-active-indicator)`,
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </header>
    )
}
