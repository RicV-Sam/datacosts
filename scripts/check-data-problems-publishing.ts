import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import {
  DATA_PROBLEM_PUBLISHING_ENTRIES,
  DataProblemIndexingStatus
} from '../src/config/dataProblemPublishing';
import { getIndexableRoutes, getNoindexRoutes, getSitemapRoutes } from '../src/config/routeCatalog';

const DATA_PROBLEMS_DIR = path.resolve(process.cwd(), 'src/data/seo-pages/data-problems');
const REQUIRED_STRING_FIELDS = [
  'quickAnswer',
  'uniqueValueSummary',
  'officialSupportContext',
  'whenThisDoesNotApply',
  'lastReviewed',
  'reviewDueDate'
] as const;

const MIN_WORDS_BY_STATUS: Record<DataProblemIndexingStatus, number> = {
  index: 650,
  noindex: 350,
  draft: 250
};

type RawDataProblemPage = {
  slug?: unknown;
  pageTitle?: unknown;
  metaDescription?: unknown;
  quickAnswer?: unknown;
  causes?: Array<{ cause?: unknown; explanation?: unknown }>;
  fixSteps?: {
    general?: unknown[];
    byNetwork?: Record<string, unknown[]>;
  };
  preventionTips?: unknown[];
  faqs?: Array<{ question?: unknown; answer?: unknown }>;
  sourceNotes?: unknown;
  uniqueValueSummary?: unknown;
  officialSupportContext?: unknown;
  evidenceToCollect?: unknown;
  whenThisDoesNotApply?: unknown;
  indexingStatus?: unknown;
  lastReviewed?: unknown;
  reviewDueDate?: unknown;
  monetisation?: {
    affiliateLink?: unknown;
  };
};

type ValidationError = {
  file: string;
  message: string;
};

function normalizeRoute(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function getTextArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter(hasText).map((item) => item.trim()) : [];
}

function getWordCount(value: unknown): number {
  return (String(value ?? '').match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?/g) ?? []).length;
}

function getPageText(page: RawDataProblemPage): string {
  return [
    page.pageTitle,
    page.metaDescription,
    page.quickAnswer,
    page.uniqueValueSummary,
    page.officialSupportContext,
    page.whenThisDoesNotApply,
    ...getTextArray(page.sourceNotes),
    ...getTextArray(page.evidenceToCollect),
    ...(page.causes ?? []).flatMap((cause) => [cause.cause, cause.explanation]),
    ...(page.fixSteps?.general ?? []),
    ...Object.values(page.fixSteps?.byNetwork ?? {}).flat(),
    ...(page.preventionTips ?? []),
    ...(page.faqs ?? []).flatMap((faq) => [faq.question, faq.answer])
  ].join(' ');
}

function getStatus(value: unknown): DataProblemIndexingStatus | null {
  if (value === 'index' || value === 'noindex' || value === 'draft') {
    return value;
  }
  return null;
}

