export type FixCluster = 'mobile-data' | 'ussd' | 'prepaid-electricity' | 'tv-decoder' | 'lte-router';

export type FixLink = {
  label: string;
  href: string;
};

export type FixPage = {
  id: string;
  slug: string;
  cluster: FixCluster;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  tags: string[];
  provider?: string;
  serviceType: string;
  quickAnswer: {
    meaning: string;
    likelyCause: string;
    firstThingToTry: string;
    contact: string;
  };
  sections: {
    meaning: string[];
    tryFirst: string[];
    steps: string[];
    whenToContact: string[];
    whatNotToDo: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedFixSlugs: string[];
  relatedDataCostLinks: FixLink[];
};

export type FixClusterInfo = {
  id: FixCluster;
  label: string;
  title: string;
  description: string;
};

export const fixClusters: FixClusterInfo[] = [
  {
    id: 'mobile-data',
    label: 'Mobile data',
    title: 'Mobile data and APN fixes',
    description: 'APN settings, mobile data, hotspot and network connection checks for South African SIMs and routers.'
  },
  {
    id: 'ussd',
    label: 'USSD',
    title: 'USSD, balance and WASP help',
    description: 'Balance checks, own-number lookups, disappearing airtime and unwanted subscription troubleshooting.'
  },
  {
    id: 'prepaid-electricity',
    label: 'Prepaid electricity',
    title: 'Prepaid electricity meter errors',
    description: 'Token, keypad, meter pairing and account-specific electricity errors explained in plain English.'
  },
  {
    id: 'tv-decoder',
    label: 'TV decoder',
    title: 'DStv and Openview decoder errors',
    description: 'Decoder error codes, no-signal checks, activation issues and payment-related TV service problems.'
  },
  {
    id: 'lte-router',
    label: 'LTE router',
    title: 'LTE router and Wi-Fi fixes',
    description: 'Router login, SIM, APN, red-light, Wi-Fi and connected-but-no-internet troubleshooting.'
  }
];

export const fixClusterLabelById = fixClusters.reduce<Record<FixCluster, string>>((acc, cluster) => {
  acc[cluster.id] = cluster.label;
  return acc;
}, {} as Record<FixCluster, string>);

const networkLinks: Record<string, FixLink[]> = {
  Vodacom: [
    { label: 'Vodacom USSD codes', href: '/vodacom-ussd-codes/' },
    { label: 'Vodacom data prices', href: '/network/vodacom/' },
    { label: 'Vodacom monthly data', href: '/network/vodacom/monthly-data/' }
  ],
  MTN: [
    { label: 'MTN USSD codes', href: '/mtn-ussd-codes/' },
    { label: 'MTN data prices', href: '/network/mtn/' },
    { label: 'MTN monthly data', href: '/network/mtn/monthly-data/' }
  ],
  Telkom: [
    { label: 'Telkom USSD codes', href: '/telkom-ussd-codes/' },
    { label: 'Telkom data prices', href: '/network/telkom/' },
    { label: 'Telkom monthly data', href: '/network/telkom/monthly-data/' }
  ],
  'Cell C': [
    { label: 'Cell C USSD codes', href: '/cell-c-ussd-codes/' },
    { label: 'Cell C data prices', href: '/network/cell-c/' },
    { label: 'USSD codes South Africa', href: '/ussd-codes-south-africa/' }
  ],
  Rain: [
    { label: 'Rain data prices', href: '/network/rain/' },
    { label: 'Network pages', href: '/network/' },
    { label: 'Best monthly data deals', href: '/guides/best-monthly-data-deals-south-africa/' }
  ]
};

const commonMobileLinks: FixLink[] = [
  { label: 'USSD codes South Africa', href: '/ussd-codes-south-africa/' },
  { label: 'How to check data balance', href: '/guides/how-to-check-data-balance/' },
  { label: 'Out-of-bundle data costs', href: '/guides/out-of-bundle-data-costs-south-africa/' }
];

const waspLinks: FixLink[] = [
  { label: 'Stop WASP subscriptions', href: '/guides/stop-wasp-subscriptions-south-africa/' },
  { label: 'Why is my airtime disappearing?', href: '/guides/why-is-my-airtime-disappearing-south-africa/' },
  { label: 'USSD codes South Africa', href: '/ussd-codes-south-africa/' }
];

const tvLinks: FixLink[] = [
  { label: 'Compare data after fixing', href: '/guides/best-data-deals-south-africa/' },
  { label: 'Network pages', href: '/network/' }
];

const electricityLinks: FixLink[] = [
  { label: 'DataCost Fixes hub', href: '/fix/' },
  { label: 'Data guides', href: '/guides/' }
];

const routerLinks: FixLink[] = [
  { label: 'Network pages', href: '/network/' },
  { label: 'Best monthly data deals', href: '/guides/best-monthly-data-deals-south-africa/' },
  { label: 'Out-of-bundle data costs', href: '/guides/out-of-bundle-data-costs-south-africa/' }
];

const networkMeta: Record<string, { apn: string; support: string; router: string }> = {
  Vodacom: {
    apn: 'internet',
    support: 'Vodacom support or the MyVodacom app',
    router: 'Vodacom LTE router profile'
  },
  MTN: {
    apn: 'internet',
    support: 'MTN support or the MTN app',
    router: 'MTN LTE router profile'
  },
  Telkom: {
    apn: 'internet',
    support: 'Telkom support or the Telkom app',
    router: 'Telkom LTE router profile'
  },
  'Cell C': {
    apn: 'internet',
    support: 'Cell C support or the Cell C app',
    router: 'Cell C LTE router profile'
  },
  Rain: {
    apn: 'rain',
    support: 'Rain support or the Rain account portal',
    router: 'Rain router profile'
  }
};

const providerSlugByName: Record<string, string> = {
  Vodacom: 'vodacom',
  MTN: 'mtn',
  Telkom: 'telkom',
  'Cell C': 'cell-c',
  Rain: 'rain'
};

function getProviderFixSlug(provider: string, suffix: 'apn-settings' | 'data-not-working' | 'lte-router-no-internet'): string {
  if (provider === 'Rain' && suffix === 'data-not-working') {
    return 'rain-5g-not-working';
  }

  if (provider === 'Rain' && suffix === 'lte-router-no-internet') {
    return 'rain-router-no-internet';
  }

  return `${providerSlugByName[provider] || provider.toLowerCase().replace(/\s+/g, '-')}-${suffix}`;
}

function titleCaseFromSlug(slug: string): string {
  const upperWords = new Set(['apn', 'mtn', 'lte', 'sim', 'wi-fi', 'dstv', 'e01', 'e16', 'e17', 'e19', 'e30', 'e32', 'e50', 'e52', 'e72', 'e73', 'e74', 'krn1', 'krn2', 'tid', 'otp', 'wasp', '5g', '192', '168']);
  return slug
    .split('-')
    .map((word) => {
      if (upperWords.has(word)) return word.toUpperCase();
      if (word === 'cell') return 'Cell';
      if (word === 'c') return 'C';
      if (word === 'dstv') return 'DStv';
      if (word === 'openview') return 'Openview';
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(' ')
    .replace('Wi Fi', 'Wi-Fi')
    .replace('Cell C', 'Cell C');
}

function basePage(input: Omit<FixPage, 'id'>): FixPage {
  return {
    id: input.slug,
    ...input
  };
}

function apnPage(provider: string, slug: string): FixPage {
  const meta = networkMeta[provider];
  return basePage({
    slug,
    cluster: 'mobile-data',
    provider,
    serviceType: 'Mobile data',
    title: `${provider} APN settings`,
    seoTitle: `${provider} APN Settings in South Africa: What to Enter | DataCost`,
    metaDescription: `Understand what ${provider} APN settings usually mean in South Africa, what to check first, what not to do, and when to contact the official provider.`,
    h1: `${provider} APN settings in South Africa`,
    summary: `Use this quick guide when a ${provider} SIM connects to the network but mobile data or LTE will not browse. APN settings are only one part of the fix, so confirm signal, bundle balance and account status too.`,
    tags: ['Mobile data', 'APN settings', provider, 'South Africa'],
    quickAnswer: {
      meaning: `The phone or router may not be using the correct ${provider} access point name for mobile data.`,
      likelyCause: `A blank APN, a wrong imported profile, SIM swap settings, or a router profile saved for another network.`,
      firstThingToTry: `Create or select an APN profile with the APN set to "${meta.apn}", leave optional fields blank unless ${provider} gives you account-specific details, then restart the device.`,
      contact: `If the SIM still will not browse, use ${meta.support}. DataCost is not the provider.`
    },
    sections: {
      meaning: [
        `An APN tells the mobile network how your device should connect to data services.`,
        `If calls or SMS work but data does not, the APN is a sensible first check before assuming the SIM or device is faulty.`
      ],
      tryFirst: [
        'Turn mobile data off and on, then restart the phone or router.',
        'Check that a valid data bundle or active plan is available.',
        `Check the APN field and use "${meta.apn}" unless official ${provider} support tells you otherwise.`,
        'Try the SIM in another device if you can do that safely.'
      ],
      steps: [
        'Open the mobile network or SIM settings on your phone, or the profile/APN screen on your LTE router.',
        'Add a new APN profile instead of editing a profile you do not understand.',
        `Enter ${meta.apn} in the APN field and keep username, password, proxy and port blank unless official support gives you different instructions.`,
        'Save the profile, select it as active, then restart the phone or router.',
        'After restart, test a simple webpage before testing WhatsApp, streaming or hotspot sharing.',
        `If it still fails, compare the result with the ${provider} app, account portal or support team.`
      ],
      whenToContact: [
        'The SIM shows no service or cannot register on the network.',
        'The account is suspended, unpaid, Rica-blocked or not activated.',
        'Support confirms a different APN is required for your package.',
        'You need billing, SIM swap, activation or account-specific help.'
      ],
      whatNotToDo: [
        'Do not share OTPs, banking passwords, SIM PINs or ID documents with unofficial support channels.',
        'Do not install unknown APN apps that ask for broad phone permissions.',
        'Do not keep changing random router settings if you are not sure what they do.'
      ]
    },
    faqs: [
      {
        question: `What APN should I try for ${provider}?`,
        answer: `For most consumer ${provider} mobile-data setups in South Africa, start with "${meta.apn}" in the APN field and leave optional fields blank unless official support gives you different details.`
      },
      {
        question: 'Will APN settings fix every data problem?',
        answer: 'No. APN settings can fix profile problems, but poor signal, expired data, a suspended SIM or network congestion can cause the same symptoms.'
      },
      {
        question: 'Should I pay someone online to fix my APN?',
        answer: 'Be careful. APN changes are normally simple settings changes. Use official provider support if personal account information is involved.'
      }
    ],
    relatedFixSlugs: [
      getProviderFixSlug(provider, 'data-not-working'),
      getProviderFixSlug(provider, 'lte-router-no-internet'),
      'mobile-data-on-but-not-working',
      'lte-router-apn-settings-south-africa'
    ],
    relatedDataCostLinks: [...(networkLinks[provider] || []), ...commonMobileLinks]
  });
}

function mobileProblemPage(provider: string, slug: string, problem: string): FixPage {
  const meta = networkMeta[provider];
  const isRain5g = slug === 'rain-5g-not-working';
  return basePage({
    slug,
    cluster: 'mobile-data',
    provider,
    serviceType: isRain5g ? '5G internet' : 'Mobile data',
    title: `${provider} ${problem}`,
    seoTitle: `${provider} ${problem} in South Africa: Meaning and What to Try | DataCost`,
    metaDescription: `Understand what ${provider} ${problem.toLowerCase()} usually means in South Africa, what to check first, what not to do, and when to contact the official provider.`,
    h1: `${provider} ${problem}`,
    summary: `If ${provider} data looks active but pages will not load, work through signal, bundle balance, APN and device checks before spending more airtime or buying another bundle.`,
    tags: ['Mobile data', provider, isRain5g ? '5G' : 'LTE', 'South Africa'],
    quickAnswer: {
      meaning: `Your device can see ${provider}, but the data session is failing or cannot pass traffic.`,
      likelyCause: 'Expired data, weak coverage, an incorrect APN, router profile mismatch, temporary outage or account restriction.',
      firstThingToTry: 'Restart the device, check your balance or plan status, then test again with Wi-Fi turned off.',
      contact: `Use ${meta.support} if account status, activation, billing or coverage needs to be checked.`
    },
    sections: {
      meaning: [
        'A data connection needs an active SIM or plan, usable signal, the correct network profile and a device that can route traffic.',
        `${provider} can show bars even when the specific data session is blocked, congested or not authenticated.`
      ],
      tryFirst: [
        'Switch flight mode on for 20 seconds, then switch it off.',
        'Check airtime, data balance and bundle expiry before buying anything else.',
        'Restart the phone or router and test one simple website.',
        `Check the APN profile and try "${meta.apn}" if the APN looks blank or wrong.`
      ],
      steps: [
        'Confirm the problem is on mobile data by turning Wi-Fi off.',
        'Check whether other devices on the same SIM or router also fail.',
        'Move closer to a window or a better signal spot and test again.',
        'Check the APN/profile screen and remove duplicate profiles that point to another network.',
        'If using a router, remove and reseat the SIM while the router is powered off.',
        `If the issue continues, collect screenshots and contact ${provider} through official support.`
      ],
      whenToContact: [
        'Your balance is correct but no device can browse on the SIM.',
        'The router or phone shows SIM locked, not provisioned, Rica-related or account warnings.',
        'The problem began after a SIM swap, package change, payment or cancellation.',
        'Neighbours or other users on the same network are also affected.'
      ],
      whatNotToDo: [
        'Do not keep topping up airtime while mobile data is failing.',
        'Do not share OTPs, ID copies or banking details through social media replies.',
        'Do not factory-reset a work router before saving the login details and Wi-Fi name.'
      ]
    },
    faqs: [
      {
        question: `Why is my ${provider} data not working?`,
        answer: `Common causes include an expired bundle, weak signal, wrong APN, account restriction, outage or router profile problem. Start with balance, signal and APN checks.`
      },
      {
        question: `Can ${provider} show signal but still have no internet?`,
        answer: 'Yes. Signal bars only show radio connection. Data can still fail because of account status, APN settings, congestion or a temporary network issue.'
      },
      {
        question: 'Should I contact support immediately?',
        answer: 'Contact official support if the simple checks do not help, especially where payment, SIM activation, Rica or account-specific status may be involved.'
      }
    ],
    relatedFixSlugs: [
      getProviderFixSlug(provider, 'apn-settings'),
      getProviderFixSlug(provider, 'lte-router-no-internet'),
      'mobile-data-on-but-not-working',
      'phone-says-no-internet-south-africa'
    ],
    relatedDataCostLinks: [...(networkLinks[provider] || []), ...commonMobileLinks]
  });
}

function balancePage(provider: string, slug: string, balanceType: 'airtime' | 'data'): FixPage {
  const label = balanceType === 'airtime' ? 'airtime balance' : 'data balance';
  return basePage({
    slug,
    cluster: 'ussd',
    provider,
    serviceType: `${provider} ${label}`,
    title: `${provider} ${label} check`,
    seoTitle: `${provider} ${balanceType === 'airtime' ? 'Airtime Balance Check' : 'Data Balance Check'} in South Africa | DataCost`,
    metaDescription: `Understand how to approach a ${provider} ${label} check in South Africa, what to verify first, and when to use official support.`,
    h1: `How to check ${provider} ${label}`,
    summary: `Use this page when you need to confirm your ${provider} ${label} before buying bundles, troubleshooting disappearing airtime or contacting support.`,
    tags: ['USSD', balanceType === 'airtime' ? 'Airtime balance' : 'Data balance', provider, 'South Africa'],
    quickAnswer: {
      meaning: `A ${label} check confirms what is currently available on your ${provider} line.`,
      likelyCause: 'You may need to confirm balance after a recharge, bundle purchase, expiry, subscription deduction or data session.',
      firstThingToTry: `Use the official ${provider} app, account portal or DataCost's ${provider} USSD reference before relying on third-party code lists.`,
      contact: `Contact ${networkMeta[provider]?.support || 'official support'} if the displayed balance does not match a recent payment or account action.`
    },
    sections: {
      meaning: [
        `${provider} balance screens may separate airtime, anytime data, night data, promotional bundles and app-specific bundles.`,
        'A single balance pop-up can be incomplete, so compare the app and USSD menu if the result looks wrong.'
      ],
      tryFirst: [
        'Check the balance before starting downloads, streaming or hotspot use.',
        'Wait a few minutes after buying data or loading airtime, then check again.',
        'Compare the USSD result with the provider app when possible.',
        'Take a screenshot if the balance changes unexpectedly.'
      ],
      steps: [
        `Open the DataCost ${provider} USSD page or the official ${provider} app.`,
        `Run the balance check from the ${provider} SIM, not from a different number.`,
        'Look for separate balances such as anytime, night, bonus, social or promotional data.',
        'Check expiry dates as well as the amount remaining.',
        'If airtime dropped, check active subscriptions and out-of-bundle data settings.',
        'If the account view still looks wrong, contact official support with timestamps.'
      ],
      whenToContact: [
        'A recharge or payment does not reflect after a reasonable delay.',
        'The app and USSD menu disagree and your balance is changing.',
        'You suspect a subscription, billing error or SIM/account issue.',
        'You need a transaction trace or refund discussion.'
      ],
      whatNotToDo: [
        'Do not enter OTPs, banking passwords or card details on unofficial balance-check sites.',
        'Do not assume bonus or night data can be used for all traffic.',
        'Do not buy another bundle before checking expiry and active bundle type.'
      ]
    },
    faqs: [
      {
        question: `What is the safest way to check ${provider} ${label}?`,
        answer: `Use the official ${provider} app or USSD menu. DataCost links to network-specific USSD references, but final account-specific balances should come from the provider.`
      },
      {
        question: 'Why does my balance look different in two places?',
        answer: 'Apps and USSD screens can show different bundle categories or update at different times. Check expiry, bundle type and recent usage.'
      },
      {
        question: 'Can DataCost fix a wrong balance?',
        answer: 'No. DataCost is not the provider. Use official support for billing, payment or account-specific balance problems.'
      }
    ],
    relatedFixSlugs: [
      `${provider.toLowerCase().replace(' ', '-')}-${balanceType === 'airtime' ? 'data' : 'airtime'}-balance-check`,
      `stop-wasp-services-${provider.toLowerCase().replace(' ', '-')}`,
      'airtime-disappearing-south-africa',
      'mobile-data-on-but-not-working'
    ],
    relatedDataCostLinks: [...(networkLinks[provider] || []), ...waspLinks]
  });
}

function waspPage(provider: string, slug: string): FixPage {
  return basePage({
    slug,
    cluster: 'ussd',
    provider,
    serviceType: 'WASP services',
    title: `Stop WASP services on ${provider}`,
    seoTitle: `Stop WASP Services on ${provider}: What to Check | DataCost`,
    metaDescription: `Understand how to approach unwanted ${provider} WASP services in South Africa, what to check first, and when to contact official support.`,
    h1: `Stop WASP services on ${provider}`,
    summary: `Use this guide if airtime keeps disappearing and you suspect paid content, premium services or subscription billing on a ${provider} prepaid line.`,
    tags: ['WASP services', 'USSD', provider, 'Airtime balance'],
    quickAnswer: {
      meaning: 'A paid service may be renewing on the line or airtime may be used by another recurring account service.',
      likelyCause: 'A content subscription, premium service, app billing, out-of-bundle data or a bundle renewal.',
      firstThingToTry: `Use the official ${provider} app or USSD subscription menu, then compare with DataCost's WASP guides.`,
      contact: `Contact ${networkMeta[provider]?.support || 'official support'} for billing traces, cancellation confirmation or disputed charges.`
    },
    sections: {
      meaning: [
        'WASP or VAS charges are usually recurring paid services linked to a mobile number.',
        'Not every airtime drop is a WASP charge. Data use, bundle renewal and premium SMS can look similar.'
      ],
      tryFirst: [
        'Check airtime before and after a quiet period with mobile data off.',
        'Open the provider app or USSD subscription menu.',
        'Cancel services you recognise as unwanted and save confirmation messages.',
        'Check data balance and out-of-bundle usage at the same time.'
      ],
      steps: [
        `Start from the official ${provider} self-service app or USSD menu.`,
        'Look for subscriptions, content services, VAS, WASP or premium services.',
        'Cancel unwanted services through the official channel and wait for confirmation.',
        'Screenshot confirmations, balances and timestamps.',
        'Check whether airtime still drops after cancellation.',
        `Escalate to ${provider} support if charges continue or you need a transaction history.`
      ],
      whenToContact: [
        'You cannot see the service causing the deduction.',
        'Cancellation fails or the service returns.',
        'You want a billing trace, refund request or formal dispute.',
        'Personal account information is required.'
      ],
      whatNotToDo: [
        'Do not reply to suspicious SMS links with personal details.',
        'Do not share OTPs, banking passwords, SIM PINs or ID documents with unofficial channels.',
        'Do not assume DataCost can cancel services for you. DataCost is independent consumer help.'
      ]
    },
    faqs: [
      {
        question: `Can DataCost cancel ${provider} WASP services for me?`,
        answer: 'No. DataCost is not the provider. Use official provider menus and support channels for cancellation and billing records.'
      },
      {
        question: 'Are WASP services the only reason airtime disappears?',
        answer: 'No. Out-of-bundle data, bundle renewals, premium SMS, app purchases and calls can also reduce airtime.'
      },
      {
        question: 'What proof should I keep?',
        answer: 'Keep screenshots of balances, subscription screens, cancellation confirmations and deduction times before contacting support.'
      }
    ],
    relatedFixSlugs: [
      'airtime-disappearing-south-africa',
      `${provider.toLowerCase().replace(' ', '-')}-airtime-balance-check`,
      `${provider.toLowerCase().replace(' ', '-')}-data-balance-check`,
      'how-to-check-your-own-number-south-africa'
    ],
    relatedDataCostLinks: [...(networkLinks[provider] || []), ...waspLinks]
  });
}

function electricityPage(slug: string, title: string, cause: string, firstAction: string): FixPage {
  return basePage({
    slug,
    cluster: 'prepaid-electricity',
    serviceType: 'Prepaid electricity',
    title,
    seoTitle: `${title}: Meaning and What to Do | DataCost`,
    metaDescription: `Understand what ${title.toLowerCase()} usually means in South Africa, what to check first, what not to do, and when to contact your municipality, Eskom or token vendor.`,
    h1: title,
    summary: `This is a general South African prepaid electricity troubleshooting guide. DataCost is not Eskom, a municipality or a token vendor, so account-specific token and meter issues must be confirmed with the official provider.`,
    tags: ['Prepaid electricity', 'Prepaid meter', 'Token error', 'South Africa'],
    quickAnswer: {
      meaning: 'Your meter, keypad or token purchase is reporting a problem that may need a simple re-entry check or provider action.',
      likelyCause: cause,
      firstThingToTry: firstAction,
      contact: 'Contact your municipality, Eskom or your token vendor if the issue involves account status, meter number, payments or tamper flags.'
    },
    sections: {
      meaning: [
        'Prepaid meters use meter-specific tokens, keypad communication and account status checks.',
        'A rejected, used or missing token can be caused by typing errors, wrong meter numbers, vending delays or provider-side account issues.'
      ],
      tryFirst: [
        'Confirm the meter number on the slip or app before re-entering a token.',
        'Enter the token slowly and check every digit.',
        'Check whether the token has already been loaded on the same meter.',
        'Keep the purchase receipt, meter number, token and time of purchase.'
      ],
      steps: [
        'Do not open, bridge, bypass or tamper with the meter.',
        'Check the keypad battery, plug point or CIU position if the keypad is separate from the meter.',
        'Re-enter the token carefully once, then stop repeated attempts if the same error returns.',
        'Confirm that the meter number on the token matches the physical meter.',
        'If money left your account but no valid token arrived, contact the token vendor first.',
        'Escalate to your municipality or Eskom for meter-specific, tamper, pairing or account-status issues.'
      ],
      whenToContact: [
        'The token was bought for the wrong meter number.',
        'The meter shows tamper, not act, connect, pairing or communication errors.',
        'Payment succeeded but no token arrived.',
        'You need account, debt, tariff, rollover or meter replacement help.'
      ],
      whatNotToDo: [
        'Do not tamper with wiring, seals or meter hardware.',
        'Do not pay unofficial social-media accounts to generate or reverse tokens.',
        'Do not share banking passwords, OTPs or ID documents with unofficial support channels.',
        'Do not keep buying duplicate tokens before confirming what happened to the first purchase.'
      ]
    },
    faqs: [
      {
        question: `Can DataCost fix ${title.toLowerCase()}?`,
        answer: 'No. DataCost can explain common causes, but only your municipality, Eskom or token vendor can resolve account-specific meter and token problems.'
      },
      {
        question: 'Should I tamper with the prepaid meter?',
        answer: 'No. Meter tampering is unsafe and can create legal, account and supply problems. Use official support channels.'
      },
      {
        question: 'What details should I have before calling support?',
        answer: 'Have the meter number, token, receipt, purchase time, vendor name, error message and your account or address details ready.'
      }
    ],
    relatedFixSlugs: [
      'prepaid-electricity-token-not-loading',
      'prepaid-meter-token-rejected',
      'prepaid-token-wrong-meter-number',
      'prepaid-meter-krn1-krn2-check',
      'prepaid-meter-tamper-error'
    ].filter((relatedSlug) => relatedSlug !== slug),
    relatedDataCostLinks: electricityLinks
  });
}

function tvPage(slug: string, title: string, provider: 'DStv' | 'Openview', cause: string, firstAction: string): FixPage {
  return basePage({
    slug,
    cluster: 'tv-decoder',
    provider,
    serviceType: `${provider} decoder`,
    title,
    seoTitle: `${title}: Meaning and What to Try | DataCost`,
    metaDescription: `Understand what ${title.toLowerCase()} usually means in South Africa, what to check first, what not to do, and when to contact official ${provider} support.`,
    h1: title,
    summary: `Use this quick decoder guide to separate signal, activation, payment and decoder checks. DataCost is not affiliated with ${provider}, so use official support for account resets and activations.`,
    tags: ['TV decoder', provider, 'Decoder error', 'South Africa'],
    quickAnswer: {
      meaning: 'Your decoder is reporting a service, signal, activation or hardware condition.',
      likelyCause: cause,
      firstThingToTry: firstAction,
      contact: `Use official ${provider} support or self-service for account, activation, payment or reset actions.`
    },
    sections: {
      meaning: [
        `${provider} errors can be caused by signal loss, payment status, smartcard pairing, activation or decoder hardware.`,
        'The same message can have different causes, so start with visible checks before requesting an account reset.'
      ],
      tryFirst: [
        'Restart the decoder from the wall plug and wait for it to boot fully.',
        'Check whether cables are firmly connected and the dish or antenna has not moved.',
        'Confirm payment, activation or account status through official self-service where relevant.',
        'Check whether bad weather or a local signal problem is affecting reception.'
      ],
      steps: [
        'Write down the exact error code and channel where it appears.',
        'Power the decoder off for one minute, then turn it on again.',
        'Check signal strength or installation status from the decoder menu if available.',
        'Confirm subscription, activation or smartcard status through official channels.',
        'Avoid repeated resets while recordings or updates are running.',
        `Contact official ${provider} support if the error needs a reset, activation or installer visit.`
      ],
      whenToContact: [
        'The error remains after restart and signal checks.',
        'Payment was made but channels are still blocked.',
        'The decoder mentions smartcard, pairing, activation or account status.',
        'The dish, LNB, antenna or cabling may need a qualified installer.'
      ],
      whatNotToDo: [
        'Do not share account passwords, OTPs, banking details or ID documents with unofficial pages.',
        'Do not climb onto roofs or adjust dangerous installations yourself.',
        'Do not pay strangers for unofficial decoder resets.'
      ]
    },
    faqs: [
      {
        question: `Is DataCost official ${provider} support?`,
        answer: `No. DataCost is independent consumer help. Use official ${provider} support for account resets, payments, activation and decoder pairing.`
      },
      {
        question: 'Can a restart fix this error?',
        answer: 'Sometimes. A restart can clear temporary decoder state, but account, activation and signal faults may need official support or installer help.'
      },
      {
        question: 'What should I check before contacting support?',
        answer: 'Have the exact error code, decoder or smartcard details, payment status, signal reading and when the problem started.'
      }
    ],
    relatedFixSlugs: provider === 'DStv'
      ? ['dstv-e48-32-error', 'dstv-e30-error', 'dstv-channels-missing-after-payment', 'dstv-payment-made-still-not-working'].filter((item) => item !== slug)
      : ['openview-e52-searching-for-signal', 'openview-no-channels', 'openview-only-channel-100', 'openview-activation-not-working'].filter((item) => item !== slug),
    relatedDataCostLinks: tvLinks
  });
}

function routerPage(slug: string, title: string, cause: string, firstAction: string, cluster: FixCluster = 'lte-router'): FixPage {
  const isRouterCluster = cluster === 'lte-router';
  const isUssdCluster = cluster === 'ussd';
  return basePage({
    slug,
    cluster,
    serviceType: isRouterCluster ? 'LTE router' : isUssdCluster ? 'USSD and account help' : 'Mobile data',
    title,
    seoTitle: `${title}: South Africa Router Fix | DataCost`,
    metaDescription: `Understand what ${title.toLowerCase()} usually means in South Africa, what to check first, what not to do, and when to contact your network or router provider.`,
    h1: title,
    summary: 'Use this LTE router guide for common South African home internet problems, including APN profiles, SIM detection, red lights and connected-but-no-internet symptoms.',
    tags: isRouterCluster ? ['LTE router', 'Wi-Fi', 'APN settings', 'South Africa'] : isUssdCluster ? ['USSD', 'South Africa', 'Mobile data'] : ['Mobile data', 'APN settings', 'South Africa'],
    quickAnswer: {
      meaning: 'The router, SIM, APN profile or Wi-Fi network needs a basic connection check.',
      likelyCause: cause,
      firstThingToTry: firstAction,
      contact: 'Contact your mobile network or router provider if the SIM, plan, account, device lock or hardware warranty may be involved.'
    },
    sections: {
      meaning: [
        'A router can have Wi-Fi working locally while the LTE internet connection is still down.',
        'SIM status, APN profile, signal, plan status and router firmware can all affect browsing.'
      ],
      tryFirst: [
        'Restart the router and wait for all lights to settle.',
        'Check whether the SIM has active data and is inserted correctly.',
        'Test near a window or higher signal area.',
        'Log in to the router dashboard only if you know the admin details.'
      ],
      steps: [
        'Check the router lights and note whether the issue is power, SIM, LTE, internet or Wi-Fi.',
        'Connect to the router Wi-Fi and open the router login page printed on the device label where available.',
        'Check SIM status, network mode, signal bars and APN profile.',
        'Create a new APN profile only when you know the correct network APN.',
        'Test with one device close to the router before judging speed or coverage.',
        'Contact the network or router provider if the SIM is not detected, the account is inactive or hardware appears faulty.'
      ],
      whenToContact: [
        'The SIM works in no device or the router reports SIM not detected.',
        'The router is network-locked or asks for an unlock code.',
        'The dashboard shows account, registration or activation errors.',
        'A reset does not restore the router or admin login details are unknown.'
      ],
      whatNotToDo: [
        'Do not factory-reset the router before noting the Wi-Fi name, admin login and APN profile.',
        'Do not share router admin passwords, OTPs or account details with unofficial support channels.',
        'Do not force SIM adapters or damaged SIM cards into the slot.'
      ]
    },
    faqs: [
      {
        question: 'Can Wi-Fi work while LTE internet is down?',
        answer: 'Yes. Wi-Fi is the local connection to the router. The router still needs a working SIM, signal, APN and plan to reach the internet.'
      },
      {
        question: 'Should I reset my router first?',
        answer: 'A power restart is safer as a first step. Factory reset only when you have the router login details and know how to restore APN and Wi-Fi settings.'
      },
      {
        question: 'Who should I contact if the router still fails?',
        answer: 'Contact the mobile network for SIM, plan and APN issues, or the router seller/manufacturer for hardware and warranty issues.'
      }
    ],
    relatedFixSlugs: [
      'lte-router-connected-no-internet',
      'lte-router-apn-settings-south-africa',
      'huawei-router-login-192-168-8-1',
      'zte-router-login-south-africa',
      'rain-router-no-internet'
    ].filter((item) => item !== slug),
    relatedDataCostLinks: routerLinks
  });
}

type FixPageOverride = Partial<Omit<FixPage, 'quickAnswer' | 'sections'>> & {
  quickAnswer?: Partial<FixPage['quickAnswer']>;
  sections?: Partial<FixPage['sections']>;
};

const pages: FixPage[] = [
  apnPage('Vodacom', 'vodacom-apn-settings'),
  apnPage('MTN', 'mtn-apn-settings'),
  apnPage('Telkom', 'telkom-apn-settings'),
  apnPage('Cell C', 'cell-c-apn-settings'),
  apnPage('Rain', 'rain-apn-settings'),
  mobileProblemPage('Vodacom', 'vodacom-data-not-working', 'data not working'),
  mobileProblemPage('MTN', 'mtn-data-not-working', 'data not working'),
  mobileProblemPage('Telkom', 'telkom-data-not-working', 'data not working'),
  mobileProblemPage('Cell C', 'cell-c-data-not-working', 'data not working'),
  mobileProblemPage('Rain', 'rain-5g-not-working', '5G not working'),
  mobileProblemPage('Vodacom', 'vodacom-lte-router-no-internet', 'LTE router no internet'),
  mobileProblemPage('MTN', 'mtn-lte-router-no-internet', 'LTE router no internet'),
  mobileProblemPage('Telkom', 'telkom-lte-router-no-internet', 'LTE router no internet'),
  mobileProblemPage('Cell C', 'cell-c-lte-router-no-internet', 'LTE router no internet'),
  mobileProblemPage('Rain', 'rain-router-no-internet', 'router no internet'),
  routerPage('mobile-data-on-but-not-working', 'Mobile data on but not working', 'The phone may be connected to the mobile network but blocked by APN, bundle, signal or account status.', 'Toggle flight mode, check data balance, then restart the phone.', 'mobile-data'),
  routerPage('phone-says-no-internet-south-africa', 'Phone says no internet in South Africa', 'The device is connected to mobile data or Wi-Fi but cannot reach the internet.', 'Switch between Wi-Fi and mobile data to identify which connection is failing.', 'mobile-data'),
  routerPage('mobile-hotspot-not-working-south-africa', 'Mobile hotspot not working in South Africa', 'The phone may not be sharing data because hotspot, APN, allowance, battery saver or network rules are blocking tethering.', 'Restart the phone, turn hotspot off and on, then test with one nearby device.', 'mobile-data'),
  routerPage('whatsapp-not-working-on-mobile-data', 'WhatsApp not working on mobile data', 'WhatsApp may be blocked by app data settings, depleted bundles, APN issues or an app-specific outage.', 'Confirm normal browsing works on mobile data, then check WhatsApp mobile-data permissions.', 'mobile-data'),
  routerPage('cannot-receive-otp-mobile-data', 'Cannot receive OTP on mobile data', 'OTP delivery usually depends on SMS, app notifications, SIM status or bank/provider systems rather than only mobile data.', 'Check SMS signal, restart the phone and request one OTP at a time through the official app or site.', 'mobile-data'),
  balancePage('Vodacom', 'vodacom-airtime-balance-check', 'airtime'),
  balancePage('MTN', 'mtn-airtime-balance-check', 'airtime'),
  balancePage('Telkom', 'telkom-airtime-balance-check', 'airtime'),
  balancePage('Cell C', 'cell-c-airtime-balance-check', 'airtime'),
  balancePage('Rain', 'rain-balance-check', 'data'),
  balancePage('Vodacom', 'vodacom-data-balance-check', 'data'),
  balancePage('MTN', 'mtn-data-balance-check', 'data'),
  balancePage('Telkom', 'telkom-data-balance-check', 'data'),
  balancePage('Cell C', 'cell-c-data-balance-check', 'data'),
  routerPage('how-to-check-your-own-number-south-africa', 'How to check your own number in South Africa', 'The SIM may be new, forgotten, used in a router or not saved in contacts.', 'Use the official network app, SIM packaging or provider self-service menu before sharing personal details.', 'ussd'),
  waspPage('Vodacom', 'stop-wasp-services-vodacom'),
  waspPage('MTN', 'stop-wasp-services-mtn'),
  waspPage('Telkom', 'stop-wasp-services-telkom'),
  waspPage('Cell C', 'stop-wasp-services-cell-c'),
  waspPage('Vodacom', 'airtime-disappearing-south-africa'),
  electricityPage('prepaid-electricity-token-not-loading', 'Prepaid electricity token not loading', 'The token may be typed incorrectly, delayed by the vendor, already used or issued for a different meter.', 'Check the meter number and re-enter the token slowly once.'),
  electricityPage('prepaid-meter-token-rejected', 'Prepaid meter token rejected', 'The token may not match the meter, may be invalid, or the meter may need provider action.', 'Confirm the meter number on the receipt matches the meter.'),
  electricityPage('prepaid-meter-says-used', 'Prepaid meter says used', 'The token may already have been accepted on that meter or entered previously.', 'Check recent units loaded and do not buy a duplicate token until the vendor checks the transaction.'),
  electricityPage('prepaid-meter-says-connect', 'Prepaid meter says connect', 'The keypad or CIU may not be communicating with the meter.', 'Move the keypad to the correct plug point and check its batteries or power.'),
  electricityPage('prepaid-meter-e01-error', 'Prepaid meter E01 error', 'The meter or keypad is reporting a general token, keypad or communication fault.', 'Restart the keypad if possible and re-enter the token carefully.'),
  electricityPage('prepaid-meter-not-act-error', 'Prepaid meter not act error', 'The meter may not be activated on the provider system or the token sequence is incomplete.', 'Contact the municipality, Eskom or vendor with the meter number and token receipt.'),
  electricityPage('prepaid-meter-over-power-error', 'Prepaid meter over power error', 'The home may be drawing more load than the meter allows.', 'Switch off high-load appliances and let the meter recover before trying again.'),
  electricityPage('prepaid-meter-low-battery', 'Prepaid meter low battery', 'The keypad or CIU batteries may be weak, causing failed entries or blank screens.', 'Replace the keypad batteries if it uses replaceable batteries.'),
  electricityPage('prepaid-meter-ciu-not-paired', 'Prepaid meter CIU not paired', 'The customer interface unit may not be linked to the meter.', 'Check you are using the correct keypad for that meter and contact the provider for pairing.'),
  electricityPage('prepaid-meter-keypad-not-working', 'Prepaid meter keypad not working', 'The keypad may have flat batteries, poor plug communication or physical damage.', 'Check power, batteries and the plug point before entering more tokens.'),
  electricityPage('prepaid-meter-error-30', 'Prepaid meter error 30', 'The meter is reporting a token or meter-specific error that needs provider confirmation.', 'Stop repeated token attempts and contact the vendor or provider with the exact error.'),
  electricityPage('prepaid-meter-error-77', 'Prepaid meter error 77', 'The meter is reporting a meter-specific fault, token status issue or communication error.', 'Record the error and contact official support with the meter number.'),
  electricityPage('prepaid-meter-krn1-krn2-check', 'Prepaid meter KRN1/KRN2 check', 'The meter may need checking for token identifier rollover readiness or key revision status.', 'Use official municipality, Eskom or vendor guidance for your specific meter.'),
  electricityPage('prepaid-meter-tid-rollover-explained', 'Prepaid meter TID rollover explained', 'Older prepaid meter token systems need rollover readiness to keep accepting tokens.', 'Confirm your meter status through official provider channels before buying large tokens.'),
  electricityPage('prepaid-meter-token-loaded-but-no-electricity', 'Prepaid meter token loaded but no electricity', 'Units may be loaded but supply could still be disconnected, tripped, overloaded or affected by provider faults.', 'Check the main switch and whether neighbours have power, without touching meter wiring.'),
  electricityPage('prepaid-meter-blank-screen', 'Prepaid meter blank screen', 'The keypad may have no power, flat batteries or a meter/display fault.', 'Check keypad batteries, plug power and whether the meter itself has supply.'),
  electricityPage('prepaid-meter-communication-error', 'Prepaid meter communication error', 'The keypad may not be reaching the meter through the wiring or paired link.', 'Move the keypad to another plug point on the same property and try again.'),
  electricityPage('prepaid-electricity-bought-but-no-token', 'Prepaid electricity bought but no token', 'The vendor transaction may be delayed, failed or sent to the wrong contact channel.', 'Check the bank/vendor receipt and contact the token seller before buying again.'),
  electricityPage('prepaid-token-wrong-meter-number', 'Prepaid token wrong meter number', 'The token was likely generated for a meter number that does not match your meter.', 'Stop entering the token and contact the vendor immediately with the receipt.'),
  electricityPage('prepaid-meter-tamper-error', 'Prepaid meter tamper error', 'The meter has flagged a tamper, seal, wiring or cover condition that requires official intervention.', 'Do not touch the meter hardware. Contact your municipality or Eskom.'),
  tvPage('dstv-e16-error', 'DStv E16 error', 'DStv', 'The channel may be blocked because of subscription, payment, activation or account status.', 'Confirm account status through official DStv self-service.'),
  tvPage('dstv-e17-error', 'DStv E17 error', 'DStv', 'The decoder may need smartcard, pairing or service activation checks.', 'Restart the decoder and confirm smartcard status through official support.'),
  tvPage('dstv-e19-error', 'DStv E19 error', 'DStv', 'The decoder may not have received recent entitlement or activation updates.', 'Leave the decoder on the affected channel and use official self-service if needed.'),
  tvPage('dstv-e30-error', 'DStv E30 error', 'DStv', 'The decoder may be validating service status or waiting for account updates.', 'Restart the decoder and confirm payment or package status.'),
  tvPage('dstv-e32-error', 'DStv E32 error', 'DStv', 'The smartcard or decoder may not be authorised for the selected channel.', 'Check subscription package and request official support if authorised channels remain blocked.'),
  tvPage('dstv-e48-32-error', 'DStv E48-32 error', 'DStv', 'The decoder is usually not receiving enough satellite signal.', 'Check weather, dish cables and signal strength before requesting an installer.'),
  tvPage('dstv-e50-error', 'DStv E50 error', 'DStv', 'The decoder may be reporting signal, installation or service availability trouble.', 'Restart the decoder and check signal readings.'),
  tvPage('dstv-e72-error', 'DStv E72 error', 'DStv', 'The decoder may have a pairing, setup or account validation issue.', 'Confirm decoder and smartcard details through official support.'),
  tvPage('dstv-e73-error', 'DStv E73 error', 'DStv', 'The decoder may be reporting installation, LNB or signal path issues.', 'Check cable connections and signal status.'),
  tvPage('dstv-e74-error', 'DStv E74 error', 'DStv', 'The decoder may have a dish, LNB, cable or tuner signal problem.', 'Restart the decoder and inspect accessible cable connections.'),
  tvPage('dstv-no-signal-after-rain', 'DStv no signal after rain', 'DStv', 'Rain, water ingress, dish movement or LNB/cable issues may weaken signal.', 'Wait for heavy rain to pass, then check accessible cable connections.'),
  tvPage('dstv-smartcard-error', 'DStv smartcard error', 'DStv', 'The smartcard may be inserted incorrectly, paired to another decoder or not reading.', 'Power off, reseat the smartcard correctly and restart.'),
  tvPage('dstv-decoder-not-booting', 'DStv decoder not booting', 'DStv', 'Power supply, decoder hardware, software update or storage faults may stop startup.', 'Unplug for one minute, check the power adapter and try again.'),
  tvPage('dstv-channels-missing-after-payment', 'DStv channels missing after payment', 'DStv', 'Payment may not have allocated, the package may differ, or the decoder may need an entitlement refresh.', 'Confirm payment allocation and package status through official self-service.'),
  tvPage('dstv-payment-made-still-not-working', 'DStv payment made still not working', 'DStv', 'The payment may be delayed, allocated to another account or waiting for service refresh.', 'Check official payment status and account number before making another payment.'),
  tvPage('openview-e52-searching-for-signal', 'Openview E52 searching for signal', 'Openview', 'The decoder is not receiving a usable satellite signal.', 'Check weather, dish cable and signal strength from the decoder menu.'),
  tvPage('openview-error-200', 'Openview error 200', 'Openview', 'The decoder may need activation, signal or channel-list checks.', 'Restart the decoder and confirm activation through official Openview support.'),
  tvPage('openview-no-channels', 'Openview no channels', 'Openview', 'The decoder may need scanning, activation or signal repair.', 'Check signal first, then run a channel scan if the signal is stable.'),
  tvPage('openview-only-channel-100', 'Openview only channel 100', 'Openview', 'The decoder may not be activated or has not completed the channel setup.', 'Confirm activation status and signal quality.'),
  tvPage('openview-activation-not-working', 'Openview activation not working', 'Openview', 'The decoder details, signal, account setup or activation request may need official support.', 'Check signal and decoder details before contacting official Openview support.'),
  routerPage('huawei-router-login-192-168-8-1', 'Huawei router login 192.168.8.1', 'The device may not be connected to the router Wi-Fi, or the router may use a different gateway address.', 'Connect to the Huawei router Wi-Fi and open the address printed on the router label.'),
  routerPage('huawei-router-reset-south-africa', 'Huawei router reset in South Africa', 'The router may need a restart or factory reset after incorrect settings or forgotten login details.', 'Try a normal power restart before any factory reset.'),
  routerPage('zte-router-login-south-africa', 'ZTE router login in South Africa', 'The device may not be on the ZTE router network, or the admin address/password may differ by model.', 'Connect to the ZTE Wi-Fi and check the router label for the login address.'),
  routerPage('lte-router-sim-not-detected', 'LTE router SIM not detected', 'The SIM may be inserted incorrectly, damaged, locked, inactive or unsupported by the router.', 'Power off the router, reseat the SIM correctly and restart.'),
  routerPage('lte-router-red-light-no-internet', 'LTE router red light no internet', 'The router may have no signal, no SIM registration, account restriction or APN failure.', 'Move the router near a window, restart it and check SIM/account status.'),
  routerPage('lte-router-connected-no-internet', 'LTE router connected but no internet', 'Wi-Fi is working locally, but the LTE data session is not passing traffic.', 'Check SIM data balance, APN profile and LTE signal in the router dashboard.'),
  routerPage('lte-router-apn-settings-south-africa', 'LTE router APN settings South Africa', 'The router may be using an APN profile for the wrong network.', 'Create a network-specific APN profile and select it as active.'),
  routerPage('lte-router-slow-internet', 'LTE router slow internet', 'Slow speed can come from weak signal, congestion, router placement, device load or bundle throttling.', 'Move the router, test one device nearby and compare peak versus off-peak speed.'),
  routerPage('router-wifi-working-but-no-internet', 'Router Wi-Fi working but no internet', 'The local Wi-Fi network is up but the router has no active internet connection.', 'Check router internet light, SIM status, APN and account balance.'),
  routerPage('how-to-change-router-apn', 'How to change router APN', 'The router may need a new APN profile after changing SIMs or networks.', 'Log in to the router dashboard and add a new APN profile without deleting the old one first.')
];

const priorityPageOverrides: Record<string, FixPageOverride> = {
  'vodacom-apn-settings': {
    summary: 'Use this when a Vodacom SIM has signal but browsing, WhatsApp or hotspot use will not work. For most consumer phones and LTE routers, the APN field is the key setting to check before changing anything more serious.',
    sections: {
      meaning: [
        'Vodacom APN settings tell the phone or router which mobile-data profile to use on the Vodacom network.',
        'If calls and SMS work but websites do not open, the APN, data balance, out-of-bundle setting or SIM provisioning may be the cause.',
        'On dual-SIM phones, the Vodacom SIM must also be selected as the SIM for mobile data.'
      ],
      tryFirst: [
        'Turn Wi-Fi off so you are testing Vodacom mobile data, not a home router connection.',
        'Check your Vodacom data balance and expiry in MyVodacom or through the Vodacom self-service menu.',
        'Set the APN field to "internet" and leave proxy, port, username and password blank unless official Vodacom support gives you different details.',
        'Restart the phone or router after saving the APN profile.'
      ],
      steps: [
        'Open mobile network settings and select the Vodacom SIM if the phone has two SIMs.',
        'Go to Access Point Names or APN settings and add a new profile named Vodacom Internet.',
        'Enter "internet" in the APN field. Leave username, password, proxy, port, server and MMSC fields blank unless Vodacom gives you account-specific details.',
        'Save the profile, select it as the active APN, then restart the phone or LTE router.',
        'Test a normal webpage first. If browsing works but WhatsApp or hotspot does not, check app permissions or hotspot settings next.',
        'If the SIM still will not browse, contact Vodacom through official support because the line may need provisioning, Rica, SIM swap or account checks.'
      ]
    },
    relatedFixSlugs: ['vodacom-data-not-working', 'vodacom-lte-router-no-internet', 'vodacom-data-balance-check', 'mobile-data-on-but-not-working', 'lte-router-apn-settings-south-africa']
  },
  'mtn-apn-settings': {
    summary: 'Use this when an MTN SIM registers on the network but mobile data keeps failing on a phone, MiFi or LTE router. Start with the APN, then check balance, signal and whether the line is active.',
    sections: {
      meaning: [
        'MTN APN settings control the data profile your device uses to connect to MTN mobile internet.',
        'A wrong imported APN is common after changing SIMs, using a second-hand router or moving a SIM between phone and router.',
        'APN changes will not fix an inactive SIM, depleted bundle, coverage outage or account restriction.'
      ],
      steps: [
        'Confirm the MTN SIM is selected for mobile data on dual-SIM phones.',
        'Open APN settings and create a fresh profile instead of editing a work or private APN you do not recognise.',
        'Use "internet" in the APN field and keep optional fields blank unless official MTN support tells you otherwise.',
        'Save and select the profile, then restart the phone, MiFi or router.',
        'Check MTN data balance and bundle expiry before testing heavy apps or hotspot sharing.',
        'If it still fails, use official MTN support or the MTN app to check provisioning, Rica, SIM status or local coverage.'
      ]
    },
    relatedFixSlugs: ['mtn-data-not-working', 'mtn-lte-router-no-internet', 'mtn-data-balance-check', 'mobile-data-on-but-not-working', 'lte-router-apn-settings-south-africa']
  },
  'telkom-apn-settings': {
    summary: 'Use this when Telkom mobile data will not browse even though the SIM has signal. Telkom users should check APN, bundle validity and coverage where they actually use the phone or LTE router.',
    sections: {
      meaning: [
        'Telkom APN settings tell your phone or router how to start a Telkom mobile-data session.',
        'The same symptom can come from a wrong APN, weak LTE coverage, expired bundle, router band issue or account restriction.',
        'If the SIM works in one area but not another, coverage and router placement may matter more than the APN.'
      ],
      steps: [
        'Check that the Telkom SIM is active and has a valid data bundle or plan.',
        'Open APN settings on the phone or LTE router and create a new Telkom Internet profile.',
        'Enter "internet" as the APN and leave optional proxy, port, username and password fields blank unless official Telkom support says otherwise.',
        'Save the profile, select it, restart the device and test a simple webpage.',
        'If using an LTE router, move it near a window and compare signal before changing more settings.',
        'Contact Telkom through official support if the line, Rica status, account or local coverage needs to be checked.'
      ]
    },
    relatedFixSlugs: ['telkom-data-not-working', 'telkom-lte-router-no-internet', 'telkom-data-balance-check', 'lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa']
  },
  'rain-5g-not-working': {
    summary: 'Rain 5G problems are often about router placement, 5G coverage, account status or the router falling back to a weaker connection. Check these before assuming the router is faulty.',
    quickAnswer: {
      meaning: 'Your Rain router or 5G device is connected poorly, not authenticated, outside strong 5G coverage or affected by account or network status.',
      likelyCause: 'Weak indoor 5G signal, router placed too low or far from a window, unpaid or inactive account status, temporary tower congestion, or an APN/profile issue.',
      firstThingToTry: 'Restart the router, place it near a window facing the strongest signal area, then check the Rain account portal for plan or service messages.'
    },
    sections: {
      tryFirst: [
        'Check the Rain account portal for payment, plan, suspension or activation messages.',
        'Move the router to a window or higher shelf and wait a few minutes for signal to settle.',
        'Restart the router from power, not only from the Wi-Fi button.',
        'Test with one device close to the router before judging whole-home coverage.'
      ],
      steps: [
        'Note whether the router shows no signal, weak signal, connected without internet, or only slow speeds.',
        'Move the router away from cupboards, TVs, metal burglar bars and thick internal walls where practical.',
        'Check whether the router dashboard shows 5G, 4G/LTE or no service.',
        'Confirm the APN/profile has not been changed from the Rain profile.',
        'Test speed at two different times of day to separate weak placement from peak-time congestion.',
        'Use official Rain support or the account portal if account status, coverage or device replacement needs checking.'
      ]
    },
    relatedFixSlugs: ['rain-router-no-internet', 'rain-apn-settings', 'lte-router-connected-no-internet', 'lte-router-slow-internet', 'lte-router-apn-settings-south-africa']
  },
  'mobile-data-on-but-not-working': {
    title: 'Mobile data on but not working',
    seoTitle: 'Mobile Data On but Not Working in South Africa | DataCost',
    metaDescription: 'Troubleshoot mobile data that is switched on but not browsing in South Africa. Check signal, SIM, data balance, APN settings, apps and official provider support.',
    h1: 'Mobile data on but not working',
    summary: 'Use this when your phone shows 4G, LTE or 5G but websites and apps will not load. The fix is usually to narrow down whether the problem is balance, signal, APN, phone settings or the network account.',
    quickAnswer: {
      meaning: 'Your phone has a mobile network connection, but the internet data session is not working correctly.',
      likelyCause: 'Expired data, weak coverage, wrong APN, dual-SIM data selection, data saver settings, out-of-bundle block, or a provider-side account issue.',
      firstThingToTry: 'Turn flight mode on and off, check data balance and expiry, then test a simple webpage with Wi-Fi switched off.',
      contact: 'Contact your mobile network through official support if the SIM has data but no device can browse, or if billing, Rica, SIM swap or account status is involved.'
    },
    sections: {
      meaning: [
        'The mobile-data toggle only means the phone is allowed to use mobile internet. It does not prove that your SIM has data, the APN is correct or the network session is active.',
        'Apps can also be blocked by data saver, background-data limits, private DNS, VPN settings or a weak signal indoors.'
      ],
      tryFirst: [
        'Switch Wi-Fi off so you are testing mobile data only.',
        'Turn flight mode on for 20 seconds, then turn it off and wait for LTE or 5G to return.',
        'Check data balance, bundle type and expiry before buying another bundle.',
        'Restart the phone if the SIM was recently inserted, swapped or moved from another device.'
      ],
      steps: [
        'Check whether calls or SMS work. If they do not, start with SIM or network registration rather than APN.',
        'Confirm the correct SIM is selected for mobile data on dual-SIM phones.',
        'Open one simple webpage in the browser, then test WhatsApp or app traffic after that.',
        'Disable VPN, private DNS, data saver or app-specific mobile-data blocks temporarily while testing.',
        'Check APN settings for your network if browsing still fails.',
        'If the same SIM fails in another phone, contact official network support with balance, location and time of failure.'
      ]
    },
    relatedFixSlugs: ['vodacom-apn-settings', 'mtn-apn-settings', 'telkom-apn-settings', 'phone-says-no-internet-south-africa', 'whatsapp-not-working-on-mobile-data']
  },
  'airtime-disappearing-south-africa': {
    title: 'Airtime disappearing in South Africa',
    seoTitle: 'Airtime Disappearing in South Africa: What to Check First | DataCost',
    metaDescription: 'Find common reasons airtime disappears in South Africa, including out-of-bundle data, WASP services, renewals and billing issues. Learn what to check safely.',
    h1: 'Airtime disappearing in South Africa',
    summary: 'Airtime can disappear because of out-of-bundle data, subscription services, bundle renewals, premium SMS, app purchases or normal usage that is hard to spot. Treat it like a billing investigation: check evidence first, then use official support.',
    tags: ['Airtime balance', 'WASP services', 'USSD', 'South Africa'],
    quickAnswer: {
      meaning: 'Your prepaid airtime is being reduced by a charge, data session, renewal or service linked to the SIM.',
      likelyCause: 'Out-of-bundle data after a bundle expires, WASP or VAS subscriptions, recurring bundle renewals, premium SMS, app-store billing or calls/SMS charges.',
      firstThingToTry: 'Turn mobile data off, check airtime and data balance, check active subscriptions, then take screenshots before making changes.',
      contact: 'Contact your mobile network through official support if you need a usage trace, billing dispute, cancellation confirmation or refund discussion.'
    },
    sections: {
      meaning: [
        'Disappearing airtime is not always a WASP problem. In South Africa it is often caused by data usage after a bundle expires, recurring services or automatic renewals.',
        'The safest approach is to pause mobile data, record the balance, check subscriptions and compare the result after a quiet period.',
        'DataCost can help you structure the checks, but only the mobile provider can see account-level billing records.'
      ],
      tryFirst: [
        'Turn mobile data off before loading more airtime if you suspect out-of-bundle data.',
        'Check airtime, data balance and bundle expiry.',
        'Check active subscriptions, WASP, VAS or content services through the official provider menu or app.',
        'Take screenshots of balances, subscription screens and deduction times.'
      ],
      steps: [
        'Write down the starting airtime balance and time.',
        'Turn mobile data off for a short test period and avoid calls or paid SMS during the check.',
        'Check active data bundles and expiry dates. If no valid bundle is active, background apps may use airtime.',
        'Check subscriptions or content services through the official network app or USSD menu.',
        'Cancel only services you recognise as unwanted and keep the confirmation message.',
        'If airtime still drops, ask official support for a usage or billing trace. Do not share OTPs or banking details with unofficial accounts.'
      ],
      whenToContact: [
        'Airtime keeps dropping while mobile data is off and no calls or SMS are being made.',
        'You cannot find the source of a recurring deduction.',
        'A cancellation confirmation was received but charges continued.',
        'You need transaction history, refund review or a formal billing dispute.'
      ],
      whatNotToDo: [
        'Do not keep loading airtime while data is on and no bundle is active.',
        'Do not give OTPs, SIM PINs, ID documents or banking details to unofficial social-media helpers.',
        'Do not assume every deduction is fraud before checking data, renewals, subscriptions and normal usage.'
      ]
    },
    faqs: [
      {
        question: 'Why is my airtime disappearing even when I am not calling?',
        answer: 'Common causes include mobile data after a bundle expires, background app usage, paid subscriptions, bundle renewals, premium SMS or app-store billing linked to the number.'
      },
      {
        question: 'How do I prove what used my airtime?',
        answer: 'Keep screenshots of airtime, data balance, subscription screens and times of deductions. Official provider support can check account-level usage records.'
      },
      {
        question: 'Can DataCost reverse airtime deductions?',
        answer: 'No. DataCost is independent and cannot access your account. Use official provider support for billing traces, disputes or refunds.'
      }
    ],
    relatedFixSlugs: ['stop-wasp-services-vodacom', 'stop-wasp-services-mtn', 'vodacom-airtime-balance-check', 'mtn-airtime-balance-check', 'mobile-data-on-but-not-working']
  },
  'stop-wasp-services-vodacom': {
    summary: 'Use this if Vodacom airtime drops and you suspect a paid content, VAS or WASP subscription. The goal is to check official Vodacom subscription controls and keep proof of any cancellation.',
    sections: {
      tryFirst: [
        'Check your Vodacom airtime balance before making changes.',
        'Use MyVodacom or the official Vodacom self-service menu to look for content services, VAS or subscriptions.',
        'Cancel unwanted services only through official Vodacom channels.',
        'Save cancellation messages and screenshot the subscription screen.'
      ],
      steps: [
        'Open MyVodacom or the official Vodacom self-service menu from the Vodacom SIM.',
        'Look for subscriptions, content services, VAS, WASP or premium services.',
        'Cancel services you do not recognise or no longer want, then wait for confirmation.',
        'Check whether airtime still drops over the next day with mobile data usage controlled.',
        'If charges continue, contact Vodacom through official support and ask for a billing trace.',
        'Do not share OTPs, MyVodacom login details or banking details with unofficial helpers.'
      ]
    },
    relatedFixSlugs: ['airtime-disappearing-south-africa', 'vodacom-airtime-balance-check', 'vodacom-data-balance-check', 'how-to-check-your-own-number-south-africa']
  },
  'stop-wasp-services-mtn': {
    summary: 'Use this if MTN airtime keeps dropping and you suspect paid content, VAS or WASP services. Check subscriptions through official MTN channels and keep evidence before escalating billing questions.',
    sections: {
      tryFirst: [
        'Check your MTN airtime balance before cancelling anything.',
        'Use the MTN app or official MTN self-service menu to look for active subscriptions or content services.',
        'Cancel unwanted services through official MTN channels and save the confirmation.',
        'Also check data balance because out-of-bundle browsing can look like a subscription deduction.'
      ],
      steps: [
        'Open the MTN app or the official MTN self-service menu from the MTN SIM.',
        'Look for active subscriptions, content services, VAS, WASP or premium services.',
        'Cancel services you recognise as unwanted and keep the confirmation message.',
        'Check airtime again after a quiet period with mobile data controlled.',
        'If deductions continue, contact MTN official support and ask for a usage or billing trace.',
        'Do not share OTPs, app login details, SIM PINs or banking details with unofficial support pages.'
      ]
    },
    relatedFixSlugs: ['airtime-disappearing-south-africa', 'mtn-airtime-balance-check', 'mtn-data-balance-check', 'how-to-check-your-own-number-south-africa']
  },
  'prepaid-electricity-token-not-loading': {
    summary: 'Use this when a prepaid electricity token was bought but the meter will not accept or load it. Stay with safe keypad and receipt checks, then contact the token vendor, municipality or Eskom for meter-specific help.',
    sections: {
      tryFirst: [
        'Check the meter number on the receipt against the meter or keypad display.',
        'Enter the token slowly once more, checking every digit.',
        'Check whether units were already added before the error appeared.',
        'Keep the receipt, token, vendor name and purchase time ready for support.'
      ],
      steps: [
        'Do not open, bridge, bypass or tamper with the meter or wiring.',
        'Confirm the token was bought for the correct meter number.',
        'Re-enter the token carefully once. If the same error returns, stop repeated attempts.',
        'If the token came from a banking app or retailer, contact that token vendor with the receipt first.',
        'If the vendor confirms the token is valid but the meter rejects it, contact your municipality or Eskom.',
        'Ask official support whether the issue is meter pairing, KRN/TID status, tamper status, debt recovery or account activation.'
      ]
    }
  },
  'prepaid-meter-says-used': {
    summary: 'A prepaid meter saying used usually means that token has already been accepted for that meter, or the vending system believes it has. Do not buy another token until you check the receipt and recent units.',
    quickAnswer: {
      meaning: 'The token has probably already been loaded, or the meter/vendor records show it was previously used.',
      likelyCause: 'The same token was entered earlier, someone else in the home loaded it, the units were added without being noticed, or the token was generated for the same meter and cannot be reused.',
      firstThingToTry: 'Check the meter units and receipt, then contact the token vendor if the units did not increase.'
    },
    sections: {
      meaning: [
        'Prepaid electricity tokens are normally single-use and tied to a specific meter number.',
        'If a meter says used, entering the same token again will usually not add units.',
        'Only the vendor, municipality or Eskom can confirm transaction status for a specific meter.'
      ],
      steps: [
        'Do not tamper with the meter, wiring or seals.',
        'Check whether the unit balance increased after the first token entry.',
        'Ask other people in the household whether the token was already entered.',
        'Compare the meter number on the receipt with the meter number on the keypad or meter display.',
        'Contact the token vendor with the receipt if money was paid but units did not load.',
        'Escalate to your municipality or Eskom if the vendor says the token was delivered and valid but the meter still has no units.'
      ]
    },
    relatedFixSlugs: ['prepaid-electricity-token-not-loading', 'prepaid-meter-token-rejected', 'prepaid-token-wrong-meter-number', 'prepaid-meter-krn1-krn2-check']
  },
  'prepaid-meter-token-rejected': {
    summary: 'A rejected prepaid token usually points to a meter-number mismatch, invalid token, keypad communication issue or provider-side meter/account status. Keep the checks safe and do not touch meter wiring.',
    quickAnswer: {
      meaning: 'The meter does not accept the token as valid for that meter in its current state.',
      likelyCause: 'Wrong meter number, typing error, old token sequence, KRN/TID update issue, inactive meter, tamper status or vendor-side transaction problem.',
      firstThingToTry: 'Check the meter number and token digits, then stop repeated attempts if the same rejection appears.'
    },
    sections: {
      steps: [
        'Do not open, bypass or interfere with the prepaid meter.',
        'Check the meter number on the receipt against the meter or keypad display.',
        'Re-enter the token slowly once, reading digits in groups to avoid transposing numbers.',
        'Check whether your meter needs a key-change, KRN or TID rollover update token from the official provider.',
        'Contact the token vendor if the token was bought for the wrong meter or no valid token was issued.',
        'Contact the municipality or Eskom for inactive, tamper, pairing or meter-specific rejection messages.'
      ]
    }
  },
  'prepaid-meter-krn1-krn2-check': {
    summary: 'KRN1/KRN2 checks relate to prepaid meter key revision and token rollover readiness. Because this is meter-specific, use official municipality, Eskom or vendor instructions rather than social-media code lists.',
    quickAnswer: {
      meaning: 'Your meter may need confirmation of its key revision status before it continues accepting future prepaid tokens.',
      likelyCause: 'The meter may still be on an older key revision, may need official update tokens, or the vendor may need to confirm TID rollover readiness.',
      firstThingToTry: 'Check your latest official provider notice or ask your municipality, Eskom or token vendor what process applies to your meter.'
    },
    sections: {
      meaning: [
        'KRN usually refers to the key revision number used by prepaid electricity token systems.',
        'Some meters require official update tokens or provider-led checks as part of token identifier rollover work.',
        'The correct process depends on the meter, provider and vending system, so generic code lists can be risky.'
      ],
      tryFirst: [
        'Use only official instructions from your municipality, Eskom or token vendor.',
        'Have your meter number and recent purchase receipt ready.',
        'Do not enter random key-change codes from social media.',
        'Do not buy a large token if you have been warned that the meter needs an update first.'
      ],
      steps: [
        'Confirm your meter number from the keypad or physical meter.',
        'Check official notices from your municipality, Eskom or token vendor about KRN or TID rollover.',
        'Ask whether your meter needs update tokens before normal recharge tokens.',
        'Enter only the official tokens supplied for your meter, in the order provided.',
        'Keep screenshots or receipts showing the update and recharge sequence.',
        'Contact official support if the meter rejects update tokens or still will not accept normal tokens.'
      ],
      whatNotToDo: [
        'Do not tamper with the meter or wiring.',
        'Do not use random KRN/TID codes from unofficial websites or social media.',
        'Do not share banking details, OTPs or ID documents with unofficial helpers.',
        'Do not ignore official rollover notices if your meter has started rejecting tokens.'
      ]
    }
  },
  'dstv-e48-32-error': {
    summary: 'DStv E48-32 is usually a signal problem, not a payment problem. In South Africa it often appears during heavy rain, after dish movement, or when a cable/LNB connection has degraded.',
    quickAnswer: {
      meaning: 'The decoder is not receiving a usable satellite signal for the selected channel.',
      likelyCause: 'Heavy rain, dish misalignment, loose coax cable, damaged LNB, water ingress or installation movement.',
      firstThingToTry: 'Wait for severe weather to pass, then check only accessible indoor cable connections and the decoder signal screen.'
    },
    sections: {
      tryFirst: [
        'Check whether the error started during rain or strong wind.',
        'Restart the decoder after weather clears.',
        'Check accessible indoor cables at the decoder without climbing or opening outdoor equipment.',
        'Look at the decoder signal strength and quality screen if available.'
      ],
      steps: [
        'Write down whether the error appears on all channels or only some channels.',
        'Power the decoder off for one minute, then restart it.',
        'Check the coax cable at the back of the decoder and make sure it is firmly connected.',
        'Check signal strength and quality in the decoder menu if available.',
        'If the signal remains low after weather clears, contact official DStv support or a qualified installer.',
        'Do not climb onto the roof or adjust a dish in unsafe conditions.'
      ],
      whenToContact: [
        'The error remains after rain has cleared and the decoder was restarted.',
        'Signal quality is low or unstable across many channels.',
        'The dish, LNB or outdoor cable may have moved or been damaged.',
        'You need account or decoder checks through official DStv support.'
      ]
    },
    relatedFixSlugs: ['dstv-no-signal-after-rain', 'dstv-e30-error', 'dstv-channels-missing-after-payment', 'openview-e52-searching-for-signal']
  },
  'dstv-e16-error': {
    summary: 'DStv E16 is usually an access or subscription message. Check payment allocation and package status through official DStv self-service before changing dish or decoder settings.',
    quickAnswer: {
      meaning: 'The selected channel is not currently authorised on the decoder or account.',
      likelyCause: 'Payment delay, package mismatch, inactive subscription, smartcard pairing issue or entitlement refresh needed.',
      firstThingToTry: 'Confirm payment and package status through official DStv self-service, then leave the decoder on while any reset completes.'
    },
    sections: {
      steps: [
        'Check whether the error is on one channel or all subscription channels.',
        'Confirm payment, package and account status through official DStv self-service.',
        'Restart the decoder once and wait for it to finish booting.',
        'Check that the smartcard is seated correctly if your decoder uses one.',
        'Request help only through official DStv support if an account reset or pairing check is needed.',
        'Do not share login details, OTPs or payment card details with unofficial reset pages.'
      ]
    },
    relatedFixSlugs: ['dstv-payment-made-still-not-working', 'dstv-channels-missing-after-payment', 'dstv-smartcard-error', 'dstv-e30-error']
  },
  'dstv-no-signal-after-rain': {
    summary: 'No signal after rain usually points to weather fade, water ingress, dish movement or an LNB/cable issue. Wait for weather to clear before deciding the installation has failed.',
    quickAnswer: {
      meaning: 'The decoder is not receiving a stable satellite signal after bad weather.',
      likelyCause: 'Rain fade, water in outdoor connectors, dish movement from wind, or a weakened LNB/cable connection.',
      firstThingToTry: 'Wait for heavy rain to pass, restart the decoder, then check accessible indoor cable connections only.'
    },
    sections: {
      steps: [
        'Wait until heavy rain or lightning has passed before troubleshooting.',
        'Restart the decoder and check whether signal returns after a few minutes.',
        'Check only the indoor cable connection at the decoder if it is safe and accessible.',
        'Check signal quality in the decoder menu and note whether it moves up and down.',
        'If signal remains low after weather clears, contact official DStv support or a qualified installer.',
        'Do not climb on roofs, adjust dishes or touch wet outdoor cables in unsafe conditions.'
      ]
    },
    relatedFixSlugs: ['dstv-e48-32-error', 'dstv-e50-error', 'dstv-e74-error', 'openview-e52-searching-for-signal']
  },
  'openview-e52-searching-for-signal': {
    summary: 'Openview E52 searching for signal usually means the decoder cannot lock onto the satellite signal. Focus on weather, dish/cable signal and activation status, without assuming DataCost is Openview support.',
    quickAnswer: {
      meaning: 'The Openview decoder is searching because it is not receiving a usable satellite signal.',
      likelyCause: 'Dish alignment, loose cable, LNB fault, bad weather, wrong installation settings or activation not completing after a signal problem.',
      firstThingToTry: 'Restart the decoder, check accessible indoor cables, then check signal strength in the decoder menu.'
    },
    sections: {
      steps: [
        'Restart the Openview decoder and wait for the boot process to complete.',
        'Check whether the message appears on all channels.',
        'Inspect the indoor cable connection at the decoder if it is safe to reach.',
        'Open the signal screen and note strength and quality readings if available.',
        'Run a channel scan only if the signal reading is stable enough.',
        'Contact official Openview support or a qualified installer if signal remains low or activation cannot complete.'
      ],
      whatNotToDo: [
        'Do not climb onto roofs or adjust outdoor dishes in unsafe weather.',
        'Do not share account details, OTPs or personal documents with unofficial Openview pages.',
        'Do not assume a channel scan will fix a dish or LNB signal problem.'
      ]
    },
    relatedFixSlugs: ['openview-no-channels', 'openview-only-channel-100', 'openview-activation-not-working', 'dstv-e48-32-error']
  },
  'lte-router-connected-no-internet': {
    summary: 'Use this when your phone or laptop connects to the router Wi-Fi, but pages still do not open. That usually means Wi-Fi is fine locally, while the SIM, APN, LTE signal or account needs attention.',
    quickAnswer: {
      meaning: 'Your device is connected to the router, but the router itself is not reaching the mobile internet.',
      likelyCause: 'No active data, weak LTE signal, wrong APN, SIM not registered, account restriction, tower congestion or router profile issue.',
      firstThingToTry: 'Check the router dashboard for SIM status, signal and APN, then confirm the SIM has active data.'
    },
    sections: {
      meaning: [
        'Wi-Fi and internet are not the same thing. Wi-Fi can connect your phone to the router even when the router has no LTE data session.',
        'The router needs a working SIM, active data or plan, usable signal and correct APN profile to browse.'
      ],
      steps: [
        'Connect to the router Wi-Fi and open the router dashboard address shown on the device label or manual.',
        'Check SIM status first. If the SIM is not detected or locked, fix that before changing APN settings.',
        'Check signal bars, network mode and whether the router says connected, registered or disconnected.',
        'Confirm the SIM has active data or an active plan through the provider app or account portal.',
        'Check the APN profile and compare it with the network-specific APN guidance.',
        'Restart the router and test with one device close to it. If the dashboard still shows no LTE connection, contact the network or router provider.'
      ]
    },
    relatedFixSlugs: ['lte-router-apn-settings-south-africa', 'huawei-router-login-192-168-8-1', 'zte-router-login-south-africa', 'telkom-lte-router-no-internet', 'rain-router-no-internet']
  },
  'huawei-router-login-192-168-8-1': {
    summary: 'Many Huawei LTE routers use 192.168.8.1 for the admin dashboard, but some network-branded models use a different address. Use the label and connection status before resetting anything.',
    quickAnswer: {
      meaning: 'You are trying to open the Huawei router admin page to check Wi-Fi, SIM, signal or APN settings.',
      likelyCause: 'Your device is not connected to the Huawei Wi-Fi, the router uses a different gateway, or the admin password has been changed.',
      firstThingToTry: 'Connect to the Huawei router Wi-Fi, then try the address printed on the router label or shown as the gateway in your device network settings.'
    },
    sections: {
      steps: [
        'Connect your phone or laptop to the Huawei router Wi-Fi, not another home Wi-Fi network.',
        'Try 192.168.8.1 in the browser address bar, without adding search words.',
        'If it does not open, check the router label or your device network details for the default gateway.',
        'Use the admin password printed on the label only if it has not been changed.',
        'After login, check SIM status, signal and APN before changing Wi-Fi names or resetting.',
        'Only factory-reset if you understand that Wi-Fi names, admin password and APN profiles may be wiped.'
      ]
    },
    relatedFixSlugs: ['lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa', 'huawei-router-reset-south-africa', 'zte-router-login-south-africa']
  },
  'lte-router-apn-settings-south-africa': {
    summary: 'Use this when an LTE router has a SIM inserted but will not connect after changing networks, replacing a SIM or buying a second-hand router. The APN must match the network on the SIM.',
    quickAnswer: {
      meaning: 'The router may be trying to connect with the wrong mobile-data profile.',
      likelyCause: 'Old APN saved from another network, blank profile, locked router, inactive SIM or account-specific APN requirement.',
      firstThingToTry: 'Log into the router dashboard, add a new APN profile for the SIM network, save it and restart the router.'
    },
    sections: {
      tryFirst: [
        'Confirm which network the SIM uses: Vodacom, MTN, Telkom, Cell C, Rain or another provider.',
        'Check SIM status and data balance before editing APN settings.',
        'Add a new APN profile instead of deleting the old one immediately.',
        'Restart the router after selecting the new profile.'
      ],
      steps: [
        'Log in to the router dashboard using the address and admin details on the router label.',
        'Open the mobile network, profile management or APN settings screen.',
        'Create a new profile named for the SIM network.',
        'Use the APN recommended by the official network support or DataCost APN guide for that network.',
        'Leave optional fields blank unless official support gives you account-specific details.',
        'Save, select the profile, restart the router and check whether the internet light changes to connected.'
      ]
    },
    relatedFixSlugs: ['vodacom-apn-settings', 'mtn-apn-settings', 'telkom-apn-settings', 'rain-apn-settings', 'lte-router-connected-no-internet']
  },
  'rain-router-no-internet': {
    summary: 'Use this when your Rain router Wi-Fi is visible but the internet does not work. Rain issues are often about account status, indoor signal, router placement or the router falling back from 5G to a weak connection.',
    quickAnswer: {
      meaning: 'The Rain router is broadcasting Wi-Fi, but the Rain mobile-data connection is not working.',
      likelyCause: 'Weak indoor Rain signal, inactive or unpaid account, router placement, tower congestion, SIM/profile issue or temporary service problem.',
      firstThingToTry: 'Check the Rain account portal, restart the router and move it to a stronger signal position near a window.'
    },
    sections: {
      steps: [
        'Check the Rain account portal for payment, activation or service messages.',
        'Restart the router from the power plug and wait for it to reconnect.',
        'Move the router near a window or higher shelf and test again after a few minutes.',
        'Log in to the router dashboard and check signal, network mode and connection status.',
        'Test one device close to the router to rule out weak Wi-Fi coverage inside the house.',
        'Contact official Rain support if the portal shows an account issue or the router never registers on the network.'
      ]
    },
    relatedFixSlugs: ['rain-5g-not-working', 'rain-apn-settings', 'lte-router-connected-no-internet', 'lte-router-slow-internet', 'huawei-router-login-192-168-8-1']
  }
};

const relatedFixGraphAdditions: Record<string, string[]> = {
  'mobile-data-on-but-not-working': [
    'vodacom-data-not-working',
    'mtn-data-not-working',
    'cell-c-data-not-working',
    'rain-5g-not-working',
    'lte-router-connected-no-internet'
  ],
  'phone-says-no-internet-south-africa': [
    'mobile-data-on-but-not-working',
    'lte-router-connected-no-internet',
    'router-wifi-working-but-no-internet',
    'vodacom-data-not-working',
    'mtn-data-not-working'
  ],
  'mobile-hotspot-not-working-south-africa': [
    'mobile-data-on-but-not-working',
    'phone-says-no-internet-south-africa',
    'lte-router-connected-no-internet',
    'vodacom-data-balance-check',
    'mtn-data-balance-check'
  ],
  'whatsapp-not-working-on-mobile-data': [
    'mobile-data-on-but-not-working',
    'phone-says-no-internet-south-africa',
    'vodacom-data-not-working',
    'mtn-data-not-working',
    'cell-c-data-not-working'
  ],
  'cannot-receive-otp-mobile-data': [
    'mobile-data-on-but-not-working',
    'phone-says-no-internet-south-africa',
    'how-to-check-your-own-number-south-africa',
    'vodacom-data-not-working',
    'mtn-data-not-working'
  ],
  'vodacom-data-not-working': ['vodacom-apn-settings', 'vodacom-data-balance-check', 'lte-router-connected-no-internet'],
  'mtn-data-not-working': ['mtn-apn-settings', 'mtn-data-balance-check', 'lte-router-connected-no-internet'],
  'telkom-data-not-working': ['telkom-apn-settings', 'telkom-data-balance-check', 'lte-router-connected-no-internet'],
  'cell-c-data-not-working': ['cell-c-apn-settings', 'cell-c-data-balance-check', 'cell-c-lte-router-no-internet', 'lte-router-connected-no-internet'],
  'cell-c-apn-settings': ['cell-c-data-not-working', 'cell-c-lte-router-no-internet', 'cell-c-data-balance-check'],
  'rain-apn-settings': ['rain-5g-not-working', 'rain-router-no-internet', 'lte-router-connected-no-internet'],
  'rain-5g-not-working': ['rain-router-no-internet', 'rain-apn-settings', 'rain-balance-check', 'lte-router-connected-no-internet'],
  'vodacom-airtime-balance-check': ['airtime-disappearing-south-africa', 'stop-wasp-services-vodacom', 'vodacom-data-balance-check'],
  'mtn-airtime-balance-check': ['airtime-disappearing-south-africa', 'stop-wasp-services-mtn', 'mtn-data-balance-check'],
  'telkom-airtime-balance-check': ['airtime-disappearing-south-africa', 'stop-wasp-services-telkom', 'telkom-data-balance-check'],
  'cell-c-airtime-balance-check': ['airtime-disappearing-south-africa', 'stop-wasp-services-cell-c', 'cell-c-data-balance-check'],
  'vodacom-data-balance-check': ['vodacom-data-not-working', 'vodacom-apn-settings', 'stop-wasp-services-vodacom'],
  'mtn-data-balance-check': ['mtn-data-not-working', 'mtn-apn-settings', 'stop-wasp-services-mtn'],
  'telkom-data-balance-check': ['telkom-data-not-working', 'telkom-apn-settings', 'stop-wasp-services-telkom'],
  'cell-c-data-balance-check': ['cell-c-data-not-working', 'cell-c-apn-settings', 'stop-wasp-services-cell-c'],
  'rain-balance-check': ['rain-5g-not-working', 'rain-router-no-internet', 'rain-apn-settings'],
  'airtime-disappearing-south-africa': [
    'stop-wasp-services-vodacom',
    'stop-wasp-services-mtn',
    'stop-wasp-services-telkom',
    'stop-wasp-services-cell-c',
    'vodacom-airtime-balance-check'
  ],
  'stop-wasp-services-vodacom': ['airtime-disappearing-south-africa', 'vodacom-airtime-balance-check', 'vodacom-data-balance-check'],
  'stop-wasp-services-mtn': ['airtime-disappearing-south-africa', 'mtn-airtime-balance-check', 'mtn-data-balance-check'],
  'stop-wasp-services-telkom': ['airtime-disappearing-south-africa', 'telkom-airtime-balance-check', 'telkom-data-balance-check'],
  'stop-wasp-services-cell-c': ['airtime-disappearing-south-africa', 'cell-c-airtime-balance-check', 'cell-c-data-balance-check'],
  'lte-router-connected-no-internet': [
    'lte-router-apn-settings-south-africa',
    'lte-router-sim-not-detected',
    'lte-router-red-light-no-internet',
    'router-wifi-working-but-no-internet',
    'lte-router-slow-internet'
  ],
  'lte-router-apn-settings-south-africa': [
    'how-to-change-router-apn',
    'vodacom-apn-settings',
    'mtn-apn-settings',
    'cell-c-apn-settings',
    'rain-apn-settings'
  ],
  'lte-router-sim-not-detected': ['lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa', 'huawei-router-login-192-168-8-1'],
  'lte-router-red-light-no-internet': ['lte-router-connected-no-internet', 'lte-router-sim-not-detected', 'lte-router-slow-internet'],
  'lte-router-slow-internet': ['lte-router-connected-no-internet', 'lte-router-red-light-no-internet', 'rain-5g-not-working'],
  'router-wifi-working-but-no-internet': ['lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa', 'rain-router-no-internet'],
  'how-to-change-router-apn': ['lte-router-apn-settings-south-africa', 'lte-router-connected-no-internet', 'vodacom-apn-settings', 'mtn-apn-settings'],
  'huawei-router-login-192-168-8-1': ['lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa', 'lte-router-sim-not-detected'],
  'huawei-router-reset-south-africa': ['huawei-router-login-192-168-8-1', 'lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa'],
  'zte-router-login-south-africa': ['lte-router-connected-no-internet', 'lte-router-apn-settings-south-africa', 'lte-router-sim-not-detected'],
  'prepaid-electricity-token-not-loading': [
    'prepaid-meter-token-rejected',
    'prepaid-meter-error-30',
    'prepaid-electricity-bought-but-no-token',
    'prepaid-token-wrong-meter-number',
    'prepaid-meter-token-loaded-but-no-electricity'
  ],
  'prepaid-meter-token-rejected': [
    'prepaid-electricity-token-not-loading',
    'prepaid-meter-error-30',
    'prepaid-token-wrong-meter-number',
    'prepaid-meter-krn1-krn2-check',
    'prepaid-meter-tid-rollover-explained'
  ],
  'prepaid-meter-error-30': [
    'prepaid-meter-token-rejected',
    'prepaid-electricity-token-not-loading',
    'prepaid-meter-krn1-krn2-check',
    'prepaid-meter-tid-rollover-explained',
    'prepaid-meter-communication-error'
  ],
  'prepaid-electricity-bought-but-no-token': [
    'prepaid-electricity-token-not-loading',
    'prepaid-meter-token-rejected',
    'prepaid-token-wrong-meter-number',
    'prepaid-meter-says-used'
  ],
  'prepaid-token-wrong-meter-number': [
    'prepaid-meter-token-rejected',
    'prepaid-electricity-token-not-loading',
    'prepaid-electricity-bought-but-no-token',
    'prepaid-meter-says-used'
  ],
  'prepaid-meter-says-used': ['prepaid-electricity-token-not-loading', 'prepaid-token-wrong-meter-number', 'prepaid-electricity-bought-but-no-token'],
  'prepaid-meter-token-loaded-but-no-electricity': [
    'prepaid-electricity-token-not-loading',
    'prepaid-meter-says-connect',
    'prepaid-meter-over-power-error',
    'prepaid-meter-communication-error'
  ],
  'prepaid-meter-says-connect': ['prepaid-meter-communication-error', 'prepaid-meter-ciu-not-paired', 'prepaid-meter-keypad-not-working'],
  'prepaid-meter-communication-error': ['prepaid-meter-says-connect', 'prepaid-meter-ciu-not-paired', 'prepaid-meter-keypad-not-working', 'prepaid-meter-blank-screen'],
  'prepaid-meter-ciu-not-paired': ['prepaid-meter-communication-error', 'prepaid-meter-says-connect', 'prepaid-meter-keypad-not-working'],
  'prepaid-meter-keypad-not-working': ['prepaid-meter-low-battery', 'prepaid-meter-blank-screen', 'prepaid-meter-communication-error'],
  'prepaid-meter-low-battery': ['prepaid-meter-keypad-not-working', 'prepaid-meter-blank-screen', 'prepaid-meter-says-connect'],
  'prepaid-meter-blank-screen': ['prepaid-meter-low-battery', 'prepaid-meter-keypad-not-working', 'prepaid-meter-communication-error'],
  'prepaid-meter-krn1-krn2-check': ['prepaid-meter-tid-rollover-explained', 'prepaid-meter-token-rejected', 'prepaid-meter-error-30'],
  'prepaid-meter-tid-rollover-explained': ['prepaid-meter-krn1-krn2-check', 'prepaid-meter-token-rejected', 'prepaid-meter-error-30'],
  'prepaid-meter-e01-error': ['prepaid-meter-token-rejected', 'prepaid-meter-error-30', 'prepaid-meter-communication-error'],
  'prepaid-meter-error-77': ['prepaid-meter-error-30', 'prepaid-meter-token-rejected', 'prepaid-meter-communication-error'],
  'prepaid-meter-not-act-error': ['prepaid-meter-token-rejected', 'prepaid-meter-error-30', 'prepaid-meter-krn1-krn2-check'],
  'prepaid-meter-over-power-error': ['prepaid-meter-token-loaded-but-no-electricity', 'prepaid-meter-error-77', 'prepaid-electricity-token-not-loading'],
  'prepaid-meter-tamper-error': ['prepaid-meter-token-rejected', 'prepaid-meter-error-30', 'prepaid-meter-not-act-error'],
  'dstv-e48-32-error': ['dstv-no-signal-after-rain', 'dstv-e74-error', 'dstv-e50-error', 'openview-e52-searching-for-signal'],
  'dstv-payment-made-still-not-working': ['dstv-e16-error', 'dstv-e30-error', 'dstv-channels-missing-after-payment', 'dstv-smartcard-error'],
  'dstv-e16-error': ['dstv-payment-made-still-not-working', 'dstv-channels-missing-after-payment', 'dstv-smartcard-error'],
  'dstv-e17-error': ['dstv-smartcard-error', 'dstv-e16-error', 'dstv-payment-made-still-not-working'],
  'dstv-e19-error': ['dstv-payment-made-still-not-working', 'dstv-e30-error', 'dstv-channels-missing-after-payment'],
  'dstv-e30-error': ['dstv-payment-made-still-not-working', 'dstv-channels-missing-after-payment', 'dstv-e16-error'],
  'dstv-e32-error': ['dstv-payment-made-still-not-working', 'dstv-smartcard-error', 'dstv-e16-error'],
  'dstv-e50-error': ['dstv-e48-32-error', 'dstv-no-signal-after-rain', 'dstv-e74-error'],
  'dstv-e72-error': ['dstv-smartcard-error', 'dstv-payment-made-still-not-working', 'dstv-e16-error'],
  'dstv-e73-error': ['dstv-e48-32-error', 'dstv-no-signal-after-rain', 'dstv-e74-error'],
  'dstv-e74-error': ['dstv-e48-32-error', 'dstv-no-signal-after-rain', 'dstv-e50-error'],
  'dstv-no-signal-after-rain': ['dstv-e48-32-error', 'dstv-e74-error', 'openview-e52-searching-for-signal'],
  'dstv-smartcard-error': ['dstv-e16-error', 'dstv-payment-made-still-not-working', 'dstv-e72-error'],
  'dstv-decoder-not-booting': ['dstv-smartcard-error', 'dstv-payment-made-still-not-working', 'dstv-e30-error'],
  'dstv-channels-missing-after-payment': ['dstv-payment-made-still-not-working', 'dstv-e16-error', 'dstv-e30-error'],
  'openview-e52-searching-for-signal': ['openview-no-channels', 'openview-only-channel-100', 'openview-activation-not-working', 'dstv-e48-32-error'],
  'openview-error-200': ['openview-activation-not-working', 'openview-no-channels', 'openview-e52-searching-for-signal'],
  'openview-no-channels': ['openview-e52-searching-for-signal', 'openview-only-channel-100', 'openview-activation-not-working'],
  'openview-only-channel-100': ['openview-activation-not-working', 'openview-no-channels', 'openview-e52-searching-for-signal'],
  'openview-activation-not-working': ['openview-only-channel-100', 'openview-error-200', 'openview-e52-searching-for-signal']
};

function applyPriorityOverride(page: FixPage): FixPage {
  const override = priorityPageOverrides[page.slug];
  if (!override) return page;

  return {
    ...page,
    ...override,
    quickAnswer: {
      ...page.quickAnswer,
      ...override.quickAnswer
    },
    sections: {
      ...page.sections,
      ...override.sections
    }
  };
}

function buildFixSeoTitle(page: FixPage): string {
  const suffix = page.cluster === 'ussd' ? 'Guide' : page.cluster === 'tv-decoder' ? 'Help' : 'Fix';
  const title = `${page.title} ${suffix} | DataCost`;
  return title.length > 60 ? `${page.title} | DataCost` : title;
}

function buildFixMetaDescription(page: FixPage): string {
  return `${page.title}: check likely causes, safe first steps, what to avoid, and when to contact official support in South Africa.`;
}

function applySeoLengthDefaults(page: FixPage): FixPage {
  return {
    ...page,
    seoTitle: buildFixSeoTitle(page),
    metaDescription: buildFixMetaDescription(page)
  };
}

function getMergedRelatedFixSlugs(page: FixPage): string[] {
  const slugs = [...(relatedFixGraphAdditions[page.slug] ?? []), ...page.relatedFixSlugs];
  return slugs.filter((slug, index) =>
    slug !== page.slug && slugs.indexOf(slug) === index && pages.some((candidate) => candidate.slug === slug)
  );
}

export const fixPages = pages.map(applyPriorityOverride).map(applySeoLengthDefaults).map((page) => ({
  ...page,
  relatedFixSlugs: getMergedRelatedFixSlugs(page)
}));

export const fixPagesBySlug = fixPages.reduce<Record<string, FixPage>>((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {});

export function getFixPage(slug?: string): FixPage | undefined {
  if (!slug) return undefined;
  return fixPagesBySlug[slug];
}

export function getFixPath(slug: string): string {
  return `/fix/${slug}/`;
}

export function getFixPagesByCluster(cluster: FixCluster): FixPage[] {
  return fixPages.filter((page) => page.cluster === cluster);
}
