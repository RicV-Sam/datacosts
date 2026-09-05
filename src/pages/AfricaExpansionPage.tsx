import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';

interface AfricaExpansionPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const AfricaExpansionPage: React.FC<AfricaExpansionPageProps> = ({ onNavigate, onScrollTo }) => {
  const title = 'Expanding Beyond South Africa | DataCost & Afri Data Cost';
  const description = 'Our intent to bring clearer mobile data information to more African markets through Afri Data Cost, while DataCost continues to serve South Africa.';
  const canonical = toCanonicalUrl('/africa-expansion/');
  const modified = getRouteModifiedIso('/africa-expansion/');
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'Africa expansion', href: '/africa-expansion/' }];
  const linkStyle = 'text-[#1b6d24] font-bold underline underline-offset-4 hover:text-[#031636] focus-visible:outline-2 focus-visible:outline-offset-4';

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url: canonical, dateModified: modified })}</script>
      </Helmet>
      <Header onScrollTo={onScrollTo} activeSection="home" />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbs} className="mb-0" />
        <header className="max-w-3xl space-y-5">
          <p className="text-sm font-bold text-[#1b6d24]">DataCost across Africa</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Clearer mobile data information, beyond South Africa</h1>
          <p className="text-lg text-slate-600 leading-relaxed">We want to make it easier for people in more African markets to understand what their mobile data costs and how to manage it. Afri Data Cost is the next step in that expansion.</p>
          <p className="text-sm text-slate-500">Updated {formatIsoForDisplay(modified)}</p>
          <a href="https://afri-data-cost.com/" className="inline-flex items-center min-h-12 rounded-xl bg-[#1b6d24] px-6 py-3 font-bold text-white hover:bg-[#15571d] focus-visible:outline-2 focus-visible:outline-offset-4">Visit Afri Data Cost ↗</a>
          <p className="text-sm text-slate-600">A separate website for country-specific mobile data prices and network help.</p>
        </header>

        <section className="border-t border-slate-200 pt-8 space-y-4">
          <h2 className="text-2xl font-black tracking-tight">What is available today</h2>
          <p className="text-slate-600 leading-relaxed">Afri Data Cost currently offers bundle price information for Nigeria and Ghana, alongside purchase, balance and network support guidance covering Nigeria, Ghana and Kenya. Coverage differs by country; a country guide does not mean every operator or bundle has been compared.</p>
          <p className="text-slate-600 leading-relaxed">Use the country sections on <a className={linkStyle} href="https://afri-data-cost.com/">Afri Data Cost</a> for the latest coverage and check the source dates on the page you use. This coverage summary was checked on {formatIsoForDisplay(modified)}.</p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-black tracking-tight">DataCost remains your South African resource</h2>
          <p className="text-slate-600 leading-relaxed">DataCost continues to focus on South African data comparisons, airtime questions, USSD codes and practical troubleshooting. For a South African SIM, start here. For a local SIM in another covered country, visit Afri Data Cost.</p>
          <p className="text-slate-600 leading-relaxed">Even when operators share a name across countries, their prices, codes and terms can differ. Keeping each market separate helps readers find information that applies to their own network.</p>
          <a className={linkStyle} href="/best-data-deals-south-africa/">Compare South African monthly data deals</a>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Our intent as we expand</h2>
          <p className="text-slate-600 leading-relaxed">Our aim is to deepen the information available in existing markets and extend coverage to more countries over time. We have no additional country launch dates to announce on this page.</p>
          <p className="text-slate-600 leading-relaxed">Useful expansion needs local context: prices in local currency, clear bundle validity, separate treatment of night or app-only data, and visible operator sources and check dates. Those details matter more than a single ranking across countries.</p>
          <p className="text-slate-600 leading-relaxed">You can read <a className={linkStyle} href="/methodology/">DataCost’s comparison methodology</a> for our South African approach. Afri Data Cost publishes its own methodology and sources on its website.</p>
        </section>

        <section className="border-t border-slate-200 pt-8 space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Help shape future coverage</h2>
          <p className="text-slate-600 leading-relaxed">Tell us which country, network or mobile data question you would like covered. Links to official operator information are especially helpful when suggesting a missing topic or reporting a correction.</p>
          <a className={linkStyle} href="/contact/">Contact DataCost</a>
        </section>
      </main>
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};

