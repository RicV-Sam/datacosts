export type FibrePageKind = 'hub' | 'guide';

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

export type FibreSection = {
  id: string;
  title: string;
  body?: string;
  bullets?: string[];
  table?: FibreTableRow[];
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
  sections: FibreSection[];
  relatedLinks: FibreLink[];
  faqs: FibreFaq[];
};

const coreFibreLinks: FibreLink[] = [
  {
    href: '/fibre/cheap-fibre-south-africa/',
    label: 'Cheap fibre guide',
    description: 'Check the real monthly cost before choosing a low headline price.'
  },
  {
    href: '/fibre/prepaid-fibre-south-africa/',
    label: 'Prepaid fibre',
    description: 'Understand vouchers, top-ups, expiry, and contract-light home internet.'
  },
  {
    href: '/fibre/fibre-vs-lte-south-africa/',
    label: 'Fibre vs LTE/5G',
    description: 'Choose between fixed fibre, fixed LTE, 5G, and mobile data.'
  },
  {
    href: '/fibre/how-to-check-fibre-coverage-south-africa/',
    label: 'Check fibre coverage',
    description: 'Learn why address checks matter before comparing prices.'
  },
  {
    href: '/fibre/fibre-installation-costs-south-africa/',
    label: 'Installation costs',
    description: 'Understand setup, router, delivery, cancellation, and clawback terms.'
  },
  {
    href: '/fibre/coverage-by-area/',
    label: 'Coverage by area',
    description: 'Use high-level area guidance before city or suburb pages exist.'
  }
];

const mobileFallbackLinks: FibreLink[] = [
  {
    href: '/guides/best-data-deals-south-africa/',
    label: 'Best data deals',
    description: 'Compare mobile data if fibre is not available at your address.'
  },
  {
    href: '/guides/cheapest-data-south-africa/',
    label: 'Cheapest data in South Africa',
    description: 'Check mobile bundle value before using a hotspot at home.'
  },
  {
    href: '/network/mtn/',
    label: 'MTN network page',
    description: 'Review MTN mobile and fixed-wireless alternatives.'
  },
  {
    href: '/network/vodacom/',
    label: 'Vodacom network page',
    description: 'Review Vodacom data and home-internet alternatives.'
  },
  {
    href: '/ussd-codes-south-africa/',
    label: 'USSD codes South Africa',
    description: 'Use balance and buy-data shortcuts before relying on mobile fallback.'
  },
  {
    href: '/fix/lte-router-connected-no-internet/',
    label: 'LTE router connected but no internet',
    description: 'Troubleshoot home LTE before assuming you need a new plan.'
  }
];

