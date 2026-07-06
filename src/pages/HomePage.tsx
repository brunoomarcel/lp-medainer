import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
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
  Menu,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { buildTrackedUrl } from '../analytics';
import acessoTablet from '../assets/images/acesso-tablet.png';
import automacaoWhatsapp from '../assets/images/automacao-whatsapp.png';
import controleOperacional from '../assets/images/controle-operacional.png';
import galeriaAgenda from '../assets/images/galeria-agenda.png';
import galeriaAutomacoes from '../assets/images/galeria-automacoes.png';
import galeriaFinanceiro from '../assets/images/galeria-financeiro.png';
import galeriaPaciente from '../assets/images/galeria-paciente.png';
import galeriaProntuario from '../assets/images/galeria-prontuario.png';
import chatgptIcon from '../assets/images/chatgpt-icon.svg';
import medainerHeroSection from '../assets/images/medainer-hero-section.png';
import prontuarioOdontologico from '../assets/images/prontuario-odontologico.png';
import recuperacaoPacientes from '../assets/images/recuperacao-pacientes.png';
import relacionamentoPacientes from '../assets/images/relacionamento-pacientes.png';
import medainerSymbol from '../assets/images/symbol-medainer.png';

const APP_REGISTER_URL =
  (import.meta.env.VITE_APP_REGISTER_URL as string | undefined)?.trim() || 'https://app.medainer.com.br/register';
const APP_LOGIN_URL =
  (import.meta.env.VITE_APP_LOGIN_URL as string | undefined)?.trim() || 'https://app.medainer.com.br';
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';
const WHATSAPP_URL = 'https://wa.me/5579996018591?text=Olá%2C%20me%20interessei%20pelo%20Medainer%20e%20gostaria%20de%20tirar%20uma%20dúvida%21';

const PRIMARY_CTA_URL = buildTrackedUrl(APP_REGISTER_URL);
const CHATGPT_PROMPT = 'Por que o Medainer pode ser uma ótima escolha para a minha clínica?';
const CHATGPT_URL = `https://chatgpt.com/?prompt=${encodeURIComponent(CHATGPT_PROMPT)}`;
const HOME_PATH = '/';

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

const DIFFERENTIAL_ICONS = [
  ClipboardList,
  Headset,
  ShieldCheck,
  MessageCircleMore,
  Hospital,
  TrendingUp,
] as const;

const motionEase = 'easeOut' as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.min(index * 0.08, 0.42),
      duration: 0.6,
      ease: motionEase,
    },
  }),
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  visible: (index = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: Math.min(index * 0.07, 0.35),
      duration: 0.55,
      ease: motionEase,
    },
  }),
};

const slideFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.62, ease: motionEase },
  },
};

const slideFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.62, ease: motionEase },
  },
};

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

function ToothIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.5 3.5c1.5 0 2.4.8 3.3 1.3.8.5 1.6.5 2.4 0 .9-.5 1.8-1.3 3.3-1.3 2.5 0 4 2.1 4 4.7 0 2.2-.9 4.1-1.8 5.8-.8 1.6-1 3.5-1.4 5.1-.3 1.2-.9 2.4-2.1 2.4-1.1 0-1.5-1.2-1.8-2.7-.4-2.1-.7-3.6-1.4-3.6s-1 1.5-1.4 3.6c-.3 1.5-.7 2.7-1.8 2.7-1.2 0-1.8-1.2-2.1-2.4-.4-1.6-.6-3.5-1.4-5.1C4.4 12.3 3.5 10.4 3.5 8.2c0-2.6 1.5-4.7 4-4.7Z" />
      <path d="M9.5 6.2c.8.5 1.6.8 2.5.8s1.7-.3 2.5-.8" />
    </svg>
  );
}

