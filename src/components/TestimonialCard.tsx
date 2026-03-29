import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  rating: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, company, quote, rating }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 sm:p-8 rounded-[20px] sm:rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col h-full hover:shadow-lg transition-shadow"
    >
      <div className="flex gap-1 mb-4 sm:mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-blue-600 text-blue-600 sm:w-4 sm:h-4" />
        ))}
      </div>
      <p className="text-slate-600 italic mb-6 sm:mb-8 flex-grow leading-relaxed font-sans text-sm sm:text-base">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-50">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-display font-bold text-sm sm:text-lg shrink-0">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-display font-bold text-slate-900 text-sm sm:text-base truncate">{name}</div>
          <div className="text-[9px] sm:text-[10px] font-bold text-blue-600 uppercase tracking-widest">{company}</div>
        </div>
      </div>
    </motion.div>
  );
};
