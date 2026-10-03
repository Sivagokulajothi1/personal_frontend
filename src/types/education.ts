export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  description?: string;
  logo?: string;
  order: number;
  visible: boolean;
}
