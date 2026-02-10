import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'compact' | 'featured';
  isSaved?: boolean;
  onSave?: (jobId: string) => void;
  onApply?: (job: Job) => void;
}

const formatSalary = (min: number, max: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)} - ${formatter.format(max)}`;
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
};

export function JobCard({ job, variant = 'default', isSaved = false, onSave, onApply }: JobCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [, setIsHovered] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(job.id);
  };

  const handleApply = () => {
    onApply?.(job);
  };

  if (variant === 'compact') {
    return (
      <motion.div
        className="group relative bg-white rounded-2xl border border-gray-100 p-4 cursor-pointer"
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(11, 26, 58, 0.1)' }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.96] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleApply}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {job.company.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#F05A44] transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{job.company}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location.split(',')[0]}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
              </span>
            </div>
          </div>
          <motion.button
            className="p-2 rounded-full hover:bg-gray-50 transition-colors"
            onClick={handleSave}
            whileTap={{ scale: 0.9 }}
          >
            {saved ? (
              <BookmarkCheck className="w-5 h-5 text-[#F05A44]" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-400" />
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer"
        whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(11, 26, 58, 0.12)' }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.96] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleApply}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F05A44] to-[#ff7a65]" />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold text-xl">
              {job.company.charAt(0)}
            </div>
            <motion.button
              className="p-2.5 rounded-full hover:bg-gray-50 transition-colors"
              onClick={handleSave}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {saved ? (
                <BookmarkCheck className="w-5 h-5 text-[#F05A44]" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F05A44] transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-500 mb-4">{job.company}</p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{job.workMode} · {job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-[#F05A44]">
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
              </span>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full bg-[#0B1A3A] hover:bg-[#1a2d5c] text-white rounded-xl h-12 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                handleApply();
              }}
            >
              View Role
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group relative bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer"
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(11, 26, 58, 0.1)' }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.96] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleApply}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {job.company.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#F05A44] transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-500">{job.company}</p>
            </div>
            <motion.button
              className="p-2 rounded-full hover:bg-gray-50 transition-colors flex-shrink-0"
              onClick={handleSave}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {saved ? (
                <BookmarkCheck className="w-5 h-5 text-[#F05A44]" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100">
              {job.workMode}
            </Badge>
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100">
              {job.type}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
            <span className="text-sm font-medium text-[#F05A44]">
              {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {formatTimeAgo(job.postedAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
