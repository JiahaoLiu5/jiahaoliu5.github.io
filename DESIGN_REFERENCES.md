# Template and design sources

## PRISM

This implementation imports [xyjoey/PRISM](https://github.com/xyjoey/PRISM), source commit `f2748db9821e98ed487eee5104ce4cc282aa8c1e`. Its Next.js App Router, TOML/Markdown content loaders, configurable pages, theme/locale stores and providers, page components, and static export form the base of this website. The upstream MIT license is preserved in `LICENSE` and `public/licenses/PRISM-MIT.txt`.

The homepage, profile, navigation, and footer are adapted to the supplied reference. PRISM's semantic theme tokens now use a neutral black/white palette and red links. Font loading is local; the upstream external Georgia font and preconnects were removed. The unused favicon-conversion CLI was removed, and Next.js/React dependencies are pinned to patched compatible versions. Registry download URLs were normalized to the official npm registry while retaining integrity checks.

## Homepage reference

The user supplied a screenshot of Jonathan Segal's homepage. This is the visual reference for the greeting, red inline links, second biography paragraph, and compact research list with bold titles and small date/venue lines. The original photo wall was subsequently replaced at the user's request by three research-theme cards. A user-supplied MIT Media Lab screenshot guides the image-above-title arrangement, gray secondary text, and editorial typography; the cards add gutters. Neither reference's biography, research records, or photographs are presented as Jiahao's work or experiences.

The three theme illustrations were supplied by Jiahao, replacing the initial generated placeholders. All five research titles, author lists, and submission/conference descriptions were supplied by Jiahao. The first two are labeled as submitted to CHI '27; the remaining entries retain the supplied workshop, proceedings, and companion-publication descriptions. All five dates were supplied. Under-review project descriptions use Jiahao's requested disclosure message; published project descriptions and resource metadata remain pending. Author names preserve the supplied spelling, including the corrected `Zewuzi Meng`, `Zhalae Daneshvari`, and `Sarah Swee`. The second entry marks `Kevin T. Martinez*` and `Jiahao Liu*`; the supplied `（* Equal Contribution）` note now follows its author list, at Jiahao’s request. At Jiahao's request, each homepage research entry has a 4px vertical rule with 16px of inset spacing; the rule uses the primary text token for contrast in both color themes. Research-entry hover and focus-within states use the lighter neutral-50 surface token (#fafafa in light mode), with an 8px end margin on dates to inset them from the background edge. Homepage research titles retain the existing responsive scale with a 27px cap; the fifth title keeps `in Virtual Reality` together so it starts the second line on desktop and wraps naturally on smaller screens. Jiahao's name (including his star where present) is bold and underlined on both the homepage and research detail page. The theme titles and keywords are Jiahao's own. Each theme card is a single accessible link, temporarily directed to the full `/research/` page at Jiahao's request, with a red title on hover/focus and a `Read More` label using the profile CV link's arrow style. The subpages currently contain only the supplied title, keywords, and a pending-content note, awaiting Jiahao's layout instructions. Profile facts come only from information Jiahao supplied: Cornell University, Information Science, Ph.D. student, Ithaca, HCI/behavioral research, immersive technologies, institutional email, and GitHub account.

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

Jiahao requested PRISM-style entrance motion and navigation bubbles, with the site's warm red palette. Upstream `Navigation.tsx`, `About.tsx`, `CardPage.tsx`, and `TextPage.tsx` were consulted. The navigation preserves PRISM's spring tuning (stiffness 400, damping 28), using a shared Framer Motion layout indicator. At Jiahao's request, the bubble uses a separate, lighter `nav-bubble` token (#fff7f5 in light mode; #291d1e in dark mode), and selected/hovered labels use the near-black `primary-light` text token. The Service navigation label is now Other, retaining its `/service/` destination. Hover and keyboard focus move the bubble; it returns to the active page. Mobile menu destinations keep the same warm rounded treatment.

Page content fades in from 20px below over 600ms with short, ordered delays. A Next.js template remounts route content so navigating between pages replays the entrance. Existing card/text entrance animations were consolidated to avoid duplicate motion. CSS entrance motion also completes without JavaScript. Reduced-motion preferences disable entrance and bubble travel.

The homepage greeting keeps its English accessible name and a fixed shared text area. Pointer hover or keyboard focus slides English upward and brings Jiahao's supplied Chinese greeting, `嗨，我是刘佳豪`, in from below; leaving restores English. The slide lasts 480ms and the opacity transition lasts 320ms, slightly slower than the initial version. Both labels remain in the content source, and CSS controls the presentation.

## Full research page redesign

Jiahao supplied screenshots of PRISM's search/filter controls and DOI/Abstract/BibTeX tags. Upstream `src/components/publications/PublicationsList.tsx` was consulted for search matching, grouped filters, and resource disclosures. The full research page adapts these controls to the existing neutral, warm red palette and keeps the homepage's compact list unchanged. The subtitle reads “A collection of my research work, presented in reverse chronological order.”

All five project rows use rectangular illustration placeholders on the left and metadata on the right. A 740px content-container breakpoint stacks the visual above the text. Author text is 14.5px; venue text is 15px. Following Jiahao’s later annotations, desktop titles, authors, and venues share a maximum 700px text column. Dates occupy a separate column aligned with the first title line. At the existing 740px container breakpoint, author and venue lines use the full available width while dates stay beside the first title line. The two supplied submissions are classified under review, while the three entries identified as published use the published filter. The first-author filter includes the explicitly marked equal-contribution second entry. Dates are sorted newest first with stable ordering within a month.

After being asked for missing publication metadata, Jiahao clarified that the resource tags should be laid out first and links supplied later. All three published entries therefore show disabled DOI, Abstract, and BibTeX placeholders. No guessed URLs, abstracts, or citations are published. The component accepts resource fields later and enables only the entries backed by supplied data.

## Additional research records (2026-10-21)

Jiahao provided [Google Scholar profile Ondv-hIAAAAJ](https://scholar.google.com/citations?user=Ondv-hIAAAAJ&hl=en) and requested missing papers. Direct profile requests returned HTTP 429, so complete Scholar-list coverage could not be established. The public [ORCID works record 0009-0006-0116-0024](https://pub.orcid.org/v3.0/0009-0006-0116-0024/works), linked from the existing InfoFuse and Social Leading publication records, lists those two papers plus the following two missing publications. Their metadata was checked against publisher-deposited Crossref records. An OpenAlex author search also returns unrelated same-name researchers; those works were excluded rather than attributed by name alone.

| Added record | Verified authors | Venue and date | Sources |
| --- | --- | --- | --- |
| Predicting the Fracture Propensity of Amorphous Silica Using Molecular Dynamics Simulations and Machine Learning | Jiahao Liu; Jingjie Yeo | International Journal of Applied Mechanics, 15(10), article 2350086; first online September 20, 2023; print issue December 2023 | [DOI](https://doi.org/10.1142/S1758825123500862), [Crossref](https://api.crossref.org/works/10.1142/S1758825123500862), ORCID works above |
| Evaluation of the Pulse and Temperature of Higher Education System through Modeling and Data Mining | Jiahao Liu; Yutai Gao; Yue Zhuo; Jian Zu | 2021 International Conference on Digital Society and Intelligent Systems (DSInS), pp. 245–249; registered publication December 3, 2021 | [DOI](https://doi.org/10.1109/DSInS54396.2021.9670609), [Crossref](https://api.crossref.org/works/10.1109/DSInS54396.2021.9670609), ORCID works above |

The silica paper’s Cornell/Xi’an Jiaotong affiliations and Jingjie Yeo coauthorship also match Jiahao’s supplied biography. Month badges use Crossref publication dates rather than inferred months or OpenAlex dates (which differ for the silica paper). Both new records are marked published and first-author, retain illustration and resource placeholders per the prior instruction, and are included in the full page’s reverse chronological list, search, and filters. `featured = false` keeps the homepage’s existing five selected projects. The original supplied project metadata is preserved except for moving the equal-contribution note from the venue to the author list.