function PreviewButton({
  children,
  href,
  source,
  label,
  variant = 'primary',
  trackEvent,
  target,
  rel,
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  source: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'dark';
  trackEvent?: (eventName: string, payload?: Record<string, unknown>) => void;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const variantClass =
    variant === 'primary'
      ? 'button-primary bg-[linear-gradient(135deg,#4150dd_0%,#5f73ff_100%)] text-white shadow-[0_18px_48px_rgba(65,80,221,0.28)] hover:-translate-y-0.5'
      : variant === 'dark'
        ? 'button-primary bg-[#101c3d] text-white shadow-[0_18px_36px_rgba(16,28,61,0.22)] hover:-translate-y-0.5'
        : 'button-primary border border-[#d6e1ef] bg-white text-[#101c3d] shadow-[0_10px_24px_rgba(16,28,61,0.08)] hover:-translate-y-0.5 hover:border-[#4150dd] hover:text-[#4150dd]';

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${variantClass} ${className}`}
      onClick={() => {
        trackEvent?.('click_trial', { source });
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto max-w-[840px] text-center"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUpVariants}
    >
      <h2 className="text-[1.55rem] font-semibold leading-[1.14] tracking-[-0.04em] text-[#101c3d] sm:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 text-[0.92rem] leading-6 text-[#60708d] sm:mt-5 sm:text-[1.05rem] sm:leading-7">{text}</p>
    </motion.div>
  );
}

export function HomePage({
  trackEvent,
}: {
  trackEvent?: (eventName: string, payload?: Record<string, unknown>) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [headerScrolled, setHeaderScrolled] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const updateHeader = () => {
      setHeaderScrolled(window.scrollY > 8);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <div className="home-lp min-h-screen bg-[#f3f7fa] text-[#101c3d]">
      <header className={`home-header fixed top-0 left-0 right-0 z-40 border-b border-[#edf2fb]/90 bg-white/92 backdrop-blur ${headerScrolled ? 'home-header-scrolled' : ''}`}>
        <div className="home-shell flex min-h-[86px] items-center justify-between gap-6">
          <a href={HOME_PATH} className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 text-[0.95rem] text-[#55647e] lg:flex">
            <a href={`${HOME_PATH}#recursos`} className="home-nav-link hover:text-[#101c3d]">Recursos</a>
            <a href={`${HOME_PATH}#como-funciona`} className="home-nav-link hover:text-[#101c3d]">Como funciona</a>
            <a href={`${HOME_PATH}#planos`} className="home-nav-link hover:text-[#101c3d]">Planos</a>
            <a href={`${HOME_PATH}#chatgpt`} className="home-nav-link hover:text-[#101c3d]">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              className="hidden rounded-full border border-[#d6e1ef] px-5 py-3 text-sm font-semibold text-[#101c3d] md:inline-flex"
            >
              Entrar
            </a>
            <div className="hidden sm:block">
              <PreviewButton
                href={PRIMARY_CTA_URL}
                source="home_header_trial"
                label="Testar grátis"
                trackEvent={trackEvent}
              >
                Testar grátis
              </PreviewButton>
            </div>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="home-mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6e1ef] bg-white text-[#101c3d] lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
          <motion.nav
            id="home-mobile-menu"
            className="home-shell border-t border-[#edf2fb] py-5 lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-1 text-[0.95rem] font-medium text-[#55647e]">
              {[
                ['Recursos', `${HOME_PATH}#recursos`],
                ['Como funciona', `${HOME_PATH}#como-funciona`],
                ['Planos', `${HOME_PATH}#planos`],
                ['Dúvidas', `${HOME_PATH}#chatgpt`],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-xl px-4 py-3 hover:bg-[#f3f7fa] hover:text-[#101c3d]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a href={APP_LOGIN_URL} className="rounded-xl px-4 py-3 hover:bg-[#f3f7fa] hover:text-[#101c3d] md:hidden">
                Entrar
              </a>
              <div className="mt-3 px-4 sm:hidden [&>a]:w-full">
                <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source="home_mobile_menu_trial"
                  label="Testar grátis"
                  trackEvent={trackEvent}
                >
                  Testar grátis
                </PreviewButton>
              </div>
            </div>
          </motion.nav>
        ) : null}
        </AnimatePresence>
      </header>

      <main className="pt-[86px]">
        <section className="home-shell relative pt-10 pb-12 sm:pt-14 sm:pb-18">
          <div className="absolute right-[-14%] top-[-2.5rem] hidden h-[760px] w-[760px] rounded-full bg-[#dff7f3] lg:block" />
          <div className="relative">
            <div className="relative grid gap-10 lg:min-h-[560px] lg:grid-cols-[52%_48%] lg:items-center">
              <motion.div
                className="relative z-10 max-w-[640px] text-center lg:text-left"
                initial={shouldReduceMotion ? false : 'hidden'}
                animate="visible"
                variants={fadeUpVariants}
              >
                <motion.div
                  className="home-hero-kicker inline-flex max-w-full items-center gap-2 rounded-full border border-[#bce8e1] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#0d8f82] sm:text-[11px] sm:tracking-[0.12em]"
                  variants={fadeUpVariants}
                  custom={0}
                >
                  <ToothIcon className="h-3.5 w-3.5 shrink-0" />
                  <span className="home-hero-kicker-text">GESTÃO E AUTOMAÇÃO PARA CLÍNICAS ODONTOLÓGICAS</span>
                </motion.div>
                <motion.h1
                  className="mx-auto mt-7 max-w-[640px] text-[2rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[#101c3d] sm:mt-8 sm:text-[3.2rem] lg:mx-0"
                  variants={fadeUpVariants}
                  custom={1}
                >
                  Sua clínica organizada. Seus pacientes acompanhados.
                </motion.h1>
                <motion.p
                  className="mx-auto mt-5 max-w-[600px] text-[0.95rem] leading-6 text-[#5d6c87] sm:mt-6 sm:text-[1.03rem] sm:leading-7 lg:mx-0"
                  variants={fadeUpVariants}
                  custom={2}
                >
                  Agenda, prontuário e automações em um só lugar para reduzir faltas e trazer pacientes de volta.
                </motion.p>

                <motion.div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start" variants={fadeUpVariants} custom={3}>
                  <PreviewButton
                    href={PRIMARY_CTA_URL}
                    source="home_hero_trial"
                    label="Testar grátis por 7 dias"
                    trackEvent={trackEvent}
                  >
                    Testar grátis por 7 dias
                  </PreviewButton>
                </motion.div>

                <motion.p className="mt-5 text-sm text-[#6d7c95]" variants={fadeUpVariants} custom={4}>Sem fidelidade. Crie sua conta sem cartão de crédito.</motion.p>
              </motion.div>
            </div>

            <motion.div
              className="home-hero-media relative mx-auto mt-10 w-full max-w-[620px] lg:absolute lg:inset-y-0 lg:left-[52%] lg:right-[-12%] lg:mt-0 lg:max-w-none lg:overflow-hidden"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 34, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.18 }}
            >
              <img
                src={medainerHeroSection}
                alt="Agenda do Medainer exibida no computador e no celular"
                className="h-auto w-full lg:h-full lg:w-auto lg:max-w-none lg:object-cover lg:object-left"
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </div>

          <div className="home-proof-band relative mt-16 border-y border-[#edf2fa] bg-white py-6 shadow-[0_18px_42px_rgba(12,23,48,0.06)] sm:mt-20 sm:py-7 lg:mt-28">
            <div className="home-proof-marquee">
              <div className="home-proof-track">
                {[0, 1].map((group) => (
                  <div key={group} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={group === 1}>
                    {HERO_PROOFS.map((item) => (
                      <div key={item} className="flex min-w-max items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82]">
                          <Check className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold leading-5 text-[#20304b]">{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-shell home-section">
          <SectionIntro
            title="Sua clínica pode estar perdendo pacientes por falta de acompanhamento"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-2">
            {PAIN_POINTS.map((item, index) => (
              <motion.article
                key={item.title}
                className="home-interactive-card rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.24 }}
                variants={fadeUpVariants}
                custom={index}
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="home-card-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82] sm:h-11 sm:w-11">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.15rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="recursos" className="home-shell home-section">
          <SectionIntro
            title="Tecnologia para simplificar a rotina da sua clínica"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
            {FEATURE_CARDS.map((item, index) => (
              <motion.article
                key={item.title}
                className="home-interactive-card home-feature-card rounded-[28px] border border-[#e9eef7] bg-white p-4 shadow-[0_18px_38px_rgba(12,23,48,0.06)] sm:p-6"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleInVariants}
                custom={index}
              >
                <div className="home-feature-media h-[140px] overflow-hidden rounded-[20px] border border-[#ccebe2] sm:h-[160px] sm:rounded-[24px]">
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
                      <div className="h-[18px] w-[272px] max-w-full rounded-full bg-[#4150dd]" />
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
                      <item.icon className="home-inline-icon h-5 w-5 text-[#0d8f82]" />
                      <h3 className="text-[1rem] font-semibold text-[#0c1730]">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-[0.95rem] font-medium leading-6 text-[#20304b] sm:mt-4 sm:text-[1.02rem] sm:leading-7">{item.subtitle}</p>
                    <p className="mt-3 text-[0.9rem] leading-6 text-[#60708d] sm:mt-4 sm:text-[0.96rem] sm:leading-7">{item.text}</p>
                  </div>
                  <span className="home-card-index flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-sm font-semibold text-[#0d8f82]">
                    {index + 1}
                  </span>
                </div>

                {/* <PreviewButton
                  href={PRIMARY_CTA_URL}
                  source={`home_feature_${index + 1}`}
                  label={`Ver recurso: ${item.title}`}
                  trackEvent={trackEvent}
                  variant="secondary"
                >
                  Ver recurso
                </PreviewButton> */}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="home-shell home-section">
          <motion.div
            className="home-automation-panel rounded-[28px] bg-[#101c3d] px-5 py-8 text-white shadow-[0_26px_70px_rgba(16,28,61,0.22)] sm:px-10 sm:py-12"
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.26 }}
            variants={scaleInVariants}
          >
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
                    source="home_automation_cta"
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
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      className="home-flow-step rounded-xl bg-[#f4f8ff] px-4 py-3 text-sm font-semibold text-[#50617b]"
                      variants={fadeUpVariants}
                      custom={index}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="home-shell home-section">
          <SectionIntro
            title="Recursos que deixam a operação mais previsível"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
            {SUPPORT_TOOLS.map((item, index) => (
              <motion.article
                key={item.title}
                className="home-interactive-card rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                variants={fadeUpVariants}
                custom={index}
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="home-card-index flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-sm font-semibold text-[#0d8f82]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.12rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-lp-access bg-[#e9f7f5] py-22">
          <div className="home-shell">
            <SectionIntro
              title="Acesse sua clínica de onde estiver"
              text=""
            />

            <div className="mt-18 grid gap-8 lg:grid-cols-[280px_1fr_280px] lg:items-center">
              <motion.article
                className="home-interactive-card rounded-[22px] border border-white/90 bg-white px-5 py-5 shadow-[0_18px_36px_rgba(12,23,48,0.06)] sm:px-6 sm:py-6"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={slideFromLeftVariants}
              >
                <h3 className="text-[1.05rem] font-semibold text-[#0c1730]">Painel no bolso certo</h3>
                <p className="mt-3 text-sm leading-7 text-[#60708d]">Visualize agenda, confirmações e próximos passos sem depender do desktop.</p>
              </motion.article>

              <motion.div
                className="home-tablet-media mx-auto flex w-full max-w-[620px] justify-center"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <img
                  src={acessoTablet}
                  alt="Agenda do Medainer acessada em um tablet"
                  className="h-auto w-full"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <motion.article
                className="home-interactive-card rounded-[22px] border border-white/90 bg-white px-5 py-5 shadow-[0_18px_36px_rgba(12,23,48,0.06)] sm:px-6 sm:py-6"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={slideFromRightVariants}
              >
                <h3 className="text-[1.05rem] font-semibold text-[#0c1730]">Acompanhe sempre</h3>
                <p className="mt-3 text-sm leading-7 text-[#60708d]">Recepção, dentista e gestão enxergam o mesmo fluxo com mais clareza.</p>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="home-shell home-section">
          <SectionIntro
            title="Conheça o Medainer por dentro"
            text="Uma plataforma simples e visual para acompanhar a rotina da clínica do agendamento ao pós-atendimento."
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-6 [&>:nth-child(1)]:lg:col-span-2 [&>:nth-child(2)]:lg:col-span-2 [&>:nth-child(3)]:lg:col-span-2 [&>:nth-child(4)]:lg:col-span-2 [&>:nth-child(4)]:lg:col-start-2 [&>:nth-child(5)]:lg:col-span-2">
            {GALLERY_ITEMS.map((item, index) => (
              <motion.article
                key={item.title}
                className="home-interactive-card home-gallery-card rounded-[20px] border border-[#e9eef7] bg-white p-5 shadow-[0_14px_34px_rgba(12,23,48,0.05)]"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                variants={scaleInVariants}
                custom={index}
              >
                <div className="aspect-video overflow-hidden rounded-[18px] bg-[#f8fbff]">
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
                        <div className="h-12 w-12 rounded-2xl bg-[#4150dd]" />
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
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-shell home-section">
          <SectionIntro
            title="Criado para clínicas que precisam de controle real"
            text=""
          />

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-2">
            {AUDIENCES.map((item, index) => (
              <motion.article
                key={item.title}
                className="home-interactive-card rounded-[22px] border border-[#e9eef7] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(12,23,48,0.05)] sm:px-6 sm:py-7"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                variants={fadeUpVariants}
                custom={index}
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className="home-card-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f7f3] text-[#0d8f82] sm:h-11 sm:w-11">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#0c1730] sm:text-[1.15rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#60708d] sm:mt-3 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="planos" className="home-lp-pricing py-22">
          <div className="home-shell">
            <SectionIntro
              title="Escolha o plano que se encaixa na sua clínica"
              text=""
            />

            <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 xl:grid-cols-3">
              {PLAN_COLUMNS.map((plan, index) => (
                <motion.article
                  key={plan.name}
                  className={`home-pricing-card relative h-full rounded-[30px] border p-6 pb-[96px] shadow-[0_24px_60px_rgba(12,23,48,0.08)] sm:p-8 sm:pb-[104px] ${
                    plan.featured
                      ? 'home-pricing-card-featured border-[#101c3d] bg-[#101c3d] text-white'
                      : 'border-[#e9eef7] bg-white text-[#0c1730]'
                  }`}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={fadeUpVariants}
                  custom={index}
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
                      source={`home_plan_${plan.name.toLowerCase()}`}
                      label={`Criar conta grátis - ${plan.name}`}
                      variant="primary"
                      trackEvent={trackEvent}
                    >
                      Criar conta grátis
                    </PreviewButton>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-shell home-section rounded-[40px] bg-[linear-gradient(180deg,#f7f9ff_0%,#eef3ff_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionIntro
            title="Um bom software precisa acompanhar sua empresa em tempo integral"
            text=""
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 sm:gap-8">
            {DIFFERENTIALS.map((item, index) => {
              const Icon = DIFFERENTIAL_ICONS[index];

              return (
                <motion.article
                  key={item.title}
                className="home-interactive-card flex min-h-[250px] flex-col items-center rounded-[30px] border border-[#d7e0ff] bg-white px-7 py-8 text-center shadow-[0_18px_40px_rgba(68,87,243,0.08)] sm:px-9 sm:py-10"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleInVariants}
                custom={index}
              >
                <span className="home-card-icon mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e7ecff] text-[#0d8f82] shadow-[0_0_30px_rgba(65,80,221,0.14)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex max-w-[320px] flex-1 flex-col">
                  <h3 className="text-[1.08rem] font-semibold tracking-[-0.03em] text-[#16235a] sm:text-[1.18rem]">{item.title}</h3>
                  <p className="mt-4 text-[0.96rem] leading-7 text-[#60708d] sm:text-[1.02rem] sm:leading-8">{item.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
        </section>

        <section id="chatgpt" className="home-shell py-18">
          <motion.div
            className="home-help-panel relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#4150dd_0%,#5f73ff_100%)] px-6 py-8 text-white shadow-[0_26px_70px_rgba(65,80,221,0.24)] sm:px-10 sm:py-12"
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            variants={scaleInVariants}
          >
            <div className="absolute top-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-50px] left-[-50px] h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_260px] lg:items-center">
              <div className="text-center lg:text-left">
                <div className="mb-6 flex justify-center -space-x-3 lg:justify-start">
                  <span title="Equipe Medainer" className="relative z-50 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-white p-1.5">
                    <img src={medainerSymbol} alt="Equipe Medainer" className="h-full w-full object-contain" />
                  </span>
                  <span title="WhatsApp" className="relative z-40 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 bg-[#dff7f3] text-[#0d8f82]">
                    <MessageCircleMore className="h-5 w-5" />
                  </span>
                  <span title="Agenda" className="relative z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 bg-[#dff7f3] text-[#0d8f82]">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <span title="Prontuário" className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 bg-[#dff7f3] text-[#0d8f82]">
                    <Files className="h-5 w-5" />
                  </span>
                  <span title="Automações" className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 bg-[#dff7f3] text-[#0d8f82]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>
                <div className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-bold tracking-[0.18em]">
                  Dúvidas e comparação
                </div>
                <h2 className="mt-6 max-w-[680px] text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[2.85rem]">
                  Ainda tem dúvidas? Compare com o ChatGPT ou fale com a gente.
                </h2>
                <p className="mt-5 max-w-[640px] text-[1rem] leading-8 text-white/82">
                  Use o ChatGPT para analisar o Medainer ou chame nossa equipe no WhatsApp para entender como a plataforma organiza agenda, prontuário e automações de atendimento.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:justify-self-end">
                <PreviewButton
                  href={CHATGPT_URL}
                  source="home_unified_help_section"
                  label="Perguntar ao ChatGPT"
                  variant="secondary"
                  trackEvent={trackEvent}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-chatgpt-button button-primary group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#4150dd] shadow-[0_20px_40px_rgba(17,29,103,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_50px_rgba(17,29,103,0.28)] active:scale-95"
                >
                  <span className="relative flex items-center gap-2">
                    Perguntar ao ChatGPT
                    <img src={chatgptIcon} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </span>
                </PreviewButton>

                <PreviewButton
                  href={WHATSAPP_URL}
                  source="home_unified_help_whatsapp"
                  label="Conversar pelo WhatsApp"
                  variant="secondary"
                  trackEvent={trackEvent}
                >
                  Conversar pelo WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </PreviewButton>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="mt-8 bg-[#0b1324] py-16 text-white">
        <div className="home-shell">
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
                <a href={`${HOME_PATH}#recursos`} className="block hover:text-white">Recursos</a>
                <a href="mailto:suporte@medainer.com.br" className="block hover:text-white">Suporte</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-[0.08em] text-white/90">Extras</h3>
              <div className="mt-5 space-y-3 text-sm text-white/62">
                <a href={`${HOME_PATH}#planos`} className="block hover:text-white">Planos</a>
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
