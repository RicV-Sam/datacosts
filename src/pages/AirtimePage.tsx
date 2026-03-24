import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { networkMetadata } from '../data';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { RelatedPages } from '../components/RelatedPages';
import { ArrowLeft, ExternalLink, ShieldCheck, Phone, CreditCard, Smartphone } from 'lucide-react';

export const AirtimePage: React.FC = () => {
  const { networkSlug } = useParams<{ networkSlug: string }>();

  const networkKey = Object.keys(networkMetadata).find(
    key => key.toLowerCase().replace(' ', '') === networkSlug
  );
  const network = networkKey ? networkMetadata[networkKey as keyof typeof networkMetadata] : null;

  if (!network) {
    return <div>Network not found</div>;
  }

  const pageTitle = `Buy ${network.name} Airtime Online - Quick & Easy (2026) | DataCost`;
  const metaDescription = `Need to top up your ${network.name} account? Compare the best ways to buy ${network.name} airtime online, via app, or USSD in South Africa.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How can I buy ${network.name} airtime online?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can buy ${network.name} airtime online through the official ${network.name} website, your banking app, or third-party vendors like Recharge.com.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the USSD code to recharge ${network.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The common way to recharge via USSD for ${network.name} is by dialing their self-service menu at ${network.ussdBalance}.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://datacost.co.za/buy-airtime/${networkSlug}/`} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <AdUnit type="aboveFold" />

        <header className="mb-16 text-center">
          <div
            className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl font-black shadow-2xl"
            style={{ backgroundColor: network.color, color: network.textColor }}
          >
            {network.logoLetter}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
            Buy <span style={{ color: network.color }}>{network.name} Airtime</span> Online
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Top up your {network.name} account instantly. Whether you need airtime for calls or to convert into data bundles, here are the fastest methods in 2026.
          </p>
        </header>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <Smartphone className="w-8 h-8 mx-auto mb-4 text-slate-400" />
            <h3 className="font-bold mb-2">Banking App</h3>
            <p className="text-xs text-slate-500 leading-relaxed">The easiest way. Log into your bank (FNB, Capitec, ABSA) and select 'Buy Airtime'.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <CreditCard className="w-8 h-8 mx-auto mb-4 text-slate-400" />
            <h3 className="font-bold mb-2">Official Site</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Visit the {network.name} website to buy directly with your credit or debit card.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <Phone className="w-8 h-8 mx-auto mb-4 text-slate-400" />
            <h3 className="font-bold mb-2">USSD Voucher</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Buy a physical voucher at a retail store and dial the recharge code on your phone.</p>
          </div>
        </section>

        <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl">
          <h2 className="text-3xl font-black tracking-tight mb-8">Step-by-Step Top Up Guide</h2>
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Choose your amount</h3>
                <p className="text-slate-600">Decide how much airtime you need. Remember to check the price of the data bundle you want to buy later.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Select payment method</h3>
                <p className="text-slate-600">Use your banking app for the fastest experience, or the official {network.name} portal for secure card payments.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Confirm and Receive</h3>
                <p className="text-slate-600">Once payment is successful, your airtime will be credited instantly. You'll receive an SMS confirmation.</p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit type="inContent" />

        <div className="bg-[#031636] rounded-3xl p-8 md:p-12 text-center text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f399] blur-[120px] opacity-10 -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tighter mb-4 text-[#a0f399]">Ready to buy?</h2>
            <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto text-sm">
              You will be redirected to the official {network.name} site to complete your purchase securely.
            </p>
            <a
              href={network.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#a0f399]/20"
            >
              Go to Official Site
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        <RelatedPages currentNetwork={network.name} />
      </main>

      <Footer onScrollTo={() => {}} />
    </div>
  );
};
