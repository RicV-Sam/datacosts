import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { bundles } from '../data';
import { NavigateFunction } from '../types';

interface Cheapest1GBProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const Cheapest1GB: React.FC<Cheapest1GBProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cheapest 1GB Data in South Africa (2026) | DataCost';
  const metaDescription =
    'Find the cheapest 1GB data bundles in South Africa. Compare Vodacom, MTN, Telkom, and Cell C 1GB prices in one practical guide.';
  const canonicalUrl = 'https://datacost.co.za/guides/cheapest-1gb-data-south-africa/';

  const oneGbBundles = bundles
    .filter((bundle) => bundle.volume === '1GB')
    .sort((a, b) => a.price - b.price);
  const cheapest1Gb = oneGbBundles[0];
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const networks: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C'];
  const networkRows = networks.map((network) => {
    const rows = oneGbBundles.filter((bundle) => bundle.network === network);
    const top = rows[0];

    return {
      network,
      top,
      priceRange:
        rows.length > 1 ? `R${rows[0].price} - R${rows[rows.length - 1].price}` : rows.length === 1 ? `R${rows[0].price}` : 'No listed 1GB bundle',
      validity: top?.validity ?? 'Varies',
      costPerGb: top?.costPerGb ?? null,
    };
  });

  const bestValue = [...networkRows]
    .filter((row) => row.top)
    .sort((a, b) => (a.top?.price ?? Number.POSITIVE_INFINITY) - (b.top?.price ?? Number.POSITIVE_INFINITY))[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest 1GB data in South Africa right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: cheapest1Gb
            ? `${cheapest1Gb.network} currently lists the lowest 1GB price in this dataset at R${cheapest1Gb.price} for ${cheapest1Gb.name}.`
            : 'In this dataset, Telkom and MTN are usually among the lower-priced options for 1GB bundles.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which network gives the best value for 1GB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bestValue
            ? `${bestValue.network} currently shows the strongest 1GB value in this comparison dataset based on listed price and validity.`
            : 'Best value can change by promotion period, so compare current listed offers before buying.',
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
            Cheapest <span className="text-[#1b6d24]">1GB Data</span> in South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            A practical comparison of currently listed 1GB bundles from major South African networks so you can make a quick, informed choice.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapest1Gb
              ? `In this comparison dataset, ${cheapest1Gb.network} currently lists one of the lowest 1GB prices at R${cheapest1Gb.price} for ${cheapest1Gb.name}.`
              : 'In this comparison dataset, Telkom and MTN are usually among the cheapest 1GB starting points.'}{' '}
            Compare validity periods and coverage before buying, because the lowest headline price is not always the best fit for your usage.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Prices and promotions can change. We use currently listed offers in our dataset, and you should confirm final pricing on the operator checkout page.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4">
            <p className="text-slate-700">
              <span className="font-black text-slate-900">What is the cheapest 1GB data right now?</span>{' '}
              {cheapest1Gb
                ? `${cheapest1Gb.network} currently has the lowest listed 1GB price in this dataset at R${cheapest1Gb.price} (${cheapest1Gb.name}).`
                : 'Telkom and MTN are currently among the lower-priced 1GB options in this dataset.'}
            </p>
            <p className="text-slate-700">
              <span className="font-black text-slate-900">Which network gives the best value?</span>{' '}
              {bestValue
                ? `${bestValue.network} currently offers one of the strongest 1GB value profiles here based on listed price and validity.`
                : 'Best value depends on the current promo window, your location, and bundle validity.'}
            </p>
            <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest 1GB by Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkRows.map((row) => (
              <div key={row.network} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.network}</h3>
                <p className="text-sm text-slate-700">
                  {row.top
                    ? `${row.top.name} from about R${row.top.price}, validity: ${row.top.validity}.`
                    : 'No clearly matched 1GB listing in the current dataset.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Comparison Table</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cheapest 1GB</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price Range</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Typical Validity</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {networkRows.map((row) => (
                  <tr key={row.network} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{row.network}</td>
                    <td className="px-6 py-4 text-slate-700">{row.top?.name ?? 'No clear listing'}</td>
                    <td className="px-6 py-4 text-slate-700">{row.priceRange}</td>
                    <td className="px-6 py-4 text-slate-700">{row.validity}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {row.costPerGb !== null ? `~R${row.costPerGb.toFixed(2)}/GB` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Recommendation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
                Current Pick: {bestValue?.network ?? 'Telkom'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {bestValue
                  ? `${bestValue.network} currently ranks well in this dataset for 1GB price and practical validity.`
                  : 'Telkom is often a strong benchmark for affordable 1GB pricing, with MTN also competitive in many periods.'}
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                Treat this as a starting point, not a final verdict. Final value depends on your local coverage quality and any account-specific promotions.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3">Quick Decision Checklist</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>1. Check network coverage where you use data most.</li>
                <li>2. Compare 1GB validity, not price alone.</li>
                <li>3. Verify current promos before final purchase.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest 1GB data in South Africa right now?</h3>
              <p className="text-sm text-slate-600">
                {cheapest1Gb
                  ? `${cheapest1Gb.network} currently lists one of the cheapest 1GB options here at R${cheapest1Gb.price}.`
                  : 'Telkom and MTN are currently among the lowest priced 1GB options in this dataset.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Which network gives the best value for 1GB?</h3>
              <p className="text-sm text-slate-600">
                {bestValue
                  ? `${bestValue.network} currently offers one of the strongest value profiles in this 1GB comparison dataset.`
                  : 'Best value can change quickly, so compare live offers and validity before you buy.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Is the cheapest 1GB bundle always the best option?</h3>
              <p className="text-sm text-slate-600">
                Not always. A slightly higher-priced bundle can still be better if it has longer validity or better real-world coverage for your area.
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
              <h3 className="font-black text-slate-900">Cheapest Data Overall</h3>
              <p className="text-sm text-slate-600 mt-2">Broader comparison across 1GB, monthly, and other bundle types.</p>
            </Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Network Comparison Hub</h3>
              <p className="text-sm text-slate-600 mt-2">Compare Vodacom, MTN, Telkom, Cell C, and Rain in one place.</p>
            </Link>
            <Link to="/network/telkom/1gb/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Telkom 1GB Page</h3>
              <p className="text-sm text-slate-600 mt-2">See Telkom 1GB options and related prepaid pricing.</p>
            </Link>
            <Link to="/ussd-codes-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">USSD Codes Guide</h3>
              <p className="text-sm text-slate-600 mt-2">Check balance and buy bundles quickly from your phone.</p>
            </Link>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};

