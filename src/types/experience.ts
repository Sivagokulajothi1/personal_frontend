export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  companyLogo?: string;
  order: number;
  visible: boolean;
}
