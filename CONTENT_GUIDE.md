# 内容填写指南

当前网站基于 PRISM，内容改为 `content/` 下的 TOML 和 Markdown。旧版 `_data/` 与 Liquid 模板已归档，不再用于当前网站。

| 内容 | 位置 |
| --- | --- |
| 姓名、身份、学校、院系、头像、邮箱、社交链接、导航和正式域名 | `content/config.toml` |
| 首页问候语、自我介绍、三个研究主题、后续简介 | `content/home.toml` |
| 首页研究列表及研究详情页 | `content/research.toml` |
| CV 内容 | `content/cv.md` |
| Academic Service 内容 | `content/service.md` |
| 图片 | `public/images/` |
| 全站配色、字体、首页布局 | `src/app/globals.css` |

首页的 `themes` 数组包含三个研究主题，按展示顺序填写 `slug`、`title`、`keywords`、`src` 和图片描述 `alt`。标题、关键词和三张主题插画均由你提供。整个主题板块是一个链接，鼠标移入或键盘聚焦时标题变红，底部显示 `Read More ↗`；目标地址为 `/research/{slug}/`。三个子页面目前仅展示对应标题、关键词和待补充说明，使用同一份主题数据；后续布局入口在 `src/app/research/[theme]/page.tsx`。插画按 `Research Theme 1.png`、`2.png`、`3.png` 的顺序对应三个主题，使用无损 WebP 格式发布。之后换图时替换 `src`，同时更新 `alt`。图片框在桌面和手机上均为正方形，以完整显示插画。桌面端三列之间留有间隔；主要内容区域宽度不超过 700px 时，改为纵向排列，避免有侧边栏的平板布局挤压标题。头像路径在 `content/config.toml` 的 `author.avatar`。供图后也请更新头像的替代文字。

自我介绍支持 Markdown；链接显示为红色。已有的学校、院系和联系方式来自你提供的信息。教育经历、导师、实验室、论文和时间没有推测填写。

研究列表来自 `content/research.toml` 的 `items`。每条使用稳定的 `id`、真实的 `title`、`subtitle`（发表信息）、`date` 和 `content`。首页标题会跳到 `/research/#id` 对应的详情。当前 5 条均明确占位，没有沿用参考网站的论文成果。

社交主页只添加真实 URL。Google Scholar、ORCID 和 LinkedIn 暂时隐藏，提供链接后可加到 `content/config.toml` 的 `social` 下。没有 PDF 时，CV 链接打开网页版本，不生成虚假的下载入口。

开发：`npm run dev -- --hostname 0.0.0.0 --port 5173`。
验证：`npm run build`，然后 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`。
提交到 `main` 后自动构建 `out/` 并发布到 GitHub Pages。

购买域名后，配置 GitHub Pages Custom domain 与注册商 DNS，将 `content/config.toml` 的 `site.url` 改为新域名，再发布即可。未购买域名前不写入 CNAME。
