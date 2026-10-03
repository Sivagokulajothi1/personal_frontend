import { usePortfolio } from '../../context/PortfolioContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Skill } from '../../types/skill';
import { getSkills } from '../../services/db';
import FadeIn from '../animations/FadeIn';
import { getTechIcon } from '../../utils/getTechIcon';

const SkillsSection = () => {
  const { skills } = usePortfolio();
  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);


  if (!skills.length) {
    return null;
  }

  return (
    <section id="skills" className="py-32 relative z-10 bg-[#030305] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#a78bfa]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-sm md:text-base text-[#a78bfa] tracking-[0.3em] uppercase mb-4 font-medium">
              Technical Arsenal
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-white">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]">Capabilities</span>
            </h3>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto p-2 bg-[#0f0f13]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-6 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                      isActive ? 'text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillCategory"
                        className="absolute inset-0 bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] rounded-xl shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Constellation / Skill Wall */}
        <div className="mt-16 min-h-[400px]">
          <motion.div 
            layout
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    layout: { type: "spring", stiffness: 100, damping: 15 }
                  }}
                  key={skill.id}
                  className="group relative"
                >
                  <div className="relative flex flex-col items-center justify-center p-6 w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[#0f0f13]/40 border border-white/5 backdrop-blur-sm cursor-help transition-all duration-500 hover:bg-[#a78bfa]/10 hover:border-[#a78bfa]/40 hover:scale-110 hover:z-20 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)]">
                    
                    <div className="text-4xl md:text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]">
                      {getTechIcon(skill.name)}
                    </div>
                    
                    {/* Floating mirror reflection */}
                    <div className="absolute -bottom-8 opacity-20 mirror-reflection pointer-events-none blur-[2px] scale-y-[-1]">
                      <div className="text-4xl md:text-5xl">{getTechIcon(skill.name)}</div>
                    </div>

                    {/* Hover Info */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[120%] pointer-events-none transition-all duration-300">
                      <div className="bg-[#0f0f13] border border-[#a78bfa]/30 p-3 rounded-xl shadow-2xl text-center">
                        <h4 className="font-bold text-white text-sm">{skill.name}</h4>
                        <p className="text-xs text-[#a78bfa] mt-1">{skill.category}</p>
                      </div>
                      {/* Triangle pointer */}
                      <div className="w-3 h-3 bg-[#0f0f13] border-b border-r border-[#a78bfa]/30 rotate-45 mx-auto -mt-1.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
