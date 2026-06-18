import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';

interface BankAppsDataGuidePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const routePath = '/guides/buy-data-with-bank-apps-south-africa/';
const faqs = [
  {
    question: 'Which bank app is best for buying data?',
    answer: 'DataCost does not rank bank apps without checking current official flows. Use the bank app you already trust and confirm the number, network, bundle type, and confirmation screen.'
  },
  {
    question: 'Can I reverse airtime or data bought in a bank app?',
    answer: 'Often no, especially once a top-up is delivered to the number. Contact your bank and network quickly if the number was wrong, but do not assume reversal is available.'
  },
  {
    question: 'Can I buy data for someone else?',
    answer: 'Usually yes if your bank app supports sending airtime or data to another cellphone number. Confirm the number carefully before paying.'
  }
];

const checklist = [
  'Use only your official bank app or online banking domain.',
  'Confirm whether the menu says airtime, data, electricity, voucher, or bundle.',
  'Check the network and cellphone number before submitting.',
  'Keep the app receipt or notification until the top-up reflects.',
  'If the top-up does not arrive, check app history before buying again.'
];

const relatedLinks = [
  { href: '/buy-data-airtime-south-africa/', label: 'How to buy data and airtime', description: 'Compare USSD, app, retailer, bank-app, and provider routes.' },
  { href: '/ussd-codes-south-africa/', label: 'USSD codes South Africa', description: 'Use network menus when app access is limited.' },
  { href: '/guides/how-to-stop-airtime-being-used-automatically/', label: 'Stop airtime being used automatically', description: 'Protect airtime after buying it.' },
  { href: '/promos/', label: 'Airtime, data and fibre promos', description: 'Check whether any promos have enough official detail to list.' }
];

function buildArticleSchema(canonicalUrl: string, datePublishedIso: string, dateModifiedIso: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Buy Data with South African Bank Apps',
    description: 'Learn how to buy data and airtime safely with South African bank apps, including number checks, receipts, reversals and common mistakes.',
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };
}

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export const BankAppsDataGuidePage: React.FC<BankAppsDataGuidePageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'How to Buy Data with South African Bank Apps';
  const metaDescription = 'Learn how to buy data and airtime safely with South African bank apps, including number checks, receipts, reversals and common mistakes.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso(routePath);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Buy Data with Bank Apps', href: routePath }
  ];

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
        <script type="application/ld+json">{JSON.stringify(buildArticleSchema(canonicalUrl, datePublishedIso, dateModifiedIso))}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        <script type="application/ld+json">{JSON.stringify(buildFaqSchema())}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="mb-10">
          <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{pageTitle}</h1>
          <p className="text-lg font-medium leading-relaxed text-slate-600">
            Bank apps are a common way to buy airtime or data in South Africa. This guide covers safe checks and common mistakes before you confirm payment.
          </p>
        </header>

        <section className="mb-10 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Quick Answer
          </div>
          <p className="text-base font-bold leading-relaxed text-slate-800">
            Use your official bank app, select the right network and bundle type, confirm the cellphone number twice, and save the receipt before trying another purchase.
          </p>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">Safe bank-app buying checklist</h2>
          <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate-600">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-2">
          {[
            { title: 'Bank examples', text: 'South Africans may see airtime and data menus in apps from banks such as FNB, Capitec, Standard Bank, Absa, Nedbank, TymeBank or Discovery Bank. Treat these as examples, not recommendations.' },
            { title: 'Network examples', text: 'You may see MTN, Vodacom, Telkom, Cell C or Rain-related options depending on the bank and product. Confirm the exact target network before paying.' },
            { title: 'When it fails', text: 'Check transaction history, SMS confirmations, and the number used. Contact the bank or network through official channels if the top-up does not reflect.' },
            { title: 'When to avoid it', text: 'Do not use bank-app top-ups through screenshots, social-media links, remote-control requests, or anyone asking for your OTP or app password.' }
          ].map((card) => (
            <article key={card.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-black tracking-tight">{card.title}</h2>
              <p className="text-sm font-medium leading-relaxed text-slate-600">{card.text}</p>
            </article>
          ))}
        </section>

        <TrustPanel
          lastReviewed={lastReviewed}
          sources="General South African bank-app top-up patterns, official-channel safety principles, and DataCost mobile-data support pages. Bank app menus and promotions can change, so confirm the final screen in your own banking app."
          className="mb-10"
        />

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Related guides</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link key={link.href} to={link.href} className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4 hover:bg-[#a0f399]/10">
                <span>
                  <span className="block text-sm font-black text-slate-900">{link.label}</span>
                  <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-600">{link.description}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                <h3 className="mb-2 font-black text-slate-900">{faq.question}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p>
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
