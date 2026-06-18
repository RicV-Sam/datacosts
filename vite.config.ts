import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { getPrerenderRoutes, validateIndexableRoutes } from './src/config/routeCatalog';
import { getRedirectAliasRoutes, REDIRECT_ALIASES } from './src/config/redirectAliases';
import { SITE_ORIGIN } from './src/seo/siteConstants';
import { getBundledDataProblemSourceFiles } from './src/config/dataProblemPublishing';

const DEFAULT_DEV_DATA_PROBLEMS_SOURCE_DIR = 'C:/Users/ricca/Desktop/DataCost-SEO-Engine/seo-engine/output/data-problems';
const LOCAL_DATA_PROBLEMS_SOURCE_DIR = path.resolve(__dirname, 'src/data/seo-pages/data-problems');
const DEV_EXTERNAL_DATA_PROBLEMS_SOURCE_DIRS = [
  DEFAULT_DEV_DATA_PROBLEMS_SOURCE_DIR,
  path.resolve(__dirname, '../DataCost-SEO-Engine/seo-engine/output/data-problems')
];
const DATA_PROBLEMS_SOURCE_FILES = getBundledDataProblemSourceFiles();
const DATA_PROBLEMS_VIRTUAL_MODULE_ID = 'virtual:data-problems-content';
const DATA_PROBLEMS_VIRTUAL_RESOLVED_ID = `\0${DATA_PROBLEMS_VIRTUAL_MODULE_ID}`;

type ExternalDataProblemJson = {
  slug: string;
};

function normalizeRoute(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, '') + '/';
}

function getPrerenderOutputPath(route: string, indexPath = 'index.html'): string {
  let outputPath = path.join(normalizeRoute(route), indexPath);
  if (outputPath.startsWith('/') || outputPath.startsWith('\\')) {
    outputPath = outputPath.slice(1);
  }
  return outputPath;
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function insertBeforeHeadClose(html: string, tag: string): string {
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${tag}</head>`);
  }

  return `${tag}${html}`;
}

function removeHeadTags(html: string, pattern: RegExp): string {
  return html.replace(pattern, '');
}

function ensureTitle(html: string, title: string): string {
  const safeTitle = escapeHtmlAttribute(title);
  const titleTag = `<title data-rh="true">${safeTitle}</title>`;
  if (/<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, titleTag);
  }

  return insertBeforeHeadClose(html, titleTag);
}

function ensureRedirectAliasSeoHtml(html: string, alias: { from: string; to: string; label: string }): string {
  const canonicalHref = `${SITE_ORIGIN}${normalizeRoute(alias.to)}`;
  const description = `${alias.label} has moved. Continue to the canonical DataCost page at ${canonicalHref}.`;
  let updatedHtml = html;

  updatedHtml = removeHeadTags(updatedHtml, /<link\b[^>]*rel=["'][^"']*\bcanonical\b[^"']*["'][^>]*>\s*/gi);
  updatedHtml = removeHeadTags(updatedHtml, /<meta\b[^>]*name=["']description["'][^>]*>\s*/gi);
  updatedHtml = removeHeadTags(updatedHtml, /<meta\b[^>]*name=["']robots["'][^>]*>\s*/gi);
  updatedHtml = ensureTitle(updatedHtml, `${alias.label} Moved | DataCost`);
  updatedHtml = insertBeforeHeadClose(
    updatedHtml,
    [
      `<meta data-rh="true" name="description" content="${escapeHtmlAttribute(description)}">`,
      '<meta data-rh="true" name="robots" content="noindex,follow">',
      `<link data-rh="true" rel="canonical" href="${escapeHtmlAttribute(canonicalHref)}">`
    ].join('')
  );

  return updatedHtml;
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
  const puppeteerExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  const prerenderRoutes = getPrerenderRoutes();
  const redirectAliasRoutes = new Set(getRedirectAliasRoutes().map(normalizeRoute));
  const redirectAliasByRoute = new Map(REDIRECT_ALIASES.map((alias) => [normalizeRoute(alias.from), alias]));
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
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          launchOptions: puppeteerExecutablePath
            ? { executablePath: puppeteerExecutablePath }
            : undefined
        }),
        postProcess(renderedRoute: any) {
          const normalizedOriginalRoute = typeof renderedRoute.originalRoute === 'string'
            ? normalizeRoute(renderedRoute.originalRoute)
            : '';
          const redirectAlias = redirectAliasByRoute.get(normalizedOriginalRoute);

          if (
            typeof renderedRoute.originalRoute === 'string' &&
            redirectAliasRoutes.has(normalizedOriginalRoute)
          ) {
            renderedRoute.outputPath = getPrerenderOutputPath(renderedRoute.originalRoute);
          }

          renderedRoute.html = renderedRoute.html
            .replace(/http:\/\/localhost:[0-9]+/g, SITE_ORIGIN);
          if (redirectAlias) {
            renderedRoute.html = ensureRedirectAliasSeoHtml(renderedRoute.html, redirectAlias);
          }
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
