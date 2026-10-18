import { Mail, Briefcase as Linkedin, Code as Github } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatExternalUrl } from '../../utils/url';

const Footer = () => {
  const { profile } = usePortfolio();

  return (
    <footer className="bg-[#09090b] py-12 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {profile?.name?.toUpperCase() || 'SIVA GOKULAJOTHI'}
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Building digital experiences with modern web technologies.
          </p>
        </div>
        
        <div className="flex space-x-6">
          {profile?.githubUrl && (
            <a 
              href={formatExternalUrl(profile.githubUrl)} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {profile?.linkedinUrl && (
            <a 
              href={formatExternalUrl(profile.linkedinUrl)} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}
          {profile?.email && (
            <a 
              href={`mailto:${profile.email}`} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          )}
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Siva Gokulajothi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
