import React from 'react';
import { Star, Quote } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 sm:p-10 rounded-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col h-full hover:shadow-2xl transition-all duration-500 group"
    >
      <div className="flex gap-1 mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      
      <div className="relative flex-grow">
        <Quote className="absolute -top-2 -left-4 text-slate-100 w-12 h-12 -z-10 group-hover:text-blue-50 transition-colors" />
        <p className="text-slate-600 font-medium mb-10 leading-relaxed font-sans text-lg relative z-10">
          "{quote}"
        </p>
      </div>

      <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-lg shadow-slate-200 group-hover:bg-blue-600 transition-colors">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-slate-900 text-lg truncate tracking-tight">{name}</div>
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.15em]">{company}</div>
        </div>
      </div>
    </motion.div>
  );
};
