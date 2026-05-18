import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import ToastContainer from './components/ui/ToastContainer.tsx';

const app = (
  <ToastProvider>
    <ToastContainer />
    <App />
  </ToastProvider>
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>{app}</StrictMode>,
);
