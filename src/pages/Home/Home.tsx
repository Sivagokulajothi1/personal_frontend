import AboutSection from "../../components/sections/AboutSection";
import CertificationsSection from "../../components/sections/CertificationsSection";
import EducationSection from "../../components/sections/EducationSection";
import ExperienceSection from "../../components/sections/ExperienceSection";
import HeroSection from "../../components/sections/HeroSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import SkillsSection from "../../components/sections/SkillsSection";
import ContactSection from "../../components/sections/ContactSection";

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
