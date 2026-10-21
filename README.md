# Jiahao Liu — Personal website

Live site: <https://jiahaoliu5.github.io/>

## Development

Node.js 24 is available in the cloud environment.

```sh
npm --cache /workspace/.cache/npm ci
npm run dev -- --hostname 0.0.0.0 --port 5173
```

PRISM uses Next.js, React, TypeScript, and Tailwind CSS. Fonts and images are served locally; no external font CDN or application secret is required.

```sh
npm run typecheck
npm run lint
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

`npm run preview -- --port 4173` serves the static `out/` artifact. Tests cover rendering, the six photo slots, research detail links, CV/service navigation, mobile menu, themes, unavailable storage, JavaScript-disabled rendering, keyboard navigation, and responsive layouts.

## Content and publication

Read [CONTENT_GUIDE.md](CONTENT_GUIDE.md). User-supplied facts are retained; photos, research records, and unavailable academic details remain explicitly marked placeholders. Template demo biographies and publications are removed.

Push source to `main`. `.github/workflows/deploy.yml` builds `out/`, tests the static artifact, deploys GitHub Pages, then verifies the public site in Chrome. Pages must remain configured with Source: GitHub Actions. The build reads `BASE_PATH` from Pages and prefixes static assets/links for a subpath when needed. The historical repository mount remains `/workspace/personal-website`.

For a future purchased domain, set Pages Custom domain and registrar DNS, update `site.url` in `content/config.toml`, then redeploy. A root domain uses an empty base path. No unpurchased domain is configured.

