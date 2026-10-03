import type { Project } from '../types/project';
import type { Skill } from '../types/skill';
import type { Experience } from '../types/experience';
import type { Education } from '../types/education';
import type { Certification } from '../types/certification';
import type { Profile } from '../types/profile';

export const mockProfile: Profile = {
  id: 'main',
  name: 'Siva Gokulajothi',
  roles: [
    'Software Engineer',
    'Full Stack Developer',
    'React Native Developer',
    'AI / Voice Agent Builder'
  ],
  about: "I am a passionate Software Engineer focused on building exceptional digital experiences. With a strong foundation in modern web and mobile technologies, I transform complex problems into elegant, scalable solutions.\n\nWhether I'm developing a responsive frontend, architecting a backend system, or integrating the latest AI capabilities, I bring dedication and technical excellence to every project. My approach merges precision engineering with futuristic design principles.",
  email: 'hello@example.com',
  location: 'Earth',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com'
};

export const mockSkills: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', level: 90, order: 1, visible: true },
  { id: '2', name: 'TypeScript', category: 'Frontend', level: 85, order: 2, visible: true },
  { id: '3', name: 'React Native', category: 'Mobile', level: 80, order: 3, visible: true },
  { id: '4', name: 'Flutter', category: 'Mobile', level: 75, order: 4, visible: true },
  { id: '5', name: 'Node.js', category: 'Backend', level: 85, order: 5, visible: true },
  { id: '6', name: 'Firebase', category: 'Backend', level: 90, order: 6, visible: true },
  { id: '7', name: 'Python', category: 'AI', level: 70, order: 7, visible: true },
  { id: '8', name: 'MongoDB', category: 'Database', level: 80, order: 8, visible: true },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'ExplodeView.ai',
    slug: 'explodeview-ai',
    category: 'AI Platform',
    description: 'An AI-powered platform for generating interactive 3D exploded views from 2D designs.',
    technologies: ['React', 'Three.js', 'Python', 'FastAPI'],
    featured: true,
    order: 1,
    createdAt: Date.now(),
    published: true
  },
  {
    id: '2',
    title: 'AI Voice Assistant',
    slug: 'ai-voice-assistant',
    category: 'AI / Voice',
    description: 'A conversational AI agent capable of handling customer support queries with natural voice.',
    technologies: ['Node.js', 'OpenAI', 'WebSockets'],
    featured: true,
    order: 2,
    createdAt: Date.now(),
    published: true
  },
  {
    id: '3',
    title: 'WhatsApp Calendar Assistant',
    slug: 'whatsapp-calendar-assistant',
    category: 'Automation',
    description: 'Automated WhatsApp bot that manages your calendar and schedules appointments.',
    technologies: ['TypeScript', 'Node.js'],
    featured: false,
    order: 3,
    createdAt: Date.now(),
    published: true
  },
  {
    id: '4',
    title: 'Fingertip B2B Payments',
    slug: 'fingertip-b2b-payments',
    category: 'Fintech',
    description: 'Secure B2B payment gateway integration with complex transaction tracking.',
    technologies: ['React', 'Node.js', 'Stripe'],
    featured: true,
    order: 4,
    createdAt: Date.now(),
    published: true
  }
];

export const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Tech Innovations Inc.',
    position: 'Software Engineer',
    startDate: '2024-01-01',
    current: true,
    description: 'Leading development of AI-integrated products.',
    order: 1,
    visible: true,
    technologies: ['React', 'Node.js', 'TypeScript']
  },
  {
    id: '2',
    company: 'Digital Solutions',
    position: 'Junior Developer',
    startDate: '2022-06-01',
    endDate: '2023-12-31',
    current: false,
    description: 'Developed and maintained cross-platform mobile apps.',
    order: 2,
    visible: true,
    technologies: ['React Native', 'Firebase']
  }
];

export const mockEducation: Education[] = [
  {
    id: '1',
    institution: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startYear: '2018',
    endYear: '2022',
    order: 1,
    visible: true
  }
];

export const mockCertifications: Certification[] = [
  {
    id: '1',
    title: 'AWS Certified Developer',
    organization: 'Amazon Web Services',
    issueDate: '2023-05-15',
    order: 1,
    visible: true
  }
];
