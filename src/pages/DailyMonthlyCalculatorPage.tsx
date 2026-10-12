import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { type NavigateFunction } from '../types';
import { parseUsageDays, simulateBundleCosts, type BundlePathResult } from '../utils/costCalculators';
import { getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, toCanonicalUrl } from '../seo/siteConstants';

export const DAILY_MONTHLY_CALCULATOR_PATH = '/tools/daily-vs-monthly-data-calculator/';
const money = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 });
const amount = (value: number) => value.toLocaleString('en-ZA', { maximumFractionDigits: 3 });
const emptyValues = { period: '30', useDays: '', usage: '', dailyGb: '', dailyPrice: '', longerGb: '', longerPrice: '', validity: '30' };
type Values = typeof emptyValues;
const inputClass = 'mt-2 min-h-11 w-full rounded-xl border border-slate-400 bg-white px-3 py-2 font-semibold text-slate-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#166534]';

function Result({ title, result }: { title: string; result: BundlePathResult }) {
  return <section className="border-t-4 border-[#166534] bg-white p-5" aria-label={title}>
    <h3 className="text-xl font-black">{title}</h3>
    <p className="my-3 text-3xl font-black text-[#031636]">{money.format(result.total)}</p>
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between gap-4"><dt>Bundle purchases</dt><dd className="font-bold">{result.purchases}</dd></div>
      <div className="flex justify-between gap-4"><dt>Demand fulfilled</dt><dd className="font-bold">{amount(result.usedGb)}GB</dd></div>
      <div className="flex justify-between gap-4"><dt>Cost per GB used</dt><dd className="font-bold">{result.costPerUsedGb === null ? 'No data used' : money.format(result.costPerUsedGb)}</dd></div>
      <div className="flex justify-between gap-4"><dt>Unused in this period</dt><dd className="font-bold">{amount(result.unusedGb)}GB</dd></div>
    </dl>
    <p className="mt-3 text-xs leading-5 text-slate-600">Unused data includes expired data and any balance left after the last day. It is not automatically a cash saving or a refundable amount.</p>
  </section>;
}

