import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Engineering',
    icon: 'Code2',
    jobCount: 245,
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Design',
    icon: 'Palette',
    jobCount: 128,
    color: '#EC4899',
  },
  {
    id: '3',
    name: 'Product',
    icon: 'Lightbulb',
    jobCount: 86,
    color: '#F59E0B',
  },
  {
    id: '4',
    name: 'Marketing',
    icon: 'TrendingUp',
    jobCount: 94,
    color: '#10B981',
  },
  {
    id: '5',
    name: 'Data',
    icon: 'BarChart3',
    jobCount: 67,
    color: '#8B5CF6',
  },
  {
    id: '6',
    name: 'Operations',
    icon: 'Settings',
    jobCount: 52,
    color: '#6B7280',
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
