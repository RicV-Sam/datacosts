import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  FileText,
  Gift,
  Network,
  ReceiptText,
  Scale,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { DataCostAnswerCta, DataCostAnswerIntro } from '../components/DataCostAnswer';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_LOGO_URL,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';

interface Props {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

interface OfferValues {
  monthly: number;
  months: number;
  onceOff: number;
}

const routePath = '/guides/cellphone-retention-offer-vs-switching-south-africa/';
const published = '2026-07-19T00:00:00.000Z';

const offerChecklist = [
  ['Term', 'The exact start date, number of payments and fixed-term end date.'],
  ['Monthly price', 'The first bill, normal recurring amount and whether annual increases can apply.'],
  ['Once-off costs', 'Upgrade, SIM, connection, delivery, activation or administration fees.'],
  ['Device', 'Exact model, storage, cash price, ownership date and any trade-in conditions.'],
  ['Data and calls', 'Anytime versus night or app data, validity, rollover, minutes and SMS.'],
  ['Promotions', 'Which values are promotional, when they expire and what replaces them.'],
  ['Extra services', 'Insurance, subscriptions, accessories and whether each can be removed.'],
  ['Exit position', 'Early-cancellation basis, number-porting sequence and any old-account settlement.']
];

const redFlags = [
  '“This offer ends today” but no written quotation is available.',
  'The consultant calls the phone or accessory “free” without showing the full-term total.',
  'One offer is 24 months and the other is 36 months, but only the monthly prices are compared.',
  'Night, social or on-network value is presented as if it were unrestricted anytime value.',
  'A discount or bonus is quoted without an end date or post-promotion price.',
  'The new agreement start date and remaining old-device payments are unclear.',
  'A trade-in value is assumed before the device has been assessed and confirmed.',
  'Coverage is discussed using a map only, with no test where the phone is actually used.',
  'Insurance, value-added services or accessories appear preselected or compulsory without explanation.',
  'The promise exists only in a call recording controlled by the seller, not in documents you hold.'
];

const faqs = [
  {
    question: 'What is a cellphone retention offer?',
    answer: 'It is an offer intended to keep an existing customer, often when the account is eligible for renewal, out of contract or considering cancellation. It may include a discount, bonus allocation, device, accessory or different plan, but it normally still creates the agreement shown in its written terms.'
  },
  {
    question: 'How do I know if a retention offer is actually cheaper?',
    answer: 'Compare the full amount payable over the same period, including monthly payments, once-off fees, the old-account settlement and any separately purchased phone. Only compare totals directly when the term, device, useful service allocation and coverage are equivalent.'
  },
  {
    question: 'Should I accept a free phone or free data?',
    answer: 'Give it only the value it has to you. A phone bundled into a higher monthly payment is not economically free, and promotional data may have limits, expiry rules or a shorter duration than the contract. Ask what the same service costs without the benefit.'
  },
  {
    question: 'Can I negotiate a cellphone contract renewal?',
    answer: 'You can ask for written alternatives: month-to-month, SIM-only, the same plan without a device, and the proposed device upgrade. A competing written quote can make the discussion more concrete, but the provider does not have to match it.'
  },
  {
    question: 'Is switching worth it if the monthly saving is small?',
    answer: 'Not automatically. Include the settlement, once-off fees, coverage risk, porting effort and lost benefits. A small saving can still matter over a long term, but poor coverage or an unsuitable allocation can erase it quickly.'
  },
  {
    question: 'Can I keep my number if I reject the retention offer?',
    answer: 'Yes, through mobile number portability, provided the number remains active and the port is processed correctly. Apply through the new provider before disconnecting the old service. Porting does not remove valid charges or device obligations on the old account.'
  },
  {
    question: 'Should I compare prepaid with a retention contract?',
    answer: 'Yes, especially if the current phone still works. Build a realistic prepaid monthly basket using your actual data and calls, then compare it over the same number of months. Include the cost of replacing the phone separately if needed.'
  }
];

const relatedGuides = [
  ['/guides/what-to-do-when-cellphone-contract-ends-south-africa/', 'What to do when your contract ends', 'Choose between month-to-month, upgrading, SIM-only, prepaid and switching.'],
  ['/guides/how-to-cancel-cellphone-contract-south-africa/', 'How to cancel a cellphone contract', 'Follow the correct notice, settlement and number-preservation process.'],
  ['/guides/best-sim-only-deals-south-africa/', 'Compare SIM-only deals', 'Price service separately from a new phone.'],
  ['/network/', 'Compare networks', 'Check current network pages and coverage context before switching.']
];

const money = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });
const safeNumber = (value: string) => Math.max(0, Number(value) || 0);

