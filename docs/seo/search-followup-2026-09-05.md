# Search follow-up — 5 September 2026

Source: authenticated GSC API exports in `C:/Users/ricca/Desktop/analytics-hub-starter/reports/seo-audit-2026-09-05-api/`. Compare 6 August–2 September with 9 July–5 August (28 complete calendar days each). Page changes below are observations; causal attribution requires more evidence. Query exports exclude anonymized searches, so query losses do not sum to page losses.

## Declining pages

| Page | Click change | Diagnostic evidence | Decision |
|---|---:|---|---|
| `/network/cell-c/` | -64 | `cell c data deals`: impressions 4,994 → 84, clicks 16 → 1, position 9.47 → 13.57. Other DataCost pages show only small counts for that query; there is no comparable internal winner. | Treat as a query-visibility loss, not proven cannibalization or merely weak CTR. Existing comparison answer and intent links are already present. Preserve title/H1 and investigate timing, country/device mix and indexing before a rewrite. |
| `/network/telkom/monthly-data/` | -53 | `telkom prepaid data deals`: impressions 667 → 288, position 8.29 → 9.90. Operator page impressions increase 271 → 446 while its position stays near 11.1. | Partial redistribution is plausible, but not all lost visibility moved internally. Added a clear monthly comparison link from the operator page, preserving both intents. |
| `/network/vodacom/` | -34 | `vodacom data bundles`: impressions 1,060 → 527, position 9.80 → 9.92, clicks 4 → 0. | This query's visibility fell with near-flat average position. Average position cannot isolate demand, device or search-result changes. Preserve established snippet and pricing intent. |
| `/guides/best-data-deals-south-africa/` | -48 | `best data deals`: impressions 65 → 16 with near-flat position 9.54 → 9.56. Homepage gets 142 versus 118 impressions; the unprefixed best-deals route gets 42 current impressions. | Broad intent is shared, but low query counts and historical aliases do not prove damaging cannibalization. No redirect, canonical or indexability change. |

## Implemented improvements

- `/telkom-ussd-codes/`: replaced the vague own-number FAQ with practical *1# guidance, distinguishes MSISDN from IMSI and explains dual-SIM selection. Added the [official Telkom source](https://intouch.telkom.co.za/blog/never-get-caught-offline-again/640), checked today. Existing FAQ schema derives from the same answer, preserving visible/schema agreement.
- `/network/telkom/`: added a short route to the monthly comparison and the existing USSD guide, distinguishing monthly comparisons, short-term bundles and account actions.
- Kept titles, H1s, canonicals, URLs, indexing, prices, ads and tracking intact. Cell C and Vodacom already contain intent-specific body answers; adding more generic text is not justified by these data.

## Measurement and limits

The number-check query has 457 current impressions at position 11.07; the change aims to make the existing answer more useful. Telkom operator `data deals` has 263 impressions at position 13.16. Record page/query clicks, impressions, CTR and position for these same owners after any approved publication, using equal complete periods. Do not promise a ranking lift.

GA4 data is confirmed for DataCost, but Afri's numeric GA4 property ID is still unknown and Google Analytics Admin API discovery is disabled. No speculative ID or new tracking configuration was added. Afri GSC is active in Analytics Hub.

Validation: South African production build, TypeScript check and five SEO/USSD tests pass. Full built-output check covers 250 HTML files, 863 parsed JSON-LD blocks, unchanged search metadata and zero broken internal page links. No deployment.
