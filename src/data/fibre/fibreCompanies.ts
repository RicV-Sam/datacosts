export type FibreCompanyRole = 'fno' | 'isp' | 'hybrid' | 'reseller';

export type FibreCompany = {
  id: string;
  name: string;
  role: FibreCompanyRole;
  officialUrl: string;
  coverageUrl?: string;
  summary: string;
  consumerRole: string;
  infrastructureRole: string;
  supportRole: string;
  coverageNotes: string;
  sourceId: string;
  regions?: string[];
  tags: string[];
};

export const fibreNetworkOperators: FibreCompany[] = [
  {
    id: 'vumatel',
    name: 'Vumatel / Vuma',
    role: 'fno',
    officialUrl: 'https://vumatel.co.za/',
    coverageUrl: 'https://vumatel.co.za/',
    summary: 'A large open-access fibre network operator with Vuma Core and Vuma Reach style footprints.',
    consumerRole: 'You normally buy service through an ISP that sells on the Vuma network.',
    infrastructureRole: 'Builds and maintains last-mile fibre infrastructure in covered streets, complexes and areas.',
    supportRole: 'Your ISP handles account support first; network faults may be escalated to Vuma.',
    coverageNotes: 'Coverage is exact-address specific. Vuma Reach and prepaid-style products are available only in selected lower-cost rollout areas.',
    sourceId: 'vumatel',
    regions: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'selected township and metro areas'],
    tags: ['open-access', 'prepaid-options', 'major-fno']
  },
  {
    id: 'openserve',
    name: 'Openserve',
    role: 'fno',
    officialUrl: 'https://www.openserve.co.za/',
    coverageUrl: 'https://www.openserve.co.za/',
    summary: 'Telkom group wholesale fibre infrastructure used by many retail ISPs.',
    consumerRole: 'Most consumers order Openserve fibre through an ISP such as Mweb, Afrihost, Webafrica or others.',
    infrastructureRole: 'Provides and installs fibre infrastructure in covered areas and supplies wholesale access to ISPs.',
    supportRole: 'The ISP bills and supports you; Openserve handles infrastructure installation and line-side network work.',
    coverageNotes: 'Often present beyond the densest metro fibre areas, but exact coverage still depends on address and building status.',
    sourceId: 'mweb-openserve',
    regions: ['National footprint', 'metros', 'many towns and suburbs'],
    tags: ['wholesale', 'major-fno', 'open-access']
  },
  {
    id: 'metrofibre',
    name: 'MetroFibre',
    role: 'hybrid',
    officialUrl: 'https://metrofibre.co.za/',
    coverageUrl: 'https://metrofibre.co.za/',
    summary: 'Open-access fibre network that also offers services directly and through approved ISPs.',
    consumerRole: 'You may see MetroFibre as the network behind an ISP package, or as a direct provider in some areas.',
    infrastructureRole: 'Owns and manages fibre infrastructure and wholesale access on its network.',
    supportRole: 'Support path depends on whether you bought direct or through a retail ISP.',
    coverageNotes: 'Coverage is area-specific, with a strong presence in parts of Gauteng and other rollout areas.',
    sourceId: 'metrofibre-who-is-who',
    regions: ['Gauteng', 'selected national rollout areas'],
    tags: ['open-access', 'hybrid', 'major-fno']
  },
  {
    id: 'frogfoot',
    name: 'Frogfoot',
    role: 'fno',
    officialUrl: 'https://www.frogfoot.co.za/',
    coverageUrl: 'https://www.frogfoot.co.za/',
    summary: 'Open-access fibre infrastructure provider with FTTH, business fibre and Frogfoot Air products.',
    consumerRole: 'Consumers order through a preferred ISP or through the Frogfoot ordering flow.',
    infrastructureRole: 'Builds and manages fibre infrastructure; Frogfoot Air is a Wi-Fi-only entry product in selected FTTH areas.',
    supportRole: 'ISP accepts and manages the order; installation teams schedule the physical install once the area is live.',
    coverageNotes: 'Frogfoot Air and standard fibre availability differ by coverage area.',
    sourceId: 'frogfoot',
    regions: ['Western Cape', 'Eastern Cape', 'selected national areas'],
    tags: ['open-access', 'frogfoot-air', 'fno']
  },
  {
    id: 'octotel',
    name: 'Octotel',
    role: 'fno',
    officialUrl: 'https://octotel.co.za/',
    coverageUrl: 'https://octotel.co.za/',
    summary: 'Western Cape-focused open-access fibre network with multiple ISP choices.',
    consumerRole: 'Consumers choose an ISP and package on top of Octotel coverage.',
    infrastructureRole: 'Builds and operates the fibre network connecting homes and businesses in covered Western Cape areas.',
    supportRole: 'ISP handles billing and account support; Octotel maintains the access network.',
    coverageNotes: 'Particularly relevant for Cape Town and Western Cape searches.',
    sourceId: 'octotel',
    regions: ['Western Cape', 'Cape Town'],
    tags: ['open-access', 'western-cape', 'fno']
  },
  {
    id: 'zoom-fibre',
    name: 'Zoom Fibre',
    role: 'hybrid',
    officialUrl: 'https://zoomfibre.co.za/',
    coverageUrl: 'https://zoomfibre.co.za/',
    summary: 'Fibre provider offering home fibre, business fibre and prepaid-style Zoom Flex in selected areas.',
    consumerRole: 'Consumers can check coverage and shop home fibre or prepaid-style Zoom Flex where live.',
    infrastructureRole: 'Operates fibre infrastructure and special projects in selected communities and towns.',
    supportRole: 'Support path depends on product and ordering channel.',
    coverageNotes: 'Good fit for prepaid fibre and selected-area coverage explanations.',
    sourceId: 'zoom-fibre',
    regions: ['selected Gauteng and regional projects'],
    tags: ['prepaid-options', 'hybrid', 'fno']
  },
  {
    id: 'evotel',
    name: 'Evotel',
    role: 'fno',
    officialUrl: 'https://www.evotel.co.za/',
    coverageUrl: 'https://www.evotel.co.za/',
    summary: 'Open-access fibre network operator appearing in ISP package tables in selected areas.',
    consumerRole: 'Consumers usually see Evotel through ISP package availability after an address check.',
    infrastructureRole: 'Provides last-mile fibre in covered residential areas.',
    supportRole: 'Retail ISP handles billing and customer support first.',
    coverageNotes: 'Useful for low-cost package examples but always address-specific.',
    sourceId: 'axxess-fibre',
    tags: ['open-access', 'fno']
  },
  {
    id: 'link-africa',
    name: 'Link Africa',
    role: 'fno',
    officialUrl: 'https://www.linkafrica.co.za/',
    coverageUrl: 'https://www.linkafrica.co.za/',
    summary: 'Independent fibre network operator used in selected wholesale and last-mile contexts.',
    consumerRole: 'Consumers may see Link Africa only through ISP availability or installation terms.',
    infrastructureRole: 'Builds and operates fibre networks through its infrastructure deployment model.',
    supportRole: 'Retail ISP is normally the consumer support path.',
    coverageNotes: 'Include for infrastructure literacy, not as a universal consumer package option.',
    sourceId: 'afrihost-fibre',
    tags: ['infrastructure', 'fno']
  },
  {
    id: 'vuma-reach',
    name: 'Vuma Reach',
    role: 'fno',
    officialUrl: 'https://vumatel.co.za/',
    coverageUrl: 'https://vumatel.co.za/',
    summary: 'Lower-cost Vuma footprint used for prepaid and affordable fibre offers in selected areas.',
    consumerRole: 'Consumers often see Vuma Reach through prepaid or lower-speed packages from ISPs.',
    infrastructureRole: 'Uses Vuma network infrastructure for selected affordable coverage zones.',
    supportRole: 'ISP or reseller manages account/top-up support; network issues may escalate to Vuma.',
    coverageNotes: 'Only available in selected areas; do not assume Vuma Reach coverage from normal Vumatel availability.',
    sourceId: 'rsaweb-ftth',
    regions: ['selected township and lower-cost rollout areas'],
    tags: ['prepaid-options', 'low-cost', 'vumatel']
  },
  {
    id: 'multi-network',
    name: 'Multiple fibre networks',
    role: 'fno',
    officialUrl: 'https://datacost.co.za/fibre/fibre-network-operators-south-africa/',
    summary: 'Used when a public provider page shows a package family but the exact FNO depends on address.',
    consumerRole: 'Run an address check before treating the example price as available.',
    infrastructureRole: 'The real FNO is assigned after coverage lookup.',
    supportRole: 'The retail ISP remains the first billing and support contact.',
    coverageNotes: 'This is a DataCost grouping, not a real network operator.',
    sourceId: 'ispa-fno-isp',
    tags: ['address-check-required']
  }
];

