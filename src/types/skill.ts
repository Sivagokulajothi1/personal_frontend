export interface Skill {
  id?: string;
  name: string;
  category: string; // Frontend, Backend, Mobile, Database, AI, Tools
  icon?: string;
  description?: string;
  level?: number;
  order: number;
  visible: boolean;
}
