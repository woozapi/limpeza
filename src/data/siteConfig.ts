import { 
  Home, 
  Building2, 
  Building, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BadgeDollarSign,
  School,
  Zap,
  Target,
  ShieldAlert,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const WHATSAPP_NUMBER = "5548988076531";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const heroData = {
  headline: "Precisa de limpeza?\nA gente resolve.",
  subheadline: "Rápido, fácil e sem complicação.",
  bullets: [
    "Atendimento rápido",
    "Equipe confiável",
    "Resultado garantido"
  ],
  cta: "Chamar agora",
  microcopy: "Resposta em poucos minutos",
  // Usando a imagem gerada (caminho absoluto para referência interna, usaremos no App.tsx)
  imagePath: "/hero-cleaner.png"
};

export const benefits = [
  {
    icon: Clock,
    title: "Atendimento rápido",
    description: "Você chama e já recebe resposta. Sem enrolação."
  },
  {
    icon: Sparkles,
    title: "Limpeza bem feita",
    description: "Serviço caprichado, com resultado que dá pra ver."
  },
  {
    icon: ShieldCheck,
    title: "Equipe de confiança",
    description: "Profissionais pontuais e cuidadosos."
  },
  {
    icon: BadgeDollarSign,
    title: "Serviço garantido",
    description: "Compromisso com a qualidade do serviço do início ao fim."
  }
];

export const services = [
  { icon: Home, label: "Casas e sobrados" },
  { icon: Building, label: "Apartamentos" },
  { icon: Building2, label: "Escritórios" },
  { icon: Sparkles, label: "Pós-obra" },
  { icon: Building, label: "Condomínios" },
  { icon: School, label: "Escolas" }
];

export const testimonials = [
  {
    name: "Ana Paula",
    company: "Itacorubi",
    quote: "Cheguei em casa e parecia outro lugar. O cheiro de limpeza é incrível e o cuidado com os móveis foi impecável. Vale cada centavo.",
    rating: 5
  },
  {
    name: "Ricardo Silva",
    company: "Centro",
    quote: "Equipe pontual e muito discreta. Contratamos para o escritório e a produtividade até aumentou com o ambiente renovado.",
    rating: 5
  },
  {
    name: "Mariana Costa",
    company: "Campeche",
    quote: "Fizeram o pós-obra do meu apartamento. Tiraram todo aquele pó fino que eu achei que nunca ia sair. Impressionante!",
    rating: 5
  }
];

export const salesBlock = {
  title: "Chega de perder tempo com limpeza",
  description: "Enquanto você trabalha ou descansa, a gente resolve tudo pra você. Imagine chegar em um ambiente impecável sem ter feito nenhum esforço.",
  bullets: [
    "Sem estresse",
    "Sem retrabalho",
    "Sem surpresas no preço"
  ],
  cta: "Chamar no WhatsApp agora"
};
