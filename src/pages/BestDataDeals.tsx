import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, ShieldCheck, Tag, TrendingUp } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { bundles } from '../data';
import { NavigateFunction } from '../types';
import { networkPages } from '../data/networks';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface BestDataDealsProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const NETWORK_ORDER: Array<'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Rain'> = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];

const isMonthlyBundle = (validity: string, type: string) => {
  const normalized = validity.toLowerCase();
  return type === 'Monthly' || normalized.includes('30 day') || normalized.includes('month');
};

export const BestDataDeals: React.FC<BestDataDealsProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Data Deals South Africa (2026)';
  const metaDescription =
    'Compare the best data deals in South Africa for 2026. See the cheapest bundles, best prepaid options, and which network gives the best value right now.';
  const canonicalUrl = toCanonicalUrl('/guides/best-data-deals-south-africa/');
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const validValueBundles = bundles
    .filter((bundle) => bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb);

  const topDeals = validValueBundles.slice(0, 8);
  const cheapestOverall = [...bundles].sort((a, b) => a.price - b.price)[0];
  const bestPrepaidDeal = [...bundles]
    .filter((bundle) => bundle.type !== 'Contract' && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const bestMonthlyDeal = [...bundles]
    .filter((bundle) => isMonthlyBundle(bundle.validity, bundle.type) && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const rainBest = [...bundles]
    .filter((bundle) => bundle.network === 'Rain' && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const networkBreakdown = NETWORK_ORDER.map((networkName) => {
    const rows = bundles.filter((bundle) => bundle.network === networkName);
    const cheapest = [...rows].sort((a, b) => a.price - b.price)[0];
    const bestValue = [...rows]
      .filter((bundle) => bundle.costPerGb > 0)
      .sort((a, b) => a.costPerGb - b.costPerGb)[0];
    const networkSlug = Object.values(networkPages).find((page) => page.networkName === networkName)?.slug || '';

    return { networkName, cheapest, bestValue, networkSlug };
  });

  const faqItems = [
    {
      question: 'Which network has the cheapest data in South Africa?',
      answer: cheapestOverall
        ? `${cheapestOverall.network} currently shows one of the lowest upfront prices in this dataset with ${cheapestOverall.name} at R${cheapestOverall.price}.`
        : 'Cheapest upfront pricing changes regularly, so compare current listings before checkout.'
    },
    {
      question: 'What is the best prepaid data deal right now?',
      answer: bestPrepaidDeal
        ? `${bestPrepaidDeal.network} currently has one of the strongest prepaid value options with ${bestPrepaidDeal.name} at about R${bestPrepaidDeal.costPerGb.toFixed(2)}/GB.`
        : 'Best prepaid value depends on current promotions and your local coverage.'
    },
    {
      question: 'Is Telkom data cheaper than Vodacom?',
      answer: 'Telkom is often cheaper on cost per GB, while Vodacom is often chosen for coverage consistency. The right pick depends on your area and usage pattern.'
    },
    {
      question: 'Which network is best for monthly data bundles?',
      answer: bestMonthlyDeal
        ? `${bestMonthlyDeal.network} currently shows one of the strongest monthly value points in this dataset.`
        : 'For monthly bundles, compare cost per GB, renewal behavior, and validity terms before buying.'
    },
    {
      question: 'Is Rain worth it for data?',
      answer: rainBest
        ? `Rain can be worth it for high-usage users in covered areas. In this dataset, ${rainBest.name} is one of Rain's stronger value options.`
        : 'Rain can be a practical high-usage option, but value depends heavily on local coverage and usage style.'
    },
    {
      question: 'How can I buy data without the app?',
      answer: 'Use USSD menus to buy bundles, check balances, and top up directly from your phone. Start with the USSD directory to find the right network code.'
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
    { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data South Africa', description: 'Best low-volume benchmark.' },
    { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data South Africa', description: 'Medium-to-heavy usage comparison.' },
    { href: '/guides/cheapest-unlimited-data-south-africa/', label: 'Cheapest Unlimited Data South Africa', description: 'High-usage and uncapped alternatives.' },
    { href: '/guides/cheapest-whatsapp-bundles-south-africa/', label: 'Cheapest WhatsApp Bundles South Africa', description: 'Social-bundle comparison intent.' },
    { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'Vodacom vs MTN Data Prices', description: 'Head-to-head operator comparison.' },
    { href: '/network/', label: 'Network Comparison Hub', description: 'Browse all operator hub pages.' },
    { href: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa', description: 'Buy and balance shortcuts without the app.' },
    { href: '/methodology/', label: 'Methodology', description: 'How DataCost scores value and comparisons.' },
    { href: '/editorial-policy/', label: 'Editorial Policy', description: 'How we ensure independent coverage.' }
  ];

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
            Best <span className="text-[#1b6d24]">Data Deals</span> in South Africa (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            This flagship guide compares the strongest data deals in South Africa across MTN, Vodacom, Telkom, Cell C, and Rain. Use it as your decision page for cheapest upfront bundles, best prepaid value, and the best network fit for your usage.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {bestPrepaidDeal
              ? `${bestPrepaidDeal.network} currently shows one of the strongest overall prepaid value points in this dataset with ${bestPrepaidDeal.name} at about R${bestPrepaidDeal.costPerGb.toFixed(2)}/GB.`
              : 'The best deal changes by month, so compare by cost per GB, validity, and local coverage before buying.'}
          </p>
          <p className="text-sm text-slate-600 mt-3">
            If you want a fast shortlist, start with the top comparison table below, then jump to operator-specific sections and use-case picks.
          </p>
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Data Deals Comparison Table</h2>
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
                {topDeals.map((bundle) => (
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
          <p className="text-xs text-slate-500 mt-3">Last updated: {lastUpdated}</p>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Network-by-Network Best Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkBreakdown.map((row) => (
              <div key={row.networkName} className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-2">{row.networkName}</h3>
                <p className="text-sm text-slate-700">Cheapest listed: {row.cheapest ? `${row.cheapest.name} (R${row.cheapest.price})` : 'N/A'}.</p>
                <p className="text-sm text-slate-700 mt-1">Best value listed: {row.bestValue ? `${row.bestValue.name} (~R${row.bestValue.costPerGb.toFixed(2)}/GB)` : 'N/A'}.</p>
                {row.networkSlug ? (
                  <Link to={`/network/${row.networkSlug}/`} className="text-sm font-bold text-[#1b6d24] hover:underline mt-3 inline-block">
                    View {row.networkName} network page
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Cheapest Data Deals Right Now</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cheapest and best-value are not always the same. Cheapest focuses on lowest upfront Rand price, while best value focuses on cost per GB and practical validity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-black mb-2">Cheapest headline deal</h3>
              <p className="text-sm text-slate-700">
                {cheapestOverall
                  ? `${cheapestOverall.network} - ${cheapestOverall.name} at R${cheapestOverall.price}.`
                  : 'Cheapest headline deal is currently unavailable.'}
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-black mb-2">Best prepaid value deal</h3>
              <p className="text-sm text-slate-700">
                {bestPrepaidDeal
                  ? `${bestPrepaidDeal.network} - ${bestPrepaidDeal.name} at about R${bestPrepaidDeal.costPerGb.toFixed(2)}/GB.`
                  : 'Best prepaid value deal is currently unavailable.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best Data Deals by Use Case</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black mb-2">Best prepaid data deals for light users</h3>
              <p className="text-slate-700">Start with 1GB and short-validity comparisons, then check whether weekly or monthly bundles reduce your effective cost.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Best data deals for regular monthly users</h3>
              <p className="text-slate-700">Monthly bundles usually provide stronger value than repeated daily top-ups. Compare renewal behavior and local coverage before locking in.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Best data deals for heavy users</h3>
              <p className="text-slate-700">Check 10GB, unlimited, and high-volume monthly pages. Heavy users should prioritize stable coverage plus cost-per-GB over low headline promo prices.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Best data deals without using the app</h3>
              <p className="text-slate-700">Use USSD buy and balance menus to compare live offers directly from your phone. This is often the quickest way to confirm current deal availability.</p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-[#031636] text-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Which network has the best data deals?</h2>
          <p className="text-slate-200 leading-relaxed mb-4">
            There is no permanent winner every month. Telkom often leads on low cost-per-GB, MTN often performs strongly on promo-driven value, Vodacom is often chosen for coverage reliability, Cell C can be highly competitive on campaigns, and Rain can be useful for high-usage cases where coverage fits.
          </p>
          <p className="text-slate-300 text-sm">
            Use this page as the national benchmark, then verify final offers on each operator page before checkout.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            Methodology and trust
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>Independent analysis:</strong> DataCost compares publicly listed pricing, validity terms, and value-per-GB benchmarks across major South African operators.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Prices may change:</strong> Promotions and personalized offers can change quickly, so always verify final bundle terms with the operator before purchase.
          </p>
          <p className="text-slate-700 mt-4">
            Read our <Link to="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</Link> and <Link to="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</Link> for full transparency.
          </p>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1b6d24]" />
            Related comparison pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPages.map((page) => (
              <Link key={page.href} to={page.href} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-[#1b6d24] transition-colors">
                <h3 className="font-black text-slate-900">{page.label}</h3>
                <p className="text-sm text-slate-600 mt-2">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#1b6d24]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
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



