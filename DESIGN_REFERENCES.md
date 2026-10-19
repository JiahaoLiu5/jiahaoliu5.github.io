# Template and design sources

## PRISM

This implementation imports [xyjoey/PRISM](https://github.com/xyjoey/PRISM), source commit `f2748db9821e98ed487eee5104ce4cc282aa8c1e`. Its Next.js App Router, TOML/Markdown content loaders, configurable pages, theme/locale stores and providers, page components, and static export form the base of this website. The upstream MIT license is preserved in `LICENSE` and `public/licenses/PRISM-MIT.txt`.

The homepage, profile, navigation, and footer are adapted to the supplied reference. PRISM's semantic theme tokens now use a neutral black/white palette and red links. Font loading is local; the upstream external Georgia font and preconnects were removed. The unused favicon-conversion CLI was removed, and Next.js/React dependencies are pinned to patched compatible versions. Registry download URLs were normalized to the official npm registry while retaining integrity checks.

## Homepage reference

The user supplied a screenshot of Jonathan Segal's homepage. This is the visual reference for the greeting, red inline links, three-column photo wall with alternating short/tall frames, second biography paragraph, and compact research list with bold titles and small date/venue lines. The screenshot's personal biography, research titles, dates, venues, and photographs were not copied as Jiahao's work or experiences.

Six explicitly labeled image placeholders and five project placeholders are used until Jiahao supplies real media and research records. Profile facts come only from information Jiahao supplied: Cornell University, Information Science, Ph.D. student, Ithaca, HCI/behavioral research, immersive technologies, institutional email, and GitHub account.

## Portrait placeholder

The generic portrait placeholder is retained from AcademicPages under its MIT license, included at `public/licenses/academicpages-MIT.txt`. It is not a photograph of Jiahao. The prior website is preserved separately as described in `ARCHIVE.md`.
