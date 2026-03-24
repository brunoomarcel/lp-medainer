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
  Play,
  ShieldCheck,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import clinicTeamImage from './assets/images/clinic-team.png';
import dashboardGeralImage from './assets/images/dash-geral.png';
import agendaImage from './assets/images/agenda.jpg';
import pacientesImage from './assets/images/pacientes.jpg';
import prontuarioImage from './assets/images/prontuario.jpg';
import financeiroImage from './assets/images/financeiro.jpg';
import profissionalImage from './assets/images/profissional.png';
import { buildTrackedUrl } from './analytics';
import { LandingFooter, LandingHeader } from './components/LandingChrome';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const HERO_YOUTUBE_VIDEO_ID = '1K2zYpofJUk';
const HERO_YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${HERO_YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
const HERO_YOUTUBE_THUMBNAIL_URL = `https://img.youtube.com/vi/${HERO_YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const PRICING_PATH = '/planos';
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

const IDEAL_FIT_SEGMENTS = [
  {
    icon: Users,
    title: 'Clínicas com equipe e recepção',
    text: 'Para operações que precisam organizar agenda, pacientes, atendimento e rotina interna no mesmo fluxo.'
  },
  {
    icon: HeartPulse,
    title: 'Profissionais com consultório próprio',
    text: 'Para médicos e dentistas que querem mais clareza entre um atendimento e outro, sem depender de papel e recado solto.'
  },
  {
    icon: CircleHelp,
    title: 'Rotinas que já não cabem no improviso',
    text: 'Quando agenda, WhatsApp, planilha e memória já não dão conta da operação, o Medainer ajuda a centralizar a base.'
  }
] as const;

const PRACTITIONER_TYPES = [
  'Médicos',
  'Dentistas',
  'Psicólogos',
  'Fisioterapeutas',
  'Clínicas multiprofissionais'
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
    primary: 'cta-glow bg-brand-primary text-white shadow-[0_16px_32px_rgba(59,130,246,0.18)] hover:-translate-y-0.5 hover:bg-brand-primary-strong hover:shadow-[0_22px_44px_rgba(59,130,246,0.24)]',
    secondary: 'cta-glow bg-brand-green text-white shadow-[0_16px_32px_rgba(82,163,127,0.18)] hover:-translate-y-0.5 hover:bg-brand-green-strong hover:shadow-[0_22px_44px_rgba(82,163,127,0.24)]',
    outline: 'border border-brand-line bg-white text-brand-primary hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary-soft hover:shadow-[0_18px_38px_rgba(59,130,246,0.10)]',
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

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState(() => (typeof window === 'undefined' ? '/' : window.location.pathname));
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);
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
      <LandingHeader isScrolled={isScrolled} navigationMode="spa" trackEvent={trackEvent} />

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
          <div className="ambient-orb absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-primary-soft blur-3xl" />
          <div className="ambient-orb-delayed absolute bottom-8 right-0 h-56 w-56 rounded-full bg-brand-green-soft blur-3xl" />

          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-1 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
                <ShieldCheck className="h-4 w-4" />
                Gestão para clínicas e consultórios de saúde
              </div>
              
              <h1 className="mt-6 text-4xl font-serif font-semibold leading-[1.02] text-brand-ink sm:text-5xl lg:text-6xl">
                Organize sua clínica ou consultório sem papel ou planilha
              </h1>
              <p className="mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
                Agenda, pacientes, prontuários, financeiro e operação no mesmo lugar para reduzir correria, ganhar clareza e deixar a rotina mais leve.
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
              <div className="interactive-card mt-5 hidden items-center gap-3 rounded-full border border-brand-line bg-white/85 px-4 py-2 text-xs font-medium text-brand-muted shadow-sm backdrop-blur-sm sm:inline-flex">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-primary-soft border border-brand-line" />
                </div>
                <span>Para clínicas com equipe e profissionais com consultório</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="hero-frame rounded-[24px] border border-brand-line bg-white p-3 shadow-[0_32px_80px_rgba(59,130,246,0.10)] sm:p-4">
                <div className="mb-3 flex items-center justify-between rounded-[18px] px-4 py-3 text-sm text-brand-muted">
                  <span>Toque para ver o Medainer</span>
                </div>
                <div className="overflow-hidden rounded-[18px] border border-brand-line">
                  <div className="aspect-video w-full bg-brand-panel">
                    {isHeroVideoPlaying ? (
                      <iframe
                        src={HERO_YOUTUBE_EMBED_URL}
                        title="Apresentação do Medainer"
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsHeroVideoPlaying(true)}
                        className="group relative block h-full w-full cursor-pointer overflow-hidden"
                        aria-label="Reproduzir apresentação do Medainer"
                      >
                        <img
                          src={HERO_YOUTUBE_THUMBNAIL_URL}
                          alt="Preview da apresentação do Medainer"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.28)_100%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-18 w-18 items-center justify-center rounded-full bg-white text-brand-primary shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-transform duration-300 group-hover:scale-105">
                            <Play className="ml-1 h-8 w-8 fill-current" />
                          </span>
                        </div>
                      </button>
                    )}
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

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
            <SectionHeading
              eyebrow="Para quem é"
              title="O Medainer faz sentido para clínicas e consultórios que querem mais clareza na rotina"
              text="Não importa se você opera com recepção e equipe ou atende no próprio consultório. A ideia é eliminar o improviso e colocar tudo em um fluxo mais simples de acompanhar."
              centered={true}
            />

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {PRACTITIONER_TYPES.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-medium text-brand-muted shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {IDEAL_FIT_SEGMENTS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="interactive-card rounded-[20px] border border-brand-line bg-brand-panel p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-sm">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-serif font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.text}</p>
                </motion.div>
              ))}
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
                  className="interactive-card rounded-[20px] border border-brand-line bg-white p-7 shadow-sm"
                >
                  <p className="text-2xl font-serif font-semibold leading-none text-brand-primary sm:text-3xl">0{index + 1}</p>
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
              text="Com o Medainer, a equipe consulta as mesmas informações e trabalha com mais previsibilidade, sem precisar alternar entre várias ferramentas soltas."
              />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {CENTRALIZATION_AREAS.map((item) => (
                <div key={item} className="interactive-card flex items-center gap-3 rounded-xl border border-brand-line bg-brand-panel px-4 py-4 text-sm text-brand-ink">
                    <Check className="h-4 w-4 text-brand-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
                <div className="interactive-card rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
                  <img src={prontuarioImage} alt="Prontuários organizados no Medainer" className="aspect-[16/11] w-full rounded-[18px] object-cover" />
                </div>
                <div className="interactive-card rounded-[24px] border border-brand-line bg-brand-panel p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">Visão única</p>
                  <h3 className="mt-4 text-2xl font-serif font-semibold text-brand-ink">Menos troca de contexto. Mais clareza no trabalho diário.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                    Recepção, atendimento e gestão deixam de depender de informações espalhadas para acompanhar a rotina da clínica.
                  </p>
                </div>
              </div>

              <div className="interactive-card rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
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
                  className="interactive-card rounded-[20px] border border-brand-line bg-white p-6 shadow-sm"
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
            <div className="interactive-card rounded-[28px] border border-brand-line bg-[linear-gradient(180deg,#f5fbff_0%,#f7fffa_100%)] p-8 sm:p-10">
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
                  <div key={item} className="interactive-card flex items-start gap-3 rounded-xl bg-white px-4 py-4 text-sm text-brand-muted shadow-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="interactive-card rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
                <img src={agendaImage} alt="Fluxos automatizados de agenda no Medainer" className="aspect-[16/10] w-full rounded-[18px] object-cover" />
              </div>
              <div className="interactive-card rounded-[24px] border border-brand-line bg-brand-panel p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-brand-muted">
                  Não substitui o cuidado humano da clínica. Dá mais fluidez para tarefas que hoje consomem tempo demais da equipe.
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
                    className="interactive-card rounded-[20px] border border-brand-line bg-white p-6 shadow-sm"
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
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto w-full max-w-[980px] px-4 text-center sm:px-6">
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
                Falar com especialista
              </Button>
            </div>
          </div>
        </section>
        </>
        )}
      </main>

      <LandingFooter />

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
