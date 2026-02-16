import type { Employee } from '@/types';

export const employees: Employee[] = [
  // TechFlow employees
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    title: 'VP of Engineering',
    department: 'Engineering',
    companyId: '1',
    profileUrl: 'https://linkedin.com/in/sarahchen',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    companyId: '1',
    profileUrl: 'https://linkedin.com/in/michaelrodriguez',
  },
  {
    id: '3',
    name: 'Emily Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'Product Manager',
    department: 'Product',
    companyId: '1',
    profileUrl: 'https://linkedin.com/in/emilywatson',
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    title: 'UX Designer',
    department: 'Design',
    companyId: '1',
  },

  // Northwind employees
  {
    id: '5',
    name: 'Jennifer Martinez',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    title: 'Chief Technology Officer',
    department: 'Executive',
    companyId: '2',
    profileUrl: 'https://linkedin.com/in/jennifermartinez',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'Enterprise Architect',
    department: 'Engineering',
    companyId: '2',
    profileUrl: 'https://linkedin.com/in/roberttaylor',
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    title: 'Solutions Engineer',
    department: 'Sales',
    companyId: '2',
  },
  {
    id: '8',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    companyId: '2',
    profileUrl: 'https://linkedin.com/in/jameswilson',
  },

  // Pixelwise employees
  {
    id: '9',
    name: 'Amanda Foster',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    title: 'Creative Director',
    department: 'Design',
    companyId: '3',
    profileUrl: 'https://linkedin.com/in/amandafoster',
  },
  {
    id: '10',
    name: 'Chris Thompson',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    title: 'Lead UI Designer',
    department: 'Design',
    companyId: '3',
  },
  {
    id: '11',
    name: 'Rachel Green',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    title: 'Frontend Developer',
    department: 'Engineering',
    companyId: '3',
    profileUrl: 'https://linkedin.com/in/rachelgreen',
  },

  // Cloudcast employees
  {
    id: '12',
    name: 'Kevin O\'Brien',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    title: 'CEO & Co-Founder',
    department: 'Executive',
    companyId: '4',
    profileUrl: 'https://linkedin.com/in/kevinobrien',
  },
  {
    id: '13',
    name: 'Patricia Lee',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    title: 'Director of Infrastructure',
    department: 'Engineering',
    companyId: '4',
    profileUrl: 'https://linkedin.com/in/patricialee',
  },
  {
    id: '14',
    name: 'Daniel Park',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
    title: 'Cloud Solutions Engineer',
    department: 'Engineering',
    companyId: '4',
  },
  {
    id: '15',
    name: 'Michelle Davis',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    title: 'Data Analyst',
    department: 'Analytics',
    companyId: '4',
    profileUrl: 'https://linkedin.com/in/michelledavis',
  },

  // Stackbase employees
  {
    id: '16',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    title: 'Founder & CEO',
    department: 'Executive',
    companyId: '5',
    profileUrl: 'https://linkedin.com/in/alexjohnson',
  },
  {
    id: '17',
    name: 'Sophie Brown',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    title: 'Database Administrator',
    department: 'Engineering',
    companyId: '5',
    profileUrl: 'https://linkedin.com/in/sophiebrown',
  },
  {
    id: '18',
    name: 'Tyler Morgan',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
    title: 'Developer Advocate',
    department: 'Marketing',
    companyId: '5',
  },

  // Studio Bold employees
  {
    id: '19',
    name: 'Olivia Martinez',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
    title: 'Creative Director',
    department: 'Creative',
    companyId: '6',
    profileUrl: 'https://linkedin.com/in/oliviamartinez',
  },
  {
    id: '20',
    name: 'Jake Williams',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Brand Designer',
    department: 'Design',
    companyId: '6',
    profileUrl: 'https://linkedin.com/in/jakewilliams',
  },
  {
    id: '21',
    name: 'Mia Garcia',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face',
    title: 'Motion Designer',
    department: 'Design',
    companyId: '6',
  },
];

export const getEmployeesByCompanyId = (companyId: string): Employee[] => {
  return employees.filter(employee => employee.companyId === companyId);
};
