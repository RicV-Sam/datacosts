import React from 'react';
import { ExternalLink, Info, Moon, ShieldCheck } from 'lucide-react';
import {
  isMvnoOffer,
  type DealCommitment,
  type DealPaymentModel,
  type MonthlyDataDealOffer,
  type TrackedDataSizeGb
} from '../../data/monthlyDeals';
import { getDealOfferMetrics } from '../../utils/monthlyDealRanking';
import { trackDealOfferSourceClick } from '../../utils/tracking';

interface MonthlyDealComparisonProps {
  sizeGb: TrackedDataSizeGb;
  offers: MonthlyDataDealOffer[];
  bestOverallId?: string;
  bestAnytimeValueId?: string;
  lowestAdvertisedId?: string;
}

function formatRand(value: number): string {
  return `R${value.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}`;
}

function getRestrictedSummary(offer: MonthlyDataDealOffer): string[] {
  const rows: string[] = [];
  if (offer.allocation.nightGb > 0) rows.push(`${offer.allocation.nightGb}GB night`);
  if (offer.allocation.streamingGb > 0) rows.push(`${offer.allocation.streamingGb}GB streaming`);
  if (offer.allocation.socialGb > 0) rows.push(`${offer.allocation.socialGb}GB social`);
  for (const item of offer.allocation.otherRestricted) rows.push(`${item.gb}GB ${item.label.toLowerCase()}`);
  if (offer.allocation.conditionalBonusGb) rows.push(`${offer.allocation.conditionalBonusGb}GB conditional bonus`);
  return rows;
}

function getBillingLabel(offer: MonthlyDataDealOffer): string {
  return offer.billing === 'once_off' ? 'Once-off price' : 'Recurring monthly price';
}

function getPaymentLabel(paymentModel?: DealPaymentModel): string {
  if (!paymentModel) return 'Not recorded';
  if (paymentModel.kind === 'prepaid') return 'Prepaid / upfront';
  if (paymentModel.kind === 'top_up') return 'Top Up / pre-funded';
  if (paymentModel.kind === 'postpaid') return 'Postpaid / in arrears';
  if (paymentModel.kind === 'mixed') return 'Mixed payment models';
  return 'Not confirmed';
}

function getCommitmentLabel(commitment?: DealCommitment): string {
  if (!commitment) return 'Not recorded';
  if (commitment.kind === 'once_off') return 'Once-off';
  if (commitment.kind === 'month_to_month') return 'Month-to-month';
  if (commitment.kind === 'fixed_term') return `${commitment.months}-month fixed term`;
  return 'Term not confirmed';
}

