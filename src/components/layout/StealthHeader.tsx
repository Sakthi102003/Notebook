import { useRef, useEffect } from 'react'
import {
    Menu,
    X,
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
                backgroundColor: isScrolled ? 'var(--header-bg)' : 'var(--bg-base)',
                borderBottom: '1px solid var(--header-border)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
            className="sticky top-0 z-40 transition-all duration-300 shadow-sm"
        >
            <div className="flex items-center justify-between px-4 sm:px-8 h-16 max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hidden md:flex items-center justify-center transition-colors"
                        style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
                    >
                        <Menu size={18} />
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="font-bold text-lg tracking-tight font-display" style={{ color: 'var(--text-primary)' }}>
                            Sakthi Murugan
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono rounded-full font-bold" style={{ background: 'rgba(var(--accent-color)/0.1)', color: 'var(--accent-cyan)' }}>
                            {activeFileInfo?.label || 'Home'}
                        </span>
                    </div>
                </div>

                {/* Desktop Nav Bar */}
                <div className="hidden md:flex items-center gap-1 bg-elevated px-2 py-1 rounded-full border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                    {FILE_TREE.map((file) => (
                        <button
                            key={`nav-${file.id}`}
                            onClick={() => onNavigate(file.id)}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
                            style={{
                                background: activeFile === file.id ? 'var(--accent-cyan)' : 'transparent',
                                color: activeFile === file.id ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                                fontWeight: activeFile === file.id ? 700 : 500,
                            }}
                        >
                            {file.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <EnvironmentWidget />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--text-primary)', background: 'var(--bg-elevated)' }}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </header>
    )
}
