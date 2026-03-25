import React from 'react';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { ussdRepository } from '../data/ussd';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { ArrowLeft, ChevronRight, ShieldCheck, Zap, Info, Smartphone, HelpCircle, Clock, Tag } from 'lucide-react';
import { NetworkName, NavigateFunction } from '../types';

interface NetworkPageProps {
  networkSlug: string;
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const NetworkPage: React.FC<NetworkPageProps> = ({ networkSlug, onNavigate, onScrollTo }) => {
  const pageData = networkPages[networkSlug];

  const networkKey = pageData?.networkName as NetworkName | undefined;
  const network = networkKey ? networkMetadata[networkKey] : null;
  const networkBundles = bundles.filter(b => b.network === networkKey);
  const ussdCodes = ussdRepository.filter(u => u.network === networkKey);

  if (!network || !pageData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Network Not Found | DataCost</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-4xl font-black mb-4">Network Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md text-center">
          We couldn't find the network you're looking for. It may have been removed or the URL is incorrect.
        </p>
        <button 
          onClick={() => onNavigate('home')}
          className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-emerald-600 transition-colors"
        >
          View All Networks
        </button>
      </div>
    );
  }

  const sortedBundles = [...networkBundles].sort((a, b) => a.price - b.price);

  // Cheapest Deal Summary logic
  const cheapestDaily = networkBundles.filter(b => b.validity.toLowerCase().includes('day') || b.validity.toLowerCase().includes('hour')).sort((a, b) => a.price - b.price)[0];
  const cheapestWeekly = networkBundles.filter(b => b.validity.toLowerCase().includes('week')).sort((a, b) => a.price - b.price)[0];
  const cheapestMonthly = networkBundles.filter(b => b.validity.toLowerCase().includes('30 day') || b.validity.toLowerCase().includes('month')).sort((a, b) => a.price - b.price)[0];

