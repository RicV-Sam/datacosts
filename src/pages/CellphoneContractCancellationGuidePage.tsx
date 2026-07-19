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
  PhoneCall,
  ReceiptText,
  Scale,
  ShieldAlert,
  Smartphone
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

const routePath = '/guides/how-to-cancel-cellphone-contract-south-africa/';
const published = '2026-07-19T00:00:00.000Z';

const cancellationTimeline = [
  {
    timing: 'During the fixed term',
    action: 'Give at least 20 business days’ notice in writing or another recorded form and ask for an itemised settlement quote.',
    cost: 'Amounts already owed plus a reasonable early-cancellation charge may apply. A device balance can make up most of the quote.'
  },
  {
    timing: '40–80 business days before expiry',
    action: 'Read the expiry notice, compare alternatives, and state whether you want to cancel, continue month-to-month or renew.',
    cost: 'This is the best comparison window because you can normally plan an expiry cancellation without an early-cancellation penalty.'
  },
  {
    timing: 'On the fixed-term expiry date',
    action: 'You may direct the provider to terminate at expiry. Keep proof that the instruction was received and confirm the final bill.',
    cost: 'No early-cancellation penalty should apply merely because the fixed term has ended, but usage and other amounts already owed remain payable.'
  },
  {
    timing: 'After expiry, if you did nothing',
    action: 'The agreement generally continues month-to-month rather than becoming a new fixed term. Give recorded notice to end it.',
    cost: 'You remain liable while the month-to-month service is active and during the applicable notice period.'
  }
];

