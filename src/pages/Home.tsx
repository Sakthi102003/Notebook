import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Folder,
  FileCode,
  FileText,
  ChevronRight,
  ChevronDown,
  Monitor,
  User,
  Activity,
  Zap,
  Settings,
  Database,
  Instagram,
  Terminal as TerminalIcon,
  X,
  Menu,
  MessageSquare,
  Box
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiFlask,
  SiDjango,
  SiGit,
  SiGithub,
  SiFirebase,
  SiUbuntu,
  SiKalilinux,
  SiHtml5,
  SiCss3,
  SiChartdotjs,
  SiNumpy,
  SiCentos,
  SiMedium
} from 'react-icons/si'
// import ChatWidget from '../components/ChatWidget'
import ContactForm from '../components/sections/ContactForm'
import FlowingBlogRiver from '../components/sections/FlowingBlogRiver'
import GearsSection from '../components/sections/GearsSection'
import QuotesSection from '../components/sections/QuotesSection'
import VisitorCounter from '../components/features/VisitorCounter'
import GithubHeatmap from '../components/features/GithubHeatmap'

import RansomNoteText from '../components/ui/RansomNoteText'
import ScrambleText from '../components/ui/ScrambleText'
import ProjectLogViewer from '../components/sections/ProjectLogViewer'
import { projects } from '../data/projects'
import { Link } from 'react-router-dom'

const FILE_TREE = [
  { id: 'home', label: 'index.tsx', icon: FileCode, category: 'src' },
  { id: 'about', label: 'bio.md', icon: FileText, category: 'src/identity' },
  { id: 'quotes', label: 'quotes.log', icon: MessageSquare, category: 'src/data' },
  { id: 'skills', label: 'stack.json', icon: Settings, category: 'src/capability' },
  { id: 'projects', label: 'ops/', icon: Folder, category: 'src/deployments', isFolder: true },
  { id: 'gears', label: 'gears.cfg', icon: Monitor, category: 'src/sys' },
  { id: 'contact', label: 'relay.log', icon: TerminalIcon, category: 'src/comm' },
]

