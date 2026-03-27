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

interface HomePageProps {
  onNavigate: (page: 'home' | 'ussd' | 'guide' | 'network' | 'guides-index' | 'travel-sims', slug?: string) => void;
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

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DataCost",
    "url": canonicalUrl,
    "description": "Compare mobile data prices in South Africa.",
    "publisher": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "logo": {
        "@type": "ImageObject",
        "url": "https://datacost.co.za/logo.png"
      }
    }
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
          {JSON.stringify(homeSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(homeBundleItemListSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection={activeSection} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AdUnit type="aboveFold" />

        <Hero onScrollTo={onScrollTo} />

        {/* 🔥 GUIDES */}
        <section className="mt-12 mb-20">
          <h2 className="text-2xl font-black mb-6">
            🔥 Popular Data Guides South Africa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {guides.slice(0, 4).map((guide) => (
              <button
                key={guide.slug}
                onClick={() => onNavigate('guide', guide.slug)}
                className="text-left p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md"
              >
                <h3 className="font-bold mb-2">{guide.title}</h3>
                <p className="text-sm text-slate-500">
                  {guide.metaDescription}
                </p>
              </button>
            ))}
            <button
              onClick={() => onNavigate('travel-sims')}
              className="text-left p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-bold mb-2">Best Travel SIMs & eSIMs for South Africa</h3>
              <p className="text-sm text-slate-500">
                A complete guide for tourists: airport SIM options, eSIM setup, and best-value picks.
              </p>
            </button>
          </div>
        </section>

        {/* 🔥 NETWORKS FIXED */}
        <NetworkCards
          onViewDeals={(network) => {
            const page = Object.values(networkPages).find(p => p.networkName === network);
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
