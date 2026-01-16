import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

import FlowingBlogRiver from '../components/sections/FlowingBlogRiver'
import GearsSection from '../components/sections/GearsSection'
import QuotesSection from '../components/sections/QuotesSection'

import StealthSidebar from '../components/layout/StealthSidebar'
import StealthHeader from '../components/layout/StealthHeader'
import StealthStatusBar from '../components/layout/StealthStatusBar'
import ContentFooter from '../components/layout/ContentFooter'
import { FILE_TREE } from '../data/navigation'

// Imported Sections
import HeroSection from '../components/sections/HeroSection'
import MissionParams from '../components/sections/MissionParams'
import TechCapability from '../components/sections/TechCapability'
import DeployedAssets from '../components/sections/DeployedAssets'
import SignalTransmission from '../components/sections/SignalTransmission'

function Home() {
  const [activeFile, setActiveFile] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isScrolled, setIsScrolled] = useState(false)
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
          <HeroSection scrollToSection={scrollToSection} />

          {/* Section: About (bio.md) */}
          <MissionParams />

          {/* Section: Quotes (quotes.log) */}
          <section id="quotes">
            <QuotesSection />
          </section>

          {/* Section: Skills (stack.json) */}
          <TechCapability />

          {/* Section: Projects (ops/) */}
          <DeployedAssets />

          {/* Section: Gears (gears.cfg) */}
          <section id="gears">
            <GearsSection />
          </section>

          {/* Section: Contact (relay.log) */}
          <SignalTransmission />

          {/* Flowing Blog Feed */}
          <section className="pt-20">
            <FlowingBlogRiver />
          </section>

          {/* Content Footer */}
          <ContentFooter />
        </div>

        {/* IDE Footer / Status Bar */}
        <StealthStatusBar />

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
      </main>
    </div>
  )
}

export default Home
