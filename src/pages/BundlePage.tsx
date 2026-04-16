import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { RelatedPages } from '../components/RelatedPages';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Info, Clock, Volume2 } from 'lucide-react';
import { buildBundleProductSchema } from '../utils/structuredData';
import { toCanonicalUrl } from '../seo/siteConstants';

export const BundlePage: React.FC = () => {
  const { networkSlug, bundleSlug } = useParams<{ networkSlug: string; bundleSlug: string }>();

  const bundle = bundles.find(b => b.slug === bundleSlug);
  const networkKey = Object.keys(networkMetadata).find(
    key => key.toLowerCase().replace(' ', '') === networkSlug
  );
  const network = networkKey ? networkMetadata[networkKey as keyof typeof networkMetadata] : null;

  if (!bundle || !network) {
    return <div>Bundle not found</div>;
  }

  const pageTitle = `${bundle.name} Data Bundle Price (2026)`;
  const metaDescription = `How much is the ${bundle.name}? Full price breakdown: R${bundle.price} for ${bundle.volume}. Valid for ${bundle.validity}. Cost per GB: R${bundle.costPerGb.toFixed(2)}.`;
  const canonicalUrl = toCanonicalUrl(`/network/${networkSlug}/${bundleSlug}/`);

  const jsonLd = {
    '@context': 'https://schema.org',
    ...buildBundleProductSchema(bundle, {
      productUrl: canonicalUrl,
      offerUrl: canonicalUrl,
      description: `Compare the ${bundle.name} prepaid data bundle in South Africa, including price, validity, and cost per GB.`
    })
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does the ${bundle.name} cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${bundle.name} currently costs R${bundle.price}.`
        }
      },
      {
        "@type": "Question",
        "name": `How long is the ${bundle.name} valid for?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${bundle.name} is valid for ${bundle.validity}.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to={`/network/${networkSlug}/`}
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>More {network.name} Bundles</span>
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
                {bundle.name} Price (2026)
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Price</div>
              <div className="text-3xl font-black text-[#031636]">R{bundle.price}</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Volume</div>
              <div className="text-3xl font-black text-[#031636]">{bundle.volume}</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Validity</div>
              <div className="text-2xl font-black text-[#031636]">{bundle.validity}</div>
            </div>
            <div className="bg-[#a0f399]/10 p-6 rounded-3xl border border-[#a0f399]/30 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#1b6d24] mb-2">Value</div>
              <div className="text-2xl font-black text-[#1b6d24]">R{bundle.costPerGb.toFixed(2)}/GB</div>
            </div>
          </div>
        </header>

        <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl">
          <h2 className="text-2xl font-black tracking-tight mb-8">Bundle Breakdown & Usage</h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-[#1b6d24] mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Anytime Data: {bundle.anytimeData}</h3>
                    <p className="text-sm text-slate-500">This data can be used at any hour of the day or night.</p>
                  </div>
                </div>
                {bundle.nightData && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Night Owl Data: {bundle.nightData}</h3>
                      <p className="text-sm text-slate-500">Available for use between midnight and 5 AM.</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#1b6d24] mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Verified Price</h3>
                    <p className="text-sm text-slate-500">Last confirmed in March 2026 via official operator data.</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64">
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Best For</h4>
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-slate-700">Moderate streaming</div>
                    <div className="text-sm font-bold text-slate-700">Remote work</div>
                    <div className="text-sm font-bold text-slate-700">Social media</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit type="inContent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#031636] rounded-3xl p-8 text-white flex flex-col justify-between">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#a0f399]" />
              Buy Airtime First
            </h3>
            <p className="text-sm text-slate-400 mb-6 font-medium">Need airtime to purchase this bundle? Buy online now.</p>
            <Link
              to={`/buy-airtime/${network.name.toLowerCase().replace(' ', '')}/`}
              className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Buy {network.name} Airtime
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-[#1b6d24] rounded-3xl p-8 text-white flex flex-col justify-between">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#a0f399]" />
              Buy This Bundle
            </h3>
            <p className="text-sm text-[#a0f399] mb-6 font-medium">You will be redirected to the official {network.name} website.</p>
            <a
              href={network.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-xl shadow-[#000]/10"
            >
              View on Official Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">How much does the {bundle.name} cost?</h3>
              <p className="text-sm text-slate-600">The {bundle.name} currently costs R{bundle.price} in South Africa as of 2026.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">How long is the {bundle.name} valid for?</h3>
              <p className="text-sm text-slate-600">The {bundle.name} is valid for {bundle.validity} from the date of purchase.</p>
            </div>
          </div>
        </section>

        <RelatedPages currentBundle={bundle} />
      </main>

      <Footer onScrollTo={() => {}} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
