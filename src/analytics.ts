const GA_MEASUREMENT_ID = 'G-9M8QCBLVR9';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
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

  if ((window as Window & { __gaInitialized?: boolean }).__gaInitialized) return;

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
  (window as Window & { __gaInitialized?: boolean }).__gaInitialized = true;
}
