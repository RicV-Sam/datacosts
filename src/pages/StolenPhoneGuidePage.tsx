import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  CreditCard,
  KeyRound,
  Landmark,
  LockKeyhole,
  MapPin,
  ShieldAlert,
  Smartphone,
  WifiOff
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

const routePath = '/guides/stolen-phone-south-africa/';

const officialSources = [
  { label: 'SAPS: stolen phones and SIM-swap safety', href: 'https://www.saps.gov.za/resource_centre/publications/pamphlets/documents/crime_prevention_tips.pdf' },
  { label: 'Apple: if your iPhone was stolen', href: 'https://support.apple.com/en-us/120837' },
  { label: 'Google: find, secure or erase an Android device', href: 'https://support.google.com/android/answer/6160491' },
  { label: 'Google: Android theft protection', href: 'https://support.google.com/android/answer/15146908' },
  { label: 'Samsung: locate a lost Galaxy phone or tablet', href: 'https://www.samsung.com/us/support/answer/ANS10003600/' },
  { label: 'ICASA: SIM-swap and illegal porting warning', href: 'https://www.icasa.org.za/news/2022/awareness-on-sim-card-fraud-and-illegal-porting-of-numbers-during-the-festive-season' },
  { label: 'MTN: subscriber terms for stolen SIMs and devices', href: 'https://www.mtn.co.za/home/terms-and-conditions/content/subscriber-terms-and-conditions' },
  { label: 'Vodacom: lost-phone guidance', href: 'https://now.vodacom.co.za/do-it-yourself/help-i-ve-lost-my-phone/' },
  { label: 'Cell C: device blacklisting FAQ', href: 'https://www.cellc.co.za/cellc/faq-blacklisting' }
];

const faqs = [
  {
    question: 'What are the first three things to do after a phone is stolen?',
    answer: 'Get to safety and do not confront the thief. If the phone was unlocked or the thief knows its PIN, contact your bank immediately. From a trusted device, use Apple Find My or Google Find Hub to mark the phone as lost and capture its location and device details.'
  },
  {
    question: 'What if the thief knows my screen PIN?',
    answer: 'Treat it as a bank and account emergency. Contact your bank, secure your primary email and Apple or Google account, review signed-in devices and recovery details, and tell your mobile provider. Do not rely on the screen lock alone because the PIN may expose apps, saved passwords and OTP notifications.'
  },
  {
    question: 'What is the difference between blocking a SIM and blacklisting an IMEI?',
    answer: 'Blocking the SIM or eSIM protects the cellphone number and stops normal network use of that line. IMEI blacklisting asks participating mobile networks to block the handset itself. Blacklisting does not erase its data, prevent Wi-Fi or overseas use, or guarantee recovery.'
  },
  {
    question: 'Where can I find the IMEI after my phone has been stolen?',
    answer: 'Check the phone box, purchase invoice, network account, insurer records, Apple or Google device information, or a configured manufacturer account. Dual-SIM and eSIM phones can have more than one IMEI, so record and report every IMEI shown.'
  },
  {
    question: 'Should I erase my stolen phone immediately?',
    answer: 'First mark it as lost and capture its location, IMEI, serial number and useful screenshots. Erase it when recovery is unlikely or sensitive data is at serious risk. An offline erase normally waits until the phone reconnects, and erasure is generally irreversible.'
  },
  {
    question: 'Can I follow the location shown by Find My or Find Hub?',
    answer: 'Do not go to an unfamiliar location or confront anyone. Preserve the location and time shown and give that information to SAPS. A map position can be delayed or approximate and does not prove who has the phone.'
  },
  {
    question: 'What should I do if I suspect a SIM swap?',
    answer: 'Unexpected signal loss, a SIM-change notice, missing OTPs or an unrequested number port are warning signs. Contact the mobile provider and bank immediately, reject unsolicited approval requests, and never share an OTP, password or recovery code.'
  },
  {
    question: 'How do I recover my contacts on a replacement phone?',
    answer: 'Google contacts return when you sign in to the same Google Account, while iCloud contacts return through the same Apple Account. Contacts stored only on the old device or SIM may be lost unless device-and-SIM contact syncing or another backup was enabled.'
  }
];

