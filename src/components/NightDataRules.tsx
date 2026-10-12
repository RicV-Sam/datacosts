import React from 'react';
import { Link } from 'react-router-dom';

const rules = [
  { name: 'Vodacom standalone Night Owl', window: '00:00–05:00', note: 'No carry-over, transfer or roaming under this family’s terms.', url: 'https://www.vodacom.co.za/vodacom/terms/night-owl-bundles' },
  { name: 'Cell C Daily Nite', window: '01:00–07:00', note: 'A separate product from Cell C’s 30-day and Day-by-Day night wallets. Check the expiry timestamp.', url: 'https://www.cellc.co.za/cellc/static-content/PDF/Daily-DailyNite-Bundles-TnC.pdf' },
  { name: 'Cell C 30-day Nite wallet', window: '00:00–04:59:59', note: 'This PDF has conflicting transfer wording: main clause 16 allows inclusive data transfer; General clause 6 prohibits it. Ask Cell C before relying on sharing.', url: 'https://www.cellc.co.za/cellc/static-content/PDF/30-day-bundle-tnc.pdf' },
  { name: 'Cell C Day-by-Day night allocation', window: '00:00–04:59:59', note: 'Unused allocated data expires each day. A headline 30GB can mean 500MB anytime and 500MB night per day for 30 days.', url: 'https://www.cellc.co.za/cellc/static-content/PDF/Day-By-Day_Data_Bundles_FAQ_Web.pdf' },
  { name: 'MTN BozzaGigs LTE Night Express wallet', window: '00:01–04:59', note: 'This window is verified in BozzaGigs LTE terms; it is not a promise for every MTN night product.', url: 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-bozzagigs-lte-terms-and-conditions' }
];

export const NightDataRules: React.FC = () => <section className="mb-12 rounded-2xl border border-slate-300 bg-white p-5 sm:p-8">
  <h2 className="text-2xl font-black">Night windows belong to a product, not just a network</h2>
  <p className="mt-4 leading-7">Rules below were checked against official terms on 12 October 2026. Cell C’s different windows describe different products. Price-row source dates in the comparison remain separate.</p>
  <dl className="mt-6 space-y-6">{rules.map((rule) => <div key={rule.name} className="border-t border-slate-200 pt-5"><dt className="text-lg font-bold">{rule.name}: {rule.window}</dt><dd className="mt-2 text-sm leading-7">{rule.note} <a className="underline" href={rule.url} target="_blank" rel="noreferrer">Official terms</a></dd></div>)}</dl>
  <p className="mt-6 leading-7">Do not count night data you will not use as daytime value. <Link className="underline" to="/tools/usable-data-cost-calculator/">Calculate cost per GB actually used</Link> and <Link className="underline" to="/guides/data-expiry-rollover-south-africa/">check expiry and extension rules</Link>.</p>
</section>;
