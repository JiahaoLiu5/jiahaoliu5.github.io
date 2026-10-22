# 内容填写指南

当前网站基于 PRISM，内容改为 `content/` 下的 TOML 和 Markdown。旧版 `_data/` 与 Liquid 模板已归档，不再用于当前网站。

| 内容 | 位置 |
| --- | --- |
| 姓名、身份、学校、院系、头像、邮箱、社交链接、导航和正式域名 | `content/config.toml` |
| 首页问候语、三段自我介绍、三个研究主题 | `content/home.toml` |
| 首页研究列表及完整 Research 页（搜索、状态、作者身份、示意图、资源） | `content/research.toml` |
| CV 内容 | `content/cv.md` |
| Academic Service 内容 | `content/service.md` |
| 图片 | `public/images/` |
| 全站配色、字体、首页布局 | `src/app/globals.css` |

首页的 `themes` 数组包含三个研究主题，按展示顺序填写 `slug`、`title`、`keywords`、`src` 和图片描述 `alt`。标题、关键词和三张主题插画均由你提供。整个主题板块是一个链接，鼠标移入或键盘聚焦时标题变红，底部显示 `Read More ↗`；三个主题卡片目前统一指向完整研究页 `/research/`。原来的三个 `/research/{slug}/` 子页面仍保留，使用同一份主题数据；后续布局入口在 `src/app/research/[theme]/page.tsx`。插画按 `Research Theme 1.png`、`2.png`、`3.png` 的顺序对应三个主题，使用无损 WebP 格式发布。之后换图时替换 `src`，同时更新 `alt`。图片框在桌面和手机上均为正方形，以完整显示插画。桌面端三列之间留有间隔；主要内容区域宽度不超过 700px 时，改为纵向排列，避免有侧边栏的平板布局挤压标题。头像路径在 `content/config.toml` 的 `author.avatar`。供图后也请更新头像的替代文字。

问候语来自 `greeting` 和 `greeting_zh`，英文默认显示；鼠标悬停或键盘聚焦标题时，英文上滑、中文从下方进入，移开或失焦后恢复英文。两种语言共用标题占位，避免页面跳动。滑动时长为 480ms，透明度过渡为 320ms。

自我介绍 `intro` 支持 Markdown，空行分段；链接显示为红色，`**文字**` 显示为加粗。三段介绍、博士导师、委员会成员、本科学校及暑期研究经历均按你提供的文字填写；首页介绍采用两端对齐，开头按后续要求删去 `currently` 并衔接为 `Cornell University, where I conduct…`。第二段仅将指定的五个短语加粗，不添加链接。原有的教育与合作经历待补充说明已删除；可选的 `background` 未填写时不渲染占位区域。外部链接的选择与公开来源记录在 `DESIGN_REFERENCES.md`。

研究列表来自 `content/research.toml` 的 `items`。每条使用稳定的 `id`、真实的 `title`、`authors`（作者名单原文）、`highlight_author`（需要加粗并加下划线的姓名）、`subtitle`（投稿或发表信息）、`date` 和 `content`。作者行显示在标题与投稿信息之间，首页与研究详情页共用同一份数据。首页项目标题会跳到 `/research/#id` 对应的详情；研究列表标题右侧的 `View More ↗`、列表底部居中的圆形箭头、三个研究方向卡片及桌面/手机导航的 Research 都指向 `/research/`。五项的标题、作者和投稿/会议信息均已按你提供的资料录入。前两项为投稿项目，说明为 `More details will be disclosed soon.`；后三项为已发表项目，资源入口暂为待补充状态。第二项的 Kevin T. Martinez 和 Jiahao Liu 后均标注 `*`，`highlight_author = "Jiahao Liu*"` 使你的星号也包含在加粗下划线中；`author_note = "（* Equal Contribution）"` 使共同贡献说明紧跟作者名单，在首页和完整研究页保持一致。五项日期均已提供，第五项为 `10 2025`。首页每个研究项目左侧使用 4px 竖线，与文字间隔 16px；竖线使用正文颜色，浅色模式为黑色，深色模式为浅色。整个项目块在鼠标悬停或内部链接获得键盘焦点时使用更浅的 `neutral-50` 背景（浅色模式为 `#fafafa`），日期右侧留出 8px 间距。首页研究标题沿用响应式字号，范围为 24–27px；第五项的 `title_keep_together = "in Virtual Reality"` 让标题末尾短语整体换行，在桌面从第二行开始，同时适应手机宽度。

社交主页只添加真实 URL。Google Scholar 和 ORCID 已有核实的公开资料来源（见 `DESIGN_REFERENCES.md`）；导航栏中的社交入口仍保持现有配置，LinkedIn 尚未提供。需要显示时可加到 `content/config.toml` 的 `social` 下。没有 PDF 时，CV 链接打开网页版本，不生成虚假的下载入口。

