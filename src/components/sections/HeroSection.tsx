import { motion, AnimatePresence } from 'framer-motion'
import {
    Github,
    Linkedin,
    Mail,
    ChevronRight,
    Monitor,
} from 'lucide-react'
import {
    SiTypescript,
    SiReact,
    SiTailwindcss,
    SiPython,
    SiMedium,
    SiDiscord,
    SiGithub,
    SiLinkedin,
    SiGmail,
    SiX
} from 'react-icons/si'
import { useRef, useState, useEffect } from 'react'

import AgeCounter from '../features/AgeCounter'
import WakatimeStats from '../features/WakatimeStats'
import LatestCommit from '../features/LatestCommit'
import SocialProfileCard from '../ui/SocialProfileCard'

interface HeroSectionProps {
    scrollToSection: (id: string) => void
}

const INITIAL_SOCIALS_DATA = {
    GITHUB: {
        name: "Sakthimurugan S",
        handle: "Sakthi102003",
        bio: "Cybersecurity • Python • Full-Stack Building secure & practical tools",
        avatar: "https://avatars.githubusercontent.com/u/114235143?v=4",
        banner: "linear-gradient(90deg, #0d1117 0%, #161b22 100%)",
        stats: [] as { label: string; value: string }[]
    },
    LINKEDIN: {
        name: "Sakthimurugan S",
        handle: "sakthimurugan-s",
        bio: "Cybersecurity Researcher | Full Stack Developer | Building secure digital infrastructure",
        avatar: "/images/profile.jpg",
        banner: "/images/linkedin-banner.png",
        platform: 'LINKEDIN',
        stats: [
            { label: "connections", value: "500+" }
        ]
    },
    MAIL: {
        name: "Sakthimurugan S",
        handle: "sakthimurugan102003@gmail.com",
        bio: "Available for high-impact collaborations and secure freelance architecture.",
        avatar: "/images/blue avatar.png",
        banner: "linear-gradient(135deg, #4285f4 0%, #34a853 33%, #fbbc05 66%, #ea4335 100%)",
        isEmail: true,
        stats: [] as { label: string; value: string }[]
    },
    DISCORD: {
        name: "Sakthi",
        handle: "sakthi102003",
        bio: "Chat, collaborate, and discuss security research.",
        avatar: "https://cdn.discordapp.com/avatars/1074201854143123560/046bffa764f10d06a65dcbce5c6e5b5a.png",
        banner: "linear-gradient(135deg, #5865F2 0%, #404EED 100%)",
        platform: 'DISCORD',
        stats: [
            { label: 'custom_status', value: 'A Normal Sec Dev' }
        ]
    },
    X: {
        name: "Sakthi",
        handle: "sakthimurugans_",
        bio: "22 | Frontend | Security | Python | Cricket | Tech Content Writer | ICT | MI 💙",
        avatar: "/images/x-avatar.png",
        banner: "/images/x-banner.png",
        platform: 'X',
        stats: [] as { label: string; value: string }[]
    }
};

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
    const [socialsData, setSocialsData] = useState(INITIAL_SOCIALS_DATA)
    const [showWakatimeModal, setShowWakatimeModal] = useState(false)
    const [hoveredSocial, setHoveredSocial] = useState<keyof typeof INITIAL_SOCIALS_DATA | null>(null)
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
    const iconRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Fetch GitHub stats and profile
        fetch('https://api.github.com/users/Sakthi102003')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSocialsData(prev => ({
                        ...prev,
                        GITHUB: {
                            ...prev.GITHUB,
                            name: data.name || prev.GITHUB.name,
                            avatar: data.avatar_url || prev.GITHUB.avatar,
                            bio: data.bio || prev.GITHUB.bio,
                            stats: [
                                { label: 'followers', value: data.followers ? `${data.followers}` : '0' },
                                { label: 'public_repos', value: data.public_repos ? `${data.public_repos}` : '0' }
                            ]
                        }
                    }))
                }
            })
            .catch(err => console.error("GitHub fetch failed", err));



        // Fetch Discord stats via Lanyard
        // Fetch Discord stats via Lanyard
        fetch('https://api.lanyard.rest/v1/users/1074201854143123560')
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    const user = data.data.discord_user;
                    const discordStatus = data.data.discord_status || 'offline';

                    // Try to find a custom status activity (usually type 4)
                    const activities = data.data.activities || [];
                    const customStatusActivity = activities.find((a: any) => a.type === 4);
                    const customStatusText = customStatusActivity?.state || 'keep shipping!';

                    setSocialsData(prev => ({
                        ...prev,
                        DISCORD: {
                            ...prev.DISCORD,
                            name: user.display_name || user.username,
                            handle: user.username,
                            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                            stats: [
                                { label: 'status', value: discordStatus },
                                { label: 'custom_status', value: customStatusText }
                            ]
                        }
                    }))
                }
            })
            .catch(err => console.error("Discord fetch failed", err));

    }, []);

    const handleMouseEnterIcon = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect()
            setPopupPosition({ x: rect.right + 20, y: rect.top })
            setShowWakatimeModal(true)
        }
    }

    const handleSocialEnter = (id: keyof typeof INITIAL_SOCIALS_DATA, e: React.MouseEvent) => {
        // Disable hover preview on mobile to prevent layout issues
        if (window.innerWidth < 768) return;
        
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPopupPosition({ x: rect.left, y: rect.bottom + 10 });
        setHoveredSocial(id);
    };

    const SOCIAL_LINKS = [
        { id: 'GITHUB' as const, icon: Github, href: 'https://github.com/Sakthi102003', label: 'GITHUB' },
        { id: 'LINKEDIN' as const, icon: Linkedin, href: 'https://www.linkedin.com/in/sakthimurugan-s/', label: 'LINKEDIN' },
        { id: 'MAIL' as const, icon: Mail, href: 'mailto:sakthimurugan102003@gmail.com', label: 'MAIL' },
        { id: 'DISCORD' as const, icon: SiDiscord, href: 'https://discord.com/users/1074201854143123560', label: 'DISCORD' },
        { id: 'MEDIUM' as const, icon: SiMedium, href: 'https://medium.com/@sakthimurugan102003', label: 'MEDIUM' }
    ];

    return (
        <section id="home" className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                {/* Avatar Feature from New Design */}
                <div className="relative w-24 h-24 mb-6 z-50">
                    <img src="/images/blue avatar.png" alt="Sakthi" className="w-full h-full rounded-full border-2 shadow-2xl transition-all duration-500" style={{ borderColor: 'var(--border-subtle)' }} />
                    <div
                        ref={iconRef}
                        onMouseEnter={handleMouseEnterIcon}
                        onMouseLeave={() => setShowWakatimeModal(false)}
                        className="absolute -bottom-1 -right-1 rounded-xl p-1.5 shadow-lg transition-colors cursor-help"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)' }}
                    >
                        <img src="/images/vscode.png" alt="VS Code Stats" className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] rounded-full" style={{ background: 'rgba(var(--accent-color) / 0.1)', border: '1px solid var(--border-soft)', color: 'var(--accent-cyan)' }}>
                        Welcome to my corner of the web
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] rounded-full animate-pulse-slow" style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--accent-green)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        Available for Freelance
                    </div>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
                    <span className="block text-lg sm:text-xl font-medium mb-2" style={{ color: 'var(--accent-red)' }}>Hi, I’m</span>
                    <div className="flex flex-wrap items-end gap-3 md:gap-4">
                        <span className="font-display">Sakthimurugan</span>
                        <div className="text-xs md:text-sm font-mono mb-1.5 md:mb-3 opacity-70" style={{ color: 'var(--accent-cyan)' }}><AgeCounter /></div>
                    </div>
                    <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 font-display font-medium tracking-tight break-words" style={{ color: 'var(--text-muted)' }}>
                        I make thoughtful digital experiences and secure tools.
                    </span>
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex flex-wrap items-center gap-4 md:gap-x-12 md:gap-y-6 mt-6"
                >
                    {/* Social Links with App Icon Style */}
                    <div className="flex flex-wrap gap-3 md:gap-6 relative justify-start">
                        {[
                            { id: 'X' as const, icon: SiX, href: 'https://x.com/sakthimurugans_', label: 'X', color: 'text-current' },
                            { id: 'LINKEDIN' as const, icon: SiLinkedin, href: 'https://www.linkedin.com/in/sakthimurugan-s/', label: 'LINKEDIN', color: 'text-[#0077b5]' },
                            { id: 'GITHUB' as const, icon: SiGithub, href: 'https://github.com/Sakthi102003', label: 'GITHUB', color: 'text-current' },
                            { id: 'MAIL' as const, icon: SiGmail, href: 'mailto:sakthimurugan102003@gmail.com', label: 'MAIL', color: 'text-[#EA4335]' },
                            { id: 'DISCORD' as const, icon: SiDiscord, href: 'https://discord.com/users/1074201854143123560', label: 'DISCORD', color: 'text-[#5865F2]' }
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                title={social.label}
                                onMouseEnter={(e) => handleSocialEnter(social.id, e)}
                                onMouseLeave={() => setHoveredSocial(null)}
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 transition-all duration-300 relative overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                                    {/* Gloss reflection */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50" />

                                    <social.icon size={22} className={`${social.color} relative z-10 transition-colors duration-300 md:w-[26px] md:h-[26px]`} />
                                </div>
                            </a>
                        ))}

                        <AnimatePresence>
                            {hoveredSocial && socialsData[hoveredSocial] && (
                                <div
                                    className="fixed z-[100] pointer-events-none"
                                    style={{
                                        left: popupPosition.x,
                                        top: popupPosition.y,
                                    }}
                                >
                                    <SocialProfileCard
                                        {...socialsData[hoveredSocial]}
                                        PlatformIcon={SOCIAL_LINKS.find(s => s.id === hoveredSocial)?.icon}
                                    />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-full sm:w-auto flex-grow max-w-full sm:max-w-[300px]">
                        <LatestCommit isSmall />
                    </div>
                </motion.div>

                <div className="glow-line-blue opacity-50 max-w-md" />

                <div className="text-base md:text-lg max-w-2xl leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
                    <span className="inline">I turn ideas into friendly, useful web experiences with </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline rounded-md text-sm font-mono transition-colors cursor-default whitespace-nowrap" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                        <SiTypescript size={12} /> TypeScript
                    </span>
                    <span className="inline">, </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline rounded-md text-sm font-mono transition-colors cursor-default whitespace-nowrap" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                        <SiReact size={12} /> React
                    </span>
                    <span className="inline"> and </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline rounded-md text-sm font-mono transition-colors cursor-default whitespace-nowrap" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                        <SiTailwindcss size={12} /> Tailwind
                    </span>
                    <span className="inline">. I also explore security research with </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 align-baseline rounded-md text-sm font-mono transition-colors cursor-default whitespace-nowrap" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--accent-red)' }}>
                        <SiPython size={12} /> Python
                    </span>
                    <span className="inline">, plus high-performance development. Always curious, always building.</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="btn-primary rounded-xl"
                    >
                        Explore my work <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                        href="https://drive.google.com/file/d/1XP0eR-HanWD3CqGtO9ZeTe6enXxylaSk/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost rounded-xl"
                    >
                        Download Resume <Monitor size={16} />
                    </a>
                </div>

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
                        <div className="w-80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <WakatimeStats />
                        </div>
                    </div>
                )}
            </motion.div>
        </section >
    )
}
