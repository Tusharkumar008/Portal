import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      className="relative bg-white rounded-3xl border border-gray-100 p-8 lg:p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.96]
      }}
    >
      {/* Quote icon background */}
      <div className="absolute top-8 right-8 opacity-5">
        <Quote className="w-24 h-24 text-[#0B1A3A]" />
      </div>

      <div className="relative z-10">
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              className="w-5 h-5 text-[#F05A44]"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          className="text-xl lg:text-2xl text-gray-800 font-medium leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          "{testimonial.quote}"
        </motion.blockquote>

        {/* Author */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white text-xl font-bold">
            {testimonial.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
            <p className="text-sm text-gray-500">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
