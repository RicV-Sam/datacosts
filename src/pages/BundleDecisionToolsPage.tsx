import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { type DealProviderId } from '../data/monthlyDeals';
import { getComparisonOfferCatalog } from '../utils/comparisonOfferCatalog';
import { calculateConsumedData, calculatePhoneOwnership, selectListedBundles, type ConsumptionInput, type SelectorPreferences } from '../utils/discoveryTools';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, toCanonicalUrl } from '../seo/siteConstants';
import type { NavigateFunction } from '../types';

import { decisionTools } from '../data/decisionTools';

type Mode = keyof typeof decisionTools;
type Props = { mode: Mode; onNavigate: NavigateFunction; onScrollTo: (id: string) => void };
const money = (value: number) => `R${value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const gb = (value: number) => `${Number(value.toFixed(3))}GB`;
const inputClass = 'mt-2 w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-base text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]';

function NumberField({ label, value, onChange, min = 0, max = 1_000_000, step = 'any' }: { key?: string; label: string; value: string; onChange: (value: string) => void; min?: number; max?: number; step?: string }) {
  return <label className="block text-sm font-semibold text-slate-800">{label}<input type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} required className={inputClass} /></label>;
}
function Check({ text, checked, onChange }: { key?: string; text: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex min-h-11 items-start gap-3 py-2 text-sm leading-6 text-slate-800"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#166534]" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span>{text}</span></label>;
}
function Result({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-slate-300 py-4"><dt className="text-sm text-slate-700">{label}</dt><dd className="mt-1 break-words text-2xl font-black text-[#031636]">{value}</dd></div>;
}

function ConsumedDataTool() {
  const empty = { days: '', price: '', anytimeGb: '', nightGb: '', daytimeUseGb: '', nightUseGb: '' };
  const [values, setValues] = useState(empty);
  const [dailyRelease, setDailyRelease] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const input = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])) as Omit<ConsumptionInput, 'dailyRelease'>;
  const result = (Object.values(values) as string[]).every((v) => v.trim() !== '') && confirmed ? calculateConsumedData({ ...input, dailyRelease }) : null;
  const update = (key: keyof typeof empty, value: string) => setValues((previous) => ({ ...previous, [key]: value }));
  return <>
    <p className="mb-6 max-w-3xl leading-7">Estimate the value of one purchase. Enter the period that purchase covers and how much daytime and night data you expect to use each day. Unmet demand stays visible: this tool does not buy extra bundles to fill the gap.</p>
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-8">
      <fieldset><legend className="mb-2 text-xl font-bold">How the allowance arrives</legend>
        <label className="block text-sm font-semibold">Allocation type<select className={inputClass} value={dailyRelease ? 'daily' : 'pool'} onChange={(event) => setDailyRelease(event.target.value === 'daily')}><option value="pool">One pool for the whole period</option><option value="daily">Fresh allowance each day; unused data expires daily</option></select></label>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField label="Bundle validity (days)" value={values.days} min={1} max={366} step="1" onChange={(v) => update('days', v)} />
        <NumberField label="Total purchase price (R, including VAT)" value={values.price} onChange={(v) => update('price', v)} />
        <NumberField label={dailyRelease ? 'Anytime allocation each day (GB)' : 'Total anytime allocation (GB)'} value={values.anytimeGb} step="0.001" onChange={(v) => update('anytimeGb', v)} />
        <NumberField label={dailyRelease ? 'Night allocation each day (GB; 0 if none)' : 'Total night allocation (GB; 0 if none)'} value={values.nightGb} step="0.001" onChange={(v) => update('nightGb', v)} />
        <NumberField label="Expected daytime usage each day (GB)" value={values.daytimeUseGb} step="0.001" onChange={(v) => update('daytimeUseGb', v)} />
        <NumberField label="Expected usage inside the night window each day (GB)" value={values.nightUseGb} step="0.001" onChange={(v) => update('nightUseGb', v)} />
      </div>
      <Check text="My night usage fits this product’s exact window. I understand this model uses the night wallet first for night traffic, then spare anytime data." checked={confirmed} onChange={setConfirmed} />
      <div className="flex flex-wrap gap-3">
        <button className="min-h-11 rounded-lg bg-[#031636] px-5 py-3 font-bold text-white">Calculate usable value</button>
        <button type="button" className="min-h-11 rounded-lg border border-slate-400 px-4 py-3 font-semibold" onClick={() => { setValues({ days: '30', price: '169', anytimeGb: '0.5', nightGb: '0.5', daytimeUseGb: '0.25', nightUseGb: '0' }); setDailyRelease(true); setConfirmed(false); setSubmitted(false); }}>Load hypothetical example</button>
        <button type="button" className="min-h-11 px-4 py-3 underline" onClick={() => { setValues(empty); setDailyRelease(false); setConfirmed(false); setSubmitted(false); }}>Reset</button>
      </div>
      <p className="text-sm leading-6 text-slate-600">The example is hypothetical, even if its inputs resemble a published offer. It assumes 30 days, 500MB anytime and 500MB night each day, R169 once, 250MB daytime usage daily and no night usage.</p>
    </form>
    <section aria-live="polite" className="my-8">
      {submitted && (!confirmed ? <p role="alert">Confirm the night-window and consumption assumptions to see results.</p> : !result ? <p role="alert">Check the figures: enter all fields, 1–366 whole days and non-negative amounts.</p> : <>
        <h2 className="text-2xl font-black">Value of this one purchase</h2>
        <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
          <Result label="Data actually used" value={gb(result.usedGb)} /><Result label="Unused allowance at the end" value={gb(result.unusedGb)} />
          <Result label="Demand not covered by this purchase" value={gb(result.unmetGb)} /><Result label="Cost per GB actually used" value={result.costPerUsedGb === null ? 'Undefined — no data used' : `${money(result.costPerUsedGb)}/GB`} />
          <Result label="Purchase price divided by anytime allocation" value={result.costPerAnytimeGb === null ? 'Undefined — no anytime data' : `${money(result.costPerAnytimeGb)}/GB`} />
        </dl>
        <p className="mt-3 leading-7">Unmet demand needs a separate top-up or service. A lower spend that leaves more demand unmet is not a like-for-like saving.</p>
      </>)}
    </section>
    <section className="space-y-4 text-sm leading-7"><h2 className="text-2xl font-black">Rules and limits</h2>
      <p>For daily releases, usable data is calculated for one day, then multiplied by the number of days. For a pool, daily demand is multiplied by the period before applying the wallet limits. Night usage takes available night data first; remaining usage can use anytime data. Unused equals allocation minus used. Cost per GB used is the purchase price, rounded to cents, divided by used GB. The anytime-only figure assigns the entire price to anytime data and gives night data zero value.</p>
      <p>This assumes identical usage every day, reliable service, no app-only restrictions, no additional purchase, no rollover and no existing balance. It is not an operator-specific depletion forecast. Amounts use 1GB = 1,000MB and are rounded to three decimal places. Use the exact validity period and night window; hourly, calendar-month and changing daily-use patterns require a different model.</p>
      <p><Link className="underline" to="/tools/daily-vs-monthly-data-calculator/">Compare repeat purchases fulfilling the same demand</Link>, or <Link className="underline" to="/guides/data-expiry-rollover-south-africa/">check product expiry rules</Link>.</p>
    </section>
  </>;
}

function PhoneOwnershipTool() {
  const empty = { months: '', monthly: '', introMonthly: '', introMonths: '', onceOff: '', handset: '', prepaidMonthly: '', prepaidOnceOff: '' };
  const [values, setValues] = useState(empty);
  const [equivalent, setEquivalent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const n = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
  const result = (Object.values(values) as string[]).every((value) => value.trim() !== '') ? calculatePhoneOwnership({ months: n.months, monthly: n.monthly, introMonthly: n.introMonthly, introMonths: n.introMonths, onceOff: n.onceOff }, n.handset, n.prepaidMonthly, n.prepaidOnceOff) : null;
  const fields: Array<[keyof typeof empty, string]> = [['months', 'Comparison term (months)'], ['monthly', 'Normal contract monthly total (R; include device)'], ['introMonthly', 'Introductory contract monthly total (R)'], ['introMonths', 'Introductory months (0 if none)'], ['onceOff', 'Contract upfront and other fixed costs (R)'], ['handset', 'Outright handset price (R)'], ['prepaidMonthly', 'Equivalent prepaid service per month (R)'], ['prepaidOnceOff', 'Outright path setup and other fixed costs (R)']];
  return <>
    <p className="mb-6 max-w-3xl leading-7">A “free phone” can be paid for through monthly charges. Enter the same handset and equivalent service in both paths, over the same term. Include device instalments in the contract monthly total.</p>
    <form className="space-y-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-8" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <div className="grid gap-5 sm:grid-cols-2">{fields.map(([key, label]) => <NumberField key={key} label={label} value={values[key]} min={key === 'months' ? 1 : 0} max={key === 'months' || key === 'introMonths' ? 1200 : 1_000_000} step={key === 'months' || key === 'introMonths' ? '1' : 'any'} onChange={(value) => setValues((previous) => ({ ...previous, [key]: value }))} />)}</div>
      <Check text="I compared the same handset and equivalent usable data, calls and service. I included all known device repayments and fixed costs." checked={equivalent} onChange={setEquivalent} />
      <div className="flex flex-wrap gap-3"><button className="min-h-11 rounded-lg bg-[#031636] px-5 py-3 font-bold text-white">Compare total costs</button><button type="button" className="min-h-11 rounded-lg border border-slate-400 px-4 py-3" onClick={() => { setValues({ months: '24', monthly: '499', introMonthly: '399', introMonths: '3', onceOff: '99', handset: '6000', prepaidMonthly: '150', prepaidOnceOff: '0' }); setEquivalent(false); setSubmitted(false); }}>Load hypothetical example</button><button type="button" className="min-h-11 px-4 py-3 underline" onClick={() => { setValues(empty); setEquivalent(false); setSubmitted(false); }}>Reset</button></div>
      <p className="text-sm leading-6 text-slate-600">Example quotes are hypothetical. If there is no promotion, enter 0 introductory months and 0 introductory price. Enter 0 for costs that do not apply.</p>
    </form>
    <section aria-live="polite" className="my-8">{submitted && (!result ? <p role="alert">Check all figures. Introductory months must fit inside the whole comparison term.</p> : <><h2 className="text-2xl font-black">Totals over {n.months} months</h2><dl className="mt-4 grid gap-x-8 sm:grid-cols-2"><Result label="Contract total" value={money(result.contract)} /><Result label="Outright handset + prepaid total" value={money(result.prepaid)} /></dl>{equivalent ? <p className="mt-4 text-lg font-bold">{result.difference === 0 ? 'The entered totals are equal.' : `${result.difference > 0 ? 'Outright + prepaid' : 'Contract'} costs ${money(Math.abs(result.difference))} less on the entered figures.`}</p> : <p role="alert">Confirm equivalent devices and service before treating the difference as a saving.</p>}</>)}</section>
    <section className="mb-8 space-y-4 text-sm leading-7"><h2 className="text-2xl font-black">Worked example</h2><p>The hypothetical example has three months at R399, then twenty-one months at R499, plus R99 upfront: R1,197 + R10,479 + R99 = R11,775. Buying a R6,000 handset and spending R150 monthly for twenty-four months totals R9,600. The R2,175 difference is meaningful only if the device and usable service are equivalent.</p><p>Before accepting a quote, ask whether the normal price includes the handset, when the introductory price ends and whether the provider will change charges during the term. Keep the written quote with your comparison. A promotion lasting three months must not be multiplied across the entire contract.</p></section>
    <section className="space-y-4 text-sm leading-7"><h2 className="text-2xl font-black">What the total includes</h2><p>Contract total = introductory monthly total × introductory months + normal monthly total × remaining months + fixed costs. Outright path = handset price + prepaid monthly spend × the same term + fixed costs. Amounts round to cents before multiplication.</p><p>Include delivery, setup, device settlement, insurance and any other known fixed charge in the appropriate input. Variable usage, future price changes, interest on financing the outright phone, repair costs, resale value and the opportunity cost of paying upfront are not modelled. A cheaper total does not show whether you can afford the initial purchase. Do not enter a short-validity bundle’s single price as a whole month’s equivalent service.</p><p><Link className="underline" to="/guides/prepaid-vs-contract-south-africa/">Read the prepaid versus contract guide</Link> or <Link className="underline" to="/guides/cellphone-retention-offer-vs-switching-south-africa/">compare retention with switching</Link>.</p></section>
  </>;
}

function BundleSelector() {
  const [need, setNeed] = useState('10');
  const [days, setDays] = useState('30');
  const [preferences, setPreferences] = useState<Omit<SelectorPreferences, 'needGb' | 'minimumDays'>>({ banks: [], planProviders: [], allowLte: false, allowRecurring: false });
  const results = need.trim() && days.trim() ? selectListedBundles(getComparisonOfferCatalog(), { ...preferences, needGb: Number(need), minimumDays: Number(days) }) : null;
  const toggleProvider = (group: 'banks' | 'planProviders', id: DealProviderId, value: boolean) => setPreferences((old) => ({ ...old, [group]: value ? [...old[group], id] : old[group].filter((provider) => provider !== id) }));
  return <>
    <p className="mb-4 max-w-3xl leading-7">Start with pooled anytime data and a fixed-day expiry requirement. Bank and special-tariff offers stay hidden until you confirm their eligibility below. Prices come from the shared recorded comparison catalogue; this tool does not independently verify your account or today’s checkout.</p>
    <p className="mb-6 text-sm leading-6 text-slate-600">Source-check dates are shown beside each offer. Only eligible rows with current official evidence can appear. The FNB pricing guide's internal date conflict remains disclosed beside its offers; verified fixed-day bundles follow the same evidence checks as other providers. Conditional bonuses, night and daily-release allowances do not fulfil your anytime target.</p>
    <div className="space-y-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2"><NumberField label="Minimum pooled anytime data (GB)" min={0.001} max={1000} step="0.001" value={need} onChange={setNeed} /><NumberField label="Minimum fixed validity (days)" min={1} max={366} step="1" value={days} onChange={setDays} /></div>
      <fieldset><legend className="font-bold">I meet these bank-provider requirements</legend>{([['capitec-connect', 'Capitec Connect'], ['fnb-connect', 'FNB Connect'], ['nedbank-connect', 'Nedbank Connect'], ['standard-bank-connect', 'Standard Bank Connect']] as Array<[DealProviderId, string]>).map(([id, name]) => <Check key={id} text={`${name}: I meet the provider’s qualifying-account and SIM requirements.`} checked={preferences.banks.includes(id)} onChange={(v) => toggleProvider('banks', id, v)} />)}</fieldset>
      <fieldset><legend className="font-bold">Special tariffs and purchase arrangements</legend>{([['mtn', 'MTN Super Data'], ['vodacom', 'Vodacom Prepaid LTE']] as Array<[DealProviderId, string]>).map(([id, name]) => <Check key={id} text={`My line qualifies for ${name}; I checked the tariff’s migration rules.`} checked={preferences.planProviders.includes(id)} onChange={(v) => toggleProvider('planProviders', id, v)} />)}<Check text="Include Prepaid LTE products; I checked the device and product restrictions." checked={preferences.allowLte} onChange={(v) => setPreferences((old) => ({ ...old, allowLte: v }))} /><Check text="Include recurring purchases with a confirmed once-off or month-to-month commitment." checked={preferences.allowRecurring} onChange={(v) => setPreferences((old) => ({ ...old, allowRecurring: v }))} /></fieldset>
      <p className="text-sm leading-6">Calendar-month allocations are excluded from this fixed-day selector. The <Link to="/guides/mvnos-south-africa/" className="underline">MVNO chooser</Link> covers wider payment and monthly-plan choices. Changing a checkbox is your declaration, not confirmation from a provider.</p>
    </div>
    <section aria-live="polite" className="my-8"><h2 className="text-2xl font-black">Listed options matching your inputs</h2>{results === null ? <p role="alert" className="mt-4">Enter a positive data amount and 1–366 whole days.</p> : results.length === 0 ? <p className="mt-4 leading-7">No saved offer meets all these requirements. This does not mean no suitable offer exists. Check the <Link className="underline" to="/best-data-deals-south-africa/">full tracker</Link> and current provider quotes.</p> : <><p className="mt-3 text-sm">{results.length} options, sorted by total purchase price. Larger allowances may cost more even when their R/GB is lower. This is not a whole-market cheapest award.</p><div className="mt-5 space-y-5">{results.map((offer) => <article key={offer.id} className="border-t border-slate-300 pt-5"><h3 className="text-xl font-bold">{offer.providerName}: {offer.offerName}</h3><p className="mt-2 font-bold">{money(offer.priceZar)} · {gb(offer.allocation.anytimeGb)} pooled anytime · {offer.validity.label}</p><p className="mt-2 text-sm leading-6">{offer.eligibility}</p><p className="mt-2 text-sm leading-6">Purchase: {offer.purchaseChannels.join(', ')}. Billing: {offer.billing === 'once_off' ? 'once-off' : 'recurring monthly'}. Commitment: {offer.commitment?.kind === 'once_off' ? 'once-off' : 'month-to-month'}.</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">{offer.importantNotes.map((note) => <li key={note}>{note}</li>)}</ul><a className="mt-3 inline-block min-h-11 break-words py-3 font-bold underline" href={offer.source.url} target="_blank" rel="noreferrer">Check {offer.providerName} source and current checkout</a><p className="text-xs text-slate-600">Price-source check: {offer.source.checkedAt}. Current stock, coverage, SIM costs and account access require your confirmation.</p></article>)}</div></>}</section>
    <p className="text-sm leading-7">These controls use the comparison catalogue’s recorded eligibility and evidence state. They cannot infer that a similarly named bank product or host-network SIM qualifies. Fixed-term or unknown commitments and context-only offers are excluded. Recheck migration losses, renewal, SIM and delivery fees, coverage and terms before buying.</p>
  </>;
}

export function BundleDecisionToolsPage({ mode, onNavigate, onScrollTo }: Props) {
  const tool = decisionTools[mode];
  const canonical = toCanonicalUrl(tool.path);
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides/' }, { label: tool.title, href: tool.path }];
  return <div className="min-h-screen bg-slate-50 pb-24 text-slate-950">
    <Helmet><title>{tool.title} | DataCost</title><meta name="description" content={tool.description} /><link rel="canonical" href={canonical} /><meta property="og:type" content="website" /><meta property="og:title" content={tool.title} /><meta property="og:description" content={tool.description} /><meta property="og:url" content={canonical} /><meta property="og:image" content={DEFAULT_OG_IMAGE_URL} /><meta name="twitter:card" content="summary_large_image" /><script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script><script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: tool.title, description: tool.description, url: canonical, datePublished: '2026-10-12T00:00:00.000Z', dateModified: '2026-10-12T00:00:00.000Z', publisher: { '@type': 'Organization', name: SITE_PRODUCT_NAME } })}</script></Helmet>
    <Header onScrollTo={onScrollTo} activeSection="guides" /><main className="mx-auto max-w-4xl px-4 py-8 sm:px-6"><Breadcrumbs items={breadcrumbs} /><h1 className="my-6 text-4xl font-black tracking-tight sm:text-5xl">{tool.title}</h1>{mode === 'usage' ? <ConsumedDataTool /> : mode === 'phone' ? <PhoneOwnershipTool /> : <BundleSelector />}<p className="mt-8 text-sm text-slate-600">Method checked 12 October 2026. Form inputs stay in this page; they are not sent to DataCost. <Link to="/guides/" className="underline">More tools and practical guides</Link>.</p></main><Footer onNavigate={onNavigate} /><MobileNav onNavigate={onNavigate} />
  </div>;
}
