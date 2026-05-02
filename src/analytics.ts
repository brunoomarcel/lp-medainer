import { ANALYTICS_LINKER_DOMAINS, GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from './constants/analytics';

const CAMPAIGN_PARAM_NAMES = new Set(['fbclid', 'gad_source', 'gclid', 'gbraid', 'msclkid', 'wbraid']);

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    __gaInitialized?: boolean;
    __gaScriptLoading?: boolean;
  }
}

function getNormalizedPagePath() {
  const normalizedPathname = (window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/') as string;
  return `${normalizedPathname}${window.location.search}`;
}

function getLinkerDomains() {
  const domains = new Set(ANALYTICS_LINKER_DOMAINS);

  if (typeof window !== 'undefined' && window.location.hostname) {
    domains.add(window.location.hostname);
  }

  return Array.from(domains);
}

function getTrackingConfig(pagePath: string) {
  return {
    linker: { domains: getLinkerDomains() },
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  };
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
  const trackingConfig = getTrackingConfig(pagePath);

  window.gtag('js', new Date());

  if (GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      ...trackingConfig,
      send_page_view: false,
    });
  }

  if (GOOGLE_ADS_ID) {
    window.gtag('config', GOOGLE_ADS_ID, trackingConfig);
  }

  window.__gaInitialized = true;
  trackPageView(pagePath, { includeMeta: false });
}

export function initAnalytics() {
  const tagId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;
  if (typeof window === 'undefined' || !tagId) return;

  ensureGtagStub();

  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${tagId}"]`,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    if (window.__gaScriptLoading) return;
    sendInitialPageView();
    return;
  }

  window.__gaScriptLoading = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
  script.onload = () => {
    window.__gaScriptLoading = false;
    sendInitialPageView();
  };
  script.onerror = () => {
    window.__gaScriptLoading = false;
  };
  document.head.appendChild(script);
}

export function trackPageView(pagePath = getNormalizedPagePath(), options: { includeMeta?: boolean } = {}) {
  if (typeof window === 'undefined') return;

  const trackingConfig = getTrackingConfig(pagePath);
  const includeMeta = options.includeMeta ?? true;

  if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', trackingConfig);
  }

  if (includeMeta && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

export function buildTrackedUrl(baseUrl: string): string {
  if (typeof window === 'undefined') {
    return baseUrl;
  }

  const url = new URL(baseUrl, window.location.origin);
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.forEach((value, key) => {
    const shouldPreserve = key.startsWith('utm_') || CAMPAIGN_PARAM_NAMES.has(key);
    if (!shouldPreserve || url.searchParams.has(key)) {
      return;
    }

    url.searchParams.set(key, value);
  });

  return url.toString();
}
