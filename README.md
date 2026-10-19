# Jiahao Liu · Personal website

A responsive academic homepage for Jiahao Liu, built with Vite, HTML, CSS, and JavaScript. It uses system fonts and has no third-party runtime services or required credentials.

Website: **https://jiahaoliu5.github.io/**

## Develop

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Vite uses port 5173 by default. The cloud workspace and a local checkout are separate; use Git commits and pushes to share changes between them.

## Edit content

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the profile, photos, CV, publications, projects, and academic timeline schemas. All personal content is centralized in `src/content.js`; empty fields render honest placeholders. No unverified university, advisor, publications, awards, email, or personal photos are included.

The design includes a profile sidebar, academic sections, responsive navigation, a persistent light/dark theme, and structured publication rendering. The references and their access limitations are recorded in [DESIGN_REFERENCES.md](DESIGN_REFERENCES.md).

## Verify

```sh
npm run build
npx playwright install chromium
npm test
npm run preview
```

The browser tests exercise the production build, academic content, missing-field handling, navigation, mobile menu, theme persistence, unavailable browser storage, keyboard skip link, favicon, and multiple screen widths. If Chromium is installed by the environment, use its executable instead of downloading a browser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

The deployment workflow also runs these checks against the published HTTPS website using Chrome on the GitHub runner. To run them against the live website from another trusted development machine:

```sh
LIVE_SITE_URL=https://jiahaoliu5.github.io/ npm test
```

For cloud npm installations, use `npm --cache /workspace/.cache/npm ci` when the home directory is read-only.

## Publish with GitHub Pages

If this code is already in `JiahaoLiu5/personal-website`, an alternative to creating a new repository is to rename it to `jiahaoliu5.github.io` under **Settings → General → Repository name**. GitHub retains the repository's history. Then select **GitHub Actions** in **Settings → Pages** and run the deployment workflow from **Actions**. The cloud GitHub integration may allow source pushes while denying repository creation, renaming, or Pages administration; those settings must then be changed by the owner in the GitHub website.

1. For the personal-site address `https://jiahaoliu5.github.io/`, use a public repository named exactly `JiahaoLiu5/jiahaoliu5.github.io`. Put this site's source files, lockfile, and `.github/workflows/deploy.yml` in that repository; do not upload `node_modules` or local test output. Creating the repository and pushing its contents require GitHub write access.
2. In that repository on GitHub, open **Settings → Pages → Build and deployment**, then select **GitHub Actions** as the source.
3. Commit this site and push it to `main`. The workflow in `.github/workflows/deploy.yml` builds, tests, and deploys the website. It can also be triggered manually from **Actions**.
4. After deployment succeeds, GitHub reports the published URL in the Pages settings and deployment environment. For the correctly named personal-site repository, the expected address is `https://jiahaoliu5.github.io/`. Deploying directly from `personal-website` instead uses the project address `https://jiahaoliu5.github.io/personal-website/`.

The build reads the configured Pages base path, so both the project URL and a future custom domain are supported. Local browser tests can also verify the project path:

```sh
npm run build -- --base /personal-website/
BASE_PATH=/personal-website PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

After the first publication, push content changes to `main` to publish updates. A computer or cloud development server does not need to remain running for visitors to access the deployed site. Check the Actions run after updating; a failed build or test does not replace the last successful deployment.

## Connect a domain later

You can purchase a domain such as `jiahaoliu.com` if it is available; this setup does not check availability or purchase it.

1. Verify domain ownership using GitHub's documented TXT-record procedure, ideally before changing public DNS.
2. Add the domain under repository **Settings → Pages → Custom domain**.
3. In your registrar's DNS settings, point the apex domain to GitHub Pages using the current records in [GitHub's official guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). For `www`, add a CNAME pointing to `jiahaoliu5.github.io` (without a path). Avoid wildcard DNS records.
4. Wait for DNS verification and the HTTPS certificate, then enable **Enforce HTTPS**.
5. Update the canonical link and `og:url` in `index.html` to the new HTTPS address, then run the deployment workflow again after the domain is configured so it builds with the domain's root path.

No custom domain or DNS records have been configured by this project. Domain registration and GitHub Pages settings are separate from cloud environment publication.
