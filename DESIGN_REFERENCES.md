# Template and design sources

## PRISM

This implementation imports [xyjoey/PRISM](https://github.com/xyjoey/PRISM), source commit `f2748db9821e98ed487eee5104ce4cc282aa8c1e`. Its Next.js App Router, TOML/Markdown content loaders, configurable pages, theme/locale stores and providers, page components, and static export form the base of this website. The upstream MIT license is preserved in `LICENSE` and `public/licenses/PRISM-MIT.txt`.

The homepage, profile, navigation, and footer are adapted to the supplied reference. PRISM's semantic theme tokens now use a neutral black/white palette and red links. Font loading is local; the upstream external Georgia font and preconnects were removed. The unused favicon-conversion CLI was removed, and Next.js/React dependencies are pinned to patched compatible versions. Registry download URLs were normalized to the official npm registry while retaining integrity checks.

## Homepage reference

The user supplied a screenshot of Jonathan Segal's homepage. This is the visual reference for the greeting, red inline links, second biography paragraph, and compact research list with bold titles and small date/venue lines. The original photo wall was subsequently replaced at the user's request by three research-theme cards. A user-supplied MIT Media Lab screenshot guides the image-above-title arrangement, gray secondary text, and editorial typography; the cards add gutters. Neither reference's biography, research records, or photographs are presented as Jiahao's work or experiences.

The three theme illustrations were supplied by Jiahao, replacing the initial generated placeholders. All five research titles, author lists, and submission/conference descriptions were supplied by Jiahao. The first two are labeled as submitted to CHI '27; the remaining entries retain the supplied workshop, proceedings, and companion-publication descriptions. All five dates were supplied; project descriptions remain pending. Author names preserve the supplied spelling, including the corrected `Zewuzi Meng`, `Zhalae Daneshvari`, and `Sarah Swee`. The second entry marks `Kevin T. Martinez*` and `Jiahao Liu*`; the supplied `（* Equal Contribution）` note follows its submission information. At Jiahao's request, each homepage research entry has a 4px vertical rule with 16px of inset spacing; the rule uses the primary text token for contrast in both color themes. Research-entry hover and focus-within states use the lighter neutral-50 surface token (#fafafa in light mode), with an 8px end margin on dates to inset them from the background edge. Homepage research titles retain the existing responsive scale with a 27px cap; the fifth title keeps `in Virtual Reality` together so it starts the second line on desktop and wraps naturally on smaller screens. Jiahao's name (including his star where present) is bold and underlined on both the homepage and research detail page. The theme titles and keywords are Jiahao's own. Each theme card is a single accessible link, temporarily directed to the full `/research/` page at Jiahao's request, with a red title on hover/focus and a `Read More` label using the profile CV link's arrow style. The subpages currently contain only the supplied title, keywords, and a pending-content note, awaiting Jiahao's layout instructions. Profile facts come only from information Jiahao supplied: Cornell University, Information Science, Ph.D. student, Ithaca, HCI/behavioral research, immersive technologies, institutional email, and GitHub account.

## Research-theme images

Jiahao uploaded `Research Theme 3 pictures.zip`, containing `Research Theme 1.png`, `Research Theme 2.png`, and `Research Theme 3.png`. They map in numerical order to immersive interaction, human–agent interaction, and applied XR. The website serves them as `theme-immersive-xr-illustration.webp`, `theme-embodied-ai-illustration.webp`, and `theme-applied-xr-illustration.webp`. WebP conversion is lossless; decoded pixels were checked against each original PNG. Square image frames at all screen sizes preserve the full compositions. Alternative text describes each illustration. The files are served locally; no external image service is required to view the website.

## Portrait placeholder

The generic portrait placeholder is retained from AcademicPages under its MIT license, included at `public/licenses/academicpages-MIT.txt`. It is not a photograph of Jiahao. The prior website is preserved separately as described in `ARCHIVE.md`.

## Introduction links

Jiahao supplied the three introduction paragraphs, the five phrases to emphasize in the second paragraph, and the ten names to link. Biography wording follows Jiahao's supplied text and subsequent edits: remove `currently` and join the opening sentences with `Cornell University, where I conduct…`. The former education/collaboration placeholder is removed. Paragraph spacing is 20px, emphasis uses weight 700, and introduction paragraphs use justified alignment with naturally left-aligned final lines. The research heading includes a right-aligned `View More` link with the same ArrowUpRight icon as `Read More`. A centered, 44px circular arrow link below the project list provides a second entry point; both links and desktop/mobile Research navigation lead to `/research/`. Project-title links retain their individual anchors.

The links favor institutional pages, faculty homepages, and lab homepages:

| Text | Destination |
| --- | --- |
| Bowers School of Computing and Information Science | https://bowers.cornell.edu/ |
| Cornell University | https://www.cornell.edu/ |
| Virtual Embodiment Lab | https://virtualembodimentlab.com/ |
| Prof. Andrea Stevenson Won | https://cals.cornell.edu/andrea-stevenson-won |
| Prof. Eyal Ofek | https://www.microsoft.com/en-us/research/people/eyalofek/ |
| Prof. Susan Fussell | https://sfussell.hci.cornell.edu/ |
| Prof. Sang-won Leigh | https://www.sangww.net/ |
| Xi'an Jiaotong University | https://en.xjtu.edu.cn/ |
| APEX Lab | https://apex-hci.com/ |
| J2 Lab | https://jingjieyeo.github.io/ |

Direct website requests returned proxy-level 403 responses in this environment, including after network access was enabled. Link selection was cross-checked through accessible public academic website sources: the [Virtual Embodiment Lab profile](https://github.com/virtual-embodiment-lab), [Jingjie Yeo's official lab website source](https://github.com/jingjieyeo/jingjieyeo.github.io), [an APEX member's homepage](https://github.com/Vector3q/Vector3q.github.io/blob/main/index.html), [a former Andrea Won student's homepage](https://github.com/kexinz21/kexinz21.github.io), [Ryo Suzuki's advisor links](https://github.com/ryosuzuki/homepage/blob/master/content/experience.yaml), [Tao Long's Cornell biography](https://github.com/iamtaolong/iamtaolong.github.io), and [Max Lever's Sang-won Leigh workshop credit](https://github.com/maxlever/maxlever.me/blob/gh-pages/_posts/2019-01-01-artmatr.html). External destinations were not live HTTP-validated.

## PRISM motion and navigation adaptation

Jiahao requested PRISM-style entrance motion and navigation bubbles, with the site's warm red palette. Upstream `Navigation.tsx`, `About.tsx`, `CardPage.tsx`, and `TextPage.tsx` were consulted. The navigation preserves PRISM's spring tuning (stiffness 400, damping 28), using a shared Framer Motion layout indicator and the existing `accent-light` token. Hover and keyboard focus move the bubble; it returns to the active page. Mobile menu destinations keep the same warm rounded treatment.

Page content fades in from 20px below over 600ms with short, ordered delays. A Next.js template remounts route content so navigating between pages replays the entrance. Existing card/text entrance animations were consolidated to avoid duplicate motion. CSS entrance motion also completes without JavaScript. Reduced-motion preferences disable entrance and bubble travel.

The homepage greeting keeps its English accessible name and a fixed shared text area. Pointer hover or keyboard focus slides English upward and brings Jiahao's supplied Chinese greeting, `嗨，我是刘佳豪`, in from below; leaving restores English. Both labels remain in the content source, and CSS controls the presentation.
