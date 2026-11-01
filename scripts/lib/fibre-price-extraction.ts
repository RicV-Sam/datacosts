import { load } from 'cheerio';
import type { FibrePricePackage, FibrePriceSnapshot } from '../../src/data/fibre/fibrePricing';

export type PriceExtraction =
  | { status: 'matched'; monthlyPrice: number; promoPrice: number | null; promotionTerms?: string }
  | { status: 'unresolved'; reason: string };

const unresolved = (reason: string): PriceExtraction => ({ status: 'unresolved', reason });
const textOnly = (html: string): string => {
  const doc = load(html);
  doc('script, style, noscript').remove();
  doc('br').replaceWith(' ');
  doc('p, div, li, h1, h2, h3, h4, td, tr, section, option').append(' ');
  return doc.text().replace(/\s+/g, ' ').trim();
};

/** Accept one currency value; never turn cents or adjacent prices into whole rand. */
export function parseRand(raw: string | undefined): number | null {
  if (!raw) return null;
  const input = raw.trim().replace(/^R\s*/i, '').replace(/[\s\u00a0\u202f]/g, '');
  if (!/^\d[\d.,]*$/.test(input)) return null;
  const lastSeparator = Math.max(input.lastIndexOf('.'), input.lastIndexOf(','));
  const decimalDigits = input.length - lastSeparator - 1;
  const hasDecimal = lastSeparator >= 0 && decimalDigits >= 1 && decimalDigits <= 2;
  const whole = hasDecimal ? input.slice(0, lastSeparator) : input;
  const fraction = hasDecimal ? input.slice(lastSeparator + 1) : '';
  if (!/^\d+$/.test(whole) && !/^\d{1,3}([.,]\d{3})+$/.test(whole)) return null;
  if (hasDecimal && whole.includes(input[lastSeparator])) return null;
  const value = Number(`${whole.replace(/[.,]/g, '')}${fraction ? `.${fraction}` : ''}`);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function matched(monthlyPrice: number | null, promoPrice: number | null = null, promotionTerms?: string): PriceExtraction {
  if (monthlyPrice === null || monthlyPrice < 100 || monthlyPrice > 5000) return unresolved('Missing or out-of-range ongoing price');
  if (promotionTerms !== undefined && promoPrice === null) return unresolved('Missing or invalid introductory price');
  if (promoPrice !== null && (promoPrice <= 0 || promoPrice >= monthlyPrice || !promotionTerms?.trim())) return unresolved('Introductory price needs a lower amount and explicit conditions');
  return { status: 'matched', monthlyPrice, promoPrice, ...(promotionTerms ? { promotionTerms } : {}) };
}

export function extractRsawebPrice(row: FibrePricePackage, html: string): PriceExtraction {
  const vendor = row.fnoId === 'vuma-reach' ? 'vumareach' : row.fnoId;
  const cadence = row.tags.includes('prepaid') ? 'prepaid' : 'monthly';
  const doc = load(html);
  const cards = doc('[data-vendor][data-speed-download][data-speed-upload][data-price]').toArray().filter(el => {
    const card = doc(el);
    return card.attr('data-vendor') === vendor && card.attr('data-prepaid') === cadence &&
      card.attr('data-speed-download') === String(row.downloadMbps) && card.attr('data-speed-upload') === String(row.uploadMbps);
  });
  if (cards.length !== 1) return unresolved(`Expected one ${vendor} ${cadence} ${row.downloadMbps}/${row.uploadMbps} product; found ${cards.length}`);
  const card = doc(cards[0]);
  const price = parseRand(card.attr('data-price'));
  const text = card.text().replace(/\s+/g, ' ').trim();
  const visible = [...text.matchAll(/R\s*([\d\s.,]+)\s*per month\b/gi)];
  if (visible.length !== 1 && cadence === 'monthly') return unresolved('No unique displayed ongoing price');
  if (visible.length && parseRand(visible[0][1]) !== price) return unresolved('Provider attribute and displayed ongoing price conflict; retain both for review');
  const intro = /Only\s+R\s*([\d\s.,]+)\s*pm\s+up to\s+(\d+)\s+months?,\s*then pay\s+R\s*([\d\s.,]+)\s*pm\s+from month\s+(\d+)/i.exec(text);
  if (intro) {
    if (parseRand(intro[3]) !== price) return unresolved('Introductory card and ongoing price conflict');
    return matched(price, parseRand(intro[1]), `Up to ${intro[2]} months, then the ongoing price from month ${intro[4]}; confirm eligibility and processing fees with RSAWEB.`);
  }
  if (/first month|limited time|\bpromo\b|\bOnly\s+R/i.test(text)) return unresolved('Promotion detected without unambiguous price and duration');
  return matched(price);
}

export function extractAxxessPrice(row: FibrePricePackage, html: string): PriceExtraction {
  if (row.tags.includes('prepaid')) return unresolved('Monthly catalogue cannot confirm a prepaid variant');
  if (row.fnoId === 'multi-network') return unresolved('Generic speed example has no single FNO/product identity');
  const doc = load(html);
  const panels = doc('.fibrecompare-panel').toArray().filter(el =>
    doc(el).find('img').toArray().some(img => doc(img).attr('src')?.match(new RegExp(`/fibrelogo-${row.fnoId}(?:[-.]|$)`, 'i'))));
  if (panels.length !== 1) return unresolved(`Expected one ${row.fnoId} product panel; found ${panels.length}`);
  const options = doc(panels[0]).find('option[data-pid]').toArray().filter(el =>
    doc(el).attr('data-downloadspeed') === `${row.downloadMbps}Mbps` && doc(el).attr('data-uploadspeed') === `${row.uploadMbps}Mbps`);
  if (options.length !== 1) return unresolved(`Expected one exact ${row.fnoId} speed variant; found ${options.length}`);
  const option = doc(options[0]);
  const current = parseRand(option.attr('data-price'));
  const ongoing = parseRand(option.attr('data-oldprice'));
  if (option.attr('data-oldprice')?.trim() && ongoing === null) return unresolved('Invalid regular price');
  const terms = textOnly(option.attr('data-promo') ?? '');
  if (ongoing !== null && ongoing !== current) {
    const after = /(?:thereafter|then(?: pay)?)\s+R\s*([\d\s.,]+)/i.exec(terms);
    const duration = /\b(?:first|up to|following)\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+months?\b|\bactivation month\s+and\s+(?:the\s+)?following month\b/i.test(terms);
    if (!after || parseRand(after[1]) !== ongoing || !duration) return unresolved('Struck-through price and promotion duration do not establish the ongoing charge');
    return matched(ongoing, current, terms);
  }
  if (terms) return unresolved('Promotion detected without distinct introductory and ongoing prices');
  return matched(current);
}

export function extractAfrihostPrepaidPrice(row: FibrePricePackage, html: string): PriceExtraction {
  if (row.fnoId !== 'vumatel' || !/Vuma Reach/i.test(row.planName) || !row.tags.includes('prepaid')) return unresolved('Require an explicit Vuma Reach prepaid identity before matching the provider catalogue');
  const encoded = load(html)('script#__NUXT_DATA__').text();
  if (!encoded) return unresolved('Provider serialized catalogue not found');
  let parsed: unknown;
  try { parsed = JSON.parse(encoded); } catch { return unresolved('Invalid provider catalogue JSON'); }
  if (!Array.isArray(parsed)) return unresolved('Unrecognized provider catalogue format');
  const data: unknown[] = parsed;
  const value = (ref: unknown): unknown => typeof ref === 'number' && Number.isInteger(ref) && ref >= 0 && ref < data.length ? data[ref] : undefined;
  const prices: number[] = [];
  for (const candidate of data) {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) continue;
    const entry = candidate as Record<string, unknown>;
    const name = value(entry.name);
    const attr = value(entry.attributes);
    if (typeof name !== 'string' || !/Vuma Reach Prepaid Fibre$/i.test(name) || !attr || typeof attr !== 'object') continue;
    const attributes = attr as Record<string, unknown>;
    if (value(attributes.speed_download) !== row.downloadMbps || value(attributes.speed_upload) !== row.uploadMbps) continue;
    const raw = value(entry.price);
    const price = typeof raw === 'string' ? parseRand(raw) : null;
    if (price !== null) prices.push(price);
  }
  return prices.length === 1 ? matched(prices[0]) : unresolved(`Expected one Vuma Reach prepaid speed/price product; found ${prices.length}`);
}

