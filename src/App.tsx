import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  Check,
  Files,
  FolderHeart,
  LockKeyhole,
  MessageCircleMore,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import dashMainSecondaryImage from './assets/images/dash-maink.png';
import { buildTrackedUrl, trackPageView } from './analytics';
import { LandingFooter, LandingHeader } from './components/LandingChrome';
import { LeadFlowProvider, useLeadFlow } from './components/LeadFlow';
import { SimpleVideoPlayer } from './components/SimpleVideoPlayer';
import { PLAN_COMPARISON_ROWS, PRODUCT_PLANS, type ProductPlan } from './constants/plans';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const PRICING_PATH = '/planos';
const WHATSAPP_PHONE = '5579996018591';
const WHATSAPP_MESSAGE = 'Oi! Quero conhecer o plano Automação do Medainer.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const APP_REGISTER_URL =
  (import.meta.env.VITE_APP_REGISTER_URL as string | undefined)?.trim() || 'https://app.medainer.com.br/register';
const PRIMARY_CTA_LABEL = 'Quero organizar minha clínica';
const HERO_VIDEO_SRC = '/videos/medainer.MOV';

const HERO_PILLARS = [
  {
    icon: Layers3Icon,
    title: 'Organize',
    text: 'Agenda, pacientes e prontuário em uma única operação fluida.'
  },
  {
    icon: Zap,
    title: 'Automatize',
    text: 'Confirmações, lembretes e remarcações no WhatsApp sem esforço.'
  },
  {
    icon: TrendingUpIcon,
    title: 'Escale',
    text: 'Mais pacientes atendidos com menos retrabalho e mais controle.'
  }
] as const;

const AUDIENCE_PROFILES = [
  {
    icon: ToothIcon,
    title: 'Consultórios em início de operação',
    text: 'Organize agenda, pacientes e evite faltas desde o início.',
  },
  {
    icon: CalendarDays,
    title: 'Clínicas com recepção e equipe',
    text: 'Para organizar agenda, equipe e rotina com mais clareza.',
  },
  {
    icon: MessageCircleMore,
    title: 'Clínicas com alto volume de WhatsApp',
    text: 'Para automatizar confirmações, lembretes e remarcações.',
  },
] as const;

const RESOURCE_CARDS = [
  {
    icon: CalendarDays,
    title: 'Agenda operacional',
    text: 'Por clínica e profissional, com bloqueios, folgas e fluxo do atendimento.'
  },
  {
    icon: FolderHeart,
    title: 'Base de pacientes',
    text: 'Cadastro completo, contato, responsável e histórico centralizado.'
  },
  {
    icon: Files,
    title: 'Prontuário clínico',
    text: 'Queixa, antecedentes, conduta, anexos e linha do tempo.'
  },
  {
    icon: Wallet,
    title: 'Financeiro',
    text: 'Receitas, despesas, recebíveis e saldo do período.'
  },
  {
    icon: MessageCircleMore,
    title: 'WhatsApp integrado',
    text: 'Lembretes, confirmação e remarcação automatizadas.'
  },
  {
    icon: CalendarRange,
    title: 'Google Calendar',
    text: 'Sincronização por profissional, sem agenda duplicada.'
  }
] as const;

const AUTOMATION_BENEFITS = [
  'Confirmação automática de consultas',
  'Lembretes com horários configuráveis',
  'Remarcação por link',
  'Agente de IA atendendo 24/7 (consulte plano)'
] as const;

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Crie sua conta',
    text: 'Configure a rotina da clínica sem depender de instalação.',
  },
  {
    step: '02',
    title: 'Organize a operação',
    text: 'Organize agenda, pacientes e prontuários.',
  },
  {
    step: '03',
    title: 'Ganhe ritmo',
    text: 'Ative confirmações automáticas e reduza faltas.',
  },
] as const;

const BEFORE_AFTER_COMPARISON = {
  before: [
    'Pacientes faltando sem aviso',
    'Agenda bagunçada entre WhatsApp e papel',
    'Prontuário odontológico descentralizado',
    'Financeiro desconectado dos atendimentos',
  ],
  after: [
    'Confirmações automáticas → menos faltas',
    'Agenda organizada por profissional/cadeira',
    'Prontuário odontológico em um só lugar',
    'Controle financeiro ligado à operação',
  ],
} as const;

