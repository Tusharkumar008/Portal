import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb, TrendingUp, BarChart3, Settings, type LucideIcon } from 'lucide-react';
import type { Category } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Settings,
};

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
  index?: number;
}

export function CategoryCard({ category, onClick, index = 0 }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Code2;

  return (
    <motion.div
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.96]
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 20px 50px rgba(11, 26, 58, 0.12)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(category)}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ 
          background: `linear-gradient(135deg, ${category.color} 0%, transparent 100%)` 
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${category.color}15` }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.2 }}
        >
          <Icon 
            className="w-7 h-7" 
            style={{ color: category.color }}
          />
        </motion.div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#F05A44] transition-colors">
          {category.name}
        </h3>
        
        <p className="text-sm text-gray-500">
          {category.jobCount.toLocaleString()} jobs
        </p>
      </div>

      {/* Arrow indicator */}
      <motion.div
        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <svg 
          className="w-5 h-5 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
