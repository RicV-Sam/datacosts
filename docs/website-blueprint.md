# DataCost Website Blueprint

This document explains how `datacost.co.za` is implemented and why the current setup is a strong blueprint for future content-driven websites.

It is written as both:

- project documentation for this repo
- a reusable architecture guide for future static SEO websites

## 1. What This Project Is

DataCost is a content-rich React + Vite website focused on:

- comparing South African mobile data prices
- publishing evergreen and comparison guides
- exposing structured utility pages such as USSD directories and troubleshooting content
- shipping fast static output with strong technical SEO

The site is designed as a static-first SEO project rather than a dashboard or API-heavy app. The important idea is that most valuable pages are prerendered into HTML, with canonical URLs, metadata, structured data, sitemap coverage, and predictable deployment behavior.

## 2. Why This Is A Good Blueprint

This setup is strong because it combines:

- a modern React authoring experience
- static output that search engines can crawl easily
- a single canonical origin
- deterministic route generation
- lightweight automated SEO regression checks
- GitHub Pages deployment with custom-domain support

In practice, this means you get a relatively low-cost and low-maintenance site that still behaves like a serious SEO property.

## 3. High-Level Architecture

### Stack

- React 19
- Vite
- React Router
- `react-helmet-async` for metadata
- Tailwind via `@tailwindcss/vite`
- `@prerenderer/rollup-plugin` + Puppeteer renderer for prerendered HTML
- GitHub Pages for production hosting

### Runtime model

The site is built as a client-side React app, but important routes are prerendered during build so production serves static HTML snapshots for SEO-critical pages.

The app entry point is:

- [src/main.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/main.tsx)

The router and page map live in:

- [src/App.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/App.tsx)

The build and prerender configuration lives in:

- [vite.config.ts](C:/Users/ricca/Desktop/DataCost/datacosts/vite.config.ts)

## 4. Core Project Pattern

The most reusable idea in this repo is:

1. Keep content and route definitions data-driven.
2. Use a single canonical origin constant.
3. Generate all indexable routes from code.
4. Build sitemap files from the same route source.
5. Prerender those same routes to static HTML.
6. Validate the built output after build.
7. Deploy only if the build and SEO checks pass.

This creates one chain of truth instead of many disconnected SEO configs.

## 5. Canonical URL Strategy

The site uses one canonical origin:

- `https://datacost.co.za/`

The canonical constants live in:

- [src/seo/siteConstants.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/seo/siteConstants.ts)

Important design choices:

- `SITE_ORIGIN` stores the host without a trailing slash
- `SITE_URL` stores the root URL with a trailing slash
- `toCanonicalUrl()` normalizes internal paths to absolute canonical URLs

This matters because the project avoids mixing:

- `http` and `https`
- `www` and non-`www`
- trailing slash and non-trailing slash variants

For future sites, this is one of the first files to create.

## 6. Route Architecture

The routing is explicit and readable in:

- [src/App.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/App.tsx)

The project uses a mix of:

- hub/index pages
- programmatic detail pages
- redirect routes for retired or alternate URLs

Examples:

- `/guides/:slug/`
- `/network/:slug/`
- `/network/:networkSlug/:bundleType/`
- redirect routes like `/fix-a-problem/` -> `/fix-mobile-problems/`

That is a good blueprint because:

- primary SEO URLs are deliberate
- legacy URLs can still be retained safely
- content expansion stays manageable

## 7. Data-Driven Content Model

Most of the site's reusable content lives in typed data files:

- [src/data/guides.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/data/guides.ts)
- [src/data/comparisonGuides.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/data/comparisonGuides.ts)
- [src/data/networks.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/data/networks.ts)
- [src/data/ussd.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/data/ussd.ts)
- [src/data/ussdCodes.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/data/ussdCodes.ts)

This is a strong pattern for future sites because you can:

- add new pages by editing content objects instead of rewriting routing
- keep page templates consistent
- derive routes, metadata, and structured data from the same content source

For a future site, you can swap the domain and content model while keeping the same architecture.

