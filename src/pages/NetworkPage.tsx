import React from 'react';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { ussdRepository } from '../data/ussd';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { ArrowLeft, ChevronRight, ShieldCheck, Zap, Info, Smartphone, HelpCircle, Clock, Tag, ExternalLink, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { NetworkName, NavigateFunction, Bundle } from '../types';
import { buildBundleItemListSchema } from '../utils/structuredData';
import { formatIsoForDisplay, getDefaultPublishedIso, getNetworkModifiedIso } from '../seo/contentDates';

interface NetworkPageProps {
  networkSlug: string;
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

interface SummaryCard {
  label: string;
  bundle: Bundle;
}

const formatCurrency = (value: number) => `R${value}`;
const formatValue = (bundle: Bundle) => `R${bundle.costPerGb.toFixed(2)}/GB`;

const isHourlyBundle = (bundle: Bundle) => bundle.type === 'Hourly' || bundle.validity.toLowerCase().includes('hour');
const isDailyBundle = (bundle: Bundle) => bundle.type === 'Daily' || (bundle.validity.toLowerCase().includes('day') && !bundle.validity.toLowerCase().includes('7 day') && !bundle.validity.toLowerCase().includes('30 day'));
const isWeeklyBundle = (bundle: Bundle) => bundle.type === 'Weekly' || bundle.validity.toLowerCase().includes('week') || bundle.validity.toLowerCase().includes('7 day');
const isMonthlyBundle = (bundle: Bundle) => bundle.type === 'Monthly' || bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month');
const isNightBundle = (bundle: Bundle) => bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== '');
const isSocialBundle = (bundle: Bundle) => bundle.type === 'Social' || bundle.name.toLowerCase().includes('whatsapp') || bundle.name.toLowerCase().includes('social');

const getNetworkBundleType = (bundle: Bundle): string => {
  if (isSocialBundle(bundle)) return 'Social';
  if (isNightBundle(bundle)) return 'Night';
  if (isHourlyBundle(bundle)) return 'Hourly';
  if (isDailyBundle(bundle)) return 'Daily';
  if (isWeeklyBundle(bundle)) return 'Weekly';
  if (isMonthlyBundle(bundle) && bundle.validity.toLowerCase().includes('recurring')) return 'Monthly Recurring';
  if (isMonthlyBundle(bundle)) return 'Monthly Once-off';
  return bundle.type;
};

const getBundleWatchOut = (bundle: Bundle): string => {
  if (bundle.watchOut) return bundle.watchOut;
  if (bundle.note) return bundle.note;
  if (isSocialBundle(bundle)) return 'App-limited access';
  if (isNightBundle(bundle)) return 'Night-only usage window';
  if (bundle.validity.toLowerCase().includes('1 hour')) return 'Very short validity';
  if (bundle.validity.toLowerCase().includes('1 day')) return 'Short validity';
  if (bundle.validity.toLowerCase().includes('recurring')) return 'Auto-renews';
  return 'Check offer terms';
};

export const NetworkPage: React.FC<NetworkPageProps> = ({ networkSlug, onNavigate, onScrollTo }) => {
  const pageData = networkPages[networkSlug];

  const networkKey = pageData?.networkName as NetworkName | undefined;
  const network = networkKey ? networkMetadata[networkKey] : null;
  const networkBundles = bundles.filter(b => b.network === networkKey);
  const ussdCodes = ussdRepository.filter(u => u.network === networkKey);

  if (!network || !pageData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Network Not Found | DataCost</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-4xl font-black mb-4">Network Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md text-center">
          We couldn't find the network you're looking for. It may have been removed or the URL is incorrect.
        </p>
        <button 
          onClick={() => onNavigate('home')}
          className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-emerald-600 transition-colors"
        >
          View All Networks
        </button>
      </div>
    );
  }

  const sortedBundles = [...networkBundles].sort((a, b) => a.price - b.price);
  const standardBundles = sortedBundles.filter((bundle) => !isSocialBundle(bundle));
  const generalUseBundles = standardBundles.filter((bundle) => !isNightBundle(bundle) && !isHourlyBundle(bundle));
  const nightBundles = sortedBundles.filter((bundle) => isNightBundle(bundle));

  const bestCheapGeneralBundle = [...generalUseBundles, ...standardBundles].sort((a, b) => a.price - b.price)[0];
  const best1GbOption = generalUseBundles.filter((bundle) => bundle.volume.toLowerCase().includes('1gb')).sort((a, b) => a.price - b.price)[0];
  const bestMonthlyValue = standardBundles.filter((bundle) => isMonthlyBundle(bundle)).sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const bestNightBundle = nightBundles.sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const bestHeavyUser = standardBundles
    .filter((bundle) => isMonthlyBundle(bundle) && (bundle.volume.toLowerCase().includes('10gb') || bundle.volume.toLowerCase().includes('20gb') || bundle.volume.toLowerCase().includes('30gb') || bundle.volume.toLowerCase().includes('50gb')))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const summaryCards: SummaryCard[] = [
    bestCheapGeneralBundle ? { label: `Best cheap general-use ${network.name} bundle`, bundle: bestCheapGeneralBundle } : null,
    best1GbOption ? { label: `Best ${network.name} 1GB option`, bundle: best1GbOption } : null,
    bestMonthlyValue ? { label: `Best monthly ${network.name} value`, bundle: bestMonthlyValue } : null,
    bestNightBundle ? { label: `Best ${network.name} night bundle`, bundle: bestNightBundle } : null,
    bestHeavyUser ? { label: `Best ${network.name} heavy-use bundle`, bundle: bestHeavyUser } : null
  ].filter((item): item is SummaryCard => item !== null);

  const comparisonRows = pageData.comparisonSummary || [];

  const pageTitle = `${network.name} Data Prices South Africa (2026) | DataCost`;
  const metaDescription = `Compare ${network.name} prepaid data prices in South Africa, including daily, weekly and monthly bundles, USSD codes, and practical savings tips updated for 2026.`;
  const canonicalUrl = `https://datacost.co.za/network/${networkSlug}/`;
  const dateModifiedIso = getNetworkModifiedIso(networkSlug);
  const datePublishedIso = getDefaultPublishedIso();
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${network.name} Data Prices South Africa (2026)`,
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: 'DataCost',
      url: 'https://datacost.co.za/'
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${network.name} Data Prices South Africa (2026)`,
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: 'DataCost.co.za',
      url: 'https://datacost.co.za'
    },
    image: 'https://datacost.co.za/og-image.jpg'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map(faq => ({
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://datacost.co.za/' },
      { '@type': 'ListItem', position: 2, name: 'Networks', item: 'https://datacost.co.za/network/' },
      { '@type': 'ListItem', position: 3, name: `${network.name} Data Prices`, item: canonicalUrl }
    ]
  };

  const bundleItemListSchema = buildBundleItemListSchema(
    `${network.name} Mobile Data Bundles`,
    canonicalUrl,
    sortedBundles,
    () => canonicalUrl
  );

  const bundleTypeMap: Record<string, { label: string; filter: (b: Bundle) => boolean }> = {
    'cheapest-1gb': { label: `Cheapest 1GB ${network.name} data`, filter: (b) => b.volume === '1GB' && !isSocialBundle(b) },
    'daily-data': { label: `${network.name} daily bundles`, filter: (b) => isDailyBundle(b) },
    'weekly-data': { label: `${network.name} weekly bundles`, filter: (b) => isWeeklyBundle(b) },
    'monthly-data': { label: `${network.name} monthly bundles`, filter: (b) => isMonthlyBundle(b) },
    'night-data': { label: `${network.name} night bundles`, filter: (b) => isNightBundle(b) },
    'social-data': { label: `${network.name} social bundles`, filter: (b) => isSocialBundle(b) }
  };

  const availableTypes = Object.entries(bundleTypeMap).filter(([_, config]) =>
    networkBundles.some(b => config.filter(b))
  );
  const howToBuyGuideBySlug: Record<string, string> = {
    vodacom: '/guides/how-to-buy-data-vodacom/',
    mtn: '/guides/how-to-buy-data-mtn/',
    telkom: '/guides/how-to-buy-data-telkom/',
    'cell-c': '/guides/how-to-buy-data-cell-c/'
  };
  const howToBuyGuideHref = howToBuyGuideBySlug[networkSlug];
  const operatorActionLinks = [
    ...availableTypes
      .filter(([slug]) => ['daily-data', 'monthly-data', 'night-data', 'cheapest-1gb'].includes(slug))
      .map(([slug, config]) => ({
        href: `/network/${networkSlug}/${slug}/`,
        label: config.label,
        description: `${network.name} ${config.label.toLowerCase()} page`
      })),
    ...(howToBuyGuideHref
      ? [{ href: howToBuyGuideHref, label: `How to buy ${network.name} data`, description: `Step-by-step buy flow for ${network.name}.` }]
      : []),
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Keep track of active bundles and expiry.' },
    { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data South Africa', description: 'National comparison for regular users.' },
    { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data South Africa', description: 'National low-volume benchmark.' }
  ];

  const getUssdCode = (matcher: (action: string, category: string) => boolean) =>
    ussdCodes.find((code) => matcher(code.action.toLowerCase(), code.category.toLowerCase()))?.code;
  const balanceCode = getUssdCode((action, category) => action.includes('balance') || category.includes('balance'));
  const buyDataCode = getUssdCode((action, category) => action.includes('buy data') || action.includes('bundles') || category.includes('data'));
  const promoCode = getUssdCode((action) => action.includes('just 4 you') || action.includes('made4u') || action.includes("mo'nice") || action.includes('for you'));
  const rechargeCode = getUssdCode((action, category) => action.includes('recharge') || action.includes('voucher') || category.includes('recharge') || category.includes('airtime'));

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(bundleItemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* NAVIGATION - Aligned with USSD/GuidePage */}
      <nav aria-label="Breadcrumb" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </a>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-300">
              <ChevronRight className="w-4 h-4" />
              <a
                href="/network/"
                onClick={(e) => { e.preventDefault(); onNavigate('network'); }}
                className="hover:text-[#1b6d24] transition-colors text-slate-600"
              >
                Networks
              </a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-400">{network.name}</span>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {network.name} / 2026 Data Prices
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* HERO - Centered, high-impact */}
        <header className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg"
              style={{ backgroundColor: network.color, color: network.textColor }}
            >
              {network.logoLetter}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Clock className="w-3 h-3" />
            Updated {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            {network.name} Data Prices <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">{pageData.intro}</p>
        </header>

        <AdUnit type="aboveFold" />

        {/* SECTION: STRENGTHS & BEST FOR - Card style */}
        <section className="mb-16 grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#1b6d24] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              Quick Verdict
            </div>
            <h2 className="text-2xl font-black tracking-tighter mb-4">{pageData.bestFor}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              {pageData.verdictSummary || `${network.name} can be a strong fit when you choose bundles based on your real usage pattern, not just headline data size.`}
            </p>
          </div>
          <div className="bg-[#f8fafc] border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Key Advantages
            </div>
            <ul className="space-y-3">
              {pageData.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-bold text-sm">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {summaryCards.length > 0 && (
          <section className="mb-16 bg-[#031636] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b6d24]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/10 text-[#a0f399] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Best {network.name} bundles at a glance
              </div>
              <h2 className="text-3xl font-black tracking-tighter mb-8">{network.name} quick answers</h2>

              <div className="grid md:grid-cols-2 gap-5">
                {summaryCards.map((item) => (
                  <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                    <div className="text-[#a0f399] text-[10px] font-black uppercase tracking-widest mb-2 opacity-90">{item.label}</div>
                    <div className="text-lg font-black mb-1 line-clamp-1">{item.bundle.name}</div>
                    <div className="text-2xl font-black text-[#a0f399]">{formatCurrency(item.bundle.price)}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider mt-2">{item.bundle.validity} | {formatValue(item.bundle)}</div>
                  </div>
                ))}
              </div>

              {pageData.personalisedSection && (
                <p className="mt-6 text-slate-300 text-sm leading-relaxed font-medium">
                  Cheapest standard 1GB is usually short-validity. For longer value, monthly bundles typically reduce Rand-per-GB. Always check personalised offer channels before paying full menu pricing.
                </p>
              )}
            </div>
          </section>
        )}

        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <Tag className="w-6 h-6 text-[#1b6d24]" />
            {network.name} prepaid bundle prices ({lastUpdated})
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-5">
            We track publicly listed prepaid bundle pricing, USSD access routes and network-specific offer patterns in South Africa to compare real value, not just headline GB size.
          </p>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[760px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Validity</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cost per GB / Value</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Best For</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Watch Out</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sortedBundles.map(bundle => {
                    const isHighlight = bestCheapGeneralBundle?.id === bundle.id || bestMonthlyValue?.id === bundle.id || bestHeavyUser?.id === bundle.id;
                    return (
                    <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{bundle.name}</span>
                          {isHighlight && <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">Best Value</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">{getNetworkBundleType(bundle)}</td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-black">{formatCurrency(bundle.price)}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">{bundle.validity}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {formatValue(bundle)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{bundle.bestFor || 'General prepaid use'}</td>
                      <td className="px-6 py-4 text-sm font-medium text-amber-700">{getBundleWatchOut(bundle)}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <p className="text-[10px] text-slate-500 font-medium italic">
                Prices and offer availability can change. Personalised deals such as Just 4 You vary by user and are not identical across all SIMs.
              </p>
            </div>
          </div>
        </section>

        <AdUnit type="inContent" />

        {pageData.howToBuySection && (
          <>
            <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-black tracking-tighter mb-6">{pageData.howToBuySection.title}</h2>
              <div className="space-y-4 text-slate-700 leading-relaxed font-medium">
                {pageData.howToBuySection.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {pageData.personalisedSection && (
              <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl font-black tracking-tighter mb-6">{pageData.personalisedSection.title}</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed font-medium">
                  {pageData.personalisedSection.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {pageData.editorialComparisonSection && (
              <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl font-black tracking-tighter mb-6">{pageData.editorialComparisonSection.title}</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed font-medium">
                  {pageData.editorialComparisonSection.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {comparisonRows.length > 0 && (
          <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-black tracking-tighter mb-6">{network.name} vs other networks at a glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Network</th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Best for</th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Usually cheapest?</th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Coverage</th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Good for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row) => (
                    <tr key={row.network}>
                      <td className="px-3 py-3 font-bold">
                        <a href={row.href} className="text-[#1b6d24] hover:underline">{row.network}</a>
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{row.bestFor}</td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{row.usuallyCheapest}</td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{row.coverage}</td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{row.goodFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 3: USSD CODES - Aligned with site system */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-4 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-[#1b6d24]" />
            {network.name} USSD codes
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            These are commonly used {network.name} USSD shortcuts for balance checks, data purchases and account actions.
            Some options can vary by tariff plan or menu flow.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ussdCodes.length > 0 ? (
              ussdCodes.map((ussd, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] flex justify-between items-center group hover:border-[#a0f399] transition-all shadow-sm">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{ussd.action}</div>
                    <div className="text-2xl font-black text-[#031636] font-mono tracking-tighter group-hover:text-[#1b6d24] transition-colors">
                      {ussd.code}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#a0f399]/20 group-hover:text-[#1b6d24] group-hover:border-[#a0f399]/30 transition-all">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-slate-100 p-12 rounded-[2.5rem] text-center shadow-sm">
                <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-medium italic">
                  {network.name} is managed primarily via the official app. No USSD codes are available for this network.
                </p>
              </div>
            )}
          </div>
          {(balanceCode || buyDataCode || promoCode || rechargeCode) && (
            <p className="mt-5 text-sm text-slate-600 font-medium leading-relaxed">
              {balanceCode && `${network.name} balance check code: ${balanceCode}. `}
              {buyDataCode && `${network.name} buy data code: ${buyDataCode}. `}
              {promoCode && `${network.name} personalised deals code: ${promoCode}. `}
              {rechargeCode && `${network.name} recharge code: ${rechargeCode}. `}
            </p>
          )}
          <div className="mt-5 text-xs text-slate-500 font-medium">
            Last checked {lastUpdated}. USSD codes can change by campaign or customer profile.
            {' '}
            <a href="/ussd-codes-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">View full South Africa USSD directory</a>.
          </div>
        </section>

        {pageData.commonMistakes && pageData.commonMistakes.length > 0 && (
          <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-black tracking-tighter mb-6">What {network.name} users usually get wrong</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pageData.commonMistakes.map((mistake, index) => (
                <div key={index} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-700 font-medium leading-relaxed">
                  {mistake}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: SAVINGS TIPS - Aligned with site system */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#1b6d24]" />
            How to Save Money on {network.name}
          </h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <div className="space-y-6">
              {pageData.tips.map((tip, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#031636] text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">
                    {i + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-slate-600 leading-relaxed font-medium">{tip}</p>
                  </div>
                </div>
              ))}
              {pageData.extraSavingsTips && pageData.extraSavingsTips.length > 0 ? (
                <>
                  {pageData.extraSavingsTips.map((tip, index) => (
                    <div key={index} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#031636] text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">
                        {pageData.tips.length + index + 1}
                      </div>
                      <div className="pt-2">
                        <p className="text-slate-600 leading-relaxed font-medium">{tip}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#031636] text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">
                    {pageData.tips.length + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-slate-600 leading-relaxed font-medium">Always compare prices with other networks before buying a large bundle.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {pageData.commonQuestionsSection && (
          <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-black tracking-tighter mb-6">{pageData.commonQuestionsSection.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pageData.commonQuestionsSection.items.map((item, index) => (
                <div key={index} className={`p-5 rounded-2xl border border-slate-100 bg-slate-50 ${index === pageData.commonQuestionsSection!.items.length - 1 ? 'md:col-span-2' : ''}`}>
                  <h3 className="font-black mb-2">{item.question}</h3>
                  <p className="text-sm text-slate-600 font-medium">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <AdUnit type="inContent" />

        {/* SECTION 5: QUICK LINKS - Category drill-downs */}
        {availableTypes.length > 0 && (
          <section className="mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Narrow your search</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableTypes.map(([slug, config]) => (
                <a
                  key={slug}
                  href={`/network/${networkSlug}/${slug}/`}
                  className="px-4 py-4 bg-white border border-slate-100 rounded-2xl text-center hover:border-[#1b6d24] hover:shadow-sm transition-all group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors text-sm">{config.label}</div>
                </a>
              ))}
              {pageData.narrowSearchLinks && pageData.narrowSearchLinks.length > 0 && (
                <>
                  {pageData.narrowSearchLinks.map((link) => (
                    <a key={link.href} href={link.href} className="px-4 py-4 bg-white border border-slate-100 rounded-2xl text-center hover:border-[#1b6d24] hover:shadow-sm transition-all group">
                      <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors text-sm">{link.label}</div>
                    </a>
                  ))}
                </>
              )}
            </div>
          </section>
        )}

        <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-6">{network.name} action hub links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {operatorActionLinks.slice(0, 8).map((link) => (
              <a key={link.href} href={link.href} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#1b6d24] transition-colors">
                <div className="font-bold text-slate-900">{link.label}</div>
                <p className="text-sm text-slate-600 mt-2">{link.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 6: INTERNAL LINKS - Aligned with site system */}
        <section className="mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Explore more guides and tools</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/guides/cheapest-1gb-data-south-africa/" className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] hover:shadow-md transition-all group">
              <Info className="w-6 h-6 text-[#1b6d24] mb-3" />
              <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">Cheapest 1GB data in South Africa</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Comparison Guide</p>
            </a>
            <a href="/guides/best-monthly-data-deals-south-africa/" className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] hover:shadow-md transition-all group">
              <LinkIcon className="w-6 h-6 text-[#1b6d24] mb-3" />
              <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">Best monthly data deals South Africa</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Money Saver</p>
            </a>
            <a href="/ussd-codes-south-africa/" className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] hover:shadow-md transition-all group">
              <Smartphone className="w-6 h-6 text-[#1b6d24] mb-3" />
              <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">South Africa USSD codes</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Quick Codes</p>
            </a>
          </div>
        </section>

        {/* SECTION 7: FAQ - Network Specific FAQ */}
        <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {pageData.faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-50 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-black mb-3 flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium pl-[1.125rem]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p className="font-medium">
            <strong>Independent analysis:</strong> Prices can change quickly and listed bundles are based on currently available data at the time of update. Always confirm final offer details on official operator pages. For our comparison framework, see <a href="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</a> and <a href="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</a>.
          </p>
        </div>

        <div className="mt-8">
          <a
            href={network.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b6d24] text-white rounded-xl font-black hover:bg-[#a0f399] hover:text-[#031636] transition-all"
          >
            Visit Official {network.name} Site
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
