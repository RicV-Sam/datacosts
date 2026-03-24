import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata, networkStats } from '../data';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { RelatedPages } from '../components/RelatedPages';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Info } from 'lucide-react';

export const NetworkPage: React.FC = () => {
  const { networkSlug } = useParams<{ networkSlug: string }>();

  const networkKey = Object.keys(networkMetadata).find(
    key => key.toLowerCase().replace(' ', '') === networkSlug
  );

  const network = networkKey ? networkMetadata[networkKey as keyof typeof networkMetadata] : null;
  const stats = networkKey ? networkStats.find(n => n.network === networkKey) : null;
  const networkBundles = bundles.filter(b => b.network === networkKey);

  if (!network) {
    return <div>Network not found</div>;
  }

  const pageTitle = `${network.name} Data Bundles South Africa (2026) - Full Comparison | DataCost`;
  const metaDescription = `Find the cheapest ${network.name} data bundles in South Africa. We compare ${networkBundles.length} different packages based on cost per GB, speed, and reliability.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Which ${network.name} data bundle is the cheapest?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Currently, the ${networkBundles.sort((a, b) => a.price - b.price)[0]?.name} is the most budget-friendly, while the best value per GB often comes from larger bundles.`
        }
      },
      {
        "@type": "Question",
        "name": `Does ${network.name} have good 5G coverage?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `According to our latest tests, ${network.name} has ${stats?.coverage} and an average 5G speed of ${stats?.avgSpeed5G}.`
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

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Networks</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <AdUnit type="aboveFold" />

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl"
              style={{ backgroundColor: network.color, color: network.textColor }}
            >
              {network.logoLetter}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                {network.name} Data Bundles South Africa (2026)
              </h1>
            </div>
          </div>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
            {network.description} Below is a comprehensive list of every verified data package currently offered by {network.name}, ranked by their real-world value.
          </p>
        </header>

        <section className="mb-12">
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Bundle Name</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cost/GB</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {networkBundles.map(bundle => (
                  <tr key={bundle.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">{bundle.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{bundle.volume} • {bundle.validity}</div>
                    </td>
                    <td className="px-6 py-4 font-black">R{bundle.price}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-[#1b6d24]">R{bundle.costPerGb.toFixed(2)}/GB</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/network/${networkSlug}/${bundle.slug}/`}
                        className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#1b6d24] transition-colors flex items-center gap-1"
                      >
                        Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit type="inContent" />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1b6d24]" />
              Network Stats
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Coverage:</span>
                <span className="font-black text-slate-700">{stats?.coverage}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Avg Speed:</span>
                <span className="font-black text-slate-700">{stats?.avgSpeed5G}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Load Shedding:</span>
                <span className="font-black text-slate-700">{stats?.resilience}</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#031636] rounded-3xl p-8 text-white flex flex-col justify-between">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#a0f399]" />
              Official Purchase
            </h3>
            <p className="text-sm text-slate-400 mb-6 font-medium">You will be redirected to the official {network.name} site.</p>
            <a
              href={network.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Buy on Official Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-16">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Which {network.name} data bundle is the cheapest?</h3>
              <p className="text-sm text-slate-600">Currently, the {networkBundles.sort((a, b) => a.price - b.price)[0]?.name} is the most budget-friendly, while the best value per GB often comes from larger bundles.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How do I check my balance on {network.name}?</h3>
              <p className="text-sm text-slate-600">You can dial {network.ussdBalance} on your phone to check your remaining airtime and data balances instantly.</p>
            </div>
          </div>
        </div>

        <RelatedPages currentNetwork={network.name} />
      </main>

      <Footer onScrollTo={() => {}} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
