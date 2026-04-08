import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, HelpCircle, Phone, Search, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { ussdRepository } from '../data/ussd';
import { NavigateFunction, USSDEntry } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface USSDPageProps {
  onBack: () => void;
  onScrollTo: (id: string) => void;
  onNavigate: NavigateFunction;
}

type NetworkName = 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C';

const MAJOR_NETWORKS: Array<{ name: NetworkName; slug: string; id: string; summary: string; ussdPage: string; networkPage: string }> = [
  {
    name: 'MTN',
    slug: 'mtn',
    id: 'mtn-ussd-codes',
    summary: 'Use MTN shortcuts for balance, buying bundles, and account self-service without opening the app.',
    ussdPage: '/mtn-ussd-codes/',
    networkPage: '/network/mtn/'
  },
  {
    name: 'Vodacom',
    slug: 'vodacom',
    id: 'vodacom-ussd-codes',
    summary: 'Vodacom users can check balances, buy data, and reach self-service menus from the dialler.',
    ussdPage: '/vodacom-ussd-codes/',
    networkPage: '/network/vodacom/'
  },
  {
    name: 'Telkom',
    slug: 'telkom',
    id: 'telkom-ussd-codes',
    summary: 'Telkom USSD is especially useful for balance checks, Mo’Nice access, and quick prepaid bundle actions.',
    ussdPage: '/telkom-ussd-codes/',
    networkPage: '/network/telkom/'
  },
  {
    name: 'Cell C',
    slug: 'cell-c',
    id: 'cell-c-ussd-codes',
    summary: 'Cell C USSD shortcuts help with balance checks, bundle buying, and account actions when airtime is tight.',
    ussdPage: '/cell-c-ussd-codes/',
    networkPage: '/network/cell-c/'
  }
];

const ANCHOR_LINKS = [
  { href: '#mtn-ussd-codes', label: 'MTN USSD codes' },
  { href: '#vodacom-ussd-codes', label: 'Vodacom USSD codes' },
  { href: '#telkom-ussd-codes', label: 'Telkom USSD codes' },
  { href: '#cell-c-ussd-codes', label: 'Cell C USSD codes' },
  { href: '#airtime-advance-codes', label: 'Airtime advance codes' },
  { href: '#please-call-me-codes', label: 'Please call me codes' },
  { href: '#data-balance-codes', label: 'Data balance codes' },
  { href: '#buy-data-codes', label: 'Buy data codes' },
  { href: '#faq', label: 'FAQ' }
];

function findFirstCode(network: string, patterns: string[]): string {
  const row = ussdRepository.find((entry) =>
    entry.network === network && patterns.some((pattern) => `${entry.action} ${entry.category}`.toLowerCase().includes(pattern))
  );
  return row?.code || 'Check menu';
}

function isDialable(code: string): boolean {
  return code.includes('*') || code.includes('#') || /^\d+$/.test(code);
}

function getMajorNetworkCodes(network: NetworkName): USSDEntry[] {
  return ussdRepository.filter((entry) => entry.network === network).slice(0, 8);
}

