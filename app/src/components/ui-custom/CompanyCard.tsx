import { motion } from 'framer-motion';
import { MapPin, Building2, ExternalLink } from 'lucide-react';
import type { Company } from '@/types';
import { Button } from '@/components/ui/button';

interface CompanyCardProps {
  company: Company;
  onView?: (company: Company) => void;
  index?: number;
}

export function CompanyCard({ company, onView, index = 0 }: CompanyCardProps) {
  return (
    <motion.div
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.96]
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 20px 50px rgba(11, 26, 58, 0.12)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onView?.(company)}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
          whileHover={{ scale: 1.05, rotate: 3 }}
          transition={{ duration: 0.2 }}
        >
          {company.name.charAt(0)}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#F05A44] transition-colors truncate">
            {company.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {company.description}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span>{company.size} employees · {company.industry}</span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#F05A44]">{company.openRoles}</span>
          <span className="text-sm text-gray-500">open roles</span>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[#0B1A3A] hover:text-[#F05A44] hover:bg-[#F05A44]/5"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(company);
            }}
          >
            View jobs
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
