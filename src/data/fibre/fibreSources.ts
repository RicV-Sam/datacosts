export type FibreSource = {
  id: string;
  label: string;
  url: string;
  note: string;
};

export const fibreSources: FibreSource[] = [
  {
    id: 'ispa-fno-isp',
    label: 'ISPA: FNOs and ISPs',
    url: 'https://ispa.org.za/policy-and-advocacy/fnos-and-isps/',
    note: 'Industry body explanation of the roles FNOs and ISPs play in South African fibre.'
  },
  {
    id: 'metrofibre-who-is-who',
    label: 'MetroFibre: operators, ISPs and resellers',
    url: 'https://metrofibre.co.za/news/who-who-fibre-operators-isps-and-resellers/',
    note: 'Explains physical fibre operators, ISP service layers and reseller responsibilities.'
  },
  {
    id: 'mweb-openserve',
    label: 'Mweb Openserve fibre explainer',
    url: 'https://www.mweb.co.za/fibre-provider/openserve',
    note: 'Consumer-facing example explaining Openserve as the fibre infrastructure provider and Mweb as ISP.'
  },
  {
    id: 'afrihost-fibre',
    label: 'Afrihost fibre',
    url: 'https://www.afrihost.com/fibre/',
    note: 'Provider page for fibre package terms, coverage checks, installation, router and open-access explanations.'
  },
  {
    id: 'afrihost-prepaid',
    label: 'Afrihost prepaid fibre',
    url: 'https://www.afrihost.com/fibre/prepaid',
    note: 'Prepaid fibre package examples and area-availability caveats.'
  },
  {
    id: 'webafrica-fibre',
    label: 'Webafrica fibre',
    url: 'https://www.webafrica.co.za/fibre/',
    note: 'Public fibre package examples, setup claims and address-check flow.'
  },
  {
    id: 'axxess-fibre',
    label: 'Axxess uncapped fibre',
    url: 'https://www.axxess.co.za/fibre/uncapped',
    note: 'Public monthly fibre package examples across multiple FNOs.'
  },
  {
    id: 'rsaweb-ftth',
    label: 'RSAWEB FTTH shop',
    url: 'https://shop.rsaweb.co.za/product-category/fibre/ftth/',
    note: 'Public fibre and VUMA Reach prepaid package examples.'
  },
  {
    id: 'vox-fibre',
    label: 'Vox fibre to the home',
    url: 'https://www.vox.co.za/fibre-to-the-home/',
    note: 'Public featured fibre packages and address-specific availability language.'
  },
  {
    id: 'vumatel',
    label: 'Vuma fibre',
    url: 'https://vumatel.co.za/',
    note: 'FNO page for Vumatel coverage, network status and consumer fibre positioning.'
  },
  {
    id: 'frogfoot',
    label: 'Frogfoot Networks',
    url: 'https://www.frogfoot.co.za/',
    note: 'FNO page for FTTH, Frogfoot Air and ordering through preferred ISPs.'
  },
  {
    id: 'octotel',
    label: 'Octotel',
    url: 'https://octotel.co.za/',
    note: 'Open-access fibre network information, Western Cape positioning and ISP choice.'
  },
  {
    id: 'zoom-fibre',
    label: 'Zoom Fibre',
    url: 'https://zoomfibre.co.za/',
    note: 'Home fibre, prepaid Zoom Flex and coverage information.'
  },
  {
    id: 'metrofibre',
    label: 'MetroFibre',
    url: 'https://metrofibre.co.za/',
    note: 'Open-access network and ISP/reseller ecosystem information.'
  }
];

export const fibreSourceById = fibreSources.reduce<Record<string, FibreSource>>((acc, source) => {
  acc[source.id] = source;
  return acc;
}, {});

export function getFibreSourcesById(sourceIds: string[]): FibreSource[] {
  return sourceIds
    .map((sourceId) => fibreSourceById[sourceId])
    .filter((source): source is FibreSource => Boolean(source));
}
