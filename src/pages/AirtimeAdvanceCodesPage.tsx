import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle2, CreditCard, HelpCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { TrustPanel } from '../components/TrustPanel';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface AirtimeAdvanceCodesPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const advanceRows = [
  {
    anchor: 'mtn-airtime-advance',
    network: 'MTN',
    intent: 'Borrow airtime / check advance',
    product: 'MTN XtraTime',
    code: '*151#',
    status: 'Verified advance-airtime route in DataCost USSD data.',
    repayment: 'Repayment and any service fee are normally deducted from your next recharge or incoming airtime.',
    href: '/mtn-ussd-codes/'
  },
  {
    anchor: 'vodacom-airtime-advance',
    network: 'Vodacom',
    intent: 'Airtime advance / emergency airtime',
    product: 'Airtime advance via self-service menu',
    code: '*135# menu',
    status: 'Use the main Vodacom menu because direct menu paths can vary by SIM and offer eligibility.',
    repayment: 'Confirm the fee and repayment terms on the Vodacom menu before accepting an advance.',
    href: '/vodacom-ussd-codes/'
  },
  {
    anchor: 'telkom-airtime-advance',
    network: 'Telkom',
    intent: 'Telkom emergency airtime',
    product: 'Airtime advance via self-service menu',
    code: '*180# menu',
    status: 'Use the Telkom self-service menu; advance-airtime options can depend on prepaid profile and eligibility.',
    repayment: 'Confirm the repayment amount and timing shown on the Telkom menu before accepting.',
    href: '/telkom-ussd-codes/'
  },
  {
    anchor: 'cell-c-airtime-advance',
    network: 'Cell C',
    intent: 'Borrow airtime from Cell C',
    product: 'Airtime advance via self-service menu',
    code: '*147# menu',
    status: 'Use the Cell C bundle and self-service menu; available advance options can vary.',
    repayment: 'Check the fee and deduction rules on screen before you accept the advance.',
    href: '/cell-c-ussd-codes/'
  }
];

const failureReasons = [
  'Your SIM has not built enough recharge or usage history for an advance offer.',
  'A previous airtime advance or service fee may still need to be repaid.',
  'The network may not currently have an advance offer for your prepaid profile.',
  'Your SIM, tariff plan, or account status may not qualify for the specific advance product.',
  'The USSD session may time out or fail during network congestion; try again from a place with stronger signal.'
];

const faqItems = [
  {
    question: 'What is the MTN airtime advance code?',
    answer: 'Dial *151# for MTN XtraTime. Check the fee and repayment amount before accepting any advance airtime.'
  },
  {
    question: 'What is the Vodacom airtime advance code?',
    answer: 'Start with *135# and follow the Vodacom self-service menu. Direct advance-airtime menu paths can vary by SIM and eligibility.'
  },
  {
    question: 'Why can airtime advance fail?',
    answer:
      'It can fail when your SIM is not eligible, a previous advance has not been repaid, the offer is not available on your profile, or the USSD session times out.'
  },
  {
    question: 'Does airtime advance cost extra?',
    answer:
      'A service fee or access fee can apply. The exact repayment amount should be shown by the network before you confirm the advance.'
  }
];

