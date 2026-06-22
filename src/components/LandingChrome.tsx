import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { buildTrackedUrl } from '../analytics';
import medainerSymbol from '../assets/images/symbol-medainer.png';
import { useLeadFlow } from './LeadFlow';

const PRICING_PATH = '/planos';
const TERMS_URL = (import.meta.env.VITE_TERMS_URL as string | undefined)?.trim() || '/termos';
const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL as string | undefined)?.trim() || '/privacidade';
const NAV_ITEMS = [
  { href: '/#recursos', label: 'Recursos' },
  { href: '/#automacao', label: 'WhatsApp + IA' },
  { href: PRICING_PATH, label: 'Planos' },
] as const;
const PRIMARY_CTA_LABEL = 'Quero testar o Medainer';

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
  key?: React.Key;
  href: string;
  children: React.ReactNode;
  className?: string;
  navigationMode: 'spa' | 'browser';
  onClick?: () => void;
}) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (navigationMode !== 'spa' || isExternalHref(href)) {
      return;
    }

    if (href.startsWith('/#') || href.startsWith('/') || href.startsWith('#')) {
      event.preventDefault();
      navigateTo(href);
    }
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const loginUrl = buildTrackedUrl('https://app.medainer.com.br/login');
  const { openLeadForm } = useLeadFlow();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClose = () => setIsMobileMenuOpen(false);
    window.addEventListener('popstate', handleClose);

    return () => window.removeEventListener('popstate', handleClose);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-brand-line/80 bg-white/88 py-3 shadow-[0_14px_36px_rgba(15,28,77,0.08)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      } overflow-x-clip`}
    >
      <div className="mx-auto flex w-full max-w-[1240px] min-w-0 items-center justify-between gap-4 px-4 sm:px-6">
        <HeaderLink href="/" navigationMode={navigationMode} className="flex min-w-0 items-center gap-3">
          <img
            src={medainerSymbol}
            alt="Logo da Medainer"
            className="h-10 w-10 rounded-full object-cover shadow-[0_12px_26px_rgba(68,87,243,0.24)] sm:h-11 sm:w-11"
            loading="eager"
          />
          <span className="truncate text-xl font-semibold tracking-[-0.04em] text-brand-ink sm:text-2xl">Medainer</span>
        </HeaderLink>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <HeaderLink
              key={item.label}
              href={item.href}
              navigationMode={navigationMode}
              className="text-base font-medium text-brand-muted transition-colors hover:text-brand-ink"
              onClick={() => {
                if (item.href === PRICING_PATH) {
                  trackEvent('view_pricing', { source: 'header_menu' });
                }
              }}
            >
              {item.label}
            </HeaderLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#4457f3_0%,#6273ff_100%)] px-5 py-3 text-base font-semibold text-white shadow-[0_16px_36px_rgba(68,87,243,0.22)] transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {
              trackEvent('click_trial', { source: 'header' });
              openLeadForm({ source: 'header', ctaLabel: PRIMARY_CTA_LABEL, targetHref: '/' });
            }}
          >
            {PRIMARY_CTA_LABEL}
          </button>
          {/* <a
            href={loginUrl}
            className="inline-flex items-center justify-center rounded-full border border-brand-line bg-white px-4 py-3 text-base font-semibold text-brand-ink shadow-[0_10px_30px_rgba(15,28,77,0.08)] transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            Entrar
          </a> */}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white/92 text-brand-ink shadow-[0_8px_24px_rgba(15,28,77,0.08)] lg:hidden"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-3 max-w-[1240px] px-4 sm:px-6 lg:hidden"
          >
            <div className="rounded-[28px] border border-brand-line bg-white p-4 shadow-[0_24px_60px_rgba(15,28,77,0.12)]">
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <HeaderLink
                    key={item.label}
                    href={item.href}
                    navigationMode={navigationMode}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-brand-ink transition-colors hover:bg-brand-panel"
                    onClick={() => {
                      if (item.href === PRICING_PATH) {
                        trackEvent('view_pricing', { source: 'header_menu_mobile' });
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </HeaderLink>
                ))}
                <button
                  type="button"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#4457f3_0%,#6273ff_100%)] px-5 py-3.5 text-base font-semibold text-white"
                  onClick={() => {
                    trackEvent('click_trial', { source: 'header_mobile' });
                    openLeadForm({ source: 'header_mobile', ctaLabel: PRIMARY_CTA_LABEL, targetHref: '/' });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {PRIMARY_CTA_LABEL}
                </button>
                {/* <a
                  href={loginUrl}
                  className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-center text-base font-medium text-brand-ink transition-colors hover:bg-brand-panel"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Entrar
                </a> */}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-brand-line bg-white py-10">
      <div className="mx-auto flex w-full max-w-[1240px] flex-row flex-wrap items-center justify-center gap-4 px-4 text-center sm:px-6 sm:gap-6 lg:justify-between lg:text-left">
        <div className="flex items-center gap-3">
          <img src={medainerSymbol} alt="Logo da Medainer" className="h-11 w-11 rounded-full object-cover" loading="lazy" />
          <span className="text-lg font-semibold tracking-[-0.04em] text-brand-ink sm:text-2xl">Medainer</span>
        </div>

        <div className="hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base text-brand-muted sm:flex">
          <a href="/#recursos" className="transition-colors hover:text-brand-primary">
            Recursos
          </a>
          <a href={PRICING_PATH} className="transition-colors hover:text-brand-primary">
            Planos
          </a>
          <a href={TERMS_URL} className="transition-colors hover:text-brand-primary">
            Termos
          </a>
          <a href={PRIVACY_URL} className="transition-colors hover:text-brand-primary">
            Privacidade
          </a>
          <a href="mailto:suporte@medainer.com.br" className="transition-colors hover:text-brand-primary">
            Suporte
          </a>
        </div>

        <p className="text-base text-brand-muted">© {new Date().getFullYear()} Medainer</p>
      </div>
    </footer>
  );
}
