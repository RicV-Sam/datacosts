import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { NavigateFunction } from '../types';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';

interface TrustCenterPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const trustLinks = [
  {
    href: '/about/',
    title: 'About DataCost',
    description: 'Who runs the site, why it exists, and how DataCost is funded.'
  },
  {
    href: '/methodology/',
    title: 'Methodology',
    description: 'How prices, bundle categories, USSD routes, and corrections are checked.'
  },
  {
    href: '/editorial-policy/',
    title: 'Editorial Policy',
    description: 'Editorial standards, independence rules, source hierarchy, and conflicts.'
  },
  {
    href: '/contact/',
    title: 'Contact and Corrections',
    description: 'How to report a price, USSD, subscription, or billing-guide error.'
  },
  {
    href: '/privacy-policy/',
    title: 'Privacy Policy',
    description: 'How DataCost handles analytics, advertising disclosures, and user data.'
  },
  {
    href: '/cookie-policy/',
    title: 'Cookie Policy',
    description: 'Cookie, advertising partner, and Google partner-data information.'
  }
];

const operatingPrinciples = [
  'DataCost is independent from the mobile networks it compares unless a page clearly says otherwise.',
  'Guides should answer a real consumer question before showing related links or commercial context.',
  'Prices, bundle validity, USSD routes, and support paths should be checked against operator-controlled sources where practical.',
  'Personalised offers are labelled as variable instead of being treated as guaranteed national prices.',
  'Ads and partner placements must not block the first useful answer, imitate navigation, or control editorial rankings.',
  'Corrections that affect buying decisions, airtime loss, balance checks, or cancellation steps are treated as priority updates.'
];

export const TrustCenterPage: React.FC<TrustCenterPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'DataCost Trust Center';
  const metaDescription =
    'See who runs DataCost, how South African mobile-data guides are checked, how corrections work, and how advertising and privacy are handled.';
  const canonicalUrl = toCanonicalUrl('/trust/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Trust Center', href: '/trust/' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const trustPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    },
    reviewedBy: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE,
      description: SITE_EDITOR_BIO
    }
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
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(trustPageSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="trust" />

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-0" />

        <header className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#1b6d24]">
            <ShieldCheck className="h-4 w-4" />
            Trust and accountability
          </div>
          <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">DataCost Trust Center</h1>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate-600">
            DataCost is meant to be a dependable South African mobile-data portal: useful comparison tools, plain-English guides, clear editorial standards, and visible correction paths.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <CheckCircle2 className="mb-4 h-6 w-6 text-[#1b6d24]" />
            <h2 className="mb-3 text-xl font-black tracking-tight">Independent</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              DataCost is not a mobile network, support desk, or checkout page. The site compares public information and explains practical user choices.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <FileText className="mb-4 h-6 w-6 text-[#1b6d24]" />
            <h2 className="mb-3 text-xl font-black tracking-tight">Reviewed</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              Key pages should show review context, source notes, update dates, and a clear way to report an error.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <ShieldCheck className="mb-4 h-6 w-6 text-[#1b6d24]" />
            <h2 className="mb-3 text-xl font-black tracking-tight">User First</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              Ads, referrals, and sponsorships should never hide the answer, imitate controls, or decide editorial rankings.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Trust Documents</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {trustLinks.map((link) => (
              <Link key={link.href} to={link.href} className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:border-[#a0f399]">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h3 className="font-black text-[#031636]">{link.title}</h3>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#1b6d24]" />
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-black tracking-tight">Operating Principles</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {operatingPrinciples.map((principle) => (
              <li key={principle} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">What a User Should Be Able to Trust</h2>
          <div className="space-y-4 text-sm font-medium leading-relaxed text-slate-600">
            <p>
              A visitor should be able to tell what DataCost is, who edits it, why a page exists, and what evidence was used before relying on a guide. That matters because South African mobile-data decisions often involve real money, limited airtime, and support paths that can differ by network, tariff, SIM profile, and account type.
            </p>
            <p>
              The site should make the main answer easy to find, then show limits and next steps without pretending to replace official operator support. When DataCost cannot confirm a personalised offer, account-specific deduction, or private billing record, the page should say so plainly and point users toward the evidence they need before contacting the network.
            </p>
            <p>
              A trustworthy portal can still grow through organic search, but each indexed page should earn its place by adding a useful decision path, local context, source notes, and a correction route. That is the balance DataCost is moving toward: broad enough to help people, careful enough to be worth trusting.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-[#031636] p-6 text-white shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-black tracking-tight">Correction Priority</h2>
          <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-200">
            If a page could change what a user buys, how they stop a deduction, or how they contact official support, corrections should be handled quickly. Include the affected URL, network, date checked, and the evidence you saw.
          </p>
          <Link to="/contact/#corrections" className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#031636] hover:bg-[#a0f399]">
            Report an error
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};
