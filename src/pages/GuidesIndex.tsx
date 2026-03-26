import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { guides } from '../data/guides';
import { BookOpen, ArrowRight, ChevronDown, Zap, Smartphone, HelpCircle, Info, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigateFunction } from '../types';

interface GuidesIndexProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const GuidesIndex: React.FC<GuidesIndexProps> = ({ onNavigate, onScrollTo }) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const canonicalUrl = "https://datacost.co.za/guides/";
  const pageTitle = "Mobile Data Guides South Africa 2026 | Save Money on Data";
  const metaDescription = "Expert guides on how to find the cheapest data in South Africa. Compare Vodacom, MTN, Telkom and Cell C. Learn how to buy data, check balances, and save on mobile costs.";

  const categories = [
    {
      title: "Save Money on Data",
      description: "Comparison guides and tips to help you get more megabytes for your Rand.",
      slugs: ['cheapest-1gb-data-south-africa', 'best-data-deals-south-africa', 'cheap-night-data-south-africa', 'why-is-my-data-finishing-so-fast', 'prepaid-vs-contract-south-africa']
    },
    {
      title: "For Tourists & Travelers",
      description: "Visiting South Africa? Find the best way to stay connected without roaming fees.",
      links: [
        {
          title: "Best Travel SIMs & eSIMs for South Africa",
          description: "A complete 2026 guide to tourist SIMs, international eSIMs, and airport connectivity.",
          path: "/travel-sims-south-africa/"
        }
      ]
    },
    {
      title: "Buying Data & Airtime",
      description: "Step-by-step instructions on how to recharge and convert airtime across all networks.",
      slugs: ['how-to-buy-data-vodacom', 'how-to-buy-data-mtn', 'how-to-buy-data-telkom', 'how-to-buy-data-cell-c', 'convert-airtime-to-data-south-africa']
    },
    {
      title: "Network Help & Settings",
      description: "Utility guides for managing your SIM card and understanding network services.",
      slugs: ['how-to-check-data-balance']
    }
  ];

  const faqs = [
    {
      question: "How can I find the cheapest data in South Africa?",
      answer: "The cheapest data is usually found through personalized USSD deals like Vodacom 'Just4You' (*123#), MTN 'Boosta' (*142#), or Telkom 'Mo'Nice' (*123#). For standard bundles, Telkom and Rain generally offer the lowest cost per GB."
    },
    {
      question: "Which network has the best prepaid data deals?",
      answer: "Currently, Telkom often leads for 'Anytime' prepaid value, while MTN and Vodacom are highly competitive with their short-term (1-hour or 1-day) promotional bundles found in their respective apps."
    },
    {
      question: "How do I buy data without using the app?",
      answer: "You can buy data using USSD codes, which work even without an internet connection. Common codes include *135# (Vodacom), *136*2# (MTN), *180# (Telkom), and *147# (Cell C)."
    },
    {
      question: "What is the best way to save mobile data in South Africa?",
      answer: "The best ways to save data include disabling auto-play on social media (TikTok/Facebook), setting YouTube to 480p quality, and ensuring background app updates are set to 'Wi-Fi only' in your phone settings."
    }
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mobile Data Guides South Africa",
    "description": metaDescription,
    "url": canonicalUrl,
    "itemListElement": [
      ...guides.map((guide, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": guide.title,
        "url": `https://datacost.co.za/guides/${guide.slug}/`
      })),
      {
        "@type": "ListItem",
        "position": guides.length + 1,
        "name": "Best Travel SIMs & eSIMs for South Africa",
        "url": "https://datacost.co.za/travel-sims-south-africa/"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Mobile Data Guides South Africa (2026)",
        "description": metaDescription,
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
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
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
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AdUnit type="aboveFold" />

        {/* HERO SECTION */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a0f399]/20 text-[#1b6d24] text-sm font-bold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Learning Center 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Mobile Data <span className="text-[#1b6d24]">Guides</span> South Africa
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Master your mobile spending with our expert-led guides. Whether you are looking for the
            <strong> cheapest 1GB data deals</strong>, searching for <strong>mobile data saving tips</strong>,
            or need the latest <strong>Vodacom, MTN, Telkom, and Cell C</strong> instructions,
            we have you covered.
          </p>
        </div>

        {/* QUICK UTILITY LINKS */}
        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center italic">Essential Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('ussd')}
              className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:border-[#1b6d24] transition-colors group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#1b6d24] group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">USSD Codes Directory</div>
                <div className="text-xs text-slate-500 font-medium">All networks listed</div>
              </div>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:border-[#1b6d24] transition-colors group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#1b6d24] group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">Data Usage Calculator</div>
                <div className="text-xs text-slate-500 font-medium">Estimate your needs</div>
              </div>
            </button>
            <button
              onClick={() => onNavigate('network', 'vodacom')}
              className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:border-[#1b6d24] transition-colors group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#1b6d24] group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">Best 1GB Deals</div>
                <div className="text-xs text-slate-500 font-medium">Compare latest prices</div>
              </div>
            </button>
          </div>
        </section>

        {/* CATEGORIZED GUIDES */}
        {categories.map((category, catIndex) => (
          <section key={category.title} className="mb-20">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#a0f399]/30 text-[#1b6d24] flex items-center justify-center text-sm font-bold">
                  0{catIndex + 1}
                </span>
                {category.title}
              </h2>
              <p className="text-slate-500 font-medium">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.slugs?.map((slug, index) => {
                const guide = guides.find(g => g.slug === slug);
                if (!guide) return null;
                return (
                  <motion.button
                    key={guide.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onNavigate('guide', guide.slug)}
                    className="text-left p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-[#a0f399]/30 transition-all group flex flex-col h-full"
                  >
                    <h3 className="text-xl font-black mb-4 group-hover:text-[#1b6d24] transition-colors leading-tight">
                      {guide.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
                      {guide.metaDescription}
                    </p>
                    <div className="flex items-center gap-2 text-[#1b6d24] font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Read Full Guide <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                );
              })}
              {category.links?.map((link, index) => (
                <motion.button
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onNavigate('travel-sims')}
                  className="text-left p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-[#a0f399]/30 transition-all group flex flex-col h-full"
                >
                  <h3 className="text-xl font-black mb-4 group-hover:text-[#1b6d24] transition-colors leading-tight">
                    {link.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
                    {link.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#1b6d24] font-bold text-sm group-hover:translate-x-1 transition-transform">
                    Read Full Guide <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </div>
            {catIndex === 0 && <AdUnit type="inContent" />}
          </section>
        ))}

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-6">Expert Advice for South African Mobile Users</h2>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
              <p className="mb-4">
                Navigating the landscape of <strong>mobile data in South Africa</strong> can be overwhelming.
                With four major networks and a growing list of MVNOs, finding the <strong>best prepaid data deals</strong>
                requires a bit of strategy.
              </p>
              <p className="mb-4">
                Our guides are designed to help you bypass expensive out-of-bundle rates and tap into
                personalized promotions that aren't always advertised. From learning
                <strong> how to buy data on Vodacom or MTN</strong> efficiently, to understanding
                when to use <strong>Night Owl bundles</strong>, our goal is to put the power back in your hands.
              </p>
              <p>
                We update our content regularly to reflect the latest 2026 pricing and network changes.
                Always remember to check your balance frequently using the free USSD codes provided in our
                directory to avoid unexpected airtime loss.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <HelpCircle className="w-3 h-3" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter mb-4">Common Data Questions</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about saving on data in SA.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm transition-all hover:border-[#a0f399]">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-black text-[#031636] pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? 'rotate-180 text-[#1b6d24]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