const WEB_PRODUCTS: Record<string, { code: string; description: string; fno: string }> = {
  'webafrica-openserve-webconnect-40-20': { code: 'FTTH-WEBCONNECT-UNC-C-40-20-WHMIG-3350', description: 'Openserve Webconnect Uncapped 40/20 Mbps', fno: 'openserve' },
  'webafrica-vumatel-1000-250': { code: 'FTTH-VUMATEL-1000-250-UNC-NIC-WHMIG-3144', description: 'Vumatel Uncapped 1000/250 Mbps', fno: 'vumatel' },
  'webafrica-octotel-500-200': { code: 'FTTH-OCT-500-200-UNC-C-WHMIG-3532', description: 'Octotel Uncapped 500/200 Mbps', fno: 'octotel' },
  'webafrica-frogfoot-air-25-10': { code: 'FTTH-FROGFOOTAIR-25-10-UNC-C-WHMIG-3510', description: 'Frogfoot Air Uncapped 25/10 Mbps', fno: 'frogfoot' }
};

export function extractFibrePrice(row: FibrePricePackage, html: string): PriceExtraction {
  switch (row.ispId) {
    case 'rsaweb': return extractRsawebPrice(row, html);
    case 'axxess': return extractAxxessPrice(row, html);
    case 'afrihost': return extractAfrihostPrepaidPrice(row, html);
    case 'webafrica': {
      const product = WEB_PRODUCTS[row.id];
      if (!product || product.fno !== row.fnoId) return unresolved('Unknown Webafrica product identity');
      const blocks = textOnly(html).split('Product Code:').slice(1).filter(block => block.trim().startsWith(`${product.code} `));
      if (blocks.length !== 1 || !blocks[0].includes(product.description)) return unresolved('Exact Webafrica product code/description not found uniquely');
      const price = /Price:\s*R\s*([\d\s.,]+)\/month/i.exec(blocks[0]);
      return matched(price ? parseRand(price[1]) : null);
    }
    case 'vox': {
      if (row.id !== 'vox-25-10-featured' || row.fnoId !== 'multi-network') return unresolved('Unknown Vox product identity');
      const block = /25\/10\s*Mbps([\s\S]*?)(?:60\/30\s*Mbps|Our fibre partners|$)/i.exec(textOnly(html));
      const prices = [...(block?.[1] ?? '').matchAll(/R\s*([\d\s.,]+)\s*pm/gi)];
      return prices.length === 1 ? matched(parseRand(prices[0][1])) : unresolved('No unique featured Vox 25/10 price');
    }
    case 'mweb': {
      const text = textOnly(html);
      if (!/Openserve/i.test(text) || /3.MONTH PROMO|How our promotion works/i.test(text)) return unresolved('Mweb promotional or installation variant needs review');
      const matches = [...text.matchAll(/R\s*([\d\s.,]+)\s*pm\s*30\s*Mbps\s*30\s*Mbps/gi)];
      return matches.length === 1 ? matched(parseRand(matches[0][1])) : unresolved('No unique Openserve 30/30 price');
    }
    default: return unresolved(`No extractor for provider ${row.ispId}`);
  }
}

