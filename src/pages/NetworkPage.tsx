import React from 'react';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata, networkStats } from '../data';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { RelatedPages } from '../components/RelatedPages';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { NetworkName } from '../types';

interface NetworkPageProps {
  networkSlug: string;
  onNavigate: (page: 'home' | 'ussd' | 'guide' | 'network', slug?: string) => void;
}

export const NetworkPage: React.FC<NetworkPageProps> = ({ networkSlug, onNavigate }) => {
  // Normalized slug mapping
  const targetSlug = networkSlug?.toLowerCase().replace(/[^a-z0-9]/g, '');
  const networkKey = Object.keys(networkMetadata).find(
    k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === targetSlug
  ) as NetworkName | undefined;

  const network = networkKey
    ? networkMetadata[networkKey]
    : null;

  const stats = networkKey
    ? networkStats.find(n => n.network === networkKey)
    : null;

  const networkBundles = bundles.filter(b => b.network === networkKey);

  if (!network) {
    return (
      <div className="min-h-screen bg-mesh flex flex-col items-center justify-center p-4">
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
          className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-[#1b6d24] transition-colors"
        >
          View All Networks
        </button>
      </div>
    );
  }

  // SAFE SORT
  const sortedBundles = [...networkBundles].sort((a, b) => a.price - b.price);
  const cheapestBundle = sortedBundles[0];

  const pageTitle = `${network.name} Data Prices South Africa (2026) | Cheapest Bundles Compared`;
  const metaDescription = `Compare ${network.name} data prices in South Africa. Find the cheapest bundles, cost per GB, and best deals updated for 2026.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Which ${network.name} data bundle is the cheapest?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The cheapest ${network.name} bundle is currently ${cheapestBundle?.name}, but larger bundles offer better value per GB.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I check my ${network.name} data balance?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Dial ${network.ussdBalance} to check your airtime and data balance instantly.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">

      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://datacost.co.za/network/${networkSlug}/`} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Networks
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">

        <AdUnit type="aboveFold" />

        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl"
              style={{ backgroundColor: network.color, color: network.textColor }}
            >
              {network.logoLetter}
            </div>

            <h1 className="text-4xl font-black">
              {network.name} Data Prices South Africa (2026)
            </h1>
          </div>

          <p className="text-lg text-slate-600">
            Compare all {network.name} data bundles in South Africa. We analyse pricing,
            cost per GB, and real-world value to help you find the cheapest deal.
          </p>
        </header>

        {/* FEATURED SNIPPET */}
        <section className="mb-12 bg-white border-l-4 border-[#1b6d24] p-6 rounded-xl shadow-sm">
          <h2 className="font-black text-lg mb-2">
            What are {network.name} data prices in South Africa?
          </h2>
          <p className="text-sm text-slate-600">
            {network.name} data prices range from low-cost daily bundles to larger monthly packages.
            The cheapest option currently is <strong>{cheapestBundle?.name}</strong>,
            while bigger bundles offer the best value per GB.
          </p>
        </section>

        {/* TABLE */}
        <section className="mb-12">
          <div className="overflow-x-auto bg-white rounded-3xl border shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs uppercase">Bundle</th>
                  <th className="px-6 py-4 text-xs uppercase">Price</th>
                  <th className="px-6 py-4 text-xs uppercase">Cost/GB</th>
                </tr>
              </thead>

              <tbody>
                {sortedBundles.map(bundle => (
                  <tr key={bundle.id} className="border-t hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-bold">{bundle.name}</div>
                      <div className="text-xs text-slate-400">
                        {bundle.volume} • {bundle.validity}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-black">R{bundle.price}</td>

                    <td className="px-6 py-4 text-[#1b6d24] font-bold">
                      R{bundle.costPerGb.toFixed(2)}/GB
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* NETWORK STATS */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">

          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="font-black mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1b6d24]" />
              Network Stats
            </h3>

            <ul className="space-y-2 text-sm">
              <li>Coverage: <strong>{stats?.coverage}</strong></li>
              <li>Speed: <strong>{stats?.avgSpeed5G}</strong></li>
              <li>Reliability: <strong>{stats?.resilience}</strong></li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-[#031636] text-white p-6 rounded-3xl">
            <h3 className="font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#a0f399]" />
              Buy {network.name}
            </h3>

            <a
              href={network.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 bg-[#a0f399] text-[#031636] rounded-xl font-black"
            >
              Buy on Official Site
              <ExternalLink className="inline w-4 h-4 ml-2" />
            </a>
          </div>

        </section>

        {/* INTERNAL LINKS */}
        <section className="mb-16">
          <h2 className="text-xl font-black mb-4">Related Guides</h2>

          <ul className="space-y-2 text-sm text-blue-600">
            <li>
              <a href="/guides/cheapest-1gb-data-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('guide', 'cheapest-1gb-data-south-africa'); }} className="hover:underline">
                Cheapest 1GB Data
              </a>
            </li>
            <li>
              <a href="/guides/best-data-deals-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('guide', 'best-data-deals-south-africa'); }} className="hover:underline">
                Best Data Deals
              </a>
            </li>
            <li>
              <a href="/ussd-codes-south-africa/" onClick={(e) => { e.preventDefault(); onNavigate('ussd'); }} className="hover:underline">
                USSD Codes
              </a>
            </li>
          </ul>
        </section>

        <RelatedPages currentNetwork={network.name} onNavigate={onNavigate} />

      </main>

      <Footer onScrollTo={() => {}} />
      <AdUnit type="stickyMobile" />

    </div>
  );
};
