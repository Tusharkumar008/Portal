export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  category: string;
  postedAt: string;
  deadline?: string;
  applicants?: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  location: string;
  size: string;
  industry: string;
  openRoles: number;
  founded: string;
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  title: string;
  department: string;
  companyId: string;
  profileUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  applications: JobApplication[];
  savedJobs: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  appliedAt: string;
  status: 'pending' | 'reviewing' | 'interview' | 'offered' | 'rejected' | 'withdrawn';
  coverLetter?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}
