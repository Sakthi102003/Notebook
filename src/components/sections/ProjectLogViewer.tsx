import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import ProjectSimulator from '../features/ProjectSimulator';

interface Project {
    title: string;
    description: string;
    tech: string[];
    status: string;
    link: string;
    demoLink?: string;
    highlights?: string[];
}

interface ProjectLogViewerProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectLogViewer = ({ project, onClose }: ProjectLogViewerProps) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [simOpen, setSimOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (project) {
            setLogs([]);
            const sequence = [
                `> Initializing build sequence for ${project.title}...`,
                `> Loading configuration: ${project.status}`,
                `> Importing dependency modules: [${project.tech.join(', ')}]`,
                `> Compiling core assets...`,
                `..................................................`,
                `> Optimization complete.`,
                `> MODULE DEPLOYMENT STATUS: SUCCESS`,
                `> Highlights loaded:`,
                ...(project.highlights?.map(h => `  - [OK] ${h}`) || []),
                `>`,
                `> Waiting for user interaction...`
            ];

            let i = 0;
            const interval = setInterval(() => {
                if (i < sequence.length) {
                    setLogs(prev => [...prev, sequence[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 150);

            return () => clearInterval(interval);
        }
    }, [project]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-stealth-900/90 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-3xl bg-stealth-900 border border-electric-blue/30 shadow-[0_0_50px_rgba(0,229,255,0.1)] overflow-hidden flex flex-col max-h-[80vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-electric-blue">
                            <Terminal size={16} />
                            <span className="font-mono text-xs uppercase tracking-widest">DEPLOY_LOGS // {project.title.toUpperCase()}</span>
                        </div>
                        <button onClick={onClose} className="hover:text-crimson transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Terminal Body */}
                    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-4" ref={scrollRef}>
                        <div className="text-gray-500 text-xs mb-4">
                            Last login: {new Date().toLocaleString()} on ttys001
                        </div>

                        <div className="space-y-1">
                            {logs.map((log: string, idx: number) => {
                                if (!log) return null;
                                return (
                                    <div key={idx} className={`${log.includes('SUCCESS') ? 'text-green-500' : log.includes('error') ? 'text-crimson' : 'text-gray-300'}`}>
                                        {log}
                                    </div>
                                );
                            })}
                        </div>

                        {logs.length > 5 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-8 pt-8 border-t border-dashed border-white/10"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-6 max-w-2xl">{project.description}</p>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-electric-blue hover:text-electric-blue transition-all uppercase text-xs tracking-wider"
                                    >
                                        <Github size={14} /> Source
                                    </a>
                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-electric-blue/10 border border-electric-blue/30 text-electric-blue hover:bg-electric-blue/20 transition-all uppercase text-xs tracking-wider"
                                        >
                                            <ExternalLink size={14} /> Live
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setSimOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20 transition-all uppercase text-xs tracking-wider"
                                    >
                                        <Terminal size={14} /> Live Simulation
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="h-2 bg-electric-blue/20 w-full relative overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-y-0 w-1/3 bg-electric-blue/40"
                        />
                    </div>
                </motion.div>
            </motion.div>

            <ProjectSimulator
                isOpen={simOpen}
                onClose={() => setSimOpen(false)}
                project={project}
            />
        </AnimatePresence>
    );
};

export default ProjectLogViewer;
