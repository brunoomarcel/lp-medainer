import React from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Files,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import { buildTrackedUrl } from './analytics';
import { useLeadFlow } from './components/LeadFlow';
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
    title: 'Pacientes esquecem consultas',
    text: 'Sem lembretes e confirmação, faltas acontecem e horários ficam vazios.',
  },
  {
    title: 'Retornos ficam perdidos',
    text: 'Conversas antigas no WhatsApp dificultam saber quem precisa voltar.',
  },
  {
    title: 'Prontuários espalhados',
    text: 'Informações importantes ficam em papéis, planilhas ou mensagens soltas.',
  },
  {
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
  },
  {
    icon: Files,
    title: 'Prontuário odontológico',
    subtitle: 'Histórico do paciente sempre à mão',
    text: 'Centralize dados, observações, procedimentos, evolução clínica e informações importantes.',
  },
  {
    icon: MessageCircleMore,
    title: 'Automação WhatsApp',
    subtitle: 'Prepare o paciente antes da consulta',
    text: 'Envie confirmações, orientações e lembretes automáticos para diminuir faltas.',
  },
  {
    icon: Sparkles,
    title: 'Relacionamento',
    subtitle: 'Continue presente depois da consulta',
    text: 'Automatize acompanhamento, retorno, avaliação e cuidado pós-procedimento.',
  },
  {
    icon: Users,
    title: 'Recuperação',
    subtitle: 'Traga pacientes antigos de volta',
    text: 'Identifique pacientes parados, organize follow-ups e estimule revisões.',
  },
  {
    icon: ClipboardList,
    title: 'Controle operacional',
    subtitle: 'Menos planilhas, mais clareza',
    text: 'Tenha pacientes, atendimentos, agenda e comunicação em uma estrutura única.',
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

const GALLERY_ITEMS = ['Agenda', 'Paciente', 'Prontuário', 'Automações', 'Mensagens'] as const;

const AUDIENCES = [
  {
    title: 'Dentista solo',
    text: 'Quer acompanhar pacientes e melhorar o relacionamento sem contratar uma grande equipe.',
  },
  {
    title: 'Clínica pequena',
    text: 'Precisa organizar pacientes, agenda e retornos sem depender de várias planilhas.',
  },
  {
    title: 'Clínica em crescimento',
    text: 'Precisa padronizar atendimento, recepção e follow-up.',
  },
  {
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
    name: 'Solo',
    description: 'Base clínica para quem precisa atender bem, registrar o cuidado e sair do improviso.',
    pricePrefix: 'R$',
    price: '89,9',
    priceSuffix: '/mês',
    featured: false,
    features: [
      'Até 1 profissional(is) de saúde',
      'Até 2 administrativo(s)',
      'Agenda completa da clínica',
      'Gestão de pacientes',
      'Anamnese, odontograma e evoluções',
      'Receituário e atestado',
      'Plano de tratamento e orçamento simples',
    ],
  },
  {
    name: 'Clínica',
    description: 'Camada de operação para clínicas com equipe, anexos no prontuário e financeiro básico.',
    pricePrefix: 'R$',
    price: '129,9',
    priceSuffix: '/mês',
    featured: true,
    badge: 'MAIS ESCOLHIDO',
    features: [
      'Até 3 profissional(is) de saúde',
      'Até 5 administrativo(s)',
      'Tudo do Solo',
      'Upload de arquivos e imagens no prontuário',
      'Documentos do paciente e histórico com anexos',
      'Financeiro',
      'Confirmações e remarcações automáticas',
      'Gestão de equipe e permissões',
    ],
  },
  {
    name: 'Automação',
    description: 'Camada de escala para clínicas com mais volume no WhatsApp e menos retrabalho na recepção.',
    pricePrefix: 'a partir de',
    price: '497',
    priceSuffix: '/mês',
    featured: false,
    features: [
      'Até 6 profissional(is) de saúde',
      'Até 8 administrativo(s)',
      'Tudo do Clínica',
      'Agente com IA no WhatsApp',
      'Confirmações e remarcações automáticas',
      'Lembretes',
    ],
  },
] as const;

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img src={medainerSymbol} alt="Medainer" className="h-9 w-9 rounded-xl object-cover" />
      <span className="text-[1.65rem] font-semibold tracking-[-0.05em] text-[#0c1730]">Medainer</span>
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
      ? 'bg-[#2458f6] text-white shadow-[0_18px_36px_rgba(36,88,246,0.24)]'
      : variant === 'dark'
        ? 'bg-[#0d1630] text-white shadow-[0_18px_36px_rgba(13,22,48,0.22)]'
        : 'border border-[#dbe4f5] bg-white text-[#0c1730] shadow-[0_10px_24px_rgba(12,23,48,0.08)]';

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
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-[840px] text-center">
      <div className="inline-flex rounded-full border border-[#dbe7ff] bg-[#f4f8ff] px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-[#2458f6]">
        {eyebrow}
      </div>
      <h2 className="mt-6 text-[2rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[#0c1730] sm:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-5 text-[1rem] leading-7 text-[#60708d] sm:text-[1.05rem]">{text}</p>
    </div>
  );
}

