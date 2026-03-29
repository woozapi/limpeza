import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Type, 
  Users, 
  Image as ImageIcon, 
  Save, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Undo2,
  Lock,
  MessageCircle
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';

interface AdminPanelProps {
  isLogin?: boolean;
}

export default function AdminPanel({ isLogin }: AdminPanelProps) {
  const { config, updateConfig, resetConfig, login, logout, isLoggedIn, updateLeadStatus, deleteLead } = useConfig();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'geral' | 'hero' | 'beneficios' | 'servicos' | 'vendas' | 'depoimentos' | 'leads'>('geral');
  const [loginError, setLoginError] = useState(false);

  // --- Handlers para Login ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/painel');
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  if (isLogin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 rounded-[32px] p-10 shadow-2xl border border-slate-800">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white text-center">Acesso Restrito</h1>
            <p className="text-slate-400 text-sm mt-2">RM Limpeza Clean - Painel Gestão</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Senha Mestra</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full bg-slate-800 border ${loginError ? 'border-red-500 animate-shake' : 'border-slate-700'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600`}
              />
              {loginError && <p className="text-red-500 text-xs mt-3 ml-1 font-semibold">Senha incorreta. Tente novamente.</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/10 transition-all active:scale-[0.98]"
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Layout do Painel ---
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 leading-none">Admin Panel</h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">RM Limpeza</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarLink active={activeTab === 'geral'} onClick={() => setActiveTab('geral')} icon={<Settings size={20} />} label="Geral & Logo" />
          <SidebarLink active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={<Type size={20} />} label="Hero Section" />
          <SidebarLink active={activeTab === 'beneficios'} onClick={() => setActiveTab('beneficios')} icon={<Plus size={20} />} label="Benefícios" />
          <SidebarLink active={activeTab === 'servicos'} onClick={() => setActiveTab('servicos')} icon={<LayoutDashboard size={20} />} label="Serviços" />
          <SidebarLink active={activeTab === 'vendas'} onClick={() => setActiveTab('vendas')} icon={<ImageIcon size={20} />} label="Bloco de Vendas" />
          <SidebarLink active={activeTab === 'depoimentos'} onClick={() => setActiveTab('depoimentos')} icon={<Users size={20} />} label="Depoimentos" />
          <div className="pt-4 mt-4 border-t border-slate-100">
            <SidebarLink 
              active={activeTab === 'leads'} 
              onClick={() => setActiveTab('leads')} 
              icon={<MessageCircle size={20} />} 
              label="Contatos/Leads" 
              badge={config.leads.filter(l => l.status === 'novo').length}
            />
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 flex flex-col gap-3">
          <button 
             onClick={resetConfig}
             className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-600 font-semibold hover:bg-amber-50 transition-colors text-sm"
          >
            <Undo2 size={18} /> Resetar Padrão
          </button>
          <button 
             onClick={() => { logout(); navigate('/'); }}
             className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 font-semibold hover:bg-slate-50 transition-colors text-sm"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12 overflow-y-auto min-w-0">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab === 'leads' ? 'Gestão de Leads (Kanban)' : activeTab}</h1>
            <p className="text-slate-500 mt-1">Gerencie o conteúdo desta seção em tempo real.</p>
          </div>
          <button 
            onClick={() => {
              const code = `export const siteConfig = ${JSON.stringify(config, null, 2)};`;
              alert("Código de configuração exportado para o console (F12)!");
              console.log(code);
            }}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
          >
            <Save size={18} /> Exportar Código
          </button>
        </header>

        <div className={`${activeTab === 'leads' ? '' : 'bg-white rounded-[32px] p-10 shadow-sm border border-slate-200'}`}>
          {activeTab === 'geral' && (
            <div className="space-y-8">
              <InputGroup label="URL do Logo" value={config.logoPath} onChange={(v) => updateConfig({ logoPath: v })} />
              <InputGroup label="WhatsApp (apenas números)" value={config.WHATSAPP_NUMBER} onChange={(v) => updateConfig({ WHATSAPP_NUMBER: v, WHATSAPP_LINK: `https://wa.me/${v}` })} />
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8">
              <InputGroup label="Título Principal (Headline)" textarea value={config.heroData.headline} onChange={(v) => updateConfig({ heroData: { ...config.heroData, headline: v } })} />
              <InputGroup label="Subtítulo" value={config.heroData.subheadline} onChange={(v) => updateConfig({ heroData: { ...config.heroData, subheadline: v } })} />
              <InputGroup label="CTA (Botão)" value={config.heroData.cta} onChange={(v) => updateConfig({ heroData: { ...config.heroData, cta: v } })} />
              <InputGroup label="Imagem Hero (URL)" value={config.heroData.imagePath} onChange={(v) => updateConfig({ heroData: { ...config.heroData, imagePath: v } })} />
              
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Bullets (Hero)</label>
                {config.heroData.bullets.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={b} onChange={(e) => {
                      const newB = [...config.heroData.bullets];
                      newB[i] = e.target.value;
                      updateConfig({ heroData: { ...config.heroData, bullets: newB } });
                    }} className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'beneficios' && (
            <div className="space-y-6">
              {config.benefits.map((b, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl space-y-4 border border-slate-100">
                  <InputGroup label={`Título do Benefício ${i + 1}`} value={b.title} onChange={(v) => {
                    const newB = [...config.benefits];
                    newB[i].title = v;
                    updateConfig({ benefits: newB });
                  }} />
                  <InputGroup label="Descrição" value={b.description} onChange={(v) => {
                    const newB = [...config.benefits];
                    newB[i].description = v;
                    updateConfig({ benefits: newB });
                  }} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'servicos' && (
             <div className="space-y-6">
               {config.services.map((s, i) => (
                 <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100">
                    <input 
                      value={s.label} 
                      onChange={(e) => {
                        const newServices = [...config.services];
                        newServices[i].label = e.target.value;
                        updateConfig({ services: newServices });
                      }}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                    />
                    <button onClick={() => {
                      const newServices = config.services.filter((_, idx) => idx !== i);
                      updateConfig({ services: newServices });
                    }} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={20} /></button>
                 </div>
               ))}
               <button onClick={() => updateConfig({ services: [...config.services, { label: 'Novo Serviço', icon: undefined as any }] })} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-blue-300 hover:text-blue-500 transition-all">
                 <Plus size={20} /> Adicionar Serviço
               </button>
             </div>
          )}

          {activeTab === 'vendas' && (
            <div className="space-y-8">
              <InputGroup label="Título Bloco de Vendas" value={config.salesBlock.title} onChange={(v) => updateConfig({ salesBlock: { ...config.salesBlock, title: v } })} />
              <InputGroup label="Descrição" textarea value={config.salesBlock.description} onChange={(v) => updateConfig({ salesBlock: { ...config.salesBlock, description: v } })} />
              <InputGroup label="Botão CTA" value={config.salesBlock.cta} onChange={(v) => updateConfig({ salesBlock: { ...config.salesBlock, cta: v } })} />
            </div>
          )}

          {activeTab === 'depoimentos' && (
            <div className="space-y-6">
              {config.testimonials.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl space-y-4 border border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Nome" value={t.name} onChange={(v) => {
                      const newT = [...config.testimonials];
                      newT[i].name = v;
                      updateConfig({ testimonials: newT });
                    }} />
                    <InputGroup label="Empresa/Local" value={t.company} onChange={(v) => {
                      const newT = [...config.testimonials];
                      newT[i].company = v;
                      updateConfig({ testimonials: newT });
                    }} />
                  </div>
                  <InputGroup label="Depoimento" textarea value={t.quote} onChange={(v) => {
                    const newT = [...config.testimonials];
                    newT[i].quote = v;
                    updateConfig({ testimonials: newT });
                  }} />
                  <button onClick={() => {
                    const newT = config.testimonials.filter((_, idx) => idx !== i);
                    updateConfig({ testimonials: newT });
                  }} className="text-red-500 font-bold text-sm flex items-center gap-2 hover:text-red-600 transition-colors">
                    <Trash2 size={16} /> Remover Depoimento
                  </button>
                </div>
              ))}
              <button 
                onClick={() => updateConfig({ testimonials: [...config.testimonials, { name: 'Cliente', company: 'Local', quote: 'Excelente serviço!', rating: 5 }] })} 
                className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-bold flex flex-col items-center gap-2 hover:border-blue-300 hover:text-blue-500 transition-all"
              >
                 <Plus size={32} />
                 <span>Novo Depoimento</span>
              </button>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
               <KanbanColumn 
                title="Novos" 
                color="bg-blue-500" 
                leads={config.leads.filter(l => l.status === 'novo')} 
                onStatusChange={updateLeadStatus}
                onDelete={deleteLead}
              />
               <KanbanColumn 
                title="Em Contato" 
                color="bg-amber-500" 
                leads={config.leads.filter(l => l.status === 'em_contato')}
                onStatusChange={updateLeadStatus}
                onDelete={deleteLead}
              />
               <KanbanColumn 
                title="Agendado" 
                color="bg-emerald-500" 
                leads={config.leads.filter(l => l.status === 'agendado')}
                onStatusChange={updateLeadStatus}
                onDelete={deleteLead}
              />
               <KanbanColumn 
                title="Finalizado" 
                color="bg-slate-400" 
                leads={config.leads.filter(l => l.status === 'finalizado')}
                onStatusChange={updateLeadStatus}
                onDelete={deleteLead}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Kanban Components ---
function KanbanColumn({ title, color, leads, onStatusChange, onDelete }: { 
  title: string, 
  color: string, 
  leads: any[], 
  onStatusChange: (id: string, s: any) => void,
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2 px-1">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h3 className="font-bold text-slate-700">{title}</h3>
        <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto">
          {leads.length}
        </span>
      </div>
      <div className="space-y-4">
        {leads.length === 0 && (
          <div className="border-2 border-dashed border-slate-200 rounded-3xl h-24 flex items-center justify-center text-slate-300 text-xs font-bold uppercase tracking-widest">
            Vazio
          </div>
        )}
        {leads.map(lead => (
          <div key={lead.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-shadow group">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 text-lg leading-none">{lead.name}</h4>
                <button onClick={() => onDelete(lead.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-blue-600 font-bold text-sm mt-1">{lead.phone}</p>
            </div>
            
            <p className="text-slate-500 text-xs leading-relaxed italic">"{lead.message}"</p>
            
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(lead.createdAt).toLocaleDateString()}</span>
              <div className="flex gap-1">
                {lead.status !== 'novo' && (
                  <button 
                    onClick={() => {
                      const prevStatus: any = lead.status === 'em_contato' ? 'novo' : lead.status === 'agendado' ? 'em_contato' : 'agendado';
                      onStatusChange(lead.id, prevStatus);
                    }}
                    className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
                  >
                    <ChevronRight size={14} className="rotate-180" />
                  </button>
                )}
                {lead.status !== 'finalizado' && (
                  <button 
                    onClick={() => {
                      const nextStatus: any = lead.status === 'novo' ? 'em_contato' : lead.status === 'em_contato' ? 'agendado' : 'finalizado';
                      onStatusChange(lead.id, nextStatus);
                    }}
                    className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Helper Components ---
function SidebarLink({ active, icon, label, onClick, badge }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void, badge?: number }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-sm ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
    >
      {icon}
      {label}
      {badge ? (
        <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>
          {badge}
        </span>
      ) : active && (
        <ChevronRight size={16} className="ml-auto opacity-50" />
      )}
    </button>
  );
}


function InputGroup({ label, value, onChange, textarea }: { label: string, value: string, onChange: (v: string) => void, textarea?: boolean }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">{label}</label>
      {textarea ? (
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:border-blue-500 transition-all focus:bg-white focus:shadow-inner"
        />
      ) : (
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:border-blue-500 transition-all focus:bg-white focus:shadow-inner"
        />
      )}
    </div>
  );
}
