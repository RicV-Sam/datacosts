import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle2, ExternalLink, Info, ShieldCheck, Tag } from 'lucide-react';
import { bundles } from '../data';
import { AdUnit } from '../components/AdUnit';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction, Bundle, NetworkName } from '../types';
import { getComparisonGuideBySlug } from '../data/comparisonGuides';
import { buildBundleItemListSchema } from '../utils/structuredData';
import { networkPages } from '../data/networks';

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

const CORE_NETWORKS: NetworkName[] = ['Vodacom', 'MTN', 'Telkom', 'Cell C'];

function volumeToGb(volume: string): number {
  const normalized = volume.trim().toLowerCase();
  if (normalized.includes('unlimited')) return Number.POSITIVE_INFINITY;

  const mbMatch = normalized.match(/(\d+(?:\.\d+)?)\s*mb/);
  if (mbMatch) return Number(mbMatch[1]) / 1000;

  const gbMatch = normalized.match(/(\d+(?:\.\d+)?)\s*gb/);
  if (gbMatch) return Number(gbMatch[1]);

  return 0;
}

function isNightBundle(bundle: Bundle): boolean {
  return bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== '');
}

function isMonthlyBundle(bundle: Bundle): boolean {
  const validity = bundle.validity.toLowerCase();
  return bundle.type === 'Monthly' || validity.includes('30 day') || validity.includes('month');
}

function isSocialBundle(bundle: Bundle): boolean {
  return bundle.type === 'Social' || bundle.name.toLowerCase().includes('whatsapp') || bundle.name.toLowerCase().includes('social');
}

function filterBundlesByMode(mode: string): Bundle[] {
  const base = bundles.filter((bundle) => CORE_NETWORKS.includes(bundle.network));

  if (mode === 'cheapest-1gb') {
    return base.filter((bundle) => bundle.volume === '1GB' && !isNightBundle(bundle) && !isSocialBundle(bundle));
  }

  if (mode === 'cheapest-10gb') {
    return base.filter((bundle) => bundle.volume === '10GB' && !isNightBundle(bundle) && !isSocialBundle(bundle));
  }

  if (mode === 'best-monthly') {
    return base.filter((bundle) => isMonthlyBundle(bundle) && !isNightBundle(bundle) && !isSocialBundle(bundle));
  }

  if (mode === 'best-prepaid') {
    return base.filter((bundle) => !isNightBundle(bundle) && !isSocialBundle(bundle) && bundle.type !== 'Contract');
  }

  if (mode === 'cheapest-whatsapp') {
    return base.filter((bundle) => isSocialBundle(bundle));
  }

  if (mode === 'cheap-night') {
    return base.filter((bundle) => isNightBundle(bundle));
  }

  return base;
}

function pickBestRowBundleForMode(rows: Bundle[], mode: string): Bundle | null {
  if (!rows.length) return null;

  if (mode === 'best-monthly' || mode === 'best-prepaid') {
    const byValue = rows.filter((bundle) => bundle.costPerGb > 0).sort((a, b) => a.costPerGb - b.costPerGb)[0];
    return byValue || rows.sort((a, b) => a.price - b.price)[0];
  }

  return rows.sort((a, b) => a.price - b.price)[0];
}

function getBundleType(bundle: Bundle): string {
  if (isSocialBundle(bundle)) return 'Social';
  if (isNightBundle(bundle)) return 'Night';
  if (isMonthlyBundle(bundle) && bundle.validity.toLowerCase().includes('recurring')) return 'Monthly Recurring';
  if (isMonthlyBundle(bundle)) return 'Monthly';
  return bundle.type;
}

function getBundleWatchOut(bundle: Bundle): string {
  if (bundle.watchOut) return bundle.watchOut;
  if (bundle.note) return bundle.note;
  if (isSocialBundle(bundle)) return 'Social-only access';
  if (isNightBundle(bundle)) return 'Night-only usage window';
  if (bundle.validity.toLowerCase().includes('1 day')) return 'Very short validity';
  return 'Check offer terms';
}