## 8. Route Catalog As Single Source Of Truth

One of the best parts of this implementation is the route catalog:

- [src/config/routeCatalog.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/config/routeCatalog.ts)

This file:

- defines which routes are indexable
- normalizes them to canonical trailing-slash paths
- validates duplicates and malformed routes
- feeds prerendering
- feeds sitemap generation

That is exactly the kind of thing worth copying into future projects.

If you build more SEO websites, keep this pattern:

- `getIndexableRoutes()`
- `getPrerenderRoutes()`
- `validateIndexableRoutes()`

It prevents drift between what exists, what gets prerendered, and what ends up in the sitemap.

## 9. Prerendering Strategy

Prerendering is configured in:

- [vite.config.ts](C:/Users/ricca/Desktop/DataCost/datacosts/vite.config.ts)

Important implementation details:

- Vite builds the app normally
- the prerender plugin visits each indexable route
- Puppeteer waits for a custom `render-event`
- the app dispatches that event once above-the-fold content is stable

The readiness logic lives in:

- [src/main.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/main.tsx)

This is a particularly good pattern because it avoids taking a snapshot too early, which is one of the most common static SEO mistakes in React apps.

The project also patches prerendered output to:

- replace `localhost` references with the production origin
- preserve important Helmet metadata in the output

## 10. Metadata And Structured Data

Page-level SEO is handled directly in page components using `react-helmet-async`.

Examples:

- [src/pages/HomePage.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/pages/HomePage.tsx)
- [src/pages/NetworkPage.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/pages/NetworkPage.tsx)
- [src/components/GuidePage.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/components/GuidePage.tsx)

Each major page type can emit:

- canonical tag
- meta description
- Open Graph fields
- Twitter image fields
- JSON-LD
- breadcrumbs
- `datePublished` and `dateModified`

Structured data helpers live in:

- [src/utils/structuredData.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/utils/structuredData.ts)

This is worth copying because it separates:

- page content
- SEO metadata
- structured-data builders

That keeps the site maintainable as content grows.

## 11. Content Freshness And Last-Modified Logic

The project explicitly tracks content dates in:

- [src/seo/contentDates.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/seo/contentDates.ts)

This file powers:

- page `dateModified`
- sitemap `<lastmod>`
- displayed freshness messaging

This is better than hardcoding dates in every page and better than pretending file timestamps are editorial timestamps.

For future websites, this is a very practical pattern when you want SEO freshness signals without needing a CMS.

## 12. Sitemap Generation

Sitemaps are generated by:

- [scripts/generate-sitemap.ts](C:/Users/ricca/Desktop/DataCost/datacosts/scripts/generate-sitemap.ts)

The build creates:

- `sitemap.xml` as an index
- `sitemap-core.xml`
- `sitemap-guides.xml`
- `sitemap-network.xml`
- `sitemap-trust.xml`

This is useful because:

- large sites stay organized
- you can separate trust pages, guides, and hubs
- Search Console debugging gets easier

Most importantly, sitemap generation is based on the same route catalog used for prerendering.

## 13. robots.txt And Static Public Assets

Static SEO assets live in `public/`, including:

- [public/robots.txt](C:/Users/ricca/Desktop/DataCost/datacosts/public/robots.txt)
- [public/CNAME](C:/Users/ricca/Desktop/DataCost/datacosts/public/CNAME)
- [public/og-image.jpg](C:/Users/ricca/Desktop/DataCost/datacosts/public/og-image.jpg)

This is the right place for domain-level SEO assets and verification files.

## 14. Redirect Philosophy

This project uses two layers of redirects:

### Host-level redirects

Handled by GitHub Pages and the custom-domain setup:

- `http` -> `https`
- `www` -> apex

### App-level redirects

Handled in React Router for legacy path cleanup:

- old slugs
- missing trailing slash variants
- renamed pages

That split is sensible and worth repeating:

- let the hosting platform solve protocol and host normalization
- let the app own path-level redirects

## 15. Build Pipeline

The important scripts live in:

