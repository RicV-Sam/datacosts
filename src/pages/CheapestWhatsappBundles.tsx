import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, BarChart3, CalendarClock } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { bundles } from '../data';
import { NavigateFunction } from '../types';

interface CheapestWhatsappBundlesProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const CheapestWhatsappBundles: React.FC<CheapestWhatsappBundlesProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cheapest WhatsApp Bundles South Africa (2026) | DataCost';
  const metaDescription =
    'Find the cheapest WhatsApp-friendly bundle options in South Africa and compare practical low-data choices by network.';
  const canonicalUrl = 'https://datacost.co.za/guides/cheapest-whatsapp-bundles-south-africa/';
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const lowDataBundles = bundles
    .filter((bundle) => bundle.volume === '1GB' || bundle.volume === '2GB')
    .sort((a, b) => (a.costPerGb || Number.POSITIVE_INFINITY) - (b.costPerGb || Number.POSITIVE_INFINITY));

  const cheapestWhatsappLike = lowDataBundles[0];
  const networks: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C'];
  const whatsappRows = networks.map((network) => {
    const candidate = lowDataBundles
      .filter((bundle) => bundle.network === network)
      .sort((a, b) => a.price - b.price)[0];
    return { network, candidate };
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest WhatsApp bundle in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: cheapestWhatsappLike
            ? `${cheapestWhatsappLike.network} currently has one of the lowest-cost WhatsApp-friendly options in this dataset via ${cheapestWhatsappLike.name}.`
            : 'Dedicated WhatsApp bundle pricing can change quickly and may be account-specific, so check operator menus directly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are WhatsApp bundles worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'They can be useful if your usage is mostly messaging and light media. If you browse, stream, or use maps often, regular anytime data can be better value.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I choose a WhatsApp bundle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Compare price, validity, and whether the bundle only covers WhatsApp traffic. Then check your operator USSD menu for current social bundle offers.',
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
            Cheapest <span className="text-[#1b6d24]">WhatsApp Bundles</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            A practical guide for users who mainly need WhatsApp and want low-cost mobile data options.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapestWhatsappLike
              ? `In this comparison dataset, ${cheapestWhatsappLike.network} currently lists one of the lowest-cost WhatsApp-friendly options via ${cheapestWhatsappLike.name}.`
              : 'In this comparison dataset, dedicated WhatsApp bundle listings are limited, so operator social-bundle menus should be checked directly.'}{' '}
            For mostly chat and voice notes, small low-cost bundles can be enough. For heavy media sharing, you may need a larger anytime bundle.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-black text-slate-900">What is the cheapest WhatsApp bundle right now?</span>{' '}
              {cheapestWhatsappLike
                ? `${cheapestWhatsappLike.network} currently has one of the cheapest WhatsApp-friendly entries in this dataset.`
                : 'Dedicated WhatsApp bundle pricing is often promo-based and should be confirmed on live operator menus.'}
            </p>
            <p>
              <span className="font-black text-slate-900">Are WhatsApp bundles worth it?</span>{' '}
              They can be worth it for messaging-first users, but general anytime bundles can be better for broader app usage.
            </p>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">WhatsApp Bundles by Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatsappRows.map((row) => (
              <div key={row.network} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.network}</h3>
                <p className="text-sm text-slate-700">
                  {row.candidate
                    ? `Practical low-data option in this dataset: ${row.candidate.name} at R${row.candidate.price}.`
                    : 'No low-data listing captured here. Check current social-bundle options via app or USSD menu.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Comparison Section</h2>
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
                {lowDataBundles.length > 0 ? lowDataBundles.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-6 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-6 py-4 text-slate-700">{bundle.validity}</td>
                    <td className="px-6 py-4 text-slate-700">~R{bundle.costPerGb.toFixed(2)}/GB</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-6 py-4 text-slate-600" colSpan={5}>No low-data bundle listings found in the current dataset.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Who Should Use WhatsApp Bundles?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Best for messaging-first users</h3>
              <p className="text-slate-700">If you mostly send texts, voice notes, and occasional images, WhatsApp-focused spending can stay low.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Not ideal for broader browsing</h3>
              <p className="text-slate-700">If you also stream, use maps heavily, or browse often, a normal anytime bundle is usually better value.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Recommendation</h2>
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
            Best-value option in this dataset: {cheapestWhatsappLike?.network ?? 'No clear leader'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {cheapestWhatsappLike
              ? `${cheapestWhatsappLike.name} is currently one of the lowest-cost WhatsApp-friendly starting options in this dataset.`
              : 'Dedicated WhatsApp offers may be operator-specific and can change quickly, so confirm via app or USSD menu.'}
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
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest WhatsApp bundle in South Africa?</h3>
              <p className="text-sm text-slate-600">{cheapestWhatsappLike ? `${cheapestWhatsappLike.network} currently shows one of the lowest-cost WhatsApp-friendly options in this dataset.` : 'Cheapest WhatsApp bundle pricing is often promo-based and should be confirmed in live menus.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Are WhatsApp bundles worth it?</h3>
              <p className="text-sm text-slate-600">They are often worth it for messaging-focused usage, but less useful if you need broad app and browsing access.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">How should I choose a WhatsApp bundle?</h3>
              <p className="text-sm text-slate-600">Compare price, validity, and usage scope, then verify current network social-bundle terms before purchase.</p>
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
            <Link to="/guides/how-to-buy-data-vodacom/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">How to Buy Data on Vodacom</Link>
            <Link to="/guides/how-to-buy-data-mtn/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">How to Buy Data on MTN</Link>
            <Link to="/guides/how-to-buy-data-telkom/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">How to Buy Data on Telkom</Link>
            <Link to="/guides/how-to-buy-data-cell-c/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">How to Buy Data on Cell C</Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Network Hub</Link>
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
