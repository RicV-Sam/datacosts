# DataCost SEO Query Ownership

Last updated: 2026-07-16

This map records which existing page should own each high-impression query cluster from the June 2026 CTR and intent cleanup sprint. Use it before editing USSD, balance, network, or troubleshooting pages so internal links reinforce the intended primary page instead of creating cannibalisation.

| Query intent | Primary page | Supporting page behavior |
| --- | --- | --- |
| MTN balance check | `/mtn-ussd-codes/` | The all-network USSD hub should link to the MTN page for MTN-specific balance, recharge, and Please Call Me searches. |
| MTN data balance check | `/guides/how-to-check-mtn-data-balance/` | The all-network data-balance guide should link to the MTN-specific workflow; `/fix/mtn-data-balance-check/` remains troubleshooting-only. |
| Cell C balance check | `/cell-c-ussd-codes/` | The all-network USSD hub should link to the Cell C page for Cell C-specific balance searches. |
| Vodacom airtime or balance how-to | `/guides/how-to-check-vodacom-airtime-balance/` | The Vodacom USSD page should link to the guide for step-by-step balance intent. |
| Full Vodacom USSD list | `/vodacom-ussd-codes/` | The Vodacom balance guide should link back when the user needs the full code list. |
| Telkom USSD codes | `/telkom-ussd-codes/` | The all-network USSD hub and troubleshooting pages should link to Telkom for Telkom-specific code intent. |
| All-network code comparison | `/ussd-codes-south-africa/` | Operator pages should link back only for broad South Africa USSD comparison or directory browsing. |
| All-network data balance comparison | `/guides/how-to-check-data-balance/` | Keep the page comparative and route operator-specific searches to the matching MTN, Vodacom, Telkom, or Cell C page. |
| MTN Please Call Me code | `/ussd-codes-south-africa/` for now | Keep a clear MTN Please Call Me section on the hub and link from `/mtn-ussd-codes/`; revisit only after another GSC window. |
| Borrow airtime or airtime advance | `/airtime-advance-codes/` | Network USSD pages should link here for advance-airtime eligibility, fees, and repayment context. |
| MTN data balance not showing | `/fix/mtn-data-balance-check/` | Treat as troubleshooting only; point normal balance-code intent to `/mtn-ussd-codes/`. |
| Telkom data balance not showing | `/fix/telkom-data-balance-check/` | Treat as troubleshooting only; point normal balance-code intent to `/telkom-ussd-codes/`. |

Do not consolidate, noindex, or canonicalize the weak `/fix/` balance pages until at least one more 28-day GSC window shows whether the troubleshooting repositioning helped.


## Android troubleshooting ownership — 22 October 2026

| Query intent | Primary page | Supporting page behavior |
| --- | --- | --- |
| Identify and restrict Android background mobile-data use | `/data-problems/how-to-stop-background-data-usage-android/` | Start with the same SIM and time period, identify the observed activity, and link to the overnight guide for bedtime-to-morning changes. |
| Investigate Android data disappearing overnight | `/data-problems/why-is-my-data-disappearing-overnight-android/` | Preserve the overnight evidence window and current content during the release observation period; review on 23 November 2026. |
| General airtime and mobile-data saving habits | `/guides/airtime-data-saving-tips-south-africa/` | Keep broad prevention and bundle-management intent distinct from Android troubleshooting. |

Keep `how-to-stop-data-from-disappearing-android` unpublished. Its causes, troubleshooting steps and FAQs overlap the existing overnight guide; a broader title alone does not justify a separate route. Reconsider only with distinct supported utility and query evidence, followed by explicit publication approval. This ownership decision does not establish harmful search cannibalisation or justify removing existing public routes.
