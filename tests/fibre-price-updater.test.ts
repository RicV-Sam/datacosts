import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import type { FibrePricePackage, FibrePriceSnapshot } from '../src/data/fibre/fibrePricing';
import { parseRand, extractFibrePrice, extractRsawebPrice, extractAxxessPrice, extractAfrihostPrepaidPrice, isApprovedFibreSource, prepareFibrePriceDraft, requireCompleteFibreRefresh } from '../scripts/lib/fibre-price-extraction';

const row: FibrePricePackage = {
  id: 'rsaweb-openserve-webconnect-40-20', ispId: 'rsaweb', fnoId: 'openserve', planName: 'Openserve 40/20',
  downloadMbps: 40, uploadMbps: 20, monthlyPrice: 435, promoPrice: null, setupNotes: 'Address-specific example.',
  sourceUrl: 'https://shop.rsaweb.co.za/product-category/fibre/ftth/', sourceLabel: 'Official catalogue', checkedAt: '2026-08-06',
  confidence: 'medium', requiresAddressCheck: true, tags: ['monthly']
};
const card = (vendor: string, price: string, text: string) => `<div data-price="${price}" data-speed-upload="20" data-vendor="${vendor}" data-prepaid="monthly" data-speed-download="40">${text}</div>`;

test('rand values preserve cents and reject malformed or combined prices', () => {
  for (const [raw, value] of [['425.01',425.01],['494.99',494.99],['437.00',437],['R1 299,50',1299.5],['1,299.50',1299.5],['1.299,50',1299.5],['1,299',1299]] as const) assert.equal(parseRand(raw),value,raw);
  for (const raw of ['NaN','-435','R435 R495','425.01.99','1,2,3','1e3','0','']) assert.equal(parseRand(raw),null,raw);
});

test('RSAWEB selects exact FNO/cadence/speed regardless of attribute order and separates introductory cost', () => {
  const html=card('vumatel','999','R999 per month')+card('openserve','425.01','Only R395pm up to 2 months, then pay R425.01pm from month 3. R425.01 per month');
  const result=extractRsawebPrice(row,html);
  assert.equal(result.status,'matched');
  if(result.status==='matched') { assert.equal(result.monthlyPrice,425.01);assert.equal(result.promoPrice,395);assert.match(result.promotionTerms!,/month 3/); }
  assert.equal(extractRsawebPrice(row,card('vumatel','425.01','R425.01 per month')).status,'unresolved');
});

test('conflicting, duplicate, missing and incompletely described RSAWEB offers are withheld', () => {
  for(const html of [card('openserve','425.01','R425 per month'),card('openserve','425','R425 per month').repeat(2),card('openserve','425','Limited time R395. R425 per month'),'']) assert.equal(extractRsawebPrice(row,html).status,'unresolved');
});

const axxess = { ...row, id:'axxess-evotel-10-10-example', ispId:'axxess', fnoId:'evotel', downloadMbps:10, uploadMbps:10, sourceUrl:'https://www.axxess.co.za/fibre/uncapped' };
const panel = (fno:string, options:string) => `<div class="fibrecompare-panel"><img src="/img/fibrelogo-${fno}.png"><select>${options}</select></div>`;
const option = (price:string, extra='') => `<option data-pid="p1" data-downloadspeed="10Mbps" data-uploadspeed="10Mbps" data-price="${price}" ${extra}>10/10Mbps</option>`;

test('DNATel prices cannot become Evotel prices and ambiguous FNO variants stay unresolved', () => {
  assert.equal(extractAxxessPrice(axxess,panel('dnatel',option('625'))+panel('evotel-up1','')).status,'unresolved');
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('335'))).status,'matched');
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('335')+option('435'))).status,'unresolved');
  assert.equal(extractAxxessPrice({...axxess,fnoId:'multi-network'},panel('evotel-up1',option('335'))).status,'unresolved');
  assert.equal(extractAxxessPrice({...axxess,tags:['prepaid']},panel('evotel-up1',option('335'))).status,'unresolved');
});

test('Axxess introductory amounts do not replace the ongoing monthly amount', () => {
  const result=extractAxxessPrice(axxess,panel('evotel-up1',option('299','data-oldprice="335" data-promo="Activation month and following month only; thereafter R335 monthly"')));
  assert.equal(result.status,'matched');
  if(result.status==='matched') {assert.equal(result.monthlyPrice,335);assert.equal(result.promoPrice,299);}
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('299','data-oldprice="335"'))).status,'unresolved');
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('299','data-oldprice="335" data-promo="First two months only"'))).status,'unresolved');
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('299','data-oldprice="335" data-promo="Thereafter R335 monthly"'))).status,'unresolved');
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('299','data-promo="First two months only"'))).status,'unresolved');
  assert.equal(extractAxxessPrice(axxess,panel('evotel-up1',option('0','data-oldprice="335" data-promo="First month"'))).status,'unresolved');
});

