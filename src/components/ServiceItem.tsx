import React from 'react';
import { motion } from 'motion/react';
import { getIcon } from '../lib/icons';

export interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description }) => {
  const Icon = getIcon(icon);
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col gap-4 p-6 sm:p-8 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-xl hover:border-blue-100 group"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white shrink-0 shadow-inner">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
