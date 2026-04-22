import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle,
  Phone,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Componentes e Contexto
import { BenefitCard } from '../components/BenefitCard';
import { ServiceItem } from '../components/ServiceItem';
import { TestimonialCard } from '../components/TestimonialCard';
import { Logo } from '../components/Logo';
import ChatWidget from '../components/ChatWidget';
import { useConfig } from '../context/ConfigContext';
import { getIcon } from '../lib/icons';

interface HomePageProps {
  city?: string;
}

export default function HomePage({ city }: HomePageProps) {
  const { config, isLoading } = useConfig();
  const { 
    heroData, 
    benefits, 
    services, 
    testimonials, 
    salesBlock, 
    trustProcess, 
    faq,
    WHATSAPP_LINK, 
    WHATSAPP_NUMBER 
  } = config;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        metaDesc.setAttribute('content', `Procurando faxina ou limpeza em ${city}? A RM Limpeza Clean atende toda a região com equipe profissional, verificada e garantia de satisfação. Peça agora!`);
      }
    }
  }, [city]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
        <Logo className="h-24 animate-pulse opacity-50" />
        <div className="w-12 h-1 h-px bg-slate-200 overflow-hidden relative">
          <motion.div 
            className="absolute inset-0 bg-blue-600"
            animate={{ x: [-50, 50] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Header Premium */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100/50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
            <div className="flex items-center group cursor-pointer">
              <Logo className="h-16 sm:h-20 py-2 sm:py-3 transition-transform group-hover:scale-105" />
            </div>
            
            <div className="hidden lg:flex items-center gap-12">
              <a href="#confianca" className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-tight transition-colors">Confiança</a>
              <a href="#servicos" className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-tight transition-colors">Serviços</a>
              <a href="#faq" className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-tight transition-colors">FAQ</a>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href={WHATSAPP_LINK} 
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-7 py-3 sm:py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl transition-all hover:shadow-slate-200 active:scale-95"
              >
                <div className="bg-emerald-500 p-1 rounded-full animate-pulse">
                   <MessageCircle size={14} className="text-white" fill="currentColor" />
                </div>
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-20 sm:pt-24 text-slate-900">
        
        {/* HERO SECTION - REINVENTADA */}
        <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 sm:py-32 overflow-hidden bg-slate-50">
          {/* Background Decorativo */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8">
                  <Sparkles size={14} className="animate-pulse" />
                  Padrão de Qualidade Superior
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-6 sm:mb-8 text-slate-900 tracking-tighter whitespace-pre-line">
                  {displayHeadline}
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 mb-8 sm:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {displaySubheadline}
                </p>

                <div className="space-y-4 mb-10 sm:mb-12 text-left bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-[32px] border border-slate-100 inline-block lg:block shadow-sm">
                  {heroData.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-4 text-slate-700 font-semibold text-sm sm:text-lg">
                      <div className="mt-1 w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                         <Check size={14} className="text-emerald-600" strokeWidth={4} />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                  <a 
                    href={WHATSAPP_LINK}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-5 sm:py-6 rounded-[24px] font-extrabold text-lg sm:text-xl inline-flex items-center gap-4 transition-all shadow-2xl shadow-blue-200 hover:shadow-blue-300 w-full sm:w-auto justify-center active:scale-95 group"
                  >
                    <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                    {heroData.cta}
                  </a>
                  <div className="flex flex-col items-center lg:items-start text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                     <span className="flex items-center gap-1.5"><Phone size={12} /> {WHATSAPP_NUMBER}</span>
                     <span>{heroData.microcopy}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden sm:block"
              >
                <div className="relative z-10 rounded-[60px] overflow-hidden shadow-3xl border-[12px] border-white/50 aspect-[4/5] lg:aspect-auto lg:h-[750px]">
                  <img 
                    src={heroData.imagePath} 
                    alt="Profissional de limpeza premium"
                    className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=2070&auto=format&fit=crop";
                    }}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -bottom-8 -left-8 z-20 bg-white p-6 sm:p-8 rounded-[40px] shadow-3xl border border-slate-50"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <Award size={28} />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-3xl">4.9/5</div>
                      <div className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Satisfação Média</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Trust Item */}
                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 5 }}
                   className="absolute top-20 -right-12 z-20 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm">100% Verificada</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST PROCESS - NOVO */}
        <section id="confianca" className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">Sua segurança é nossa <span className="text-blue-600">prioridade absoluta.</span></h2>
              <p className="text-lg sm:text-xl text-slate-500 font-medium">Não somos apenas uma agência. Somos sua garantia de tranquilidade e excelência.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {trustProcess.map((item, i) => {
                const Icon = item.icon as any;
                return (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -8 }}
                    className="p-10 rounded-[48px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-3xl hover:border-blue-100 transition-all group"
                  >
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BENEFITS GRID */}
        <section className="py-12 sm:py-20 bg-[#FDFDFD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {benefits.map((benefit, i) => (
                <BenefitCard key={i} {...benefit} />
              ))}
            </div>
          </div>
        </section>

        {/* SERVICOS CATEGORIZADOS */}
        <section id="servicos" className="py-24 sm:py-32 bg-slate-900 rounded-[64px] sm:rounded-[100px] mx-4 my-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 gap-8">
              <div className="max-w-2xl">
                <div className="font-black text-blue-500 uppercase tracking-widest text-xs sm:text-sm mb-4">Portfólio de Excelência</div>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">O cuidado ideal para <span className="text-blue-500 italic">cada necessidade.</span></h2>
              </div>
              <a href={WHATSAPP_LINK} className="text-white hover:text-blue-400 font-bold border-b-2 border-blue-600 pb-2 flex items-center gap-2 group tracking-tight text-lg">
                Orçamento personalizado <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Categorias */}
            {['Residencial', 'Empresarial', 'Extras'].map((cat) => (
              <div key={cat} className="mb-20 last:mb-0">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-slate-800" />
                  <span className="text-slate-500 font-black uppercase text-xs tracking-widest px-6">{cat}</span>
                  <div className="h-px flex-1 bg-slate-800" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                  {services.filter(s => s.category === cat).map((service, i) => (
                    <ServiceItem key={i} {...service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEPOIMENTOS - SOCIAL PROOF PREMIUM */}
        <section id="depoimentos" className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
               <div className="flex items-center gap-1 mb-6">
                 {[1,2,3,4,5].map(i => <Sparkles key={i} size={20} className="text-amber-400 fill-amber-400" />)}
               </div>
               <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8">Quem conhece, <span className="text-blue-600">não troca.</span></h2>
               <p className="text-xl text-slate-500 max-w-2xl font-medium">Milhares de horas poupadas para nossos clientes focarem no que realmente importa.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* STRONG PROMISE / SALES BLOCK */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] sm:rounded-[80px] p-10 sm:p-20 lg:p-32 text-white text-center relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-10 font-bold tracking-tight text-sm sm:text-base border border-white/20">
                  <ShieldCheck size={24} className="text-emerald-400" />
                  Risco Zero Para Você
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-[80px] font-black mb-8 leading-[1] tracking-tighter">{salesBlock.title}</h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-blue-50/80 mb-12 font-medium leading-relaxed">{salesBlock.description}</p>
                
                <a 
                  href={WHATSAPP_LINK}
                  className="bg-white hover:bg-slate-50 text-blue-600 px-10 sm:px-16 py-6 sm:py-8 rounded-[32px] font-black text-xl sm:text-2xl inline-flex items-center gap-4 transition-all shadow-2xl active:scale-95 group"
                >
                  <MessageCircle size={28} className="fill-blue-600" />
                  {salesBlock.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - INTERATIVO */}
        <section id="faq" className="py-24 sm:py-32 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Perguntas <span className="text-blue-600">Comuns</span></h2>
              <p className="text-slate-500 font-medium text-lg">Tudo o que você precisa saber antes de contratar.</p>
            </div>

            <div className="space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 sm:p-8 flex items-center justify-between text-left group"
                  >
                    <span className="font-bold text-slate-800 text-lg sm:text-xl pr-8 group-hover:text-blue-600 transition-colors">{item.question}</span>
                    <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                      <ChevronDown size={24} className="text-slate-400" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 sm:px-8 pb-8 text-slate-500 text-base sm:text-lg leading-relaxed font-medium border-t border-slate-50 pt-6">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL DE ALTA CONVERSÃO */}
        <section className="py-32 sm:py-48 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
             <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Sparkles size={48} />
             </div>
             <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-10 tracking-tighter">Chega de <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">adiar.</span></h2>
             <p className="text-xl sm:text-2xl text-slate-500 mb-12 font-medium max-w-2xl mx-auto">Agende sua limpeza hoje e experimente o padrão de cuidado que você e seu ambiente merecem.</p>
             
             <div className="flex flex-col items-center gap-10">
                <a href={WHATSAPP_LINK} className="bg-slate-900 text-white px-12 sm:px-20 py-6 sm:py-8 rounded-[32px] font-black text-xl sm:text-2xl flex items-center gap-5 shadow-3xl hover:bg-slate-800 transition-all active:scale-95 group w-full sm:w-auto justify-center">
                  <MessageCircle size={32} className="text-emerald-500 fill-emerald-500" /> 
                  Quero agendar agora
                </a>
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                   <div className="flex items-center gap-3 text-xl font-bold text-slate-900 group cursor-pointer">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <Phone size={20} />
                      </div>
                      <span className="border-b-2 border-transparent group-hover:border-blue-600 transition-all">(48) {WHATSAPP_NUMBER.slice(4)}</span>
                   </div>
                   <div className="bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest">
                      Atendimento Humano
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-32 text-center px-4 overflow-hidden relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Logo className="h-24 sm:h-32 mb-12 mx-auto grayscale brightness-[10] transition-all hover:grayscale-0 hover:brightness-100 cursor-pointer" />
          
          <div className="grid sm:grid-cols-3 gap-12 text-left mb-24 max-w-4xl mx-auto border-y border-slate-800 py-16">
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Navegação</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li><a href="#confianca" className="hover:text-blue-500 transition-colors">Segurança</a></li>
                <li><a href="#servicos" className="hover:text-blue-500 transition-colors">Serviços</a></li>
                <li><a href="#faq" className="hover:text-blue-500 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Regiões</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li>Florianópolis (Centro, Ilha, Continente)</li>
                <li>São José (Kobrasol, Campinas)</li>
                <li>Palhoça (Pedra Branca)</li>
                <li>Biguaçu</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Contato</h4>
              <p className="text-slate-400 font-bold text-sm leading-relaxed">
                Suporte humanizado disponível de Segunda a Sábado.<br/>
                <span className="text-blue-500">{WHATSAPP_NUMBER}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">© 2026 RM Limpeza Clean. Todos os direitos reservados.</p>
            <p className="text-slate-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              Design de Alto Nível por <a href="https://woosites.com.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-400 transition-colors">Woo Sites</a>
            </p>
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
