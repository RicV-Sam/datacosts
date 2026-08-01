import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'docs', 'social', 'facebook', 'launch-pack');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');
const LOGO_PATH = path.join(
  ROOT,
  'docs',
  'social',
  'facebook',
  'assets',
  'datacost-facebook-profile-linkedin-aligned-1080-v2.png'
);
const CHROME_PATH = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

function visualFor(type) {
  if (type === 'ussd') {
    return `
      <rect x="724" y="280" width="236" height="430" rx="42" fill="#071f48" stroke="#14c8e8" stroke-width="8"/>
      <rect x="758" y="330" width="168" height="76" rx="16" fill="#031636" stroke="#1c5f89" stroke-width="3"/>
      <text x="842" y="383" text-anchor="middle" fill="#a0f399" font-size="44" font-weight="800">*  #</text>
      ${[0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => `<circle cx="${782 + col * 60}" cy="${468 + row * 66}" r="18" fill="${row === 2 && col === 1 ? '#8bdf47' : '#0bc8e8'}" opacity="${0.82 - row * 0.08}"/>`)).join('')}
      <rect x="804" y="674" width="76" height="9" rx="5" fill="#d8f7ff" opacity="0.7"/>
    `;
  }

  if (type === 'balance') {
    return `
      <circle cx="840" cy="480" r="142" fill="#071f48" stroke="#1a4975" stroke-width="28"/>
      <circle cx="840" cy="480" r="142" fill="none" stroke="#0bc8e8" stroke-width="28" stroke-linecap="round" stroke-dasharray="635 892" transform="rotate(-90 840 480)"/>
      <circle cx="840" cy="480" r="96" fill="#031636"/>
      <text x="840" y="470" text-anchor="middle" fill="#ffffff" font-size="66" font-weight="900">DATA</text>
      <text x="840" y="522" text-anchor="middle" fill="#a0f399" font-size="28" font-weight="800" letter-spacing="4">BALANCE</text>
      <rect x="732" y="676" width="62" height="58" rx="12" fill="#0bc8e8" opacity="0.55"/>
      <rect x="810" y="632" width="62" height="102" rx="12" fill="#0bc8e8" opacity="0.78"/>
      <rect x="888" y="574" width="62" height="160" rx="12" fill="#8bdf47"/>
    `;
  }

  if (type === 'saving') {
    return `
      <path d="M840 284 L966 334 V470 C966 588 916 676 840 724 C764 676 714 588 714 470 V334 Z" fill="#071f48" stroke="#0bc8e8" stroke-width="10"/>
      <path d="M783 496 L824 537 L906 428" fill="none" stroke="#8bdf47" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M748 374 C791 318 865 314 913 349 C868 360 832 388 809 432 C783 420 762 400 748 374 Z" fill="#0bc8e8" opacity="0.28"/>
      <circle cx="952" cy="298" r="12" fill="#8bdf47"/>
      <circle cx="704" cy="654" r="9" fill="#0bc8e8"/>
    `;
  }

  return `
    <rect x="716" y="560" width="54" height="150" rx="14" fill="#0bc8e8" opacity="0.48"/>
    <rect x="790" y="482" width="54" height="228" rx="14" fill="#0bc8e8" opacity="0.68"/>
    <rect x="864" y="386" width="54" height="324" rx="14" fill="#0bc8e8" opacity="0.9"/>
    <rect x="938" y="290" width="54" height="420" rx="14" fill="#8bdf47"/>
    <polyline points="706,554 798,466 872,420 952,276" fill="none" stroke="#d8f7ff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="706" cy="554" r="12" fill="#0bc8e8"/>
    <circle cx="798" cy="466" r="12" fill="#0bc8e8"/>
    <circle cx="872" cy="420" r="12" fill="#0bc8e8"/>
    <circle cx="952" cy="276" r="12" fill="#8bdf47"/>
  `;
}

