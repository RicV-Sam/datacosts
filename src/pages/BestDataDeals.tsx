import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { bundles } from '../data';
import { NavigateFunction } from '../types';
import { networkPages } from '../data/networks';

interface BestDataDealsProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const BestDataDeals: React.FC<BestDataDealsProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Best Data Deals in South Africa (2026) | DataCost';
  const metaDescription =
    'Compare the best mobile data deals in South Africa this month across Vodacom, MTN, Telkom, Cell C, and Rain.';
  const canonicalUrl = 'https://datacost.co.za/guides/best-data-deals-south-africa/';
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const sortedByValue = [...bundles].sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));
  const topDeals = sortedByValue.slice(0, 6);
  const cheapestDeal = sortedByValue[0];

  const networkOrder: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];
  const networkBreakdown = networkOrder.map((networkName) => {
    const rows = bundles.filter((bundle) => bundle.network === networkName);
    const cheapest = [...rows].sort((a, b) => a.price - b.price)[0];
    const bestValue = [...rows].sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0))[0];
    const networkSlug = Object.values(networkPages).find((page) => page.networkName === networkName)?.slug || '';
    return { networkName, cheapest, bestValue, networkSlug };
  });

  const bestValueDeal = sortedByValue.find((bundle) => bundle.costPerGb > 0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the best data deals in South Africa right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bestValueDeal
            ? `${bestValueDeal.network} currently lists one of the strongest deals in this dataset: ${bestValueDeal.name} at about R${bestValueDeal.costPerGb.toFixed(2)} per GB.`
            : 'The best deal changes by month, so compare the latest listed bundles by cost per GB and validity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between cheapest and best value data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cheapest usually means the lowest upfront price. Best value usually means lower cost per GB and better validity for real monthly use.',
        },
      },
    ],
  };

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
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Best <span className="text-[#1b6d24]">Data Deals</span> in South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            A monthly snapshot of currently listed bundle deals across major South African networks, sorted for practical value.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {bestValueDeal
              ? `In this current dataset, ${bestValueDeal.network}'s ${bestValueDeal.name} is one of the strongest value deals at around R${bestValueDeal.costPerGb.toFixed(2)}/GB.`
              : 'The best deal depends on current promotions, bundle validity, and your usage pattern.'}{' '}
            Start with value per GB, then confirm validity and local coverage before buying.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Pricing and promotions can change quickly. We use currently listed bundles, but final offer details should be verified on the operator page.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Top Deals This Month</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Bundle</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Validity</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topDeals.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-6 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.validity}</td>
                    <td className="px-6 py-4 text-slate-700">~R{bundle.costPerGb.toFixed(2)}/GB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">Last updated: {lastUpdated}</p>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Network Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkBreakdown.map((row) => (
              <div key={row.networkName} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.networkName}</h3>
                <p className="text-sm text-slate-700">
                  Cheapest listed: {row.cheapest ? `${row.cheapest.name} (R${row.cheapest.price})` : 'N/A'}.
                </p>
                <p className="text-sm text-slate-700 mt-1">
                  Best value listed: {row.bestValue ? `${row.bestValue.name} (~R${row.bestValue.costPerGb.toFixed(2)}/GB)` : 'N/A'}.
                </p>
                {row.networkSlug ? (
                  <Link to={`/network/${row.networkSlug}/`} className="text-sm font-bold text-[#1b6d24] hover:underline mt-3 inline-block">
                    View {row.networkName} page
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest vs Best Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-black mb-4">Cheapest Deal</h3>
              <p className="text-slate-600 leading-relaxed">
                {cheapestDeal
                  ? `${cheapestDeal.network} currently has one of the lowest headline prices with ${cheapestDeal.name} at R${cheapestDeal.price}.`
                  : 'Cheapest deal data is currently limited in this dataset.'}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
                Best Value Deal
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {bestValueDeal
                  ? `${bestValueDeal.network} currently leads on value in this comparison with ${bestValueDeal.name} at about R${bestValueDeal.costPerGb.toFixed(2)}/GB.`
                  : 'Best value depends on current validity and promotion conditions.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            Internal Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/guides/cheapest-data-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Cheapest Data Guide</h3>
              <p className="text-sm text-slate-600 mt-2">Compare overall price-per-GB across major bundles.</p>
            </Link>
            <Link to="/guides/cheapest-1gb-data-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Cheapest 1GB Guide</h3>
              <p className="text-sm text-slate-600 mt-2">Find the best low-volume prepaid starting point.</p>
            </Link>
            <Link to="/guides/vodacom-vs-mtn-data-prices/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Vodacom vs MTN</h3>
              <p className="text-sm text-slate-600 mt-2">See a focused head-to-head value comparison.</p>
            </Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Network Hub</h3>
              <p className="text-sm text-slate-600 mt-2">Browse network detail pages and bundle-type pages.</p>
            </Link>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What are the best data deals in South Africa right now?</h3>
              <p className="text-sm text-slate-600">
                {bestValueDeal
                  ? `${bestValueDeal.network} currently lists one of the strongest value offers in this dataset at about R${bestValueDeal.costPerGb.toFixed(2)}/GB.`
                  : 'The best deal changes monthly, so compare current bundle listings and validity periods.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What is the difference between cheapest and best value data?</h3>
              <p className="text-sm text-slate-600">
                Cheapest is the lowest upfront rand amount. Best value usually gives a lower cost per GB and better validity for normal usage.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">How often do these deals change?</h3>
              <p className="text-sm text-slate-600">
                Deals can change often with promotions and account targeting. Use this page as a guide and verify final pricing before checkout.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};

