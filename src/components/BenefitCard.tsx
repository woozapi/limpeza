import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

export interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col items-center sm:items-start text-center sm:text-left transition-all hover:shadow-xl hover:shadow-blue-900/5 group"
    >
      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 mb-3 sm:mb-6 shadow-inner transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={20} className="sm:hidden" strokeWidth={2.5} />
        <Icon size={28} className="hidden sm:block" strokeWidth={2.5} />
      </div>
      <h3 className="font-display text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-slate-900 leading-tight">
        {title}
      </h3>
      <p className="text-slate-500 font-normal leading-relaxed text-[11px] sm:text-sm hidden sm:block">
        {description}
      </p>
    </motion.div>
  );
};
