# 内容填写指南

此版本直接使用 Yixuan Yang 仓库的页面模板、CSS 和交互脚本。请在下列位置更新内容；不用再修改旧的 `src/content.js`，它已移除。

| 内容 | 文件 |
| --- | --- |
| 姓名、学校、身份、照片、城市、邮箱、社交链接、研究兴趣 | `_data/profile.yml` |
| About Me 正文 | `_includes/section-biography.html` |
| News；`collapsed: true` 为折叠的旧消息 | `_data/news.yml` |
| 研究论文，当前 3 个占位项 | `_data/publications.yml` |
| 其他项目，当前 1 个占位项 | `_data/projects.yml` |
| Academic Service | `_data/service.yml` |
| 顶栏页面链接与 CV 链接 | `_data/pages.yml` |
| 左侧章节导航 | `_data/nav.yml` |
| 网站标题、描述、正式域名 | `_config.yml` |
| 原版排版、配色、响应式布局 | `css/yixuan.css` |
| AcademicPages 风格侧栏 | `_includes/sidebar.html`、`css/academic-sidebar.css` |

侧栏的 `sidebar_bio` 是头像下面的简短简介，`location` 是地点，`institution` 是学校。`emails` 填真实邮箱列表；`socials` 中各账号的 `url` 填真实主页链接。`url: null` 会保留带图标的文字占位，不生成可点击的假链接；删除对应条目即可隐藏它。GitHub 已填入你的真实账号。侧栏头像目前使用 AcademicPages 的通用占位图，换照片时修改 `avatar` 和 `avatar_alt`。

桌面侧栏完整显示资料列表；手机和较窄屏幕通过 `Contact & profiles` 展开资料，保持首屏简洁。下方原有章节导航继续保留。

照片和项目图片放在 `assets/img/`，PDF 放在 `assets/docs/`。数据中的本地路径使用 `assets/img/filename.jpg` 这样的格式。将来可以直接替换占位图的路径；研究图片不必强行裁成统一比例。

研究项目保留原模板的字段，例如：

```yaml
- slug: a-unique-project-id
  media:
    type: image
    src: assets/img/project.jpg
    alt: Description of the actual project figure
  title: Actual project title
  authors: "Author One, <b>Jiahao Liu</b>, Author Three"
  venue: "Actual venue and year"
  links:
    - label: Paper
      url: https://example.org/actual-paper
    - label: Code
      url: https://github.com/actual-owner/actual-repository
  summary: "A short description of the actual work."
```

只有提供真实链接时再添加 `links`、`title_url`、Google Scholar 或 CV。当前没有放置失效的下载按钮或他人的联系方式。`scholar_url` 可加到 `_data/profile.yml`，届时 Research Experiences 上方会显示 Google Scholar 链接。照片目前为明确占位图，没有使用原作者照片。

更新后运行 `npm run build`，再运行浏览器测试。提交到 `main` 后自动发布。自购域名时修改 `_config.yml` 的 `url`，同时完成 GitHub Pages 和域名注册商的 DNS 设置。