export function FigmaLandingPage({
  trackEvent,
}: {
  trackEvent: (eventName: string, payload?: Record<string, unknown>) => void;
}) {
  return (
    <div className="figma-lp min-h-screen bg-[#fbfcfe] text-[#0c1730]">
      <header className="sticky top-0 z-40 border-b border-[#edf2fb]/90 bg-white/92 backdrop-blur">
        <div className="figma-shell flex min-h-[86px] items-center justify-between gap-6">
          <a href={FIGMA_PREVIEW_PATH} className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 text-[0.95rem] text-[#55647e] lg:flex">
            <a href={`${FIGMA_PREVIEW_PATH}#recursos`} className="hover:text-[#0c1730]">Recursos</a>
            <a href={`${FIGMA_PREVIEW_PATH}#como-funciona`} className="hover:text-[#0c1730]">Como funciona</a>
            <a href={`${FIGMA_PREVIEW_PATH}#planos`} className="hover:text-[#0c1730]">Planos</a>
            <a href={`${FIGMA_PREVIEW_PATH}#contato`} className="hover:text-[#0c1730]">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              className="hidden rounded-full border border-[#dbe4f5] px-5 py-3 text-sm font-semibold text-[#0c1730] md:inline-flex"
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
        <section className="figma-shell relative pt-10 pb-12 sm:pt-14 sm:pb-18">
          <div className="absolute right-[-14%] top-[-2.5rem] hidden h-[760px] w-[760px] rounded-full bg-[#d9edff] lg:block" />
          <div className="relative grid gap-10 lg:grid-cols-[640px_minmax(0,1fr)] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#d9e7ff] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2458f6]">
                Prontuário, agenda e automações para clínicas odontológicas
              </div>
              <h1 className="mt-8 max-w-[640px] text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0c1730] sm:text-[4.2rem]">
                Organize sua clínica odontológica e automatize o cuidado com seus pacientes
              </h1>
              <p className="mt-6 max-w-[600px] text-[1.03rem] leading-7 text-[#5d6c87]">
                O Medainer centraliza agenda, prontuário, pacientes e automações de pré e pós-atendimento para reduzir esquecimentos,
                melhorar a rotina da equipe e aumentar as chances de retorno dos pacientes.
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

            <div className="relative mx-auto w-full max-w-[590px]">
              <div className="rounded-[28px] border border-[#d7e7fb] bg-[#f4fbff] p-6 shadow-[0_28px_70px_rgba(28,76,148,0.12)]">
                <div className="rounded-[26px] border-[10px] border-[#1f2937] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
                  <div className="grid grid-cols-[126px_1fr] gap-8">
                    <div className="rounded-[18px] bg-[#f8fbff] p-4">
                      <p className="text-sm font-semibold text-[#0c1730]">Agenda</p>
                      <div className="mt-4 space-y-3">
                        {['09:00', '10:30', '14:00', '16:30'].map((time) => (
                          <div key={time} className="rounded-xl bg-white px-3 py-2 text-center text-[11px] font-semibold text-[#50617b] shadow-[0_6px_16px_rgba(12,23,48,0.06)]">
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-[#0c1730]">Prontuário digital</p>
                      <div className="mt-4 space-y-3">
                        {[
                          'Paciente: Ana Carvalho',
                          'Procedimento: Avaliação inicial',
                          'Observações clínicas e histórico',
                        ].map((item) => (
                          <div key={item} className="rounded-xl bg-[#f8fbff] px-4 py-3 text-[11px] font-semibold text-[#50617b]">
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 inline-flex rounded-2xl bg-[#2458f6] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(36,88,246,0.28)]">
                        Automação: pós-atendimento
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-6 h-6 w-[420px] max-w-full rounded-full bg-[#0e1728]" />
              </div>
            </div>
          </div>

          <div className="relative mt-12 rounded-[26px] border border-[#edf2fa] bg-white px-8 py-7 shadow-[0_18px_42px_rgba(12,23,48,0.06)]">
            <div className="grid gap-6 md:grid-cols-5">
              {HERO_PROOFS.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#2458f6]">
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
            eyebrow="DOR PRINCIPAL"
            title="Sua clínica pode estar perdendo pacientes por falta de acompanhamento"
            text="Antes de vender funcionalidades, a página deixa claro o problema: pacientes esquecidos, retornos perdidos e equipe dependendo da memória."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {PAIN_POINTS.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-6 py-7 shadow-[0_14px_34px_rgba(12,23,48,0.05)]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#2458f6]">!</span>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#0c1730]">{item.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[#60708d]">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="recursos" className="figma-shell figma-section">
          <SectionIntro
            eyebrow="RECURSOS PRINCIPAIS"
            title="Tecnologia para simplificar a rotina da sua clínica"
            text="Cards visuais com prints simulados ajudam o visitante a entender rapidamente o que o Medainer faz."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {FEATURE_CARDS.map((item, index) => (
              <article key={item.title} className="rounded-[28px] border border-[#e9eef7] bg-white p-6 shadow-[0_18px_38px_rgba(12,23,48,0.06)]">
                <div className="rounded-[24px] border border-[#e7eefb] bg-[#f8fbff] p-5">
                  <div className="h-[18px] w-[272px] max-w-full rounded-full bg-[#2458f6]" />
                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-[42px] w-[98px] rounded-2xl bg-[#2458f6]" />
                    <div className="space-y-3">
                      <div className="h-[10px] w-[136px] rounded-full bg-[#d7e3f7]" />
                      <div className="h-[10px] w-[96px] rounded-full bg-[#d7e3f7]" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-5">
                  <div className="pr-2">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-[#2458f6]" />
                      <h3 className="text-[1rem] font-semibold text-[#0c1730]">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-[1.02rem] font-medium leading-7 text-[#20304b]">{item.subtitle}</p>
                    <p className="mt-4 text-[0.96rem] leading-7 text-[#60708d]">{item.text}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-sm font-semibold text-[#2458f6]">
                    {index + 1}
                  </span>
                </div>

                <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source={`figma_feature_${index + 1}`}
                  label={`Ver recurso: ${item.title}`}
                  trackEvent={trackEvent}
                  variant="secondary"
                >
                  Ver recurso
                </PreviewButton>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="figma-shell figma-section">
          <div className="rounded-[28px] bg-[#2458f6] px-10 py-12 text-white shadow-[0_26px_70px_rgba(36,88,246,0.22)]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.18em]">
                  Diferencial do Medainer
                </div>
                <h2 className="mt-6 max-w-[640px] text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.05em] sm:text-[3rem]">
                  Automatize o pré e pós-atendimento sem depender da memória da equipe
                </h2>
                <p className="mt-6 max-w-[600px] text-[1.02rem] leading-8 text-white/82">
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

              <div className="rounded-[28px] bg-white p-8 text-[#0c1730] shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                <div className="flex items-center gap-3">
                  <MessageCircleMore className="h-5 w-5 text-[#2458f6]" />
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
            eyebrow="FERRAMENTAS DE APOIO"
            title="Recursos que deixam a operação mais previsível"
            text="Uma segunda camada mostra que o sistema também organiza equipe, status e relacionamento."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {SUPPORT_TOOLS.map((item, index) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-6 py-7 shadow-[0_14px_34px_rgba(12,23,48,0.05)]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-sm font-semibold text-[#2458f6]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.12rem] font-semibold tracking-[-0.03em] text-[#0c1730]">{item.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[#60708d]">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="figma-lp-access bg-[#edf8ff] py-22">
          <div className="figma-shell">
            <SectionIntro
              eyebrow="ACESSO"
              title="Acesse sua clínica de onde estiver"
              text="Uma ilustração simples reforça mobilidade, acompanhamento e visibilidade operacional."
            />

            <div className="mt-18 grid gap-8 lg:grid-cols-[280px_1fr_280px] lg:items-center">
              <article className="rounded-[22px] border border-white/90 bg-white px-6 py-6 shadow-[0_18px_36px_rgba(12,23,48,0.06)]">
                <h3 className="text-[1.05rem] font-semibold text-[#0c1730]">Painel no bolso certo</h3>
                <p className="mt-3 text-sm leading-7 text-[#60708d]">Visualize agenda, confirmações e próximos passos sem depender do desktop.</p>
              </article>

              <div className="mx-auto flex w-full max-w-[260px] justify-center">
                <div className="w-[230px] rounded-[38px] border-[12px] border-[#111827] bg-white p-5 shadow-[0_28px_60px_rgba(15,23,42,0.18)]">
                  <div className="mx-auto h-2 w-16 rounded-full bg-[#111827]" />
                  <div className="mt-6 rounded-[22px] bg-[#f4f8ff] p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-[#2458f6]" />
                      <div>
                        <div className="h-3 w-20 rounded-full bg-[#d4dff3]" />
                        <div className="mt-2 h-3 w-14 rounded-full bg-[#d4dff3]" />
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="h-10 rounded-2xl bg-white" />
                      <div className="h-10 rounded-2xl bg-white" />
                      <div className="h-10 rounded-2xl bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              <article className="rounded-[22px] border border-white/90 bg-white px-6 py-6 shadow-[0_18px_36px_rgba(12,23,48,0.06)]">
                <h3 className="text-[1.05rem] font-semibold text-[#0c1730]">Acompanhe sempre</h3>
                <p className="mt-3 text-sm leading-7 text-[#60708d]">Recepção, dentista e gestão enxergam o mesmo fluxo com mais clareza.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            eyebrow="MOSTRE O PRODUTO"
            title="Mostre o produto para tornar a oferta tangível"
            text="Este bloco deve receber prints reais do Medainer quando as telas finais estiverem prontas."
          />

          <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {GALLERY_ITEMS.map((item) => (
              <article key={item} className="rounded-[20px] border border-[#e9eef7] bg-white p-5 shadow-[0_14px_34px_rgba(12,23,48,0.05)]">
                <div className="rounded-[18px] bg-[#f8fbff] p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-[#2458f6]" />
                    <div>
                      <div className="h-[10px] w-16 rounded-full bg-[#d7e3f7]" />
                      <div className="mt-3 h-[10px] w-12 rounded-full bg-[#d7e3f7]" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-5 text-[1.08rem] font-semibold text-[#0c1730]">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-[#60708d]">Substituir por print real da tela.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            eyebrow="PARA QUEM É"
            title="Criado para clínicas que precisam de controle real"
            text="Em vez de inventar depoimentos, este bloco ajuda cada perfil de cliente a se reconhecer na oferta."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {AUDIENCES.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-6 py-7 shadow-[0_14px_34px_rgba(12,23,48,0.05)]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#2458f6]">•</span>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#0c1730]">{item.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[#60708d]">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="planos" className="figma-lp-pricing py-22">
          <div className="figma-shell">
            <SectionIntro
              eyebrow="PLANOS"
              title="Planos simples para cada momento da clínica"
              text="Comece com a estrutura essencial e evolua para automações conforme a operação da clínica crescer."
            />

            <div className="mt-16 grid gap-8 xl:grid-cols-3">
              {PLAN_COLUMNS.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-[30px] border p-8 shadow-[0_24px_60px_rgba(12,23,48,0.08)] ${
                    plan.featured
                      ? 'border-[#0d1630] bg-[#0d1630] text-white'
                      : 'border-[#e9eef7] bg-white text-[#0c1730]'
                  }`}
                >
                  <div className="min-h-10">
                    {plan.badge ? (
                      <span className="inline-flex rounded-full bg-[#2458f6] px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-white">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em]">{plan.name}</h3>
                  <p className={`mt-3 text-[0.97rem] leading-7 ${plan.featured ? 'text-white/74' : 'text-[#60708d]'}`}>{plan.description}</p>

                  <div className="mt-10 flex items-end gap-3">
                    <span className={`pb-3 text-sm ${plan.featured ? 'text-white/72' : 'text-[#60708d]'}`}>{plan.pricePrefix}</span>
                    <span className="text-[3.45rem] font-semibold leading-none tracking-[-0.06em]">{plan.price}</span>
                    <span className={`pb-3 text-sm ${plan.featured ? 'text-white/72' : 'text-[#60708d]'}`}>{plan.priceSuffix}</span>
                  </div>

                  <div className="mt-8">
                    <PreviewButton
                      href={PRIMARY_CTA_URL}
                      source={`figma_plan_${plan.name.toLowerCase()}`}
                      label={`Criar conta grátis - ${plan.name}`}
                      variant={plan.featured ? 'primary' : 'secondary'}
                      trackEvent={trackEvent}
                    >
                      Criar conta grátis
                    </PreviewButton>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-3 text-[0.98rem] leading-7 ${plan.featured ? 'text-white/84' : 'text-[#20304b]'}`}>
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${plan.featured ? 'text-white' : 'text-[#2458f6]'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="figma-shell figma-section">
          <SectionIntro
            eyebrow="DIFERENCIAIS"
            title="Um bom software não se resume apenas em funcionalidades"
            text="Este bloco quebra objeções sobre suporte, implantação, fidelidade e facilidade de uso."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {DIFFERENTIALS.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#e9eef7] bg-white px-6 py-7 shadow-[0_14px_34px_rgba(12,23,48,0.05)]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#2458f6]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-[1.12rem] font-semibold tracking-[-0.03em] text-[#0c1730]">{item.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[#60708d]">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contato" className="figma-shell py-18">
          <div className="rounded-[28px] bg-[#2458f6] px-10 py-12 text-white shadow-[0_26px_70px_rgba(36,88,246,0.22)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_250px] lg:items-center">
              <div>
                <div className="mb-6 flex -space-x-3">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <span key={item} className="h-11 w-11 rounded-full border-2 border-[#2458f6] bg-[#d9edff]" />
                  ))}
                </div>
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.18em]">
                  Fale com a gente
                </div>
                <h2 className="mt-6 max-w-[650px] text-[2rem] font-semibold leading-[1.08] tracking-[-0.05em] sm:text-[2.85rem]">
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
              <Logo />
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
            © 2026 Medainer. Estrutura de landing page esboçada para validação comercial.
          </p>
        </div>
      </footer>
    </div>
  );
}
