import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction, USSDEntry } from '../types';
import { ussdRepository } from '../data/ussd';
import { Copy, CheckCircle2, Phone, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { copyUssdCodeToClipboard, toAnalyticsOperator, toUssdCodeType } from '../utils/tracking';
import { registeredUssdCodeId } from '../seo/wp1AnalyticsRegistry';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

type SupportedNetworkSlug = 'mtn' | 'vodacom' | 'telkom' | 'cell-c';

interface NetworkUSSDPageProps {
  networkSlug: SupportedNetworkSlug;
  onBack: () => void;
  onScrollTo: (id: string) => void;
  onNavigate: NavigateFunction;
}

type NetworkConfig = {
  networkName: 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C';
  titlePrefix: string;
  route: string;
  networkHubHref: string;
  buyDataGuideHref: string;
  balanceGuideHref: string;
  metaDescription: string;
  intro: string;
  quickAnswer: string;
  quickCodes: Array<{ label: string; code: string }>;
  supportNote: string;
  faq: Array<{ question: string; answer: string }>;
  comparisonHref?: string;
};

const NETWORK_CONFIG: Record<SupportedNetworkSlug, NetworkConfig> = {
  mtn: {
    networkName: 'MTN',
    titlePrefix: 'MTN USSD Codes: *136# Balance, Data, Recharge and Please Call Me',
    route: '/mtn-ussd-codes/',
    networkHubHref: '/network/mtn/',
    buyDataGuideHref: '/guides/how-to-buy-data-mtn/',
    balanceGuideHref: '/guides/how-to-check-mtn-data-balance/',
    comparisonHref: '/guides/vodacom-vs-mtn-data-prices/',
    metaDescription:
      'MTN USSD codes for South Africa: dial *136# to check balance, *136*2# to buy data, *121*number# for Please Call Me and *151# for XtraTime.',
    intro:
      'Use this page when the intent is MTN-specific. If you searched for MTN balance check, how to check MTN balance, or MTN balance check code, start here for the exact MTN airtime, data, recharge, and Please Call Me shortcuts without opening the app.',
    quickAnswer:
      'For MTN balance check, dial *136# first. Use *136*2# to buy data, *136*VoucherCode# to recharge with a voucher, *121*number# for MTN Please Call Me, and *151# for MTN XtraTime. If your intent shifts from MTN-only to cross-network comparison, move to the all-network hub.',
    quickCodes: [
      { label: 'MTN balance check', code: '*136#' },
      { label: 'Buy MTN data', code: '*136*2#' },
      { label: 'MTN Please Call Me', code: '*121*number#' },
      { label: 'MTN XtraTime', code: '*151#' }
    ],
    supportNote:
      'MTN menus can vary by prepaid profile and active campaigns. If a code path changes, use *136# as your fallback entry point.',
    faq: [
      {
        question: 'How do I check my MTN balance?',
        answer: 'Dial *136# from your MTN SIM. This is the main MTN balance check code for airtime and bundle overview.'
      },
      {
        question: 'How do I buy MTN data without the app?',
        answer: 'Dial *136*2# to open MTN data and bundle purchase options.'
      },
      {
        question: 'What is the MTN recharge code?',
        answer: 'Use *136*VoucherCode# when you have a recharge voucher PIN. If that format fails on your line, start from *136# and follow the recharge menu.'
      },
      {
        question: 'How do I check my MTN number?',
        answer: 'A commonly used shortcode is *123*888#.'
      },
      {
        question: 'What if an MTN USSD code is not working?',
        answer: 'Retry with signal, then open *136# and follow self-service menu options for the same action.'
      }
    ]
  },
  vodacom: {
    networkName: 'Vodacom',
    titlePrefix: 'Vodacom USSD Codes: *135# Balance, Data, Airtime and Please Call Me',
    route: '/vodacom-ussd-codes/',
    networkHubHref: '/network/vodacom/',
    buyDataGuideHref: '/guides/how-to-buy-data-vodacom/',
    balanceGuideHref: '/guides/how-to-check-vodacom-airtime-balance/',
    comparisonHref: '/guides/vodacom-vs-mtn-data-prices/',
    metaDescription:
      'Vodacom USSD codes for South Africa: dial *135# to check balance and self-service, *135*2# to buy data, and *140*number# for Please Call Me.',
    intro:
      'Use this Vodacom USSD page to check Vodacom balance, confirm airtime, buy bundles, top up, and handle the everyday prepaid actions that are faster from the dialler than the app. If you searched for how to check Vodacom balance or the Vodacom balance check number, this page owns the wider Vodacom USSD code set, while the dedicated balance guide handles the step-by-step walkthrough intent.',
    quickAnswer:
      'For Vodacom balance checks, start with *135# for balances and self-service. Use *135*2# for bundle buying, *140*number# for Please Call Me, and the dedicated balance guide when you need a step-by-step airtime or data walkthrough.',
    quickCodes: [
      { label: 'Vodacom balance check', code: '*135#' },
      { label: 'Buy Vodacom data', code: '*135*2#' },
      { label: 'Vodacom Please Call Me', code: '*140*number#' },
      { label: 'Transfer airtime', code: '*135*1002#' }
    ],
    supportNote:
      'Vodacom often updates self-service menu flows. If a direct code fails, start from *135# and navigate to the same task.',
    faq: [
      {
        question: 'How do I check Vodacom balance?',
        answer: 'Start with *135# from your Vodacom SIM. This is the main Vodacom balance check number and menu entry for airtime, data, and self-service checks.'
      },
      {
        question: 'How do I buy Vodacom data using USSD?',
        answer: 'Dial *135*2# to open Vodacom bundle purchase options.'
      },
      {
        question: 'How do I transfer airtime on Vodacom?',
        answer: 'Use the transfer/self-service path from *135*1002# where available.'
      },
      {
        question: 'What if a Vodacom code changed?',
        answer: 'Start with *135# and use menu navigation for the same action; menu routing can vary by profile.'
      }
    ]
  },
  telkom: {
    networkName: 'Telkom',
    titlePrefix: 'Telkom USSD Codes: *188# Balance, *180# Data, Recharge and Help',
    route: '/telkom-ussd-codes/',
    networkHubHref: '/network/telkom/',
    buyDataGuideHref: '/guides/how-to-buy-data-telkom/',
    balanceGuideHref: '/guides/how-to-check-data-balance/',
    metaDescription:
      'Telkom USSD codes for South Africa: dial *188# to check balance, *180# to buy data or use self-service, *188*PIN# to recharge and *1# to check your number.',
    intro:
      'Use this page when the intent is Telkom-specific. It is the best destination for Telkom USSD codes, balance checks, data bundle paths, airtime advance menu checks, number checks, and prepaid support shortcuts without relying on app data.',
    quickAnswer:
      'For Telkom balance checks, dial *188#. Use *180# for data bundles and self-service, *188*PIN# to recharge, and *1# to check your number. Use this page for Telkom-specific code intent, and use the all-network hub only when you want cross-network comparison.',
    quickCodes: [
      { label: 'Telkom balance check', code: '*188#' },
      { label: 'Buy Telkom data', code: '*180#' },
      { label: 'Telkom recharge', code: '*188*PIN#' },
      { label: 'Check Telkom number', code: '*1#' }
    ],
    supportNote:
      'Telkom promo and Mo’Nice menu paths can change over time. If one shortcode fails, use *180# or *188# to find the same action.',
    faq: [
      {
        question: 'What is the Telkom USSD code to check data or airtime balance?',
        answer: 'Telkom users commonly use *188# for balance and bundle checks.'
      },
      {
        question: 'How do I buy Telkom data bundles via USSD?',
        answer: 'Dial *180# to access Telkom bundle purchase menus.'
      },
      {
        question: 'How do I check my Telkom number?',
        answer: 'A commonly used code is *1#.'
      },
      {
        question: 'Why does a Telkom code sometimes fail?',
        answer: 'Menu flows can vary by tariff/profile. Retry with signal, then use *180# as your main fallback.'
      }
    ]
  },
  'cell-c': {
    networkName: 'Cell C',
    titlePrefix: 'Cell C USSD Codes: *101# Balance, *147# Data and Recharge',
    route: '/cell-c-ussd-codes/',
    networkHubHref: '/network/cell-c/',
    buyDataGuideHref: '/guides/how-to-buy-data-cell-c/',
    balanceGuideHref: '/guides/how-to-check-data-balance/',
    metaDescription:
      'Cell C USSD codes for South Africa: dial *101# to check balance, *147# for data bundles and self-service, *102*PIN# to recharge and *111*number# for Please Call Me.',
    intro:
      'Use this page when the intent is Cell C-specific. If you searched for how to check balance on Cell C, how to check Cell C balance, or Cell C balance check, this is the best destination for the main balance code, data-bundle menus, and prepaid support shortcuts.',
    quickAnswer:
      'To check balance on Cell C, dial *101#. Use *147# for data bundles and broader self-service, *102*PIN# to recharge, and *111*number# for Please Call Me. Stay on this page for Cell C-specific code intent, then return to the hub only when you need a cross-network comparison.',
    quickCodes: [
      { label: 'Cell C balance check', code: '*101#' },
      { label: 'Buy Cell C data', code: '*147#' },
      { label: 'Cell C recharge', code: '*102*PIN#' },
      { label: 'Cell C Please Call Me', code: '*111*number#' }
    ],
    supportNote:
      'Cell C code paths can differ by account profile and campaign period. If a shortcode fails, use *147# as your fallback menu.',
    faq: [
      {
        question: 'How do I check balance on Cell C?',
        answer: 'Dial *101# from your Cell C SIM. That is the common Cell C balance check code.'
      },
      {
        question: 'How do I buy data on Cell C without the app?',
        answer: 'Dial *147# to access Cell C bundle and account menus.'
      },
      {
        question: 'How do I check my Cell C number?',
        answer: 'A commonly used number check route is *147*100#.'
      },
      {
        question: 'What should I do if a Cell C code does not work?',
        answer: 'Retry with signal and use *147# as a fallback entry point, then navigate to the needed action.'
      }
    ]
  }
};

const CATEGORY_ORDER = [
  'Balance & Account',
  'Data Bundles',
  'Airtime & Top-Up',
  'SIM / Number / Self-Service',
  'Help & Customer Care',
  'Bonus / Promo / Extras'
] as const;

const CATEGORY_MAP: Record<string, (entry: USSDEntry) => boolean> = {
  'Balance & Account': (entry) => entry.category === 'Balance' || entry.category === 'Self-service / Account',
  'Data Bundles': (entry) => entry.category === 'Data / Bundles',
  'Airtime & Top-Up': (entry) => entry.category === 'Airtime / Recharge' || entry.category === 'Transfers',
  'SIM / Number / Self-Service': (entry) => entry.category === 'Number / SIM info' || entry.category === 'Self-service / Account',
  'Help & Customer Care': (entry) => entry.category === 'Support / Customer care',
  'Bonus / Promo / Extras': (entry) => entry.category === 'Promotions / Advance airtime / Extras' || entry.category === 'Promotions'
};

const CATEGORY_ANCHOR: Record<(typeof CATEGORY_ORDER)[number], string> = {
  'Balance & Account': 'balance-account',
  'Data Bundles': 'data-bundles',
  'Airtime & Top-Up': 'airtime-topup',
  'SIM / Number / Self-Service': 'sim-number-selfservice',
  'Help & Customer Care': 'support-care',
  'Bonus / Promo / Extras': 'bonus-promo-extras'
};

const FIX_LINKS_BY_NETWORK_SLUG: Record<SupportedNetworkSlug, Array<{ href: string; label: string }>> = {
  mtn: [
    { href: '/fix/mtn-data-not-working/', label: 'MTN data not working' },
    { href: '/fix/mtn-data-balance-check/', label: 'MTN data balance check fix' },
    { href: '/fix/stop-wasp-services-mtn/', label: 'Stop WASP services on MTN' }
  ],
  vodacom: [
    { href: '/fix/vodacom-data-not-working/', label: 'Vodacom data not working' },
    { href: '/fix/vodacom-data-balance-check/', label: 'Vodacom data balance check fix' },
    { href: '/fix/stop-wasp-services-vodacom/', label: 'Stop WASP services on Vodacom' }
  ],
  telkom: [
    { href: '/fix/telkom-data-not-working/', label: 'Telkom data not working' },
    { href: '/fix/telkom-data-balance-check/', label: 'Telkom data balance check fix' },
    { href: '/fix/stop-wasp-services-telkom/', label: 'Stop WASP services on Telkom' }
  ],
  'cell-c': [
    { href: '/fix/cell-c-apn-settings/', label: 'Cell C APN settings' },
    { href: '/fix/cell-c-data-not-working/', label: 'Cell C data not working' },
    { href: '/fix/stop-wasp-services-cell-c/', label: 'Stop WASP services on Cell C' }
  ]
};

function findMostUsedCode(entries: USSDEntry[], patterns: string[]): USSDEntry | null {
  return (
    entries.find((entry) => patterns.some((pattern) => `${entry.action} ${entry.category}`.toLowerCase().includes(pattern))) || null
  );
}

function isDialable(code: string): boolean {
  return code.includes('*') || code.includes('#');
}

export const NetworkUSSDPage: React.FC<NetworkUSSDPageProps> = ({ networkSlug, onBack, onScrollTo, onNavigate }) => {
  const config = NETWORK_CONFIG[networkSlug];
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const pageTitle = config.titlePrefix;
  const canonicalUrl = toCanonicalUrl(config.route);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso(config.route);
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

  const networkEntries = useMemo(
    () => ussdRepository.filter((entry) => entry.network === config.networkName),
    [config.networkName]
  );

  const mostUsedRows = [
    findMostUsedCode(networkEntries, ['balance']),
    findMostUsedCode(networkEntries, ['buy data', 'bundle', 'data']),
    findMostUsedCode(networkEntries, ['recharge', 'voucher', 'airtime']),
    findMostUsedCode(networkEntries, ['check my number', 'number']),
    findMostUsedCode(networkEntries, ['support', 'care', 'helpdesk'])
  ].filter((entry): entry is USSDEntry => Boolean(entry));

  const groupedByCategory = useMemo(() => {
    return CATEGORY_ORDER.map((categoryName) => ({
      categoryName,
      anchor: CATEGORY_ANCHOR[categoryName],
      entries: networkEntries.filter((entry) => CATEGORY_MAP[categoryName](entry))
    })).filter((group) => group.entries.length > 0);
  }, [networkEntries]);

  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) return networkEntries;
    const q = searchTerm.trim().toLowerCase();
    return networkEntries.filter((entry) =>
      `${entry.action} ${entry.category} ${entry.code} ${entry.explanation}`.toLowerCase().includes(q)
    );
  }, [networkEntries, searchTerm]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.titlePrefix,
    description: config.metaDescription,
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
      { '@type': 'ListItem', position: 2, name: 'USSD Codes South Africa', item: toCanonicalUrl('/ussd-codes-south-africa/') },
      { '@type': 'ListItem', position: 3, name: config.titlePrefix, item: canonicalUrl }
    ]
  };

  const dialCode = (code: string) => {
    const dialableCode = code.replace(/#/g, '%23');
    window.location.href = `tel:${dialableCode}`;
  };

  const copyToClipboard = async (entry: USSDEntry) => {
    const success = await copyUssdCodeToClipboard(entry.code, {
      operator: toAnalyticsOperator(entry.network),
      codeType: toUssdCodeType(`${entry.category} ${entry.action}`),
      codeId: registeredUssdCodeId(entry.id),
      placement: 'network_ussd_page'
    });
    if (!success) return;
    setCopiedCode(entry.id);
    setTimeout(() => setCopiedCode(null), 1200);
  };

  const relatedLinks: Array<{ href: string; label: string }> = [
    { href: '/ussd-codes-south-africa/', label: 'USSD codes South Africa' },
    { href: config.networkHubHref, label: networkSlug === 'cell-c' ? 'Cell C data deals' : `${config.networkName} Network Page` },
    ...FIX_LINKS_BY_NETWORK_SLUG[networkSlug],
    { href: config.balanceGuideHref, label: `Check ${config.networkName} balance and bundles` },
    { href: config.buyDataGuideHref, label: `How to Buy Data on ${config.networkName}` },
    { href: '/airtime-advance-codes/', label: 'airtime advance codes' },
    { href: '/guides/cheapest-data-south-africa/', label: 'cheapest data in South Africa' },
    { href: '/guides/best-data-deals-south-africa/', label: 'Best Data Deals in South Africa' },
    { href: '/guides/how-to-check-data-balance/', label: 'How to Check Data Balance' },
    { href: '/alerts/', label: 'Mobile Alerts' }
  ];

  if (networkSlug === 'mtn') {
    relatedLinks.push(
      { href: '/ussd-codes-south-africa/', label: 'MTN Please Call Me code' },
      { href: '/cell-c-ussd-codes/', label: 'How to check Cell C balance' }
    );
  }

  if (networkSlug === 'vodacom') {
    relatedLinks.push(
      { href: '/guides/how-to-check-vodacom-airtime-balance/', label: 'How to check balance on Vodacom' },
      { href: '/guides/how-to-check-vodacom-airtime-balance/', label: 'How to check Vodacom balance' },
      { href: '/guides/how-to-check-vodacom-airtime-balance/', label: 'How to check airtime on Vodacom' }
    );
  }

  if (config.comparisonHref) {
    relatedLinks.push({ href: config.comparisonHref, label: 'Vodacom vs MTN Data Prices' });
  }

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="ussd" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav className="mb-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to USSD Hub
          </button>
          <Link to="/ussd-codes-south-africa/" className="text-xs font-black uppercase tracking-widest text-[#1b6d24] hover:underline">
            All Networks
          </Link>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]">{config.titlePrefix}</h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">{config.intro}</p>
          <p className="text-xs text-slate-500 mt-3">Last updated: {lastUpdated}</p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">{config.quickAnswer}</p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.quickCodes.map((item) => (
              <div key={`${item.label}-${item.code}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
                <code className="text-base font-black text-slate-900">{item.code}</code>
              </div>
            ))}
          </div>
          {networkSlug === 'vodacom' ? (
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              If you need the clearest step-by-step answer for <Link to="/guides/how-to-check-vodacom-airtime-balance/" className="font-semibold text-[#1b6d24] hover:underline">how to check balance on Vodacom</Link>, use the guide after this page. If you also need the wider menu for recharge, bundles, or self-service, stay here on the Vodacom USSD page.
            </p>
          ) : null}
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Need to borrow airtime when you are out of credit? Use the <Link to="/airtime-advance-codes/" className="font-semibold text-[#1b6d24] hover:underline">{config.networkName} airtime advance USSD code</Link> guide to compare eligibility, fees, and repayment notes.
          </p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Need the all-network directory instead of the operator page? Go back to <Link to="/ussd-codes-south-africa/" className="font-semibold text-[#1b6d24] hover:underline">USSD codes South Africa</Link> for comparison intent, or use <Link to="/guides/cheapest-data-south-africa/" className="font-semibold text-[#1b6d24] hover:underline">cheapest data in South Africa</Link> for pricing-first research.
          </p>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-black tracking-tight mb-4">Jump to Section</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groupedByCategory.map((group) => (
              <a
                key={group.categoryName}
                href={`#${group.anchor}`}
                className="min-h-[44px] rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
              >
                {group.categoryName}
              </a>
            ))}
            <a
              href="#common-problems"
              className="min-h-[44px] rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Common Problems
            </a>
            <a
              href="#faq"
              className="min-h-[44px] rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              FAQ
            </a>
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Most Used {config.networkName} Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mostUsedRows.map((entry) => (
              <div key={`${entry.action}-${entry.code}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{entry.category}</div>
                <h3 className="font-black text-slate-900 mb-2">{entry.action}</h3>
                <p className="text-sm text-slate-600 mb-4">{entry.explanation}</p>
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3">
                  <code className="text-base font-black text-slate-900">{entry.code}</code>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(entry)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-wider hover:border-[#1b6d24] hover:text-[#1b6d24]"
                    >
                      {copiedCode === entry.id ? (
                        <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Copied</span>
                      ) : (
                        <span className="inline-flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
                      )}
                    </button>
                    {isDialable(entry.code) ? (
                      <button
                        onClick={() => dialCode(entry.code)}
                        className="rounded-lg bg-[#031636] px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1b6d24]"
                      >
                        <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> Dial</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Find a {config.networkName} Code Quickly</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Search by action or code, for example: <strong>balance</strong>, <strong>buy data</strong>, <strong>support</strong>, or a specific shortcode.
          </p>
          <div className="relative mb-5">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={`Search ${config.networkName} codes`}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1b6d24]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredEntries.slice(0, 10).map((entry) => (
              <div key={`${entry.action}-${entry.code}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{entry.category}</div>
                <div className="font-black text-slate-900">{entry.action}</div>
                <p className="text-sm text-slate-600 mb-3">{entry.explanation}</p>
                <code className="font-black text-slate-900">{entry.code}</code>
              </div>
            ))}
            {filteredEntries.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No matching codes found. Try a broader keyword like &quot;balance&quot; or &quot;data&quot;.</p>
            ) : null}
          </div>
        </section>

        {groupedByCategory.map((group) => (
          <section key={group.categoryName} id={group.anchor} className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm scroll-mt-32">
            <h2 className="text-2xl font-black tracking-tight mb-5">{group.categoryName}</h2>
            <div className="space-y-3">
              {group.entries.map((entry, index) => (
                <article key={`${entry.action}-${entry.code}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <h3 className="font-black text-slate-900 mb-2">{entry.action}</h3>
                  <p className="text-sm text-slate-600 mb-3">{entry.explanation}</p>
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3">
                    <code className="text-base font-black text-slate-900">{entry.code}</code>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(entry)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-wider hover:border-[#1b6d24] hover:text-[#1b6d24]"
                      >
                        {copiedCode === entry.id ? (
                          <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Copied</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
                        )}
                      </button>
                      {isDialable(entry.code) ? (
                        <button
                          onClick={() => dialCode(entry.code)}
                          className="rounded-lg bg-[#031636] px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1b6d24]"
                        >
                          <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> Dial</span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">How to Use {config.networkName} USSD Codes</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            USSD codes are short dial commands that open operator menus directly from your phone keypad. They work even when mobile data is off, making them useful for low-data or no-data situations.
          </p>
          <p className="text-slate-700 leading-relaxed">
            In South Africa, USSD remains one of the quickest ways to check balances, buy bundles, and handle urgent line actions without waiting for an app to load.
          </p>
        </section>

        <section id="common-problems" className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm scroll-mt-32">
          <h2 className="text-2xl font-black tracking-tight mb-4">If a {config.networkName} Code Doesn&apos;t Work</h2>
          <ul className="space-y-2 text-slate-700">
            <li>1. Retry with stable network signal and enough call credit for support numbers.</li>
            <li>2. Check whether you are on prepaid or contract, because some menus differ by SIM type.</li>
            <li>3. Use the main self-service menu as a fallback to reach the same action path.</li>
            <li>4. Try again later if menus are temporarily unavailable during maintenance.</li>
          </ul>
          <p className="text-slate-600 text-sm mt-4">{config.supportNote}</p>
        </section>        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Related Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedLinks.map((item) => (
              <Link key={item.href} to={item.href} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:border-[#1b6d24] transition-colors">
                <span className="font-bold text-slate-900">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1b6d24]" />
            {config.networkName} USSD FAQ
          </h2>
          <div className="space-y-4">
            {config.faq.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="ussd" />    </div>
  );
};
