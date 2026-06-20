import { FibrePriceFilter } from './fibrePricing';

export type FibrePageKind = 'hub' | 'guide' | 'provider' | 'comparison';

export type FibreLink = {
  href: string;
  label: string;
  description: string;
};

export type FibreTableRow = {
  label: string;
  value: string;
  note: string;
};

export type FibreContentBlock =
  | {
      type: 'narrative';
      id: string;
      title: string;
      paragraphs: string[];
    }
  | {
      type: 'bullets';
      id: string;
      title: string;
      intro?: string;
      bullets: string[];
    }
  | {
      type: 'table';
      id: string;
      title: string;
      intro?: string;
      columns?: [string, string, string];
      rows: FibreTableRow[];
    }
  | {
      type: 'callout';
      id: string;
      title: string;
      body: string;
      tone?: 'default' | 'warning' | 'success';
    }
  | {
      type: 'company-grid';
      id: string;
      title: string;
      intro?: string;
      companyIds: string[];
    }
  | {
      type: 'price-table';
      id: string;
      title: string;
      intro?: string;
      filter?: FibrePriceFilter;
      limit?: number;
    }
  | {
      type: 'speed-tool';
      id: string;
      title: string;
      intro: string;
    }
  | {
      type: 'cost-tool';
      id: string;
      title: string;
      intro: string;
    }
  | {
      type: 'source-list';
      id: string;
      title: string;
      sourceIds: string[];
    };

export type FibreFaq = {
  question: string;
  answer: string;
};

export type FibrePageDefinition = {
  slug: string;
  path: string;
  kind: FibrePageKind;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  quickAnswer: string;
  summaryCards: Array<{ label: string; text: string }>;
  blocks: FibreContentBlock[];
  relatedLinks: FibreLink[];
  faqs: FibreFaq[];
  sourceIds: string[];
};

const hubLink: FibreLink = {
  href: '/fibre/',
  label: 'Fibre hub',
  description: 'Start with the full DataCost fibre decision guide.'
};

const coreFibreLinks: FibreLink[] = [
  {
    href: '/fibre/how-fibre-internet-works-south-africa/',
    label: 'How fibre works',
    description: 'Understand the line, ONT, router, ISP and installation steps.'
  },
  {
    href: '/fibre/fno-vs-isp-south-africa/',
    label: 'FNO vs ISP',
    description: 'Know who owns the line, who bills you and who fixes faults.'
  },
  {
    href: '/fibre/fibre-prices-south-africa/',
    label: 'Fibre prices',
    description: 'Compare checked price examples with source dates and caveats.'
  },
  {
    href: '/fibre/how-to-check-fibre-coverage-south-africa/',
    label: 'Check coverage',
    description: 'Use exact-address checks before comparing monthly prices.'
  },
  {
    href: '/fibre/fibre-installation-costs-south-africa/',
    label: 'Installation costs',
    description: 'Understand setup, router, delivery, cancellation and clawback terms.'
  },
  {
    href: '/fibre/fibre-vs-lte-south-africa/',
    label: 'Fibre vs LTE/5G',
    description: 'Choose between fixed fibre, prepaid fibre, LTE, 5G and mobile data.'
  }
];

const providerLinks: FibreLink[] = [
  {
    href: '/fibre/openserve-fibre-south-africa/',
    label: 'Openserve fibre',
    description: 'How Openserve works as an FNO and what to check before ordering.'
  },
  {
    href: '/fibre/vumatel-fibre-south-africa/',
    label: 'Vumatel fibre',
    description: 'Understand Vuma coverage, Vuma Reach and ISP choice.'
  },
  {
    href: '/fibre/metrofibre-fibre-south-africa/',
    label: 'MetroFibre',
    description: 'Open-access and direct-service notes for MetroFibre areas.'
  },
  {
    href: '/fibre/frogfoot-fibre-south-africa/',
    label: 'Frogfoot',
    description: 'Frogfoot FTTH, Frogfoot Air and ISP ordering basics.'
  },
  {
    href: '/fibre/octotel-fibre-south-africa/',
    label: 'Octotel',
    description: 'Western Cape open-access fibre and ISP package selection.'
  },
  {
    href: '/fibre/vuma-reach-prepaid-fibre-south-africa/',
    label: 'Vuma Reach prepaid',
    description: 'Low-cost prepaid fibre examples and availability warnings.'
  }
];

const fallbackLinks: FibreLink[] = [
  {
    href: '/network/rain/',
    label: 'Rain data prices',
    description: 'Check Rain as a wireless home-internet fallback.'
  },
  {
    href: '/network/mtn/',
    label: 'MTN data prices',
    description: 'Compare MTN LTE, 5G and mobile-data alternatives.'
  },
  {
    href: '/network/vodacom/',
    label: 'Vodacom data prices',
    description: 'Compare Vodacom mobile and home-internet fallback options.'
  },
  {
    href: '/guides/best-data-deals-south-africa/',
    label: 'Best data deals',
    description: 'Use mobile bundles while waiting for fibre or as backup data.'
  }
];

const fnoVsIspRows: FibreTableRow[] = [
  {
    label: 'FNO',
    value: 'Builds and manages the physical fibre network',
    note: 'Examples: Openserve, Vumatel, MetroFibre, Frogfoot, Octotel, Zoom Fibre.'
  },
  {
    label: 'ISP',
    value: 'Sells the internet service over the fibre network',
    note: 'Examples: Afrihost, Webafrica, Mweb, Vox, Axxess, RSAWEB, Cool Ideas.'
  },
  {
    label: 'Customer support',
    value: 'Usually starts with your ISP',
    note: 'The ISP escalates infrastructure faults to the FNO when the line/network is involved.'
  },
  {
    label: 'Coverage',
    value: 'Comes from the FNO, then package availability from the ISP',
    note: 'A provider can serve your suburb but not your exact complex, street or building.'
  }
];

const speedRows: FibreTableRow[] = [
  { label: '10-25 Mbps', value: 'Light home use', note: 'Browsing, messaging, one stream and small households.' },
  { label: '30-50 Mbps', value: 'Everyday households', note: 'Two to four people, video calls, HD streaming and school work.' },
  { label: '100-200 Mbps', value: 'Busy homes', note: 'Several streams, remote work, gaming, cloud backups and many devices.' },
  { label: '500 Mbps+', value: 'Heavy households', note: 'Large downloads, frequent uploads, creators, gamers and many simultaneous users.' }
];

const costRows: FibreTableRow[] = [
  { label: 'Monthly price', value: 'Core recurring cost', note: 'Confirm the normal price after any first-month or first-3-month promotion.' },
  { label: 'Installation', value: 'Line/build work', note: 'May be free only if you stay connected for a minimum period.' },
  { label: 'Activation/setup', value: 'Account or line activation', note: 'Can appear separately from installation and may be non-refundable.' },
  { label: 'Router/delivery', value: 'Equipment cost', note: 'Check ownership, free-to-use terms, return rules and delivery fees.' },
  { label: 'Cancellation/clawback', value: 'Exit exposure', note: 'Ask what you owe if you cancel after 1, 3, 6 or 12 months.' }
];

