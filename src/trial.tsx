import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TrialPage } from './trial/TrialPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrialPage />
  </StrictMode>,
);
