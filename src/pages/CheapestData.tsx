import React, { useEffect } from 'react';
import { bundles } from '../data';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CheapestData: React.FC = () => {
  useEffect(() => {
    document.title = "Cheapest Data in South Africa (2026) - Price Comparison | DataCost";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare the cheapest mobile data bundles in South Africa. We analyze MTN, Vodacom, Telkom, Cell C and Rain to find the best cost per GB.');
    }
    window.scrollTo(0, 0);
  }, []);

  const sortedBundles = [...bundles].sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which network has the cheapest 1GB data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Telkom typically offers the lowest price for a standard 1GB anytime bundle, though MTN Boosta bundles often provide better value for larger amounts."
        }
      },
      {
        "@type": "Question",
        "name": "Is Rain the cheapest for unlimited data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Rain currently offers the most competitive unlimited 4G and 5G plans in South Africa, starting from R479 per month."
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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Cheapest Data in <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Our comprehensive comparison of mobile data prices across all major South African networks. We focus on the <span className="font-bold">effective cost per GB</span> to help you save money.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Data Price Comparison Table</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Network</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Bundle Name</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sortedBundles.map(bundle => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold">{bundle.network}</td>
                    <td className="px-6 py-4 text-slate-600">{bundle.name}</td>
                    <td className="px-6 py-4 font-black">R{bundle.price}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a0f399]/20 text-[#217128]">
                        R{bundle.costPerGb?.toFixed(2)}/GB
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#1b6d24]" />
              Winner: Value for Money
            </h3>
            <p className="text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">MTN</span> currently offers the best balance of national coverage and aggressive pricing through their "Boosta" bundles, which can drop as low as R5.98 per GB.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#1b6d24]" />
              Winner: Budget Choice
            </h3>
            <p className="text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">Telkom</span> remains the king of entry-level data, with 20GB bundles starting at just R99 (R4.95/GB), making them ideal for urban users on a tight budget.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Which network has the cheapest 1GB data?</h3>
              <p className="text-sm text-slate-600">Telkom typically offers the lowest price for a standard 1GB anytime bundle, though MTN Boosta bundles often provide better value for larger amounts.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Is Rain the cheapest for unlimited data?</h3>
              <p className="text-sm text-slate-600">Yes, Rain currently offers the most competitive unlimited 4G and 5G plans in South Africa, starting from R479 per month.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#031636] rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f399] blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Need USSD Codes?</h2>
            <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
              Check your balance or buy these bundles instantly using our verified USSD directory.
            </p>
            <Link
              to="/ussd-codes-south-africa/"
              className="inline-block px-8 py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#a0f399]/20"
            >
              View USSD Directory
            </Link>
          </div>
        </section>
      </main>
      <Footer onScrollTo={() => {}} />
    </div>
  );
};
