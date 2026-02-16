import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, ExternalLink, Users, Globe, X, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Company, Employee } from '@/types';
import { Button } from '@/components/ui/button';
import { employeeService } from '@/services/api';

interface CompanyCardProps {
  company: Company;
  onView?: (company: Company) => void;
  index?: number;
  isExpanded?: boolean;
  onToggleExpand?: (companyId: string) => void;
}

export function CompanyCard({ company, onView, index = 0, isExpanded = false, onToggleExpand }: CompanyCardProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setIsLoading(true);
      employeeService.getEmployeesByCompany(company.id)
        .then(data => {
          setEmployees(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isExpanded, company.id]);
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
      onClick={() => onToggleExpand?.(company.id)}
      layout
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
              if (onView) {
                onView(company);
              } else {
                onToggleExpand?.(company.id);
              }
            }}
          >
            {isExpanded ? 'Close' : 'View jobs'}
            {isExpanded ? <X className="w-4 h-4 ml-1" /> : <ExternalLink className="w-4 h-4 ml-1" />}
          </Button>
        </motion.div>
      </div>

      {/* Expanded Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.96] }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-6">
              {/* Career Page Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md">
                    {company.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{company.name}</h4>
                    <p className="text-sm text-gray-500">Official Career Page</p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#F05A44] hover:bg-[#d94e3a] text-white shadow-md hover:shadow-lg transition-all"
                    onClick={() => window.open(company.website, '_blank', 'noopener,noreferrer')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Career Page
                  </Button>
                </div>
              </motion.div>

              {/* Employees Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#F05A44]" />
                  <h4 className="font-semibold text-gray-900">Team Members</h4>
                  <span className="text-sm text-gray-500">({employees.length})</span>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-4 h-20" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {employees.map((employee, empIndex) => (
                      <motion.div
                        key={employee.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + empIndex * 0.05 }}
                        className="group/employee bg-white rounded-lg p-3 border border-gray-100 hover:border-[#F05A44]/30 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => employee.profileUrl && window.open(employee.profileUrl, '_blank', 'noopener,noreferrer')}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover/employee:ring-[#F05A44]/20"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate group-hover/employee:text-[#F05A44] transition-colors">
                              {employee.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{employee.title}</p>
                            <p className="text-xs text-[#F05A44]/70">{employee.department}</p>
                          </div>
                          {employee.profileUrl && (
                            <Linkedin className="w-4 h-4 text-gray-300 group-hover/employee:text-[#0077b5] transition-colors" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
