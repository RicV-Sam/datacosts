import React, { useEffect } from 'react';
import { networkStats } from '../data';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, Check, ShieldCheck, HelpCircle, Activity, Zap, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VodacomVsMTN: React.FC = () => {
  useEffect(() => {
    document.title = "Vodacom vs MTN Data Prices (2026) - Speed vs Price Comparison | DataCost";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Is Vodacom better than MTN for data? We compare the latest data prices, speeds, and coverage to help you choose the right network in 2026.');
    }
    window.scrollTo(0, 0);
  }, []);

  const vodacomStats = networkStats.find(n => n.network === 'Vodacom');
  const mtnStats = networkStats.find(n => n.network === 'MTN');

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
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
            <span className="text-[#E60000]">Vodacom</span> vs <span className="text-[#FFCC00]">MTN</span>: Data Price Showdown (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            Choosing between South Africa's two largest networks? We compare the <span className="font-bold">speed vs. price trade-off</span> so you can find the best value for your needs.
          </p>
        </header>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vodacom Side */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E60000]/5 blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#E60000] text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg">V</div>
              <div>
                <h2 className="text-2xl font-black text-[#E60000]">Vodacom</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">The Speed King</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#E60000] mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">5G Speed: {vodacomStats?.avgSpeed5G}</h3>
                  <p className="text-sm text-slate-500">Fastest 5G rollout in urban centers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-[#E60000] mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">Coverage: {vodacomStats?.coverage}</h3>
                  <p className="text-sm text-slate-500">Unmatched reliability in rural areas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-[#E60000] mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">Price: Premium</h3>
                  <p className="text-sm text-slate-500">Highest average cost per GB in SA.</p>
                </div>
              </div>
            </div>
          </div>

          {/* MTN Side */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00]/5 blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#FFCC00] text-[#031636] rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg">M</div>
              <div>
                <h2 className="text-2xl font-black text-[#031636]">MTN</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">The Value Champion</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#FFCC00] mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">5G Speed: {mtnStats?.avgSpeed5G}</h3>
                  <p className="text-sm text-slate-500">Extremely competitive 5G throughput.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FFCC00] mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">Resilience: {mtnStats?.resilience}</h3>
                  <p className="text-sm text-slate-500">Best performance during load shedding.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-[#FFCC00] mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">Price: {mtnStats?.pricePoint}</h3>
                  <p className="text-sm text-slate-500">Best per-GB value on prepaid "Boosta" bundles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-[#a0f399]/10 rounded-3xl p-8 border border-[#a0f399]/30">
          <h2 className="text-2xl font-black tracking-tight mb-4">The Verdict</h2>
          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            If you need the <span className="font-black">absolute fastest speeds</span> and coverage in remote areas, <span className="font-bold">Vodacom</span> is worth the premium. However, for most users looking for <span className="font-black">the best data deals</span> and reliability during power outages, <span className="font-bold text-[#eab308]">MTN</span> is currently the superior choice in 2026.
          </p>
        </section>

        <section className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#031636] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#1b6d24] transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Use Data Calculator to Compare Deals</span>
          </Link>
          <p className="mt-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
            Analyze dozens of bundles from both networks
          </p>
        </section>
      </main>
      <Footer onScrollTo={() => {}} />
    </div>
  );
};
