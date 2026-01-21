import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Github,
    Linkedin,
    Mail,
    Instagram,
    Terminal as TerminalIcon,
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
        // Scroll active sidebar item into view
        if (sidebarRef.current) {
            const activeItem = sidebarRef.current.querySelector('[data-active="true"]')
            if (activeItem) {
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }
        }
    }, [activeFile])

    return (
        <aside
            className={`${isOpen ? 'w-64' : 'w-0'
                } transition-all duration-300 border-r border-white/5 bg-stealth-800/20 backdrop-blur-md hidden md:flex flex-col h-full overflow-hidden`}
        >
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
                    Explorer
                </span>
                <TerminalIcon size={14} className="text-white/20" />
            </div>

            <div ref={sidebarRef} className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">
                    <ChevronDown size={12} /> Root
                </div>

                {FILE_TREE.map((file) => (
                    <button
                        key={file.id}
                        onClick={() => onNavigate(file.id)}
                        data-active={activeFile === file.id}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all group tactical-glitch-hover ${activeFile === file.id
                            ? 'bg-electric-blue/10 text-electric-blue'
                            : 'hover:bg-white/5 text-gray-500 hover:text-white'
                            }`}
                    >
                        <file.icon
                            size={16}
                            className={
                                activeFile === file.id
                                    ? 'text-electric-blue'
                                    : 'text-gray-600 group-hover:text-gray-400'
                            }
                        />
                        <span className="truncate">{file.label}</span>
                        {activeFile === file.id && (
                            <motion.div
                                layoutId="file-active"
                                className="ml-auto w-1 h-4 bg-electric-blue shadow-[0_0_8px_#00E5FF]"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 bg-stealth-900/50">
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src="/images/blue avatar.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-none border border-electric-blue/50"
                    />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white font-bold leading-none">
                            SAKTHI_MURUGAN
                        </span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-tighter">
                            Stealth Dev v2.0
                        </span>
                    </div>
                </div>
                <div className="flex justify-between px-2">
                    <a
                        href="https://github.com/Sakthi102003"
                        className="text-gray-600 hover:text-electric-blue transition-all tactical-glitch-hover p-1"
                    >
                        <Github size={14} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sakthimurugan-s/"
                        className="text-gray-600 hover:text-electric-blue transition-all tactical-glitch-hover p-1"
                    >
                        <Linkedin size={14} />
                    </a>
                    <a
                        href="mailto:sakthimurugan102003@gmail.com"
                        className="text-gray-600 hover:text-electric-blue transition-all tactical-glitch-hover p-1"
                    >
                        <Mail size={14} />
                    </a>
                    <a
                        href="https://www.instagram.com/sakthiii_techh/"
                        className="text-gray-600 hover:text-electric-blue transition-all tactical-glitch-hover p-1"
                    >
                        <Instagram size={14} />
                    </a>
                    <a
                        href="https://medium.com/@sakthimurugan102003"
                        className="text-gray-600 hover:text-electric-blue transition-all tactical-glitch-hover p-1"
                    >
                        <SiMedium size={14} />
                    </a>
                </div>
            </div>
        </aside>
    )
}
