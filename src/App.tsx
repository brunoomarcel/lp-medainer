/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ChevronDown, 
  MessageCircle, 
  Calendar, 
  Users, 
  ClipboardList, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Menu,
  X,
  Star,
  Zap,
  LayoutDashboard,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dashboardPreviewImage from './assets/images/image-hero-2.gif';
import clinicTeamImage from './assets/images/clinic-team.png';
import symbolMedainerImage from './assets/images/symbol-medainer.png';
import dashboardGeralImage from './assets/images/dash-geral.png';
import agendaImage from './assets/images/agenda.jpg';
import pacientesImage from './assets/images/pacientes.jpg';
import prontuarioImage from './assets/images/prontuario.jpg';
import financeiroImage from './assets/images/financeiro.jpg';

// --- Constants & Links ---
const WHATSAPP_URL = "https://wa.me/5579999805993?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20Medainer";
const STRIPE_STARTER_URL = "#"; // Replace with real Stripe link
const STRIPE_PRO_URL = "#"; // Replace with real Stripe link
const STRIPE_SCALE_URL = "#"; // Replace with real Stripe link

const NAV_LINKS = [
  { name: 'Benefícios', href: '#beneficios' },
  { name: 'Funcionalidades', href: '#funcionalidades' },
  { name: 'Planos', href: '#planos' },
  { name: 'FAQ', href: '#faq' },
];

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  href, 
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'; 
  className?: string;
  href?: string;
  onClick?: () => void;
}) => {
  const baseStyles = "inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-full font-medium text-center transition-all duration-300 active:scale-95 cursor-pointer";
  const variants = {
    primary: "bg-brand-petroleum text-white hover:bg-brand-petroleum/90 shadow-lg shadow-brand-petroleum/20",
    secondary: "bg-brand-accent text-white hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20",
    outline: "border-2 border-brand-petroleum text-brand-petroleum hover:bg-brand-petroleum hover:text-white",
    ghost: "text-brand-petroleum hover:bg-brand-petroleum/5",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-lg shadow-[#25D366]/20",
  };

  const content = (
    <>
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
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
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-brand-graphite group-hover:text-brand-petroleum transition-colors">
          {question}
        </span>
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
            <p className="pt-4 text-brand-graphite/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-petroleum selection:text-white">
      
      {/* --- Header --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={symbolMedainerImage}
              alt="Símbolo Medainer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain"
            />
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-brand-petroleum">Medainer</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-brand-graphite/70 hover:text-brand-petroleum transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" href={WHATSAPP_URL} className="text-sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </Button>
            <Button variant="primary" href="#planos" className="text-sm px-8">
              Ver Planos
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-petroleum"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-brand-graphite/5 overflow-hidden"
            >
              <div className="flex flex-col p-4 sm:p-6 gap-4">
                {NAV_LINKS.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-brand-graphite"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="whatsapp" href={WHATSAPP_URL}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Falar no WhatsApp
                  </Button>
                  <Button variant="primary" href="#planos">
                    Ver Planos
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 md:pt-44 lg:pt-56 md:pb-24 lg:pb-32">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-sand/30 rounded-l-[100px] hidden lg:block" />
        <div className="absolute top-1/4 left-4 sm:left-10 -z-10 w-48 h-48 sm:w-64 sm:h-64 bg-brand-green/5 blur-3xl rounded-full" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-6 md:mb-8">
                <ShieldCheck className="w-4 h-4" />
                Sistema de gestão para clínicas e consultórios
              </div>
              <p className="text-sm sm:text-base text-brand-graphite/60 mb-4 max-w-2xl">
                Para clínicas médicas, odontológicas, de estética, psicologia e fisioterapia.
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-brand-graphite mb-6 md:mb-8 text-balance">
                Organize sua clínica com mais <span className="text-brand-green italic">controle, agilidade e previsibilidade.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-brand-graphite/70 mb-8 md:mb-10 max-w-xl leading-relaxed">
                O Medainer centraliza agenda, pacientes, prontuário, equipe e financeiro em um só sistema, facilitando a rotina da recepção, dos profissionais e da gestão.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <Button variant="primary" href="#planos" className="px-8 sm:px-10 py-4 text-base sm:text-lg">
                  Ver planos
                </Button>
                <Button variant="outline" href={WHATSAPP_URL} className="px-8 sm:px-10 py-4 text-base sm:text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com especialista
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: Calendar, text: "Agenda estruturada, sem ruído operacional" },
                  { icon: Users, text: "Equipe alinhada em um mesmo padrão" },
                  { icon: ClipboardList, text: "Dados clínicos e operacionais centralizados" },
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
              <div className="relative z-10 rounded-[28px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white">
                <img 
                  src={dashboardPreviewImage}
                  alt="Medainer Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
              {/* Floating UI elements for "premium" feel */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 right-4 lg:-top-10 lg:-right-10 z-20 glass-card p-4 sm:p-6 rounded-2xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-graphite/50 font-bold uppercase tracking-wider">Visão de gestão</p>
                    <p className="text-xl font-serif font-bold text-brand-petroleum">Tempo real</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 left-4 lg:-bottom-10 lg:-left-10 z-20 glass-card p-4 sm:p-6 rounded-2xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-graphite/50 font-bold uppercase tracking-wider">Recepção mais rápida</p>
                    <p className="text-xl font-serif font-bold text-brand-petroleum">Menos retrabalho</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-10 md:mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Agenda", value: "Confirmações, encaixes e faltas sob uma leitura clara" },
              { label: "Pacientes", value: "Cadastro, histórico e relacionamento em um único fluxo" },
              { label: "Equipe", value: "Permissões, rotina e produtividade com mais consistência" },
              { label: "Financeiro", value: "Receita e operação conectadas à visão gerencial" },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl border border-brand-graphite/8 bg-white/80 p-5 sm:p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-green mb-3">{item.label}</p>
                <p className="text-sm sm:text-base text-brand-graphite/70 leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Pain Points Section --- */}
      <section className="section-padding bg-brand-graphite text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="O Desafio da Rotina"
            title="Sem um sistema de gestão, a rotina da clínica fica mais lenta, confusa e difícil de controlar."
            centered={true}
            dark={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Agenda Desorganizada", 
                desc: "Horários se chocam, encaixes viram confusão e a recepção perde tempo tentando apagar incêndio." 
              },
              { 
                title: "Excesso de Mensagens", 
                desc: "O atendimento vira uma fila invisível. Mensagens se perdem, pacientes esfriam e oportunidades ficam no caminho." 
              },
              { 
                title: "Retrabalho Constante", 
                desc: "A mesma informação é digitada várias vezes em planilhas, papéis e conversas soltas, multiplicando erros." 
              },
              { 
                title: "Falta de Controle", 
                desc: "Você sente que a clínica trabalha muito, mas não enxerga com clareza produtividade, faltas e resultado." 
              },
              { 
                title: "Dados Espalhados", 
                desc: "Histórico clínico, dados cadastrais e observações ficam espalhados e a consulta perde contexto." 
              },
              { 
                title: "Crescimento Travado", 
                desc: "Sem processo, cada novo profissional aumenta a desorganização em vez de ampliar capacidade." 
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

      {/* --- Benefits Section --- */}
      <section id="beneficios" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <SectionHeading 
                subtitle="A Transformação"
                title="Com o Medainer, sua clínica ganha organização e clareza na operação."
                centered={false}
              />
              
              <div className="space-y-8">
                {[
                  { 
                    title: "Agenda com Clareza Total", 
                    desc: "Enxergue disponibilidade, encaixes, faltas e ocupação em uma visão prática para tomar decisão rápido.",
                    icon: Calendar
                  },
                  { 
                    title: "Atendimento Ágil e Humano", 
                    desc: "A recepção responde melhor, confirma mais rápido e não depende de memória ou anotações espalhadas.",
                    icon: HeartPulse
                  },
                  { 
                    title: "Gestão na Palma da Mão", 
                    desc: "Tenha leitura gerencial da operação sem depender de planilhas manuais ou fechamento tardio.",
                    icon: LayoutDashboard
                  },
                  { 
                    title: "Base Sólida para Crescer", 
                    desc: "Crie um padrão operacional que suporta mais pacientes, mais equipe e mais unidade sem perder controle.",
                    icon: TrendingUp
                  }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
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
              <img 
                src={clinicTeamImage}
                alt="Clínica Organizada" 
                className="rounded-[32px] sm:rounded-[40px] shadow-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute bottom-4 right-4 lg:bottom-10 lg:-right-10 glass-card p-5 sm:p-8 rounded-3xl shadow-xl max-w-[240px] sm:max-w-xs hidden md:block">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
                </div>
                <p className="text-brand-graphite font-medium italic mb-4">
                  "Antes a operação dependia de mensagens e memória. Hoje a equipe trabalha com processo."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-sand" />
                  <div>
                    <p className="text-sm font-bold">Equipe Medainer</p>
                    <p className="text-xs text-brand-graphite/50">Operação clínica estruturada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Product Showcase --- */}
      <section className="section-padding bg-brand-sand/20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Sistema Em Ação"
            title="Veja como o Medainer funciona na prática."
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
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-bold">Print 1</p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-serif text-white">Dashboard geral da clínica</h3>
                </div>
              </div>
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                Visão consolidada da operação, com indicadores, ocupação e leitura rápida do que exige atenção.
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 xl:h-[540px]">
                <img
                  src={dashboardGeralImage}
                  alt="Dashboard geral do Medainer"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </motion.div>

            <div className="grid gap-6 xl:col-span-5 xl:grid-rows-2">
              {[
                {
                  title: "Agenda e recepção",
                  text: "Sua recepção atende com mais velocidade porque tudo o que importa está organizado em um único fluxo.",
                  image: agendaImage,
                },
                {
                  title: "Pacientes e cadastro",
                  text: "Com os dados centralizados, a equipe encontra pacientes, histórico e informações essenciais sem perder tempo.",
                  image: pacientesImage,
                },
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
                    <p className="text-[11px] uppercase tracking-[0.22em] text-brand-green font-bold">Print {i + 2}</p>
                    <h3 className="mt-2 text-2xl font-serif text-brand-graphite">{item.title}</h3>
                  </div>
                  <div className="mb-4 rounded-2xl bg-brand-offwhite p-4 text-sm text-brand-graphite/70">
                    {item.text}
                  </div>
                  <div className="overflow-hidden rounded-[22px] border border-brand-graphite/8 bg-brand-offwhite xl:mt-auto xl:h-[220px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {[
              {
                label: "Print 4",
                title: "Prontuário digital",
                text: "No atendimento, o profissional encontra contexto clínico com rapidez e segurança.",
                image: prontuarioImage,
              },
              {
                label: "Print 5",
                title: "Financeiro e recebimentos",
                text: "O financeiro deixa de ficar separado da operação e passa a ser acompanhado com clareza todos os dias.",
                image: financeiroImage,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] border border-brand-graphite/8 bg-white p-5 sm:p-6 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-green font-bold">{item.label}</p>
                <p className="mt-3 text-xl font-serif text-brand-graphite">{item.title}</p>
                <p className="mt-4 text-sm text-brand-graphite/70">
                  {item.text}
                </p>
                {item.image && (
                  <div className="mt-4 overflow-hidden rounded-[22px] border border-brand-graphite/8 bg-brand-offwhite lg:h-[300px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="funcionalidades" className="section-padding bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="O que entregamos"
            title="Tudo o que sua clínica precisa para organizar a rotina e ganhar eficiência."
            centered={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: UserCheck, title: "Gestão de Pacientes", desc: "Cadastro completo, histórico consolidado e visão rápida de cada paciente." },
              { icon: Calendar, title: "Agenda Inteligente", desc: "Horários, salas e profissionais organizados sem conflito de operação." },
              { icon: Users, title: "Controle de Equipe", desc: "Permissões, responsáveis e produtividade sob um padrão único." },
              { icon: TrendingUp, title: "Financeiro Completo", desc: "Receitas, cobranças e leitura de resultado sem planilha paralela." },
              { icon: ClipboardList, title: "Prontuário Digital", desc: "Registro clínico estruturado para consultar durante o atendimento." },
              { icon: MessageCircle, title: "Apoio WhatsApp", desc: "Mais contexto para responder, confirmar e lembrar pacientes." },
              { icon: Zap, title: "Automações com IA", desc: "Atalhos e inteligência para reduzir tarefas repetitivas da equipe." },
              { icon: ShieldCheck, title: "Segurança de Dados", desc: "Base segura para operar com mais confiança e previsibilidade." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-graphite/5 hover:shadow-xl hover:shadow-brand-petroleum/5 transition-all duration-500"
              >
                  <div className="w-12 h-12 rounded-2xl bg-brand-petroleum/5 flex items-center justify-center text-brand-petroleum mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                <h3 className="text-lg font-bold text-brand-graphite mb-3">{feature.title}</h3>
                <p className="text-sm text-brand-graphite/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="section-padding bg-brand-petroleum text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="Passo a Passo"
            title="Como o Medainer ajuda sua clínica a sair do improviso."
            centered={true}
            dark={true}
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/10 hidden xl:block" />
            
            {[
              { step: "01", title: "Estruture", desc: "Organize profissionais, agenda, serviços e permissões com lógica operacional." },
              { step: "02", title: "Centralize", desc: "Reúna pacientes, histórico, atendimento e rotina da recepção em um só lugar." },
              { step: "03", title: "Padronize", desc: "A equipe passa a trabalhar com um fluxo claro e mais organizado." },
              { step: "04", title: "Acompanhe", desc: "Tenha mais visibilidade para tomar decisões e melhorar a operação." }
            ].map((item, i) => (
              <motion.div 
                key={i}
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
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 md:mt-20 text-center">
            <Button variant="secondary" href="#planos" className="px-10 md:px-12 py-4 text-base sm:text-lg">
              Escolher plano ideal
            </Button>
          </div>
        </div>
      </section>

      {/* --- Pricing Plans --- */}
      <section id="planos" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="Investimento"
            title="Escolha o plano ideal para o momento da sua clínica."
            centered={true}
          />

          <p className="text-center max-w-3xl mx-auto -mt-4 mb-10 text-base md:text-lg text-brand-graphite/60 leading-relaxed">
            Cada plano atende um nível diferente de operação, desde clínicas em organização até operações maiores.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-brand-offwhite border border-brand-graphite/5 flex flex-col"
            >
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-green font-bold mb-4">Base operacional</p>
                <h3 className="text-2xl font-serif font-medium text-brand-graphite mb-2">Starter</h3>
                <p className="text-brand-graphite/50 text-sm">Para clínicas que estão começando a organizar a operação com mais controle.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-serif font-bold text-brand-petroleum">R$ 297</span>
                <span className="text-brand-graphite/50 ml-2">/mês</span>
              </div>
              <p className="text-sm text-brand-graphite/65 leading-relaxed mb-8">
                O essencial para estruturar a rotina e sair do improviso.
              </p>
              <div className="mb-8 rounded-2xl bg-white p-4 text-sm text-brand-graphite/70 border border-brand-graphite/6">
                Ideal para: clínicas menores ou em fase inicial de organização.
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Agenda e gestão de pacientes",
                  "Prontuário digital organizado",
                  "Financeiro essencial",
                  "Até 3 usuários",
                  "Até 2 profissionais",
                  "Suporte em horário comercial"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-graphite/70">
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Button variant="primary" href={STRIPE_STARTER_URL} className="w-full">Começar com Starter</Button>
                <Button variant="ghost" href={WHATSAPP_URL} className="w-full text-xs">Falar com consultor</Button>
              </div>
            </motion.div>

            {/* Pro */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-brand-petroleum text-white flex flex-col relative lg:scale-105 shadow-2xl shadow-brand-petroleum/20 z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-petroleum px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Escolha estratégica
              </div>
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-bold mb-4">Alta performance</p>
                <h3 className="text-2xl font-serif font-medium mb-2">Pro</h3>
                <p className="text-white/50 text-sm">Para clínicas que precisam de mais velocidade, automação e visão gerencial.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-serif font-bold text-brand-accent">R$ 497</span>
                <span className="text-white/50 ml-2">/mês</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-8">
                O plano mais completo para profissionalizar a gestão e crescer com mais segurança.
              </p>
              <div className="mb-8 rounded-2xl bg-white/8 p-4 text-sm text-white/75 border border-white/10">
                Ideal para: clínicas em crescimento que precisam de mais controle e produtividade.
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Tudo do Starter",
                  "Automações com WhatsApp",
                  "Recursos com inteligência artificial",
                  "Até 8 usuários",
                  "Até 6 profissionais",
                  "Treinamento da equipe",
                  "Suporte prioritário"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Button variant="secondary" href={STRIPE_PRO_URL} className="w-full">Escolher Pro</Button>
                <Button variant="ghost" href={WHATSAPP_URL} className="w-full text-white/70 hover:text-white text-xs">Falar com especialista</Button>
              </div>
            </motion.div>

            {/* Scale */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-brand-offwhite border border-brand-graphite/5 flex flex-col"
            >
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-green font-bold mb-4">Expansão com controle</p>
                <h3 className="text-2xl font-serif font-medium text-brand-graphite mb-2">Scale</h3>
                <p className="text-brand-graphite/50 text-sm">Para clínicas maiores que precisam escalar sem perder controle da operação.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-serif font-bold text-brand-petroleum">R$ 897</span>
                <span className="text-brand-graphite/50 ml-2">/mês</span>
              </div>
              <p className="text-sm text-brand-graphite/65 leading-relaxed mb-8">
                Mais estrutura, mais suporte e mais capacidade para operações maiores.
              </p>
              <div className="mb-8 rounded-2xl bg-white p-4 text-sm text-brand-graphite/70 border border-brand-graphite/6">
                Ideal para: clínicas com mais profissionais, mais volume e operação mais complexa.
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Tudo do Pro",
                  "Até 20 usuários",
                  "Até 15 profissionais",
                  "Acompanhamento mensal",
                  "Treinamento avançado de equipe",
                  "Suporte dedicado"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-graphite/70">
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Button variant="primary" href={STRIPE_SCALE_URL} className="w-full">Escolher Scale</Button>
                <Button variant="ghost" href={WHATSAPP_URL} className="w-full text-xs">Falar com consultor</Button>
              </div>
            </motion.div>
          </div>
          
          <p className="text-center mt-12 text-brand-graphite/40 text-sm">
            Precisa de uma proposta personalizada? <a href={WHATSAPP_URL} className="text-brand-petroleum font-bold underline">Converse com nosso time no WhatsApp</a>.
          </p>
        </div>
      </section>

      {/* --- Credibility --- */}
      <section className="section-padding bg-brand-sand/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              subtitle="Confiança"
              title="Feito para clínicas que precisam de mais organização, controle e suporte."
              centered={true}
            />
            <p className="text-lg md:text-xl text-brand-graphite/60 mb-10 md:mb-12 leading-relaxed">
              O Medainer combina tecnologia, organização operacional e visão gerencial para ajudar sua clínica a trabalhar melhor no dia a dia.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: "Implantação Prática", desc: "Entrada guiada para colocar a clínica em operação com mais rapidez." },
                { label: "Mais Controle", desc: "Mais clareza para acompanhar agenda, equipe, pacientes e rotina." },
                { label: "Suporte Humano", desc: "Acompanhamento próximo para ajudar sua equipe a usar melhor o sistema." }
              ].map((item, i) => (
                <div key={i}>
                  <h4 className="text-lg font-bold text-brand-petroleum mb-2">{item.label}</h4>
                  <p className="text-sm text-brand-graphite/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading 
              subtitle="Dúvidas Frequentes"
              title="Perguntas comuns antes de contratar o Medainer."
              centered={true}
            />
            
            <div className="mt-12">
              {[
                { 
                  q: "O Medainer serve para qual tipo de clínica?", 
                  a: "O Medainer atende clínicas médicas, odontológicas, de psicologia, estética e outras operações de saúde que precisam organizar agenda, pacientes, equipe e gestão em um só sistema." 
                },
                { 
                  q: "É difícil começar a usar?", 
                  a: "Não. A implantação foi pensada para ser simples, com apoio próximo e uma experiência fácil para a equipe começar a usar." 
                },
                { 
                  q: "Minha equipe vai conseguir usar?", 
                  a: "Sim. O sistema foi pensado para recepção, profissionais e gestão trabalharem no mesmo fluxo, sem complexidade desnecessária." 
                },
                { 
                  q: "Posso contratar direto ou preciso falar com alguém?", 
                  a: "Você pode contratar direto ou falar com nosso time no WhatsApp para entender qual plano faz mais sentido para sua clínica." 
                },
                { 
                  q: "Existe suporte?", 
                  a: "Sim. O suporte é humano e acompanha sua equipe para garantir melhor uso do sistema no dia a dia." 
                },
                { 
                  q: "O sistema ajuda na organização da agenda?", 
                  a: "Sim. A agenda ajuda a reduzir conflitos, agiliza reagendamentos e melhora a visão da ocupação da clínica." 
                }
              ].map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="section-padding bg-brand-graphite text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium mb-6 md:mb-8 max-w-3xl mx-auto leading-tight">
            Sua clínica pode continuar no improviso ou ganhar uma rotina mais organizada e profissional.
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 md:mb-12 max-w-2xl mx-auto">
            Se você quer mais controle, mais agilidade e uma operação mais previsível, o Medainer é o próximo passo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" href="#planos" className="px-10 md:px-12 py-4 text-base sm:text-lg">
              Ver planos
            </Button>
            <Button variant="outline" href={WHATSAPP_URL} className="px-10 md:px-12 py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-graphite">
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 bg-white border-t border-brand-graphite/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img
                src={symbolMedainerImage}
                alt="Símbolo Medainer"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-xl font-serif font-bold tracking-tight text-brand-petroleum">Medainer</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-brand-graphite/50">
              <a href="#" className="hover:text-brand-petroleum transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-brand-petroleum transition-colors">Privacidade</a>
              <a href="#" className="hover:text-brand-petroleum transition-colors">Cookies</a>
            </div>
            
            <p className="text-sm text-brand-graphite/40">
              © {new Date().getFullYear()} Medainer. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Button --- */}
      <motion.a
        href={WHATSAPP_URL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        <span className="absolute right-full mr-4 bg-white text-brand-graphite px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-brand-graphite/5 hidden sm:block">
          Falar com Especialista
        </span>
      </motion.a>

    </div>
  );
}
