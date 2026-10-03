import { usePortfolio } from '../../context/PortfolioContext';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const ExperienceSection = () => {
  const { experience } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!experience || !experience.length) return null;

  return (
    <section id="experience" className="py-32 relative z-10 bg-[#030305] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <FadeIn>
          <div className="text-center mb-24">
            <h2 className="text-sm md:text-base text-[#a78bfa] tracking-[0.3em] uppercase mb-4 font-medium">
              Career Trajectory
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]">Experience</span>
            </h3>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-[39px] md:left-[50px] top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-[#c4b5fd] via-[#a78bfa] to-transparent shadow-[0_0_15px_rgba(167,139,250,0.8)]"
            />
          </div>

          <div className="space-y-24">
            {experience.map((exp: any, index: number) => (
              <FadeIn key={exp.id} delay={index * 0.2} direction="left">
                <div className="relative flex items-start group">
                  
                  {/* Glowing Node */}
                  <div className="absolute left-[24px] md:left-[35px] top-6 w-8 h-8 rounded-full bg-[#0f0f13] border-2 border-[#a78bfa] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(167,139,250,0.6)] group-hover:scale-125 group-hover:bg-[#a78bfa] transition-all duration-500">
                    <Briefcase size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity absolute" />
                    <div className="w-2 h-2 rounded-full bg-white group-hover:opacity-0 transition-opacity" />
                  </div>
                  
                  <div className="ml-24 md:ml-32 w-full">
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="glass-panel p-8 md:p-10 rounded-[2.5rem] relative transition-all duration-500 hover:border-[#a78bfa]/40 hover:shadow-[0_20px_40px_rgba(167,139,250,0.15)] bg-[#0f0f13]/80"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#c4b5fd] transition-colors">{exp.position}</h3>
                          <h4 className="text-xl text-[#a78bfa] font-bold mt-1 tracking-wide">{exp.company}</h4>
                        </div>
                        <span className="inline-block mt-4 md:mt-0 px-4 py-2 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded-full text-xs font-bold tracking-widest text-[#c4b5fd] shadow-[0_0_15px_rgba(167,139,250,0.1)]">
                          {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed font-light text-lg mb-6">
                        {exp.description}
                      </p>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                          {exp.technologies.map((tech: string) => (
                            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-[#a78bfa]/50 transition-colors cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Reflection */}
                    <div className="mt-4 opacity-20 mirror-reflection pointer-events-none scale-y-[-1] origin-top blur-sm">
                      <div className="h-[120px] rounded-[2.5rem] bg-gradient-to-t from-[#a78bfa]/10 to-transparent border-b border-[#a78bfa]/10" />
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

export default ExperienceSection;
