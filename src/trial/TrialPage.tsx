import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Clock,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import clinicTeamImage from '../assets/images/clinic-team.png';
import symbolMedainerImage from '../assets/images/symbol-medainer.png';
import dashboardGeralImage from '../assets/images/dash-geral.png';
import agendaImage from '../assets/images/agenda.jpg';
import pacientesImage from '../assets/images/pacientes.jpg';
import prontuarioImage from '../assets/images/prontuario.jpg';
import financeiroImage from '../assets/images/financeiro.jpg';
import { buildTrackedUrl } from '../analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_URL =
  'https://wa.me/5579999805993?text=Ol%C3%A1%2C%20quero%20ativar%20o%20teste%20gr%C3%A1tis%20de%2015%20dias%20do%20Medainer%20Essencial';
const APP_REGISTER_URL =
  (import.meta.env.VITE_APP_REGISTER_URL as string | undefined)?.trim() || 'https://app.medainer.com.br/register';
const STRIPE_PRO_URL = (import.meta.env.VITE_STRIPE_PRO_URL as string | undefined)?.trim() || WHATSAPP_URL;
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';
const LGPD_URL = (import.meta.env.VITE_LGPD_URL as string | undefined)?.trim() || '/lgpd';

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
    'inline-flex w-full sm:w-auto items-center justify-center rounded-full px-6 py-3 text-center font-medium transition-all duration-300 active:scale-95 cursor-pointer';
  const variants = {
    primary: 'bg-brand-petroleum text-white hover:bg-brand-petroleum/90 shadow-lg shadow-brand-petroleum/20',
    secondary: 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20',
    outline: 'border-2 border-brand-petroleum text-brand-petroleum hover:bg-brand-petroleum hover:text-white',
    ghost: 'text-brand-petroleum hover:bg-brand-petroleum/5',
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
  <div className={`mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : 'text-left'} max-w-3xl`}>
    {subtitle ? (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] md:text-xs ${
          dark ? 'text-brand-accent' : 'text-brand-green'
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
      className={`font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl ${
        dark ? 'text-white' : 'text-brand-graphite'
      }`}
    >
      {title}
    </motion.h2>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-graphite/10 py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="group flex w-full items-center justify-between text-left">
        <span className="text-lg font-medium text-brand-graphite transition-colors group-hover:text-brand-petroleum">
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
            <p className="pt-4 leading-relaxed text-brand-graphite/70">{answer}</p>
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
    <div className="min-h-screen font-sans selection:bg-brand-petroleum selection:text-white">
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 py-4 shadow-sm backdrop-blur-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img src={symbolMedainerImage} alt="Símbolo Medainer" className="h-9 w-9 rounded-xl object-contain sm:h-10 sm:w-10" />
            <span className="font-serif text-xl font-bold tracking-tight text-brand-petroleum sm:text-2xl">Medainer</span>
          </div>

          <div className="hidden sm:flex">
            <Button
              variant="secondary"
              href={appRegisterUrl}
              className="px-6 py-2.5"
              trackEventName="click_checkout"
              trackPayload={{ source: 'header_trial', plan: 'medainer essencial' }}
            >
              Ativar teste grátis agora
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-36 lg:pt-40 md:pb-24 lg:pb-32">
        <div className="absolute right-0 top-0 -z-10 hidden h-full w-1/2 rounded-l-[100px] bg-brand-sand/30 lg:block" />
        <div className="absolute left-4 top-1/4 -z-10 h-48 w-48 rounded-full bg-brand-green/5 blur-3xl sm:left-10 sm:h-64 sm:w-64" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-brand-green sm:text-xs md:mb-8">
                <ShieldCheck className="h-4 w-4" />
                GESTÃO MÉDICA PARA CLÍNICAS E CONSULTÓRIOS
              </div>

              <h1 className="text-balance mb-6 font-serif text-4xl font-medium leading-[1.08] text-brand-graphite sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
                Teste o Medainer por 15 dias e organize a agenda de forma fácil.
              </h1>

              <p className="mb-8 max-w-xl text-base leading-relaxed text-brand-graphite/70 sm:text-lg md:mb-10 md:text-xl">
                Gerencie agenda, financeiro, prontuários e profissionais em um só lugar.
              </p>

              <div className="mb-10 flex flex-col gap-4 sm:flex-row md:mb-12">
                <Button
                  variant="primary"
                  href={appRegisterUrl}
                  className="px-8 py-4 text-base sm:px-10 sm:text-lg"
                  trackEventName="click_checkout"
                  trackPayload={{ source: 'hero_primary', plan: 'medainer essencial' }}
                >
                  Ativar teste grátis agora
                </Button>
                <Button
                  variant="outline"
                  href={WHATSAPP_URL}
                  className="px-8 py-4 text-base sm:px-10 sm:text-lg"
                  trackEventName="click_whatsapp"
                  trackPayload={{ source: 'hero_secondary' }}
                >
                  Falar com consultor
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                {[
                  { icon: Calendar, text: 'Sem cartão de crédito. Cancela quando quiser.' },
                  { icon: Users, text: 'Ative agora e teste com a equipe da clÃ­nica.' },
                  { icon: ClipboardList, text: 'Agenda, pacientes, prontuÃ¡rio bÃ¡sico e financeiro bÃ¡sico.' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm font-medium text-brand-graphite/60">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                      <item.icon className="h-4 w-4" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div className="overflow-hidden rounded-[28px] border-4 border-white bg-brand-graphite shadow-2xl sm:border-8">
                <img src={dashboardGeralImage} alt="Dashboard do Medainer" className="aspect-[16/10] w-full object-cover object-top" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card absolute -right-6 -top-6 hidden rounded-2xl p-5 md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-graphite/50">Trial</p>
                    <p className="font-serif text-xl font-bold text-brand-petroleum">sistema real</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="glass-card absolute -bottom-6 -left-6 hidden rounded-2xl p-5 md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-graphite/50">Período</p>
                    <p className="font-serif text-xl font-bold text-brand-petroleum">15 dias</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="O que sua clínica usa no trial"
            title="Veja o que o Medainer oferece"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Agenda que a recepção consegue usar',
                text: 'Horários, profissionais e visão do dia — sem planilha, sem recado solto, sem confusão.',
                image: agendaImage,
                icon: Calendar,
              },
              {
                title: 'Pacientes centralizados',
                text: 'Cadastro único para parar de repetir informação em caderninho, WhatsApp e memória da recepção.',
                image: pacientesImage,
                icon: UserCheck,
              },
              {
                title: 'Prontuário e financeiro básico',
                text: 'O suficiente para a clínica funcionar com controle — sem precisar de treinamento de semanas.',
                image: prontuarioImage,
                icon: LayoutDashboard,
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[32px] border border-brand-graphite/8 bg-brand-offwhite p-5 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-petroleum/8 text-brand-petroleum">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-serif text-brand-graphite">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-graphite/70">{item.text}</p>
                <div className="mt-5 overflow-hidden rounded-[24px] border border-brand-graphite/8 bg-white">
                  <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover object-top" />
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6">
            <div className="overflow-hidden rounded-[32px] border border-brand-graphite/8 bg-brand-offwhite p-6 shadow-sm">
              <img src={financeiroImage} alt="Financeiro integrado" className="rounded-[24px] border border-brand-graphite/8 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="section-padding bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Planos"
            title={`O trial te dá o Essencial.\nO Essencial já resolve.`}
          />

          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-brand-graphite/60 md:text-lg">
            Depois dos 15 dias, você escolhe continuar ou encerrar. Sem pegadinha, sem contrato.
          </p>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {[
              {
                name: 'Medainer Essencial',
                price: '15 dias grátis',
                subtitle: 'Oferta principal desta landing',
                text: 'Para clínicas que precisam de controle operacional real, sem depender de automação pesada pra começar.',
                afterPrice: 'Depois: R$ 297/mês — cancela quando quiser',
                features: [
                  'Agenda da clínica e dos profissionais',
                  'Pacientes, prontuário básico e financeiro básico',
                  'Equipe e acessos',
                  'Até 5 usuários e 3 profissionais',
                ],
                cta: 'Ativar teste grátis',
                href: appRegisterUrl,
                featured: true,
              },
              {
                name: 'Medainer IA',
                price: 'R$ 597/mês',
                subtitle: 'Próximo passo para clínicas com volume',
                text: 'Para quando o gargalo já está no volume de confirmações, remarcações e recados no WhatsApp.',
                afterPrice: 'Inclui tudo do Essencial',
                features: [
                  'Agente de agendamento por IA',
                  'Confirmação e remarcação por WhatsApp',
                  'Lembretes e envio de links',
                  'Até 8 usuários e 6 profissionais',
                ],
                cta: 'Falar sobre plano IA',
                href: STRIPE_PRO_URL,
                featured: false,
              },
            ].map((plan) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col rounded-[36px] p-8 sm:p-10 ${
                  plan.featured
                    ? 'bg-brand-petroleum text-white shadow-2xl shadow-brand-petroleum/15'
                    : 'border border-brand-graphite/8 bg-white'
                }`}
              >
                <div className="mb-8">
                  <p
                    className={`mb-4 text-[11px] font-bold uppercase tracking-[0.22em] ${
                      plan.featured ? 'text-brand-accent' : 'text-brand-green'
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-medium">{plan.name}</h3>
                  <p className={`mt-2 text-sm ${plan.featured ? 'text-white/65' : 'text-brand-graphite/55'}`}>{plan.text}</p>
                </div>

                <div className="mb-8">
                  <span className={`font-serif text-4xl font-bold ${plan.featured ? 'text-brand-accent' : 'text-brand-petroleum'}`}>
                    {plan.price}
                  </span>
                  <p className={`mt-2 text-sm ${plan.featured ? 'text-white/70' : 'text-brand-graphite/60'}`}>
                    {plan.afterPrice}
                  </p>
                </div>

                <ul className="mb-10 flex-grow space-y-4">
                  {plan.features.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${plan.featured ? 'text-white/80' : 'text-brand-graphite/70'}`}>
                      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${plan.featured ? 'text-brand-accent' : 'text-brand-green'}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <Button
                    variant={plan.featured ? 'secondary' : 'primary'}
                    href={plan.href}
                    className="w-full"
                    trackEventName="click_checkout"
                    trackPayload={{ source: `plan_${plan.name.toLowerCase()}` }}
                  >
                    {plan.cta}
                  </Button>
                  <Button
                    variant="ghost"
                    href={WHATSAPP_URL}
                    className={`w-full text-xs ${plan.featured ? 'text-white/75 hover:text-white' : ''}`}
                    trackEventName="click_whatsapp"
                    trackPayload={{ source: `plan_support_${plan.name.toLowerCase()}` }}
                  >
                    ou falar com consultor
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-[32px] border border-brand-graphite/8 shadow-sm">
              <img src={clinicTeamImage} alt="Equipe clínica usando o Medainer" className="aspect-[4/5] w-full object-cover" />
            </div>

            <div>
              <SectionHeading
                subtitle="O que muda na rotina"
                title="Fica mais claro onde a clínica ganha tempo e para de depender do improviso."
                centered={false}
              />
              <div className="space-y-4 text-brand-graphite/75">
                <p>Hoje a recepção costuma depender de planilha, recado solto, WhatsApp e memória. No teste, você compara isso com uma rotina mais organizada, no sistema.</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { title: 'Hoje: agenda espalhada', desc: 'No teste: horários, profissionais e visão do dia ficam no mesmo lugar, sem depender de planilha e recado.' },
                  { title: 'Hoje: paciente repete informação', desc: 'No teste: o cadastro fica centralizado, e a equipe para de procurar dado em WhatsApp, papel e memória.' },
                  { title: 'Hoje: financeiro anda separado', desc: 'No teste: o financeiro básico acompanha a operação e dá mais clareza do que entrou, saiu e ficou pendente.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-brand-graphite/10 bg-brand-offwhite p-4">
                    <p className="font-semibold text-brand-graphite">{item.title}</p>
                    <p className="mt-2 text-sm text-brand-graphite/65">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-padding bg-brand-sand/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading subtitle="FAQ" title="O que a clínica normalmente quer saber antes de começar." />

            {[
              {
                q: 'O que exatamente minha clínica testa nesses 15 dias?',
                a: 'O Medainer Essencial completo — agenda, pacientes, prontuário básico e financeiro básico. Não é uma demo guiada. É o sistema real, que você usa na rotina do dia a dia.',
              },
              {
                q: 'Quanto custa se eu quiser continuar?',
                a: 'R$ 297/mês no plano Essencial. Não tem contrato mínimo. Você pode cancelar a qualquer momento.',
              },
              {
                q: 'Essa landing é do plano IA também?',
                a: 'Não. Aqui o foco é o Medainer Essencial — para clínicas que precisam primeiro organizar a operação. O plano IA aparece como próximo passo, para quando fizer sentido.',
              },
              {
                q: 'Minha equipe precisa parar tudo para testar?',
                a: 'Não. Você pode ativar e configurar em paralelo, no seu ritmo. O onboarding é simples e não exige treinamento longo.',
              },
              {
                q: 'Posso falar com alguém antes de ativar o trial?',
                a: 'Sim. Tem um consultor disponível para tirar dúvidas antes da ativação, sem compromisso.',
              },
            ].map((item) => (
              <div key={item.q}>
                <FAQItem question={item.q} answer={item.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-graphite text-white section-padding">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-accent/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-green/10 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
              Se sua clínica precisa de ordem antes de automação, o teste é o próximo passo.
            </h2>
            <p className="mt-6 text-lg text-white/70 md:text-xl">
              15 dias com o sistema real. Você usa, sente e decide.
            </p>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="secondary"
                href={appRegisterUrl}
                className="px-10 py-4 text-base sm:text-lg md:px-12"
                trackEventName="click_checkout"
                trackPayload={{ source: 'final_cta', plan: 'medainer essencial' }}
              >
                Ativar teste grátis
              </Button>
              <Button
                variant="outline"
                href={WHATSAPP_URL}
                className="border-white px-10 py-4 text-base text-white hover:bg-white hover:text-brand-graphite sm:text-lg md:px-12"
                trackEventName="click_whatsapp"
                trackPayload={{ source: 'final_cta' }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com vendas
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-graphite/5 bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <img src={symbolMedainerImage} alt="Símbolo Medainer" className="h-8 w-8 rounded-lg object-contain" />
              <span className="font-serif text-xl font-bold tracking-tight text-brand-petroleum">Medainer</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-brand-graphite/50">
              <a href={TERMS_URL} className="transition-colors hover:text-brand-petroleum">Termos de Uso</a>
              <a href={PRIVACY_URL} className="transition-colors hover:text-brand-petroleum">Privacidade</a>
              <a href={LGPD_URL} className="transition-colors hover:text-brand-petroleum">LGPD</a>
            </div>

            <p className="text-sm text-brand-graphite/40">© {new Date().getFullYear()} Medainer. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <motion.a
        href={WHATSAPP_URL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => trackEvent('click_whatsapp', { source: 'floating_button' })}
        className="group fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
        <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-xl border border-brand-graphite/5 bg-white px-4 py-2 text-sm font-bold text-brand-graphite opacity-0 shadow-xl transition-opacity group-hover:opacity-100 sm:block">
          Falar com vendas
        </span>
      </motion.a>
    </div>
  );
}
