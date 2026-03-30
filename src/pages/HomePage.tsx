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

interface HomePageProps {
  onNavigate: (page: 'home' | 'ussd' | 'alerts' | 'guide' | 'network' | 'guides-index' | 'travel-sims', slug?: string) => void;
  onScrollTo: (id: string) => void;
  activeSection: string;
  selectedNetwork: NetworkName | null;
  setSelectedNetwork: (network: NetworkName | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onScrollTo,
  activeSection,
  selectedNetwork,
  setSelectedNetwork
}) => {
  const pageTitle = "DataCost | Compare South Africa's Cheapest Data Bundles";
  const metaDescription = 'Compare mobile data prices in South Africa. Find the cheapest data bundles from MTN, Vodacom, Telkom, Cell C and Rain.';
  const canonicalUrl = 'https://datacost.co.za/';
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/');

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DataCost',
    url: canonicalUrl,
    description: 'Compare mobile data prices in South Africa.',
    publisher: {
      '@type': 'Organization',
      name: 'DataCost.co.za',
      logo: {
        '@type': 'ImageObject',
        url: 'https://datacost.co.za/logo.png'
      }
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "DataCost | Compare South Africa's Cheapest Data Bundles",
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: 'DataCost',
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

  const priorityPages = [
    { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data South Africa', onClick: () => onNavigate('guide', 'cheapest-1gb-data-south-africa') },
    { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data South Africa', onClick: () => onNavigate('guide', 'cheapest-10gb-data-south-africa') },
    { href: '/guides/cheapest-unlimited-data-south-africa/', label: 'Cheapest Unlimited Data South Africa', onClick: () => onNavigate('guide', 'cheapest-unlimited-data-south-africa') },
    { href: '/guides/cheapest-whatsapp-bundles-south-africa/', label: 'Cheapest WhatsApp Bundles', onClick: () => onNavigate('guide', 'cheapest-whatsapp-bundles-south-africa') },
    { href: '/guides/convert-airtime-to-data-south-africa/', label: 'Convert Airtime to Data', onClick: () => onNavigate('guide', 'convert-airtime-to-data-south-africa') },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', onClick: () => onNavigate('guide', 'how-to-check-data-balance') },
    { href: '/network/', label: 'Network Comparison Hub', onClick: () => onNavigate('network') },
    { href: '/network/mtn/', label: 'MTN Network Hub', onClick: () => onNavigate('network', 'mtn') },
    { href: '/network/vodacom/', label: 'Vodacom Network Hub', onClick: () => onNavigate('network', 'vodacom') },
    { href: '/network/telkom/', label: 'Telkom Network Hub', onClick: () => onNavigate('network', 'telkom') },
    { href: '/network/cell-c/', label: 'Cell C Network Hub', onClick: () => onNavigate('network', 'cell-c') },
    { href: '/network/rain/', label: 'Rain Network Hub', onClick: () => onNavigate('network', 'rain') },
    { href: '/travel-sims-south-africa/', label: 'Travel SIMs South Africa', onClick: () => onNavigate('travel-sims') }
  ];

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-8 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="/network/"
              onClick={(e) => { e.preventDefault(); onNavigate('network'); }}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-[#031636] text-white font-black text-sm text-center hover:bg-[#1b6d24] transition-colors"
            >
              Compare All Networks
            </a>
            <a
              href="/guides/cheapest-1gb-data-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigate('guide', 'cheapest-1gb-data-south-africa'); }}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-white border border-slate-200 text-[#031636] font-black text-sm text-center hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Find the Cheapest 1GB
            </a>
            <a
              href="/guides/best-data-deals-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigate('guide', 'best-data-deals-south-africa'); }}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-white border border-slate-200 text-[#031636] font-black text-sm text-center hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              View Best Data Deals
            </a>
            <a
              href="/ussd-codes-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigate('ussd'); }}
              className="min-h-[44px] rounded-2xl px-4 py-3 bg-white border border-slate-200 text-[#031636] font-black text-sm text-center hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Check USSD Codes
            </a>
          </div>
        </section>

        <AdUnit type="aboveFold" />

        <Hero onScrollTo={onScrollTo} />

        <section className="mt-10 mb-8 bg-white/90 border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            Compare Data Prices in South Africa
          </h2>
          <p className="text-slate-700 leading-relaxed font-medium mb-4">
            DataCost helps South Africans compare mobile data prices across major networks in one place. We track currently listed prepaid data bundles, monthly data deals, and high-usage options so you can quickly find the cheapest data in South Africa for your budget. Instead of guessing between promotions, you can compare mobile data prices side by side and see practical value based on price, validity, and cost per GB.
          </p>
          <p className="text-slate-700 leading-relaxed font-medium">
            We cover MTN, Vodacom, Telkom, Cell C, and Rain with independent editorial context and updated South African telecom pricing snapshots. Whether you need the best value data offers for everyday browsing or larger plans for streaming and work, this page points you to the most relevant network pages, guides, and tools before you buy.
          </p>
        </section>

        <section className="mb-12 bg-[#031636] text-white rounded-[2rem] p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            Which network has the cheapest data in South Africa?
          </h2>
          <p className="text-slate-200 leading-relaxed font-medium">
            Telkom often leads on low cost per GB for standard prepaid bundles, while MTN frequently offers strong promotional value on selected plans. Rain can be a practical choice for users focused on unlimited usage, and Vodacom is often preferred where premium coverage and speed matter most. The best choice still depends on your location, usage pattern, and current offer availability.
          </p>
        </section>

        <section className="mb-12 bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">Never Miss a Better Data Deal</h2>
          <p className="text-slate-700 leading-relaxed font-medium mb-4">
            Get free alerts for cheaper data deals, airtime specials, verified competitions, and useful mobile updates in South Africa.
          </p>
          <a
            href="/alerts/"
            onClick={(e) => { e.preventDefault(); onNavigate('alerts'); }}
            className="inline-flex min-h-[44px] items-center rounded-2xl bg-[#1b6d24] px-5 text-sm font-black text-white hover:bg-[#14521c] transition-colors"
          >
            Get Alerts
          </a>
        </section>

        <section className="mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            Quick Comparison Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="/network/mtn/" onClick={(e) => { e.preventDefault(); onNavigate('network', 'mtn'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Compare MTN data prices</a>
            <a href="/network/vodacom/" onClick={(e) => { e.preventDefault(); onNavigate('network', 'vodacom'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Compare Vodacom data bundles</a>
            <a href="/network/telkom/" onClick={(e) => { e.preventDefault(); onNavigate('network', 'telkom'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Telkom prepaid data deals</a>
            <a href="/network/cell-c/" onClick={(e) => { e.preventDefault(); onNavigate('network', 'cell-c'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Cell C monthly data prices</a>
            <a href="/network/rain/" onClick={(e) => { e.preventDefault(); onNavigate('network', 'rain'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Rain unlimited data plans</a>
            <a href="/ussd-codes-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('ussd'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">South Africa USSD codes</a>
            <a href="/guides/cheapest-1gb-data-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('guide', 'cheapest-1gb-data-south-africa'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Cheapest 1GB data in South Africa</a>
            <a href="/guides/best-prepaid-data-deals-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('guide', 'best-prepaid-data-deals-south-africa'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Best prepaid data deals South Africa</a>
            <a href="/travel-sims-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('travel-sims'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Travel SIMs and eSIMs for South Africa</a>
            <a href="/alerts/" onClick={(e) => { e.preventDefault(); onNavigate('alerts'); }} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors">Get telecom alerts</a>
          </div>
        </section>

        <section className="mt-12 mb-20">
          <h2 className="text-2xl font-black mb-6">
            Popular Data Guides South Africa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {guides.slice(0, 4).map((guide) => (
              <a
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                onClick={(e) => { e.preventDefault(); onNavigate('guide', guide.slug); }}
                className="text-left p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md"
              >
                <h3 className="font-bold mb-2">{guide.title}</h3>
                <p className="text-sm text-slate-500">
                  {guide.metaDescription}
                </p>
              </a>
            ))}
            <a
              href="/travel-sims-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigate('travel-sims'); }}
              className="text-left p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-bold mb-2">Best Travel SIMs & eSIMs for South Africa</h3>
              <p className="text-sm text-slate-500">
                A complete guide for tourists: airport SIM options, eSIM setup, and best-value picks.
              </p>
            </a>
          </div>
        </section>

        <section className="mb-20 bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-3">Priority SEO Pages</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            Start here for our most important comparison, network hub, and support pages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {priorityPages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                onClick={(e) => {
                  e.preventDefault();
                  page.onClick();
                }}
                className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
              >
                {page.label}
              </a>
            ))}
          </div>
        </section>

        <NetworkCards
          onViewDeals={(network) => {
            const page = Object.values(networkPages).find((p) => p.networkName === network);
            if (page) {
              onNavigate('network', page.slug);
            }
          }}
        />

        <AdUnit type="inContent" />

        <DataCalculator />

        <Scorecard />

        <USSDCodeFinder onViewAll={() => onNavigate('ussd')} />

        <Verdict />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection={activeSection} />
      <AdUnit type="stickyMobile" />

      <NetworkModal network={selectedNetwork} onClose={() => setSelectedNetwork(null)} />
    </div>
  );
};