export const RetentionOfferVsSwitchGuidePage: React.FC<Props> = ({ onNavigate, onScrollTo }) => {
  const [retention, setRetention] = React.useState<OfferValues>({ monthly: 0, months: 24, onceOff: 0 });
  const [alternative, setAlternative] = React.useState<OfferValues>({ monthly: 0, months: 24, onceOff: 0 });
  const [settlement, setSettlement] = React.useState(0);
  const [sameDevice, setSameDevice] = React.useState(false);
  const [coverageWorks, setCoverageWorks] = React.useState(false);

  const title = 'Is Your Cellphone Retention Offer a Good Deal—or Should You Switch?';
  const seoTitle = 'Cellphone Retention Offer vs Switching Networks in South Africa';
  const description = 'Compare a cellphone retention offer with switching networks in South Africa using full-term costs, device value, coverage, promotions and a practical calculator.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const modified = getRouteModifiedIso(routePath);
  const retentionTotal = (retention.monthly * retention.months) + retention.onceOff;
  const alternativeTotal = (alternative.monthly * alternative.months) + alternative.onceOff + settlement;
  const retentionEffective = retention.months ? retentionTotal / retention.months : 0;
  const alternativeEffective = alternative.months ? alternativeTotal / alternative.months : 0;
  const sameTerm = retention.months === alternative.months;
  const difference = Math.abs(retentionTotal - alternativeTotal);
  const lowerCost = retentionTotal === alternativeTotal ? 'The entered totals are equal.' : retentionTotal < alternativeTotal
    ? `The retention offer is ${money.format(difference)} lower over this period.`
    : `The alternative is ${money.format(difference)} lower over this period.`;
  const comparisonReady = sameTerm && sameDevice && coverageWorks;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Retention offer vs switching', href: routePath }
  ];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Organization', name: SITE_BRAND_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_LOGO_URL }
    }
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };

  const updateOffer = (offer: 'retention' | 'alternative', field: keyof OfferValues, value: string) => {
    const update = field === 'months' ? Math.max(1, Math.round(safeNumber(value))) : safeNumber(value);
    if (offer === 'retention') setRetention((current) => ({ ...current, [field]: update }));
    else setAlternative((current) => ({ ...current, [field]: update }));
  };

  const inputClass = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-bold text-slate-900 outline-none transition focus:border-[#1b6d24] focus:ring-2 focus:ring-[#a0f399]/40';

  return <div className="min-h-screen bg-mesh pb-24 font-sans text-[#1a1c1c]">
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    <Header onScrollTo={onScrollTo} activeSection="guides" />
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]"><Scale className="h-4 w-4" /> Offer comparison guide</div>
        <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{title}</h1>
        <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-600">A retention offer wins only when the whole offer fits: total cost, phone, usable service, coverage, flexibility and written terms.</p>
      </header>

      <DataCostAnswerIntro
        number={6}
        question="My network offered me a special deal to stay. How do I know whether it is better than switching?"
        answer="Put the retention offer and the best realistic alternative into the same format. Compare the full-term amount, equivalent phone, usable anytime data and calls, coverage, once-off fees, promotion end dates and exit terms. A lower monthly price is not a better deal if it lasts longer, includes the wrong value, loses coverage or hides an old-account settlement."
      />

      <section className="mb-10 rounded-[2rem] border-2 border-amber-300 bg-amber-50 p-6 shadow-sm md:p-8">
        <div className="mb-3 flex items-center gap-2 text-amber-950"><AlertTriangle className="h-6 w-6" /><h2 className="text-2xl font-black">First make the offers comparable</h2></div>
        <p className="text-sm font-medium leading-relaxed text-amber-950">The same monthly price can describe very different deals. Match the term, device, storage, useful service allocation and expected coverage before comparing totals. If one offer is SIM-only and the other includes a phone, add an equivalent phone cost to the SIM-only path or remove the device from both.</p>
      </section>

      <section className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3"><Calculator className="h-7 w-7 text-[#1b6d24]" /><div><h2 className="text-3xl font-black tracking-tight">Retention offer vs switch calculator</h2><p className="text-sm font-medium text-slate-600">Enter quoted amounts including VAT. Your figures stay in this browser and are not sent to DataCost.</p></div></div>

        <div className="grid gap-5 lg:grid-cols-2">
          <fieldset className="rounded-3xl bg-[#f6fff4] p-5">
            <legend className="px-2 text-lg font-black text-[#1b6d24]">Retention offer</legend>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Monthly price (R)<input aria-label="Retention monthly price" type="number" min="0" inputMode="decimal" value={retention.monthly} onChange={(event) => updateOffer('retention', 'monthly', event.target.value)} className={inputClass} /></label>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Term (months)<input aria-label="Retention term in months" type="number" min="1" inputMode="numeric" value={retention.months} onChange={(event) => updateOffer('retention', 'months', event.target.value)} className={inputClass} /></label>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Once-off costs (R)<input aria-label="Retention once-off costs" type="number" min="0" inputMode="decimal" value={retention.onceOff} onChange={(event) => updateOffer('retention', 'onceOff', event.target.value)} className={inputClass} /></label>
            </div>
            <div className="mt-5 rounded-2xl bg-white p-4"><p className="text-xs font-black uppercase tracking-wider text-slate-400">Full-term total</p><p className="text-3xl font-black text-slate-950">{money.format(retentionTotal)}</p><p className="text-xs font-bold text-slate-500">Effective {money.format(retentionEffective)} per month</p></div>
          </fieldset>

          <fieldset className="rounded-3xl bg-sky-50 p-5">
            <legend className="px-2 text-lg font-black text-sky-800">Best realistic alternative</legend>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Monthly price (R)<input aria-label="Alternative monthly price" type="number" min="0" inputMode="decimal" value={alternative.monthly} onChange={(event) => updateOffer('alternative', 'monthly', event.target.value)} className={inputClass} /></label>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Term (months)<input aria-label="Alternative term in months" type="number" min="1" inputMode="numeric" value={alternative.months} onChange={(event) => updateOffer('alternative', 'months', event.target.value)} className={inputClass} /></label>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Once-off costs (R)<input aria-label="Alternative once-off costs" type="number" min="0" inputMode="decimal" value={alternative.onceOff} onChange={(event) => updateOffer('alternative', 'onceOff', event.target.value)} className={inputClass} /></label>
            </div>
            <label className="mt-4 block text-xs font-black uppercase tracking-wider text-slate-500">Old-account settlement to switch (R)<input aria-label="Old account settlement" type="number" min="0" inputMode="decimal" value={settlement} onChange={(event) => setSettlement(safeNumber(event.target.value))} className={inputClass} /></label>
            <div className="mt-5 rounded-2xl bg-white p-4"><p className="text-xs font-black uppercase tracking-wider text-slate-400">Full-term total</p><p className="text-3xl font-black text-slate-950">{money.format(alternativeTotal)}</p><p className="text-xs font-bold text-slate-500">Effective {money.format(alternativeEffective)} per month</p></div>
          </fieldset>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-700"><input type="checkbox" checked={sameDevice} onChange={(event) => setSameDevice(event.target.checked)} className="mt-0.5 h-5 w-5 accent-[#1b6d24]" /><span>The offers include equivalent phones, or I added the missing phone cost.</span></label>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-700"><input type="checkbox" checked={coverageWorks} onChange={(event) => setCoverageWorks(event.target.checked)} className="mt-0.5 h-5 w-5 accent-[#1b6d24]" /><span>I tested that the alternative coverage works where I need it.</span></label>
        </div>

        <div className={`mt-5 rounded-2xl p-5 ${comparisonReady ? 'bg-slate-950 text-white' : 'bg-amber-50 text-amber-950'}`} aria-live="polite">
          <p className="font-black">{comparisonReady ? lowerCost : 'The comparison is not ready yet.'}</p>
          <p className="mt-1 text-sm font-medium leading-relaxed opacity-80">{!sameTerm ? 'Set both offers to the same term before comparing their totals. ' : ''}{!sameDevice ? 'Confirm equivalent device value. ' : ''}{!coverageWorks ? 'Confirm usable alternative coverage. ' : ''}{comparisonReady ? 'Now compare flexibility, useful allocations, promotion rules and written terms before deciding.' : ''}</p>
        </div>
        <p className="mt-3 text-xs font-bold leading-relaxed text-slate-500">Estimate only: it assumes the entered monthly amount applies throughout the stated term. Add any expected mandatory fees or phone cost. It does not predict future tariff increases, usage or trade-in assessments.</p>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center gap-3"><ReceiptText className="h-7 w-7 text-[#1b6d24]" /><div><h2 className="text-3xl font-black tracking-tight">The written-offer checklist</h2><p className="text-sm font-medium text-slate-600">Every missing field is a question, not a harmless blank.</p></div></div>
        <div className="grid gap-4 md:grid-cols-2">{offerChecklist.map(([heading, detail]) => <article key={heading} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"><h3 className="mb-1 font-black text-slate-900">{heading}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{detail}</p></article>)}</div>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Gift className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">How to value “free” extras</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">Use your value, not the advertised retail price. An accessory you would never buy is worth R0 in the comparison. Bonus data is worth only the amount of data it replaces, during the months it is usable.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">Ask for the same service without the gift or device. The price difference is often more useful than the word “free”.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Smartphone className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Separate the phone from the network</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">If both quotes contain different phones, you are comparing devices more than networks. Request a SIM-only quote from each side, then compare the phones separately using cash price, support period, storage, warranty and repairability.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">This prevents an attractive device from hiding an expensive or unsuitable service plan.</p>
        </article>
      </section>

      <section className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><CheckCircle2 className="h-6 w-6 text-[#a0f399]" /><h2 className="text-2xl font-black">Five tests a good retention offer should pass</h2></div>
        <ol className="space-y-3">{[
          ['Coverage', 'The existing network performs reliably where you live, work and travel.'],
          ['Need', 'The device and allocations match real usage rather than an inflated sales bundle.'],
          ['Cost', 'Its full-term total is competitive with a realistic alternative.'],
          ['Flexibility', 'The commitment is justified by a benefit you can identify and value.'],
          ['Evidence', 'The quotation, promotion rules and promises are all in documents you hold.']
        ].map(([heading, detail], index) => <li key={heading} className="flex gap-3 rounded-2xl bg-white/10 p-4"><span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#a0f399] text-xs font-black text-slate-950">{index + 1}</span><p className="text-sm font-medium leading-relaxed text-slate-200"><strong className="text-white">{heading}:</strong> {detail}</p></li>)}</ol>
      </section>

      <section className="mb-10 rounded-[2rem] border-2 border-rose-200 bg-rose-50 p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2 text-rose-950"><AlertTriangle className="h-6 w-6" /><h2 className="text-2xl font-black">Retention-offer red flags</h2></div>
        <ul className="grid gap-3 md:grid-cols-2">{redFlags.map((flag) => <li key={flag} className="rounded-2xl bg-white/70 p-4 text-sm font-medium leading-relaxed text-rose-950">{flag}</li>)}</ul>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <FileText className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">A negotiation script that creates evidence</h2>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700"><p>Please send the retention offer as a complete written quotation. I also want comparable quotes for:</p><p className="mt-2">1. the same service without a device;<br />2. a month-to-month SIM-only option; and<br />3. the lowest suitable plan based on my recent usage.</p><p className="mt-2">For each option, confirm the agreement start date, term, total monthly and once-off costs, device cash price, allocations, promotion end dates, price after promotions, optional extras and early-exit basis.</p></div>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Network className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">A switching quote needs evidence too</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">Use a prepaid SIM or eSIM where practical to test the receiving network. Confirm whether the quoted service uses partner roaming, whether 5G is available on the plan, and how porting, RICA and activation work.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">Start the number port through the new provider before the old number is disconnected, and add the old-account settlement to the switching total.</p>
        </article>
      </section>

      <section className="mb-10 rounded-[2rem] border border-[#a0f399]/60 bg-[#f6fff4] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2"><BadgeCheck className="h-6 w-6 text-[#1b6d24]" /><h2 className="text-2xl font-black">What official terms show you to check</h2></div>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-5"><h3 className="mb-2 font-black">Discounts and bonuses can have different lifetimes</h3><p className="text-sm font-medium leading-relaxed text-slate-600">Vodacom publishes plan terms in which subscription discounts can end after the agreed period, and separate bonus-bundle terms where a discounted bundle is removed on upgrade. Telkom’s mobile terms similarly say promotional allocations or discounts can expire at maturity.</p><div className="mt-3 flex flex-wrap gap-3"><a href="https://www.vodacom.co.za/vodacom/terms/contract-terms-and-conditions" target="_blank" rel="noreferrer" className="text-xs font-black text-[#1b6d24] hover:underline">Vodacom contract terms</a><a href="https://www.vodacom.co.za/vodacom/terms/data-bundle-terms/discounted-bonus-bundle" target="_blank" rel="noreferrer" className="text-xs font-black text-[#1b6d24] hover:underline">Vodacom bonus terms</a><a href="https://group.telkom.co.za/documents/regulatory/terms-and-conditions/FlexOn-Infinite-Mobile-Post-paid-and-TopUp-Plans.pdf" target="_blank" rel="noreferrer" className="text-xs font-black text-[#1b6d24] hover:underline">Telkom mobile terms</a></div></article>
          <article className="rounded-2xl bg-white p-5"><h3 className="mb-2 font-black">Longer terms need closer comparison</h3><p className="text-sm font-medium leading-relaxed text-slate-600">The Consumer Protection Act regulations set 24 months as the general maximum fixed term unless a longer term is expressly agreed and a demonstrable financial benefit is shown, or another permitted exception applies. Ask what the 36-month benefit is and compare its full total.</p><div className="mt-3 flex flex-wrap gap-3"><a href="https://www.gov.za/sites/default/files/32186_467.pdf" target="_blank" rel="noreferrer" className="text-xs font-black text-[#1b6d24] hover:underline">Consumer Protection Act</a><a href="https://www.gov.za/sites/default/files/gcis_document/201409/34180rg9515gon293.pdf" target="_blank" rel="noreferrer" className="text-xs font-black text-[#1b6d24] hover:underline">CPA regulations</a></div></article>
        </div>
      </section>

      <section className="mb-10 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"><CircleDollarSign className="mb-3 h-6 w-6 text-[#1b6d24]" /><h2 className="mb-2 text-lg font-black">Stay when</h2><p className="text-sm font-medium leading-relaxed text-slate-600">Coverage works, the offer passes all five tests and the full-term value beats or closely matches the alternative.</p></article>
        <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"><ShieldCheck className="mb-3 h-6 w-6 text-[#1b6d24]" /><h2 className="mb-2 text-lg font-black">Switch when</h2><p className="text-sm font-medium leading-relaxed text-slate-600">The tested network is better, the total is meaningfully lower or the current provider cannot offer a suitable plan.</p></article>
        <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"><FileCheck2 className="mb-3 h-6 w-6 text-[#1b6d24]" /><h2 className="mb-2 text-lg font-black">Wait when</h2><p className="text-sm font-medium leading-relaxed text-slate-600">The current term has expired and month-to-month gives you time, provided you have checked its price and notice rules.</p></article>
      </section>

      <aside className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 text-sm font-medium leading-relaxed text-slate-600"><strong className="text-slate-900">Important:</strong> This is practical consumer information and an estimation tool, not legal or financial advice. Provider terms, promotions and prices change. Verify the final quotation, affordability, contract status and settlement directly with the provider before accepting or switching.</aside>

      <section className="mb-10">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Prepare before accepting</h2>
        <div className="grid gap-4 md:grid-cols-2">{relatedGuides.map(([href, label, detail]) => <Link key={href} to={href} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-colors hover:border-[#1b6d24]"><h3 className="mb-1 font-black text-slate-900">{label}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{detail}</p></Link>)}</div>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Frequently asked questions</h2>
        <div className="space-y-5">{faqs.map((faq) => <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"><h3 className="mb-2 text-lg font-black">{faq.question}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div>
      </section>

      <DataCostAnswerCta />
      <TrustPanel
        lastReviewed={formatIsoForDisplay(modified)}
        sources="Consumer Protection Act section 14 and regulation 5, ICASA mobile number portability guidance, plus official Vodacom, MTN, Telkom and Cell C contract, upgrade, promotion and month-to-month terms."
      />
    </main>
    <Footer onNavigate={onNavigate} />
    <MobileNav onNavigate={onNavigate} />
  </div>;
};
