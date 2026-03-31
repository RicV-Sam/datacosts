import React from 'react';
import { bundles } from '../data';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { ArrowLeft, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigateFunction } from '../types';
import { networkPages } from '../data/networks';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface CheapestDataProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const NETWORK_ORDER: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];

const isMonthlyBundle = (bundle: { validity: string; type: string }) => {
  const validity = bundle.validity.toLowerCase();
  return bundle.type === 'Monthly' || validity.includes('30 day') || validity.includes('month');
};

const isUnlimited = (bundle: { name: string; volume: string }) =>
  bundle.name.toLowerCase().includes('unlimited') || bundle.volume.toLowerCase().includes('unlimited');

export const CheapestData: React.FC<CheapestDataProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cheapest Data in South Africa (2026) | Compare MTN, Vodacom, Telkom & More';
  const metaDescription =
    'Looking for the cheapest data in South Africa? Compare MTN, Vodacom, Telkom, Cell C and Rain to see which network gives the best value right now.';
  const canonicalUrl = toCanonicalUrl('/guides/cheapest-data-south-africa/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const valueSorted = [...bundles]
    .filter((bundle) => bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb);

  const topComparisonRows = valueSorted.slice(0, 8);
  const cheapestOverall = [...bundles].sort((a, b) => a.price - b.price)[0];
  const bestValue = valueSorted[0];
  const cheapest1Gb = bundles.filter((bundle) => bundle.volume === '1GB').sort((a, b) => a.price - b.price)[0];
  const cheapest10Gb = bundles.filter((bundle) => bundle.volume === '10GB').sort((a, b) => a.price - b.price)[0];
  const cheapestUnlimited = bundles.filter((bundle) => isUnlimited(bundle)).sort((a, b) => a.price - b.price)[0];
  const bestMonthly = valueSorted.filter((bundle) => isMonthlyBundle(bundle))[0];
  const bestDaily = [...bundles]
    .filter((bundle) => bundle.validity.toLowerCase().includes('day') && !bundle.validity.toLowerCase().includes('30 day') && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const networkSummary = NETWORK_ORDER.map((networkName) => {
    const networkBundles = bundles.filter((bundle) => bundle.network === networkName);
    const cheapest = [...networkBundles].sort((a, b) => a.price - b.price)[0];
    const bestNetworkValue = [...networkBundles]
      .filter((bundle) => bundle.costPerGb > 0)
      .sort((a, b) => a.costPerGb - b.costPerGb)[0];
    const networkSlug = Object.values(networkPages).find((page) => page.networkName === networkName)?.slug || '';

    return {
      networkName,
      networkSlug,
      cheapest,
      bestNetworkValue
    };
  });

  const faqItems = [
    {
      question: 'Which network has the cheapest data in South Africa?',
      answer: cheapestOverall
        ? `${cheapestOverall.network} currently has one of the lowest upfront options in this dataset with ${cheapestOverall.name} at R${cheapestOverall.price}.`
        : 'The cheapest network changes by promotion cycle and bundle type.'
    },
    {
      question: 'Is Telkom cheaper than Vodacom for data?',
      answer: 'Telkom is often cheaper on cost-per-GB benchmarks, while Vodacom is often chosen for coverage consistency and reliability in more areas.'
    },
    {
      question: 'What is the cheapest prepaid data in South Africa?',
      answer: bestValue
        ? `${bestValue.network} currently shows one of the strongest prepaid value points in this dataset at about R${bestValue.costPerGb.toFixed(2)}/GB.`
        : 'Cheapest prepaid value depends on current promos and validity terms.'
    },
    {
      question: 'Is unlimited data worth it?',
      answer: 'Unlimited data can be worth it for heavy users, but only when your area has stable coverage and the policy terms match your usage expectations.'
    },
    {
      question: 'What is better value: daily or monthly data?',
      answer: 'For regular users, monthly often gives better value over time. Daily can be practical for occasional use but can become expensive if repeated through the month.'
    },
    {
      question: 'How can I buy cheap data without using the app?',
      answer: 'Use USSD menus to compare and buy bundles directly from your phone. The USSD codes page gives operator-specific buy and balance shortcuts.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const relatedPages = [
    '/guides/best-data-deals-south-africa/',
    '/guides/airtime-data-saving-tips-south-africa/',
    '/guides/cheapest-1gb-data-south-africa/',
    '/guides/cheapest-10gb-data-south-africa/',
    '/guides/cheapest-unlimited-data-south-africa/',
    '/guides/cheapest-whatsapp-bundles-south-africa/',
    '/guides/vodacom-vs-mtn-data-prices/',
    '/guides/how-to-check-data-balance/',
    '/network/',
    '/methodology/',
    '/editorial-policy/'
  ];

  const relatedLabels: Record<string, string> = {
    '/guides/best-data-deals-south-africa/': 'Best Data Deals South Africa',
    '/guides/airtime-data-saving-tips-south-africa/': 'Airtime & Data Saving Tips South Africa',
    '/guides/cheapest-1gb-data-south-africa/': 'Cheapest 1GB Data South Africa',
    '/guides/cheapest-10gb-data-south-africa/': 'Cheapest 10GB Data South Africa',
    '/guides/cheapest-unlimited-data-south-africa/': 'Cheapest Unlimited Data South Africa',
    '/guides/cheapest-whatsapp-bundles-south-africa/': 'Cheapest WhatsApp Bundles South Africa',
    '/guides/vodacom-vs-mtn-data-prices/': 'Vodacom vs MTN Data Prices',
    '/guides/how-to-check-data-balance/': 'How to Check Data Balance',
    '/network/': 'Network Comparison Hub',
    '/methodology/': 'Methodology',
    '/editorial-policy/': 'Editorial Policy'
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
          <Link to="/" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Updated {lastUpdated}</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Cheapest Data in <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            Use this flagship comparison page to find the cheapest prepaid data in South Africa and decide which network actually gives the best value for your usage.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapestOverall
              ? `${cheapestOverall.network} currently shows one of the lowest upfront bundle prices in this dataset with ${cheapestOverall.name} at R${cheapestOverall.price}.`
              : 'The cheapest upfront option changes frequently as promotions rotate.'}{' '}
            {bestValue
              ? `${bestValue.network} currently shows one of the strongest cost-per-GB value points at about R${bestValue.costPerGb.toFixed(2)}/GB.`
              : 'Best value depends on current bundle validity and network promos.'}
          </p>
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Which network has the cheapest data?</h2>
          <p className="text-slate-700 leading-relaxed">
            There is no permanent winner every month. Telkom often leads on low cost-per-GB, MTN often performs strongly on promo-driven value, Vodacom is often chosen for coverage consistency, Cell C can be highly competitive on selected promos, and Rain can suit high-usage users when coverage fits.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest data comparison table</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left min-w-[760px]">
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
                {topComparisonRows.map((bundle) => (
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
        </section>

        <AdUnit type="inContent" />

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest data by user type</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black mb-2">Light users (chat and browsing)</h3>
              <p className="text-slate-700">Start with 1GB and short-validity bundles, then compare whether weekly options are cheaper than repeated daily purchases.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Regular prepaid users</h3>
              <p className="text-slate-700">Monthly bundles often deliver better overall value than constant top-ups. Focus on cost per GB plus realistic usage fit.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Heavy data users</h3>
              <p className="text-slate-700">Compare 10GB and unlimited options, and prioritize stable coverage in your area before chasing headline discounts.</p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Cheapest 1GB, 10GB and Unlimited Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <h3 className="font-black mb-2">Cheapest 1GB</h3>
              <p className="text-sm text-slate-700">{cheapest1Gb ? `${cheapest1Gb.network}: ${cheapest1Gb.name} (R${cheapest1Gb.price})` : 'Check the 1GB guide for current options.'}</p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <h3 className="font-black mb-2">Cheapest 10GB</h3>
              <p className="text-sm text-slate-700">{cheapest10Gb ? `${cheapest10Gb.network}: ${cheapest10Gb.name} (R${cheapest10Gb.price})` : 'Check the 10GB guide for current options.'}</p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <h3 className="font-black mb-2">Cheapest Unlimited</h3>
              <p className="text-sm text-slate-700">{cheapestUnlimited ? `${cheapestUnlimited.network}: ${cheapestUnlimited.name} (R${cheapestUnlimited.price})` : 'Check the unlimited guide for current options.'}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Is the cheapest data always the best value?</h2>
          <p className="text-slate-700 leading-relaxed">
            Not always. The cheapest upfront bundle can still be expensive over a month if validity is short. In many cases, monthly bundles with a slightly higher upfront price give better value per GB.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
              <h3 className="font-black mb-1">Daily benchmark</h3>
              <p className="text-sm text-slate-700">{bestDaily ? `${bestDaily.network}: ~R${bestDaily.costPerGb.toFixed(2)}/GB` : 'Varies by network and promo'}</p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
              <h3 className="font-black mb-1">Monthly benchmark</h3>
              <p className="text-sm text-slate-700">{bestMonthly ? `${bestMonthly.network}: ~R${bestMonthly.costPerGb.toFixed(2)}/GB` : 'Varies by network and promo'}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">How to find the cheapest data for your needs</h2>
          <ol className="space-y-3 text-slate-700">
            <li><strong>1.</strong> Shortlist two networks with reliable coverage where you live and work.</li>
            <li><strong>2.</strong> Compare 1GB, 10GB, monthly and unlimited options for your usage profile.</li>
            <li><strong>3.</strong> Check USSD/app promos before checkout because live deals can beat standard menu pricing.</li>
            <li><strong>4.</strong> Avoid out-of-bundle leakage by checking balance and expiry regularly.</li>
          </ol>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Network snapshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkSummary.map((network) => (
              <div key={network.networkName} className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
                <h3 className="font-black mb-2">{network.networkName}</h3>
                <p className="text-sm text-slate-700">Cheapest listed: {network.cheapest ? `${network.cheapest.name} (R${network.cheapest.price})` : 'N/A'}</p>
                <p className="text-sm text-slate-700 mt-1">Best value listed: {network.bestNetworkValue ? `${network.bestNetworkValue.name} (~R${network.bestNetworkValue.costPerGb.toFixed(2)}/GB)` : 'N/A'}</p>
                {network.networkSlug ? (
                  <Link to={`/network/${network.networkSlug}/`} className="inline-block mt-3 text-sm font-bold text-[#1b6d24] hover:underline">
                    View {network.networkName} network page
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            Methodology and trust
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>Independent analysis:</strong> DataCost compares publicly listed bundle prices, validity terms, and cost-per-GB values across major South African operators.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Prices may change:</strong> Promotions and personalized offers can update frequently, so always verify final terms with the operator before buying.
          </p>
          <p className="text-slate-700 mt-3">
            See our <Link to="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</Link> and <Link to="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</Link>.
          </p>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1b6d24]" />
            Related guides and comparison pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedPages.map((href) => (
              <Link key={href} to={href} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#1b6d24] transition-colors">
                <div className="font-bold text-slate-900">{relatedLabels[href]}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#1b6d24]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};



