# Website Starter Checklist

Use this checklist when creating a new SEO-focused website based on the DataCost architecture.

The goal is to preserve the strong parts of this setup while making it easy to swap niche, brand, and content model.

## 1. Foundation

- Pick the final canonical origin before writing any metadata
- Decide whether the site will use trailing slashes
- Choose the route families that must be indexable
- Confirm the hosting platform and custom-domain strategy
- Decide whether the project is fully static or static-first

## 2. Project Setup

- Create `src/seo/siteConstants.ts`
- Create `src/config/routeCatalog.ts`
- Create `src/seo/contentDates.ts`
- Add `scripts/generate-sitemap.ts`
- Add `scripts/check-seo-output.ts`
- Add `public/robots.txt`
- Add `public/CNAME` if using GitHub Pages custom domains

## 3. Canonical Rules

- Define one canonical origin only
- Make all internal canonical URLs absolute
- Normalize path formatting in one helper
- Enforce the same convention in route generation
- Avoid mixing slash and non-slash root forms in schema output
- Verify host-level redirects for `http`, `www`, and `non-www`

## 4. Routing

- Put indexable routes in one route catalog
- Validate route uniqueness
- Validate route slash format
- Use redirect routes for renamed or retired paths
- Keep route naming predictable and keyword-aligned

## 5. Content Model

- Keep reusable content in `src/data/`
- Prefer typed content objects over scattered strings
- Separate page templates from content entries
- Keep slugs stable once a page is live
- Add trust/legal pages early

## 6. Metadata

- Add a canonical tag to every indexable page
- Add a description tag to every indexable page
- Add `og:url`
- Add `og:image`
- Add `twitter:image` where relevant
- Add breadcrumbs on important page types
- Add `datePublished` and `dateModified` where useful

## 7. Structured Data

- Decide which schema types matter for the site
- Keep schema builders in a dedicated utility file
- Ensure own-domain URLs in JSON-LD use the canonical origin
- Reuse shared brand/logo constants
- Validate schema output in built HTML, not just in source

## 8. Prerendering

- Prerender all high-value SEO routes
- Use the route catalog as the prerender source
- Wait for a reliable render-ready signal before snapshotting
- Replace any `localhost` references in prerendered output
- Spot-check built HTML before deployment

## 9. Sitemap And robots.txt

- Generate sitemaps from code
- Use the same route source as prerendering
- Split sitemaps into logical sections if the site grows
- Add a sitemap index
- Point `robots.txt` to the canonical sitemap URL

## 10. Build Validation

- Fail the build if canonical tags are missing
- Fail the build if multiple canonicals appear
- Fail the build if canonical URLs do not start with the canonical origin
- Fail the build on non-canonical own-domain references in JSON-LD
- Fail the build on non-canonical own-domain references in social metadata
- Fail the build if sitemap files contain non-canonical hosts

## 11. CI And Deployment

- Run the production build on pull requests
- Use `npm ci` in CI
- Only deploy from the protected branch
- Make deploy depend on the same build used in PR checks
- Keep permissions minimal in GitHub Actions

## 12. Post-Launch Checks

- Verify live redirects for root variants
- Verify live canonical tags on key pages
- Verify live sitemap index and child sitemaps
- Verify `robots.txt`
- Verify JSON-LD on a few representative pages
- Check Google Search Console coverage after launch

## 13. Reusable Starter Files To Copy First

- [src/seo/siteConstants.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/seo/siteConstants.ts)
- [src/config/routeCatalog.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/config/routeCatalog.ts)
- [src/seo/contentDates.ts](C:/Users/ricca/Desktop/DataCost/datacosts/src/seo/contentDates.ts)
- [scripts/generate-sitemap.ts](C:/Users/ricca/Desktop/DataCost/datacosts/scripts/generate-sitemap.ts)
- [scripts/check-seo-output.ts](C:/Users/ricca/Desktop/DataCost/datacosts/scripts/check-seo-output.ts)
- [vite.config.ts](C:/Users/ricca/Desktop/DataCost/datacosts/vite.config.ts)
- [src/main.tsx](C:/Users/ricca/Desktop/DataCost/datacosts/src/main.tsx)
- [.github/workflows/deploy.yml](C:/Users/ricca/Desktop/DataCost/datacosts/.github/workflows/deploy.yml)

## 14. Things To Replace Immediately In A New Project

- site name
- canonical domain
- brand/logo assets
- content model
- schema types
- trust pages
- Open Graph image
- niche-specific route families

## 15. Simple Launch Sequence

1. Set canonical constants.
2. Build route catalog.
3. Add page templates and content data.
4. Add metadata and schema.
5. Add sitemap generation.
6. Add prerendering.
7. Add SEO output validation.
8. Add CI build gate.
9. Configure custom domain and DNS.
10. Launch and verify live output.

## 16. Rule Of Thumb

If a future site starts to drift, bring it back to these three sources of truth:

- one canonical-origin file
- one route catalog
- one post-build SEO validator
