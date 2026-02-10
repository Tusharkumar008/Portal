import { motion } from 'framer-motion';
import { UserPlus, Send, MessageSquare, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  UserPlus,
  Send,
  MessageSquare,
};

interface StepCardProps {
  step: {
    number: number;
    title: string;
    description: string;
    icon: string;
  };
  index?: number;
}

export function StepCard({ step, index = 0 }: StepCardProps) {
  const Icon = iconMap[step.icon] || UserPlus;

  return (
    <motion.div
      className="relative bg-white rounded-2xl p-6 lg:p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.96]
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 20px 50px rgba(11, 26, 58, 0.12)',
      }}
    >
      {/* Step number */}
      <motion.div 
        className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-[#F05A44] text-white flex items-center justify-center font-bold text-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
      >
        {step.number}
      </motion.div>

      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-xl bg-[#F05A44]/10 flex items-center justify-center mb-5"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-7 h-7 text-[#F05A44]" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {step.title}
      </h3>
      <p className="text-gray-500 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}
