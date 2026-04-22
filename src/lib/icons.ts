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
  RotateCcw,
  Search,
  Shield,
  ThumbsUp,
  Layers,
  Heart,
  LucideIcon
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
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
  RotateCcw,
  Search,
  Shield,
  ThumbsUp,
  Layers,
  Heart
};

export const getIcon = (name: string): LucideIcon => {
  return ICON_MAP[name] || Sparkles;
};
