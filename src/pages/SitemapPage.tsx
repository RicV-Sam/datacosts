import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';

interface SitemapPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

type SitemapGroup = {
  title: string;
  links: Array<{ href: string; label: string }>;
};

const sitemapGroups: SitemapGroup[] = [
  {
    title: 'Core Tools',
    links: [
      { href: '/', label: 'DataCost Home' },
      { href: '/network/', label: 'Network Comparison Hub' },
      { href: '/guides/', label: 'South Africa Mobile Data Guides' },
      { href: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa' },
      { href: '/alerts/', label: 'Data Deal Alerts' },
      { href: '/fix-mobile-problems/', label: 'Fix Mobile Problems' }
    ]
  },
  {
    title: 'Price Guides',
    links: [
      { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data South Africa' },
      { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data South Africa' },
      { href: '/guides/best-data-deals-south-africa/', label: 'Best Data Deals South Africa' },
      { href: '/guides/best-prepaid-data-deals-south-africa/', label: 'Best Prepaid Data Deals' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best Monthly Data Deals' },
      { href: '/guides/cheap-night-data-south-africa/', label: 'Cheap Night Data South Africa' },
      { href: '/guides/cheapest-whatsapp-bundles-south-africa/', label: 'Cheapest WhatsApp Bundles' },
      { href: '/guides/out-of-bundle-data-costs-south-africa/', label: 'Out-of-bundle Data Costs' }
    ]
  },
  {
    title: 'Network Pages',
    links: [
      { href: '/network/vodacom/', label: 'Vodacom Data Prices' },
      { href: '/network/mtn/', label: 'MTN Data Prices' },
      { href: '/network/telkom/', label: 'Telkom Data Prices' },
      { href: '/network/cell-c/', label: 'Cell C Data Prices' },
      { href: '/network/rain/', label: 'Rain Data Prices' },
      { href: '/network/telkom/night-data/', label: 'Telkom Night Data' },
      { href: '/network/mtn/night-data/', label: 'MTN Night Data' },
      { href: '/network/vodacom/monthly-data/', label: 'Vodacom Monthly Data' }
    ]
  },
  {
    title: 'USSD Codes',
    links: [
      { href: '/ussd-codes-south-africa/', label: 'All USSD Codes' },
      { href: '/mtn-ussd-codes/', label: 'MTN USSD Codes' },
      { href: '/vodacom-ussd-codes/', label: 'Vodacom USSD Codes' },
      { href: '/telkom-ussd-codes/', label: 'Telkom USSD Codes' },
      { href: '/cell-c-ussd-codes/', label: 'Cell C USSD Codes' },
      { href: '/save-ussd-codes/', label: 'Save USSD Codes' }
    ]
  },
  {
    title: 'Problem Solvers',
    links: [
      { href: '/guides/why-is-my-airtime-disappearing-south-africa/', label: 'Why Is My Airtime Disappearing?' },
      { href: '/guides/why-is-my-data-disappearing-south-africa/', label: 'Why Is My Data Disappearing?' },
      { href: '/guides/how-to-stop-airtime-being-used-automatically/', label: 'Stop Airtime Being Used Automatically' },
      { href: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions' },
      { href: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/', label: 'Cancel Mobile Subscriptions' },
      { href: '/data-problems/how-to-stop-wasp-charges-vodacom/', label: 'Stop WASP Charges on Vodacom' },
      { href: '/data-problems/how-to-stop-wasp-charges-mtn/', label: 'Stop WASP Charges on MTN' }
    ]
  },
  {
    title: 'Trust and Legal',
    links: [
      { href: '/about/', label: 'About DataCost' },
      { href: '/methodology/', label: 'Methodology' },
      { href: '/editorial-policy/', label: 'Editorial Policy' },
      { href: '/contact/', label: 'Contact' },
      { href: '/privacy-policy/', label: 'Privacy Policy' },
      { href: '/terms/', label: 'Terms and Conditions' },
      { href: '/cookie-policy/', label: 'Cookie Policy' }
    ]
  }
];

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'DataCost Sitemap';
  const metaDescription = 'Browse the main DataCost pages for South African data prices, USSD codes, problem-solving guides, and trust information.';
  const canonicalUrl = toCanonicalUrl('/sitemap/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Sitemap', href: '/sitemap/' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-0" />

        <header>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">DataCost Sitemap</h1>
          <p className="text-slate-600 font-medium max-w-3xl">
            A human-readable index of the main DataCost pages. The XML sitemap for search engines remains at{' '}
            <a href="/sitemap.xml" className="text-[#1b6d24] font-bold hover:underline">/sitemap.xml</a>.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sitemapGroups.map((group) => (
            <article key={group.title} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-black tracking-tight mb-4">{group.title}</h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm font-bold text-slate-700 hover:text-[#1b6d24] hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};
