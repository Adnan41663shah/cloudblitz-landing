export type CourseType = 'cdec' | 'X-DSAAI';

export type ModalPurpose = 'syllabus' | 'consultation' | 'quick' | 'offer';

export interface SyllabusModule {
  id: number;
  title: string;
  subtitle: string;
  topics: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  previousCompany: string;
  salaryPackage: string;
  comment: string;
  rating: number;
  avatar: string;
  course: CourseType;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'placement' | 'curriculum' | 'pricing';
}

export interface SalaryData {
  role: string;
  fresherSalary: string;
  midSalary: string;
  leadSalary: string;
  growth: string;
  demand: 'Very High' | 'Critical' | 'High';
  skillsRequired: string[];
}
