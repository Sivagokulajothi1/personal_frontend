import { usePortfolio } from '../../context/PortfolioContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, Maximize2 } from 'lucide-react';
import type { Certification } from '../../types/certification';
import { getCertifications } from '../../services/db';
import FadeIn from '../animations/FadeIn';

const CertificationsSection = () => {
  const { certifications } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  if (!certifications.length) return null;

  return (
    <section id="certifications" className="py-32 relative z-10 bg-[#030305] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-sm md:text-base text-[#a78bfa] tracking-[0.3em] uppercase mb-4 font-medium">
              Verified Achievements
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]">Certifications</span>
            </h3>
          </div>
        </FadeIn>

        {/* Floating Certificate Wall */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <div className="relative group perspective-1000">
                <motion.div 
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? 10 : -10,
                    rotateX: 10,
                    scale: 1.05,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-panel w-72 md:w-80 h-96 rounded-3xl p-1 relative flex flex-col cursor-pointer hover:shadow-[0_0_40px_rgba(167,139,250,0.4)] hover:border-[#a78bfa]/50 z-20 transition-colors"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="bg-[#0f0f13] rounded-[1.4rem] h-full p-6 flex flex-col relative overflow-hidden">
                    {/* Inner glowing effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/0 via-[#a78bfa]/0 to-[#a78bfa]/0 group-hover:from-[#a78bfa]/10 transition-colors duration-500 pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c4b5fd]">
                        <Award size={24} />
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#a78bfa]/20 transition-all">
                        <Maximize2 size={14} />
                      </button>
                    </div>

                    <div className="relative z-10 flex-grow">
                      <h4 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-2">
                        {cert.organization}
                      </h4>
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-[#c4b5fd] transition-colors">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10 mt-auto flex justify-between items-center text-xs text-gray-500 font-medium">
                      <span>{cert.issueDate}</span>
                      {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                    </div>
                  </div>
                </motion.div>

                {/* Reflection */}
                <div className="absolute -bottom-8 left-0 right-0 opacity-30 mirror-reflection pointer-events-none scale-y-[-1] blur-md z-10 transition-all duration-500 group-hover:opacity-10 group-hover:translate-y-4">
                  <div className="h-[150px] rounded-3xl bg-gradient-to-t from-[#a78bfa]/10 to-transparent border-b border-[#a78bfa]/20" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#030305]/80 backdrop-blur-2xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-panel w-full max-w-4xl rounded-3xl p-1 relative shadow-[0_0_100px_rgba(167,139,250,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#0f0f13] border border-[#a78bfa]/30 flex items-center justify-center text-white hover:bg-[#a78bfa] transition-colors z-50 shadow-xl"
              >
                <X size={20} />
              </button>

              <div className="bg-[#0f0f13] rounded-[1.7rem] overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-br from-[#0f0f13] to-[#1a1525]">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#a78bfa]/30 flex items-center justify-center text-[#c4b5fd] mb-8 shadow-[0_0_20px_rgba(167,139,250,0.2)]">
                    <Award size={32} />
                  </div>
                  
                  <h4 className="text-[#a78bfa] text-sm font-bold tracking-widest uppercase mb-2">
                    {selectedCert.organization}
                  </h4>
                  <h3 className="text-3xl font-black text-white mb-6">
                    {selectedCert.title}
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Issued</span>
                      <span className="text-white font-medium">{selectedCert.issueDate}</span>
                    </div>
                    {selectedCert.credentialId && (
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500">Credential ID</span>
                        <span className="text-white font-medium">{selectedCert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {selectedCert.credentialUrl && (
                    <a 
                      href={selectedCert.credentialUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-8 w-full py-4 bg-[#a78bfa]/10 hover:bg-[#a78bfa]/20 border border-[#a78bfa]/30 text-[#c4b5fd] rounded-xl flex items-center justify-center font-bold transition-all shadow-[0_0_15px_rgba(167,139,250,0.1)] hover:shadow-[0_0_25px_rgba(167,139,250,0.3)] gap-2"
                    >
                      Verify Credential
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                <div className="w-full md:w-3/5 p-8 flex items-center justify-center min-h-[300px] bg-black/50">
                  {selectedCert.certificateImage ? (
                    <img 
                      src={selectedCert.certificateImage} 
                      alt={selectedCert.title} 
                      className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl"
                    />
                  ) : (
                    <div className="text-center">
                      <Award size={64} className="text-white/5 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium tracking-wider uppercase text-sm">Certificate Image Pending</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
