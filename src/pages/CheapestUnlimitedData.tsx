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

interface CheapestUnlimitedDataProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const CheapestUnlimitedData: React.FC<CheapestUnlimitedDataProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cheapest Unlimited Data South Africa (2026) | DataCost';
  const metaDescription =
    'Compare currently listed unlimited-style data options in South Africa and see when unlimited plans beat capped monthly bundles.';
  const canonicalUrl = toCanonicalUrl('/guides/cheapest-unlimited-data-south-africa/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const unlimitedBundles = bundles
    .filter((bundle) => bundle.volume === 'Unlimited' || bundle.name.toLowerCase().includes('unlimited'))
    .sort((a, b) => a.price - b.price);
  const cheapestUnlimited = unlimitedBundles[0];

  const cappedMonthly = bundles
    .filter((bundle) => bundle.validity.toLowerCase().includes('30 day') || bundle.type === 'Monthly')
    .filter((bundle) => bundle.volume !== 'Unlimited' && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb);
  const bestCappedMonthly = cappedMonthly[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest unlimited data in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: cheapestUnlimited
            ? `${cheapestUnlimited.network} currently lists the lowest-price unlimited-style option in this comparison dataset: ${cheapestUnlimited.name} at R${cheapestUnlimited.price}.`
            : 'Unlimited pricing can vary by network and location, so check the latest operator pages before buying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is unlimited data really unlimited?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many unlimited plans include fair-usage and speed-management rules. Always confirm policy details on the operator page before checkout.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is unlimited better than capped monthly data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on usage. Unlimited can be practical for heavy users, while capped monthly bundles can be lower cost for light and moderate users.',
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
            Cheapest <span className="text-[#1b6d24]">Unlimited Data</span> South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            A practical guide to currently listed unlimited-style plans and how they compare with capped monthly options.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapestUnlimited
              ? `In this comparison dataset, ${cheapestUnlimited.network} currently lists the lowest-price unlimited-style plan with ${cheapestUnlimited.name} at R${cheapestUnlimited.price}.`
              : 'In this comparison dataset, unlimited plan availability is limited and should be checked directly on operator pages.'}{' '}
            Unlimited can make sense for very heavy monthly usage, but capped bundles can still be better value for lighter users.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-black text-slate-900">What is the cheapest unlimited data right now?</span>{' '}
              {cheapestUnlimited
                ? `${cheapestUnlimited.network} currently has the lowest-price unlimited-style listing in this dataset.`
                : 'No clear unlimited leader can be confirmed from the current dataset alone.'}
            </p>
            <p>
              <span className="font-black text-slate-900">Is unlimited really unlimited?</span>{' '}
              Unlimited plans are often subject to fair-usage and speed-management rules, so always confirm the policy terms before checkout.
            </p>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Unlimited vs Capped Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Unlimited-Style Plans</h3>
              <p className="text-slate-700">Useful for high-volume users who want fewer top-ups, but terms and speed conditions can differ by plan.</p>
              <p className="text-slate-700 mt-2">Current lowest listed: {cheapestUnlimited ? `${cheapestUnlimited.name} (R${cheapestUnlimited.price})` : 'No clear listing in dataset'}.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Capped Monthly Plans</h3>
              <p className="text-slate-700">Often lower total spend for moderate users, especially when cost-per-GB is strong.</p>
              <p className="text-slate-700 mt-2">Best-value capped monthly in this dataset: {bestCappedMonthly ? `${bestCappedMonthly.name} (~R${bestCappedMonthly.costPerGb.toFixed(2)}/GB)` : 'No clear listing'}.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Who Should Use Unlimited?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Best if you stream heavily every day</h3>
              <p className="text-slate-700">If you regularly stream video, hotspot, or download large files, unlimited can reduce top-up friction.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Not always best for moderate users</h3>
              <p className="text-slate-700">If your usage is controlled, capped monthly bundles can be more cost-effective than unlimited plans.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Recommendation</h2>
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
            Best-value option in this dataset: {cheapestUnlimited?.network ?? 'No clear unlimited leader'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {cheapestUnlimited
              ? `${cheapestUnlimited.name} is currently the lowest-price unlimited-style listing in this dataset.`
              : 'Unlimited choices are limited in this dataset, so confirm live availability and terms on operator pages.'}
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Trust and Pricing Transparency</h2>
              <p className="text-slate-600 text-sm mt-1">
                Last updated: {lastUpdated}. Pricing can change quickly. These are currently listed plans in our comparison dataset, and final offer details should be confirmed on the operator page.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest unlimited data in South Africa?</h3>
              <p className="text-sm text-slate-600">{cheapestUnlimited ? `${cheapestUnlimited.network} currently lists one of the lowest-price unlimited-style options in this dataset.` : 'Unlimited pricing can shift quickly, so verify current offers on operator pages.'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Is unlimited really unlimited?</h3>
              <p className="text-sm text-slate-600">Many plans still apply fair-usage and speed-management terms. Check policy details before paying.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Is unlimited better than capped data?</h3>
              <p className="text-sm text-slate-600">For heavy usage, often yes. For moderate usage, capped monthly bundles can still be better value.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            Internal Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Link to="/guides/best-monthly-data-deals-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Cheapest Monthly Data South Africa</Link>
            <Link to="/guides/best-data-deals-south-africa/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Best Data Deals South Africa</Link>
            <Link to="/network/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Network Hub</Link>
            <Link to="/network/rain/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Rain Network Page</Link>
            <Link to="/network/rain/monthly-data/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Rain Monthly Data</Link>
            <Link to="/network/telkom/monthly-data/" className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">Telkom Monthly Data</Link>
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



