import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Clock,
  MessageCircle,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import clinicTeamImage from '../assets/images/clinic-team.png';
import dashboardGeralImage from '../assets/images/dash-geral.png';
import agendaImage from '../assets/images/agenda.jpg';
import pacientesImage from '../assets/images/pacientes.jpg';
import prontuarioImage from '../assets/images/prontuario.jpg';
import financeiroImage from '../assets/images/financeiro.jpg';
import { buildTrackedUrl } from '../analytics';
import { LandingFooter, LandingHeader } from '../components/LandingChrome';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/5579996018591?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_URL = buildWhatsAppUrl('Olá, quero tirar uma dúvida antes de ativar os 7 dias grátis do Medainer');
const APP_REGISTER_URL =
  (import.meta.env.VITE_APP_REGISTER_URL as string | undefined)?.trim() || 'https://app.medainer.com.br/register';

const HERO_HIGHLIGHTS = [
  { icon: Calendar, text: '7 dias grátis e sem cartão de crédito' },
  { icon: Clock, text: 'Teste com a rotina real da clínica' },
  { icon: TrendingUp, text: 'Agenda, pacientes e prontuário em um só lugar' },
] as const;

const EVALUATION_FEATURES = [
  {
    title: 'Agenda sem buracos e sem confusão',
    text: 'Horários, profissionais e visão do dia no mesmo lugar para parar de apagar incêndio com planilha, papel e recado solto.',
    image: agendaImage,
    icon: Calendar,
  },
  {
    title: 'Paciente sem informação espalhada',
    text: 'Centralize cadastro e histórico básico para a equipe parar de procurar informação em WhatsApp, papel e memória.',
    image: pacientesImage,
    icon: UserCheck,
  },
  {
    title: 'Atendimento registrado e confirmação mais simples',
    text: 'Use prontuário básico e confirmações por link para validar o fluxo real sem depender de improviso a cada atendimento.',
    image: prontuarioImage,
    icon: ClipboardList,
  },
] as const;

const FLOW_STEPS = [
  {
    title: '1. Crie seu acesso e comece sem travar a agenda',
    text: 'Você ativa os 7 dias grátis do Medainer Solo e já entra na plataforma para testar sem parar sua rotina.',
  },
  {
    title: '2. Coloque consultas, pacientes e prontuários para rodar no mesmo lugar',
    text: 'Organize agenda, cadastros e registros do dia a dia para atender sem depender de papel, recado solto ou informação espalhada.',
  },
  {
    title: '3. Veja se sua rotina fica mais leve entre um atendimento e outro',
    text: 'Perceba na prática se o consultório ganha mais clareza para confirmar horários, encontrar informações rápido e trabalhar com menos correria.',
  },
] as const;

const PLAN_CARDS = [
  {
    name: 'Medainer Solo',
    price: 'R$ 99/mês',
    subtitle: 'Plano de entrada',
    text: 'Para sair do papel, organizar a base da clínica e continuar depois do trial sem pesar no caixa.',
    features: [
      'Até 1 profissional e até 2 usuários',
      'Agenda da clínica e dos profissionais',
      'Pacientes e prontuário básico',
      'Confirmação e remarcação por link',
      'Dashboard simples',
      'Onboarding self-service e suporte por chat ou e-mail',
    ],
    cta: 'Começar 7 dias grátis',
    href: 'register',
    featured: false,
  },
  {
    name: 'Medainer Clínica',
    price: 'R$ 297/mês',
    subtitle: 'Próximo passo',
    text: 'Para clínicas que já precisam de recepção, equipe, agenda, pacientes e financeiro funcionando no mesmo fluxo.',
    features: [
      'Tudo do Medainer Solo',
      'Financeiro básico',
      'Equipe e permissões',
      'Dashboard Saúde da Clínica',
      'Alertas operacionais e pacientes sem retorno',
      'Onboarding ao vivo e suporte em horário comercial',
    ],
    cta: 'Começar 7 dias grátis',
    href: 'register',
    featured: true,
  },
  {
    name: 'Medainer Automação',
    price: 'R$ 497/mês',
    subtitle: 'Upgrade natural',
    text: 'Para clínicas em que o WhatsApp já virou gargalo e o time precisa reduzir trabalho manual, no-show e remarcações.',
    features: [
      'Tudo do Medainer Clínica',
      'Agente no WhatsApp',
      'Confirmação, remarcação e lembretes automáticos',
      'Reativação de pacientes e fila de encaixe',
      'Suporte prioritário',
    ],
    cta: 'Começar 7 dias grátis',
    href: 'register',
    featured: false,
  },
] as const;

