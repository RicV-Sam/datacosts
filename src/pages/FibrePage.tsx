import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Info,
  Network,
  ShieldCheck,
  Wifi
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import {
  fibrePageBySlug,
  fibrePages,
  FibreContentBlock,
  FibrePageDefinition,
  FibreTableRow,
  formatRand,
  formatSpeed,
  getFibreCompaniesById,
  getFibrePriceCompanyName,
  getFibrePrices,
  getFibrePriceSnapshotStatus,
  getFibreSourcesById,
  isFibrePriceFresh,
  noindexFibreRoutes
} from '../data/fibre';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { NotFoundPage } from './NotFoundPage';

interface FibrePageProps {
  slug: string;
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const speedOptions = [
  { label: 'Light', people: 1, base: 25, note: 'Browsing, messaging, one stream and light work.' },
  { label: 'Everyday', people: 3, base: 50, note: 'Small household, HD streaming, school and work calls.' },
  { label: 'Busy', people: 5, base: 100, note: 'Several people online, gaming, video calls and cloud use.' },
  { label: 'Heavy', people: 7, base: 200, note: 'Creators, big uploads, many devices and frequent downloads.' }
];

const priorityFibrePaths = [
  { label: 'Fibre prices South Africa', href: '/fibre/fibre-prices-south-africa/', note: 'Checked public price examples and the costs to confirm before ordering.' },
  { label: 'Cheapest fibre packages', href: '/fibre/cheapest-fibre-packages-south-africa/', note: 'Low-price examples with setup, router and cancellation caveats.' },
  { label: 'Fibre installation process', href: '/fibre/fibre-installation-process-south-africa/', note: 'What happens between coverage check, order, installation and activation.' },
  { label: 'Prepaid fibre South Africa', href: '/fibre/prepaid-fibre-south-africa/', note: 'Voucher, top-up, expiry and area-limit checks before choosing prepaid fibre.' },
  { label: 'Fibre vs LTE/5G', href: '/fibre/fibre-vs-lte-south-africa/', note: 'When fixed fibre beats mobile-data fallback for home internet.' },
  { label: 'Openserve fibre', href: '/fibre/openserve-fibre-south-africa/', note: 'Recognise Openserve as the line owner behind many ISP packages.' }
];

function buildPageSchema(page: FibrePageDefinition, canonicalUrl: string, datePublishedIso: string, dateModifiedIso: string) {
  if (page.kind === 'hub') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.h1,
      description: page.metaDescription,
      url: canonicalUrl,
      datePublished: datePublishedIso,
      dateModified: dateModifiedIso,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_PRODUCT_NAME,
        url: SITE_URL
      },
      reviewedBy: {
        '@type': 'Person',
        name: SITE_EDITOR_NAME,
        jobTitle: SITE_EDITOR_ROLE
      }
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };
}

function buildItemListSchema(page: FibrePageDefinition) {
  const items = page.kind === 'hub' ? fibrePages.filter((candidate) => candidate.slug !== 'hub') : page.relatedLinks;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.kind === 'hub' ? 'Fibre and home internet guides' : `Related fibre guides for ${page.h1}`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: 'label' in item ? item.label : item.h1,
      url: toCanonicalUrl('href' in item ? item.href : item.path)
    }))
  };
}

