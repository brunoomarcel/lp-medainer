const GA_MEASUREMENT_ID = 'G-9M8QCBLVR9';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaInitialized?: boolean;
    __gaScriptLoading?: boolean;
  }
}

function getNormalizedPagePath() {
  const normalizedPathname = (window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/') as string;
  return `${normalizedPathname}${window.location.search}`;
}

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') return;

  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
}

function sendInitialPageView() {
  if (window.__gaInitialized || typeof window.gtag !== 'function') return;

  const pagePath = getNormalizedPagePath();

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  });
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
  });
  window.__gaInitialized = true;
}

export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  ensureGtagStub();

  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    if (window.__gaScriptLoading) return;
    sendInitialPageView();
    return;
  }

  window.__gaScriptLoading = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = () => {
    window.__gaScriptLoading = false;
    sendInitialPageView();
  };
  script.onerror = () => {
    window.__gaScriptLoading = false;
  };
  document.head.appendChild(script);
}
