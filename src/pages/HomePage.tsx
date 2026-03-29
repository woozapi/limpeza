import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle,
  Phone,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';

// Componentes e Contexto
import { BenefitCard } from '../components/BenefitCard';
import { ServiceItem } from '../components/ServiceItem';
import { TestimonialCard } from '../components/TestimonialCard';
import { Logo } from '../components/Logo';
import ChatWidget from '../components/ChatWidget';
import { useConfig } from '../context/ConfigContext';

interface HomePageProps {
  city?: string;
}

export default function HomePage({ city }: HomePageProps) {
  const { config, isLoading } = useConfig();
  const { heroData, benefits, services, testimonials, salesBlock, WHATSAPP_LINK, WHATSAPP_NUMBER } = config;

  // Personalização de SEO para Landing Pages Regionais
  const displayHeadline = city 
    ? `Serviços de limpeza e faxina profissional em ${city}`
    : heroData.headline;

  const displaySubheadline = city
    ? `Atendimento rápido e garantido para sua casa ou empresa em ${city} e região.`
    : heroData.subheadline;

  React.useEffect(() => {
    if (city) {
      document.title = `RM Limpeza Clean | Faxina Profissional em ${city} e Região`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Procurando faxina ou limpeza em ${city}? A RM Limpeza Clean atende toda a região com equipe profissional e preço justo. Peça agora!`);
      }
    }
  }, [city]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <img src="/logo-rm-original.png" alt="Carregando..." className="h-32 animate-pulse opacity-20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center group cursor-pointer">
            <Logo className="h-20 sm:h-24 lg:h-32 py-1" />
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#servicos" className="text-slate-600 hover:text-blue-600 font-semibold text-sm">Serviços</a>
            <a href="#depoimentos" className="text-slate-600 hover:text-blue-600 font-semibold text-sm">Depoimentos</a>
            <a href="#contato" className="text-slate-600 hover:text-blue-600 font-semibold text-sm">Contato</a>
          </div>

          <a 
            href={WHATSAPP_LINK} 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">Chamar agora</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </nav>
      </header>

      <main className="pt-16 sm:pt-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[60px] font-bold leading-[1.15] mb-5 sm:mb-8 text-slate-900 tracking-tight whitespace-pre-line">
                {displayHeadline}
              </h1>
              
              <p className="text-base sm:text-xl lg:text-2xl text-slate-600 mb-6 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
                {displaySubheadline}
              </p>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 border-l-4 border-blue-600 pl-4 sm:pl-6 text-left inline-block lg:block">
                {heroData.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-800 font-semibold text-sm sm:text-lg">
                    <Check size={18} className="text-blue-600 shrink-0" strokeWidth={3} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center lg:justify-start">
                <a 
                  href={WHATSAPP_LINK}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[20px] font-bold text-base sm:text-xl inline-flex items-center gap-3 sm:gap-4 transition-all shadow-xl w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={22} />
                  {heroData.cta}
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative z-10 rounded-[32px] sm:rounded-[64px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white ring-1 ring-slate-100">
                <img 
                  src={heroData.imagePath} 
                  alt="Serviços de limpeza e faxina profissional na Grande Florianópolis"
                  className="w-full h-[300px] sm:h-[450px] lg:h-[650px] object-cover"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 z-20 bg-white p-4 sm:p-6 rounded-[20px] sm:rounded-[32px] shadow-2xl hidden sm:block">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-xl sm:text-2xl">500+</div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Clientes Satisfeitos</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="py-12 sm:py-20 lg:py-24 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, i) => (
              <BenefitCard key={i} {...benefit} />
            ))}
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="py-12 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {services.map((service, i) => (
              <ServiceItem key={i} {...service} />
            ))}
          </div>
        </section>

        {/* SALES BLOCK */}
        <section className="py-12 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-blue-600 rounded-[24px] sm:rounded-[48px] lg:rounded-[64px] p-8 sm:p-12 lg:p-24 text-white text-center relative overflow-hidden shadow-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-[64px] font-bold mb-4 sm:mb-8 leading-[1.1]">{salesBlock.title}</h2>
              <p className="text-sm sm:text-lg lg:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-2xl mx-auto">{salesBlock.description}</p>
              <a 
                href={WHATSAPP_LINK}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 sm:px-12 py-4 sm:py-7 rounded-[16px] sm:rounded-[24px] font-bold text-base sm:text-xl lg:text-2xl inline-flex items-center gap-3 sm:gap-4 transition-all shadow-xl"
              >
                <MessageCircle size={24} />
                {salesBlock.cta}
              </a>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="py-16 sm:py-24 lg:py-32 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-8 sm:mb-12">Quem contratou, aprova.</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-left">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* REGIÕES ATENDIDAS (SEO) */}
        <section className="py-12 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Atendemos em toda região</h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
               <span className="font-display font-bold text-slate-900 text-lg sm:text-2xl">Florianópolis</span>
               <span className="font-display font-bold text-slate-900 text-lg sm:text-2xl">São José</span>
               <span className="font-display font-bold text-slate-900 text-lg sm:text-2xl">Palhoça</span>
               <span className="font-display font-bold text-slate-900 text-lg sm:text-2xl">Biguaçu</span>
            </div>
            <p className="mt-6 text-slate-500 text-sm font-medium">Bairros como Centro, Kobrasol, Pedra Branca, Trindade e Estreito.</p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contato" className="py-20 sm:py-32 lg:py-40 bg-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
             <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-6 sm:mb-10">Resolva isso <span className="text-blue-600">agora</span></h2>
             <div className="flex flex-col items-center gap-6 sm:gap-10">
                <a href={WHATSAPP_LINK} className="bg-blue-600 text-white px-10 sm:px-16 lg:px-20 py-5 sm:py-6 lg:py-8 rounded-[24px] sm:rounded-[40px] font-bold text-lg sm:text-xl lg:text-2xl flex items-center gap-3 sm:gap-5 shadow-2xl w-full sm:w-auto justify-center">
                  <MessageCircle size={28} /> Pedir agora
                </a>
                <div className="flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
                  <Phone size={24} className="text-blue-600 shrink-0" /> (48) {WHATSAPP_NUMBER.slice(4)}
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-16 sm:py-24 lg:py-32 text-center px-4">
        <Logo className="h-28 sm:h-36 lg:h-44 mb-6 sm:mb-8 mx-auto" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-8">Atendimento em Florianópolis, São José, Palhoça e Biguaçu</p>
        <p className="text-slate-300 text-[10px] sm:text-xs font-medium">Desenvolvido por <a href="https://woosites.com.br" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-bold transition-colors">Woo Sites</a></p>
      </footer>
      <ChatWidget />
    </div>
  );
}
