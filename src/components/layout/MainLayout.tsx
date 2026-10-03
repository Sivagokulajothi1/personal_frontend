import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#030305] text-white flex flex-col relative overflow-hidden">
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 0.05), transparent 40%)`
        }}
      />

      {/* Global Background Particles / Noise / Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="fixed top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#8b5cf6]/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#c084fc]/10 blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-[#a78bfa]/5 blur-[120px] pointer-events-none" />

      <Navbar />
      
      <main className="flex-grow z-10 relative">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
