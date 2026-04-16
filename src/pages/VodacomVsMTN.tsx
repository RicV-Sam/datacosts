import React from 'react';
import { bundles, networkStats } from '../data';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { ArrowLeft, ShieldCheck, BarChart3, CalendarClock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigateFunction } from '../types';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface VodacomVsMTNProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const VodacomVsMTN: React.FC<VodacomVsMTNProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Vodacom vs MTN Data Prices (2026)';
  const metaDescription =
    'Is Vodacom better than MTN for data? We compare the latest data prices, speeds, and coverage to help you choose the right network in 2026.';
  const canonicalUrl = toCanonicalUrl('/guides/vodacom-vs-mtn-data-prices/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const vodacomStats = networkStats.find(n => n.network === 'Vodacom');
  const mtnStats = networkStats.find(n => n.network === 'MTN');
  const vodacomBundles = bundles.filter((bundle) => bundle.network === 'Vodacom');
  const mtnBundles = bundles.filter((bundle) => bundle.network === 'MTN');

  const vodacom1Gb = vodacomBundles.filter((bundle) => bundle.volume === '1GB').sort((a, b) => a.price - b.price)[0];
  const mtn1Gb = mtnBundles.filter((bundle) => bundle.volume === '1GB').sort((a, b) => a.price - b.price)[0];
  const vodacomMonthly = vodacomBundles
    .filter((bundle) => bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month'))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const mtnMonthly = mtnBundles
    .filter((bundle) => bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month'))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const vodacomNight = vodacomBundles
    .filter((bundle) => bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== ''))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const mtnNight = mtnBundles
    .filter((bundle) => bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== ''))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const vodacomPrepaid = vodacomBundles.filter((bundle) => bundle.type === 'Prepaid').sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const mtnPrepaid = mtnBundles.filter((bundle) => bundle.type === 'Prepaid').sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const vodacomBestCost = Math.min(...vodacomBundles.map((bundle) => bundle.costPerGb));
  const mtnBestCost = Math.min(...mtnBundles.map((bundle) => bundle.costPerGb));
  const cheaperNow = vodacomBestCost < mtnBestCost ? 'Vodacom' : 'MTN';
  const betterValueNow = mtnBestCost <= vodacomBestCost ? 'MTN' : 'Vodacom';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Vodacom or MTN cheaper for data right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${cheaperNow} is currently cheaper on the lowest listed cost-per-GB in this comparison dataset.`
        }
      },
      {
        '@type': 'Question',
        name: 'Which network gives better value: Vodacom or MTN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${betterValueNow} currently offers one of the stronger value profiles in this comparison dataset, while final value still depends on your location, usage pattern, and promotions.`
        }
      },
      {
        '@type': 'Question',
        name: 'Should I choose Vodacom or MTN for prepaid data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose based on local coverage first, then compare currently listed 1GB, monthly, and promo options side by side before buying.'
        }
      }
    ]
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
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
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
            <span className="text-[#E60000]">Vodacom</span> vs <span className="text-[#FFCC00]">MTN</span> Data Prices (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Choosing between South Africa&apos;s two largest networks? This page compares currently listed pricing, bundle value, and practical fit for daily users.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            In this comparison dataset, <span className="font-black">{cheaperNow}</span> is currently cheaper on the lowest listed cost-per-GB,
            while <span className="font-black">{betterValueNow}</span> shows one of the stronger overall value profiles.
            For most users, the better choice depends on local coverage and whether you buy 1GB, monthly, or night-data bundles most often.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Pricing and promotions can change quickly by account and campaign period. Always confirm final offer details on the operator page before checkout.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4">
            <p className="text-slate-700">
              <span className="font-black text-slate-900">Is Vodacom or MTN cheaper for data?</span>{' '}
              {cheaperNow} is currently cheaper on the lowest listed cost-per-GB in this comparison dataset.
            </p>
            <p className="text-slate-700">
              <span className="font-black text-slate-900">Which network gives better value?</span>{' '}
              {betterValueNow} currently offers one of the stronger value profiles in this comparison dataset, but coverage and promotion availability still matter.
            </p>
          </div>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Last Updated</h2>
              <p className="text-slate-600 text-sm mt-1">
                {lastUpdated}. This page is generated from the same currently listed bundle dataset used across our network and guide pages.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Vodacom vs MTN Side-by-Side Comparison</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Vodacom (currently listed)</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">MTN (currently listed)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="px-6 py-4 font-bold">Lowest listed cost/GB</td>
                  <td className="px-6 py-4 text-slate-700">From about R{vodacomBestCost.toFixed(2)}/GB</td>
                  <td className="px-6 py-4 text-slate-700">From about R{mtnBestCost.toFixed(2)}/GB</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Cheapest listed 1GB</td>
                  <td className="px-6 py-4 text-slate-700">{vodacom1Gb ? `${vodacom1Gb.name} - R${vodacom1Gb.price}` : 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-700">{mtn1Gb ? `${mtn1Gb.name} - R${mtn1Gb.price}` : 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Best listed monthly value</td>
                  <td className="px-6 py-4 text-slate-700">{vodacomMonthly ? `${vodacomMonthly.name} (~R${vodacomMonthly.costPerGb.toFixed(2)}/GB)` : 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-700">{mtnMonthly ? `${mtnMonthly.name} (~R${mtnMonthly.costPerGb.toFixed(2)}/GB)` : 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Best listed night-data value</td>
                  <td className="px-6 py-4 text-slate-700">{vodacomNight ? `${vodacomNight.name} (~R${vodacomNight.costPerGb.toFixed(2)}/GB)` : 'No night bundle listed here'}</td>
                  <td className="px-6 py-4 text-slate-700">{mtnNight ? `${mtnNight.name} (~R${mtnNight.costPerGb.toFixed(2)}/GB)` : 'No night bundle listed here'}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Coverage reference</td>
                  <td className="px-6 py-4 text-slate-700">{vodacomStats?.coverage ?? 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-700">{mtnStats?.coverage ?? 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            These figures reflect currently listed bundles in this dataset, not account-specific promotions.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Best by Use Case</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-2">Best for 1GB</h3>
              <p className="text-slate-700 text-sm">
                {mtn1Gb && vodacom1Gb
                  ? mtn1Gb.price <= vodacom1Gb.price
                    ? `MTN is currently cheaper on listed 1GB pricing (${mtn1Gb.name} at R${mtn1Gb.price}).`
                    : `Vodacom is currently cheaper on listed 1GB pricing (${vodacom1Gb.name} at R${vodacom1Gb.price}).`
                  : 'Compare both 1GB pages for currently listed offers.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-2">Best for Monthly Bundles</h3>
              <p className="text-slate-700 text-sm">
                {mtnMonthly && vodacomMonthly
                  ? mtnMonthly.costPerGb <= vodacomMonthly.costPerGb
                    ? `MTN currently shows lower listed monthly cost-per-GB in this dataset.`
                    : `Vodacom currently shows lower listed monthly cost-per-GB in this dataset.`
                  : 'Check the monthly bundle pages to compare current listed values.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-2">Best for Night Data</h3>
              <p className="text-slate-700 text-sm">
                {mtnNight && vodacomNight
                  ? mtnNight.costPerGb <= vodacomNight.costPerGb
                    ? `MTN currently looks stronger on listed night-data value in this dataset.`
                    : `Vodacom currently looks stronger on listed night-data value in this dataset.`
                  : 'Night-data availability can vary; verify current menus before buying.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-2">Best for Prepaid Users</h3>
              <p className="text-slate-700 text-sm">
                {mtnPrepaid || vodacomPrepaid
                  ? mtnPrepaid && vodacomPrepaid
                    ? mtnPrepaid.costPerGb <= vodacomPrepaid.costPerGb
                      ? 'MTN currently has stronger listed prepaid value in this dataset.'
                      : 'Vodacom currently has stronger listed prepaid value in this dataset.'
                    : 'Compare both network pages because prepaid promos can be account-specific.'
                  : 'Prepaid value is often promo-driven; check current USSD/app offers first.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight mb-4 text-[#E60000]">When Vodacom Is Better</h2>
            <ul className="text-slate-700 text-sm space-y-2">
              <li>1. You prioritize broader coverage consistency in your area.</li>
              <li>2. You prefer network stability over the absolute lowest listed price.</li>
              <li>3. Your account-specific Vodacom offers are currently stronger.</li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight mb-4 text-[#c59200]">When MTN Is Better</h2>
            <ul className="text-slate-700 text-sm space-y-2">
              <li>1. You want lower currently listed cost-per-GB on common bundles.</li>
              <li>2. You buy monthly or promo-led prepaid bundles regularly.</li>
              <li>3. MTN coverage is strong where you live and work.</li>
            </ul>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            How We Compare Vodacom vs MTN
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We compare currently listed bundles by price, validity, and cost-per-GB. We then layer practical factors like coverage and bundle fit by use case.
          </p>
          <Link to="/methodology/" className="font-bold text-[#1b6d24] hover:underline">Read full methodology</Link>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Where To Go Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/network/vodacom/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Vodacom Network Page</h3>
              <p className="text-sm text-slate-600 mt-2">View current Vodacom bundles and value breakdowns.</p>
            </Link>
            <Link to="/network/mtn/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">MTN Network Page</h3>
              <p className="text-sm text-slate-600 mt-2">View current MTN bundles and value breakdowns.</p>
            </Link>
              <Link to="/network/vodacom/cheapest-1gb/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Vodacom 1GB Deals</h3>
              <p className="text-sm text-slate-600 mt-2">Check currently listed 1GB options on Vodacom.</p>
            </Link>
            <Link to="/network/mtn/monthly-data/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">MTN Monthly Data Deals</h3>
              <p className="text-sm text-slate-600 mt-2">Compare currently listed monthly options on MTN.</p>
            </Link>
            <Link to="/network/mtn/night-data/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">MTN Night Data</h3>
              <p className="text-sm text-slate-600 mt-2">Review currently listed night-data value on MTN.</p>
            </Link>
            <Link to="/ussd-codes-south-africa/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">USSD Codes Directory</h3>
              <p className="text-sm text-slate-600 mt-2">Check balances and buy bundles quickly via USSD.</p>
            </Link>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:col-span-2">
              <h3 className="font-black text-slate-900">Related Guides</h3>
              <ul className="text-sm mt-2 space-y-2">
                <li><Link to="/guides/cheapest-data-south-africa/" className="text-[#1b6d24] hover:underline">Cheapest Data South Africa</Link></li>
                <li><Link to="/guides/best-data-deals-south-africa/" className="text-[#1b6d24] hover:underline">Best Data Deals South Africa</Link></li>
                <li><Link to="/guides/cheapest-1gb-data-south-africa/" className="text-[#1b6d24] hover:underline">Cheapest 1GB Data South Africa</Link></li>
                <li><Link to="/guides/how-to-check-data-balance/" className="text-[#1b6d24] hover:underline">How to Check Data Balance</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Is Vodacom or MTN cheaper for data right now?</h3>
              <p className="text-sm text-slate-600">{cheaperNow} is currently cheaper on the lowest listed cost-per-GB in this comparison dataset.</p>
              <p className="text-sm text-slate-600 mt-2">Actual checkout pricing can differ by account-specific promotions and campaign windows.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Which network gives better value overall: Vodacom or MTN?</h3>
              <p className="text-sm text-slate-600">{betterValueNow} currently offers one of the stronger overall value profiles in this comparison dataset.</p>
              <p className="text-sm text-slate-600 mt-2">If your local coverage is better on the other network, that may still be the smarter choice for you.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Should prepaid users choose Vodacom or MTN?</h3>
              <p className="text-sm text-slate-600">Choose based on coverage first, then compare current prepaid and promo bundles side by side.</p>
              <p className="text-sm text-slate-600 mt-2">USSD and app-specific offers can materially change value week to week.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <Link
            to="/guides/cheapest-data-south-africa/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#031636] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#1b6d24] transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Compare All Cheapest Data
          </Link>
          <p className="mt-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
            Broader cross-network comparison
          </p>
        </section>
      </main>
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};



