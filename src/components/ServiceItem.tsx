import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

export interface ServiceItemProps {
  icon: LucideIcon;
  label: string;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, label }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 transition-all hover:shadow-md group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
        <Icon size={20} />
      </div>
      <span className="font-display font-semibold text-slate-800 text-sm sm:text-lg leading-tight">{label}</span>
    </motion.div>
  );
};
