import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { UssdTool } from '../components/UssdTool';
import { NavigateFunction } from '../types';
import { getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';

interface SaveUssdCodesProps {
  onBack: () => void;
  onScrollTo: (id: string) => void;
  onNavigate: NavigateFunction;
}

const faqItems = [
  {
    question: 'What is a USSD code?',
    answer:
      'A USSD code is a short dial command like *136# that opens your network menu so you can check balance, buy bundles, or recharge without internet.'
  },
  {
    question: 'How do I check my balance?',
    answer:
      'Select your network in the tool and tap Copy on the Airtime Balance or Data Balance code, then dial it from your phone app.'
  },
  {
    question: 'How do I buy data without internet?',
    answer:
      'Use your network USSD Buy Data code in this tool. USSD works over mobile signal and does not require an active internet connection.'
  }
];

export const SaveUssdCodes: React.FC<SaveUssdCodesProps> = ({ onBack, onScrollTo, onNavigate }) => {
  const pageTitle = 'Save USSD Codes to Your Phone | MTN, Vodacom, Cell C & Telkom | DataCost';
  const metaDescription =
    'Quickly copy, WhatsApp share, and save South African USSD codes for MTN, Vodacom, Cell C, and Telkom. Mobile-friendly and easy to use.';
  const canonicalUrl = 'https://datacost.co.za/save-ussd-codes/';
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/save-ussd-codes/');

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: 'DataCost',
      url: 'https://datacost.co.za/'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://datacost.co.za/' },
      { '@type': 'ListItem', position: 2, name: 'USSD Save Tool', item: canonicalUrl }
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

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="ussd" />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black uppercase tracking-wider text-slate-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to comparison
        </button>

        <section className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            Need the full list and explanations?{' '}
            <Link to="/ussd-codes-south-africa/" className="font-bold text-[#1b6d24] hover:underline">
              See the complete South Africa USSD guide.
            </Link>
          </p>
        </section>

        <UssdTool />

        <AdUnit type="inContent" />

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Helpful Links</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/ussd-codes-south-africa/">
              Full USSD page: /ussd-codes-south-africa/
            </Link>
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/network/mtn/">MTN network page</Link>
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/network/vodacom/">Vodacom network page</Link>
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/network/cell-c/">Cell C network page</Link>
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/network/telkom/">Telkom network page</Link>
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/guides/how-to-check-data-balance/">Guide: how to check data balance</Link>
            <Link className="rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700" to="/guides/best-data-deals-south-africa/">Guide: best data deals</Link>
          </div>
        </section>

        <AdUnit type="inContent" />

        <section className="mt-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="ussd" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
