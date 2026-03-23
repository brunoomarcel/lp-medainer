/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Bot,
  Calendar,
  Check,
  CircleHelp,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import clinicTeamImage from './assets/images/clinic-team.png';
import symbolMedainerImage from './assets/images/symbol-medainer.png';
import dashboardGeralImage from './assets/images/dash-geral.png';
import agendaImage from './assets/images/agenda.jpg';
import pacientesImage from './assets/images/pacientes.jpg';
import prontuarioImage from './assets/images/prontuario.jpg';
import financeiroImage from './assets/images/financeiro.jpg';
import profissionalImage from './assets/images/profissional.png';
import { buildTrackedUrl } from './analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const REGISTER_URL = 'https://app.medainer.com.br/register';
const TRIAL_URL = (import.meta.env.VITE_TRIAL_URL as string | undefined)?.trim() || REGISTER_URL;
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';
const LGPD_URL = (import.meta.env.VITE_LGPD_URL as string | undefined)?.trim() || '/lgpd';
const HERO_YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/1K2zYpofJUk?rel=0';
const PRICING_PATH = '/planos';
const TRIAL = '/teste-gratuito';
const WHATSAPP_PHONE = '5579996018591';
const WHATSAPP_MESSAGE = 'Oi! Quero solicitar uma demonstração do Medainer.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const LANDING_PLANS = [
  {
    name: 'Medainer Solo',
    price: 'R$ 99',
    subtitle: 'Para começar',
    text: 'Para profissionais que querem sair do improviso e organizar a base da clínica com mais clareza.',
    features: [
      'Até 1 profissional',
      'Até 2 usuários',
      'Agenda da clínica',
      'Pacientes e prontuário básico',
      'Confirmação por link',
      'Suporte por chat ou e-mail'
    ],
    featured: false
  },
  {
    name: 'Medainer Clínica',
    price: 'R$ 297',
    subtitle: 'Mais completo',
    text: 'Para clínicas que precisam reunir recepção, equipe, agenda, pacientes e financeiro no mesmo fluxo.',
    features: [
      'Tudo do Medainer Solo',
      'Financeiro integrado',
      'Equipe e permissões',
      'Dashboard da clínica',
      'Mais visão operacional',
      'Onboarding acompanhado'
    ],
    featured: true
  },
  {
    name: 'Medainer Automação',
    price: 'R$ 497',
    subtitle: 'Para ganhar escala',
    text: 'Para clínicas que querem reduzir trabalho manual e automatizar partes da comunicação e da rotina.',
    features: [
      'Tudo do Medainer Clínica',
      'Automações no WhatsApp',
      'Lembretes e confirmações',
      'Reativação de pacientes',
      'Fila de encaixe',
      'Suporte prioritário'
    ],
    featured: false
  }
] as const;

const LANDING_PLAN_COMPARISON = [
  ['Melhor momento', 'Organizar a base', 'Estruturar a operação', 'Ganhar escala com automação'],
  ['Profissionais', 'Até 1', 'Equipe completa', 'Equipe completa'],
  ['Usuários', 'Até 2', 'Equipe e permissões', 'Equipe e permissões'],
  ['Financeiro', 'Não incluído', 'Incluído', 'Incluído'],
  ['Automações', 'Não incluído', 'Fluxos básicos', 'Fluxos mais completos'],
  ['Onboarding', 'Remoto', 'Acompanhado', 'Acompanhado e prioritário']
] as const;

const PAIN_POINTS = [
  'A agenda muda o tempo todo e a recepção precisa resolver tudo ao mesmo tempo.',
  'Informações importantes ficam espalhadas entre papel, WhatsApp e várias planilhas.',
  'A equipe perde tempo procurando contexto em vez de cuidar da rotina da clínica.'
] as const;

const CENTRALIZATION_AREAS = [
  'Agenda',
  'Pacientes',
  'Prontuários',
  'Financeiro',
  'Equipe e acessos'
] as const;

