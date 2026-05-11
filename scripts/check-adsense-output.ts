import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const TEXT_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.svg', '.txt', '.xml']);

const FORBIDDEN_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Ad Slot:', pattern: /Ad Slot:/i },
  { label: 'AdvertisementAd', pattern: /AdvertisementAd/i },
  { label: 'aboveFold', pattern: /aboveFold/i },
  { label: 'inContent', pattern: /inContent/i },
  { label: 'adsbygoogle', pattern: /adsbygoogle/i },
  { label: 'house ad', pattern: /house\s+ad/i },
  { label: 'house-ad', pattern: /house-ad/i },
  { label: 'Freehub tracks', pattern: /Freehub tracks/i },
  { label: 'Browse Freehub', pattern: /Browse Freehub/i },
  { label: 'Freehub', pattern: /Freehub/i },
  { label: 'AdUnit', pattern: /AdUnit/i }
];

type Finding = {
  file: string;
  label: string;
};

function toDisplayPath(filePath: string): string {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
}

async function walkFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    })
  );

  return files.flat();
}

async function main(): Promise<void> {
  const directoryStat = await stat(DIST_DIR).catch(() => null);
  if (!directoryStat?.isDirectory()) {
    throw new Error(`Build output directory not found: ${DIST_DIR}`);
  }

  const files = (await walkFiles(DIST_DIR)).filter((filePath) => TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase()));
  const findings: Finding[] = [];

  for (const filePath of files) {
    const text = await readFile(filePath, 'utf8');
    for (const forbidden of FORBIDDEN_PATTERNS) {
      if (forbidden.pattern.test(text)) {
        findings.push({
          file: toDisplayPath(filePath),
          label: forbidden.label
        });
      }
    }
  }

  if (findings.length > 0) {
    console.error(`AdSense output check failed with ${findings.length} finding(s):`);
    for (const finding of findings) {
      console.error(`- ${finding.file}: contains ${finding.label}`);
    }
    process.exit(1);
  }

  console.log(`AdSense output check passed for ${files.length} generated text files in ${toDisplayPath(DIST_DIR)}.`);
}

await main();
