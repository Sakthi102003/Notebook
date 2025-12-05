import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Code,
  Database,
  ExternalLink,
  FolderOpen,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Star,
  User,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaMedium, FaWhatsapp } from 'react-icons/fa'
import {
  SiCentos,
  SiChartdotjs,
  SiCss3,
  SiDjango,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiNumpy,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUbuntu
} from 'react-icons/si'
import ChatWidget from './components/ChatWidget'
import ContactForm from './components/ContactForm'
import FlowingBlogRiver from './components/FlowingBlogRiver'
import GearsSection from './components/GearsSection'
import QuotesSection from './components/QuotesSection'
import VisitorCounter from './components/VisitorCounter'
import LoadingScreen from './components/LoadingScreen'
import NeoBrutalistCard from './components/NeoBrutalistCard'
import GithubHeatmap from './components/GithubHeatmap'

const projects = [
  {
    title: 'Reposocope',
    description: 'Developed a comprehensive React-based analytics tool that provides deep insights into GitHub user activity. The application analyzes repositories, technology stacks, contribution patterns, and generates detailed reports with comparison features between users.',
    tech: ['React', 'GitHub API', 'Chart.js', 'Framer Motion', 'TypeScript'],
    status: 'Completed',
    link: 'https://github.com/Sakthi102003/reposcope',
    demoLink: 'https://reposcope-2003.web.app/',
    highlights: [
      'User Activity Analysis',
      'Repository Statistics',
      'Tech Stack Analysis',
      'Downloadable Reports',
      'User Comparison Features'
    ]
  },
  {
    title: 'Phishield',
    description: 'Built an advanced machine learning-based web application that detects phishing websites in real-time. The system uses sophisticated algorithms to analyze URLs and website characteristics, providing instant threat assessment with detailed reporting and user-friendly interface.',
    tech: ['Python', 'React.js', 'Flask', 'Scikit Learn', 'Pandas'],
    status: 'Completed',
    link: 'https://github.com/Sakthi102003/phishield',
    demoLink: 'https://phisshield.onrender.com/',
    highlights: [
      'Real-time URL Analysis',
      'ML-based Threat Detection',
      'User-friendly Reporting',
      'Security Recommendations'
    ]
  },
  {
    title: 'Tech IQ',
    description: 'An innovative AI-powered platform that helps developers and teams make informed decisions about their technology stack. The application leverages OpenAI and Google Gemini to provide intelligent recommendations, cost estimations, and development roadmaps.',
    tech: ['React', 'OpenAI API', 'Gemini API', 'Vite', 'Firebase'],
    status: 'Completed',
    link: 'https://github.com/Sakthi102003/tech-iq',
    highlights: [
      'AI-Powered Recommendations',
      'Cost Estimation',
      'Development Roadmap',
      'PDF Export'
    ]
  },
  {
    title: 'CyberBuddy',
    description: 'An intelligent cybersecurity chatbot designed to provide real-time security assistance, threat analysis, and educational guidance. Built with advanced AI capabilities to help users understand cybersecurity concepts, analyze potential threats, and get personalized security recommendations.',
    tech: ['React', 'Gemini API', 'Python', 'NLP'],
    status: 'Completed',
    link: 'https://github.com/Sakthi102003/CyberBuddy',
    demoLink: 'https://cyberbuddy-x7zp.onrender.com/',
    highlights: [
      'Real-time Threat Analysis',
      'Security Best Practices',
      'Vulnerability Assessment',
      'Interactive Learning'
    ]
  },
  {
    title: 'GuardianHash',
    description: 'Created a comprehensive file integrity monitoring solution with both command-line and graphical interfaces. The tool generates and verifies cryptographic hashes to detect file tampering, maintains detailed logs, and can send email alerts for security incidents.',
    tech: ['Python', 'Tkinter', 'Cryptography', 'JSON'],
    status: 'Completed',
    link: 'https://github.com/Sakthi102003/GuardianHash',
    highlights: [
      'Hash Generation (MD5/SHA256)',
      'File Tampering Detection',
      'CLI and GUI Interfaces',
      'Email Alert System'
    ]
  }
]

