import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Profile } from '../types/profile';
import type { Skill } from '../types/skill';
import type { Project } from '../types/project';
import type { Experience } from '../types/experience';
import type { Education } from '../types/education';
import type { Certification } from '../types/certification';
import { 
  mockProfile, 
  mockSkills, 
  mockProjects, 
  mockExperience, 
  mockEducation, 
  mockCertifications 
} from '../data/mockData';

export const getProfile = async (): Promise<Profile> => {
  try {
    const docRef = doc(db, 'profiles', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Profile;
    }
    console.warn("Profile document 'main' not found. Using fallback seed data.");
    return mockProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return mockProfile;
  }
};

export const fetchData = async <T>(
  collectionName: string, 
  mockFallback: T[],
  filterField?: string
): Promise<T[]> => {
  try {
    let q;
    const colRef = collection(db, collectionName);
    
    if (filterField) {
      q = query(colRef, where(filterField, "==", true));
    } else {
      q = colRef;
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return mockFallback;
    }
    
    const results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    // Sort in memory to avoid needing Firestore composite indexes
    results.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    
    return results;
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return mockFallback;
  }
};

export const getSkills = () => fetchData<Skill>('skills', mockSkills, 'visible');
export const getProjects = () => fetchData<Project>('projects', mockProjects, 'published');
export const getExperience = () => fetchData<Experience>('experience', mockExperience, 'visible');
export const getEducation = () => fetchData<Education>('education', mockEducation, 'visible');
export const getCertifications = () => fetchData<Certification>('certifications', mockCertifications, 'visible');

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const projects = await getProjects();
    return projects.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
};
