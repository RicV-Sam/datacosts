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

interface BestSimOnlyDealsProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const BestSimOnlyDeals: React.FC<BestSimOnlyDealsProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Best SIM-Only Deals South Africa (2026) | DataCost';
  const metaDescription =
    'Compare currently listed SIM-only style data options in South Africa and see how they stack up against prepaid choices.';
  const canonicalUrl = toCanonicalUrl('/guides/best-sim-only-deals-south-africa/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const simOnlyStyle = bundles
    .filter((bundle) => bundle.type === 'Monthly')
    .filter((bundle) => bundle.volume !== 'Unlimited' && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb);

  const topSimOnly = simOnlyStyle.slice(0, 6);
  const bestSimOnly = topSimOnly[0];

  const prepaidOptions = bundles
    .filter((bundle) => bundle.type === 'Prepaid')
    .sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY));
  const bestPrepaid = prepaidOptions[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best SIM-only deal in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bestSimOnly
            ? `${bestSimOnly.network} currently has one of the strongest SIM-only style value options in this comparison dataset: ${bestSimOnly.name} at about R${bestSimOnly.costPerGb.toFixed(2)}/GB.`
            : 'SIM-only value depends on current monthly listings, usage needs, and local coverage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SIM-only better than prepaid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SIM-only can be practical for predictable monthly usage, while prepaid can be better for flexibility and promo-hunting. It depends on your usage pattern.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I choose between SIM-only and prepaid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with coverage, then compare cost per GB, validity, and whether you need fixed monthly predictability or promo-driven flexibility.',
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
            Best <span className="text-[#1b6d24]">SIM-Only Deals</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Compare currently listed SIM-only style monthly bundles and see where they fit versus prepaid options.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {bestSimOnly
              ? `In this comparison dataset, ${bestSimOnly.network} currently offers one of the strongest SIM-only style values with ${bestSimOnly.name} at about R${bestSimOnly.costPerGb.toFixed(2)}/GB.`
              : 'In this comparison dataset, SIM-only value depends on the latest monthly bundle mix and coverage in your area.'}{' '}
            If you need predictable monthly usage, SIM-only can be practical. If you chase promos, prepaid can still compete.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-black text-slate-900">What is the best SIM-only deal right now?</span>{' '}
              {bestSimOnly
                ? `${bestSimOnly.network} currently has one of the strongest SIM-only style options in this dataset.`
                : 'Best SIM-only value can shift as bundle listings change.'}
            </p>
            <p>
              <span className="font-black text-slate-900">SIM-only vs prepaid: which is better?</span>{' '}
              SIM-only often suits predictable monthly users, while prepaid is often better for flexible spending and promotion-led value.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Top SIM-Only Deals</h2>
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
                {topSimOnly.length > 0 ? topSimOnly.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-6 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.volume}</td>
                    <td className="px-6 py-4 text-slate-700">~R{bundle.costPerGb.toFixed(2)}/GB</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-6 py-4 text-slate-600" colSpan={5}>No SIM-only style monthly entries found in the current dataset.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">SIM-Only vs Prepaid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">SIM-Only</h3>
              <p className="text-slate-700">Better for planned monthly usage and predictable recurring spend.</p>
              <p className="text-slate-700 mt-2">Current best-value option in this dataset: {bestSimOnly ? `${bestSimOnly.name}` : 'No clear listing'}.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Prepaid</h3>
              <p className="text-slate-700">Better for flexibility and users who actively compare promos before each recharge.</p>
              <p className="text-slate-700 mt-2">Current prepaid benchmark in this dataset: {bestPrepaid ? `${bestPrepaid.name}` : 'No clear listing'}.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Recommendation</h2>
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
            Best-value SIM-only option in this dataset: {bestSimOnly?.network ?? 'No clear leader'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {bestSimOnly
              ? `${bestSimOnly.name} currently leads this SIM-only style comparison on listed cost-per-GB.`
              : 'Value can shift quickly as network listings and promos change.'}
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Trust and Pricing Transparency</h2>
              <p className="text-slate-600 text-sm mt-1">
                Last updated: {lastUpdated}. Pricing can change quickly. These are currently listed options in our comparison dataset, and final offer details should be confirmed on operator pages.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">What is the best SIM-only deal in South Africa?</h3>
              <p className="text-sm text-slate-600">{bestSimOnly ? `${bestSimOnly.network} currently shows one of the strongest SIM-only style values in this dataset.` : 'Best SIM-only value depends on current monthly listings and your coverage.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Is SIM-only better than prepaid?</h3>
              <p className="text-sm text-slate-600">SIM-only is often better for predictable monthly use. Prepaid is often better for flexible, promo-driven spending.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">How should I choose between SIM-only and prepaid?</h3>
              <p className="text-sm text-slate-600">Compare coverage first, then value per GB, then validity and billing flexibility.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            Internal Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Link to="/guides/prepaid-vs-contract-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Prepaid vs Contract South Africa</Link>
            <Link to="/guides/best-prepaid-data-deals-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Best Prepaid Data Deals South Africa</Link>
            <Link to="/guides/best-monthly-data-deals-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cheapest Monthly Data South Africa</Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Network Hub</Link>
            <Link to="/network/vodacom/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Vodacom Network Page</Link>
            <Link to="/network/mtn/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">MTN Network Page</Link>
            <Link to="/network/telkom/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Telkom Network Page</Link>
            <Link to="/network/cell-c/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cell C Network Page</Link>
            <Link to="/methodology/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Methodology</Link>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};



