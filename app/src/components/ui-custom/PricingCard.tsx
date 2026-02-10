import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import type { PricingPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PricingCardProps {
  plan: PricingPlan;
  isYearly?: boolean;
  index?: number;
}

export function PricingCard({ plan, isYearly = false, index = 0 }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? '/year' : '/month';

  return (
    <motion.div
      className={`relative rounded-3xl p-6 lg:p-8 ${
        plan.highlighted 
          ? 'bg-white border-2 border-[#F05A44] shadow-xl' 
          : 'bg-white border border-gray-100'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.96]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8, 
        boxShadow: plan.highlighted 
          ? '0 25px 60px rgba(240, 90, 68, 0.2)' 
          : '0 20px 50px rgba(11, 26, 58, 0.12)',
      }}
    >
      {/* Highlighted badge */}
      {plan.highlighted && (
        <motion.div 
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-[#F05A44] text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Accent border for highlighted plan */}
      {plan.highlighted && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F05A44] to-[#ff7a65] rounded-t-3xl" />
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-sm text-gray-500">{plan.description}</p>
      </div>

      <div className="text-center mb-8">
        <motion.div 
          className="flex items-baseline justify-center gap-1"
          key={price}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-4xl lg:text-5xl font-bold text-gray-900">
            ${price}
          </span>
          <span className="text-gray-500">{period}</span>
        </motion.div>
        {isYearly && price > 0 && (
          <motion.p 
            className="text-sm text-[#F05A44] mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year
          </motion.p>
        )}
      </div>

      <motion.div 
        className="space-y-4 mb-8"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {plan.features.map((feature, i) => (
          <motion.div 
            key={i} 
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              plan.highlighted ? 'bg-[#F05A44]/10' : 'bg-gray-100'
            }`}>
              <Check className={`w-3 h-3 ${plan.highlighted ? 'text-[#F05A44]' : 'text-gray-600'}`} />
            </div>
            <span className="text-sm text-gray-600">{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className={`w-full h-12 rounded-xl font-medium ${
            plan.highlighted 
              ? 'bg-[#F05A44] hover:bg-[#e04d38] text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {plan.cta}
        </Button>
      </motion.div>
    </motion.div>
  );
}
