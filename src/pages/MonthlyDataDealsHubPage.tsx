import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CalendarCheck, Check, Database, Gauge, Moon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import {
  currentMonthlyDealSnapshot,
  getCurrentOffersForSize,
  getDealSizePath,
  LAUNCHED_DEAL_SIZES_GB,
  TRACKED_DATA_SIZES_GB
} from '../data/monthlyDeals';
import { getDealAwards, getDealOfferMetrics } from '../utils/monthlyDealRanking';
import { buildMonthlyDealArticleSchema, buildMonthlyDealWinnerItemListSchema } from '../utils/monthlyDealStructuredData';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import { trackDealSizeNavigation } from '../utils/tracking';
import type { NavigateFunction } from '../types';

interface MonthlyDataDealsHubPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const PUBLISHED_ISO = '2026-08-04T00:00:00.000Z';

function formatRand(value: number): string {
  return `R${value.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}`;
}

export const MonthlyDataDealsHubPage: React.FC<MonthlyDataDealsHubPageProps> = ({ onNavigate, onScrollTo }) => {
  const canonicalPath = '/best-data-deals-south-africa/';
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const pageTitle = `Best Data Deals in South Africa — ${currentMonthlyDealSnapshot.label}`;
  const metaDescription =
    'Compare current South African 10GB, 20GB and 30GB mobile data deals using official sources, anytime-data costs, restrictions, validity and eligibility.';
  const modifiedIso = getRouteModifiedIso(canonicalPath);
  const reviewedDisplay = formatIsoForDisplay(`${currentMonthlyDealSnapshot.checkedAt}T00:00:00.000Z`);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Best data deals', href: canonicalPath }
  ];

  const launchedSummaries = LAUNCHED_DEAL_SIZES_GB.map((sizeGb) => {
    const offers = getCurrentOffersForSize(sizeGb);
    const awards = getDealAwards(sizeGb, offers);
    return { sizeGb, offers, awards };
  });
  const winners = launchedSummaries
    .map((summary) => summary.awards.bestOverall)
    .filter((offer): offer is NonNullable<typeof offer> => Boolean(offer));
  const uniqueSourceUrls = [...new Set(currentMonthlyDealSnapshot.offers.map((offer) => offer.source.url))];

  const articleSchema = buildMonthlyDealArticleSchema({
    headline: pageTitle,
    description: metaDescription,
    canonicalUrl,
    datePublished: PUBLISHED_ISO,
    dateModified: modifiedIso,
    sourceUrls: uniqueSourceUrls
  });
  const itemListSchema = buildMonthlyDealWinnerItemListSchema(
    `DataCost ${currentMonthlyDealSnapshot.label} monthly deal winners`,
    canonicalUrl,
    winners
  );

  return (
    <div className="min-h-screen bg-[#f4f7f3] pb-24 text-[#1a1c1c]">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <a href="#monthly-deal-results" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-black focus:text-[#031636] focus:shadow-xl">
        Skip to monthly deal results
      </a>
      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main>
        <div className="border-b border-[#cad7c8] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <header className="overflow-hidden border-b border-[#cad7c8] bg-[#031636] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-bold text-[#dff9dc]">
                <span className="inline-flex items-center gap-2"><CalendarCheck className="h-4 w-4" aria-hidden="true" /> Checked {reviewedDisplay}</span>
                <span aria-hidden="true">•</span>
                <span>Official provider sources only</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Best data deals in South Africa
                <span className="mt-2 block text-[#a0f399]">{currentMonthlyDealSnapshot.label}</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
                Compare what you can use during the day—not just the biggest number in an advert. We separate anytime, night, streaming, social and daily-release data before naming a winner.
              </p>
            </div>
            <div className="border-l-4 border-[#a0f399] bg-white/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a0f399]">Ranking rule</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white">
                “Best overall” is the lowest monthly price whose guaranteed pooled anytime data falls inside that page’s size band. Restricted data cannot make up the shortfall.
              </p>
            </div>
          </div>
        </header>

        <section id="monthly-deal-results" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-12 sm:px-6 md:py-16" aria-labelledby="results-title">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#166534]">Quick answer</p>
            <h2 id="results-title" className="mt-2 text-3xl font-black tracking-tight text-[#031636] sm:text-4xl">This month’s genuine-anytime winners</h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-700">
              These winners use the lowest monthly price among genuine pooled-anytime offers in each size band. Unit value is calculated separately, while split, night-only and daily-release offers remain clearly labelled.
            </p>
          </div>

          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-300 bg-white">
            {launchedSummaries.map(({ sizeGb, offers, awards }) => {
              const winner = awards.bestOverall;
              const metrics = winner ? getDealOfferMetrics(winner) : null;
              return (
                <article key={sizeGb} className="grid gap-5 px-5 py-6 md:grid-cols-[110px_minmax(0,1fr)_180px_auto] md:items-center">
                  <div className="text-3xl font-black tracking-tight text-[#031636]">{sizeGb}GB</div>
                  <div>
                    <h3 className="text-xl font-black text-[#031636]">{winner?.providerName ?? 'No verified winner'}</h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{winner?.offerName ?? 'The current snapshot has no ranking-eligible offer.'}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                      {offers.length} official offers reviewed · {winner ? (winner.accessTier === 'public' ? 'Open public access' : 'Eligibility rules apply') : 'No eligible winner'}
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#031636]">{winner ? formatRand(winner.priceZar) : '—'}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-600">{metrics?.costPerAnytimeGb ? `${formatRand(metrics.costPerAnytimeGb)} / anytime GB` : 'No comparable R/GB'}</div>
                  </div>
                  <Link
                    to={getDealSizePath(sizeGb)}
                    onClick={() => trackDealSizeNavigation({ targetGb: sizeGb, placement: 'hub_summary' })}
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#031636] px-5 text-sm font-black text-white hover:bg-[#166534] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#166534]"
                  >
                    Compare {sizeGb}GB <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[#cad7c8] bg-[#eaf2e8]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#031636]">Why the advertised total can mislead</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Gauge className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" />
                  <div><h3 className="font-black text-[#031636]">Pooled anytime is the baseline</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">YouTube, WhatsApp calls, maps and normal browsing can use this monthly pool throughout the day.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Moon className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" />
                  <div><h3 className="font-black text-[#031636]">Restricted wallets stay separate</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">Night, streaming, social and daily-release allocations are never silently added to anytime data.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" />
                  <div><h3 className="font-black text-[#031636]">Two cost-per-GB figures</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">We calculate cost per anytime GB and cost per base advertised GB. Conditional bonuses stay separate and never lower the base figure.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" />
                  <div><h3 className="font-black text-[#031636]">Conditions affect eligibility</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">Price plans, SIM requirements, contracts and validity differences appear beside every offer.</p></div>
                </div>
              </div>
            </div>
            <aside className="bg-[#031636] p-6 text-white" aria-labelledby="coverage-title">
              <h3 id="coverage-title" className="text-xl font-black">Tracker coverage</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold">
                {TRACKED_DATA_SIZES_GB.map((sizeGb) => {
                  const launched = LAUNCHED_DEAL_SIZES_GB.includes(sizeGb);
                  return (
                    <li key={sizeGb} className="flex items-center justify-between gap-4 border-b border-white/15 pb-3">
                      <span>{sizeGb}GB monthly deals</span>
                      <span className={launched ? 'text-[#a0f399]' : 'text-slate-400'}>{launched ? 'Live' : 'Planned'}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-xs leading-5 text-slate-300">Planned sizes are already supported by the data model but will not receive public pages until enough current official rows are reviewed.</p>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#031636]">Editorial method in plain language</h2>
              <ol className="mt-6 space-y-4">
                {[
                  'Start with a live official provider page or terms document and record the check date.',
                  'Store each data wallet separately: anytime, night, streaming, social and other restricted data.',
                  'Include only 28–31-day or clearly monthly products in monthly awards.',
                  'Place offers into deterministic size bands using pooled anytime data and the base advertised total, excluding conditional bonuses.',
                  'Award best overall by lowest monthly price among pooled-anytime qualifiers; calculate R/anytime-GB separately.'
                ].map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff9dc] text-xs font-black text-[#14532d]">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <Link to="/methodology/" className="mt-7 inline-flex min-h-11 items-center gap-2 font-black text-[#166534] underline decoration-[#a0f399] decoration-2 underline-offset-4 hover:text-[#031636]">
                Read DataCost’s full methodology <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#031636]">What we deliberately exclude</h2>
              <ul className="mt-6 space-y-3 border-t border-slate-300 pt-5">
                {[
                  'Expired promotions, even when the old terms page remains online.',
                  'Personalised offers that another customer cannot reproduce.',
                  'A price inferred by multiplying a smaller bundle.',
                  'Contract voice-plan pricing presented as though it were a data-only bundle.',
                  'Offers with no public price, unclear allocation or unresolved source conflict.'
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-[#166534]" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-labelledby="next-title">
          <div className="border-t border-slate-300 pt-10">
            <h2 id="next-title" className="text-2xl font-black tracking-tight text-[#031636]">Continue comparing</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Link to="/guides/cheapest-data-south-africa/" className="min-h-12 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Cheapest data guide</Link>
              <Link to="/guides/best-monthly-data-deals-south-africa/" className="min-h-12 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Broader monthly guide</Link>
              <Link to="/guides/mvnos-south-africa/" className="min-h-12 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Compare MVNOs</Link>
              <Link to="/network/" className="min-h-12 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Compare networks</Link>
              <Link to="/guides/buy-data-with-bank-apps-south-africa/" className="min-h-12 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Buy data with bank apps</Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <AuthorReviewBlock lastReviewed={reviewedDisplay} />
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
