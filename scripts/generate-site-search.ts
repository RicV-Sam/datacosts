import { readFileSync, writeFileSync } from 'node:fs';
import { getIndexableRoutes } from '../src/config/routeCatalog';
import { DATA_PROBLEM_PUBLISHING_ENTRIES } from '../src/config/dataProblemPublishing';
import { guides } from '../src/data/guides';
import { fixPages, getFixPath } from '../src/data/fixes';
import { fibrePages } from '../src/data/fibre/fibrePages';
import { networkPages } from '../src/data/networks';
import { decisionTools } from '../src/data/decisionTools';
import type { SiteSearchItem } from '../src/utils/siteSearch';

const routes = getIndexableRoutes();
const metadata = new Map<string, Omit<SiteSearchItem, 'path'>>();
for (const guide of guides) metadata.set(guide.slug === 'best-data-deals-south-africa' ? '/best-data-deals-south-africa/' : `/guides/${guide.slug}/`, { title: guide.title, description: guide.metaDescription });
for (const fix of fixPages) metadata.set(getFixPath(fix.slug), { title: fix.title, description: fix.metaDescription, keywords: fix.tags.join(' ') });
for (const page of fibrePages) metadata.set(page.path, { title: page.h1, description: page.metaDescription });
for (const page of Object.values(networkPages)) metadata.set(`/network/${page.slug}/`, { title: `${page.networkName} data bundles and network guide`, description: page.intro });
for (const tool of Object.values(decisionTools)) metadata.set(tool.path, { title: tool.title, description: tool.description });
for (const entry of DATA_PROBLEM_PUBLISHING_ENTRIES.filter((entry) => entry.indexingStatus === 'index')) {
  const page = JSON.parse(readFileSync(`src/data/seo-pages/data-problems/${entry.fileName}`, 'utf8'));
  metadata.set(entry.route, { title: page.h1, description: page.metaDescription });
}
metadata.set('/', { title: 'DataCost home', description: 'South African mobile data, airtime and fibre comparisons and help.' });
metadata.set('/fix/', { title: 'Fix a problem', description: 'Find mobile data, airtime, USSD, SIM and router troubleshooting.' });
metadata.set('/best-data-deals-south-africa/', { title: 'Monthly data deal comparisons', description: 'Compare reviewed offers, eligibility, validity and usable data.' });

metadata.set('/buy-data-airtime-south-africa/', { title: 'How to Buy Data and Airtime in South Africa', description: 'Compare top-up routes and check the network, allowance, expiry and full amount before paying.' });
metadata.set('/ussd-codes-south-africa/', { title: 'USSD codes for South Africa', description: 'Find network balance, recharge and self-service instructions.' });
metadata.set('/guides/', { title: 'DataCost guides', description: 'Browse mobile data, airtime and connectivity guides.' });
metadata.set('/network/', { title: 'Mobile networks', description: 'Browse operator data bundles and network guides.' });

function routeLabel(path: string): string {
  const words = path.split('/').filter(Boolean).at(-1)!.replace(/-/g, ' ');
  return words.replace(/\b(ussd|mtn|apn|sim|esim|lte|isp|fno|icasa|wasp|gb)\b/gi, (value) => value.toUpperCase())
    .replace(/\b\d+gb\b/gi, (value) => value.toUpperCase()).replace(/^./, (value) => value.toUpperCase());
}
const preferred = ['/best-data-deals-south-africa/', '/tools/data-bundle-selector/', '/fibre/', '/fix/', '/buy-data-airtime-south-africa/', '/ussd-codes-south-africa/', '/guides/', '/network/'];
const ordered = [...new Set([...preferred.filter((path) => routes.includes(path)), ...routes])];
const items = ordered.map((path) => ({ path, ...(metadata.get(path) ?? { title: routeLabel(path), description: 'Open this DataCost guide.' }) }));
const content = JSON.stringify(items, null, 2) + '\n';
const destination = 'src/data/generated/siteSearch.json';
if (process.argv.includes('--check')) {
  if (readFileSync(destination, 'utf8') !== content) throw new Error('Site search index is out of date. Run npm run generate:site-search.');
} else writeFileSync(destination, content);
console.log(`Site search: ${items.length} canonical published routes; drafts, aliases and noindex pages excluded.`);
