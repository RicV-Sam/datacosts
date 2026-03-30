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

let prerenderEventDispatched = false;

function dispatchPrerenderReadyEvent(): void {
  if (prerenderEventDispatched) return;
  prerenderEventDispatched = true;
  document.dispatchEvent(new Event('render-event'));
}

function isAboveFoldContentStable(): boolean {
  const heading = document.querySelector('main h1, h1') as HTMLElement | null;
  if (!heading) return false;

  const styles = window.getComputedStyle(heading);
  const opacity = Number(styles.opacity || '1');
  const transform = styles.transform;
  return opacity >= 0.99 && (transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)');
}

function waitForStableAboveFoldAndDispatch(): void {
  const maxWaitMs = 6000;
  const pollMs = 100;
  const requiredStableChecks = 2;
  const start = Date.now();
  let stableChecks = 0;

  const tick = () => {
    if (isAboveFoldContentStable()) {
      stableChecks += 1;
    } else {
      stableChecks = 0;
    }

    const timedOut = Date.now() - start >= maxWaitMs;
    if (stableChecks >= requiredStableChecks || timedOut) {
      dispatchPrerenderReadyEvent();
      return;
    }

    window.setTimeout(tick, pollMs);
  };

  window.setTimeout(tick, pollMs);
}

if (document.readyState === 'complete') {
  waitForStableAboveFoldAndDispatch();
} else {
  window.addEventListener('load', waitForStableAboveFoldAndDispatch, { once: true });
}
