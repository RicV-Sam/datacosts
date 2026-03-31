
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { ArrowLeft, ChevronRight, ExternalLink, Info, ShieldCheck, Tag } from 'lucide-react';
import { Bundle, NavigateFunction, NetworkName } from '../types';
import { BUNDLE_TYPE_MAP } from '../config/routeCatalog';
import { buildBundleItemListSchema } from '../utils/structuredData';
import { formatIsoForDisplay, getBundleTypeModifiedIso, getDefaultPublishedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_BRAND_NAME, SITE_ORIGIN, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface BundleTypePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

type FilterIntent =
  | 'cheapest-1gb'
  | '1gb'
  | '2gb'
  | '5gb'
  | '10gb'
  | 'daily-data'
  | 'weekly-data'
  | 'monthly-data'
  | 'night-data'
  | 'social-data';

interface QuickAnswer {
  title: string;
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface LinkItem {
  href: string;
  label: string;
  description: string;
}

const CURRENT_YEAR = '2026';

const isNightBundle = (bundle: Bundle) =>
  bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== '');

const isDailyBundle = (bundle: Bundle) =>
  bundle.type === 'Daily' ||
  (bundle.validity.toLowerCase().includes('day') &&
    !bundle.validity.toLowerCase().includes('7 day') &&
    !bundle.validity.toLowerCase().includes('30 day'));

const isWeeklyBundle = (bundle: Bundle) =>
  bundle.type === 'Weekly' || bundle.validity.toLowerCase().includes('week') || bundle.validity.toLowerCase().includes('7 day');

const isMonthlyBundle = (bundle: Bundle) =>
  bundle.type === 'Monthly' || bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month');

const PHASE1_RELATED_TYPES: Record<string, FilterIntent[]> = {
  vodacom: ['cheapest-1gb', 'daily-data', 'monthly-data', 'night-data'],
  mtn: ['cheapest-1gb', 'daily-data', 'monthly-data', 'night-data'],
  telkom: ['cheapest-1gb', 'daily-data', 'monthly-data'],
  'cell-c': ['cheapest-1gb', 'daily-data', 'monthly-data'],
  rain: ['monthly-data']
};

const NETWORK_POSITIONING: Record<NetworkName, string> = {
  Vodacom: 'Vodacom usually wins on coverage consistency, but listed prepaid bundles can be expensive unless you match validity to usage and check personalised offers first.',
  MTN: 'MTN is a strong all-round prepaid network with frequent promos, so value often improves when you compare standard menu pricing against personalised deals.',
  Telkom: 'Telkom is usually value-led on prepaid data, especially for larger monthly bundles, but real-world experience still depends on your local coverage.',
  'Cell C': 'Cell C tends to be promo-driven, with strong selective value for users who compare validity terms instead of buying only on headline price.',
  Rain: 'Rain is positioned differently with app-managed plans, so prepaid mobile intent pages are usually less relevant than monthly usage comparisons.'
};

const INTENT_LABELS: Record<FilterIntent, string> = {
  'cheapest-1gb': 'Cheapest 1GB Data',
  '1gb': '1GB Data',
  '2gb': '2GB Data',
  '5gb': '5GB Data',
  '10gb': '10GB Data',
  'daily-data': 'Daily Data Bundles',
  'weekly-data': 'Weekly Data Bundles',
  'monthly-data': 'Monthly Data Bundles',
  'night-data': 'Night Data Bundles',
  'social-data': 'Social Data Bundles'
};

const INTENT_META_FOCUS: Record<FilterIntent, string> = {
  'cheapest-1gb': 'cheapest 1GB data',
  '1gb': '1GB data',
  '2gb': '2GB data',
  '5gb': '5GB data',
  '10gb': '10GB data',
  'daily-data': 'daily prepaid data',
  'weekly-data': 'weekly prepaid data',
  'monthly-data': 'monthly data deals',
  'night-data': 'night bundles',
  'social-data': 'social bundles'
};

function formatCurrency(value: number): string {
  return `R${value}`;
}

function getBundleTypeLabel(bundle: Bundle): string {
  const validity = bundle.validity.toLowerCase();
  if (bundle.type === 'Social') return 'Social';
  if (isNightBundle(bundle)) return 'Night';
  if (bundle.type === 'Hourly' || validity.includes('hour')) return 'Hourly';
  if (isDailyBundle(bundle)) return 'Daily';
  if (isWeeklyBundle(bundle)) return 'Weekly';
  if (isMonthlyBundle(bundle) && validity.includes('recurring')) return 'Monthly Recurring';
  if (isMonthlyBundle(bundle)) return 'Monthly Once-off';
  return bundle.type;
}

function getBundleWatchOut(bundle: Bundle): string {
  if (bundle.watchOut) return bundle.watchOut;
  if (bundle.note) return bundle.note;
  if (bundle.type === 'Social') return 'App-limited usage';
  if (isNightBundle(bundle)) return 'Night-only usage window';
  if (bundle.validity.toLowerCase().includes('1 day')) return 'Short validity';
  if (bundle.validity.toLowerCase().includes('recurring')) return 'Auto-renews';
  return 'Check current offer terms';
}

function getIntro(network: NetworkName, intent: FilterIntent): string {
  if (intent === 'cheapest-1gb') {
    return `Use this page to compare currently listed ${network} 1GB prepaid options in South Africa, including validity differences and where short-term offers can look cheap but expire quickly.`;
  }
  if (intent === 'daily-data') {
    return `This ${network} daily data page focuses on short-validity prepaid bundles for users who buy data day by day and want a cleaner price-versus-validity view before topping up.`;
  }
  if (intent === 'monthly-data') {
    return `This ${network} monthly prepaid page highlights 30-day style bundles so regular users can compare price, cost per GB, and practical value across entry and heavy-use options.`;
  }
  if (intent === 'night-data') {
    return `This ${network} night-data page tracks currently listed night-style prepaid bundles and when they make sense for overnight downloads versus normal anytime usage.`;
  }
  if (intent === 'social-data') {
    return `This ${network} social bundle page helps you compare app-limited prepaid options and avoid confusing social access with full open internet.`;
  }
  return `Compare ${network} ${INTENT_META_FOCUS[intent]} with a clear prepaid pricing table and practical buy guidance.`;
}
function getQuickAnswers(
  network: NetworkName,
  intent: FilterIntent,
  matchingBundles: Bundle[],
  allNetworkBundles: Bundle[]
): QuickAnswer[] {
  const cheapest = matchingBundles[0];
  const bestValue = [...matchingBundles]
    .filter((bundle) => bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];

  const answers: QuickAnswer[] = [];

  if (cheapest) {
    answers.push({
      title: `Current cheapest listed ${network} option`,
      text: `${cheapest.name} at ${formatCurrency(cheapest.price)} (${cheapest.validity}).`
    });
  }

  if (intent === 'cheapest-1gb') {
    const daily1Gb = allNetworkBundles
      .filter((bundle) => bundle.volume === '1GB' && isDailyBundle(bundle) && bundle.type !== 'Social')
      .sort((a, b) => a.price - b.price)[0];
    const weekly1Gb = allNetworkBundles
      .filter((bundle) => bundle.volume === '1GB' && isWeeklyBundle(bundle) && bundle.type !== 'Social')
      .sort((a, b) => a.price - b.price)[0];
    const monthly1Gb = allNetworkBundles
      .filter((bundle) => bundle.volume === '1GB' && isMonthlyBundle(bundle) && bundle.type !== 'Social')
      .sort((a, b) => a.price - b.price)[0];

    if (daily1Gb) {
      answers.push({
        title: `Cheapest 1GB short-validity pick`,
        text: `${daily1Gb.name} is the lowest 1GB starting point, but it expires quickly.`
      });
    }

    if (monthly1Gb) {
      answers.push({
        title: `Best 1GB option for controlled monthly usage`,
        text: `${monthly1Gb.name} gives longer validity than daily 1GB deals.`
      });
    }

    if (weekly1Gb) {
      answers.push({
        title: `When weekly 1GB makes sense`,
        text: `${weekly1Gb.name} works if you buy once a week instead of topping up daily.`
      });
    }

    answers.push({
      title: `Savings tip`,
      text: `${network} personalised deals can undercut standard 1GB menu pricing for some users.`
    });
  }

  if (intent === 'daily-data') {
    const monthlyBest = allNetworkBundles
      .filter((bundle) => isMonthlyBundle(bundle) && !isNightBundle(bundle) && bundle.type !== 'Social' && bundle.costPerGb > 0)
      .sort((a, b) => a.costPerGb - b.costPerGb)[0];

    answers.push({
      title: `Who daily bundles suit`,
      text: `Daily bundles are best for once-off usage days, not full-month browsing patterns.`
    });

    if (monthlyBest) {
      answers.push({
        title: `Where daily becomes poor value`,
        text: `If you buy daily repeatedly, ${monthlyBest.name} can offer better Rand-per-GB over 30 days.`
      });
    }
  }

  if (intent === 'monthly-data' && bestValue) {
    answers.push({
      title: `Best monthly value currently listed`,
      text: `${bestValue.name} at about R${bestValue.costPerGb.toFixed(2)} per GB.`
    });
    answers.push({
      title: `Watch-out`,
      text: `Monthly value can still be weak if coverage in your area is unstable or if auto-renew terms are not checked.`
    });
  }

  if (intent === 'night-data') {
    answers.push({
      title: `When night bundles are worth it`,
      text: `Night data is useful for overnight downloads and updates, but not for daytime browsing.`
    });
    answers.push({
      title: `Common misunderstanding`,
      text: `Night bundle GB is usually not interchangeable with anytime data.`
    });
  }

  if (!answers.length) {
    answers.push({
      title: `${network} ${INTENT_LABELS[intent]} quick answer`,
      text: `Compare listed pricing, validity, and watch-outs before buying.`
    });
  }

  return answers.slice(0, 4);
}

function getWhoThisIsFor(network: NetworkName, intent: FilterIntent): string[] {
  if (intent === 'cheapest-1gb') {
    return [
      `Prepaid users who usually buy around 1GB at a time on ${network}.`,
      'Users comparing daily, weekly, and monthly 1GB validity before paying.',
      'Anyone checking whether personalised deals can beat public menu pricing.'
    ];
  }

  if (intent === 'daily-data') {
    return [
      `Short-term ${network} users who need data for a single day.`,
      'Users who top up frequently and want to avoid overpaying by habit.',
      'People deciding when weekly or monthly is better than daily repeat buys.'
    ];
  }

  if (intent === 'monthly-data') {
    return [
      `Regular ${network} prepaid users who buy data every month.`,
      'Users comparing low-usage and heavy-usage monthly options.',
      'Anyone focusing on Rand-per-GB and practical 30-day value.'
    ];
  }

  if (intent === 'night-data') {
    return [
      `${network} users who schedule downloads overnight.`,
      'Users who understand night windows and want lower-cost off-peak data.',
      'People separating night usage from normal daytime browsing needs.'
    ];
  }

  return [
    `${network} prepaid users comparing listed bundles by intent.`,
    'Users who care about value, not just headline bundle size.',
    'People choosing bundles based on realistic usage timing.'
  ];
}

function getSavingsTips(network: NetworkName, intent: FilterIntent): string[] {
  const base = [
    `Check ${network} personalised or promo menus before paying full standard pricing.`,
    'Avoid running out and falling into out-of-bundle charging patterns.',
    'Compare validity and cost-per-GB together instead of price alone.'
  ];

  if (network === 'MTN') {
    base.unshift('Check Made4U and app promos first, because MTN promo value can differ by SIM.');
  }
  if (network === 'Telkom') {
    base.unshift('If you buy larger bundles, verify local Telkom coverage quality before committing.');
  }
  if (network === 'Cell C') {
    base.unshift('Treat Cell C campaign pricing as time-bound and recheck before each purchase.');
  }
  if (network === 'Vodacom') {
    base.unshift('Check Just 4 You before standard menu purchases; offer value varies by user.');
  }

  if (intent === 'daily-data') {
    base.push('If you are buying daily more than 3-4 times a week, benchmark against weekly and monthly options.');
  }

  if (intent === 'monthly-data') {
    base.push('For recurring bundles, verify auto-renew behavior so airtime is not consumed unexpectedly.');
  }

  if (intent === 'night-data') {
    base.push('Only buy night bundles when you can actually use data during the night window.');
  }

  return base.slice(0, 5);
}
function getFaqs(network: NetworkName, intent: FilterIntent, cheapestBundle?: Bundle, bestValueBundle?: Bundle): FAQItem[] {
  if (intent === 'cheapest-1gb') {
    return [
      {
        question: `What is the cheapest listed ${network} 1GB bundle?`,
        answer: cheapestBundle
          ? `${cheapestBundle.name} is currently the lowest listed 1GB option on this page at ${formatCurrency(cheapestBundle.price)}.`
          : `No clearly matched ${network} 1GB listing is currently available in this dataset.`
      },
      {
        question: `Should I buy daily or monthly ${network} 1GB?`,
        answer: 'Daily is usually cheaper upfront but expires quickly. Monthly 1GB is often better for controlled usage across the full month.'
      },
      {
        question: `Can ${network} personalised offers be cheaper than standard 1GB prices?`,
        answer: `Yes, personalised ${network} deals can sometimes beat standard menu pricing, but they vary by customer and campaign.`
      },
      {
        question: `How do I avoid overpaying for ${network} 1GB bundles?`,
        answer: 'Compare validity, cost per GB, and usage timing before buying. A cheap headline price is not always the best value.'
      }
    ];
  }

  if (intent === 'daily-data') {
    return [
      {
        question: `Which ${network} daily bundle is currently the cheapest listed?`,
        answer: cheapestBundle
          ? `${cheapestBundle.name} is currently the lowest listed daily option at ${formatCurrency(cheapestBundle.price)}.`
          : `No clearly matched ${network} daily bundle is currently listed in this dataset.`
      },
      {
        question: `When is daily ${network} data poor value?`,
        answer: 'Daily bundles become expensive when purchased repeatedly through the month. Weekly or monthly bundles can be better value for regular users.'
      },
      {
        question: `Who should buy ${network} daily bundles?`,
        answer: 'Daily bundles are best for short-term usage days, travel days, or occasional top-ups when you do not need a full-month commitment.'
      },
      {
        question: `How can I save on ${network} daily data?`,
        answer: 'Check promo menus first and compare daily rates against weekly alternatives before repeating daily purchases.'
      }
    ];
  }

  if (intent === 'monthly-data') {
    return [
      {
        question: `What is the best listed monthly value on ${network}?`,
        answer: bestValueBundle
          ? `${bestValueBundle.name} currently shows one of the strongest monthly value points at around R${bestValueBundle.costPerGb.toFixed(2)} per GB.`
          : `No clear monthly value leader is currently listed in this dataset.`
      },
      {
        question: `Is ${network} usually cheap for monthly prepaid data?`,
        answer: network === 'Telkom'
          ? 'Telkom is often among the cheapest for larger monthly prepaid bundles, but value still depends on local coverage quality.'
          : `${network} monthly value depends on active promotions and bundle size. Compare listed options before buying.`
      },
      {
        question: `Should I buy once-off or recurring monthly bundles?`,
        answer: 'Once-off gives more control, while recurring can be convenient if you want automatic top-ups. Always check renewal terms.'
      },
      {
        question: `How do I avoid wasting monthly data?`,
        answer: 'Match bundle size to realistic usage, track expiry dates, and avoid overbuying based on headline GB alone.'
      }
    ];
  }

  if (intent === 'night-data') {
    return [
      {
        question: `What is the cheapest listed ${network} night bundle?`,
        answer: cheapestBundle
          ? `${cheapestBundle.name} is currently the lowest listed night option at ${formatCurrency(cheapestBundle.price)}.`
          : `No clear ${network} night bundle is currently listed in this dataset.`
      },
      {
        question: `Are ${network} night bundles good for general browsing?`,
        answer: 'Usually no. Night bundles are designed for off-peak windows and are not ideal for daytime usage.'
      },
      {
        question: `When should I buy ${network} night data?`,
        answer: 'Buy night bundles when you can schedule updates, downloads, or streaming inside the allowed night window.'
      },
      {
        question: `What do users usually misunderstand about night data?`,
        answer: 'Many users assume night GB works like anytime data. In practice, it is usually restricted to specific off-peak hours.'
      }
    ];
  }

  return [
    {
      question: `How do I compare ${network} ${INTENT_LABELS[intent].toLowerCase()} safely?`,
      answer: 'Use price, validity, cost per GB, and usage restrictions together before deciding.'
    },
    {
      question: `Can promotions change ${network} bundle value quickly?`,
      answer: 'Yes. Network promotions can change often, so always confirm final pricing before checkout.'
    },
    {
      question: `Should I rely on headline price only?`,
      answer: 'No. Validity and restrictions can make a low headline price more expensive in practice.'
    },
    {
      question: `Where should I verify final terms?`,
      answer: `Always verify final bundle terms on official ${network} channels before paying.`
    }
  ];
}

function getIntentLinks(networkSlug: string, activeIntent: FilterIntent): LinkItem[] {
  return (PHASE1_RELATED_TYPES[networkSlug] || [])
    .filter((intent) => intent !== activeIntent)
    .map((intent) => ({
      href: `/network/${networkSlug}/${intent}/`,
      label: INTENT_LABELS[intent],
      description: `Compare ${INTENT_LABELS[intent].toLowerCase()} for this operator.`
    }));
}

function getGuideLinks(networkSlug: string, networkName: NetworkName): LinkItem[] {
  const guides: LinkItem[] = [
    {
      href: `/network/${networkSlug}/`,
      label: `${networkName} network overview`,
      description: `Full ${networkName} page with broader bundle categories and USSD context.`
    },
    {
      href: '/guides/cheapest-1gb-data-south-africa/',
      label: 'Cheapest 1GB data in South Africa',
      description: 'Cross-network benchmark for 1GB prepaid value.'
    },
    {
      href: '/guides/best-monthly-data-deals-south-africa/',
      label: 'Cheapest monthly data in South Africa',
      description: 'Countrywide monthly comparison for regular users.'
    },
    {
      href: '/guides/how-to-check-data-balance/',
      label: 'How to check data balance',
      description: 'Track active bundles and avoid accidental out-of-bundle spend.'
    },
    {
      href: '/guides/cheapest-10gb-data-south-africa/',
      label: 'Cheapest 10GB data in South Africa',
      description: 'National benchmark for medium-to-heavy users.'
    }
  ];

  const buyGuideBySlug: Partial<Record<string, string>> = {
    vodacom: '/guides/how-to-buy-data-vodacom/',
    mtn: '/guides/how-to-buy-data-mtn/',
    telkom: '/guides/how-to-buy-data-telkom/',
    'cell-c': '/guides/how-to-buy-data-cell-c/'
  };

  const buyGuideHref = buyGuideBySlug[networkSlug];
  if (buyGuideHref) {
    guides.push({
      href: buyGuideHref,
      label: `How to buy ${networkName} data`,
      description: `Step-by-step buy flow for ${networkName} users.`
    });
  }

  if (networkSlug === 'vodacom' || networkSlug === 'mtn') {
    guides.push({
      href: '/guides/vodacom-vs-mtn-data-prices/',
      label: 'Vodacom vs MTN data prices',
      description: 'Direct comparison for the two major all-round operators.'
    });
  }

  return guides;
}

export const BundleTypePage: React.FC<BundleTypePageProps> = ({ onNavigate, onScrollTo }) => {
  const { networkSlug, bundleType } = useParams<{ networkSlug: string; bundleType: string }>();

  const normalizedBundleType = bundleType === '1gb' ? 'cheapest-1gb' : bundleType;
  const typeConfig = normalizedBundleType ? BUNDLE_TYPE_MAP[normalizedBundleType] : null;
  const networkData = networkSlug ? networkPages[networkSlug] : null;
  const networkKey = networkData?.networkName as NetworkName | undefined;
  const network = networkKey ? networkMetadata[networkKey] : null;

  if (!network || !typeConfig || !networkData || !networkSlug || !normalizedBundleType) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Page Not Found | DataCost</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md text-center">
          We could not find the filtered network page you requested.
        </p>
        <button
          onClick={() => onNavigate('network')}
          className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-emerald-600 transition-colors"
        >
          Back to Networks
        </button>
      </div>
    );
  }

  const intent = normalizedBundleType as FilterIntent;
  const allNetworkBundles = bundles.filter((bundle) => bundle.network === network.name);
  const matchingBundles = allNetworkBundles
    .filter((bundle) => typeConfig.filter(bundle))
    .sort((a, b) => a.price - b.price);

  const bestValueBundle = [...matchingBundles]
    .filter((bundle) => bundle.costPerGb > 0)
    .sort((a, b) => a.costPerGb - b.costPerGb)[0];
  const cheapestBundle = matchingBundles[0];

  const pageTitle = `${network.name} ${INTENT_LABELS[intent]} South Africa (${CURRENT_YEAR}) | DataCost`;
  const metaDescription = `Compare ${network.name} ${INTENT_META_FOCUS[intent]} in South Africa. See listed prices, validity, value notes, and practical prepaid watch-outs for ${CURRENT_YEAR}.`;
  const canonicalUrl = toCanonicalUrl(`/network/${networkSlug}/${normalizedBundleType}/`);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getBundleTypeModifiedIso(networkSlug);
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

  const h1 = `${network.name} ${INTENT_LABELS[intent]} South Africa (${CURRENT_YEAR})`;
  const intro = getIntro(network.name, intent);
  const quickAnswers = getQuickAnswers(network.name, intent, matchingBundles, allNetworkBundles);
  const whoThisIsFor = getWhoThisIsFor(network.name, intent);
  const savingsTips = getSavingsTips(network.name, intent);
  const faqs = getFaqs(network.name, intent, cheapestBundle, bestValueBundle);
  const relatedIntentLinks = getIntentLinks(networkSlug, intent);
  const guideLinks = getGuideLinks(networkSlug, network.name);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: h1,
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      url: SITE_ORIGIN
    },
    image: DEFAULT_OG_IMAGE_URL
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Networks', item: toCanonicalUrl('/network/') },
      { '@type': 'ListItem', position: 3, name: `${network.name} Data Prices`, item: toCanonicalUrl(`/network/${networkSlug}/`) },
      { '@type': 'ListItem', position: 4, name: `${network.name} ${INTENT_LABELS[intent]}`, item: canonicalUrl }
    ]
  };

  const bundleItemListSchema = buildBundleItemListSchema(
    `${network.name} ${INTENT_LABELS[intent]} (${CURRENT_YEAR})`,
    canonicalUrl,
    matchingBundles,
    () => canonicalUrl
  );
  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        {!matchingBundles.length && <meta name="robots" content="noindex,follow" />}
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(bundleItemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </a>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-300">
              <ChevronRight className="w-4 h-4" />
              <a
                href="/network/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('network');
                }}
                className="hover:text-[#1b6d24] transition-colors text-slate-600"
              >
                Networks
              </a>
              <ChevronRight className="w-4 h-4" />
              <a href={`/network/${networkSlug}/`} className="hover:text-[#1b6d24] transition-colors text-slate-600">
                {network.name}
              </a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-400">{INTENT_LABELS[intent]}</span>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {network.name} / {CURRENT_YEAR}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <AdUnit type="aboveFold" />

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Tag className="w-3 h-3" />
            Updated {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">{h1}</h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">{intro}</p>
        </header>

        <section className="mb-10 bg-[#031636] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/10 text-[#a0f399] rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border border-[#a0f399]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Quick answer
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">{network.name} {INTENT_LABELS[intent]} at a glance</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickAnswers.map((answer) => (
              <div key={answer.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#a0f399] mb-2">{answer.title}</p>
                <p className="text-sm text-slate-100 font-medium leading-relaxed">{answer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black tracking-tighter mb-4">{network.name} {INTENT_LABELS[intent]} pricing table</h2>
          {matchingBundles.length > 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[780px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle name</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Validity</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cost per GB</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Watch out</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {matchingBundles.map((bundle) => (
                      <tr key={bundle.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{bundle.name}</td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">{getBundleTypeLabel(bundle)}</td>
                        <td className="px-6 py-4 text-lg font-black text-slate-900">{formatCurrency(bundle.price)}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">{bundle.validity}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            R{bundle.costPerGb.toFixed(2)} / GB
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-amber-700">{getBundleWatchOut(bundle)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-slate-600 font-medium leading-relaxed">
              No clearly matched bundles are listed for this exact intent right now. We keep the page live so users can monitor future updates without guessing.
            </div>
          )}
        </section>

        <AdUnit type="inContent" />

        <section className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-4">Who this page is for</h2>
          <ul className="space-y-3">
            {whoThisIsFor.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-700 font-medium leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-4">{network.name} savings tips and watch-outs</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-5">{NETWORK_POSITIONING[network.name]}</p>
          <div className="space-y-4">
            {savingsTips.map((tip, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#031636] text-white text-xs font-black flex items-center justify-center flex-shrink-0">{index + 1}</div>
                <p className="text-slate-700 font-medium leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Related pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedIntentLinks.map((link) => (
              <a key={link.href} href={link.href} className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#1b6d24] hover:shadow-sm transition-all">
                <div className="font-bold text-slate-900">{link.label}</div>
                <p className="text-sm text-slate-600 mt-2">{link.description}</p>
              </a>
            ))}
            {guideLinks.map((link) => (
              <a key={link.href} href={link.href} className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#1b6d24] hover:shadow-sm transition-all">
                <div className="font-bold text-slate-900">{link.label}</div>
                <p className="text-sm text-slate-600 mt-2">{link.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-black mb-2">{faq.question}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p className="font-medium">
            <strong>Independent analysis:</strong> We track publicly listed prepaid bundle pricing, USSD access routes, and network offer patterns to compare real value rather than headline GB alone. Final terms can change quickly, so confirm on official operator channels. Review our <a href="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</a> and <a href="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</a>.
          </p>
        </div>

        <div className="mt-8">
          <a
            href={network.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b6d24] text-white rounded-xl font-black hover:bg-[#a0f399] hover:text-[#031636] transition-all"
          >
            Visit Official {network.name} Site
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
