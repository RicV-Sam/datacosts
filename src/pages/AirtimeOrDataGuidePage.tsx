import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  PhoneCall,
  Router,
  Scale,
  ShieldCheck,
  Smartphone,
  WalletCards
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { DataCostAnswerCta, DataCostAnswerIntro } from '../components/DataCostAnswer';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_LOGO_URL,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';

interface Props { onNavigate: NavigateFunction; onScrollTo: (id: string) => void; }

const routePath = '/guides/airtime-or-data-south-africa/';
const published = '2026-07-15T00:00:00.000Z';

const decisions = [
  ['WhatsApp, browsing and apps', 'Data bundle', 'A defined allowance is easier to budget than open-ended airtime use.'],
  ['Ordinary cellular calls', 'Voice bundle or airtime', 'A voice bundle can offer better value; airtime remains useful for occasional calls.'],
  ['Smartphone with mixed use', 'All-in-one bundle', 'Look for suitable data plus any-network minutes, then check validity and exclusions.'],
  ['Router or MiFi', 'Data bundle', 'These devices primarily consume data; confirm that the bundle permits router use.'],
  ['Basic phone', 'Airtime or voice bundle', 'Data has less value if the device is mainly used for calls and SMS.'],
  ['Strict budget', 'Once-off data plus OOB control', 'Avoid automatic renewal and block or cap out-of-bundle spending.'],
  ['Occasional emergency use', 'Small airtime balance', 'Flexible credit can help with an unplanned call, SMS or eligible paid service.']
];

