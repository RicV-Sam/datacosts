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
import { getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_BRAND_NAME, SITE_LOGO_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface GuidesIndexProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const GuidesIndex: React.FC<GuidesIndexProps> = ({ onNavigate, onScrollTo }) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const canonicalUrl = toCanonicalUrl('/guides/');
  const pageTitle = "Mobile Data Guides South Africa (2026)";
  const metaDescription = "Explore practical South African telecom guides in one place. Compare data prices, network options, and fixes for common SIM and airtime issues.";
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/guides/');

  const getGuidePath = (slug: string) => `/guides/${slug}/`;
  const guideMap = new Map(guides.map((guide) => [guide.slug, guide]));
  const getGuide = (slug: string) => guideMap.get(slug);

  const popularGuides = [
    { slug: 'cheapest-data-south-africa', title: 'Cheapest Data in South Africa', description: 'Start here for a quick market-level view of where prepaid data is cheapest right now.', path: '/guides/cheapest-data-south-africa/' },
    { slug: 'cheapest-2gb-data-south-africa', title: 'Cheapest 2GB Data South Africa', description: 'Low-budget bundle benchmark for light monthly users.', path: '/guides/cheapest-2gb-data-south-africa/' },
    { slug: 'cheapest-5gb-data-south-africa', title: 'Cheapest 5GB Data South Africa', description: 'Mid-range prepaid comparison for moderate users.', path: '/guides/cheapest-5gb-data-south-africa/' },
    { slug: 'why-does-my-data-finish-so-fast-south-africa' },
    { slug: 'why-is-my-airtime-disappearing-south-africa' },
    { slug: 'how-to-stop-wasp-vas-charges-south-africa' },
    { slug: 'airtime-data-saving-tips-south-africa' },
    { slug: 'cheapest-1gb-data-south-africa' },
    { slug: 'cheapest-10gb-data-south-africa', title: 'Cheapest 10GB Data South Africa', description: 'Compare currently listed 10GB bundles for practical monthly middle-usage plans.', path: '/guides/cheapest-10gb-data-south-africa/' },
    { slug: 'vodacom-vs-mtn-data-prices', title: 'Vodacom vs MTN Data Prices', description: 'A side-by-side comparison for travellers, commuters, and regular prepaid users.', path: '/guides/vodacom-vs-mtn-data-prices/' },
    { slug: 'travel-sims-south-africa', title: 'Best Travel SIMs & eSIMs for South Africa', description: 'Practical arrival advice for airport connectivity, local SIMs, and travel eSIM convenience.', path: '/travel-sims-south-africa/' }
  ];

  const hubSections = [
    {
      title: "Cheapest Data & Best Value",
      snippet: "Use these guides to compare real prepaid value, short-term bundles, and where to find better per-GB pricing before you recharge.",
      links: [
        { slug: 'cheapest-data-south-africa', title: 'Cheapest Data in South Africa', path: '/guides/cheapest-data-south-africa/' },
        { slug: 'cheapest-1gb-data-south-africa' },
        { slug: 'cheapest-2gb-data-south-africa', title: 'Cheapest 2GB Data South Africa', description: 'Practical low-budget benchmark for light users and emergency recharges.', path: '/guides/cheapest-2gb-data-south-africa/' },
        { slug: 'cheapest-5gb-data-south-africa', title: 'Cheapest 5GB Data South Africa', description: 'A common prepaid mid-range size for regular mobile use.', path: '/guides/cheapest-5gb-data-south-africa/' },
        { slug: 'cheapest-10gb-data-south-africa', title: 'Cheapest 10GB Data South Africa', description: 'Compare currently listed 10GB bundles across networks and see who offers the strongest value profile.', path: '/guides/cheapest-10gb-data-south-africa/' },
        { slug: 'cheapest-15gb-data-south-africa', title: 'Cheapest 15GB Data South Africa', description: 'Middle-ground option when 10GB feels too tight but 20GB is too expensive.', path: '/guides/cheapest-15gb-data-south-africa/' },
        { slug: 'cheapest-20gb-data-south-africa', title: 'Cheapest 20GB Data South Africa', description: 'High-value monthly benchmark for heavier regular users.', path: '/guides/cheapest-20gb-data-south-africa/' },
        { slug: 'cheapest-50gb-data-south-africa', title: 'Cheapest 50GB Data South Africa', description: 'Heavy-usage and hotspot-oriented buying guide.', path: '/guides/cheapest-50gb-data-south-africa/' },
        { slug: 'best-monthly-data-deals-south-africa', title: 'Best Monthly Data Deals South Africa', description: 'A focused 30-day bundle comparison for users who buy data monthly and want better value.', path: '/guides/best-monthly-data-deals-south-africa/' },
        { slug: 'best-prepaid-data-deals-south-africa', title: 'Best Prepaid Data Deals South Africa', description: 'Find practical prepaid options by network, use case, and currently listed cost-per-GB.', path: '/guides/best-prepaid-data-deals-south-africa/' },
        { slug: 'cheapest-unlimited-data-south-africa', title: 'Cheapest Unlimited Data South Africa', description: 'Compare unlimited-style plans and capped alternatives for heavy monthly usage.', path: '/guides/cheapest-unlimited-data-south-africa/' },
        { slug: 'best-sim-only-deals-south-africa', title: 'Best SIM-Only Deals South Africa', description: 'See current SIM-only style options and how they compare with prepaid value.', path: '/guides/best-sim-only-deals-south-africa/' },
        { slug: 'cheapest-whatsapp-bundles-south-africa', title: 'Cheapest WhatsApp Bundles South Africa', description: 'Find low-cost WhatsApp-focused bundle options and practical alternatives.', path: '/guides/cheapest-whatsapp-bundles-south-africa/' },
        { slug: 'best-data-deals-south-africa' },
        { slug: 'cheap-night-data-south-africa' },
        { slug: 'prepaid-vs-contract-south-africa' }
      ]
    },
    {
      title: "Network Comparisons",
      snippet: "If you are choosing between networks, these pages help you compare prices and then check network-specific pages before you buy.",
      links: [
        { slug: 'vodacom-vs-mtn-data-prices', title: 'Vodacom vs MTN Data Prices', path: '/guides/vodacom-vs-mtn-data-prices/' },
        { slug: 'travel-sims-south-africa', title: 'Best Travel SIMs & eSIMs for South Africa', path: '/travel-sims-south-africa/' },
        { slug: 'network-hub', title: 'All South Africa Networks', description: 'Browse Vodacom, MTN, Telkom, Cell C, and Rain pages in one place.', path: '/network/' },
        { slug: 'vodacom-network', title: 'Vodacom Network Page', description: 'Current pricing context, coverage notes, and practical buying tips.', path: '/network/vodacom/' },
        { slug: 'mtn-network', title: 'MTN Network Page', description: 'Plan comparison context and links to current MTN bundle options.', path: '/network/mtn/' }
      ]
    },
    {
      title: "Consumer Help & Fixes",
      snippet: "Use these when airtime disappears, data runs out too quickly, or you need the quickest way to audit balances and subscriptions.",
      links: [
        { slug: 'airtime-data-problems-south-africa', title: 'Airtime & Data Problems in South Africa', description: 'Cluster hub for airtime, data, and subscription fixes.', path: '/guides/airtime-data-problems-south-africa/' },
        { slug: 'why-is-my-airtime-disappearing-south-africa' },
        { slug: 'why-is-my-data-disappearing-south-africa', title: 'Why Is My Data Disappearing South Africa', description: 'Quick diagnosis for sudden bundle loss.', path: '/guides/why-is-my-data-disappearing-south-africa/' },
        { slug: 'how-to-stop-airtime-being-used-automatically', title: 'How to Stop Airtime Being Used Automatically', description: 'Fix recurring deductions and fallback usage.', path: '/guides/how-to-stop-airtime-being-used-automatically/' },
        { slug: 'how-to-cancel-subscriptions-mtn-vodacom-telkom', title: 'How to Cancel Subscriptions (MTN, Vodacom, Telkom, Cell C)', description: 'Cancel recurring paid services step by step.', path: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/' },
        { slug: 'how-to-check-subscriptions-on-mtn', title: 'How to Check Subscriptions on MTN', description: 'Audit and remove MTN recurring services.', path: '/guides/how-to-check-subscriptions-on-mtn/' },
        { slug: 'how-to-check-subscriptions-on-vodacom', title: 'How to Check Subscriptions on Vodacom', description: 'Audit and remove Vodacom recurring services.', path: '/guides/how-to-check-subscriptions-on-vodacom/' },
        { slug: 'how-to-stop-wasp-services-south-africa', title: 'How to Stop WASP Services in South Africa', description: 'Stop premium-service airtime deductions.', path: '/guides/how-to-stop-wasp-services-south-africa/' },
        { slug: 'how-to-protect-airtime-from-being-used', title: 'How to Protect Airtime from Being Used', description: 'Prevent hidden deductions before they start.', path: '/guides/how-to-protect-airtime-from-being-used/' },
        { slug: 'out-of-bundle-data-costs-south-africa', title: 'Out-of-Bundle Data Costs South Africa', description: 'Understand OOB rates, airtime protection, and what to do after unexpected billing.', path: '/guides/out-of-bundle-data-costs-south-africa/' },
        { slug: 'why-does-my-data-finish-so-fast-south-africa' },
        { slug: 'how-to-stop-wasp-vas-charges-south-africa' },
        { slug: 'why-is-my-data-finishing-so-fast' },
        { slug: 'airtime-data-saving-tips-south-africa' },
        { slug: 'how-to-check-data-balance' },
        { slug: 'stop-wasp-subscriptions-south-africa', title: 'Stop WASP Subscriptions in South Africa', description: 'How to stop unwanted premium billing and protect your airtime.', path: '/guides/stop-wasp-subscriptions-south-africa/' },
        { slug: 'ussd-codes-south-africa', title: 'USSD Codes South Africa', description: 'Find operator codes for balances, bundle buying, and account help.', path: '/ussd-codes-south-africa/' },
        { slug: 'methodology', title: 'How We Compare Prices (Methodology)', description: 'See how DataCost sources and compares telecom pricing data.', path: '/methodology/' }
      ]
    },
    {
      title: "How-To Guides",
      snippet: "Step-by-step practical actions for buying data, converting airtime, and avoiding expensive out-of-bundle usage.",
      links: [
        { slug: 'how-to-buy-data-vodacom' },
        { slug: 'how-to-buy-data-mtn' },
        { slug: 'how-to-buy-data-telkom' },
        { slug: 'how-to-buy-data-cell-c' },
        { slug: 'convert-airtime-to-data-south-africa' },
        { slug: 'out-of-bundle-data-costs-south-africa' },
        { slug: 'how-to-check-data-balance' }
      ]
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
        "url": toCanonicalUrl(`/guides/${guide.slug}/`)
      })),
      {
        "@type": "ListItem",
        "position": guides.length + 1,
        "name": "Best Travel SIMs & eSIMs for South Africa",
        "url": toCanonicalUrl('/travel-sims-south-africa/')
      }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'South Africa Mobile Data Guides Hub',
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: canonicalUrl }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Mobile Data Guides South Africa (2026)",
        "description": metaDescription,
        "datePublished": datePublishedIso,
        "dateModified": dateModifiedIso,
        "image": DEFAULT_OG_IMAGE_URL,
        "author": {
          "@type": "Organization",
          "name": SITE_BRAND_NAME,
          "url": SITE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": SITE_BRAND_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": SITE_LOGO_URL
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
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
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
            <span>Guides Hub 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            South Africa Telecom <span className="text-[#1b6d24]">Guides Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Use this page as your starting point for practical mobile help in South Africa:
            compare <strong>cheapest data options</strong>, check <strong>network differences</strong>,
            solve <strong>airtime or data problems</strong>, and follow clear step-by-step buying guides.
          </p>
        </div>

        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white/90 border border-slate-100 rounded-[2rem] p-7 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">What You Can Find Here</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">
              This hub brings together our highest-value telecom content in one place. If prices shift or offers change, use these guides to narrow down the right option for your budget, trip length, and daily data needs.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We focus on transparent comparisons and practical actions. Final offers can change, so confirm details on operator pages before you buy.
            </p>
          </div>
        </section>

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

        {/* MOST POPULAR GUIDES */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#a0f399]/30 text-[#1b6d24] flex items-center justify-center text-sm font-bold">
                01
              </span>
              Most Popular Guides
            </h2>
            <p className="text-slate-500 font-medium">
              The pages readers use most when they need a fast answer on data cost, network choice, or travel connectivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGuides.map((item, index) => {
              const guide = item.slug ? getGuide(item.slug) : undefined;
              const title = item.title || guide?.title;
              const description = item.description || guide?.metaDescription;
              const path = item.path || (item.slug ? getGuidePath(item.slug) : '');
              if (!title || !description || !path) return null;
              return (
                <motion.a
                  key={path}
                  href={path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="text-left p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-[#a0f399]/30 transition-all group flex flex-col h-full"
                >
                  <h3 className="text-xl font-black mb-4 group-hover:text-[#1b6d24] transition-colors leading-tight">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
                    {description}
                  </p>
                  <div className="flex items-center gap-2 text-[#1b6d24] font-bold text-sm group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* CLUSTERED HUB SECTIONS */}
        {hubSections.map((section, sectionIndex) => (
          <section key={section.title} className="mb-20">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#a0f399]/30 text-[#1b6d24] flex items-center justify-center text-sm font-bold">
                  0{sectionIndex + 2}
                </span>
                {section.title}
              </h2>
              <p className="text-slate-500 font-medium">{section.snippet}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.links.map((item, index) => {
                const guide = item.slug ? getGuide(item.slug) : undefined;
                const title = item.title || guide?.title;
                const description = item.description || guide?.metaDescription;
                const path = item.path || (item.slug ? getGuidePath(item.slug) : '');
                if (!title || !description || !path) return null;
                return (
                  <motion.a
                    key={path}
                    href={path}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="text-left p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-[#a0f399]/30 transition-all group flex flex-col h-full"
                  >
                    <h3 className="text-xl font-black mb-4 group-hover:text-[#1b6d24] transition-colors leading-tight">
                      {title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
                      {description}
                    </p>
                    <div className="flex items-center gap-2 text-[#1b6d24] font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
            {sectionIndex === 0 && <AdUnit type="inContent" />}
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
