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

export type PlanComparisonValue = string | boolean;

export type PlanComparisonRow =
  | {
      kind: 'group';
      label: string;
    }
  | {
      kind: 'feature';
      label: string;
      solo: PlanComparisonValue;
      clinica: PlanComparisonValue;
      automacao: PlanComparisonValue;
    };

export const PRODUCT_PLANS: readonly ProductPlan[] = [
  {
    id: 'solo',
    name: 'Medainer Solo',
    badge: 'Entrada enxuta',
    price: 'R$ 99',
    description: 'Base clínica para quem precisa atender bem, registrar o cuidado e sair do improviso.',
    admins: 'Até 2',
    practitioners: 'Até 1',
    features: [
      'Agenda',
      'Pacientes',
      'Anamnese, odontograma e evoluções',
      'Receituário e atestado',
      'Plano de tratamento e orçamento simples',
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
    description: 'Camada de operação para clínicas com equipe, anexos no prontuário e financeiro básico.',
    admins: 'Até 5',
    practitioners: 'Até 3',
    features: [
      'Tudo do Solo',
      'Upload de arquivos e imagens no prontuário',
      'Documentos do paciente e histórico com anexos',
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
    description: 'Camada de escala para clínicas com mais volume no WhatsApp e mais retrabalho na recepção.',
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

export const PLAN_COMPARISON_ROWS: readonly PlanComparisonRow[] = [
  {
    kind: 'feature',
    label: 'Perfil ideal',
    solo: 'Estrutura enxuta e atendimento direto',
    clinica: 'Clínica com recepção, equipe e mais controle',
    automacao: 'Operação com alto volume de WhatsApp',
  },
  {
    kind: 'feature',
    label: 'Administrativos da clínica',
    solo: 'Até 2',
    clinica: 'Até 5',
    automacao: 'Até 8',
  },
  {
    kind: 'feature',
    label: 'Profissionais de saúde ativos',
    solo: 'Até 1',
    clinica: 'Até 3',
    automacao: 'Até 6',
  },
  {
    kind: 'group',
    label: 'Agenda',
  },
  {
    kind: 'feature',
    label: 'Agenda da clínica e dos profissionais',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Confirmação por link',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Remarcação por link',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Alertas operacionais',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'group',
    label: 'Pacientes',
  },
  {
    kind: 'feature',
    label: 'Cadastro de pacientes',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Ficha do paciente',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Histórico básico do paciente',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Pacientes sem retorno',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Reativação de pacientes',
    solo: false,
    clinica: false,
    automacao: true,
  },
  {
    kind: 'group',
    label: 'Prontuário',
  },
  {
    kind: 'feature',
    label: 'Anamnese',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Odontograma',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Evoluções clínicas',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Receituário',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Atestado',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Plano de tratamento e orçamento simples',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Upload de arquivos',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Documentos e anexos',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'group',
    label: 'Financeiro',
  },
  {
    kind: 'feature',
    label: 'Orçamento simples ligado ao tratamento',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Financeiro básico da clínica',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Recebíveis e visão de receita',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'group',
    label: 'Equipe e operação',
  },
  {
    kind: 'feature',
    label: 'Acesso administrativo básico',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Permissões avançadas',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Painel da clínica',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'group',
    label: 'WhatsApp e automação',
  },
  {
    kind: 'feature',
    label: 'Confirmação e remarcação por link',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Lembretes automáticos',
    solo: false,
    clinica: false,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Remarcações automáticas',
    solo: false,
    clinica: false,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Agente com IA no WhatsApp',
    solo: false,
    clinica: false,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Fila de encaixe e oportunidades',
    solo: false,
    clinica: false,
    automacao: true,
  },
  {
    kind: 'group',
    label: 'Implantação e suporte',
  },
  {
    kind: 'feature',
    label: 'Suporte por chat e e-mail',
    solo: true,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Onboarding ao vivo',
    solo: false,
    clinica: true,
    automacao: true,
  },
  {
    kind: 'feature',
    label: 'Suporte comercial assistido',
    solo: false,
    clinica: true,
    automacao: true,
  },
] as const;
