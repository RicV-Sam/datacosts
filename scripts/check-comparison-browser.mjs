import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const root = path.resolve('dist');
const artifactDir = path.resolve('.codex-temp/comparison-review');
await mkdir(artifactDir, { recursive: true });
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, `.${pathname}${pathname.endsWith('/') ? 'index.html' : ''}`);
    if (!file.startsWith(`${root}${path.sep}`)) throw new Error('Outside output');
    const body = await readFile(file);
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' }[path.extname(file)] ?? 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': mime }); response.end(body);
  } catch { response.writeHead(404); response.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
const results = [];
try {
  await page.setJavaScriptEnabled(false);
  for (const size of [1, 2, 5, 10, 15, 20, 50]) {
    for (const width of [390, 768, 1440]) {
      await page.setViewport({ width, height: 1000 });
      // With application JavaScript disabled, DOMContentLoaded can precede stylesheet
      // completion. Measure only after assets settle, then await their font layout.
      const response = await page.goto(`${origin}/guides/cheapest-${size}gb-data-south-africa/`, { waitUntil: 'networkidle0' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => {
        const comparison = document.querySelector('[data-tier-comparison]') ?? document.querySelector('#comparison-table');
        const text = comparison?.textContent ?? '';
        return { width: innerWidth, pageWidth: document.documentElement.scrollWidth, sourceLinks: comparison?.querySelectorAll('a[href^="https://"]').length ?? 0,
          hasAllocation: text.includes('Anytime') || text.includes('anytime'), hasPrice: /R\d/.test(text), text };
      });
      if (state.pageWidth > width + 1) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].map(el=>({tag:el.tagName,cls:el.className,right:el.getBoundingClientRect().right,text:el.textContent?.slice(0,80)})).filter(el=>el.right > innerWidth+1).slice(0,8)));
      assert.ok(state.pageWidth <= width + 1, `${size}GB overflows at ${width}px`);
      assert.ok(state.sourceLinks > 0 && state.hasAllocation && state.hasPrice, `${size}GB missing useful content without JavaScript`);
      if (size > 1) {
        const parity = await page.evaluate(() => {
          const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)).find(item => item['@type'] === 'ItemList');
          const elements = [...document.querySelectorAll('[data-comparison-offer]')];
          return schema.itemListElement.every(({item}) => {
            const price = `R${Number(item.offers.price).toLocaleString('en-ZA', {maximumFractionDigits:2})}`;
            return elements.filter(el => el.textContent.includes(item.name) && el.textContent.includes(price) &&
              [...el.querySelectorAll('a')].some(link => link.href === item.url)).length >= 2;
          });
        });
        assert.ok(parity, `${size}GB schema differs from mobile/desktop prices or official sources`);
      }
      if (size === 10) assert.ok(state.text.includes('10GB Anytime + 10GB Night Owl'));
      if (size === 2) assert.ok(state.text.includes('14 days') && state.text.includes('30 days'));
      if (size === 10 && width !== 768) {
        await page.screenshot({ path: path.join(artifactDir, `10gb-${width}.png`), fullPage: true });
        if (width === 390) await (await page.$('[data-tier-comparison] article')).screenshot({path: path.join(artifactDir, '10gb-mobile-offer.png')});
        else {
          const area = await page.$('[data-tier-comparison]'); const box = await area.boundingBox();
          await page.screenshot({path: path.join(artifactDir, '10gb-desktop-table.png'), clip: {x:box.x,y:box.y,width:box.width,height:1000},captureBeyondViewport:true});
        }
      }
      results.push({ sizeGb: size, viewportWidth: width, javaScript: false, sourceLinks: state.sourceLinks, pageWidth: state.pageWidth, passed: true });
    }
  }
  // Text enlargement and visible focus on the source links remain useful without hydration.
  await page.setViewport({ width: 390, height: 1000 });
  await page.goto(`${origin}/guides/cheapest-10gb-data-south-africa/`, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  const enlargedState = await page.evaluate(() => ({ pageWidth: document.documentElement.scrollWidth,
    comparisonRight: document.querySelector('[data-tier-comparison]').getBoundingClientRect().right,
    viewportWidth: innerWidth }));
  assert.ok(enlargedState.comparisonRight <= enlargedState.viewportWidth + 1, '200% comparison text creates overflow');
  if (enlargedState.pageWidth > enlargedState.viewportWidth + 1) console.log('Known limitation: unchanged site header overflows at 200% text; comparison content fits.');
  await page.focus('[data-tier-comparison] a[href^="https://"]');
  assert.ok(await page.evaluate(() => document.activeElement?.tagName === 'A'), 'Source link cannot receive keyboard focus');
  const focus = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  assert.notEqual(focus, 'none', 'Source link has no visible focus outline');
  await page.setJavaScriptEnabled(true);
  await page.setViewport({ width: 1440, height: 1000 });
  const errors = []; const assetFailures = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => {
    if (request.url().startsWith(origin) && ['script', 'stylesheet'].includes(request.resourceType())) assetFailures.push(request.url());
  });
  page.on('response', response => {
    if (response.url().startsWith(origin) && ['script', 'stylesheet'].includes(response.request().resourceType()) && response.status() >= 400) assetFailures.push(response.url());
  });
  await page.evaluateOnNewDocument(() => {
    window.__comparisonAppRendered = false;
    document.addEventListener('render-event', () => { window.__comparisonAppRendered = true; }, { once: true });
  });
  if (process.argv.includes('--block-application-scripts')) {
    await page.setRequestInterception(true);
    page.on('request', request => request.url().startsWith(origin) && request.resourceType() === 'script' ? request.abort() : request.continue());
  }
  await page.goto(`${origin}/guides/cheapest-10gb-data-south-africa/`, { waitUntil: 'networkidle0' });
  assert.deepEqual(assetFailures, [], 'Application assets failed to load');
  await page.waitForFunction(() => window.__comparisonAppRendered === true, {timeout: 20000});
  assert.equal(await page.locator('[data-tier-comparison="10"]').wait().then(() => true), true);
  assert.deepEqual(errors, [], 'Hydrated page errors');
  assert.deepEqual(assetFailures, [], 'Application assets failed to load');
  // An already-published page must preserve dated comparisons rather than empty itself as evidence ages.
  await page.evaluateOnNewDocument(() => {
    const OriginalDate = Date;
    const timestamp = OriginalDate.parse('2027-01-15T12:00:00Z');
    window.Date = class extends OriginalDate {
      constructor(...args) { super(...(args.length ? args : [timestamp])); }
      static now() { return timestamp; }
    };
  });
  for (const size of [1, 2, 5, 10, 15, 20, 50]) {
    await page.goto(`${origin}/guides/cheapest-${size}gb-data-south-africa/`, {waitUntil:'networkidle0'});
    await page.waitForFunction(() => window.__comparisonAppRendered === true, {timeout:20000});
    const aged = await page.evaluate(() => ({ text: document.querySelector('#comparison-table').textContent,
      awardBadges: [...document.querySelectorAll('[data-comparison-offer]')].filter(el => /Best R \/ anytime GB|Lowest advertised price|Best overall/.test(el.textContent)).length }));
    assert.ok(aged.text.includes('Recorded reference') || aged.text.includes('recorded references'), `${size}GB aged evidence was not labelled`);
    assert.ok(/R[0-9]/.test(aged.text), `${size}GB references disappeared after publication`);
    assert.equal(aged.awardBadges, 0, `${size}GB stale evidence won an award`);
  }
  // The integrated selector must use the reviewed catalogue and real eligibility controls.
  const toolPage = await browser.newPage();
  const toolErrors = []; toolPage.on('pageerror', error => toolErrors.push(error.message));
  await toolPage.setViewport({ width:390, height:1000 });
  await toolPage.goto(`${origin}/tools/data-bundle-selector/`, {waitUntil:'networkidle0'});
  assert.equal(await toolPage.evaluate(() => [...document.querySelectorAll('article')].some(el => el.textContent.includes('FNB Connect'))), false);
  await toolPage.evaluate(() => {
    const label = [...document.querySelectorAll('label')].find(el => el.textContent.startsWith('FNB Connect:'));
    if (!label) throw new Error('Missing FNB eligibility control');
    label.querySelector('input').click();
  });
  await toolPage.waitForFunction(() => [...document.querySelectorAll('article')].some(el => el.textContent.includes('FNB Connect')));
  await toolPage.evaluate(() => {
    const label = [...document.querySelectorAll('label')].find(el => el.textContent.startsWith('Minimum pooled anytime data'));
    const input = label.querySelector('input');
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(input, '5'); input.dispatchEvent(new Event('input', {bubbles:true}));
    const bank = [...document.querySelectorAll('label')].find(el => el.textContent.startsWith('Nedbank Connect:'));
    bank.querySelector('input').click();
  });
  await toolPage.waitForFunction(() => [...document.querySelectorAll('article')].some(el => el.textContent.includes('Nedbank Connect') && el.textContent.includes('5GB') && /R100/.test(el.textContent)));
  assert.deepEqual(toolErrors, [], 'Integrated selector errors');
  assert.ok(await toolPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Selector mobile page overflows');
  await toolPage.close();
  await writeFile(path.join(artifactDir, 'browser-checks.json'), JSON.stringify({ results, textEnlargement: '200%', enlargedState, sourceLinkFocus: focus, hydrationErrors: errors, assetFailures, agedReferenceChecks: 7, integratedSelectorChecks: 'FNB bank gating and supplemented Nedbank 5GB passed' }, null, 2));
  console.log(`Comparison browser checks passed: ${results.length} page/viewport combinations without JavaScript, 200% comparison text, source-link focus and hydrated 10GB page.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
