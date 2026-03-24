import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
const MOBILE_MENU_LINKS = [
  { type: 'anchor', href: '/#como-funciona', label: 'Como funciona' },
  { type: 'anchor', href: '/#beneficios', label: 'Benefícios' },
  { type: 'anchor', href: '/#automacao', label: 'Automação' },
  { type: 'route', href: PRICING_PATH, label: 'Planos' },
  { type: 'anchor', href: TRIAL_PATH, label: 'Teste grátis' },
] as const;

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const demoWhatsappUrl = buildTrackedUrl(WHATSAPP_URL);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigationMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClose = () => setIsMobileMenuOpen(false);
    window.addEventListener('popstate', handleClose);

    return () => window.removeEventListener('popstate', handleClose);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

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

        <div className="hidden lg:flex">
          <a
            href={demoWhatsappUrl}
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_32px_rgba(59,130,246,0.18)] transition-all duration-300 hover:bg-brand-primary-strong sm:w-auto"
            onClick={() => trackEvent('click_trial', { source: 'header' })}
          >
            Solicitar demonstração
          </a>
        </div>

        <button
          type="button"
          onClick={handleMobileMenuToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line bg-white/90 text-brand-ink shadow-sm backdrop-blur-sm lg:hidden"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mx-auto mt-3 w-full max-w-[1240px] px-4 sm:px-6 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="overflow-hidden rounded-[20px] border border-brand-line bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-2 text-sm text-brand-ink">
                {MOBILE_MENU_LINKS.map((item, index) => {
                  const motionProps = {
                    initial: { opacity: 0, x: -10 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -8 },
                    transition: { duration: 0.2, delay: index * 0.035 },
                    className:
                      'rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-brand-panel hover:text-brand-primary active:scale-[0.99]',
                  };

                  if (item.type === 'route') {
                    return (
                      <motion.div key={item.label} {...motionProps}>
                        <HeaderLink
                          href={item.href}
                          navigationMode={navigationMode}
                          className="block"
                          onClick={() => {
                            trackEvent('view_pricing', { source: 'header_menu_mobile' });
                            handleMobileMenuClose();
                          }}
                        >
                          {item.label}
                        </HeaderLink>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      {...motionProps}
                      onClick={() => {
                        if (item.href === TRIAL_PATH) {
                          trackEvent('click_trial', { source: 'header_menu_mobile' });
                        }
                        handleMobileMenuClose();
                      }}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
