import React from 'react';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { ussdRepository } from '../data/ussd';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Info, Smartphone, HelpCircle } from 'lucide-react';
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

  // Section 2: Cheapest Deal Summary
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

  return (
    <div className="min-h-screen bg-white text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">
            {network.name} Data 2026
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <AdUnit type="aboveFold" />

        {/* HEADER SECTION */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg"
              style={{ backgroundColor: network.color, color: network.textColor }}
            >
              {network.logoLetter}
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              {network.name} Data Prices South Africa (2026)
            </h1>
          </div>
          <p className="text-xl text-slate-600 leading-relaxed">
            {pageData.intro} We compare the cheapest {network.name} data bundles to help you find the best value for your budget.
          </p>
        </header>

        {/* SECTION 1: DATA TABLE */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-600" />
            {network.name} Data Pricing Table
          </h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Bundle Name</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Validity</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Cost/GB</th>
                </tr>
              </thead>
              <tbody>
                {sortedBundles.map(bundle => (
                  <tr key={bundle.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{bundle.name}</td>
                    <td className="px-6 py-4 font-black text-slate-900">R{bundle.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{bundle.validity}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-100">
                        R{bundle.costPerGb.toFixed(2)} / GB
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* SECTION 2: CHEAPEST DEAL SUMMARY */}
        <section className="mb-16 bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Cheapest {network.name} Deals Summary
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Cheapest Daily', bundle: cheapestDaily },
                { label: 'Cheapest Weekly', bundle: cheapestWeekly },
                { label: 'Cheapest Monthly', bundle: cheapestMonthly }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                  <div className="text-emerald-400 text-sm font-black uppercase mb-2">{item.label}</div>
                  {item.bundle ? (
                    <>
                      <div className="text-xl font-black mb-1">{item.bundle.name}</div>
                      <div className="text-2xl font-black text-emerald-400">R{item.bundle.price}</div>
                    </>
                  ) : (
                    <div className="text-slate-400 italic">No bundles found</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </section>

        {/* SECTION 3: USSD CODES */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-emerald-600" />
            {network.name} USSD Codes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ussdCodes.length > 0 ? (
              ussdCodes.map((ussd, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex justify-between items-center group hover:border-emerald-200 transition-colors">
                  <div>
                    <div className="text-xs font-black text-slate-400 uppercase mb-1">{ussd.action}</div>
                    <div className="text-xl font-black text-slate-900 font-mono tracking-tight group-hover:text-emerald-600 transition-colors">
                      {ussd.code}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">
                    <Smartphone className="w-4 h-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center text-slate-500 italic">
                {network.name} is managed via the official app. No USSD codes available.
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: HOW TO SAVE MONEY */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            How to Save Money on {network.name}
          </h2>
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
            <ul className="space-y-4">
              {pageData.tips.map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">
                    {i + 1}
                  </div>
                  <p className="text-emerald-900 font-medium">{tip}</p>
                </li>
              ))}
              <li className="flex gap-4">
                <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">
                  {pageData.tips.length + 1}
                </div>
                <p className="text-emerald-900 font-medium">Always compare prices with other networks before buying a large bundle.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 5: INTERNAL LINKS */}
        <section className="mb-16 border-t border-slate-100 pt-12">
          <h2 className="text-2xl font-black mb-6">Explore More Guides</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('guide', 'cheapest-1gb-data-south-africa')}
              className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <Info className="w-6 h-6 text-emerald-500 mb-3" />
              <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Cheapest 1GB Data</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Comparison Guide</div>
            </button>
            <button
              onClick={() => onNavigate('guide', 'cheap-night-data-south-africa')}
              className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <Zap className="w-6 h-6 text-emerald-500 mb-3" />
              <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Cheap Night Data</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Midnight Bundles</div>
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <Smartphone className="w-6 h-6 text-emerald-500 mb-3" />
              <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">USSD Codes Directory</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Quick Codes</div>
            </button>
          </div>
        </section>

        <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p>
            <strong>Note:</strong> While we strive for accuracy, network providers often change their pricing without notice. You will be redirected to the operator’s official website when making a purchase. Prices are updated for 2026.
          </p>
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
