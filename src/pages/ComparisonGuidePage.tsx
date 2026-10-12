import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle2, ExternalLink, Info, ShieldCheck, Tag } from 'lucide-react';
import { CORE_NETWORKS, filterBundlesByMode, pickBestRowBundleForMode, volumeToGb, isNightBundle, isMonthlyBundle, isSocialBundle } from '../utils/comparisonSelection';
import { MonthlyDealComparison } from '../components/deals/MonthlyDealComparison';
import { getTierComparison, getTierTargetGb } from '../utils/tierComparison';
import { buildMonthlyDealItemListSchema } from '../utils/monthlyDealStructuredData';
import { getDealOfferMetrics } from '../utils/monthlyDealRanking';
import { parseDataAmountToGb } from '../utils/dataCalculator';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction, Bundle, NetworkName } from '../types';
import { getComparisonGuideBySlug } from '../data/comparisonGuides';
import { isNoindexRoute } from '../config/routeCatalog';
import { buildBundleItemListSchema } from '../utils/structuredData';
import { getBundleSourceSummary, isVerifiedBundleSource, MANUAL_PRICE_CHECK_NOTE } from '../utils/bundleSource';
import { networkPages } from '../data/networks';
import { formatIsoForDisplay, getComparisonGuideModifiedIso, getDefaultPublishedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';

interface ComparisonGuidePageProps {
  guideSlug: string;
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

interface ComparisonRow {
  network: NetworkName;
  bundle: Bundle | null;
}

interface WinnerCard {
  label: string;
  text: string;
}

function getBundleType(bundle: Bundle): string {
  if (isSocialBundle(bundle)) return 'Social';
  if (isNightBundle(bundle)) return parseDataAmountToGb(bundle.anytimeData) > 0 ? 'Anytime + Night' : 'Night only';
  if (isMonthlyBundle(bundle) && bundle.validity.toLowerCase().includes('recurring')) return 'Monthly Recurring';
  if (isMonthlyBundle(bundle)) return 'Monthly';
  return bundle.type;
}

function getBundleWatchOut(bundle: Bundle): string {
  if (bundle.watchOut) return bundle.watchOut;
  if (bundle.note) return bundle.note;
  if (isSocialBundle(bundle)) return 'Social-only access';
  if (isNightBundle(bundle)) return parseDataAmountToGb(bundle.anytimeData) > 0 ? 'Night allocation has restricted hours; confirm terms' : 'Night-only usage window';
  if (bundle.validity.toLowerCase().includes('1 day')) return 'Very short validity';
  return 'Check offer terms';
}

function getWinners(mode: string, rows: ComparisonRow[]): WinnerCard[] {
  const validRows = rows
    .filter((row) => row.bundle && isVerifiedBundleSource(row.bundle))
    .map((row) => row.bundle as Bundle);
  if (!validRows.length) {
    return [];
  }

  const cheapest = [...validRows].sort((a, b) => a.price - b.price)[0];
  const bestValue = [...validRows].filter((bundle) => bundle.costPerGb > 0).sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const heavyUse = [...validRows].sort((a, b) => volumeToGb(b.volume) - volumeToGb(a.volume))[0];

  if (mode === 'best-monthly') {
    return [
      { label: 'Lowest upfront price in this table', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: 'Lowest cost per GB in this table', text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Need 10GB, 20GB or 30GB?', text: 'Use the larger monthly comparisons below. These table picks do not cover every plan or provider.' }
    ];
  }

  if (mode === 'cheapest-whatsapp') {
    return [
      { label: 'Cheapest social bundle', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: 'Best social value', text: bestValue ? `${bestValue.network}: ${bestValue.name} at about R${bestValue.costPerGb.toFixed(2)}/GB.` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Coverage check', text: 'Use the operator whose current coverage map and a local SIM test are strongest where you need service.' }
    ];
  }

  if (mode === 'cheap-night') {
    return [
      { label: 'Lowest upfront price among checked rows', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}. This applies only to the checked rows in this table.` },
      { label: 'Compare the night allocation separately', text: 'Both night-only and split anytime-and-night bundles are included. For split bundles, the listed cost per GB is not a price per night-only GB.' },
      { label: 'Check the usable hours', text: 'MTN Night Express uses 00:01-04:59 under its dedicated terms. Check each bundle’s expiry before scheduling a download. The standalone Vodacom 250MB offer still needs confirmation.' }
    ];
  }

  if (mode === 'best-prepaid') {
    return [
      { label: 'Best prepaid value', text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Cheapest upfront prepaid', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: 'Coverage check', text: 'Use the operator whose current coverage map and a local SIM test are strongest where you need service.' }
    ];
  }

  const targetGb = getTierTargetGb(mode);
  if (targetGb) {
    return [
      { label: `Cheapest verified ${targetGb}GB pick`, text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: `Best verified ${targetGb}GB value`, text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Coverage check', text: 'Use the operator whose current coverage map and a local SIM test are strongest where you need service.' }
    ];
  }

  return [
    { label: 'Cheapest upfront option', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
    { label: 'Best value option', text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
    { label: 'Best for heavier users', text: `${heavyUse.network}: ${heavyUse.name} (${heavyUse.volume}).` }
  ];
}

function getIndexableFallbackLink(link: { href: string; label: string; description: string }) {
  const networkFacetMatch = link.href.match(/^\/network\/([^/]+)\/[^/]+\/$/);
  if (networkFacetMatch && isNoindexRoute(link.href)) {
    const networkName = networkFacetMatch[1]
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    return {
      href: `/network/${networkFacetMatch[1]}/`,
      label: `${networkName} network page`,
      description: 'Use the full parent network page for broader bundle context.'
    };
  }

  if (isNoindexRoute(link.href)) {
    return {
      href: '/guides/cheapest-data-south-africa/',
      label: 'Cheapest data South Africa',
      description: 'Use the main comparison page for broader, indexable bundle context.'
    };
  }

  return link;
}

function toIndexableNetworkBundleUrl(networkSlug: string, path: string): string {
  return toCanonicalUrl(isNoindexRoute(path) ? `/network/${networkSlug}/` : path);
}

export const ComparisonGuidePage: React.FC<ComparisonGuidePageProps> = ({ guideSlug, onNavigate, onScrollTo }) => {
  const location = useLocation();
  const storedDefinition = getComparisonGuideBySlug(guideSlug);
  const tier = storedDefinition ? getTierComparison(storedDefinition.mode) : null;
  const definition = storedDefinition && tier ? { ...storedDefinition,
    intro: `Compare ${tier.targetGb}GB-class offers by pooled anytime data, restricted allocations, price, validity and eligibility. Exact once-off smartphone matches are identified separately; larger alternatives are labelled when this catalogue has no target-class match.`,
    tableTitle: `${tier.targetGb}GB-class data comparison`,
    metaDescription: `Compare ${tier.targetGb}GB-class data offers in South Africa with anytime and night allocations, price, validity, eligibility and official source check dates.`
  } : storedDefinition;

  if (!definition) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Helmet>
          <title>Guide Not Found | DataCost</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Guide Not Found</h1>
          <p className="text-slate-600 mb-8">The requested comparison guide is not available.</p>
          <button
            onClick={() => onNavigate('guides-index')}
            className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-[#1b6d24] transition-colors"
          >
            Browse All Guides
          </button>
        </div>
      </div>
    );
  }

  const filteredBundles = filterBundlesByMode(definition.mode);
  const rows: ComparisonRow[] = CORE_NETWORKS.map((network) => {
    const networkBundles = filteredBundles.filter((bundle) => bundle.network === network);
    const chosen = pickBestRowBundleForMode(networkBundles, definition.mode);
    return { network, bundle: chosen };
  });

  const winners = tier ? [
    ...(tier.awards.bestOverall ? [{ label: 'Lowest price for pooled anytime data in this class', text: `${tier.awards.bestOverall.providerName}: ${tier.awards.bestOverall.offerName} at R${tier.awards.bestOverall.priceZar}. Check the eligibility and payment terms below.` }] : []),
    ...(tier.awards.bestAnytimeValue ? [{ label: 'Lowest R / anytime GB in this class', text: `${tier.awards.bestAnytimeValue.providerName}: R${getDealOfferMetrics(tier.awards.bestAnytimeValue).costPerAnytimeGb?.toFixed(2)} per pooled anytime GB. Restricted wallets are excluded.` }] : []),
    { label: 'Advertised totals can include restrictions', text: 'Night, social, streaming and daily-release data do not count as pooled anytime data. Context-only offers do not win price awards.' }
  ] : getWinners(definition.mode, rows);
  const broaderDealSize = tier && [10, 20].includes(tier.targetGb) ? tier.targetGb : null;
  const listedRows = rows.filter((row) => row.bundle).map((row) => row.bundle as Bundle);
  const verifiedListedRows = listedRows.filter(isVerifiedBundleSource);
  const hasManualRequiredRows = listedRows.some((bundle) => bundle.sourceConfidence === 'manual_required');
  const dateModifiedIso = getComparisonGuideModifiedIso(definition.slug);
  const datePublishedIso = getDefaultPublishedIso();
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);
  const canonicalUrl = toCanonicalUrl(definition.canonicalPath);
  const isAliasPath = location.pathname !== definition.canonicalPath;
  const shouldNoindex = isAliasPath || isNoindexRoute(definition.canonicalPath);
  const seenRelatedLinks = new Set<string>();
  const relatedLinks = [...definition.links,
    ...(tier ? [1, 2, 5, 10, 15, 20, 50].filter(size => size !== tier.targetGb).map(size => ({
      href: `/guides/cheapest-${size}gb-data-south-africa/`, label: `Compare ${size}GB data`, description: 'Compare a different allowance and its conditions.'
    })) : []),
    ...(tier ? [{ href: '/best-data-deals-south-africa/', label: 'Monthly data deal tracker', description: 'Compare all tracked providers and their eligibility.' }, { href: '/methodology/', label: 'How DataCost compares offers', description: 'Understand allocations, ranking limits and verification.' }] : [])
  ]
    .map(getIndexableFallbackLink)
    .filter((link) => {
      if (seenRelatedLinks.has(link.href)) return false;
      seenRelatedLinks.add(link.href);
      return true;
    });

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: definition.h1,
    description: definition.metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: definition.h1,
    description: definition.metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE,
      description: SITE_EDITOR_BIO
    },
    reviewedBy: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE
    },
    image: DEFAULT_OG_IMAGE_URL
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: definition.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: toCanonicalUrl('/guides/') },
      { '@type': 'ListItem', position: 3, name: definition.h1, item: canonicalUrl }
    ]
  };

  const itemListSchema = buildBundleItemListSchema(
    definition.tableTitle,
    canonicalUrl,
    verifiedListedRows,
    (bundle) => {
      const networkSlug = Object.values(networkPages).find((page) => page.networkName === bundle.network)?.slug;
      if (!networkSlug) return canonicalUrl;

      if (definition.mode === 'cheapest-1gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/cheapest-1gb/`);
      if (definition.mode === 'cheapest-10gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'cheapest-2gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'cheapest-5gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'cheapest-15gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'cheapest-20gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'cheapest-50gb') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'best-monthly') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/monthly-data/`);
      if (definition.mode === 'best-prepaid') return toCanonicalUrl(`/network/${networkSlug}/`);
      if (definition.mode === 'cheapest-whatsapp') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/social-data/`);
      if (definition.mode === 'cheap-night') return toIndexableNetworkBundleUrl(networkSlug, `/network/${networkSlug}/night-data/`);
      return canonicalUrl;
    }
  );

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{definition.title}</title>
        <meta name="description" content={definition.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {shouldNoindex && <meta name="robots" content="noindex,follow" />}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={definition.title} />
        <meta property="og:description" content={definition.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={definition.title} />
        <meta name="twitter:description" content={definition.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {tier && tier.offers.length > 0 ? <script type="application/ld+json">{JSON.stringify(buildMonthlyDealItemListSchema(definition.tableTitle, canonicalUrl, tier.offers))}</script> : verifiedListedRows.length > 0 && <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <nav aria-label="Breadcrumb" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Updated {lastUpdated}</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Tag className="w-3 h-3" />
            South Africa Telecom Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">{definition.h1}</h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">{definition.intro}</p>
        </header>

        <section className="mb-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-black tracking-tight mb-4">On This Page</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="#quick-answer" className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Quick answer</a>
            <a href="#comparison-table" className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Comparison table</a>
            {definition.whoShouldBuy && definition.whoShouldBuy.length > 0 && <a href="#who-should-buy" className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Who should buy this size</a>}
            {definition.sizeFit && definition.sizeFit.length > 0 && <a href="#size-fit" className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">When it is not enough / too much</a>}
            <a href="#watch-outs" className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">What to watch out for</a>
            <a href="#faq" className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">FAQs</a>
          </div>
        </section>

        <section id="quick-answer" className="mb-10 bg-[#031636] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl scroll-mt-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/10 text-[#a0f399] rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border border-[#a0f399]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Quick Verdict
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">{definition.quickHeading}</h2>
          {broaderDealSize && (
            <div className="text-slate-200 leading-relaxed mb-5">
              <p>This comparison combines the monthly tracker with additional recorded operator bundles and uses the same allocation and price-award rules. MVNO, recurring and split offers retain their eligibility, payment and usage restrictions.</p>
              <Link to={`/best-${broaderDealSize}gb-data-deals-south-africa/`} className="inline-block min-h-[44px] py-2 text-[#a0f399] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                Compare {broaderDealSize}GB-class monthly data offers
              </Link>
              <p className="text-sm">Open the dedicated tracker for further monthly comparison context.</p>
            </div>
          )}
          {definition.mode === 'best-monthly' && (
            <p className="text-slate-200 leading-relaxed mb-5">
              The table selects one recorded once-off smartphone bundle per network, prioritising source-checked rows and then cost per anytime GB. Its picks apply only to those rows. For a larger allowance, compare the{' '}
              <Link to="/best-10gb-data-deals-south-africa/" className="text-[#a0f399] underline">10GB</Link>,{' '}
              <Link to="/best-20gb-data-deals-south-africa/" className="text-[#a0f399] underline">20GB</Link> or{' '}
              <Link to="/best-30gb-data-deals-south-africa/" className="text-[#a0f399] underline">30GB monthly offers</Link>, including plan-specific and bank-linked options with their eligibility conditions.
            </p>
          )}
          {winners.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {winners.map((winner) => (
                <div key={winner.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#a0f399] mb-2">{winner.label}</p>
                  <p className="text-sm text-slate-100 font-medium leading-relaxed">{winner.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-200">{broaderDealSize
              ? `No source-checked exact ${broaderDealSize}GB bundle meets this table’s filters. This does not mean no ${broaderDealSize}GB-class offers are available; use the broader comparison above.`
              : 'No clear listings are currently available for this comparison in the active dataset.'}</p>
          )}
        </section>

        <section id="comparison-table" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl font-black tracking-tighter mb-5">{definition.tableTitle}</h2>
          {tier && (
            <div data-tier-comparison={tier.targetGb}>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {tier.fallback ? `No source-checked ${tier.targetGb}GB-class offer is recorded in this catalogue. These are larger ${tier.sizeGb}GB-class alternatives, not exact ${tier.targetGb}GB matches; no target-size winner is awarded.`
                  : `This class runs from ${tier.targetGb}GB to below ${tier.upperGb}GB of pooled anytime data or advertised total. Restricted totals are labelled and cannot win pooled-anytime awards.`}
                {' '}Only offers eligible under the tracker methodology can win awards; price-plan eligibility still applies. For mixed-validity 2GB offers and classes with only context rows, no pooled-anytime price award is made. R / anytime GB excludes night, social, streaming, conditional bonuses and daily-release wallets. Source dates describe the recorded pricing evidence, not today's editorial update. Confirm current checkout terms.
              </p>
              {tier.offers.length > 0 ? <MonthlyDealComparison sizeGb={tier.sizeGb} offers={tier.offers}
                bestAnytimeValueId={tier.awards.bestAnytimeValue?.id}
                lowestAdvertisedId={tier.awards.lowestAdvertisedPrice?.id} />
                : <p>No current source-checked alternatives are available. See the <Link to="/best-data-deals-south-africa/" className="underline">monthly data tracker</Link> and confirm operator pricing.</p>}
              {listedRows.length > 0 && <h3 className="mt-8 mb-3 text-xl font-black">Exact {tier.targetGb}GB once-off smartphone matches</h3>}
            </div>
          )}
          {(!tier || listedRows.length > 0) ? (
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left min-w-[780px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle / Offer</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Validity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Best For</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Watch Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row) => (
                  <tr key={row.network} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">{row.network}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {row.bundle ? (
                        <>
                          <div>{row.bundle.name}</div>
                          <div className="mt-1 text-sm">Anytime: {row.bundle.anytimeData}; Night: {row.bundle.nightData || '0GB'}</div>
                          <div className={`mt-1 text-[10px] font-black uppercase tracking-wider ${isVerifiedBundleSource(row.bundle) ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {isVerifiedBundleSource(row.bundle) ? 'Source checked' : 'Confirm live - excluded from leader claims'}
                          </div>
                          {getBundleSourceSummary(row.bundle) && (
                            <div className="mt-1 text-[10px] font-medium text-slate-500">{getBundleSourceSummary(row.bundle)}</div>
                          )}
                          {row.bundle.sourceUrl && (
                            <a href={row.bundle.sourceUrl} className="inline-block mt-2 text-sm text-[#1b6d24] underline">
                              {row.network} source and terms
                            </a>
                          )}
                        </>
                      ) : (
                        'No clear listed match for this intent'
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">{row.bundle ? getBundleType(row.bundle) : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {row.bundle ? isVerifiedBundleSource(row.bundle) ? `R${row.bundle.price}` : <><span>Confirm</span><span className="block text-xs text-slate-500">Recorded reference: R{row.bundle.price}</span></> : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? row.bundle.validity : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? isVerifiedBundleSource(row.bundle) ? `R${row.bundle.costPerGb.toFixed(2)}/GB` : 'Confirm price and terms first' : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? isVerifiedBundleSource(row.bundle) ? row.bundle.bestFor || 'General prepaid use' : 'Confirm current terms' : 'No listed candidate'}</td>
                    <td className="px-6 py-4 text-amber-700">{row.bundle ? getBundleWatchOut(row.bundle) : 'Check operator menu for current offer'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : null}
          {definition.mode === 'best-monthly' && (
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Cost per GB = bundle price divided by the listed general-use GB. Social and router products are excluded; a night bonus is shown separately and does not remove the anytime allowance; an empty network row means no matching recorded bundle, not that the operator sells no monthly data. The checked dates beside the rows describe the pricing evidence; the page update date describes the editorial changes.
            </p>
          )}
          {hasManualRequiredRows && (
            <p className="mt-3 text-[10px] text-slate-500 font-medium italic">{MANUAL_PRICE_CHECK_NOTE}</p>
          )}
        </section>
        {definition.whoShouldBuy && definition.whoShouldBuy.length > 0 && (
          <section id="who-should-buy" className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm scroll-mt-32">
            <h2 className="text-2xl font-black tracking-tighter mb-6">{definition.whoShouldBuyTitle || 'Who Should Buy This Size?'}</h2>
            <div className="space-y-5">
              {definition.whoShouldBuy.map((item) => (
                <div key={item.title} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-black tracking-tight mb-2">{item.title}</h3>
                  <p className="text-slate-700 font-medium leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {definition.sizeFit && definition.sizeFit.length > 0 && (
          <section id="size-fit" className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm scroll-mt-32">
            <h2 className="text-2xl font-black tracking-tighter mb-6">{definition.sizeFitTitle || 'When This Size Is Not Enough (Or Too Much)'}</h2>
            <div className="space-y-5">
              {definition.sizeFit.map((item) => (
                <div key={item.title} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-black tracking-tight mb-2">{item.title}</h3>
                  <p className="text-slate-700 font-medium leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="watch-outs" className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm scroll-mt-32">
          <h2 className="text-2xl font-black tracking-tighter mb-4">What to watch out for</h2>
          <div className="space-y-3">
            {definition.watchOuts.map((item) => (
              <div key={item} className="flex items-start gap-3 text-slate-700 font-medium leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-[#1b6d24] mt-0.5 flex-shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-4">Practical savings advice</h2>
          <div className="space-y-4">
            {definition.savingsTips.map((tip, index) => (
              <div key={tip} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#031636] text-white text-xs font-black flex items-center justify-center flex-shrink-0">{index + 1}</div>
                <p className="text-slate-700 font-medium leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            Internal links for deeper comparison
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedLinks.map((link) => (
              <a key={link.href} href={link.href} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#1b6d24] transition-colors">
                <div className="font-black text-slate-900">{link.label}</div>
                <p className="text-sm text-slate-600 mt-2">{link.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="faq" className="mb-12 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm scroll-mt-32">
          <h2 className="text-2xl font-black tracking-tighter mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {definition.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-black mb-2">{faq.question}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {['cheap-night-data-south-africa', 'best-monthly-data-deals-south-africa'].includes(definition.slug) && (
          <aside className="mb-12 rounded-3xl border border-slate-100 bg-white p-6" aria-labelledby="everyday-value-story-title">
            <h2 id="everyday-value-story-title" className="text-lg font-bold text-slate-900">Put the bundle price into perspective</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">An example from our Everyday Value SA blog shows how unused night data and expiry can change the cost of the data you actually use.</p>
            <a className="mt-3 inline-block font-bold text-[#1b6d24] hover:underline" href="https://everyday-value-sa.blogspot.com/2026/10/the-cheap-looking-data-bundle-that.html">Read the worked bundle-cost example</a>
          </aside>
        )}

        <AuthorReviewBlock lastReviewed={lastUpdated} className="mb-12" />

        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p className="font-medium">
            <strong>Independent analysis:</strong> {definition.trustLine} Prices may change, so always verify with the operator. For detailed scoring standards and methodology controls, review our{' '}
            <a href="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</a>{' '}
            and{' '}
            <a href="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</a>.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {CORE_NETWORKS.map((networkName) => {
            const slug = Object.values(networkPages).find((page) => page.networkName === networkName)?.slug;
            if (!slug) return null;

            return (
              <a
                key={networkName}
                href={`/network/${slug}/`}
                className="inline-flex items-center justify-between gap-2 px-5 py-3 bg-[#1b6d24] text-white rounded-xl font-black hover:bg-[#a0f399] hover:text-[#031636] transition-all"
              >
                <span>{networkName} {definition.mode === 'best-monthly' ? 'DataCost guide' : 'Official Context'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
