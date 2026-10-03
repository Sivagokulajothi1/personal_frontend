export interface Certification {
  id?: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  skills?: string[];
  order: number;
  visible: boolean;
}
