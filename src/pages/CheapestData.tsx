import React from 'react';
import { bundles } from '../data';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { ArrowLeft, ShieldCheck, HelpCircle, CalendarClock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigateFunction } from '../types';
import { networkPages } from '../data/networks';

interface CheapestDataProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const CheapestData: React.FC<CheapestDataProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cheapest Data in South Africa (2026) - Price Comparison | DataCost';
  const metaDescription =
    'Compare the cheapest mobile data bundles in South Africa. We analyze MTN, Vodacom, Telkom, Cell C and Rain to find the best cost per GB.';
  const canonicalUrl = 'https://datacost.co.za/guides/cheapest-data-south-africa/';

  const sortedBundles = [...bundles].sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const networkOrder: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];

  const networkSummaries = networkOrder.map((networkName) => {
    const networkBundles = bundles.filter((bundle) => bundle.network === networkName);
    const sortedByPrice = [...networkBundles].sort((a, b) => a.price - b.price);
    const prices = sortedByPrice.map((bundle) => bundle.price);
    const validities = [...new Set(networkBundles.map((bundle) => bundle.validity))];
    const costPerGbValues = networkBundles.map((bundle) => bundle.costPerGb).filter((value) => value > 0);
    const minCostPerGb = costPerGbValues.length > 0 ? Math.min(...costPerGbValues) : null;
    const networkSlug = Object.values(networkPages).find((page) => page.networkName === networkName)?.slug || '';

    return {
      networkName,
      networkSlug,
      lowestPrice: prices[0] ?? null,
      highestPrice: prices[prices.length - 1] ?? null,
      validities: validities.slice(0, 3),
      minCostPerGb
    };
  });

  const bestValueNetwork = [...networkSummaries]
    .filter((summary) => summary.minCostPerGb !== null)
    .sort((a, b) => (a.minCostPerGb ?? Number.POSITIVE_INFINITY) - (b.minCostPerGb ?? Number.POSITIVE_INFINITY))[0];
  const cheapestOverall = sortedBundles.find((bundle) => bundle.costPerGb > 0);
  const cheapest1Gb = bundles
    .filter((bundle) => bundle.volume === '1GB')
    .sort((a, b) => a.price - b.price)[0];
  const cheapestMonthly = bundles
    .filter((bundle) => bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month'))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const cheapestNight = bundles
    .filter((bundle) => bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== ''))
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const cheapestPrepaid = bundles
    .filter((bundle) => bundle.type === 'Prepaid')
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const bestNetworkReasoning: Record<string, string> = {
    Telkom:
      'Telkom currently shows one of the lowest cost-per-GB levels in this dataset, with strong value on larger prepaid bundles and competitive monthly pricing.',
    MTN:
      'MTN currently performs strongly on blended value: broad coverage plus competitive bundle pricing, especially on popular monthly options.',
    Vodacom:
      'Vodacom is not always the cheapest on headline price, but is often chosen for consistency and network performance in more areas.',
    'Cell C':
      'Cell C can be cost-effective on selected monthly bundles and is often a practical budget alternative for moderate users.',
    Rain:
      'Rain is best considered separately: it can be a strong option for users specifically looking for high-volume or unlimited usage.'
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the cheapest data in South Africa right now?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": cheapestOverall
            ? `${cheapestOverall.network} currently has the lowest cost-per-GB in this comparison, with ${cheapestOverall.name} at R${cheapestOverall.price} (about R${cheapestOverall.costPerGb.toFixed(2)}/GB).`
            : "Telkom currently leads on price-per-GB in our latest comparison dataset."
        }
      },
      {
        "@type": "Question",
        "name": "Which network offers the best value for data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${bestValueNetwork?.networkName ?? 'Telkom'} offers the strongest overall value right now based on current cost-per-GB across active bundles.`
        }
      },
      {
        "@type": "Question",
        "name": "What is the cheapest 1GB data bundle right now?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": cheapest1Gb
            ? `${cheapest1Gb.network} currently has the cheapest 1GB option in this dataset: ${cheapest1Gb.name} at R${cheapest1Gb.price}.`
            : "Telkom is typically the cheapest for standard 1GB bundles, with MTN often close on promotions."
        }
      },
      {
        "@type": "Question",
        "name": "Is prepaid data cheaper than contract in South Africa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In many cases, yes. Prepaid can be cheaper, especially when you use personalised or promotional bundles and avoid out-of-bundle rates."
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
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
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
            Cheapest Data in <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Our comprehensive comparison of mobile data prices across all major South African networks. We focus on the <span className="font-bold">effective cost per GB</span> to help you save money.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapestOverall
              ? `In this current comparison dataset, the lowest listed cost per GB is on ${cheapestOverall.network}'s ${cheapestOverall.name} at R${cheapestOverall.price}, about R${cheapestOverall.costPerGb.toFixed(2)}/GB.`
              : 'In this current comparison dataset, Telkom is currently one of the strongest price-per-GB options.'}{' '}
            {bestValueNetwork
              ? `${bestValueNetwork.networkName} currently offers one of the strongest overall value profiles when balancing price-per-GB and practical bundle options.`
              : 'Telkom currently offers a strong overall value profile in this dataset.'}{' '}
            Check your coverage first, then compare 1GB, monthly, and promo options before buying.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Pricing and promos can change quickly by network and account type. We use currently listed bundles, but final offer details should always be confirmed on the operator page.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Direct Answer Summary</h2>
          <div className="space-y-4">
            <p className="text-slate-700">
              <span className="font-black text-slate-900">What is the cheapest data in South Africa right now?</span>{' '}
              {cheapestOverall
                ? `${cheapestOverall.network} currently has the lowest listed cost-per-GB in this comparison with ${cheapestOverall.name} at R${cheapestOverall.price} (about R${cheapestOverall.costPerGb.toFixed(2)}/GB).`
                : 'Telkom currently has one of the lowest listed cost-per-GB levels in this comparison.'}
            </p>
            <p className="text-slate-700">
              <span className="font-black text-slate-900">Which network offers the best value?</span>{' '}
              {bestValueNetwork?.networkName ?? 'Telkom'} currently offers one of the strongest value profiles in this dataset based on cost-per-GB and available bundle mix.
            </p>
          </div>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <CalendarClock className="w-5 h-5 text-[#1b6d24] mt-0.5" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Last Updated</h2>
              <p className="text-slate-600 text-sm mt-1">
                {lastUpdated}. This page is rebuilt from the same bundle dataset used across our network and guide pages. When pricing data changes, this comparison updates with the next production build.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest Data by Use Case</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Cheapest 1GB</h3>
              <p className="text-slate-700">
                {cheapest1Gb ? `${cheapest1Gb.network} - ${cheapest1Gb.name} (R${cheapest1Gb.price}).` : 'Telkom is usually the cheapest starting point for 1GB bundles.'}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Cheapest Monthly Data</h3>
              <p className="text-slate-700">
                {cheapestMonthly
                  ? `${cheapestMonthly.network} - ${cheapestMonthly.name} (R${cheapestMonthly.price}, ~R${cheapestMonthly.costPerGb.toFixed(2)}/GB).`
                  : 'Telkom and MTN are usually the most competitive on monthly value.'}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Cheapest Night Data</h3>
              <p className="text-slate-700">
                {cheapestNight
                  ? `${cheapestNight.network} - ${cheapestNight.name} (R${cheapestNight.price}, ~R${cheapestNight.costPerGb.toFixed(2)}/GB).`
                  : 'MTN and Vodacom usually lead for mainstream night-data options.'}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
              <h3 className="font-black text-slate-900 mb-2">Cheapest Prepaid Option</h3>
              <p className="text-slate-700">
                {cheapestPrepaid
                  ? `${cheapestPrepaid.network} - ${cheapestPrepaid.name} (R${cheapestPrepaid.price}, ~R${cheapestPrepaid.costPerGb.toFixed(2)}/GB).`
                  : 'Telkom and Cell C are typically the best prepaid value starting points.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Major Network Comparison (At a Glance)</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Typical Price Range</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Common Validity</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Lowest Cost/GB Seen</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Explore</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {networkSummaries.map((summary) => (
                  <tr key={summary.networkName} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{summary.networkName}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {summary.lowestPrice !== null && summary.highestPrice !== null
                        ? summary.lowestPrice === summary.highestPrice
                          ? `R${summary.lowestPrice}`
                          : `R${summary.lowestPrice} - R${summary.highestPrice}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {summary.validities.length > 0 ? summary.validities.join(', ') : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a0f399]/20 text-[#217128]">
                        {summary.minCostPerGb !== null ? `From about R${summary.minCostPerGb.toFixed(2)}/GB` : 'Unlimited-plan pricing model'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/network/${summary.networkSlug}/`} className="text-sm font-bold text-[#1b6d24] hover:underline">
                        View {summary.networkName}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Pricing ranges shown here are based on currently listed bundles in our live comparison dataset.
          </p>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Value Right Now (Based on Current Listed Bundles)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
                Current Best-Value Pick: {bestValueNetwork?.networkName ?? 'Telkom'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {bestNetworkReasoning[bestValueNetwork?.networkName ?? 'Telkom']}
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                If your priority is pure price-per-GB, start with {bestValueNetwork?.networkName ?? 'Telkom'}.
                If your priority is coverage consistency, compare that against MTN and Vodacom before buying.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3">Practical Next Step</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>1. Pick your top 2 networks based on coverage where you live/work.</li>
                <li>2. Compare their monthly and 1GB bundle pages directly.</li>
                <li>3. Check USSD/app promos before final purchase.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Detailed Bundle Snapshot</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Bundle Name</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sortedBundles.map(bundle => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-600">{bundle.name}</td>
                    <td className="px-6 py-4 font-black">R{bundle.price}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a0f399]/20 text-[#217128]">
                        R{bundle.costPerGb?.toFixed(2)}/GB
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            How We Compare Data Prices
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We compare published bundle prices, validity periods, and effective cost per GB by category so you can make like-for-like decisions instead of comparing marketing labels.
          </p>
          <Link to="/methodology/" className="font-bold text-[#1b6d24] hover:underline">
            Read full methodology
          </Link>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Where To Go Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/network/telkom/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Telkom Network Page</h3>
              <p className="text-sm text-slate-600 mt-2">Deep dive on current Telkom prices and value categories.</p>
            </Link>
            <Link to="/network/mtn/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">MTN Network Page</h3>
              <p className="text-sm text-slate-600 mt-2">Compare MTN monthly, 1GB, and promo-friendly options.</p>
            </Link>
            <Link to="/network/telkom/1gb/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Best 1GB Bundles</h3>
              <p className="text-sm text-slate-600 mt-2">Shortcut to 1GB category pricing where budget users often start.</p>
            </Link>
            <Link to="/network/mtn/monthly-data/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">Monthly Data Deals</h3>
              <p className="text-sm text-slate-600 mt-2">Compare month-length bundles for regular monthly usage.</p>
            </Link>
            <Link to="/ussd-codes-south-africa/" className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-[#1b6d24] transition-colors">
              <h3 className="font-black text-slate-900">USSD Codes Directory</h3>
              <p className="text-sm text-slate-600 mt-2">Check balance and buy bundles instantly via short codes.</p>
            </Link>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-black text-slate-900">Related Guides</h3>
              <ul className="text-sm mt-2 space-y-2">
                <li><Link to="/guides/cheapest-1gb-data-south-africa/" className="text-[#1b6d24] hover:underline">Cheapest 1GB Data South Africa</Link></li>
                <li><Link to="/guides/best-data-deals-south-africa/" className="text-[#1b6d24] hover:underline">Best Data Deals South Africa</Link></li>
                <li><Link to="/guides/vodacom-vs-mtn-data-prices/" className="text-[#1b6d24] hover:underline">Vodacom vs MTN Data Prices</Link></li>
                <li><Link to="/guides/how-to-check-data-balance/" className="text-[#1b6d24] hover:underline">How to Check Data Balance</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest data in South Africa right now?</h3>
              <p className="text-sm text-slate-600">{cheapestOverall
                ? `${cheapestOverall.network} currently has the lowest listed cost-per-GB in this comparison.`
                : 'Telkom currently has one of the lowest listed cost-per-GB levels in this comparison.'}</p>
              <p className="text-sm text-slate-600 mt-2">Final pricing can differ by promotion window and account type, so confirm on the operator page before checkout.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Which network gives the best value for data in South Africa?</h3>
              <p className="text-sm text-slate-600">{bestValueNetwork?.networkName ?? 'Telkom'} currently offers one of the strongest overall value profiles in this dataset.</p>
              <p className="text-sm text-slate-600 mt-2">If you care more about coverage consistency than lowest price-per-GB, compare MTN and Vodacom side-by-side before deciding.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What is the cheapest 1GB data bundle right now?</h3>
              <p className="text-sm text-slate-600">{cheapest1Gb ? `${cheapest1Gb.network} currently has the lowest listed 1GB option here at R${cheapest1Gb.price}.` : 'Telkom is usually one of the strongest price benchmarks for 1GB.'}</p>
              <p className="text-sm text-slate-600 mt-2">For many users, 1GB is best for light WhatsApp and browsing. Heavy streaming usually needs a monthly plan instead.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Is prepaid data cheaper than contract in South Africa?</h3>
              <p className="text-sm text-slate-600">Often yes, especially when prepaid promos are available.</p>
              <p className="text-sm text-slate-600 mt-2">But real value depends on your usage pattern, coverage, and whether a contract includes extra benefits you actually use.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#031636] rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f399] blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Need USSD Codes?</h2>
            <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
              Check your balance or buy these bundles instantly using our verified USSD directory.
            </p>
            <Link
              to="/ussd-codes-south-africa/"
              className="inline-block px-8 py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#a0f399]/20"
            >
              View USSD Directory
            </Link>
          </div>
        </section>
      </main>
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
