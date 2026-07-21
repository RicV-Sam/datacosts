import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

export interface PrivacyAllowlistEntry {
  file: string;
  startLine: number;
  endLine: number;
  exactMatchSha256: readonly string[];
  matchDescription: string;
  reason: string;
  approvedBy: string;
}

export interface PrivacyFinding {
  file: string;
  line: number;
  column: number;
  category: 'south_african_phone_shape';
  preview: string;
}

export const PRIVACY_ALLOWLIST: readonly PrivacyAllowlistEntry[] = [
  {
    file: 'src/pages/USSDPage.tsx',
    startLine: 202,
    endLine: 205,
    exactMatchSha256: ['4d4436bf4c47c0baa362ca2ab91383ac69467e7d6fc03b3e6014770f0a79082d'],
    matchDescription: 'Exact pre-existing illustrative subscriber placeholder embedded in four public please-call-me dial examples.',
    reason: 'Rendered USSD examples are frozen by the Release A no-search-output-change constraint; review separately before any public copy change.',
    approvedBy: 'seo_lead'
  },
  {
    file: 'src/pages/RouterSimBalanceGuidePage.tsx',
    startLine: 31,
    endLine: 32,
    exactMatchSha256: [
      'f8ea9262622a2a6f6c8644d7cebd98986d809e008fd76fbac8fe0f67af83d612',
      '83d01e5dc07448f600fd5b4a66e5d3a7d5bcbc0e6e0af2d4292bab924a22983e'
    ],
    matchDescription: 'Exact pre-existing published Telkom business-support contact in its two rendered formatting variants.',
    reason: 'Published operator business-support contacts are public organizational data, not user or fixture data.',
    approvedBy: 'seo_lead'
  }
];

const PHONE_PATTERN = /(?<!\d)(?:\+27|0027|0)[ -]?[6-8]\d(?:[ -]?\d){7}(?!\d)/g;
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md', '.txt', '.html', '.xml', '.yml', '.yaml']);

export function privacyMatchFingerprint(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function isAllowlisted(file: string, line: number, value: string, allowlist: readonly PrivacyAllowlistEntry[]): boolean {
  const fingerprint = privacyMatchFingerprint(value);
  return allowlist.some((entry) =>
    entry.file === file &&
    line >= entry.startLine &&
    line <= entry.endLine &&
    entry.exactMatchSha256.includes(fingerprint) &&
    entry.reason.trim().length > 0 &&
    entry.approvedBy.trim().length > 0
  );
}

export function scanPrivacyText(
  file: string,
  text: string,
  allowlist: readonly PrivacyAllowlistEntry[] = PRIVACY_ALLOWLIST
): PrivacyFinding[] {
  const findings: PrivacyFinding[] = [];
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    PHONE_PATTERN.lastIndex = 0;
    for (const match of lines[index].matchAll(PHONE_PATTERN)) {
      if (isAllowlisted(file, lineNumber, match[0], allowlist)) continue;
      const masked = match[0].replace(/\d(?=\d{4})/g, 'x');
      findings.push({
        file,
        line: lineNumber,
        column: (match.index ?? 0) + 1,
        category: 'south_african_phone_shape',
        preview: lines[index].replace(match[0], masked).trim().slice(0, 200)
      });
    }
  }
  return findings;
}

async function trackedFiles(): Promise<string[]> {
  const output = await new Promise<Buffer>((resolve, reject) => {
    const child = spawn('git', ['ls-files', '-z'], { cwd: process.cwd(), shell: false });
    const chunks: Buffer[] = [];
    const errors: Buffer[] = [];
    child.stdout.on('data', (chunk: Buffer) => chunks.push(chunk));
    child.stderr.on('data', (chunk: Buffer) => errors.push(chunk));
    child.once('error', reject);
    child.once('exit', (code) => code === 0
      ? resolve(Buffer.concat(chunks))
      : reject(new Error(`git ls-files failed: ${Buffer.concat(errors).toString('utf8')}`)));
  });
  return output.toString('utf8').split('\0').filter(Boolean).map((file) => file.replace(/\\/g, '/'));
}

export async function scanTrackedRepository(): Promise<{ scannedFiles: number; findings: PrivacyFinding[] }> {
  const files = (await trackedFiles()).filter((file) => TEXT_EXTENSIONS.has(path.extname(file).toLowerCase()));
  const findings: PrivacyFinding[] = [];
  for (const file of files) {
    findings.push(...scanPrivacyText(file, await readFile(path.resolve(file), 'utf8')));
  }
  return { scannedFiles: files.length, findings };
}

async function main(): Promise<void> {
  const result = await scanTrackedRepository();
  if (result.findings.length > 0) {
    console.error(JSON.stringify({
      message: 'Potential personal phone-shaped values found in tracked text.',
      scannedFiles: result.scannedFiles,
      findings: result.findings,
      allowlist: PRIVACY_ALLOWLIST
    }, null, 2));
    process.exitCode = 1;
    return;
  }
  console.log(`WP1 privacy scan passed across ${result.scannedFiles} tracked text files with ${PRIVACY_ALLOWLIST.length} documented public-content allowlist entries.`);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (fileURLToPath(import.meta.url) === invokedPath) {
  await main();
}