const FAQ_ITEMS = [
  {
    q: 'O que eu ativo hoje nesta página?',
    a: 'Você ativa os 7 dias grátis do Medainer Solo. O objetivo desta página é colocar a sua clínica para testar a rotina real sem cartão e sem depender de demo.',
  },
  {
    q: 'O que minha clínica testa nesse período?',
    a: 'Agenda, pacientes, prontuário básico, confirmações por link e dashboard simples. A ideia é sentir se a clínica sai do improviso no dia a dia, não apenas assistir a uma apresentação.',
  },
  {
    q: 'O financeiro faz parte da avaliação?',
    a: 'Não como proposta principal do Solo. O financeiro entra a partir do Medainer Clínica, que é o próximo passo para clínicas com equipe e operação mais completa.',
  },
  {
    q: 'Quanto custa continuar depois da avaliação?',
    a: 'Medainer Solo custa R$ 99/mês. Se a clínica precisar de financeiro, equipe e mais visão operacional, o Medainer Clínica custa R$ 297/mês. O Medainer Automação custa R$ 497/mês.',
  },
  {
    q: 'Quando vale subir para Clínica ou Automação?',
    a: 'Vale subir para Clínica quando a operação já envolve recepção, mais de um profissional ou necessidade de financeiro. A Automação entra quando o WhatsApp começa a gerar muito retrabalho com confirmações, remarcações e pacientes sem retorno.',
  },
  {
    q: 'Posso falar com alguém antes de me cadastrar?',
    a: 'Sim. Se quiser tirar uma dúvida rápida antes de ativar o trial, você pode falar com o time comercial pelo WhatsApp.',
  },
] as const;

