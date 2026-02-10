import type { Company } from '@/types';

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechFlow',
    logo: '/images/companies/techflow.svg',
    description: 'Workflow automation platform helping teams streamline their processes and boost productivity.',
    website: 'https://techflow.io',
    location: 'San Francisco, CA',
    size: '50-200',
    industry: 'SaaS',
    openRoles: 12,
    founded: '2019',
  },
  {
    id: '2',
    name: 'Northwind',
    logo: '/images/companies/northwind.svg',
    description: 'Enterprise resource planning solutions for modern businesses.',
    website: 'https://northwind.com',
    location: 'New York, NY',
    size: '200-500',
    industry: 'Enterprise Software',
    openRoles: 8,
    founded: '2015',
  },
  {
    id: '3',
    name: 'Pixelwise',
    logo: '/images/companies/pixelwise.svg',
    description: 'Design tools and collaboration platform for creative teams.',
    website: 'https://pixelwise.design',
    location: 'Austin, TX',
    size: '20-50',
    industry: 'Design Tools',
    openRoles: 5,
    founded: '2020',
  },
  {
    id: '4',
    name: 'Cloudcast',
    logo: '/images/companies/cloudcast.svg',
    description: 'Cloud infrastructure monitoring and analytics platform.',
    website: 'https://cloudcast.io',
    location: 'Seattle, WA',
    size: '100-200',
    industry: 'Cloud Infrastructure',
    openRoles: 6,
    founded: '2017',
  },
  {
    id: '5',
    name: 'Stackbase',
    logo: '/images/companies/stackbase.svg',
    description: 'Database management and optimization tools for developers.',
    website: 'https://stackbase.dev',
    location: 'Boston, MA',
    size: '50-100',
    industry: 'Developer Tools',
    openRoles: 4,
    founded: '2018',
  },
  {
    id: '6',
    name: 'Studio Bold',
    logo: '/images/companies/studiobold.svg',
    description: 'Award-winning branding and design studio.',
    website: 'https://studiobold.co',
    location: 'Los Angeles, CA',
    size: '10-20',
    industry: 'Design Agency',
    openRoles: 3,
    founded: '2016',
  },
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getFeaturedCompanies = (limit: number = 4): Company[] => {
  return companies.slice(0, limit);
};
