import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getTechIcon } from '../../utils/getTechIcon';

const NODES = [
  { id: 'react', name: 'React', left: 15, top: 25, mobile: true },
  { id: 'typescript', name: 'TypeScript', left: 75, top: 20, mobile: true },
  { id: 'nodejs', name: 'Node.js', left: 20, top: 75, mobile: false },
  { id: 'python', name: 'Python', left: 80, top: 70, mobile: true },
  { id: 'flutter', name: 'Flutter', left: 55, top: 15, mobile: false },
  { id: 'git', name: 'Git', left: 45, top: 85, mobile: false },
];

const CODE_SNIPPETS = [
  {
    left: 8,
    top: 40,
    text: `const developer = {\n  name: "Sivagokulajothi",\n  passion: "Building"\n};`,
  },
  {
    left: 78,
    top: 50,
    text: `async function init() {\n  await system.start();\n  return true;\n}`,
  },
];

const HeroMagneticSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Array<HTMLDivElement | null>>([]);
  
  const [isMobile, setIsMobile] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Mouse tracking state (not React state to avoid re-renders)
  const mouse = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.targetX = e.clientX - rect.left;
      mouse.current.targetY = e.clientY - rect.top;
    };
    
    // Allow tracking across the whole window for better UX
    window.addEventListener('mousemove', handleMouseMove);

    // Initial mouse pos off-screen
    mouse.current.x = mouse.current.targetX;
    mouse.current.y = mouse.current.targetY;

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.15;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.15;

      // Update trail
      trail.current.push({ x: mouse.current.x, y: mouse.current.y });
      if (trail.current.length > 20) trail.current.shift();

      // Draw trail
      if (trail.current.length > 0) {
        ctx.beginPath();
        ctx.moveTo(trail.current[0].x, trail.current[0].y);
        for (let i = 1; i < trail.current.length; i++) {
          const pt = trail.current[i];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.15)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw subtle cursor glow
      const glow = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 100
      );
      glow.addColorStop(0, 'rgba(167, 139, 250, 0.08)');
      glow.addColorStop(1, 'rgba(167, 139, 250, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 100, 0, Math.PI * 2);
      ctx.fill();

      // Magnetic nodes & lines
      nodesRef.current.forEach((node, index) => {
        if (!node) return;
        
        // Base floating animation
        const config = NODES[index];
        const baseX = (config.left / 100) * canvas.width;
        const baseY = (config.top / 100) * canvas.height;
        
        const floatX = Math.sin(time + index * 10) * 15;
        const floatY = Math.cos(time + index * 10) * 15;
        
        let targetNodeX = baseX + floatX;
        let targetNodeY = baseY + floatY;

        // Magnetic pull
        const dx = mouse.current.x - targetNodeX;
        const dy = mouse.current.y - targetNodeY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const magneticRadius = 150;
        let isHovered = false;
        
        if (dist < magneticRadius) {
          const pull = 1 - dist / magneticRadius;
          targetNodeX += dx * pull * 0.3;
          targetNodeY += dy * pull * 0.3;
          
          if (dist < 40) isHovered = true;

          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(mouse.current.x, mouse.current.y);
          ctx.lineTo(targetNodeX, targetNodeY);
          ctx.strokeStyle = `rgba(167, 139, 250, ${pull * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Apply transform via DOM for performance
        node.style.transform = `translate(-50%, -50%) translate3d(${targetNodeX}px, ${targetNodeY}px, 0) scale(${isHovered ? 1.15 : 1})`;
        
        if (isHovered) {
          node.style.boxShadow = '0 0 20px rgba(167, 139, 250, 0.4)';
          node.style.borderColor = 'rgba(167, 139, 250, 0.6)';
        } else {
          node.style.boxShadow = 'none';
          node.style.borderColor = 'rgba(167, 139, 250, 0.2)';
        }
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isMobile]);

  const handleNodeClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 500);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Code Snippets */}
      {CODE_SNIPPETS.map((snippet, i) => (
        <div
          key={i}
          className="absolute text-[#a78bfa]/10 font-mono text-xs sm:text-sm whitespace-pre hidden md:block select-none"
          style={{ left: `${snippet.left}%`, top: `${snippet.top}%`, transform: 'translateY(0px)' }}
        >
          {snippet.text}
        </div>
      ))}

      {/* Canvas for Lines and Glow */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}

      {/* Floating Nodes */}
      {NODES.map((node, index) => {
        if (isMobile && !node.mobile) return null;
        
        return (
          <div
            key={node.id}
            ref={(el) => { nodesRef.current[index] = el; }}
            onClick={(e) => handleNodeClick(e)}
            className={`absolute top-0 left-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0f0f13]/80 backdrop-blur-md border border-[#a78bfa]/20 shadow-lg cursor-crosshair pointer-events-auto transition-colors duration-300 group
              ${isMobile ? '' : 'will-change-transform'}
            `}
            style={
              isMobile
                ? {
                    left: `${node.left}%`,
                    top: `${node.top}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: `float ${4 + index}s ease-in-out infinite alternate`,
                  }
                : {
                    // Initial position before JS takes over
                    transform: `translate(-50%, -50%) translate3d(calc(${node.left}vw), calc(${node.top}vh), 0)`,
                  }
            }
          >
            <div className="text-xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
              {getTechIcon(node.name)}
            </div>

            {/* Tooltip */}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-widest text-[#c4b5fd] font-medium whitespace-nowrap bg-[#0f0f13] px-2 py-1 rounded-md border border-[#a78bfa]/30 pointer-events-none">
              {node.name}
            </div>

            {/* Ripples */}
            {ripples.map(ripple => (
              <motion.div
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-12 h-12 bg-[#a78bfa] rounded-full pointer-events-none"
                style={{ left: ripple.x - 24, top: ripple.y - 24 }}
              />
            ))}
          </div>
        );
      })}

      {/* Mobile Float Keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default HeroMagneticSystem;
