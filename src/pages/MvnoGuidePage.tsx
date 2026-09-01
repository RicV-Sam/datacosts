import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  Check,
  ExternalLink,
  Info,
  Landmark,
  PhoneCall,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Users
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { AuthorReviewBlock } from '../components/AuthorReviewBlock';
import { currentMonthlyDealSnapshot } from '../data/monthlyDeals';
import type { DealPaymentModel } from '../data/monthlyDeals';
import {
  MVNO_GUIDE_PATH,
  MVNO_REVIEWED_AT,
  isMvnoProviderId,
  mvnoProviderProfiles,
  type MvnoBankId,
  type MvnoBenefitKind,
  type MvnoFitTag,
  type MvnoProviderProfile
} from '../data/mvnos';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import type { NavigateFunction } from '../types';

interface MvnoGuidePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

type BankChoice = 'all' | 'none' | MvnoBankId;
type NeedChoice = 'all' | MvnoFitTag;
type CommitmentChoice = 'all' | 'once_off' | 'month_to_month';

const bankOptions: Array<{ value: BankChoice; label: string }> = [
  { value: 'all', label: 'Show every provider' },
  { value: 'none', label: 'No bank-linked provider' },
  { value: 'capitec', label: 'I bank with Capitec' },
  { value: 'fnb', label: 'I bank with FNB' },
  { value: 'nedbank', label: 'I bank with Nedbank' },
  { value: 'standard-bank', label: 'I bank with Standard Bank' }
];

const needOptions: Array<{ value: NeedChoice; label: string }> = [
  { value: 'all', label: 'Any main need' },
  { value: 'flexible_topups', label: 'Top up only when needed' },
  { value: 'monthly_data', label: 'Predictable monthly data' },
  { value: 'voice_heavy', label: 'Lots of calls' },
  { value: 'family_lines', label: 'Several lines or family SIMs' },
  { value: 'data_only', label: 'Data-only or backup SIM' },
  { value: 'bank_rewards', label: 'Bank rewards and perks' }
];

const commitmentOptions: Array<{ value: CommitmentChoice; label: string }> = [
  { value: 'all', label: 'Once-off or monthly' },
  { value: 'once_off', label: 'Once-off only' },
  { value: 'month_to_month', label: 'Month-to-month only' }
];

const benefitLabels: Record<MvnoBenefitKind, string> = {
  standard_value: 'Standard value',
  bank_linked_reward: 'Conditional bank benefit',
  service_feature: 'Service feature',
  temporary_promotion: 'Dated promotion'
};

const benefitClasses: Record<MvnoBenefitKind, string> = {
  standard_value: 'bg-[#dff9dc] text-[#14532d]',
  bank_linked_reward: 'bg-sky-100 text-sky-950',
  service_feature: 'bg-slate-200 text-slate-800',
  temporary_promotion: 'bg-amber-100 text-amber-950'
};

const decisionRows: Array<{ label: string; key: keyof Pick<MvnoProviderProfile, 'bestFor' | 'whyItSaves' | 'extraPerks' | 'whatYouNeed'> }> = [
  { label: 'Best for', key: 'bestFor' },
  { label: 'Why it saves', key: 'whyItSaves' },
  { label: 'Extra perks', key: 'extraPerks' },
  { label: 'What you need', key: 'whatYouNeed' }
];

const faqs = [
  {
    question: 'Are South African MVNOs only postpaid?',
    answer: 'No. The current DataCost sample includes once-off prepaid bundles and recurring month-to-month plans. Payment timing, price recurrence and commitment are separate questions, so a monthly price should never be treated as proof of a postpaid fixed-term contract.'
  },
  {
    question: 'When is a bank MVNO worth considering?',
    answer: 'Usually when you already hold the qualifying bank account and will genuinely use its data, airtime or reward benefits. Compare the ordinary mobile price first, then subtract only benefits you qualify for and would otherwise have paid for; include any extra banking or card fee.'
  },
  {
    question: 'Does an MVNO have exactly the same coverage and speed as its host network?',
    answer: 'Do not assume that. An MVNO uses another operator’s network infrastructure, but the service, APN, product rules, roaming arrangements and customer experience can differ. Check the MVNO’s own current coverage information in the places where you use your phone.'
  },
  {
    question: 'Should reward airtime count like cash?',
    answer: 'Only if it works for the use you need. Reward airtime can have expiry dates or restrictions, and some cannot buy data, SMSs or subscriptions. DataCost therefore keeps reward value outside ordinary tariff rankings.'
  }
];

