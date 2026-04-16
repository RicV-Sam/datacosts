import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataCalculator } from '../components/DataCalculator';
import { USSDCodeFinder } from '../components/USSDCodeFinder';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { NetworkCards } from '../components/NetworkCards';
import { Scorecard } from '../components/Scorecard';
import { Verdict } from '../components/Verdict';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NetworkModal } from '../components/NetworkModal';
import { AdUnit } from '../components/AdUnit';
import { guides } from '../data/guides';
import { networkPages } from '../data/networks';
import { bundles } from '../data';
import { NetworkName } from '../types';
import { buildBundleItemListSchema, getNetworkPageUrl } from '../utils/structuredData';
import { getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_BRAND_NAME, SITE_LOGO_URL, SITE_PRODUCT_NAME, SITE_URL } from '../seo/siteConstants';

interface HomePageProps {
  onNavigate: (page: 'home' | 'ussd' | 'alerts' | 'guide' | 'network' | 'guides-index' | 'travel-sims' | 'fix-problem', slug?: string) => void;
  onScrollTo: (id: string) => void;
  activeSection: string;
  selectedNetwork: NetworkName | null;
  setSelectedNetwork: (network: NetworkName | null) => void;
}

const fixProblemLinks = [
  {
    href: '/guides/why-is-my-airtime-disappearing-south-africa/',
    label: 'Why is my airtime disappearing?',
    action: () => ({ page: 'guide' as const, slug: 'why-is-my-airtime-disappearing-south-africa' })
  },
  {
    href: '/guides/why-does-my-data-finish-so-fast-south-africa/',
    label: 'Why does my data finish so fast?',
    action: () => ({ page: 'guide' as const, slug: 'why-does-my-data-finish-so-fast-south-africa' })
  },
  {
    href: '/guides/how-to-stop-wasp-vas-charges-south-africa/',
    label: 'How to stop WASP / VAS charges',
    action: () => ({ page: 'guide' as const, slug: 'how-to-stop-wasp-vas-charges-south-africa' })
  },
  {
    href: '/guides/stop-wasp-subscriptions-south-africa/',
    label: 'Stop WASP subscriptions',
    action: () => ({ page: 'guide' as const, slug: 'stop-wasp-subscriptions-south-africa' })
  },
  {
    href: '/guides/how-to-check-data-balance/',
    label: 'How to check data balance',
    action: () => ({ page: 'guide' as const, slug: 'how-to-check-data-balance' })
  },
  {
    href: '/ussd-codes-south-africa/',
    label: 'USSD codes hub',
    action: () => ({ page: 'ussd' as const, slug: undefined })
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onScrollTo,
  activeSection,
  selectedNetwork,
  setSelectedNetwork
}) => {
  const pageTitle = "Cheapest Data Bundles South Africa (2026)";
  const metaDescription = 'Compare mobile data prices in South Africa. Find the cheapest data bundles from MTN, Vodacom, Telkom, Cell C and Rain.';
  const canonicalUrl = SITE_URL;
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/');

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_PRODUCT_NAME,
    url: canonicalUrl,
    description: 'Compare mobile data prices in South Africa.',
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL
      }
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "Cheapest Data Bundles South Africa (2026)",
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: canonicalUrl
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl }
    ]
  };

  const featuredBundles = Object.values(networkPages).flatMap((page) =>
    bundles
      .filter((bundle) => bundle.network === page.networkName)
      .sort((a, b) => a.price - b.price)
      .slice(0, 2)
  );

  const homeBundleItemListSchema = buildBundleItemListSchema(
    'Featured Mobile Data Bundle Deals in South Africa',
    canonicalUrl,
    featuredBundles,
    (bundle) => getNetworkPageUrl(bundle.network)
  );

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(homeBundleItemListSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection={activeSection} />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <Hero onScrollTo={onScrollTo} />

        <section className="mb-8 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.15em] text-slate-500 mb-3">Quick Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => onScrollTo('calculator')}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-[#031636] text-white font-black text-sm text-left hover:bg-[#1b6d24] transition-colors"
            >
              Use Data Calculator
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-white border border-slate-200 text-[#031636] font-black text-sm text-left hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Find USSD Codes
            </button>
            <button
              onClick={() => onNavigate('network')}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-white border border-slate-200 text-[#031636] font-black text-sm text-left hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Compare Networks
            </button>
            <button
              onClick={() => onNavigate('fix-problem')}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-red-50 border border-red-100 text-red-700 font-black text-sm text-left hover:bg-red-100 transition-colors"
            >
              Fix a Problem
            </button>
          </div>
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-10">
          <DataCalculator />
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm" id="fix-problem">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Fix a Problem</h2>
              <p className="text-slate-600 font-medium mt-2">Troubleshooting shortcuts for the most common telecom issues.</p>
            </div>
            <button
              onClick={() => onNavigate('fix-problem')}
              className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#031636] px-4 text-sm font-black text-white hover:bg-[#1b6d24] transition-colors"
            >
              Open Problem Solver
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {fixProblemLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const action = link.action();
                  onNavigate(action.page, action.slug);
                }}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Fix Airtime & Data Issues</h2>
            <p className="text-slate-600 font-medium mt-2">
              Use these high-intent fix guides when airtime or data drops unexpectedly on South African networks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a
              href="/guides/why-is-my-data-disappearing-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigate('guide', 'why-is-my-data-disappearing-south-africa'); }}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Why your data disappears on Vodacom, MTN, Telkom, and Cell C
            </a>
            <a
              href="/guides/how-to-stop-airtime-being-used-automatically/"
              onClick={(e) => { e.preventDefault(); onNavigate('guide', 'how-to-stop-airtime-being-used-automatically'); }}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Stop airtime being used automatically in South Africa
            </a>
            <a
              href="/guides/how-to-stop-wasp-services-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigate('guide', 'how-to-stop-wasp-services-south-africa'); }}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              How to stop WASP services and premium deductions
            </a>
          </div>
        </section>

        <section className="mb-12">
          <USSDCodeFinder onViewAll={() => onNavigate('ussd')} />
        </section>

        <section className="mb-16" id="deals">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Compare Data Prices by Network</h2>
          <p className="text-slate-600 font-medium mb-6">See live network cards and jump directly to each operator hub.</p>
          <NetworkCards
            onViewDeals={(network) => {
              const page = Object.values(networkPages).find((p) => p.networkName === network);
              if (page) {
                onNavigate('network', page.slug);
              }
            }}
          />
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="text-2xl font-black">Popular Guides</h2>
            <button
              onClick={() => onNavigate('guides-index')}
              className="text-sm font-black text-[#1b6d24] hover:underline"
            >
              View all guides
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {guides.slice(0, 6).map((guide) => (
              <a
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                onClick={(e) => { e.preventDefault(); onNavigate('guide', guide.slug); }}
                className="text-left p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#a0f399]/40 transition-all"
              >
                <h3 className="font-bold mb-2">{guide.title}</h3>
                <p className="text-sm text-slate-500">{guide.metaDescription}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-3">Get Alerts for Better Deals</h2>
          <p className="text-slate-700 leading-relaxed font-medium mb-4">
            Get free alerts for cheaper data deals, airtime specials, verified competitions, and useful mobile updates.
          </p>
          <button
            onClick={() => onNavigate('alerts')}
            className="inline-flex min-h-[44px] items-center rounded-2xl bg-[#1b6d24] px-5 text-sm font-black text-white hover:bg-[#14521c] transition-colors"
          >
            Get Alerts
          </button>
        </section>

        <section className="mb-12 bg-white/90 border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-3">Why People Use DataCost</h2>
          <p className="text-slate-700 leading-relaxed font-medium mb-3">
            DataCost helps South Africans compare data prices, run usage calculations, and solve common mobile issues from one independent utility platform.
          </p>
          <p className="text-slate-700 leading-relaxed font-medium">
            We focus on practical next steps: compare prices, check USSD codes, and fix airtime or subscription problems quickly.
          </p>
        </section>

        <AdUnit type="inContent" />

        <Scorecard />

        <Verdict />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection={activeSection} />
      <AdUnit type="stickyMobile" />

      <NetworkModal network={selectedNetwork} onClose={() => setSelectedNetwork(null)} />
    </div>
  );
};
