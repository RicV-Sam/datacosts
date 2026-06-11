import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_HOST = 'datacost.co.za';
const DEFAULT_ENDPOINT = 'https://www.bing.com/indexnow';
const MAX_URLS_PER_REQUEST = 10_000;
const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;

function getArgValue(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

async function discoverIndexNowKey(publicDir) {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY.trim();
  }

  const entries = await readdir(publicDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.txt')) {
      continue;
    }

    const candidateKey = entry.name.slice(0, -4);
    if (!KEY_PATTERN.test(candidateKey)) {
      continue;
    }

    const content = (await readFile(path.join(publicDir, entry.name), 'utf8')).trim();
    if (content === candidateKey) {
      return candidateKey;
    }
  }

  throw new Error(`Could not find an IndexNow key file in ${publicDir}`);
}

async function readSitemapUrls(publicDir, host, sinceDays, includeAll) {
  const entries = await readdir(publicDir, { withFileTypes: true });
  const sitemapFiles = entries
    .filter((entry) => entry.isFile() && /^sitemap-.+\.xml$/.test(entry.name))
    .map((entry) => path.join(publicDir, entry.name));
  const cutoffDate = toIsoDate(new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000));
  const urls = new Set();

  for (const sitemapFile of sitemapFiles) {
    const xml = await readFile(sitemapFile, 'utf8');
    const urlBlocks = xml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g);

    for (const match of urlBlocks) {
      const block = match[1];
      const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
      const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];

      if (!loc) {
        continue;
      }

      const decodedLoc = decodeXml(loc);
      const url = new URL(decodedLoc);

      if (url.hostname !== host) {
        continue;
      }

      if (!includeAll && (!lastmod || lastmod < cutoffDate)) {
        continue;
      }

      urls.add(url.toString());
    }
  }

  return [...urls].sort();
}

function shouldRetryStatus(status) {
  return status === 403 || status >= 500;
}

async function submitIndexNow({ endpoint, host, key, keyLocation, urls, dryRun, retries, retryDelayMs }) {
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls
  };

  if (dryRun) {
    console.log(`IndexNow dry run: would submit ${urls.length} URL(s) to ${endpoint}`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  let lastError;
  for (let attempt = 1; attempt <= retries + 1; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'DataCost IndexNow notifier'
        },
        body: JSON.stringify(payload)
      });

      const body = await response.text();
      const bodySuffix = body ? ` Body: ${body.slice(0, 500)}` : '';

      if (response.status === 200 || response.status === 202) {
        console.log(`IndexNow accepted ${urls.length} URL(s) with HTTP ${response.status}.${bodySuffix}`);
        return;
      }

      lastError = Object.assign(
        new Error(`IndexNow submission failed with HTTP ${response.status}.${bodySuffix}`),
        { retryable: shouldRetryStatus(response.status) }
      );
      throw lastError;
    } catch (error) {
      lastError = error;
      const retryable = error && typeof error === 'object' && 'retryable' in error
        ? Boolean(error.retryable)
        : true;
      if (attempt <= retries && retryable) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`IndexNow submission attempt ${attempt} failed: ${message} Retrying in ${retryDelayMs}ms...`);
        await sleep(retryDelayMs);
        continue;
      }

      throw lastError;
    }
  }
}

async function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const host = getArgValue('host', process.env.INDEXNOW_HOST || DEFAULT_HOST);
  const endpoint = getArgValue('endpoint', process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT);
  const sinceDays = Number(getArgValue('since-days', process.env.INDEXNOW_SINCE_DAYS || '14'));
  const retries = Number(getArgValue('retries', process.env.INDEXNOW_RETRIES || '2'));
  const retryDelayMs = Number(getArgValue('retry-delay-ms', process.env.INDEXNOW_RETRY_DELAY_MS || '15000'));
  const includeAll = hasFlag('all') || process.env.INDEXNOW_SUBMIT_ALL === '1';
  const dryRun = hasFlag('dry-run') || process.env.INDEXNOW_DRY_RUN === '1';

  if (!Number.isFinite(sinceDays) || sinceDays < 0) {
    throw new Error(`Invalid --since-days value: ${sinceDays}`);
  }

  if (!Number.isFinite(retries) || retries < 0 || !Number.isInteger(retries)) {
    throw new Error(`Invalid --retries value: ${retries}`);
  }

  if (!Number.isFinite(retryDelayMs) || retryDelayMs < 0) {
    throw new Error(`Invalid --retry-delay-ms value: ${retryDelayMs}`);
  }

  const key = await discoverIndexNowKey(publicDir);
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `https://${host}/${key}.txt`;
  const urls = await readSitemapUrls(publicDir, host, sinceDays, includeAll);

  if (urls.length === 0) {
    console.log(`IndexNow: no sitemap URLs matched ${includeAll ? '--all' : `last ${sinceDays} day(s)`}.`);
    return;
  }

  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`IndexNow URL batch has ${urls.length} URLs, exceeding ${MAX_URLS_PER_REQUEST}.`);
  }

  await submitIndexNow({ endpoint, host, key, keyLocation, urls, dryRun, retries, retryDelayMs });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
