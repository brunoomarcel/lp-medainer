import React from 'react';
import symbolMedainerImage from '../assets/images/symbol-medainer.png';
import { buildTrackedUrl } from '../analytics';

const PRICING_PATH = '/planos';
const TRIAL_PATH = '/teste-gratuito';
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';
const LGPD_URL = (import.meta.env.VITE_LGPD_URL as string | undefined)?.trim() || '/lgpd';
const WHATSAPP_PHONE = '5579996018591';
const WHATSAPP_MESSAGE = 'Oi! Quero solicitar uma demonstração do Medainer.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

type TrackEventFn = (eventName: string, payload?: Record<string, unknown>) => void;

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function navigateTo(href: string) {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function HeaderLink({
  href,
  children,
  className = '',
  navigationMode,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  navigationMode: 'spa' | 'browser';
  onClick?: () => void;
}) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (navigationMode !== 'spa' || href.startsWith('#') || href.startsWith('/#') || isExternalHref(href)) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export function LandingHeader({
  isScrolled,
  navigationMode = 'browser',
  trackEvent,
}: {
  isScrolled: boolean;
  navigationMode?: 'spa' | 'browser';
  trackEvent: TrackEventFn;
}) {
  const demoWhatsappUrl = buildTrackedUrl(WHATSAPP_URL);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        isScrolled ? 'bg-white/90 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
        <HeaderLink href="/" navigationMode={navigationMode} className="flex items-center gap-3">
          <img src={symbolMedainerImage} alt="Símbolo Medainer" className="h-10 w-10 rounded-2xl object-contain" />
          <span className="text-lg font-serif font-semibold text-brand-ink sm:text-xl">Medainer</span>
        </HeaderLink>

        <nav className="hidden items-center gap-7 text-sm text-brand-muted lg:flex">
          <a href="/#como-funciona" className="transition-colors hover:text-brand-primary">
            Como funciona
          </a>
          <a href="/#beneficios" className="transition-colors hover:text-brand-primary">
            Benefícios
          </a>
          <a href="/#automacao" className="transition-colors hover:text-brand-primary">
            Automação
          </a>
          <HeaderLink
            href={PRICING_PATH}
            navigationMode={navigationMode}
            className="transition-colors hover:text-brand-primary"
            onClick={() => trackEvent('view_pricing', { source: 'header_menu' })}
          >
            Planos
          </HeaderLink>
          <a
            href={TRIAL_PATH}
            className="transition-colors hover:text-brand-primary"
            onClick={() => trackEvent('click_trial', { source: 'header_menu' })}
          >
            Teste grátis
          </a>
        </nav>

        <div className="hidden sm:flex">
          <a
            href={demoWhatsappUrl}
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_32px_rgba(59,130,246,0.18)] transition-all duration-300 hover:bg-brand-primary-strong sm:w-auto"
            onClick={() => trackEvent('click_trial', { source: 'header' })}
          >
            Solicitar demonstração
          </a>
        </div>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-brand-line bg-white py-10">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <img src={symbolMedainerImage} alt="Símbolo Medainer" className="h-8 w-8 rounded-xl object-contain" />
          <span className="text-lg font-serif font-semibold text-brand-ink">Medainer</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-brand-muted">
          <a href={TERMS_URL} className="transition-colors hover:text-brand-primary">
            Termos de Uso
          </a>
          <a href={PRIVACY_URL} className="transition-colors hover:text-brand-primary">
            Privacidade
          </a>
          <a href={LGPD_URL} className="transition-colors hover:text-brand-primary">
            LGPD
          </a>
        </div>

        <p className="text-sm text-brand-muted">© {new Date().getFullYear()} Medainer. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