export const fibreIsps: FibreCompany[] = [
  {
    id: 'afrihost',
    name: 'Afrihost',
    role: 'isp',
    officialUrl: 'https://www.afrihost.com/fibre/',
    coverageUrl: 'https://www.afrihost.com/fibre/',
    summary: 'Retail ISP selling fibre packages over multiple FNOs, with monthly and prepaid examples.',
    consumerRole: 'Bills the customer, supplies service terms and manages ISP-side support.',
    infrastructureRole: 'Uses partner fibre networks rather than being the default last-mile owner for most consumer packages.',
    supportRole: 'First support contact for account, billing, router and ISP connectivity issues.',
    coverageNotes: 'Provider and package availability are shown after an address check.',
    sourceId: 'afrihost-fibre',
    tags: ['isp', 'prepaid-options', 'multi-fno']
  },
  {
    id: 'webafrica',
    name: 'Webafrica',
    role: 'isp',
    officialUrl: 'https://www.webafrica.co.za/fibre/',
    coverageUrl: 'https://www.webafrica.co.za/fibre/',
    summary: 'Retail ISP with public package examples across Vumatel, Octotel, Openserve, Frogfoot and Zoom Fibre.',
    consumerRole: 'Sells the package, bills the customer and manages account support.',
    infrastructureRole: 'Uses the fibre network live at the customer address.',
    supportRole: 'First contact for order, router, billing and ISP service questions.',
    coverageNotes: 'Public package list includes examples, but address lookup decides what can actually be ordered.',
    sourceId: 'webafrica-fibre',
    tags: ['isp', 'multi-fno', 'price-source']
  },
  {
    id: 'mweb',
    name: 'Mweb',
    role: 'isp',
    officialUrl: 'https://www.mweb.co.za/fibre',
    coverageUrl: 'https://www.mweb.co.za/fibre',
    summary: 'Retail ISP with provider pages that explain FNO roles and address-based package availability.',
    consumerRole: 'Bills and manages the fibre service after the infrastructure provider installs the line.',
    infrastructureRole: 'Does not normally own the physical last-mile line for Openserve/Vumatel-style packages.',
    supportRole: 'First support path for Mweb customers.',
    coverageNotes: 'Mweb requires an address check to show most deals.',
    sourceId: 'mweb-openserve',
    tags: ['isp', 'education-source', 'multi-fno']
  },
  {
    id: 'vox',
    name: 'Vox',
    role: 'isp',
    officialUrl: 'https://www.vox.co.za/fibre-to-the-home/',
    coverageUrl: 'https://www.vox.co.za/fibre-to-the-home/',
    summary: 'Retail ISP with featured fibre packages and address-based availability.',
    consumerRole: 'Sells packages, bills customers and provides ISP-side support.',
    infrastructureRole: 'Uses partner FNOs available at the exact address.',
    supportRole: 'First contact for Vox package, account and router questions.',
    coverageNotes: 'Featured prices are examples until checked against a specific address.',
    sourceId: 'vox-fibre',
    tags: ['isp', 'multi-fno', 'price-source']
  },
  {
    id: 'axxess',
    name: 'Axxess',
    role: 'isp',
    officialUrl: 'https://www.axxess.co.za/fibre/uncapped',
    coverageUrl: 'https://www.axxess.co.za/fibre/uncapped',
    summary: 'Retail ISP showing public fibre package examples across many FNOs.',
    consumerRole: 'Sells and supports the ISP service, with FNO availability decided by address.',
    infrastructureRole: 'Partners with fibre network providers rather than owning every listed network.',
    supportRole: 'First contact for Axxess customers.',
    coverageNotes: 'Exact price and network require address lookup and may include promo terms.',
    sourceId: 'axxess-fibre',
    tags: ['isp', 'multi-fno', 'price-source']
  },
  {
    id: 'rsaweb',
    name: 'RSAWEB',
    role: 'isp',
    officialUrl: 'https://shop.rsaweb.co.za/product-category/fibre/ftth/',
    coverageUrl: 'https://shop.rsaweb.co.za/product-category/fibre/ftth/',
    summary: 'Retail ISP with public FTTH and prepaid VUMA Reach examples.',
    consumerRole: 'Sells packages, collects payment and manages customer account support.',
    infrastructureRole: 'Uses FNOs such as Openserve, Vumatel, MetroFibre, Frogfoot and others where available.',
    supportRole: 'First contact for RSAWEB package, billing and router questions.',
    coverageNotes: 'Good public source for examples, but final availability remains address-specific.',
    sourceId: 'rsaweb-ftth',
    tags: ['isp', 'prepaid-options', 'price-source']
  },
  {
    id: 'cool-ideas',
    name: 'Cool Ideas',
    role: 'isp',
    officialUrl: 'https://coolideas.co.za/',
    coverageUrl: 'https://coolideas.co.za/coverage/',
    summary: 'Retail ISP known for FTTH packages on multiple network providers.',
    consumerRole: 'Bills and supports the fibre service where Cool Ideas sells on the relevant FNO.',
    infrastructureRole: 'Uses partner fibre network infrastructure.',
    supportRole: 'First support contact for Cool Ideas customers.',
    coverageNotes: 'Address coverage decides package options.',
    sourceId: 'ispa-fno-isp',
    tags: ['isp', 'multi-fno']
  },
  {
    id: 'telkom',
    name: 'Telkom',
    role: 'isp',
    officialUrl: 'https://www.telkom.co.za/',
    coverageUrl: 'https://www.telkom.co.za/',
    summary: 'Retail telecom provider that can sell fibre packages, often related to Openserve infrastructure.',
    consumerRole: 'Can act as the retail ISP for a customer package.',
    infrastructureRole: 'Openserve is the infrastructure side; Telkom retail is the ISP side for consumer packages.',
    supportRole: 'Retail Telkom support applies if the user buys from Telkom.',
    coverageNotes: 'Consumers should separate Telkom retail package terms from Openserve network availability.',
    sourceId: 'mweb-openserve',
    tags: ['isp', 'openserve-related']
  },
  {
    id: 'home-connect',
    name: 'Home Connect',
    role: 'isp',
    officialUrl: 'https://home-connect.co.za/',
    coverageUrl: 'https://home-connect.co.za/',
    summary: 'Retail ISP offering fibre over multiple FNOs.',
    consumerRole: 'Sells packages and manages customer service for its fibre accounts.',
    infrastructureRole: 'Uses partner fibre networks available at the address.',
    supportRole: 'First support contact for Home Connect customers.',
    coverageNotes: 'Address lookup decides package options.',
    sourceId: 'ispa-fno-isp',
    tags: ['isp', 'multi-fno']
  },
  {
    id: 'supersonic',
    name: 'Supersonic',
    role: 'isp',
    officialUrl: 'https://supersonic.co.za/',
    coverageUrl: 'https://supersonic.co.za/',
    summary: 'Retail home internet provider with fibre and wireless options.',
    consumerRole: 'Sells and supports retail connectivity products.',
    infrastructureRole: 'Uses available fibre or wireless infrastructure depending on product and address.',
    supportRole: 'First support contact for Supersonic customers.',
    coverageNotes: 'Include as a known ISP, but only show price rows when source-checked.',
    sourceId: 'ispa-fno-isp',
    tags: ['isp', 'home-internet']
  },
  {
    id: 'rocketnet',
    name: 'RocketNet',
    role: 'isp',
    officialUrl: 'https://rocketnet.co.za/',
    coverageUrl: 'https://rocketnet.co.za/',
    summary: 'Retail ISP used in consumer comparisons and FNO/ISP education.',
    consumerRole: 'Sells packages and supports its retail fibre accounts.',
    infrastructureRole: 'Uses partner FNO infrastructure in covered areas.',
    supportRole: 'First support contact for RocketNet customers.',
    coverageNotes: 'Show price data only when source-checked.',
    sourceId: 'ispa-fno-isp',
    tags: ['isp', 'multi-fno']
  }
];

export const fibreCompanies = [...fibreNetworkOperators, ...fibreIsps];

export const fibreCompanyById = fibreCompanies.reduce<Record<string, FibreCompany>>((acc, company) => {
  acc[company.id] = company;
  return acc;
}, {});

export function getFibreCompaniesById(companyIds: string[]): FibreCompany[] {
  return companyIds
    .map((companyId) => fibreCompanyById[companyId])
    .filter((company): company is FibreCompany => Boolean(company));
}
