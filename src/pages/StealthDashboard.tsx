import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FILE_TREE } from '../data/navigation';
import FlowingBlogRiver from '../components/sections/FlowingBlogRiver';
import GearsSection from '../components/sections/GearsSection';
import QuotesSection from '../components/sections/QuotesSection';
import HeroSection from '../components/sections/HeroSection';
import MissionParams from '../components/sections/MissionParams';
import TechCapability from '../components/sections/TechCapability';
import DeployedAssets from '../components/sections/DeployedAssets';
import SignalTransmission from '../components/sections/SignalTransmission';
import ContentFooter from '../components/layout/ContentFooter';

export default function StealthDashboard() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = FILE_TREE.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-30% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="feel-good-shell min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)' }}>
      <header className="sticky top-0 z-40 transition-all duration-300" style={{ background: isScrolled ? 'var(--header-bg)' : 'transparent', borderBottom: isScrolled ? '1px solid var(--header-border)' : '1px solid transparent', backdropFilter: isScrolled ? 'blur(16px)' : 'none' }}>
        <div className="max-w-6xl mx-auto h-20 px-5 sm:px-8 flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="text-left" aria-label="Go to home">
            <span className="block font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Sakthimurugan S</span>
            <span className="block text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>Developer & security researcher</span>
          </button>
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full" style={{ background: 'rgb(255 255 255 / 0.58)', border: '1px solid var(--border-subtle)' }}>
            {FILE_TREE.map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)} className="px-3 py-2 rounded-full text-xs transition-colors" style={{ background: activeSection === item.id ? 'var(--accent-cyan)' : 'transparent', color: activeSection === item.id ? 'var(--btn-primary-text)' : 'var(--text-secondary)' }}>{item.label}</button>)}
          </nav>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-3 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }} aria-label="Open navigation"><Menu size={19} /></button>
        </div>
      </header>

      <main className="relative z-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32 pb-8">
          <HeroSection scrollToSection={scrollToSection} />
          <MissionParams />
          <QuotesSection />
          <TechCapability />
          <DeployedAssets />
          <GearsSection />
          <SignalTransmission />
          <FlowingBlogRiver />
          <ContentFooter />
        </div>
      </main>

      <AnimatePresence>
        {menuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] lg:hidden p-5" style={{ background: 'rgb(43 38 67 / 0.22)', backdropFilter: 'blur(10px)' }} onClick={() => setMenuOpen(false)}>
          <motion.nav initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} className="rounded-[2rem] p-5" style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-soft)', boxShadow: 'var(--card-shadow)' }} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><span className="font-display text-xl" style={{ color: 'var(--text-primary)' }}>Explore</span><button onClick={() => setMenuOpen(false)} className="p-2 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }} aria-label="Close navigation"><X size={18} /></button></div>
            <div className="grid grid-cols-2 gap-2">{FILE_TREE.map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)} className="flex items-center gap-2 p-3 rounded-xl text-left text-sm" style={{ background: activeSection === item.id ? 'rgb(var(--accent-color) / 0.1)' : 'var(--bg-surface)', color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}><item.icon size={15} />{item.label}</button>)}</div>
          </motion.nav>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}
