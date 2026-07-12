# Dependency security review

Last reviewed: 12 July 2026

## Outcome

The dependency refresh removed all critical and high-severity audit findings. `npm audit --omit=dev` reports no production dependency vulnerabilities.

The unused direct dependencies `@google/genai` and `express` were removed. The Gemini SDK was not imported by the application and was unrelated to the site's AdSense integration.

## Remaining findings

`npm audit` reports four moderate findings in the development-only prerendering dependency chain:

- `ts-deepmerge`
- `@prerenderer/prerenderer`
- `@prerenderer/renderer-puppeteer`
- `@prerenderer/rollup-plugin`

These packages run during the production build and are not shipped as browser runtime dependencies. npm's proposed forced fix downgrades `@prerenderer/rollup-plugin` and `@prerenderer/renderer-puppeteer`; that change was not applied because it could alter or break prerendered page output. Revisit the finding when the prerenderer packages publish a compatible patched dependency chain or when the prerendering implementation is replaced.

## Verification

- TypeScript check: passed
- Production build: passed
- SEO output check: passed for 239 HTML files and five sitemap files
- AdSense output check: passed for 239 HTML pages
- Browser tests: 27 passed; three pre-existing expectation failures remain in route indexing and USSD title checks
