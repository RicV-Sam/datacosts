import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { NavigateFunction } from '../types';
import { getDefaultPublishedIso, getGuideModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface AirtimeDataProblemsHubPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const problemPages = [
  {
    href: '/guides/why-is-my-data-disappearing-south-africa/',
    label: 'Why your data disappears in South Africa',
    group: 'Data issues'
  },
  {
    href: '/guides/why-is-my-data-finishing-so-fast/',
    label: 'Why data finishes so fast',
    group: 'Data issues'
  },
  {
    href: '/guides/how-to-stop-airtime-being-used-automatically/',
    label: 'How to stop airtime being used automatically',
    group: 'Airtime issues'
  },
  {
    href: '/guides/how-to-protect-airtime-from-being-used/',
    label: 'How to protect airtime from being used',
    group: 'Airtime issues'
  },
  {
    href: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/',
    label: 'How to cancel subscriptions on major networks',
    group: 'Subscription issues'
  },
  {
    href: '/guides/how-to-check-subscriptions-on-mtn/',
    label: 'How to check subscriptions on MTN',
    group: 'Subscription issues'
  },
  {
    href: '/guides/how-to-check-subscriptions-on-vodacom/',
    label: 'How to check subscriptions on Vodacom',
    group: 'Subscription issues'
  },
  {
    href: '/guides/how-to-stop-wasp-services-south-africa/',
    label: 'How to stop WASP services in South Africa',
    group: 'Subscription issues'
  }
];

const faqItems = [
  {
    question: 'What causes airtime to disappear in South Africa?',
    answer:
      'The most common causes are WASP subscriptions, premium SMS services, and out-of-bundle data billing when a bundle runs out.'
  },
  {
    question: 'Why does data finish fast even after buying a bundle?',
    answer:
      'Background app sync, automatic updates, autoplay video, and hotspot usage can consume data quickly without obvious warning.'
  },
  {
    question: 'Which page should I open first if deductions are happening now?',
    answer:
      'Start with the automatic airtime loss guide, then use the network subscription check pages for MTN or Vodacom if recurring charges continue.'
  },
  {
    question: 'How do I avoid out-of-bundle billing?',
    answer:
      'Set data caps, disable mobile data when the bundle is empty, and check balance frequently with the USSD shortcuts.'
  },
  {
    question: 'Do these fixes work for Vodacom, MTN, Telkom, and Cell C?',
    answer:
      'Yes. The cluster is written for South African users and includes network-specific steps for all four major operators.'
  }
];

export const AirtimeDataProblemsHubPage: React.FC<AirtimeDataProblemsHubPageProps> = ({ onNavigate, onScrollTo }) => {
  const canonicalUrl = toCanonicalUrl('/guides/airtime-data-problems-south-africa/');
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getGuideModifiedIso('airtime-data-problems-south-africa');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Airtime & Data Problems in South Africa (Fix Guide 2026)',
    description:
      'Use this hub to fix airtime loss, fast data drain, and unwanted subscriptions across Vodacom, MTN, Telkom, and Cell C.',
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: 'DataCost',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'DataCost',
      url: SITE_URL
    }
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
        <title>Airtime & Data Problems (Vodacom, MTN Fix Guide 2026)</title>
        <meta
          name="description"
          content="Fix airtime and data problems in South Africa. Check guides for Vodacom, MTN, Telkom, and Cell C to stop deductions, WASP billing, and fast data loss."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content="Airtime & Data Problems (Vodacom, MTN Fix Guide 2026)" />
        <meta
          property="og:description"
          content="Fix airtime and data problems in South Africa with one hub linking all major troubleshooting guides."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Airtime & Data Problems (Vodacom, MTN Fix Guide 2026)" />
        <meta
          name="twitter:description"
          content="Fix airtime and data problems in South Africa with one hub linking all major troubleshooting guides."
        />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <button
            onClick={() => onNavigate('guides-index')}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to guides
          </button>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.95]">
            Airtime & Data Problems in South Africa (Fix Guide 2026)
          </h1>
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">Last updated: April 2026</p>
            <p className="text-sm text-slate-600">Reviewed by DataCost Telecom Insights Team</p>
          </div>
          <AdUnit type="aboveFold" className="mb-6" />
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            Use this hub when airtime keeps disappearing, data finishes too quickly, or unknown subscriptions keep charging your number.
          </p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Summary</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Most mobile billing complaints in South Africa come from three patterns: hidden subscriptions, background data drain, and out-of-bundle billing.
          </p>
          <p className="text-slate-700 leading-relaxed">
            This page groups the fastest fixes by issue type so you can go straight to the right guide for Vodacom, MTN, Telkom, or Cell C.
          </p>
        </section>

        <AdUnit type="inContent" className="mb-8" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Airtime Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problemPages
              .filter((item) => item.group === 'Airtime issues')
              .map((item) => (
                <Link key={item.href} to={item.href} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
                  <h3 className="font-black text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-sm text-slate-600">Fix recurring deductions and airtime burn quickly.</p>
                </Link>
              ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Data Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problemPages
              .filter((item) => item.group === 'Data issues')
              .map((item) => (
                <Link key={item.href} to={item.href} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
                  <h3 className="font-black text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-sm text-slate-600">Stop fast bundle loss and out-of-bundle charges.</p>
                </Link>
              ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Subscription Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problemPages
              .filter((item) => item.group === 'Subscription issues')
              .map((item) => (
                <Link key={item.href} to={item.href} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
                  <h3 className="font-black text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-sm text-slate-600">Check, cancel, and block recurring premium billing.</p>
                </Link>
              ))}
          </div>
        </section>

        <AdUnit type="inContent" className="mb-8" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">How to Prevent Problems</h2>
          <ul className="space-y-3 list-disc pl-5 text-slate-700 leading-relaxed">
            <li>Run a monthly subscription audit and cancel unknown paid services.</li>
            <li>Use balance and service USSD checks before every major recharge.</li>
            <li>Disable background data for non-essential apps and lock updates to Wi-Fi.</li>
            <li>Set data caps and warnings to avoid accidental out-of-bundle billing.</li>
          </ul>
          <p className="text-slate-700 mt-4">
            Use the <Link to="/ussd-codes-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">South Africa USSD codes page</Link> for quick checks.
          </p>
        </section>

        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1b6d24]" />
            FAQ
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <AdUnit type="inContent" className="mt-8" />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};

