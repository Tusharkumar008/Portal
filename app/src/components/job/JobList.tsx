import { motion, AnimatePresence } from 'framer-motion';
import type { Job } from '@/types';
import { JobCard } from './JobCard';
import { JobCardSkeleton } from './JobCardSkeleton';

interface JobListProps {
  jobs: Job[];
  isLoading?: boolean;
  onSaveJob?: (jobId: string) => void;
  onApply?: (job: Job) => void;
  savedJobs?: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.96] as const,
    },
  },
};

export function JobList({ jobs, isLoading = false, onSaveJob, onApply, savedJobs = [] }: JobListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            layout
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          >
            <JobCard
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onSave={onSaveJob}
              onApply={onApply}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
