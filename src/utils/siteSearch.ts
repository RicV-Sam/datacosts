export type SiteSearchItem = { path: string; title: string; description: string; keywords?: string };

function normalize(value: string): string {
  return value.toLowerCase().replace(/fiber/g, 'fibre').replace(/wi[ -]?fi/g, 'wifi')
    .replace(/cell[ -]?c\b/g, 'cellc').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function searchSite(items: SiteSearchItem[], query: string, limit = 20): SiteSearchItem[] {
  const normalized = normalize(query.slice(0, 120));
  if (!normalized) return items.slice(0, 8);
  const tokens = normalized.split(' ');
  return items.map((item, index) => {
    const title = normalize(item.title);
    const haystack = normalize(`${item.title} ${item.description} ${item.path} ${item.keywords ?? ''}`);
    const score = tokens.every((token) => haystack.includes(token))
      ? (title === normalized ? 100 : title.includes(normalized) ? 50 : 0)
        + tokens.filter((token) => title.includes(token)).length * 5 : -1;
    return { item, index, score };
  }).filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit).map(({ item }) => item);
}
