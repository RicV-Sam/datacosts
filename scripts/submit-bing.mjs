import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_SITE_URL = 'https://datacost.co.za';
const DEFAULT_SITEMAP = 'https://datacost.co.za/sitemap.xml';
const API_BASE = 'https://ssl.bing.com/webmaster/api.svc/json';
const MAX_BATCH_SIZE = 500;

function getArgValue(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function parsePositiveInteger(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error(`${label} must be a positive integer`);
  }
  return parsed;
}

function parseNonNegativeInteger(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative integer`);
  }
  return parsed;
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

async function readText(source) {
  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source}: HTTP ${response.status}`);
    }
    return response.text();
  }

  const file = path.resolve(process.cwd(), source);
  return readFile(file, 'utf8');
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
}

function urlBlocksFromXml(xml) {
  return [...xml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)].map((match) => match[1]);
}

async function readSitemapUrlBlocks(source, visited = new Set()) {
  const absoluteSource = /^https?:\/\//i.test(source)
    ? new URL(source).toString()
    : path.resolve(process.cwd(), source);

  if (visited.has(absoluteSource)) return [];
  visited.add(absoluteSource);

  const xml = await readText(source);
  if (!/<sitemapindex\b/i.test(xml)) return urlBlocksFromXml(xml);

  const nested = [];
  for (const loc of locsFromXml(xml)) {
    nested.push(...await readSitemapUrlBlocks(loc, visited));
  }
  return nested;
}

async function readSitemapUrls({ source, includeAll, sinceDays }) {
  const cutoffDate = toIsoDate(new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000));
  const urls = [];

  for (const block of await readSitemapUrlBlocks(source)) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    if (!loc) continue;
    if (!includeAll && (!lastmod || lastmod < cutoffDate)) continue;
    urls.push(decodeXml(loc));
  }

  return urls;
}

function prepareUrls(urls, siteUrl, limit) {
  const siteOrigin = new URL(siteUrl).origin;
  const seen = new Set();
  const cleaned = [];

  for (const raw of urls) {
    const url = new URL(raw);
    if (url.origin !== siteOrigin) continue;
    const normalized = url.toString();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    cleaned.push(normalized);
    if (cleaned.length >= limit) break;
  }

  return cleaned;
}

function apiUrl(method, apiKey, params = {}) {
  const url = new URL(`${API_BASE}/${method}`);
  url.searchParams.set('apikey', apiKey);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url;
}

async function bingRequest(method, apiKey, options = {}) {
  const response = await fetch(apiUrl(method, apiKey, options.params), {
    method: options.body ? 'POST' : 'GET',
    headers: options.body ? { 'Content-Type': 'application/json; charset=utf-8' } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await response.text();
  let json = null;

  if (text.trim()) {
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
  }

  if (!response.ok) {
    const detail = json ? JSON.stringify(json) : text.trim();
    throw new Error(`Bing ${method} failed with HTTP ${response.status}${detail ? `: ${detail}` : ''}`);
  }

  return json;
}

async function getQuota(apiKey, siteUrl) {
  const data = await bingRequest('GetUrlSubmissionQuota', apiKey, {
    params: { siteUrl }
  });
  const quota = data?.d ?? data ?? {};
  const daily = Number(quota.DailyQuota);
  const monthly = Number(quota.MonthlyQuota);

  return {
    daily: Number.isFinite(daily) ? daily : Infinity,
    monthly: Number.isFinite(monthly) ? monthly : Infinity
  };
}

function chunks(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

async function submitBatch(apiKey, siteUrl, urlList) {
  await bingRequest('SubmitUrlbatch', apiKey, {
    body: { siteUrl, urlList }
  });
}

async function main() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY || process.env.BING_API_KEY || '';
  const siteUrl = getArgValue('site', process.env.BING_SITE_URL || DEFAULT_SITE_URL);
  const sitemap = getArgValue('sitemap', process.env.BING_SITEMAP_URL || DEFAULT_SITEMAP);
  const limit = parsePositiveInteger(getArgValue('limit', process.env.BING_SUBMIT_LIMIT || '10000'), '--limit');
  const sinceDays = parseNonNegativeInteger(getArgValue('since-days', process.env.BING_SINCE_DAYS || '14'), '--since-days');
  const includeAll = hasFlag('all') || process.env.BING_SUBMIT_ALL === '1';
  const dryRun = hasFlag('dry-run') || process.env.BING_DRY_RUN === '1';

  if (!apiKey && !dryRun) {
    throw new Error('BING_WEBMASTER_API_KEY is required');
  }

  const urls = prepareUrls(await readSitemapUrls({ source: sitemap, includeAll, sinceDays }), siteUrl, limit);
  if (urls.length === 0) {
    console.log(`Bing: no sitemap URLs matched ${includeAll ? '--all' : `last ${sinceDays} day(s)`}.`);
    return;
  }

  if (dryRun) {
    console.log(`Bing dry run: would submit ${urls.length} URL(s) for ${siteUrl}${includeAll ? ' (--all)' : ` changed in the last ${sinceDays} day(s)`}`);
    for (const url of urls.slice(0, 20)) console.log(`- ${url}`);
    if (urls.length > 20) console.log(`...and ${urls.length - 20} more`);
    return;
  }

  const quota = await getQuota(apiKey, siteUrl);
  const allowance = Math.min(urls.length, quota.daily, quota.monthly);

  if (allowance < 1) {
    console.log(`Bing quota is exhausted for ${siteUrl}. Daily: ${quota.daily}, monthly: ${quota.monthly}`);
    return;
  }

  const submitUrls = urls.slice(0, allowance);
  const batches = chunks(submitUrls, MAX_BATCH_SIZE);

  for (let i = 0; i < batches.length; i += 1) {
    await submitBatch(apiKey, siteUrl, batches[i]);
    console.log(`Submitted Bing batch ${i + 1}/${batches.length} (${batches[i].length} URL(s))`);
  }

  console.log(`Submitted ${submitUrls.length} URL(s) to Bing for ${siteUrl}.`);
  if (submitUrls.length < urls.length) {
    console.log(`Skipped ${urls.length - submitUrls.length} URL(s) because of quota or --limit.`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
