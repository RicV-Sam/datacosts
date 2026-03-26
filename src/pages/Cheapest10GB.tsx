import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, BarChart3, CalendarClock } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { bundles } from '../data';
import { NavigateFunction } from '../types';

interface Cheapest10GBProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const Cheapest10GB: React.FC<Cheapest10GBProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cheapest 10GB Data South Africa (2026) | DataCost';
  const metaDescription =
    'Compare the cheapest 10GB data bundles in South Africa. See currently listed 10GB deals, value per GB, and who should choose a 10GB bundle.';
  const canonicalUrl = 'https://datacost.co.za/guides/cheapest-10gb-data-south-africa/';
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const tenGbBundles = bundles
    .filter((bundle) => bundle.volume === '10GB')
    .sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY));

  const cheapest10Gb = tenGbBundles.sort((a, b) => a.price - b.price)[0];
  const best10GbValue = tenGbBundles
    .filter((bundle) => bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0] ?? tenGbBundles[0];

  const networks: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];
  const networkRows = networks.map((network) => {
    const options = tenGbBundles.filter((bundle) => bundle.network === network);
    const cheapest = options.sort((a, b) => a.price - b.price)[0];
    return { network, cheapest };
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest 10GB bundle in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: cheapest10Gb
            ? `${cheapest10Gb.network} currently lists one of the cheapest 10GB prices in this dataset with ${cheapest10Gb.name} at R${cheapest10Gb.price}.`
            : 'Cheapest 10GB pricing can shift quickly, so compare currently listed operator pages before buying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which network gives the best 10GB value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: best10GbValue
            ? `${best10GbValue.network} currently shows one of the strongest 10GB value profiles in this comparison dataset.`
            : 'Best 10GB value depends on your local coverage and current promotion windows.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is 10GB enough for a month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For light-to-moderate users, 10GB can be enough for a month. For heavy streaming and hotspot usage, you may need a larger monthly bundle.',
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
            Cheapest <span className="text-[#1b6d24]">10GB Data</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            A focused comparison of currently listed 10GB bundles to help you pick the right mid-volume option.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapest10Gb
              ? `In this comparison dataset, ${cheapest10Gb.network} currently lists one of the cheapest 10GB bundles at R${cheapest10Gb.price} (${cheapest10Gb.name}).`
              : 'In this comparison dataset, 10GB availability is currently limited, so compare current network pages before buying.'}{' '}
            If you use more than 1GB but less than heavy unlimited-style usage, 10GB is often a practical monthly middle ground.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-black text-slate-900">What is the cheapest 10GB data bundle in South Africa right now?</span>{' '}
              {cheapest10Gb
                ? `${cheapest10Gb.network} currently has one of the cheapest listed 10GB prices in this dataset.`
                : 'No single 10GB leader is consistently cheapest in all periods, so compare current operator listings.'}
            </p>
            <p>
              <span className="font-black text-slate-900">Which network currently gives the best 10GB value?</span>{' '}
              {best10GbValue
                ? `${best10GbValue.network} currently offers one of the strongest 10GB value profiles in this comparison.`
                : 'Best 10GB value depends on promo timing, coverage fit, and plan terms.'}
            </p>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest 10GB by Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkRows.map((row) => (
              <div key={row.network} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.network}</h3>
                <p className="text-sm text-slate-700">
                  {row.cheapest
                    ? `${row.cheapest.name} at R${row.cheapest.price} (~R${row.cheapest.costPerGb.toFixed(2)}/GB).`
                    : 'No listed 10GB bundle in this dataset for this network.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">10GB Comparison Table</h2>
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
                {tenGbBundles.length > 0 ? tenGbBundles.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-6 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.validity}</td>
                    <td className="px-6 py-4 text-slate-700">~R{bundle.costPerGb.toFixed(2)}/GB</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-6 py-4 text-slate-600" colSpan={5}>No 10GB bundles found in the current dataset.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Who Should Buy a 10GB Bundle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Best if you use maps, messaging, and moderate social media</h3>
              <p className="text-slate-700">10GB can work well for everyday app usage if you are not streaming high-definition video daily.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Worth it if 1GB runs out too quickly</h3>
              <p className="text-slate-700">If 1GB plans force frequent top-ups, a 10GB monthly plan is often more practical and predictable.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Not ideal for heavy hotspot or full-time streaming</h3>
              <p className="text-slate-700">Heavy users should compare larger monthly plans or unlimited-style options as well.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Practical for controlled monthly spending</h3>
              <p className="text-slate-700">If you want a fixed monthly data budget, 10GB is often a manageable middle option.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Right Now</h2>
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
            Best-value 10GB option in this dataset: {best10GbValue?.network ?? 'No clear leader'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {best10GbValue
              ? `${best10GbValue.name} currently offers one of the strongest 10GB value profiles by listed cost-per-GB.`
              : '10GB value can shift quickly as operator promos rotate.'}
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Trust and Pricing Transparency</h2>
              <p className="text-slate-600 text-sm mt-1">
                Last updated: {lastUpdated}. Prices can change quickly. Listed bundles are based on currently available data, and final offer details should be confirmed on operator pages.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest 10GB bundle in South Africa?</h3>
              <p className="text-sm text-slate-600">{cheapest10Gb ? `${cheapest10Gb.network} currently lists one of the cheapest 10GB options in this dataset.` : 'Cheapest 10GB pricing changes, so compare current network pages before buying.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Which network gives the best 10GB value?</h3>
              <p className="text-sm text-slate-600">{best10GbValue ? `${best10GbValue.network} currently has one of the strongest 10GB value profiles in this comparison.` : 'Best 10GB value depends on your local coverage and current promotions.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Is 10GB enough for a month?</h3>
              <p className="text-sm text-slate-600">For many light-to-moderate users, yes. For frequent video streaming or hotspot use, you may need a larger monthly plan.</p>
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
            <Link to="/guides/cheapest-1gb-data-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cheapest 1GB Data South Africa</Link>
            <Link to="/guides/best-data-deals-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Best Data Deals South Africa</Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Network Hub</Link>
            <Link to="/network/vodacom/10gb/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Vodacom 10GB Page</Link>
            <Link to="/network/mtn/10gb/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">MTN 10GB Page</Link>
            <Link to="/network/cell-c/10gb/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cell C 10GB Page</Link>
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
