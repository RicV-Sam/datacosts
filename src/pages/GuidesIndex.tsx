import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { guides } from '../data/guides';
import { BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface GuidesIndexProps {
  onNavigate: (page: 'home' | 'ussd' | 'guide' | 'network' | 'guides-index', slug?: string) => void;
  onScrollTo: (id: string) => void;
}

export const GuidesIndex: React.FC<GuidesIndexProps> = ({ onNavigate, onScrollTo }) => {
  const canonicalUrl = "https://datacost.co.za/guides/";

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mobile Data Guides South Africa",
    "description": "Comprehensive guides to mobile data in South Africa. Compare 1GB prices, night data deals, and learn how to save on data costs.",
    "url": canonicalUrl,
    "itemListElement": guides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": guide.title,
      "url": `https://datacost.co.za/guides/${guide.slug}/`
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Mobile Data Guides South Africa",
    "description": "Explore mobile data guides in South Africa. Compare 1GB prices, night data deals, and learn how to save money across Vodacom, MTN, Telkom and Cell C.",
    "image": "https://datacost.co.za/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "url": "https://datacost.co.za"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "logo": {
        "@type": "ImageObject",
        "url": "https://datacost.co.za/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>Mobile Data Guides South Africa | DataCost</title>
        <meta name="description" content="Explore mobile data guides in South Africa. Compare 1GB prices, night data deals, and learn how to save money across Vodacom, MTN, Telkom and Cell C." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AdUnit type="aboveFold" />

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a0f399]/20 text-[#1b6d24] text-sm font-bold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Learning Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Mobile Data Guides South Africa
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay informed and save money with our comprehensive mobile data guides.
            We compare the latest 1GB prices, breakdown night data deals, and provide
            step-by-step instructions for all major South African networks including
            Vodacom, MTN, Telkom, and Cell C.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {guides.map((guide, index) => (
            <motion.button
              key={guide.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate('guide', guide.slug)}
              className="text-left p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#a0f399]/30 transition-all group flex flex-col h-full"
            >
              <h2 className="text-xl font-black mb-4 group-hover:text-[#1b6d24] transition-colors">
                {guide.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                {guide.metaDescription}
              </p>
              <div className="flex items-center gap-2 text-[#1b6d24] font-bold text-sm group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>

        <AdUnit type="inContent" />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
