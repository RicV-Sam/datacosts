import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, ArrowRight, CalendarCheck, ExternalLink, Moon, Scale, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import { MonthlyDealComparison } from '../components/deals/MonthlyDealComparison';
import {
  currentMonthlyDealSnapshot,
  getDealSizeUpperBound,
  getCurrentOffersForSize,
  getDealSizePath,
  LAUNCHED_DEAL_SIZES_GB,
  type MonthlyDataDealOffer,
  type TrackedDataSizeGb
} from '../data/monthlyDeals';
import { getDealAwards, getDealOfferMetrics, sortDealsForDisplay } from '../utils/monthlyDealRanking';
import { buildMonthlyDealArticleSchema, buildMonthlyDealItemListSchema } from '../utils/monthlyDealStructuredData';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import { trackDealOfferSourceClick, trackDealSizeNavigation } from '../utils/tracking';
import type { NavigateFunction } from '../types';

interface MonthlyDataDealSizePageProps {
  sizeGb: TrackedDataSizeGb;
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const PUBLISHED_ISO = '2026-08-04T00:00:00.000Z';

function formatRand(value: number): string {
  return `R${value.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}`;
}

function uniqueSources(offers: MonthlyDataDealOffer[]): MonthlyDataDealOffer[] {
  const seen = new Set<string>();
  return offers.filter((offer) => {
    if (seen.has(offer.source.url)) return false;
    seen.add(offer.source.url);
    return true;
  });
}

function restrictionCopy(offer: MonthlyDataDealOffer, targetGb: TrackedDataSizeGb): string {
  if (offer.allocation.anytimeGb >= targetGb) return `${offer.allocation.anytimeGb}GB is available as one pooled anytime allowance.`;
  const gap = targetGb - offer.allocation.anytimeGb;
  return `${formatRand(offer.priceZar)} reaches the advertised ${targetGb}GB class only by adding restricted data; it has ${gap}GB less pooled anytime data than the target.`;
}

const NETWORK_PATHS: Partial<Record<MonthlyDataDealOffer['providerId'], string>> = {
  'cell-c': '/network/cell-c/',
  mtn: '/network/mtn/',
  telkom: '/network/telkom/',
  vodacom: '/network/vodacom/'
};

export const MonthlyDataDealSizePage: React.FC<MonthlyDataDealSizePageProps> = ({ sizeGb, onNavigate, onScrollTo }) => {
  const canonicalPath = getDealSizePath(sizeGb);
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const pageTitle = `Best ${sizeGb}GB Data Deals in South Africa — ${currentMonthlyDealSnapshot.label}`;
  const metaDescription = `Compare current ${sizeGb}GB-class South African mobile data offers by anytime data, restricted allocations, price, validity and eligibility using official provider sources.`;
  const modifiedIso = getRouteModifiedIso(canonicalPath);
  const reviewedDisplay = formatIsoForDisplay(`${currentMonthlyDealSnapshot.checkedAt}T00:00:00.000Z`);
  const offers = sortDealsForDisplay(sizeGb, getCurrentOffersForSize(sizeGb));
  const awards = getDealAwards(sizeGb, offers);
  const winner = awards.bestOverall;
  const bestAnytimeValue = awards.bestAnytimeValue;
  const lowestAdvertised = awards.lowestAdvertisedPrice;
  const winnerMetrics = winner ? getDealOfferMetrics(winner) : null;
  const bestAnytimeValueMetrics = bestAnytimeValue ? getDealOfferMetrics(bestAnytimeValue) : null;
  const lowestMetrics = lowestAdvertised ? getDealOfferMetrics(lowestAdvertised) : null;
  const upperBoundGb = getDealSizeUpperBound(sizeGb);
  const sourceOffers = uniqueSources(offers);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Best data deals', href: '/best-data-deals-south-africa/' },
    { label: `${sizeGb}GB deals`, href: canonicalPath }
  ];

  const articleSchema = buildMonthlyDealArticleSchema({
    headline: pageTitle,
    description: metaDescription,
    canonicalUrl,
    datePublished: PUBLISHED_ISO,
    dateModified: modifiedIso,
    sourceUrls: sourceOffers.map((offer) => offer.source.url)
  });
  const itemListSchema = buildMonthlyDealItemListSchema(pageTitle, canonicalUrl, offers);

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