function normalizeSnippet(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function pushError(errors: ValidationError[], file: string, message: string): void {
  errors.push({ file, message });
}

function validatePublishingManifest(errors: ValidationError[]): void {
  const indexableRouteSet = new Set(getIndexableRoutes().map(normalizeRoute));
  const noindexRouteSet = new Set(getNoindexRoutes().map(normalizeRoute));
  const sitemapRouteSet = new Set(getSitemapRoutes().map(normalizeRoute));

  for (const entry of DATA_PROBLEM_PUBLISHING_ENTRIES) {
    const route = normalizeRoute(entry.route);
    if (entry.indexingStatus === 'index' && !indexableRouteSet.has(route)) {
      pushError(errors, entry.fileName, `${route} is marked index but is missing from indexable routes`);
    }

    if (entry.indexingStatus === 'noindex') {
      if (!noindexRouteSet.has(route)) {
        pushError(errors, entry.fileName, `${route} is marked noindex but is missing from noindex routes`);
      }
      if (sitemapRouteSet.has(route)) {
        pushError(errors, entry.fileName, `${route} is marked noindex but appears in sitemap routes`);
      }
    }
  }
}

async function main(): Promise<void> {
  const directoryStat = await stat(DATA_PROBLEMS_DIR).catch(() => null);
  if (!directoryStat?.isDirectory()) {
    throw new Error(`Data-problems source directory not found: ${DATA_PROBLEMS_DIR}`);
  }

  const files = (await readdir(DATA_PROBLEMS_DIR)).filter((file) => file.endsWith('.json')).sort();
  const manifestByFile = new Map(DATA_PROBLEM_PUBLISHING_ENTRIES.map((entry) => [entry.fileName, entry]));
  const errors: ValidationError[] = [];
  const indexedSnippets = new Map<string, string>();

  validatePublishingManifest(errors);

  for (const file of files) {
    const filePath = path.join(DATA_PROBLEMS_DIR, file);
    const raw = JSON.parse(await readFile(filePath, 'utf8')) as RawDataProblemPage;
    const manifestEntry = manifestByFile.get(file);
    const status = getStatus(raw.indexingStatus);

    if (!status) {
      pushError(errors, file, 'is missing indexingStatus: index, noindex, or draft');
      continue;
    }

    if (!manifestEntry && status !== 'draft') {
      pushError(errors, file, 'is not in the bundled publishing manifest and must be marked draft');
    }

    if (manifestEntry) {
      if (status !== manifestEntry.indexingStatus) {
        pushError(errors, file, `indexingStatus is ${status}, expected ${manifestEntry.indexingStatus}`);
      }

      if (!hasText(raw.slug) || normalizeRoute(raw.slug) !== normalizeRoute(manifestEntry.route)) {
        pushError(errors, file, `slug must match publishing route ${manifestEntry.route}`);
      }
    }

    for (const field of REQUIRED_STRING_FIELDS) {
      if (!hasText(raw[field])) {
        pushError(errors, file, `is missing required field ${field}`);
      }
    }

    const sourceNotes = getTextArray(raw.sourceNotes);
    if (sourceNotes.length < 3) {
      pushError(errors, file, 'must include at least three sourceNotes');
    }

    const evidenceItems = getTextArray(raw.evidenceToCollect);
    if (evidenceItems.length < 3) {
      pushError(errors, file, 'must include at least three evidenceToCollect items');
    }

    const wordCount = getWordCount(getPageText(raw));
    const minimumWords = MIN_WORDS_BY_STATUS[status];
    if (wordCount < minimumWords) {
      pushError(errors, file, `has ${wordCount} source words; expected at least ${minimumWords} for ${status}`);
    }

    if (
      raw.monetisation?.affiliateLink !== null &&
      raw.monetisation?.affiliateLink !== undefined &&
      wordCount < 850
    ) {
      pushError(errors, file, 'uses an affiliate link without enough original analysis depth');
    }

    if (status === 'index') {
      const reviewed = hasText(raw.lastReviewed) ? new Date(`${raw.lastReviewed}T00:00:00.000Z`) : null;
      const reviewDue = hasText(raw.reviewDueDate) ? new Date(`${raw.reviewDueDate}T00:00:00.000Z`) : null;
      if (reviewed && reviewDue && reviewDue <= reviewed) {
        pushError(errors, file, 'reviewDueDate must be after lastReviewed');
      }

      const highValueSnippets = [
        raw.quickAnswer,
        raw.uniqueValueSummary,
        raw.officialSupportContext,
        raw.whenThisDoesNotApply
      ].filter(hasText);

      for (const snippet of highValueSnippets) {
        if (getWordCount(snippet) < 12) continue;

        const normalizedSnippet = normalizeSnippet(snippet);
        const firstFile = indexedSnippets.get(normalizedSnippet);
        if (firstFile) {
          pushError(errors, file, `duplicates an indexable long snippet from ${firstFile}`);
        } else {
          indexedSnippets.set(normalizedSnippet, file);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Data-problems publishing check failed with ${errors.length} issue(s):`);
    for (const error of errors) {
      console.error(`- ${error.file}: ${error.message}`);
    }
    process.exit(1);
  }

  const manifestSummary = DATA_PROBLEM_PUBLISHING_ENTRIES.reduce<Record<DataProblemIndexingStatus, number>>(
    (acc, entry) => {
      acc[entry.indexingStatus] += 1;
      return acc;
    },
    { index: 0, noindex: 0, draft: 0 }
  );

  console.log(
    `Data-problems publishing check passed for ${files.length} JSON files. Manifest: ${manifestSummary.index} index, ${manifestSummary.noindex} noindex.`
  );
}

await main();
