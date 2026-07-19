import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  FileText,
  Network,
  ReceiptText,
  RefreshCcw,
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

interface Props {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const routePath = '/guides/what-to-do-when-cellphone-contract-ends-south-africa/';
const published = '2026-07-19T00:00:00.000Z';

const choices = [
  {
    option: 'Stay month-to-month',
    bestFor: 'Buying time while you compare, or keeping a plan that still offers fair value.',
    upside: 'No immediate new fixed term and no rushed device decision.',
    watch: 'Promotional data or discounts may expire. Check the first bill after maturity and the notice needed to leave.'
  },
  {
    option: 'Upgrade with a device',
    bestFor: 'A phone that genuinely needs replacement and a predictable monthly payment.',
    upside: 'Spreads the device and service cost and normally keeps the existing number.',
    watch: 'Creates a new term. Compare the total over 24 or 36 months, not the headline monthly amount.'
  },
  {
    option: 'Move to SIM-only',
    bestFor: 'A phone that still works and a user who wants a monthly allocation without financing another device.',
    upside: 'Separates service from the phone and can offer month-to-month flexibility.',
    watch: 'Check whether the quoted plan is truly month-to-month, what happens to promotions, and whether fees apply.'
  },
  {
    option: 'Move to prepaid',
    bestFor: 'Strict spend control, variable usage, or access to prepaid and personalised offers.',
    upside: 'No recurring postpaid bill and freedom to change bundles.',
    watch: 'You fund the phone separately, must manage bundle expiry, and may lose contract-only benefits.'
  },
  {
    option: 'Switch network',
    bestFor: 'Poor coverage, poor service, or a demonstrably better total offer elsewhere.',
    upside: 'Lets you choose coverage and value afresh while keeping your number through porting.',
    watch: 'Test coverage first, start the port with the new network before disconnection, and settle the old account.'
  }
];

const providerNotes = [
  {
    name: 'Vodacom',
    note: 'Vodacom says an expired contract moves to month-to-month. Its published terms currently describe upgrade eligibility in month 22 of a 24-month contract and month 34 of a 36-month contract. Eligibility is not an instruction to renew, and plan discounts may fall away after the agreed term.',
    sources: [
      ['Managing your contract', 'https://www.vodacom.co.za/vodacom/help/managing-your-contract'],
      ['Upgrade help', 'https://www.vodacom.co.za/vodacom/help/upgrades'],
      ['Contract terms', 'https://www.vodacom.co.za/vodacom/terms/contract-terms-and-conditions']
    ]
  },
  {
    name: 'MTN',
    note: 'MTN’s published early-upgrade terms currently place standard 24-month early upgrades from month 21 and 36-month upgrades from month 32. An early upgrade can leave the remaining device value payable. MTN also publishes one-month plan rules for eligible early-upgrade or out-of-contract customers.',
    sources: [
      ['Early-upgrade terms', 'https://www.mtn.co.za/home/terms-and-conditions/content/early-upgrade-terms-and-conditions'],
      ['Month-to-month plan terms', 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-month-to-month-plans-terms-and-conditions'],
      ['Subscriber agreement', 'https://www.mtn.co.za/home/terms-and-conditions/content/subscriber-agreement']
    ]
  },
  {
    name: 'Telkom',
    note: 'Telkom’s published FlexOn and Infinite terms say a matured mobile contract continues month-to-month until renewal, migration, conversion or termination. They also warn that promotional data, minutes or discounts can expire and the standard SIM-only rate may then apply.',
    sources: [
      ['Mobile plan terms', 'https://group.telkom.co.za/documents/regulatory/terms-and-conditions/FlexOn-Infinite-Mobile-Post-paid-and-TopUp-Plans.pdf'],
      ['Mobile contract help', 'https://www.telkom.co.za/welcome/personal/mobile-contract'],
      ['Monthly deals', 'https://www.telkom.co.za/Personal/deals/monthly-deals']
    ]
  },
  {
    name: 'Cell C',
    note: 'Cell C’s upgrade FAQ currently describes month 21 as the renewal window for a 24-month contract. It also warns that an immediate upgrade can forfeit unused airtime, minutes, SMS and data, so confirm the effective date before accepting.',
    sources: [
      ['Upgrade FAQ', 'https://www.cellc.co.za/cellc/faq-upgrade-information'],
      ['Contact Cell C', 'https://www.cellc.co.za/cellc/contact-us']
    ]
  }
];

const faqs = [
  {
    question: 'What happens when a cellphone contract ends in South Africa?',
    answer: 'For an individual consumer, a fixed-term agreement generally continues month-to-month at expiry, subject to material changes disclosed in the expiry notice, unless the consumer directs termination or expressly agrees to another fixed term. Check the provider’s notice and the first bill after expiry because discounts or promotional allocations may change.'
  },
  {
    question: 'Do I have to upgrade when I become eligible?',
    answer: 'No. Upgrade eligibility is an offer window, not an obligation. You can compare continuing month-to-month, SIM-only, prepaid, a device upgrade and another network before accepting a new fixed term.'
  },
  {
    question: 'Is an upgrade phone free?',
    answer: 'Treat it as financed or bundled value, not as free. Ask for the cash device price, service-only price, once-off fees and total payable over the full term so you can see what the phone and service really cost together.'
  },
  {
    question: 'Is a 36-month cellphone contract allowed?',
    answer: 'The Consumer Protection Act regulations set 24 months as the general maximum for a fixed-term consumer agreement unless a longer period is expressly agreed and the supplier can show a demonstrable financial benefit, or another permitted exception applies. Ask for that benefit in writing and compare the full 36-month total.'
  },
  {
    question: 'Can I keep my number if I change networks?',
    answer: 'Mobile number portability allows this, but sequence matters. Start the port request with the new provider while the old number is still active. ICASA warns that terminating first can make the number unavailable for porting. Porting the service does not erase valid device, usage or settlement amounts on the old account.'
  },
  {
    question: 'Should I choose prepaid or SIM-only after my contract?',
    answer: 'Prepaid suits users who want strict control and can actively manage bundles. SIM-only suits users who want a recurring allocation and itemised bill without financing another phone. Compare the same data, voice, validity, out-of-bundle rules and time period.'
  },
  {
    question: 'Can I wait on month-to-month while I decide?',
    answer: 'Usually, yes, once the fixed term has expired. Verify the new monthly price, lost promotions, notice requirement and any separate device balance. Month-to-month is useful as a short comparison window, but an unnoticed price change can make waiting expensive.'
  }
];

const relatedGuides = [
  ['/guides/cellphone-retention-offer-vs-switching-south-africa/', 'Is your retention offer a good deal?', 'Use the full-term calculator and written-offer checklist before accepting.'],
  ['/guides/how-to-cancel-cellphone-contract-south-africa/', 'How to cancel a cellphone contract', 'Use the detailed notice, settlement and complaint workflow if you decide to leave.'],
  ['/guides/best-sim-only-deals-south-africa/', 'Best SIM-only deals', 'Compare service without financing another phone.'],
  ['/guides/prepaid-vs-contract-south-africa/', 'Prepaid vs contract', 'Compare flexibility, billing and device trade-offs.'],
  ['/network/', 'Compare South African networks', 'Check network pages and coverage before switching.']
];

export const ContractEndedOptionsGuidePage: React.FC<Props> = ({ onNavigate, onScrollTo }) => {
  const title = 'Your Cellphone Contract Ended: Upgrade, SIM-Only, Prepaid or Switch?';
  const seoTitle = 'Cellphone Contract Ended? Upgrade, SIM-Only or Prepaid in South Africa';
  const description = 'What to do when a cellphone contract ends in South Africa: compare an upgrade, SIM-only, prepaid, month-to-month or switching networks without losing your number.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const modified = getRouteModifiedIso(routePath);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Contract ended: compare options', href: routePath }
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

  return <div className="min-h-screen bg-mesh pb-24 font-sans text-[#1a1c1c]">
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]"><RefreshCcw className="h-4 w-4" /> End-of-contract decision guide</div>
        <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{title}</h1>
        <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-600">Do not let an upgrade message make four decisions for you. Decide separately whether to replace the phone, keep the network, keep postpaid billing and accept another fixed term.</p>
      </header>

