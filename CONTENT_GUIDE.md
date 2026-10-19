# 内容补充指南

网站的资料集中在 `src/content.js`。保留 `null` 或空数组 `[]` 时，页面会显示明确的占位内容，不会生成不存在的论文、邮箱或下载链接。个人图片和文件存放在 `public/` 下，修改后推送到 `main` 会自动构建、发布并检查公网网站。

## 个人资料

`profile` 中可以填写：

| 字段 | 内容 |
| --- | --- |
| `name`, `initials`, `role` | 姓名、姓名缩写、学术身份 |
| `institution`, `department`, `location` | 院校、院系或课题组、地点 |
| `biography` | 简介段落数组；使用纯文本，不需要写 HTML |
| `interests` | 研究兴趣数组 |
| `photo`, `photoAlt` | 照片路径与替代文字 |
| `email`, `cv` | 邮箱地址、CV 文件路径 |
| `scholar`, `github`, `linkedin`, `orcid` | 真实个人主页链接 |
| `status` | 左侧资料状态；完成后设为 `null` 隐藏 |

头像可以上传为 `public/images/portrait.jpg`，然后填写 `photo: 'images/portrait.jpg'`。建议提供较清晰的方形或近方形原图，页面会保持比例裁剪。

CV 可以上传为 `public/files/cv.pdf`，然后填写 `cv: 'files/cv.pdf'`。路径不需要写 `public/`。将图片和文件实际上传后再填写对应链接。

## 动态、研究和教育

- `news`：`{ date: 'YYYY-MM-DD', text: '真实动态', url: null }`。
- `research`：`{ title: '研究方向', description: '简要介绍', url: null }`。
- `education`：`{ title: '学位或身份', institution: '院校', period: '时间', current: true }`。
- `service`：教学、指导、审稿等，格式为 `{ title, description, period: null, url: null }`。
- `awards`：`{ title, organization: null, year: null, url: null }`；无内容时整块隐藏。

## 论文

在 `publications` 中增加真实条目后，会自动显示检索框、年份筛选、作者和链接。空列表显示的是标注为 Layout preview 的占位版式，不计作真实论文。

```js
{
  id: 'unique-paper-id',
  title: '真实论文标题',
  authors: ['Jiahao Liu', '合作者姓名'],
  venue: '会议或期刊',
  year: 2026,
  image: 'images/paper-figure.png',
  imageAlt: '论文示意图的简短说明',
  abstract: '真实摘要',
  bibtex: null,
  links: [
    { label: 'Paper', url: 'https://实际论文地址' },
    { label: 'Code', url: 'https://实际代码地址' },
  ],
}
```

`bibtex` 可填写完整 BibTeX 字符串；填写后会显示引用弹窗和复制按钮。图片、摘要和资源链接都可省略。本人姓名与 `profile.name` 一致时，会自动强调显示。

## 项目

`projects` 中填写 `{ title, description, tags: [], image: null, imageAlt: '', links: [{ label, url }] }`。目前唯一真实条目是已发布的个人网站；研究项目预览明确标注为待添加。

## 风格与发布

- `src/style.css`：开头的颜色变量控制浅色与深色主题；页面使用本地系统字体，不依赖第三方字体服务。
- `index.html`：浏览器标题、搜索摘要、社交分享信息、canonical 地址。
- `public/favicon.svg`：网站图标。
- `npm run build`：构建。
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`：本地浏览器检查。
- 推送到 `main`：GitHub Actions 依次构建、测试、发布，再用浏览器检查真实公网地址。

购买个人域名后，继续使用同一仓库和更新流程：在 Pages 中设置 Custom domain，在域名注册商处配置 DNS，更新 `index.html` 的 canonical 和 `og:url`，然后重新部署。