function formatRand(value: number): string {
  return `R${value.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}`;
}

function formatPaymentModel(model: DealPaymentModel | undefined): string {
  if (!model || model.kind === 'not_confirmed') return 'Payment model not confirmed';
  if (model.kind === 'prepaid') return 'Prepaid / paid upfront';
  if (model.kind === 'top_up') return 'Top Up / pre-funded';
  if (model.kind === 'postpaid') return 'Postpaid / billed in arrears';
  return 'Mixed payment models';
}

function getProfileOffers(profile: MvnoProviderProfile) {
  return currentMonthlyDealSnapshot.offers.filter((offer) => offer.providerId === profile.id);
}

function hasCommitment(profile: MvnoProviderProfile, commitment: Exclude<CommitmentChoice, 'all'>): boolean {
  return getProfileOffers(profile).some((offer) => offer.commitment?.kind === commitment);
}

function buildArticleSchema(canonicalUrl: string, dateModified: string, sourceUrls: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'MVNOs in South Africa: Prepaid and Monthly Options',
    description: 'Compare six South African MVNOs by access, billing flexibility, bank rewards, standard benefits and user fit.',
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: `${MVNO_REVIEWED_AT}T00:00:00.000Z`,
    dateModified,
    citation: sourceUrls,
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

function buildProviderListSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'South African MVNOs reviewed by DataCost',
    url: canonicalUrl,
    numberOfItems: mvnoProviderProfiles.length,
    itemListElement: mvnoProviderProfiles.map((profile, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: profile.name,
        url: profile.sources[0].url,
        description: profile.bestFor
      }
    }))
  };
}

