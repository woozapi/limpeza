import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultConfig from '../data/siteConfig';

// Tipagem para a configuração do site (Simplificada)
export type LeadStatus = 'novo' | 'em_contato' | 'agendado' | 'finalizado';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface SiteConfig {
  WHATSAPP_NUMBER: string;
  WHATSAPP_LINK: string;
  heroData: typeof defaultConfig.heroData;
  benefits: typeof defaultConfig.benefits;
  services: typeof defaultConfig.services;
  testimonials: typeof defaultConfig.testimonials;
  salesBlock: typeof defaultConfig.salesBlock;
  logoPath: string;
  leads: Lead[];
}

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'rm_limpeza_config';
const AUTH_KEY = 'rm_limpeza_auth';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Erro ao carregar configurações salvas', e);
      }
    }
    return {
      WHATSAPP_NUMBER: defaultConfig.WHATSAPP_NUMBER,
      WHATSAPP_LINK: defaultConfig.WHATSAPP_LINK,
      heroData: defaultConfig.heroData,
      benefits: defaultConfig.benefits,
      services: defaultConfig.services,
      testimonials: defaultConfig.testimonials,
      salesBlock: defaultConfig.salesBlock,
      logoPath: '/logo-rm-original.png',
      leads: [],
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      status: 'novo',
      createdAt: new Date().toISOString(),
    };
    setConfig(prev => ({ ...prev, leads: [newLead, ...prev.leads] }));
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setConfig(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, status } : l)
    }));
  };

  const deleteLead = (id: string) => {
    setConfig(prev => ({
      ...prev,
      leads: prev.leads.filter(l => l.id !== id)
    }));
  };

  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const login = (password: string) => {
    // Senha difícil solicitada pelo usuário
    if (password === 'RM@Admin#2026!Clean') {
      setIsLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig, isLoggedIn, login, logout }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig deve ser usado dentro de um ConfigProvider');
  return context;
};