const PROVIDER_HOSTS: Record<string, string> = {
  webafrica: 'www.webafrica.co.za', axxess: 'www.axxess.co.za', rsaweb: 'shop.rsaweb.co.za',
  vox: 'www.vox.co.za', mweb: 'www.mweb.co.za', afrihost: 'www.afrihost.com'
};
export function isApprovedFibreSource(row: FibrePricePackage): boolean {
  try { const url = new URL(row.sourceUrl); return url.protocol === 'https:' && !url.username && !url.password && url.hostname === PROVIDER_HOSTS[row.ispId]; }
  catch { return false; }
}

/** Pure draft builder; the production CLI supplies newly fetched official responses. */
export function prepareFibrePriceDraft(snapshot: FibrePriceSnapshot, sources: ReadonlyMap<string, string>, checkedAt: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkedAt) || new Date(`${checkedAt}T00:00:00Z`).toISOString().slice(0, 10) !== checkedAt) throw new Error('Invalid price check date');
  const reviews = snapshot.prices.map(row => {
    const html = sources.get(row.sourceUrl);
    const result = !isApprovedFibreSource(row) ? unresolved('Unapproved source URL') : html === undefined ? unresolved('Official response unavailable') : extractFibrePrice(row, html);
    return { id: row.id, sourceUrl: row.sourceUrl, checkedAt, ...result };
  });
  const prices = snapshot.prices.map(row => {
    const review = reviews.find(item => item.id === row.id)!;
    if (review.status !== 'matched') return row;
    const { promoTerms: _previousTerms, ...existing } = row;
    return { ...existing, monthlyPrice: review.monthlyPrice, promoPrice: review.promoPrice, checkedAt,
      ...(review.promotionTerms ? { promoTerms: review.promotionTerms } : {}) };
  });
  return { snapshot: { ...snapshot, checkedAt: prices.reduce((oldest, row) => row.checkedAt < oldest ? row.checkedAt : oldest, checkedAt), prices }, reviews };
}

export function requireCompleteFibreRefresh(reviews: Array<{ id: string; status: string }>): void {
  if (reviews.length === 0) throw new Error('Refusing to apply an empty price refresh');
  const incomplete = reviews.filter(row => row.status !== 'matched');
  if (incomplete.length) throw new Error(`Refusing to apply a partial refresh. Unresolved rows: ${incomplete.map(row => row.id).join(', ')}`);
}