function getWinners(mode: string, rows: ComparisonRow[], coverageFirstNetwork: NetworkName = 'Vodacom'): WinnerCard[] {
  const validRows = rows.filter((row) => row.bundle).map((row) => row.bundle as Bundle);
  if (!validRows.length) {
    return [];
  }

  const cheapest = [...validRows].sort((a, b) => a.price - b.price)[0];
  const bestValue = [...validRows].filter((bundle) => bundle.costPerGb > 0).sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const heavyUse = [...validRows].sort((a, b) => volumeToGb(b.volume) - volumeToGb(a.volume))[0];
  const coverageFirst = validRows.find((bundle) => bundle.network === coverageFirstNetwork) || validRows[0];

  if (mode === 'cheapest-whatsapp') {
    return [
      { label: 'Cheapest social bundle', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: 'Best social value', text: bestValue ? `${bestValue.network}: ${bestValue.name} at about R${bestValue.costPerGb.toFixed(2)}/GB.` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Coverage-first social fallback', text: `${coverageFirst.network}: better when you want stronger overall network consistency with social add-ons.` }
    ];
  }

  if (mode === 'cheap-night') {
    return [
      { label: 'Cheapest night option', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: 'Best night value', text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Best for heavy overnight use', text: `${heavyUse.network}: ${heavyUse.name} (${heavyUse.volume}).` }
    ];
  }

  if (mode === 'best-prepaid') {
    return [
      { label: 'Best prepaid value', text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
      { label: 'Cheapest upfront prepaid', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
      { label: 'Coverage-first pick', text: `${coverageFirst.network}: usually preferred when stability is more important than absolute lowest price.` }
    ];
  }

  return [
    { label: 'Cheapest upfront option', text: `${cheapest.network}: ${cheapest.name} at R${cheapest.price}.` },
    { label: 'Best value option', text: bestValue ? `${bestValue.network}: ${bestValue.name} (~R${bestValue.costPerGb.toFixed(2)}/GB).` : `${cheapest.network}: ${cheapest.name}.` },
    { label: 'Best for heavier users', text: `${heavyUse.network}: ${heavyUse.name} (${heavyUse.volume}).` }
  ];
}

export const ComparisonGuidePage: React.FC<ComparisonGuidePageProps> = ({ guideSlug, onNavigate, onScrollTo }) => {
  const location = useLocation();
  const definition = getComparisonGuideBySlug(guideSlug);

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

  const winners = getWinners(definition.mode, rows, definition.coverageFirstNetwork);
  const listedRows = rows.filter((row) => row.bundle).map((row) => row.bundle as Bundle);
  const now = new Date();
  const lastUpdated = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const canonicalUrl = `https://datacost.co.za${definition.canonicalPath}`;
  const isAliasPath = location.pathname !== definition.canonicalPath;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: definition.h1,
    description: definition.metaDescription,
    url: canonicalUrl,
    dateModified: now.toISOString(),
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://datacost.co.za/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://datacost.co.za/guides/' },
      { '@type': 'ListItem', position: 3, name: definition.h1, item: canonicalUrl }
    ]
  };

  const itemListSchema = buildBundleItemListSchema(
    definition.tableTitle,
    canonicalUrl,
    listedRows,
    (bundle) => {
      const networkSlug = Object.values(networkPages).find((page) => page.networkName === bundle.network)?.slug;
      if (!networkSlug) return canonicalUrl;

      if (definition.mode === 'cheapest-1gb') return `https://datacost.co.za/network/${networkSlug}/cheapest-1gb/`;
      if (definition.mode === 'cheapest-10gb') return `https://datacost.co.za/network/${networkSlug}/monthly-data/`;
      if (definition.mode === 'best-monthly') return `https://datacost.co.za/network/${networkSlug}/monthly-data/`;
      if (definition.mode === 'best-prepaid') return `https://datacost.co.za/network/${networkSlug}/`;
      if (definition.mode === 'cheapest-whatsapp') return `https://datacost.co.za/network/${networkSlug}/social-data/`;
      if (definition.mode === 'cheap-night') return `https://datacost.co.za/network/${networkSlug}/night-data/`;
      return canonicalUrl;
    }
  );

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{definition.title}</title>
        <meta name="description" content={definition.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {isAliasPath && <meta name="robots" content="noindex,follow" />}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={definition.title} />
        <meta property="og:description" content={definition.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={definition.title} />
        <meta name="twitter:description" content={definition.metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
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
        <AdUnit type="aboveFold" />

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Tag className="w-3 h-3" />
            South Africa Telecom Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">{definition.h1}</h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">{definition.intro}</p>
        </header>

        <section className="mb-10 bg-[#031636] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/10 text-[#a0f399] rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border border-[#a0f399]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Quick Verdict
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">{definition.quickHeading}</h2>
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
            <p className="text-slate-200">No clear listings are currently available for this comparison in the active dataset.</p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black tracking-tighter mb-5">{definition.tableTitle}</h2>
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
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? row.bundle.name : 'No clear listed match for this intent'}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">{row.bundle ? getBundleType(row.bundle) : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? `R${row.bundle.price}` : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? row.bundle.validity : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? `R${row.bundle.costPerGb.toFixed(2)}/GB` : 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.bundle ? row.bundle.bestFor || 'General prepaid use' : 'No listed candidate'}</td>
                    <td className="px-6 py-4 text-amber-700">{row.bundle ? getBundleWatchOut(row.bundle) : 'Check operator menu for current offer'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
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
            {definition.links.map((link) => (
              <a key={link.href} href={link.href} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#1b6d24] transition-colors">
                <div className="font-black text-slate-900">{link.label}</div>
                <p className="text-sm text-slate-600 mt-2">{link.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
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
                <span>{networkName} Official Context</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
