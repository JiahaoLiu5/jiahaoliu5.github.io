# Website source and adaptation record

## Direct source

At the user's explicit request, this site directly adapts the public repository:

- Author: Yixuan Yang
- Website: <https://yixuanyang.com/>
- Repository: <https://github.com/YeungYathin/YeungYathin.github.io>
- Source commit: `bab9481cf9700d0e07d4138debec7c5d46aa35b9`
- Retrieved: 2026-10-19 through the GitHub API

No license file was present in that source snapshot, and GitHub's license field was null. Attribution is preserved here and in the footer; this adaptation does not assert a new license over the upstream source.

`css/yixuan.css` and `js/site.js` are copied unchanged. The default layout, masthead, publication card, news section, Service section, and search-index template are also retained. Changes include personal identity/content, page metadata, removing the original analytics account and personal links, local font/icon delivery, attribution, integrating the Liquid templates with this repository's Node build and GitHub Pages workflow, and the AcademicPages profile sidebar described below. The prior generated design and client-side content renderer were removed.

No original research media, portraits, CV, papers, or publications are included. Four plainly marked project placeholders and neutral image placeholders take their place. Unknown academic details remain placeholders.

The original source is Jekyll/Liquid. The active build uses LiquidJS with Jekyll-style includes and the URL/JSON/text filters required by these source files. This is a source adaptation, not a full repository/history mirror or a Ruby/Jekyll installation. Large personal assets, development instructions, the author's CNAME, Gemfile, and history are intentionally not imported.

## Fonts and icons

Inter, Source Serif 4, and JetBrains Mono retain the original family names and are bundled from pinned Fontsource packages. Font Awesome is pinned to the upstream version, 6.7.0. Academicons 1.9.5 supplies the Google Scholar, ORCID, and PubMed glyphs used by AcademicPages. Build output includes the packages' license notices; Academicons font licensing was extracted from the font's own metadata. No Google Fonts or icon CDN access is required by visitors.

## AcademicPages profile sidebar

At the user's request, the sidebar structure and proportions adapt `_includes/author-profile.html` and `_sass/layout/_sidebar.scss` from <https://github.com/academicpages/academicpages.github.io>, source commit `7b958332ce9970cfb6987a049d7684ac615397e8`. The generic `images/profile.png` placeholder from that repository is used as `assets/img/avatar-placeholder.png`; it is not a personal portrait. The upstream MIT license and copyright notice are preserved in `licenses/academicpages-MIT.txt` and in the published artifact.

The adapted sidebar lives in `_includes/sidebar.html`, with isolated styles in `css/academic-sidebar.css`. It adds native contact/profile disclosure on narrow screens, managed by `js/sidebar.js`. Identity, three-line biography panel, location, institution, department, email, and profile destinations remain editable in `_data/profile.yml`. The supplied Cornell affiliation, Ithaca location, and institutional email replace their placeholders. The section links now sit between Home and Service in the top navigation; `css/navigation.css` and `js/navigation.js` handle wrapping and sticky-header anchor offsets.

## Access limitation

The cloud proxy returned CONNECT HTTP 403 for both `jonathansegal.io` and `yixuanyang.com` on 2026-10-19. The Yixuan implementation was inspected from GitHub source, not from a live-site visual comparison. Jonathan Segal's live page was not inspected or used as a visual source for this version.

PRISM influenced an earlier version; its styles and components are not used in this version.