const FAQ_ITEMS = [
  {
    question: 'Preciso instalar alguma coisa?',
    answer: 'Não. O Medainer roda online, então você cria sua conta e começa a configurar a clínica direto no navegador.',
  },
  {
    question: 'Funciona para consultório pequeno?',
    answer: 'Sim. A plataforma foi pensada para começar simples e acompanhar o crescimento da operação sem exigir uma estrutura grande desde o início.',
  },
  {
    question: 'Consigo começar no mesmo dia?',
    answer: 'Sim. Você já pode entrar, cadastrar agenda, pacientes e ajustar o fluxo principal da clínica no mesmo dia.',
  },
  {
    question: 'O WhatsApp já faz parte da operação?',
    answer: 'Sim. O Medainer foi desenhado para encaixar lembretes, confirmações e remarcações no fluxo da clínica com menos retrabalho manual.',
  },
] as const;

const TRUST_PILLARS = [
  {
    icon: UserRoundCheck,
    title: 'Acesso por usuário',
    text: 'Cada pessoa da clínica entra com seu próprio acesso e trabalha com mais clareza na rotina.',
  },
  {
    icon: Files,
    title: 'Informações centralizadas',
    text: 'Agenda, pacientes e prontuário ficam no mesmo fluxo, sem depender de papel solto ou conversa perdida.',
  },
  {
    icon: LockKeyhole,
    title: 'Mais organização e controle',
    text: 'A operação fica mais estruturada para a clínica crescer com menos retrabalho e mais previsibilidade.',
  },
] as const;

function Layers3Icon(props: React.ComponentProps<typeof Sparkles>) {
  return <Sparkles {...props} />;
}

function TrendingUpIcon(props: React.ComponentProps<typeof Sparkles>) {
  return <Stethoscope {...props} />;
}

function ToothIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7.8 4.9c1.1 0 1.8.3 2.5.7.6.3 1.1.6 1.7.6s1.1-.3 1.7-.6c.7-.4 1.4-.7 2.5-.7 2.4 0 3.8 2.2 3.8 4.6 0 3.2-1.7 5.2-2.7 7.9-.4 1-.9 1.8-1.7 1.8-.9 0-1.2-.8-1.5-1.8l-.5-2c-.2-.8-.5-1.5-1.1-1.5s-.9.7-1.1 1.5l-.5 2c-.3 1-.6 1.8-1.5 1.8-.8 0-1.3-.8-1.7-1.8-1-2.7-2.7-4.7-2.7-7.9 0-2.4 1.4-4.6 3.8-4.6Z" />
    </svg>
  );
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
}

function getCurrentLocationState() {
  if (typeof window === 'undefined') {
    return { pathname: '/', hash: '' };
  }

  return {
    pathname: normalizePathname(window.location.pathname),
    hash: window.location.hash,
  };
}

function scrollToHash(hash: string) {
  if (!hash || typeof window === 'undefined') return;

  const targetElement = document.getElementById(hash.slice(1));
  if (!targetElement) return;

  const headerOffset = 110;
  const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
}

function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, payload);
}

function getRegisterUrl() {
  return buildTrackedUrl(APP_REGISTER_URL);
}

