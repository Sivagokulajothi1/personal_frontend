import { FaReact, FaNodeJs, FaPython, FaDatabase, FaServer, FaCode, FaGithub } from 'react-icons/fa';
import { 
  SiTypescript, SiJavascript, SiTailwindcss, SiFirebase, SiFlutter, 
  SiMongodb, SiMysql, SiThreedotjs, SiStripe, SiFastapi,
  SiHtml5, SiCss, SiExpress, SiSequelize, SiJsonwebtokens, SiDart, SiGit
} from 'react-icons/si';

export const getTechIcon = (techName: string) => {
  const name = techName.toLowerCase();
  
  // Frontend
  if (name.includes('react')) return <FaReact className="text-[#61DAFB]" />;
  if (name.includes('flutter')) return <SiFlutter className="text-[#02569B]" />;
  if (name.includes('html')) return <SiHtml5 className="text-[#E34F26]" />;
  if (name.includes('css')) return <SiCss className="text-[#1572B6]" />;
  if (name.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
  
  // Backend & APIs
  if (name.includes('node')) return <FaNodeJs className="text-[#339933]" />;
  if (name.includes('express')) return <SiExpress className="text-white" />;
  if (name.includes('rest api')) return <FaServer className="text-[#a78bfa]" />;
  if (name.includes('jwt')) return <SiJsonwebtokens className="text-[#D63AFF]" />;
  if (name.includes('fastapi')) return <SiFastapi className="text-[#009688]" />;
  
  // Databases & ORMs
  if (name.includes('mongodb')) return <SiMongodb className="text-[#47A248]" />;
  if (name.includes('mysql')) return <SiMysql className="text-[#4479A1]" />;
  if (name.includes('sequelize')) return <SiSequelize className="text-[#52B0E7]" />;
  if (name.includes('firebase')) return <SiFirebase className="text-[#FFCA28]" />;
  
  // Languages
  if (name.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
  if (name.includes('javascript')) return <SiJavascript className="text-[#F7DF1E]" />;
  if (name.includes('python')) return <FaPython className="text-[#3776AB]" />;
  if (name.includes('dart')) return <SiDart className="text-[#0175C2]" />;
  
  // Tools & Others
  if (name.includes('git & github')) return <FaGithub className="text-white" />;
  if (name.includes('git')) return <SiGit className="text-[#F05032]" />;
  if (name.includes('three')) return <SiThreedotjs className="text-white" />;
  if (name.includes('stripe')) return <SiStripe className="text-[#008CDD]" />;
  if (name.includes('web design')) return <FaCode className="text-[#c4b5fd]" />;
  
  return <FaDatabase className="text-gray-400" />;
};

