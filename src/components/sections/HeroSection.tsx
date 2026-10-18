import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown, Eye } from "lucide-react";
import FadeIn from "../animations/FadeIn";
import HeroMagneticSystem from "../animations/HeroMagneticSystem";
import { usePortfolio } from "../../context/PortfolioContext";

const HeroSection = () => {
  const { profile } = usePortfolio();
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    if (!profile || !profile.roles || profile.roles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % profile.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [profile]);

  if (!profile) return null;

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!profile?.resumeUrl) return;

    try {
      // Force download by fetching blob
      const response = await fetch(profile.resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback to regular link if fetch fails (e.g. CORS)
      window.open(profile.resumeUrl, "_blank");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Premium Magnetic Cursor & Floating Code System */}
      <HeroMagneticSystem />

      <div className="container mx-auto px-6 md:px-12 z-10 text-center relative pb-32 pointer-events-none">
        <FadeIn delay={0.3} direction="up">
          <div className="relative inline-block mirror-reflection max-w-full pointer-events-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] 2xl:text-[9rem] font-black tracking-tighter leading-[1.15] pb-3 sm:pb-4 mb-4 whitespace-nowrap overflow-visible">
              <span className="inline-block text-white pb-1">{profile.name.split(" ")[0]}</span>{" "}
              {profile.name.split(" ").length > 1 && (
                <span className="inline-block bg-gradient-to-br from-white via-[#c4b5fd] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(167,139,250,0.5)] pb-1">
                  {profile.name.split(" ").slice(1).join(" ")}
                </span>
              )}
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} direction="up">
          <div className="mt-8 md:mt-12 h-12 md:h-16 text-xl md:text-4xl font-light text-gray-300 flex flex-col md:flex-row items-center justify-center gap-2">
            <span className="text-gray-400">Engineering</span>
            <div className="relative inline-block w-full md:w-[600px] text-center md:text-left h-[40px] md:h-[50px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={{ y: 40, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -40, opacity: 0, rotateX: -90 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="absolute inset-0 font-medium text-[#c4b5fd] flex items-center justify-center md:justify-start"
                  style={{ transformPerspective: 1000 }}
                >
                  {profile.roles[currentRole] || "Software Engineer"}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <div className="mt-12 w-full pointer-events-auto">
            <div
              className={`w-full max-w-[360px] md:max-w-[500px] mx-auto grid ${profile.resumeUrl ? "grid-cols-2" : "grid-cols-1"} gap-3 md:gap-6 mirror-reflection pb-2`}
            >
              <a
                href="#projects"
                className="w-full h-[46px] md:h-[58px] bg-white/5 backdrop-blur-md border border-[#a78bfa]/30 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-[#a78bfa]/20 hover:border-[#a78bfa]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(167,139,250,0.1)] group whitespace-nowrap text-sm md:text-base"
              >
                <span>Explore Projects</span>
                <ArrowDown
                  size={18}
                  className="text-[#a78bfa] group-hover:translate-y-1 transition-transform"
                />
              </a>
              {profile.resumeUrl && (
                <div className="w-full h-[46px] md:h-[58px] flex items-center justify-between bg-white/5 backdrop-blur-md border border-[#a78bfa]/30 rounded-xl overflow-hidden hover:border-[#a78bfa]/60 transition-colors shadow-[0_4px_20px_rgba(167,139,250,0.1)]">
                  <span className="flex-1 text-center px-2 md:px-4 text-white font-medium whitespace-nowrap text-sm md:text-base">
                    Resume
                  </span>
                  <div className="w-[1px] h-8 bg-[#a78bfa]/30 shrink-0"></div>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 md:px-4 py-3 md:py-4 text-[#a78bfa] hover:bg-[#a78bfa]/20 hover:text-white transition-colors flex items-center justify-center h-full shrink-0"
                    title="View Resume"
                  >
                    <Eye size={20} />
                  </a>
                  <div className="w-[1px] h-8 bg-[#a78bfa]/30 shrink-0"></div>
                  <a
                    href={profile.resumeUrl}
                    onClick={handleDownload}
                    className="px-3 md:px-4 py-3 md:py-4 text-[#a78bfa] hover:bg-[#a78bfa]/20 hover:text-white transition-colors flex items-center justify-center h-full cursor-pointer shrink-0"
                    title="Download Resume"
                  >
                    <Download size={20} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-[#a78bfa] transition-colors z-20 pointer-events-auto"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#a78bfa] to-transparent" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
