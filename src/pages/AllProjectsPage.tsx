import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FolderOpen, Github, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import StealthCard from '../components/ui/StealthCard';
import { projects } from '../data/projects';

const AllProjectsPage = () => {
  return (
    <div className="min-h-screen bg-stealth-900 text-gray-400 p-6 sm:p-12 font-stealth selection:bg-electric-blue/30 selection:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-20 gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold hover:text-electric-blue transition-all uppercase tracking-[0.2em] text-[10px] border border-white/10 px-4 py-2 bg-white/5"
          >
            <ArrowLeft size={14} />
            <span>RETURN_TO_BASE</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-electric-blue/5 border border-white/5 text-electric-blue">
              <FolderOpen size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-[0.2em]">
                Project_Archives
              </h1>
              <div className="glow-line-blue w-full opacity-50" />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-12 flex items-center justify-between border-b border-white/5 pb-4 text-[10px] font-mono text-white/30 tracking-widest uppercase">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><Terminal size={12} /> STATUS: ACTIVE</span>
            <span>COUNT: {projects.length} RECORDS</span>
          </div>
          <div className="hidden sm:block">ENCRYPTION: AES_256_STABLE</div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <StealthCard className="p-8 h-full flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-2xl text-white mb-2 uppercase tracking-wider group-hover:text-electric-blue transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-electric-blue shadow-[0_0_8px_#00E5FF]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]'}`} />
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{project.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 text-gray-600 hover:text-white transition-all">
                      <Github size={18} />
                    </a>
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-electric-blue/10 border border-electric-blue/20 text-electric-blue hover:bg-electric-blue hover:text-stealth-900 transition-all">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-mono uppercase tracking-tighter flex-grow">
                  {project.description}
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-2">
                    {project.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-[10px] text-gray-500 tracking-wider font-mono">
                        <span className="text-electric-blue/50 opacity-50">&gt;</span>
                        <span className="uppercase">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {project.tech.map(t => (
                      <span key={t} className="text-[9px] font-mono text-white/20 px-2 py-0.5 border border-white/5 bg-white/5 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StealthCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
