import { motion } from 'framer-motion'
import { Folder, ChevronRight, Terminal as TerminalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useGamification } from '../../utils/useGamification'

import HoloCard from '../ui/HoloCard'
import ProjectLogViewer from './ProjectLogViewer'
import { projects } from '../../data/projects'

export default function DeployedAssets() {
    const [selectedProject, setSelectedProject] = useState<any>(null)
    const { trackInteraction } = useGamification()

    const handleProjectClick = (project: any) => {
        setSelectedProject(project)
        trackInteraction('projects')
    }

    return (
        <>
            <section id="projects" className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-mono opacity-50" style={{ color: 'var(--accent-cyan)' }}>03.</span> FEATURED PROJECTS
                    </h2>
                    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), transparent)' }} />
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
                                className="portfolio-card p-8 group flex flex-col h-full cursor-pointer transition-all"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-lg" style={{ background: 'rgba(var(--accent-color)/0.1)', color: 'var(--accent-cyan)' }}>
                                        <Folder size={24} />
                                    </div>
                                </div>

                                    <h3 className="text-2xl font-bold mb-2 tracking-wide transition-colors" style={{ color: 'var(--text-primary)' }}>
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{project.status}</span>
                                </div>

                                <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 border rounded uppercase" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 pt-2 text-[10px] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
                                    <TerminalIcon size={12} />
                                    View project details
                                </div>
                            </HoloCard>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        to="/projects"
                        className="btn-ghost rounded-xl"
                    >
                        View_Project_Archives <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <ProjectLogViewer project={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
    )
}