      <a href="#deal-comparison" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-black focus:text-[#031636] focus:shadow-xl">
        Skip to {sizeGb}GB comparison
      </a>
      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main>
        <div className="border-b border-[#cad7c8] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <header className="border-b border-[#cad7c8] bg-[#031636] text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-[#dff9dc]">
              <span className="inline-flex items-center gap-2"><CalendarCheck className="h-4 w-4" aria-hidden="true" /> Checked {reviewedDisplay}</span>
              <span aria-hidden="true">•</span>
              <span>{offers.length} current official offers reviewed</span>
            </div>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Best {sizeGb}GB data deals in South Africa
              <span className="mt-2 block text-[#a0f399]">{currentMonthlyDealSnapshot.label}</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
              A practical comparison for people who want roughly {sizeGb}GB this month. Every restricted wallet and eligibility condition stays visible, so a split bundle cannot masquerade as {sizeGb}GB of general daytime data.
            </p>
          </div>
        </header>

        <nav className="border-b border-[#cad7c8] bg-white" aria-label="Monthly deal sizes">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
            <Link to="/best-data-deals-south-africa/" className="inline-flex min-h-11 shrink-0 items-center px-4 text-sm font-black text-[#031636] hover:bg-[#eaf2e8]">All sizes</Link>
            {LAUNCHED_DEAL_SIZES_GB.map((linkedSize) => (
              <Link
                key={linkedSize}
                to={getDealSizePath(linkedSize)}
                aria-current={linkedSize === sizeGb ? 'page' : undefined}
                onClick={() => trackDealSizeNavigation({ targetGb: linkedSize, sourceGb: sizeGb, placement: 'size_switcher' })}
                className={`inline-flex min-h-11 shrink-0 items-center px-4 text-sm font-black ${linkedSize === sizeGb ? 'bg-[#031636] text-white' : 'text-[#031636] hover:bg-[#eaf2e8]'}`}
              >
                {linkedSize}GB
              </Link>
            ))}
          </div>
        </nav>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14" aria-labelledby="quick-verdict-title">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
            <div className="border-l-4 border-[#166534] bg-white p-6 shadow-[0_14px_35px_rgba(3,22,54,0.07)] sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#166534]">Quick verdict</p>
              <h2 id="quick-verdict-title" className="mt-3 text-3xl font-black tracking-tight text-[#031636]">
                {winner ? `${winner.providerName} is our best overall ${sizeGb}GB pick` : 'No offer clears the genuine-anytime threshold'}
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-slate-700">
                {winner && winnerMetrics
                  ? `${winner.offerName} provides ${winner.allocation.anytimeGb}GB of pooled anytime data for ${formatRand(winner.priceZar)}, or ${formatRand(winnerMetrics.costPerAnytimeGb ?? 0)} per anytime GB. ${restrictionCopy(winner, sizeGb)}`
                  : `No current official row provides pooled monthly anytime data from ${sizeGb}GB up to, but not including, ${upperBoundGb}GB under the published ranking rules.`}
              </p>
              {winner ? (
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  <span className="font-black text-[#031636]">Eligibility:</span> {winner.eligibility}
                </p>
              ) : null}
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                This is a price-and-structure result, not a coverage or speed claim. Check signal where you live, work and travel before moving networks.
              </p>
              {bestAnytimeValue && bestAnytimeValueMetrics && bestAnytimeValue.id !== winner?.id ? (
                <p className="mt-4 border-t border-slate-200 pt-4 text-sm font-semibold leading-6 text-slate-700">
                  <span className="font-black text-[#031636]">Best unit value:</span>{' '}
                  {bestAnytimeValue.providerName} offers {bestAnytimeValue.allocation.anytimeGb}GB for {formatRand(bestAnytimeValue.priceZar)}, or {formatRand(bestAnytimeValueMetrics.costPerAnytimeGb ?? 0)} per anytime GB.
                </p>
              ) : null}
            </div>

            <aside className="bg-[#f4df9b] p-6 text-[#3b2b00] sm:p-8" aria-labelledby="headline-price-title">
              <p className="text-sm font-black uppercase tracking-[0.16em]">Lowest advertised price</p>
              <h2 id="headline-price-title" className="mt-3 text-2xl font-black tracking-tight">
                {lowestAdvertised ? `${lowestAdvertised.providerName}: ${formatRand(lowestAdvertised.priceZar)}` : 'No eligible offer'}
              </h2>
              <p className="mt-4 text-sm font-semibold leading-6">
                {lowestAdvertised && lowestMetrics
                  ? `${lowestAdvertised.advertisedDataLabel}. That works out to ${formatRand(lowestMetrics.costPerAdvertisedGb ?? 0)} per base advertised GB, excluding conditional bonus data; only ${lowestAdvertised.allocation.anytimeGb}GB is counted as pooled anytime data.`
                  : 'No officially priced monthly offer reaches this advertised size in the current snapshot.'}
              </p>
            </aside>
          </div>
        </section>

        <section id="deal-comparison" className="mx-auto max-w-7xl scroll-mt-6 px-4 pb-14 sm:px-6" aria-labelledby="comparison-title">
          <div className="mb-7 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#166534]">Like-for-like view</p>
            <h2 id="comparison-title" className="mt-2 text-3xl font-black tracking-tight text-[#031636] sm:text-4xl">{sizeGb}GB-class offer comparison</h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-700">
              Rows marked “context only” are current and useful, but do not enter price awards because the validity, product bundle or restriction makes the price non-comparable. All R/anytime-GB calculations exclude night, streaming, social and daily-release wallets.
            </p>
          </div>
          <MonthlyDealComparison
            sizeGb={sizeGb}
            offers={offers}
            bestOverallId={winner?.id}
            bestAnytimeValueId={bestAnytimeValue?.id}
            lowestAdvertisedId={lowestAdvertised?.id}
          />
          <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
            Prices and allocations were checked against the linked official sources on {reviewedDisplay}. Provider checkout terms can change without notice; recheck before paying.
          </p>
        </section>

        <section className="border-y border-[#cad7c8] bg-[#eaf2e8]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <h2 className="text-3xl font-black tracking-tight text-[#031636]">How DataCost counts {sizeGb}GB</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="border-t-4 border-[#166534] bg-white p-5"><h3 className="font-black text-[#031636]">Pooled anytime</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-700">A general-use wallet available as one monthly pool. Daily releases remain separate even when each daily slice works throughout the day.</p></div>
              <div className="border-t-4 border-[#806200] bg-white p-5"><h3 className="font-black text-[#031636]">Night</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-700">Data usable only in the provider’s overnight window. It counts toward the advertised total, not the anytime target.</p></div>
              <div className="border-t-4 border-[#49566c] bg-white p-5"><h3 className="font-black text-[#031636]">Streaming or social</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-700">App- or service-specific wallets stay separate because they cannot support every normal internet task.</p></div>
              <div className="border-t-4 border-[#9f1239] bg-white p-5"><h3 className="font-black text-[#031636]">Other restrictions</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-700">Daily releases, device locks and conditional bonuses get their own fields and never disappear inside a headline number.</p></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#031636]">Why this ranking is editorial, not commercial</h2>
              <p className="mt-5 text-base font-medium leading-7 text-slate-700">
                DataCost does not raise an offer because it has a bigger advertising number, includes an affiliate opportunity or comes from a major network. Every qualifying row follows the same deterministic order.
              </p>
              <ol className="mt-6 space-y-4">
                {[
                  `Guaranteed pooled anytime data must fall from ${sizeGb}GB up to, but not including, ${upperBoundGb}GB.`,
                  'Validity must be 28–31 days or an explicitly monthly allocation.',
                  'The source and price must be current, official and publicly reproducible.',
                  'Best overall uses the lowest monthly price; ties use fewer access restrictions, then once-off billing. Unit value is awarded separately.'
                ].map((rule, index) => (
                  <li key={rule} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff9dc] text-xs font-black text-[#14532d]">{index + 1}</span>{rule}
                  </li>
                ))}
              </ol>
              <Link to="/methodology/" className="mt-7 inline-flex min-h-11 items-center gap-2 font-black text-[#166534] underline decoration-[#a0f399] decoration-2 underline-offset-4 hover:text-[#031636]">
                Read the full methodology <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="border-t-4 border-[#031636] bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-black tracking-tight text-[#031636]">Use-case guidance</h2>
              <div className="mt-6 space-y-5">
                <div className="flex gap-3"><WalletCards className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" /><div><h3 className="font-black text-[#031636]">For everyday monthly use</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">Prefer the best-overall row if you need maps, browsing, hotspot use and app updates at varied times.</p></div></div>
                <div className="flex gap-3"><Moon className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" /><div><h3 className="font-black text-[#031636]">If you can schedule downloads</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">A lower advertised-price split bundle may work, provided the overnight wallet genuinely matches your routine.</p></div></div>
                <div className="flex gap-3"><Scale className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" /><div><h3 className="font-black text-[#031636]">For YouTube and WhatsApp calls</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">Use anytime data for the budget calculation unless the provider explicitly supports the service inside a restricted wallet.</p></div></div>
                <div className="flex gap-3"><AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" /><div><h3 className="font-black text-[#031636]">For visitors</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-700">Check RICA, SIM delivery, eSIM support and account requirements. This page does not assume every banking MVNO is open to every visitor.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-300 bg-white" aria-labelledby="sources-title">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#166534]">Source register</p>
              <h2 id="sources-title" className="mt-2 text-3xl font-black tracking-tight text-[#031636]">Official pages checked for this comparison</h2>
              <p className="mt-4 text-base font-medium leading-7 text-slate-700">Each link goes directly to the provider or provider-owned terms document. Aggregators and copied price tables are not used as evidence.</p>
            </div>
            <ul className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2">
              {sourceOffers.map((offer) => (
                <li key={offer.source.url} className="border-t border-slate-300 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-black text-[#031636]">{offer.providerName}</div>
                      <div className="mt-1 text-sm font-medium leading-6 text-slate-600">{offer.source.title}</div>
                      <div className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">Checked {offer.source.checkedAt}</div>
                    </div>
                    <a
                      href={offer.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackDealOfferSourceClick({ providerId: offer.providerId, offerId: offer.id, targetGb: sizeGb, placement: 'source_register' })}
                      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-black text-[#166534] underline decoration-[#a0f399] decoration-2 underline-offset-4 hover:text-[#031636]"
                      aria-label={`Open ${offer.source.title} in a new tab`}
                    >
                      Open <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#031636]">Freshness and monthly history</h2>
              <p className="mt-5 text-base font-medium leading-7 text-slate-700">
                This public URL stays evergreen. Each monthly review is stored as a separate internal snapshot, so updating September’s prices will not erase the August evidence. The visible month, checked date, source register and structured data all come from the same active snapshot.
              </p>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                A provider may change a checkout price between reviews. If the price or eligibility shown here differs from the official checkout, use the provider’s current terms and tell DataCost so the next review can correct the record.
              </p>
            </div>
            <div className="bg-[#031636] p-6 text-white">
              <h3 className="text-xl font-black">Current snapshot</h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/15 pb-3"><dt className="text-slate-300">Month</dt><dd className="font-black">{currentMonthlyDealSnapshot.label}</dd></div>
                <div className="flex justify-between gap-4 border-b border-white/15 pb-3"><dt className="text-slate-300">Checked</dt><dd className="font-black">{reviewedDisplay}</dd></div>
                <div className="flex justify-between gap-4 border-b border-white/15 pb-3"><dt className="text-slate-300">Method</dt><dd className="font-black">v{currentMonthlyDealSnapshot.methodologyVersion}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-300">Official rows</dt><dd className="font-black">{offers.length}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6" aria-labelledby="related-title">
          <div className="border-t border-slate-300 pt-10">
            <h2 id="related-title" className="text-2xl font-black tracking-tight text-[#031636]">Related DataCost pages</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/best-data-deals-south-africa/" className="border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Monthly deal tracker hub</Link>
              {LAUNCHED_DEAL_SIZES_GB.filter((linkedSize) => linkedSize !== sizeGb).map((linkedSize) => (
                <Link
                  key={linkedSize}
                  to={getDealSizePath(linkedSize)}
                  onClick={() => trackDealSizeNavigation({ targetGb: linkedSize, sourceGb: sizeGb, placement: 'related_deals' })}
                  className="border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]"
                >
                  Best {linkedSize}GB deals
                </Link>
              ))}
              <Link to="/guides/cheapest-data-south-africa/" className="border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Cheapest data guide</Link>
              <Link to="/guides/best-monthly-data-deals-south-africa/" className="border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Best monthly data guide</Link>
              <Link to="/network/" className="border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Network comparison hub</Link>
              {[...new Set(offers.map((offer) => NETWORK_PATHS[offer.providerId]).filter(Boolean))].map((path) => (
                <Link key={path} to={path as string} className="border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">{path?.split('/')[2]?.replace('-', ' ')} network page</Link>
              ))}
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
