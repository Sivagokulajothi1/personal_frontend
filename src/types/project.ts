export interface Project {
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  screenshots?: string[];
  demoVideo?: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: number;
}
