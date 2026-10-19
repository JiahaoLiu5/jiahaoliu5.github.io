# Jiahao Liu's academic homepage

Website: <https://jiahaoliu5.github.io/> · Repository: <https://github.com/JiahaoLiu5/jiahaoliu5.github.io>

This version directly adapts [Yixuan Yang's website source](https://github.com/YeungYathin/YeungYathin.github.io) at commit `bab9481cf9700d0e07d4138debec7c5d46aa35b9`. Its layouts, includes, stylesheet, and JavaScript replace the previous design. See [DESIGN_REFERENCES.md](DESIGN_REFERENCES.md) for the source record and changes.

The profile sidebar adapts [AcademicPages](https://github.com/academicpages/academicpages.github.io): a circular portrait, name, short biography, and vertically aligned contact/profile icons. Unknown account links remain text placeholders. Its CSS and responsive disclosure script are scoped separately; the original main-page stylesheet and script remain unchanged. Third-party notices are in `licenses/` and included in the published artifact.

## Development

Node.js 24 is available in the cloud environment.

```sh
npm --cache /workspace/.cache/npm ci
npm run dev -- --port 5173 --strictPort
```

The development server renders the original Liquid templates and rebuilds when content, styles, or templates change. No Ruby installation is required: `scripts/build.mjs` uses LiquidJS and YAML to render the source templates into static HTML. Vite serves the generated pages for local development and tests. The original Google Fonts families and Font Awesome 6.7.0 are bundled locally with their licenses.

```sh
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

The tests exercise the production artifact, section navigation, Service page, search, disclosures, themes, assets, and responsive layouts. `npm run build -- --base /some-path/` supports deployment below a path; GitHub Actions supplies the configured Pages base path. The inherited legacy `#reviewer` redirect in `js/site.js` assumes a domain-root site, as upstream does.

## Content

Read [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Personal facts have not been inferred. Research entries, photos, affiliation, biography, news, and service use explicit placeholders. No borrowed papers, CV, contact details, analytics account, or research media are published.

## Publication

Push source changes to `main`. `.github/workflows/deploy.yml` builds `dist`, runs browser tests, deploys through GitHub Pages, then verifies the public site in Chrome. Pages must remain configured with **Source: GitHub Actions**. Files in `dist` are generated and not committed.

## Future custom domain

After purchasing a domain, add it in the repository's Pages **Custom domain** settings and configure the registrar's DNS using GitHub's current instructions. Update `url` in `_config.yml` to the new HTTPS origin and redeploy; canonical links are generated from it. Keep `baseurl` empty for a root domain. Do not add a domain or DNS settings before ownership is established. The existing GitHub Pages publication workflow can continue to serve the site.
