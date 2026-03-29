<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e91a1732-9bed-425e-ac93-e1b43e16e410

## Deployment

Production hosting is GitHub Pages (custom domain via `public/CNAME`), deployed by `.github/workflows/deploy.yml`.

Current canonical/redirect behavior for production:
- `www -> non-www`: handled by GitHub Pages custom-domain redirect behavior.
- `http -> https`: handled at the GitHub Pages/Fastly edge.
- trailing slash normalization: handled by GitHub Pages static routing behavior and app route conventions.

Netlify is not part of the live deployment path.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
