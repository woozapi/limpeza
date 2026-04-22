import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  const { config } = useConfig();
  
  // Se o logoPath for o padrão, podemos usar uma versão estilizada em texto do "Zelo"
  const isDefaultLogo = config.logoPath === '/logo-rm-original.png';

  if (isDefaultLogo) {
     return (
        <div className={`flex items-center gap-2.5 ${className}`}>
           <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <ShieldCheck size={28} strokeWidth={2.5} />
           </div>
           <div className="flex flex-col">
              <span className="font-black text-slate-900 text-xl leading-none tracking-tighter uppercase">RM Limpeza</span>
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none mt-1">Excelência Clean</span>
           </div>
        </div>
     );
  }
  
  return (
    <div className={`flex items-center overflow-hidden ${className}`}>
      <img 
        src={config.logoPath} 
        alt="Zelo Premium" 
        className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};
