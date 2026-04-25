import { getIndexableRoutes } from '../config/routeCatalog';
import { externalDataProblems } from 'virtual:data-problems-content';

type DataProblemCause = {
  cause: string;
  explanation: string;
};

type DataProblemFaq = {
  question: string;
  answer: string;
};

type DataProblemInternalLink = {
  anchorText: string;
  status?: string;
  url: string;
};

type RawDataProblemPage = {
  pageTitle: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  causes: DataProblemCause[];
  faqs: DataProblemFaq[];
  fixSteps?: {
    byNetwork?: Record<string, string[]>;
    general?: string[];
  };
  internalLinks: DataProblemInternalLink[];
  networks?: string[];
  preventionTips: string[];
  schemaTypes?: string[];
  slug: string;
  lastReviewed?: string;
};

export type DataProblemPage = {
  canonicalPath: string;
  causes: string[];
  faqs: DataProblemFaq[];
  fixSteps: string[];
  h1: string;
  internalLinks: Array<{ anchorText: string; href: string }>;
  metaDescription: string;
  pageTitle: string;
  preventionTips: string[];
  quickAnswer: string;
  supportsArticleSchema: boolean;
  lastReviewed?: string;
};

function normalizePath(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, '') + '/';
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

const knownRouteSet = new Set(getIndexableRoutes().map(normalizePath));

function isValidInternalLink(link: DataProblemInternalLink): boolean {
  if (!hasText(link.url) || !link.url.startsWith('/')) return false;
  if (hasText(link.status) && link.status.toLowerCase() !== 'live') return false;
  return knownRouteSet.has(normalizePath(link.url));
}

function getNetworkFixSteps(page: RawDataProblemPage): string[] {
  const generalSteps = page.fixSteps?.general ?? [];
  const primaryNetwork = page.networks?.[0]?.toLowerCase() ?? '';
  const networkSpecificSteps = page.fixSteps?.byNetwork?.[primaryNetwork] ?? [];

  return [...generalSteps, ...networkSpecificSteps].filter(hasText);
}

function toDataProblemPage(pathname: string, raw: RawDataProblemPage): DataProblemPage {
  const canonicalPath = normalizePath(pathname);

  const internalLinks = (raw.internalLinks ?? [])
    .filter(isValidInternalLink)
    .map((link) => ({
      anchorText: link.anchorText,
      href: normalizePath(link.url)
    }));

  return {
    canonicalPath,
    h1: raw.h1,
    pageTitle: raw.pageTitle,
    metaDescription: raw.metaDescription,
    quickAnswer: raw.quickAnswer,
    causes: (raw.causes ?? [])
      .filter((item) => hasText(item.cause) || hasText(item.explanation))
      .map((item) => [item.cause, item.explanation].filter(hasText).join(': ')),
    fixSteps: getNetworkFixSteps(raw),
    preventionTips: (raw.preventionTips ?? []).filter(hasText),
    faqs: (raw.faqs ?? []).filter((faq) => hasText(faq.question) && hasText(faq.answer)),
    internalLinks,
    supportsArticleSchema: (raw.schemaTypes ?? []).includes('Article'),
    lastReviewed: raw.lastReviewed
  };
}

const rawPagesByPath = externalDataProblems as Record<string, RawDataProblemPage>;

const pagesByPath = Object.entries(rawPagesByPath).reduce<Record<string, DataProblemPage>>((acc, [pathname, rawPage]) => {
  const normalizedPath = normalizePath(pathname);
  acc[normalizedPath] = toDataProblemPage(normalizedPath, rawPage);
  return acc;
}, {});

export function getExternalDataProblemPage(pathname: string): DataProblemPage | null {
  return pagesByPath[normalizePath(pathname)] ?? null;
}
