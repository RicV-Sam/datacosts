import { execFileSync, execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const DEFAULT_EXPORTS = [
  'C:\\Users\\ricca\\Downloads\\Not found (404).zip',
  'C:\\Users\\ricca\\Downloads\\Page with redirect.zip',
  'C:\\Users\\ricca\\Downloads\\Excluded by ‘noindex’ tag.zip',
  'C:\\Users\\ricca\\Downloads\\currently not indexed.zip',
  'C:\\Users\\ricca\\Downloads\\Crawled - currently not indexed.zip'
];

const ISSUE_BY_FILENAME = [
  [/not found/i, 'Not found (404)'],
  [/page with redirect/i, 'Page with redirect'],
  [/noindex/i, 'Excluded by noindex tag'],
  [/^currently not indexed/i, 'Discovered currently not indexed'],
  [/crawled/i, 'Crawled currently not indexed']
];

const UTILITY_PATHS = new Set(['/sitemap.xml', '/sitemap-trust.xml', '/ads.txt']);

function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((value) => value.length > 0)) rows.push(row);
  if (rows.length === 0) return [];

  const headers = rows[0].map((header) => header.trim().replace(/^\uFEFF/, ''));
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function normalizeRoute(route) {
  if (!route || route === '/') return '/';
  return route.endsWith('/') ? route : `${route}/`;
}

function routeFromUrl(url) {
  const parsed = new URL(url);
  return normalizeRoute(parsed.pathname);
}

function readRouteFacts() {
  const command = [
    "import { getIndexableRoutes, getNoindexRoutes, getSitemapRoutes } from './src/config/routeCatalog.ts';",
    "import { REDIRECT_ALIASES, getRedirectAliasRoutes } from './src/config/redirectAliases.ts';",
    'console.log(JSON.stringify({ indexable: getIndexableRoutes(), noindex: getNoindexRoutes(), sitemap: getSitemapRoutes(), redirects: getRedirectAliasRoutes(), aliases: REDIRECT_ALIASES }));'
  ].join(' ');

  const output = execSync(`npx tsx -e ${JSON.stringify(command)}`, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  const facts = JSON.parse(output);
  return {
    indexable: new Set(facts.indexable.map(normalizeRoute)),
    noindex: new Set(facts.noindex.map(normalizeRoute)),
    sitemap: new Set(facts.sitemap.map(normalizeRoute)),
    redirects: new Set(facts.redirects.map(normalizeRoute)),
    aliasTargetByFrom: new Map(facts.aliases.map((alias) => [normalizeRoute(alias.from), normalizeRoute(alias.to)]))
  };
}

function issueFromFilename(filePath) {
  const filename = path.basename(filePath);
  const match = ISSUE_BY_FILENAME.find(([pattern]) => pattern.test(filename));
  return match ? match[1] : filename.replace(/\.zip$/i, '');
}

function extractTableRows(zipPath) {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'datacost-gsc-'));
  try {
    execFileSync('tar', ['-xf', zipPath, '-C', tempDir], { stdio: ['ignore', 'ignore', 'pipe'] });
    const tablePath = path.join(tempDir, 'Table.csv');
    return parseCsv(readFileSync(tablePath, 'utf8'));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function classifyUrl(url, issue, facts) {
  const parsed = new URL(url);
  const route = routeFromUrl(url);

  if (parsed.hostname === 'freehub.datacost.co.za') {
    return {
      bucket: 'manual_gsc_action',
      action: 'Exclude from DataCost repo work; handle via GSC removals or legacy Freehub host control.'
    };
  }

  if (parsed.hostname !== 'datacost.co.za' || parsed.protocol !== 'https:') {
    return {
      bucket: 'expected',
      action: 'Expected host canonicalization or non-apex variant; keep host-level redirects/canonical signals.'
    };
  }

  if (UTILITY_PATHS.has(parsed.pathname)) {
    return {
      bucket: 'expected',
      action: 'Utility file does not need to be indexed.'
    };
  }

  if (facts.redirects.has(route)) {
    return {
      bucket: 'expected',
      action: `Legacy alias; canonical target is ${facts.aliasTargetByFrom.get(route) ?? 'configured redirect target'}.`
    };
  }

  if (facts.noindex.has(route)) {
    return {
      bucket: 'expected',
      action: 'Intentional noindex route; keep out of sitemap and monitor for accidental internal prominence.'
    };
  }

  if (issue === 'Not found (404)') {
    return {
      bucket: 'repo_fix',
      action: facts.indexable.has(route)
        ? 'Known route reported as 404; verify deployment and generated output.'
        : 'Unknown DataCost URL; add redirect alias if a canonical replacement exists.'
    };
  }

  if (facts.indexable.has(route)) {
    return {
      bucket: 'content_rescue',
      action: facts.sitemap.has(route)
        ? 'Indexable sitemap URL; improve internal links/content differentiation and monitor.'
        : 'Indexable route missing from sitemap; review route catalog and sitemap generation.'
    };
  }

  return {
    bucket: 'repo_fix',
    action: 'Unknown DataCost URL; verify route catalog, sitemap, and internal links.'
  };
}

function main() {
  const zipPaths = process.argv.slice(2);
  const inputs = zipPaths.length > 0 ? zipPaths : DEFAULT_EXPORTS;
  const facts = readRouteFacts();
  const issueSummaries = [];
  const bucketCounts = new Map();

  for (const zipPath of inputs) {
    const issue = issueFromFilename(zipPath);
    const rows = extractTableRows(zipPath);
    const classifications = rows.map((row) => {
      const result = classifyUrl(row.URL, issue, facts);
      bucketCounts.set(result.bucket, (bucketCounts.get(result.bucket) ?? 0) + 1);
      return { issue, url: row.URL, lastCrawled: row['Last crawled'], ...result };
    });

    issueSummaries.push({
      issue,
      rows: rows.length,
      buckets: classifications.reduce((acc, item) => {
        acc[item.bucket] = (acc[item.bucket] ?? 0) + 1;
        return acc;
      }, {}),
      repoFixUrls: classifications.filter((item) => item.bucket === 'repo_fix').map((item) => item.url),
      contentRescueUrls: classifications.filter((item) => item.bucket === 'content_rescue').map((item) => item.url)
    });
  }

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    inputs,
    totals: Object.fromEntries(bucketCounts),
    issues: issueSummaries
  }, null, 2));
}

main();
