import React from 'react';
import {
  ArrowRight,
  CalendarDays,
  CalendarX,
  Check,
  ClipboardList,
  Files,
  Headset,
  History,
  Hospital,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import { buildTrackedUrl } from './analytics';
import { useLeadFlow } from './components/LeadFlow';
import acessoTablet from './assets/images/acesso-tablet.png';
import automacaoWhatsapp from './assets/images/automacao-whatsapp.png';
import controleOperacional from './assets/images/controle-operacional.png';
import galeriaAgenda from './assets/images/galeria-agenda.png';
import galeriaAutomacoes from './assets/images/galeria-automacoes.png';
import galeriaFinanceiro from './assets/images/galeria-financeiro.png';
import galeriaPaciente from './assets/images/galeria-paciente.png';
import galeriaProntuario from './assets/images/galeria-prontuario.png';
import medainerHeroSection from './assets/images/medainer-hero-section.png';
import prontuarioOdontologico from './assets/images/prontuario-odontologico.png';
import recuperacaoPacientes from './assets/images/recuperacao-pacientes.png';
import relacionamentoPacientes from './assets/images/relacionamento-pacientes.png';
import medainerSymbol from './assets/images/symbol-medainer.png';

const APP_REGISTER_URL =
  (import.meta.env.VITE_APP_REGISTER_URL as string | undefined)?.trim() || 'https://app.medainer.com.br/register';
const APP_LOGIN_URL =
  (import.meta.env.VITE_APP_LOGIN_URL as string | undefined)?.trim() || 'https://app.medainer.com.br';
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';

const PRIMARY_CTA_URL = buildTrackedUrl(APP_REGISTER_URL);
const FIGMA_PREVIEW_PATH = '/lp-figma-preview';

const HERO_PROOFS = [
  'Agenda organizada',
  'Prontuário digital',
  'Pré-atendimento automático',
  'Pós-atendimento automático',
  'Reativação de pacientes',
] as const;

const PAIN_POINTS = [
  {
    icon: CalendarX,
    title: 'Pacientes esquecem consultas',
    text: 'Sem lembretes e confirmação, faltas acontecem e horários ficam vazios.',
  },
  {
    icon: History,
    title: 'Retornos ficam perdidos',
    text: 'Conversas antigas no WhatsApp dificultam saber quem precisa voltar.',
  },
  {
    icon: Files,
    title: 'Prontuários espalhados',
    text: 'Informações importantes ficam em papéis, planilhas ou mensagens soltas.',
  },
  {
    icon: Users,
    title: 'Recepção sobrecarregada',
    text: 'A equipe tenta lembrar de tudo manualmente e acaba deixando algo passar.',
  },
] as const;

const FEATURE_CARDS = [
  {
    icon: CalendarDays,
    title: 'Agenda inteligente',
    subtitle: 'Organize consultas, retornos e horários livres',
    text: 'Visualize atendimentos, acompanhe status das consultas e reduza esquecimentos na rotina da equipe.',
    image: medainerHeroSection,
  },
  {
    icon: Files,
    title: 'Prontuário odontológico',
    subtitle: 'Histórico do paciente sempre à mão',
    text: 'Centralize dados, observações, procedimentos, evolução clínica e informações importantes.',
    image: prontuarioOdontologico,
  },
  {
    icon: MessageCircleMore,
    title: 'Automação WhatsApp',
    subtitle: 'Prepare o paciente antes da consulta',
    text: 'Envie confirmações, orientações e lembretes automáticos para diminuir faltas.',
    image: automacaoWhatsapp,
  },
  {
    icon: Sparkles,
    title: 'Relacionamento',
    subtitle: 'Continue presente depois da consulta',
    text: 'Automatize acompanhamento, retorno, avaliação e cuidado pós-procedimento.',
    image: relacionamentoPacientes,
  },
  {
    icon: Users,
    title: 'Recuperação',
    subtitle: 'Traga pacientes antigos de volta',
    text: 'Identifique pacientes parados, organize follow-ups e estimule revisões.',
    image: recuperacaoPacientes,
  },
  {
    icon: ClipboardList,
    title: 'Controle operacional',
    subtitle: 'Menos planilhas, mais clareza',
    text: 'Tenha pacientes, atendimentos, agenda e comunicação em uma estrutura única.',
    image: controleOperacional,
  },
] as const;

const SUPPORT_TOOLS = [
  {
    title: 'Painel da equipe',
    text: 'Organize tarefas e atendimentos entre recepção, dentista e gestor.',
  },
  {
    title: 'Status do paciente',
    text: 'Saiba quem agendou, confirmou, compareceu, faltou ou precisa de retorno.',
  },
  {
    title: 'Controle de acesso',
    text: 'Defina permissões por perfil: administrador, dentista e recepção.',
  },
  {
    title: 'WhatsApp integrado',
    text: 'Histórico de mensagens vinculado ao paciente e ao momento do atendimento.',
  },
  {
    title: 'Histórico de atendimento',
    text: 'Tenha uma visão contínua do que aconteceu em cada etapa do cuidado.',
  },
  {
    title: 'Relatório pronto',
    text: 'Acompanhe rotina, retornos e gargalos com muito mais previsibilidade.',
  },
] as const;

const GALLERY_ITEMS = [
  {
    title: 'Agenda',
    text: 'Visualize consultas, horários livres e confirmações em um só lugar.',
    image: galeriaAgenda,
  },
  {
    title: 'Paciente',
    text: 'Encontre rapidamente dados, contatos e o histórico de cada paciente.',
    image: galeriaPaciente,
  },
  {
    title: 'Prontuário',
    text: 'Registre evoluções, procedimentos e informações clínicas com segurança.',
    image: galeriaProntuario,
  },
  {
    title: 'Automações',
    text: 'Configure lembretes e acompanhamentos para cada etapa do atendimento.',
    image: galeriaAutomacoes,
  },
  {
    title: 'Financeiro',
    text: 'Acompanhe receitas, despesas, contas a receber e o saldo da clínica.',
    image: galeriaFinanceiro,
  },
] as const;

const AUDIENCES = [
  {
    icon: Stethoscope,
    title: 'Dentista solo',
    text: 'Quer acompanhar pacientes e melhorar o relacionamento sem contratar uma grande equipe.',
  },
  {
    icon: Hospital,
    title: 'Clínica pequena',
    text: 'Precisa organizar pacientes, agenda e retornos sem depender de várias planilhas.',
  },
  {
    icon: TrendingUp,
    title: 'Clínica em crescimento',
    text: 'Precisa padronizar atendimento, recepção e follow-up.',
  },
  {
    icon: Headset,
    title: 'Recepção sobrecarregada',
    text: 'Precisa de uma rotina simples para lembrar retornos, confirmações e mensagens.',
  },
] as const;

const DIFFERENTIALS = [
  {
    title: 'Implantação simples',
    text: 'Ajudamos a organizar os primeiros dados e configurar a clínica para começar sem complicação.',
  },
  {
    title: 'Suporte próximo',
    text: 'Atendimento direto para tirar dúvidas e ajudar sua equipe na adaptação.',
  },
  {
    title: 'Sem fidelidade',
    text: 'Use enquanto fizer sentido para sua clínica. Sem contrato longo.',
  },
  {
    title: 'Foco em pré e pós-atendimento',
    text: 'O Medainer ajuda a manter contato antes e depois da consulta.',
  },
  {
    title: 'Para clínicas pequenas e médias',
    text: 'Plataforma objetiva, sem excesso de telas ou funções difíceis de usar.',
  },
  {
    title: 'Evolução com uso real',
    text: 'O produto melhora a partir das necessidades das clínicas no dia a dia.',
  },
] as const;

const PLAN_COLUMNS = [
  {
    name: 'Medainer Solo',
    description: 'Para dentistas que atendem sozinhos e querem organizar agenda, pacientes e prontuário sem depender de planilhas.',
    pricePrefix: 'R$',
    price: '59',
    priceSuffix: '/mês',
    featured: false,
    badge: null,
    features: [
      '1 profissional de saúde ativo',
      'Até 2 usuários administrativos',
      'Agenda, pacientes, profissionais e serviços',
      'WhatsApp com lembretes e automações básicas',
      'Prontuário essencial sem anexos',
      'Planos de tratamento, receituários e atestados disponíveis a partir do plano Clínica',
      'Suporte por chat e e-mail',
    ],
  },
  {
    name: 'Medainer Clínica',
    description: 'Para clínicas com recepção e equipe que precisam centralizar prontuário, documentos e financeiro.',
    pricePrefix: 'R$',
    price: '149',
    priceSuffix: '/mês',
    featured: true,
    badge: 'RECOMENDADO',
    features: [
      'Tudo do Medainer Solo',
      'Até 3 profissionais de saúde ativos',
      'Até 5 usuários administrativos',
      'Controle financeiro da clínica',
      'Arquivos e imagens no prontuário (2 GB)',
      'Planos de tratamento',
      'Receituários e atestados ilimitados',
      'Onboarding ao vivo e suporte em horário comercial',
    ],
  },
  {
    name: 'Medainer Pro',
    description: 'Para clínicas com maior volume de atendimentos que precisam ampliar a equipe e escalar as automações.',
    pricePrefix: 'R$',
    price: '249',
    priceSuffix: '/mês',
    featured: false,
    badge: 'MAIOR CAPACIDADE',
    features: [
      'Tudo do Medainer Clínica',
      'Até 6 profissionais de saúde ativos',
      'Até 8 usuários administrativos',
      'Maior capacidade para lembretes e fluxos automáticos',
      'Suporte preparado para equipes em crescimento',
    ],
  },
] as const;

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={medainerSymbol} alt="Medainer" className="h-9 w-9 rounded-xl object-cover" />
      <span className={`text-[1.65rem] font-semibold tracking-[-0.05em] ${inverted ? 'text-white' : 'text-[#101c3d]'}`}>
        Medainer
      </span>
    </div>
  );
}

