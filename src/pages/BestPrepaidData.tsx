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

interface BestPrepaidDataProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const BestPrepaidData: React.FC<BestPrepaidDataProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Prepaid Data Deals South Africa (2026)';
  const metaDescription =
    'Compare the best prepaid data deals in South Africa. See currently listed prepaid bundles, value per GB, and practical options by use case.';
  const canonicalUrl = toCanonicalUrl('/guides/best-prepaid-data-deals-south-africa/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const prepaidBundles = bundles
    .filter((bundle) => bundle.type === 'Prepaid')
    .sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY));

  const topPrepaid = prepaidBundles.slice(0, 5);
  const bestPrepaidValue = prepaidBundles.find((bundle) => bundle.costPerGb > 0);
  const everydayPick = prepaidBundles
    .filter((bundle) => bundle.volume !== '1GB')
    .sort((a, b) => a.price - b.price)[0] ?? bestPrepaidValue;
  const lightUserPick = prepaidBundles
    .filter((bundle) => bundle.volume === '1GB')
    .sort((a, b) => a.price - b.price)[0] ?? prepaidBundles[0];
  const heavyUserPick = [...prepaidBundles]
    .sort((a, b) => {
      const aVol = parseInt(a.volume, 10) || 0;
      const bVol = parseInt(b.volume, 10) || 0;
      return bVol - aVol;
    })[0] ?? prepaidBundles[0];

  const networks: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];
  const networkRows = networks.map((network) => {
    const options = prepaidBundles.filter((bundle) => bundle.network === network);
    const best = options.sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY))[0];
    return { network, best, count: options.length };
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best prepaid data deal in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bestPrepaidValue
            ? `${bestPrepaidValue.network} currently lists one of the strongest prepaid value options in this dataset: ${bestPrepaidValue.name} at about R${bestPrepaidValue.costPerGb.toFixed(2)}/GB.`
            : 'The best prepaid value depends on current promotions and coverage in your area. Compare current operator listings before buying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which network has the cheapest prepaid data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bestPrepaidValue
            ? `${bestPrepaidValue.network} currently has the lowest prepaid cost-per-GB in this comparison dataset.`
            : 'Cheapest prepaid pricing can change quickly, so compare current listed offers before checkout.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is prepaid data cheaper than contract?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Often yes for many users, especially when prepaid promos are available. Final value depends on usage pattern, included benefits, and local coverage quality.',
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
            Best <span className="text-[#1b6d24]">Prepaid Data Deals</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Practical prepaid comparison for South African users who want better value without overpaying on out-of-bundle rates.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {bestPrepaidValue
              ? `In this comparison dataset, ${bestPrepaidValue.network} currently provides one of the strongest prepaid value options with ${bestPrepaidValue.name} at about R${bestPrepaidValue.costPerGb.toFixed(2)}/GB.`
              : 'In this comparison dataset, prepaid availability is limited, so the best option can depend heavily on current promos and your account offers.'}{' '}
            Start with prepaid value per GB, then verify validity and coverage before buying.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-black text-slate-900">Which network currently offers the best prepaid value?</span>{' '}
              {bestPrepaidValue
                ? `${bestPrepaidValue.network} currently leads this prepaid dataset on listed cost-per-GB.`
                : 'No single network clearly leads all prepaid scenarios in this dataset right now.'}
            </p>
            <p>
              <span className="font-black text-slate-900">Which prepaid bundle is best for everyday users?</span>{' '}
              {everydayPick
                ? `${everydayPick.name} is a practical starting option for regular daily usage in this dataset.`
                : 'Choose a 30-day prepaid bundle with a clear anytime allocation and enough headroom for your monthly usage.'}
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Top Prepaid Data Deals Right Now</h2>
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
                {topPrepaid.length > 0 ? topPrepaid.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-6 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.validity}</td>
                    <td className="px-6 py-4 text-slate-700">~R{bundle.costPerGb.toFixed(2)}/GB</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-6 py-4 text-slate-600" colSpan={5}>No prepaid-tagged bundles found in the current dataset.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Prepaid Data by Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkRows.map((row) => (
              <div key={row.network} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.network}</h3>
                <p className="text-sm text-slate-700">
                  {row.best
                    ? `${row.best.name} at R${row.best.price} (~R${row.best.costPerGb.toFixed(2)}/GB).`
                    : 'No prepaid-tagged listing in this dataset at the moment.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Prepaid Data for Different Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Light Users</h3>
              <p className="text-slate-700">{lightUserPick ? `${lightUserPick.name} is a practical low-volume prepaid option in this dataset.` : 'Look for a low-cost prepaid starter bundle with 7-30 day validity.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Monthly Users</h3>
              <p className="text-slate-700">{everydayPick ? `${everydayPick.name} is currently a practical prepaid fit for regular monthly usage.` : 'Choose a prepaid monthly plan that matches your average monthly consumption.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Heavy Users</h3>
              <p className="text-slate-700">{heavyUserPick ? `${heavyUserPick.name} currently gives the largest prepaid volume shown in this dataset.` : 'If prepaid options are limited, compare monthly and high-volume network pages as well.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Promo Shoppers</h3>
              <p className="text-slate-700">Check USSD/app promos before paying standard rates. The listed offers are a baseline, not every account-specific deal.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Right Now</h2>
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
            Best-value option in this dataset: {bestPrepaidValue?.network ?? 'No clear prepaid leader'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {bestPrepaidValue
              ? `${bestPrepaidValue.name} currently has one of the strongest prepaid cost-per-GB levels in this comparison.`
              : 'Prepaid-tagged data is currently limited in this dataset, so compare network pages and live operator menus before deciding.'}
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Trust and Pricing Transparency</h2>
              <p className="text-slate-600 text-sm mt-1">
                Last updated: {lastUpdated}. Prices can change quickly. Listed bundles reflect currently available dataset entries, and final offer details should be confirmed on the operator page.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">What is the best prepaid data deal in South Africa?</h3>
              <p className="text-sm text-slate-600">{bestPrepaidValue ? `${bestPrepaidValue.network} currently shows one of the strongest prepaid value options in this dataset.` : 'It depends on current promos, usage pattern, and coverage in your area.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Which network has the cheapest prepaid data?</h3>
              <p className="text-sm text-slate-600">{bestPrepaidValue ? `${bestPrepaidValue.network} currently has the lowest prepaid cost-per-GB among listed prepaid entries.` : 'Cheapest prepaid data can shift quickly, so verify current network menus before checkout.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Is prepaid data cheaper than contract?</h3>
              <p className="text-sm text-slate-600">Often yes for flexible users, but total value depends on your usage profile, contract perks, and your network quality where you actually use data.</p>
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
            <Link to="/guides/prepaid-vs-contract-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Prepaid vs Contract</Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Network Hub</Link>
            <Link to="/network/vodacom/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Vodacom Network Page</Link>
            <Link to="/network/mtn/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">MTN Network Page</Link>
            <Link to="/network/telkom/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Telkom Network Page</Link>
            <Link to="/network/cell-c/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cell C Network Page</Link>
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



