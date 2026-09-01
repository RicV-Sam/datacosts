import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, HelpCircle, ShieldCheck, Wrench } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getGuideModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { ProblemGuideKey, problemGuides } from '../data/problemGuides';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';

interface ProblemSolvingGuidePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
  guideKey: ProblemGuideKey;
}

const CANONICAL_PROBLEM_GUIDE_PATH_OVERRIDES: Partial<Record<ProblemGuideKey, string>> = {
  'how-to-stop-wasp-services-south-africa': '/guides/stop-wasp-subscriptions-south-africa/'
};

export const ProblemSolvingGuidePage: React.FC<ProblemSolvingGuidePageProps> = ({ onNavigate, onScrollTo, guideKey }) => {
  const guide = problemGuides[guideKey];
  const canonicalUrl = toCanonicalUrl(CANONICAL_PROBLEM_GUIDE_PATH_OVERRIDES[guideKey] || `/guides/${guide.slug}/`);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getGuideModifiedIso(guide.slug);
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);
  const reviewDueDate = guide.reviewDueDate
    ? formatIsoForDisplay(`${guide.reviewDueDate}T00:00:00.000Z`)
    : undefined;

  const problemGuideLinks = Object.values(problemGuides)
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3)
    .map((item) => ({
      href: `/guides/${item.slug}/`,
      label: item.h1.replace(' (2026)', ''),
      description: `Read the ${item.h1.replace(' (2026)', '')} fix steps.`
    }));

  const requiredLinks = [
    ...problemGuideLinks,
    {
      href: '/guides/airtime-data-problems-south-africa/',
      label: 'Airtime and data problems hub',
      description: 'Browse all telecom fix guides from one cluster page.'
    },
    {
      href: '/ussd-codes-south-africa/',
      label: 'South Africa USSD codes directory',
      description: 'Check balances, menus, and quick support shortcuts.'
    },
    {
      href: '/',
      label: 'DataCost homepage',
      description: 'Compare plans after solving airtime and data issues.'
    }
  ];

  const internalLinks = [...guide.internalLinks, ...requiredLinks].filter(
    (item, index, arr) => arr.findIndex((other) => other.href === item.href) === index
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Guides', item: toCanonicalUrl('/guides/') },
      { '@type': 'ListItem', position: 3, name: guide.h1, item: canonicalUrl }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    citation: guide.officialSources?.map((source) => source.href),
    author: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE,
      description: SITE_EDITOR_BIO
    },
    reviewedBy: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{guide.titleTag}</title>
        <meta name="description" content={guide.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={guide.titleTag} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.titleTag} />
        <meta name="twitter:description" content={guide.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <button
            onClick={() => onNavigate('guides-index')}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to guides
          </button>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.95]">{guide.h1}</h1>
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">Last updated: {lastUpdated}</p>
            {reviewDueDate && <p className="text-sm text-slate-600">Next review due: {reviewDueDate}</p>}
            <p className="text-sm text-slate-600">Reviewed by {SITE_EDITOR_NAME}, {SITE_EDITOR_ROLE}</p>
            <p className="text-xs text-slate-500 mt-1">
              {guide.sourceSummary || 'General troubleshooting guidance; confirm operator-specific steps against current official support information.'}
            </p>
          </div>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">{guide.intro}</p>
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <div className="space-y-3 text-slate-700 leading-relaxed">
            {guide.quickAnswer.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Causes</h2>
          <ul className="space-y-4">
            {guide.causes.map((cause) => (
              <li key={cause} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-slate-700 leading-relaxed">
                {cause}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 bg-[#031636] text-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#a0f399]" />
            How to Fix
          </h2>
          <ol className="space-y-3 list-decimal pl-5 text-slate-200 leading-relaxed">
            {guide.fixSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-black tracking-tight mb-6">Network-Specific Fixes</h2>
          <div className="space-y-5">
            {guide.networkFixes.map((network) => (
              <article key={network.name} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-black tracking-tight mb-3">{network.name}</h3>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 mb-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Balance check</div>
                  <div className="font-black text-slate-900">{network.balanceCode}</div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-2">{network.notes}</p>
                <p className="text-slate-700 leading-relaxed">{network.action}</p>
              </article>
            ))}
          </div>
        </section>        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">USSD Codes Section</h2>
          <p className="text-slate-700 leading-relaxed mb-3">{guide.ussdSummary}</p>
          <Link to="/ussd-codes-south-africa/" className="text-[#1b6d24] font-semibold hover:underline">
            Open USSD codes South Africa
          </Link>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Prevention Tips</h2>
          <ul className="space-y-4">
            {guide.preventionTips.map((tip) => (
              <li key={tip} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-slate-700 leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6 inline-flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1b6d24]" />
            FAQ
          </h2>
          <div className="space-y-4">
            {guide.faq.map((item) => (
              <article key={item.question} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Internal Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {internalLinks.map((item) => (
              <Link key={item.href} to={item.href} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#1b6d24] transition-colors">
                <h3 className="font-black text-slate-900 mb-2">{item.label}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4 inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            When to Escalate
          </h2>
          <p className="text-slate-700 leading-relaxed">{guide.whenToEscalate}</p>
        </section>

        {guide.officialSources && guide.officialSources.length > 0 && (
          <section id="review-sources" className="mb-12 border-y border-slate-200 bg-white py-8 md:py-10">
            <div className="mb-6 flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-[#1b6d24]" />
              <div>
                <h2 className="text-2xl font-black tracking-tight">How this guide was reviewed</h2>
                <p className="mt-2 max-w-2xl text-slate-600">
                  Claims that can change were checked against these primary sources. Confirm the final option shown on your own line.
                </p>
              </div>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {guide.officialSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid min-h-[72px] gap-2 py-5 hover:text-[#1b6d24] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] md:items-start md:gap-6"
                >
                  <span className="font-black text-slate-900 group-hover:text-[#1b6d24]">{source.label}</span>
                  <span className="text-sm leading-relaxed text-slate-600">{source.note}</span>
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                </a>
              ))}
            </div>
          </section>
        )}

        <AuthorReviewBlock
          lastReviewed={lastUpdated}
          reviewDueDate={reviewDueDate}
          trustSummary={guide.sourceSummary || 'Based on public operator support paths, USSD flows, South African prepaid billing patterns, and user correction signals.'}
          className="mb-12"
        />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />    </div>
  );
};
