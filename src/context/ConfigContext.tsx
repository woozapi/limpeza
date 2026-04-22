import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultConfig from '../data/siteConfig';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  trustProcess: typeof defaultConfig.trustProcess;
  faq: typeof defaultConfig.faq;
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
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'rm_limpeza_config';
const AUTH_KEY = 'rm_limpeza_auth';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState<SiteConfig>(() => {
    // Inicialização síncrona com defaults ou localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      WHATSAPP_NUMBER: defaultConfig.WHATSAPP_NUMBER,
      WHATSAPP_LINK: defaultConfig.WHATSAPP_LINK,
      heroData: defaultConfig.heroData,
      benefits: defaultConfig.benefits,
      services: defaultConfig.services,
      testimonials: defaultConfig.testimonials,
      salesBlock: defaultConfig.salesBlock,
      trustProcess: defaultConfig.trustProcess,
      faq: defaultConfig.faq,
      logoPath: '/logo-rm-original.png',
      leads: [],
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  // --- Função: Sincronizar com Banco de Dados (Supabase) ---
  useEffect(() => {
    const fetchData = async () => {
      // 1. Início seguro
      try {
        if (!isSupabaseConfigured()) {
          console.warn('Supabase não configurado. Usando dados locais de fallback.');
          setIsLoading(false);
          return;
        }

        // 2. Carregar Configuração do Site (Sincronização)
        const { data: configData, error: configError } = await supabase
          .from('site_config')
          .select('data')
          .maybeSingle();

        if (configError) throw configError;

        if (configData && configData.data) {
          setConfig(prev => {
            const newData = configData.data;
            // Merging heroData carefully to avoid losing required sub-fields
            return {
              ...prev,
              ...newData,
              heroData: newData.heroData ? { ...prev.heroData, ...newData.heroData } : prev.heroData,
              salesBlock: newData.salesBlock ? { ...prev.salesBlock, ...newData.salesBlock } : prev.salesBlock,
            };
          });
        }

        // 3. Carregar Leads
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (leadsError) throw leadsError;

        if (leadsData) {
          const mappedLeads = leadsData.map(l => ({
             ...l,
             createdAt: l.created_at
          }));
          setConfig(prev => ({ ...prev, leads: mappedLeads }));
        }
      } catch (err) {
        console.error('Falha crítica na sincronização Supabase:', err);
      } finally {
        // GARANTIR que o loading termine para não dar tela branca
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Persistir localmente como backup sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);

    if (!isSupabaseConfigured()) return;

    // Persistir no Banco de Dados
    const { leads, ...pureData } = updatedConfig;
    try {
      await supabase.from('site_config').upsert({ id: '00000000-0000-0000-0000-000000000000', data: pureData });
    } catch (e) {}
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      status: 'novo',
      createdAt: new Date().toISOString(),
    };
    
    // UI Update (Otimista)
    setConfig(prev => ({ ...prev, leads: [newLead, ...prev.leads] }));

    if (!isSupabaseConfigured()) return;

    // DB Update
    try {
      await supabase.from('leads').insert({
        id: newLead.id,
        name: newLead.name,
        phone: newLead.phone,
        message: newLead.message,
        status: newLead.status,
        created_at: newLead.createdAt
      });
    } catch (e) {}
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    setConfig(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, status } : l)
    }));

    if (!isSupabaseConfigured()) return;

    try {
      await supabase.from('leads').update({ status }).eq('id', id);
    } catch (e) {}
  };

  const deleteLead = async (id: string) => {
    setConfig(prev => ({
      ...prev,
      leads: prev.leads.filter(l => l.id !== id)
    }));

    if (!isSupabaseConfigured()) return;

    try {
      await supabase.from('leads').delete().eq('id', id);
    } catch (e) {}
  };

  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const login = (password: string) => {
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
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig, addLead, updateLeadStatus, deleteLead, isLoggedIn, login, logout, isLoading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig deve ser usado dentro de um ConfigProvider');
  return context;
};