function PreviewButton({
  children,
  href,
  source,
  label,
  variant = 'primary',
  trackEvent,
}: {
  children: React.ReactNode;
  href: string;
  source: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'dark';
  trackEvent: (eventName: string, payload?: Record<string, unknown>) => void;
}) {
  const { openLeadForm } = useLeadFlow();

  const variantClass =
    variant === 'primary'
      ? 'bg-[#2357e8] text-white shadow-[0_18px_36px_rgba(35,87,232,0.24)]'
      : variant === 'dark'
        ? 'bg-[#101c3d] text-white shadow-[0_18px_36px_rgba(16,28,61,0.22)]'
        : 'border border-[#d6e1ef] bg-white text-[#101c3d] shadow-[0_10px_24px_rgba(16,28,61,0.08)]';

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${variantClass}`}
      onClick={(event) => {
        event.preventDefault();
        trackEvent('click_trial', { source });
        openLeadForm({ source, ctaLabel: label, targetHref: href });
      }}
    >
      {children}
    </a>
  );
}

function SectionIntro({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-[840px] text-center">
      <h2 className="text-[1.55rem] font-semibold leading-[1.14] tracking-[-0.04em] text-[#101c3d] sm:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 text-[0.92rem] leading-6 text-[#60708d] sm:mt-5 sm:text-[1.05rem] sm:leading-7">{text}</p>
    </div>
  );
}

export function FigmaLandingPage({
  trackEvent,
}: {
  trackEvent: (eventName: string, payload?: Record<string, unknown>) => void;
}) {
  return (
    <div className="figma-lp min-h-screen bg-[#f3f7fa] text-[#101c3d]">
      <header className="sticky top-0 z-40 border-b border-[#edf2fb]/90 bg-white/92 backdrop-blur">
        <div className="figma-shell flex min-h-[86px] items-center justify-between gap-6">
          <a href={FIGMA_PREVIEW_PATH} className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 text-[0.95rem] text-[#55647e] lg:flex">
            <a href={`${FIGMA_PREVIEW_PATH}#recursos`} className="hover:text-[#101c3d]">Recursos</a>
            <a href={`${FIGMA_PREVIEW_PATH}#como-funciona`} className="hover:text-[#101c3d]">Como funciona</a>
            <a href={`${FIGMA_PREVIEW_PATH}#planos`} className="hover:text-[#101c3d]">Planos</a>
            <a href={`${FIGMA_PREVIEW_PATH}#contato`} className="hover:text-[#101c3d]">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              className="hidden rounded-full border border-[#d6e1ef] px-5 py-3 text-sm font-semibold text-[#101c3d] md:inline-flex"
            >
              Entrar
            </a>
            <PreviewButton
              href={PRIMARY_CTA_URL}
              source="figma_header_trial"
              label="Testar grátis"
              trackEvent={trackEvent}
            >
              Testar grátis
            </PreviewButton>
          </div>
        </div>
      </header>

      <main>
        <section className="figma-shell relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-18">
          <div className="absolute right-[-14%] top-[-2.5rem] hidden h-[760px] w-[760px] rounded-full bg-[#dff7f3] lg:block" />
          <div className="relative grid gap-10 lg:min-h-[560px] lg:grid-cols-[52%_48%] lg:items-center">
            <div className="relative z-10 max-w-[640px]">
              <div className="inline-flex rounded-full border border-[#bce8e1] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0d8f82]">
                GESTÃO E AUTOMAÇÃO PARA CLÍNICAS ODONTOLÓGICAS
              </div>
              <h1 className="mt-7 max-w-[640px] text-[2rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[#101c3d] sm:mt-8 sm:text-[3.2rem]">
                Sua clínica organizada. Seus pacientes acompanhados.
              </h1>
              <p className="mt-5 max-w-[600px] text-[0.95rem] leading-6 text-[#5d6c87] sm:mt-6 sm:text-[1.03rem] sm:leading-7">
                Agenda, prontuário e automações em um só lugar para reduzir faltas e trazer pacientes de volta.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source="figma_hero_trial"
                  label="Testar grátis por 7 dias"
                  trackEvent={trackEvent}
                >
                  Testar grátis por 7 dias
                </PreviewButton>
                <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source="figma_hero_whatsapp"
                  label="Conversar pelo WhatsApp"
                  variant="secondary"
                  trackEvent={trackEvent}
                >
                  Conversar pelo WhatsApp
                </PreviewButton>
              </div>

              <p className="mt-5 text-sm text-[#6d7c95]">Sem fidelidade. Comece simples e cancele quando quiser.</p>
            </div>

          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[620px] lg:absolute lg:inset-y-0 lg:left-[52%] lg:right-[-12%] lg:mt-0 lg:max-w-none lg:overflow-hidden">
            <img
              src={medainerHeroSection}
              alt="Agenda do Medainer exibida no computador e no celular"
              className="h-auto w-full lg:h-full lg:w-auto lg:max-w-none lg:object-cover lg:object-left"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="relative mt-16 rounded-[26px] border border-[#edf2fa] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(12,23,48,0.06)] sm:mt-20 sm:px-8 sm:py-7 lg:mt-28">
            <div className="grid gap-6 md:grid-cols-5">
              {HERO_PROOFS.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82]">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold leading-5 text-[#20304b]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            title="Sua clínica pode estar perdendo pacientes por falta de acompanhamento"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-2">
            {PAIN_POINTS.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82] sm:h-11 sm:w-11">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.15rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="recursos" className="figma-shell figma-section">
          <SectionIntro
            title="Tecnologia para simplificar a rotina da sua clínica"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
            {FEATURE_CARDS.map((item, index) => (
              <article key={item.title} className="rounded-[28px] border border-[#e9eef7] bg-white p-4 shadow-[0_18px_38px_rgba(12,23,48,0.06)] sm:p-6">
                <div className="figma-feature-media h-[140px] overflow-hidden rounded-[20px] border border-[#ccebe2] sm:h-[160px] sm:rounded-[24px]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`Tela de ${item.title} do Medainer`}
                      className="h-full w-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="p-5">
                      <div className="h-[18px] w-[272px] max-w-full rounded-full bg-[#2357e8]" />
                      <div className="mt-4 flex items-center gap-4">
                        <div className="h-[42px] w-[98px] rounded-2xl bg-[#13b8a6]" />
                        <div className="space-y-3">
                          <div className="h-[10px] w-[136px] rounded-full bg-[#d7e3f7]" />
                          <div className="h-[10px] w-[96px] rounded-full bg-[#d7e3f7]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-start justify-between gap-3 sm:gap-5">
                  <div className="pr-2">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-[#0d8f82]" />
                      <h3 className="text-[1rem] font-semibold text-[#0c1730]">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-[0.95rem] font-medium leading-6 text-[#20304b] sm:mt-4 sm:text-[1.02rem] sm:leading-7">{item.subtitle}</p>
                    <p className="mt-3 text-[0.9rem] leading-6 text-[#60708d] sm:mt-4 sm:text-[0.96rem] sm:leading-7">{item.text}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-sm font-semibold text-[#0d8f82]">
                    {index + 1}
                  </span>
                </div>

                {/* <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source={`figma_feature_${index + 1}`}
                  label={`Ver recurso: ${item.title}`}
                  trackEvent={trackEvent}
                  variant="secondary"
                >
                  Ver recurso
                </PreviewButton> */}
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="figma-shell figma-section">
          <div className="rounded-[28px] bg-[#101c3d] px-5 py-8 text-white shadow-[0_26px_70px_rgba(16,28,61,0.22)] sm:px-10 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
              <div>
                <h2 className="max-w-[640px] text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[3rem]">
                  Automatize o pré e pós-atendimento sem depender da memória da equipe
                </h2>
                <p className="mt-5 max-w-[600px] text-[0.92rem] leading-6 text-white/82 sm:mt-6 sm:text-[1.02rem] sm:leading-8">
                  Confirmações, orientações, lembretes, mensagens de retorno e acompanhamento podem ser organizados para que nenhum paciente importante fique esquecido.
                </p>

                <div className="mt-8">
                  <PreviewButton
                    href={PRIMARY_CTA_URL}
                    source="figma_automation_cta"
                    label="Ver automações do Medainer"
                    variant="secondary"
                    trackEvent={trackEvent}
                  >
                    Ver automações do Medainer
                  </PreviewButton>
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-5 text-[#0c1730] shadow-[0_18px_40px_rgba(15,23,42,0.16)] sm:p-8">
                <div className="flex items-center gap-3">
                  <MessageCircleMore className="h-5 w-5 text-[#13b8a6]" />
                  <h3 className="text-[1.5rem] font-semibold">Fluxo automático</h3>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    'Confirmação de consulta',
                    'Orientação pré-atendimento',
                    'Mensagem pós-procedimento',
                    'Pedido de avaliação',
                    'Reativação de paciente antigo',
                  ].map((item) => (
                    <div key={item} className="rounded-xl bg-[#f4f8ff] px-4 py-3 text-sm font-semibold text-[#50617b]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            title="Recursos que deixam a operação mais previsível"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
            {SUPPORT_TOOLS.map((item, index) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-sm font-semibold text-[#0d8f82]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.12rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="figma-lp-access bg-[#e9f7f5] py-22">
          <div className="figma-shell">
            <SectionIntro
              title="Acesse sua clínica de onde estiver"
              text=""
            />

            <div className="mt-18 grid gap-8 lg:grid-cols-[280px_1fr_280px] lg:items-center">
              <article className="rounded-[22px] border border-white/90 bg-white px-5 py-5 shadow-[0_18px_36px_rgba(12,23,48,0.06)] sm:px-6 sm:py-6">
                <h3 className="text-[1.05rem] font-semibold text-[#0c1730]">Painel no bolso certo</h3>
                <p className="mt-3 text-sm leading-7 text-[#60708d]">Visualize agenda, confirmações e próximos passos sem depender do desktop.</p>
              </article>

              <div className="mx-auto flex w-full max-w-[620px] justify-center">
                <img
                  src={acessoTablet}
                  alt="Agenda do Medainer acessada em um tablet"
                  className="h-auto w-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <article className="rounded-[22px] border border-white/90 bg-white px-5 py-5 shadow-[0_18px_36px_rgba(12,23,48,0.06)] sm:px-6 sm:py-6">
                <h3 className="text-[1.05rem] font-semibold text-[#0c1730]">Acompanhe sempre</h3>
                <p className="mt-3 text-sm leading-7 text-[#60708d]">Recepção, dentista e gestão enxergam o mesmo fluxo com mais clareza.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            title="Conheça o Medainer por dentro"
            text="Uma plataforma simples e visual para acompanhar a rotina da clínica do agendamento ao pós-atendimento."
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 xl:grid-cols-5">
            {GALLERY_ITEMS.map((item) => (
              <article key={item.title} className="rounded-[20px] border border-[#e9eef7] bg-white p-5 shadow-[0_14px_34px_rgba(12,23,48,0.05)]">
                <div className="h-[130px] overflow-hidden rounded-[18px] bg-[#f8fbff]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`Tela de ${item.title} do Medainer`}
                      className="h-full w-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-[#2357e8]" />
                        <div>
                          <div className="h-[10px] w-16 rounded-full bg-[#d7e3f7]" />
                          <div className="mt-3 h-[10px] w-12 rounded-full bg-[#d7e3f7]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="mt-5 text-[1.08rem] font-semibold text-[#0c1730]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#60708d]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            title="Criado para clínicas que precisam de controle real"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-2">
            {AUDIENCES.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82] sm:h-11 sm:w-11">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.15rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="planos" className="figma-lp-pricing py-22">
          <div className="figma-shell">
            <SectionIntro
              title="Planos simples para cada momento da clínica"
              text="Comece com a estrutura essencial e evolua para automações conforme a operação da clínica crescer."
            />

            <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 xl:grid-cols-3">
              {PLAN_COLUMNS.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative h-full rounded-[30px] border p-6 pb-[96px] shadow-[0_24px_60px_rgba(12,23,48,0.08)] sm:p-8 sm:pb-[104px] ${
                    plan.featured
                      ? 'border-[#101c3d] bg-[#101c3d] text-white'
                      : 'border-[#e9eef7] bg-white text-[#0c1730]'
                  }`}
                >
                  <div className="min-h-10">
                    {plan.badge ? (
                      <span className="inline-flex rounded-full bg-[#13b8a6] px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-[#101c3d]">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-[1.75rem] font-semibold tracking-[-0.05em] sm:text-[2rem]">{plan.name}</h3>
                  <p className={`mt-3 text-[0.9rem] leading-6 sm:text-[0.97rem] sm:leading-7 ${plan.featured ? 'text-white/74' : 'text-[#60708d]'}`}>{plan.description}</p>

                  <div className="mt-10 flex items-end gap-3">
                    <span className={`pb-3 text-sm ${plan.featured ? 'text-white/72' : 'text-[#60708d]'}`}>{plan.pricePrefix}</span>
                    <span className="text-[2.9rem] font-semibold leading-none tracking-[-0.06em] sm:text-[3.45rem]">{plan.price}</span>
                    <span className={`pb-3 text-sm ${plan.featured ? 'text-white/72' : 'text-[#60708d]'}`}>{plan.priceSuffix}</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-3 text-[0.9rem] leading-6 sm:text-[0.98rem] sm:leading-7 ${plan.featured ? 'text-white/84' : 'text-[#20304b]'}`}>
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${plan.featured ? 'text-[#56d7c8]' : 'text-[#0d8f82]'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 [&>a]:w-full">
                    <PreviewButton
                      href={PRIMARY_CTA_URL}
                      source={`figma_plan_${plan.name.toLowerCase()}`}
                      label={`Criar conta grátis - ${plan.name}`}
                      variant="primary"
                      trackEvent={trackEvent}
                    >
                      Criar conta grátis
                    </PreviewButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            title="Um bom software não se resume apenas em funcionalidades"
            text="Este bloco quebra objeções sobre suporte, implantação, fidelidade e facilidade de uso."
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
            {DIFFERENTIALS.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.12rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contato" className="figma-shell py-18">
          <div className="rounded-[28px] bg-[#2357e8] px-6 py-8 text-white shadow-[0_26px_70px_rgba(35,87,232,0.22)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_250px] lg:items-center">
              <div>
                <div className="mb-6 flex -space-x-3">
                  <span title="Equipe Medainer" className="relative z-50 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#2357e8] bg-white p-1.5">
                    <img src={medainerSymbol} alt="Equipe Medainer" className="h-full w-full object-contain" />
                  </span>
                  <span title="WhatsApp" className="relative z-40 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#2357e8] bg-[#dff7f3] text-[#0d8f82]">
                    <MessageCircleMore className="h-5 w-5" />
                  </span>
                  <span title="Agenda" className="relative z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#2357e8] bg-[#dff7f3] text-[#0d8f82]">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <span title="Prontuário" className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#2357e8] bg-[#dff7f3] text-[#0d8f82]">
                    <Files className="h-5 w-5" />
                  </span>
                  <span title="Automações" className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#2357e8] bg-[#dff7f3] text-[#0d8f82]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.18em]">
                  Fale com a gente
                </div>
                <h2 className="mt-6 max-w-[650px] text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[2.85rem]">
                  Quer ver se o Medainer faz sentido para sua clínica?
                </h2>
                <p className="mt-5 max-w-[620px] text-[1rem] leading-8 text-white/82">
                  Converse pelo WhatsApp, veja a plataforma e entenda como organizar agenda, prontuário e automações de atendimento.
                </p>
              </div>

              <div className="flex justify-start lg:justify-end">
                <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source="figma_footer_whatsapp"
                  label="Conversar pelo WhatsApp"
                  variant="secondary"
                  trackEvent={trackEvent}
                >
                  Conversar pelo WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </PreviewButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 bg-[#0b1324] py-16 text-white">
        <div className="figma-shell">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_230px_230px]">
            <div>
              <Logo inverted />
              <p className="mt-6 max-w-[380px] text-sm leading-7 text-white/62">
                Software de gestão e automação para clínicas odontológicas.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-[0.08em] text-white/90">Recursos</h3>
              <div className="mt-5 space-y-3 text-sm text-white/62">
                <a href={`${FIGMA_PREVIEW_PATH}#recursos`} className="block hover:text-white">Recursos</a>
                <a href="mailto:suporte@medainer.com.br" className="block hover:text-white">Suporte</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-[0.08em] text-white/90">Extras</h3>
              <div className="mt-5 space-y-3 text-sm text-white/62">
                <a href={`${FIGMA_PREVIEW_PATH}#planos`} className="block hover:text-white">Planos</a>
                <a href={PRIVACY_URL} className="block hover:text-white">Política de privacidade</a>
                <a href={TERMS_URL} className="block hover:text-white">Termos de uso</a>
              </div>
            </div>
          </div>

          <p className="pt-8 text-xs leading-6 text-white/46">
            © 2026 Medainer. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