const emergencySteps = [
  ['Get safe', 'Do not chase, confront or travel to a map location. Use 112 from a cellphone or 10111 for a SAPS emergency. You will still need to open a theft case through the appropriate SAPS process.'],
  ['Protect the bank first when the PIN is exposed', 'If the phone was unlocked, banking was open, or the thief knows the screen PIN, ask the bank to de-link the device, secure banking access and cards, and check recent transactions.'],
  ['Lock and capture details', 'Use Apple Find My or Google Find Hub from a trusted device. Mark the phone as lost and save the displayed location, time, IMEI and serial details before any remote erase.'],
  ['Block the SIM or eSIM', 'Ask the provider to suspend the line and explain the safe process for replacing the SIM or eSIM while keeping your number.'],
  ['Request IMEI blacklisting', 'Give the provider every IMEI, including IMEI 2 on a dual-SIM phone. Keep the IMEI-blacklisting or ITC reference, if that terminology is used by the provider.'],
  ['Report it to SAPS', 'Provide the handset details, IMEI numbers, provider reference and incident information. Keep the SAPS case number for follow-up and insurance.'],
  ['Secure accounts and warn contacts', 'Start with primary email, Apple or Google, password manager, WhatsApp and work accounts. Warn trusted contacts if someone may impersonate you.'],
  ['Check insurance and recovery', 'Contact the insurer promptly, follow the exact policy requirements, and restore only from backups and accounts you trust.']
];

