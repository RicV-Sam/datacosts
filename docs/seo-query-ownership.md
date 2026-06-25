# DataCost SEO Query Ownership

Last updated: 2026-06-25

This map records which existing page should own each high-impression query cluster from the June 2026 CTR and intent cleanup sprint. Use it before editing USSD, balance, network, or troubleshooting pages so internal links reinforce the intended primary page instead of creating cannibalisation.

| Query intent | Primary page | Supporting page behavior |
| --- | --- | --- |
| MTN balance check | `/mtn-ussd-codes/` | The all-network USSD hub should link to the MTN page for MTN-specific balance, recharge, and Please Call Me searches. |
| Cell C balance check | `/cell-c-ussd-codes/` | The all-network USSD hub should link to the Cell C page for Cell C-specific balance searches. |
| Vodacom airtime or balance how-to | `/guides/how-to-check-vodacom-airtime-balance/` | The Vodacom USSD page should link to the guide for step-by-step balance intent. |
| Full Vodacom USSD list | `/vodacom-ussd-codes/` | The Vodacom balance guide should link back when the user needs the full code list. |
| Telkom USSD codes | `/telkom-ussd-codes/` | The all-network USSD hub and troubleshooting pages should link to Telkom for Telkom-specific code intent. |
| All-network code comparison | `/ussd-codes-south-africa/` | Operator pages should link back only for broad South Africa USSD comparison or directory browsing. |
| MTN Please Call Me code | `/ussd-codes-south-africa/` for now | Keep a clear MTN Please Call Me section on the hub and link from `/mtn-ussd-codes/`; revisit only after another GSC window. |
| Borrow airtime or airtime advance | `/airtime-advance-codes/` | Network USSD pages should link here for advance-airtime eligibility, fees, and repayment context. |
| MTN data balance not showing | `/fix/mtn-data-balance-check/` | Treat as troubleshooting only; point normal balance-code intent to `/mtn-ussd-codes/`. |
| Telkom data balance not showing | `/fix/telkom-data-balance-check/` | Treat as troubleshooting only; point normal balance-code intent to `/telkom-ussd-codes/`. |

Do not consolidate, noindex, or canonicalize the weak `/fix/` balance pages until at least one more 28-day GSC window shows whether the troubleshooting repositioning helped.
