import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ShieldCheck, Wrench } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getGuideModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface WhyAirtimeDisappearingPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const operatorSections = [
  {
    name: 'Vodacom',
    balanceCode: '*135#',
    networkHref: '/network/vodacom/',
    ussdHref: '/vodacom-ussd-codes/',
    notes: 'Start by checking whether a bundle expired, then review app usage and any active value-added services through self-service paths.',
    action: 'If airtime drops after browsing or social video, treat out-of-bundle usage as the first thing to rule out.'
  },
  {
    name: 'MTN',
    balanceCode: '*136#',
    networkHref: '/network/mtn/',
    ussdHref: '/mtn-ussd-codes/',
    notes: 'Check your active balance first, then review background data use and any recurring extras or airtime-advance activity.',
    action: 'If the issue started after a bundle finished, switch off mobile data until you confirm a fresh bundle is active.'
  },
  {
    name: 'Telkom',
    balanceCode: '*188#',
    networkHref: '/network/telkom/',
    ussdHref: '/telkom-ussd-codes/',
    notes: 'Telkom users should confirm current balance and expiry first, especially if browsing continued after a data bundle ended.',
    action: 'If deductions feel unclear, compare your recent browsing habits against bundle validity before assuming a billing fault.'
  },
  {
    name: 'Cell C',
    balanceCode: '*101#',
    networkHref: '/network/cell-c/',
    ussdHref: '/cell-c-ussd-codes/',
    notes: 'Check airtime and data status, then review social/video use and any recurring subscriptions that may be taking small amounts.',
    action: 'If airtime falls in small repeated amounts, WASP or VAS deductions are worth checking early.'
  }
];

const faqItems = [
  {
    question: 'Why is my airtime disappearing in South Africa?',
    answer:
      'The most common reasons are out-of-bundle browsing, background app usage, auto-updates, social video apps, or recurring WASP and value-added service deductions.'
  },
  {
    question: 'How do I stop my airtime from disappearing?',
    answer:
      'Check whether your data bundle is still active, switch updates and backups to Wi-Fi only, reduce autoplay and background data, and review possible subscription charges.'
  },
  {
    question: 'Could a subscription be taking my airtime?',
    answer:
      'Yes. Small daily or weekly WASP and VAS deductions can look like random airtime loss if you do not check transaction history or active services often.'
  },
  {
    question: 'Should I contact my network if airtime keeps disappearing?',
    answer:
      'Yes, especially after you have checked bundle expiry, app usage, and subscriptions. Ask for a usage or billing breakdown and help with out-of-bundle controls.'
  }
];