function buildSvg(post, logoHref) {
  const headline = post.headline
    .map((line, index) => {
      const y = 385 + index * 92;
      const fill = index === post.highlightLine ? '#0bc8e8' : '#ffffff';
      return `<text x="78" y="${y}" fill="${fill}" font-size="76" font-weight="900" letter-spacing="-2">${escapeXml(line)}</text>`;
    })
    .join('\n');

  const supportStart = 385 + post.headline.length * 92 + 26;
  const support = post.support
    .map((line, index) => `<text x="82" y="${supportStart + index * 46}" fill="#dce8f5" font-size="30" font-weight="500">${escapeXml(line)}</text>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-label="${escapeXml(post.altText)}">
  <defs>
    <radialGradient id="glow" cx="84%" cy="47%" r="52%">
      <stop offset="0" stop-color="#0c62a0" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#031636" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bottomLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0bc8e8"/>
      <stop offset="1" stop-color="#8bdf47"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="#031636"/>
  <rect width="1080" height="1080" fill="url(#glow)"/>
  <g opacity="0.16" stroke="#0bc8e8" fill="none">
    <path d="M620 132 C768 166 922 126 1080 180"/>
    <path d="M610 844 C784 742 914 830 1080 696"/>
    <path d="M684 918 C824 826 938 894 1080 792"/>
    <circle cx="1000" cy="186" r="5" fill="#8bdf47" stroke="none"/>
    <circle cx="650" cy="842" r="5" fill="#0bc8e8" stroke="none"/>
  </g>
  <image href="${logoHref}" x="70" y="62" width="118" height="118" preserveAspectRatio="xMidYMid meet"/>
  <text x="208" y="111" fill="#ffffff" font-size="40" font-weight="900">Data<tspan fill="#0bc8e8">Cost</tspan></text>
  <text x="208" y="148" fill="#b8c9de" font-size="24" font-weight="500">South Africa</text>
  <text x="80" y="270" fill="#a0f399" font-size="22" font-weight="900" letter-spacing="5">${escapeXml(post.label)}</text>
  ${headline}
  ${support}
  <g>${visualFor(post.visualType)}</g>
  <rect x="72" y="938" width="936" height="2" fill="url(#bottomLine)" opacity="0.9"/>
  <text x="78" y="1005" fill="#ffffff" font-size="28" font-weight="800">datacost.co.za</text>
  <circle cx="294" cy="995" r="8" fill="#8bdf47"/>
  <text x="1002" y="1005" text-anchor="end" fill="#9eb2ca" font-size="20" font-weight="600">Independent consumer information</text>
</svg>`;
}

function assertPngDimensions(buffer, fileName) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!buffer.subarray(0, 8).equals(signature)) throw new Error(`${fileName} is not a PNG`);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width !== 1080 || height !== 1080) throw new Error(`${fileName} is ${width}x${height}; expected 1080x1080`);
}

await mkdir(OUTPUT_DIR, { recursive: true });
const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const logoData = (await readFile(LOGO_PATH)).toString('base64');
const embeddedLogo = `data:image/png;base64,${logoData}`;
const relativeLogo = '../assets/datacost-facebook-profile-linkedin-aligned-1080-v2.png';
const browser = await puppeteer.launch({
  headless: true,
  executablePath: CHROME_PATH,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
});

try {
  for (const post of manifest.posts) {
    const prefix = `launch-${String(post.order).padStart(2, '0')}-${post.id}`;
    const svgPath = path.join(OUTPUT_DIR, `${prefix}.svg`);
    const pngPath = path.join(OUTPUT_DIR, `${prefix}.png`);
    const masterSvg = buildSvg(post, relativeLogo);
    const renderSvg = buildSvg(post, embeddedLogo);
    await writeFile(svgPath, masterSvg, 'utf8');

    const encodedSvg = Buffer.from(renderSvg).toString('base64');
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
      await page.setContent(
        `<style>html,body{margin:0;width:1080px;height:1080px;overflow:hidden;background:#031636}img{display:block;width:1080px;height:1080px}</style><img id="asset" src="data:image/svg+xml;base64,${encodedSvg}" alt="">`,
        { waitUntil: 'load' }
      );
      await page.evaluate(async () => {
        const asset = document.querySelector('#asset');
        if (!(asset instanceof HTMLImageElement)) throw new Error('Rendered asset image is missing');
        await document.fonts.ready;
        await asset.decode();
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
      });
      await page.screenshot({ path: pngPath, type: 'png', omitBackground: false });
    } finally {
      await page.close();
    }
    assertPngDimensions(await readFile(pngPath), path.basename(pngPath));
    console.log(`Generated ${path.relative(ROOT, pngPath).replaceAll('\\', '/')} (1080x1080)`);
  }
} finally {
  await browser.close();
}
