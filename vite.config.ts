import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { getPrerenderRoutes, validateIndexableRoutes } from './src/config/routeCatalog';
import { SITE_ORIGIN } from './src/seo/siteConstants';

const DEFAULT_DEV_DATA_PROBLEMS_SOURCE_DIR = 'C:/Users/ricca/Desktop/DataCost-SEO-Engine/seo-engine/output/data-problems';
const LOCAL_DATA_PROBLEMS_SOURCE_DIR = path.resolve(__dirname, 'src/data/seo-pages/data-problems');
const DEV_EXTERNAL_DATA_PROBLEMS_SOURCE_DIRS = [
  DEFAULT_DEV_DATA_PROBLEMS_SOURCE_DIR,
  path.resolve(__dirname, '../DataCost-SEO-Engine/seo-engine/output/data-problems')
];
const DATA_PROBLEMS_SOURCE_FILES = [
  'why-is-my-data-disappearing-vodacom.json',
  'how-to-stop-wasp-charges-vodacom.json',
  'how-to-check-data-balance-vodacom-ussd.json',
  'why-does-my-data-run-out-so-fast-mtn.json',
  'why-does-my-data-run-out-so-fast-cell-c.json',
  'why-does-my-data-run-out-so-fast-telkom.json',
  'how-to-stop-data-disappearing-vodacom.json',
  'how-to-stop-data-disappearing-mtn.json',
  'how-to-stop-data-disappearing-cell-c.json',
  'how-to-stop-data-disappearing-telkom.json',
  'why-is-my-airtime-disappearing-vodacom-prepaid.json',
  'why-is-my-airtime-disappearing-mtn-prepaid.json',
  'how-to-stop-airtime-disappearing-vodacom.json',
  'how-to-stop-airtime-disappearing-cell-c.json',
  'how-to-stop-airtime-disappearing-telkom.json',
  'why-is-my-data-disappearing-overnight-android.json',
  'how-to-stop-wasp-charges-cell-c.json',
  'how-to-stop-wasp-charges-telkom.json',
  'how-to-check-wasp-subscriptions-vodacom.json',
  'how-to-check-wasp-subscriptions-mtn.json',
  'how-to-stop-background-data-usage-android.json',
  'how-to-stop-apps-using-data-in-background-samsung.json'
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

function resolveDataProblemsSourceDir(options: { configuredPath?: string; isProductionBuild: boolean }): string {
  const { configuredPath, isProductionBuild } = options;

  if (!isProductionBuild && configuredPath && existsSync(configuredPath)) {
    return configuredPath;
  }

  if (existsSync(LOCAL_DATA_PROBLEMS_SOURCE_DIR)) {
    return LOCAL_DATA_PROBLEMS_SOURCE_DIR;
  }

  if (!isProductionBuild) {
    const externalFallbackDir = DEV_EXTERNAL_DATA_PROBLEMS_SOURCE_DIRS.find((candidate) => existsSync(candidate));
    if (externalFallbackDir) {
      return externalFallbackDir;
    }
  }

  const attemptedPaths = [
    ...(!isProductionBuild && configuredPath ? [configuredPath] : []),
    LOCAL_DATA_PROBLEMS_SOURCE_DIR,
    ...(!isProductionBuild ? DEV_EXTERNAL_DATA_PROBLEMS_SOURCE_DIRS : [])
  ];

  throw new Error(
    [
      'External SEO JSON directory was not found.',
      `Checked: ${attemptedPaths.join(', ')}`,
      'In development, set VITE_SEO_ENGINE_PATH to use the external SEO engine output. In production and CI, the checked-in JSON files under src/data/seo-pages/data-problems are required.'
    ].join(' ')
  );
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
  const configuredSeoEnginePath = env.VITE_SEO_ENGINE_PATH || process.env.VITE_SEO_ENGINE_PATH;
  const dataProblemsSourceDir = resolveDataProblemsSourceDir({
    configuredPath: configuredSeoEnginePath,
    isProductionBuild: mode === 'production' || process.env.CI === 'true'
  });

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