export const WhyAirtimeDisappearingPage: React.FC<WhyAirtimeDisappearingPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Why Is My Airtime Disappearing? (SA 2026)';
  const metaDescription =
    'Airtime disappearing on Vodacom, MTN, Telkom or Cell C? Learn the main causes, quick fixes, operator-specific checks, and how to stop airtime loss fast.';
  const canonicalUrl = toCanonicalUrl('/guides/why-is-my-airtime-disappearing-south-africa/');
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getGuideModifiedIso('why-is-my-airtime-disappearing-south-africa');
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

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
      { '@type': 'ListItem', position: 2, name: 'Guides', item: toCanonicalUrl('/guides/') },
      { '@type': 'ListItem', position: 3, name: 'Why Is My Airtime Disappearing?', item: canonicalUrl }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Is My Airtime Disappearing Fast in South Africa?',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border border-[#a0f399]/30">
            Updated {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.95]">
            Why Is My <span className="text-[#1b6d24]">Airtime Disappearing Fast</span> in South Africa?
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            If your airtime keeps dropping on Vodacom, MTN, Telkom, or Cell C, the cause is usually identifiable. This page focuses on the fastest checks, the most common reasons, and the next action to take before you top up again.
          </p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            Airtime usually disappears because your phone kept using mobile data after a bundle expired, background apps kept syncing, or a recurring subscription deduction is active. Check your balance first, stop browsing until you confirm an active bundle, then rule out WASP and value-added charges.
          </p>
        </section>

        <section className="mb-10 bg-[#031636] text-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#a0f399]" />
            Fix It Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Link to="/guides/how-to-check-data-balance/" className="rounded-2xl border border-white/15 bg-white/5 p-5 hover:border-[#a0f399] transition-colors">
              <div className="font-black text-white mb-1">1. Check your current balance</div>
              <p className="text-slate-300">Confirm whether your data bundle is still active before you browse again.</p>
            </Link>
            <Link to="/ussd-codes-south-africa/" className="rounded-2xl border border-white/15 bg-white/5 p-5 hover:border-[#a0f399] transition-colors">
              <div className="font-black text-white mb-1">2. Use the right USSD codes</div>
              <p className="text-slate-300">Save the fastest balance and self-service codes for your operator.</p>
            </Link>
            <Link to="/guides/stop-wasp-subscriptions-south-africa/" className="rounded-2xl border border-white/15 bg-white/5 p-5 hover:border-[#a0f399] transition-colors">
              <div className="font-black text-white mb-1">3. Rule out unwanted deductions</div>
              <p className="text-slate-300">Check whether premium subscriptions or WASP charges are eating airtime.</p>
            </Link>
            <Link to="/guides/cheapest-data-south-africa/" className="rounded-2xl border border-white/15 bg-white/5 p-5 hover:border-[#a0f399] transition-colors">
              <div className="font-black text-white mb-1">4. Move to a better-fit bundle</div>
              <p className="text-slate-300">Switch to a bundle size and validity that matches your real usage pattern.</p>
            </Link>
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Most common reasons airtime disappears</h2>
          <div className="space-y-4">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Out-of-bundle browsing after expiry</h3>
              <p className="text-slate-700 leading-relaxed">This is the first thing to check. If a bundle finished and mobile data stayed on, airtime can be consumed quickly.</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Background apps and auto-updates</h3>
              <p className="text-slate-700 leading-relaxed">Cloud backup, social apps, app-store updates, and system downloads can continue quietly even when you are not actively using the phone.</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="font-black text-slate-900 mb-2">Subscriptions, WASP, or value-added services</h3>
              <p className="text-slate-700 leading-relaxed">Small daily or weekly deductions can feel random unless you check your account history and active services.</p>
            </article>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-black tracking-tight mb-6">Operator-specific checks</h2>
          <div className="space-y-5">
            {operatorSections.map((operator) => (
              <article key={operator.name} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-black tracking-tight mb-3">{operator.name}: what to check first</h3>
                <p className="text-slate-700 leading-relaxed mb-3">{operator.notes}</p>
                <p className="text-slate-700 leading-relaxed mb-5">{operator.action}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Balance check</div>
                    <div className="font-black text-slate-900">{operator.balanceCode}</div>
                  </div>
                  <Link to={operator.ussdHref} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:border-[#1b6d24] transition-colors">
                    <div className="font-black text-slate-900">Open {operator.name} USSD page</div>
                    <p className="text-sm text-slate-600 mt-1">Use network-specific balance and self-service shortcuts.</p>
                  </Link>
                  <Link to={operator.networkHref} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:border-[#1b6d24] transition-colors">
                    <div className="font-black text-slate-900">View {operator.name} network page</div>
                    <p className="text-sm text-slate-600 mt-1">Compare operator context, coverage tradeoffs, and bundle options.</p>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">When to contact your network</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Escalate when airtime keeps disappearing after you have checked bundle expiry, app usage, and recurring subscription risk. Ask support for a usage or billing breakdown and help with out-of-bundle controls if available on your line.
          </p>
          <p className="text-slate-700 leading-relaxed">
            If the issue seems broader than airtime alone, pair this page with the <Link to="/guides/why-does-my-data-finish-so-fast-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">data-drain guide</Link> and the <Link to="/guides/how-to-check-data-balance/" className="text-[#1b6d24] font-semibold hover:underline">data balance guide</Link>.
          </p>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            Methodology and trust
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>Independent analysis:</strong> this page is designed to help users diagnose common airtime-loss patterns using public operator workflows and practical troubleshooting steps.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            We do not claim live billing visibility into your line. Always confirm final balances, service states, and account-specific deductions with your operator where needed.
          </p>
          <p className="text-slate-700 mt-3">
            Read our <Link to="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</Link> and <Link to="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</Link> for how DataCost structures consumer guidance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1b6d24]" />
            Frequently Asked Questions
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
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
