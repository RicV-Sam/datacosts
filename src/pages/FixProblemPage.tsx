import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Info, LifeBuoy, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { TrustPanel } from '../components/TrustPanel';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import { FixPage, fixClusters, fixClusterLabelById, fixPages, getFixPage, getFixPagesByCluster, getFixPath } from '../data/fixes';
import { isNoindexRoute } from '../config/routeCatalog';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { NotFoundPage } from './NotFoundPage';

interface FixProblemPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

interface FixDetailPageProps extends FixProblemPageProps {
  slug?: string;
}

const hubRelatedLinks = [
  { label: 'USSD codes hub', href: '/ussd-codes-south-africa/' },
  { label: 'Network pages', href: '/network/' },
  { label: 'Fibre and home internet', href: '/fibre/' },
  { label: 'Fibre prices and FNOs', href: '/fibre/fibre-prices-south-africa/' },
  { label: 'Fibre vs LTE/5G', href: '/fibre/fibre-vs-lte-south-africa/' },
  { label: 'Data guides', href: '/guides/' },
  { label: 'Stop WASP subscriptions', href: '/guides/stop-wasp-subscriptions-south-africa/' },
  { label: 'Out-of-bundle data costs', href: '/guides/out-of-bundle-data-costs-south-africa/' }
];

function uniqueLinks(links: Array<{ label: string; href: string }>) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function buildArticleSchema(page: FixPage, canonicalUrl: string, datePublishedIso: string, dateModifiedIso: string) {
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
}

function buildHowToSchema(page: FixPage, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: page.h1,
    description: page.summary,
    url: canonicalUrl,
    step: page.sections.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step
    }))
  };
}

