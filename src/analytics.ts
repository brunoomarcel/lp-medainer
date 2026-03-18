const GA_MEASUREMENT_ID = 'G-9M8QCBLVR9';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaInitialized?: boolean;
  }
}

function getNormalizedPagePath() {
  const normalizedPathname = window.location.pathname.replace(/\/index\.html$/, '') || '/';
  return `${normalizedPathname}${window.location.search}`;
}

export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  if (window.__gaInitialized) return;

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_path: getNormalizedPagePath(),
    page_location: `${window.location.origin}${getNormalizedPagePath()}`,
  });
  window.__gaInitialized = true;
}