- [package.json](C:/Users/ricca/Desktop/DataCost/datacosts/package.json)

Current flow:

1. `npm run generate:sitemap`
2. `vite build`
3. `npm run check:seo`

This is a very good pattern because the site does not just build, it verifies that the output remains SEO-safe.

## 16. SEO Regression Guard

One of the most reusable additions in this repo is:

- [scripts/check-seo-output.ts](C:/Users/ricca/Desktop/DataCost/datacosts/scripts/check-seo-output.ts)

This script checks the built `dist` output and fails if SEO-critical regressions appear.

It validates:

- forbidden non-canonical host references
- missing canonical tags
- multiple canonical tags
- bad canonical prefixes
- non-canonical own-domain URLs in JSON-LD
- non-canonical own-domain URLs in `og:url`, `og:image`, and `twitter:image`
- non-canonical hosts in sitemap files
- sitemap references in `robots.txt`

This is an excellent blueprint feature because it checks the actual built output rather than trusting source code intent.

## 17. CI And Deployment

The CI/deployment workflow is:

- [.github/workflows/deploy.yml](C:/Users/ricca/Desktop/DataCost/datacosts/.github/workflows/deploy.yml)

Current behavior:

- pull requests to `main` run `npm ci` and `npm run build`
- pushes to `main` run the same build and then deploy to GitHub Pages

This is a good production pattern because:

- SEO regressions are blocked before merge
- deployment uses the exact same build gate
- installs are deterministic because CI uses `npm ci`

## 18. What Makes This Deployment Strong

The deployment is strong because it is boring in the right ways:

- static hosting
- predictable URLs
- no runtime server dependency
- no environment-sensitive canonical logic
- domain and sitemap behavior are explicit
- CI protects SEO output before deployment

For SEO-focused websites, boring infrastructure is often a feature, not a limitation.

## 19. How To Reuse This As A Blueprint

If you want to reuse this setup for another website, copy these ideas first:

### Keep

- `src/seo/siteConstants.ts`
- `src/config/routeCatalog.ts`
- `scripts/generate-sitemap.ts`
- `scripts/check-seo-output.ts`
- prerender setup in `vite.config.ts`
- custom prerender-ready event logic in `src/main.tsx`
- PR build gate in `.github/workflows/deploy.yml`

### Replace

- content files under `src/data/`
- page templates and branding
- structured-data builders for the new content domain
- images and trust/legal pages

### Decide early for each new site

- canonical host
- trailing slash policy
- which routes are indexable
- which route families need prerendering
- which page types need schema
- whether freshness dates are manual, CMS-driven, or generated

## 20. Recommended Blueprint For Future Sites

For future projects, I would keep this structure:

```text
src/
  config/
    routeCatalog.ts
  data/
  pages/
  seo/
    siteConstants.ts
    contentDates.ts
  utils/
    structuredData.ts
scripts/
  generate-sitemap.ts
  check-seo-output.ts
public/
  robots.txt
  CNAME
.github/workflows/
  deploy.yml
```

If the next site is editorial, affiliate, comparison, local SEO, or niche utility content, this structure should transfer very well.

## 21. Practical Lessons From This Project

The most important lessons worth reusing are:

- put canonical logic in one place
- make routes data-driven
- derive sitemap and prerender routes from the same source
- emit metadata from templates, not ad hoc strings spread everywhere
- validate built output, not just source code
- keep deploy infrastructure simple

If you preserve those principles, you can change the niche, design, and content model without losing the technical quality of the setup.

## 22. Suggested Next Improvement For The Blueprint

If this becomes your default website starter, the next useful step would be to extract a reusable starter template with:

- a cleaner README
- a pre-made route catalog
- placeholder schema helpers
- a generic content model
- default legal/trust pages
- the same prerender and SEO validation pipeline

That would turn this project from a good reference into a repeatable starter.

## 23. Practical Reuse Guide

If you want a faster execution-oriented companion to this document, use:

- [Starter Checklist](C:/Users/ricca/Desktop/DataCost/datacosts/docs/starter-checklist.md)
