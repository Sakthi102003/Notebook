import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles } from 'lucide-react';

interface Project { title: string; description: string; tech: string[]; status: string; link: string; demoLink?: string; highlights?: string[]; }
interface ProjectLogViewerProps { project: Project | null; onClose: () => void; }

const ProjectLogViewer = ({ project, onClose }: ProjectLogViewerProps) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center p-4" style={{ background: 'rgb(0 0 0 / 0.28)' }} onClick={onClose}>
        <motion.article initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-2xl rounded-[2rem] overflow-hidden max-h-[80vh] overflow-y-auto" style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-soft)', boxShadow: 'var(--card-shadow)' }} onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3" style={{ color: 'var(--accent-cyan)' }}><Sparkles size={18} /><span className="text-sm font-semibold">Project spotlight</span></div>
            <button onClick={onClose} aria-label="Close project details" className="p-2 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}><X size={18} /></button>
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-sm mb-2" style={{ color: 'var(--accent-green)' }}>{project.status}</p>
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
            <p className="leading-relaxed mb-7" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
            {project.highlights && <ul className="space-y-3 mb-8">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-3" style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--accent-red)' }}>✦</span>{highlight}</li>)}</ul>}
            <div className="flex flex-wrap gap-2 mb-8">{project.tech.map((tech) => <span key={tech} className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgb(var(--accent-color) / 0.08)', color: 'var(--accent-cyan)' }}>{tech}</span>)}</div>
            <div className="flex flex-wrap gap-3">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Github size={15} />Source code</a>
              {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary"><ExternalLink size={15} />Visit project</a>}
            </div>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectLogViewer;
