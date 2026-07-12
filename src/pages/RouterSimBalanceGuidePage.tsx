import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, Router, Terminal } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { DataCostAnswerCta, DataCostAnswerIntro } from '../components/DataCostAnswer';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_BRAND_NAME, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface Props { onNavigate: NavigateFunction; onScrollTo: (id: string) => void; }

const routePath = '/guides/check-router-sim-data-balance-and-recharge/';

const networks = [
  {
    name: 'MTN', balance: 'Link/manage the router SIM in the MTN App; *136# is the common prepaid balance route when the router supports USSD.',
    recharge: 'The MTN App can buy bundles for your own or another MTN number. *136*2# opens prepaid bundle buying on a USSD-capable router.',
    source: 'https://www.mtn.co.za/home/app-download', sourceLabel: 'MTN App'
  },
  {
    name: 'Vodacom', balance: 'Link the data-device or router number in VodaPay/My Vodacom and view its balances remotely. A compatible router can also send *135#.',
    recharge: 'Buy for the linked router line in VodaPay/My Vodacom, or buy for another Vodacom number. *135# also provides bundle options where USSD is exposed. Some Home Internet products are restricted to Vodacom-approved routers, so confirm the exact product first.',
    source: 'https://vodapay.vodacom.co.za/vodapay/personal/faq', sourceLabel: 'VodaPay account guidance'
  },
  {
    name: 'Telkom', balance: 'Use the MyTelkom App or Web Self Service for a registered product. Telkom also lists *188# from the SIM or WhatsApp 086 160 1700 from any network for balance checks.',
    recharge: 'Buy bundles through MyTelkom, Web Self Service, a banking app, *180# on compatible hardware, or WhatsApp 081 160 1700 from any network.',
    source: 'https://www.telkom.co.za/welcome/business/mobile-contract/how-to-buy-bundles', sourceLabel: 'Telkom balance and bundle guidance'
  },
  {
    name: 'Cell C', balance: 'Use the Cell C App or website Self Service for the router SIM. If the router exposes USSD, use *101# for a summary or *147# for the menu.',
    recharge: 'Buy a bundle online by entering the router SIM number, or use the app. Compatible routers can use *147#; a voucher can be loaded with *102*voucherPIN#.',
    source: 'https://www.cellc.co.za/cellc/get-databundles', sourceLabel: 'Cell C data bundles'
  },
  {
    name: 'Rain', balance: 'Manage the service in your Rain account. Rain is account/subscription based, so the handset-style USSD and voucher workflow does not apply.',
    recharge: 'Manage the plan, payment method and any applicable usage/spend controls in the Rain account rather than loading prepaid airtime.',
    source: 'https://www.rain.co.za/', sourceLabel: 'Rain account'
  }
];

const faqs = [
  { question: 'Can I check a router SIM balance without visiting the site?', answer: 'Usually yes. The most reliable method is to register or link the router SIM number in the network provider account or app. You can then check the network-side balance and buy data remotely, even though the SIM remains inside the router.' },
  { question: 'Does the router data counter show the real bundle balance?', answer: 'No. A router traffic counter measures bytes that passed through that device. It may reset, omit earlier usage, or disagree with network billing. Treat the provider account or USSD response as the authoritative remaining balance.' },
  { question: 'Can a script send USSD from a modem?', answer: 'Sometimes. A compatible cellular modem may implement the 3GPP AT+CUSD command on a serial AT port. Many consumer routers hide that port, omit USSD in firmware, or use vendor-specific APIs, so a universal script cannot safely support every model.' },
  { question: 'Why does USSD fail while LTE or 5G data still works?', answer: 'USSD support depends on the modem, firmware, network mode and operator. Data connectivity alone does not prove that the router interface or modem exposes USSD. Use the provider account route as the fallback.' }
];

