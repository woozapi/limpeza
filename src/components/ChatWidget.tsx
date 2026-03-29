import React, { useState } from 'react';
import { MessageCircle, X, Send, User, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useConfig } from '../context/ConfigContext';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const { config, addLead } = useConfig();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(formData);

    const text = `Olá! Meu nome é ${formData.name}. ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodedText}`;

    setStep('success');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsOpen(false);
      setStep('form');
      setFormData({ name: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-4 sm:inset-auto sm:absolute sm:bottom-20 sm:right-0 sm:w-[380px] bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-[101]"
          >
            {/* Header */}
            <div className="bg-blue-600 p-6 sm:p-8 text-white shrink-0">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Como podemos ajudar?</h3>
              <p className="text-blue-100 text-xs sm:text-sm mt-1">Estamos online agora!</p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      required
                      type="text" 
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl pl-11 pr-4 py-3 sm:py-4 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      required
                      type="tel" 
                      placeholder="Seu WhatsApp (com DDD)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl pl-11 pr-4 py-3 sm:py-4 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <textarea 
                      required
                      placeholder="Qual o serviço desejado?"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-600/10 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Iniciar Conversa <Send size={16} />
                  </button>
                </form>
              ) : (
                <div className="py-8 sm:py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">Quase lá!</h4>
                  <p className="text-slate-500 text-sm mt-2">Estamos abrindo o seu WhatsApp...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white p-4 sm:p-5 rounded-full shadow-2xl flex items-center border-4 sm:border-[6px] border-white relative z-10"
      >
        <MessageCircle size={28} className="sm:hidden" />
        <MessageCircle size={32} className="hidden sm:block" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
