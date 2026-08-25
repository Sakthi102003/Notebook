import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Github,
    Linkedin,
    Mail,
    Instagram,
    ChevronDown
} from 'lucide-react'
import { SiMedium } from 'react-icons/si'
import { FILE_TREE } from '../../data/navigation'

interface StealthSidebarProps {
    isOpen: boolean
    activeFile: string
    onNavigate: (id: string) => void
}

export default function StealthSidebar({
    isOpen,
    activeFile,
    onNavigate
}: StealthSidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sidebarRef.current) {
            const activeItem = sidebarRef.current.querySelector('[data-active="true"]')
            if (activeItem) {
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }
        }
    }, [activeFile])

    return (
        <aside
            className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 hidden md:flex flex-col h-full overflow-hidden`}
            style={{
                background: 'var(--sidebar-bg)',
                borderRight: '1px solid var(--sidebar-border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            <div className="p-4 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-bold"
                    style={{ color: 'var(--text-secondary)' }}>
                    Explore
                </span>
            </div>

            <div ref={sidebarRef} className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-muted)' }}>
                    <ChevronDown size={12} /> Around here
                </div>

                {FILE_TREE.map((file) => (
                    <button
                        key={file.id}
                        onClick={() => onNavigate(file.id)}
                        data-active={activeFile === file.id}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm transition-all group tactical-glitch-hover"
                        style={{
                            background: activeFile === file.id ? 'rgba(var(--accent-color) / 0.08)' : 'transparent',
                            color: activeFile === file.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                        }}
                    >
                        <file.icon
                            size={16}
                            style={{
                                color: activeFile === file.id ? 'var(--accent-cyan)' : 'var(--text-faint)',
                            }}
                        />
                        <span className="truncate">{file.label}</span>
                        {activeFile === file.id && (
                            <motion.div
                                layoutId="file-active"
                                className="ml-auto w-1 h-4"
                                style={{
                                    background: 'var(--accent-cyan)',
                                    boxShadow: '0 0 8px var(--accent-cyan)',
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="p-4" style={{ borderTop: '1px solid var(--sidebar-border)', background: 'var(--bg-base)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src="/images/blue avatar.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-none"
                        style={{ border: '1px solid rgba(var(--accent-color) / 0.5)' }}
                    />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                            Sakthi Murugan
                        </span>
                        <span className="text-[8px] tracking-tighter" style={{ color: 'var(--text-muted)' }}>
                            Developer • Security Researcher
                        </span>
                    </div>
                </div>
                <div className="flex justify-between px-2">
                    {[
                        { href: 'https://github.com/Sakthi102003', Icon: Github },
                        { href: 'https://www.linkedin.com/in/sakthimurugan-s/', Icon: Linkedin },
                        { href: 'mailto:sakthimurugan102003@gmail.com', Icon: Mail },
                        { href: 'https://www.instagram.com/sakthiii_techh/', Icon: Instagram },
                        { href: 'https://medium.com/@sakthimurugan102003', Icon: SiMedium },
                    ].map(({ href, Icon }) => (
                        <a
                            key={href}
                            href={href}
                            className="tactical-glitch-hover p-1 transition-all"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                            <Icon size={14} />
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    )
}
