import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      prerender({
        routes: [
          '/',
          '/ussd-codes-south-africa/',
          '/guides/',
          '/guides/cheapest-1gb-data-south-africa/',
          '/guides/cheap-night-data-south-africa/',
          '/guides/convert-airtime-to-data-south-africa/',
          '/guides/best-data-deals-south-africa/',
          '/guides/prepaid-vs-contract-south-africa/',
          '/network/',
          '/network/vodacom/',
          '/network/mtn/',
          '/network/telkom/',
          '/network/cell-c/',
          '/network/rain/',
          '/network/vodacom/1gb/',
          '/network/mtn/1gb/',
          '/network/telkom/1gb/',
          '/network/vodacom/monthly-data/',
          '/network/mtn/monthly-data/',
          '/network/telkom/monthly-data/',
          '/network/vodacom/night-data/',
          '/network/mtn/night-data/',
        ],
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
