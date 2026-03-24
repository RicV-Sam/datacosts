import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, Check, ShieldCheck, HelpCircle, XCircle, ShieldOff, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WaspSubscriptions: React.FC = () => {
  useEffect(() => {
    document.title = "How to Stop WASP Subscriptions in South Africa - Opt-Out Guide | DataCost";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Is your airtime disappearing? Learn how to unsubscribe from content services and stop WASP subscriptions for Vodacom, MTN, Telkom, and Cell C.');
    }
    window.scrollTo(0, 0);
  }, []);

  const optOutCodes = [
    { network: 'Vodacom', code: '*135*997#', instructions: 'Dial and follow the prompts to manage and unsubscribe from all premium services.' },
    { network: 'MTN', code: '*155#', instructions: 'Follow the menu to block or unsubscribe from all content services.' },
    { network: 'Telkom', code: '*180#', instructions: 'Navigate to the self-service menu or content subscriptions to opt-out.' },
    { network: 'Cell C', code: '*133*1#', instructions: 'Directly manage and stop all premium rate services.' },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a WASP subscription?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WASP stands for Wireless Application Service Provider. These are third-party companies that provide content like jokes, music, or news via SMS, often for a daily or weekly fee that drains your airtime."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my airtime disappearing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Disappearing airtime is usually caused by active WASP subscriptions or background data usage. You can use USSD codes to block these services and stop the deductions."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
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
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100">
            <AlertTriangle className="w-3.5 h-3.5" />
            Stop Airtime Drain
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            How to Stop <span className="text-red-600">WASP Subscriptions</span> in South Africa
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Is your airtime disappearing mysteriously? You are likely subscribed to a content service without knowing. Use these <span className="font-bold">USSD opt-out codes</span> to stop deductions immediately.
          </p>
        </header>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {optOutCodes.map(item => (
            <div key={item.network} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className={`text-2xl font-black ${
                  item.network === 'Vodacom' ? 'text-[#E60000]' :
                  item.network === 'MTN' ? 'text-[#eab308]' :
                  item.network === 'Telkom' ? 'text-[#0066CC]' :
                  'text-slate-900'
                }`}>{item.network}</h3>
                <div className="px-4 py-2 bg-slate-50 rounded-2xl font-mono font-black text-[#031636] text-xl tracking-widest group-hover:bg-[#a0f399]/20 transition-colors">
                  {item.code}
                </div>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                {item.instructions}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#217128]">
                <ShieldCheck className="w-4 h-4" />
                Verified for 2026
              </div>
            </div>
          ))}
        </section>

        <section className="mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl -mr-16 -mt-16"></div>
          <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" />
            Step-by-Step Guide
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold mb-1">Check for active subscriptions</h3>
                <p className="text-slate-600 text-sm">Dial the USSD code specific to your network above. Look for options like "My Subscriptions" or "Manage Content Services".</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold mb-1">Unsubscribe from ALL services</h3>
                <p className="text-slate-600 text-sm">Follow the prompts to unsubscribe from each active service. We recommend unsubscribing from ALL to be safe.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold mb-1">Activate the "Content Block"</h3>
                <p className="text-slate-600 text-sm">Most networks (like MTN and Vodacom) allow you to set a permanent block on all future content services. Ensure this is activated.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What is a WASP subscription?</h3>
              <p className="text-sm text-slate-600">WASP stands for Wireless Application Service Provider. These are third-party companies that provide content like jokes, music, or news via SMS, often for a daily or weekly fee that drains your airtime.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Why is my airtime disappearing?</h3>
              <p className="text-sm text-slate-600">Disappearing airtime is usually caused by active WASP subscriptions or background data usage. You can use USSD codes to block these services and stop the deductions.</p>
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
            to="/"
            className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-100 hover:border-[#a0f399] transition-all"
          >
            Compare Data Deals
          </Link>
        </div>
      </main>
      <Footer onScrollTo={() => {}} />
    </div>
  );
};
