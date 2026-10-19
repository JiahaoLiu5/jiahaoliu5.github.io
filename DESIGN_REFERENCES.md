# 学术主页设计参考

本版本使用现有 Vite 静态站点重新实现学术主页。没有引入 Jekyll 或 Next.js 的运行环境，也没有将别人的个人经历、论文、头像或研究图作为 Jiahao Liu 的内容发布。

## 已核对的资料

| 参考 | 实际核对资料 | 采用的设计思路 |
| --- | --- | --- |
| [Yixuan Yang](https://yixuanyang.com/) / [源码](https://github.com/YeungYathin/YeungYathin.github.io) | Jekyll 页面结构、侧栏、顶部导航、简介和论文组件、CSS 变量及排版 | 固定资料侧栏、紧凑学术段落、论文图文布局、导航层级 |
| [Academic Pages](https://academicpages.github.io/) / [源码](https://github.com/academicpages/academicpages.github.io) | 官方浅色截图、资料侧栏、导航和内容布局，MIT 许可 | 个人资料与正文分离、论文/教学/项目/CV 的完整学术信息结构 |
| [PRISM](https://prism-demo.pages.dev/) / [源码](https://github.com/xyjoey/PRISM) | 官方截图、HomePageClient、Profile、SelectedPublications、全局样式、内容配置与 MIT 许可 | 衬线标题、双栏布局、柔和卡片、明暗主题、集中内容管理 |
| [Jonathan Segal](https://jonathansegal.io/) | 通过公开代码搜索确认账号 [Jonathannsegal](https://github.com/Jonathannsegal)，该账号主页字段指向给定域名；另核对公开教学示例中的个人主页内容 | 该个人站的实时页面被云代理拦截，公开账号未提供个人网站源码，因此未把教学示例视为现站源码，也没有声称完成实站截图或精确复刻 |

Academic Pages 的 MIT 版权信息为 © 2016 Michael Rose；PRISM 的 MIT 版权信息为 © 2025 PRISM。这里记录参考来源，页面组件和 CSS 为本项目独立实现，不分发这两个项目的源代码。Yixuan 仓库未声明许可，因此仅参考公开的视觉与信息组织，没有移植其源文件。

## 本站实现

- 暖白页面、深墨色正文和青绿色强调，浅色与深色两套调色板。
- 桌面资料侧栏与正文双栏；窄屏将资料合并为紧凑页头。
- 衬线标题和清晰的正文层级，克制的边框、分隔线与留白。
- 真实资料不足时显示明确占位；缺失的 Email、Scholar 和 CV 不产生无效链接。
- 论文支持图文条目、作者强调、年份/关键词检索、摘要和 BibTeX 引用；没有默认虚构论文。
- 项目图、头像占位和论文示意图为本项目绘制，不使用参考作者的个人图片。

四个参考站点的域名已添加到环境配置草稿。配置草稿保存不等于网络规则已经在运行实例生效；后续放行生效后，可继续对实站做视觉比对。
