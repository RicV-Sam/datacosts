# DataCost Facebook Page Setup Packet

Prepared: 17 July 2026  
Status: Page created and approved; website integration prepared for deployment  
Implements: Work package 1 from `docs/datacost-facebook-organic-growth-plan.md`

## Decision summary

| Item | Selected direction | Fallback / execution note |
| --- | --- | --- |
| Page name | **DataCost.co.za – Mobile Data & Connectivity Help** | Use **DataCost.co.za** if the longer name is rejected or truncated poorly. |
| Username choice 1 | `@datacostza` | Availability must be checked in Meta. |
| Username choice 2 | `@datacostcoza` | Use only if choice 1 is unavailable. |
| Username choice 3 | `@datacostsouthafrica` | Use only if the shorter choices are unavailable. |
| Category | **Website** | Choose **Product/service** or the nearest current consumer-information category if Website is unavailable. |
| Website | `https://datacost.co.za/` | Clean canonical URL in About. |
| Contact | `hello@datacost.co.za` | Do not add a phone number or office hours. |
| Primary CTA | **Learn More** | Fallback: current equivalent of Visit website. Destination should use the approved profile CTA UTM. |
| Group | Do not create | Reconsider only at the 90-day gate. |
| Messaging | **Disabled for launch** | Enable later only if a monitored response workflow is established. |

## Short description

Independent South African mobile data, USSD, fibre and connectivity guides. Compare costs, solve problems and use your data better.

## Full About description

DataCost.co.za helps South Africans understand mobile data prices, check balances, find USSD codes, buy bundles, troubleshoot airtime and connectivity problems, compare networks, and make sense of fibre and home internet. We are an independent consumer information site and are not affiliated with MTN, Vodacom, Telkom, Cell C, Rain or any fibre provider. Prices, promotions and codes can change, so time-sensitive information is checked and official sources take priority. For account-specific support, contact your network. Visit https://datacost.co.za/ or send editorial corrections and general questions to hello@datacost.co.za.

## Profile and cover assets

Approved source assets are stored in `docs/social/facebook/assets/`. The selected profile mark is also exported to `public/logo-v2.png`, and the approved visual identity is used for the production social-preview card at `public/og-image-v2.jpg`.

| Asset | Source | Export | Purpose |
| --- | --- | --- | --- |
| Profile mark | `source/linkedin-logo-master-1254x1254-source.png` | `datacost-facebook-profile-linkedin-aligned-1080-v2.png` | 1080 x 1080 crop of the established DataCost symbol, optimised for a circular profile display |
| Page cover | `source/linkedin-cover-master-2038x771-source.png` | `datacost-facebook-cover-linkedin-aligned-1640x624-v2.png` | 1640 x 624 adaptation of the established LinkedIn banner master; verify desktop/mobile crop in Meta |
| Manifest | `asset-manifest.json` | - | Dimensions, palette, provenance and constraints |

The selected version 2 design follows the existing LinkedIn identity supplied by the user: deep navy, white, cyan and green; a data-growth graphic; the established DataCost symbol/wordmark; and the headline **“Understand what your data really costs.”** It includes no operator logos, price claims or temporary offers.

The earlier lime-and-navy Facebook concept remains in the asset directory only for audit history and is marked as superseded in the manifest. It must not be uploaded.

## Primary CTA URL

```text
https://datacost.co.za/?utm_source=facebook&utm_medium=organic_social&utm_campaign=page_profile&utm_content=cta_button
```

Keep the clean homepage URL in the About website field. Use the tagged URL only for the CTA destination if the current interface permits separate values.

## Automatic Messenger greeting

Thanks for contacting DataCost. We are an independent South African consumer information site, not a mobile network or account-support desk. We cannot access your SIM account, reverse charges, cancel services or receive an OTP on your behalf.

Tell us the general problem and your network/device type, but do not send your phone number, ID number, account number, PIN, password, OTP, banking details or full address. For urgent or account-specific action, please contact your network through its official app, website, store or support channel.

## Pinned welcome post

Welcome to DataCost.co.za.

We publish practical South African help for mobile data, USSD codes, airtime, router SIMs, fibre and everyday connectivity problems.

DataCost is independent. We are not MTN, Vodacom, Telkom, Cell C, Rain or a fibre provider, and we cannot access or change a private account.

You can ask general questions here. Please never post your phone number, ID number, account number, PIN, password, OTP, banking details or full home address.

Start with our guides at https://datacost.co.za/

What mobile-data or connectivity problem would you most like us to explain?

## Moderation rules

1. Keep relevant criticism and genuine complaints visible unless they contain abuse, threats or private information.
2. Hide or remove phone numbers, IDs, account numbers, OTPs, banking details and full residential addresses where Page controls allow it; explain the safety reason.
3. Delete and ban clear scams, impersonation, malicious links, repeated spam and anyone asking users to move to an unverified WhatsApp number.
4. Do not ask for private account evidence in a public comment.
5. Distinguish verified facts, current official instructions and unverified user reports.
6. Correct material errors publicly and update the linked DataCost page where required.
7. Route private billing, SIM-swap, cancellation and account-access action to the relevant official network.

Suggested moderation keyword themes to configure after reviewing Meta’s current controls:

- OTP, PIN, password, ID number and account number requests;
- unsolicited loans, investments, crypto, betting and “guaranteed income”;
- “message me on WhatsApp/Telegram” combined with a phone number or shortened link;
- fake network-support claims, SIM/RICA bypass offers and account-unlock services.

Do not block ordinary network names, complaints or the word “WhatsApp” by itself because they are legitimate discussion topics.

## Access and recovery requirements

- Require two-factor authentication for everyone with Page access.
- Identify one primary owner and one backup owner before creation.
- Grant the minimum role needed for publishing or moderation.
- Confirm the Meta account and business context before pressing Create; do not create the Page under an unintended profile or organisation.
- Store credentials, recovery codes and private owner details outside the repository.
- Record only the final public Page URL, username and setup date in repository documentation.

## Completed Page creation record

The controlled setup was completed in the user-approved authenticated Facebook session:

1. Open the user-approved authenticated Facebook session.
2. Confirm the active account/business context and intended Page owners.
3. Create the Page with the selected name and best available category.
4. Test username choices in order; stop after the first approved available option.
5. Add the short description, full About description, clean website URL and contact email.
6. Upload the profile and cover exports and inspect desktop/mobile crops.
7. Add the tagged website CTA.
8. Configure access, two-factor-authentication requirements, messaging and moderation.
9. Add the automatic greeting if messaging is enabled.
10. The Page remains unpromoted and no pinned post or launch content has been published.
11. Final public Page URL: `https://www.facebook.com/datacostza`; username: `@datacostza`.
12. The user reviewed and approved the configured Page before website deployment.

## Completion status

The Page setup review is complete. Private owner and recovery details remain outside the repository.

| Approval item | Status |
| --- | --- |
| Page name and fallback | Approved and live |
| Username order | `@datacostza` approved and live |
| Short and full descriptions | Approved and live |
| Profile image | Approved and live |
| Cover image and copy | Approved and live |
| Messaging decision and greeting | Messaging disabled for launch |
| Pinned welcome post | Approved draft; not yet published |
| Primary and backup Page owners identified | Managed privately; do not record private details here |

## Scope confirmation

The Facebook Page is live and approved. The website package adds the exact public Page URL to the footer and Organization metadata, tracks non-personal footer clicks, and replaces invalid legacy social assets with validated 1200 x 630 and square exports. No Facebook post, invitation, advert, Meta Pixel or third-party automation is included.
