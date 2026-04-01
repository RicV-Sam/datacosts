import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, LifeBuoy, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { NavigateFunction } from '../types';
import { getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface FixProblemPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const troubleshootingLinks = [
  {
    to: '/guides/why-is-my-airtime-disappearing-south-africa/',
    title: 'Why is my airtime disappearing?',
    description: 'Find and stop the most common airtime drains.'
  },
  {
    to: '/guides/why-does-my-data-finish-so-fast-south-africa/',
    title: 'Why does my data finish so fast?',
    description: 'Fix hidden usage and out-of-bundle data loss.'
  },
  {
    to: '/guides/how-to-stop-wasp-vas-charges-south-africa/',
    title: 'How to stop WASP / VAS charges',
    description: 'Understand and block recurring premium deductions.'
  },
  {
    to: '/guides/stop-wasp-subscriptions-south-africa/',
    title: 'Stop WASP subscriptions',
    description: 'Follow network-by-network cancellation steps.'
  },
  {
    to: '/guides/how-to-check-data-balance/',
    title: 'How to check data balance',
    description: 'Verify your balance before buying another bundle.'
  },
  {
    to: '/ussd-codes-south-africa/',
    title: 'South Africa USSD codes hub',
    description: 'Quick codes for balance, bundles, and account help.'
  }
];

export const FixProblemPage: React.FC<FixProblemPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Fix Mobile Problems South Africa (2026) | DataCost';
  const metaDescription =
    'Fix airtime, data drain, and WASP subscription problems quickly. Use DataCost troubleshooting guides and USSD tools for South African mobile networks.';
  const canonicalUrl = toCanonicalUrl('/fix-mobile-problems/');
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/fix-mobile-problems/');

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fix Mobile Problems South Africa',
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Fix a Problem', item: canonicalUrl }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="fix-problem" />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <section className="mb-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] font-black uppercase tracking-widest mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            Mobile Troubleshooting
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-4">
            Fix a Mobile Problem Fast
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
            Start with the exact issue you are seeing. These are practical South African troubleshooting paths for airtime loss, data drain, USSD checks, and subscription problems.
          </p>
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-8 bg-[#031636] text-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-black tracking-tight mb-2">Quick Next Steps</h2>
          <p className="text-slate-200 text-sm leading-relaxed mb-4">
            If you are not sure where to start: first check your balance, then run a USSD check, then follow the WASP/data-drain guide that matches your issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/guides/how-to-check-data-balance/" className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#a0f399] px-4 text-sm font-black text-[#031636]">
              Check Data Balance
            </Link>
            <Link to="/ussd-codes-south-africa/" className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/30 px-4 text-sm font-black text-white">
              Open USSD Hub
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {troubleshootingLinks.map((item) => (
              <Link key={item.to} to={item.to} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-[#1b6d24] hover:shadow-md transition-all">
                <h3 className="font-black text-[#031636] text-lg tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#1b6d24]">
                  Open guide
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-12 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-black tracking-tight mb-3 inline-flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-[#1b6d24]" />
            Need to Compare Prices After Fixing?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Once your issue is resolved, compare fresh bundle pricing to avoid repeat airtime loss.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('network')}
              className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#031636] px-4 text-sm font-black text-white hover:bg-[#1b6d24] transition-colors"
            >
              Compare Data Prices
            </button>
            <button
              onClick={() => onScrollTo('calculator')}
              className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-200 px-4 text-sm font-black text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Use Data Calculator
            </button>
          </div>
        </section>

        <section className="mb-16 bg-slate-50 border border-slate-100 rounded-3xl p-6">
          <h2 className="text-lg font-black tracking-tight mb-2 inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            Trust and Verification
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DataCost is independent and pages are updated regularly. Telecom menus and offers can change, so always verify final steps on your own operator menu or support channel.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="fix-problem" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};

