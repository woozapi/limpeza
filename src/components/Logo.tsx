import React from 'react';
import { useConfig } from '../context/ConfigContext';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  const { config } = useConfig();
  
  return (
    <div className={`flex items-center overflow-hidden ${className}`}>
      <img 
        src={config.logoPath} 
        alt="RM Limpeza Clean" 
        className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        style={{ 
          filter: 'contrast(1.1) brightness(1.05)',
        }}
      />
    </div>
  );
};
