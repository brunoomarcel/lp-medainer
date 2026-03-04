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
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  Star,
  Zap,
  LayoutDashboard,
  Stethoscope,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dashboardPreviewImage from './assets/images/image-hero-2.gif';
import clinicTeamImage from './assets/images/clinic-team.png';
import symbolMedainerImage from './assets/images/symbol-medainer.png';

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
                Gestão Premium para Clínicas
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-brand-graphite mb-6 md:mb-8 text-balance">
                Organize sua clínica e tenha o <span className="text-brand-green italic">controle total</span> da sua operação.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-brand-graphite/70 mb-8 md:mb-10 max-w-xl leading-relaxed">
                Menos improviso na rotina, mais eficiência no atendimento. Agenda, pacientes e equipe em um só lugar, pensado para a realidade do seu consultório.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <Button variant="primary" href="#planos" className="px-8 sm:px-10 py-4 text-base sm:text-lg">
                  Ver Planos e Assinar
                </Button>
                <Button variant="outline" href={WHATSAPP_URL} className="px-8 sm:px-10 py-4 text-base sm:text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Especialista
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: Calendar, text: "Agenda Inteligente" },
                  { icon: Users, text: "Gestão de Equipe" },
                  { icon: ClipboardList, text: "Prontuário Digital" },
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
                    <p className="text-xs text-brand-graphite/50 font-bold uppercase tracking-wider">Eficiência</p>
                    <p className="text-xl font-serif font-bold text-brand-petroleum">+45%</p>
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
                    <p className="text-xs text-brand-graphite/50 font-bold uppercase tracking-wider">Tempo Salvo</p>
                    <p className="text-xl font-serif font-bold text-brand-petroleum">12h/semana</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Pain Points Section --- */}
      <section className="section-padding bg-brand-graphite text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="O Desafio da Rotina"
            title="Sua clínica sofre com o improviso do dia a dia?"
            centered={true}
            dark={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Agenda Desorganizada", 
                desc: "Horários sobrepostos, furos constantes e dificuldade para visualizar a disponibilidade real dos profissionais." 
              },
              { 
                title: "Excesso de Mensagens", 
                desc: "Sua recepção fica sobrecarregada com centenas de mensagens no WhatsApp sem um fluxo claro de atendimento." 
              },
              { 
                title: "Retrabalho Constante", 
                desc: "Informações repetidas em papéis, planilhas e sistemas que não se conversam, gerando erros e perda de tempo." 
              },
              { 
                title: "Falta de Controle", 
                desc: "Dificuldade em saber quem foi atendido, quem faltou e como está a saúde financeira da operação." 
              },
              { 
                title: "Dados Espalhados", 
                desc: "Históricos de pacientes perdidos em pastas físicas ou arquivos digitais desorganizados." 
              },
              { 
                title: "Crescimento Travado", 
                desc: "Você quer crescer, mas a operação atual não suporta mais volume sem gerar um caos administrativo." 
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
                title="Troque o caos pela organização absoluta."
                centered={false}
              />
              
              <div className="space-y-8">
                {[
                  { 
                    title: "Agenda com Clareza Total", 
                    desc: "Visualize sua rotina e da sua equipe de forma intuitiva, evitando conflitos e otimizando cada minuto do dia.",
                    icon: Calendar
                  },
                  { 
                    title: "Atendimento Ágil e Humano", 
                    desc: "Sua recepção ganha ferramentas para responder mais rápido e com mais qualidade, encantando o paciente.",
                    icon: HeartPulse
                  },
                  { 
                    title: "Gestão na Palma da Mão", 
                    desc: "Acompanhe indicadores, financeiro e produtividade de onde estiver, com dados reais e seguros.",
                    icon: LayoutDashboard
                  },
                  { 
                    title: "Base Sólida para Crescer", 
                    desc: "Prepare sua clínica para novos profissionais e unidades com um sistema que escala junto com você.",
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
                  "O Medainer mudou a forma como nossa recepção trabalha. Hoje temos paz e controle."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-sand" />
                  <div>
                    <p className="text-sm font-bold">Dra. Mariana Silva</p>
                    <p className="text-xs text-brand-graphite/50">Clínica Odontológica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="funcionalidades" className="section-padding bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="O que entregamos"
            title="Tudo o que sua clínica precisa em um só lugar."
            centered={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: UserCheck, title: "Gestão de Pacientes", desc: "Cadastro completo, histórico e segmentação inteligente." },
              { icon: Calendar, title: "Agenda Inteligente", desc: "Gestão de horários, salas e profissionais com facilidade." },
              { icon: Users, title: "Controle de Equipe", desc: "Gestão de permissões, comissões e produtividade." },
              { icon: TrendingUp, title: "Financeiro Completo", desc: "Fluxo de caixa, contas a pagar/receber e faturamento." },
              { icon: ClipboardList, title: "Prontuário Digital", desc: "Histórico clínico seguro e fácil de consultar durante a consulta." },
              { icon: MessageCircle, title: "Apoio WhatsApp", desc: "Integração para facilitar a comunicação e lembretes." },
              { icon: Zap, title: "Automações com IA", desc: "Sugestões inteligentes para otimizar sua rotina operacional." },
              { icon: ShieldCheck, title: "Segurança de Dados", desc: "Seus dados protegidos com criptografia de ponta." }
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
            title="Como o Medainer transforma sua clínica na prática."
            centered={true}
            dark={true}
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/10 hidden xl:block" />
            
            {[
              { step: "01", title: "Organize", desc: "Configure seus horários e profissionais em minutos." },
              { step: "02", title: "Centralize", desc: "Traga todos os seus pacientes para a plataforma." },
              { step: "03", title: "Opere", desc: "Sua recepção e equipe começam a usar o fluxo otimizado." },
              { step: "04", title: "Controle", desc: "Acompanhe o crescimento e a eficiência em tempo real." }
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
              Começar Agora
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

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-brand-offwhite border border-brand-graphite/5 flex flex-col"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-medium text-brand-graphite mb-2">Starter</h3>
                <p className="text-brand-graphite/50 text-sm">Para clínicas iniciando a organização digital.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-serif font-bold text-brand-petroleum">R$ 297</span>
                <span className="text-brand-graphite/50 ml-2">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Agenda e Pacientes",
                  "Prontuário Digital",
                  "Financeiro Básico",
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
                <Button variant="primary" href={STRIPE_STARTER_URL} className="w-full">Assinar Plano</Button>
                <Button variant="ghost" href={WHATSAPP_URL} className="w-full text-xs">Tirar dúvidas no WhatsApp</Button>
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
                Mais Escolhido
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-medium mb-2">Pro</h3>
                <p className="text-white/50 text-sm">Para clínicas em pleno crescimento operacional.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-serif font-bold text-brand-accent">R$ 497</span>
                <span className="text-white/50 ml-2">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Tudo do Starter",
                  "Automações com WhatsApp",
                  "Inteligência Artificial",
                  "Até 8 usuários",
                  "Até 6 profissionais",
                  "Treinamento básico para equipe",
                  "Suporte Prioritário"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Button variant="secondary" href={STRIPE_PRO_URL} className="w-full">Começar Agora</Button>
                <Button variant="ghost" href={WHATSAPP_URL} className="w-full text-white/70 hover:text-white text-xs">Falar com Especialista</Button>
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
                <h3 className="text-2xl font-serif font-medium text-brand-graphite mb-2">Scale</h3>
                <p className="text-brand-graphite/50 text-sm">Para grandes operações e redes de clínicas.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-serif font-bold text-brand-petroleum">R$ 897</span>
                <span className="text-brand-graphite/50 ml-2">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Tudo do Pro",
                  "Até 20 usuários",
                  "Até 15 profissionais",
                  "Acompanhamento Mensal",
                  "Treinamento de Equipe",
                  "Suporte 24/7 Dedicado"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-graphite/70">
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Button variant="primary" href={STRIPE_SCALE_URL} className="w-full">Assinar Scale</Button>
                <Button variant="ghost" href={WHATSAPP_URL} className="w-full text-xs">Consultar Atendimento</Button>
              </div>
            </motion.div>
          </div>
          
          <p className="text-center mt-12 text-brand-graphite/40 text-sm">
            Precisa de algo personalizado? <a href={WHATSAPP_URL} className="text-brand-petroleum font-bold underline">Fale conosco no WhatsApp</a>.
          </p>
        </div>
      </section>

      {/* --- Credibility --- */}
      <section className="section-padding bg-brand-sand/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              subtitle="Confiança"
              title="Pensado para a rotina real de quem vive a saúde."
              centered={true}
            />
            <p className="text-lg md:text-xl text-brand-graphite/60 mb-10 md:mb-12 leading-relaxed">
              O Medainer não é apenas um software. É uma metodologia de organização clínica que une tecnologia moderna com a necessidade de controle e agilidade que o seu dia a dia exige.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: "Implantação Prática", desc: "Sem processos longos ou complexos. Você começa a usar em dias." },
                { label: "Foco em Resultados", desc: "Menos tempo em telas, mais tempo cuidando dos seus pacientes." },
                { label: "Suporte Humano", desc: "Especialistas prontos para ajudar sua equipe a extrair o máximo do sistema." }
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
              title="Perguntas comuns sobre o Medainer."
              centered={true}
            />
            
            <div className="mt-12">
              {[
                { 
                  q: "O Medainer serve para qual tipo de clínica?", 
                  a: "O Medainer foi desenhado para clínicas médicas, odontológicas, de psicologia, estética e qualquer profissional da saúde que precise gerenciar agenda, pacientes e equipe com profissionalismo." 
                },
                { 
                  q: "É difícil começar a usar?", 
                  a: "De forma alguma. Nossa interface é intuitiva e moderna. Além disso, oferecemos materiais de apoio e suporte para que você e sua equipe dominem a ferramenta rapidamente." 
                },
                { 
                  q: "Minha equipe vai conseguir usar?", 
                  a: "Sim! Focamos muito na experiência da recepção e dos profissionais. O sistema é limpo, direto ao ponto e evita termos técnicos desnecessários." 
                },
                { 
                  q: "Posso contratar direto ou preciso falar com alguém?", 
                  a: "Você pode escolher seu plano e assinar agora mesmo via Stripe. Mas, se preferir tirar dúvidas antes, nosso time comercial está disponível no WhatsApp." 
                },
                { 
                  q: "Existe suporte?", 
                  a: "Sim, oferecemos suporte humano e qualificado. Dependendo do seu plano, o suporte pode ser prioritário ou até mesmo incluir acompanhamento mensal." 
                },
                { 
                  q: "O sistema ajuda na organização da agenda?", 
                  a: "Essa é uma das nossas maiores forças. Nossa agenda inteligente evita conflitos, facilita reagendamentos e dá uma visão clara da produtividade da clínica." 
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
            Pronto para levar sua clínica ao próximo nível de organização?
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 md:mb-12 max-w-2xl mx-auto">
            Se a sua clínica precisa de mais controle, menos retrabalho e um atendimento de excelência, o Medainer é o seu próximo passo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" href="#planos" className="px-10 md:px-12 py-4 text-base sm:text-lg">
              Escolher meu Plano
            </Button>
            <Button variant="outline" href={WHATSAPP_URL} className="px-10 md:px-12 py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-graphite">
              <MessageCircle className="w-5 h-5 mr-2" />
              Tirar dúvidas no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 bg-white border-t border-brand-graphite/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-petroleum rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">M</span>
              </div>
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
