import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initAnalytics } from './analytics';
import { LeadFormPage } from './components/LeadFlow';
import { ThankYouPage } from './components/ThankYouPage';
import { DisqualifiedPage } from './components/DisqualifiedPage';
import { HomePage } from './pages/HomePage';
import { OldLandingPage } from './pages/OldLandingPage';
import './index.css';
import './home-lp.css';

initAnalytics();

function resolvePage() {
  if (typeof window === 'undefined') {
    return <HomePage />;
  }

  const pathname = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  if (pathname === '/formulario') {
    return <LeadFormPage />;
  }

  if (pathname === '/obrigado') {
    return <ThankYouPage />;
  }

  if (pathname === '/proximo-passo') {
    return <DisqualifiedPage />;
  }

  if (pathname === '/planos' || pathname === '/old-lp') {
    return <OldLandingPage />;
  }

  return <HomePage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {resolvePage()}
  </StrictMode>,
);
