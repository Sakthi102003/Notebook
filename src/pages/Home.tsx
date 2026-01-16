import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Folder,
  ChevronRight,
  Monitor,
  User,
  Activity,
  Zap,
  Instagram,
  Terminal as TerminalIcon
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiMedium
} from 'react-icons/si'
// import ChatWidget from '../components/ChatWidget'
import ContactForm from '../components/sections/ContactForm'
import FlowingBlogRiver from '../components/sections/FlowingBlogRiver'
import GearsSection from '../components/sections/GearsSection'
import QuotesSection from '../components/sections/QuotesSection'
import VisitorCounter from '../components/features/VisitorCounter'
import GithubHeatmap from '../components/features/GithubHeatmap'
import SkillsMarquee from '../components/sections/SkillsMarquee'

import RansomNoteText from '../components/ui/RansomNoteText'
import ScrambleText from '../components/ui/ScrambleText'
import ProjectLogViewer from '../components/sections/ProjectLogViewer'
import { projects } from '../data/projects'
import { Link } from 'react-router-dom'
import AgeCounter from '../components/features/AgeCounter'
import SystemClock from '../components/features/SystemClock'

import WakatimeStats from '../components/features/WakatimeStats'

import StealthSidebar from '../components/layout/StealthSidebar'
import StealthHeader from '../components/layout/StealthHeader'
import HoloCard from '../components/ui/HoloCard'
import { FILE_TREE } from '../data/navigation'