function Home() {
  const [activeFile, setActiveFile] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // Scroll active tab into view
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector('[data-active="true"]')
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
    // Scroll active sidebar item into view
    if (sidebarRef.current) {
      const activeItem = sidebarRef.current.querySelector('[data-active="true"]')
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [activeFile])

  return (
    <div className="flex h-screen bg-stealth-900 text-gray-400 font-stealth overflow-hidden selection:bg-electric-blue/30 selection:text-white">
      {/* Visual Accents - Glowing Vertical Lines */}
      <div className="fixed left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-blue/10 to-transparent pointer-events-none" />
      <div className="fixed right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-crimson/10 to-transparent pointer-events-none" />

      {/* IDE Sidebar (File Tree) */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-0'
          } transition-all duration-300 border-r border-white/5 bg-stealth-800/20 backdrop-blur-md hidden md:flex flex-col h-full overflow-hidden`}
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">Explorer</span>
          <TerminalIcon size={14} className="text-white/20" />
        </div>

        <div ref={sidebarRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">
            <ChevronDown size={12} /> Root
          </div>

          {FILE_TREE.map((file) => (
            <button
              key={file.id}
              onClick={() => scrollToSection(file.id)}
              data-active={activeFile === file.id}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all group ${activeFile === file.id
                ? 'bg-electric-blue/10 text-electric-blue'
                : 'hover:bg-white/5 text-gray-500 hover:text-white'
                }`}
            >
              <file.icon size={16} className={activeFile === file.id ? 'text-electric-blue' : 'text-gray-600 group-hover:text-gray-400'} />
              <span className="truncate">{file.label}</span>
              {activeFile === file.id && (
                <motion.div layoutId="file-active" className="ml-auto w-1 h-4 bg-electric-blue shadow-[0_0_8px_#00E5FF]" />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-stealth-900/50">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/blue avatar.png" alt="Profile" className="w-8 h-8 rounded-none border border-electric-blue/50" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-bold leading-none">SAKTHI_MURUGAN</span>
              <span className="text-[8px] text-gray-500 uppercase tracking-tighter">Stealth Dev v2.0</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Sakthi102003" className="text-gray-600 hover:text-electric-blue transition-colors"><Github size={14} /></a>
            <a href="https://www.linkedin.com/in/sakthimurugan-s/" className="text-gray-600 hover:text-electric-blue transition-colors"><Linkedin size={14} /></a>
            <a href="mailto:sakthimurugan102003@gmail.com" className="text-gray-600 hover:text-electric-blue transition-colors"><Mail size={14} /></a>
            <a href="https://www.instagram.com/sakthiii_techh/" className="text-gray-600 hover:text-electric-blue transition-colors"><Instagram size={14} /></a>
            <a href="https://medium.com/@sakthimurugan102003" className="text-gray-600 hover:text-electric-blue transition-colors"><SiMedium size={14} /></a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* IDE Header / Breadcrumbs */}
        <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-stealth-900/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
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
                <span className="text-electric-blue">{FILE_TREE.find(f => f.id === activeFile)?.category}/{FILE_TREE.find(f => f.id === activeFile)?.label}</span>
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
              <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-mono">
                <Activity size={12} className="text-electric-blue animate-pulse" />
                Latency: 14ms
              </div>
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
                    document.documentElement.style.setProperty('--accent-color', t.id === 'blue' ? '0 229 255' : t.id === 'crimson' ? '255 0 60' : '34 197 94');
                  }}
                  className={`w-3 h-3 ${t.color} opacity-40 hover:opacity-100 transition-opacity`}
                  title={`Switch to ${t.id} mode`}
                />
              ))}
              <div className="px-2 text-[8px] font-mono text-white/30 uppercase tracking-widest">Theme</div>
            </div>
          </div>

          {/* Tabs Bar */}
          <div ref={tabsRef} className="flex h-10 border-b border-white/5 bg-stealth-800/10 px-2 overflow-x-auto no-scrollbar">
            {FILE_TREE.map((file) => (
              <button
                key={`tab-${file.id}`}
                onClick={() => scrollToSection(file.id)}
                data-active={activeFile === file.id}
                className={`flex items-center gap-2 px-4 h-full border-r border-white/5 min-w-fit transition-all relative ${activeFile === file.id
                  ? 'bg-stealth-800/40 text-white'
                  : 'text-gray-600 hover:text-gray-400'
                  }`}
              >
                <file.icon size={12} className={activeFile === file.id ? 'text-electric-blue' : 'text-gray-700'} />
                <span className="text-[11px] font-mono">{file.label}</span>
                {activeFile === file.id && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-electric-blue shadow-[0_0_8px_#00E5FF]" />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable Content */}
        <div
          ref={mainContentRef}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-12 space-y-32 no-scrollbar"
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
              <div className="relative w-24 h-24 mb-6">
                <img src="/images/blue avatar.png" alt="Sakthi" className="w-full h-full rounded-full border-2 border-white/10 shadow-2xl transition-all duration-500" />
                <div className="absolute -bottom-1 -right-1 bg-stealth-900 rounded-xl p-1.5 border border-white/10 shadow-lg group">
                  <Box size={16} className="text-electric-blue animate-pulse" />
                </div>
              </div>

              <div className="inline-block px-3 py-1 bg-electric-blue/5 border border-electric-blue/20 text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em]">
                System Initialization // Online
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white">
                <RansomNoteText text="SAKTHIMURUGAN S" className="justify-start gap-2 mb-2" />
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
                  <p><span className="text-white/40"># Current status:</span> Investigating Machine Learning integration & Security outsmarting.</p>
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: SiPython, name: "Python" },
                { icon: SiHtml5, name: "HTML" },
                { icon: SiCss3, name: "CSS" },
                { icon: SiJavascript, name: "JavaScript" },
                { icon: SiTypescript, name: "TypeScript" },
                { icon: SiReact, name: "React.js" },
                { icon: SiTailwindcss, name: "Tailwind CSS" },
                { icon: SiChartdotjs, name: "Chart.js" },
                { icon: SiFlask, name: "Flask" },
                { icon: SiDjango, name: "Django" },
                { icon: SiNumpy, name: "NumPy" },
                { icon: Database, name: "SQL" },
                { icon: SiGit, name: "Git" },
                { icon: SiGithub, name: "GitHub" },
                { icon: SiFirebase, name: "Firebase" },
                { icon: FileCode, name: "VS Code" },
                { icon: SiUbuntu, name: "Ubuntu" },
                { icon: SiKalilinux, name: "Kali Linux" },
                { icon: SiCentos, name: "Centos" }
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -5 }}
                  className="stealth-card p-6 flex flex-col items-center justify-center gap-4 aspect-square group"
                >
                  <skill.icon size={36} className="text-gray-500 group-hover:text-electric-blue transition-all duration-300" />
                  <div className="text-center">
                    <span className="block text-xs font-bold text-white uppercase tracking-widest">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
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
                  className="stealth-card p-8 group flex flex-col h-full cursor-pointer hover:border-electric-blue/30 transition-all"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-electric-blue/5 border border-white/5 text-electric-blue">
                      <Folder size={24} />
                    </div>
                    {/* Icons removed here to create cleaner look, they are inside the log viewer now */}
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

        {/* <ChatWidget /> - Moved to Global App.tsx */}
      </main>
    </div>
  )
}

export default Home
