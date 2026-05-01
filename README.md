# DataCost.co.za

DataCost is a static-first React website for comparing South African mobile data prices, publishing evergreen telecom guides, and shipping SEO-friendly utility content such as USSD directories and troubleshooting pages.

The project is designed as a reusable blueprint for future content-driven sites that need:

- strong technical SEO
- prerendered HTML for important routes
- predictable canonical URL behavior
- sitemap generation from code
- lightweight regression checks on the built output
- low-friction deployment on GitHub Pages

## What Makes This Project Strong

- Important routes are prerendered into static HTML during build
- Canonical URLs are normalized around one production origin: `https://datacost.co.za/`
- Sitemap generation and prerendering share the same route catalog
- JSON-LD, Open Graph, and canonical tags are emitted from page templates
- Build output is validated after build with a dedicated SEO regression check
- Pull requests are gated by the same build used for deployment
- Production hosting is simple static hosting via GitHub Pages with a custom domain

## Stack

- React 19
- Vite
- React Router
- `react-helmet-async`
- Tailwind CSS
- `@prerenderer/rollup-plugin`
- Puppeteer renderer
- GitHub Pages

## Project Documents

- [Website Blueprint](docs/website-blueprint.md)
  Explains the architecture, SEO system, prerendering approach, route strategy, sitemap generation, and deployment design.

- [Starter Checklist](docs/starter-checklist.md)
  A reusable launch checklist for future websites based on this project.

- [SEO And GSC Baseline](docs/seo-gsc-baseline.md)
  Records the DataCosts search baseline, weekly review inputs, and FreeHub exclusion rules.

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment

Set `GEMINI_API_KEY` in `.env.local` if your local workflow needs it.

### Start dev server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

This build flow:

1. generates sitemap files
2. builds and prerenders the site
3. runs the SEO output regression check against `dist`

## Useful Commands

```bash
npm run dev
npm run build
npm run generate:sitemap
npm run check:seo
npm run lint
```

## SEO And Routing Model

The project uses a static-first SEO architecture:

- route definitions are centralized and normalized
- all indexable routes use trailing slashes
- page templates emit canonical tags and metadata
- built output is checked for canonical-domain regressions
- sitemap files are generated from the same route source used for prerendering

Key implementation files:

- [src/seo/siteConstants.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/seo/siteConstants.ts)
- [src/config/routeCatalog.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/config/routeCatalog.ts)
- [scripts/generate-sitemap.ts](C:/Users/ricca/Desktop/DataCost/datacosts/scripts/generate-sitemap.ts)
- [scripts/check-seo-output.ts](C:/Users/ricca/Desktop/DataCost/datacosts/scripts/check-seo-output.ts)
- [vite.config.ts](C:/Users/ricca/Desktop/DataCost/datacosts/vite.config.ts)
- [src/main.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/main.tsx)

## Deployment

Production is hosted on GitHub Pages with the custom domain `datacost.co.za`.

Deployment workflow:

- pull requests to `main` run `npm ci` and `npm run build`
- pushes to `main` run the same build and then deploy to GitHub Pages

Workflow file:

- [.github/workflows/deploy.yml](C:/Users/ricca/Desktop/DataCost/datacosts/.github/workflows/deploy.yml)

Static domain assets:

- [public/CNAME](C:/Users/ricca/Desktop/DataCost/datacosts/public/CNAME)
- [public/robots.txt](C:/Users/ricca/Desktop/DataCost/datacosts/public/robots.txt)

## Canonical Domain Rules

Production is standardized around:

- `https://datacost.co.za/`

Expected redirect behavior:

- `http://datacost.co.za/` -> `https://datacost.co.za/`
- `http://www.datacost.co.za/` -> `https://datacost.co.za/`
- `https://www.datacost.co.za/` -> `https://datacost.co.za/`

The site should not emit canonical SEO signals pointing to:

- `http://datacost.co.za`
- `https://www.datacost.co.za`
- `http://www.datacost.co.za`
- `github.io`
- `pages.dev`

## Reusing This Project

If you want to use this site as a starter for future projects, begin with:

- the route catalog pattern
- the canonical URL constants
- the sitemap generator
- the post-build SEO validator
- the prerendering setup
- the GitHub Actions build/deploy workflow

Then replace:

- branding
- content/data files
- page templates
- structured-data builders
- static assets

The full architecture notes are in [Website Blueprint](docs/website-blueprint.md), and the practical launch sequence is in [Starter Checklist](docs/starter-checklist.md).
