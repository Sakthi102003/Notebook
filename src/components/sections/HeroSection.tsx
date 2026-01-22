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
    SiDiscord
} from 'react-icons/si'
import { useRef, useState, useEffect } from 'react'

import RansomNoteText from '../ui/RansomNoteText'
import ScrambleText from '../ui/ScrambleText'
import AgeCounter from '../features/AgeCounter'
import SystemClock from '../features/SystemClock'
import WakatimeStats from '../features/WakatimeStats'
import SpotifyStatus from '../features/SpotifyStatus'
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
    MEDIUM: {
        name: "Sakthimurugan S",
        handle: "sakthimurugan102003",
        bio: "Distilling complex security research into readable technical deep-dives.",
        avatar: "https://miro.medium.com/v2/resize:fill:176:176/1*kRuWkrO9HoGf6f1EkeAV1A.png",
        banner: "linear-gradient(135deg, #000000 0%, #333333 100%)",
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
        // Fetch GitHub stats
        fetch('https://api.github.com/users/Sakthi102003')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSocialsData(prev => ({
                        ...prev,
                        GITHUB: {
                            ...prev.GITHUB,
                            stats: [
                                { label: 'followers', value: data.followers ? `${data.followers}` : '0' },
                                { label: 'public_repos', value: data.public_repos ? `${data.public_repos}` : '0' }
                            ]
                        }
                    }))
                }
            })
            .catch(err => console.error("GitHub fetch failed", err));

        // Fetch Medium stats
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed')
            .then(res => res.json())
            .then(data => {
                if (data.items) {
                    setSocialsData(prev => ({
                        ...prev,
                        MEDIUM: {
                            ...prev.MEDIUM,
                            stats: [
                                { label: 'latest_posts', value: `${data.items.length}` }
                            ]
                        }
                    }))
                }
            })
            .catch(err => console.error("Medium fetch failed", err));

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
                        onMouseEnter={handleMouseEnterIcon}
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
                    <div className="flex gap-6 relative">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2"
                                title={social.label}
                                onMouseEnter={(e) => handleSocialEnter(social.id, e)}
                                onMouseLeave={() => setHoveredSocial(null)}
                            >
                                <social.icon size={20} className="text-gray-500 group-hover:text-electric-blue transition-colors duration-300" />
                                <motion.div
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-electric-blue group-hover:w-full transition-all duration-300"
                                    layoutId={`social-hover-${social.label}`}
                                />
                            </a>
                        ))}

                        <AnimatePresence>
                            {hoveredSocial && (
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
                        className="px-8 py-4 bg-electric-blue text-stealth-900 font-bold hover:shadow-[0_0_30px_#00E5FF] transition-all flex items-center gap-2 group uppercase tracking-widest text-xs tactical-glitch-hover"
                    >
                        INITIALIZE_RECON <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                        href="https://drive.google.com/file/d/1XP0eR-HanWD3CqGtO9ZeTe6enXxylaSk/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2 uppercase tracking-widest text-xs tactical-glitch-hover"
                    >
                        EXTRACT_IDENT.PDF <Monitor size={16} />
                    </a>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="pt-8 flex flex-col gap-4 text-[10px] text-gray-500 font-mono uppercase tracking-widest"
                >
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-1.5 opacity-70">
                            <kbd className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 text-gray-400">CTRL K</kbd>
                            <span className="text-gray-600">COMMANDS</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-70">
                            <kbd className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 text-gray-400">CTRL \</kbd>
                            <span className="text-gray-600">TERMINAL</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-70">
                            <kbd className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 text-gray-400">ALT D</kbd>
                            <span className="text-gray-600">DIAGNOSTICS</span>
                        </div>
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