      <DataCostAnswerIntro
        number={5}
        question="My cellphone contract is ending. Should I upgrade, move to SIM-only or prepaid, or switch networks?"
        answer="If your phone still works, first compare the cost of keeping it on SIM-only or prepaid against the full cost of another device contract. An expired consumer contract generally moves month-to-month unless you cancel or expressly renew, so you do not have to decide at the first upgrade message. Check the post-expiry price, audit your real usage, test alternative coverage and protect your number before changing anything."
      />

      <section className="mb-10 rounded-[2rem] border-2 border-amber-300 bg-amber-50 p-6 shadow-sm md:p-8">
        <div className="mb-3 flex items-center gap-2 text-amber-950"><AlertTriangle className="h-6 w-6" /><h2 className="text-2xl font-black">Upgrade eligibility is not the contract expiry date</h2></div>
        <p className="text-sm font-medium leading-relaxed text-amber-950">Networks may make an early-upgrade offer before the original term ends. Accepting can start a new commitment or leave a residual device amount payable. Ask for the current contract end date, the new agreement start date and every overlapping payment in writing.</p>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center gap-3"><WalletCards className="h-7 w-7 text-[#1b6d24]" /><div><h2 className="text-3xl font-black tracking-tight">Your five practical choices</h2><p className="text-sm font-medium text-slate-600">Compare them against the same usage and the same future time period.</p></div></div>
        <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead><tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><th className="p-4">Option</th><th className="p-4">Best fit</th><th className="p-4">Main advantage</th><th className="p-4">Check before choosing</th></tr></thead>
            <tbody className="font-medium text-slate-700">{choices.map((choice) => <tr key={choice.option} className="border-b border-slate-100 last:border-0"><td className="p-4 font-black text-slate-900">{choice.option}</td><td className="p-4">{choice.bestFor}</td><td className="p-4">{choice.upside}</td><td className="p-4">{choice.watch}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <CalendarClock className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">What happens if you do nothing?</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">Section 14 of the Consumer Protection Act says an individual consumer’s fixed-term agreement generally continues month-to-month at expiry unless the consumer directs termination or expressly agrees to another fixed term.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">Doing nothing avoids an instant renewal, but it does not freeze the old promotion. Read the expiry notice and check whether the price, data, minutes or discounts change.</p>
          <div className="mt-4 flex flex-wrap gap-3"><a href="https://www.gov.za/sites/default/files/32186_467.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official: Consumer Protection Act <ArrowRight className="h-3 w-3" /></a><a href="https://www.gov.za/sites/default/files/gcis_document/201409/34180rg9515gon293.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official: CPA regulations <ArrowRight className="h-3 w-3" /></a></div>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <FileCheck2 className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">When should you start comparing?</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">The Act requires an expiry notice 40 to 80 business days before the fixed-term end date. Use that period to collect written quotes, test another SIM and decide what should happen to the number.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">If no notice arrived, ask the provider for the end date, post-expiry price and available options rather than accepting the first sales offer.</p>
        </article>
      </section>

      <section className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><CheckCircle2 className="h-6 w-6 text-[#a0f399]" /><h2 className="text-2xl font-black">The 30-minute contract audit</h2></div>
        <ol className="grid gap-3 md:grid-cols-2">{[
          'Confirm the fixed-term end date, upgrade date and current month-to-month status.',
          'Download three recent bills and total the data, calls, SMS, add-ons and out-of-bundle use.',
          'Check the phone’s battery, storage, software support, screen and repair cost.',
          'Ask for the post-expiry price and which promotional benefits or discounts will disappear.',
          'Get separate written prices for device-plus-service, SIM-only and prepaid-equivalent usage.',
          'Test coverage from competing networks at home, work and the route between them.',
          'Confirm whether the phone is paid up, owned by you and network-unlocked.',
          'Decide whether the number will stay, migrate to prepaid or port to another network.'
        ].map((item, index) => <li key={item} className="flex gap-3 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#a0f399] text-xs font-black text-slate-950">{index + 1}</span>{item}</li>)}</ol>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Calculator className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Compare the total, not “R___ per month”</h2>
          <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-relaxed text-slate-700">
            <p>Device-contract total = once-off costs + (monthly payment × term) + required add-ons</p>
            <p>Keep-phone total = repair cost + service cost over the same term</p>
            <p>Switch total = new service cost + once-off costs + old-account settlement</p>
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">Use 24 months for a 24-month quote and 36 months for a 36-month quote. Add insurance only if you would genuinely buy it, and do not count a trade-in value until it is confirmed in writing.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Smartphone className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Is the phone actually finished?</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">A battery replacement, screen repair or storage clean-up can be much cheaper than restarting device finance. Check whether the phone still receives security updates and supports the network features you use.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">If the phone is safe and reliable, keeping it makes SIM-only, prepaid and switching offers directly comparable. Replace it for a real need, not because the account became “upgrade eligible”.</p>
        </article>
      </section>

      <section className="mb-10 rounded-[2rem] border border-[#a0f399]/60 bg-[#f6fff4] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2"><ReceiptText className="h-6 w-6 text-[#1b6d24]" /><h2 className="text-2xl font-black">Put every retention or upgrade offer on one page</h2></div>
        <div className="grid gap-3 md:grid-cols-2">{[
          ['Agreement', 'Start date, fixed-term length, total number of payments and notice period.'],
          ['Device', 'Exact model, storage, cash price, ownership date and any residual old-device amount.'],
          ['Service', 'Anytime data, night data, minutes, SMS, validity, rollover and out-of-bundle rules.'],
          ['Price', 'Monthly amount, once-off fees, pro-rata bill, annual increases and what happens after promotions.'],
          ['Extras', 'Insurance, subscriptions, accessories, trade-in conditions and whether each is optional.'],
          ['Exit', 'Early-cancellation method, device settlement basis, number-porting sequence and final-bill timing.']
        ].map(([heading, detail]) => <article key={heading} className="rounded-2xl bg-white p-4"><h3 className="mb-1 font-black text-slate-900">{heading}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{detail}</p></article>)}</div>
        <p className="mt-4 text-sm font-bold leading-relaxed text-slate-800">If a consultant will not provide the complete quotation and terms in a form you can keep, do not accept during the call.</p>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center gap-3"><Network className="h-7 w-7 text-[#1b6d24]" /><div><h2 className="text-3xl font-black tracking-tight">What the major networks currently publish</h2><p className="text-sm font-medium text-slate-600">These are starting points, not universal promises. Confirm the rules for your exact plan before acting.</p></div></div>
        <div className="space-y-4">{providerNotes.map((provider) => <article key={provider.name} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-2 text-2xl font-black text-[#1b6d24]">{provider.name}</h3>
          <p className="text-sm font-medium leading-relaxed text-slate-700">{provider.note}</p>
          <div className="mt-4 flex flex-wrap gap-3">{provider.sources.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official: {label} <ArrowRight className="h-3 w-3" /></a>)}</div>
        </article>)}</div>
      </section>

      <section className="mb-10 rounded-[2rem] border-2 border-sky-200 bg-sky-50 p-6 shadow-sm md:p-8">
        <div className="mb-3 flex items-center gap-2 text-sky-950"><ShieldCheck className="h-6 w-6" /><h2 className="text-2xl font-black">Switching networks and keeping your number</h2></div>
        <ol className="space-y-3 text-sm font-medium leading-relaxed text-sky-950"><li><strong>1. Test first.</strong> Use a prepaid SIM or eSIM where practical to check real coverage and speed.</li><li><strong>2. Keep the old number active.</strong> Do not disconnect it before the port.</li><li><strong>3. Apply through the new provider.</strong> The receiving network initiates the port and verifies the account details.</li><li><strong>4. Use or accept losing old benefits.</strong> ICASA warns that unused minutes and other network benefits do not follow the number.</li><li><strong>5. Reconcile the old account.</strong> Porting does not automatically wipe out valid contract, device or usage charges.</li></ol>
        <a href="https://www.icasa.org.za/uploads/files/Mobile-Number-Portability-Consumer-Guide.pdf" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-black text-sky-950 hover:underline">ICASA mobile number portability guide <ArrowRight className="h-4 w-4" /></a>
      </section>

      <section className="mb-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <FileText className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">A useful quote request</h2>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700"><p>Please confirm my fixed-term end date, upgrade date, current device balance and price after expiry. Please provide written quotations for:</p><p className="mt-2">1. continuing month-to-month;<br />2. a comparable SIM-only plan;<br />3. migration to prepaid; and<br />4. the proposed device upgrade.</p><p className="mt-2">For each, show the start date, term, monthly price, once-off fees, inclusive value, promotion end dates and total payable over the full term.</p></div>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <RefreshCcw className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">A simple default recommendation</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">If the current phone works, spend one billing cycle comparing SIM-only and prepaid while month-to-month—after checking the new price. If the phone must be replaced, compare a cash or separate-device purchase plus service against the device contract’s full-term total.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">Switch networks only after testing coverage, and start the number port before closing the old service.</p>
        </article>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-2xl font-black">Common mistakes at contract end</h2>
        <ul className="grid gap-3 text-sm font-medium leading-relaxed text-slate-700 md:grid-cols-2">{[
          'Treating an eligibility SMS as a deadline to renew.',
          'Comparing monthly payments without multiplying by the term.',
          'Replacing a usable phone without pricing SIM-only first.',
          'Assuming all old discounts continue month-to-month.',
          'Accepting a 36-month term without identifying the financial benefit.',
          'Cancelling or disconnecting before the number port starts.',
          'Ignoring add-ons, insurance, pro-rata charges and out-of-bundle rules.',
          'Relying on a verbal retention promise that is absent from the quotation.'
        ].map((mistake) => <li key={mistake} className="flex gap-2 rounded-2xl bg-slate-50 p-4"><AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />{mistake}</li>)}</ul>
      </section>

      <aside className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 text-sm font-medium leading-relaxed text-slate-600"><strong className="text-slate-900">Important:</strong> This is practical consumer information, not legal or financial advice. Section 14 does not apply to transactions between juristic persons, and a device-finance, business or reseller agreement may need separate analysis. Provider offers and processes change; verify the written terms before accepting.</aside>

      <section className="mb-10">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Use these before deciding</h2>
        <div className="grid gap-4 md:grid-cols-2">{relatedGuides.map(([href, label, detail]) => <Link key={href} to={href} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-colors hover:border-[#1b6d24]"><h3 className="mb-1 font-black text-slate-900">{label}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{detail}</p></Link>)}</div>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Frequently asked questions</h2>
        <div className="space-y-5">{faqs.map((faq) => <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"><h3 className="mb-2 text-lg font-black">{faq.question}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div>
      </section>

      <DataCostAnswerCta />
      <TrustPanel
        lastReviewed={formatIsoForDisplay(modified)}
        sources="Section 14 of the Consumer Protection Act and regulation 5, ICASA mobile number portability guidance, and official Vodacom, MTN, Telkom and Cell C contract, upgrade and month-to-month information."
      />
    </main>
    <Footer onNavigate={onNavigate} />
    <MobileNav onNavigate={onNavigate} />
  </div>;
};
