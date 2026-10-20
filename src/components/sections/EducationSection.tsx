import { usePortfolio } from '../../context/PortfolioContext';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const EducationSection = () => {
  const { education } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!education || !education.length) return null;

  return (
    <section id="education" className="py-32 relative z-10 bg-[#030305] overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c4b5fd]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <FadeIn>
          <div className="text-center mb-24">
            <h2 className="text-sm md:text-base text-[#a78bfa] tracking-[0.3em] uppercase mb-4 font-medium">
              Academic Background
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]">Education</span>
            </h3>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-[39px] md:left-[50px] top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-[#a78bfa] via-[#c4b5fd] to-transparent shadow-[0_0_15px_rgba(167,139,250,0.8)]"
            />
          </div>

          <div className="space-y-24">
            {education.map((edu: any, index: number) => (
              <FadeIn key={edu.id} delay={index * 0.2} direction="left">
                <div className="relative flex items-start group">
                  
                  {/* Glowing Node */}
                  <div className="absolute left-[24px] md:left-[35px] top-4 w-8 h-8 rounded-full bg-[#0f0f13] border-2 border-[#a78bfa] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(167,139,250,0.6)] group-hover:scale-125 group-hover:bg-[#a78bfa] transition-all duration-500">
                    <div className="w-2 h-2 rounded-full bg-white group-hover:bg-[#030305] transition-colors" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="ml-24 md:ml-32 w-full">
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="glass-panel p-8 rounded-[2rem] relative transition-all duration-500 hover:border-[#a78bfa]/40 hover:shadow-[0_20px_40px_rgba(167,139,250,0.15)]"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        
                        {/* Institution Logo */}
                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center relative overflow-hidden group-hover:border-[#a78bfa]/50 transition-colors">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {edu.logo ? (
                            <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain relative z-10" />
                          ) : (
                            <GraduationCap size={40} className="text-[#c4b5fd] relative z-10" />
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-[#c4b5fd] transition-colors">
                              {edu.institution}
                            </h4>
                            <span className="inline-block mt-2 md:mt-0 px-4 py-1.5 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded-full text-xs font-bold tracking-widest text-[#c4b5fd]">
                              {edu.startYear || edu.startDate} — {edu.endYear || edu.endDate || 'Present'}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                            {edu.degree} in {edu.field}
                          </h3>
                          
                          {edu.description && (
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Reflection */}
                    <div className="mt-4 opacity-20 mirror-reflection pointer-events-none scale-y-[-1] origin-top blur-sm">
                      <div className="h-[100px] rounded-[2rem] bg-gradient-to-t from-[#a78bfa]/5 to-transparent border-b border-[#a78bfa]/10" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
