import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { TrustPanel } from '../components/TrustPanel';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso } from '../seo/contentDates';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';
import { getExternalDataProblemPage } from '../data/externalDataProblems';
import { NotFoundPage } from './NotFoundPage';

interface DataProblemSeoPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
  routePath: string;
}

export const DataProblemSeoPage: React.FC<DataProblemSeoPageProps> = ({ onNavigate, onScrollTo, routePath }) => {
  const page = getExternalDataProblemPage(routePath);

  if (!page) {
    return <NotFoundPage onNavigate={onNavigate} onScrollTo={onScrollTo} />;
  }

  const canonicalUrl = toCanonicalUrl(page.canonicalPath);
  const datePublishedIso = getDefaultPublishedIso();
  const lastReviewed = page.lastReviewed ? formatIsoForDisplay(`${page.lastReviewed}T00:00:00.000Z`) : formatIsoForDisplay(datePublishedIso);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: datePublishedIso,
    dateModified: page.lastReviewed ? `${page.lastReviewed}T00:00:00.000Z` : datePublishedIso,
    author: {
      '@type': 'Organization',
      name: 'DataCost',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'DataCost',
      url: SITE_URL
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{page.pageTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={page.pageTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.pageTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        {page.supportsArticleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <button
            onClick={() => onNavigate('fix-problem')}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to fix mobile problems
          </button>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.95]">{page.h1}</h1>
          <AdUnit type="aboveFold" className="mb-6" />
        </header>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Answer</h2>
          <p className="text-slate-700 leading-relaxed">{page.quickAnswer}</p>
        </section>

        <TrustPanel
          lastReviewed={lastReviewed}
          sources="Network apps, USSD menus, public support pages, and user-facing operator account flows where available."
          className="mb-10"
        />

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Causes</h2>
          <ul className="space-y-4 list-disc pl-6 text-slate-700 leading-relaxed">
            {page.causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </section>

        <AdUnit type="inContent" className="my-8" />

        <section className="mb-10 bg-[#031636] text-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">How to Fix</h2>
          <ol className="space-y-3 list-decimal pl-5 text-slate-200 leading-relaxed">
            {page.fixSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Prevention Tips</h2>
          <ul className="space-y-4 list-disc pl-6 text-slate-700 leading-relaxed">
            {page.preventionTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-black tracking-tight mb-6">FAQ</h2>
          <div className="space-y-4">
            {page.faqs.map((item) => (
              <article key={item.question} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {page.internalLinks.length > 0 && (
          <section className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight mb-6">Internal Links</h2>
            <ul className="space-y-3">
              {page.internalLinks.map((link) => (
                <li key={`${link.href}-${link.anchorText}`}>
                  <Link to={link.href} className="text-[#1b6d24] font-semibold hover:underline">
                    {link.anchorText}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <AdUnit type="inContent" className="mt-8" />
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
