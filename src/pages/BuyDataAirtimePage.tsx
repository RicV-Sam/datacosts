import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';

interface BuyDataAirtimePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const routePath = '/buy-data-airtime-south-africa/';
const faqs = [
  {
    question: 'What is the safest way to buy data or airtime?',
    answer: 'Use an official network app, bank app, USSD menu, retailer till slip, or provider website. Avoid unofficial links that ask for OTPs, PINs, or banking passwords.'
  },
  {
    question: 'Can I buy data without the network app?',
    answer: 'Yes. USSD menus, bank apps, retailer tills, ATMs, and online banking can work depending on your network and bank.'
  },
  {
    question: 'Should I buy airtime first or a data bundle directly?',
    answer: 'Buying the data bundle directly is usually safer when you want data, because airtime can sometimes be used by out-of-bundle data, subscriptions, or voice charges.'
  }
];

const buyingOptions = [
  { label: 'Network app', text: 'Useful when you already have mobile data or Wi-Fi and want an official self-service flow.' },
  { label: 'USSD', text: 'Useful when you do not want to install an app or need a quick balance, top-up, or bundle menu.' },
  { label: 'Bank app', text: 'Useful when you want to pay from your bank account and send airtime or data to another number.' },
  { label: 'Retail till', text: 'Useful when paying cash or buying a voucher in-store.' },
  { label: 'Provider website', text: 'Useful for account-managed services, but confirm the domain is official before paying.' }
];

const operatorBuyingGuides = [
  { href: '/guides/how-to-buy-data-vodacom/', label: 'Buy Vodacom data' },
  { href: '/guides/how-to-buy-data-mtn/', label: 'Buy MTN data' },
  { href: '/guides/how-to-buy-data-telkom/', label: 'Buy Telkom data' },
  { href: '/guides/how-to-buy-data-cell-c/', label: 'Buy Cell C data' }
];

const relatedLinks = [
  { href: '/guides/buy-data-with-bank-apps-south-africa/', label: 'Buy data with bank apps', description: 'Use safer bank-app checks before sending airtime or data.' },
  { href: '/promos/', label: 'Airtime, data and fibre promos', description: 'Check whether any promos have enough official detail to list.' },
  { href: '/ussd-codes-south-africa/', label: 'USSD codes South Africa', description: 'Find network shortcut menus for balances and bundles.' },
  { href: '/airtime-advance-codes/', label: 'Airtime advance codes', description: 'Check borrow-airtime routes before using advance products.' },
  { href: '/guides/how-to-stop-airtime-being-used-automatically/', label: 'Stop airtime being used automatically', description: 'Protect airtime before buying a bundle.' },
  { href: '/network/', label: 'Network pages', description: 'Open operator-specific data and support pages.' }
];