export const USSDPage: React.FC<USSDPageProps> = ({ onBack, onScrollTo, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNetwork, setActiveNetwork] = useState<'All' | NetworkName>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const pageTitle = 'South Africa USSD Codes (2026) | MTN, Vodacom, Telkom & Cell C';
  const metaDescription =
    'Use the main South African USSD codes for MTN, Vodacom, Telkom and Cell C. Check balance, buy data, send Please Call Me, and find self-service shortcuts fast.';
  const canonicalUrl = toCanonicalUrl('/ussd-codes-south-africa/');
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/ussd-codes-south-africa/');
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

  const faqItems = [
    {
      question: 'What is the USSD code to check airtime or data balance in South Africa?',
      answer:
        'Common balance shortcuts are MTN *136#, Vodacom *135#, Telkom *188#, and Cell C *101#. If a code routes differently on your line, use the network-specific USSD page for that operator.'
    },
    {
      question: 'How do I buy data using USSD in South Africa?',
      answer:
        'Typical buy-data shortcuts are MTN *136*2#, Vodacom *135*2#, Telkom *180#, and Cell C *147#. These let you buy bundles without relying on the app.'
    },
    {
      question: 'What is the Please Call Me code in South Africa?',
      answer:
        'The format differs by network and can change. This page lists commonly used formats for Vodacom, MTN, Telkom, and Cell C, but if a code fails you should use the operator’s self-service menu or support channel.'
    },
    {
      question: 'Can I borrow airtime with USSD?',
      answer:
        'Sometimes, yes. MTN has a verified XtraTime route on *151#. Other operators may place airtime-advance access inside their main self-service menus, so this page keeps that wording conservative where direct verification is less clear.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'USSD Codes South Africa', item: canonicalUrl }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'South Africa USSD Codes',
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

  const answerBlocks = [
    {
      id: 'data-balance-codes',
      title: 'Data balance codes',
      description: 'Check balance before you browse again so airtime does not start paying out-of-bundle rates by mistake.',
      items: MAJOR_NETWORKS.map((network) => ({
        network: network.name,
        code: findFirstCode(network.name, ['balance'])
      }))
    },
    {
      id: 'buy-data-codes',
      title: 'Buy data codes',
      description: 'Use these shortcuts when you need a bundle fast and do not want to rely on the operator app.',
      items: MAJOR_NETWORKS.map((network) => ({
        network: network.name,
        code: findFirstCode(network.name, ['buy data', 'bundles', 'data'])
      }))
    },
    {
      id: 'please-call-me-codes',
      title: 'Please call me codes',
      description: 'These are commonly used callback formats. If a format fails, use the operator menu or support path instead of guessing.',
      items: [
        { network: 'Vodacom', code: '*140*0821234567#' },
        { network: 'MTN', code: '*121*0821234567#' },
        { network: 'Telkom', code: '*140*0821234567#' },
        { network: 'Cell C', code: '*111*0821234567#' }
      ]
    },
    {
      id: 'airtime-advance-codes',
      title: 'Airtime advance codes',
      description: 'Borrow airtime routes vary more by operator and eligibility, so these entries stay conservative unless the shortcut is clearly verified.',
      items: [
        { network: 'Vodacom', code: '*135# menu' },
        { network: 'MTN', code: findFirstCode('MTN', ['xtratime', 'advance']) },
        { network: 'Telkom', code: '*180# menu' },
        { network: 'Cell C', code: '*147# menu' }
      ]
    }
  ];

  const filteredCodes = useMemo(() => {
    return ussdRepository.filter((entry) => {
      const matchesNetwork = activeNetwork === 'All' || entry.network === activeNetwork;
      const haystack = `${entry.network} ${entry.action} ${entry.category} ${entry.code}`.toLowerCase();
      const matchesSearch = !searchTerm.trim() || haystack.includes(searchTerm.toLowerCase());
      return matchesNetwork && matchesSearch;
    });
  }, [activeNetwork, searchTerm]);

  const dialCode = (code: string) => {
    const dialableCode = code.replace(/#/g, '%23');
    window.location.href = `tel:${dialableCode}`;
  };

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

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
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="ussd" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to comparison
          </button>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]">
            South Africa <span className="text-[#1b6d24]">USSD Codes</span> (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            Use this page to check balance, buy data, find self-service shortcuts, and troubleshoot common prepaid actions on MTN, Vodacom, Telkom, and Cell C.
          </p>
          <p className="text-xs text-slate-500 mt-3">Last updated: {lastUpdated}</p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-black tracking-tight mb-4">On this page</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ANCHOR_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-[44px] rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-[#031636] text-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-black tracking-tight mb-2">Need quick access to network-specific codes?</h2>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">
            Jump straight to the dedicated operator pages if you only need one network’s balance, buy-data, or account shortcuts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/mtn-ussd-codes/" className="inline-flex min-h-[44px] items-center rounded-xl bg-[#a0f399] px-4 text-sm font-black text-[#031636]">MTN USSD</Link>
            <Link to="/vodacom-ussd-codes/" className="inline-flex min-h-[44px] items-center rounded-xl bg-[#a0f399] px-4 text-sm font-black text-[#031636]">Vodacom USSD</Link>
            <Link to="/telkom-ussd-codes/" className="inline-flex min-h-[44px] items-center rounded-xl bg-[#a0f399] px-4 text-sm font-black text-[#031636]">Telkom USSD</Link>
            <Link to="/cell-c-ussd-codes/" className="inline-flex min-h-[44px] items-center rounded-xl bg-[#a0f399] px-4 text-sm font-black text-[#031636]">Cell C USSD</Link>
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            The safest way to use USSD is to start with balance checks, then buy bundles before you browse again. The exact shortcode differs by operator, so use the answer sections below for the common actions most South African prepaid users need every week.
          </p>
        </section>

        <section className="mb-10 space-y-5">
          {answerBlocks.map((block) => (
            <article key={block.id} id={block.id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-black tracking-tight mb-3">{block.title}</h2>
              <p className="text-slate-700 leading-relaxed mb-5">{block.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {block.items.map((item) => (
                  <div key={`${block.id}-${item.network}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.network}</div>
                    <div className="font-black text-slate-900">{item.code}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Useful next steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link to="/guides/how-to-check-data-balance/" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
              <div className="font-black text-slate-900">How to Check Data Balance</div>
              <p className="text-sm text-slate-600 mt-1">Use the balance guide before you buy another bundle.</p>
            </Link>
            <Link to="/guides/how-to-buy-data-mtn/" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
              <div className="font-black text-slate-900">How to Buy Data on MTN</div>
              <p className="text-sm text-slate-600 mt-1">Operator-specific buy path for MTN users.</p>
            </Link>
            <Link to="/guides/how-to-buy-data-vodacom/" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
              <div className="font-black text-slate-900">How to Buy Data on Vodacom</div>
              <p className="text-sm text-slate-600 mt-1">Use this when Vodacom app access is not the fastest option.</p>
            </Link>
            <Link to="/guides/how-to-buy-data-telkom/" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
              <div className="font-black text-slate-900">How to Buy Data on Telkom</div>
              <p className="text-sm text-slate-600 mt-1">See the main Telkom bundle-buy flow and Mo’Nice context.</p>
            </Link>
            <Link to="/guides/how-to-buy-data-cell-c/" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
              <div className="font-black text-slate-900">How to Buy Data on Cell C</div>
              <p className="text-sm text-slate-600 mt-1">Useful if you need a fast Cell C buy-data path from airtime.</p>
            </Link>
            <Link to="/guides/stop-wasp-subscriptions-south-africa/" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
              <div className="font-black text-slate-900">Stop WASP Subscriptions</div>
              <p className="text-sm text-slate-600 mt-1">Use this if airtime keeps disappearing in small recurring deductions.</p>
            </Link>
          </div>
        </section>

        <section className="mb-10 space-y-6">
          {MAJOR_NETWORKS.map((network) => {
            const codes = getMajorNetworkCodes(network.name);
            return (
              <section key={network.name} id={network.id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm scroll-mt-28">
                <h2 className="text-2xl font-black tracking-tight mb-3">{network.name} USSD codes</h2>
                <p className="text-slate-700 leading-relaxed mb-5">{network.summary}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                  {codes.map((entry, index) => (
                    <div key={`${network.name}-${entry.code}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{entry.category}</div>
                      <div className="font-black text-slate-900">{entry.action}</div>
                      <div className="text-sm text-slate-600 mb-3">{entry.explanation}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(entry.code)}
                          className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-black uppercase tracking-wider hover:border-[#1b6d24] hover:text-[#1b6d24]"
                        >
                          {copiedCode === entry.code ? (
                            <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Copied</span>
                          ) : (
                            <span className="inline-flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
                          )}
                        </button>
                        {isDialable(entry.code) ? (
                          <button
                            onClick={() => dialCode(entry.code)}
                            className="px-3 py-2 rounded-lg bg-[#031636] text-white text-xs font-black uppercase tracking-wider hover:bg-[#1b6d24] inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> Dial
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={network.ussdPage} className="text-sm font-bold text-[#1b6d24] hover:underline">Open full {network.name} USSD page</Link>
                  <Link to={network.networkPage} className="text-sm font-bold text-[#1b6d24] hover:underline">View {network.name} network page</Link>
                </div>
              </section>
            );
          })}
        </section>

        <AdUnit type="inContent" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Search all available codes</h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {(['All', ...MAJOR_NETWORKS.map((network) => network.name)] as Array<'All' | NetworkName>).map((network) => (
              <button
                key={network}
                onClick={() => setActiveNetwork(network)}
                className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider transition-colors ${
                  activeNetwork === network
                    ? 'bg-[#1b6d24] text-white border-[#1b6d24]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1b6d24] hover:text-[#1b6d24]'
                }`}
              >
                {network}
              </button>
            ))}
          </div>
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by task, code, or network"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1b6d24]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCodes.map((entry, index) => (
              <div key={`${entry.network}-${entry.code}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{entry.network} / {entry.category}</div>
                <div className="font-black text-slate-900">{entry.action}</div>
                <div className="text-sm text-slate-600 mb-3">{entry.explanation}</div>
                <div className="font-black text-slate-900">{entry.code}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            Methodology and trust
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>Independent analysis:</strong> DataCost compiles public network shortcuts and common consumer workflows so users can solve prepaid tasks faster.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            Codes and menu trees can change. Where a direct network-wide shortcut is not clearly supported, this page keeps the wording conservative and points users back to the operator menu instead of inventing a direct code.
          </p>
          <p className="text-slate-700 mt-3">
            See our <Link to="/guides/cheapest-data-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">cheapest data guide</Link>, <Link to="/network/" className="text-[#1b6d24] font-semibold hover:underline">network comparison hub</Link>, and <Link to="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</Link>.
          </p>
        </section>

        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2 scroll-mt-28">
            <HelpCircle className="w-5 h-5 text-[#1b6d24]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="ussd" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
