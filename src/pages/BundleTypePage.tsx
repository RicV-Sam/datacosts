import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { ussdRepository } from '../data/ussd';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Info, Smartphone, HelpCircle } from 'lucide-react';
import { NetworkName, NavigateFunction } from '../types';
import { BUNDLE_TYPE_MAP } from '../config/routeCatalog';
import { buildBundleItemListSchema } from '../utils/structuredData';

interface BundleTypePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const BundleTypePage: React.FC<BundleTypePageProps> = ({ onNavigate, onScrollTo }) => {
  const { networkSlug, bundleType } = useParams<{ networkSlug: string; bundleType: string }>();

  const typeConfig = bundleType ? BUNDLE_TYPE_MAP[bundleType] : null;
  const networkData = networkSlug ? networkPages[networkSlug] : null;
  const networkKey = networkData?.networkName as NetworkName | undefined;
  const network = networkKey ? networkMetadata[networkKey] : null;

  if (!network || !typeConfig || !networkData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Page Not Found | DataCost</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md text-center">
          We couldn't find the specific bundle category you're looking for.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-emerald-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const matchingBundles = bundles
    .filter(b => b.network === network.name && typeConfig.filter(b))
    .sort((a, b) => a.price - b.price);

  const bestDeal = matchingBundles.length > 0 ? matchingBundles[0] : null;

  const pageTitle = `${network.name} ${typeConfig.label} Data Prices South Africa (2026) | DataCost`;
  const metaDescription = `Find the cheapest ${typeConfig.label} data bundles on ${network.name}. Compare prices, validity, and value for 2026.`;
  const canonicalUrl = `https://datacost.co.za/network/${networkSlug}/${bundleType}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${network.name} ${typeConfig.label} Data Prices South Africa (2026)`,
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

  const ussdCodes = ussdRepository.filter(u => u.network === network.name);

  const bundleItemListSchema = buildBundleItemListSchema(
    `${network.name} ${typeConfig.label} Mobile Data Bundles`,
    canonicalUrl,
    matchingBundles,
    () => canonicalUrl
  );

  const getPriceInsights = () => {
    if (!matchingBundles.length) return null;

    const allMatching = bundles.filter(b => typeConfig.filter(b)).sort((a, b) => a.price - b.price);
    if (allMatching.length === 0) return null;

    const marketCheapest = allMatching[0];
    const isCheapestInMarket = bestDeal && bestDeal.price <= marketCheapest.price;

    const minPrice = bestDeal?.price;
    const maxPrice = matchingBundles[matchingBundles.length - 1].price;
    const priceRangeText = minPrice === maxPrice
      ? <strong>R{minPrice}</strong>
      : <>from <strong>R{minPrice}</strong> to <strong>R{maxPrice}</strong></>;

    return (
      <p className="text-lg text-slate-600 leading-relaxed">
        {network.name} {typeConfig.label} prices are currently {priceRangeText}.
        {isCheapestInMarket
          ? ` Currently, ${network.name} offers the most competitive price for ${typeConfig.label} in South Africa.`
          : ` While ${network.name} is a strong contender, ${marketCheapest.network} currently offers the lowest price for ${typeConfig.label} at R${marketCheapest.price}.`}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(bundleItemListSchema)}
        </script>
      </Helmet>

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('network', networkSlug)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            More {network.name} Bundles
          </button>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">
            {network.name} {typeConfig.label} 2026
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
              {network.name} {typeConfig.label} Data Prices South Africa (2026)
            </h1>
          </div>
          {getPriceInsights()}
        </header>

        {/* SECTION 1: FILTERED TABLE */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-600" />
            Available {network.name} {typeConfig.label} Bundles
          </h2>
          {matchingBundles.length > 0 ? (
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
                  {matchingBundles.map(bundle => (
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
          ) : (
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl text-center text-slate-500 italic">
              No matching bundles found for this category.
            </div>
          )}
        </section>

        <AdUnit type="inContent" />

        {/* SECTION 2: BEST DEAL */}
        {bestDeal && (
          <section className="mb-16 bg-[#031636] text-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                Best Value {network.name} {typeConfig.label} Deal
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">R{bestDeal.price}</div>
                  <div className="text-xl font-bold mb-1">{bestDeal.name}</div>
                  <div className="text-slate-400 font-medium">Valid for {bestDeal.validity} • R{bestDeal.costPerGb.toFixed(2)} / GB</div>
                </div>
                <a
                  href={network.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20"
                >
                  View on Official Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-6 text-xs text-slate-400 font-medium">You will be redirected to the operator’s official website.</p>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </section>
        )}

        {/* SECTION 4: USSD CODES */}
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

        {/* SECTION 5: INTERNAL LINKS */}
        <section className="mb-16 border-t border-slate-100 pt-12">
          <h2 className="text-2xl font-black mb-6">Helpful Data Guides</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {typeConfig.guideSlug && (
              <button
                onClick={() => onNavigate('guide', typeConfig.guideSlug)}
                className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <Info className="w-6 h-6 text-emerald-500 mb-3" />
                <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Compare All {typeConfig.label}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Market Comparison</div>
              </button>
            )}
            <button
              onClick={() => onNavigate('ussd')}
              className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <Smartphone className="w-6 h-6 text-emerald-500 mb-3" />
              <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">USSD Codes Directory</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Quick Codes</div>
            </button>
            <button
              onClick={() => onNavigate('network', networkSlug)}
              className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <Zap className="w-6 h-6 text-emerald-500 mb-3" />
              <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">All {network.name} Prices</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">{network.name} Network</div>
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
