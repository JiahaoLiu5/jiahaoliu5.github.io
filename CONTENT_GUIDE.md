# 内容填写指南

当前网站基于 PRISM，内容改为 `content/` 下的 TOML 和 Markdown。旧版 `_data/` 与 Liquid 模板已归档，不再用于当前网站。

| 内容 | 位置 |
| --- | --- |
| 姓名、身份、学校、院系、头像、邮箱、社交链接、导航和正式域名 | `content/config.toml` |
| 首页问候语、三段自我介绍、三个研究主题 | `content/home.toml` |
| 首页研究列表及研究详情页 | `content/research.toml` |
| CV 内容 | `content/cv.md` |
| Academic Service 内容 | `content/service.md` |
| 图片 | `public/images/` |
| 全站配色、字体、首页布局 | `src/app/globals.css` |

首页的 `themes` 数组包含三个研究主题，按展示顺序填写 `slug`、`title`、`keywords`、`src` 和图片描述 `alt`。标题、关键词和三张主题插画均由你提供。整个主题板块是一个链接，鼠标移入或键盘聚焦时标题变红，底部显示 `Read More ↗`；目标地址为 `/research/{slug}/`。三个子页面目前仅展示对应标题、关键词和待补充说明，使用同一份主题数据；后续布局入口在 `src/app/research/[theme]/page.tsx`。插画按 `Research Theme 1.png`、`2.png`、`3.png` 的顺序对应三个主题，使用无损 WebP 格式发布。之后换图时替换 `src`，同时更新 `alt`。图片框在桌面和手机上均为正方形，以完整显示插画。桌面端三列之间留有间隔；主要内容区域宽度不超过 700px 时，改为纵向排列，避免有侧边栏的平板布局挤压标题。头像路径在 `content/config.toml` 的 `author.avatar`。供图后也请更新头像的替代文字。

自我介绍 `intro` 支持 Markdown，空行分段；链接显示为红色，`**文字**` 显示为加粗。三段介绍、博士导师、委员会成员、本科学校及暑期研究经历均按你提供的原文填写。第二段仅将指定的五个短语加粗，不添加链接。原有的教育与合作经历待补充说明已删除；可选的 `background` 未填写时不渲染占位区域。外部链接的选择与公开来源记录在 `DESIGN_REFERENCES.md`。

研究列表来自 `content/research.toml` 的 `items`。每条使用稳定的 `id`、真实的 `title`、`authors`（作者名单原文）、`highlight_author`（需要加粗并加下划线的姓名）、`subtitle`（投稿或发表信息）、`date` 和 `content`。作者行显示在标题与投稿信息之间，首页与研究详情页共用同一份数据。首页标题会跳到 `/research/#id` 对应的详情。五项的标题、作者和投稿/会议信息均已按你提供的资料录入，项目简介待补充。第二项的 Kevin T. Martinez 和 Jiahao Liu 后均标注 `*`，`highlight_author = "Jiahao Liu*"` 使你的星号也包含在加粗下划线中；投稿信息后按你提供的说明标注 `（* Equal Contribution）`。五项日期均已提供，第五项为 `10 2025`。首页每个研究项目左侧使用 4px 竖线，与文字间隔 16px；竖线使用正文颜色，浅色模式为黑色，深色模式为浅色。整个项目块在鼠标悬停或内部链接获得键盘焦点时使用更浅的 `neutral-50` 背景（浅色模式为 `#fafafa`），日期右侧留出 8px 间距。首页研究标题沿用响应式字号，范围为 24–27px；第五项的 `title_keep_together = "in Virtual Reality"` 让标题末尾短语整体换行，在桌面从第二行开始，同时适应手机宽度。

社交主页只添加真实 URL。Google Scholar、ORCID 和 LinkedIn 暂时隐藏，提供链接后可加到 `content/config.toml` 的 `social` 下。没有 PDF 时，CV 链接打开网页版本，不生成虚假的下载入口。

开发：`npm run dev -- --hostname 0.0.0.0 --port 5173`。
验证：`npm run build`，然后 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`。
提交到 `main` 后自动构建 `out/` 并发布到 GitHub Pages。

购买域名后，配置 GitHub Pages Custom domain 与注册商 DNS，将 `content/config.toml` 的 `site.url` 改为新域名，再发布即可。未购买域名前不写入 CNAME。
