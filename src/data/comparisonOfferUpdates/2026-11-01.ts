import type { MonthlyDataDealOffer } from '../monthlyDeals/types';

// INACTIVE candidate. The six October shadow overrides are incorporated into the
// November snapshot; this module holds fourteen additional offers and four
// independently checked base-catalogue references. Never activate via a date glob.
export const november2026ComparisonOffers: MonthlyDataDealOffer[] = [
  {
    "id": "mtn-monthly-2-plus-2-2026-11",
    "providerId": "mtn",
    "providerName": "MTN",
    "offerName": "Monthly 2GB Anytime + 2GB Night Express",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "4GB total: 2GB anytime + 2GB Night Express",
    "priceZar": 155,
    "allocation": {
      "anytimeGb": 2,
      "nightGb": 2,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "mixed",
      "note": "Available to PayAsYouGo and postpaid customers; confirm purchase and billing terms."
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "provider_customer",
    "purchaseChannels": [
      "*136*2*999#",
      "MTN app",
      "MTN Chat",
      "participating retailers and banks"
    ],
    "eligibility": "Available to MTN PayAsYouGo and postpaid customers. Select the once-off option; a recurring option also exists.",
    "importantNotes": [
      "The current Internet Bundles terms list the exact monthly amount and price; select the once-off variant because a recurring variant is also offered.",
      "Any Night Express allocation is separate from pooled anytime data. Internet terms give 23:59–05:00, but dedicated Night Express terms give 00:01–04:59; the source conflict remains.",
      "Once-off Internet Bundles do not renew automatically. Confirm the exact source window and eligible line before purchase."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles",
      "title": "MTN Internet Bundles terms",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "vodacom-prepaid-lte-2-plus-2-2026-11",
    "providerId": "vodacom",
    "providerName": "Vodacom",
    "offerName": "Prepaid LTE 2GB Anytime + 2GB Night Owl",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "4GB total: 2GB anytime + 2GB Night Owl",
    "priceZar": 49,
    "allocation": {
      "anytimeGb": 2,
      "nightGb": 2,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 14,
      "label": "14 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "prepaid_lte",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "*123#",
      "VodaPay app"
    ],
    "eligibility": "Requires the Vodacom Prepaid LTE price plan. The terms exclude Community Service and CST Management SIMs.",
    "importantNotes": [
      "The current Prepaid LTE table supports this exact once-off split-wallet product and validity; its prices include VAT.",
      "Night Owl is usable from 00:00 to 05:00, separately from the anytime allowance. A qualifying Prepaid LTE price plan is required; Community Service and CST Management SIMs are excluded.",
      "Do not conflate this with similarly priced monthly recurring, VodaPay-exclusive or streaming-bonus products in the general prepaid catalogue."
    ],
    "rankingStatus": "context_only",
    "rankingExclusionReason": "14-day LTE price-plan offer; excluded from monthly smartphone awards.",
    "source": {
      "url": "https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans",
      "title": "Vodacom prepaid plans and LTE pricing",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "airmobile-reviewed-2gb-2026-11-01",
    "providerId": "airmobile",
    "providerName": "AirMobile by Afrihost",
    "offerName": "2GB monthly plan",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "2GB anytime",
    "priceZar": 60,
    "allocation": {
      "anytimeGb": 2,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "monthly",
      "label": "Monthly allocation"
    },
    "billing": "recurring_monthly",
    "paymentModel": {
      "kind": "not_confirmed",
      "note": "The reviewed data-only catalogue confirms recurring monthly billing but does not formally classify these plans as prepaid, Top Up or postpaid."
    },
    "commitment": {
      "kind": "month_to_month"
    },
    "productType": "mobile_data",
    "accessTier": "public",
    "purchaseChannels": [
      "Afrihost website",
      "Afrihost app"
    ],
    "eligibility": "Open month-to-month service; a new AirMobile SIM or supported MTN SIM/APN setup is required.",
    "importantNotes": [
      "This is the monthly Data Only allocation, not the separately priced top-up product or a conditional free-data promotion.",
      "The public catalogue states month-to-month service. Monthly terms allow unused allocations to roll over for one additional calendar month; top-up and porting/APN conditions differ.",
      "When using Data Only via APN on an existing MTN SIM, the provider requires billable activity every 90 days to keep that SIM active."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.afrihost.com/airmobile/data-only/",
      "title": "Data Only | AirMobile | Afrihost",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "airmobile-reviewed-5gb-2026-11-01",
    "providerId": "airmobile",
    "providerName": "AirMobile by Afrihost",
    "offerName": "5GB monthly plan",
    "comparisonSizesGb": [
      5
    ],
    "advertisedDataLabel": "5GB anytime",
    "priceZar": 100,
    "allocation": {
      "anytimeGb": 5,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "monthly",
      "label": "Monthly allocation"
    },
    "billing": "recurring_monthly",
    "paymentModel": {
      "kind": "not_confirmed",
      "note": "The reviewed data-only catalogue confirms recurring monthly billing but does not formally classify these plans as prepaid, Top Up or postpaid."
    },
    "commitment": {
      "kind": "month_to_month"
    },
    "productType": "mobile_data",
    "accessTier": "public",
    "purchaseChannels": [
      "Afrihost website",
      "Afrihost app"
    ],
    "eligibility": "Open month-to-month service; a new AirMobile SIM or supported MTN SIM/APN setup is required.",
    "importantNotes": [
      "This is the monthly Data Only allocation, not the separately priced top-up product or a conditional free-data promotion.",
      "The public catalogue states month-to-month service. Monthly terms allow unused allocations to roll over for one additional calendar month; top-up and porting/APN conditions differ.",
      "When using Data Only via APN on an existing MTN SIM, the provider requires billable activity every 90 days to keep that SIM active."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.afrihost.com/airmobile/data-only/",
      "title": "Data Only | AirMobile | Afrihost",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "airmobile-reviewed-15gb-2026-11-01",
    "providerId": "airmobile",
    "providerName": "AirMobile by Afrihost",
    "offerName": "15GB monthly plan",
    "comparisonSizesGb": [
      15
    ],
    "advertisedDataLabel": "15GB anytime",
    "priceZar": 220,
    "allocation": {
      "anytimeGb": 15,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "monthly",
      "label": "Monthly allocation"
    },
    "billing": "recurring_monthly",
    "paymentModel": {
      "kind": "not_confirmed",
      "note": "The reviewed data-only catalogue confirms recurring monthly billing but does not formally classify these plans as prepaid, Top Up or postpaid."
    },
    "commitment": {
      "kind": "month_to_month"
    },
    "productType": "mobile_data",
    "accessTier": "public",
    "purchaseChannels": [
      "Afrihost website",
      "Afrihost app"
    ],
    "eligibility": "Open month-to-month service; a new AirMobile SIM or supported MTN SIM/APN setup is required.",
    "importantNotes": [
      "This is the monthly Data Only allocation, not the separately priced top-up product or a conditional free-data promotion.",
      "The public catalogue states month-to-month service. Monthly terms allow unused allocations to roll over for one additional calendar month; top-up and porting/APN conditions differ.",
      "When using Data Only via APN on an existing MTN SIM, the provider requires billable activity every 90 days to keep that SIM active."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.afrihost.com/airmobile/data-only/",
      "title": "Data Only | AirMobile | Afrihost",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "nedbank-connect-reviewed-2gb-2026-11-01",
    "providerId": "nedbank-connect",
    "providerName": "Nedbank Connect",
    "offerName": "2GB 30-day data bundle",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "2GB anytime",
    "priceZar": 60,
    "allocation": {
      "anytimeGb": 2,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Nedbank Money app",
      "Nedbank Online Banking"
    ],
    "eligibility": "Requires a Nedbank account and an active RICA-compliant Nedbank Connect SIM or eSIM. The terms allow customers aged 18 or older, or with parent/guardian consent.",
    "importantNotes": [
      "Standard prepaid data, with 30-day expiry; the catalogue separates social bundles.",
      "The terms define prepaid purchases as once-off through the Nedbank Money app or Online Banking. Rewards are conditional and excluded from the base allocation."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html",
      "title": "Pitch-perfect prepaid bundles | Nedbank Connect",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "nedbank-connect-reviewed-5gb-2026-11-01",
    "providerId": "nedbank-connect",
    "providerName": "Nedbank Connect",
    "offerName": "5GB 30-day data bundle",
    "comparisonSizesGb": [
      5
    ],
    "advertisedDataLabel": "5GB anytime",
    "priceZar": 100,
    "allocation": {
      "anytimeGb": 5,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Nedbank Money app",
      "Nedbank Online Banking"
    ],
    "eligibility": "Requires a Nedbank account and an active RICA-compliant Nedbank Connect SIM or eSIM. The terms allow customers aged 18 or older, or with parent/guardian consent.",
    "importantNotes": [
      "Standard prepaid data, with 30-day expiry; the catalogue separates social bundles.",
      "The terms define prepaid purchases as once-off through the Nedbank Money app or Online Banking. Rewards are conditional and excluded from the base allocation."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html",
      "title": "Pitch-perfect prepaid bundles | Nedbank Connect",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "nedbank-connect-reviewed-15gb-2026-11-01",
    "providerId": "nedbank-connect",
    "providerName": "Nedbank Connect",
    "offerName": "15GB 30-day data bundle",
    "comparisonSizesGb": [
      15
    ],
    "advertisedDataLabel": "15GB anytime",
    "priceZar": 220,
    "allocation": {
      "anytimeGb": 15,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Nedbank Money app",
      "Nedbank Online Banking"
    ],
    "eligibility": "Requires a Nedbank account and an active RICA-compliant Nedbank Connect SIM or eSIM. The terms allow customers aged 18 or older, or with parent/guardian consent.",
    "importantNotes": [
      "Standard prepaid data, with 30-day expiry; the catalogue separates social bundles.",
      "The terms define prepaid purchases as once-off through the Nedbank Money app or Online Banking. Rewards are conditional and excluded from the base allocation."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html",
      "title": "Pitch-perfect prepaid bundles | Nedbank Connect",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "nedbank-connect-reviewed-50gb-2026-11-01",
    "providerId": "nedbank-connect",
    "providerName": "Nedbank Connect",
    "offerName": "50GB 30-day data bundle",
    "comparisonSizesGb": [
      50
    ],
    "advertisedDataLabel": "50GB anytime",
    "priceZar": 450,
    "allocation": {
      "anytimeGb": 50,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Nedbank Money app",
      "Nedbank Online Banking"
    ],
    "eligibility": "Requires a Nedbank account and an active RICA-compliant Nedbank Connect SIM or eSIM. The terms allow customers aged 18 or older, or with parent/guardian consent.",
    "importantNotes": [
      "Standard prepaid data, with 30-day expiry; the catalogue separates social bundles.",
      "The terms define prepaid purchases as once-off through the Nedbank Money app or Online Banking. Rewards are conditional and excluded from the base allocation."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html",
      "title": "Pitch-perfect prepaid bundles | Nedbank Connect",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "fnb-connect-reviewed-6gb-2026-11-01",
    "providerId": "fnb-connect",
    "providerName": "FNB Connect",
    "offerName": "6GB monthly plan",
    "comparisonSizesGb": [
      5
    ],
    "advertisedDataLabel": "6GB anytime",
    "priceZar": 139,
    "allocation": {
      "anytimeGb": 6,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "monthly",
      "label": "Monthly allocation"
    },
    "billing": "recurring_monthly",
    "paymentModel": {
      "kind": "not_confirmed",
      "note": "The reviewed pricing guide does not identify whether this exact data plan is prepaid, Top Up or postpaid."
    },
    "commitment": {
      "kind": "not_confirmed",
      "note": "The table confirms a monthly fee, but not the exact selected package term. The relationship agreement distinguishes fixed-term and open-ended contracts; confirm the Summary of Package."
    },
    "productType": "mobile_plan",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "FNB app",
      "FNB Online Banking",
      "FNB Connect call centre"
    ],
    "eligibility": "Requires an active FNB or RMB Private Bank transactional account and a qualifying FNB Connect SIM/eSIM/package; confirm account-specific eligibility in the Summary of Package.",
    "importantNotes": [
      "The pricing-guide cover states 1 July 2026–30 June 2027, while its final pricing notice retains 9 November 2025–30 June 2026. This first-party effective-period conflict remains unresolved.",
      "The reviewed figures are the advertised retail data-plan or once-off data-bundle table amounts including VAT. Conditional eBucks/reward allocations are not part of the base allowance.",
      "For an open-ended contract, relationship-agreement clause 7.2 requires one month’s termination notice and fees through that notice. Do not assume immediate free cancellation or that every advertised package is open-ended."
    ],
    "rankingStatus": "context_only",
    "source": {
      "url": "https://www.fnb.co.za/downloads/pricing-guides/FNB-Connect-Retail.pdf",
      "title": "FNB Connect Retail Annual Pricing Guide 2026–2027",
      "checkedAt": "2026-11-01",
      "official": true
    },
    "rankingExclusionReason": "The provider pricing guide has conflicting effective periods; retain the advertised reference with its caveat, but exclude it from current awards until clarified."
  },
  {
    "id": "fnb-connect-reviewed-50gb-2026-11-01",
    "providerId": "fnb-connect",
    "providerName": "FNB Connect",
    "offerName": "50GB monthly plan",
    "comparisonSizesGb": [
      50
    ],
    "advertisedDataLabel": "50GB anytime",
    "priceZar": 369,
    "allocation": {
      "anytimeGb": 50,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "monthly",
      "label": "Monthly allocation"
    },
    "billing": "recurring_monthly",
    "paymentModel": {
      "kind": "not_confirmed",
      "note": "The reviewed pricing guide does not identify whether this exact data plan is prepaid, Top Up or postpaid."
    },
    "commitment": {
      "kind": "not_confirmed",
      "note": "The table confirms a monthly fee, but not the exact selected package term. The relationship agreement distinguishes fixed-term and open-ended contracts; confirm the Summary of Package."
    },
    "productType": "mobile_plan",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "FNB app",
      "FNB Online Banking",
      "FNB Connect call centre"
    ],
    "eligibility": "Requires an active FNB or RMB Private Bank transactional account and a qualifying FNB Connect SIM/eSIM/package; confirm account-specific eligibility in the Summary of Package.",
    "importantNotes": [
      "The pricing-guide cover states 1 July 2026–30 June 2027, while its final pricing notice retains 9 November 2025–30 June 2026. This first-party effective-period conflict remains unresolved.",
      "The reviewed figures are the advertised retail data-plan or once-off data-bundle table amounts including VAT. Conditional eBucks/reward allocations are not part of the base allowance.",
      "For an open-ended contract, relationship-agreement clause 7.2 requires one month’s termination notice and fees through that notice. Do not assume immediate free cancellation or that every advertised package is open-ended."
    ],
    "rankingStatus": "context_only",
    "source": {
      "url": "https://www.fnb.co.za/downloads/pricing-guides/FNB-Connect-Retail.pdf",
      "title": "FNB Connect Retail Annual Pricing Guide 2026–2027",
      "checkedAt": "2026-11-01",
      "official": true
    },
    "rankingExclusionReason": "The provider pricing guide has conflicting effective periods; retain the advertised reference with its caveat, but exclude it from current awards until clarified."
  },
  {
    "id": "capitec-connect-reviewed-2gb-2026-11-01",
    "providerId": "capitec-connect",
    "providerName": "Capitec Connect",
    "offerName": "2GB 30-day data bundle",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "2GB base allocation; linked-number bonus shown separately",
    "priceZar": 59,
    "allocation": {
      "anytimeGb": 2,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": [],
      "conditionalBonusGb": 0.4,
      "conditionalBonusNote": "The official linked-number column includes a 20% allocation bonus; rankings use only the guaranteed base allocation."
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Capitec app",
      "*120*3279#"
    ],
    "eligibility": "Requires a Capitec account and RICA-registered Connect SIM. The provider terms allow customers over 18 or with parent/guardian consent; confirm sign-up requirements.",
    "importantNotes": [
      "2GB is the guaranteed base allowance; linked-number extras are conditional and excluded from rankings.",
      "The current price table’s stated expiry applies to this product. The provider terms classify Connect as prepaid and say charges include VAT."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.capitecbank.co.za/personal/connect/capitec-bundles/",
      "title": "Data & Airtime Packages | Capitec Connect Bundles",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "capitec-connect-reviewed-5gb-2026-11-01",
    "providerId": "capitec-connect",
    "providerName": "Capitec Connect",
    "offerName": "5GB 30-day data bundle",
    "comparisonSizesGb": [
      5
    ],
    "advertisedDataLabel": "5GB base allocation; linked-number bonus shown separately",
    "priceZar": 100,
    "allocation": {
      "anytimeGb": 5,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": [],
      "conditionalBonusGb": 1,
      "conditionalBonusNote": "The official linked-number column includes a 20% allocation bonus; rankings use only the guaranteed base allocation."
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Capitec app",
      "*120*3279#"
    ],
    "eligibility": "Requires a Capitec account and RICA-registered Connect SIM. The provider terms allow customers over 18 or with parent/guardian consent; confirm sign-up requirements.",
    "importantNotes": [
      "5GB is the guaranteed base allowance; linked-number extras are conditional and excluded from rankings.",
      "The current price table’s stated expiry applies to this product. The provider terms classify Connect as prepaid and say charges include VAT."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.capitecbank.co.za/personal/connect/capitec-bundles/",
      "title": "Data & Airtime Packages | Capitec Connect Bundles",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "capitec-connect-reviewed-50gb-2026-11-01",
    "providerId": "capitec-connect",
    "providerName": "Capitec Connect",
    "offerName": "50GB 60-day data bundle",
    "comparisonSizesGb": [
      50
    ],
    "advertisedDataLabel": "50GB base allocation; linked-number bonus shown separately",
    "priceZar": 450,
    "allocation": {
      "anytimeGb": 50,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": [],
      "conditionalBonusGb": 10,
      "conditionalBonusNote": "The official linked-number column includes a 20% allocation bonus; rankings use only the guaranteed base allocation."
    },
    "validity": {
      "kind": "days",
      "days": 60,
      "label": "60 days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "Capitec app",
      "*120*3279#"
    ],
    "eligibility": "Requires a Capitec account and RICA-registered Connect SIM. The provider terms allow customers over 18 or with parent/guardian consent; confirm sign-up requirements.",
    "importantNotes": [
      "50GB is the guaranteed base allowance; linked-number extras are conditional and excluded from rankings.",
      "The current price table’s stated expiry applies to this product. The provider terms classify Connect as prepaid and say charges include VAT.",
      "A 60-day product is context only, not equivalent to a 30-day monthly offer."
    ],
    "rankingStatus": "context_only",
    "source": {
      "url": "https://www.capitecbank.co.za/personal/connect/capitec-bundles/",
      "title": "Data & Airtime Packages | Capitec Connect Bundles",
      "checkedAt": "2026-11-01",
      "official": true
    },
    "rankingExclusionReason": "60-day validity; excluded from like-for-like monthly awards."
  },
  {
    "id": "recorded-mtn-monthly-5gb",
    "providerId": "mtn",
    "providerName": "MTN",
    "offerName": "MTN Monthly 5GB Anytime + 5GB Night Express",
    "comparisonSizesGb": [
      5,
      10
    ],
    "advertisedDataLabel": "5GB anytime + 5GB night",
    "priceZar": 299,
    "allocation": {
      "anytimeGb": 5,
      "nightGb": 5,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 Days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "mixed",
      "note": "MTN Internet Bundles are available to PayAsYouGo and postpaid customers; confirm billing on your line."
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "provider_customer",
    "purchaseChannels": [
      "*136*2*999#",
      "MTN app",
      "MTN Chat",
      "participating retailers and banks"
    ],
    "eligibility": "Requires a compatible operator SIM; confirm qualifying price plans on the official source.",
    "importantNotes": [
      "The current Internet Bundles terms list the exact monthly amount and price; select the once-off variant because a recurring variant is also offered.",
      "Any Night Express allocation is separate from pooled anytime data. Internet terms give 23:59–05:00, but dedicated Night Express terms give 00:01–04:59; the source conflict remains.",
      "Once-off Internet Bundles do not renew automatically. Confirm the exact source window and eligible line before purchase."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles",
      "title": "MTN Internet Bundles terms",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "recorded-mtn-monthly-1gb",
    "providerId": "mtn",
    "providerName": "MTN",
    "offerName": "MTN Monthly 1GB",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "1GB anytime",
    "priceZar": 79,
    "allocation": {
      "anytimeGb": 1,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 Days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "mixed",
      "note": "MTN Internet Bundles are available to PayAsYouGo and postpaid customers; confirm billing on your line."
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "provider_customer",
    "purchaseChannels": [
      "*136*2*999#",
      "MTN app",
      "MTN Chat",
      "participating retailers and banks"
    ],
    "eligibility": "Requires a compatible operator SIM; confirm qualifying price plans on the official source.",
    "importantNotes": [
      "The current Internet Bundles terms list the exact monthly amount and price; select the once-off variant because a recurring variant is also offered.",
      "Any Night Express allocation is separate from pooled anytime data. Internet terms give 23:59–05:00, but dedicated Night Express terms give 00:01–04:59; the source conflict remains.",
      "Once-off Internet Bundles do not renew automatically. Confirm the exact source window and eligible line before purchase."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles",
      "title": "MTN Internet Bundles terms",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "recorded-voda-monthly-50gb",
    "providerId": "vodacom",
    "providerName": "Vodacom",
    "offerName": "Vodacom 50GB Anytime + 50GB Night Owl",
    "comparisonSizesGb": [
      50
    ],
    "advertisedDataLabel": "50GB anytime + 50GB night",
    "priceZar": 349,
    "allocation": {
      "anytimeGb": 50,
      "nightGb": 50,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 Days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "prepaid",
      "settlement": "upfront"
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "prepaid_lte",
    "accessTier": "qualifying_price_plan",
    "purchaseChannels": [
      "*123#",
      "VodaPay app"
    ],
    "eligibility": "Requires the Vodacom Prepaid LTE price plan. Community Service and CST Management SIMs are excluded. The reviewed terms do not impose a router-only device requirement.",
    "importantNotes": [
      "The current Prepaid LTE table supports this exact once-off split-wallet product and validity; its prices include VAT.",
      "Night Owl is usable from 00:00 to 05:00, separately from the anytime allowance. A qualifying Prepaid LTE price plan is required; Community Service and CST Management SIMs are excluded.",
      "Do not conflate this with similarly priced monthly recurring, VodaPay-exclusive or streaming-bonus products in the general prepaid catalogue."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans",
      "title": "Vodacom prepaid LTE data page",
      "checkedAt": "2026-11-01",
      "official": true
    }
  },
  {
    "id": "recorded-cellc-monthly-1gb",
    "providerId": "cell-c",
    "providerName": "Cell C",
    "offerName": "Cell C Monthly 1GB",
    "comparisonSizesGb": [],
    "advertisedDataLabel": "1GB anytime",
    "priceZar": 65,
    "allocation": {
      "anytimeGb": 1,
      "nightGb": 0,
      "streamingGb": 0,
      "socialGb": 0,
      "otherRestricted": []
    },
    "validity": {
      "kind": "days",
      "days": 30,
      "label": "30 Days"
    },
    "billing": "once_off",
    "paymentModel": {
      "kind": "not_confirmed",
      "note": "Confirm payment requirements on the linked operator source."
    },
    "commitment": {
      "kind": "once_off"
    },
    "productType": "mobile_data",
    "accessTier": "provider_customer",
    "purchaseChannels": [
      "*147#",
      "Cell C app",
      "Cell C portal",
      "Cell C airtime/partner channels"
    ],
    "eligibility": "Requires a compatible operator SIM; confirm qualifying price plans on the official source.",
    "importantNotes": [
      "The active catalogue confirms the exact price, allowance and once-off 30-day variant. Only the anytime wallet counts as pooled anytime.",
      "Where present, Nite data is restricted to 00:00–04:59:59. The 30-day terms support Prepaid, Hybrid and Postpaid eligibility and VAT-inclusive prices.",
      "The same 30-day terms conflict on transfer: clause 16 permits transfer while a later general clause prohibits it. Transfer entitlement remains unconfirmed."
    ],
    "rankingStatus": "eligible",
    "source": {
      "url": "https://www.cellc.co.za/cellc/jsp/pinless-recharge/rechargeBundle_ajax.jsp?bundleCategory=DATAWEB&bundleType=DATAWEB",
      "title": "Cell C data bundle catalogue",
      "checkedAt": "2026-11-01",
      "official": true
    }
  }
];

// Historical tariff notices did not re-confirm current purchase availability.
// Apply these exclusions to the recorded-bundle adapter only in a permitted release.
export const november2026ExcludedRecordedBundleIds = ["voda-monthly-1-5gb","voda-monthly-3gb"] as const;
