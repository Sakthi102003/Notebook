import { motion } from 'framer-motion'
import {
    Github,
    Linkedin,
    Mail,
    ChevronRight,
    Monitor,
    Instagram,
} from 'lucide-react'
import {
    SiTypescript,
    SiReact,
    SiTailwindcss,
    SiPython,
    SiMedium
} from 'react-icons/si'
import { useRef, useState } from 'react'

import RansomNoteText from '../ui/RansomNoteText'
import ScrambleText from '../ui/ScrambleText'
import AgeCounter from '../features/AgeCounter'
import SystemClock from '../features/SystemClock'
import WakatimeStats from '../features/WakatimeStats'
import SpotifyStatus from '../features/SpotifyStatus'

interface HeroSectionProps {
    scrollToSection: (id: string) => void
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
    const [showWakatimeModal, setShowWakatimeModal] = useState(false)
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
    const iconRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect()
            setPopupPosition({ x: rect.right + 20, y: rect.top })
            setShowWakatimeModal(true)
        }
    }

    return (
        <section id="home" className="min-h-[80vh] flex flex-col justify-center max-w-4xl mx-auto relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                {/* Avatar Feature from New Design */}
                <div className="relative w-24 h-24 mb-6 z-50">
                    <img src="/images/blue avatar.png" alt="Sakthi" className="w-full h-full rounded-full border-2 border-white/10 shadow-2xl transition-all duration-500" />
                    <div
                        ref={iconRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={() => setShowWakatimeModal(false)}
                        className="absolute -bottom-1 -right-1 bg-stealth-900 rounded-xl p-1.5 border border-white/10 shadow-lg group hover:border-electric-blue/50 transition-colors cursor-help"
                    >
                        <img src="/images/vscode.png" alt="VS Code Stats" className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" />
                    </div>
                </div>

                <SystemClock />

                <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-block px-3 py-1 bg-electric-blue/5 border border-electric-blue/20 text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em]">
                        System Initialization // Online
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 text-[10px] font-mono text-green-500 uppercase tracking-[0.3em] animate-pulse-slow">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        Freelance_Work // Available
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white">
                    <div className="flex flex-wrap items-end gap-3 md:gap-4 mb-2">
                        <RansomNoteText text="SAKTHIMURUGAN S" className="justify-start gap-2" />
                        <div className="text-xs md:text-sm font-mono text-electric-blue mb-1.5 md:mb-3 opacity-70">
                            <AgeCounter />
                        </div>
                    </div>
                    <span className="block text-2xl md:text-4xl text-gray-500 mt-4 font-mono font-light tracking-widest uppercase">
                        <ScrambleText text="Dev & Security Enthusiast" delay={1.5} />
                    </span>
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex flex-wrap items-center gap-x-12 gap-y-6 mt-6"
                >
                    <div className="flex gap-6">
                        {[
                            { icon: Github, href: 'https://github.com/Sakthi102003', label: 'GITHUB' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/sakthimurugan-s/', label: 'LINKEDIN' },
                            { icon: Mail, href: 'mailto:sakthimurugan102003@gmail.com', label: 'MAIL' },
                            { icon: Instagram, href: 'https://www.instagram.com/sakthiii_techh/', label: 'INSTAGRAM' },
                            { icon: SiMedium, href: 'https://medium.com/@sakthimurugan102003', label: 'MEDIUM' }
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2"
                                title={social.label}
                            >
                                <social.icon size={20} className="text-gray-500 group-hover:text-electric-blue transition-colors duration-300" />
                                <motion.div
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-electric-blue group-hover:w-full transition-all duration-300"
                                    layoutId={`social-hover-${social.label}`}
                                />
                            </a>
                        ))}
                    </div>

                    <div className="flex-grow max-w-[300px]">
                        <SpotifyStatus isSmall />
                    </div>
                </motion.div>

                <div className="glow-line-blue opacity-50 max-w-md" />

                <div className="text-lg text-gray-400 max-w-2xl leading-relaxed font-sans">
                    <span className="inline">Specializing in razor-sharp web experiences using </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline bg-stealth-800 border border-white/10 rounded-md text-sm font-mono text-electric-blue hover:border-electric-blue/50 transition-colors cursor-default whitespace-nowrap">
                        <SiTypescript size={12} /> TypeScript
                    </span>
                    <span className="inline">, </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline bg-stealth-800 border border-white/10 rounded-md text-sm font-mono text-cyan-400 hover:border-cyan-400/50 transition-colors cursor-default whitespace-nowrap">
                        <SiReact size={12} /> React
                    </span>
                    <span className="inline"> and </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline bg-stealth-800 border border-white/10 rounded-md text-sm font-mono text-teal-400 hover:border-teal-400/50 transition-colors cursor-default whitespace-nowrap">
                        <SiTailwindcss size={12} /> Tailwind
                    </span>
                    <span className="inline">. Focused on security research with </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline bg-stealth-800 border border-white/10 rounded-md text-sm font-mono text-yellow-400 hover:border-yellow-400/50 transition-colors cursor-default whitespace-nowrap">
                        <SiPython size={12} /> Python
                    </span>
                    <span className="inline">, and high-performance development. Based in the digital shadows, building the future of the web.</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="px-8 py-4 bg-electric-blue text-stealth-900 font-bold hover:shadow-[0_0_30px_#00E5FF] transition-all flex items-center gap-2 group uppercase tracking-widest text-xs"
                    >
                        INITIALIZE_RECON <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                        href="https://drive.google.com/file/d/1XP0eR-HanWD3CqGtO9ZeTe6enXxylaSk/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
                    >
                        EXTRACT_IDENT.PDF <Monitor size={16} />
                    </a>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="pt-8 flex items-center gap-3 text-[10px] text-gray-500 font-mono uppercase tracking-widest"
                >
                    <div className="flex items-center gap-1.5 opacity-70">
                        <kbd className="px-2 py-1 border border-white/10 rounded bg-white/5 font-sans font-bold text-gray-400">CTRL</kbd>
                        <span className="text-electric-blue">+</span>
                        <kbd className="px-2 py-1 border border-white/10 rounded bg-white/5 font-sans font-bold text-gray-400">K</kbd>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-electric-blue animate-pulse" />
                        <span>Command_Palette_Ready</span>
                    </div>
                </motion.div>

                {showWakatimeModal && (
                    <div
                        style={{
                            position: 'fixed',
                            left: popupPosition.x,
                            top: popupPosition.y,
                            zIndex: 100
                        }}
                        className="pointer-events-none"
                    >
                        <div className="w-80 bg-stealth-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                            <WakatimeStats />
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    )
}