export const AirtimeAdvanceCodesPage: React.FC<AirtimeAdvanceCodesPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Airtime Advance Codes South Africa: MTN, Vodacom, Cell C and Telkom';
  const metaDescription =
    'Compare airtime advance starting codes in South Africa: MTN *151#, Vodacom *135#, Telkom *180# and Cell C *147#, with fee and repayment warnings.';
  const canonicalUrl = toCanonicalUrl('/airtime-advance-codes/');
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/airtime-advance-codes/');
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Airtime Advance Codes', item: canonicalUrl }
    ]
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
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="ussd" />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('ussd')}
          className="mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black uppercase tracking-wider text-slate-600 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to USSD codes
        </button>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border border-[#a0f399]/30">
            <PhoneCall className="h-3.5 w-3.5" />
            Updated {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.95]">
            Airtime Advance Codes South Africa: <span className="text-[#1b6d24]">MTN, Vodacom, Cell C and Telkom</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            Use these borrow-airtime and emergency-airtime starting points for MTN, Vodacom, Cell C and Telkom. The network menu should show eligibility, fees and repayment before you accept an advance.
          </p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick answer</h2>
          <p className="mb-5 text-slate-700 leading-relaxed">
            MTN users can start with <strong>*151#</strong>. Vodacom users should start with <strong>*135#</strong>, Telkom with <strong>*180#</strong>, and Cell C with <strong>*147#</strong>. Check the fee, eligibility, and repayment amount on screen before accepting any airtime advance.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400">
                  <th className="py-3 pr-4">Network</th>
                  <th className="py-3 pr-4">What users want</th>
                  <th className="py-3 pr-4">Starting point</th>
                  <th className="py-3 pr-4">Jump link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {advanceRows.map((row) => (
                  <tr key={row.network}>
                    <td className="py-4 pr-4 font-black text-slate-900">{row.network}</td>
                    <td className="py-4 pr-4 text-slate-700">{row.intent}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-xl bg-slate-100 px-3 py-2 font-mono text-sm font-black text-slate-900">
                        {row.code}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <a href={`#${row.anchor}`} className="font-bold text-[#1b6d24] hover:underline">
                        Jump to {row.network}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <TrustPanel
          lastReviewed={lastUpdated}
          sources="DataCost USSD repository, operator self-service menus, and public support routes where available."
          className="mb-10"
        />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-4 md:p-8 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-black tracking-tight">
            <CreditCard className="h-5 w-5 text-[#1b6d24]" />
            Airtime advance code comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400">
                  <th className="py-3 pr-4">Network</th>
                  <th className="py-3 pr-4">Starting code</th>
                  <th className="py-3 pr-4">Product or route</th>
                  <th className="py-3 pr-4">Eligibility and repayment note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {advanceRows.map((row) => (
                  <tr key={row.network} id={row.anchor} className="align-top scroll-mt-24">
                    <td className="py-4 pr-4 font-black text-slate-900">{row.network}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-xl bg-slate-100 px-3 py-2 font-mono text-sm font-black text-slate-900">
                        {row.code}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-bold text-slate-900">{row.product}</p>
                      <p className="mt-1 text-slate-600">{row.status}</p>
                    </td>
                    <td className="py-4 pr-4 text-slate-700">
                      <p>{row.repayment}</p>
                      <Link to={row.href} className="mt-2 inline-flex font-bold text-[#1b6d24] hover:underline">
                        See {row.network} USSD codes
                      </Link>
                      {row.network === 'Cell C' ? (
                        <Link to="/network/cell-c/" className="mt-2 block font-bold text-[#1b6d24] hover:underline">
                          Compare Cell C data deals
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight">
              <ShieldCheck className="h-5 w-5 text-[#1b6d24]" />
              Before you accept an advance
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
                Confirm the repayment amount shown on screen.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
                Check whether a service fee or access fee applies.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
                Remember that repayment can happen automatically when you recharge.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Why advance airtime fails
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {failureReasons.map((reason) => (
                <li key={reason} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mb-10 bg-[#031636] text-white rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Per-network USSD pages</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {advanceRows.map((row) => (
              <Link
                key={row.network}
                to={row.href}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-bold text-white hover:border-[#a0f399] transition-colors"
              >
                {row.network} USSD codes
                <span className="mt-1 block text-xs font-medium text-slate-300">{row.code}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-black tracking-tight">
            <HelpCircle className="h-5 w-5 text-[#1b6d24]" />
            Airtime advance FAQ
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="font-black text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <AuthorReviewBlock lastReviewed={lastUpdated} className="mb-12" />
      </main>

      <Footer onNavigate={onNavigate} onScrollTo={onScrollTo} />
      <MobileNav onScrollTo={onScrollTo} activeSection="ussd" />
    </div>
  );
};
