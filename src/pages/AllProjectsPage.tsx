import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FolderOpen, Star, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import NeoBrutalistCard from '../components/NeoBrutalistCard';
import { projects } from '../data/projects';

const AllProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 transition-colors duration-1000 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link 
            to="/"
            className="flex items-center gap-2 text-black dark:text-white font-bold hover:text-highlight-blue dark:hover:text-highlight-cyan transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <FolderOpen className="text-highlight-blue dark:text-highlight-cyan" size={32} />
            <h1 className="text-3xl sm:text-4xl font-notebook font-bold text-black dark:text-white">
              All Projects
            </h1>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <NeoBrutalistCard className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4 sm:gap-0">
                  <div>
                    <h3 className="font-notebook font-bold text-2xl text-highlight-blue dark:text-highlight-cyan mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 border-2 border-black dark:border-white text-xs font-bold ${
                        project.status === 'Completed' 
                          ? 'bg-green-200 text-black'
                          : 'bg-yellow-200 text-black'
                      }`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        title="View Code"
                      >
                        <Github size={20} className="text-black dark:text-white" />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-highlight-blue dark:bg-highlight-cyan border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        title="View Live Demo"
                      >
                        <ExternalLink size={20} className="text-white dark:text-black" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-5">
                  <h4 className="text-sm font-bold text-black dark:text-white uppercase tracking-wide mb-3 border-b-2 border-black dark:border-white inline-block">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {project.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                        <Star size={14} className="text-black dark:text-white fill-current flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-auto">
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
      </div>
    </div>
  );
};

export default AllProjectsPage;
