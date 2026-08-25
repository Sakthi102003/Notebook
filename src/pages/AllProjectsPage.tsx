import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FolderOpen, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import StealthCard from '../components/ui/StealthCard';
import { projects } from '../data/projects';

const AllProjectsPage = () => (
  <main className="min-h-screen p-6 sm:p-12" style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)' }}>
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-8">
        <Link to="/" className="btn-ghost"><ArrowLeft size={15} />Back to home</Link>
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3 rounded-2xl" style={{ background: 'rgb(var(--accent-color) / 0.1)', color: 'var(--accent-cyan)' }}><FolderOpen size={30} /></div>
          <div><p className="text-sm mb-1" style={{ color: 'var(--accent-red)' }}>A collection of things I’ve made</p><h1 className="text-3xl sm:text-5xl">Selected projects</h1></div>
        </div>
      </header>
      <p className="mb-10" style={{ color: 'var(--text-muted)' }}>{projects.length} projects, each built to solve a real problem or explore a new idea.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div key={project.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="h-full">
            <StealthCard className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6 gap-4">
                <div><p className="text-sm mb-2" style={{ color: 'var(--accent-green)' }}>{project.status}</p><h2 className="text-2xl" style={{ color: 'var(--text-primary)' }}>{project.title}</h2></div>
                <div className="flex gap-2">
                  <a aria-label={`View ${project.title} source`} href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}><Github size={18} /></a>
                  {project.demoLink && <a aria-label={`Visit ${project.title}`} href={project.demoLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full" style={{ background: 'rgb(var(--accent-color) / 0.1)', color: 'var(--accent-cyan)' }}><ExternalLink size={18} /></a>}
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-7 flex-grow">{project.description}</p>
              <ul className="space-y-2 mb-6 text-sm">{project.highlights.slice(0, 3).map((highlight) => <li key={highlight} className="flex gap-2"><span style={{ color: 'var(--accent-red)' }}>✦</span>{highlight}</li>)}</ul>
              <div className="flex flex-wrap gap-2 pt-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>{project.tech.map((tech) => <span key={tech} className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>{tech}</span>)}</div>
            </StealthCard>
          </motion.div>
        ))}
      </div>
    </div>
  </main>
);

export default AllProjectsPage;
