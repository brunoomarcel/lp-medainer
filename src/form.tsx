import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initAnalytics } from './analytics';
import { LeadFormPage } from './components/LeadFlow';
import './index.css';

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeadFormPage />
  </StrictMode>,
);