function SourceLink({ offer, sizeGb, placement }: {
  offer: MonthlyDataDealOffer;
  sizeGb: TrackedDataSizeGb;
  placement: 'comparison_table' | 'comparison_card';
}) {
  return (
    <a
      href={offer.source.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDealOfferSourceClick({
        providerId: offer.providerId,
        offerId: offer.id,
        targetGb: sizeGb,
        placement
      })}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-bold text-[#166534] underline decoration-[#a0f399] decoration-2 underline-offset-4 hover:text-[#031636] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#166534]"
      aria-label={`Open official source for ${offer.providerName} ${offer.offerName} in a new tab`}
    >
      Official source
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

function StatusBadges({ offer, bestOverallId, bestAnytimeValueId, lowestAdvertisedId }: {
  offer: MonthlyDataDealOffer;
  bestOverallId?: string;
  bestAnytimeValueId?: string;
  lowestAdvertisedId?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {isMvnoOffer(offer) ? (
        <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-1 text-xs font-black text-violet-950">
          MVNO
        </span>
      ) : null}
      {offer.id === bestOverallId ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#dff9dc] px-2.5 py-1 text-xs font-black text-[#14532d]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Best overall
        </span>
      ) : null}
      {offer.id === bestAnytimeValueId && offer.id !== bestOverallId ? (
        <span className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-1 text-xs font-black text-sky-950">
          Best R / anytime GB
        </span>
      ) : null}
      {offer.id === lowestAdvertisedId && offer.id !== bestOverallId ? (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-950">
          Lowest advertised price
        </span>
      ) : null}
      {offer.rankingStatus === 'context_only' ? (
        <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-1 text-xs font-black text-slate-700">
          Context only
        </span>
      ) : null}
    </div>
  );
}

export const MonthlyDealComparison: React.FC<MonthlyDealComparisonProps> = ({
  sizeGb,
  offers,
  bestOverallId,
  bestAnytimeValueId,
  lowestAdvertisedId
}) => {
  return (
    <>
      <div className="space-y-4 lg:hidden" aria-label={`${sizeGb}GB deal comparison cards`}>
        {offers.map((offer) => {
          const metrics = getDealOfferMetrics(offer);
          const restricted = getRestrictedSummary(offer);
          return (
            <article key={offer.id} className="border-t-4 border-[#031636] bg-white p-5 shadow-[0_12px_30px_rgba(3,22,54,0.08)]">
              <StatusBadges offer={offer} bestOverallId={bestOverallId} bestAnytimeValueId={bestAnytimeValueId} lowestAdvertisedId={lowestAdvertisedId} />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-[#031636]">{offer.providerName}</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{offer.offerName}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-500">Advertised: {offer.advertisedDataLabel}</p>
                </div>
                <p className="whitespace-nowrap text-2xl font-black tracking-tight text-[#031636]">{formatRand(offer.priceZar)}</p>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-200 py-4 text-sm">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Pooled anytime</dt>
                  <dd className="mt-1 font-black text-slate-900">{offer.allocation.anytimeGb}GB</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Restricted</dt>
                  <dd className="mt-1 font-black text-slate-900">{restricted.length > 0 ? restricted.join(', ') : 'None listed'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">R / anytime GB</dt>
                  <dd className="mt-1 font-black text-slate-900">{metrics.costPerAnytimeGb === null ? 'Not comparable' : formatRand(metrics.costPerAnytimeGb)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">R / base advertised GB</dt>
                  <dd className="mt-1 font-black text-slate-900">{metrics.costPerAdvertisedGb === null ? 'Not comparable' : formatRand(metrics.costPerAdvertisedGb)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Validity</dt>
                  <dd className="mt-1 font-black text-slate-900">{offer.validity.label}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Price cadence</dt>
                  <dd className="mt-1 font-black text-slate-900">{getBillingLabel(offer)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Payment</dt>
                  <dd className="mt-1 font-black text-slate-900">{getPaymentLabel(offer.paymentModel)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Commitment</dt>
                  <dd className="mt-1 font-black text-slate-900">{getCommitmentLabel(offer.commitment)}</dd>
                </div>
              </dl>

              <p className="mt-4 text-sm leading-6 text-slate-700">{offer.eligibility}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Buy via {offer.purchaseChannels.join(', ')}.</p>
              {offer.allocation.otherRestricted.length > 0 || offer.allocation.conditionalBonusNote || offer.importantNotes.length > 0 ? (
                <ul className="mt-3 space-y-1.5 text-sm font-medium leading-6 text-slate-600">
                  {offer.allocation.otherRestricted.map((item) => <li key={`${offer.id}-${item.label}`}>{item.label}: {item.restriction}</li>)}
                  {offer.allocation.conditionalBonusNote ? <li>{offer.allocation.conditionalBonusNote}</li> : null}
                  {offer.importantNotes.map((note) => <li key={`${offer.id}-${note}`}>{note}</li>)}
                </ul>
              ) : null}
              {offer.rankingExclusionReason ? (
                <p className="mt-3 flex items-start gap-2 text-sm font-semibold leading-6 text-slate-600">
                  <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /> {offer.rankingExclusionReason}
                </p>
              ) : null}
              <div className="mt-3 text-xs font-semibold text-slate-500">Checked {offer.source.checkedAt}</div>
              <SourceLink offer={offer} sizeGb={sizeGb} placement="comparison_card" />
            </article>
          );
        })}
      </div>

      <div
        className="hidden overflow-x-auto border-y border-slate-200 bg-white lg:block"
        role="region"
        aria-label={`Scrollable ${sizeGb}GB deal comparison`}
        tabIndex={0}
      >
        <table className="w-full min-w-[1240px] border-collapse text-left">
          <caption className="sr-only">Officially sourced {sizeGb}GB-class monthly mobile data offers</caption>
          <thead className="bg-[#031636] text-white">
            <tr>
              {['Provider and offer', 'Price', 'Pooled anytime', 'Restricted allocation', 'R / anytime GB', 'R / base advertised GB', 'Validity and terms', 'Access and source'].map((label) => (
                <th key={label} scope="col" className="px-4 py-4 text-xs font-black uppercase tracking-wider">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {offers.map((offer) => {
              const metrics = getDealOfferMetrics(offer);
              const restricted = getRestrictedSummary(offer);
              return (
                <tr key={offer.id} className="align-top hover:bg-[#f6fbf5]">
                  <th scope="row" className="max-w-[260px] px-4 py-5">
                    <StatusBadges offer={offer} bestOverallId={bestOverallId} bestAnytimeValueId={bestAnytimeValueId} lowestAdvertisedId={lowestAdvertisedId} />
                    <div className="mt-3 font-black text-[#031636]">{offer.providerName}</div>
                    <div className="mt-1 text-sm font-semibold leading-5 text-slate-600">{offer.offerName}</div>
                    <div className="mt-1 text-xs font-bold leading-5 text-slate-500">Advertised: {offer.advertisedDataLabel}</div>
                  </th>
                  <td className="px-4 py-5 text-xl font-black text-[#031636]">{formatRand(offer.priceZar)}</td>
                  <td className="px-4 py-5 font-black text-slate-900">{offer.allocation.anytimeGb}GB</td>
                  <td className="max-w-[190px] px-4 py-5 text-sm leading-6 text-slate-700">
                    {restricted.length > 0 ? (
                      <span className="inline-flex items-start gap-2"><Moon className="mt-1 h-4 w-4 shrink-0 text-[#166534]" aria-hidden="true" />{restricted.join(', ')}</span>
                    ) : 'None listed'}
                    {offer.allocation.otherRestricted.map((item) => <p key={`${offer.id}-${item.label}`} className="mt-2 text-xs font-semibold leading-5 text-slate-500">{item.restriction}</p>)}
                    {offer.allocation.conditionalBonusNote ? <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{offer.allocation.conditionalBonusNote}</p> : null}
                  </td>
                  <td className="px-4 py-5 font-bold text-slate-900">
                    {metrics.costPerAnytimeGb === null ? 'Not comparable' : formatRand(metrics.costPerAnytimeGb)}
                  </td>
                  <td className="px-4 py-5 font-bold text-slate-900">
                    {metrics.costPerAdvertisedGb === null ? 'Not comparable' : formatRand(metrics.costPerAdvertisedGb)}
                  </td>
                  <td className="px-4 py-5 text-sm font-semibold text-slate-700">
                    {offer.validity.label}
                    <span className="mt-2 block text-xs text-slate-500">{getPaymentLabel(offer.paymentModel)}</span>
                    <span className="mt-1 block text-xs text-slate-500">{getCommitmentLabel(offer.commitment)}</span>
                    <span className="mt-1 block text-xs text-slate-500">{getBillingLabel(offer)}</span>
                  </td>
                  <td className="max-w-[260px] px-4 py-5 text-sm leading-6 text-slate-700">
                    <p>{offer.eligibility}</p>
                    <p className="mt-2 font-semibold text-slate-600">Buy via {offer.purchaseChannels.join(', ')}.</p>
                    {offer.importantNotes.map((note) => <p key={`${offer.id}-${note}`} className="mt-2 text-xs font-medium leading-5 text-slate-500">{note}</p>)}
                    {offer.rankingExclusionReason ? <p className="mt-2 font-semibold text-slate-500">{offer.rankingExclusionReason}</p> : null}
                    <p className="mt-2 text-xs font-semibold text-slate-500">Checked {offer.source.checkedAt}</p>
                    <SourceLink offer={offer} sizeGb={sizeGb} placement="comparison_table" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
