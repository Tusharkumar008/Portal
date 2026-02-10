import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  onRead?: (post: BlogPost) => void;
  index?: number;
}

export function BlogCard({ post, onRead, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer"
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
      onClick={() => onRead?.(post)}
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0B1A3A]/5 to-[#F05A44]/5"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0B1A3A]">{post.title.charAt(0)}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-[#F05A44] bg-[#F05A44]/10 px-2.5 py-1 rounded-full">
            {post.tags[0]}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#F05A44] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white text-sm font-medium">
              {post.author.charAt(0)}
            </div>
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          
          <motion.div
            className="flex items-center gap-1 text-sm font-medium text-[#0B1A3A] group-hover:text-[#F05A44] transition-colors"
            whileHover={{ x: 4 }}
          >
            Read
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
