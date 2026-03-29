import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { ussdRepository } from '../data/ussd';
import { networkPages } from '../data/networks';
import { NavigateFunction, USSDEntry } from '../types';
import { ArrowLeft, Search, Copy, CheckCircle2, Phone, ShieldCheck, HelpCircle } from 'lucide-react';

interface USSDPageProps {
  onBack: () => void;
  onScrollTo: (id: string) => void;
  onNavigate: NavigateFunction;
}

const NETWORKS = ['All', 'MTN', 'Vodacom', 'Telkom', 'Cell C', 'Rain'];

function findFirstCode(network: string, patterns: string[]): string {
  const row = ussdRepository.find((entry) =>
    entry.network === network && patterns.some((pattern) => `${entry.action} ${entry.category}`.toLowerCase().includes(pattern))
  );
  return row?.code || 'Check menu';
}

function isDialable(code: string): boolean {
  return code.includes('*') || code.includes('#');
}

export const USSDPage: React.FC<USSDPageProps> = ({ onBack, onScrollTo, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNetwork, setActiveNetwork] = useState('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const pageTitle = 'South Africa USSD Codes (2026) | MTN, Vodacom, Telkom, Cell C & More';
  const metaDescription =
    'Find the most useful South African USSD codes for MTN, Vodacom, Telkom, Cell C and more. Check balance, buy data, recharge airtime and manage your line quickly.';
  const canonicalUrl = 'https://datacost.co.za/ussd-codes-south-africa/';
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const faqItems = [
    {
      question: 'What is the USSD code to check airtime balance in South Africa?',
      answer:
        'Each network has its own code. Common options are Vodacom *135#, MTN *136#, Telkom *188#, and Cell C *101#. Always confirm the latest menu if a code changes.'
    },
    {
      question: 'Can I buy data using USSD?',
      answer:
        'Yes. You can buy data directly through USSD menus without the app. Typical examples include *135*2# (Vodacom), *136*2# (MTN), *180# (Telkom), and *147# (Cell C).'
    },
    {
      question: 'Do USSD codes work without data?',
      answer: 'Yes. USSD works through the mobile network signaling channel, so it does not require an active data connection.'
    },
    {
      question: 'Are USSD codes different for MTN, Vodacom, Telkom and Cell C?',
      answer: 'Yes. Each network uses different menu trees and shortcodes, so always use the code set for your own SIM network.'
    },
    {
      question: 'Can I stop unwanted subscriptions using USSD?',
      answer:
        'Often yes. Many subscription and content services can be managed or blocked through operator menus. For a focused walkthrough, use the Stop WASP Subscriptions guide.'
    },
    {
      question: 'Why is a USSD code not working?',
      answer:
        'Codes can change, menus can be temporarily unavailable, or your tariff/profile may route differently. Retry, check signal strength, then verify the latest shortcode with your operator.'
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

  const networkSummaries = [
    {
      name: 'MTN',
      slug: 'mtn',
      summary: 'Strong all-round prepaid network with frequent promo menus and reliable urban performance.'
    },
    {
      name: 'Vodacom',
      slug: 'vodacom',
      summary: 'Coverage-first option, often chosen for consistency and strong national footprint.'
    },
    {
      name: 'Telkom',
      slug: 'telkom',
      summary: 'Often one of the strongest value options on cost-per-GB, especially for monthly bundles.'
    },
    {
      name: 'Cell C',
      slug: 'cell-c',
      summary: 'Promo-led prepaid value option with rotating campaign deals.'
    },
    {
      name: 'Rain',
      slug: 'rain',
      summary: 'Digital-portal first network; account management is mainly app/web rather than classic USSD.'
    }
  ];

  const mostCommonTasks = [
    {
      task: 'Check balance',
      codes: {
        MTN: findFirstCode('MTN', ['balance']),
        Vodacom: findFirstCode('Vodacom', ['balance']),
        Telkom: findFirstCode('Telkom', ['balance']),
        'Cell C': findFirstCode('Cell C', ['balance'])
      }
    },
    {
      task: 'Buy data',
      codes: {
        MTN: findFirstCode('MTN', ['buy data', 'bundle', 'data']),
        Vodacom: findFirstCode('Vodacom', ['buy data', 'bundle', 'data']),
        Telkom: findFirstCode('Telkom', ['buy data', 'bundle', 'data']),
        'Cell C': findFirstCode('Cell C', ['buy data', 'bundle', 'data'])
      }
    },
    {
      task: 'Recharge airtime',
      codes: {
        MTN: findFirstCode('MTN', ['recharge', 'voucher', 'airtime']),
        Vodacom: findFirstCode('Vodacom', ['recharge', 'voucher', 'airtime']),
        Telkom: findFirstCode('Telkom', ['recharge', 'voucher', 'airtime']),
        'Cell C': findFirstCode('Cell C', ['recharge', 'voucher', 'airtime'])
      }
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

  const groupedByNetwork = useMemo(() => {
    return networkSummaries.map((network) => ({
      ...network,
      codes: filteredCodes.filter((entry) => entry.network === network.name).slice(0, 8)
    }));
  }, [filteredCodes]);

  const dialCode = (code: string) => {
    const dialableCode = code.replace(/#/g, '%23');
    window.location.href = `tel:${dialableCode}`;
  };

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const relatedPages = [
    '/guides/how-to-check-data-balance/',
    '/guides/how-to-buy-data-mtn/',
    '/guides/how-to-buy-data-vodacom/',
    '/guides/how-to-buy-data-telkom/',
    '/guides/how-to-buy-data-cell-c/',
    '/guides/best-data-deals-south-africa/',
    '/guides/cheapest-data-south-africa/',
    '/guides/stop-wasp-subscriptions-south-africa/',
    '/network/',
    '/methodology/',
    '/editorial-policy/'
  ];

  const relatedLabels: Record<string, string> = {
    '/guides/how-to-check-data-balance/': 'How to Check Data Balance',
    '/guides/how-to-buy-data-mtn/': 'How to Buy Data on MTN',
    '/guides/how-to-buy-data-vodacom/': 'How to Buy Data on Vodacom',
    '/guides/how-to-buy-data-telkom/': 'How to Buy Data on Telkom',
    '/guides/how-to-buy-data-cell-c/': 'How to Buy Data on Cell C',
    '/guides/best-data-deals-south-africa/': 'Best Data Deals South Africa',
    '/guides/cheapest-data-south-africa/': 'Cheapest Data South Africa',
    '/guides/stop-wasp-subscriptions-south-africa/': 'Stop WASP Subscriptions',
    '/network/': 'Network Comparison Hub',
    '/methodology/': 'Methodology',
    '/editorial-policy/': 'Editorial Policy'
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
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

        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]">
            South Africa <span className="text-[#1b6d24]">USSD Codes</span> (2026)
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            Find the most useful USSD codes for MTN, Vodacom, Telkom, Cell C, and Rain workflows. Use this page to check balance, buy data, recharge airtime, and manage your line quickly without relying on apps.
          </p>
          <p className="text-xs text-slate-500 mt-3">Last updated: {lastUpdated}</p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">
            USSD codes are still the fastest no-data way to check balances, buy bundles, and recharge. The exact code differs by network, so use the task matrix and network sections below to dial the right shortcode.
          </p>
        </section>

        <AdUnit type="aboveFold" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">What are USSD codes?</h2>
          <p className="text-slate-700 leading-relaxed">
            USSD (Unstructured Supplementary Service Data) codes are short commands like <strong>*135#</strong> that open network menus directly on your phone. They work on basic signal, do not require mobile data, and are useful when apps are slow, unavailable, or consuming too much data.
          </p>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Most common USSD tasks</h2>
          <div className="space-y-6">
            {mostCommonTasks.map((taskRow) => (
              <div key={taskRow.task} className="border border-slate-100 rounded-2xl p-5 bg-slate-50">
                <h3 className="font-black text-slate-900 mb-3">{taskRow.task}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(taskRow.codes).map(([networkName, code]) => (
                    <button
                      key={`${taskRow.task}-${networkName}`}
                      onClick={() => isDialable(code) && dialCode(code)}
                      className="text-left p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#1b6d24] transition-colors"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{networkName}</div>
                      <div className="font-black text-slate-900">{code}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Network USSD sections</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {NETWORKS.map((network) => (
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

          <div className="relative mb-8">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by task, code, or network"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1b6d24]"
            />
          </div>

          <div className="space-y-8">
            {groupedByNetwork.map((network) => (
              <section key={network.name}>
                <h3 className="text-xl font-black mb-2">{network.name} USSD codes</h3>
                <p className="text-slate-600 mb-3">{network.summary}</p>
                {network.slug ? (
                  <Link to={`/network/${network.slug}/`} className="inline-block mb-4 text-sm font-bold text-[#1b6d24] hover:underline">
                    View {network.name} network hub
                  </Link>
                ) : null}

                {network.codes.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {network.codes.map((entry: USSDEntry, index: number) => (
                      <div key={`${network.name}-${entry.code}-${index}`} className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
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
                ) : (
                  <p className="text-sm text-slate-500 italic">No matching codes for this filter.</p>
                )}
              </section>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Why USSD codes still matter</h2>
          <p className="text-slate-700 leading-relaxed">
            USSD remains the most reliable fallback when data is low, apps fail to load, or you need a quick balance and recharge action in seconds. For prepaid users, it is often the fastest way to compare live menu offers before buying.
          </p>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Methodology and trust</h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>Independent analysis:</strong> DataCost compiles and reviews commonly used telecom shortcodes from network documentation and consumer workflows.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>USSD codes can change:</strong> operators update menus and campaigns regularly, so always verify final options on your own line.
          </p>
          <p className="text-slate-700 mt-3">
            See our <Link to="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</Link> and <Link to="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</Link>.
          </p>
        </section>

        <AdUnit type="inContent" />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Related guides and tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedPages.map((href) => (
              <Link key={href} to={href} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#1b6d24] transition-colors">
                <div className="font-bold text-slate-900">{relatedLabels[href]}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1b6d24]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
              </div>
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