const providerRoutes = [
  {
    name: 'Vodacom',
    start: 'Call the cancellations line on 082 1958. For an early cancellation, request a quote before paying or returning anything.',
    record: 'Vodacom’s premature-cancellation guide says the quote is valid for 14 days and lists earlycancellation@vodacom.co.za for the signed quote, ID copy and proof of payment.',
    fee: 'Its published consumer terms describe outstanding amounts, one month of service, the remaining effective device cost and any applicable subsidy. A SIM-only early cancellation is described as one monthly subscription.',
    sources: [
      ['Cancellation guide', 'https://www.vodacom.co.za/vodacom/help/premature-cancellation-guide'],
      ['Contract terms', 'https://www.vodacom.co.za/vodacom/terms/contract-terms-and-conditions'],
      ['Contact details', 'https://www.vodacom.co.za/vodacom/help/contact-us']
    ]
  },
  {
    name: 'MTN',
    start: 'Contact MTN on 135 from an MTN line or 083 135 from another network, request the settlement figure and ask where the written notice for your account must be sent.',
    record: 'MTN’s subscriber agreement requires notice in writing using the contact details on the bill or invoice. Keep the sent notice, quote, case number and final confirmation.',
    fee: 'MTN’s published terms list the device cash price where applicable, service and usage to the end date, an additional month’s subscription and other permitted amounts.',
    sources: [
      ['Subscriber agreement', 'https://www.mtn.co.za/home/terms-and-conditions/content/subscriber-agreement'],
      ['Customer service charter', 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-customer-service-charter-final-english-2-0'],
      ['Complaints procedure', 'https://onlinecms.mtn.co.za/sites/default/files/complaints-procedure.pdf']
    ]
  },
  {
    name: 'Telkom',
    start: 'Telkom lists 081 180 for mobile cancellations and 10213 for sales, billing and cancellation queries. Ask for the correct recorded-notice channel for the specific account.',
    record: 'Its standard terms say an individual consumer may terminate a fixed-term agreement by written notice and that the quote is calculated when the notice is given.',
    fee: 'Telkom says arrears up to termination and a reasonable cancellation fee calculated under section 14 and regulation 5(2) of the Consumer Protection Act may be due.',
    sources: [
      ['Mobile cancellation', 'https://apps.telkom.co.za/rococo/public/content/cancel'],
      ['Mobile contact page', 'https://www.telkom.co.za/welcome/personal/mobile-contract/contact-us'],
      ['Subscriber terms', 'https://group.telkom.co.za/documents/regulatory/terms-and-conditions/Telkom_Mobile_Subscriber_Terms_And_Conditions.pdf']
    ]
  },
  {
    name: 'Cell C',
    start: 'Call 084 145 for contracts or 135 from a Cell C line (084 135 from another network), then submit the cancellation in a form that can be saved or proved.',
    record: 'Cell C’s individual subscriber agreement allows 20 working days’ notice in writing or another recorded form, including once the agreement is month-to-month.',
    fee: 'The published individual terms list outstanding equipment and billed charges plus a service penalty of up to 50% of the remaining subscription fees for early cancellation.',
    sources: [
      ['Subscriber agreement', 'https://www.cellc.co.za/cellc/static-content/PDF/Individual-Subscriber-Agreement-T%26C-New.pdf'],
      ['Contract and support contacts', 'https://www.cellc.co.za/cellc/contact-us']
    ]
  }
];

const faqs = [
  {
    question: 'Can I cancel a cellphone contract before it expires in South Africa?',
    answer: 'An individual consumer may generally cancel a fixed-term consumer agreement by giving 20 business days’ notice in writing or another recorded form. The provider may still charge amounts already owed and a reasonable early-cancellation penalty, including applicable device costs.'
  },
  {
    question: 'Does my cellphone contract automatically renew for another fixed term?',
    answer: 'Not merely because you did nothing. At expiry, a fixed-term consumer agreement generally continues month-to-month, subject to material changes disclosed in the expiry notice, unless you direct termination or expressly agree to a further fixed term.'
  },
  {
    question: 'When is the best time to cancel or compare a new deal?',
    answer: 'Start when the expiry notice arrives, which the Consumer Protection Act places 40 to 80 business days before expiry. That gives you time to check coverage, compare total costs, preserve your number and give notice without rushing into an upgrade.'
  },
  {
    question: 'Does returning the phone cancel the contract?',
    answer: 'Not automatically. A device return, repair hand-in, trade-in and service cancellation are different instructions. The exact effect depends on the agreement. Get a receipt with the IMEI and written confirmation showing how the return changes the device balance and the service end date.'
  },
  {
    question: 'Can I keep my number when I cancel?',
    answer: 'Usually, but the sequence matters. Ask whether the line should migrate to prepaid or be ported to the new provider. Porting a number does not erase settlement charges or device obligations under the old contract.'
  },
  {
    question: 'Should I stop the debit order if the provider has not cancelled?',
    answer: 'Do not use a stopped debit order as the cancellation notice. It can create arrears, collection activity or a credit dispute. Lodge a formal billing dispute, keep paying the undisputed amount, and obtain advice for the specific account if the provider continues debiting disputed charges.'
  },
  {
    question: 'Is an early-cancellation fee capped at 10%?',
    answer: 'The Consumer Protection Act regulations do not set a universal 10% cap for fixed-term cellphone contracts. They require a reasonable amount based on factors such as value received, returned or retained goods, contract duration, notice and industry practice, and the charge may not cancel out the consumer’s right to terminate.'
  }
];

const nextGuides = [
  ['/guides/what-to-do-when-cellphone-contract-ends-south-africa/', 'What to do when your contract ends', 'Compare upgrading, staying month-to-month, SIM-only, prepaid and switching networks.'],
  ['/guides/prepaid-vs-contract-south-africa/', 'Prepaid vs contract', 'Decide whether another fixed term, SIM-only plan or prepaid service fits your usage.'],
  ['/guides/best-sim-only-deals-south-africa/', 'Best SIM-only data deals', 'Compare service without financing another phone.'],
  ['/guides/vodacom-vs-mtn-data-prices/', 'Vodacom vs MTN data prices', 'Compare two large networks after checking coverage where you use the phone.'],
  ['/guides/cheapest-data-south-africa/', 'Cheapest data in South Africa', 'Review current prepaid value before accepting a retention offer.']
];

export const CellphoneContractCancellationGuidePage: React.FC<Props> = ({ onNavigate, onScrollTo }) => {
  const title = 'How to Cancel a Cellphone Contract in South Africa';
  const seoTitle = 'Cancel a Cellphone Contract in South Africa: MTN, Vodacom, Telkom & Cell C';
  const description = 'How and when to cancel an MTN, Vodacom, Telkom or Cell C contract in South Africa, including notice, early fees, device returns, expiry and complaints.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const modified = getRouteModifiedIso(routePath);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Cancel a cellphone contract', href: routePath }
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]"><FileCheck2 className="h-4 w-4" /> Contract cancellation guide</div>
        <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{title}</h1>
        <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-600">A practical guide to early termination, normal expiry, device settlement, keeping your number and escalating a cancellation that was never processed.</p>
      </header>

      <DataCostAnswerIntro
        number={4}
        question="How do I cancel my cellphone contract, when should I cancel, and why am I still being billed after returning the phone?"
        answer="Give the provider a clear cancellation instruction in writing or another recorded form and keep proof. If you are still inside the fixed term, first request an itemised settlement quote; at least 20 business days’ notice is generally required and a reasonable early-cancellation charge may apply. If the fixed term has expired, the agreement normally continues month-to-month until cancelled. Returning a device does not by itself prove that the mobile service was cancelled."
      />

      <section className="mb-10 rounded-[2rem] border-2 border-amber-300 bg-amber-50 p-6 shadow-sm md:p-8">
        <div className="mb-3 flex items-center gap-2 text-amber-950"><AlertTriangle className="h-6 w-6" /><h2 className="text-2xl font-black">Do not confuse these four actions</h2></div>
        <div className="grid gap-3 md:grid-cols-2">{[
          ['Returning a device', 'A hand-in, repair, trade-in or lease return does not automatically cancel the SIM service.'],
          ['Cancelling the service', 'This ends the network agreement on the confirmed effective date, subject to valid charges.'],
          ['Stopping a debit order', 'This stops a payment method; it does not cancel the agreement and can create arrears.'],
          ['Porting the number', 'This moves the number, but it does not wipe out the old provider’s device or settlement claim.']
        ].map(([heading, detail]) => <article key={heading} className="rounded-2xl bg-white/70 p-4"><h3 className="mb-1 font-black text-amber-950">{heading}</h3><p className="text-sm font-medium leading-relaxed text-amber-950">{detail}</p></article>)}</div>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center gap-3"><CalendarClock className="h-7 w-7 text-[#1b6d24]" /><div><h2 className="text-3xl font-black tracking-tight">When should you cancel?</h2><p className="text-sm font-medium text-slate-600">The answer depends on where you are in the contract timeline.</p></div></div>
        <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead><tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><th className="p-4">Timing</th><th className="p-4">What to do</th><th className="p-4">Likely cost position</th></tr></thead>
            <tbody className="font-medium text-slate-700">{cancellationTimeline.map((row) => <tr key={row.timing} className="border-b border-slate-100 last:border-0"><td className="p-4 font-black text-slate-900">{row.timing}</td><td className="p-4">{row.action}</td><td className="p-4">{row.cost}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><CheckCircle2 className="h-6 w-6 text-[#a0f399]" /><h2 className="text-2xl font-black">The cancellation checklist</h2></div>
        <ol className="grid gap-3 md:grid-cols-2">{[
          'Find the contract start date, fixed-term end date, account number and device IMEI.',
          'Ask whether the line is still fixed-term or already month-to-month.',
          'If it is early, request a written, itemised settlement quote before deciding.',
          'State the exact service, cellphone number and requested effective cancellation date.',
          'Say whether the number must migrate to prepaid, be ported, or be disconnected.',
          'Submit the instruction through a recordable channel and obtain a reference number.',
          'Keep the notice, quote, call details, screenshots, device-return receipt and proof of payment.',
          'Check the final bill and get written confirmation that the service is closed and the balance is settled.'
        ].map((item, index) => <li key={item} className="flex gap-3 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#a0f399] text-xs font-black text-slate-950">{index + 1}</span>{item}</li>)}</ol>
      </section>

      <section className="mb-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <ReceiptText className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">What can be in the settlement?</h2>
          <ul className="space-y-2 text-sm font-medium leading-relaxed text-slate-600"><li>• Monthly service and usage up to the effective end date.</li><li>• Billed or unbilled amounts already incurred.</li><li>• A reasonable early-cancellation charge.</li><li>• The remaining device value or another equipment adjustment.</li><li>• Discounts or subsidies linked to completing the term.</li></ul>
          <p className="mt-4 text-sm font-bold leading-relaxed text-slate-800">Ask for each part separately. “Cancellation fee” should not be an unexplained lump sum.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Scale className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">What does “reasonable” mean?</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">Regulation 5(2) does not create one universal percentage. It lists factors such as the amount already owed, value received, goods kept or returned, original duration, notice, losses or benefits and industry practice.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">The charge may not be so high that it effectively removes the right to cancel. If the quote looks wrong, ask for the calculation and challenge the specific line items in writing.</p>
        </article>
      </section>

      <section className="mb-10 rounded-[2rem] border border-[#a0f399]/60 bg-[#f6fff4] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2 text-[#1b6d24]"><Smartphone className="h-6 w-6" /><h2 className="text-2xl font-black text-slate-900">If the device was already returned but billing continues</h2></div>
        <ol className="space-y-3 text-sm font-medium leading-relaxed text-slate-700"><li><strong>1. Identify what the receipt says.</strong> A repair intake, trade-in, lease return and contract cancellation are not interchangeable.</li><li><strong>2. Match the IMEI.</strong> Keep proof of the exact device, date, store, condition and staff member who accepted it.</li><li><strong>3. Demand an account reconciliation.</strong> Ask how the returned-device value was credited, what service remained active and why each later debit was raised.</li><li><strong>4. Send a fresh formal complaint.</strong> Attach the original cancellation notice, all reference numbers, the return receipt and bank statements, and request a corrected final bill.</li><li><strong>5. Escalate after the provider process.</strong> Use the regulator path below if the provider does not resolve the complaint.</li></ol>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center gap-3"><PhoneCall className="h-7 w-7 text-[#1b6d24]" /><div><h2 className="text-3xl font-black tracking-tight">How to start with each network</h2><p className="text-sm font-medium text-slate-600">Contact details and fees can change. Confirm the current process for your exact account and save every record.</p></div></div>
        <div className="space-y-4">{providerRoutes.map((provider) => <article key={provider.name} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-2xl font-black text-[#1b6d24]">{provider.name}</h3>
          <div className="grid gap-4 md:grid-cols-3"><div><p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400">Start here</p><p className="text-sm font-medium leading-relaxed text-slate-700">{provider.start}</p></div><div><p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400">Create a record</p><p className="text-sm font-medium leading-relaxed text-slate-700">{provider.record}</p></div><div><p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400">Published fee position</p><p className="text-sm font-medium leading-relaxed text-slate-700">{provider.fee}</p></div></div>
          <div className="mt-4 flex flex-wrap gap-3">{provider.sources.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official: {label} <ArrowRight className="h-3 w-3" /></a>)}</div>
        </article>)}</div>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><FileText className="h-6 w-6 text-[#1b6d24]" /><h2 className="text-2xl font-black">Copy-ready cancellation notice</h2></div>
        <div className="rounded-2xl bg-slate-50 p-5 text-sm font-medium leading-relaxed text-slate-700">
          <p><strong>Subject:</strong> Formal cancellation notice – account [account number], mobile number [number]</p>
          <p className="mt-3">I am the account holder and hereby give formal notice that I want the above service cancelled. Please record this notice as received on [date] and confirm the effective cancellation date in writing.</p>
          <p className="mt-3">Please provide an itemised settlement showing service charges, usage, device or equipment balance, discounts or subsidies, cancellation charge, credits and the final total. [I want the number migrated to prepaid / I intend to port the number / I consent to disconnection.]</p>
          <p className="mt-3">Please issue a reference number and written confirmation when the cancellation is complete. My preferred contact details are [email and alternative number].</p>
        </div>
        <p className="mt-3 text-xs font-bold leading-relaxed text-slate-500">Remove options that do not apply. Do not send passwords, PINs or a full ID copy unless the provider’s verified process requires identity documents.</p>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <Calculator className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Should you cancel early for a better deal?</h2>
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">Do not compare only the new monthly price. Compare the cost from today to the same future date.</p>
          <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"><p>Stay cost = remaining old payments + expected extra usage</p><p>Switch cost = settlement quote + new plan cost + once-off fees</p><p>Break-even months = settlement quote ÷ monthly saving</p></div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">Also test real coverage, check whether the price is promotional, and compare service-only and device-financed options separately.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <ShieldAlert className="mb-4 h-7 w-7 text-[#1b6d24]" />
          <h2 className="mb-3 text-2xl font-black">Why people do not shop around</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">The comments are not only about price awareness. Device financing hides the service price, settlement figures are uncertain, cancellation requires several hand-offs, and customers fear losing their number or moving to worse coverage.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">The practical fix is to separate three decisions: keep or replace the phone, choose the network, and choose prepaid, month-to-month or another fixed term. An “upgrade” bundles all three decisions together and makes comparison harder.</p>
        </article>
      </section>

      <section className="mb-10 rounded-[2rem] border-2 border-rose-200 bg-rose-50 p-6 shadow-sm md:p-8">
        <h2 className="mb-3 text-2xl font-black text-rose-950">If the cancellation is ignored or billing continues</h2>
        <ol className="space-y-3 text-sm font-medium leading-relaxed text-rose-950"><li><strong>1. Lodge a formal complaint with the provider.</strong> Ask for a complaint reference, not only a call interaction number.</li><li><strong>2. Attach evidence.</strong> Include the cancellation notice, provider acknowledgement, quote, device-return proof, invoices, debits and the exact remedy requested.</li><li><strong>3. Allow the provider 14 working days.</strong> ICASA requires the provider complaint process first.</li><li><strong>4. Choose the right external route.</strong> ICASA accepts unresolved telecommunications service complaints after that process. ICASA directs disputes focused on contract terms, faulty handsets, misleading advertising or misrepresentation to the National Consumer Commission.</li></ol>
        <div className="mt-5 flex flex-wrap gap-4"><a href="https://www.icasa.org.za/pages/consumer-complaints-procedure" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-black text-rose-950 hover:underline">ICASA complaints procedure <ArrowRight className="h-4 w-4" /></a><a href="https://thencc.org.za/complaints/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-black text-rose-950 hover:underline">National Consumer Commission complaints <ArrowRight className="h-4 w-4" /></a></div>
      </section>

      <aside className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 text-sm font-medium leading-relaxed text-slate-600"><strong className="text-slate-900">Important:</strong> This is practical consumer information, not legal advice. Contract type, account holder, device ownership, business status and the facts of a dispute can change the outcome. Section 14 of the Consumer Protection Act does not apply to transactions between juristic persons.</aside>

      <section className="mb-10">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Compare your next option</h2>
        <div className="grid gap-4 md:grid-cols-2">{nextGuides.map(([href, label, detail]) => <Link key={href} to={href} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-colors hover:border-[#1b6d24]"><h3 className="mb-1 font-black text-slate-900">{label}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{detail}</p></Link>)}</div>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-5 text-3xl font-black tracking-tight">Frequently asked questions</h2>
        <div className="space-y-5">{faqs.map((faq) => <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"><h3 className="mb-2 text-lg font-black">{faq.question}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div>
      </section>

      <DataCostAnswerCta />
      <TrustPanel
        lastReviewed={formatIsoForDisplay(modified)}
        sources="Section 14 of the Consumer Protection Act and regulation 5, official Vodacom, MTN, Telkom and Cell C consumer terms and cancellation channels, plus ICASA and National Consumer Commission complaint guidance."
      />
    </main>
    <Footer onNavigate={onNavigate} />
    <MobileNav onNavigate={onNavigate} />
  </div>;
};