const BENEFITS = [
  {
    icon: Calendar,
    title: 'Agenda mais clara',
    text: 'Visualize horários, encaixes e confirmações com menos retrabalho para a recepção.'
  },
  {
    icon: Users,
    title: 'Pacientes em um só lugar',
    text: 'Cadastro e histórico ficam acessíveis para a equipe sem depender de várias fontes.'
  },
  {
    icon: HeartPulse,
    title: 'Prontuários organizados',
    text: 'As informações clínicas acompanham o atendimento com mais contexto e continuidade.'
  },
  {
    icon: LayoutDashboard,
    title: 'Financeiro conectado',
    text: 'A operação da clínica e a leitura financeira ficam mais claras no mesmo sistema.'
  },
  {
    icon: ShieldCheck,
    title: 'Equipe com mais controle',
    text: 'Cada pessoa acessa o que precisa, com mais segurança e menos confusão no dia a dia.'
  }
] as const;

const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Entendemos sua rotina',
    text: 'Começamos pelo funcionamento da sua clínica para configurar o essencial com clareza.'
  },
  {
    step: '02',
    title: 'Organizamos o início',
    text: 'Agenda, acessos e fluxo principal ficam prontos para a equipe usar sem complicação.'
  },
  {
    step: '03',
    title: 'Acompanhamos a adoção',
    text: 'Sua equipe entra com orientação simples para ganhar segurança nos primeiros dias.'
  }
] as const;

const HERO_HIGHLIGHTS = [
  { icon: Calendar, text: 'Rotina mais clara' },
  { icon: Users, text: 'Equipe mais alinhada' },
  { icon: CircleHelp, text: 'Informações em um só lugar' }
] as const;

const HERO_MARQUEE_ITEMS = [
  { icon: ShieldCheck, text: 'Demonstração guiada' },
  { icon: Calendar, text: 'Rotina mais clara' },
  { icon: Users, text: 'Equipe mais alinhada' },
  { icon: CircleHelp, text: 'Informações em um só lugar' },
  { icon: Check, text: 'Implantação acompanhada' },
  { icon: LayoutDashboard, text: 'Mais clareza desde o início' }
] as const;

