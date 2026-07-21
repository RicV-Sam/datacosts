import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  buildSearchSnapshot,
  compareSearchSnapshots,
  normalizeTextFile,
  withFreshSearchBuild
} from '../scripts/check-wp1-search-regression';

const baseHtml = `<!doctype html>
<html><head>
<title data-rh="true">Example title | DataCost</title>
<meta content="Example description" data-rh="true" name="description">
<meta content="index,follow" name="robots">
<link href="https://datacost.co.za/example/" data-rh="true" rel="canonical">
<script data-rh="true" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","@id":"https://datacost.co.za/example/#article","url":"https://datacost.co.za/example/","datePublished":"2026-07-01","dateModified":"2026-07-20","author":{"name":"DataCost","@type":"Organization"}}</script>
</head><body><h1 class="hero">Example heading</h1><p>Visible search text.</p><a class="link" href="/guide/">Guide anchor</a></body></html>`;

async function writeFixture(root: string, html = baseHtml): Promise<string> {
  const dist = path.join(root, 'dist');
  await mkdir(path.join(dist, 'example'), { recursive: true });
  await writeFile(path.join(dist, 'example', 'index.html'), html, 'utf8');
  await writeFile(path.join(dist, 'sitemap.xml'), '<urlset><url><loc>https://datacost.co.za/example/</loc></url></urlset>\n', 'utf8');
  await writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');
  await writeFile(path.join(dist, '_redirects'), '/old /example/ 301\n', 'utf8');
  return dist;
}

async function replaceIn(file: string, from: string, to: string): Promise<void> {
  await writeFile(file, (await readFile(file, 'utf8')).replace(from, to), 'utf8');
}

test('title extraction supports attributes and all material mutation classes are diagnosed', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wp1-search-mutations-'));
  try {
    const dist = await writeFixture(root);
    const baseline = await buildSearchSnapshot(dist);
    assert.equal(baseline.titleCount, 1);
    assert.equal(baseline.routes[0].title, 'Example title | DataCost');
    assert.equal(baseline.structuredDataBlockCount, 1);

    const htmlFile = path.join(dist, 'example', 'index.html');
    const sitemapFile = path.join(dist, 'sitemap.xml');
    const robotsFile = path.join(dist, 'robots.txt');
    const redirectsFile = path.join(dist, '_redirects');
    const mutations: Array<{ name: string; file: string; from: string; to: string; field: string }> = [
      { name: 'title', file: htmlFile, from: 'Example title | DataCost', to: 'Changed title | DataCost', field: 'title' },
      { name: 'meta description', file: htmlFile, from: 'Example description', to: 'Changed description', field: 'description' },
      { name: 'H1', file: htmlFile, from: 'Example heading', to: 'Changed heading', field: 'h1' },
      { name: 'canonical', file: htmlFile, from: 'https://datacost.co.za/example/', to: 'https://datacost.co.za/changed/', field: 'canonical' },
      { name: 'robots meta', file: htmlFile, from: 'index,follow', to: 'noindex,follow', field: 'robots' },
      { name: 'visible text', file: htmlFile, from: 'Visible search text.', to: 'Changed visible search text.', field: 'visibleTextHash' },
      { name: 'internal-link anchor', file: htmlFile, from: 'Guide anchor', to: 'Changed anchor', field: 'internalLinksHash' },
      { name: 'internal-link destination', file: htmlFile, from: 'href="/guide/"', to: 'href="/other/"', field: 'internalLinksHash' },
      { name: 'sitemap membership', file: sitemapFile, from: '/example/', to: '/changed/', field: 'membership' },
      { name: 'JSON-LD @type', file: htmlFile, from: '"@type":"Article"', to: '"@type":"Person"', field: 'structuredDataHash' },
      { name: 'JSON-LD @id', file: htmlFile, from: '/example/#article', to: '/example/#changed', field: 'structuredDataHash' },
      { name: 'JSON-LD dateModified', file: htmlFile, from: '"dateModified":"2026-07-20"', to: '"dateModified":"2026-07-21"', field: 'structuredDataHash' },
      { name: 'JSON-LD canonical URL', file: htmlFile, from: '"url":"https://datacost.co.za/example/"', to: '"url":"https://datacost.co.za/other/"', field: 'structuredDataHash' },
      { name: 'redirect rule', file: redirectsFile, from: '/old /example/ 301', to: '/old /other/ 302', field: 'content' },
      { name: 'robots file', file: robotsFile, from: 'Allow: /', to: 'Disallow: /private/', field: 'content' }
    ];

    for (const mutation of mutations) {
      await t.test(mutation.name, async () => {
        const original = await readFile(mutation.file, 'utf8');
        await replaceIn(mutation.file, mutation.from, mutation.to);
        const actual = await buildSearchSnapshot(dist);
        const differences = compareSearchSnapshots(baseline, actual);
        assert.ok(differences.some((difference) => difference.field === mutation.field), JSON.stringify(differences, null, 2));
        await writeFile(mutation.file, original, 'utf8');
      });
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('cross-platform line endings, final newlines, attribute order and JSON object-key order are semantic no-ops', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wp1-search-normalization-'));
  try {
    const dist = await writeFixture(root);
    const baseline = await buildSearchSnapshot(dist);
    const htmlFile = path.join(dist, 'example', 'index.html');
    const reordered = baseHtml
      .replace('<meta content="Example description" data-rh="true" name="description">', '<meta name="description" data-rh="true" content="Example description">')
      .replace('{"@context":"https://schema.org","@type":"Article","@id":"https://datacost.co.za/example/#article","url":"https://datacost.co.za/example/","datePublished":"2026-07-01","dateModified":"2026-07-20","author":{"name":"DataCost","@type":"Organization"}}', '{"author":{"@type":"Organization","name":"DataCost"},"dateModified":"2026-07-20","datePublished":"2026-07-01","url":"https://datacost.co.za/example/","@id":"https://datacost.co.za/example/#article","@type":"Article","@context":"https://schema.org"}')
      .replace(/\n/g, '\r\n');
    await writeFile(htmlFile, reordered, 'utf8');
    await writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\r\nAllow: /\r\n\r\n', 'utf8');
    await writeFile(path.join(dist, '_redirects'), '/old /example/ 301\r\n\r\n', 'utf8');
    const actual = await buildSearchSnapshot(dist);
    assert.deepEqual(compareSearchSnapshots(baseline, actual), []);
    assert.equal(normalizeTextFile('one\r\ntwo\r\n\r\n'), 'one\ntwo');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('normal checking uses a dedicated fresh build and ignores a stale repository dist', async () => {
  const staleRoot = await mkdtemp(path.join(os.tmpdir(), 'wp1-search-stale-'));
  try {
    await writeFixture(staleRoot, baseHtml.replace('Example title', 'Stale title'));
    const snapshot = await withFreshSearchBuild(
      (dist) => buildSearchSnapshot(dist),
      {
        buildRunner: async (outDir) => {
          await mkdir(outDir, { recursive: true });
          const runnerRoot = path.dirname(outDir);
          await writeFixture(runnerRoot, baseHtml.replace('Example title', 'Fresh title'));
        }
      }
    );
    assert.equal(snapshot.routes[0].title, 'Fresh title | DataCost');
  } finally {
    await rm(staleRoot, { recursive: true, force: true });
  }
});

test('malformed JSON-LD fails with a route-level diagnostic', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wp1-search-jsonld-'));
  try {
    const dist = await writeFixture(root, baseHtml.replace('"@type":"Article"', '"@type":'));
    await assert.rejects(() => buildSearchSnapshot(dist), /Malformed JSON-LD on \/example\//);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