export const StolenPhoneGuidePage: React.FC<Props> = ({ onNavigate, onScrollTo }) => {
  const title = 'Stolen Phone in South Africa: What to Do Immediately';
  const description = 'Phone stolen in South Africa? Protect your bank, lock an iPhone or Android, block the SIM, request IMEI blacklisting and report it to SAPS.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const published = '2026-07-12T00:00:00.000Z';
  const modified = getRouteModifiedIso(routePath);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Stolen phone', href: routePath }
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
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-800"><ShieldAlert className="h-4 w-4" /> Emergency consumer guide</div>
        <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{title}</h1>
        <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-600">A low-data action plan for a borrowed phone or computer. Start with safety and financial protection; prevention and backups come later.</p>
      </header>

      <DataCostAnswerIntro
        number={2}
        question="What should I do if my phone is stolen in South Africa?"
        answer="Get to safety and do not confront the thief. If the phone was unlocked or the thief knows its PIN, call your bank first. Then use Apple Find My or Google Find Hub to mark it as lost, save its location and IMEI details, block the SIM or eSIM, request IMEI blacklisting, report the theft to SAPS, and secure your accounts."
      />

      <section className="mb-10 rounded-[2rem] border-2 border-red-300 bg-red-50 p-6 shadow-sm md:p-8">
        <div className="mb-3 flex items-center gap-2 text-red-900"><AlertTriangle className="h-6 w-6" /><h2 className="text-2xl font-black">If the thief knows your screen PIN</h2></div>
        <p className="mb-4 font-bold leading-relaxed text-red-950">Treat this as a bank and identity emergency, not only a missing-device problem. The PIN may expose banking apps, saved passwords, email, OTP previews and account-recovery settings.</p>
        <ul className="space-y-2 text-sm font-medium leading-relaxed text-red-950">
          <li>• Call the bank and ask it to de-link the stolen device, secure cards and digital wallets, and review transactions.</li>
          <li>• Secure the primary email account and review Apple or Google recovery details and signed-in devices.</li>
          <li>• Tell the mobile provider the PIN is compromised when blocking the line and reporting possible SIM-swap activity.</li>
          <li>• If physical bank cards, an ID document or vehicle keys were also taken, follow the additional steps below immediately.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-3xl font-black tracking-tight">Emergency checklist</h2>
        <p className="mb-5 text-sm font-medium text-slate-600">Work down this list. If the handset was unlocked or the PIN is known, do not delay the bank and account-security steps while trying to track it.</p>
        <ol className="grid gap-4 md:grid-cols-2">
          {emergencySteps.map(([heading, text], index) => <li key={heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1b6d24] text-sm font-black text-white">{index + 1}</div>
            <h3 className="mb-2 text-lg font-black">{heading}</h3>
            <p className="text-sm font-medium leading-relaxed text-slate-600">{text}</p>
          </li>)}
        </ol>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-[#1b6d24]" /><h2 className="text-2xl font-black">Capture this before remote erasure</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[
          'Current or last-known location and time',
          'IMEI 1 and IMEI 2 where shown',
          'Serial number and exact model',
          'Battery and online/offline status',
          'Screenshots useful to SAPS or insurance',
          'Provider blacklisting reference'
        ].map((item) => <div key={item} className="flex gap-2 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />{item}</div>)}</div>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center gap-2"><Smartphone className="h-5 w-5 text-slate-900" /><h2 className="text-2xl font-black">Stolen iPhone: Apple Find My</h2></div>
          <ol className="mb-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <li><strong>1.</strong> On a trusted device, open <a href="https://www.icloud.com/find" target="_blank" rel="noreferrer" className="font-black text-[#1b6d24] hover:underline">iCloud Find Devices</a>. Apple says Find Devices on the web can be opened without the verification code sent to the stolen phone.</li>
            <li><strong>2.</strong> Select the iPhone, choose <strong>Mark as Lost</strong>, and capture its location and device information.</li>
            <li><strong>3.</strong> Do not add personal contact details to a stolen iPhone’s Lost Mode message; Apple warns this can enable social engineering.</li>
            <li><strong>4.</strong> Erase it remotely only after preserving useful details and when recovery is unlikely or sensitive data is at risk.</li>
          </ol>
          <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold leading-relaxed text-red-950">Never remove the stolen iPhone from Find My or the Apple Account device list used for theft protection, even after erasure. Removing it can disable Activation Lock and make resale easier.</div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">If Find My was not enabled before the theft, Apple cannot locate, mark as lost or remotely erase it through Find My. Secure the Apple Account, email, bank and network immediately. Apple will not contact you to say the phone has been found; never share the passcode, password or verification code.</p>
          <a href="https://support.apple.com/en-us/120837" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official Apple stolen-device guidance <ArrowRight className="h-3 w-3" /></a>
        </article>

        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center gap-2"><Smartphone className="h-5 w-5 text-[#1b6d24]" /><h2 className="text-2xl font-black">Stolen Android: Google Find Hub</h2></div>
          <ol className="mb-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <li><strong>1.</strong> On a trusted device, open <a href="https://android.com/find" target="_blank" rel="noreferrer" className="font-black text-[#1b6d24] hover:underline">Google Find Hub</a>, previously called Find My Device.</li>
            <li><strong>2.</strong> Select the phone, review its current or last-known location, and choose <strong>Mark as lost</strong>.</li>
            <li><strong>3.</strong> Save its IMEI, location and status before considering <strong>Factory reset</strong>.</li>
            <li><strong>4.</strong> If Find Hub sign-in is blocked by two-step verification, use a saved recovery method or contact the provider for a replacement SIM through its verified process.</li>
          </ol>
          <div className="rounded-2xl bg-amber-50 p-4 text-sm font-bold leading-relaxed text-amber-950">After erasure, do not remove the stolen Android phone from your Google Account. Keeping it associated supports Android’s device-protection controls; removing it does not help recovery.</div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">Find Hub works best when the phone has power, a Google Account, a screen lock and finding enabled. Offline or powered-off finding varies by model. A reset can leave removable SD-card data behind, and Find Hub location normally stops after erasure.</p>
          <a href="https://support.google.com/android/answer/6160491" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#1b6d24] hover:underline">Official Google Find Hub guidance <ArrowRight className="h-3 w-3" /></a>
        </article>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2"><Cloud className="h-5 w-5 text-[#1b6d24]" /><h2 className="text-2xl font-black">Manufacturer tools are secondary</h2></div>
        <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">Use Apple Find My for iPhone and Google Find Hub for Android first. A manufacturer account may provide another route only when the exact service was supported and enabled on that model, region and operating system before the theft.</p>
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500"><th className="p-3">Brand</th><th className="p-3">Secondary service</th><th className="p-3">What to verify</th></tr></thead><tbody className="font-medium text-slate-700">
          <tr className="border-b border-slate-100"><td className="p-3 font-black">Samsung Galaxy</td><td className="p-3"><a href="https://www.samsung.com/us/support/answer/ANS10003600/" target="_blank" rel="noreferrer" className="text-[#1b6d24] hover:underline">Samsung Find / SmartThings Find</a></td><td className="p-3">Samsung Account, lost-device protection, Send last location and Offline finding. Options vary by device and region.</td></tr>
          <tr className="border-b border-slate-100"><td className="p-3 font-black">Huawei</td><td className="p-3"><a href="https://consumer.huawei.com/en/support/content/en-us00887454/" target="_blank" rel="noreferrer" className="text-[#1b6d24] hover:underline">Huawei Find Device</a></td><td className="p-3">Huawei ID, Huawei Cloud availability, HMS/EMUI version, model and registered account region.</td></tr>
          <tr className="border-b border-slate-100"><td className="p-3 font-black">Xiaomi, Redmi, POCO</td><td className="p-3"><a href="https://www.mi.com/global/support/faq/details/KA-559172/" target="_blank" rel="noreferrer" className="text-[#1b6d24] hover:underline">Xiaomi Cloud Find Device</a></td><td className="p-3">Xiaomi Account, Xiaomi Cloud Find Device and required permissions enabled beforehand.</td></tr>
          <tr className="border-b border-slate-100"><td className="p-3 font-black">OPPO</td><td className="p-3"><a href="https://www.oppo.com/en/newsroom/stories/stay-safe-on-your-phone-with-coloros/" target="_blank" rel="noreferrer" className="text-[#1b6d24] hover:underline">Google Find Hub</a></td><td className="p-3">OPPO’s official guidance points supported ColorOS phones to Google’s service.</td></tr>
          <tr><td className="p-3 font-black">Other Android brands</td><td className="p-3">Google Find Hub</td><td className="p-3">Check the exact model and Android version. Do not assume a separate manufacturer recovery service exists.</td></tr>
        </tbody></table></div>
      </section>

      <section className="mb-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2"><WifiOff className="h-5 w-5 text-[#1b6d24]" /><h2 className="text-xl font-black">Block the SIM or eSIM</h2></div>
          <p className="text-sm font-medium leading-relaxed text-slate-600">Use the provider’s official support channel to suspend the line and ask how to obtain a verified replacement with the same number. This protects the number and normal network use, but it does not erase the phone. A SIM block can remove mobile-data tracking, although Wi-Fi or supported offline finding may still work.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2"><LockKeyhole className="h-5 w-5 text-[#1b6d24]" /><h2 className="text-xl font-black">Request IMEI blacklisting</h2></div>
          <p className="text-sm font-medium leading-relaxed text-slate-600">Give the provider every IMEI and retain the IMEI-blacklisting or ITC reference, if that terminology is used by the provider. This requests blocking on participating mobile networks. It does not erase data, prevent Wi-Fi or overseas use, block every network with certainty, or guarantee recovery.</p>
        </article>
      </section>

      <section className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8">
        <h2 className="mb-4 text-2xl font-black">Report the theft to SAPS</h2>
        <p className="mb-5 text-sm font-medium leading-relaxed text-slate-300">Follow SAPS instructions and obtain a case number. Bring or retain as much of the following as you have; do not delay urgent safety or bank action because one item is missing.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[
          'Make, model and colour',
          'IMEI 1 and IMEI 2',
          'Provider blacklisting reference',
          'Date, time, place and incident details',
          'Location screenshots or serial number',
          'Purchase or insurance information'
        ].map((item) => <div key={item} className="flex gap-2 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a0f399]" />{item}</div>)}</div>
        <a href="https://www.saps.gov.za/resource_centre/publications/pamphlets/documents/crime_prevention_tips.pdf" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-xs font-black text-[#a0f399] hover:underline">Official SAPS safety guidance <ArrowRight className="h-3 w-3" /></a>
      </section>

      <section className="mb-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <div className="mb-3 flex items-center gap-2 text-amber-950"><ShieldAlert className="h-5 w-5" /><h2 className="text-2xl font-black">Watch for SIM-swap and account fraud</h2></div>
        <p className="mb-4 text-sm font-medium leading-relaxed text-amber-950">Unexpected signal loss, an unrequested SIM or eSIM notice, missing OTPs, a number-port message, WhatsApp registration alerts or a newly linked bank device can indicate fraud.</p>
        <ul className="space-y-2 text-sm font-medium leading-relaxed text-amber-950"><li>• Contact both the mobile provider and bank through verified official channels.</li><li>• Never approve an unsolicited SIM-swap prompt or share an OTP, PIN, password or recovery code.</li><li>• Secure primary email first, then Apple or Google, password manager, WhatsApp, social media and shopping accounts.</li><li>• Warn trusted contacts if someone may impersonate you or ask them for money.</li></ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-3xl font-black tracking-tight">If other important items were stolen</h2>
        <div className="grid gap-4 md:grid-cols-2">{[
          { icon: BriefcaseBusiness, heading: 'Work phone or work accounts', text: 'Notify the employer or IT/security team immediately. Ask them to revoke work sessions, remove the device from Microsoft 365 or other device management, protect VPN and authenticator access, and apply the organisation’s remote-lock or wipe process.' },
          { icon: CreditCard, heading: 'Physical bank cards', text: 'Freeze or cancel the cards through the bank’s verified channel, check transactions and ask whether cards stored in Apple Pay, Google Wallet or other wallets need separate action.' },
          { icon: Landmark, heading: 'South African ID, passport or licence', text: 'Tell SAPS what was taken and follow the issuing authority’s replacement and fraud-protection process. Monitor accounts for identity misuse and keep the case number and copies of relevant reports.' },
          { icon: KeyRound, heading: 'Vehicle or home keys', text: 'If identifying information or the vehicle was accessible, move the vehicle if safe and contact the insurer, tracking company, dealer or locksmith. Treat keys and remote fobs as compromised.' }
        ].map(({ icon: Icon, heading, text }) => <article key={heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><Icon className="mb-3 h-5 w-5 text-[#1b6d24]" /><h3 className="mb-2 text-lg font-black">{heading}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{text}</p></article>)}</div>
      </section>

      <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-black">Insurance</h2>
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600">Contact the insurer promptly and follow the exact policy, rather than assuming a universal deadline or procedure. It may ask for the SAPS case number, statement or affidavit, IMEI, provider blacklisting reference, proof of purchase, proof that the line was blocked, and an incident description.</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">Do not buy another handset or discard evidence until you understand the claim requirements.</p>
        </article>
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-black">Restore contacts and data</h2>
          <p className="mb-3 text-sm font-medium leading-relaxed text-slate-600">Google contacts normally return after signing in to the same Google Account. On Android, local, device and SIM contacts may need the separate “also sync device and SIM contacts” setting. iPhone contacts may be stored in iCloud, Google, Microsoft or a work account.</p>
          <p className="text-sm font-medium leading-relaxed text-slate-600">Photos, WhatsApp, authenticator accounts and app data have separate backup rules. Restore from a known-good backup and verify its date rather than assuming every app was included.</p>
        </article>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-2xl font-black">Prepare the next phone</h2>
        <div className="grid gap-3 sm:grid-cols-2">{[
          'Enable Apple Find My or Google Find Hub and offline finding',
          'Enable Apple Stolen Device Protection or supported Android theft protection',
          'Use a strong screen code and hide OTP notification previews',
          'Record every IMEI and the serial number outside the phone',
          'Back up contacts, photos, WhatsApp and authenticator recovery information',
          'Store account recovery codes somewhere other than the phone',
          'Confirm the date of the latest successful backup',
          'Save verified bank, network and insurer support routes separately'
        ].map((item) => <div key={item} className="flex gap-2 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />{item}</div>)}</div>
      </section>

      <TrustPanel
        lastReviewed={formatIsoForDisplay(modified)}
        sources="Official SAPS, ICASA, Apple, Google, Samsung and South African mobile-provider guidance. Recovery features and provider processes vary by model, account, region, operating system and policy."
        className="mb-6"
      />
      <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-2xl font-black">Official sources</h2>
        <ul className="grid gap-3 md:grid-cols-2">{officialSources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm font-black leading-relaxed text-[#1b6d24] hover:underline">{source.label}<ArrowRight className="mt-1 h-3 w-3 flex-shrink-0" /></a></li>)}</ul>
      </section>

      <section id="faq" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-5 text-2xl font-black">Frequently asked questions</h2>
        <div className="space-y-5">{faqs.map((faq) => <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"><h3 className="mb-2 font-black">{faq.question}</h3><p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div>
      </section>

      <DataCostAnswerCta />
      <Link to="/guides/" className="inline-flex items-center gap-2 text-sm font-black text-[#1b6d24] hover:underline">Browse all DataCost guides <ArrowRight className="h-4 w-4" /></Link>
    </main>
    <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
    <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
  </div>;
};
