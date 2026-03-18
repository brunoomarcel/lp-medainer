import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initAnalytics } from './analytics';
import { TrialPage } from './trial/TrialPage';
import './index.css';

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrialPage />
  </StrictMode>,
);
