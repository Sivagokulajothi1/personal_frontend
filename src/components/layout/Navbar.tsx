import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { skills, projects, experience, education, certifications } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Dynamic Menubar Data Structure
  const navLinks = [
    { name: 'Home', path: 'hero' },
    { name: 'About', path: 'about' }
  ];
  if (skills && skills.length > 0) navLinks.push({ name: 'Skills', path: 'skills' });
  if (projects && projects.length > 0) navLinks.push({ name: 'Projects', path: 'projects' });
  if (experience && experience.length > 0) navLinks.push({ name: 'Experience', path: 'experience' });
  if (education && education.length > 0) navLinks.push({ name: 'Education', path: 'education' });
  if (certifications && certifications.length > 0) navLinks.push({ name: 'Certifications', path: 'certifications' });
  navLinks.push({ name: 'Contact', path: 'contact' });

  // 2. Scroll and Active Section Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only run active section logic on main page
      if (location.pathname !== '/') return;

      const sectionPaths = navLinks.map(link => link.path);
      let current = 'hero';
      for (const path of sectionPaths) {
        const element = document.getElementById(path);
        // Find the last section that we have scrolled past (offset by half window height for better UX)
        if (element && window.scrollY >= (element.offsetTop - window.innerHeight / 2)) {
          current = path;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks.length, location.pathname]);

  // 3. Smooth Section Navigation without full page reload
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(path);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    const el = document.getElementById(path);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping/reloading
      window.history.pushState(null, '', `#${path}`);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className={`mx-auto max-w-6xl transition-all duration-500 flex items-center justify-between px-6 rounded-2xl ${
          isScrolled 
            ? 'bg-[#0f0f13]/70 backdrop-blur-xl border border-[#a78bfa]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' 
            : 'bg-transparent border-transparent py-2'
        }`}>
          
          <a href="/" onClick={(e) => handleNavClick(e, 'hero')} className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent relative group">
            SG
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#a78bfa] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.path && location.pathname === '/';
              return (
                <a 
                  key={link.name}
                  href={`#${link.path}`}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded-full shadow-[0_0_15px_rgba(167,139,250,0.2)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 px-6 mt-2 md:hidden"
          >
            <div className="bg-[#0f0f13]/95 backdrop-blur-2xl border border-[#a78bfa]/20 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={`#${link.path}`}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={(e) => handleNavClick(e, link.path)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar
