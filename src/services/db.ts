import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Profile } from '../types/profile';
import type { Skill } from '../types/skill';
import type { Project } from '../types/project';
import type { Experience } from '../types/experience';
import type { Education } from '../types/education';
import type { Certification } from '../types/certification';

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const docRef = doc(db, 'profiles', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Profile;
    }
    console.warn("Profile document 'main' not found in Firestore.");
    return null;
  } catch (error) {
    console.error("Error fetching profile from Firestore:", error);
    return null;
  }
};

export const fetchData = async <T>(
  collectionName: string, 
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
      return [];
    }
    
    const results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    // Sort in memory to avoid needing Firestore composite indexes
    results.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    
    return results;
  } catch (error) {
    console.error(`Error fetching ${collectionName} from Firestore:`, error);
    return [];
  }
};

export const getSkills = () => fetchData<Skill>('skills', 'visible');
export const getProjects = () => fetchData<Project>('projects', 'published');
export const getExperience = () => fetchData<Experience>('experience', 'visible');
export const getEducation = () => fetchData<Education>('education', 'visible');
export const getCertifications = () => fetchData<Certification>('certifications', 'visible');

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const projects = await getProjects();
    return projects.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching project by slug from Firestore:", error);
    return null;
  }
};
