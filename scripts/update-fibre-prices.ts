import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

type FibrePricePackage = {
  id: string;
  ispId: string;
  fnoId: string;
  planName: string;
  downloadMbps: number;
  uploadMbps: number;
  monthlyPrice: number;
  promoPrice: number | null;
  setupNotes: string;
  sourceUrl: string;
  sourceLabel: string;
  checkedAt: string;
  confidence: 'high' | 'medium' | 'low';
  requiresAddressCheck: boolean;
  tags: string[];
};

type FibrePriceSnapshot = {
  checkedAt: string;
  generatedBy: string;
  notes: string;
  prices: FibrePricePackage[];
};

type ExtractorConfig = {
  sourceUrl: string;
  extract: (html: string, existing: FibrePricePackage[]) => FibrePricePackage[];
};

const SNAPSHOT_PATH = path.resolve(process.cwd(), 'src/data/generated/fibrePriceSnapshot.json');
const DRAFT_PATH = path.resolve(process.cwd(), 'src/data/generated/fibrePriceSnapshot.draft.json');
const today = new Date().toISOString().slice(0, 10);
const commit = process.argv.includes('--commit');

function normalizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findPrice(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (!match) return null;
  const raw = match[1].replace(/[^\d]/g, '');
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function updateRows(
  existing: FibrePricePackage[],
  updates: Array<{ id: string; monthlyPrice: number | null; promoPrice?: number | null }>
): FibrePricePackage[] {
  const updateById = new Map(updates.filter((update) => update.monthlyPrice !== null).map((update) => [update.id, update]));

  return existing.map((row) => {
    const update = updateById.get(row.id);
    if (!update) return row;
    return {
      ...row,
      monthlyPrice: update.monthlyPrice ?? row.monthlyPrice,
      promoPrice: update.promoPrice === undefined ? row.promoPrice : update.promoPrice,
      checkedAt: today
    };
  });
}

const extractors: ExtractorConfig[] = [
  {
    sourceUrl: 'https://www.webafrica.co.za/fibre/',
    extract: (html, existing) => {
      const text = normalizeHtml(html);
      return updateRows(existing, [
        {
          id: 'webafrica-openserve-webconnect-40-20',
          monthlyPrice: findPrice(text, /Openserve Webconnect Uncapped 40\/20 Mbps[\s\S]{0,180}?Price:\s*R\s*([\d\s]+)\/month/i)
        },
        {
          id: 'webafrica-vumatel-1000-250',
          monthlyPrice: findPrice(text, /Vumatel Uncapped 1000\/250 Mbps[\s\S]{0,180}?Price:\s*R\s*([\d\s]+)\/month/i)
        },
        {
          id: 'webafrica-octotel-500-200',
          monthlyPrice: findPrice(text, /Octotel Uncapped 500\/200 Mbps[\s\S]{0,180}?Price:\s*R\s*([\d\s]+)\/month/i)
        },
        {
          id: 'webafrica-frogfoot-air-25-10',
          monthlyPrice: findPrice(text, /Frogfoot Air Uncapped 25\/10 Mbps[\s\S]{0,180}?Price:\s*R\s*([\d\s]+)\/month/i)
        }
      ]);
    }
  },
  {
    sourceUrl: 'https://www.axxess.co.za/fibre/uncapped',
    extract: (html, existing) => {
      const text = normalizeHtml(html);
      return updateRows(existing, [
        {
          id: 'axxess-monthly-30-30-example',
          monthlyPrice: findPrice(text, /30\/30Mbps Uncapped Combo[\s\S]{0,220}?R([\d\s]+)/i)
        },
        {
          id: 'axxess-evotel-10-10-example',
          monthlyPrice: findPrice(text, /10\/10Mbps Uncapped Combo[\s\S]{0,220}?R([\d\s]+)/i)
        }
      ]);
    }
  },
  {
    sourceUrl: 'https://shop.rsaweb.co.za/product-category/fibre/ftth/',
    extract: (html, existing) => {
      const text = normalizeHtml(html);
      return updateRows(existing, [
        {
          id: 'rsaweb-openserve-webconnect-40-20',
          monthlyPrice: findPrice(text, /Openserve Web Connect 40\/20Mbps Fibre Uncapped[\s\S]{0,260}?R([\d\s,]+)\s*per month/i)
        },
        {
          id: 'rsaweb-vumatel-30-30',
          monthlyPrice: findPrice(text, /Vumatel 30\/30Mbps Fibre Uncapped[\s\S]{0,260}?thereafter,\s*pay\s*R([\d\s,]+)pm/i),
          promoPrice: findPrice(text, /Vumatel 30\/30Mbps Fibre Uncapped[\s\S]{0,120}?ONLY\s*R([\d\s,]+)/i)
        },
        {
          id: 'rsaweb-vuma-reach-10-10-prepaid',
          monthlyPrice: findPrice(text, /VUMA Reach 10\/10Mbps Prepaid Fibre[\s\S]{0,160}?R([\d\s,]+)/i)
        }
      ]);
    }
  },
  {
    sourceUrl: 'https://www.vox.co.za/fibre-to-the-home/',
    extract: (html, existing) => {
      const text = normalizeHtml(html);
      return updateRows(existing, [
        {
          id: 'vox-25-10-featured',
          monthlyPrice: findPrice(text, /25\/10 Mbps[\s\S]{0,160}?R([\d\s,]+)\s*pm/i)
        }
      ]);
    }
  },
  {
    sourceUrl: 'https://www.mweb.co.za/fibre-provider/openserve',
    extract: (html, existing) => {
      const text = normalizeHtml(html);
      return updateRows(existing, [
        {
          id: 'mweb-openserve-30-30',
          monthlyPrice: findPrice(text, /R\s*([\d\s,]+)\s*pm[\s\S]{0,80}?30Mbps[\s\S]{0,40}?30Mbps/i)
        }
      ]);
    }
  }
];

async function fetchText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'DataCost price snapshot checker (+https://datacost.co.za/contact/)'
      }
    });
    if (!response.ok) {
      console.warn(`Skipping ${url}: HTTP ${response.status}`);
      return null;
    }
    return response.text();
  } catch (error) {
    console.warn(`Skipping ${url}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

async function main(): Promise<void> {
  const raw = await readFile(SNAPSHOT_PATH, 'utf8');
  let snapshot = JSON.parse(raw) as FibrePriceSnapshot;
  let prices = snapshot.prices;

  for (const extractor of extractors) {
    const html = await fetchText(extractor.sourceUrl);
    if (!html) continue;
    prices = extractor.extract(html, prices);
  }

  snapshot = {
    ...snapshot,
    checkedAt: today,
    generatedBy: 'scripts/update-fibre-prices.ts',
    prices
  };

  const targetPath = commit ? SNAPSHOT_PATH : DRAFT_PATH;
  await writeFile(targetPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`Wrote fibre price ${commit ? 'snapshot' : 'draft'} to ${targetPath}.`);
  if (!commit) {
    console.log('Review the draft, then run npm run update:fibre-prices -- --commit to replace the committed snapshot.');
  }
}

await main();