function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer?.push({ event: eventName, ...payload });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  href,
  trackEventName,
  trackPayload,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  href?: string;
  trackEventName?: string;
  trackPayload?: Record<string, unknown>;
}) => {
  const baseStyles =
    'inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-6 py-3.5 text-center text-sm font-semibold transition-all duration-300';
  const variants = {
    primary: 'bg-brand-primary text-white shadow-[0_16px_32px_rgba(59,130,246,0.18)] hover:bg-brand-primary-strong',
    secondary: 'bg-brand-green text-white shadow-[0_16px_32px_rgba(82,163,127,0.18)] hover:bg-brand-green-strong',
    outline: 'border border-brand-line bg-white text-brand-primary hover:border-brand-primary hover:bg-brand-primary-soft',
    ghost: 'text-brand-primary hover:bg-brand-primary-soft',
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
  title,
  subtitle,
  centered = true,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}) => (
  <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
    {subtitle ? (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`inline-block text-[11px] font-semibold uppercase tracking-[0.22em] ${
          dark ? 'text-white/75' : 'text-brand-green'
        }`}
      >
        {subtitle}
      </motion.span>
    ) : null}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
        dark ? 'text-white' : 'text-brand-ink'
      }`}
    >
      {title}
    </motion.h2>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-line py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="group flex w-full items-center justify-between text-left">
        <span className="text-lg font-medium text-brand-ink transition-colors group-hover:text-brand-primary">
          {question}
        </span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="h-5 w-5 text-brand-green" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 leading-relaxed text-brand-muted">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export function TrialPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const appRegisterUrl = buildTrackedUrl(APP_REGISTER_URL);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-page font-sans text-brand-ink selection:bg-brand-primary selection:text-white">
      <LandingHeader isScrolled={isScrolled} trackEvent={trackEvent} />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-primary-soft blur-3xl" />
        <div className="absolute bottom-8 right-0 h-56 w-56 rounded-full bg-brand-green-soft blur-3xl" />

        <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-xl">
              <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.02] text-brand-ink sm:text-5xl lg:text-6xl">
                Teste o Medainer por 7 dias e pare de tocar a clínica no improviso.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
                Organize agenda, pacientes e prontuário em um só lugar para reduzir recado solto, informação perdida e correria no dia a dia.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  variant="primary"
                  href={appRegisterUrl}
                  className="px-8 py-4 text-base"
                  trackEventName="click_checkout"
                  trackPayload={{ source: 'hero_primary', plan: 'medainer solo' }}
                >
                  Começar 7 dias grátis
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {HERO_HIGHLIGHTS.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 rounded-xl border border-brand-line bg-white/90 px-4 py-4 text-sm text-brand-muted shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="rounded-[24px] border border-brand-line bg-white p-3 shadow-[0_32px_80px_rgba(59,130,246,0.10)] sm:p-4">
              <div className="overflow-hidden rounded-[18px] border border-brand-line bg-brand-panel">
                <img src={dashboardGeralImage} alt="Dashboard do Medainer" className="aspect-[16/10] w-full object-cover object-top" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-panel py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <SectionHeading
            subtitle="O que você ativa hoje"
            title="Você elimina o que mais pesa na rotina da clínica"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {EVALUATION_FEATURES.map((item) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[20px] border border-brand-line bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.text}</p>
                <div className="mt-5 overflow-hidden rounded-[18px] border border-brand-line bg-brand-panel">
                  <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover object-top" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <SectionHeading
            subtitle="Como funciona na prática"
            title="Você testa 7 dias grátis no ritmo real dos seus atendimentos"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {FLOW_STEPS.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[20px] border border-brand-line bg-brand-panel p-7 shadow-sm"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">Passo {index + 1}</p>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="bg-brand-page py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <SectionHeading
            subtitle="Depois do trial"
            title="Escolha o plano para testar grátis"
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.1fr_0.95fr]">
            {PLAN_CARDS.map((plan) => {
              const href = plan.href === 'register' ? appRegisterUrl : WHATSAPP_URL;
              const trackEventName = plan.href === 'register' ? 'click_checkout' : 'click_whatsapp';

              return (
                <motion.article
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col rounded-[24px] border p-8 shadow-sm ${
                    plan.featured
                      ? 'border-brand-primary bg-white shadow-[0_24px_60px_rgba(59,130,246,0.10)]'
                      : 'border-brand-line bg-white'
                  }`}
                >
                  <div className={`mb-8 border-b pb-6 ${plan.featured ? 'border-brand-primary/15' : 'border-brand-line'}`}>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                        plan.featured ? 'text-brand-primary' : 'text-brand-green'
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-ink">{plan.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">{plan.text}</p>
                  </div>

                  <div className="mb-8 pt-1">
                    <span className="font-serif text-4xl font-semibold text-brand-ink">{plan.price}</span>
                    <p className="mt-3 text-sm text-brand-muted">
                      {plan.featured
                        ? 'Faz sentido quando o trial mostrar que a clínica já precisa de mais estrutura.'
                        : plan.name === 'Medainer Solo'
                          ? 'Você começa com 7 dias grátis e continua só se fizer sentido.'
                          : 'Entra quando a base já estiver organizada e o gargalo for o WhatsApp.'}
                    </p>
                  </div>

                  <ul className="mb-10 flex-grow space-y-4">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brand-muted">
                        <Check className={`mt-0.5 h-5 w-5 shrink-0 ${plan.featured ? 'text-brand-primary' : 'text-brand-green'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-4">
                    <Button
                      variant={plan.featured ? 'primary' : 'outline'}
                      href={href}
                      className="w-full"
                      trackEventName={trackEventName}
                      trackPayload={{ source: `plan_${plan.name.toLowerCase()}` }}
                    >
                      {plan.cta}
                    </Button>
                    <Button
                      variant="ghost"
                      href={WHATSAPP_URL}
                      className="w-full text-xs"
                      trackEventName="click_whatsapp"
                      trackPayload={{ source: `plan_support_${plan.name.toLowerCase()}` }}
                    >
                      ou falar com um consultor
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section className="bg-brand-panel py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
              <img src={financeiroImage} alt="Financeiro do Medainer Clínica" className="w-full object-cover" />
            </div>

            <div>
              <SectionHeading
                subtitle="Se precisar de mais controle"
                title="O Solo tira do improviso. O Clínica entra quando a operação pede recepção, equipe e financeiro."
                centered={false}
              />
              <div className="mt-5 space-y-4 text-brand-muted">
                <p>
                  Se a clínica já tem recepção, mais de um profissional ou precisa enxergar melhor receita, faltas e pacientes sem retorno, o melhor encaixe passa a ser o Medainer Clínica.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: 'Financeiro básico',
                    desc: 'Receita, lançamentos e visão financeira entram a partir do plano Clínica.',
                  },
                  {
                    title: 'Equipe e permissões',
                    desc: 'Mais controle para recepção, profissionais e rotina compartilhada.',
                  },
                  {
                    title: 'Painel mais acionável',
                    desc: 'Alertas operacionais, saúde da clínica e pacientes sem retorno para agir mais rápido.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-brand-line bg-white p-4">
                    <p className="font-semibold text-brand-ink">{item.title}</p>
                    <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                subtitle="Se o gargalo for o WhatsApp"
                title="Depois de organizar a base, a automação entra para cortar retrabalho, no-show e remarcações."
                centered={false}
              />

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  'Confirmações e remarcações manuais demais para a recepção.',
                  'Pacientes sem retorno e agenda com janelas ociosas.',
                  'No-show alto e muito retrabalho para responder mensagens.',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-brand-line bg-brand-panel p-4 text-sm text-brand-muted">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                Nessa fase, o Medainer Automação passa a fazer sentido porque reduz confirmação manual, remarcações, lembretes e esforço da recepção no WhatsApp.
              </p>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-brand-line bg-white p-4 shadow-sm">
              <img src={clinicTeamImage} alt="Equipe clínica usando o Medainer" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section> */}

      <section id="faq" className="bg-brand-panel py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading subtitle="FAQ" title="O que a clínica normalmente quer saber antes de ativar os 7 dias grátis." />

            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <FAQItem question={item.q} answer={item.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[980px] px-4 text-center sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">Está preparado?</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Ative os 7 dias grátis e veja a clínica funcionar com menos improviso
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              Sem cartão de crédito. Você testa na rotina real e cancela a qualquer momento.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="primary"
                href={appRegisterUrl}
                className="px-8 py-4 text-base"
                trackEventName="click_checkout"
                trackPayload={{ source: 'final_cta', plan: 'medainer solo' }}
              >
                Começar 7 dias grátis
              </Button>
              <Button
                variant="outline"
                href={WHATSAPP_URL}
                className="px-8 py-4 text-base"
                trackEventName="click_whatsapp"
                trackPayload={{ source: 'final_cta' }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Tirar dúvida antes de testar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />

      <motion.a
        href={WHATSAPP_URL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => trackEvent('click_whatsapp', { source: 'floating_button' })}
        className="group fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
        <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-xl border border-brand-line bg-white px-4 py-2 text-sm font-bold text-brand-ink opacity-0 shadow-xl transition-opacity group-hover:opacity-100 sm:block">
          Tirar dúvida antes de testar
        </span>
      </motion.a>
    </div>
  );
}
