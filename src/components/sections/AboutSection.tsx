import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { Smartphone, Code, Cpu, Database } from 'lucide-react';
const cards = [
  {
    title: "Mobile Development",
    description: "Building cross-platform mobile experiences with React Native and Flutter.",
    icon: <Smartphone size={32} className="text-[#c4b5fd]" />
  },
  {
    title: "Full Stack Development",
    description: "Architecting scalable web applications from front to back.",
    icon: <Code size={32} className="text-[#a78bfa]" />
  },
  {
    title: "AI / Automation",
    description: "Integrating AI models and building intelligent voice agents.",
    icon: <Cpu size={32} className="text-[#8b5cf6]" />
  },
  {
    title: "API Development",
    description: "Designing robust and secure RESTful services and databases.",
    icon: <Database size={32} className="text-[#c084fc]" />
  }
];

const AboutSection = () => {
  const { profile } = usePortfolio();

  
  if (!profile) return null;

  return (
    <section id="about" className="py-32 relative z-10 bg-[#030305] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#a78bfa]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <FadeIn delay={0.1}>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-white">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]">Me</span>
              </h3>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed font-light mb-6 text-lg whitespace-pre-line">
                  {profile.about}
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-[#a78bfa]/5 blur-[100px] rounded-full pointer-events-none" />
            
            {cards.map((card, index) => (
              <FadeIn key={card.title} delay={0.3 + index * 0.1}>
                <div className="relative group">
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-panel p-8 rounded-3xl h-full flex flex-col items-start transition-all duration-500 hover:shadow-[0_10px_30px_rgba(167,139,250,0.2)] hover:border-[#a78bfa]/40 relative z-10 bg-[#0f0f13]/80"
                  >
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#a78bfa]/10 to-transparent border border-[#a78bfa]/20 group-hover:scale-110 transition-transform duration-500">
                      {card.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-[#c4b5fd] transition-colors">{card.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {card.description}
                    </p>
                  </motion.div>
                  
                  {/* Subtle reflection */}
                  <div className="mt-4 opacity-20 mirror-reflection pointer-events-none scale-y-[-1] origin-top blur-sm">
                    <div className="h-[80px] rounded-3xl bg-gradient-to-t from-[#a78bfa]/10 to-transparent border-b border-[#a78bfa]/10" />
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

export default AboutSection;