export function DailyMonthlyCalculatorPage({ onNavigate, onScrollTo }: { onNavigate: NavigateFunction; onScrollTo: (id: string) => void }) {
  const [values, setValues] = React.useState<Values>(emptyValues);
  const [canRepeat, setCanRepeat] = React.useState(false);
  const [exampleLoaded, setExampleLoaded] = React.useState(false);
  const canonicalUrl = toCanonicalUrl(DAILY_MONTHLY_CALCULATOR_PATH);
  const title = 'Daily vs Monthly Data Bundle Calculator';
  const description = 'Compare daily and longer-validity data bundles for the same usage schedule, including repeat purchases, expiry and cost per GB actually used.';
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides/' }, { label: 'Daily vs monthly calculator', href: DAILY_MONTHLY_CALCULATOR_PATH }];
  const period = Number(values.period);
  const days = parseUsageDays(values.useDays, period);
  const required: Array<keyof Values> = ['period', 'usage', 'dailyGb', 'dailyPrice', 'longerGb', 'longerPrice', 'validity'];
  const complete = required.every((key) => values[key].trim() !== '');
  const result = complete && days ? simulateBundleCosts({
    periodDays: period, usageDays: days, usageGb: Number(values.usage),
    dailyGb: Number(values.dailyGb), dailyPrice: Number(values.dailyPrice),
    longerGb: Number(values.longerGb), longerPrice: Number(values.longerPrice), longerValidityDays: Number(values.validity)
  }) : null;
  const field = (key: keyof Values, label: string, min: number, max: number, step: string) =>
    <label className="block text-sm font-bold">{label}<input aria-label={label} type="number" min={min} max={max} step={step} inputMode={step === '1' ? 'numeric' : 'decimal'} value={values[key]} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} className={inputClass} /></label>;
  const difference = result ? Math.abs(result.daily.total - result.longer.total) : 0;
  const verdict = !result ? '' : result.daily.usedGb === 0 ? 'No data demand: neither path needs a purchase.'
    : result.daily.total === result.longer.total ? 'The two modelled costs are equal.'
    : `${result.daily.total < result.longer.total ? 'Daily bundles' : 'Longer-validity bundles'} cost ${money.format(difference)} less for the same demand under these assumptions.`;

  return <div className="min-h-screen bg-[#f4f7f3] pb-24 text-[#1a1c1c]">
    <Helmet>
      <title>{`${title} | DataCost`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script>
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url: canonicalUrl, datePublished: '2026-10-12T00:00:00.000Z', dateModified: getRouteModifiedIso(DAILY_MONTHLY_CALCULATOR_PATH), publisher: { '@type': 'Organization', name: SITE_PRODUCT_NAME } })}</script>
    </Helmet>
    <Header onScrollTo={onScrollTo} activeSection="guides" />
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mb-8">
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-7 text-slate-700">A small daily price can add up. Enter two bundles and the days you need data: both paths will fulfil the same demand, buying extra bundles when an allowance runs out or expires.</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">Use quoted prices including VAT and only data usable for the same purpose. These are your figures, not a live provider-price feed. Inputs stay in this browser and are not sent to DataCost.</p>
      </header>
      <section aria-labelledby="inputs-title" className="border-y border-slate-300 bg-white p-5 sm:p-7">
        <h2 id="inputs-title" className="text-2xl font-black">Compare your two bundles</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field('period', 'Comparison period (days)', 1, 366, '1')}
          {field('usage', 'Data used on each active day (GB)', 0, 1000, '0.001')}
          <label className="block text-sm font-bold sm:col-span-2">Active days (optional)<input aria-label="Active days" type="text" value={values.useDays} onChange={(event) => setValues((current) => ({ ...current, useDays: event.target.value }))} placeholder="Blank = every day; or 1, 3, 5" className={inputClass} aria-describedby="active-days-help" /><span id="active-days-help" className="mt-2 block text-xs font-medium leading-5 text-slate-600">Use day numbers within the comparison period, separated by commas. For example, 1, 8, 15, 22 means four active days. Repeated day numbers count once. The same entered GB is used on each active day.</span></label>
        </div>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <fieldset className="space-y-4 border border-slate-300 p-4"><legend className="px-2 text-lg font-black">Daily bundle · 1-day expiry</legend>
            {field('dailyGb', 'Daily bundle usable data (GB)', 0.001, 1000, '0.001')}
            {field('dailyPrice', 'Daily bundle price (R)', 0, 1000000, '0.01')}
          </fieldset>
          <fieldset className="space-y-4 border border-slate-300 p-4"><legend className="px-2 text-lg font-black">Monthly / longer-validity bundle</legend>
            {field('longerGb', 'Longer bundle usable data (GB)', 0.001, 1000, '0.001')}
            {field('longerPrice', 'Longer bundle price (R)', 0, 1000000, '0.01')}
            {field('validity', 'Longer bundle validity (days)', 1, 366, '1')}
          </fieldset>
        </div>
        <label className="mt-5 flex items-start gap-3 text-sm font-semibold leading-6"><input type="checkbox" checked={canRepeat} onChange={(event) => setCanRepeat(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#166534]" /><span>Both options allow repeat purchases and multiple active bundles, with the entered price for each purchase. For an example, I accept this as a hypothetical assumption.</span></label>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => { setValues({ period: '30', useDays: '', usage: '0.5', dailyGb: '1', dailyPrice: '10', longerGb: '10', longerPrice: '100', validity: '30' }); setCanRepeat(false); setExampleLoaded(true); }} className="min-h-11 border border-[#166534] px-4 font-bold text-[#166534] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Load hypothetical example</button>
          <button type="button" onClick={() => { setValues(emptyValues); setCanRepeat(false); setExampleLoaded(false); }} className="min-h-11 px-4 font-bold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Clear figures</button>
        </div>
        {exampleLoaded && <p className="mt-3 text-sm font-semibold text-amber-950">Hypothetical figures loaded. They do not describe any provider’s current offer; edits continue to use your entered assumptions.</p>}
      </section>
      <section className="my-7" aria-labelledby="results-title" aria-live="polite">
        <h2 id="results-title" className="text-2xl font-black">Cost for the same demand</h2>
        {!days ? <p className="mt-3 border-l-4 border-rose-600 bg-rose-50 p-4 font-semibold text-rose-900">Use a whole period of 1–366 days and comma-separated active day numbers within that period.</p>
          : !complete ? <p className="mt-3 text-slate-700">Enter all prices, allowances and usage to calculate. Zero usage is allowed; bundle allowances must be positive.</p>
          : !result ? <p className="mt-3 border-l-4 border-rose-600 bg-rose-50 p-4 font-semibold text-rose-900">Use whole validity days from 1–366, GB amounts from 0.001–1000 with at most three decimals (usage may be 0), and prices from R0 to R1,000,000.</p>
          : !canRepeat ? <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-4 font-semibold text-amber-950">Confirm the repeat-purchase assumption above to show the comparison. If the provider does not allow it, this model cannot compare those offers reliably.</p>
          : <><p className="my-4 text-lg font-bold">{verdict}</p><div className="grid gap-5 md:grid-cols-2"><Result title="Daily bundles" result={result.daily} /><Result title="Longer-validity bundles" result={result.longer} /></div></>}
      </section>
      <section className="mb-8 max-w-3xl space-y-4 text-sm leading-7 text-slate-700" aria-labelledby="method-title">
        <h2 id="method-title" className="text-2xl font-black text-slate-950">How the calculation works</h2>
        <p>On each active day, both paths use exactly the daily demand you entered. The daily path buys enough whole one-day bundles for that day. Unused daily data expires before the next day. With 0.5GB daily usage and a 1GB bundle, one purchase is needed each active day; with 1.5GB usage, two purchases are needed. This prevents a smaller allowance from looking cheaper simply because it delivers less data.</p>
        <p>The longer-validity path uses its unexpired balance first, then buys enough whole bundles to cover any shortfall. Each new purchase keeps its own expiry date. Buying more does not extend an older balance. A bundle bought on day 1 with 30-day validity is usable through day 30 and expires before day 31. Purchases are made only when needed; a quiet day does not trigger an automatic renewal.</p>
        <p>Total cost is the number of purchases multiplied by the price rounded to cents. Cost per GB used divides this total by the demand actually fulfilled, rather than by all data bought. GB calculations use three decimal places. If no data is used, both paths cost R0 and cost per GB is undefined. The unused figure includes both expired allowances and data remaining beyond your comparison period.</p>
        <p>This is a fixed-day model, not an operator billing forecast. It assumes each active day’s usage fits inside the relevant daily window and both products permit the repeat purchases you confirmed. A calendar-month contract, midnight expiry, hourly product, automatic renewal, rollover extension or personalised offer may follow different rules. Do not enter night-only or app-only data as unrestricted data unless your whole demand fits that restriction.</p>
        <p>There is no allowance for coverage differences, activation fees, credit-account interest, future price increases, refunds or bundles you already own. Compare these separately. Check the final price, eligibility, usable allocation, expiry time, purchase limits and debit arrangements in the provider’s current checkout and terms before buying. The tool helps compare two entered options; it does not identify the cheapest offer in South Africa.</p>
        <p>The example is deliberately hypothetical: over 30 daily-use days, 0.5GB per day needs 15GB. At R10 for a 1GB daily bundle, the daily path makes 30 purchases costing R300. At R100 for 10GB with 30-day validity, the longer path makes two purchases costing R200. Both fulfil 15GB. Different usage days, allowances and prices can reverse that result.</p>
        <p>Method and calculator checked 12 October 2026. No operator-price snapshot is attached to the example.</p>
      </section>
      <div className="mb-8 flex flex-wrap gap-4 text-sm font-bold text-[#166534]">
        <Link to="/best-data-deals-south-africa/" className="min-h-11 py-3 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Compare sourced monthly offers</Link>
        <Link to="/guides/cellphone-retention-offer-vs-switching-south-africa/" className="min-h-11 py-3 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Compare a retention offer with switching</Link>
      </div>
    </main>
    <Footer onNavigate={onNavigate} /><MobileNav onNavigate={onNavigate} />
  </div>;
}