export const RouterSimBalanceGuidePage: React.FC<Props> = ({ onNavigate, onScrollTo }) => {
  const title = 'How to Check a Router SIM Data Balance and Recharge Remotely';
  const description = 'Check and recharge an MTN, Vodacom, Telkom, Cell C or Rain router SIM remotely, with provider apps, router USSD and modem scripting guidance.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const published = '2026-07-12T00:00:00.000Z';
  const modified = getRouteModifiedIso(routePath);
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides/' }, { label: 'Router SIM balance', href: routePath }];
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, url: canonicalUrl, image: DEFAULT_OG_IMAGE_URL, datePublished: published, dateModified: modified, author: { '@type': 'Organization', name: SITE_BRAND_NAME, url: SITE_URL }, publisher: { '@type': 'Organization', name: SITE_PRODUCT_NAME, url: SITE_URL } };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };

  return <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
    <Helmet>
      <title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="article" /><meta property="og:site_name" content={SITE_PRODUCT_NAME} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={canonicalUrl} /><meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script><script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script><script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
    <Header onScrollTo={onScrollTo} activeSection="guides" />
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mb-10"><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]"><Router className="h-4 w-4" /> Remote-site guide</div><h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{title}</h1><p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-600">This guide is for a mobile SIM installed in a router, MiFi or LTE/5G modem at a customer site—not a SIM normally used in a handset.</p></header>

      <DataCostAnswerIntro
        number={1}
        question="How can I check the data balance on a SIM in a remote router and recharge it without visiting the customer site?"
        answer="Link the router SIM’s cellphone number to the network provider’s app or web account before leaving the site. That gives you the most dependable way to check the network-side balance and buy data remotely. Treat the router’s USSD feature as a backup because support varies by model and firmware."
      />

      <section className="mb-10"><h2 className="mb-5 text-3xl font-black tracking-tight">Provider-by-provider options</h2><div className="space-y-4">{networks.map((network) => <article key={network.name} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><div className="grid gap-4 md:grid-cols-[120px_1fr_1fr]"><h3 className="text-xl font-black text-[#1b6d24]">{network.name}</h3><div><p className="mb-1 text-xs font-black uppercase tracking-wider text-slate-400">Check balance</p><p className="text-sm font-medium leading-relaxed text-slate-700">{network.balance}</p></div><div><p className="mb-1 text-xs font-black uppercase tracking-wider text-slate-400">Recharge / buy data</p><p className="text-sm font-medium leading-relaxed text-slate-700">{network.recharge}</p><a className="mt-2 inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline" href={network.source} target="_blank" rel="noreferrer">Official source: {network.sourceLabel}<ArrowRight className="h-3 w-3" /></a></div></div></article>)}</div></section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">{[
        ['1. Record the SIM identity', 'Keep the router SIM number, ICCID, network, tariff and router model in your customer record. Provider setup may send an OTP by SMS, so complete linking while you can read the router SMS inbox.'],
        ['2. Link provider self-service', 'Register the line in the official app or web portal and confirm that its balance is visible from a different internet connection before leaving the site.'],
        ['3. Test remote recovery', 'From off-site, check the balance and make a small top-up or bundle purchase. Keep a “buy for another number” route in a banking app or operator portal as a backup. The purchase may still require a login, OTP or payment confirmation.']
      ].map(([heading, text]) => <article key={heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><CheckCircle2 className="mb-4 h-5 w-5 text-[#1b6d24]" /><h2 className="mb-3 text-lg font-black">{heading}</h2><p className="text-sm font-medium leading-relaxed text-slate-600">{text}</p></article>)}</section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-3 text-2xl font-black tracking-tight">Managing several remote customer sites</h2>
        <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">Managing ordinary prepaid SIMs one by one can become fragile at scale. Business IoT/M2M or managed-connectivity services may provide a central dashboard and stronger operational controls. Compare the product terms carefully: a fixed-LTE or Home Internet SIM may be tied to a location, tariff or approved router and may not behave like an ordinary prepaid SIM.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[
          'Central SIM and connectivity dashboard',
          'Low-balance, usage or expiry alerts',
          'Pooled or shared data where offered',
          'Remote router health monitoring',
          'Automated or authorised top-ups',
          'Role-based access and an audit trail'
        ].map((item) => <div key={item} className="flex gap-2 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" /><span>{item}</span></div>)}</div>
      </section>

      <section className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8"><div className="mb-4 flex items-center gap-2"><Terminal className="h-5 w-5 text-[#a0f399]" /><h2 className="text-2xl font-black">Can this be scripted?</h2></div><p className="mb-4 text-sm font-medium leading-relaxed text-slate-300">Yes, on compatible hardware. 3GPP TS 27.007 defines <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#a0f399]">AT+CUSD</code> for USSD. A typical balance request is conceptually:</p><pre className="mb-5 overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm text-[#a0f399]"><code>{'AT+CUSD=1,"*136#",15\r\n'}</code></pre><p className="mb-4 text-sm font-medium leading-relaxed text-slate-300">Do not treat that line as universal production code. First detect the modem and AT port, confirm registration, test <code>AT+CUSD=?</code>, handle multi-step sessions and character encoding, set timeouts, redact account data from logs, and allow only approved USSD strings.</p><a className="inline-flex items-center gap-1 text-xs font-black text-[#a0f399] hover:underline" href="https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=1515" target="_blank" rel="noreferrer">3GPP TS 27.007 specification<ArrowRight className="h-3 w-3" /></a></section>

      <section className="mb-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8"><div className="mb-3 flex items-center gap-2 text-amber-900"><AlertTriangle className="h-5 w-5" /><h2 className="text-xl font-black">Remote-site cautions</h2></div><ul className="space-y-2 text-sm font-medium leading-relaxed text-amber-950"><li>• Never expose the router admin page, serial port or an unrestricted USSD endpoint directly to the public internet; use a VPN and strong unique credentials.</li><li>• A top-up restores the network balance, but it cannot repair a powered-off, locked-up or misconfigured router. Use an independent power/reboot path for critical sites.</li><li>• USSD may interrupt or coexist poorly with an active data session on some modems. Test the exact router, firmware and network before relying on automation.</li><li>• Buying airtime is not always the same as buying a data bundle. Confirm the product loaded and its validity in the provider account.</li></ul></section>

      <TrustPanel lastReviewed={formatIsoForDisplay(modified)} sources="Official MTN, Vodacom, Telkom, Cell C and Rain self-service information, plus 3GPP TS 27.007 for modem USSD. Router menus and modem firmware vary, so test the exact model before deployment." className="mb-10" />
      <section id="faq" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8"><h2 className="mb-5 text-2xl font-black">Frequently asked questions</h2><div className="space-y-5">{faqs.map((faq) => <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"><h3 className="mb-2 font-black">{faq.question}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div></section>
      <DataCostAnswerCta />
      <Link to="/ussd-codes-south-africa/" className="inline-flex items-center gap-2 text-sm font-black text-[#1b6d24] hover:underline">See all South African USSD codes <ArrowRight className="h-4 w-4" /></Link>
    </main>
    <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} /><MobileNav onScrollTo={onScrollTo} activeSection="guides" />
  </div>;
};