  const pageTitle = `${network.name} Data Prices South Africa (2026) | DataCost`;
  const metaDescription = `Compare ${network.name} data prices in South Africa. Find the cheapest bundles, USSD codes, and best deals updated for 2026.`;
  const canonicalUrl = `https://datacost.co.za/network/${networkSlug}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${network.name} Data Prices South Africa (2026)`,
    "description": metaDescription,
    "url": canonicalUrl,
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "url": "https://datacost.co.za"
    },
    "image": "https://datacost.co.za/og-image.jpg"
  };

  const lastUpdated = "20 March 2024";

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* NAVIGATION - Aligned with USSD/GuidePage */}
      <nav aria-label="Breadcrumb" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-300">
              <ChevronRight className="w-4 h-4" />
              <button
                onClick={() => onNavigate('network')}
                className="hover:text-[#1b6d24] transition-colors text-slate-600"
              >
                Networks
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-400">{network.name}</span>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {network.name} / 2026 Data Prices
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* HERO - Centered, high-impact */}
        <header className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg"
              style={{ backgroundColor: network.color, color: network.textColor }}
            >
              {network.logoLetter}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Clock className="w-3 h-3" />
            Updated {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            {network.name} Data Prices <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {pageData.intro} We compare the cheapest {network.name} data bundles to help you find the best value for your budget.
          </p>
        </header>

        <AdUnit type="aboveFold" />

        {/* SECTION 1: DATA TABLE - Aligned with GuidePage styling */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <Tag className="w-6 h-6 text-[#1b6d24]" />
            {network.name} Data Pricing Table
          </h2>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Validity</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sortedBundles.map(bundle => (
                    <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{bundle.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-black">R{bundle.price}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">{bundle.validity}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          R{bundle.costPerGb.toFixed(2)}/GB
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-medium italic">
                * Prices are subject to change. Use the {network.name} app or USSD codes below for the latest personalized offers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: QUICK VERDICT - Replaces "Cheapest Deal Summary" */}
        <section className="mb-16 bg-[#031636] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b6d24]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/10 text-[#a0f399] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Quick Verdict
            </div>
            <h2 className="text-3xl font-black tracking-tighter mb-8">At a Glance: Is {network.name} worth it?</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Cheapest Daily', bundle: cheapestDaily },
                { label: 'Cheapest Weekly', bundle: cheapestWeekly },
                { label: 'Cheapest Monthly', bundle: cheapestMonthly }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#a0f399] text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">{item.label}</div>
                  {item.bundle ? (
                    <>
                      <div className="text-lg font-black mb-1">{item.bundle.name}</div>
                      <div className="text-2xl font-black text-[#a0f399]">R{item.bundle.price}</div>
                    </>
                  ) : (
                    <div className="text-slate-400 italic text-sm font-medium">No bundles found</div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-slate-300 leading-relaxed font-medium">
                <strong>Our Analysis:</strong> {network.name} is generally best suited for users who prioritize {network.name === 'Vodacom' || network.name === 'MTN' ? 'coverage and speed' : 'raw value and anytime data'}.
                While they offer competitive entry-level bundles, we recommend checking your personalized "Just 4 You" or "Mo'Nice" menus for the absolute lowest rates.
              </p>
            </div>
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* SECTION 3: USSD CODES - Aligned with site system */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-[#1b6d24]" />
            {network.name} USSD Codes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ussdCodes.length > 0 ? (
              ussdCodes.map((ussd, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] flex justify-between items-center group hover:border-[#a0f399] transition-all shadow-sm">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{ussd.action}</div>
                    <div className="text-2xl font-black text-[#031636] font-mono tracking-tighter group-hover:text-[#1b6d24] transition-colors">
                      {ussd.code}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#a0f399]/20 group-hover:text-[#1b6d24] group-hover:border-[#a0f399]/30 transition-all">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-slate-100 p-12 rounded-[2.5rem] text-center shadow-sm">
                <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-medium italic">
                  {network.name} is managed primarily via the official app. No USSD codes are available for this network.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: SAVINGS TIPS - Aligned with site system */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#1b6d24]" />
            How to Save Money on {network.name}
          </h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <div className="space-y-6">
              {pageData.tips.map((tip, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#031636] text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">
                    {i + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-slate-600 leading-relaxed font-medium">{tip}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#031636] text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">
                  {pageData.tips.length + 1}
                </div>
                <div className="pt-2">
                  <p className="text-slate-600 leading-relaxed font-medium">Always compare prices with other networks before buying a large bundle.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* SECTION 5: INTERNAL LINKS - Aligned with site system */}
        <section className="mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Explore More Guides & Tools</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('guide', 'cheapest-1gb-data-south-africa')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] hover:shadow-md transition-all group"
            >
              <Info className="w-6 h-6 text-[#1b6d24] mb-3" />
              <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">Cheapest 1GB Data</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Comparison Guide</p>
            </button>
            <button
              onClick={() => onNavigate('guide', 'cheap-night-data-south-africa')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] hover:shadow-md transition-all group"
            >
              <Zap className="w-6 h-6 text-[#1b6d24] mb-3" />
              <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">Cheap Night Data</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Midnight Bundles</p>
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] hover:shadow-md transition-all group"
            >
              <Smartphone className="w-6 h-6 text-[#1b6d24] mb-3" />
              <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">USSD Directory</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Quick Codes</p>
            </button>
          </div>
        </section>

        {/* SECTION 6: FAQ - Standard FAQ section style */}
        <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-slate-50 pb-8 last:border-0 last:pb-0">
              <h3 className="text-lg font-black mb-3 flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                Which {network.name} bundle is the cheapest?
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium pl-[1.125rem]">
                The cheapest {network.name} bundles are typically their 1-hour or 1-day packs. However, if you are looking for long-term value, their monthly bundles offer a lower cost per GB.
              </p>
            </div>
            <div className="border-b border-slate-50 pb-8 last:border-0 last:pb-0">
              <h3 className="text-lg font-black mb-3 flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                How do I check my {network.name} data balance?
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium pl-[1.125rem]">
                {ussdCodes.length > 0 ? `You can check your balance by dialing ${ussdCodes.find(u => u.category === 'Balance')?.code || 'the balance USSD code'} on your phone.` : `Since ${network.name} doesn't use USSD codes, you can check your balance via the official ${network.name} app or website.`}
              </p>
            </div>
          </div>
        </section>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p className="font-medium">
            <strong>Note:</strong> While we strive for accuracy, network providers often change their pricing without notice. You will be redirected to the operator’s official website when making a purchase. Prices are updated for 2026.
          </p>
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
