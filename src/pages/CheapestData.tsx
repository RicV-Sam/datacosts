import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';
import { bundles } from '../data';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { NavigateFunction, Bundle } from '../types';
import { buildBundleItemListSchema, getNetworkPageUrl } from '../utils/structuredData';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface CheapestDataProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const isNightBundle = (bundle: Bundle) =>
  bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== '');

const isSocialBundle = (bundle: Bundle) =>
  bundle.type === 'Social' ||
  bundle.name.toLowerCase().includes('whatsapp') ||
  bundle.name.toLowerCase().includes('social');

const isDailyBundle = (bundle: Bundle) =>
  bundle.type === 'Daily' ||
  (bundle.validity.toLowerCase().includes('day') &&
    !bundle.validity.toLowerCase().includes('7 day') &&
    !bundle.validity.toLowerCase().includes('30 day'));

const isMonthlyBundle = (bundle: Bundle) =>
  bundle.type === 'Monthly' ||
  bundle.type === 'Prepaid' ||
  bundle.validity.toLowerCase().includes('30 day') ||
  bundle.validity.toLowerCase().includes('month');

const regularBundles = bundles.filter((bundle) => !isNightBundle(bundle) && !isSocialBundle(bundle));
const rankedBundles = regularBundles.filter((bundle) => bundle.costPerGb > 0).sort((a, b) => a.costPerGb - b.costPerGb);

function getCheapestByVolume(volume: string) {
  return regularBundles
    .filter((bundle) => bundle.volume === volume)
    .sort((a, b) => a.price - b.price)[0];
}

