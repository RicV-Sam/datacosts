import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { getPrerenderRoutes, validateIndexableRoutes } from './src/config/routeCatalog';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const prerenderRoutes = getPrerenderRoutes();
  validateIndexableRoutes(prerenderRoutes);

  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      prerender({
        routes: prerenderRoutes,
        renderer: new PuppeteerRenderer({
          renderAfterDocumentEvent: 'render-event',
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }),
        postProcess(renderedRoute: any) {
          renderedRoute.html = renderedRoute.html
            .replace(/http:\/\/localhost:[0-9]+/g, 'https://datacost.co.za');
          return renderedRoute;
        },
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