const networkGuidance = [
  {
    name: 'Vodacom',
    guidance: 'Vodacom says once-off data normally stops when depleted unless the customer has consented to out-of-bundle charging. Its Data Limit Lock can be managed for eligible Prepaid, Hybrid and Postpaid lines. Check the current setting and your price-plan terms rather than assuming the limit is active.',
    sources: [
      ['Once-off data bundle terms', 'https://www.vodacom.co.za/vodacom/terms/once-off-data-bundles'],
      ['Out-of-Bundle Data Limit Lock', 'https://www.vodacom.co.za/vodacom/terms/incontrol']
    ]
  },
  {
    name: 'MTN',
    guidance: 'MTN states that customers can opt in to or out of out-of-bundle data billing through supported service channels. If opted out, data service stops after active bundles are depleted. Confirm the setting in the current MTN self-service channel for your price plan.',
    sources: [
      ['Internet bundle terms', 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles'],
      ['Customer service charter', 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-customer-service-charter-final-english-2-0']
    ]
  },
  {
    name: 'Cell C',
    guidance: 'Cell C publishes spend-control and data-usage terms covering choices about out-of-bundle use. Because the outcome can depend on the election, tariff and bundle, review the current Spend Control setting and active product before relying on airtime protection.',
    sources: [
      ['In-bundle data usage terms', 'https://www.cellc.co.za/cellc/static-content/PDF/CELL-C-T%26C-APPLICABLE-TO-IN-BUNDLE-DATA-USAGE-CHARGES.pdf'],
      ['Out-of-bundle Spend Control terms', 'https://www.cellc.co.za/cellc/static-content/PDF/icasaT%26C.pdf']
    ]
  },
  {
    name: 'Telkom',
    guidance: 'Telkom provides prepaid self-service routes for checking balances and buying bundles, while out-of-bundle behaviour can be product or tariff specific. Check the active bundle, wallet balance and applicable terms in Telkom self-service; do not assume a universal prepaid lock.',
    sources: [
      ['Mobile Prepaid self-service', 'https://www.telkom.co.za/welcome/personal/mobile-prepaid'],
      ['Current prepaid bundle information', 'https://www.telkom.co.za/prepaid-services']
    ]
  }
];

const faqs = [
  {
    question: 'Is it cheaper to buy airtime or data in South Africa?',
    answer: 'For internet use, a suitable data bundle is usually easier to budget than paying for mobile data from airtime. The best choice still depends on bundle price, validity, exclusions and your network tariff.'
  },
  {
    question: 'Can data use my airtime after a bundle runs out?',
    answer: 'It can if out-of-bundle data is allowed on your line or under the applicable tariff. Check whether out-of-bundle use is blocked, capped or enabled before relying on an airtime balance.'
  },
  {
    question: 'Do I need airtime to use WhatsApp?',
    answer: 'WhatsApp needs data or Wi-Fi, not ordinary cellular airtime for the call or message itself. Airtime can still be used if the network charges out-of-bundle data after your bundle ends.'
  },
  {
    question: 'Should I buy airtime or data for a router or MiFi?',
    answer: 'Buy a compatible data bundle. Loading airtime is only an intermediate step if that airtime will immediately be converted into data. Confirm that the bundle and price plan allow use in a router or MiFi.'
  },
  {
    question: 'Why is airtime disappearing even after I bought data?',
    answer: 'Possible causes include out-of-bundle data, traffic excluded from an app-specific bundle, recurring subscriptions, premium services, airtime-advance repayment or other chargeable activity. Buying data does not cancel those services.'
  }
];

const usefulLinks = [
  ['/guides/out-of-bundle-data-costs-south-africa/', 'Out-of-bundle data costs', 'Understand what happens when a bundle ends and how airtime can be exposed.'],
  ['/guides/stop-wasp-subscriptions-south-africa/', 'Check and stop subscriptions', 'Rule out premium services and recurring deductions.'],
  ['/guides/buy-data-with-bank-apps-south-africa/', 'Buy data with bank apps', 'Use safer number and product checks before confirming payment.'],
  ['/guides/cheapest-data-south-africa/', 'Cheapest data in South Africa', 'Compare current bundle value before choosing a network or size.'],
  ['/guides/convert-airtime-to-data-south-africa/', 'Convert airtime to data', 'Use airtime to buy a defined bundle instead of browsing from the wallet.'],
  ['/ussd-codes-south-africa/', 'Network USSD codes', 'Find balance and bundle-buying shortcuts.'],
  ['/guides/check-router-sim-data-balance-and-recharge/', 'Router SIM balance guide', 'Manage and recharge a SIM that stays inside a router or MiFi.']
];

export const AirtimeOrDataGuidePage: React.FC<Props> = ({ onNavigate, onScrollTo }) => {
  const title = 'Should I Buy Airtime or Data in South Africa?';
  const seoTitle = 'Airtime or Data: Which Is Cheaper and Safer to Load?';
  const description = 'Should you buy airtime or data in South Africa? Choose the best option for smartphones, calls, routers and strict budgets while avoiding out-of-bundle charges.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const modified = getRouteModifiedIso(routePath);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Airtime or data', href: routePath }
  ];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Organization', name: SITE_BRAND_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_LOGO_URL }
    }
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };

  return <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
    <Header onScrollTo={onScrollTo} activeSection="guides" />
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]"><Scale className="h-4 w-4" /> Prepaid buying guide</div>
        <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{title}</h1>
        <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-600">A practical choice for South African smartphones, calls, routers and strict prepaid budgets.</p>
      </header>

      <DataCostAnswerIntro
        number={3}
        question="Should I load airtime or buy data?"
        answer="For most smartphone users, data is the better default because it is easier to budget. However, you must still manage out-of-bundle data, active subscriptions and premium charges. Choose airtime or a voice bundle for ordinary cellular calls and SMS, and an all-in-one bundle when you regularly need both data and minutes."
      />

      <section className="mb-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <WalletCards className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Airtime is a flexible wallet</h2>
          <p className="text-sm font-medium leading-relaxed text-slate-600">Airtime is Rand-value credit that can pay for ordinary calls, SMS, bundles and other eligible network services. That flexibility is useful, but it can also expose the balance to data, subscriptions, premium services or other charges.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Database className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Data is a defined allowance</h2>
          <p className="text-sm font-medium leading-relaxed text-slate-600">A data bundle gives you a stated allowance with a validity period and usage rules. This usually makes internet spending easier to plan, but exclusions, expiry and out-of-bundle settings still matter.</p>
        </article>
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-3xl font-black tracking-tight">Quick decision table</h2>
        <p className="mb-5 text-sm font-medium text-slate-600">Start with what the SIM is mainly used for, then check the product validity and restrictions before paying.</p>
        <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><th className="p-4">Your situation</th><th className="p-4">Best starting point</th><th className="p-4">Why</th></tr></thead>
            <tbody className="font-medium text-slate-700">{decisions.map(([situation, choice, reason]) => <tr key={situation} className="border-b border-slate-100 last:border-0"><td className="p-4 font-black text-slate-900">{situation}</td><td className="p-4 font-black text-[#1b6d24]">{choice}</td><td className="p-4">{reason}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><Smartphone className="mb-3 h-6 w-6 text-[#1b6d24]" /><h2 className="mb-3 text-xl font-black">For a smartphone</h2><p className="text-sm font-medium leading-relaxed text-slate-600">Buy data if most communication happens through WhatsApp or other internet services and you use banking, maps, browsing, social media or streaming. Check whether app-specific data covers links, calls and media.</p></article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><PhoneCall className="mb-3 h-6 w-6 text-[#1b6d24]" /><h2 className="mb-3 text-xl font-black">For calls and SMS</h2><p className="text-sm font-medium leading-relaxed text-slate-600">A voice bundle may be better for regular ordinary calls. Airtime makes sense for occasional calls or SMS because it is flexible, but compare the tariff with available bundles first.</p></article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><Router className="mb-3 h-6 w-6 text-[#1b6d24]" /><h2 className="mb-3 text-xl font-black">For a router or MiFi</h2><p className="text-sm font-medium leading-relaxed text-slate-600">Buy data rather than leaving airtime available for raw usage. Confirm that the product permits router use; some smartphone or promotional plans restrict data-device use.</p></article>
      </section>

      <section className="mb-10 rounded-[2rem] border-2 border-amber-300 bg-amber-50 p-6 shadow-sm md:p-8">
        <div className="mb-3 flex items-center gap-2 text-amber-950"><AlertTriangle className="h-6 w-6" /><h2 className="text-2xl font-black">Buying data does not automatically protect your airtime</h2></div>
        <p className="mb-4 font-bold leading-relaxed text-amber-950">If a bundle runs out or expires, mobile data may stop, continue under another bundle, or use airtime under the applicable tariff and out-of-bundle setting.</p>
        <p className="text-sm font-medium leading-relaxed text-amber-950"><strong>Buying a data bundle also does not cancel subscriptions, premium services or other charges linked to the number.</strong> If airtime is disappearing unexpectedly, check active subscriptions separately and review the network usage or billing record.</p>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-black">When an all-in-one bundle is better</h2>
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">Choose a mixed bundle when you regularly use both mobile data and ordinary calls. Compare the included anytime data, any-network versus on-network minutes, SMS allocation, validity, recurrence and device restrictions.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">Offers vary by network, tariff, eligibility and time. Check the live menu on your own number rather than relying on an old advertised bundle.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-black">Basic phones and emergency credit</h2>
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">For a basic phone used mostly for calls and SMS, airtime or a voice bundle is usually more useful than data. A small airtime balance can also provide flexible emergency credit where the service is eligible.</p>
          <p className="text-sm font-medium leading-relaxed text-slate-600">USSD menus often work without mobile data, but opening a menu is different from paying for a bundle, premium USSD session or other chargeable service.</p>
        </article>
      </section>

      <section className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-[#a0f399]" /><h2 className="text-2xl font-black">How to control prepaid spending</h2></div>
        <div className="grid gap-3 md:grid-cols-2">{[
          'Check your active data balance and expiry before browsing.',
          'Choose a once-off bundle when you do not want automatic renewal.',
          'Block or cap out-of-bundle data in the current network self-service channel.',
          'Keep mobile data off while loading airtime intended for a bundle.',
          'Review recurring bundles, subscriptions and premium services separately.',
          'Use phone data warnings as a backup, not as the network billing balance.'
        ].map((item) => <div key={item} className="flex gap-2 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a0f399]" />{item}</div>)}</div>
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-3xl font-black tracking-tight">Network-by-network out-of-bundle checks</h2>
        <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">These are control principles, not universal rate promises. Product and tariff rules can differ, so use the linked official material and confirm the live setting on your number.</p>
        <div className="space-y-4">{networkGuidance.map((network) => <article key={network.name} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-2 text-xl font-black text-[#1b6d24]">{network.name}</h3>
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-700">{network.guidance}</p>
          <div className="flex flex-wrap gap-3">{network.sources.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official: {label} <ArrowRight className="h-3 w-3" /></a>)}</div>
        </article>)}</div>
      </section>

      <aside className="mb-10 rounded-[2rem] border border-[#a0f399]/60 bg-[#f6fff4] p-6 md:p-8">
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#1b6d24]">DataCost editorial perspective</p>
        <p className="text-lg font-bold leading-relaxed text-slate-800">Personally, I usually buy data rather than airtime. Most of my calls now happen through WhatsApp or other internet-based services, so data gives me more practical value and makes it easier to control what I spend.</p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">That is an editorial preference, not a rule for every user. People who make ordinary calls, use a basic phone or need flexible emergency credit may reasonably choose airtime or a voice bundle instead.</p>
      </aside>

      <section className="mb-10">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Useful next guides</h2>
        <div className="grid gap-4 md:grid-cols-2">{usefulLinks.map(([href, label, detail]) => <Link key={href} to={href} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-colors hover:border-[#1b6d24]"><h3 className="mb-1 font-black text-slate-900">{label}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{detail}</p></Link>)}</div>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Frequently asked questions</h2>
        <div className="space-y-5">{faqs.map((faq) => <article key={faq.question}><h3 className="mb-2 text-lg font-black">{faq.question}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div>
      </section>

      <DataCostAnswerCta />
      <TrustPanel
        lastReviewed={formatIsoForDisplay(modified)}
        sources="Official Vodacom, MTN, Cell C and Telkom consumer pages and product terms, checked against the wording used on this page."
      />
    </main>
    <Footer onNavigate={onNavigate} />
    <MobileNav onNavigate={onNavigate} />
  </div>;
};
