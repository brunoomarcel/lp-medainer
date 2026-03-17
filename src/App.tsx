/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Clock,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import clinicTeamImage from './assets/images/clinic-team.png';
import symbolMedainerImage from './assets/images/symbol-medainer.png';
import dashboardGeralImage from './assets/images/dash-geral.png';
import agendaImage from './assets/images/agenda.jpg';
import pacientesImage from './assets/images/pacientes.jpg';
import prontuarioImage from './assets/images/prontuario.jpg';
import financeiroImage from './assets/images/financeiro.jpg';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_PHONE = '5579999805993';
const REGISTER_URL = 'https://app.medainer.com.br/register';

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

const TRIAL_WHATSAPP_URL = buildWhatsAppUrl('Olá, quero solicitar um teste assistido de 7 dias do Medainer');
const TRIAL_URL = (import.meta.env.VITE_TRIAL_URL as string | undefined)?.trim() || REGISTER_URL;
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';
const LGPD_URL = (import.meta.env.VITE_LGPD_URL as string | undefined)?.trim() || '/lgpd';
const HERO_YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/1K2zYpofJUk?rel=0';

function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, payload);
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  trackEventName,
  trackPayload
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  className?: string;
  href?: string;
  onClick?: () => void;
  trackEventName?: string;
  trackPayload?: Record<string, unknown>;
}) => {
  const baseStyles =
    'inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-full font-medium text-center transition-all duration-300 active:scale-95 cursor-pointer';
  const variants = {
    primary: 'bg-brand-petroleum text-white hover:bg-brand-petroleum/90 shadow-lg shadow-brand-petroleum/20',
    secondary: 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20',
    outline: 'border-2 border-brand-petroleum text-brand-petroleum hover:bg-brand-petroleum hover:text-white',
    ghost: 'text-brand-petroleum hover:bg-brand-petroleum/5',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-lg shadow-[#25D366]/20'
  };

  const handleClick = () => {
    if (trackEventName) {
      trackEvent(trackEventName, trackPayload);
    }
    onClick?.();
  };

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  dark = false
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-block text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 ${dark ? 'text-brand-accent' : 'text-brand-green'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight ${dark ? 'text-white' : 'text-brand-graphite'}`}
    >
      {title}
    </motion.h2>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-graphite/10 py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between text-left group">
        <span className="text-lg font-medium text-brand-graphite group-hover:text-brand-petroleum transition-colors">{question}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-brand-green" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-brand-graphite/70 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-petroleum selection:text-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={symbolMedainerImage} alt="Símbolo Medainer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain" />
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-brand-petroleum">Medainer</span>
          </div>

          <div className="hidden sm:flex">
            <Button
              variant="primary"
              href="#planos"
              className="px-6 py-2.5"
              trackEventName="view_pricing"
              trackPayload={{ source: 'header' }}
            >
              Assinar agora
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-36 lg:pt-40 md:pb-24 lg:pb-32">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-sand/30 rounded-l-[100px] hidden lg:block" />
        <div className="absolute top-1/4 left-4 sm:left-10 -z-10 w-48 h-48 sm:w-64 sm:h-64 bg-brand-green/5 blur-3xl rounded-full" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-6 md:mb-8">
                <ShieldCheck className="w-4 h-4" />
                SaaS de gestão para clínicas
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-brand-graphite mb-6 md:mb-8 text-balance">
                Menos caos na recepção. <span className="text-brand-green italic">Mais controle</span> para a sua clínica.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-brand-graphite/70 mb-8 md:mb-10 max-w-xl leading-relaxed">
                Centralize agenda, pacientes, prontuário, financeiro e automações no WhatsApp em uma única plataforma.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <Button
                  variant="primary"
                  href={TRIAL_URL}
                  className="px-8 sm:px-10 py-4 text-base sm:text-lg"
                  trackEventName="click_trial"
                  trackPayload={{ source: 'hero_primary' }}
                >
                  Testar o Medainer por 7 dias
                </Button>
                <Button
                  variant="outline"
                  href="#planos"
                  className="px-8 sm:px-10 py-4 text-base sm:text-lg"
                  trackEventName="view_pricing"
                  trackPayload={{ source: 'hero_secondary_signup' }}
                >
                  Assinar agora
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: Calendar, text: 'Teste assistido de 7 dias' },
                  { icon: Users, text: 'Implantação guiada para a equipe' },
                  { icon: ClipboardList, text: 'Suporte humano no uso inicial' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-brand-graphite/60">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green">
                      <item.icon className="w-4 h-4" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div className="relative z-10 overflow-hidden rounded-[28px] border-4 border-white bg-brand-graphite shadow-2xl sm:border-8">
                <div className="aspect-video w-full">
                  <iframe
                    src={HERO_YOUTUBE_EMBED_URL}
                    title="Apresentacao do Medainer"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 right-4 lg:-top-10 lg:-right-10 z-20 glass-card p-4 sm:p-6 rounded-2xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-graphite/50 font-bold uppercase tracking-wider">Visão operacional</p>
                    <p className="text-xl font-serif font-bold text-brand-petroleum">em tempo real</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 left-4 lg:-bottom-10 lg:-left-10 z-20 glass-card p-4 sm:p-6 rounded-2xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-graphite/50 font-bold uppercase tracking-wider">Atendimento</p>
                    <p className="text-xl font-serif font-bold text-brand-petroleum">mais rápido</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-graphite text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Dor da Operação"
            title="O caos da recepção trava a rotina da clínica."
            centered={true}
            dark={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Agenda desorganizada',
                desc: 'Encaixes, faltas e mudanças de horário viram correria e conflito de agenda.'
              },
              {
                title: 'WhatsApp sobrecarregado',
                desc: 'A recepção perde tempo com confirmação manual e mensagens repetidas.'
              },
              {
                title: 'Retrabalho diário',
                desc: 'A mesma informação é lançada em planilha, papel e conversa separada.'
              },
              {
                title: 'Falta de visão operacional',
                desc: 'Sem dados consolidados, decisões de rotina e financeiro ficam no escuro.'
              },
              {
                title: 'Informação descentralizada',
                desc: 'Recepção, profissionais e gestão consultam fontes diferentes e perdem contexto.'
              },
              {
                title: 'Crescimento sem padrão',
                desc: 'Com mais pacientes e equipe, a operação fica mais pesada e menos previsível.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-sand/20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Produto na Prática"
            title="Tudo da clínica em um só lugar."
            centered={true}
          />

          <div className="grid gap-6 xl:grid-cols-12 xl:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] bg-brand-petroleum p-4 sm:p-6 shadow-2xl shadow-brand-petroleum/10 xl:col-span-7"
            >
              <div className="mb-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-bold">Visão de gestão</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-serif text-white">Dashboard geral da clínica</h3>
              </div>
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                Acompanhe ocupação, pendências e indicadores operacionais em tempo real para tomar decisões com mais clareza.
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 xl:h-[540px]">
                <img src={dashboardGeralImage} alt="Dashboard geral do Medainer" className="h-full w-full object-cover object-top" />
              </div>
            </motion.div>

            <div className="grid gap-6 xl:col-span-5 xl:grid-rows-2">
              {[
                {
                  title: 'Agenda e recepção',
                  text: 'Organize encaixes, confirmações e reagendamentos com visão completa da agenda e menos conflito de horários.',
                  image: agendaImage
                },
                {
                  title: 'Pacientes e cadastro',
                  text: 'Centralize dados e histórico para recepção, gestão e equipe clínica trabalharem com o mesmo contexto.',
                  image: pacientesImage
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-[32px] border border-brand-graphite/8 bg-white p-4 sm:p-5 shadow-sm xl:flex xl:flex-col"
                >
                  <div className="mb-4">
                    <h3 className="mt-2 text-2xl font-serif text-brand-graphite">{item.title}</h3>
                  </div>
                  <div className="mb-4 rounded-2xl bg-brand-offwhite p-4 text-sm text-brand-graphite/70">{item.text}</div>
                  <div className="overflow-hidden rounded-[22px] border border-brand-graphite/8 bg-brand-offwhite xl:mt-auto xl:h-[220px]">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover object-top" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {[
              {
                title: 'Prontuário digital',
                text: 'Registro clínico disponível no atendimento, sem perda de informação e sem depender de anotações soltas.',
                image: prontuarioImage
              },
              {
                title: 'Financeiro integrado',
                text: 'Receitas e despesas no mesmo sistema da operação, com visão clara do que está entrando, saindo e pendente.',
                image: financeiroImage
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-brand-graphite/8 bg-white p-5 sm:p-6 shadow-sm">
                <p className="mt-3 text-xl font-serif text-brand-graphite">{item.title}</p>
                <p className="mt-4 text-sm text-brand-graphite/70">{item.text}</p>
                <div className="mt-4 overflow-hidden rounded-[22px] border border-brand-graphite/8 bg-brand-offwhite lg:h-[300px]">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover object-top" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-petroleum text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Teste Assistido"
            title="Teste o Medainer por 7 dias."
            centered={true}
            dark={true}
          />

          <p className="mx-auto mb-14 max-w-3xl text-center text-lg text-white/70">
            Entendemos sua rotina, configuramos o essencial e ajudamos a equipe a testar o sistema no dia a dia.
          </p>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 relative">
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/10 hidden xl:block" />

            {[
              { step: '01', title: 'Solicite o teste', desc: 'Você envia o contexto da clínica e entendemos se o Medainer faz sentido para seu cenário.' },
              { step: '02', title: 'Configuramos o essencial', desc: 'Agenda, serviços, acessos e fluxo inicial ficam alinhados à operação que sua equipe já usa.' },
              { step: '03', title: 'Treinamos por função', desc: 'Recepção, profissionais e gestão entram no sistema sabendo o que fazer desde o primeiro acesso.' },
              { step: '04', title: 'Valide com suporte humano', desc: 'Nos primeiros dias, acompanhamos dúvidas e ajustes para a clínica avaliar com segurança.' }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-accent text-brand-petroleum flex items-center justify-center text-2xl font-serif font-bold mx-auto mb-8 shadow-lg shadow-brand-accent/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif font-medium mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              href={TRIAL_URL}
              className="px-10 md:px-12 py-4 text-base sm:text-lg"
              trackEventName="click_trial"
              trackPayload={{ source: 'trial_section' }}
            >
              Solicitar teste de 7 dias
            </Button>
            <Button
              variant="outline"
              href="#planos"
              className="px-10 md:px-12 py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-graphite"
              trackEventName="view_pricing"
              trackPayload={{ source: 'trial_section_signup' }}
            >
              Assinar agora
            </Button>
          </div>
        </div>
      </section>

      <section id="planos" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading subtitle="Oferta" title="Escolha seu plano." centered={true} />

          <p className="text-center max-w-3xl mx-auto -mt-4 mb-10 text-base md:text-lg text-brand-graphite/60 leading-relaxed">
            Escolha o Essencial para centralizar a operação da clínica ou o Medainer IA para automatizar o WhatsApp e reduzir o trabalho da recepção.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Medainer Essencial',
                price: 'R$ 297',
                subtitle: 'Operação organizada',
                text: 'Para clínicas que querem centralizar agenda, pacientes, prontuário e financeiro em um único sistema.',
                features: [
                  'Agenda da clínica e dos profissionais',
                  'Pacientes, prontuário e financeiro integrado',
                  'Equipe e perfis de acesso',
                  'Até 5 usuários',
                  'Até 3 profissionais',
                  'Suporte humano em horário comercial'
                ],
                featured: false
              },
              {
                name: 'Medainer IA',
                price: 'R$ 597',
                subtitle: 'Operação + automação',
                text: 'Para clínicas com recepção sobrecarregada e alto volume de confirmações e remarcações no WhatsApp.',
                features: [
                  'Tudo do Medainer Essencial',
                  'Agente IA de atendimento no WhatsApp',
                  'Confirmação, remarcação e lembretes automáticos',
                  'Envio automático de links e orientações',
                  'Até 8 usuários',
                  'Até 6 profissionais',
                  'Suporte prioritário'
                ],
                featured: true
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] flex flex-col ${
                  plan.featured
                    ? 'bg-brand-petroleum text-white lg:scale-105 shadow-2xl shadow-brand-petroleum/20 z-10'
                    : 'bg-brand-offwhite border border-brand-graphite/5'
                }`}
              >
                <div className="mb-8">
                  <p
                    className={`text-[11px] uppercase tracking-[0.22em] font-bold mb-4 ${
                      plan.featured ? 'text-brand-accent' : 'text-brand-green'
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                  <h3 className="text-2xl font-serif font-medium mb-2">{plan.name}</h3>
                  <p className={plan.featured ? 'text-white/60 text-sm' : 'text-brand-graphite/50 text-sm'}>{plan.text}</p>
                </div>
                <div className="mb-8">
                  <span className={`text-4xl font-serif font-bold ${plan.featured ? 'text-brand-accent' : 'text-brand-petroleum'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.featured ? 'text-white/60 ml-2' : 'text-brand-graphite/50 ml-2'}>/mês</span>
                  <p className={`mt-3 text-sm ${plan.featured ? 'text-white/70' : 'text-brand-graphite/60'}`}>
                    Teste assistido disponível antes da assinatura.
                  </p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${plan.featured ? 'text-white/80' : 'text-brand-graphite/70'}`}>
                      <Check className={`w-5 h-5 shrink-0 ${plan.featured ? 'text-brand-accent' : 'text-brand-green'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="space-y-4">
                  <Button
                    variant={plan.featured ? 'secondary' : 'primary'}
                    href={TRIAL_URL}
                    className="w-full sm:w-full"
                    trackEventName="click_trial"
                    trackPayload={{ source: `plan_trial_${plan.name.toLowerCase()}` }}
                  >
                    Testar grátis
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-brand-graphite/10 bg-brand-offwhite/40">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-brand-graphite/10 text-left text-brand-graphite/70">
                  <th className="px-5 py-4 font-semibold">Comparativo</th>
                  <th className="px-5 py-4 font-semibold">Medainer Essencial</th>
                  <th className="px-5 py-4 font-semibold">Medainer IA</th>
                </tr>
              </thead>
              <tbody className="text-brand-graphite/80">
                {[
                  ['Preço', 'R$ 297/mês', 'R$ 597/mês'],
                  ['Teste assistido', 'Disponível', 'Disponível'],
                  ['Usuários', 'Até 5', 'Até 8'],
                  ['Profissionais', 'Até 3', 'Até 6'],
                  ['Automações no WhatsApp', 'Não incluídas', 'Incluídas'],
                  ['Suporte', 'Horário comercial', 'Prioritário']
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-brand-graphite/10 last:border-b-0">
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

      <section id="beneficios" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <SectionHeading
                subtitle="Resultados na Rotina"
                title="Mais controle para quem atende e para quem decide."
                centered={false}
              />

              <div className="space-y-8">
                {[
                  {
                    title: 'Agenda com menos conflito e mais produtividade',
                    desc: 'Visualize horários, encaixes e ocupação em poucos cliques para reduzir correria e retrabalho na recepção.',
                    icon: Calendar
                  },
                  {
                    title: 'Atendimento com histórico do paciente no mesmo fluxo',
                    desc: 'Recepção e equipe clínica acessam as mesmas informações sem depender de memória, papel ou conversa solta.',
                    icon: HeartPulse
                  },
                  {
                    title: 'Financeiro conectado à operação da clínica',
                    desc: 'Receitas e despesas ficam integradas à rotina de atendimento para leitura real de resultado.',
                    icon: LayoutDashboard
                  },
                  {
                    title: 'Automações de WhatsApp no Medainer IA',
                    desc: 'Confirmação, remarcação e lembretes automáticos reduzem trabalho manual e liberam tempo da recepção.',
                    icon: TrendingUp
                  }
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 sm:gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-medium text-brand-graphite mb-2">{benefit.title}</h4>
                      <p className="text-brand-graphite/60 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 sm:-inset-4 bg-brand-sand/50 rounded-[32px] sm:rounded-[40px] -z-10 rotate-3" />
              <img src={clinicTeamImage} alt="Equipe clínica usando o Medainer" className="rounded-[32px] sm:rounded-[40px] shadow-2xl w-full object-cover aspect-[4/5]" />
              <div className="absolute bottom-4 right-4 lg:bottom-10 lg:-right-10 glass-card p-5 sm:p-8 rounded-3xl shadow-xl max-w-[280px] sm:max-w-sm hidden md:block">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-4">Começo assistido</p>
                <p className="text-brand-graphite font-serif text-2xl leading-tight mb-5">Sua equipe valida o fluxo real com apoio humano.</p>
                <div className="space-y-3 text-sm text-brand-graphite/70">
                  {['Agenda e acessos configurados', 'Treinamento por função', 'Apoio nos primeiros dias'].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading subtitle="Confiança" title="Comece com segurança." centered={true} />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                label: 'Teste assistido',
                desc: 'Você não precisa decidir no escuro: a clínica valida aderência e rotina antes de avançar.'
              },
              {
                label: 'Implantação guiada',
                desc: 'Configuração e treinamento são alinhados ao fluxo real de recepção, gestão e equipe clínica.'
              },
              {
                label: 'Segurança e controle',
                desc: 'Acesso por perfil, isolamento por clínica e informações públicas de privacidade e LGPD.'
              }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white p-7 border border-brand-graphite/5 shadow-sm">
                <h4 className="text-xl font-serif text-brand-petroleum mb-3">{item.label}</h4>
                <p className="text-sm text-brand-graphite/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading subtitle="Perfil de Clínica" title="Para quem o Medainer faz sentido." centered={true} />

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-3xl border border-brand-green/20 bg-brand-green/5 p-7">
              <h3 className="text-2xl font-serif text-brand-graphite mb-4">Faz sentido para sua clínica quando você:</h3>
              <ul className="space-y-3 text-brand-graphite/80">
                {[
                  'Precisa centralizar agenda, pacientes, prontuário e financeiro em um único sistema.',
                  'Tem recepção e equipe clínica trabalhando no mesmo fluxo diário.',
                  'Quer reduzir retrabalho e ganhar controle operacional.',
                  'Quer validar a adoção com apoio humano antes de escalar o uso.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-brand-graphite/10 bg-brand-offwhite p-7">
              <h3 className="text-2xl font-serif text-brand-graphite mb-4">Não é a melhor escolha quando você:</h3>
              <ul className="space-y-3 text-brand-graphite/80">
                {[
                  'Busca apenas uma agenda simples sem gestão de operação.',
                  'Prefere manter recepção, atendimento e financeiro em ferramentas separadas.',
                  'Não quer padronizar processo de equipe e atendimento.',
                  'Não tem disponibilidade para participar do início da implantação.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-brand-petroleum shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading subtitle="Perguntas Frequentes" title="Dúvidas antes de começar." centered={true} />

            <div className="mt-12">
              {[
                {
                  q: 'Como funciona o teste assistido de 7 dias?',
                  a: 'Entendemos o cenário da clínica, configuramos o essencial e acompanhamos o uso inicial para sua equipe validar a aderência do Medainer na rotina real.'
                },
                {
                  q: 'Em quanto tempo minha clínica entra em operação?',
                  a: 'Em geral, em até 14 dias com implantação guiada, dependendo do volume de dados, da migração necessária e da disponibilidade da equipe.'
                },
                {
                  q: 'Minha equipe vai conseguir usar no dia a dia?',
                  a: 'Sim. O treinamento é feito por função, com foco no fluxo real de recepção, profissionais e gestão.'
                },
                {
                  q: 'Posso migrar dados que já tenho?',
                  a: 'Sim. Avaliamos seu cenário e definimos a melhor estratégia de migração para a clínica.'
                },
                {
                  q: 'Como funciona suporte?',
                  a: 'O suporte é humano e varia conforme o plano contratado, com apoio na implantação e na rotina operacional.'
                },
                {
                  q: 'Qual a diferença entre Medainer Essencial e Medainer IA?',
                  a: 'O Essencial organiza agenda, pacientes, prontuário e financeiro em um único sistema. O Medainer IA inclui tudo do Essencial e adiciona automações no WhatsApp, como confirmação, remarcação, lembretes e envio de links.'
                },
                {
                  q: 'Como funciona segurança e LGPD?',
                  a: 'A plataforma opera com isolamento por clínica e controle de acesso por perfil. Termos, privacidade e informações de tratamento de dados são apresentados no processo comercial e no ambiente publicado.'
                }
              ].map((item) => (
                <React.Fragment key={item.q}>
                  <FAQItem question={item.q} answer={item.a} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-graphite text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium mb-6 md:mb-8 leading-tight">
              Teste ou assine agora.
            </h2>
            <p className="text-lg md:text-xl text-white/70">
              Comece pelo teste de 7 dias ou siga direto para o plano ideal da sua clínica.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              href={TRIAL_URL}
              className="px-10 md:px-12 py-4 text-base sm:text-lg"
              trackEventName="click_trial"
              trackPayload={{ source: 'final_cta_primary' }}
            >
              Solicitar teste de 7 dias
            </Button>
            <Button
              variant="outline"
              href="#planos"
              className="px-10 md:px-12 py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-graphite"
              trackEventName="view_pricing"
              trackPayload={{ source: 'final_cta_secondary_signup' }}
            >
              Assinar agora
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-brand-graphite/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img src={symbolMedainerImage} alt="Símbolo Medainer" className="w-8 h-8 rounded-lg object-contain" />
              <span className="text-xl font-serif font-bold tracking-tight text-brand-petroleum">Medainer</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-brand-graphite/50">
              <a href={TERMS_URL} className="hover:text-brand-petroleum transition-colors">
                Termos de Uso
              </a>
              <a href={PRIVACY_URL} className="hover:text-brand-petroleum transition-colors">
                Privacidade
              </a>
              <a href={LGPD_URL} className="hover:text-brand-petroleum transition-colors">
                LGPD
              </a>
            </div>

            <p className="text-sm text-brand-graphite/40">© {new Date().getFullYear()} Medainer. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <motion.a
        href={TRIAL_URL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => trackEvent('click_trial', { source: 'floating_button' })}
        className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        <span className="absolute right-full mr-4 bg-white text-brand-graphite px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-brand-graphite/5 hidden sm:block">
          Pedir teste
        </span>
      </motion.a>
    </div>
  );
}
