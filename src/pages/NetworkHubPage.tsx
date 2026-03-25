import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { NetworkCard } from '../components/NetworkCards';
import { Scorecard } from '../components/Scorecard';
import { NetworkName, NavigateFunction } from '../types';
import { networkPages } from '../data/networks';
import { TowerControl, BookOpen, Smartphone, Info } from 'lucide-react';

interface NetworkHubPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const NetworkHubPage: React.FC<NetworkHubPageProps> = ({ onNavigate, onScrollTo }) => {
  const canonicalUrl = "https://datacost.co.za/network/";
  const pageTitle = "Compare Mobile Networks in South Africa | Vodacom, MTN, Cell C, Telkom & Rain";
  const metaDescription = "Compare South Africa’s mobile networks including Vodacom, MTN, Cell C, Telkom and Rain. See network strengths, data value, coverage, speeds and related guides.";

  const coreNetworks: NetworkName[] = ['Vodacom', 'MTN', 'Cell C', 'Telkom'];
  const secondaryNetworks: NetworkName[] = ['Rain'];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Compare Mobile Networks in South Africa (2026)",
    "description": metaDescription,
    "image": "https://datacost.co.za/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "url": "https://datacost.co.za"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "logo": {
        "@type": "ImageObject",
        "url": "https://datacost.co.za/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const handleViewDeals = (network: NetworkName) => {
    const page = Object.values(networkPages).find(p => p.networkName === network);
    if (page) {
      onNavigate('network', page.slug);
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="networks" />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AdUnit type="aboveFold" />

        {/* HERO SECTION */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a0f399]/20 text-[#1b6d24] text-sm font-bold mb-6">
            <TowerControl className="w-4 h-4" />
            <span>Network Directory</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Compare Mobile <span className="text-[#1b6d24]">Networks</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Finding the best mobile network in South Africa depends on your budget, location, and data needs.
            We compare the "Big Four" operators and specialized providers like Rain to help you make an informed choice.
          </p>
        </div>

        {/* CORE NETWORKS */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-2">
            Major Mobile Operators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreNetworks.map(network => (
              <NetworkCard
                key={network}
                network={network}
                onViewDeals={handleViewDeals}
              />
            ))}
          </div>
        </section>

        {/* SECONDARY NETWORKS (Rain) */}
        <section className="mb-24">
          <h2 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-2">
            Specialized & Data-Only Networks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryNetworks.map(network => (
              <NetworkCard
                key={network}
                network={network}
                onViewDeals={handleViewDeals}
              />
            ))}
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* COMPARISON TABLE */}
        <div className="mb-24">
            <Scorecard />
        </div>

        {/* RELATED RESOURCES */}
        <section className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center">Explore More Guides & Tools</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('guides-index')}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-[#1b6d24] hover:shadow-xl transition-all group"
            >
              <BookOpen className="w-8 h-8 text-[#1b6d24] mb-4" />
              <div className="text-xl font-black text-slate-900 group-hover:text-[#1b6d24] transition-colors">Data Guides</div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Expert tips on how to save money and find the best data deals.</p>
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-[#1b6d24] hover:shadow-xl transition-all group"
            >
              <Smartphone className="w-8 h-8 text-[#1b6d24] mb-4" />
              <div className="text-xl font-black text-slate-900 group-hover:text-[#1b6d24] transition-colors">USSD Codes</div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Complete directory of USSD codes for all SA networks.</p>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-[#1b6d24] hover:shadow-xl transition-all group"
            >
              <Info className="w-8 h-8 text-[#1b6d24] mb-4" />
              <div className="text-xl font-black text-slate-900 group-hover:text-[#1b6d24] transition-colors">Data Calculator</div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Estimate your monthly usage and find the perfect bundle.</p>
            </button>
          </div>
        </section>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6">Choosing the Best Network</h2>
          <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
            <p className="mb-4">
                Selecting the best mobile network in South Africa depends on three main factors:
                <strong> Coverage</strong>, <strong>Speed</strong>, and <strong>Price</strong>.
                While Vodacom and MTN offer the most extensive network reach (especially in rural areas),
                Telkom and Cell C often provide better value for money through aggressive prepaid pricing.
            </p>
            <p>
                If you are looking for home internet or high-volume data, Rain's unlimited 4G and 5G plans are worth considering,
                provided you are within their coverage zones. We recommend checking the official coverage maps of each operator
                before committing to a long-term contract or a large data bundle.
            </p>
          </div>
        </div>

      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="networks" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