function buildArticleSchema(canonicalUrl: string, datePublishedIso: string, dateModifiedIso: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Buy Data and Airtime in South Africa',
    description: 'Learn safe ways to buy data and airtime in South Africa using USSD, network apps, bank apps, retailers and provider websites.',
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

export const BuyDataAirtimePage: React.FC<BuyDataAirtimePageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'How to Buy Data and Airtime in South Africa';
  const metaDescription = 'Learn safe ways to buy data and airtime in South Africa using USSD, network apps, bank apps, retailers and provider websites.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso(routePath);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Buy Data and Airtime', href: routePath }
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
            Buying data or airtime should be boring and official. This guide compares common South African top-up routes and the checks to make before you pay.
          </p>
        </header>

        <section className="mb-10 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Quick Answer
          </div>
          <p className="text-base font-bold leading-relaxed text-slate-800">
            If you need data, buy a data bundle directly where possible. If you need airtime, use an official app, USSD menu, bank app, retailer, or provider site and keep the proof of purchase until it reflects.
          </p>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">Choose your bundle, then buy</h2>
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">
            Start with the <Link to="/best-data-deals-south-africa/" className="font-bold text-[#1b6d24] underline underline-offset-2">reviewed data comparisons</Link>, or use the <Link to="/tools/data-bundle-selector/" className="font-bold text-[#1b6d24] underline underline-offset-2">data bundle selector</Link> to narrow the listed offers by your requirements. Check the provider, qualifying tariff and purchase channel before paying.
          </p>
          <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">
            Comparing an offer shown on your own SIM? Enter its price and usable allowance in the <Link to="/tools/usable-data-cost-calculator/" className="font-bold text-[#1b6d24] underline underline-offset-2">usable data cost calculator</Link>. Keep night, social and daily-release data separate. A result helps compare your offer; it does not confirm that another customer can buy it.
          </p>
          <h3 className="mb-2 font-black text-slate-900">Buying steps for your network</h3>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {operatorBuyingGuides.map((guide) => (
              <li key={guide.href}>
                <Link to={guide.href} className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-bold text-[#1b6d24] underline underline-offset-2">
                  {guide.label}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="voice-costs" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">Buying airtime for calls?</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-600">Compare the cash you pay with the calls you can actually make. Check your active tariff, billing increment, permitted networks and expiry. Airtime credit, a minute bundle and a conditional recharge bonus are different products. A larger minute allowance only helps if you use it before it expires.</p>
          <h3 className="mb-2 font-black">A specific example: Vodacom Prepaid LTE voice bundles</h3>
          <p className="mb-4 text-sm leading-relaxed text-slate-600">These two examples require the qualifying Prepaid MBB plan in Vodacom’s terms. They are not an offer for every Vodacom SIM or a cheapest-network ranking. Prices and conditions below were checked on 1 November 2026.</p>
          <table className="mb-4 w-full text-left text-sm">
            <caption className="sr-only">Vodacom Prepaid LTE once-off voice examples, checked 1 November 2026</caption>
            <thead><tr className="border-b border-slate-300"><th scope="col" className="py-3 pr-3">Minutes</th><th scope="col" className="py-3">Price including VAT</th></tr></thead>
            <tbody><tr className="border-b border-slate-200"><th scope="row" className="py-3 pr-3 font-semibold">100 minutes</th><td className="py-3">R99</td></tr><tr><th scope="row" className="py-3 pr-3 font-semibold">250 minutes</th><td className="py-3">R199</td></tr></tbody>
          </table>
          <p className="mb-3 text-sm leading-relaxed text-slate-600">Both are once-off bundles valid for 30 days including the purchase day, with per-second deduction for calls to networks within South Africa. International calls and international roaming are excluded. Vodacom lists *135#, My Vodacom and VodaPay as purchase channels; confirm the qualifying plan and final offer on your line.</p>
          <p className="text-sm leading-relaxed text-slate-600">Check the <a href="https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1b6d24] underline underline-offset-2">official prices</a> and <a href="https://www.vodacom.co.za/vodacom/terms/home-prepaid-lte" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1b6d24] underline underline-offset-2">plan and voice-bundle terms</a> before buying. We have not established a complete like-for-like voice comparison across all networks.</p>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Main ways to buy data or airtime</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {buyingOptions.map((option) => (
              <article key={option.label} className="rounded-2xl bg-slate-50 p-4">
                <h3 className="mb-2 font-black text-slate-900">{option.label}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{option.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">Before you pay</h2>
          <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate-600">
            {[
              'Confirm the cellphone number and its current network, especially if the number has been ported.',
              'Confirm the full amount payable and whether the purchase is once-off or renews automatically. Check how to stop future renewals.',
              'Check whether the offer requires a particular tariff, app, bank account or personalised invitation.',
              'Read each allowance separately: airtime, anytime data, night data, social data, minutes and conditional bonuses.',
              'Check each allowance’s expiry and whether data is available immediately or released in daily portions.',
              'Keep your receipt, SMS, or app confirmation until the top-up appears.',
              'Never share OTPs, card PINs, app passwords, or banking credentials with a support account or reseller.'
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

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

        <section id="faq" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
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

        <AuthorReviewBlock lastReviewed={lastReviewed} trustSummary="This page focuses on safe top-up routes, number checks, proof of purchase, and official support paths when a top-up does not arrive." />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