export const fibrePages: FibrePageDefinition[] = [
  {
    slug: 'hub',
    path: '/fibre/',
    kind: 'hub',
    title: 'Fibre Internet & Home Internet Deals in South Africa',
    metaDescription:
      'Compare fibre internet, prepaid fibre, LTE, 5G and mobile data for home internet in South Africa by coverage, setup terms and household use.',
    h1: 'Fibre Internet & Home Internet Deals in South Africa',
    intro:
      'Use this Fibre and Home Internet hub to decide whether fixed fibre, prepaid fibre, LTE, 5G, or mobile data is the better fit for your household.',
    quickAnswer:
      'Fibre is usually best for stable home use, work calls, gaming, streaming, and households with several devices. LTE, 5G, and mobile data are better when you need portability, faster setup, or a fallback where fibre coverage is not available.',
    summaryCards: [
      { label: 'Best for stability', text: 'Fibre is the stronger default when your address is covered and the monthly terms fit.' },
      { label: 'Best for flexibility', text: 'LTE, 5G, and prepaid fibre can reduce commitment when contracts are a problem.' },
      { label: 'Check first', text: 'Coverage, installation terms, router rules, and cancellation fees matter before price.' }
    ],
    sections: [
      {
        id: 'compare-options',
        title: 'Compare fibre, LTE/5G, fixed LTE, hotspot and prepaid fibre',
        table: [
          { label: 'Fibre', value: 'Fixed line to the property', note: 'Best for stable home use where coverage and installation are available.' },
          { label: 'LTE/5G', value: 'Wireless home internet', note: 'Useful when fibre is not installed, but signal quality can vary by area.' },
          { label: 'Fixed LTE', value: 'Router-based mobile network service', note: 'Often location-managed and better for home use than a phone hotspot.' },
          { label: 'Mobile hotspot', value: 'Phone or SIM sharing data', note: 'Good as a fallback, usually weaker for heavy household use.' },
          { label: 'Prepaid fibre', value: 'Voucher or top-up based fibre access', note: 'Useful for renters, students, and households avoiding long commitments.' }
        ]
      },
      {
        id: 'best-for-fibre',
        title: 'Who fibre is best for',
        bullets: [
          'Homes with several people online at the same time.',
          'Remote work, video calls, streaming, gaming, and school use.',
          'Users who want more predictable latency and fewer mobile-signal swings.'
        ]
      },
      {
        id: 'best-for-lte',
        title: 'Who LTE or 5G is better for',
        bullets: [
          'Renters who cannot install fibre or need a portable setup.',
          'Homes outside fibre coverage areas.',
          'Users who need a backup during fibre installation delays or line faults.'
        ]
      },
      {
        id: 'before-signup',
        title: 'What to check before signing up',
        bullets: [
          'Confirm address coverage on the ISP or fibre network operator site.',
          'Ask about installation, activation, router, delivery, cancellation, and clawback fees.',
          'Check whether the offer is month-to-month, prepaid, or contract-based.',
          'Confirm whether your landlord, body corporate, or estate needs to approve installation.'
        ]
      }
    ],
    relatedLinks: [...coreFibreLinks, ...mobileFallbackLinks],
    faqs: [
      {
        question: 'Is fibre always better than LTE or 5G?',
        answer: 'No. Fibre is usually better for stable home use, but LTE or 5G can be better when fibre is not available, installation is blocked, or you need portability.'
      },
      {
        question: 'Can I use mobile data instead of fibre?',
        answer: 'Yes, but heavy streaming, gaming, and multi-device home use can become expensive or unstable on a normal mobile bundle.'
      },
      {
        question: 'Does DataCost list live fibre prices?',
        answer: 'Fibre prices and availability change by address and provider. Use this guide to know what to verify on official provider pages before ordering.'
      }
    ]
  },
  {
    slug: 'cheap-fibre-south-africa',
    path: '/fibre/cheap-fibre-south-africa/',
    kind: 'guide',
    title: 'Cheap Fibre Internet South Africa: What to Check First',
    metaDescription:
      'Learn how to compare cheap fibre internet in South Africa by monthly cost, speed, installation fees, router terms and cancellation risk.',
    h1: 'Cheap Fibre Internet in South Africa: What to Check Before You Sign Up',
    intro:
      'Cheap fibre is not just the lowest monthly number. The real cost depends on speed, installation, router terms, delivery, activation, cancellation, and coverage at your address.',
    quickAnswer:
      'Treat cheap fibre as a total-cost question. Compare monthly fee, speed, setup charges, router ownership, cancellation terms, and whether the address is actually covered before choosing.',
    summaryCards: [
      { label: 'Main risk', text: 'A low monthly price can be offset by setup, router, or clawback terms.' },
      { label: 'Best check', text: 'Ask for the month-one cost and the cancellation cost before ordering.' },
      { label: 'Coverage first', text: 'A cheap plan is irrelevant if your building or street is not live.' }
    ],
    sections: [
      {
        id: 'cheap-means',
        title: 'What cheap fibre usually means',
        body:
          'Cheap fibre usually means a lower-speed plan, a promotion, a prepaid model, or a month-to-month package with tradeoffs. It does not automatically mean best value for every home.'
      },
      {
        id: 'real-monthly-cost',
        title: 'How to compare real monthly cost',
        bullets: [
          'Add monthly fee, activation, router, delivery, installation, and cancellation exposure.',
          'Check whether free installation has a minimum-stay condition.',
          'Confirm whether the router must be returned or paid for if you cancel early.'
        ]
      },
      {
        id: 'speed-table',
        title: 'Speed vs price table',
        table: [
          { label: 'Entry-level fibre', value: 'Lower monthly cost', note: 'Usually enough for browsing, messaging, and light streaming.' },
          { label: 'Mid-speed fibre', value: 'Balanced household use', note: 'Better for video calls, streaming, and several devices.' },
          { label: 'Higher-speed fibre', value: 'Higher monthly cost', note: 'Useful for heavy households, large downloads, gaming, and frequent uploads.' }
        ]
      },
      {
        id: 'fees',
        title: 'Setup, router, installation, delivery and cancellation fees',
        body:
          'Ask the provider to separate each fee before you order. The important question is not only the monthly line rental, but what you pay to start, what equipment is included, and what happens when you cancel.'
      },
      {
        id: 'red-flags',
        title: 'Red flags',
        bullets: [
          'A promotion that hides the normal monthly price.',
          'No clear answer on cancellation or clawback terms.',
          'A coverage result that says planned, pre-order, or coming soon instead of available.',
          'Sales copy that promises cheap fibre without showing the actual address check.'
        ]
      }
    ],
    relatedLinks: [coreFibreLinks[1], coreFibreLinks[2], coreFibreLinks[3], ...mobileFallbackLinks.slice(0, 2)],
    faqs: [
      {
        question: 'Who has the cheapest fibre in South Africa?',
        answer: 'DataCost does not name a cheapest provider without checking current official pricing. Compare official prices for your exact address before deciding.'
      },
      {
        question: 'Is month-to-month fibre safer than a contract?',
        answer: 'It can be safer if you may move or cancel soon, but still check router return rules, installation clawbacks, and notice periods.'
      },
      {
        question: 'Is cheap LTE better than cheap fibre?',
        answer: 'Cheap LTE can work where fibre is not available, but fibre is usually more predictable for heavy home use if installation and monthly terms are acceptable.'
      }
    ]
  },
  {
    slug: 'prepaid-fibre-south-africa',
    path: '/fibre/prepaid-fibre-south-africa/',
    kind: 'guide',
    title: 'Prepaid Fibre South Africa: How It Works',
    metaDescription:
      'Understand prepaid fibre in South Africa, including vouchers, top-ups, expiry, coverage limits, routers, installation and LTE alternatives.',
    h1: 'Prepaid Fibre in South Africa: How It Works, Who It Suits and What to Check',
    intro:
      'Prepaid fibre can make home internet feel closer to prepaid mobile data: you top up for access instead of committing to a long monthly contract.',
    quickAnswer:
      'Prepaid fibre is useful when you want fixed home internet without a long contract, but it still depends on fibre coverage, installation rules, router setup, and voucher availability.',
    summaryCards: [
      { label: 'Good for', text: 'Renters, students, budget households, and irregular-income homes.' },
      { label: 'Watch out', text: 'Coverage, installation, router ownership, and voucher expiry still matter.' },
      { label: 'Fallback', text: 'LTE or mobile data may be simpler where prepaid fibre is not live.' }
    ],
    sections: [
      {
        id: 'how-it-works',
        title: 'How prepaid fibre works',
        bullets: [
          'The home still needs fibre coverage and a working installation.',
          'Access is normally activated through a voucher, top-up, or prepaid account flow.',
          'When the paid period expires, access usually pauses until another top-up is made.'
        ]
      },
      {
        id: 'who-it-suits',
        title: 'Who prepaid fibre suits',
        bullets: [
          'Renters who do not want a long commitment.',
          'Students and shared households.',
          'Budget households managing internet month by month.',
          'People with irregular income who want to avoid debit-order commitments.'
        ]
      },
      {
        id: 'voucher-expiry',
        title: 'How vouchers and expiry usually work',
        body:
          'Voucher and top-up rules vary by provider. Before paying, check when the access starts, when it expires, whether unused time rolls over, and how quickly service resumes after a top-up.'
      },
      {
        id: 'compare',
        title: 'Prepaid fibre vs mobile data and LTE',
        table: [
          { label: 'Prepaid fibre', value: 'Fixed address', note: 'Better for home stability where coverage exists.' },
          { label: 'Mobile data', value: 'Portable', note: 'Useful as a backup or for light use, but can be expensive for heavy households.' },
          { label: 'LTE/5G', value: 'Wireless router', note: 'Useful where fibre is not available or installation is blocked.' }
        ]
      }
    ],
    relatedLinks: [coreFibreLinks[2], coreFibreLinks[3], coreFibreLinks[4], ...mobileFallbackLinks],
    faqs: [
      {
        question: 'Does prepaid fibre need installation?',
        answer: 'Usually yes. Prepaid access does not remove the need for the property to be covered and connected.'
      },
      {
        question: 'What happens when prepaid fibre expires?',
        answer: 'Access normally pauses until the next top-up, but exact rules depend on the provider and product.'
      },
      {
        question: 'Is prepaid fibre better than mobile data?',
        answer: 'For home use it can be more stable, but mobile data is easier to use when you are not covered or need portability.'
      }
    ]
  },
  {
    slug: 'fibre-vs-lte-south-africa',
    path: '/fibre/fibre-vs-lte-south-africa/',
    kind: 'guide',
    title: 'Fibre vs LTE/5G South Africa: Home Internet Guide',
    metaDescription:
      'Compare fibre, LTE and 5G for South African home internet by speed stability, latency, setup, portability, gaming, streaming and work use.',
    h1: 'Fibre vs LTE/5G in South Africa: Which Is Better for Home Internet?',
    intro:
      'Fibre and LTE/5G solve different home internet problems. Fibre is fixed and stable; LTE and 5G are faster to start and easier to move, but signal quality matters.',
    quickAnswer:
      'Choose fibre when your address is covered and you need stable home internet. Choose LTE or 5G when fibre is not available, you rent, you need portability, or installation is delayed.',
    summaryCards: [
      { label: 'Best for gaming', text: 'Fibre is usually safer because latency is more predictable.' },
      { label: 'Best for low commitment', text: 'LTE, 5G, and prepaid options can be easier to stop or move.' },
      { label: 'Best fallback', text: 'LTE/5G is the practical option when fibre coverage is absent.' }
    ],
    sections: [
      {
        id: 'comparison',
        title: 'Side-by-side comparison',
        table: [
          { label: 'Speed stability', value: 'Fibre', note: 'Usually more consistent at the same address.' },
          { label: 'Latency', value: 'Fibre', note: 'Usually better for gaming, video calls, and remote work.' },
          { label: 'Installation', value: 'LTE/5G', note: 'Usually faster if the router and SIM are ready.' },
          { label: 'Coverage', value: 'Depends on address', note: 'Fibre needs street/building coverage; LTE/5G needs strong signal.' },
          { label: 'Portability', value: 'LTE/5G', note: 'Wireless options are easier to move than a fixed fibre line.' },
          { label: 'Streaming', value: 'Fibre', note: 'Better for multiple screens if the plan is fast enough.' },
          { label: 'Load shedding', value: 'Depends on backup power', note: 'Both need router power; network uptime varies by area.' }
        ]
      },
      {
        id: 'use-cases',
        title: 'Best choice by use case',
        bullets: [
          'Renters: LTE/5G or prepaid fibre can reduce commitment.',
          'Gaming: fibre is usually the safer first choice.',
          'Work from home: fibre is usually better if video calls matter.',
          'Low commitment: month-to-month LTE, 5G, or prepaid fibre can help.',
          'No fibre available: compare fixed LTE, 5G, and mobile-data fallback.'
        ]
      },
      {
        id: 'five-minute-decision',
        title: 'How to decide in 5 minutes',
        bullets: [
          'Check fibre coverage for your address.',
          'Check mobile signal quality where the router will sit.',
          'Estimate how many people stream, work, game, or study at the same time.',
          'Compare setup cost, monthly commitment, and cancellation risk.',
          'Pick the option that solves your actual home use, not only the cheapest headline.'
        ]
      }
    ],
    relatedLinks: [coreFibreLinks[0], coreFibreLinks[1], coreFibreLinks[3], ...mobileFallbackLinks],
    faqs: [
      {
        question: 'Is fibre better for gaming than LTE?',
        answer: 'Usually yes, because fibre latency is normally more stable. LTE and 5G can still work well where signal is strong.'
      },
      {
        question: 'Is LTE better for renters?',
        answer: 'Often yes, especially where installation permission is difficult or you may move soon.'
      },
      {
        question: 'Can load shedding affect fibre and LTE?',
        answer: 'Yes. Your router needs backup power, and the provider or mobile tower also needs network backup in your area.'
      }
    ]
  },
  {
    slug: 'how-to-check-fibre-coverage-south-africa',
    path: '/fibre/how-to-check-fibre-coverage-south-africa/',
    kind: 'guide',
    title: 'How to Check Fibre Coverage in South Africa',
    metaDescription:
      'Learn how to check fibre coverage in South Africa by address, ISP, fibre network operator, landlord, complex and estate requirements.',
    h1: 'How to Check Fibre Coverage in South Africa',
    intro:
      'Fibre coverage is address-specific. A provider can serve your suburb but still not serve your exact building, complex, estate, or street.',
    quickAnswer:
      'Check coverage with an ISP or fibre network operator using your exact address, then confirm building permission and installation status before comparing prices.',
    summaryCards: [
      { label: 'Start here', text: 'Use an official address lookup, not a generic suburb result.' },
      { label: 'Ask property questions', text: 'Complexes, estates, and rentals can require approval before installation.' },
      { label: 'Not covered?', text: 'Compare mobile data, fixed LTE, and 5G options while coverage is unavailable.' }
    ],
    sections: [
      {
        id: 'why-first',
        title: 'Why coverage comes before price',
        body:
          'Fibre pricing only matters once the address is live or installable. Planned or pre-order coverage can still involve delays, property approvals, or no immediate installation slot.'
      },
      {
        id: 'how-to-check',
        title: 'How to check coverage',
        bullets: [
          'Use the ISP coverage checker with your exact street address.',
          'Check the fibre network operator site if you know who built in the area.',
          'For flats, estates, and complexes, ask the body corporate or managing agent.',
          'For rentals, confirm landlord permission before placing an order.',
          'Avoid unofficial links that ask for ID, banking details, or payment before a verified order flow.'
        ]
      },
      {
        id: 'coverage-terms',
        title: 'What coverage terms usually mean',
        table: [
          { label: 'Available', value: 'Likely orderable', note: 'Still confirm installation timing and property permission.' },
          { label: 'Pre-order', value: 'Not live yet', note: 'Ask what must happen before activation.' },
          { label: 'Planned', value: 'Possible future rollout', note: 'Do not treat as active service.' },
          { label: 'Not covered', value: 'No current fibre option', note: 'Compare LTE, 5G, or mobile-data fallback.' },
          { label: 'Coming soon', value: 'Unclear timing', note: 'Avoid relying on it for immediate home internet.' }
        ]
      },
      {
        id: 'not-covered',
        title: 'Not covered yet? Compare mobile data and LTE options.',
        body:
          'If fibre is not available, compare fixed LTE, 5G, Rain, MTN, Vodacom, Telkom, and Cell C options based on your local signal and actual home usage.'
      }
    ],
    relatedLinks: [
      coreFibreLinks[2],
      coreFibreLinks[0],
      { href: '/network/rain/', label: 'Rain network page', description: 'Review home-style mobile data alternatives where covered.' },
      ...mobileFallbackLinks
    ],
    faqs: [
      {
        question: 'Can one street have fibre while the next does not?',
        answer: 'Yes. Fibre coverage can change by street, building, estate, and network operator.'
      },
      {
        question: 'Should I pay before checking coverage?',
        answer: 'No. Confirm availability through an official provider flow before sharing sensitive details or paying.'
      },
      {
        question: 'What should I use if fibre is not available?',
        answer: 'Compare fixed LTE, 5G, and mobile data options, then test signal quality where the router will be used.'
      }
    ]
  },
  {
    slug: 'fibre-installation-costs-south-africa',
    path: '/fibre/fibre-installation-costs-south-africa/',
    kind: 'guide',
    title: 'Fibre Installation Costs South Africa: Fees Explained',
    metaDescription:
      'Understand South African fibre installation costs, setup fees, router fees, delivery, cancellation, clawbacks and moving-house risks.',
    h1: 'Fibre Installation Costs in South Africa: Setup, Router and Cancellation Fees Explained',
    intro:
      'Fibre costs can include more than the monthly line fee. Installation, activation, router, delivery, cancellation, and clawback terms can change the real cost.',
    quickAnswer:
      'Before ordering fibre, ask what you pay today, what is free only if you stay, what happens if you cancel, and whether moving house triggers new fees.',
    summaryCards: [
      { label: 'Ask upfront', text: 'Installation, setup, router, delivery, cancellation, and clawback rules.' },
      { label: 'Free can have terms', text: 'Free installation may depend on staying connected for a minimum period.' },
      { label: 'Rentals', text: 'Get landlord or body corporate permission before installation work starts.' }
    ],
    sections: [
      {
        id: 'fee-types',
        title: 'Common fibre fee types',
        table: [
          { label: 'Installation fee', value: 'Line or property work', note: 'May be free, discounted, or clawed back if you cancel early.' },
          { label: 'Activation/setup fee', value: 'Account activation', note: 'Ask whether it is once-off and non-refundable.' },
          { label: 'Router fee', value: 'Equipment', note: 'Confirm ownership, rental, return rules, and replacement cost.' },
          { label: 'Delivery fee', value: 'Courier or equipment delivery', note: 'Can appear separately from installation.' },
          { label: 'Cancellation fee', value: 'Exit cost', note: 'Check notice period and any minimum-stay terms.' }
        ]
      },
      {
        id: 'clawbacks',
        title: 'Clawback terms and free installation conditions',
        body:
          'A provider may advertise free installation or a free router, but recover the cost if you cancel too soon. Ask for the clawback amount and the date when it falls away.'
      },
      {
        id: 'moving-house',
        title: 'Moving house',
        body:
          'Moving can trigger a new coverage check, new installation, router return rules, or cancellation fees if the provider cannot serve the new address.'
      },
      {
        id: 'what-to-ask',
        title: 'What to ask before ordering',
        bullets: [
          'What is the total amount due before activation?',
          'What is the normal monthly amount after promotions?',
          'What do I owe if I cancel after one, three, six, or twelve months?',
          'Who owns the router?',
          'Do I need landlord, body corporate, or estate approval?'
        ]
      }
    ],
    relatedLinks: [coreFibreLinks[0], coreFibreLinks[1], coreFibreLinks[3], ...mobileFallbackLinks.slice(0, 2)],
    faqs: [
      {
        question: 'Is fibre installation free in South Africa?',
        answer: 'Sometimes, but free installation can include conditions. Always check cancellation and clawback terms.'
      },
      {
        question: 'Do I own the fibre router?',
        answer: 'It depends on the provider and package. Ask whether it is included, rented, financed, or must be returned.'
      },
      {
        question: 'Can I install fibre in a rental?',
        answer: 'Usually only with permission from the landlord, body corporate, managing agent, or estate rules where applicable.'
      }
    ]
  },
  {
    slug: 'coverage-by-area',
    path: '/fibre/coverage-by-area/',
    kind: 'guide',
    title: 'Fibre Coverage by Area in South Africa',
    metaDescription:
      'Use high-level South African fibre coverage guidance for Johannesburg, Cape Town, Durban, Pretoria, Soweto, townships and smaller towns.',
    h1: 'Fibre Coverage by Area in South Africa',
    intro:
      'Fibre coverage is local. This page gives high-level guidance for common area searches without pretending to know live coverage for every street or building.',
    quickAnswer:
      'Use this as a starting point, then check your exact address with an official coverage checker before comparing prices or signing up.',
    summaryCards: [
      { label: 'Area-specific', text: 'Coverage can differ by suburb, street, complex, and building.' },
      { label: 'Exact address first', text: 'Use official address checks before relying on broad city or suburb results.' },
      { label: 'Fallback', text: 'If fibre is not available, compare fixed LTE, 5G, and mobile data.' }
    ],
    sections: [
      {
        id: 'area-table',
        title: 'High-level area guidance',
        table: [
          { label: 'Johannesburg', value: 'Mixed coverage', note: 'Check by suburb, complex, and street before comparing offers.' },
          { label: 'Cape Town', value: 'Mixed coverage', note: 'Coverage can vary sharply between suburbs and building types.' },
          { label: 'Durban', value: 'Area-specific', note: 'Use an address lookup and confirm installation availability.' },
          { label: 'Pretoria', value: 'Area-specific', note: 'Coverage may differ between estates, flats, and freestanding homes.' },
          { label: 'Soweto', value: 'Check prepaid and fixed options', note: 'Look for coverage status and prepaid fibre availability where relevant.' },
          { label: 'Township and prepaid fibre areas', value: 'Plan-specific', note: 'Voucher and top-up models may exist only in selected zones.' },
          { label: 'Smaller towns', value: 'Often limited', note: 'Compare fibre, fixed LTE, 5G, and mobile data fallback.' }
        ]
      },
      {
        id: 'why-specific',
        title: 'Why fibre is area-specific',
        body:
          'Fibre depends on network rollout, street infrastructure, building permission, and ISP availability. A city-wide result is not enough for a signup decision.'
      },
      {
        id: 'next-step',
        title: 'What to do next',
        bullets: [
          'Use the coverage checker guide for your exact address.',
          'Compare fibre vs LTE if coverage is missing or installation is difficult.',
          'Use mobile data guides as a fallback while waiting for fibre rollout.'
        ]
      }
    ],
    relatedLinks: [coreFibreLinks[3], coreFibreLinks[2], coreFibreLinks[0], ...mobileFallbackLinks],
    faqs: [
      {
        question: 'Will DataCost create fibre city pages?',
        answer: 'Only when there is enough useful, specific, non-generic information for that city or suburb.'
      },
      {
        question: 'Can coverage differ inside one suburb?',
        answer: 'Yes. One complex, street, or building can be covered while another nearby address is not.'
      },
      {
        question: 'What if my area is not covered?',
        answer: 'Compare fixed LTE, 5G, and mobile data options while monitoring official fibre rollout updates.'
      }
    ]
  }
];

export const fibrePageBySlug = fibrePages.reduce<Record<string, FibrePageDefinition>>((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {});

export const fibreRoutes = fibrePages.map((page) => page.path);
