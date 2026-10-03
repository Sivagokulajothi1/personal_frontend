import { usePortfolio } from '../../context/PortfolioContext';
import { useState, useEffect } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { getProfile } from '../../services/db';
import type { Profile } from '../../types/profile';
import FadeIn from '../animations/FadeIn';

const ContactSection = () => {
  const { profile } = usePortfolio();

  
  if (!profile) return null;

  return (
    <section id="contact" className="py-32 relative z-10 bg-[#030305] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a78bfa]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-sm md:text-base text-[#a78bfa] tracking-[0.3em] uppercase mb-4 font-medium">
              Initiate Connection
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]">Collaborate</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
              Interested in working together or have a question? I'm currently open to new opportunities.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {profile.email && (
              <a 
                href={`mailto:${profile.email}`}
                className="group relative flex items-center justify-between glass-panel p-6 rounded-3xl w-full md:w-1/3 hover:bg-[#a78bfa]/10 hover:border-[#a78bfa]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#c4b5fd]">
                    <Mail size={24} />
                  </div>
                  <span className="font-medium text-white tracking-wide">Email</span>
                </div>
                <ArrowUpRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                
                {/* Subtle reflection */}
                <div className="absolute -bottom-4 left-0 right-0 opacity-20 mirror-reflection pointer-events-none scale-y-[-1] blur-md h-[40px]">
                  <div className="h-full rounded-3xl bg-gradient-to-t from-[#a78bfa]/10 to-transparent border-b border-[#a78bfa]/10" />
                </div>
              </a>
            )}
            
            {profile.githubUrl && (
              <a 
                href={profile.githubUrl}
                target="_blank" rel="noreferrer"
                className="group relative flex items-center justify-between glass-panel p-6 rounded-3xl w-full md:w-1/3 hover:bg-[#a78bfa]/10 hover:border-[#a78bfa]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#c4b5fd]">
                    <FaGithub size={24} />
                  </div>
                  <span className="font-medium text-white tracking-wide">GitHub</span>
                </div>
                <ArrowUpRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                
                <div className="absolute -bottom-4 left-0 right-0 opacity-20 mirror-reflection pointer-events-none scale-y-[-1] blur-md h-[40px]">
                  <div className="h-full rounded-3xl bg-gradient-to-t from-[#a78bfa]/10 to-transparent border-b border-[#a78bfa]/10" />
                </div>
              </a>
            )}

            {profile.linkedinUrl && (
              <a 
                href={profile.linkedinUrl}
                target="_blank" rel="noreferrer"
                className="group relative flex items-center justify-between glass-panel p-6 rounded-3xl w-full md:w-1/3 hover:bg-[#a78bfa]/10 hover:border-[#a78bfa]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#c4b5fd]">
                    <FaLinkedin size={24} />
                  </div>
                  <span className="font-medium text-white tracking-wide">LinkedIn</span>
                </div>
                <ArrowUpRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                
                <div className="absolute -bottom-4 left-0 right-0 opacity-20 mirror-reflection pointer-events-none scale-y-[-1] blur-md h-[40px]">
                  <div className="h-full rounded-3xl bg-gradient-to-t from-[#a78bfa]/10 to-transparent border-b border-[#a78bfa]/10" />
                </div>
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
