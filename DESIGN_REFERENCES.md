# Template and design sources

## PRISM

This implementation imports [xyjoey/PRISM](https://github.com/xyjoey/PRISM), source commit `f2748db9821e98ed487eee5104ce4cc282aa8c1e`. Its Next.js App Router, TOML/Markdown content loaders, configurable pages, theme/locale stores and providers, page components, and static export form the base of this website. The upstream MIT license is preserved in `LICENSE` and `public/licenses/PRISM-MIT.txt`.

The homepage, profile, navigation, and footer are adapted to the supplied reference. PRISM's semantic theme tokens now use a neutral black/white palette and red links. Font loading is local; the upstream external Georgia font and preconnects were removed. The unused favicon-conversion CLI was removed, and Next.js/React dependencies are pinned to patched compatible versions. Registry download URLs were normalized to the official npm registry while retaining integrity checks.

## Homepage reference

The user supplied a screenshot of Jonathan Segal's homepage. This is the visual reference for the greeting, red inline links, second biography paragraph, and compact research list with bold titles and small date/venue lines. The original photo wall was subsequently replaced at the user's request by three research-theme cards. A user-supplied MIT Media Lab screenshot guides the image-above-title arrangement, gray secondary text, and editorial typography; the cards add gutters. Neither reference's biography, research records, or photographs are presented as Jiahao's work or experiences.

The three theme illustrations were supplied by Jiahao, replacing the initial generated placeholders. Five project placeholders remain until Jiahao supplies research records. The theme titles and keywords are Jiahao's own. Each theme card is a single accessible link to its own static subpage, with a red title on hover/focus and a `Read More` label using the profile CV link's arrow style. The subpages currently contain only the supplied title, keywords, and a pending-content note, awaiting Jiahao's layout instructions. Profile facts come only from information Jiahao supplied: Cornell University, Information Science, Ph.D. student, Ithaca, HCI/behavioral research, immersive technologies, institutional email, and GitHub account.

## Research-theme images

Jiahao uploaded `Research Theme 3 pictures.zip`, containing `Research Theme 1.png`, `Research Theme 2.png`, and `Research Theme 3.png`. They map in numerical order to immersive interaction, human–agent interaction, and applied XR. The website serves them as `theme-immersive-xr-illustration.webp`, `theme-embodied-ai-illustration.webp`, and `theme-applied-xr-illustration.webp`. WebP conversion is lossless; decoded pixels were checked against each original PNG. Square image frames at all screen sizes preserve the full compositions. Alternative text describes each illustration. The files are served locally; no external image service is required to view the website.

## Portrait placeholder

The generic portrait placeholder is retained from AcademicPages under its MIT license, included at `public/licenses/academicpages-MIT.txt`. It is not a photograph of Jiahao. The prior website is preserved separately as described in `ARCHIVE.md`.