const coverageRows: FibreTableRow[] = [
  { label: 'Freestanding home', value: 'Street and premises coverage', note: 'Confirm the fibre route is live and installation can reach the house.' },
  { label: 'Flat or apartment', value: 'Building coverage', note: 'A suburb result is not enough; the building must be connected or installable.' },
  { label: 'Complex or estate', value: 'Body corporate or estate approval', note: 'Installation may require managing agent, estate or landlord permission.' },
  { label: 'Rental property', value: 'Landlord approval', note: 'Get permission before drilling, cabling or signing up for installation.' },
  { label: 'Not covered', value: 'Use fallback options', note: 'Compare fixed LTE, 5G, Rain and mobile data while monitoring rollout.' }
];

function standardSourceBlock(sourceIds: string[]): FibreContentBlock {
  return {
    type: 'source-list',
    id: 'sources',
    title: 'Sources checked for this guide',
    sourceIds
  };
}

function page(
  definition: Omit<FibrePageDefinition, 'relatedLinks' | 'faqs'> & {
    relatedLinks?: FibreLink[];
    faqs?: FibreFaq[];
  }
): FibrePageDefinition {
  return {
    relatedLinks: definition.relatedLinks ?? [hubLink, ...coreFibreLinks],
    faqs: definition.faqs ?? [
      {
        question: 'Can DataCost tell me if fibre is available at my exact address?',
        answer: 'No. Fibre coverage is address-specific, so DataCost explains what to check and links the decision together, but you must confirm availability on an official provider or FNO coverage checker.'
      },
      {
        question: 'Are the prices on DataCost guaranteed?',
        answer: 'No. DataCost treats prices as checked public examples. Final pricing can change by address, FNO, promotion, installation status and provider terms.'
      },
      {
        question: 'Who should I contact when fibre is down?',
        answer: 'Start with the ISP that bills you. The ISP can then escalate line or infrastructure faults to the FNO when needed.'
      }
    ],
    ...definition
  };
}

