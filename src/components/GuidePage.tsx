import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShieldCheck, Clock, Tag, Zap, Info, ChevronRight } from 'lucide-react';
import { Guide, Bundle } from '../types';
import { bundles } from '../data';
import { motion } from 'motion/react';

interface GuidePageProps {
  guide: Guide;
  onBack: () => void;
  onNavigateToGuide: (slug: string) => void;
  allGuides: Guide[];
}

export const GuidePage: React.FC<GuidePageProps> = ({ guide, onBack, onNavigateToGuide, allGuides }) => {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const filteredBundles = React.useMemo(() => {
    let result = [...bundles];
    if (guide.comparisonType === '1gb') {
      result = result.filter(b => b.volume === '1GB' || b.name.includes('1GB'));
      result.sort((a, b) => a.price - b.price);
    } else if (guide.comparisonType === 'night') {
      result = result.filter(b => b.nightData !== undefined || b.name.toLowerCase().includes('night'));
      result.sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));
    } else if (guide.comparisonType === 'best-value') {
      result.sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));
      result = result.slice(0, 5);
    }
    return result;
  }, [guide.comparisonType]);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": "Article",
        "headline": guide.h1,
        "description": guide.metaDescription,
        "url": `https://datacost.co.za/guides/${guide.slug}/`,
        "author": {
          "@type": "Organization",
          "name": "DataCost.co.za",
          "url": "https://datacost.co.za"
        },
        "image": "https://datacost.co.za/og-image.jpg",
        "dateModified": new Date().toISOString(),
        "publisher": {
          "@type": "Organization",
          "name": "DataCost.co.za",
          "url": "https://datacost.co.za",
          "logo": {
            "@type": "ImageObject",
            "url": "https://datacost.co.za/logo.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": guide.faq.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{guide.title} | DataCost</title>
        <meta name="description" content={guide.metaDescription} />
        <link rel="canonical" href={`https://datacost.co.za/guides/${guide.slug}/`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </a>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Guide / {guide.slug.replace(/-/g, ' ')}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Clock className="w-3 h-3" />
            Updated {today}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            {guide.h1}
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            {guide.intro}
          </p>
        </header>

        {/* Comparison Table */}
        {guide.comparisonType !== 'all' && filteredBundles.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-[#1b6d24]" />
              Latest Data Prices
            </h2>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Network</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredBundles.map((bundle) => (
                      <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-black text-sm">{bundle.network}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-900">{bundle.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{bundle.validity}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-black">R{bundle.price}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">
                            R{bundle.costPerGb?.toFixed(2)}/GB
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium italic">
                  * Prices are subject to change. Check individual network USSD menus for personalized offers.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Steps / Guide Section */}
        {guide.steps && (
          <section className="mb-16">
            <h2 className="text-2xl font-black tracking-tighter mb-8">{guide.stepsTitle || 'Step-by-Step Guide'}</h2>
            <div className="space-y-6">
              {guide.steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#031636] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">
                    {index + 1}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-black mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {guide.faq.map((item, index) => (
              <div key={index} className="border-b border-slate-50 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-black mb-3 flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                  {item.question}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium pl-[1.125rem]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Linking Boost */}
        <section className="mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Related Guides & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onBack(); }}
              className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-[#1b6d24] transition-all group text-left"
            >
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">Data Comparison Tool</h4>
                <p className="text-xs text-slate-500 font-medium">Find the cheapest bundles in SA</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1b6d24]" />
            </a>
            <a
              href="/ussd-codes-south-africa/"
              onClick={(e) => { e.preventDefault(); onNavigateToGuide('ussd'); }}
              className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-[#1b6d24] transition-all group text-left"
            >
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">USSD Codes Directory</h4>
                <p className="text-xs text-slate-500 font-medium">Check balance & buy data codes</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1b6d24]" />
            </a>
            {allGuides.filter(g => g.slug !== guide.slug).slice(0, 2).map(otherGuide => (
              <a
                key={otherGuide.slug}
                href={`/guides/${otherGuide.slug}/`}
                onClick={(e) => { e.preventDefault(); onNavigateToGuide(otherGuide.slug); }}
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-[#1b6d24] transition-all group text-left"
              >
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors line-clamp-1">{otherGuide.title.split(' - ')[0]}</h4>
                  <p className="text-xs text-slate-500 font-medium">Read our expert guide</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1b6d24]" />
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#031636] rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f399] blur-[120px] opacity-10 -mr-32 -mt-32"></div>
          <h2 className="text-3xl font-black tracking-tighter mb-4 relative z-10">Stop overpaying for data.</h2>
          <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto relative z-10">
            Compare all networks in one place and find the best deals for your needs today.
          </p>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="inline-block px-8 py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform relative z-10"
          >
            Compare All Prices
          </a>
          <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest relative z-10">
            You will be redirected to our official comparison tool
          </p>
        </section>
      </main>
    </div>
  );
};