function Home() {
  const [activeFile, setActiveFile] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setIsScrolled(mainContentRef.current.scrollTop > 20)
      }
    }

    const observerOptions = {
      root: mainContentRef.current,
      rootMargin: '-20% 0px -70% 0px', // Adjust to trigger when section is near the top
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveFile(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Track all sections in the file tree
    FILE_TREE.forEach((file) => {
      const el = document.getElementById(file.id)
      if (el) observer.observe(el)
    })

    const contentArea = mainContentRef.current
    contentArea?.addEventListener('scroll', handleScroll)

    return () => {
      contentArea?.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    setActiveFile(id)
    const element = document.getElementById(id)
    if (element && mainContentRef.current) {
      const offset = element.offsetTop - 100
      mainContentRef.current.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex h-screen bg-stealth-900 text-gray-400 font-stealth overflow-hidden selection:bg-electric-blue/30 selection:text-white">
      {/* Visual Accents - Glowing Vertical Lines */}
      <div className="fixed left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-blue/10 to-transparent pointer-events-none" />
      <div className="fixed right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-crimson/10 to-transparent pointer-events-none" />

      {/* IDE Sidebar (File Tree) */}
      <StealthSidebar
        isOpen={sidebarOpen}
        activeFile={activeFile}
        onNavigate={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* IDE Header / Breadcrumbs */}
        <StealthHeader
          isScrolled={isScrolled}
          activeFile={activeFile}
          onNavigate={scrollToSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Scrollable Content */}
        <div
          ref={mainContentRef}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-12 space-y-32"
        >
          {/* Section: Home (index.tsx) */}
          <section id="home" className="min-h-[80vh] flex flex-col justify-center max-w-4xl mx-auto">
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

              <div className="inline-block px-3 py-1 bg-electric-blue/5 border border-electric-blue/20 text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em]">
                System Initialization // Online
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
                className="flex gap-6 mt-6"
              >
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
            </motion.div>
          </section>

          {/* Section: About (bio.md) */}
          <section id="about" className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                <span className="text-crimson font-mono opacity-50">01.</span> MISSION_PARAMS
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>

            <div className="flex flex-col gap-12 items-start">
              <div className="w-full space-y-8">
                <div className="code-block text-sm leading-loose text-gray-300">
                  <p className="mb-2"><span className="text-crimson"># Objective:</span> Turning complex problems into elegant, secure codebases.</p>
                  <p className="mb-2"><span className="text-electric-blue"># Background:</span> Cybersecurity researcher with a passion for modern web engineering.</p>
                  <p className="mb-2"><span className="text-white/40"># Current status:</span> Investigating Machine Learning integration & Security outsmarting.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <User className="text-electric-blue shrink-0 mt-1" size={20} />
                    <p className="text-gray-400">
                      Developing real-world projects powered by Python, ML, and React. Turning messy ideas into tactical tools that behave under pressure.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="text-crimson shrink-0 mt-1" size={20} />
                    <p className="text-gray-400">
                      Staying ahead isn't just work—it's a favorite cure for boredom. Keeping this workspace full of experiments and breakthroughs.
                    </p>
                  </div>
                </div>




              </div>
            </div>
          </section>

          {/* Section: Quotes (quotes.log) */}
          <section id="quotes">
            <QuotesSection />
          </section>

          {/* Section: Skills (stack.json) */}
          <section id="skills" className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                <span className="text-crimson font-mono opacity-50">02.</span> TECH_CAPABILITY
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>

            <div className="w-full -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-0">
              <SkillsMarquee />
            </div>

            <div className="mt-16">
              <GithubHeatmap />
            </div>
          </section>

          {/* Section: Projects (ops/) */}
          <section id="projects" className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                <span className="text-crimson font-mono opacity-50">03.</span> DEPLOYED_ASSETS
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <HoloCard
                    className="stealth-card p-8 group flex flex-col h-full cursor-pointer hover:border-electric-blue/30 transition-all font-stealth"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-electric-blue/5 border border-white/5 text-electric-blue">
                        <Folder size={24} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-electric-blue transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_5px_#00E5FF]" />
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{project.status}</span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-mono uppercase tracking-tighter">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[9px] font-mono text-white/30 px-2 py-0.5 border border-white/5 bg-white/5 uppercase">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-2 text-[10px] font-mono text-electric-blue/50 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TerminalIcon size={12} />
                      CLICK_TO_VIEW_LOGS
                    </div>
                  </HoloCard>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                to="/projects"
                className="group flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-electric-blue text-white transition-all uppercase tracking-[0.3em] text-xs"
              >
                View_Project_Archives <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          <ProjectLogViewer project={selectedProject} onClose={() => setSelectedProject(null)} />

          {/* Section: Gears (gears.cfg) */}
          <section id="gears">
            <GearsSection />
          </section>

          {/* Section: Contact (relay.log) */}
          <section id="contact" className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                <span className="text-crimson font-mono opacity-50">04.</span> SIGNAL_TRANSMISSION
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>

            <div className="stealth-card p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Monitor size={120} />
              </div>

              <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">Command Center</h3>
                    <div className="glow-line-blue w-20" />
                    <p className="text-gray-400 font-mono text-sm leading-relaxed uppercase tracking-tighter">
                      Encrypted channel open for reconnaissance and collaboration.
                      Initiating mission briefing for potential partners.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: 'RELAY', value: 'sakthimurugan102003@gmail.com', href: 'mailto:sakthimurugan102003@gmail.com' },
                      { icon: Github, label: 'SIGNAL', value: 'github.com/Sakthi102003', href: 'https://github.com/Sakthi102003' },
                      { icon: Linkedin, label: 'NETWORK', value: 'linkedin.com/in/sakthimurugan-s', href: 'https://www.linkedin.com/in/sakthimurugan-s/' },
                      { icon: Instagram, label: 'VISUAL', value: 'instagram.com/sakthiii_techh', href: 'https://www.instagram.com/sakthiii_techh/' },
                      { icon: SiMedium, label: 'LOGS', value: 'medium.com/@sakthimurugan102003', href: 'https://medium.com/@sakthimurugan102003' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-6 group">
                        <div className="p-3 bg-white/5 border border-white/10 group-hover:border-electric-blue group-hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all">
                          <item.icon size={20} className="text-gray-600 group-hover:text-electric-blue transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase mb-1">{item.label}</span>
                          <a href={item.href} className="text-sm text-gray-300 hover:text-white font-mono uppercase tracking-tighter transition-colors">
                            {item.value}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-stealth-900/50 p-8 border border-white/5">
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

          {/* Flowing Blog Feed */}
          <section className="pt-20">
            <FlowingBlogRiver />
          </section>

          {/* Status Metrics (Footer-ish) */}
          <footer className="border-t border-white/5 py-12 text-center space-y-8">
            <div className="flex justify-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
              <span>Version 2.0.4-STABLE</span>
              <span>Environment: Production</span>
              <span>Region: DEPLOY_GLOBAL</span>
            </div>

            <div className="flex justify-center">
              <VisitorCounter />
            </div>

            <p className="text-xs text-gray-600 uppercase tracking-widest font-mono">
              &copy; {new Date().getFullYear()} SAKTHI_MURUGAN // STEALTH_PROTOCOL // ALL_SYSTEMS_GO
            </p>
          </footer>
        </div>

        {/* IDE Footer / Status Bar */}
        <footer className="h-6 bg-electric-blue flex items-center justify-between px-3 text-stealth-900 text-[10px] font-mono font-bold z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity size={10} />
              <span>MAIN*</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={10} />
              <span>0 ERRORS</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>TypeScript JSX</span>
            <span>SakthiLabs_v2.0</span>
          </div>
        </footer>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-stealth-900/80 backdrop-blur-sm z-[90] md:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 w-64 bg-stealth-800 border-r border-white/10 z-[100] md:hidden flex flex-col"
              >
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white uppercase tracking-widest">Navigation</h2>
                </div>
                <div className="flex-1 p-4 space-y-2">
                  {FILE_TREE.map(file => (
                    <button
                      key={`mob-${file.id}`}
                      onClick={() => { scrollToSection(file.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-mono uppercase tracking-widest transition-all ${activeFile === file.id ? 'bg-electric-blue/10 text-electric-blue border-l-2 border-electric-blue' : 'text-gray-400'
                        }`}
                    >
                      <file.icon size={18} />
                      {file.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showWakatimeModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* <ChatWidget /> - Moved to Global App.tsx */}
      </main>
    </div>
  )
}

export default Home