const afrihost = {...row,id:'afrihost-prepaid-20-10',ispId:'afrihost',fnoId:'vumatel',planName:'Vuma Reach prepaid 20/10 Mbps',downloadMbps:20,uploadMbps:10,sourceUrl:'https://www.afrihost.com/fibre/prepaid',tags:['prepaid']};
const nuxt=(name='20Mbps Vuma Reach Prepaid Fibre') => `<script id="__NUXT_DATA__" type="application/json">${JSON.stringify([{name:1,price:2,attributes:3},name,'437.00',{speed_download:4,speed_upload:5},20,10])}</script>`;
test('current Afrihost serialized products require the specific prepaid FNO and both speed directions', () => {
  assert.deepEqual(extractAfrihostPrepaidPrice(afrihost,nuxt()),{status:'matched',monthlyPrice:437,promoPrice:null});
  assert.equal(extractAfrihostPrepaidPrice({...afrihost,uploadMbps:20},nuxt()).status,'unresolved');
  assert.equal(extractAfrihostPrepaidPrice(afrihost,nuxt('20Mbps Openserve Prepaid Fibre')).status,'unresolved');
  assert.equal(extractAfrihostPrepaidPrice({...afrihost,fnoId:'multi-network'},nuxt()).status,'unresolved');
  assert.equal(extractAfrihostPrepaidPrice(afrihost,'<script id="__NUXT_DATA__">invalid</script>').status,'unresolved');
});

test('partial drafts preserve unresolved values/dates and cannot pass the apply gate', () => {
  const snapshot:FibrePriceSnapshot={checkedAt:'2026-08-06',generatedBy:'test',notes:'Synthetic test data only',prices:[row,afrihost]};
  const before=JSON.stringify(snapshot);
  const result=prepareFibrePriceDraft(snapshot,new Map([[row.sourceUrl,card('openserve','425.01','R425.01 per month')]]),'2026-11-01');
  assert.equal(result.snapshot.checkedAt,'2026-08-06');
  assert.equal(result.snapshot.prices[0].monthlyPrice,425.01);
  assert.equal(result.snapshot.prices[0].checkedAt,'2026-11-01');
  assert.deepEqual(result.snapshot.prices[1],afrihost);
  assert.equal(JSON.stringify(snapshot),before);
  assert.throws(()=>requireCompleteFibreRefresh(result.reviews),/afrihost-prepaid-20-10/);
  assert.throws(()=>requireCompleteFibreRefresh([]),/empty/);
  assert.throws(()=>prepareFibrePriceDraft(snapshot,new Map(),'2026-02-30'),/Invalid/);
});

test('provider URL lookalikes and credentials cannot become official price evidence', () => {
  assert.equal(isApprovedFibreSource(row),true);
  for(const url of ['http://shop.rsaweb.co.za/','https://shop.rsaweb.co.za.example.com/','https://user:pass@shop.rsaweb.co.za/','https://example.com/']) assert.equal(isApprovedFibreSource({...row,sourceUrl:url}),false);
});

test('CLI refuses fixture-driven application before reading or replacing the active snapshot', () => {
  const file='src/data/generated/fibrePriceSnapshot.json';const before=readFileSync(file);
  assert.throws(()=>execFileSync(process.execPath,['--import','tsx','scripts/update-fibre-prices.ts','--fixture=synthetic.html','--commit'],{stdio:'pipe'}),/Command failed/);
  assert.deepEqual(readFileSync(file),before);
});

test('a pinned Axxess product cannot drift into a same-speed installation variant', () => {
  const html = panel('evotel-up1', option('335') + option('435').replace('data-pid="p1"', 'data-pid="p2"'));
  assert.equal(extractAxxessPrice(axxess, html).status, 'unresolved');
  assert.deepEqual(extractAxxessPrice({ ...axxess, sourceProductId: 'p1' }, html), { status: 'matched', monthlyPrice: 335, promoPrice: null });
  assert.deepEqual(extractAxxessPrice({ ...axxess, sourceProductId: 'p2' }, html), { status: 'matched', monthlyPrice: 435, promoPrice: null });
  assert.equal(extractAxxessPrice({ ...axxess, sourceProductId: 'missing' }, html).status, 'unresolved');
});

test('Mweb displayed prices cannot replace an exact installation variant without its full terms review', () => {
  const mweb = { ...row, ispId: 'mweb', sourceProductId: 'FTTH-OPEN-3030MB-UNCAPPED', downloadMbps: 30, uploadMbps: 30 };
  for (const html of [
    '<main>Openserve R599pm 30Mbps 30Mbps</main>',
    '<main>Openserve <div data-product-code="OTHER-SKU">R599pm 30Mbps 30Mbps</div></main>',
    '<main>Openserve <div data-product-code="FTTH-OPEN-3030MB-UNCAPPED">R539pm 30Mbps 30Mbps</div></main>',
  ]) assert.equal(extractFibrePrice(mweb, html).status, 'unresolved');
});
