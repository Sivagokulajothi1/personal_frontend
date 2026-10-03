import { usePortfolio } from '../../context/PortfolioContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code as Github, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import type { Project } from '../../types/project';
import { getProjects } from '../../services/db';
import FadeIn from '../animations/FadeIn';
import { getTechIcon } from '../../utils/getTechIcon';

const ProjectsSection = () => {
  const { projects } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };


  if (!projects.length) {
    return (
      <section id="projects" className="py-32 relative z-10 bg-[#030305]">
        <div className="container mx-auto px-6 md:px-12 text-center text-gray-500">
          No published projects available.
        </div>
      </section>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="py-32 relative z-10 bg-[#030305] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] lavender-glow-text">Work</span>
              </h2>
            </div>
            
            <div className="flex space-x-4 mt-6 md:mt-0">
              <button 
                onClick={prevProject}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#a78bfa]/20 hover:border-[#a78bfa]/50 transition-all text-white group"
              >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={nextProject}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#a78bfa]/20 hover:border-[#a78bfa]/50 transition-all text-white group"
              >
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1a1525] to-[#0a0a0f] border border-[#a78bfa]/20 shadow-2xl group"
            >
              {/* Internal layout */}
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Image Section */}
                <div className="w-full lg:w-3/5 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 z-10" />
                  
                  {/* Glowing background blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#a78bfa]/20 blur-[100px] rounded-full pointer-events-none" />
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{ transformPerspective: 1000 }}
                    className="w-full relative z-20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                  >
                    {currentProject.coverImage ? (
                      <img 
                        src={currentProject.coverImage} 
                        alt={currentProject.title} 
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-black/50 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Placeholder tech layout */}
                        <div className="absolute inset-0 opacity-20 grid grid-cols-4 gap-4 p-8 transform rotate-12 scale-150">
                           {currentProject.technologies.map((t, i) => (
                             <div key={i} className="text-6xl flex items-center justify-center text-white/50">{getTechIcon(t)}</div>
                           ))}
                        </div>
                        <h3 className="text-4xl font-black text-white relative z-10 tracking-widest uppercase opacity-50">
                          {currentProject.title.split(' ')[0]}
                        </h3>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center relative z-20 bg-black/40 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-l border-white/5">
                  <div className="inline-flex px-4 py-2 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded-full text-[#c4b5fd] text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(167,139,250,0.15)]">
                    {currentProject.category}
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                    {currentProject.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-10">
                    {currentProject.description}
                  </p>

                  <div className="mb-10">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Tech Stack</h4>
                    <div className="flex flex-wrap gap-4">
                      {currentProject.technologies.map((tech) => (
                        <div key={tech} className="group/tech relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-[#a78bfa]/50 hover:bg-[#a78bfa]/10 transition-all cursor-help">
                          <div className="text-2xl group-hover/tech:scale-110 group-hover/tech:drop-shadow-[0_0_10px_rgba(167,139,250,0.5)] transition-all">
                            {getTechIcon(tech)}
                          </div>
                          {/* Tooltip */}
                          <div className="absolute -top-10 scale-0 opacity-0 group-hover/tech:scale-100 group-hover/tech:opacity-100 transition-all bg-[#0f0f13] border border-white/10 text-white text-xs py-1 px-3 rounded-lg whitespace-nowrap shadow-xl z-50">
                            {tech}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-auto">
                    <Link 
                      to={`/projects/${currentProject.slug}`}
                      className="px-8 py-4 bg-[#a78bfa] text-black font-bold rounded-xl flex items-center gap-2 hover:bg-[#c4b5fd] transition-colors shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)]"
                    >
                      View Case Study
                      <ArrowRight size={18} />
                    </Link>
                    <div className="flex gap-4">
                      {currentProject.githubUrl && (
                        <a href={currentProject.githubUrl} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#a78bfa]/50 transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                      {currentProject.liveUrl && (
                        <a href={currentProject.liveUrl} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#a78bfa]/50 transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Main Card Reflection underneath */}
          <div className="mt-4 opacity-30 mirror-reflection pointer-events-none scale-y-[-1] origin-top blur-sm">
            <div className="h-[200px] rounded-[2.5rem] bg-gradient-to-t from-[#a78bfa]/5 to-transparent border-b border-[#a78bfa]/10" />
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-3">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-12 bg-[#a78bfa] shadow-[0_0_10px_rgba(167,139,250,0.5)]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
