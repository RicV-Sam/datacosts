import type { Guide, GuideOfficialSource } from '../types';

const source = (label: string, href: string, note: string): GuideOfficialSource => ({ label, href, note });
const link = (slug: string, label: string, description: string) => ({ href: `/guides/${slug}/`, label, description, action: 'route' as const });
const gazette = source('ICASA: gazetted 2025 amendments', 'https://www.icasa.org.za/uploads/files/End-user-and-subscriber-Service-Charter-Amendment-Regulations-2025.pdf', 'Gazette 53991, 23 January 2026; regulations on PDF pages 1–5, particularly substituted regulation 8A and commencement clause 6.');
const currentRights = source('ICASA: 2019 implementation statement', 'https://www.icasa.org.za/news/2019/amendments-to-the-end-user-and-subscriber-service-charter-regulations', 'Confirms the earlier consumer-protection regime and out-of-bundle opt-in/opt-out.');
const complaints = source('ICASA: consumer complaints procedure', 'https://www.icasa.org.za/pages/consumer-complaints-procedure', 'Provider reference, 14 working days, unsatisfactory responses and complaints outside ICASA’s mandate.');
const lte = source('Vodacom: Home Prepaid LTE terms', 'https://www.vodacom.co.za/vodacom/terms/home-prepaid-lte', 'Price-plan eligibility, bundle purchase, migration, validity extension and new-SIM incoming-service restriction.');
const esim = source('Vodacom: eSIM terms', 'https://www.vodacom.co.za/vodacom/terms/esim', 'Activation, RICA, swap validation, QR handling and internet connection requirements.');
const esimHelp = source('Vodacom: eSIM setup and FAQ', 'https://www.vodacom.co.za/vodacom/shopping/esim', 'Prepaid till-slip QR, domestic activation, device changes and QR recovery.');
const rica = source('Vodacom: RICA help', 'https://www.vodacom.co.za/vodacom/help/rica', 'Approved registration channels and identity-document requirements; address evidence varies by registration type.');
const superData = source('MTN: Super Data terms', 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-super-data', 'Product-specific no-carry-over/no-sharing and migration forfeiture rules.');
const bozza = source('MTN: BozzaGigs LTE terms', 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-bozzagigs-lte-terms-and-conditions', 'Clauses 3, 4 and 5; less-than-30-day eligibility, split allocations, channel-specific R49 bundle and migration consequences.');

// These are consumer tasks missing from the existing catalogue, not replacement hubs.
// Each guide deliberately omits prices or nationwide procedures that were not verified.
export const discoveryGuides: Guide[] = ([
  {
    slug: 'icasa-data-rollover-rules-south-africa',
    title: 'ICASA Data Rollover Rules: Current Rights and the 2027 Amendments',
    h1: 'ICASA data rollover rules: what changes in 2027?',
    metaDescription: 'Separate existing out-of-bundle rights from ICASA’s gazetted January 2027 rollover changes, exclusions and unresolved legal-status checks.',
    intro: 'Out-of-bundle consent is already part of South Africa’s consumer-protection rules. A separate amendment, gazetted on 23 January 2026, sets out stronger bundle rules with commencement twelve months later. Do not assume those future rules are operating on your SIM today.',
    quickSummaryItems: [
      'The gazette points to 23 January 2027. This is the published timetable, not a guarantee against a later amendment or court order.',
      'Rollover does not mean data will never expire. Bundles lasting seven days or less, uncapped bundles, free bundles and promotional bundles are excluded from the new rollover provision.',
      'Check the expiry and rollover conditions of your actual product before deciding to recharge or change networks.'
    ],
    stepsTitle: 'Read the two regimes separately',
    steps: [
      { title: 'Rights that already exist', description: 'ICASA’s earlier rules address data-usage notifications, out-of-bundle consent, and options to roll over or transfer data. A rollover option is different from the automatic, free rollover described in the newer amendment. Use the current out-of-bundle guide if airtime is being charged unexpectedly.' },
      { title: 'What the new gazette says', description: 'Substituted regulation 8A requires earliest-expiring bundles to be used first; unused eligible bundles to roll over at least once automatically, without a fee, while the number remains active; and transfer options within the same licensee. It also covers 50%, 80% and 100% depletion alerts, out-of-bundle consent, and an extension when a licensee fault prevents use.' },
      { title: 'Exceptions matter', description: 'Rollover excludes bundles lasting seven days or less and uncapped, free or promotional bundles. Transfer excludes uncapped, free or promotional bundles. The new text does not promise permanent validity, cross-network transfer, or cheaper tariffs.' },
      { title: 'Legal-status boundary', description: 'Checked 12 October 2026: the published commencement clause was read. ICASA’s 14 August statement acknowledges substantive issues under dispute. We have not verified a current court order or the outcome of any challenge, so cannot certify that the timetable is unchanged by litigation. Recheck ICASA’s latest notices before relying on the future date.' },
      { title: 'What to do with a bundle today', description: 'Save the provider’s stated expiry, any repurchase deadline, and the terms for your exact product. Do not allow a bundle to expire because you expect future automatic rollover. Keep usage and complaint records if the provider’s billing differs from your consent or its published terms.' }
    ],
    faq: [
      { question: 'Will all data stop expiring in January 2027?', answer: 'The gazetted amendment does not say that. It provides at least one rollover for eligible unused bundles, with exclusions, and keeps the original terms applicable to the rolled-over bundle.' },
      { question: 'Must I wait until 2027 to refuse out-of-bundle charges?', answer: 'No. Out-of-bundle data consent protections predate the 2027 amendment. Check your current consent setting and challenge unexpected charges with evidence.' }
    ],
    reviewDueDate: '2027-01-10',
    sourceSummary: 'ICASA’s gazette and earlier implementation statement; future commencement and unresolved legal-status limits are stated separately. Official sources read 12 October 2026.',
    officialSources: [gazette, currentRights, source('ICASA: August 2026 clarification', 'https://www.icasa.org.za/news/2026/icasa-clarifies-its-position-on-the-end-user-and-subscriber-service-charter-amendment-regulations', 'Acknowledges disputed substantive issues; does not establish a final court outcome.')],
    nextSteps: [link('out-of-bundle-data-costs-south-africa', 'Protect airtime now', 'Current settings and a billing-evidence checklist.'), link('data-expiry-rollover-south-africa', 'Compare expiry rules by product', 'Non-expiry, repurchase-based extension and daily forfeiture.')]
  },
  {
    slug: 'port-number-south-africa',
    title: 'Port Your Mobile Number in South Africa: A Switching Checklist',
    h1: 'How to port your mobile number in South Africa',
    metaDescription: 'Keep your number when switching networks. Check contract settlement, new-SIM registration, lost balances, approval and failed-port recovery.',
    intro: 'Start with the provider you want to join and keep your existing number active until the move is arranged. Porting moves the number; it does not automatically settle your old contract, device debt or unused benefits.',
    stepsTitle: 'Before, during and after the move',
    steps: [
      { title: '1. Check the new service first', description: 'Confirm coverage where you use the phone, the chosen tariff’s eligibility, SIM or eSIM support and the total joining cost. Ask the receiving provider for its current porting instructions and expected timing. A SIM swap within one provider is a different process.' },
      { title: '2. Obtain a written settlement figure', description: 'ICASA warns that porting does not necessarily cancel the old contract. Ask the old provider about notice, device repayments, final bills and keeping the number available to port. Do not ask it to disconnect the number before the receiving provider confirms the sequence.' },
      { title: '3. Prepare the receiving SIM', description: 'Arrange the receiving provider’s SIM or eSIM and complete its registration requirements. Keep the old SIM available to receive approval messages. Initiate only a move you requested through the provider’s official channel; do not give a caller an unsolicited porting OTP.' },
      { title: '4. Budget for benefits you lose', description: 'ICASA’s mobile guide says old free services and accumulated unused minutes or SMSs do not follow the number. Ask separately about your airtime and data balances rather than assuming they transfer. Use remaining benefits before porting where practical.' },
      { title: '5. One verified prepaid route: joining Vodacom', description: 'Vodacom says to use your existing SIM to SMS “portme” followed by the new Vodacom prepaid SIM card number to 0827678287, then wait for confirmation. Its current help page describes weekday processing, excluding public holidays, between 19:30 and 23:30 after approval. This timing and SMS route are specific to Vodacom, not a national promise.' },
      { title: '6. Check service and recover a failed port', description: 'Follow the receiving provider’s activation message, then test incoming calls, SMS and data. If the port fails, ask for the exact rejection reason and reference before repeating it. Keep the request, confirmations and responses; unresolved portability complaints can use ICASA’s complaint procedure.' }
    ],
    faq: [
      { question: 'Is porting always free?', answer: 'ICASA’s mobile guide says the outgoing provider cannot charge for moving the number, but the receiving provider may charge a porting fee. SIM, delivery and contract settlement are separate costs. Confirm the receiving provider’s current quote.' },
      { question: 'Can I keep my number while still under contract?', answer: 'Porting can be possible, but the old contract may still require payment. Obtain written settlement and notice instructions before proceeding.' }
    ],
    sourceSummary: 'ICASA’s mobile guide is an older document, used for enduring contract and benefit principles; timing and the worked prepaid route come from current Vodacom help. Read 12 October 2026.',
    officialSources: [source('ICASA: mobile portability consumer guide', 'https://www.icasa.org.za/uploads/files/Mobile-Number-Portability-Consumer-Guide.pdf', 'Older guide; historical contact numbers and universal timing are not reproduced.'), source('Vodacom: switch and porting help', 'https://www.vodacom.co.za/vodacom/help/switch-to-vodacom', 'Current prepaid SMS route and approval-window wording.'), source('ICASA: SIM-swap and porting fraud warning', 'https://www.icasa.org.za/uploads/files/The-Focus-Volume-4_-Issue-no.3.pdf', 'December 2024 consumer-request and approval safeguards.')],
    nextSteps: [link('cellphone-retention-offer-vs-switching-south-africa', 'Compare the full switching cost', 'Include settlement and promotional prices.'), link('mobile-complaints-icasa-south-africa', 'Escalate an unresolved port', 'Provider reference and regulator procedure.')]
  },
  {
    slug: 'vodacom-prepaid-esim-setup',
    title: 'Vodacom Prepaid eSIM Setup and SIM Swap: What to Check',
    h1: 'Vodacom prepaid eSIM setup and SIM swaps',
    metaDescription: 'Set up a Vodacom prepaid eSIM: check compatibility, RICA, the till-slip QR code, swap approval, device changes and lost-code recovery.',
    intro: 'Vodacom’s current prepaid route uses an eSIM QR code printed on a till slip. New activation and moving an existing number onto eSIM follow different approval steps. Check the exact device and store quote before buying.',
    stepsTitle: 'Choose the right activation path',
    steps: [
      { title: 'Check compatibility and get connected', description: 'Confirm eSIM support for your exact phone model and software with the manufacturer and Vodacom. Update the phone, and use a reliable internet connection for profile download. Vodacom’s shopping FAQ requires activation within South Africa.' },
      { title: 'New prepaid number: register before scanning', description: 'Buy through a Vodacom branded store and retain the printed QR slip. Complete RICA before scanning. Vodacom’s RICA help lists a South African ID for citizens or a valid passport for foreign nationals; address evidence can depend on registration type. Use its official help page to reach an approved registration channel.' },
      { title: 'Existing number: finish the swap first', description: 'Tell the agent you want a physical-SIM-to-eSIM swap. The number must be active and able to receive SMS. Vodacom validates the request and sends a confirmation code to that number; its terms say agents cannot view that code and you must not share it. Scan only after the swap has completed.' },
      { title: 'Install and test', description: 'Use the phone’s built-in SIM or mobile-network settings to add the provider’s QR profile, then follow the device prompts. Select the intended line for data if using two SIMs. Test incoming SMS, calls and data before relying on the new setup.' },
      { title: 'Changing phones or losing the QR slip', description: 'Vodacom’s current FAQ says a device move requires a SIM swap; do not assume phone-to-phone self-service transfer is supported. A lost prepaid QR slip cannot be reprinted under the terms: a replacement eSIM purchase may be needed. Ask support before deleting a working profile or trying a QR on another phone.' },
      { title: 'Keep provider rules separate', description: 'This is a Vodacom prepaid guide. Contract and Top Up QR delivery uses email, and other providers have their own fees and transfer processes. Current store charges have not been independently confirmed here; ask for the new-activation or swap price before paying.' }
    ],
    faq: [
      { question: 'Does an eSIM avoid RICA?', answer: 'No. A new Vodacom eSIM must complete RICA before the QR profile is scanned.' },
      { question: 'Is this the same as porting?', answer: 'No. A SIM swap changes the SIM serving an existing Vodacom line. Porting moves a number between providers.' }
    ],
    sourceSummary: 'Vodacom activation terms, shopping FAQ and RICA help read 12 October 2026. No handset compatibility list or current store fee is assumed.',
    officialSources: [esim, esimHelp, rica],
    nextSteps: [link('port-number-south-africa', 'Switch providers while keeping a number', 'A port is different from an eSIM swap.'), { href: '/travel-sims-south-africa/', label: 'Visitor SIM and travel eSIM choices', description: 'Compare the separate travel use case.', action: 'route' }]
  },
  {
    slug: 'vodacom-prepaid-lte-price-plan',
    title: 'Vodacom Prepaid LTE Price Plan: Eligibility and Activation Checks',
    h1: 'Vodacom Prepaid LTE: check the tariff before buying',
    metaDescription: 'Understand Vodacom Prepaid LTE eligibility, migration, bundle extension and the R10 new-SIM incoming-call and SMS activation condition.',
    intro: 'A Vodacom prepaid SIM is not automatically on the Prepaid LTE price plan. The official terms make its bundles tariff-specific, so check the line’s plan before using a headline LTE price as a quote for your SIM.',
    stepsTitle: 'Checks before buying or migrating',
    steps: [
      { title: 'Check the SIM’s tariff and device separately', description: 'The Prepaid LTE starter pack defaults to this plan. Migration is allowed where the current prepaid plan permits a free change. Ask Vodacom to confirm your line’s migration eligibility and the correct action; the terms do not supply a universal self-service migration code. Device compatibility and coverage are separate checks; the reviewed terms do not impose a router-only device requirement.' },
      { title: 'Purchase on the qualifying line', description: 'Vodacom names *123# and the VodaPay Buy Data journey for Prepaid LTE bundles. Confirm the exact offer, final price, general-use allocation, night allocation and expiry. The Prepaid LTE night window is 00:00–05:00.' },
      { title: 'Read extension and migration rules', description: 'The terms allow an unexpired bundle’s validity to be extended by buying the same size and validity before expiry. They also say LTE data and other open-market bundles are retained on a permitted change out to another prepaid plan. Do not apply MTN’s separate Super Data forfeiture rules to Vodacom.' },
      { title: 'New SIM cannot receive an OTP?', description: 'Clauses 19–22 restrict incoming calls and SMS from outside Vodacom’s own network communications until at least R10 in airtime or equivalent direct bundle purchases has accumulated. Smaller purchases count towards the threshold. This is a once-off incoming-service activation condition for new customers, not a stated minimum price for every later data purchase and not proof of why browsing fails.' },
      { title: 'Check the network-side balance', description: 'Use *135# or VodaPay to verify the bundle on the correct number. Keep the SIM number, tariff and recharge confirmation; a router’s local usage counter is not the provider’s billing balance. If browsing still fails, work through SIM, APN, device and coverage checks.' }
    ],
    faq: [
      { question: 'Does R10 guarantee my router will connect?', answer: 'No. The threshold in these terms removes a new-SIM incoming-call and SMS restriction. It does not guarantee signal, the right APN, device compatibility or a working data bundle.' },
      { question: 'Is every Vodacom LTE bundle available on ordinary prepaid?', answer: 'The Prepaid LTE bundle family requires its own price plan. Confirm the tariff on the specific line before purchasing.' }
    ],
    sourceSummary: 'Vodacom Home Prepaid LTE terms read 12 October 2026. This explains product rules and does not refresh the monthly price snapshot.',
    officialSources: [lte],
    nextSteps: [{ href: '/best-10gb-data-deals-south-africa/', label: 'Compare 10GB-class offers', description: 'Keep anytime and night amounts separate.', action: 'route' }, link('check-router-sim-data-balance-and-recharge', 'Manage a router SIM', 'Confirm the provider balance and remote recharge access.')]
  },
  {
    slug: 'data-expiry-rollover-south-africa',
    title: 'Data Expiry and Rollover South Africa: Compare Product Rules',
    h1: 'Non-expiry data, rollover and daily allocations compared',
    metaDescription: 'Compare Capitec non-expiry choices, AirMobile calendar rollover, Vodacom repurchase extensions and daily-release forfeiture by exact product.',
    intro: 'Long validity, automatic rollover and an extension triggered by another purchase are different promises. Compare the product’s deadline and conditions before dividing its price by the advertised GB.',
    stepsTitle: 'Product examples checked on 12 October 2026',
    steps: [
      { title: 'Capitec: no-expiry and expiring bundles coexist', description: 'The public catalogue lists no-expiry data separately from 1-, 7-, 30- and 60-day bundles. “Capitec data never expires” is too broad: the R150/10GB base bundle sits in the 30-day family. Linked-number extras are conditional and should not replace the base allowance in a comparison.' },
      { title: 'AirMobile: a calendar deadline, not a fixed 60 days', description: 'AirMobile Monthly allocations run from the first day of the month through the end of the following month; rollover does not exceed 31 days. Paid data top-ups expire at the end of the month after allocation. A mid-month top-up therefore has a different duration from one bought on the first day.' },
      { title: 'Vodacom Prepaid LTE: buy again before expiry', description: 'This product’s terms allow extension by buying another bundle of the same size and validity before the first expires. That requires spending again. Do not assume the standalone Night Owl family has the same rule: its terms prohibit carry-over, transfer and roaming.' },
      { title: 'MTN Super Data: do not assume carry-over', description: 'Super Data’s terms prohibit data sharing and carry-over. Leaving the price plan also forfeits unused, unexpired Super Data and voice bundles. Confirm the exact tariff before changing plans to save money.' },
      { title: 'Cell C: check the family and the conflicting wording', description: 'The 30-day bundle PDF describes extension when another bundle is purchased before expiry. It permits inclusive-data transfer in main clause 16 but prohibits user-to-user transfer in General clause 6; get product-specific confirmation before relying on a transfer. Daily/Daily Nite and Day-by-Day allocations instead forfeit unused daily data. These are separate products.' },
      { title: 'What a comparison should measure', description: 'Record the base anytime amount, expiry timestamp, repurchase requirement, inactivity rule and any charge needed to keep the service active. Work out how much you will actually use before expiry. This is a set of verified examples, not a complete all-network tariff or transfer-fee matrix.' }
    ],
    faq: [
      { question: 'Is non-expiry always cheaper?', answer: 'No. It can avoid wasting an unused balance, but a shorter bundle can cost less for the amount you actually use. Compare total spend and usable data over the same period.' },
      { question: 'Does transferring data restart its validity?', answer: 'Do not assume it does. Check the exact transfer product, eligibility, fee and the recipient’s expiry before confirming.' }
    ],
    sourceSummary: 'Current public product pages and terms read 12 October 2026. Conflicting Cell C transfer wording is retained as uncertainty; no unsupported long-validity prices are imported.',
    officialSources: [source('Capitec: bundle catalogue', 'https://www.capitecbank.co.za/personal/connect/capitec-bundles/', 'Separate non-expiry, 30-day and 60-day families.'), source('AirMobile: monthly validity FAQ', 'https://www.afrihost.com/airmobile/monthly', 'Calendar-month allocation and paid top-up expiry.'), lte, superData, source('Vodacom: standalone Night Owl terms', 'https://www.vodacom.co.za/vodacom/terms/night-owl-bundles', 'No carry-over, transfer or roaming.'), source('Cell C: 30-day data terms', 'https://www.cellc.co.za/cellc/static-content/PDF/30-day-bundle-tnc.pdf', 'Repurchase extension; main clause 16 conflicts with General clause 6 on transfer.'), source('Cell C: Day-by-Day FAQ', 'https://www.cellc.co.za/cellc/static-content/PDF/Day-By-Day_Data_Bundles_FAQ_Web.pdf', 'Daily forfeiture and one active weekly or monthly type.')],
    nextSteps: [{ href: '/tools/usable-data-cost-calculator/', label: 'Estimate cost per GB actually used', description: 'Keep daily and night allowances separate.', action: 'route' }, link('icasa-data-rollover-rules-south-africa', 'Read the future rollover amendment', 'Current product rules and future regulations are separate.')]
  },
  {
    slug: 'mobile-complaints-icasa-south-africa',
    title: 'Mobile Complaints South Africa: Provider, ICASA or WASPA?',
    h1: 'How to escalate an unresolved mobile complaint',
    metaDescription: 'Get a provider reference, build a billing or porting evidence pack and check ICASA’s 14-working-day procedure and WASPA’s separate role.',
    intro: 'Complain to the provider first and obtain a reference. ICASA can handle licensed-provider billing, service and portability complaints, but content subscriptions and contract disputes can need a different route.',
    stepsTitle: 'Build a complaint that can be investigated',
    steps: [
      { title: '1. Describe the exact problem', description: 'Record the affected number, dates, bundle or tariff, disputed charge, purchase receipt and the outcome you want. Attach balance or usage evidence and the relevant terms. Send personal account details only through the provider’s or regulator’s official complaint channel.' },
      { title: '2. Obtain the provider’s reference', description: 'ICASA requires a complaint to the provider first, with a reference number. Save the original complaint, replies, cancellation confirmations and the promised resolution date. Ask the provider to issue a reference if none was supplied.' },
      { title: '3. Follow the escalation condition', description: 'ICASA’s procedure says to allow the provider 14 working days to resolve the complaint, then escalate if unresolved; it also permits referral when the provider’s response is unsatisfactory. Working days are not fourteen calendar days. Put the complaint in writing and use the form linked from ICASA’s official procedure page.' },
      { title: '4. Pick the right recipient', description: 'ICASA lists data, voice and roaming billing, coverage and mobile-number portability within its telecommunications complaints. It directs content-service billing, SMS spam and WASP issues to WASPA, and contract terms, faulty handsets or misleading advertising to the National Consumer Commission. Check the current official destination for your specific issue.' },
      { title: '5. Unwanted paid content', description: 'Identify and cancel the service through the operator, retaining proof. WASPA offers an unwanted-billing report and a separate formal complaints process for member conduct. Reporting does not guarantee a refund, a result or a fixed resolution time.' },
      { title: '6. Follow up with the same evidence', description: 'Keep the escalation receipt and reference with the provider record. Record each response and any new charge after cancellation. State what remains unresolved rather than opening several inconsistent versions of the complaint.' }
    ],
    faq: [
      { question: 'Can I go directly to ICASA?', answer: 'Its procedure requires you to complain to the service provider and obtain a reference first. It sets a 14-working-day resolution period and also addresses an unsatisfactory provider response.' },
      { question: 'Will ICASA refund a WASP subscription?', answer: 'Its procedure directs content-services billing and WASP issues to WASPA. Choose the correct route and keep evidence; this guide promises no refund.' }
    ],
    sourceSummary: 'ICASA complaint procedure and WASPA consumer support read 12 October 2026. No complaint is submitted by DataCost.',
    officialSources: [complaints, source('WASPA: consumer support', 'https://waspa.org.za/consumer-support/', 'Unwanted billing, member scope and formal complaints are distinct routes.')],
    nextSteps: [link('out-of-bundle-data-costs-south-africa', 'Check unexpected data charges', 'Consent, expiry and billing evidence.'), { href: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Cancel unwanted subscriptions', description: 'Use the operator-specific cancellation routes.', action: 'route' }]
  },
  {
    slug: 'mtn-bozzagigs-eligibility',
    title: 'MTN BozzaGigs LTE: Eligibility, Split Data and Purchase Channels',
    h1: 'MTN BozzaGigs LTE: who can use the offer?',
    metaDescription: 'Check BozzaGigs LTE’s new-customer restriction, 30-day migration window, night data, selected-channel offer and lost tariff benefits.',
    intro: 'BozzaGigs LTE is a tariff for new MTN prepaid customers, rather than an offer every existing MTN number can activate. Its headline data combines anytime and Night Express allowances.',
    stepsTitle: 'Use the terms before the headline price',
    steps: [
      { title: 'Check the activation date', description: 'The published terms require a new prepaid customer active for less than 30 days. A qualifying starter pack must be RICA registered and activated, then migrated within that window. Existing customers active for more than 30 days cannot migrate under those terms.' },
      { title: 'Confirm migration and what you surrender', description: 'The terms name *137#, an MTN branded store or customer service on 135 as migration routes. Entering BozzaGigs forfeits Bundle Bonanza Recharge and Get or other previous tariff benefits. Check the live menu before making the change.' },
      { title: 'Separate the two data wallets', description: 'The published table includes 20GB at R149 for 30 days, split into 10GB anytime and 10GB Night Express. The night portion is usable from 00:01–04:59. This is a checked published tariff, not proof that the same quote appears in every purchase channel on your line.' },
      { title: 'R49 does not identify one universal bundle', description: 'The table lists a 4GB R49 bundle and a newer selected-channel 6GB R49 bundle, each for 14 days. The newer bundle splits 3GB anytime and 3GB night; its listed channels exclude banks. Verify the channel and allocation before paying.' },
      { title: 'Expiry, sharing and incoming-service activation', description: 'The terms allow extension by buying another BozzaGigs bundle before the old one expires and prohibit data sharing. They also require newly activated prepaid customers to reach R10 through airtime or bundle purchases for incoming non-MTN calls and SMS. Confirm activation separately if an OTP is missing.' }
    ],
    faq: [
      { question: 'Can an old MTN prepaid number switch to BozzaGigs?', answer: 'The published LTE terms restrict migration to new prepaid customers active for less than 30 days. Do not assume the offer is available on an older line.' },
      { question: 'Is 20GB all available during the day?', answer: 'No. The published 20GB bundle has 10GB anytime plus 10GB Night Express.' }
    ],
    sourceSummary: 'Current MTN BozzaGigs LTE terms read 12 October 2026, including the 23 January 2026 activation amendment. This is distinct from old router promotions; no tracker price history is changed.',
    officialSources: [bozza],
    nextSteps: [{ href: '/tools/usable-data-cost-calculator/', label: 'Calculate value for your usage', description: 'Exclude night data you will not use.', action: 'route' }, { href: '/network/mtn/', label: 'MTN network page', description: 'Other public and personalised products have different rules.', action: 'route' }]
  }
] satisfies Omit<Guide, 'comparisonType'>[]).map((guide) => ({ ...guide, nextStepsTitle: 'Useful next steps', nextStepsIntro: 'Use the relevant checklist or calculator below to continue with your decision.', comparisonType: 'all' as const, publishedAt: '2026-10-12', lastReviewedAt: '2026-10-12' }));
