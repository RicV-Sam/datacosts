import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, BarChart3, CalendarClock } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { bundles } from '../data';
import { NavigateFunction } from '../types';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface CheapestMonthlyDataProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const CheapestMonthlyData: React.FC<CheapestMonthlyDataProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Monthly Data Deals South Africa (2026)';
  const metaDescription =
    'Find the cheapest monthly data bundles in South Africa. Compare current 30-day prices, value per GB, and best monthly options by use case.';
  const canonicalUrl = toCanonicalUrl('/guides/cheapest-monthly-data-south-africa/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const monthlyBundles = bundles
    .filter((bundle) => bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month') || bundle.type === 'Monthly')
    .sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY));

  const cheapestMonthly = monthlyBundles
    .filter((bundle) => bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const bestMonthlyValue = cheapestMonthly;

  const networks: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];
  const networkRows = networks.map((network) => {
    const options = monthlyBundles.filter((bundle) => bundle.network === network);
    const cheapest = options.sort((a, b) => a.price - b.price)[0];
    const bestValue = options
      .filter((bundle) => bundle.costPerGb > 0)
      .sort((a, b) => a.costPerGb - b.costPerGb)[0] ?? options[0];
    return { network, cheapest, bestValue };
  });

  const regularUserPick = monthlyBundles
    .filter((bundle) => bundle.costPerGb > 0 && bundle.volume !== '1GB' && bundle.volume !== 'Unlimited')
    .sort((a, b) => a.price - b.price)[0] ?? monthlyBundles[0];
  const heavyUserPick = monthlyBundles
    .filter((bundle) => bundle.volume !== '1GB')
    .sort((a, b) => (parseInt(b.volume, 10) || 0) - (parseInt(a.volume, 10) || 0))[0] ?? monthlyBundles[0];
  const prepaidMonthlyPick = monthlyBundles
    .filter((bundle) => bundle.type === 'Prepaid')
    .sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY))[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest monthly data bundle in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: cheapestMonthly
            ? `${cheapestMonthly.network} currently lists one of the lowest monthly cost-per-GB options in this dataset: ${cheapestMonthly.name} at about R${cheapestMonthly.costPerGb.toFixed(2)}/GB.`
            : 'Monthly bundle value changes often, so compare current operator listings before buying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which network has the best monthly data deals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bestMonthlyValue
            ? `${bestMonthlyValue.network} currently shows one of the strongest monthly value profiles in this comparison dataset.`
            : 'Best monthly deals depend on current promotions, your usage level, and local coverage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is monthly data better value than once-off bundles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Often yes for regular users, because monthly bundles can lower effective cost per GB. But short-term promos can still beat monthly pricing in some periods.',
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
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
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
            Cheapest <span className="text-[#1b6d24]">Monthly Data</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Compare current 30-day bundle pricing so you can choose a monthly plan that fits your usage and budget.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapestMonthly
              ? `In this comparison dataset, ${cheapestMonthly.network} currently lists one of the cheapest monthly value options with ${cheapestMonthly.name} at about R${cheapestMonthly.costPerGb.toFixed(2)}/GB.`
              : 'In this comparison dataset, monthly value depends on network promos and bundle structure.'}{' '}
            Compare cost-per-GB, validity, and coverage together before you commit.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-black text-slate-900">What is the cheapest monthly data in South Africa right now?</span>{' '}
              {cheapestMonthly
                ? `${cheapestMonthly.network} currently has one of the lowest monthly cost-per-GB levels in this dataset.`
                : 'No single monthly offer clearly leads all scenarios in this dataset right now.'}
            </p>
            <p>
              <span className="font-black text-slate-900">Which network currently offers the best monthly value?</span>{' '}
              {bestMonthlyValue
                ? `${bestMonthlyValue.network} currently shows one of the strongest monthly value profiles in this comparison.`
                : 'Best monthly value can change by promo period and account-specific offers.'}
            </p>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest Monthly Data by Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkRows.map((row) => (
              <div key={row.network} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.network}</h3>
                <p className="text-sm text-slate-700">
                  {row.cheapest
                    ? `Cheapest listed: ${row.cheapest.name} (R${row.cheapest.price}).`
                    : 'No monthly-tagged listing in this dataset.'}
                </p>
                <p className="text-sm text-slate-700 mt-1">
                  {row.bestValue ? `Best-value listed: ${row.bestValue.name}${row.bestValue.costPerGb > 0 ? ` (~R${row.bestValue.costPerGb.toFixed(2)}/GB)` : ''}.` : ''}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Monthly Data Comparison Table</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Bundle</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Volume</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {monthlyBundles.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-6 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.volume}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.costPerGb > 0 ? `~R${bundle.costPerGb.toFixed(2)}/GB` : 'N/A (unlimited model)'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Monthly Data by Use Case</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Cheapest Monthly</h3>
              <p className="text-slate-700">{cheapestMonthly ? `${cheapestMonthly.name} currently gives one of the lowest monthly cost-per-GB results in this dataset.` : 'Compare monthly options by cost-per-GB and validity.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Best for Regular Users</h3>
              <p className="text-slate-700">{regularUserPick ? `${regularUserPick.name} is a practical monthly baseline for everyday browsing, maps, and messaging.` : 'Choose a mid-volume monthly bundle that fits your average usage.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Best for Heavy Users</h3>
              <p className="text-slate-700">{heavyUserPick ? `${heavyUserPick.name} is currently one of the stronger high-volume monthly options in this dataset.` : 'If you stream heavily, compare high-volume and unlimited plans side-by-side.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Best Prepaid Monthly Option</h3>
              <p className="text-slate-700">{prepaidMonthlyPick ? `${prepaidMonthlyPick.name} is currently the top prepaid monthly value option in this dataset.` : 'Check prepaid monthly promos in USSD/app menus if no prepaid monthly option is listed.'}</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Right Now</h2>
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
            Best-value monthly option in this dataset: {bestMonthlyValue?.network ?? 'No clear leader'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {bestMonthlyValue
              ? `${bestMonthlyValue.name} currently shows one of the strongest monthly value profiles by listed cost-per-GB.`
              : 'Monthly value can shift quickly as operators rotate promotions.'}
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Trust and Pricing Transparency</h2>
              <p className="text-slate-600 text-sm mt-1">
                Last updated: {lastUpdated}. Pricing can change quickly. Listed bundles are based on currently available data, and final offer details should be confirmed on operator pages.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest monthly data bundle in South Africa?</h3>
              <p className="text-sm text-slate-600">{cheapestMonthly ? `${cheapestMonthly.network} currently lists one of the lowest monthly value options in this dataset.` : 'Monthly pricing leadership can shift as promotions change.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Which network has the best monthly data deals?</h3>
              <p className="text-sm text-slate-600">{bestMonthlyValue ? `${bestMonthlyValue.network} currently shows one of the strongest monthly value positions in this comparison.` : 'Compare at least two operator monthly pages before you decide.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Is monthly data better value than once-off bundles?</h3>
              <p className="text-sm text-slate-600">For regular users it often is, but short-term promotions can still be better in some periods. Always compare current listed options before checkout.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            Internal Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Link to="/guides/cheapest-data-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cheapest Data South Africa</Link>
            <Link to="/guides/best-data-deals-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Best Data Deals South Africa</Link>
            <Link to="/guides/cheapest-1gb-data-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cheapest 1GB Data South Africa</Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Network Hub</Link>
            <Link to="/network/telkom/monthly-data/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Telkom Monthly Data</Link>
            <Link to="/network/mtn/monthly-data/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">MTN Monthly Data</Link>
            <Link to="/network/cell-c/monthly-data/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cell C Monthly Data</Link>
            <Link to="/network/rain/monthly-data/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Rain Monthly Data</Link>
            <Link to="/ussd-codes-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">USSD Codes South Africa</Link>
            <Link to="/methodology/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Methodology</Link>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};