function getButtonLabel(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        return child.trim();
      }

      if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
        return getButtonLabel(child.props.children);
      }

      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2
        className={`mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-brand-ink sm:text-5xl lg:text-6xl ${
          centered ? 'mx-auto max-w-[22ch]' : 'max-w-[17ch]'
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-5 text-base leading-relaxed text-brand-muted sm:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

const SCROLL_EASE = [0.22, 1, 0.36, 1] as const;
const SCROLL_VIEWPORT = { once: true, amount: 0.18 } as const;
const STAGGER_VIEWPORT = { once: true, amount: 0.12 } as const;

const staggerGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
} as const;

const staggerItemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: SCROLL_EASE,
    },
  },
} as const;

function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.58, delay, ease: SCROLL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  trackEventName,
  trackPayload,
  ctaLabel,
}: {
  key?: React.Key;
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  trackEventName?: string;
  trackPayload?: Record<string, unknown>;
  ctaLabel?: string;
}) {
  const { openLeadForm } = useLeadFlow();
  const styles = {
    primary:
      'button-primary bg-[linear-gradient(135deg,#4457f3_0%,#6273ff_100%)] text-white shadow-[0_18px_48px_rgba(68,87,243,0.28)] hover:-translate-y-0.5',
    secondary:
      'rounded-full border border-brand-line bg-white text-brand-ink shadow-[0_10px_30px_rgba(15,28,77,0.08)] hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary',
    ghost: 'rounded-full px-0 text-brand-ink hover:text-brand-primary',
  } as const;

  return (
    <a
      href={href}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-all duration-300 sm:w-auto ${styles[variant]} ${className}`}
      onClick={(event) => {
        event.preventDefault();
        if (trackEventName) {
          trackEvent(trackEventName, trackPayload);
        }
        openLeadForm({
          source: typeof trackPayload?.source === 'string' ? trackPayload.source : 'landing_cta',
          ctaLabel: ctaLabel || getButtonLabel(children) || 'Abrir formulário',
          targetHref: href,
        });
      }}
    >
      {children}
    </a>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-22">
      <div className="hero-glow hero-glow-top" />
      <div className="hero-glow hero-glow-bottom" />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >

          <h1 className="mt-8 text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.06em] text-brand-ink sm:text-6xl sm:leading-[1] lg:text-7xl lg:leading-[0.98]">
            O melhor software para organizar sua
            <span className="pb-[0.26em] bg-[linear-gradient(135deg,#4150dd_0%,#6783ff_100%)] bg-clip-text text-transparent"> clínica odontológica
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted sm:mt-8 sm:text-[1.45rem]">
            Agenda, pacientes, prontuário, financeiro e confirmações automáticas no WhatsApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-10 w-full max-w-5xl sm:mt-14"
        >
          <div className="hero-dashboard-shell">
            <SimpleVideoPlayer
              src={HERO_VIDEO_SRC}
              label="Painel do Medainer com agenda, pacientes e indicadores da clínica"
              className="hero-dashboard-image"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="mt-8 flex w-full max-w-4xl flex-col items-stretch justify-center gap-4 text-center sm:mt-10 sm:items-center"
        >
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button
              href={getRegisterUrl()}
              className="w-full max-w-full px-8 py-4 text-base sm:min-w-[256px] sm:w-auto mb-10"
              trackEventName="click_trial"
              trackPayload={{ source: 'hero_primary' }}
            >
              {PRIMARY_CTA_LABEL}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {/* <Button
              href="#recursos"
              variant="ghost"
              className="text-base"
              trackEventName="view_product"
              trackPayload={{ source: 'hero_secondary' }}
            >
              Ver como funciona
            </Button> */}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="section-shell pt-20 sm:pt-24 lg:pt-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="grid gap-6 md:grid-cols-3 md:gap-8"
      >
        {HERO_PILLARS.map((pillar) => (
          <motion.article key={pillar.title} variants={staggerItemVariants} className="pillar-card interactive-card-bar">
            <div className="feature-icon">
              <pillar.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-brand-ink sm:mt-7 sm:text-3xl">{pillar.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">{pillar.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section id="para-quem-e" className="section-shell section-spacing pt-16 sm:pt-20 lg:pt-24">
      <Reveal>
        <SectionHeading
          eyebrow="Para quem é"
          title="Para clínicas odontológicas que querem crescer com controle."
          centered={true}
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {AUDIENCE_PROFILES.map((profile) => (
          <motion.article key={profile.title} variants={staggerItemVariants} className="audience-panel interactive-card-bar">
            <div className="feature-icon">
              <profile.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-brand-ink sm:mt-7 sm:text-2xl">
              {profile.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">{profile.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="section-shell section-spacing pt-6 sm:pt-10 lg:pt-14">
      <Reveal>
        <SectionHeading
          eyebrow="Antes e Depois"
          title="A rotina da clínica antes e depois do Medainer."
          centered={true}
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="mt-14 grid gap-6 lg:grid-cols-2"
      >
        <motion.article variants={staggerItemVariants} className="comparison-card interactive-card-bar">
          <p className="comparison-card-title text-[#ef4444]">Sem Medainer</p>

          <ul className="mt-8 space-y-5">
            {BEFORE_AFTER_COMPARISON.before.map((item) => (
              <li key={item} className="comparison-list-item">
                <span className="comparison-list-icon bg-[#fee2e2] text-[#ef4444]">
                  <X className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article variants={staggerItemVariants} className="comparison-card comparison-card-positive interactive-card-bar">
          <p className="comparison-card-title text-[#16a34a]">Com Medainer</p>

          <ul className="mt-8 space-y-5">
            {BEFORE_AFTER_COMPARISON.after.map((item) => (
              <li key={item} className="comparison-list-item">
                <span className="comparison-list-icon bg-[#dcfce7] text-[#16a34a]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </motion.div>

      <Reveal className="mt-12 flex w-full justify-center" delay={0.08}>
        <Button
          href={getRegisterUrl()}
          className="w-full max-w-full sm:min-w-[220px] sm:w-auto"
          trackEventName="click_trial"
          trackPayload={{ source: 'before_after_cta' }}
        >
          {PRIMARY_CTA_LABEL}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section id="recursos" className="section-shell section-spacing">
      <Reveal>
        <SectionHeading eyebrow="Recursos" title="Seu consultório completo e organizado" centered={true} />
      </Reveal>

      <Reveal className="mx-auto mt-14 w-full max-w-5xl" delay={0.06}>
        <div className="hero-dashboard-shell">
          <img
            src={dashMainSecondaryImage}
            alt="Visão operacional do Medainer com agenda e módulos da clínica"
            className="hero-dashboard-image"
            loading="lazy"
          />
        </div>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="resource-grid mt-10"
      >
        {RESOURCE_CARDS.map((card) => (
          <motion.article key={card.title} variants={staggerItemVariants} className="resource-card">
            <div className="feature-icon">
              <card.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-brand-ink sm:mt-8 sm:text-2xl">{card.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">{card.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="section-shell section-spacing pt-8 sm:pt-12 lg:pt-16">
      <Reveal>
        <SectionHeading
          eyebrow="Como funciona"
          title="Crie sua conta e configure sua clínica."
          centered={true}
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {HOW_IT_WORKS_STEPS.map((item) => (
          <motion.article key={item.step} variants={staggerItemVariants} className="how-step-card interactive-card-bar">
            <span className="how-step-number">{item.step}</span>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-brand-ink sm:mt-8 sm:text-2xl">{item.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function FaqItem({ question, answer }: { key?: React.Key; question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-brand-ink sm:text-xl">{question}</span>
        <span className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      {isOpen ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-muted sm:text-lg">{answer}</p> : null}
    </div>
  );
}

function FaqSection() {
  return (
    <section className="section-shell section-spacing pt-8 sm:pt-12 lg:pt-16">
      <Reveal>
        <SectionHeading
          eyebrow="FAQ"
          title="Perguntas frequentes"
          centered={true}
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="mx-auto mt-14 max-w-4xl"
      >
        {FAQ_ITEMS.map((item) => (
          <motion.div key={item.question} variants={staggerItemVariants}>
            <FaqItem question={item.question} answer={item.answer} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section-shell section-spacing pt-8 sm:pt-12 lg:pt-16">
      <Reveal>
        <SectionHeading
          eyebrow="Segurança e confiança"
          title="Sua rotina mais organizada, com mais controle no dia a dia."
          centered={true}
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={STAGGER_VIEWPORT}
        variants={staggerGroupVariants}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {TRUST_PILLARS.map((item) => (
          <motion.article key={item.title} variants={staggerItemVariants} className="trust-card interactive-card-bar">
            <div className="feature-icon">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-brand-ink sm:mt-7 sm:text-2xl">{item.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function AutomationSection() {
  return (
    <section id="automacao" className="section-shell section-spacing">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:gap-14">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">WhatsApp + IA</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-brand-ink sm:text-5xl lg:text-6xl">
            Reduza faltas e evite buracos na agenda.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted sm:mt-6 sm:text-lg">
            Confirmações automáticas no WhatsApp, lembretes e remarcações sem esforço.
          </p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={STAGGER_VIEWPORT}
            variants={staggerGroupVariants}
            className="mt-8 space-y-4"
          >
            {AUTOMATION_BENEFITS.map((item) => (
              <motion.li key={item} variants={staggerItemVariants} className="flex items-center gap-3 text-base text-brand-ink sm:text-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary-soft text-brand-primary">
                  <Check className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* <div className="mt-10">
            <Button
              href={PRICING_PATH}
              className="px-8"
              trackEventName="click_trial"
              trackPayload={{ source: 'automation_cta' }}
            >
              Conhecer o plano Automação
            </Button>
          </div> */}
        </Reveal>

        <motion.div
          initial={{ opacity: 0, x: 34, y: 18 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.65, ease: SCROLL_EASE, delay: 0.08 }}
          className="chat-showcase"
        >
          <div className="chat-card">
            <div className="flex items-center gap-4 border-b border-brand-line pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-base font-semibold text-white">
                M
              </div>
              <div>
                <p className="text-xl font-semibold text-brand-ink">Medainer · Clínica</p>
                <p className="mt-1 text-sm text-brand-success">online</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="chat-bubble chat-bubble-in">
                Olá Maria! Sua consulta com Dr. Lucas está marcada para <strong>amanhã às 14h</strong>. Clique no link para confirmar.
              </div>
              <div className="chat-bubble chat-bubble-in !text-blue-500">
                 https://app.medainer.com.br/r?c=link&action=confirm.
              </div>
              <div className="flex justify-end">
                <div className="chat-bubble chat-bubble-out">Confirmei! ✅</div>
              </div>
              <div className="chat-bubble chat-bubble-in">
                Perfeito! Te enviarei um lembrete 1h antes. Até amanhã 💙
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-brand-muted">Respondido automaticamente pelo Medainer</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  buttonLabel,
  buttonHref,
  buttonVariant,
}: {
  key?: React.Key;
  plan: ProductPlan;
  buttonLabel: string;
  buttonHref: string;
  buttonVariant: 'primary' | 'secondary';
}) {
  const isFeatured = plan.featured;

  return (
    <article className={`pricing-card interactive-card-bar ${isFeatured ? 'pricing-card-featured' : ''}`}>
      <div className="flex min-h-8 items-start">
        {isFeatured ? (
          <span className="rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Mais escolhido
          </span>
        ) : null}
      </div>

      <h3 className={`mt-6 text-[1.75rem] font-semibold tracking-[-0.05em] sm:text-[2.1rem] ${isFeatured ? 'text-white' : 'text-brand-ink'}`}>
        {plan.name.replace('Medainer ', '')}
      </h3>
      <p className={`mt-3 text-base leading-relaxed sm:text-lg ${isFeatured ? 'text-white/74' : 'text-brand-muted'}`}>{plan.description}</p>

      <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-1 sm:mt-10">
        {plan.pricePrefix ? (
          <span className={`pb-2 text-base ${isFeatured ? 'text-white/78' : 'text-brand-muted'}`}>{plan.pricePrefix}</span>
        ) : (
          <span className={`pb-2 text-base ${isFeatured ? 'text-white/78' : 'text-brand-muted'}`}>R$</span>
        )}
        <span className={`text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${isFeatured ? 'text-white' : 'text-brand-ink'}`}>
          {plan.price.replace('R$ ', '')}
        </span>
        <span className={`pb-2 text-base ${isFeatured ? 'text-white/78' : 'text-brand-muted'}`}>/mês</span>
      </div>

      <Button
        href={buttonHref}
        variant={buttonVariant}
        className={`mt-8 w-full ${isFeatured && buttonVariant === 'primary' ? 'bg-[linear-gradient(135deg,#4457f3_0%,#6677ff_100%)]' : ''}`}
        trackEventName="click_trial"
        trackPayload={{ source: `pricing_card_${plan.id}` }}
      >
        {buttonLabel}
      </Button>

      <ul className="mt-8 space-y-4">
        <li className={`flex items-start gap-3 text-base sm:text-lg ${isFeatured ? 'text-white/86' : 'text-brand-ink'}`}>
          <Check className={`mt-1 h-4 w-4 shrink-0 ${isFeatured ? 'text-white' : 'text-brand-primary'}`} />
          <span>{plan.practitioners} profissional(is) de saúde</span>
        </li>
        <li className={`flex items-start gap-3 text-base sm:text-lg ${isFeatured ? 'text-white/86' : 'text-brand-ink'}`}>
          <Check className={`mt-1 h-4 w-4 shrink-0 ${isFeatured ? 'text-white' : 'text-brand-primary'}`} />
          <span>{plan.admins} administrativo(s)</span>
        </li>
        {plan.features.slice(0, 5).map((feature) => (
          <li key={feature} className={`flex items-start gap-3 text-base sm:text-lg ${isFeatured ? 'text-white/86' : 'text-brand-ink'}`}>
            <Check className={`mt-1 h-4 w-4 shrink-0 ${isFeatured ? 'text-white' : 'text-brand-primary'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PricingSection() {
  const trackedWhatsappUrl = buildTrackedUrl(WHATSAPP_URL);

  return (
    <section id="planos" className="section-shell section-spacing">
      <SectionHeading
        eyebrow="Planos"
        title="O plano certo para cada estágio."
        text="Comece grátis. Suba de plano conforme a clínica cresce."
        centered={true}
      />

      <div className="mt-12 grid gap-6 xl:mt-16 xl:grid-cols-3">
        {PRODUCT_PLANS.map((plan) => {
          const buttonLabel = PRIMARY_CTA_LABEL;
          const buttonHref = plan.id === 'automacao' ? trackedWhatsappUrl : getRegisterUrl();
          const buttonVariant = plan.featured ? 'primary' : 'secondary';

          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              buttonLabel={buttonLabel}
              buttonHref={buttonHref}
              buttonVariant={buttonVariant}
            />
          );
        })}
      </div>
    </section>
  );
}

function PricingPage() {
  const trackedWhatsappUrl = buildTrackedUrl(WHATSAPP_URL);
  const renderComparisonCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center justify-center text-brand-ink" aria-label="Incluído">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7f6ec] text-[#1f8f55]">
            <Check className="h-4 w-4" />
          </span>
          <span className="sr-only">Incluído</span>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center text-brand-ink" aria-label="Não incluído">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fdecee] text-[#d14a61]">
            <X className="h-4 w-4" />
          </span>
          <span className="sr-only">Não incluído</span>
        </span>
      );
    }

    return value;
  };

  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Planos"
          title="Escolha o plano certo para o momento da sua clínica."
          centered={true}
        />

        <div className="mt-12 grid gap-6 xl:mt-16 xl:grid-cols-3">
          {PRODUCT_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              buttonLabel={PRIMARY_CTA_LABEL}
              buttonHref={plan.id === 'automacao' ? trackedWhatsappUrl : getRegisterUrl()}
              buttonVariant={plan.featured ? 'primary' : 'secondary'}
            />
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-[24px] border border-brand-line bg-white shadow-[0_24px_60px_rgba(15,28,77,0.08)] sm:rounded-[32px]">
          <table className="min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-brand-line text-sm uppercase tracking-[0.14em] text-brand-muted">
                <th className="px-6 py-5 font-semibold">Comparativo</th>
                <th className="px-6 py-5 font-semibold">Solo</th>
                <th className="px-6 py-5 font-semibold">Clínica</th>
                <th className="px-6 py-5 font-semibold">Automação</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_COMPARISON_ROWS.map((row) =>
                row.kind === 'group' ? (
                  <tr key={row.label} className="border-b border-brand-line bg-[#f5f7fc]">
                    <td colSpan={4} className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-primary">
                      {row.label}
                    </td>
                  </tr>
                ) : (
                  <tr key={row.label} className="border-b border-brand-line last:border-b-0">
                    <td className="px-6 py-5 text-base font-semibold text-brand-ink">{row.label}</td>
                    <td className="px-6 py-5 text-base text-brand-muted">{renderComparisonCell(row.solo)}</td>
                    <td className="px-6 py-5 text-base text-brand-muted">{renderComparisonCell(row.clinica)}</td>
                    <td className="px-6 py-5 text-base text-brand-muted">{renderComparisonCell(row.automacao)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <AudienceSection />
      <ResourcesSection />
      <HowItWorksSection />
      <AutomationSection />
      <BeforeAfterSection />
      <TrustSection />
      <FaqSection />
    </>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [{ pathname, hash }, setLocationState] = useState(getCurrentLocationState);
  const isPricingPage = pathname === PRICING_PATH;
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    const handleLocationChange = () => setLocationState(getCurrentLocationState());

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (isPricingPage || !hash) return;

    const frameId = window.requestAnimationFrame(() => scrollToHash(hash));
    return () => window.cancelAnimationFrame(frameId);
  }, [hash, isPricingPage]);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    trackPageView(`${pathname}${window.location.search}`);
  }, [pathname]);

  return (
    <LeadFlowProvider experience="landing">
      <div className="min-h-screen bg-brand-page text-brand-ink">
        <LandingHeader isScrolled={isScrolled} navigationMode="spa" trackEvent={trackEvent} />
        <main>{isPricingPage ? <PricingPage /> : <HomePage />}</main>
        <LandingFooter />
      </div>
    </LeadFlowProvider>
  );
}