// BackgroundOrbs removed — replaced by Neo-Brutalist background in CSS

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'morning' | 'afternoon' | 'evening' | 'night'>('morning')
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Function to determine time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 8) return 'dawn'
    if (hour >= 8 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 20) return 'evening'
    return 'night'
  }

  // Update time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      const newTimeOfDay = getTimeOfDay()
      setTimeOfDay(newTimeOfDay)
      document.documentElement.className = newTimeOfDay
    }

    updateTimeOfDay()
    
    // Update every minute to check for time changes
    const interval = setInterval(updateTimeOfDay, 60000)
    
    return () => clearInterval(interval)
  }, [])

  // Map sections to their corresponding titles
  const sectionTitles = {
    home: "Sakthi's Digital Space",
    about: "Mission Brief | Sakthi's Digital Space",
    skills: "Tech Stack | Sakthi's Digital Space",
    projects: "Projects | Sakthi's Digital Space",
    contact: "Transmission | Sakthi's Digital Space"
  }

  useEffect(() => {
    // Update document title when active section changes
    document.title = sectionTitles[activeSection as keyof typeof sectionTitles] || "Sakthi's Digital Space"

    // Create observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-50% 0px', // Consider section in view when it reaches middle of viewport
        threshold: 0
      }
    )

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(sectionId)
  }

  useEffect(() => {
    // Close mobile menu on viewport >= lg
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App Content */}
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen transition-colors duration-1000"
        >
          {/* Navigation */}
          <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b-2 border-black dark:border-white transition-all duration-1000">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo - Left Side */}
          <motion.div 
            className="font-notebook font-bold text-highlight-blue dark:text-highlight-cyan flex items-center gap-3 cursor-pointer flex-shrink-0 lg:w-60"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => scrollToSection('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSection('home');
              }
            }}
            aria-label="Go to Home"
            title="Go to Home"
          >
            <img src="/images/blue avatar.png" alt="Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-black dark:border-white" />
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl">Sakthi's</span>
              <span className="text-lg sm:text-xl">Space</span>
            </div>
          </motion.div>
          
          {/* Navigation Menu - Center */}
          <div className="hidden lg:flex space-x-8 flex-1 justify-center">
            {[
              { id: 'home', label: 'Home', icon: BookOpen },
              { id: 'about', label: 'Mission Brief', icon: User },
              { id: 'skills', label: 'Tech Stack', icon: Code },
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'contact', label: 'Transmission', icon: Mail }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-2 px-3 py-2 border-2 transition-all duration-200 ${
                  activeSection === id 
                    ? 'border-black dark:border-white bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' 
                    : 'border-transparent hover:border-black dark:hover:border-white text-gray-600 dark:text-gray-300 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                }`}
              >
                <Icon size={18} />
                <span className="font-body">{label}</span>
              </button>
            ))}
          </div>

          {/* Right Side - Time of Day Indicator and Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 lg:w-60 lg:justify-end">
            {/* Time of Day Indicator */}
            <div
              className="p-2 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-200 flex items-center gap-2 flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
              title={timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
            >
              {timeOfDay === 'dawn' && <span className="text-lg">🌅</span>}
              {timeOfDay === 'morning' && <span className="text-lg">☀️</span>}
              {timeOfDay === 'afternoon' && <span className="text-lg">🌤️</span>}
              {timeOfDay === 'evening' && <span className="text-lg">🌆</span>}
              {timeOfDay === 'night' && <span className="text-lg">🌙</span>}
            </div>

            <button
              className="p-2 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 lg:hidden flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-white/20 bg-white/30 dark:bg-black/40 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-2 py-2 grid gap-1.5">
              {[
                { id: 'home', label: 'Home', icon: BookOpen },
                { id: 'about', label: 'Mission Brief', icon: User },
                { id: 'skills', label: 'Tech Stack', icon: Code },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'contact', label: 'Transmission', icon: Mail }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { scrollToSection(id); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors duration-200 min-w-0 ${
                    activeSection === id 
                      ? 'bg-paper-200/70 dark:bg-gray-800/70 text-highlight-blue dark:text-highlight-cyan'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-paper-200/60 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="font-body truncate">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Cover Page */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-40 pb-20 md:pt-48 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="notebook-page animate-notebook-open p-4 sm:p-6 md:p-8 lg:p-12"
          >
            <motion.h1 
              className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-notebook font-bold mb-4 md:mb-6 text-shadow leading-tight whitespace-nowrap uppercase tracking-tighter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="text-highlight-blue dark:text-highlight-cyan">SAKTHIMURUGAN</span> <span className="text-gray-700 dark:text-gray-200">S</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-handwriting text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8"
            >
               Developer & Cybersecurity Enthusiast
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 px-4"
            >
              {[
                { icon: Github, href: 'https://github.com/Sakthi102003', color: 'hover:text-gray-800 dark:hover:text-gray-200' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/sakthimurugan-s/', color: 'hover:text-blue-600' },
                { icon: Mail, href: 'mailto:sakthimurugan102003@gmail.com', color: 'hover:text-green-600' },
                { icon: FaWhatsapp, href: 'tel:+919791747058', color: 'hover:text-green-600' },
                { icon: FaMedium, href: 'https://medium.com/@sakthimurugan102003', color: 'hover:text-black-600' },
                { icon: Instagram, href: 'https://www.instagram.com/sakthiii_techh/', color: 'hover:text-pink-600' }
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`text-gray-500 dark:text-gray-400 ${color} transition-all duration-200 transform hover:scale-110 p-2 flex-shrink-0`}
                >
                  <Icon size={28} className="sm:w-8 sm:h-8" />
                </a>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                onClick={() => scrollToSection('about')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-black border-2 border-black dark:border-white px-6 sm:px-8 py-3 font-body font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-auto"
              >
                <span>Explore My Universe</span>
                <BookOpen size={18} className="sm:w-5 sm:h-5" />
              </motion.button>

              <motion.a
                href="https://drive.google.com/file/d/1XP0eR-HanWD3CqGtO9ZeTe6enXxylaSk/view?usp=sharing"
                download="Sakthi_Murugan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white px-6 sm:px-8 py-3 font-body font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-auto"
              >
                <span>Download Resume</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quotes Section */}
      <QuotesSection />

      {/* About Section */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="notebook-page p-4 sm:p-6 md:p-8 lg:p-12"
          >
            <div className="flex items-center mb-6 sm:mb-8">
              <User className="text-highlight-blue dark:text-highlight-cyan mr-2 sm:mr-3 flex-shrink-0" size={28} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-notebook font-bold">Mission Brief</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="polaroid max-w-[300px] sm:max-w-[350px] md:max-w-[400px] w-full mx-auto">
                  <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg overflow-hidden">
                    <img 
                      src="/images/profile.jpg"
                      alt="Sakthi Murugan"
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center font-handwriting text-base sm:text-lg mt-2 flex items-center justify-center gap-1">
                    <span>That's me!</span>
                    <span>📸</span>
                  </p>
                </div>
              </div>
              
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <div className="font-handwriting space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-notebook text-highlight-blue dark:text-highlight-cyan mb-2 sm:mb-3 flex items-start gap-2">
                      <span className="flex-shrink-0">🛡️</span>
                      <span>Who am I?</span>
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                      A cybersecurity enthusiast and developer scribbling down ways to outsmart the bad guys (and occasionally… my own code 🤦‍♂️).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-notebook text-highlight-blue dark:text-highlight-cyan mb-2 sm:mb-3 flex items-start gap-2">
                      <span className="flex-shrink-0">⚡</span>
                      <span>What I do:</span>
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                      Build real-world projects powered by Python, Machine Learning 🤖, and modern web tech 🌐—basically turning messy ideas into tools that (mostly) behave.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-notebook text-highlight-blue dark:text-highlight-cyan mb-2 sm:mb-3 flex items-start gap-2">
                      <span className="flex-shrink-0">🚀</span>
                      <span>Why I'm here:</span>
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                      Because staying ahead in tech isn't just work—it's my favorite cure for boredom and my way of keeping this notebook full of experiments, doodles, and maybe a few breakthroughs.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
                  <div className="flex items-center space-x-3">
                    <Star className="text-yellow-500 flex-shrink-0" size={20} />
                    <span className="text-base sm:text-lg">Python & Frontend Enthusiast</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="text-red-500 flex-shrink-0" size={20} />
                    <span className="text-base sm:text-lg">Cybersecurity Passionate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-blue-500 flex-shrink-0" size={20} />
                    <span className="text-base sm:text-lg">Always Learning, Always Building</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6 sm:mb-8">
              <Code className="text-highlight-blue dark:text-highlight-cyan mr-2 sm:mr-3 flex-shrink-0" size={28} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-notebook font-bold">Tech Stack</h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="notebook-page p-4 sm:p-6 md:p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 font-handwriting text-base sm:text-lg">
                {/* Languages */}
                <div className="flex items-center gap-3 p-3 text-[#3776AB] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiPython className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Python</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#E34F26] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiHtml5 className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">HTML</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#1572B6] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiCss3 className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">CSS</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#F7DF1E] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiJavascript className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">JavaScript</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#3178C6] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiTypescript className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">TypeScript</span>
                </div>

                {/* Frontend & Frameworks */}
                <div className="flex items-center gap-3 p-3 text-[#61DAFB] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiReact className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">React.js</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#06B6D4] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiTailwindcss className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#FF6384] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiChartdotjs className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Chart.js</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#000000] dark:text-[#FFFFFF] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiFlask className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Flask</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#092E20] dark:text-[#0C4B33] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiDjango className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Django</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#4DABCF] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiNumpy className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">NumPy</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#3b82f6] dark:text-[#fbbf24] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <Database className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">SQL</span>
                </div>

                {/* Tools & Platforms */}
                <div className="flex items-center gap-3 p-3 text-[#F05032] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiGit className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Git</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#181717] dark:text-[#FFFFFF] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiGithub className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">GitHub</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#FFCA28] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiFirebase className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Firebase</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#007ACC] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <Code className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">VS Code</span>
                </div>

                {/* Operating Systems */}
                <div className="flex items-center gap-3 p-3 text-[#E95420] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiUbuntu className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Ubuntu</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#557C94] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiKalilinux className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">Kali Linux</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[#932279] transition-transform min-w-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] bg-white dark:bg-gray-800">
                  <SiCentos className="text-xl sm:text-2xl flex-shrink-0" />
                  <span className="truncate">CentOS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Github Heatmap Section */}
      <GithubHeatmap />

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="notebook-page p-4 sm:p-6 md:p-10 lg:p-14 pl-8 sm:pl-12 md:pl-16 lg:pl-20"
          >
            <div className="flex items-center mb-8 sm:mb-10">
              <FolderOpen className="text-highlight-blue dark:text-highlight-cyan mr-3 sm:mr-4 flex-shrink-0" size={28} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-notebook font-bold">Projects</h2>
            </div>
            
            <div className="space-y-8 sm:space-y-10">
              {(showAllProjects ? projects : projects.slice(0, 3)).map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Enhanced Project Card */}
                  <NeoBrutalistCard className="p-4 sm:p-6 h-full flex flex-col">
                    {/* Header with Title and Links */}
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 relative z-20 gap-4 sm:gap-0">
                      <div className="flex-1 w-full sm:w-auto">
                        <h3 className="font-notebook font-bold text-2xl sm:text-3xl text-highlight-blue dark:text-highlight-cyan mb-2 group-hover:scale-105 transition-transform pointer-events-none">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 border-2 border-black dark:border-white text-xs font-bold pointer-events-none ${
                            project.status === 'Completed' 
                              ? 'bg-green-200 text-black'
                              : 'bg-yellow-200 text-black'
                          }`}>
                            {project.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0 z-10 relative">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-2.5 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                          title="View Source Code"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                        {project.demoLink && (
                          <a 
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block p-2.5 border-2 border-black dark:border-white bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-black hover:bg-blue-600 dark:hover:bg-cyan-600 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            title="View Live Demo"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-5 pointer-events-none relative z-20 flex-grow">
                      {project.description}
                    </p>

                    {/* Highlights/Features */}
                    <div className="mb-5 pointer-events-none relative z-20">
                      <h4 className="text-sm font-bold text-black dark:text-white uppercase tracking-wide mb-3 border-b-2 border-black dark:border-white inline-block">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                            <Star size={14} className="text-black dark:text-white fill-current flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="pointer-events-none relative z-20 mt-auto">
                      <h4 className="text-sm font-bold text-black dark:text-white uppercase tracking-wide mb-3 border-b-2 border-black dark:border-white inline-block">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 bg-white dark:bg-gray-800 border-2 border-black dark:border-white text-xs font-bold text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </NeoBrutalistCard>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8 sm:mt-10">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-black border-2 border-black dark:border-white px-6 sm:px-8 py-3 font-body font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center gap-2"
              >
                {showAllProjects ? (
                  <>
                    <span>Show Less Projects</span>
                    <FolderOpen size={18} className="rotate-180" />
                  </>
                ) : (
                  <>
                    <span>See More Projects</span>
                    <FolderOpen size={18} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gears Section */}
      <GearsSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="notebook-page p-4 sm:p-6 md:p-8 lg:p-12 pl-6 sm:pl-12 md:pl-16 lg:pl-20"
          >
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <Mail className="text-highlight-blue dark:text-highlight-cyan mr-2 sm:mr-3 flex-shrink-0" size={28} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-notebook font-bold">Transmission</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="font-notebook text-xl sm:text-2xl mb-3 sm:mb-4">Send me a message</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  I'd love to hear from you! Whether it's a project collaboration, 
                  job opportunity, or just a friendly hello, feel free to reach out.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
  {/* Email */}
  <div className="flex items-center space-x-3">
    <Mail className="text-highlight-blue dark:text-highlight-cyan flex-shrink-0" size={18} />
    <a href="mailto:sakthimurugan102003@gmail.com" className="hover:underline hover:text-highlight-blue dark:hover:text-highlight-cyan transition text-sm sm:text-base break-all" >
      sakthimurugan102003@gmail.com
    </a>
  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="text-highlight-blue dark:text-highlight-cyan flex-shrink-0" size={18} />
                    <a href="https://github.com/Sakthi102003" className="hover:text-highlight-blue dark:hover:text-highlight-cyan transition-colors text-sm sm:text-base break-all">github.com/Sakthi102003</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="text-highlight-blue dark:text-highlight-cyan flex-shrink-0" size={18} />
                    <a href="https://www.linkedin.com/in/sakthimurugan-s/" className="hover:text-highlight-blue dark:hover:text-highlight-cyan transition-colors text-sm sm:text-base break-all">linkedin.com/in/sakthimurugan-s</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border-l-4 border-highlight-blue dark:border-highlight-cyan">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flowing Blog River */}
      <FlowingBlogRiver />

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
        <div className="notebook-divider mb-6"></div>
        
        {/* Visitor Counter */}
        <div className="flex justify-center mb-6">
          <VisitorCounter />
        </div>
        
        <p className="font-handwriting text-lg">
          Made with ❤️ and lots of ☕ by Sakthimurugan
        </p>
        <p className="text-sm mt-2">© 2025 - All Rights reserved.</p>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
        </motion.div>
      )}
    </>
  )
}

export default App
