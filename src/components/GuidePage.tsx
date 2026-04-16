import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Tag, Info, ChevronRight } from 'lucide-react';
import { Guide, Bundle, GuideResourceLink } from '../types';
import { bundles } from '../data';
import { useNavigate } from 'react-router-dom';
import { formatIsoForDisplay, getDefaultPublishedIso, getGuideModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_BRAND_NAME, SITE_LOGO_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';
import { AdUnit } from './AdUnit';

interface GuidePageProps {
  guide: Guide;
  onBack: () => void;
  onNavigateToGuide: (slug: string) => void;
  allGuides: Guide[];
}

interface RelatedLink extends GuideResourceLink {
  action: 'guide' | 'route';
}

const GUIDE_RELATED_LINKS: Record<string, RelatedLink[]> = {
  'cheapest-1gb-data-south-africa': [
    { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data', description: 'See the next-volume benchmark.', action: 'guide', slug: 'cheapest-10gb-data-south-africa' },
    { href: '/guides/cheapest-unlimited-data-south-africa/', label: 'Cheapest Unlimited Data', description: 'Compare heavy-usage options.', action: 'guide', slug: 'cheapest-unlimited-data-south-africa' },
    { href: '/guides/cheapest-whatsapp-bundles-south-africa/', label: 'Cheapest WhatsApp Bundles', description: 'Social-bundle comparison.', action: 'guide', slug: 'cheapest-whatsapp-bundles-south-africa' },
    { href: '/network/mtn/', label: 'MTN Network Hub', description: 'Operator-level pricing context.', action: 'route' },
    { href: '/network/vodacom/', label: 'Vodacom Network Hub', description: 'Coverage-first pricing context.', action: 'route' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Prevent expiry surprises.', action: 'guide', slug: 'how-to-check-data-balance' }
  ],
  'cheapest-10gb-data-south-africa': [
    { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data', description: 'Low-volume benchmark.', action: 'guide', slug: 'cheapest-1gb-data-south-africa' },
    { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best Monthly Data Deals', description: '30-day value benchmark.', action: 'guide', slug: 'best-monthly-data-deals-south-africa' },
    { href: '/network/telkom/monthly-data/', label: 'Telkom Monthly Data', description: 'Budget-led monthly options.', action: 'route' },
    { href: '/network/mtn/monthly-data/', label: 'MTN Monthly Data', description: 'All-round monthly options.', action: 'route' },
    { href: '/network/vodacom/monthly-data/', label: 'Vodacom Monthly Data', description: 'Coverage-led monthly options.', action: 'route' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Track mid-cycle usage.', action: 'guide', slug: 'how-to-check-data-balance' }
  ],
  'cheapest-whatsapp-bundles-south-africa': [
    { href: '/guides/convert-airtime-to-data-south-africa/', label: 'Convert Airtime to Data', description: 'Buy bundles before OOB rates apply.', action: 'guide', slug: 'convert-airtime-to-data-south-africa' },
    { href: '/guides/why-is-my-data-finishing-so-fast/', label: 'Why Data Finishes Fast', description: 'Reduce background data drain.', action: 'guide', slug: 'why-is-my-data-finishing-so-fast' },
    { href: '/network/vodacom/', label: 'Vodacom Network Hub', description: 'Compare social vs anytime value.', action: 'route' },
    { href: '/network/mtn/', label: 'MTN Network Hub', description: 'Compare promos and social options.', action: 'route' },
    { href: '/network/cell-c/', label: 'Cell C Network Hub', description: 'Promo-led social alternatives.', action: 'route' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Avoid airtime leakage.', action: 'guide', slug: 'how-to-check-data-balance' }
  ],
  'why-is-my-data-finishing-so-fast': [
    { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast (Full Guide)', description: 'Comprehensive causes, checks, and fixes.', action: 'guide', slug: 'why-does-my-data-finish-so-fast-south-africa' },
    { href: '/guides/airtime-data-saving-tips-south-africa/', label: '15 Airtime & Data Saving Tips', description: 'Complete consumer checklist for lower spend.', action: 'guide', slug: 'airtime-data-saving-tips-south-africa' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Track usage before bundles run out.', action: 'guide', slug: 'how-to-check-data-balance' },
    { href: '/guides/convert-airtime-to-data-south-africa/', label: 'Convert Airtime to Data', description: 'Avoid expensive raw-airtime browsing.', action: 'guide', slug: 'convert-airtime-to-data-south-africa' },
    { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data in South Africa', description: 'Compare better-value alternatives.', action: 'route' },
    { href: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa', description: 'Save balance and buy shortcuts.', action: 'route' }
  ],
  'why-does-my-data-finish-so-fast-south-africa': [
    { href: '/guides/why-is-my-airtime-disappearing-south-africa/', label: 'Why Airtime Disappears', description: 'Check related airtime and out-of-bundle issues.', action: 'guide', slug: 'why-is-my-airtime-disappearing-south-africa' },
    { href: '/guides/how-to-stop-wasp-vas-charges-south-africa/', label: 'How to Stop WASP / VAS Charges', description: 'Rule out recurring subscription deductions.', action: 'guide', slug: 'how-to-stop-wasp-vas-charges-south-africa' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Track where usage goes week by week.', action: 'guide', slug: 'how-to-check-data-balance' },
    { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data in South Africa', description: 'Compare lower-cost bundle options.', action: 'route' },
    { href: '/guides/best-data-deals-south-africa/', label: 'Best Data Deals', description: 'Find stronger promo and value options.', action: 'guide', slug: 'best-data-deals-south-africa' },
    { href: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa', description: 'Fast balance and buy shortcuts.', action: 'route' }
  ],
  'why-is-my-airtime-disappearing-south-africa': [
    { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Diagnose the main mobile-data drain causes.', action: 'guide', slug: 'why-does-my-data-finish-so-fast-south-africa' },
    { href: '/guides/airtime-data-saving-tips-south-africa/', label: '15 Airtime & Data Saving Tips', description: 'Reduce repeat airtime loss with daily habits.', action: 'guide', slug: 'airtime-data-saving-tips-south-africa' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Verify balances before usage spikes.', action: 'guide', slug: 'how-to-check-data-balance' },
    { href: '/guides/how-to-stop-wasp-vas-charges-south-africa/', label: 'How to Stop WASP / VAS Charges', description: 'Understand and diagnose recurring subscription deductions.', action: 'guide', slug: 'how-to-stop-wasp-vas-charges-south-africa' },
    { href: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions', description: 'Check and stop unwanted premium deductions.', action: 'route' },
    { href: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa', description: 'Find quick codes for balance and bundle actions.', action: 'route' },
    { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data in South Africa', description: 'Switch to better-value bundle options.', action: 'route' }
  ],
  'how-to-stop-wasp-vas-charges-south-africa': [
    { href: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions (Step-by-Step)', description: 'Use the full network-by-network cancellation workflow.', action: 'route' },
    { href: '/guides/why-is-my-airtime-disappearing-south-africa/', label: 'Why Airtime Disappears', description: 'Diagnose broader airtime drain patterns.', action: 'guide', slug: 'why-is-my-airtime-disappearing-south-africa' },
    { href: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa', description: 'Quick access to balance and self-service codes.', action: 'route' },
    { href: '/save-ussd-codes/', label: 'Save USSD Codes', description: 'Keep key troubleshooting codes ready.', action: 'route' },
    { href: '/network/', label: 'Network Comparison Hub', description: 'View network context and support pages.', action: 'route' },
    { href: '/methodology/', label: 'Methodology', description: 'See how DataCost structures telecom guidance.', action: 'route' }
  ],
  'convert-airtime-to-data-south-africa': [
    { href: '/guides/airtime-data-saving-tips-south-africa/', label: 'Airtime & Data Saving Tips', description: 'Reduce airtime waste with practical habits.', action: 'guide', slug: 'airtime-data-saving-tips-south-africa' },
    { href: '/guides/how-to-buy-data-vodacom/', label: 'How to Buy Vodacom Data', description: 'Operator-specific buy path.', action: 'guide', slug: 'how-to-buy-data-vodacom' },
    { href: '/guides/how-to-buy-data-mtn/', label: 'How to Buy MTN Data', description: 'Operator-specific buy path.', action: 'guide', slug: 'how-to-buy-data-mtn' },
    { href: '/guides/how-to-buy-data-telkom/', label: 'How to Buy Telkom Data', description: 'Operator-specific buy path.', action: 'guide', slug: 'how-to-buy-data-telkom' },
    { href: '/guides/how-to-buy-data-cell-c/', label: 'How to Buy Cell C Data', description: 'Operator-specific buy path.', action: 'guide', slug: 'how-to-buy-data-cell-c' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance', description: 'Confirm active balance before buying.', action: 'guide', slug: 'how-to-check-data-balance' }
  ],
  'how-to-check-data-balance': [
    { href: '/guides/airtime-data-saving-tips-south-africa/', label: 'Airtime & Data Saving Tips', description: 'Full consumer playbook to reduce telecom spend.', action: 'guide', slug: 'airtime-data-saving-tips-south-africa' },
    { href: '/guides/how-to-buy-data-vodacom/', label: 'How to Buy Vodacom Data', description: 'Next action after balance checks.', action: 'guide', slug: 'how-to-buy-data-vodacom' },
    { href: '/guides/how-to-buy-data-mtn/', label: 'How to Buy MTN Data', description: 'Next action after balance checks.', action: 'guide', slug: 'how-to-buy-data-mtn' },
    { href: '/guides/how-to-buy-data-telkom/', label: 'How to Buy Telkom Data', description: 'Next action after balance checks.', action: 'guide', slug: 'how-to-buy-data-telkom' },
    { href: '/guides/how-to-buy-data-cell-c/', label: 'How to Buy Cell C Data', description: 'Next action after balance checks.', action: 'guide', slug: 'how-to-buy-data-cell-c' },
    { href: '/guides/why-is-my-data-finishing-so-fast/', label: 'Why Data Finishes Fast', description: 'Fix rapid usage drain.', action: 'guide', slug: 'why-is-my-data-finishing-so-fast' }
  ],
  'airtime-data-saving-tips-south-africa': [
    { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data in South Africa', description: 'Compare market-wide prepaid prices.', action: 'route' },
    { href: '/guides/best-data-deals-south-africa/', label: 'Best Data Deals in South Africa', description: 'Find promo-led value bundles.', action: 'guide', slug: 'best-data-deals-south-africa' },
    { href: '/guides/prepaid-vs-contract-south-africa/', label: 'Prepaid vs Contract South Africa', description: 'Choose a lower-risk billing model.', action: 'guide', slug: 'prepaid-vs-contract-south-africa' },
    { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'Vodacom vs MTN Data Prices', description: 'Compare pricing between major networks.', action: 'route' },
    { href: '/ussd-codes-south-africa/', label: 'South Africa USSD Codes', description: 'Save buy and balance short codes.', action: 'route' },
    { href: '/methodology/', label: 'Methodology', description: 'See how DataCost compares prices.', action: 'route' }
  ]
};

export const GuidePage: React.FC<GuidePageProps> = ({ guide, onBack, onNavigateToGuide, allGuides }) => {
  const navigate = useNavigate();
  const dateModifiedIso = getGuideModifiedIso(guide.slug);
  const datePublishedIso = getDefaultPublishedIso();
  const lastUpdatedLabel = formatIsoForDisplay(dateModifiedIso);
  const canonicalUrl = toCanonicalUrl(`/guides/${guide.slug}/`);
  const pageTitle = guide.title;
  const showPriorityInternalLinks = guide.slug === 'why-is-my-data-finishing-so-fast' || guide.slug === 'how-to-check-data-balance';
  const showNetworkDisappearingAdLayout =
    guide.slug === 'why-is-my-data-disappearing-vodacom' || guide.slug === 'why-is-my-data-disappearing-mtn';

  const relatedLinks: RelatedLink[] = GUIDE_RELATED_LINKS[guide.slug] || allGuides
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 6)
    .map((g) => ({
      href: `/guides/${g.slug}/`,
      label: g.h1,
      description: 'Read the full guide.',
      action: 'guide' as const,
      slug: g.slug
    }));

  const navigateToResource = (item: GuideResourceLink) => {
    if (/^https?:\/\//i.test(item.href)) {
      window.location.assign(item.href);
      return;
    }

    if (item.action === 'guide' && item.slug) {
      onNavigateToGuide(item.slug);
      return;
    }
    navigate(item.href);
  };

  const filteredBundles = React.useMemo(() => {
    let result = [...bundles];
    if (guide.comparisonType === '1gb') {
      result = result.filter((b) => b.volume === '1GB' || b.name.includes('1GB'));
      result.sort((a, b) => a.price - b.price);
    } else if (guide.comparisonType === 'night') {
      result = result.filter((b) => b.nightData !== undefined || b.name.toLowerCase().includes('night'));
      result.sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));
    } else if (guide.comparisonType === 'best-value') {
      result.sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0));
      result = result.slice(0, 5);
    }
    return result;
  }, [guide.comparisonType]);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: guide.h1,
    description: guide.metaDescription,
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
      { '@type': 'ListItem', position: 2, name: 'Guides', item: toCanonicalUrl('/guides/') },
      { '@type': 'ListItem', position: 3, name: guide.h1, item: canonicalUrl }
    ]
  };

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.h1,
        description: guide.metaDescription,
        url: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: SITE_PRODUCT_NAME,
          url: SITE_URL
        },
        image: DEFAULT_OG_IMAGE_URL,
        datePublished: datePublishedIso,
        dateModified: dateModifiedIso,
        publisher: {
          '@type': 'Organization',
          name: SITE_BRAND_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: SITE_LOGO_URL
          }
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={guide.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={guide.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); onBack(); }} className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </a>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Guide / {guide.slug.replace(/-/g, ' ')}</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Clock className="w-3 h-3" />
            Updated {lastUpdatedLabel}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">{guide.h1}</h1>
          {showNetworkDisappearingAdLayout && <AdUnit type="aboveFold" className="mb-6" />}
          <p className="text-xl text-slate-600 font-medium leading-relaxed">{guide.intro}</p>
        </header>

        {guide.quickSummaryItems && guide.quickSummaryItems.length > 0 && (
          <section className="mb-10 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black tracking-tighter mb-4">{guide.quickSummaryTitle || 'The Short Version'}</h2>
            <ul className="space-y-3">
              {guide.quickSummaryItems.map((item) => (
                <li key={item} className="text-slate-700 font-medium leading-relaxed flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {showNetworkDisappearingAdLayout && guide.quickSummaryItems && guide.quickSummaryItems.length > 0 && <AdUnit type="inContent" className="my-10" />}

        {guide.jumpLinks && guide.jumpLinks.length > 0 && (
          <section className="mb-12 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black tracking-tight mb-4">{guide.jumpLinksTitle || 'On This Page'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.jumpLinks.map((jumpLink) => (
                <a
                  key={jumpLink.anchor}
                  href={`#${jumpLink.anchor}`}
                  className="min-h-[44px] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
                >
                  {jumpLink.label}
                </a>
              ))}
            </div>
          </section>
        )}

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
                    {filteredBundles.map((bundle: Bundle) => (
                      <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4"><span className="font-black text-sm">{bundle.network}</span></td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-900">{bundle.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{bundle.validity}</div>
                        </td>
                        <td className="px-6 py-4"><span className="text-lg font-black">R{bundle.price}</span></td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">R{bundle.costPerGb?.toFixed(2)}/GB</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium italic">* Prices are subject to change. Check individual network channels for final offer terms.</p>
              </div>
            </div>
          </section>
        )}

        {guide.steps && (
          <section className="mb-16">
            <h2 className="text-2xl font-black tracking-tighter mb-8">{guide.stepsTitle || 'Step-by-Step Guide'}</h2>
            <div className="space-y-6">
              {guide.steps.map((step, index) => (
                <div key={step.id || index} id={step.id} className="flex gap-6 group scroll-mt-32">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#031636] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg group-hover:bg-[#1b6d24] transition-colors">{index + 1}</div>
                  <div className="pt-2">
                    <h3 className="text-xl font-black mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {showNetworkDisappearingAdLayout && <AdUnit type="inContent" className="my-10" />}

        {guide.commonMistakes && guide.commonMistakes.length > 0 && (
          <section id="common-mistakes" className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-8">{guide.commonMistakesTitle || 'Common Mistakes'}</h2>
            <div className="space-y-6">
              {guide.commonMistakes.map((mistake, index) => (
                <div key={mistake.id || index} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-black mb-2 tracking-tight">{mistake.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{mistake.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {guide.nextSteps && guide.nextSteps.length > 0 && (
          <section id="find-cheaper-options" className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">{guide.nextStepsTitle || 'Find Cheaper Options'}</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-8">
              Use these pages to compare current South Africa prices and choose bundles based on your actual usage pattern.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.nextSteps.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToResource(item);
                  }}
                  className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-[#1b6d24] transition-all group text-left"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">{item.label}</h3>
                    <p className="text-xs text-slate-500 font-medium">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1b6d24]" />
                </a>
              ))}
            </div>
          </section>
        )}

        {showPriorityInternalLinks && (
          <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black tracking-tighter mb-4">Useful Related Pages</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-6">
              For a complete decision path, pair this guide with the <a href="/network/" onClick={(e) => { e.preventDefault(); navigate('/network/'); }} className="text-[#1b6d24] font-bold hover:underline">network comparison hub</a>, our <a href="/ussd-codes-south-africa/" onClick={(e) => { e.preventDefault(); navigate('/ussd-codes-south-africa/'); }} className="text-[#1b6d24] font-bold hover:underline">USSD codes directory</a>, and the <a href="/methodology/" onClick={(e) => { e.preventDefault(); navigate('/methodology/'); }} className="text-[#1b6d24] font-bold hover:underline">methodology page</a>.
            </p>
          </section>
        )}

        <section id="faq" className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm scroll-mt-32">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {guide.faq.map((item, index) => (
              <div key={index} className="border-b border-slate-50 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-black mb-3 flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                  {item.question}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium pl-[1.125rem]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Related Guides / Related Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToResource(item);
                }}
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-[#1b6d24] transition-all group text-left"
              >
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">{item.label}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1b6d24]" />
              </a>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p className="font-medium">
            <strong>Independent analysis:</strong> We compare publicly listed prepaid prices and bundle terms. Prices may change, so always verify with the operator. Read our{' '}
            <a href="/methodology/" onClick={(e) => { e.preventDefault(); navigate('/methodology/'); }} className="text-[#1b6d24] font-semibold hover:underline">methodology</a>{' '}
            and{' '}
            <a href="/editorial-policy/" onClick={(e) => { e.preventDefault(); navigate('/editorial-policy/'); }} className="text-[#1b6d24] font-semibold hover:underline">editorial policy</a>.
          </p>
        </section>
        {showNetworkDisappearingAdLayout && <AdUnit type="inContent" className="mt-0 mb-16" />}

        <section className="bg-[#031636] rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f399] blur-[120px] opacity-10 -mr-32 -mt-32"></div>
          <h2 className="text-3xl font-black tracking-tighter mb-4 relative z-10">Stop overpaying for data.</h2>
          <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto relative z-10">Compare all networks in one place and find the best deals for your needs today.</p>
          <a href="/" onClick={(e) => { e.preventDefault(); onBack(); }} className="inline-block px-8 py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform relative z-10">Compare All Prices</a>
          <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest relative z-10">You will be redirected to our official comparison tool</p>
        </section>
      </main>
    </div>
  );
};