export const MvnoGuidePage: React.FC<MvnoGuidePageProps> = ({ onNavigate, onScrollTo }) => {
  const [bankChoice, setBankChoice] = React.useState<BankChoice>('all');
  const [needChoice, setNeedChoice] = React.useState<NeedChoice>('all');
  const [commitmentChoice, setCommitmentChoice] = React.useState<CommitmentChoice>('all');

  const pageTitle = 'MVNOs in South Africa: Prepaid & Monthly Options';
  const metaDescription = 'Compare AirMobile, Capitec Connect, FNB Connect, Melon Mobile, Nedbank Connect and Standard Bank Connect by pricing model, rewards and user fit.';
  const canonicalUrl = toCanonicalUrl(MVNO_GUIDE_PATH);
  const modifiedIso = getRouteModifiedIso(MVNO_GUIDE_PATH);
  const reviewedDisplay = formatIsoForDisplay(`${MVNO_REVIEWED_AT}T00:00:00.000Z`);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'South African MVNOs', href: MVNO_GUIDE_PATH }
  ];

  const mvnoOffers = currentMonthlyDealSnapshot.offers.filter((offer) => isMvnoProviderId(offer.providerId));
  const onceOffRows = mvnoOffers.filter((offer) => offer.billing === 'once_off').length;
  const recurringRows = mvnoOffers.filter((offer) => offer.billing === 'recurring_monthly').length;
  const fixedTermRows = mvnoOffers.filter((offer) => offer.commitment?.kind === 'fixed_term').length;
  const unconfirmedCommitmentRows = mvnoOffers.filter((offer) => offer.commitment?.kind === 'not_confirmed').length;
  const sourceUrls = [...new Set(mvnoProviderProfiles.flatMap((profile) => profile.sources.map((source) => source.url)))];

  const filteredProfiles = mvnoProviderProfiles.filter((profile) => {
    const bankMatches =
      bankChoice === 'all' ||
      (bankChoice === 'none' ? profile.bankId === null : profile.bankId === null || profile.bankId === bankChoice);
    const needMatches = needChoice === 'all' || profile.fitTags.includes(needChoice);
    const commitmentMatches = commitmentChoice === 'all' || hasCommitment(profile, commitmentChoice);
    return bankMatches && needMatches && commitmentMatches;
  });

  const resetFilters = () => {
    setBankChoice('all');
    setNeedChoice('all');
    setCommitmentChoice('all');
  };

  return (
    <div className="min-h-screen bg-[#f4f7f3] pb-24 text-[#1a1c1c]">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        <script type="application/ld+json">{JSON.stringify(buildArticleSchema(canonicalUrl, modifiedIso, sourceUrls))}</script>
        <script type="application/ld+json">{JSON.stringify(buildProviderListSchema(canonicalUrl))}</script>
      </Helmet>

      <a href="#mvno-chooser" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:font-black focus:text-[#031636] focus:shadow-xl">
        Skip to the MVNO chooser
      </a>
      <Header onScrollTo={onScrollTo} activeSection="guides" />

      <main>
        <div className="border-b border-[#cad7c8] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <header className="border-b border-[#cad7c8] bg-[#031636] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-bold text-[#dff9dc]">
                <span className="inline-flex items-center gap-2"><CalendarClock className="h-4 w-4" aria-hidden="true" /> Reviewed {reviewedDisplay}</span>
                <span aria-hidden="true">•</span>
                <span>Six provider profiles</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                MVNOs in South Africa
                <span className="mt-2 block text-[#a0f399]">Prepaid and monthly options</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
                An MVNO is not automatically a postpaid contract. Compare the normal tariff first, then decide whether bank rewards, flexible top-ups, voice perks or multi-line tools make the provider a better fit for you.
              </p>
            </div>
            <aside className="border-l-4 border-[#a0f399] bg-white/10 p-5" aria-label="Current tracker summary">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a0f399]">{currentMonthlyDealSnapshot.label} tracker</p>
              <p className="mt-3 text-3xl font-black">{mvnoOffers.length} MVNO rows</p>
              <dl className="mt-4 space-y-2 text-sm font-semibold text-slate-200">
                <div className="flex justify-between gap-4"><dt>Once-off price</dt><dd>{onceOffRows}</dd></div>
                <div className="flex justify-between gap-4"><dt>Recurring price</dt><dd>{recurringRows}</dd></div>
                <div className="flex justify-between gap-4"><dt>Confirmed fixed term</dt><dd>{fixedTermRows}</dd></div>
                <div className="flex justify-between gap-4"><dt>Commitment not confirmed</dt><dd>{unconfirmedCommitmentRows}</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-slate-300">These are comparison rows in DataCost’s 10GB–30GB sample, not a market-share count or every product each provider sells.</p>
            </aside>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="three-questions-title">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#166534]">Start here</p>
            <h2 id="three-questions-title" className="mt-2 text-3xl font-black tracking-tight text-[#031636] sm:text-4xl">“Monthly” answers only one question</h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-700">A fair comparison separates the product, how money is collected, and how long you are committed.</p>
          </div>
          <div className="mt-8 grid border-y border-slate-300 bg-white md:grid-cols-3 md:divide-x md:divide-slate-200">
            {[
              { number: '01', title: 'What is the product?', text: 'SIM-only, data-only, phone-plus-SIM or fixed wireless. The label tells you what is included—not how it is billed.' },
              { number: '02', title: 'When do you pay?', text: 'Prepaid/upfront, Top Up/pre-funded or postpaid/in arrears. If the source is unclear, DataCost says so.' },
              { number: '03', title: 'What is the commitment?', text: 'A once-off purchase, recurring month-to-month service or a fixed term. Recurring does not automatically mean locked in.' }
            ].map((item) => (
              <article key={item.number} className="border-b border-slate-200 p-6 last:border-0 md:border-b-0">
                <div className="text-xs font-black tracking-[0.18em] text-[#166534]">{item.number}</div>
                <h3 className="mt-3 text-xl font-black text-[#031636]">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="mvno-chooser" className="scroll-mt-24 border-y border-[#cad7c8] bg-[#eaf2e8]" aria-labelledby="chooser-title">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#166534]"><SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Transparent chooser</div>
                <h2 id="chooser-title" className="mt-2 text-3xl font-black tracking-tight text-[#031636]">When might an MVNO make sense for you?</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-700">These controls do not create a hidden score or name a universal winner. They only show providers that match the choices you can see.</p>
              </div>
              <button type="button" onClick={resetFilters} className="min-h-11 self-start border border-[#166534] bg-white px-4 text-sm font-black text-[#166534] hover:bg-[#f6fbf5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#166534] lg:self-auto">
                Reset choices
              </button>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <label className="text-sm font-black text-[#031636]">
                Existing bank relationship
                <select value={bankChoice} onChange={(event) => setBankChoice(event.target.value as BankChoice)} className="mt-2 min-h-12 w-full border border-slate-400 bg-white px-3 font-semibold text-slate-800 focus:border-[#166534] focus:outline-none focus:ring-2 focus:ring-[#a0f399]">
                  {bankOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="text-sm font-black text-[#031636]">
                Main reason for switching
                <select value={needChoice} onChange={(event) => setNeedChoice(event.target.value as NeedChoice)} className="mt-2 min-h-12 w-full border border-slate-400 bg-white px-3 font-semibold text-slate-800 focus:border-[#166534] focus:outline-none focus:ring-2 focus:ring-[#a0f399]">
                  {needOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="text-sm font-black text-[#031636]">
                Commitment preference
                <select value={commitmentChoice} onChange={(event) => setCommitmentChoice(event.target.value as CommitmentChoice)} className="mt-2 min-h-12 w-full border border-slate-400 bg-white px-3 font-semibold text-slate-800 focus:border-[#166534] focus:outline-none focus:ring-2 focus:ring-[#a0f399]">
                  {commitmentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            </div>

            <p className="mt-5 text-sm font-bold text-slate-700" role="status" aria-live="polite">
              Showing {filteredProfiles.length} of {mvnoProviderProfiles.length} providers. Public providers remain visible when you select a bank because they do not require you to open another bank account.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="profiles-title">
          <div className="max-w-3xl">
            <h2 id="profiles-title" className="text-3xl font-black tracking-tight text-[#031636] sm:text-4xl">Provider fit and benefits</h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-700">Every profile uses the same five decision labels. Conditional rewards and dated promotions are identified beside the claim and excluded from ordinary tariff rankings.</p>
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="mt-8 border-l-4 border-amber-500 bg-amber-50 p-6" role="status">
              <h3 className="text-lg font-black text-amber-950">No provider matches all three choices</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-amber-900">Try a broader commitment preference or reset the chooser. This does not mean the providers have no other products outside DataCost’s current tracker sample.</p>
              <button type="button" onClick={resetFilters} className="mt-4 min-h-11 border border-amber-800 bg-white px-4 text-sm font-black text-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-800">Reset choices</button>
            </div>
          ) : (
            <div className="mt-8 grid gap-7 lg:grid-cols-2">
              {filteredProfiles.map((profile) => {
                const offers = getProfileOffers(profile);
                const prices = offers.map((offer) => offer.priceZar);
                const minPrice = prices.length > 0 ? Math.min(...prices) : null;
                const maxPrice = prices.length > 0 ? Math.max(...prices) : null;
                const profileOnceOff = offers.filter((offer) => offer.commitment?.kind === 'once_off').length;
                const profileMonthly = offers.filter((offer) => offer.commitment?.kind === 'month_to_month').length;
                const profileUnconfirmed = offers.filter((offer) => offer.commitment?.kind === 'not_confirmed').length;
                const paymentLabels = [...new Set(offers.map((offer) => formatPaymentModel(offer.paymentModel)))];
                return (
                  <article key={profile.id} data-mvno-provider={profile.id} className="border-t-4 border-[#031636] bg-white shadow-[0_14px_34px_rgba(3,22,54,0.08)]">
                    <div className="border-b border-slate-200 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#166534]">{profile.accessLabel}</p>
                          <h3 className="mt-2 text-2xl font-black tracking-tight text-[#031636]">{profile.name}</h3>
                        </div>
                        <span className="bg-[#031636] px-3 py-2 text-xs font-black text-white">MVNO</span>
                      </div>
                      <div className="mt-5 border-l-4 border-[#a0f399] bg-[#f6fbf5] p-4">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#166534]">Current tracker sample</p>
                        <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
                          {offers.length} row{offers.length === 1 ? '' : 's'}
                          {minPrice !== null && maxPrice !== null ? ` · ${formatRand(minPrice)}${maxPrice === minPrice ? '' : `–${formatRand(maxPrice)}`}` : ''}
                          {' · '}{profileOnceOff} once-off · {profileMonthly} month-to-month
                          {profileUnconfirmed > 0 ? ` · ${profileUnconfirmed} commitment not confirmed` : ''}
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">Payment: {paymentLabels.join(' · ')}</p>
                      </div>
                    </div>

                    <dl className="divide-y divide-slate-200 px-6">
                      {decisionRows.map((row) => (
                        <div key={row.label} className="grid gap-2 py-4 sm:grid-cols-[118px_minmax(0,1fr)]">
                          <dt className="text-sm font-black text-[#031636]">{row.label}</dt>
                          <dd className="text-sm font-medium leading-6 text-slate-700">{profile[row.key]}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="border-y border-slate-200 bg-slate-50 p-6">
                      <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#031636]">Benefit check</h4>
                      <ul className="mt-4 space-y-4">
                        {profile.benefits.map((benefit) => (
                          <li key={`${profile.id}-${benefit.title}`} className="text-sm">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider ${benefitClasses[benefit.kind]}`}>{benefitLabels[benefit.kind]}</span>
                              {benefit.validThrough ? <span className="text-xs font-bold text-slate-500">Ends {benefit.validThrough}</span> : null}
                            </div>
                            <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                              <div>
                                <p className="font-black text-slate-900">{benefit.title}</p>
                                <p className="mt-1 font-medium leading-6 text-slate-700">{benefit.detail}</p>
                                {benefit.eligibility ? <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">Condition: {benefit.eligibility}</p> : null}
                              </div>
                              <a href={benefit.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-1 font-black text-[#166534] underline decoration-[#a0f399] decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#166534]" aria-label={`Open official source for ${benefit.title} in a new tab`}>
                                Source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6">
                      <div className="border-l-4 border-amber-500 bg-amber-50 p-4">
                        <h4 className="text-sm font-black text-amber-950">Watch out</h4>
                        <p className="mt-2 text-sm font-medium leading-6 text-amber-950">{profile.watchOut}</p>
                        {profile.watchOutSource ? (
                          <a href={profile.watchOutSource.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-1 font-black text-amber-950 underline decoration-amber-600 decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-900" aria-label={`Open official terms for ${profile.name} watch-out in a new tab`}>
                            Official terms <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        ) : null}
                      </div>
                      <p className="mt-4 text-xs font-semibold text-slate-500">Benefits checked {MVNO_REVIEWED_AT}. Prices are maintained separately in the monthly tracker.</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="border-y border-[#cad7c8] bg-white" aria-labelledby="reward-math-title">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#166534]"><Landmark className="h-4 w-4" aria-hidden="true" /> Bank-linked value</div>
              <h2 id="reward-math-title" className="mt-2 text-3xl font-black tracking-tight text-[#031636]">How to test whether the reward really saves money</h2>
              <ol className="mt-6 space-y-4">
                {[
                  'Compare the ordinary mobile price before rewards or bonus data.',
                  'Check whether your existing bank account and reward level qualify.',
                  'Add any extra bank, card, programme or device fee needed to unlock the benefit.',
                  'Value airtime or data only if you will use it before expiry and for an allowed purpose.',
                  'Recalculate whenever the bank account, reward rules or mobile plan changes.'
                ].map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-slate-700"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff9dc] text-xs font-black text-[#14532d]">{index + 1}</span>{item}</li>
                ))}
              </ol>
            </div>
            <aside className="bg-[#031636] p-6 text-white" aria-labelledby="never-count-title">
              <h3 id="never-count-title" className="text-xl font-black">Never count these automatically</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-slate-200">
                {[
                  'An “up to” reward at its maximum rate',
                  'Reward airtime as though it were cash',
                  'Conditional bonus data in base R/GB',
                  'A bank benefit without its account fee',
                  'A promotion after its stated end date'
                ].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#a0f399]" aria-hidden="true" />{item}</li>)}
              </ul>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="use-case-title">
          <h2 id="use-case-title" className="text-3xl font-black tracking-tight text-[#031636]">A practical shortlist by use case</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Smartphone, title: 'Data-only or backup SIM', text: 'Start with AirMobile’s public data-only option, then compare its current tracked price and your actual device support.' },
              { icon: PhoneCall, title: 'Many calls each month', text: 'Compare Melon and Nedbank preset voice plans, then read the fair-use rule before treating “unlimited” as unrestricted.' },
              { icon: Users, title: 'Several people or devices', text: 'Melon’s multi-line controls and Standard Bank Connect’s sharing features may reduce admin for a family account.' },
              { icon: ShieldCheck, title: 'Strict spend control', text: 'Once-off prepaid rows and hard-cap services are the safer starting point when avoiding surprise spend matters most.' }
            ].map((item) => (
              <article key={item.title} className="border-t-2 border-[#166534] pt-5">
                <item.icon className="h-6 w-6 text-[#166534]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-[#031636]">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#cad7c8] bg-[#eaf2e8]" aria-labelledby="coverage-title">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <h2 id="coverage-title" className="text-3xl font-black tracking-tight text-[#031636]">MVNO does not mean identical network experience</h2>
                <p className="mt-4 text-base font-medium leading-7 text-slate-700">An MVNO sells service under its own brand while using another operator’s radio infrastructure. That relationship is useful context, but it is not a promise of identical coverage, speed, priority, roaming, APN behaviour or support.</p>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">Check the MVNO’s own coverage page for home, work and commute locations, test with a prepaid or month-to-month option where practical, and do not port an essential number until the service works for you.</p>
              </div>
              <div className="border-l-4 border-[#166534] bg-white p-6">
                <h3 className="text-lg font-black text-[#031636]">What DataCost records</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-700">Provider type and host-network relationships are kept as dated, sourced facts. If an official current source is not clear enough, the relationship remains marked as unconfirmed rather than inferred.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-3xl font-black tracking-tight text-[#031636]">Common MVNO questions</h2>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-300 bg-white px-6">
            {faqs.map((faq) => (
              <article key={faq.question} className="py-6">
                <h3 className="text-lg font-black text-[#031636]">{faq.question}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-labelledby="continue-title">
          <div className="border-t border-slate-300 pt-10">
            <h2 id="continue-title" className="text-2xl font-black tracking-tight text-[#031636]">Continue comparing</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/best-data-deals-south-africa/" className="flex min-h-12 items-center justify-between gap-3 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Monthly deal tracker <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/guides/best-sim-only-deals-south-africa/" className="flex min-h-12 items-center justify-between gap-3 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">SIM-only guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/guides/buy-data-with-bank-apps-south-africa/" className="flex min-h-12 items-center justify-between gap-3 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Buy with bank apps <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/methodology/" className="flex min-h-12 items-center justify-between gap-3 border border-slate-300 bg-white p-4 font-bold text-[#031636] hover:border-[#166534]">Methodology <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="mb-6 flex items-start gap-3 border border-slate-300 bg-white p-5 text-sm font-medium leading-6 text-slate-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#166534]" aria-hidden="true" />
            <p><strong>Independent editorial guide:</strong> DataCost is not an MVNO, bank or mobile operator. Benefits can change before the next review; use the linked official source and final checkout before joining.</p>
          </div>
          <AuthorReviewBlock lastReviewed={reviewedDisplay} />
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
};
