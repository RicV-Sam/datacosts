import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { getPrerenderRoutes, validateIndexableRoutes } from './src/config/routeCatalog';
import { SITE_ORIGIN } from './src/seo/siteConstants';

const DEFAULT_DATA_PROBLEMS_SOURCE_DIR = 'C:/Users/ricca/Desktop/DataCost-SEO-Engine/seo-engine/output/data-problems';
const DATA_PROBLEMS_SOURCE_FILES = [
  'why-is-my-data-disappearing-vodacom.json',
  'how-to-stop-wasp-charges-vodacom.json',
  'how-to-check-data-balance-vodacom-ussd.json'
];
const DATA_PROBLEMS_VIRTUAL_MODULE_ID = 'virtual:data-problems-content';
const DATA_PROBLEMS_VIRTUAL_RESOLVED_ID = `\0${DATA_PROBLEMS_VIRTUAL_MODULE_ID}`;

type ExternalDataProblemJson = {
  slug: string;
};

function normalizeRoute(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, '') + '/';
}

function readExternalDataProblem(fileName: string, sourceDir: string): ExternalDataProblemJson {
  const filePath = path.join(sourceDir, fileName);
  const rawJson = readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(rawJson) as ExternalDataProblemJson;

  if (!parsed.slug || typeof parsed.slug !== 'string') {
    throw new Error(`Missing slug in data-problems JSON: ${filePath}`);
  }

  return parsed;
}

function externalDataProblemsPlugin(sourceDir: string): Plugin {
  return {
    name: 'external-data-problems-loader',
    resolveId(id) {
      if (id === DATA_PROBLEMS_VIRTUAL_MODULE_ID) {
        return DATA_PROBLEMS_VIRTUAL_RESOLVED_ID;
      }
      return null;
    },
    load(id) {
      if (id !== DATA_PROBLEMS_VIRTUAL_RESOLVED_ID) {
        return null;
      }

      const pagesByRoute = DATA_PROBLEMS_SOURCE_FILES.reduce<Record<string, ExternalDataProblemJson>>((acc, fileName) => {
        const page = readExternalDataProblem(fileName, sourceDir);
        acc[normalizeRoute(page.slug)] = page;
        return acc;
      }, {});

      return `export const externalDataProblems = ${JSON.stringify(pagesByRoute, null, 2)};`;
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const prerenderRoutes = getPrerenderRoutes();
  validateIndexableRoutes(prerenderRoutes);
  const dataProblemsSourceDir = env.VITE_SEO_ENGINE_PATH || process.env.VITE_SEO_ENGINE_PATH || DEFAULT_DATA_PROBLEMS_SOURCE_DIR;

  return {
    base: '/',
    plugins: [
      externalDataProblemsPlugin(dataProblemsSourceDir),
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
            .replace(/http:\/\/localhost:[0-9]+/g, SITE_ORIGIN);
          renderedRoute.html = renderedRoute.html
            .replace(/<title(?![^>]*data-rh=)/g, '<title data-rh="true"')
            .replace(/<meta(?![^>]*data-rh=)([^>]*(?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*)>/g, '<meta data-rh="true"$1>')
            .replace(/<link(?![^>]*data-rh=)([^>]*rel="canonical"[^>]*)>/g, '<link data-rh="true"$1>');
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
