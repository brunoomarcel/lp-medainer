import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initAnalytics } from './analytics';
import { DemoPage, LeadFormPage } from './components/LeadFlow';
import { ThankYouPage } from './components/ThankYouPage';
import { DisqualifiedPage } from './components/DisqualifiedPage';
import { HomePage as NewHomePage } from './pages/HomePage';
import { HomePage as OldLandingPage } from './pages/OldLandingPage';
import './index.css';
import './home-lp.css';

initAnalytics();

function resolvePage() {
  if (typeof window === 'undefined') {
    return <NewHomePage />;
  }

  const pathname = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  if (pathname === '/formulario') {
    return <LeadFormPage />;
  }

  if (pathname === '/demo') {
    return <DemoPage />;
  }

  if (pathname === '/obrigado') {
    return <ThankYouPage />;
  }

  if (pathname === '/proximo-passo') {
    return <DisqualifiedPage />;
  }

  if (pathname === '/old-lp') {
    return <OldLandingPage />;
  }

  return <NewHomePage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {resolvePage()}
  </StrictMode>,
);