function buildFaqSchema(page: FixPage) {
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

const FixCard: React.FC<{ page: FixPage }> = ({ page }) => {
  return (
    <Link
      to={getFixPath(page.slug)}
      className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white/90 p-5 shadow-sm transition-all hover:border-[#a0f399] hover:shadow-md"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
          {fixClusterLabelById[page.cluster]}
        </span>
        {page.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-3 text-lg font-black leading-tight tracking-tight text-[#031636] group-hover:text-[#1b6d24]">
        {page.title}
      </h3>
      <p className="mb-5 line-clamp-3 flex-grow text-sm font-medium leading-relaxed text-slate-600">
        {page.summary}
      </p>
      <span className="inline-flex items-center gap-2 text-sm font-black text-[#1b6d24]">
        Open fix
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

function PageSection({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section className={dark ? 'mb-10 rounded-3xl bg-[#031636] p-6 text-white shadow-sm md:p-8' : 'mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8'}>
      <h2 className="mb-5 text-2xl font-black tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className={`${ordered ? 'list-decimal' : 'list-disc'} space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
}

export const FixProblemPage: React.FC<FixProblemPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'DataCost Fixes: South African Codes, Errors and Quick Help';
  const metaDescription = 'Quick South African help for mobile data problems, APN settings, USSD codes, prepaid electricity errors, DStv/Openview decoder issues and LTE router fixes.';
  const canonicalUrl = toCanonicalUrl('/fix/');
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/fix/');
  const shouldNoindex = isNoindexRoute('/fix/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Fixes', href: '/fix/' }
  ];

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DataCost Fixes',
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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DataCost Fix Pages',
    itemListElement: fixPages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.title,
      url: toCanonicalUrl(getFixPath(page.slug))
    }))
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
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
        {shouldNoindex && <meta name="robots" content="noindex,follow" />}
        {!shouldNoindex && <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>}
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        {!shouldNoindex && <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>}
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="fix-problem" />

      <main className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#1b6d24]">
            <LifeBuoy className="h-4 w-4" />
            South African quick help
          </div>
          <h1 className="mb-5 text-4xl font-black leading-[0.9] tracking-tighter md:text-6xl">DataCost Fixes</h1>
          <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-slate-600">
            Quick plain-English help for common South African codes, errors and service issues. Use these guides for mobile data, APN settings, USSD checks, prepaid electricity meters, decoder errors and LTE router problems, then confirm account-specific issues with the official provider.
          </p>
        </header>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-black tracking-tight">What This Section Is For</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              DataCost Fixes is for the moment when you know the symptom but not the next safe step: an APN that looks wrong, a decoder code, a prepaid meter message, disappearing airtime, or a router that says connected with no internet.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-black tracking-tight">How to Use It</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              Start with the closest page, try the quick checks first, then stop and contact the official provider when the issue involves billing, activation, meter status, account records or personal information.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-black tracking-tight">What We Avoid</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              We do not invent support numbers, promise reversals, give unsafe meter advice, or pretend to be Vodacom, MTN, Telkom, Cell C, Rain, Eskom, municipalities, DStv or Openview.
            </p>
          </article>
        </section>

        <section className="mb-12 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">Start Here</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {fixClusters.map((cluster) => (
              <a
                key={cluster.id}
                href={`#${cluster.id}`}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-black text-slate-700 transition-colors hover:border-[#1b6d24] hover:text-[#1b6d24]"
              >
                {cluster.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-5 text-xl font-black tracking-tight">Useful DataCost Links</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {hubRelatedLinks.map((link) => (
              <Link key={link.href} to={link.href} className="rounded-2xl border border-slate-100 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm hover:border-[#a0f399] hover:text-[#1b6d24]">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {fixClusters.map((cluster) => {
          const pages = getFixPagesByCluster(cluster.id);
          return (
            <section key={cluster.id} id={cluster.id} className="mb-16 scroll-mt-24">
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-black tracking-tight md:text-3xl">{cluster.title}</h2>
                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600">{cluster.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                  <FixCard key={page.slug} page={page} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 inline-flex items-center gap-2 text-xl font-black tracking-tight">
            <ShieldCheck className="h-5 w-5 text-[#1b6d24]" />
            Safety Reminder
          </h2>
          <p className="text-sm font-medium leading-relaxed text-slate-600">
            DataCost is not the provider. These are general troubleshooting guides. Always confirm billing, account, token, activation and service-specific issues with official support. Do not share OTPs, banking passwords, card details, PINs or identity documents with unofficial support channels.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="fix-problem" />
    </div>
  );
};

export const FixDetailPage: React.FC<FixDetailPageProps> = ({ onNavigate, onScrollTo, slug }) => {
  const page = getFixPage(slug);

  if (!page) {
    return <NotFoundPage onNavigate={onNavigate} onScrollTo={onScrollTo} />;
  }

  const routePath = getFixPath(page.slug);
  const canonicalUrl = toCanonicalUrl(routePath);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso(routePath);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);
  const shouldNoindex = isNoindexRoute(routePath);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Fixes', href: '/fix/' },
    { label: page.title, href: routePath }
  ];
  const relatedFixPages = page.relatedFixSlugs.map((relatedSlug) => getFixPage(relatedSlug)).filter(Boolean) as FixPage[];
  const relatedDataCostLinks = uniqueLinks([{ label: 'DataCost Fixes hub', href: '/fix/' }, ...page.relatedDataCostLinks]).slice(0, 7);

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{page.seoTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={page.seoTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.seoTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        {shouldNoindex && <meta name="robots" content="noindex,follow" />}
        {!shouldNoindex && <script type="application/ld+json">{JSON.stringify(buildArticleSchema(page, canonicalUrl, datePublishedIso, dateModifiedIso))}</script>}
        {!shouldNoindex && <script type="application/ld+json">{JSON.stringify(buildHowToSchema(page, canonicalUrl))}</script>}
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        {!shouldNoindex && <script type="application/ld+json">{JSON.stringify(buildFaqSchema(page))}</script>}
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="fix-problem" />

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
              {fixClusterLabelById[page.cluster]}
            </span>
            {page.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{page.h1}</h1>
          <p className="text-lg font-medium leading-relaxed text-slate-600">{page.summary}</p>
        </header>

        <PageSection title="Quick Answer">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Meaning', page.quickAnswer.meaning],
              ['Most likely cause', page.quickAnswer.likelyCause],
              ['First thing to try', page.quickAnswer.firstThingToTry],
              ['Contact', page.quickAnswer.contact]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <TrustPanel
          lastReviewed={lastReviewed}
          sources="General consumer troubleshooting patterns, DataCost internal guide links, public provider self-service concepts, and South African prepaid user needs."
          className="mb-10"
        />

        <PageSection title="What It Usually Means">
          <BulletList items={page.sections.meaning} />
        </PageSection>

        <PageSection title="What to Try First">
          <BulletList items={page.sections.tryFirst} />
        </PageSection>

        <PageSection title="Step-by-Step Fix" dark>
          <ol className="space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-200 list-decimal">
            {page.sections.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </PageSection>

        <PageSection title="When to Contact the Provider">
          <BulletList items={page.sections.whenToContact} />
        </PageSection>

        <PageSection title="What Not to Do">
          <div className="mb-4 flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm font-medium leading-relaxed text-red-900">
            <TriangleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <p>DataCost is not the provider. Do not share OTPs, banking passwords, card details, PINs or personal identity documents with unofficial support channels.</p>
          </div>
          <BulletList items={page.sections.whatNotToDo} />
        </PageSection>

        <PageSection title="Related DataCost Guides">
          <div className="grid gap-3 md:grid-cols-2">
            {relatedDataCostLinks.map((link) => (
              <Link key={link.href} to={link.href} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-bold text-slate-700 hover:border-[#a0f399] hover:text-[#1b6d24]">
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </PageSection>

        {relatedFixPages.length > 0 && (
          <PageSection title="Related Fix Pages">
            <div className="grid gap-4 md:grid-cols-2">
              {relatedFixPages.slice(0, 5).map((relatedPage) => (
                <Link key={relatedPage.slug} to={getFixPath(relatedPage.slug)} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-[#a0f399]">
                  <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#1b6d24]">{fixClusterLabelById[relatedPage.cluster]}</div>
                  <h3 className="font-black leading-tight text-[#031636]">{relatedPage.title}</h3>
                </Link>
              ))}
            </div>
          </PageSection>
        )}

        <section id="faq" className="mb-10">
          <h2 className="mb-5 text-2xl font-black tracking-tight">FAQs</h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-black text-slate-900">{faq.question}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 inline-flex items-center gap-2 text-xl font-black tracking-tight">
            <Info className="h-5 w-5 text-[#1b6d24]" />
            Official Support Reminder
          </h2>
          <p className="text-sm font-medium leading-relaxed text-slate-600">
            This is a general troubleshooting guide for South African consumers. Always confirm billing, payment, activation, meter, token, subscription and account-specific issues with the official provider.
          </p>
        </section>

        <AuthorReviewBlock
          lastReviewed={lastReviewed}
          trustSummary="Written as independent consumer help for South African mobile, electricity, decoder and router problems. Provider-specific account actions should be confirmed through official support."
          className="mb-12"
        />

        <Link to="/fix/" className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#031636] px-5 text-sm font-black text-white hover:bg-[#1b6d24]">
          <CheckCircle2 className="h-4 w-4" />
          Back to DataCost Fixes
        </Link>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="fix-problem" />
    </div>
  );
};
