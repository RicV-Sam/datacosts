export type ProblemGuideKey =
  | 'why-is-my-data-disappearing-south-africa'
  | 'how-to-stop-airtime-being-used-automatically'
  | 'how-to-cancel-subscriptions-mtn-vodacom-telkom'
  | 'how-to-check-subscriptions-on-mtn'
  | 'how-to-check-subscriptions-on-vodacom'
  | 'how-to-stop-wasp-services-south-africa'
  | 'why-is-my-data-finishing-so-fast'
  | 'how-to-protect-airtime-from-being-used';

export type NetworkFix = {
  name: 'Vodacom' | 'MTN' | 'Telkom' | 'Cell C';
  balanceCode: string;
  notes: string;
  action: string;
};

export type InternalLink = {
  href: string;
  label: string;
  description: string;
};

export type ProblemGuideContent = {
  slug: ProblemGuideKey;
  titleTag: string;
  metaDescription: string;
  h1: string;
  intro: string;
  quickAnswer: string[];
  causes: string[];
  fixSteps: string[];
  networkFixes: NetworkFix[];
  ussdSummary: string;
  preventionTips: string[];
  faq: Array<{ question: string; answer: string }>;
  internalLinks: InternalLink[];
  whenToEscalate: string;
};

export const problemGuides: Record<ProblemGuideKey, ProblemGuideContent> = {
  'why-is-my-data-disappearing-south-africa': {
    slug: 'why-is-my-data-disappearing-south-africa',
    titleTag: 'Why Data Disappears (Vodacom, MTN Fix Guide 2026)',
    metaDescription:
      'Data disappearing in South Africa? Check hidden app usage, out-of-bundle billing, and hotspot drain. Fix it fast on Vodacom, MTN, Telkom, and Cell C.',
    h1: 'Why Is My Data Disappearing on Vodacom, MTN, Telkom & Cell C? (2026)',
    intro:
      'If your bundle keeps dropping too quickly, the cause is usually visible once you check app-level usage and bundle expiry behavior.',
    quickAnswer: [
      'Data usually disappears because background sync, autoplay video, cloud backups, and updates keep running over mobile data.',
      'When bundles expire, out-of-bundle billing makes usage feel even faster and more expensive.',
      'Check top draining apps first, then lock updates and backups to Wi-Fi only.'
    ],
    causes: [
      'Background data usage from social, chat, and cloud apps.',
      'Premium streaming quality and autoplay video.',
      'Automatic app and system updates over mobile data.',
      'Out-of-bundle billing after bundle expiry.',
      'Hotspot sharing without a usage limit.'
    ],
    fixSteps: [
      'Open app data usage and identify top drains from the last 7 days.',
      'Restrict background data for non-essential high-usage apps.',
      'Set social/video apps to data-saver and lower video quality.',
      'Force app-store updates and backups to Wi-Fi only.',
      'Enable warning and hard cap before bundle depletion.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Confirm remaining bundle and expiry before heavy usage.',
        action: 'Top up before expiry to avoid out-of-bundle airtime burn.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Check bundle state and recent usage spikes by session.',
        action: 'Use a small test bundle after changing app settings.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Separate anytime from night allocation when diagnosing.',
        action: 'Use a bundle type that matches your real usage hours.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Check roaming and hotspot behavior if usage jumps suddenly.',
        action: 'Disable hotspot and background sync until usage stabilizes.'
      }
    ],
    ussdSummary:
      'Use the USSD directory to verify balances, bundle status, and account actions quickly before spending more.',
    preventionTips: [
      'Run weekly app-usage checks.',
      'Download media over Wi-Fi before commuting.',
      'Keep autoplay disabled by default.',
      'Set monthly usage alerts on the phone and network app.'
    ],
    faq: [
      {
        question: 'Can one app finish a full bundle?',
        answer:
          'Yes. Autoplay and high-resolution video apps can consume a large bundle in a short period.'
      },
      {
        question: 'Why does data drop overnight?',
        answer:
          'Night drops often come from cloud backup, app updates, and background sync when the phone is idle.'
      },
      {
        question: 'Is disappearing data always a fraud issue?',
        answer:
          'No. Most cases are normal background usage, app settings, or out-of-bundle behavior.'
      },
      {
        question: 'What is the fastest first check?',
        answer:
          'Check app-level usage for the last week and bundle expiry timing before anything else.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Check balances and bundle status fast.'
      },
      {
        href: '/guides/why-is-my-airtime-disappearing-south-africa/',
        label: 'Why airtime disappears in South Africa',
        description: 'Diagnose related airtime drain patterns.'
      },
      {
        href: '/guides/why-does-my-data-finish-so-fast-south-africa/',
        label: 'Why data finishes fast (full SA guide)',
        description: 'Use the detailed troubleshooting path.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare plans after fixing usage leaks.'
      }
    ],
    whenToEscalate:
      'Escalate when high usage continues after app limits, Wi-Fi-only updates, and bundle matching checks.'
  },
  'how-to-stop-airtime-being-used-automatically': {
    slug: 'how-to-stop-airtime-being-used-automatically',
    titleTag: 'Stop Airtime Auto Use (Vodacom, MTN Fix Guide 2026)',
    metaDescription:
      'Stop automatic airtime loss in South Africa. Fix WASP, premium SMS, recurring charges, and out-of-bundle billing on Vodacom, MTN, Telkom, and Cell C.',
    h1: 'How to Stop Airtime Being Used Automatically on MTN, Vodacom, Telkom & Cell C (2026)',
    intro:
      'When airtime drops without calls, the cause is usually recurring billing, background data fallback, or paid subscription services.',
    quickAnswer: [
      'Automatic airtime loss usually comes from WASP subscriptions, premium SMS, out-of-bundle browsing, or forgotten auto-renew settings.',
      'Start by identifying exact deduction amounts and timing, then cancel all unknown recurring services.',
      'After cleanup, monitor one full recharge cycle to confirm stability.'
    ],
    causes: [
      'WASP subscriptions with daily or weekly billing.',
      'Premium SMS services charging small recurring amounts.',
      'Out-of-bundle browsing after data depletion.',
      'Auto-renew bundles left active unintentionally.',
      'Background app traffic billed from airtime.'
    ],
    fixSteps: [
      'Check deduction history and identify recurring patterns.',
      'Cancel unknown paid services and recurring content products.',
      'Disable optional auto-renew where not needed.',
      'Keep mobile data off until a valid data bundle is active.',
      'Capture proof of cancellations for support escalation.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Check active paid services and recurring value-added entries.',
        action: 'Request premium content restrictions if charges return.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Audit recurring services and verify post-cancel status.',
        action: 'Use controlled top-ups while deductions are being traced.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Confirm whether premium services or expiry fallback caused loss.',
        action: 'Disable non-essential renewals until stable.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Run complete service audit after every cancellation.',
        action: 'Keep references and timestamps for billing disputes.'
      }
    ],
    ussdSummary:
      'Use the USSD page for current short codes to audit balances, services, and cancellation menus quickly.',
    preventionTips: [
      'Run a monthly paid-service audit.',
      'Avoid unknown OTP or promo subscription prompts.',
      'Keep premium billing blocked where possible.',
      'Set strict data warnings to avoid airtime fallback browsing.'
    ],
    faq: [
      {
        question: 'Can airtime drop even if data is off?',
        answer: 'Yes. WASP and premium SMS services can still deduct airtime without mobile data.'
      },
      {
        question: 'Why are deductions usually small but frequent?',
        answer: 'This pattern usually indicates recurring subscription billing.'
      },
      {
        question: 'Should I keep cancellation proof?',
        answer: 'Yes. It helps when you escalate repeated deductions with your network.'
      },
      {
        question: 'What if deductions continue after cancellation?',
        answer:
          'Escalate and request a service-level billing trace with your cancellation references.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Launch account and subscription checks quickly.'
      },
      {
        href: '/guides/how-to-stop-wasp-vas-charges-south-africa/',
        label: 'How to stop WASP and VAS charges',
        description: 'Understand recurring premium-service deductions.'
      },
      {
        href: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/',
        label: 'Cancel subscriptions across major SA networks',
        description: 'Use the full cancellation workflow.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare better-fit bundles after cleanup.'
      }
    ],
    whenToEscalate:
      'Escalate when deductions continue after confirmed cancellations and blocked premium options.'
  },
  'how-to-cancel-subscriptions-mtn-vodacom-telkom': {
    slug: 'how-to-cancel-subscriptions-mtn-vodacom-telkom',
    titleTag: 'Cancel Subscriptions (MTN, Vodacom Fix Guide 2026)',
    metaDescription:
      'Cancel unwanted subscriptions in South Africa. Stop WASP, premium SMS, and recurring airtime deductions on MTN, Vodacom, Telkom, and Cell C.',
    h1: 'How to Cancel Subscriptions on MTN, Vodacom, Telkom & Cell C in South Africa (2026)',
    intro:
      'Recurring subscription billing is a common cause of airtime loss. This workflow helps you cancel cleanly and verify that billing actually stopped.',
    quickAnswer: [
      'Open active service lists first, cancel every unknown paid service, and confirm each one is inactive.',
      'Most recurring charges are from WASP subscriptions, premium SMS, or old value-added content.',
      'After canceling, track your next 24 to 48 hours of deductions before topping up heavily.'
    ],
    causes: [
      'WASP subscriptions from web or promo opt-ins.',
      'Premium SMS content billing.',
      'Forgotten recurring add-ons.',
      'Legacy third-party services still active on your number.',
      'Out-of-bundle charges mistaken for subscription billing.'
    ],
    fixSteps: [
      'List all active paid services in your network menu or app.',
      'Cancel each paid service and wait for confirmation.',
      'Re-open service list and verify inactive status.',
      'Enable premium-content restrictions if available.',
      'Track deductions and escalate with proof if billing persists.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Use VAS/service controls to remove active paid content.',
        action: 'Ask support for premium-content blocking if recharges still leak.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Confirm recurring products are inactive after cancellation.',
        action: 'Escalate with screenshots if deductions continue.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Review legacy paid services and content extras.',
        action: 'Recheck after 10 minutes for delayed status updates.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Audit all paid entries before your next recharge.',
        action: 'Keep SMS references for any billing dispute.'
      }
    ],
    ussdSummary:
      'Use the USSD directory to open service menus and balance checks quickly across all networks.',
    preventionTips: [
      'Avoid entering your number on unknown promo pages.',
      'Review active services monthly.',
      'Disable unused recurring products.',
      'Keep premium billing blocked where possible.'
    ],
    faq: [
      {
        question: 'How quickly do cancellations apply?',
        answer:
          'Usually immediately or within minutes, but always recheck service status after cancellation.'
      },
      {
        question: 'Can I cancel everything at once?',
        answer:
          'Some menus allow it, but verifying each service individually is safer.'
      },
      {
        question: 'Why do charges continue after I canceled?',
        answer:
          'You may have multiple active services, or charges may be unrelated out-of-bundle usage.'
      },
      {
        question: 'Should I call support after in-app cancellation?',
        answer:
          'Only if deductions continue after inactive status and confirmation records.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Open current service and support menus by network.'
      },
      {
        href: '/guides/how-to-check-subscriptions-on-mtn/',
        label: 'How to check subscriptions on MTN',
        description: 'Use MTN-specific recurring-service checks.'
      },
      {
        href: '/guides/how-to-check-subscriptions-on-vodacom/',
        label: 'How to check subscriptions on Vodacom',
        description: 'Use Vodacom-specific service audit steps.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare bundles after stopping recurring loss.'
      }
    ],
    whenToEscalate:
      'Escalate if charges continue after all services show inactive and you have cancellation proof.'
  },
  'how-to-check-subscriptions-on-mtn': {
    slug: 'how-to-check-subscriptions-on-mtn',
    titleTag: 'How to Check MTN Subs (MTN, Vodacom Fix 2026)',
    metaDescription:
      'How to check MTN subscriptions in South Africa and stop airtime loss. Find active WASP, premium SMS, and recurring services, then fix deductions fast.',
    h1: 'How to Check Subscriptions on MTN South Africa (2026)',
    intro:
      'MTN airtime deductions often come from recurring services. A focused subscription audit is usually the fastest way to stop repeated losses.',
    quickAnswer: [
      'List active paid services on MTN, cancel unknown entries, and verify inactive status before recharging again.',
      'Recurring deductions are commonly tied to WASP subscriptions, premium SMS, or old paid add-ons.',
      'After cleanup, monitor one day of deductions to confirm stability.'
    ],
    causes: [
      'WASP services billed on recurring intervals.',
      'Premium SMS content billing.',
      'Auto-renew add-ons and paid extras.',
      'Out-of-bundle browsing charged from airtime.',
      'Multiple small subscriptions creating staggered deductions.'
    ],
    fixSteps: [
      'Open MTN active services and capture the full list.',
      'Cancel every unknown or unused paid service.',
      'Check recurring settings on paid extras and disable where needed.',
      'Re-open the service list and confirm inactive states.',
      'Top up lightly and watch deductions for 24 hours.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'If on dual-SIM, confirm Vodacom is not the real deduction source.',
        action: 'Temporarily disable the secondary SIM data path during checks.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Focus on active paid services and recurring products.',
        action: 'Escalate with references if deductions persist after cleanup.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Cross-check secondary SIM deductions in mixed-SIM devices.',
        action: 'Ensure MTN is set as primary data SIM while troubleshooting.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Rule out secondary SIM deductions before escalation.',
        action: 'Disable alternate SIM data and retest MTN deductions.'
      }
    ],
    ussdSummary:
      'Use the USSD page for current MTN and cross-network service menu codes.',
    preventionTips: [
      'Check subscriptions before every large recharge.',
      'Keep records of all cancellation confirmations.',
      'Avoid unknown OTP or click-to-subscribe prompts.',
      'Control out-of-bundle behavior by managing active bundles closely.'
    ],
    faq: [
      {
        question: 'How can I tell if MTN deductions are subscription-related?',
        answer:
          'Repeated small deductions at similar times usually indicate recurring subscription billing.'
      },
      {
        question: 'Can deductions continue after one cancellation?',
        answer:
          'Yes. Multiple active services are common, so verify each one is inactive.'
      },
      {
        question: 'Do I need MTN support to check subscriptions?',
        answer:
          'Not always. Self-service menus often work, but support is needed if billing persists.'
      },
      {
        question: 'What if no subscription is listed?',
        answer:
          'Then check out-of-bundle usage and background data fallback as alternate causes.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Quick account and service checks.'
      },
      {
        href: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/',
        label: 'Cancel subscriptions across major SA networks',
        description: 'Use full cancellation and verification steps.'
      },
      {
        href: '/guides/how-to-stop-airtime-being-used-automatically/',
        label: 'Stop automatic airtime usage',
        description: 'Fix recurring deduction and fallback usage patterns.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare better-value bundles once stable.'
      }
    ],
    whenToEscalate:
      'Escalate when MTN deductions continue after service list cleanup and inactive confirmations.'
  },
  'how-to-check-subscriptions-on-vodacom': {
    slug: 'how-to-check-subscriptions-on-vodacom',
    titleTag: 'How to Check Vodacom Subs (Vodacom, MTN Fix 2026)',
    metaDescription:
      'How to check Vodacom subscriptions in South Africa and stop hidden deductions. Find active WASP, premium SMS, and recurring services, then fix fast.',
    h1: 'How to Check Subscriptions on Vodacom South Africa (2026)',
    intro:
      'Vodacom airtime drops in small recurring amounts usually point to active paid services. A full service audit gives the fastest resolution.',
    quickAnswer: [
      'Check all active Vodacom paid services, cancel unknown items, and confirm inactive status.',
      'Most repeat deductions come from WASP, premium SMS, or old value-added content.',
      'Track one recharge cycle after cleanup to confirm the issue is fixed.'
    ],
    causes: [
      'WASP subscriptions with recurring airtime charges.',
      'Premium SMS content services.',
      'Recurring paid add-ons left active.',
      'Out-of-bundle browsing billed from airtime.',
      'Multiple paid services creating irregular deduction timing.'
    ],
    fixSteps: [
      'Open Vodacom service controls and document all active paid entries.',
      'Cancel unknown or unused paid services.',
      'Recheck service status and confirm all expected deactivations.',
      'Disable recurring paid extras you do not need.',
      'Monitor deductions for 24 to 48 hours and escalate if needed.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Prioritize VAS and recurring service checks.',
        action: 'Ask for premium-content restrictions if charges reappear.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'On dual-SIM devices, verify MTN is not deducting instead.',
        action: 'Cross-check both SIM histories before escalating.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Rule out Telkom side deductions in mixed-SIM phones.',
        action: 'Temporarily disable alternate data paths while testing.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Confirm no parallel service deductions on secondary lines.',
        action: 'Isolate troubleshooting to a single active data SIM.'
      }
    ],
    ussdSummary:
      'Use the USSD hub for current Vodacom and cross-network quick codes.',
    preventionTips: [
      'Review active paid services monthly.',
      'Avoid approving unknown premium prompts via SMS or popups.',
      'Keep cancellation timestamps and screenshots.',
      'Disable unused recurring products before major recharges.'
    ],
    faq: [
      {
        question: 'How do I confirm Vodacom cancellation worked?',
        answer:
          'Recheck service status after cancellation and keep confirmation messages.'
      },
      {
        question: 'Why do deductions still look random?',
        answer:
          'Different services can bill on different schedules, so a full list check is essential.'
      },
      {
        question: 'Can charges restart after one cancellation?',
        answer:
          'Yes, if multiple services were active. Remove and verify each one.'
      },
      {
        question: 'When should I contact support?',
        answer:
          'Contact support if deductions continue after inactive status is confirmed.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Access updated service and support menus.'
      },
      {
        href: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/',
        label: 'Cancel subscriptions across SA networks',
        description: 'Apply full cancellation and proof workflow.'
      },
      {
        href: '/guides/how-to-stop-wasp-services-south-africa/',
        label: 'Stop WASP services in South Africa',
        description: 'Go deeper on premium-service prevention.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare bundle options after stopping deductions.'
      }
    ],
    whenToEscalate:
      'Escalate when deductions continue after all Vodacom paid services are inactive and verified.'
  },
  'how-to-stop-wasp-services-south-africa': {
    slug: 'how-to-stop-wasp-services-south-africa',
    titleTag: 'Stop WASP Services (Vodacom, MTN Fix Guide 2026)',
    metaDescription:
      'Stop WASP services in South Africa now. Cancel recurring premium charges and fix hidden airtime deductions on Vodacom, MTN, Telkom, and Cell C.',
    h1: 'How to Stop WASP Services in South Africa on MTN, Vodacom, Telkom & Cell C (2026)',
    intro:
      'WASP charges are a top reason for unexplained airtime loss. The fix is systematic: identify active paid services, cancel them, and block repeat billing.',
    quickAnswer: [
      'WASP services are recurring paid content subscriptions that can deduct airtime automatically.',
      'Stop them by canceling all unknown paid services and enabling premium-content restrictions.',
      'Then monitor your next recharge cycle to confirm the deductions are gone.'
    ],
    causes: [
      'Opt-ins via ads, links, or number-entry promo forms.',
      'Premium SMS services billed as value-added content.',
      'Legacy subscriptions still active from older campaigns.',
      'Multiple low-value services causing repeated small deductions.',
      'No premium-content block enabled on the account.'
    ],
    fixSteps: [
      'Check active paid services in your operator menu.',
      'Cancel every unknown WASP or premium content entry.',
      'Enable premium-content blocking where available.',
      'Recheck service status after 10 to 15 minutes.',
      'Track deductions for 48 hours and escalate with proof if needed.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Remove active paid content and verify service status updates.',
        action: 'Apply premium-content restrictions to prevent re-subscription.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Audit recurring products and confirm inactive states.',
        action: 'Escalate with cancellation references if billing continues.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Identify and remove old paid content services.',
        action: 'Confirm no active entries remain after deactivation.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Run full paid-service audit before the next top-up.',
        action: 'Keep proof and request billing investigation if charges remain.'
      }
    ],
    ussdSummary:
      'Use the USSD directory to launch network service menus quickly when checking and canceling premium services.',
    preventionTips: [
      'Never submit OTPs on unknown promo pages.',
      'Audit paid services monthly, even for small deductions.',
      'Keep premium-content blocks active where available.',
      'Educate shared users about accidental paid-service signups.'
    ],
    faq: [
      {
        question: 'What is WASP in mobile billing?',
        answer:
          'WASP means Wireless Application Service Provider billing, commonly used for paid content subscriptions.'
      },
      {
        question: 'Why do WASP deductions look random?',
        answer:
          'Different services can bill on different schedules, creating irregular deduction timing.'
      },
      {
        question: 'Can I stop WASP deductions permanently?',
        answer:
          'You can reduce risk strongly by canceling active services and enabling premium-content blocks.'
      },
      {
        question: 'Do WASP charges require mobile data?',
        answer:
          'Not always. Many are account-level billing events and can continue with data off.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Use updated service management shortcuts.'
      },
      {
        href: '/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/',
        label: 'Cancel subscriptions across SA networks',
        description: 'Follow full cancellation and verification steps.'
      },
      {
        href: '/guides/stop-wasp-subscriptions-south-africa/',
        label: 'Stop WASP subscriptions step-by-step',
        description: 'Use a network-by-network cancellation flow.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare safer bundle options after cleanup.'
      }
    ],
    whenToEscalate:
      'Escalate when charges continue after cancellation and premium-content blocking are both confirmed.'
  },
  'why-is-my-data-finishing-so-fast': {
    slug: 'why-is-my-data-finishing-so-fast',
    titleTag: 'Why Data Finishes Fast (Vodacom, MTN Fix Guide 2026)',
    metaDescription:
      'Why is data finishing fast in South Africa? Check background usage, streaming settings, and out-of-bundle burn. Fix it on Vodacom, MTN, Telkom, and Cell C.',
    h1: 'Why Is My Data Finishing So Fast on MTN, Vodacom, Telkom & Cell C? (2026)',
    intro:
      'If your bundles do not last as expected, the main drivers are usually visible in your app-level usage report and easy to control.',
    quickAnswer: [
      'Fast data loss is usually caused by autoplay video, background refresh, cloud backup, and app updates running on mobile data.',
      'After bundle depletion, out-of-bundle billing makes normal usage feel extremely expensive.',
      'Limit top-draining apps first, then lock heavy traffic to Wi-Fi only.'
    ],
    causes: [
      'Autoplay and high-resolution streaming in social/video apps.',
      'Background app refresh and cloud synchronization.',
      'Automatic updates over mobile data.',
      'Hotspot sharing and connected-device overuse.',
      'Out-of-bundle billing after bundle expiry.'
    ],
    fixSteps: [
      'Sort app usage by highest consumption over the last 7 days.',
      'Disable autoplay and reduce video quality to data-saver modes.',
      'Set cloud backup and large updates to Wi-Fi only.',
      'Restrict background data for non-essential high-usage apps.',
      'Set usage warning and hard cap before bundles run out.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Confirm bundle validity and remaining balance before high usage sessions.',
        action: 'Top up before expiry to avoid out-of-bundle penalties.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Compare expected usage with observed app-level consumption.',
        action: 'Use controlled bundles while tuning data settings.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Watch anytime versus night allocations closely.',
        action: 'Choose bundle windows that match your real data hours.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Check hotspot and roaming patterns during spikes.',
        action: 'Disable hotspot until high-consumption sources are identified.'
      }
    ],
    ussdSummary:
      'Use the USSD page to verify balances before and after each data-saving change.',
    preventionTips: [
      'Review app-level usage weekly.',
      'Pre-download media over Wi-Fi.',
      'Keep updates and backup tasks off mobile data.',
      'Re-evaluate bundle size monthly based on real behavior.'
    ],
    faq: [
      {
        question: 'Why does usage jump after system updates?',
        answer:
          'Updates can reset sync and quality settings, causing more background and streaming consumption.'
      },
      {
        question: 'Does faster network speed cause higher data use?',
        answer:
          'Indirectly yes, because high-quality content loads faster and users consume more media.'
      },
      {
        question: 'How do I find hidden consumption quickly?',
        answer:
          'Use your phone data report, identify top apps, and limit the top two first.'
      },
      {
        question: 'Is data saver mode alone enough?',
        answer:
          'It helps, but best results come from combining it with background limits and Wi-Fi-only updates.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Run fast balance and bundle checks.'
      },
      {
        href: '/guides/why-is-my-data-disappearing-south-africa/',
        label: 'Why data is disappearing in South Africa',
        description: 'Use a focused diagnosis for sudden drops.'
      },
      {
        href: '/guides/how-to-protect-airtime-from-being-used/',
        label: 'How to protect airtime from being used',
        description: 'Prevent fallback browsing from draining airtime.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare lower-cost plans after optimization.'
      }
    ],
    whenToEscalate:
      'Escalate if abnormal usage continues after settings controls and bundle optimization are applied.'
  },
  'how-to-protect-airtime-from-being-used': {
    slug: 'how-to-protect-airtime-from-being-used',
    titleTag: 'How to Protect Airtime (Vodacom, MTN Fix Guide 2026)',
    metaDescription:
      'How to protect airtime in South Africa. Stop WASP, premium SMS, out-of-bundle, and recurring charges with practical fixes for Vodacom, MTN, Telkom, and Cell C.',
    h1: 'How to Protect Airtime from Being Used on MTN, Vodacom, Telkom & Cell C (2026)',
    intro:
      'Airtime protection is about prevention, not only recovery. The right controls stop recurring deductions and reduce expensive fallback usage.',
    quickAnswer: [
      'Protect airtime by canceling unknown paid services, blocking premium billing, and avoiding out-of-bundle browsing.',
      'Most hidden loss comes from WASP services, premium SMS, recurring add-ons, and data fallback.',
      'Set account checks on a routine so issues are caught early.'
    ],
    causes: [
      'WASP and value-added recurring subscriptions.',
      'Premium SMS content charges.',
      'Out-of-bundle sessions after bundle depletion.',
      'Auto-renew bundles left enabled by mistake.',
      'No regular service audit after recharges.'
    ],
    fixSteps: [
      'Audit all active paid services and cancel unknown entries.',
      'Enable premium-content restrictions where available.',
      'Disable optional recurring bundles not in active use.',
      'Keep mobile data off when no valid bundle remains.',
      'Track deductions weekly and escalate repeated patterns.'
    ],
    networkFixes: [
      {
        name: 'Vodacom',
        balanceCode: '*135#',
        notes: 'Use VAS controls and verify inactive service states.',
        action: 'Apply premium-content restrictions for long-term protection.'
      },
      {
        name: 'MTN',
        balanceCode: '*136#',
        notes: 'Review recurring products and keep cancellation records.',
        action: 'Escalate quickly if repeated deductions return.'
      },
      {
        name: 'Telkom',
        balanceCode: '*188#',
        notes: 'Check for legacy paid services tied to your SIM.',
        action: 'Run service audits after each major top-up.'
      },
      {
        name: 'Cell C',
        balanceCode: '*101#',
        notes: 'Perform full paid-service checks before normal spend resumes.',
        action: 'Use small test recharges until account behavior is stable.'
      }
    ],
    ussdSummary:
      'Use the USSD directory as your routine account-health check for balances, bundles, and service controls.',
    preventionTips: [
      'Schedule monthly service checks after payday top-ups.',
      'Avoid unknown OTP confirmations and paid promo prompts.',
      'Keep premium billing blocked unless strictly needed.',
      'Teach shared users how accidental subscription opt-ins happen.'
    ],
    faq: [
      {
        question: 'What is the first action to protect airtime?',
        answer:
          'Cancel unknown paid services and enable premium-content restrictions before your next top-up.'
      },
      {
        question: 'Can shared users increase airtime risk?',
        answer:
          'Yes. Shared use can trigger accidental paid subscriptions through links and promotions.'
      },
      {
        question: 'Should all auto-renew bundles be disabled?',
        answer:
          'Disable those you do not need and keep only renewals aligned to consistent usage.'
      },
      {
        question: 'How often should I audit subscriptions?',
        answer:
          'At least monthly, and weekly after any recent unexplained deductions.'
      }
    ],
    internalLinks: [
      {
        href: '/ussd-codes-south-africa/',
        label: 'South Africa USSD codes directory',
        description: 'Run quick account checks and controls.'
      },
      {
        href: '/guides/how-to-stop-airtime-being-used-automatically/',
        label: 'Stop automatic airtime usage',
        description: 'Fix current recurring deduction patterns.'
      },
      {
        href: '/guides/how-to-stop-wasp-services-south-africa/',
        label: 'Stop WASP services in South Africa',
        description: 'Remove hidden premium-service deductions.'
      },
      {
        href: '/',
        label: 'DataCost homepage',
        description: 'Compare data offers after securing your account.'
      }
    ],
    whenToEscalate:
      'Escalate if deductions continue after service cleanup and premium blocking are both confirmed.'
  }
};