function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, payload);
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  href,
  trackEventName,
  trackPayload
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  className?: string;
  href: string;
  trackEventName?: string;
  trackPayload?: Record<string, unknown>;
}) => {
  const baseStyles =
    'inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-6 py-3.5 text-center text-sm font-semibold transition-all duration-300';
  const variants = {
    primary: 'bg-brand-primary text-white shadow-[0_16px_32px_rgba(59,130,246,0.18)] hover:bg-brand-primary-strong',
    secondary: 'bg-brand-green text-white shadow-[0_16px_32px_rgba(82,163,127,0.18)] hover:bg-brand-green-strong',
    outline: 'border border-brand-line bg-white text-brand-primary hover:border-brand-primary hover:bg-brand-primary-soft',
    link: 'w-auto rounded-none px-0 py-0 text-brand-primary shadow-none hover:text-brand-primary-strong'
  };

  const handleClick = () => {
    if (trackEventName) {
      trackEvent(trackEventName, trackPayload);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
};

const SectionHeading = ({
  eyebrow,
  title,
  text,
  centered = false
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) => (
  <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">{eyebrow}</p>
    <h2 className="mt-4 text-3xl font-serif font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">{title}</h2>
    {text ? <p className="mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">{text}</p> : null}
  </div>
);

const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

const navigateTo = (href: string) => {
  if (typeof window === 'undefined' || isExternalHref(href)) return;

  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
};

const NavLink = ({
  href,
  children,
  className = '',
  onClick
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (isExternalHref(href) || href.startsWith('#')) return;

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState(() => (typeof window === 'undefined' ? '/' : window.location.pathname));
  const demoWhatsappUrl = buildTrackedUrl(WHATSAPP_URL);
  const isPricingPage = pathname === PRICING_PATH;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handlePopState = () => setPathname(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-page font-sans text-brand-ink selection:bg-brand-primary selection:text-white">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          isScrolled ? 'bg-white/90 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink href="/" className="flex items-center gap-3">
            <img src={symbolMedainerImage} alt="Símbolo Medainer" className="h-10 w-10 rounded-2xl object-contain" />
            <span className="text-lg font-serif font-semibold text-brand-ink sm:text-xl">Medainer</span>
          </NavLink>

          <nav className="hidden items-center gap-7 text-sm text-brand-muted lg:flex">
            <a href="/#como-funciona" className="hover:text-brand-primary transition-colors">
              Como funciona
            </a>
            <a href="/#beneficios" className="hover:text-brand-primary transition-colors">
              Benefícios
            </a>
            <a href="/#automacao" className="hover:text-brand-primary transition-colors">
              Automação
            </a>
            <NavLink href={PRICING_PATH} className="hover:text-brand-primary transition-colors" onClick={() => trackEvent('view_pricing', { source: 'header_menu' })}>
              Planos
            </NavLink>
            <a href={TRIAL} className="hover:text-brand-primary transition-colors" onClick={() => trackEvent('click_trial', { source: 'header_menu' })}>
              Teste grátis
            </a>

          </nav>

          <div className="hidden sm:flex">
            <Button
              href={demoWhatsappUrl}
              variant="primary"
              className="px-5 py-3"
              trackEventName="click_trial"
              trackPayload={{ source: 'header' }}
            >
              Solicitar demonstração
            </Button>
          </div>
        </div>
      </header>

      <main>
        {isPricingPage ? (
          <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] pt-28 sm:pt-32 lg:pt-36">
            <div className="mx-auto w-full max-w-[1240px] px-4 pb-20 sm:px-6 lg:pb-24">

              <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.08fr_0.95fr]">
                {LANDING_PLANS.map((plan) => (
                  <article
                    key={plan.name}
                    className={`flex h-full flex-col rounded-[24px] border p-8 shadow-sm ${
                      plan.featured
                        ? 'border-brand-primary bg-white shadow-[0_24px_60px_rgba(59,130,246,0.10)]'
                        : 'border-brand-line bg-white'
                    }`}
                  >
                    <div className={`border-b pb-6 ${plan.featured ? 'border-brand-primary/15' : 'border-brand-line'}`}>
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${plan.featured ? 'text-brand-primary' : 'text-brand-green'}`}>
                        {plan.subtitle}
                      </p>
                      <h2 className="mt-4 text-3xl font-serif font-semibold text-brand-ink">{plan.name}</h2>
                      <p className="mt-4 text-sm leading-relaxed text-brand-muted">{plan.text}</p>
                    </div>

                    <div className="pt-6">
                      <p className="text-5xl font-serif font-semibold text-brand-ink">{plan.price}</p>
                      <p className="mt-2 text-sm text-brand-muted">/mês</p>
                    </div>

                    <ul className="mt-8 flex-grow space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-brand-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button
                        href={demoWhatsappUrl}
                        variant={plan.featured ? 'primary' : 'outline'}
                        className="w-full sm:w-full"
                        trackEventName="click_trial"
                        trackPayload={{ source: `pricing_page_${plan.name.toLowerCase()}` }}
                      >
                        Solicitar demonstração
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 overflow-x-auto rounded-[24px] border border-brand-line bg-white shadow-sm">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-line text-left text-brand-muted">
                      <th className="px-5 py-4 font-semibold">Comparativo</th>
                      <th className="px-5 py-4 font-semibold">Medainer Solo</th>
                      <th className="px-5 py-4 font-semibold">Medainer Clínica</th>
                      <th className="px-5 py-4 font-semibold">Medainer Automação</th>
                    </tr>
                  </thead>
                  <tbody className="text-brand-ink/80">
                    {LANDING_PLAN_COMPARISON.map((row) => (
                      <tr key={row[0]} className="border-b border-brand-line last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="px-5 py-4">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
        <>
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] pt-28 sm:pt-32 lg:pt-36">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-primary-soft blur-3xl" />
          <div className="absolute bottom-8 right-0 h-56 w-56 rounded-full bg-brand-green-soft blur-3xl" />

          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-1 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
                <ShieldCheck className="h-4 w-4" />
                Sistema para clínicas
              </div>
              <h1 className="mt-6 text-4xl font-serif font-semibold leading-[1.02] text-brand-ink sm:text-5xl lg:text-6xl">
                Organize sua clínica de forma simples e clara
              </h1>
              <p className="mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
                O Medainer centraliza agenda, pacientes, prontuários, financeiro e equipe para sua rotina ficar mais organizada, leve e fácil de acompanhar.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  href={demoWhatsappUrl}
                  variant="primary"
                  className="px-8 py-4 text-base"
                  trackEventName="click_trial"
                  trackPayload={{ source: 'hero_primary' }}
                >
                  Solicitar demonstração
                </Button>
                <Button
                  href="#como-funciona"
                  variant="link"
                  className="text-base font-medium"
                  trackEventName="view_product"
                  trackPayload={{ source: 'hero_secondary' }}
                >
                  Ver como funciona
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-[24px] border border-brand-line bg-white p-3 shadow-[0_32px_80px_rgba(59,130,246,0.10)] sm:p-4">
                <div className="mb-3 flex items-center justify-between rounded-[18px] bg-brand-panel px-4 py-3 text-sm text-brand-muted">
                  <span>Toque para ver o Medainer</span>
                  {/* <span className="text-brand-primary">video</span> */}
                </div>
                <div className="overflow-hidden rounded-[18px] border border-brand-line">
                  <div className="aspect-video w-full bg-brand-panel">
                    <iframe
                      src={HERO_YOUTUBE_EMBED_URL}
                      title="Apresentação do Medainer"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-[1240px] px-4 pb-4 sm:px-6 lg:pb-6">
            <div className="hero-marquee overflow-hidden bg-white/70 py-4 backdrop-blur-sm">
              <div className="hero-marquee-track flex w-max items-center gap-8">
                {[...HERO_MARQUEE_ITEMS, ...HERO_MARQUEE_ITEMS].map((item, index) => (
                  <div key={`${item.text}-${index}`} className="flex items-center gap-3 text-sm text-brand-muted">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="whitespace-nowrap">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-panel py-20 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
            <SectionHeading
              eyebrow="Rotina desorganizada"
              title="Quando a rotina fica espalhada, a clínica perde clareza."
              text="A desorganização não aparece só no atendimento. Ela também pesa na recepção, no acompanhamento dos pacientes e nas decisões do dia a dia."
              centered={true}
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {PAIN_POINTS.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[20px] border border-brand-line bg-white p-7 shadow-sm"
                >
                  <p className="text-sm font-semibold text-brand-primary">0{index + 1}</p>
                  <p className="mt-4 text-base leading-relaxed text-brand-muted">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <SectionHeading
              eyebrow="Tudo centralizado"
              title="Tudo que sua clínica precisa, organizado em um só lugar."
              text="Com o Medainer, a equipe consulta as mesmas informações e trabalha com mais previsibilidade, sem precisar alternar entre vários processos soltos."
              />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {CENTRALIZATION_AREAS.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-brand-line bg-brand-panel px-4 py-4 text-sm text-brand-ink">
                    <Check className="h-4 w-4 text-brand-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
                  <img src={prontuarioImage} alt="Prontuários organizados no Medainer" className="aspect-[16/11] w-full rounded-[18px] object-cover" />
                </div>
                <div className="rounded-[24px] border border-brand-line bg-brand-panel p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">Visão única</p>
                  <h3 className="mt-4 text-2xl font-serif font-semibold text-brand-ink">Menos troca de contexto. Mais clareza no trabalho diário.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                    Recepção, atendimento e gestão deixam de depender de informações espalhadas para acompanhar a rotina da clínica.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
                <img src={financeiroImage} alt="Financeiro da clínica organizado no Medainer" className="aspect-[16/8] w-full rounded-[18px] object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="bg-brand-page py-20 sm:py-24">
          <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
            <SectionHeading
              eyebrow="Benefícios"
              title="Mais organização para a rotina inteira da clínica."
              text="Cada parte do sistema existe para deixar o trabalho mais simples de acompanhar e mais fácil de executar."
              centered={true}
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {BENEFITS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[20px] border border-brand-line bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-serif font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="automacao" className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="rounded-[28px] border border-brand-line bg-[linear-gradient(180deg,#f5fbff_0%,#f7fffa_100%)] p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-sm">
                <Bot className="h-7 w-7" />
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">Automação com IA</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold leading-tight text-brand-ink sm:text-4xl">
                Automações simples para reduzir tarefas repetitivas.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-muted">
                O Medainer pode apoiar confirmações, lembretes e fluxos de atendimento com mais consistência, sem deixar a comunicação pesada ou impessoal.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Ajuda a reduzir trabalho manual no WhatsApp',
                  'Apoia confirmações e lembretes com mais regularidade',
                  'Mantém a rotina mais organizada conforme a clínica cresce'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-white px-4 py-4 text-sm text-brand-muted shadow-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
                <img src={agendaImage} alt="Fluxos automatizados de agenda no Medainer" className="aspect-[16/10] w-full rounded-[18px] object-cover" />
              </div>
              <div className="rounded-[24px] border border-brand-line bg-brand-panel p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-brand-muted">
                  A ideia não é substituir o cuidado humano da clínica. É dar mais fluidez para tarefas que hoje consomem tempo demais da equipe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-panel py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <div className="relative">
              <div className="absolute -left-2 top-6 hidden h-[84%] w-[88%] rounded-[24px] bg-brand-green-soft lg:block" />
              <img
                src={profissionalImage}
                alt="Gestora de clínica em ambiente moderno"
                className="relative z-10 aspect-[4/5] w-full rounded-[24px] object-cover shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Onboarding simples"
                title="Um começo organizado para a equipe usar com segurança."
                text="A implantação foi pensada para ser clara, acompanhada e adequada à rotina da clínica desde o início."
              />

              <div className="mt-10 grid gap-5">
                {ONBOARDING_STEPS.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-[20px] border border-brand-line bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary-soft text-sm font-semibold text-brand-primary">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-brand-ink">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-brand-muted">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-[20px] border border-brand-line bg-white px-6 py-5 text-sm leading-relaxed text-brand-muted shadow-sm">
                Sua equipe aprende usando o que faz sentido para a rotina real da clínica, com apoio no início e mais clareza na adoção.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto w-full max-w-[980px] px-4 text-center sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">CTA final</p>
            <h2 className="mt-4 text-4xl font-serif font-semibold leading-tight text-brand-ink sm:text-5xl">
              Mais clareza para a rotina da sua clínica começa aqui.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              Veja como o Medainer pode ajudar sua equipe a organizar agenda, pacientes, prontuários, financeiro e atendimento em um fluxo mais simples.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href={demoWhatsappUrl}
                variant="primary"
                className="px-8 py-4 text-base"
                trackEventName="click_trial"
                trackPayload={{ source: 'final_cta_primary' }}
              >
                Solicitar demonstração
              </Button>
              <Button
                href="#como-funciona"
                variant="outline"
                className="px-8 py-4 text-base"
                trackEventName="view_product"
                trackPayload={{ source: 'final_cta_secondary' }}
              >
                Rever a solução
              </Button>
            </div>
          </div>
        </section>
        </>
        )}
      </main>

      <footer className="border-t border-brand-line bg-white py-10">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left">
          <div className="flex items-center gap-3">
            <img src={symbolMedainerImage} alt="Símbolo Medainer" className="h-8 w-8 rounded-xl object-contain" />
            <span className="text-lg font-serif font-semibold text-brand-ink">Medainer</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-brand-muted">
            <a href={TERMS_URL} className="hover:text-brand-primary transition-colors">
              Termos de Uso
            </a>
            <a href={PRIVACY_URL} className="hover:text-brand-primary transition-colors">
              Privacidade
            </a>
            <a href={LGPD_URL} className="hover:text-brand-primary transition-colors">
              LGPD
            </a>
          </div>

          <p className="text-sm text-brand-muted">© {new Date().getFullYear()} Medainer. Todos os direitos reservados.</p>
        </div>
      </footer>

      <motion.a
        href={demoWhatsappUrl}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06 }}
        onClick={() => trackEvent('click_trial', { source: 'floating_button' })}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
      </motion.a>
    </div>
  );
}




