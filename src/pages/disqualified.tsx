import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initAnalytics } from '../analytics';
import { DisqualifiedPage } from '../components/DisqualifiedPage';
import '../index.css';

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DisqualifiedPage />
  </StrictMode>,
);
