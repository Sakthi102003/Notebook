import { motion } from 'framer-motion'
import { Folder, ChevronRight, Terminal as TerminalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import HoloCard from '../ui/HoloCard'
import ProjectLogViewer from './ProjectLogViewer'
import { projects } from '../../data/projects'

export default function DeployedAssets() {
    const [selectedProject, setSelectedProject] = useState<any>(null)

    return (
        <>
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
        </>
    )
}
