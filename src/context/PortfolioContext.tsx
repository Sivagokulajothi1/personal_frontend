import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, getSkills, getProjects, getExperience, getEducation, getCertifications } from '../services/db';
import type { Profile } from '../types/profile';
import type { Skill } from '../types/skill';
import type { Project } from '../types/project';
import type { Experience } from '../types/experience';
import type { Education } from '../types/education';
import type { Certification } from '../types/certification';

type PortfolioContextType = {
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  isLoading: boolean;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Omit<PortfolioContextType, 'isLoading'>>({
    profile: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, skills, projects, experience, education, certifications] = await Promise.all([
          getProfile(),
          getSkills(),
          getProjects(),
          getExperience(),
          getEducation(),
          getCertifications()
        ]);
        
        setData({ profile, skills, projects, experience, education, certifications });
      } catch (error) {
        console.error("Failed to load portfolio data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ ...data, isLoading }}>
      {isLoading ? (
        <div className="fixed inset-0 bg-[#030305] z-[9999] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#a78bfa]/20 border-t-[#a78bfa] rounded-full animate-spin mb-6"></div>
          <div className="text-[#a78bfa] font-mono text-sm tracking-widest uppercase">Initializing System...</div>
        </div>
      ) : (
        children
      )}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