function getBestValueByFilter(filter: (bundle: Bundle) => boolean) {
  return regularBundles
    .filter((bundle) => filter(bundle) && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
}

export const CheapestData: React.FC<CheapestDataProps> = ({ onNavigate, onScrollTo }) => {
  const canonicalUrl = toCanonicalUrl('/guides/cheapest-data-south-africa/');
  const dateModifiedIso = getRouteModifiedIso('/guides/cheapest-data-south-africa/');
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);
  const pageTitle = 'Cheapest Data South Africa (2026)';
  const metaDescription =
    'Compare the cheapest data in South Africa by 1GB, 2GB, 5GB, 10GB, daily, monthly, and night-data intent using DataCost’s dataset-backed prepaid comparison.';

  const topSummaryRows = rankedBundles.slice(0, 8);
  const cheapest1Gb = getCheapestByVolume('1GB');
  const cheapest2Gb = getCheapestByVolume('2GB');
  const cheapest5Gb = getCheapestByVolume('5GB');
  const cheapest10Gb = getCheapestByVolume('10GB');
  const cheapestDaily = getBestValueByFilter((bundle) => isDailyBundle(bundle) && !isNightBundle(bundle));
  const cheapestMonthly = getBestValueByFilter((bundle) => isMonthlyBundle(bundle) && !isNightBundle(bundle));
  const cheapestNight = bundles
    .filter((bundle) => isNightBundle(bundle) && bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const intentSections = [
    {
      id: 'cheapest-1gb',
      title: 'Cheapest 1GB data',
      bundle: cheapest1Gb,
      href: '/guides/cheapest-1gb-data-south-africa/',
      helper: 'Best for low-volume monthly use or single-device top-ups.'
    },
    {
      id: 'cheapest-2gb',
      title: 'Cheapest 2GB data',
      bundle: cheapest2Gb,
      href: '/guides/cheapest-2gb-data-south-africa/',
      helper: 'Useful when 1GB is too small but you still need to keep spend tight.'
    },
    {
      id: 'cheapest-5gb',
      title: 'Cheapest 5GB data',
      bundle: cheapest5Gb,
      href: '/guides/cheapest-5gb-data-south-africa/',
      helper: 'A common mid-range benchmark for moderate prepaid usage.'
    },
    {
      id: 'cheapest-10gb',
      title: 'Cheapest 10GB data',
      bundle: cheapest10Gb,
      href: '/guides/cheapest-10gb-data-south-africa/',
      helper: 'A strong indicator of mainstream monthly value for regular users.'
    },
    {
      id: 'cheapest-daily-data',
      title: 'Cheapest daily data',
      bundle: cheapestDaily,
      href: '',
      helper: 'Daily bundles can keep upfront spend low, but repeating them through the month often costs more overall.'
    },
    {
      id: 'cheapest-monthly-data',
      title: 'Cheapest monthly data',
      bundle: cheapestMonthly,
      href: '/guides/best-monthly-data-deals-south-africa/',
      helper: 'Monthly options usually offer a better long-term cost per GB than repeated short-validity top-ups.'
    },
    {
      id: 'cheapest-night-data',
      title: 'Cheapest night data',
      bundle: cheapestNight,
      href: '/guides/cheap-night-data-south-africa/',
      helper: 'Night bundles can be strong value when downloads happen in off-peak hours only.'
    }
  ];

  const faqItems = [
    {
      question: 'Which network has the cheapest data in South Africa right now?',
      answer:
        topSummaryRows[0]
          ? `${topSummaryRows[0].network} currently leads this visible dataset-backed value table with ${topSummaryRows[0].name} at about R${topSummaryRows[0].costPerGb.toFixed(2)}/GB.`
          : 'The leading network changes as the visible dataset changes.'
    },
    {
      question: 'Is the cheapest data always the best option?',
      answer:
        'Not always. The lowest upfront price can still be poor value if validity is short or coverage does not fit your real usage pattern.'
    },
    {
      question: 'Do personalised offers beat standard bundle prices?',
      answer:
        'Sometimes, yes. Operator-specific personalised or app-only offers can be cheaper than baseline public prices, but they are not universal and may differ by SIM, history, or campaign.'
    },
    {
      question: 'How should I compare data prices fairly?',
      answer:
        'Compare volume, validity, cost per GB, and whether the bundle matches your actual usage pattern. Do not compare a short-validity promo directly with a 30-day bundle without accounting for repeat purchases.'
    }
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: toCanonicalUrl('/guides/') },
      { '@type': 'ListItem', position: 3, name: 'Cheapest Data in South Africa', item: canonicalUrl }
    ]
  };

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

  const itemListSchema = buildBundleItemListSchema(
    'Cheapest Data South Africa Summary',
    canonicalUrl,
    topSummaryRows,
    (bundle) => getNetworkPageUrl(bundle.network)
  );

  const relatedPages = [
    '/guides/best-data-deals-south-africa/',
    '/guides/cheapest-1gb-data-south-africa/',
    '/guides/cheapest-2gb-data-south-africa/',
    '/guides/cheapest-5gb-data-south-africa/',
    '/guides/cheapest-10gb-data-south-africa/',
    '/guides/cheap-night-data-south-africa/',
    '/guides/best-monthly-data-deals-south-africa/',
    '/guides/how-to-check-data-balance/',
    '/ussd-codes-south-africa/',
    '/network/',
    '/methodology/'
  ];

  const relatedLabels: Record<string, string> = {
    '/guides/best-data-deals-south-africa/': 'Best Data Deals South Africa',
    '/guides/cheapest-1gb-data-south-africa/': 'Cheapest 1GB Data South Africa',
    '/guides/cheapest-2gb-data-south-africa/': 'Cheapest 2GB Data South Africa',
    '/guides/cheapest-5gb-data-south-africa/': 'Cheapest 5GB Data South Africa',
    '/guides/cheapest-10gb-data-south-africa/': 'Cheapest 10GB Data South Africa',
    '/guides/cheap-night-data-south-africa/': 'Cheap Night Data South Africa',
    '/guides/best-monthly-data-deals-south-africa/': 'Best Monthly Data Deals South Africa',
    '/guides/how-to-check-data-balance/': 'How to Check Data Balance',
    '/ussd-codes-south-africa/': 'USSD Codes South Africa',
    '/network/': 'Network Comparison Hub',
    '/methodology/': 'Methodology'
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
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
        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.92]">
            Cheapest Data in <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            Compare the cheapest data by common search intent, including 1GB, 2GB, 5GB, 10GB, daily data, monthly data, and night data. Every price reference on this page comes from the current local DataCost dataset.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Top comparison summary</h2>
          <p className="text-slate-700 leading-relaxed mb-5">
            This summary table ranks the visible non-social, non-night bundles on this page by cost per GB. It is a comparison aid, not a claim that personalised operator offers are universally available to every user.
          </p>
          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[720px] text-left bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Rank</th>
                  <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Bundle</th>
                  <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Validity</th>
                  <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topSummaryRows.map((bundle, index) => (
                  <tr key={bundle.id}>
                    <td className="px-5 py-4 font-black text-slate-900">{index + 1}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{bundle.network}</td>
                    <td className="px-5 py-4 text-slate-700">{bundle.name}</td>
                    <td className="px-5 py-4 text-slate-700">R{bundle.price}</td>
                    <td className="px-5 py-4 text-slate-700">{bundle.validity}</td>
                    <td className="px-5 py-4 text-slate-700">~R{bundle.costPerGb.toFixed(2)}/GB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            {cheapestMonthly
              ? `${cheapestMonthly.network} currently leads the monthly-style value view on this page with ${cheapestMonthly.name} at about R${cheapestMonthly.costPerGb.toFixed(2)}/GB. `
              : 'Monthly value depends on the visible dataset. '}
            {cheapestDaily
              ? `${cheapestDaily.network} currently leads the daily-value view with ${cheapestDaily.name}. `
              : 'Daily value depends on the visible dataset. '}
            The best answer depends on whether you need the cheapest short-term top-up, the lowest monthly cost per GB, or a night-data bundle for off-peak use.
          </p>
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-10 space-y-5">
          {intentSections.map((section) => (
            <article key={section.id} id={section.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight mb-3">{section.title}</h2>
              <p className="text-slate-700 leading-relaxed mb-4">{section.helper}</p>
              {section.bundle ? (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current dataset view</div>
                  <div className="font-black text-slate-900 text-lg">{section.bundle.network}: {section.bundle.name}</div>
                  <p className="text-slate-700 mt-2">
                    Price: <strong>R{section.bundle.price}</strong> | Validity: <strong>{section.bundle.validity}</strong> | Approx. value:{' '}
                    <strong>R{section.bundle.costPerGb.toFixed(2)}/GB</strong>
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-slate-700">
                  This category is intentionally left descriptive here until a clear dataset-backed winner is available.
                </div>
              )}
              {section.href ? (
                <Link to={section.href} className="inline-block mt-4 text-sm font-bold text-[#1b6d24] hover:underline">
                  Open dedicated guide
                </Link>
              ) : null}
            </article>
          ))}
        </section>

        <AdUnit type="inContent" />

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Best for different user types</h2>
          <div className="space-y-4">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Best for ultra-light users</h3>
              <p className="text-slate-700 leading-relaxed">Start with the 1GB and 2GB views, then compare whether a short-validity bundle or a small monthly bundle fits your real usage better.</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Best for regular prepaid users</h3>
              <p className="text-slate-700 leading-relaxed">Focus on monthly bundles and overall cost per GB rather than the cheapest one-day top-up.</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Best for heavy users</h3>
              <p className="text-slate-700 leading-relaxed">The 10GB and larger monthly bundles usually matter more than the cheapest small bundle headline.</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Best for night-download users</h3>
              <p className="text-slate-700 leading-relaxed">Use the night-data section and dedicated night guide rather than comparing it directly with daytime anytime bundles.</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Best for coverage-first buyers</h3>
              <p className="text-slate-700 leading-relaxed">Low price is only part of the decision. Always balance value against network reliability where you actually use your phone.</p>
            </article>
          </div>
        </section>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            Methodology and pricing notes
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>Dataset-backed only:</strong> this page uses the visible DataCost bundle dataset as its price reference layer. It is intended to compare public baseline bundle pricing already captured in the site data.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Public vs personalised pricing:</strong> operator-specific personalised offers, app-only promotions, and USSD campaign deals may be cheaper for some users, but they are not guaranteed across all SIMs. For that reason, they are not treated here as universal baseline pricing unless clearly represented in the dataset.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            Before purchase, verify the final bundle on the operator side and use the <Link to="/ussd-codes-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">USSD codes hub</Link> or <Link to="/network/" className="text-[#1b6d24] font-semibold hover:underline">network comparison hub</Link> for the next step.
          </p>
        </section>

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
              <article key={faq.question} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
