import { 
  Home, 
  Building2, 
  Building, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BadgeDollarSign,
  Zap,
  Target,
  RotateCcw,
  CheckCircle2,
  Users,
  Search,
  Shield,
  ThumbsUp,
  Briefcase,
  Layers,
  Heart
} from 'lucide-react';

export const WHATSAPP_NUMBER = "5548988076531";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const heroData = {
  headline: "Recupere seu tempo.\nNós cuidamos do resto com perfeição.",
  subheadline: "A plataforma definitiva para encontrar profissionais de limpeza verificadas e treinadas na Grande Florianópolis. Segurança total para sua família e máxima eficiência para sua empresa.",
  bullets: [
    "Profissionais 100% Verificadas (Antecedentes + Documentos)",
    "Garantia de Satisfação: Se não gostar, resolvemos sem custo",
    "Agendamento via WhatsApp em menos de 2 minutos"
  ],
  cta: "Solicitar Faxina Agora",
  microcopy: "Atendimento humanizado e resposta imediata",
  imagePath: "/hero-cleaner.png"
};

export const trustProcess = [
  {
    icon: Search,
    title: "Seleção Rigorosa",
    description: "Cada profissional passa por uma checagem profunda de documentos, antecedentes criminais e referências profissionais."
  },
  {
    icon: Shield,
    title: "Padrão RM Clean",
    description: "Padronizamos o atendimento para que você tenha a mesma excelência em todas as visitas, independente da profissional."
  },
  {
    icon: ThumbsUp,
    title: "Garantia Total",
    description: "Sua satisfação é nossa prioridade. Ficou algo por fazer? Nós enviamos uma equipe para correção sem custo algum."
  }
];

export const benefits = [
  {
    icon: 'ShieldCheck',
    title: "Segurança Total",
    description: "Profissionais verificadas e monitoradas para sua tranquilidade."
  },
  {
    icon: 'Sparkles',
    title: "Padrão Hotelaria",
    description: "Técnicas de limpeza profissional para resultados impecáveis."
  },
  {
    icon: 'RotateCcw',
    title: "Substituição Rápida",
    description: "Imprevistos acontecem? Garantimos outra profissional no menor tempo."
  },
  {
    icon: 'Heart',
    title: "Cuidado com Detalhes",
    description: "Não é apenas limpar, é cuidar do seu patrimônio com carinho."
  }
];

export const services = [
  { 
    id: 'residencial',
    icon: 'Home', 
    title: "Limpeza Residencial",
    description: "Diarista qualificada para manter sua casa sempre impecável e organizada.",
    category: "Residencial"
  },
  { 
    id: 'pesada',
    icon: 'Target', 
    title: "Faxina Pesada",
    description: "Higienização profunda em todos os cantos, ideal para limpezas trimestrais.",
    category: "Residencial"
  },
  { 
    id: 'pos-obra',
    icon: 'Zap', 
    title: "Pós-Obra",
    description: "Limpeza técnica para remover resíduos finos de construção e entregar pronto pra morar.",
    category: "Residencial"
  },
  { 
    id: 'comercial',
    icon: 'Building2', 
    title: "Escritórios & Clínicas",
    description: "Ambiente higienizado para garantir saúde e produtividade para sua equipe.",
    category: "Empresarial"
  },
  { 
    id: 'condominio',
    icon: 'Building', 
    title: "Condomínios",
    description: "Manutenção de áreas comuns com rigor profissional e frequência personalizada.",
    category: "Empresarial"
  },
  { 
    id: 'estofados',
    icon: 'Layers', 
    title: "Extras & Estofados",
    description: "Higienização de sofás, tapetes e organização estratégica de ambientes.",
    category: "Extras"
  }
];

export const testimonials = [
  {
    name: "Cláudia Mendonça",
    company: "Empresária - Pedra Branca",
    quote: "O que me conquistou foi a segurança. Saber que a profissional foi verificada me dá uma paz que nenhuma outra empresa deu.",
    rating: 5
  },
  {
    name: "Dr. André Santos",
    company: "Clínica Odonto - Centro",
    quote: "Contratamos para a clínica e o padrão é altíssimo. São pontuais, uniformizadas e extremamente eficientes.",
    rating: 5
  },
  {
    name: "Fernanda Lima",
    company: "Mãe de 2 - Itacorubi",
    quote: "A facilidade de agendar pelo WhatsApp e a garantia de qualidade me salvam toda semana. Recomendo muito!",
    rating: 5
  }
];

export const salesBlock = {
  title: "Ainda na dúvida? Nós assumimos o risco.",
  description: "Se ao final do serviço você não estiver 100% satisfeito com o resultado, nós enviamos uma profissional para refazer os pontos necessários sem cobrar nem um centavo extra.",
  cta: "Começar Agora com Segurança"
};

export const faq = [
  {
    question: "As profissionais são confiáveis?",
    answer: "Absolutamente. Realizamos uma investigação social detalhada, checagem de antecedentes e conferência de referências anteriores antes de qualquer profissional entrar em nossa plataforma."
  },
  {
    question: "E se algo for quebrado na limpeza?",
    answer: "Todas as nossas profissionais são instruídas a ter o máximo cuidado. Caso ocorra algum incidente, nossa equipe de suporte agirá imediatamente para solucionar o dano ou ressarcimento conforme nossa política de garantia."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Você pode pagar via PIX, Cartão de Crédito ou Boleto bancário (para empresas). O pagamento é processado via plataforma de forma segura."
  },
  {
    question: "Vocês atendem no mesmo dia?",
    answer: "Recomendamos agendamento com 24h de antecedência, mas temos uma lista de disponibilidade de última hora. Consulte nosso WhatsApp para urgências."
  },
  {
    question: "Preciso estar em casa?",
    answer: "Não é necessário. Muitas de nossas clientes deixam chaves na portaria ou utilizam fechaduras eletrônicas. Nossa confiança é o pilar do nosso negócio."
  }
];