export const fibrePages: FibrePageDefinition[] = [
  page({
    slug: 'hub',
    path: '/fibre/',
    kind: 'hub',
    title: 'Fibre Internet South Africa: Prices, Coverage, FNOs and ISPs',
    metaDescription:
      'Understand fibre internet in South Africa: FNOs, ISPs, coverage checks, installation, ONTs, routers, prepaid fibre, LTE alternatives and checked price examples.',
    h1: 'Fibre Internet in South Africa: Prices, Coverage, FNOs and ISPs Explained',
    intro:
      'Use this hub to work out whether fibre is available, who owns the line, which ISP sells the package, what month one could cost, and whether fibre, prepaid fibre, LTE or 5G fits your home.',
    quickAnswer:
      'Fibre is usually the strongest home-internet option when your exact address is covered and the installation terms make sense. The fibre network operator owns the physical line, while the ISP sells and supports your internet package.',
    summaryCards: [
      { label: 'Start with coverage', text: 'Check your exact address before comparing prices or speeds.' },
      { label: 'Know the roles', text: 'The FNO owns the line; the ISP bills and supports your service.' },
      { label: 'Compare real cost', text: 'Add monthly price, setup, router, delivery and cancellation exposure.' }
    ],
    sourceIds: ['ispa-fno-isp', 'metrofibre-who-is-who', 'webafrica-fibre', 'axxess-fibre', 'rsaweb-ftth'],
    blocks: [
      {
        type: 'table',
        id: 'consumer-jobs',
        title: 'What this fibre hub helps you decide',
        columns: ['Question', 'What to check', 'Why it matters'],
        rows: [
          { label: 'Can I get fibre?', value: 'Exact address coverage', note: 'A suburb or estate name is not enough.' },
          { label: 'Who owns the line?', value: 'FNO at your address', note: 'The FNO affects installation, faults and available ISPs.' },
          { label: 'Which ISP should I use?', value: 'ISP support, price and terms', note: 'The ISP bills you and handles first-line support.' },
          { label: 'What will month one cost?', value: 'Setup, router, delivery and promo terms', note: 'Free installation can still have cancellation clawbacks.' },
          { label: 'What speed do I need?', value: 'Household size and usage', note: 'A cheap line can be frustrating for work calls or multiple streams.' }
        ]
      },
      {
        type: 'table',
        id: 'roles',
        title: 'FNO vs ISP in plain English',
        intro: 'South African fibre often has two companies behind one connection.',
        rows: fnoVsIspRows
      },
      {
        type: 'company-grid',
        id: 'main-fnos',
        title: 'Major fibre network operators to recognise',
        intro: 'These are infrastructure names consumers commonly see during coverage checks or package comparisons.',
        companyIds: ['openserve', 'vumatel', 'metrofibre', 'frogfoot', 'octotel', 'zoom-fibre', 'vuma-reach']
      },
      {
        type: 'price-table',
        id: 'checked-prices',
        title: 'Checked public fibre price examples',
        intro: 'Use these as market examples only. Your final package depends on address, FNO, ISP and promotion terms.',
        limit: 8
      },
      { type: 'speed-tool', id: 'speed-tool', title: 'Choose a speed band', intro: 'Pick a starting speed from household use, not from the lowest headline price.' },
      { type: 'cost-tool', id: 'cost-tool', title: 'Estimate first-month and cancellation exposure', intro: 'Use this checklist before you sign up or switch providers.' },
      standardSourceBlock(['ispa-fno-isp', 'metrofibre-who-is-who', 'mweb-openserve', 'webafrica-fibre', 'axxess-fibre', 'rsaweb-ftth'])
    ],
    relatedLinks: [...coreFibreLinks, ...providerLinks.slice(0, 4), ...fallbackLinks]
  }),
  page({
    slug: 'how-fibre-internet-works-south-africa',
    path: '/fibre/how-fibre-internet-works-south-africa/',
    kind: 'guide',
    title: 'How Fibre Internet Works in South Africa',
    metaDescription:
      'Learn how fibre internet works in South Africa, including FNOs, ISPs, fibre cables, ONTs, routers, installation and support responsibilities.',
    h1: 'How Fibre Internet Works in South Africa',
    intro:
      'Fibre is not just a router in your lounge. It is a chain of physical network infrastructure, an optical terminal, a Wi-Fi router and an ISP service layered on top.',
    quickAnswer:
      'A fibre network operator brings optical fibre to the property, installs or activates the line and ONT, and an ISP sells the internet package that your router uses to connect your home.',
    summaryCards: [
      { label: 'Physical layer', text: 'The FNO builds and maintains the fibre line.' },
      { label: 'Service layer', text: 'The ISP authenticates, bills and supports the package.' },
      { label: 'Home layer', text: 'The ONT converts fibre signal; the router distributes Wi-Fi.' }
    ],
    sourceIds: ['ispa-fno-isp', 'metrofibre-who-is-who', 'afrihost-fibre', 'mweb-openserve'],
    blocks: [
      {
        type: 'narrative',
        id: 'how-it-works',
        title: 'The connection chain',
        paragraphs: [
          'Fibre carries data as light through optical cable. In a home setup, that cable usually terminates in an ONT or similar fibre device. The ONT connects to a router, and the router gives your devices Wi-Fi or Ethernet.',
          'The important South African wrinkle is that the company that owns the line is often not the company billing you. Openserve, Vumatel, Frogfoot, Octotel and MetroFibre are infrastructure names. Afrihost, Webafrica, Mweb, Vox, Axxess and RSAWEB are examples of ISPs selling service over one or more networks.',
          'When everything works, the separation is invisible. When there is a fault, moving house, installation delay or cancellation charge, understanding the separation helps you know who to contact and what to ask.'
        ]
      },
      { type: 'table', id: 'roles', title: 'Who does what', rows: fnoVsIspRows },
      {
        type: 'table',
        id: 'home-equipment',
        title: 'Equipment inside the home',
        columns: ['Item', 'Purpose', 'What to check'],
        rows: [
          { label: 'Fibre box / wall point', value: 'Physical point where the line enters or terminates', note: 'Do not move or tamper with it without provider approval.' },
          { label: 'ONT', value: 'Converts optical fibre signal to Ethernet', note: 'Usually belongs to the network or provider and needs power.' },
          { label: 'Router', value: 'Creates Wi-Fi and routes traffic for devices', note: 'Check whether it is free-to-use, rented, owned or must be returned.' },
          { label: 'UPS / backup power', value: 'Keeps ONT and router alive during outages', note: 'Fibre still depends on upstream provider power and network health.' }
        ]
      },
      standardSourceBlock(['ispa-fno-isp', 'metrofibre-who-is-who', 'afrihost-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[1], coreFibreLinks[4], { href: '/fibre/ont-router-explained-south-africa/', label: 'ONT and router explained', description: 'Understand the equipment in your home.' }]
  }),
  page({
    slug: 'fno-vs-isp-south-africa',
    path: '/fibre/fno-vs-isp-south-africa/',
    kind: 'guide',
    title: 'FNO vs ISP South Africa: Fibre Roles Explained',
    metaDescription:
      'Understand the difference between fibre network operators and ISPs in South Africa, including installation, billing, faults, coverage and switching.',
    h1: 'FNO vs ISP in South Africa: Who Owns the Fibre Line and Who Bills You?',
    intro:
      'Many South African fibre problems become easier once you separate the fibre network operator from the internet service provider.',
    quickAnswer:
      'The FNO owns or manages the physical fibre infrastructure. The ISP sells the internet package, bills you and is usually your first support contact.',
    summaryCards: [
      { label: 'FNO', text: 'Line, trenching, ONT, area coverage and infrastructure faults.' },
      { label: 'ISP', text: 'Package, billing, router, account support and escalation.' },
      { label: 'Reseller', text: 'May sell or bill a package while relying on another provider underneath.' }
    ],
    sourceIds: ['ispa-fno-isp', 'metrofibre-who-is-who', 'mweb-openserve'],
    blocks: [
      { type: 'table', id: 'role-table', title: 'FNO vs ISP responsibilities', rows: fnoVsIspRows },
      {
        type: 'bullets',
        id: 'questions',
        title: 'Questions to ask before ordering',
        bullets: [
          'Which fibre network operator covers my exact address?',
          'Which ISPs can sell service on that network?',
          'Who owns the router and ONT?',
          'Who do I contact if installation is delayed?',
          'Who do I contact if the line is down but my account is paid?',
          'What happens if I switch ISP but stay on the same FNO?'
        ]
      },
      {
        type: 'callout',
        id: 'support-warning',
        title: 'Do not guess during a fault',
        body: 'If your fibre is down, start with the ISP that bills you. If the issue is the physical line, the ISP can log or escalate the fault with the network operator.',
        tone: 'warning'
      },
      standardSourceBlock(['ispa-fno-isp', 'metrofibre-who-is-who', 'mweb-openserve'])
    ],
    relatedLinks: [hubLink, { href: '/fibre/fibre-network-operators-south-africa/', label: 'Fibre network operators', description: 'See the infrastructure companies consumers should recognise.' }, coreFibreLinks[2], coreFibreLinks[4]]
  }),
  page({
    slug: 'fibre-network-operators-south-africa',
    path: '/fibre/fibre-network-operators-south-africa/',
    kind: 'guide',
    title: 'Fibre Network Operators in South Africa',
    metaDescription:
      'Compare major South African fibre network operators including Openserve, Vumatel, MetroFibre, Frogfoot, Octotel, Zoom Fibre, Evotel and Vuma Reach.',
    h1: 'Fibre Network Operators in South Africa',
    intro:
      'Fibre network operators are the companies behind the physical fibre infrastructure. You may not pay them directly, but they shape coverage, installation and fault handling.',
    quickAnswer:
      'The FNO at your exact address determines which ISPs and packages you can order. Major names include Openserve, Vumatel, MetroFibre, Frogfoot, Octotel, Zoom Fibre and Vuma Reach.',
    summaryCards: [
      { label: 'Coverage first', text: 'Your address usually has one or a few FNO options, not every national provider.' },
      { label: 'ISP choice', text: 'Open-access networks let several ISPs sell over the same infrastructure.' },
      { label: 'Fault path', text: 'Your ISP usually escalates line faults to the FNO.' }
    ],
    sourceIds: ['ispa-fno-isp', 'metrofibre-who-is-who', 'vumatel', 'frogfoot', 'octotel', 'zoom-fibre'],
    blocks: [
      {
        type: 'company-grid',
        id: 'operators',
        title: 'FNOs consumers should recognise',
        companyIds: ['openserve', 'vumatel', 'metrofibre', 'frogfoot', 'octotel', 'zoom-fibre', 'evotel', 'link-africa', 'vuma-reach']
      },
      {
        type: 'table',
        id: 'how-to-use',
        title: 'How to use FNO information',
        rows: [
          { label: 'Checking coverage', value: 'Search by exact address', note: 'A city or suburb result can be misleading.' },
          { label: 'Comparing ISPs', value: 'Filter ISPs by that FNO', note: 'You can only compare packages sold over the network live at your address.' },
          { label: 'Moving home', value: 'Run a fresh coverage check', note: 'Same ISP can have different FNO, speed and price at the new address.' }
        ]
      },
      standardSourceBlock(['ispa-fno-isp', 'metrofibre-who-is-who', 'vumatel', 'frogfoot', 'octotel', 'zoom-fibre'])
    ],
    relatedLinks: [hubLink, ...providerLinks, coreFibreLinks[3]]
  }),
  page({
    slug: 'fibre-prices-south-africa',
    path: '/fibre/fibre-prices-south-africa/',
    kind: 'guide',
    title: 'Fibre Prices South Africa: Checked Package Examples',
    metaDescription:
      'Compare checked public fibre price examples in South Africa with speed, ISP, FNO, setup notes, source links and checked dates.',
    h1: 'Fibre Prices in South Africa: Checked Examples and What They Really Mean',
    intro:
      'Fibre prices are not universal. The same ISP can show different packages depending on address, FNO, promotion and install status.',
    quickAnswer:
      'Use DataCost prices as checked public examples, then confirm your exact address with the provider. Compare monthly price, speed, setup, router and cancellation notes together.',
    summaryCards: [
      { label: 'Not a guarantee', text: 'Every price needs an address check before signup.' },
      { label: 'Compare speed', text: 'Look at upload speed too, especially for work and cloud backups.' },
      { label: 'Compare terms', text: 'Free installation can still include clawback rules.' }
    ],
    sourceIds: ['webafrica-fibre', 'axxess-fibre', 'rsaweb-ftth', 'vox-fibre', 'afrihost-prepaid', 'mweb-openserve'],
    blocks: [
      {
        type: 'callout',
        id: 'address-warning',
        title: 'Prices are checked examples, not live quotes',
        body: 'Fibre pricing is address-specific. Use this table to understand market ranges, then confirm your exact address with the provider before ordering.',
        tone: 'warning'
      },
      { type: 'price-table', id: 'all-prices', title: 'Checked public price examples', limit: 20 },
      { type: 'table', id: 'cost-parts', title: 'Costs to compare beyond monthly price', rows: costRows },
      standardSourceBlock(['webafrica-fibre', 'axxess-fibre', 'rsaweb-ftth', 'vox-fibre', 'afrihost-prepaid', 'mweb-openserve'])
    ],
    relatedLinks: [hubLink, { href: '/fibre/cheapest-fibre-packages-south-africa/', label: 'Cheapest fibre packages', description: 'Sort examples by low monthly price without ignoring terms.' }, coreFibreLinks[4], coreFibreLinks[3]]
  }),
  page({
    slug: 'cheapest-fibre-packages-south-africa',
    path: '/fibre/cheapest-fibre-packages-south-africa/',
    kind: 'guide',
    title: 'Cheapest Fibre Packages South Africa: Checked Examples',
    metaDescription:
      'Review low-cost fibre package examples in South Africa with price, speed, ISP, FNO, setup notes and address-specific warnings.',
    h1: 'Cheapest Fibre Packages in South Africa: Checked Examples',
    intro:
      'The cheapest fibre deal is only useful if it is available at your address and the installation, router and cancellation terms make sense.',
    quickAnswer:
      'Start with low monthly examples, but do not choose only by price. Check the FNO, speed, upload speed, setup terms, router rules and cancellation exposure.',
    summaryCards: [
      { label: 'Lowest price', text: 'Often prepaid, entry-speed or area-specific.' },
      { label: 'Best value', text: 'Usually balances speed, support and low hidden fees.' },
      { label: 'Must verify', text: 'Exact address coverage and promotion expiry.' }
    ],
    sourceIds: ['rsaweb-ftth', 'axxess-fibre', 'webafrica-fibre', 'vox-fibre', 'afrihost-prepaid'],
    blocks: [
      { type: 'price-table', id: 'cheap-prices', title: 'Lowest checked public examples', filter: { maxMonthlyPrice: 550 }, limit: 12 },
      {
        type: 'bullets',
        id: 'cheap-red-flags',
        title: 'Cheap fibre red flags',
        bullets: [
          'A price that applies only for the first month or first few months.',
          'A low headline price without upload speed shown.',
          'No clear answer on installation, activation or router return rules.',
          'A package that is only available in selected prepaid or township coverage zones.',
          'A cancellation fee that wipes out the first-month saving.'
        ]
      },
      { type: 'speed-tool', id: 'speed-tool', title: 'Check whether the cheap speed is enough', intro: 'A cheap 10-25 Mbps plan can be fine for light use but weak for busy homes.' },
      standardSourceBlock(['rsaweb-ftth', 'axxess-fibre', 'webafrica-fibre', 'vox-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[2], coreFibreLinks[4], { href: '/fibre/vuma-reach-prepaid-fibre-south-africa/', label: 'Vuma Reach prepaid', description: 'Understand low-cost prepaid fibre availability.' }]
  }),
  page({
    slug: 'cheap-fibre-south-africa',
    path: '/fibre/cheap-fibre-south-africa/',
    kind: 'guide',
    title: 'Cheap Fibre Internet South Africa: Real Cost Checklist',
    metaDescription:
      'Learn how to compare cheap fibre internet in South Africa by monthly price, speed, setup, router, coverage, promotion and cancellation terms.',
    h1: 'Cheap Fibre Internet in South Africa: What to Check Before You Sign Up',
    intro: 'Cheap fibre is not just the lowest monthly price. The real cost is monthly fee plus speed, setup, router, installation and exit terms.',
    quickAnswer: 'A cheap fibre package is good only if it is available at your address, fast enough for your household and does not hide setup or cancellation costs.',
    summaryCards: [
      { label: 'Compare total cost', text: 'Add setup, activation, router, delivery and cancellation exposure.' },
      { label: 'Check speed fit', text: 'Entry fibre is not always enough for several users.' },
      { label: 'Confirm address', text: 'Provider examples are not proof of availability.' }
    ],
    sourceIds: ['webafrica-fibre', 'axxess-fibre', 'rsaweb-ftth', 'vox-fibre'],
    blocks: [
      { type: 'price-table', id: 'cheap-table', title: 'Low monthly examples to verify', filter: { maxMonthlyPrice: 550 }, limit: 10 },
      { type: 'table', id: 'real-cost', title: 'Real cost checklist', rows: costRows },
      { type: 'callout', id: 'clawback', title: 'Free installation can still cost later', body: 'Ask whether free installation, setup or router offers have minimum-stay or clawback conditions.', tone: 'warning' },
      standardSourceBlock(['webafrica-fibre', 'axxess-fibre', 'rsaweb-ftth', 'vox-fibre'])
    ]
  }),
  page({
    slug: 'how-to-check-fibre-coverage-south-africa',
    path: '/fibre/how-to-check-fibre-coverage-south-africa/',
    kind: 'guide',
    title: 'How to Check Fibre Coverage in South Africa',
    metaDescription:
      'Learn how to check fibre coverage in South Africa by exact address, FNO, ISP, complex, estate, rental and building status.',
    h1: 'How to Check Fibre Coverage in South Africa',
    intro: 'Fibre coverage is exact-address specific. A provider can serve your suburb but still not serve your building, complex or street.',
    quickAnswer: 'Use an official address checker, identify the FNO, confirm property permission, then compare only the ISP packages available on that network.',
    summaryCards: [
      { label: 'Exact address', text: 'Do not rely only on suburb or city coverage.' },
      { label: 'Property permission', text: 'Flats, complexes, estates and rentals can block installation.' },
      { label: 'Fallback', text: 'Use LTE, 5G or mobile data when fibre is not live.' }
    ],
    sourceIds: ['afrihost-fibre', 'webafrica-fibre', 'mweb-openserve', 'vumatel', 'frogfoot'],
    blocks: [
      { type: 'table', id: 'coverage-checklist', title: 'Coverage checklist by property type', rows: coverageRows },
      {
        type: 'bullets',
        id: 'steps',
        title: 'Coverage check steps',
        bullets: [
          'Run an address lookup on the ISP or FNO site.',
          'Check whether the result says available, pre-order, planned or not covered.',
          'For flats and complexes, ask the managing agent whether the building is connected.',
          'For rentals, get landlord approval before installation.',
          'Ask which FNO is behind the offer before comparing ISP packages.'
        ]
      },
      standardSourceBlock(['afrihost-fibre', 'webafrica-fibre', 'mweb-openserve', 'vumatel', 'frogfoot'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[1], coreFibreLinks[2], ...fallbackLinks]
  }),
  page({
    slug: 'fibre-installation-costs-south-africa',
    path: '/fibre/fibre-installation-costs-south-africa/',
    kind: 'guide',
    title: 'Fibre Installation Costs South Africa: Fees Explained',
    metaDescription:
      'Understand fibre installation costs in South Africa, including setup fees, router rules, delivery, cancellation, clawbacks and moving-house risks.',
    h1: 'Fibre Installation Costs in South Africa: Setup, Router and Cancellation Fees Explained',
    intro: 'Fibre installation can look free upfront but still carry terms. The important question is what you owe today, while connected and when you leave.',
    quickAnswer: 'Before ordering, ask about installation, activation, router ownership, delivery, cancellation, clawback terms and moving-house rules.',
    summaryCards: [
      { label: 'Free has terms', text: 'Free setup may depend on staying for a minimum period.' },
      { label: 'Router matters', text: 'Check ownership, return rules and replacement cost.' },
      { label: 'Moving risk', text: 'A new address can trigger a new coverage and installation process.' }
    ],
    sourceIds: ['afrihost-fibre', 'webafrica-fibre', 'mweb-openserve'],
    blocks: [
      { type: 'table', id: 'fees', title: 'Common fibre fees', rows: costRows },
      { type: 'cost-tool', id: 'cost-tool', title: 'First-month cost calculator checklist', intro: 'Use this before paying a deposit, accepting a router or booking installation.' },
      {
        type: 'bullets',
        id: 'questions',
        title: 'Questions to ask the ISP',
        bullets: [
          'What is the total due before activation?',
          'What is the normal monthly price after the promotion?',
          'Who owns the router and ONT?',
          'What do I owe if I cancel after one, three or six months?',
          'Does moving house count as cancellation if the new address is not covered?'
        ]
      },
      standardSourceBlock(['afrihost-fibre', 'webafrica-fibre', 'mweb-openserve'])
    ]
  }),
  page({
    slug: 'fibre-installation-process-south-africa',
    path: '/fibre/fibre-installation-process-south-africa/',
    kind: 'guide',
    title: 'Fibre Installation Process South Africa',
    metaDescription:
      'See the typical fibre installation process in South Africa from coverage check and ISP order to FNO installation, ONT, router and activation.',
    h1: 'Fibre Installation Process in South Africa',
    intro: 'A fibre order normally moves through coverage, ISP signup, FNO installation scheduling, ONT setup, router connection and activation.',
    quickAnswer: 'Order with an ISP after coverage is confirmed. The FNO or installation partner handles physical line work, then the ISP activates and supports the service.',
    summaryCards: [
      { label: 'Before order', text: 'Confirm address, property permission and total cost.' },
      { label: 'During install', text: 'The line and ONT are fitted or activated.' },
      { label: 'After install', text: 'Connect the router, test speed and save support details.' }
    ],
    sourceIds: ['frogfoot', 'mweb-openserve', 'afrihost-fibre'],
    blocks: [
      {
        type: 'table',
        id: 'timeline',
        title: 'Typical installation timeline',
        columns: ['Stage', 'Who handles it', 'What to check'],
        rows: [
          { label: 'Coverage check', value: 'ISP or FNO', note: 'Use exact address and property type.' },
          { label: 'Order accepted', value: 'ISP', note: 'Confirm fees, speed, router and cancellation terms.' },
          { label: 'Install scheduled', value: 'FNO or installation team', note: 'Ask about trenching, drilling and landlord approval.' },
          { label: 'ONT installed', value: 'FNO or installer', note: 'Needs power and should not be moved casually.' },
          { label: 'Router connected', value: 'ISP or customer', note: 'Test Wi-Fi and Ethernet before closing support ticket.' }
        ]
      },
      { type: 'table', id: 'property-types', title: 'Property approval checklist', rows: coverageRows },
      standardSourceBlock(['frogfoot', 'mweb-openserve', 'afrihost-fibre'])
    ]
  }),
  page({
    slug: 'ont-router-explained-south-africa',
    path: '/fibre/ont-router-explained-south-africa/',
    kind: 'guide',
    title: 'Fibre ONT and Router Explained South Africa',
    metaDescription:
      'Understand the difference between a fibre ONT and Wi-Fi router in South Africa, including ownership, power, troubleshooting and replacement rules.',
    h1: 'Fibre ONT and Router Explained in South Africa',
    intro: 'Many fibre homes have two devices: an ONT for the fibre line and a router for Wi-Fi. They are not the same thing.',
    quickAnswer: 'The ONT connects the fibre line to Ethernet. The router creates Wi-Fi and local network access. Both usually need power during load shedding.',
    summaryCards: [
      { label: 'ONT', text: 'Line device linked to the FNO or installation.' },
      { label: 'Router', text: 'Wi-Fi device linked to the ISP package.' },
      { label: 'Power', text: 'Both usually need backup power to stay online.' }
    ],
    sourceIds: ['afrihost-fibre', 'mweb-openserve'],
    blocks: [
      {
        type: 'table',
        id: 'devices',
        title: 'ONT vs router',
        columns: ['Device', 'Purpose', 'What to ask'],
        rows: [
          { label: 'ONT', value: 'Converts fibre signal to Ethernet', note: 'Who owns it, can it be moved and what lights mean fault?' },
          { label: 'Router', value: 'Shares internet over Wi-Fi and Ethernet', note: 'Is it free-to-use, rented, owned or returnable?' },
          { label: 'UPS', value: 'Keeps devices powered', note: 'How many hours do you need for ONT and router together?' }
        ]
      },
      {
        type: 'bullets',
        id: 'troubleshooting',
        title: 'Before replacing a router',
        bullets: [
          'Check whether the ONT has power and normal status lights.',
          'Test Ethernet from router if Wi-Fi is weak.',
          'Restart ONT and router only if the provider does not warn against it.',
          'Ask the ISP whether the router is locked, leased or free-to-use.',
          'Do not move the fibre wall box or ONT without provider approval.'
        ]
      },
      standardSourceBlock(['afrihost-fibre', 'mweb-openserve'])
    ]
  }),
  page({
    slug: 'prepaid-fibre-south-africa',
    path: '/fibre/prepaid-fibre-south-africa/',
    kind: 'guide',
    title: 'Prepaid Fibre South Africa: How It Works',
    metaDescription:
      'Understand prepaid fibre in South Africa, including Vuma Reach, Zoom Flex, top-ups, vouchers, coverage, expiry, installation and LTE alternatives.',
    h1: 'Prepaid Fibre in South Africa: How It Works, Who It Suits and What to Check',
    intro: 'Prepaid fibre can make home internet feel closer to prepaid mobile data, but it still depends on fibre infrastructure and exact-area availability.',
    quickAnswer: 'Prepaid fibre is useful for renters, students and budget households where the correct prepaid fibre network is live. It is not available everywhere.',
    summaryCards: [
      { label: 'Good for', text: 'Low commitment, shared homes and irregular-income households.' },
      { label: 'Watch', text: 'Coverage, expiry, speed and top-up rules.' },
      { label: 'Examples', text: 'Vuma Reach, Zoom Flex and ISP prepaid offers in selected areas.' }
    ],
    sourceIds: ['rsaweb-ftth', 'afrihost-prepaid', 'zoom-fibre', 'vumatel'],
    blocks: [
      { type: 'price-table', id: 'prepaid-prices', title: 'Checked prepaid fibre examples', filter: { tags: ['prepaid'] }, limit: 8 },
      {
        type: 'table',
        id: 'prepaid-vs-monthly',
        title: 'Prepaid fibre vs monthly fibre',
        rows: [
          { label: 'Prepaid fibre', value: 'Top up or pay upfront', note: 'Useful for control, but may have selected-area coverage.' },
          { label: 'Month-to-month fibre', value: 'Recurring monthly billing', note: 'Often more package choice, but may include cancellation rules.' },
          { label: 'LTE/5G fallback', value: 'Wireless router or SIM', note: 'Easier where fibre is absent, but signal and data policies matter.' }
        ]
      },
      standardSourceBlock(['rsaweb-ftth', 'afrihost-prepaid', 'zoom-fibre', 'vumatel'])
    ],
    relatedLinks: [hubLink, { href: '/fibre/vuma-reach-prepaid-fibre-south-africa/', label: 'Vuma Reach prepaid fibre', description: 'Check low-cost prepaid examples and area limits.' }, { href: '/fibre/prepaid-fibre-vs-month-to-month-fibre/', label: 'Prepaid vs month-to-month', description: 'Compare commitment, top-ups and cancellation risk.' }, coreFibreLinks[5]]
  }),
  page({
    slug: 'prepaid-fibre-vs-month-to-month-fibre',
    path: '/fibre/prepaid-fibre-vs-month-to-month-fibre/',
    kind: 'comparison',
    title: 'Prepaid Fibre vs Month-to-Month Fibre South Africa',
    metaDescription:
      'Compare prepaid fibre and month-to-month fibre in South Africa by coverage, top-ups, contracts, installation, cancellation and household fit.',
    h1: 'Prepaid Fibre vs Month-to-Month Fibre in South Africa',
    intro: 'Both options can reduce long commitments, but they solve different problems.',
    quickAnswer: 'Choose prepaid fibre for top-up control where it is available. Choose month-to-month fibre when you want broader package choice and can manage recurring billing and cancellation terms.',
    summaryCards: [
      { label: 'Prepaid', text: 'Good for budget control and selected lower-cost areas.' },
      { label: 'Month-to-month', text: 'Good for broader ISP and speed choice.' },
      { label: 'Check first', text: 'Coverage, install terms and cancellation rules.' }
    ],
    sourceIds: ['rsaweb-ftth', 'afrihost-prepaid', 'zoom-fibre', 'axxess-fibre'],
    blocks: [
      {
        type: 'table',
        id: 'comparison',
        title: 'Which option suits which household?',
        rows: [
          { label: 'Renters', value: 'Prepaid or month-to-month', note: 'Prepaid helps control spend; month-to-month may have more networks.' },
          { label: 'Students/shared homes', value: 'Prepaid fibre', note: 'Top-up control can reduce payment disputes.' },
          { label: 'Heavy work-from-home', value: 'Month-to-month fibre', note: 'Usually more speed options and mainstream support paths.' },
          { label: 'Irregular income', value: 'Prepaid fibre', note: 'Avoids debit-order pressure where prepaid coverage exists.' }
        ]
      },
      { type: 'price-table', id: 'prepaid-examples', title: 'Prepaid examples to verify', filter: { tags: ['prepaid'] }, limit: 8 },
      standardSourceBlock(['rsaweb-ftth', 'afrihost-prepaid', 'zoom-fibre'])
    ]
  }),
  page({
    slug: 'fibre-vs-lte-south-africa',
    path: '/fibre/fibre-vs-lte-south-africa/',
    kind: 'comparison',
    title: 'Fibre vs LTE/5G South Africa: Home Internet Guide',
    metaDescription:
      'Compare fibre, LTE and 5G home internet in South Africa by speed stability, latency, setup, portability, coverage, gaming, streaming and work use.',
    h1: 'Fibre vs LTE/5G in South Africa: Which Is Better for Home Internet?',
    intro: 'Fibre and LTE/5G both solve home-internet problems, but they behave differently.',
    quickAnswer: 'Choose fibre when your address is covered and you need stable household internet. Choose LTE or 5G when fibre is unavailable, installation is blocked, or portability matters.',
    summaryCards: [
      { label: 'Fibre wins', text: 'Stability, latency and heavy multi-device use.' },
      { label: 'LTE/5G wins', text: 'Fast setup, portability and no fibre installation.' },
      { label: 'Backup', text: 'Many homes need mobile data as fibre failover.' }
    ],
    sourceIds: ['afrihost-fibre', 'webafrica-fibre'],
    blocks: [
      {
        type: 'table',
        id: 'compare',
        title: 'Fibre vs LTE/5G',
        rows: [
          { label: 'Speed stability', value: 'Usually fibre', note: 'Fixed line performance is usually more predictable than mobile signal.' },
          { label: 'Latency', value: 'Usually fibre', note: 'Better for gaming and work calls when the line is healthy.' },
          { label: 'Setup speed', value: 'LTE/5G', note: 'A router/SIM can be faster than fibre installation.' },
          { label: 'Portability', value: 'LTE/5G', note: 'Wireless products are easier to move.' },
          { label: 'Coverage', value: 'Depends on address/signal', note: 'Fibre needs a live address; LTE/5G needs strong local signal.' }
        ]
      },
      { type: 'speed-tool', id: 'speed-tool', title: 'Speed band for fibre or wireless', intro: 'Estimate your usage before choosing the cheapest package.' },
      standardSourceBlock(['afrihost-fibre', 'webafrica-fibre'])
    ],
    relatedLinks: [hubLink, { href: '/fibre/fibre-vs-rain-5g-south-africa/', label: 'Fibre vs Rain 5G', description: 'Compare fibre with Rain-style wireless home internet.' }, ...fallbackLinks]
  }),
  page({
    slug: 'fibre-vs-rain-5g-south-africa',
    path: '/fibre/fibre-vs-rain-5g-south-africa/',
    kind: 'comparison',
    title: 'Fibre vs Rain 5G South Africa',
    metaDescription:
      'Compare fibre and Rain 5G-style home internet in South Africa by coverage, installation, signal, latency, stability, router placement and household use.',
    h1: 'Fibre vs Rain 5G in South Africa',
    intro: 'Rain 5G-style wireless home internet can be a useful fibre alternative, especially where fibre is not installed.',
    quickAnswer: 'Choose fibre for predictable fixed home use when covered. Consider Rain 5G or fixed wireless when fibre is unavailable, installation is delayed, or portability matters.',
    summaryCards: [
      { label: 'Fibre', text: 'Best for stable latency and many devices.' },
      { label: 'Rain 5G', text: 'Useful if signal is strong and fibre is unavailable.' },
      { label: 'Test first', text: 'Wireless performance depends heavily on location and router placement.' }
    ],
    sourceIds: ['afrihost-fibre'],
    blocks: [
      {
        type: 'table',
        id: 'compare-rain',
        title: 'Fibre vs Rain 5G-style wireless',
        rows: [
          { label: 'Installation', value: 'Wireless is simpler', note: 'No trenching or fibre installation if the router is ready.' },
          { label: 'Signal dependence', value: 'Wireless depends more on location', note: 'Router placement and tower load can change performance.' },
          { label: 'Latency', value: 'Fibre usually safer', note: 'Gaming and work calls usually prefer stable fibre latency.' },
          { label: 'Load shedding', value: 'Both need power', note: 'Router backup helps, but upstream network power also matters.' }
        ]
      },
      { type: 'callout', id: 'fallback', title: 'Best answer for many homes', body: 'Use fibre as the primary connection where available, then keep mobile data or wireless as a backup if work or school cannot stop during outages.', tone: 'success' },
      standardSourceBlock(['afrihost-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[5], { href: '/network/rain/', label: 'Rain network page', description: 'Review Rain data and home internet alternatives.' }, { href: '/fix/rain-router-no-internet/', label: 'Rain router no internet', description: 'Troubleshoot Rain router connection problems.' }]
  }),
  page({
    slug: 'openserve-fibre-south-africa',
    path: '/fibre/openserve-fibre-south-africa/',
    kind: 'provider',
    title: 'Openserve Fibre South Africa: Coverage, ISPs and Prices',
    metaDescription:
      'Understand Openserve fibre in South Africa, including FNO role, ISP ordering, coverage, installation, support paths and checked price examples.',
    h1: 'Openserve Fibre in South Africa',
    intro: 'Openserve is the fibre network operator behind many packages sold by retail ISPs.',
    quickAnswer: 'You usually order Openserve fibre through an ISP. Openserve provides infrastructure and installation, while the ISP bills and supports your package.',
    summaryCards: [
      { label: 'Role', text: 'FNO and wholesale infrastructure provider.' },
      { label: 'Order through', text: 'ISPs such as Mweb, Afrihost, Webafrica, Axxess and others.' },
      { label: 'Check', text: 'Address coverage, installation fees and cancellation terms.' }
    ],
    sourceIds: ['mweb-openserve', 'afrihost-fibre', 'webafrica-fibre'],
    blocks: [
      { type: 'company-grid', id: 'openserve-profile', title: 'Openserve role', companyIds: ['openserve'] },
      { type: 'price-table', id: 'openserve-prices', title: 'Checked Openserve package examples', filter: { fnoIds: ['openserve'] }, limit: 8 },
      { type: 'table', id: 'support-path', title: 'Who to contact', rows: fnoVsIspRows },
      standardSourceBlock(['mweb-openserve', 'afrihost-fibre', 'webafrica-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[1], coreFibreLinks[2], coreFibreLinks[4]]
  }),
  page({
    slug: 'vumatel-fibre-south-africa',
    path: '/fibre/vumatel-fibre-south-africa/',
    kind: 'provider',
    title: 'Vumatel Fibre South Africa: Vuma, ISPs and Vuma Reach',
    metaDescription:
      'Understand Vumatel fibre in South Africa, including Vuma Core, Vuma Reach, ISP choice, coverage, prepaid options and checked price examples.',
    h1: 'Vumatel Fibre in South Africa',
    intro: 'Vumatel, often branded as Vuma, is one of the infrastructure names consumers often meet during fibre coverage checks.',
    quickAnswer: 'Vumatel builds and manages fibre infrastructure, while ISPs sell packages over the Vuma network. Vuma Reach is a selected-area affordable/prepaid footprint.',
    summaryCards: [
      { label: 'Role', text: 'Open-access FNO in many metro and selected township areas.' },
      { label: 'ISP choice', text: 'Packages vary by ISP and exact Vuma footprint.' },
      { label: 'Prepaid', text: 'Vuma Reach examples can be lower cost but area-specific.' }
    ],
    sourceIds: ['vumatel', 'rsaweb-ftth', 'webafrica-fibre'],
    blocks: [
      { type: 'company-grid', id: 'vumatel-profile', title: 'Vuma role', companyIds: ['vumatel', 'vuma-reach'] },
      { type: 'price-table', id: 'vumatel-prices', title: 'Checked Vumatel and Vuma Reach examples', filter: { fnoIds: ['vumatel', 'vuma-reach'] }, limit: 8 },
      standardSourceBlock(['vumatel', 'rsaweb-ftth', 'webafrica-fibre'])
    ],
    relatedLinks: [hubLink, { href: '/fibre/vuma-reach-prepaid-fibre-south-africa/', label: 'Vuma Reach prepaid', description: 'Understand lower-cost selected-area prepaid examples.' }, coreFibreLinks[2], coreFibreLinks[3]]
  }),
  page({
    slug: 'metrofibre-fibre-south-africa',
    path: '/fibre/metrofibre-fibre-south-africa/',
    kind: 'provider',
    title: 'MetroFibre South Africa: Network, ISPs and Support',
    metaDescription:
      'Understand MetroFibre in South Africa, including open-access fibre, direct service, ISP partners, infrastructure role and consumer support path.',
    h1: 'MetroFibre in South Africa',
    intro: 'MetroFibre is useful to understand because it can appear as both a network operator and a direct service provider in some contexts.',
    quickAnswer: 'MetroFibre owns and manages fibre infrastructure and can also provide ISP services directly or through approved partners.',
    summaryCards: [
      { label: 'Role', text: 'Hybrid FNO and ISP/reseller ecosystem.' },
      { label: 'Coverage', text: 'Area-specific, with strong Gauteng and selected rollout presence.' },
      { label: 'Support', text: 'Depends whether you buy direct or through another ISP.' }
    ],
    sourceIds: ['metrofibre', 'metrofibre-who-is-who'],
    blocks: [
      { type: 'company-grid', id: 'metrofibre-profile', title: 'MetroFibre role', companyIds: ['metrofibre'] },
      { type: 'narrative', id: 'hybrid', title: 'Why MetroFibre can be confusing', paragraphs: ['Some companies are only infrastructure operators in the consumer journey. MetroFibre can be more mixed: it operates network infrastructure, works with ISPs and can also appear as a direct service provider. That makes the support path important to confirm before ordering.'] },
      standardSourceBlock(['metrofibre', 'metrofibre-who-is-who'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[1], coreFibreLinks[2], coreFibreLinks[3]]
  }),
  page({
    slug: 'frogfoot-fibre-south-africa',
    path: '/fibre/frogfoot-fibre-south-africa/',
    kind: 'provider',
    title: 'Frogfoot Fibre South Africa: FTTH and Frogfoot Air',
    metaDescription:
      'Understand Frogfoot fibre in South Africa, including FTTH, Frogfoot Air, ISP ordering, coverage, installation and checked package examples.',
    h1: 'Frogfoot Fibre in South Africa',
    intro: 'Frogfoot is an open-access fibre infrastructure provider with standard FTTH and Frogfoot Air in selected areas.',
    quickAnswer: 'Frogfoot provides the infrastructure. You order through an ISP or approved flow, and availability depends on the exact coverage area.',
    summaryCards: [
      { label: 'FTTH', text: 'Standard fibre-to-the-home where covered.' },
      { label: 'Frogfoot Air', text: 'Entry Wi-Fi-only option in selected FTTH areas.' },
      { label: 'Order path', text: 'ISP accepts the order and installation is scheduled once live.' }
    ],
    sourceIds: ['frogfoot', 'webafrica-fibre'],
    blocks: [
      { type: 'company-grid', id: 'frogfoot-profile', title: 'Frogfoot role', companyIds: ['frogfoot'] },
      { type: 'price-table', id: 'frogfoot-prices', title: 'Checked Frogfoot-related examples', filter: { fnoIds: ['frogfoot'] }, limit: 6 },
      standardSourceBlock(['frogfoot', 'webafrica-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[3], coreFibreLinks[2], coreFibreLinks[4]]
  }),
  page({
    slug: 'octotel-fibre-south-africa',
    path: '/fibre/octotel-fibre-south-africa/',
    kind: 'provider',
    title: 'Octotel Fibre South Africa: Western Cape Coverage and ISPs',
    metaDescription:
      'Understand Octotel fibre in South Africa, including Western Cape coverage, open-access ISP choice, installation and checked package examples.',
    h1: 'Octotel Fibre in South Africa',
    intro: 'Octotel is a Western Cape-focused open-access fibre network, especially relevant for Cape Town searches.',
    quickAnswer: 'Octotel provides the fibre network; consumers choose an ISP and package available over Octotel at the exact address.',
    summaryCards: [
      { label: 'Region', text: 'Strong Western Cape relevance.' },
      { label: 'Model', text: 'Open-access network with multiple ISPs.' },
      { label: 'Check', text: 'Exact address, building status and package terms.' }
    ],
    sourceIds: ['octotel', 'webafrica-fibre'],
    blocks: [
      { type: 'company-grid', id: 'octotel-profile', title: 'Octotel role', companyIds: ['octotel'] },
      { type: 'price-table', id: 'octotel-prices', title: 'Checked Octotel examples', filter: { fnoIds: ['octotel'] }, limit: 6 },
      standardSourceBlock(['octotel', 'webafrica-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[3], coreFibreLinks[2], { href: '/fibre/coverage-by-area/', label: 'Coverage by area', description: 'Use broad area guidance before exact address checks.' }]
  }),
  page({
    slug: 'vuma-reach-prepaid-fibre-south-africa',
    path: '/fibre/vuma-reach-prepaid-fibre-south-africa/',
    kind: 'provider',
    title: 'Vuma Reach Prepaid Fibre South Africa',
    metaDescription:
      'Understand Vuma Reach prepaid fibre in South Africa, including low-cost examples, top-ups, coverage limits, ISP ordering and alternatives.',
    h1: 'Vuma Reach Prepaid Fibre in South Africa',
    intro: 'Vuma Reach is one of the most important names for lower-cost prepaid fibre searches, but it is not available everywhere.',
    quickAnswer: 'Vuma Reach can offer low-cost prepaid fibre in selected areas. Confirm area coverage, top-up rules, speed, installation and support path before relying on it.',
    summaryCards: [
      { label: 'Low-cost', text: 'Public examples can start far below mainstream monthly fibre.' },
      { label: 'Selected areas', text: 'Coverage is not the same as all Vumatel coverage.' },
      { label: 'Top-up model', text: 'Check expiry, activation and support rules.' }
    ],
    sourceIds: ['rsaweb-ftth', 'vumatel'],
    blocks: [
      { type: 'company-grid', id: 'vuma-reach-profile', title: 'Vuma Reach role', companyIds: ['vuma-reach'] },
      { type: 'price-table', id: 'vuma-reach-prices', title: 'Checked Vuma Reach prepaid examples', filter: { fnoIds: ['vuma-reach'] }, limit: 8 },
      {
        type: 'bullets',
        id: 'check-first',
        title: 'What to check before choosing Vuma Reach',
        bullets: [
          'Is your exact address in a Vuma Reach area?',
          'Is the price monthly, prepaid, top-up or voucher based?',
          'What happens when the paid period expires?',
          'Who provides account support and who handles line faults?',
          'Can you upgrade to a faster standard fibre package later?'
        ]
      },
      standardSourceBlock(['rsaweb-ftth', 'vumatel'])
    ],
    relatedLinks: [hubLink, { href: '/fibre/prepaid-fibre-south-africa/', label: 'Prepaid fibre guide', description: 'Compare prepaid fibre models and alternatives.' }, coreFibreLinks[2], coreFibreLinks[5]]
  }),
  page({
    slug: 'coverage-by-area',
    path: '/fibre/coverage-by-area/',
    kind: 'guide',
    title: 'Fibre Coverage by Area in South Africa',
    metaDescription:
      'Use high-level fibre coverage guidance for South African cities, suburbs, complexes, townships and smaller towns before running exact address checks.',
    h1: 'Fibre Coverage by Area in South Africa',
    intro: 'Area pages can help with orientation, but exact address checks decide whether you can actually order fibre.',
    quickAnswer: 'Use area guidance only as a starting point. Then check your exact address with an official ISP or FNO coverage checker.',
    summaryCards: [
      { label: 'Cities differ', text: 'Cape Town, Johannesburg, Durban and Pretoria have mixed coverage.' },
      { label: 'Buildings differ', text: 'One complex can be live while the next is not.' },
      { label: 'Townships differ', text: 'Prepaid fibre may exist only in selected rollout zones.' }
    ],
    sourceIds: ['vumatel', 'octotel', 'frogfoot', 'zoom-fibre'],
    blocks: [
      {
        type: 'table',
        id: 'areas',
        title: 'High-level area guidance',
        rows: [
          { label: 'Johannesburg', value: 'Mixed FNO coverage', note: 'Check suburb, complex and exact address.' },
          { label: 'Cape Town', value: 'Octotel, Vuma and other networks by area', note: 'Western Cape coverage can vary sharply by building.' },
          { label: 'Durban', value: 'Area-specific coverage', note: 'Use address lookup before comparing packages.' },
          { label: 'Pretoria', value: 'Mixed estates, complexes and suburbs', note: 'Permission rules can matter as much as street coverage.' },
          { label: 'Township areas', value: 'Prepaid/affordable fibre may apply', note: 'Check Vuma Reach, Zoom-style or local rollout availability.' },
          { label: 'Smaller towns', value: 'Often fewer fibre options', note: 'Compare fibre with fixed LTE and 5G fallback.' }
        ]
      },
      { type: 'table', id: 'property', title: 'Property-specific checks', rows: coverageRows },
      standardSourceBlock(['vumatel', 'octotel', 'frogfoot', 'zoom-fibre'])
    ],
    relatedLinks: [hubLink, coreFibreLinks[3], { href: '/fibre/vuma-reach-prepaid-fibre-south-africa/', label: 'Vuma Reach prepaid', description: 'Check selected-area prepaid fibre guidance.' }, ...fallbackLinks]
  })
];

export const fibrePageBySlug = fibrePages.reduce<Record<string, FibrePageDefinition>>((acc, pageDefinition) => {
  acc[pageDefinition.slug] = pageDefinition;
  return acc;
}, {});

export const noindexFibreRoutes = [
  '/fibre/cheap-fibre-south-africa/',
  '/fibre/coverage-by-area/'
];

export const fibreRoutes = fibrePages.map((pageDefinition) => pageDefinition.path);
