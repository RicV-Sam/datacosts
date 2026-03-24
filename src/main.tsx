// Normalize URL: Strip /index.html and enforce trailing slash before React Router mounts
if (window.location.pathname.endsWith('/index.html')) {
  const newPath = window.location.pathname.replace(/\/index\.html$/, '/');
  window.location.replace(newPath + window.location.search + window.location.hash);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

// Dispatch event for prerendering
document.dispatchEvent(new Event('render-event'));
