import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { ArrowLeft, ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigateFunction } from '../types';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface WaspSubscriptionsProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const WaspSubscriptions: React.FC<WaspSubscriptionsProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Stop WASP Subscriptions South Africa (2026)';
  const metaDescription =
    'Learn how to stop WASP subscriptions in South Africa with simple steps for Vodacom, MTN, Telkom, and Cell C, plus what to do if charges continue.';
  const canonicalUrl = toCanonicalUrl('/guides/stop-wasp-subscriptions-south-africa/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Stop WASP Subscriptions', href: '/guides/stop-wasp-subscriptions-south-africa/' }
  ];

  const networkSteps = [
    {
      network: 'Vodacom',
      code: '*135*997#',
      steps: [
        'Dial *135*997# from your Vodacom SIM.',
        'Open the subscriptions or content services option.',
        'Select each active service and unsubscribe.',
        'If available, turn on a content block for future charges.',
      ],
    },
    {
      network: 'MTN',
      code: '*155#',
      steps: [
        'Dial *155# from your MTN line.',
        'Go to content services or subscriptions.',
        'Cancel all listed paid services.',
        'Apply a block option if your menu shows one.',
      ],
    },
    {
      network: 'Telkom',
      code: '*180#',
      steps: [
        'Dial *180# on your Telkom mobile number.',
        'Check active subscriptions in the self-service menu.',
        'Stop each paid service one by one.',
        'Save confirmation SMS messages as proof.',
      ],
    },
    {
      network: 'Cell C',
      code: '*133*1#',
      steps: [
        'Dial *133*1# from your Cell C SIM.',
        'Open subscription management.',
        'Cancel any active premium services.',
        'Check your balance over the next 24 to 48 hours.',
      ],
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I stop WASP subscriptions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dial your network's subscription USSD code, view active services, and unsubscribe from each one. Then switch on a content block if your network provides it."
        }
      },
      {
        "@type": "Question",
        "name": "Why am I being charged for services I didnâ€™t subscribe to?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In many cases, charges come from premium content services that were accepted through pop-ups, links, or previous opt-ins. Check active subscriptions on your network menu and cancel any service you do not recognize."
        }
      }
    ]
  };

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <Header onScrollTo={onScrollTo} activeSection="guides" />
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100">
            <AlertTriangle className="w-3.5 h-3.5" />
            Stop Airtime Drain
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            How to Stop <span className="text-red-600">WASP Subscriptions</span> in South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            If your airtime keeps dropping, paid content services may be one reason. Use this guide to check, cancel, and block unwanted WASP charges on your network.
          </p>
        </header>

        <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            The fastest way to stop WASP charges is to dial your network subscription code, cancel every active paid service, and enable a content block if available. For most users, this reduces unexpected airtime deductions after confirmation messages are received.
          </p>
        </section>

        <section className="mb-10 bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-3">Need the full explanation first?</h2>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            This page focuses on cancellation actions. If you want a full diagnostic and prevention guide covering what WASP/VAS charges are, why they happen, how to detect them, and when to escalate, start here:
          </p>
          <Link to="/guides/how-to-stop-wasp-vas-charges-south-africa/" className="text-[#1b6d24] font-black hover:underline">
            How to Stop Unwanted WASP / VAS Charges in South Africa
          </Link>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-8">Direct Answer Summary</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-black mb-2">How to stop WASP subscriptions immediately</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Dial your network code below, open subscription management, and cancel all active paid services. Keep the cancellation SMS messages in case you need to dispute ongoing charges later.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-black mb-2">How to check if you have active subscriptions</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Use the same USSD menu and look for terms like "subscriptions", "content services", or "premium services". If unfamiliar services appear, unsubscribe and monitor your airtime for the next day or two.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" />
            Step-by-Step by Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {networkSteps.map(item => (
              <div key={item.network} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-6 gap-3">
                  <h3 className={`text-2xl font-black ${
                    item.network === 'Vodacom' ? 'text-[#E60000]' :
                    item.network === 'MTN' ? 'text-[#a16207]' :
                    item.network === 'Telkom' ? 'text-[#0066CC]' :
                    'text-slate-900'
                  }`}>{item.network}</h3>
                  <div className="px-3 py-2 bg-slate-50 rounded-2xl font-mono font-black text-[#031636] text-base tracking-widest">
                    {item.code}
                  </div>
                </div>
                <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                  {item.steps.map(step => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Why your airtime is disappearing</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            In many cases, unexpected airtime loss is linked to paid SMS content services. This can happen after tapping a popup, entering a number on a promo page, or accepting a service message without noticing the billing terms.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Airtime can also drop due to background data use. If you want a full check, use our <Link to="/ussd-codes-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">South Africa USSD codes guide</Link> and our <Link to="/guides/why-is-my-data-finishing-so-fast/" className="text-[#1b6d24] font-semibold hover:underline">data drain troubleshooting guide</Link>.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            For a broader consumer-protection explanation of WASP/VAS billing patterns, use <Link to="/guides/how-to-stop-wasp-vas-charges-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">our main WASP / VAS guide</Link>.
          </p>
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">What to do if charges continue</h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>1. Repeat the USSD check and confirm no active premium services remain.</p>
            <p>2. Contact your network support team and request a paid content block.</p>
            <p>3. Share your cancellation SMS records and ask for a charge investigation.</p>
            <p>4. If needed, compare your options on our <Link to="/network/" className="text-[#1b6d24] font-semibold hover:underline">network comparison hub</Link> before switching providers.</p>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mt-5">
            You can also review your operator page directly for support context: <Link to="/network/vodacom/" className="text-[#1b6d24] font-semibold hover:underline">Vodacom</Link>,{' '}
            <Link to="/network/mtn/" className="text-[#1b6d24] font-semibold hover:underline">MTN</Link>, or <Link to="/network/telkom/" className="text-[#1b6d24] font-semibold hover:underline">Telkom</Link>. For page methodology standards, see{' '}
            <Link to="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">how we evaluate operator information</Link>.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">How do I stop WASP subscriptions?</h3>
              <p className="text-sm text-slate-600">Dial your network code, open your subscription list, and cancel all paid services. Then enable a content block if your network menu offers one.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Why am I being charged for services I didnâ€™t subscribe to?</h3>
              <p className="text-sm text-slate-600">This is often linked to premium content sign-ups accepted through a link, popup, or old opt-in flow. Check active services on your network menu, cancel anything unfamiliar, and monitor airtime after cancellation.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/ussd-codes-south-africa/"
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#1b6d24] transition-all shadow-xl"
          >
            Full USSD Directory
          </Link>
          <Link
            to="/network/"
            className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-100 hover:border-[#a0f399] transition-all"
          >
            Compare Networks
          </Link>
        </div>
      </main>
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};



