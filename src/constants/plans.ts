export type ProductPlanId = 'solo' | 'clinica' | 'automacao';

export type ProductPlan = {
  id: ProductPlanId;
  name: string;
  badge: string;
  price: string;
  pricePrefix?: string;
  description: string;
  admins: string;
  practitioners: string;
  features: readonly string[];
  featured: boolean;
};

export const PRODUCT_PLANS: readonly ProductPlan[] = [
  {
    id: 'solo',
    name: 'Medainer Solo',
    badge: 'Entrada enxuta',
    price: 'R$ 99',
    description: 'Entrada para clínicas em início de operação e estrutura enxuta.',
    admins: 'Até 2',
    practitioners: 'Até 1',
    features: [
      'Agenda',
      'Pacientes',
      'Prontuário essencial',
      'Confirmação e remarcação por link',
      'Visão operacional básica',
    ],
    featured: false,
  },
  {
    id: 'clinica',
    name: 'Medainer Clínica',
    badge: 'Plano principal',
    price: 'R$ 297',
    description: 'Plano principal para clínicas em crescimento.',
    admins: 'Até 5',
    practitioners: 'Até 3',
    features: [
      'Tudo do Solo',
      'Financeiro básico',
      'Gestão de equipe e permissões',
      'Painel da clínica',
      'Alertas operacionais',
      'Pacientes sem retorno',
      'Onboarding ao vivo',
      'Suporte em horário comercial',
    ],
    featured: true,
  },
  {
    id: 'automacao',
    name: 'Medainer Automação',
    badge: 'Sob medida',
    pricePrefix: 'a partir de',
    price: 'R$ 497',
    description: 'Plano personalizado para clínicas com operação mais robusta e maior volume no WhatsApp.',
    admins: 'Até 8',
    practitioners: 'Até 6',
    features: [
      'Tudo do Clínica',
      'Agente com IA no WhatsApp',
      'Confirmações e remarcações automáticas',
      'Lembretes',
      'Reativação de pacientes',
      'Fila de encaixe e oportunidades',
    ],
    featured: false,
  },
];

export const PLAN_COMPARISON_ROWS = [
  {
    label: 'Perfil ideal',
    solo: 'Início de operação',
    clinica: 'Clínica em crescimento',
    automacao: 'Operação robusta',
  },
  {
    label: 'Administrativos da clínica',
    solo: 'Até 2',
    clinica: 'Até 5',
    automacao: 'Até 8',
  },
  {
    label: 'Profissionais de saúde ativos',
    solo: 'Até 1',
    clinica: 'Até 3',
    automacao: 'Até 6',
  },
  {
    label: 'Base operacional',
    solo: 'Agenda, pacientes e prontuário essencial',
    clinica: 'Tudo do Solo + financeiro e painel',
    automacao: 'Tudo do Clínica + IA no WhatsApp',
  },
  {
    label: 'Suporte e implantação',
    solo: 'Visão operacional básica',
    clinica: 'Onboarding ao vivo + suporte comercial',
    automacao: 'Escopo alinhado com comercial',
  },
] as const;