function buildFaqSchema(page: FibrePageDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

const StandardTable: React.FC<{ rows: FibreTableRow[]; columns?: [string, string, string] }> = ({ rows, columns = ['Item', 'Use', 'Note'] }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-100">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <tr>
          {columns.map((column) => (
            <th key={column} className="px-4 py-3">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row) => (
          <tr key={`${row.label}-${row.value}`}>
            <td className="px-4 py-4 align-top font-black text-slate-900">{row.label}</td>
            <td className="px-4 py-4 align-top font-medium text-slate-700">{row.value}</td>
            <td className="px-4 py-4 align-top font-medium leading-relaxed text-slate-600">{row.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CompanyGrid: React.FC<{ companyIds: string[] }> = ({ companyIds }) => {
  const companies = getFibreCompaniesById(companyIds);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {companies.map((company) => (
        <article key={company.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">{company.role.toUpperCase()}</p>
              <h3 className="mt-1 text-lg font-black tracking-tight text-slate-900">{company.name}</h3>
            </div>
            <a href={company.officialUrl} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-[#1b6d24]" aria-label={`Open ${company.name}`}>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="text-sm font-medium leading-relaxed text-slate-700">{company.summary}</p>
          <dl className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
            <div>
              <dt className="font-black uppercase tracking-widest text-slate-400">Consumer role</dt>
              <dd className="mt-1 font-medium">{company.consumerRole}</dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-widest text-slate-400">Infrastructure</dt>
              <dd className="mt-1 font-medium">{company.infrastructureRole}</dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-widest text-slate-400">Coverage note</dt>
              <dd className="mt-1 font-medium">{company.coverageNotes}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
};

const PriceTable: React.FC<{ block: Extract<FibreContentBlock, { type: 'price-table' }> }> = ({ block }) => {
  const prices = getFibrePrices({ ...(block.filter ?? {}), limit: block.limit });
  const status = getFibrePriceSnapshotStatus();
  const checkedLabel = formatIsoForDisplay(`${status.checkedAt}T00:00:00.000Z`);

  if (prices.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-medium leading-relaxed text-amber-900">
        No checked price examples are available for this exact filter yet. Use the educational guidance on this page and confirm live prices with the provider.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border p-4 text-sm font-medium leading-relaxed ${status.fresh ? 'border-emerald-100 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
        Price examples checked on {checkedLabel}. They are not live quotes and must be confirmed by exact address.
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Network</th>
              <th className="px-4 py-3">Speed</th>
              <th className="px-4 py-3">Monthly</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {prices.map((price) => {
              const fresh = isFibrePriceFresh(price.checkedAt);
              return (
                <tr key={price.id}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-black text-slate-900">{getFibrePriceCompanyName(price.ispId)}</p>
                    <a href={price.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#1b6d24] hover:underline">
                      {price.sourceLabel}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-4 py-4 align-top font-medium text-slate-700">{getFibrePriceCompanyName(price.fnoId)}</td>
                  <td className="px-4 py-4 align-top font-black text-slate-900">{formatSpeed(price.downloadMbps, price.uploadMbps)}</td>
                  <td className="px-4 py-4 align-top">
                    <p className="font-black text-slate-900">{formatRand(price.monthlyPrice)}</p>
                    {price.promoPrice !== null && <p className="mt-1 text-xs font-bold text-emerald-700">Promo example {formatRand(price.promoPrice)}</p>}
                    <p className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest ${fresh ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {fresh ? 'Checked' : 'Needs recheck'}
                    </p>
                  </td>
                  <td className="px-4 py-4 align-top text-xs font-medium leading-relaxed text-slate-600">
                    {price.setupNotes}
                    {price.requiresAddressCheck && <p className="mt-2 font-bold text-slate-800">Address check required.</p>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SpeedChooser: React.FC<{ intro: string }> = ({ intro }) => {
  const [profile, setProfile] = useState(speedOptions[1].label);
  const [gaming, setGaming] = useState(false);
  const [uploads, setUploads] = useState(false);

  const recommendation = useMemo(() => {
    const selected = speedOptions.find((option) => option.label === profile) ?? speedOptions[1];
    let recommended = selected.base;
    if (gaming) recommended += 25;
    if (uploads) recommended += 50;
    if (recommended <= 25) return '25 Mbps';
    if (recommended <= 50) return '50 Mbps';
    if (recommended <= 100) return '100 Mbps';
    if (recommended <= 200) return '200 Mbps';
    return '500 Mbps or faster';
  }, [gaming, profile, uploads]);

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">{intro}</p>
      <div className="grid gap-3 md:grid-cols-4">
        {speedOptions.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => setProfile(option.label)}
            className={`rounded-2xl border p-4 text-left transition-colors ${profile === option.label ? 'border-[#1b6d24] bg-white text-slate-900' : 'border-slate-100 bg-white/70 text-slate-600 hover:bg-white'}`}
          >
            <span className="block text-sm font-black">{option.label}</span>
            <span className="mt-1 block text-xs font-medium leading-relaxed">{option.people}+ people: {option.note}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={gaming} onChange={(event) => setGaming(event.target.checked)} className="h-4 w-4 accent-[#1b6d24]" />
          Gaming or frequent video calls
        </label>
        <label className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={uploads} onChange={(event) => setUploads(event.target.checked)} className="h-4 w-4 accent-[#1b6d24]" />
          Large uploads, cloud backup or creator work
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#031636] p-5 text-white">
        <Wifi className="h-5 w-5 flex-shrink-0 text-[#a0f399]" />
        <p className="text-sm font-medium">
          Start comparisons around <strong>{recommendation}</strong>, then confirm upload speed and price at your exact address.
        </p>
      </div>
    </div>
  );
};

const CostCalculator: React.FC<{ intro: string }> = ({ intro }) => {
  const [monthly, setMonthly] = useState(499);
  const [setup, setSetup] = useState(0);
  const [router, setRouter] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [exitExposure, setExitExposure] = useState(999);
  const firstMonth = monthly + setup + router + delivery;

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">{intro}</p>
      <div className="grid gap-3 md:grid-cols-5">
        {[
          { label: 'Monthly', value: monthly, setValue: setMonthly },
          { label: 'Setup', value: setup, setValue: setSetup },
          { label: 'Router', value: router, setValue: setRouter },
          { label: 'Delivery', value: delivery, setValue: setDelivery },
          { label: 'Cancel risk', value: exitExposure, setValue: setExitExposure }
        ].map((field) => (
          <label key={field.label} className="block rounded-2xl bg-white p-4">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">{field.label}</span>
            <input
              type="number"
              min="0"
              value={field.value}
              onChange={(event) => field.setValue(Math.max(0, Number(event.target.value) || 0))}
              className="mt-2 w-full rounded-xl border border-slate-100 px-3 py-2 text-sm font-black text-slate-900 outline-none focus:border-[#1b6d24]"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated first month</p>
          <p className="mt-1 text-3xl font-black text-slate-900">{formatRand(firstMonth)}</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Possible early exit exposure</p>
          <p className="mt-1 text-3xl font-black text-slate-900">{formatRand(exitExposure)}</p>
        </div>
      </div>
    </div>
  );
};

const SourceList: React.FC<{ sourceIds: string[] }> = ({ sourceIds }) => {
  const sources = getFibreSourcesById(sourceIds);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {sources.map((source) => (
        <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:border-[#a0f399]">
          <span className="flex items-start justify-between gap-3">
            <span className="text-sm font-black text-slate-900">{source.label}</span>
            <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
          </span>
          <span className="mt-2 block text-xs font-medium leading-relaxed text-slate-600">{source.note}</span>
        </a>
      ))}
    </div>
  );
};

const BlockRenderer: React.FC<{ block: FibreContentBlock }> = ({ block }) => {
  const toneClass = block.type === 'callout' && block.tone === 'warning'
    ? 'border-amber-200 bg-amber-50 text-amber-950'
    : block.type === 'callout' && block.tone === 'success'
      ? 'border-emerald-100 bg-emerald-50 text-emerald-950'
      : 'border-slate-100 bg-white text-slate-700';

  return (
    <section id={block.id} className={`mb-10 scroll-mt-24 rounded-3xl border p-6 shadow-sm md:p-8 ${block.type === 'callout' ? toneClass : 'border-slate-100 bg-white'}`}>
      <div className="mb-4 flex items-center gap-2">
        {block.type === 'price-table' && <Calculator className="h-5 w-5 text-[#1b6d24]" />}
        {block.type === 'speed-tool' && <Wifi className="h-5 w-5 text-[#1b6d24]" />}
        <h2 className="text-2xl font-black tracking-tight text-slate-900">{block.title}</h2>
      </div>

      {'intro' in block && block.intro && <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">{block.intro}</p>}

      {block.type === 'narrative' && (
        <div className="space-y-4 text-sm font-medium leading-relaxed text-slate-600">
          {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}

      {block.type === 'bullets' && (
        <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate-600">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {block.type === 'table' && <StandardTable rows={block.rows} columns={block.columns} />}
      {block.type === 'company-grid' && <CompanyGrid companyIds={block.companyIds} />}
      {block.type === 'price-table' && <PriceTable block={block} />}
      {block.type === 'speed-tool' && <SpeedChooser intro={block.intro} />}
      {block.type === 'cost-tool' && <CostCalculator intro={block.intro} />}
      {block.type === 'source-list' && <SourceList sourceIds={block.sourceIds} />}
      {block.type === 'callout' && <p className="text-sm font-bold leading-relaxed">{block.body}</p>}
    </section>
  );
};

export const FibrePage: React.FC<FibrePageProps> = ({ slug, onNavigate, onScrollTo }) => {
  const page = fibrePageBySlug[slug];

  if (!page) {
    return <NotFoundPage onNavigate={onNavigate} onScrollTo={onScrollTo} />;
  }

  const canonicalUrl = toCanonicalUrl(page.path);
  const shouldNoindex = noindexFibreRoutes.includes(page.path);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso(page.path);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);
  const sourceLabels = getFibreSourcesById(page.sourceIds).map((source) => source.label).join(', ');
  const priceStatus = getFibrePriceSnapshotStatus();
  const priceCheckedLabel = formatIsoForDisplay(`${priceStatus.checkedAt}T00:00:00.000Z`);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Fibre', href: '/fibre/' },
    ...(page.kind === 'hub' ? [] : [{ label: page.h1, href: page.path }])
  ];

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content={page.kind === 'hub' ? 'website' : 'article'} />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        {shouldNoindex && <meta name="robots" content="noindex,follow" />}
        <script type="application/ld+json">{JSON.stringify(buildPageSchema(page, canonicalUrl, datePublishedIso, dateModifiedIso))}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        <script type="application/ld+json">{JSON.stringify(buildItemListSchema(page))}</script>
        <script type="application/ld+json">{JSON.stringify(buildFaqSchema(page))}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="fibre" />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
            <Network className="h-3.5 w-3.5" />
            Fibre and Home Internet
          </div>
          <h1 className="mb-5 max-w-5xl text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{page.h1}</h1>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate-600">{page.intro}</p>
        </header>

        <section className="mb-10 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1b6d24]" />
            Quick Answer
          </div>
          <p className="text-base font-bold leading-relaxed text-slate-800">{page.quickAnswer}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {page.summaryCards.map((card) => (
              <article key={card.label} className="rounded-2xl bg-slate-50 p-4">
                <h2 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{card.label}</h2>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        {page.kind === 'hub' && (
          <section className="mb-10 rounded-[2rem] border border-[#a0f399]/40 bg-[#f3fff4] p-6 shadow-sm md:p-8">
            <div className="mb-5 max-w-3xl">
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">Common fibre searches</p>
              <h2 className="text-2xl font-black tracking-tight text-[#031636]">Start with these fibre decisions</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                These links surface the fibre pages Google has discovered but not consistently crawled yet: pricing, installation, prepaid fibre, LTE comparison and major network-operator explainers.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {priorityFibrePaths.map((link) => (
                <Link key={link.href} to={link.href} className="group rounded-2xl border border-white bg-white p-5 shadow-sm transition-colors hover:border-[#1b6d24]">
                  <h3 className="mb-2 font-black leading-tight text-[#031636] group-hover:text-[#1b6d24]">{link.label}</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{link.note}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {page.kind === 'hub' && (
          <section className="mb-10">
            <h2 className="mb-5 text-2xl font-black tracking-tight">Fibre Decision Guides</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fibrePages.filter((candidate) => candidate.slug !== 'hub').map((candidate) => (
                <Link key={candidate.path} to={candidate.path} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#a0f399]">
                  <h3 className="mb-2 font-black leading-tight text-[#031636]">{candidate.h1}</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{candidate.quickAnswer}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {page.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}

        <TrustPanel
          lastReviewed={lastReviewed}
          sources={`${sourceLabels}. Price examples checked ${priceCheckedLabel}; final fibre availability and pricing must be confirmed by exact address.`}
          className="mb-10"
        />

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Related DataCost Pages</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {page.relatedLinks.map((link) => (
              <Link key={link.href} to={link.href} className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4 hover:bg-[#a0f399]/10">
                <span>
                  <span className="block text-sm font-black text-slate-900">{link.label}</span>
                  <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-600">{link.description}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                <h3 className="mb-2 font-black text-slate-900">{faq.question}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 flex items-start gap-3 rounded-3xl border border-slate-100 bg-white p-6 text-sm font-medium leading-relaxed text-slate-600 shadow-sm">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1b6d24]" />
          <p>
            DataCost does not sell fibre packages. Use these pages to understand the market, then confirm final price, address coverage, installation terms, router rules and cancellation costs with the official provider.
          </p>
        </section>

        <AuthorReviewBlock
          lastReviewed={lastReviewed}
          trustSummary="This fibre guide is built around consumer decisions: coverage, infrastructure owner, ISP role, checked price examples, installation terms and fallback options. Prices are examples, not live quotes."
        />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="fibre" />
    </div>
  );
};
