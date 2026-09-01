import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { networkStats } from '../src/data';
import { fibrePageBySlug, fibreSourceById } from '../src/data/fibre';
import { networkPages } from '../src/data/networks';
import { getRouteModifiedIso } from '../src/seo/contentDates';

const unsupportedRankingPatterns = [
  /usually wins/i,
  /premium network reliability/i,
  /strong national footprint/i,
  /very strong national footprint/i,
  /reliable urban performance/i,
  /often leads/i,
  /broader network performance/i,
  /stronger listed .* value/i
];

function assertNoUnsupportedRankings(value: unknown, context: string): void {
  const content = JSON.stringify(value);
  for (const pattern of unsupportedRankingPatterns) {
    assert.doesNotMatch(content, pattern, `${context} contains unsupported ranking language: ${pattern}`);
  }
}

test('network comparison summaries require current price rows and local coverage evidence', () => {
  for (const [slug, page] of Object.entries(networkPages)) {
    assertNoUnsupportedRankings(page, `network page ${slug}`);

    for (const row of page.comparisonSummary ?? []) {
      assert.equal(row.usuallyCheapest, 'Compare current rows', `${slug}: ${row.network} price guidance`);
      assert.equal(row.coverage, 'Official map + local test', `${slug}: ${row.network} coverage guidance`);
    }
  }

  assert.ok(networkStats.length > 0);
  for (const stats of networkStats) {
    assert.equal(stats.resilience, 'No independent benchmark', `${stats.network} resilience claim`);
    assert.match(stats.coverage, /official map|home 5G coverage/i, `${stats.network} coverage guidance`);
  }
});

test('homepage and Vodacom-vs-MTN copy do not hard-code an unsupported winner', () => {
  const verdictSource = readFileSync(new URL('../src/components/Verdict.tsx', import.meta.url), 'utf8');
  const comparisonSource = readFileSync(new URL('../src/pages/VodacomVsMTN.tsx', import.meta.url), 'utf8');
  const networkPageSource = readFileSync(new URL('../src/pages/NetworkPage.tsx', import.meta.url), 'utf8');
  const travelSimsSource = readFileSync(new URL('../src/pages/TravelSimsPage.tsx', import.meta.url), 'utf8');

  assert.match(verdictSource, /Three checks before choosing/);
  assert.doesNotMatch(verdictSource, /Final Verdict|coverage-first|strong budget/i);
  assert.doesNotMatch(comparisonSource, /Vodacom and MTN 1GB|speeds, and coverage|two largest networks|Best listed|stronger listed/i);
  assert.match(comparisonSource, /see where like-for-like matches are unavailable/i);
  assert.match(comparisonSource, /Allocation sizes differ, so these are not a direct winner comparison/i);
  assert.match(comparisonSource, /bundle\.volume === '1GB' && hasThirtyDayValidity\(bundle\.validity\)/);
  assert.match(comparisonSource, /vodacom1Gb\.price === mtn1Gb\.price/);
  assert.match(comparisonSource, /coverage still requires a current map check and local test/i);
  assert.match(networkPageSource, /Pricing rows show their source-check status/);
  assert.doesNotMatch(networkPageSource, /Pricing rows are source checked/);
  assert.doesNotMatch(
    travelSimsSource,
    /Best for convenience|Best for 2\+ week stays|better value per GB|want better value|can cost more per GB|lower long-stay cost|smart money move|Better rates|fastest option/i
  );
  assert.match(travelSimsSource, /compare the current total cost, allowance and validity/i);
});

test('fibre comparisons cite current Rain evidence without declaring a universal winner', () => {
  for (const slug of ['fibre-vs-lte-south-africa', 'fibre-vs-rain-5g-south-africa']) {
    const page = fibrePageBySlug[slug];
    assert.ok(page, `missing fibre comparison page ${slug}`);
    assert.ok(page.sourceIds.includes('rain-5g-home'), `${slug} must cite Rain's current product page`);
    assert.ok(page.sourceIds.includes('rain-legal'), `${slug} must cite Rain's current terms`);

    const content = JSON.stringify(page);
    assert.doesNotMatch(content, /Fibre wins|LTE\/5G wins|Fibre usually safer|Best answer for many homes/i);
  }

  assert.equal(fibreSourceById['rain-5g-home']?.url, 'https://www.rain.co.za/5Ghomewifi');
  assert.equal(fibreSourceById['rain-legal']?.url, 'https://www.rain.co.za/legal');
});

test('materially revised comparison surfaces expose the current editorial review date', () => {
  for (const route of [
    '/fibre/',
    '/fibre/fibre-vs-lte-south-africa/',
    '/fibre/fibre-vs-rain-5g-south-africa/',
    '/guides/vodacom-vs-mtn-data-prices/',
    '/travel-sims-south-africa/'
  ]) {
    assert.equal(getRouteModifiedIso(route), '2026-09-01T00:00:00.000Z', route);
  }
});
