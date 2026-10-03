export interface Profile {
  id?: string;
  name: string;
  roles: string[];
  about: string;
  profileImage?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email: string;
  location: string;
}