开发：`npm run dev -- --hostname 0.0.0.0 --port 5173`。
验证：`npm run build`，然后 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`。
提交到 `main` 后自动构建 `out/` 并发布到 GitHub Pages。

购买域名后，配置 GitHub Pages Custom domain 与注册商 DNS，将 `content/config.toml` 的 `site.url` 改为新域名，再发布即可。未购买域名前不写入 CNAME。

页面入场沿用 PRISM 的淡入与 20px 上浮效果，Home、Research、CV、Other 及方向详情页均从上至下依次显示。`src/app/template.tsx` 在切页时重新挂载内容，使入场效果再次播放；动画样式在 `src/app/globals.css`。桌面导航使用独立的浅暖红色 `nav-bubble` 气泡（浅色模式为 `#fff7f5`），选中和悬停文字为接近黑色的深灰色，跟随悬停或键盘焦点弹性滑动，并回到当前页面；手机导航使用同色圆角背景。导航中的 Other 对应原 Service 内容，地址为 `/service/`。开启系统“减少动态效果”后，入场和导航滑动动画会关闭，问候语直接切换。

完整 Research 页通过 `layout = "research"` 使用 `src/components/research/ResearchProjects.tsx`，按 `date`（月 年）从新到旧排序，同月保留原始顺序。搜索支持标题、作者、会议信息、日期和摘要中的多个关键词，和四类筛选组合使用。`status` 为 `under-review` 或 `published`；`authorship` 为 `first`、`co-first` 或 `contributor`。First-Author Projects 包括共同一作，第二篇据已提供的共同贡献标注设为 `co-first`。

完整页采用左图右文；主要内容容器宽度不超过 740px 时改为上下排列。示意图暂为 16:10 长方形占位，窄屏为 16:9。之后将真实图片放到 `public/images/`，在相应项目设置 `image = "/images/文件名.webp"` 和 `image_alt` 即可替换。完整 Research 页的最大宽度为 1100px（含两侧各 28px 内边距），比全站 1216px 容器更窄。桌面端标题、作者名单和投稿/会议信息共用最大 700px 的文字列，右侧日期使用 68px 独立列并对齐标题首行，列间距固定为 20px，避免多余空间被分配到日期前。作者行字号为 14.5px，投稿/会议信息为 15px；这些样式仅作用于完整页，首页字号保持原样。容器不超过 740px 时，日期仍对齐标题首行，作者与会议信息则使用全部可用宽度，保证手机上的阅读空间。

按你的补充要求，已发表项目目前统一摆放 DOI、Abstract、BibTeX 三个标签，未填写资料时显示为禁用状态，不使用虚假地址。之后可填写 `doi`（不含 https://doi.org/）、`abstract`（摘要原文）或 `abstract_url`，以及 `bibtex`（可用 TOML 多行字符串）；已填写的资源会自动启用，摘要和 BibTeX 支持展开，引用支持复制。页面分类与作者名单仍以你提供的信息为准。

2026-10-21 根据公开 ORCID 作品列表及 Crossref 出版方注册记录，补充了 2023 年无定形二氧化硅断裂预测论文、2021 年高等教育系统评估论文。均使用现有图示和资源标签占位，作者身份设为一作，纳入搜索和筛选。两篇设置 `featured = false`，只在完整 Research 页显示，首页保留五个精选项目；未设置 `featured` 的旧条目默认显示在首页。日期沿用月年格式，2023 年论文采用 Crossref 的首次在线发表月份 09 2023（纸本期次为 2023 年 12 月）；2021 年论文采用出版方注册的会议发表月份 12 2021。来源及访问限制见 `DESIGN_REFERENCES.md`。

最新批注：研究页简介为 `A collection of my research work, ordered by date.`；`project-01` 的作者姓名更新为 `Zhalae W. Daneshvari`、`Sarah J. Swee`，因数据共用也会更新首页。`project-06` 的显示信息为 `IJAM | International Journal of Applied Mechanics, Volume 15, Issue 10, Article 2350086`，`project-07` 增加 `IEEE` 前缀。新增 `project-08`，标题和五名作者按你提供的文字录入；发表信息按后续批注改为 `CHI Workshop Proposal | ACM CHI Conference on Human Factors in Computing Systems`，日期按补充回复设为 `10 2026`，因此自动排在完整页最前；状态为投稿中，说明沿用 `More details will be disclosed soon.`。该条设置 `featured = false`，首页保留现有五个精选项目；完整页共八项，搜索与筛选包含新增条目。原有项目的 ID 保持不变，已有锚点链接继续可用。
