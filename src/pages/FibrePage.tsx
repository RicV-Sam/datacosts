import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Info, Network, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import { fibrePageBySlug, fibrePages, FibrePageDefinition, FibreSection } from '../data/fibre';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { NotFoundPage } from './NotFoundPage';

interface FibrePageProps {
  slug: string;
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

function buildPageSchema(page: FibrePageDefinition, canonicalUrl: string, datePublishedIso: string, dateModifiedIso: string) {
  if (page.kind === 'hub') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.h1,
      description: page.metaDescription,
      url: canonicalUrl,
      datePublished: datePublishedIso,
      dateModified: dateModifiedIso,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_PRODUCT_NAME,
        url: SITE_URL
      },
      reviewedBy: {
        '@type': 'Person',
        name: SITE_EDITOR_NAME,
        jobTitle: SITE_EDITOR_ROLE
      }
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };
}

function buildItemListSchema(page: FibrePageDefinition) {
  const items = page.kind === 'hub' ? fibrePages.filter((candidate) => candidate.slug !== 'hub') : page.relatedLinks;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.kind === 'hub' ? 'Fibre and home internet guides' : `Related guides for ${page.h1}`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: 'label' in item ? item.label : item.h1,
      url: toCanonicalUrl('href' in item ? item.href : item.path)
    }))
  };
}

function buildFaqSchema(page: FibrePageDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

const SectionContent: React.FC<{ section: FibreSection }> = ({ section }) => {
  return (
    <section id={section.id} className="mb-10 scroll-mt-24 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900">{section.title}</h2>
      {section.body && <p className="text-sm font-medium leading-relaxed text-slate-600">{section.body}</p>}
      {section.bullets && (
        <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate-600">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-4 py-3">Option</th>
                <th className="px-4 py-3">Use</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.table.map((row) => (
                <tr key={`${row.label}-${row.value}`}>
                  <td className="px-4 py-4 font-black text-slate-900">{row.label}</td>
                  <td className="px-4 py-4 font-medium text-slate-700">{row.value}</td>
                  <td className="px-4 py-4 font-medium text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export const FibrePage: React.FC<FibrePageProps> = ({ slug, onNavigate, onScrollTo }) => {
  const page = fibrePageBySlug[slug];

  if (!page) {
    return <NotFoundPage onNavigate={onNavigate} onScrollTo={onScrollTo} />;
  }

  const canonicalUrl = toCanonicalUrl(page.path);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso(page.path);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Fibre', href: '/fibre/' },
    ...(page.kind === 'hub' ? [] : [{ label: page.h1, href: page.path }])
  ];

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content={page.kind === 'hub' ? 'website' : 'article'} />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(buildPageSchema(page, canonicalUrl, datePublishedIso, dateModifiedIso))}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        <script type="application/ld+json">{JSON.stringify(buildItemListSchema(page))}</script>
        <script type="application/ld+json">{JSON.stringify(buildFaqSchema(page))}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="fibre" />

      <main className="mx-auto max-w-5xl px-4 py-10 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
            <Network className="h-3.5 w-3.5" />
            Fibre and Home Internet
          </div>
          <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{page.h1}</h1>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate-600">{page.intro}</p>
        </header>

        <section className="mb-10 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1b6d24]" />
            Quick Answer
          </div>
          <p className="text-base font-bold leading-relaxed text-slate-800">{page.quickAnswer}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {page.summaryCards.map((card) => (
              <article key={card.label} className="rounded-2xl bg-slate-50 p-4">
                <h2 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{card.label}</h2>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        {page.kind === 'hub' && (
          <section className="mb-10">
            <h2 className="mb-5 text-2xl font-black tracking-tight">Fibre and Home Internet Guides</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {fibrePages.filter((candidate) => candidate.slug !== 'hub').map((candidate) => (
                <Link key={candidate.path} to={candidate.path} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#a0f399]">
                  <h3 className="mb-2 font-black leading-tight text-[#031636]">{candidate.h1}</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{candidate.quickAnswer}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {page.sections.map((section) => (
          <SectionContent key={section.id} section={section} />
        ))}

        <TrustPanel
          lastReviewed={lastReviewed}
          sources="DataCost mobile-data guides, general fibre ordering checks, public provider information, and South African home-internet user needs. Use official provider pages for final pricing and address coverage."
          className="mb-10"
        />

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Related DataCost Pages</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {page.relatedLinks.map((link) => (
              <Link key={link.href} to={link.href} className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4 hover:bg-[#a0f399]/10">
                <span>
                  <span className="block text-sm font-black text-slate-900">{link.label}</span>
                  <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-600">{link.description}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                <h3 className="mb-2 font-black text-slate-900">{faq.question}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 flex items-start gap-3 rounded-3xl border border-slate-100 bg-white p-6 text-sm font-medium leading-relaxed text-slate-600 shadow-sm">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1b6d24]" />
          <p>
            Use these fibre pages as a decision checklist before ordering. Confirm final price, address coverage, installation terms, router rules, and cancellation costs with the official provider.
          </p>
        </section>

        <AuthorReviewBlock
          lastReviewed={lastReviewed}
          trustSummary="This guide explains how to compare fibre and home-internet options while keeping final price, availability, deal and ranking decisions tied to official provider information."
        />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="fibre" />
    </div>
  );
};
