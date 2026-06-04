# REQUIREMENTS.zh-CN.md（中文需求 / PRD）

## 1. 背景与目标
构建一个“桌面 OS + 窗口化作品集”网站，强调互动体验与作品浏览效率；可长期维护、可自建部署、SEO 友好。

## 2. 范围与边界

### 2.1 MVP 必做
- Desktop Shell（桌面壳）：顶部菜单栏 + 桌面图标启动器
- Window Manager（窗口管理器）
  - 多窗口同时打开
  - 拖拽移动
  - 聚焦置顶（z-index 管理）
  - 最大化/还原
  - 关闭
  - 打开/关闭动画（Framer Motion）
- Apps（窗口内容）
  - About
  - Projects（项目列表/文件夹）
  - Project（项目详情窗口：图集 + 信息面板）
  - Photos/Gallery（可购买作品列表 + 外链）
  - Slideshow（精选项目轮播）
  - Settings（全局外观设置）
  - AI Guide（项目浏览导览，集成在 Projects）
  - Image Studio（维护者文生图预览工具）
- 全局外观设置（Settings）
  - 背景主题（至少 6 种）
  - 亮度（brightness）
  - 滤镜（normal / bw / invertHue / negative）
  - Screen area（safe/full 至少 safe padding）
  - 状态持久化（localStorage）
  - Reset everything（清空持久化并回默认）
- 内容体系
  - 项目使用 Markdown/MDX 驱动（前置元信息 + 正文）
  - 自动生成项目索引（用于列表与 slideshow）
- 图片体系
  - 构建期生成多尺寸（thumb/md/lg，webp/avif）
  - Next/Image 负责响应式加载与性能
- SEO
  - 站点级 metadata
  - sitemap.xml、robots.txt
  - （可选）/p/[slug] 项目 SEO 落地页（推荐做）
- 自建部署
  - 2C4G/100G 服务器
  - Docker + Nginx 反代 + Next.js standalone
  - /api/health 健康检查
- 开源维护
  - README、CHANGELOG、LICENSE、CONTRIBUTING、SECURITY
  - GitHub Actions：lint/build/audit
  - GitHub issue / PR 模板

### 2.2 MVP 不做（明确不包含）
- 账号系统/登录权限
- 后台 CMS 或在线编辑内容
- 在线上传图片
- 公开访客无限制 AI 生图
- 图生图 / 上传图片编辑
- AI 生成图片自动落盘或自动写入 MDX
- MinIO（对象存储）与异步缩略图队列
- 复杂窗口 resize（可作为增强项）

## 3. 用户角色
- 访客：浏览作品、查看项目详情、跳转外链购买/联系
- 站点维护者（你）：通过 Git 更新内容与图片后发布

## 4. 用户故事（MVP）
1. 访客进入首页看到桌面与图标；点击图标打开窗口。
2. 点击 Projects 打开项目列表；点击某项目打开项目窗口。
3. 项目窗口可切换图片、查看 info 面板、关闭/最大化。
4. 点击 Settings 修改背景/亮度/滤镜，效果全站即时生效，并可刷新后保留。
5. 点击 Slideshow 快速浏览精选项目，可 prev/next，可一键打开当前项目窗口。
6. 点击 Photos/Gallery 浏览可购买作品条目并跳转外链。
7. 访客在 Projects 中看到 AI Guide，快速理解推荐浏览路径。
8. 站点维护者打开 Image Studio，输入 prompt 生成作品封面/视觉方向预览；结果仅预览，不保存。

## 5. 功能需求（FR）

### 5.1 Desktop Shell
- 顶部菜单（可静态）：File / Contact / Settings（MVP 可只是 UI）
- 桌面图标：About / Projects / Photos / Slideshow / Settings / Shop(外链) / Mail(外链)

### 5.2 Window Manager
- open(type, payload?)：打开窗口
- close(id)：关闭窗口
- focus(id)：置顶聚焦
- move(id, dx, dy)：拖拽移动
- toggleMax(id)：最大化/还原
- 多窗口并存；窗口不应完全拖出可视区（clamp）

### 5.3 Projects
- 读取项目索引并渲染列表（支持按 year/tags 分组可后做）
- 点击项目打开 ProjectWindow（payload: slug）
- 顶部展示 AI Guide：
  - 调用 `/api/ai/project-guide`
  - 使用公开项目索引生成短导览
  - 未配置 `OPENAI_API_KEY` 时返回本地 fallback，不阻断浏览

### 5.4 ProjectWindow
- 图片画廊：支持 prev/next，支持缩略图（可选）
- Info 面板：展示 title/year/client/tags 与正文描述（MDX）
- 交互按钮：close / maximize

### 5.5 Settings
- 背景主题：>= 6
- 亮度：范围建议 0.7–1.3
- 滤镜：normal/bw/invertHue/negative
- screen area：safe/full（MVP 先 safe）
- localStorage 持久化与 reset

### 5.6 Photos/Gallery
- 条目列表：图片、标题、年份、尺寸（可选字段）、购买链接按钮

### 5.7 Slideshow
- 从 featured 项目集合顺序浏览
- prev/next
- “Open project” 打开当前项目窗口

### 5.8 SEO
- 站点 metadata（title/description/og）
- sitemap.xml、robots.txt
- 推荐：/p/[slug] 项目落地页（同一份内容）

### 5.9 Image Studio（维护者 AI 工具）
- 新增 `image-studio` 窗口类型与入口（桌面图标/Dock/Taskbar/插画桌面）
- 文生图预览：
  - 输入 prompt
  - 调用 `/api/ai/image-generate`
  - 服务端使用 OpenAI Images API
  - 返回 base64 data URL 供前端预览
- 边界：
  - 不上传文件
  - 不保存生成图片
  - 不自动写入项目内容或 MDX
  - 未配置 `OPENAI_API_KEY` 时显示配置提示

### 5.10 开源维护与安全
- 仓库公开元数据完整：license、repository、description
- 提供贡献指南、私下安全报告渠道和更新日志
- CI 在 push/PR 执行：
  - `npm run lint`
  - `npm run build`
  - `npm audit --audit-level=moderate`

## 6. 非功能需求（NFR）
- 性能：首屏可交互 < 2.5s（中等网络），图片懒加载，多尺寸
- 兼容：桌面优先；移动端可用（可做横屏提示）
- 可维护：内容不硬编码；新增项目无需改业务代码
- 安全：仅开放 80/443/22（22 使用密钥登录）；Nginx 反代
- AI 安全：
  - OpenAI API Key 仅存在服务端环境变量
  - 浏览器不接触 API Key
  - AI 接口失败返回用户可理解错误，不暴露内部异常
  - 生成图片第一版仅预览不持久化
- 可观测：至少健康检查接口；日志可追踪

## 7. 验收标准（DoD）
- 多窗口：打开/拖拽/置顶/最大化/关闭全部可用
- Projects 列表可打开项目窗口；项目窗口可浏览图与描述
- Settings 调整即时生效且持久化；reset 生效
- Slideshow 可连续浏览并打开项目窗口
- Gallery 外链可用
- AI Guide 在无 key 情况下展示 fallback；有 key 时可生成导览
- Image Studio 在无 key 情况下展示配置提示；接口不返回 500
- lint/build/audit 在 CI 与本地均可通过
- SEO 文件可访问；部署后站点通过 Nginx 访问且健康检查 200
