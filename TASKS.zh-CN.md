# TASKS.zh-CN.md（中文任务清单）

## 0. 里程碑（Milestones）
- M0：工程与部署骨架跑通（本地 + 服务器）
- M1：Desktop Shell 完成
- M2：Window Manager 完成（拖拽/置顶/最大化/关闭/动画）
- M3：Projects + ProjectWindow 完成（内容驱动）
- M4：Settings 完成（主题/亮度/滤镜/持久化/reset）
- M5：Slideshow + Photos/Gallery 完成
- M6：SEO + 性能优化 + 测试 + 上线验收
- M7：AI 辅助内容工具（AI Guide + Image Studio）
- M8：开源维护与安全自动化（README/CI/audit/security）

---

## M0：工程与部署骨架

### EPIC: Project Bootstrap
- [ ] 初始化 Next.js（App Router）项目
- [ ] 安装依赖：zustand、framer-motion、tailwind、contentlayer(可选)、gray-matter(若不用 contentlayer)、sharp
- [ ] 配置 Tailwind + globals.css
- [ ] 添加 /api/health（返回 200 + build info）

验收：
- `npm run dev` 可运行
- `GET /api/health` 返回 200

### EPIC: Docker & Nginx
- [ ] next.config.js 设置 `output: "standalone"`
- [ ] Dockerfile（standalone 生产运行）
- [ ] docker-compose.yml（app + nginx）
- [ ] nginx/conf.d/site.conf（反代、缓存、gzip）
- [ ] 服务器部署手册（README：如何 build、run、更新、回滚）

验收：
- `docker compose up -d` 可访问首页
- Nginx 反代正常，/api/health 正常

---

## M1：Desktop Shell

### EPIC: Desktop UI
- [ ] Topbar 组件（菜单占位、可点击）
- [ ] Desktop 图标组件（About/Projects/Photos/Slideshow/Settings/Shop/Mail）
- [ ] 点击图标触发 `windowStore.open(type)`

验收：
- 点击任意图标打开窗口（placeholder 内容即可）

---

## M2：Window Manager（核心）

### EPIC: Window Store
- [ ] 定义 WindowState、WindowType
- [ ] windowStore：windows、activeId、zCounter
- [ ] actions：open/close/focus/toggleMax/updateRect

验收：
- store 单元测试通过（至少 open/close/focus/toggleMax）

### EPIC: Window Rendering Layer
- [ ] WindowLayer：遍历 windows 渲染 WindowFrame
- [ ] WindowFrame：titlebar、close/max 按钮
- [ ] focus：点击窗口置顶

验收：
- 可打开多个窗口且置顶正确

### EPIC: Drag & Motion
- [ ] pointer events 拖拽移动（clamp）
- [ ] Framer Motion：打开/关闭动画、聚焦阴影变化

验收：
- 拖拽顺滑，窗口不会完全丢失在屏幕外

---

## M3：Projects & ProjectWindow

### EPIC: Content System
二选一：
A) Contentlayer
- [ ] 配置 contentlayer，定义 Project doc schema
- [ ] 生成 projects 列表数据
B) 自定义构建脚本
- [ ] scripts/build-index.mjs（frontmatter -> generated/projects.index.json）
- [ ] 运行于 build 前（package.json scripts）

验收：
- 能获取 projects 索引数据（slug/title/year/featured/cover）

### EPIC: Projects App
- [ ] ProjectsWindow：项目列表/文件夹 UI
- [ ] 点击项目：open("project", { slug })

验收：
- Projects 列表可打开对应项目窗口

### EPIC: ProjectWindow App
- [ ] 读取 slug 对应项目内容（frontmatter + body）
- [ ] Gallery：prev/next、当前图显示（MVP）
- [ ] Info 面板：展示 metadata + MDX 正文

验收：
- 至少 6 个项目可完整浏览（图 + 描述）

---

## M4：Settings（全局外观）

### EPIC: UI Store & Persistence
- [ ] uiStore（theme/brightness/filter/screenArea）
- [ ] persist 到 localStorage
- [ ] reset() 清空并回默认

验收：
- 刷新后设置仍存在；reset 后恢复默认

### EPIC: Visual Effects
- [ ] 6 种背景主题（纯 CSS）
- [ ] brightness slider
- [ ] filter dropdown（normal/bw/invertHue/negative）
- [ ] screenArea safe padding（影响窗口最大化尺寸/桌面边距）

验收：
- Settings 改动全站即时生效（桌面与所有窗口）

---

## M5：Slideshow & Photos/Gallery

### EPIC: Slideshow
- [ ] featured 项目列表逻辑
- [ ] prev/next 浏览
- [ ] open project（打开当前项目窗口）

验收：
- 可连续浏览且可打开项目窗口

### EPIC: Photos/Gallery
- [ ] photos 数据结构（json/mdx）
- [ ] 列表渲染（图 + 标题 + 年份 + 外链按钮）
- [ ] 外链点击行为（新窗口打开）

验收：
- 外链可用，数据可扩展

---

## M6：SEO、性能、测试、上线

### EPIC: SEO
- [ ] 站点 metadata（title/description/og）
- [ ] robots.txt、sitemap
- [ ] /p/[slug]（推荐：项目 SEO 落地页）

验收：
- sitemap 包含主页与项目页；项目页可独立访问

### EPIC: Media Optimization
- [ ] scripts/build-media.mjs（sharp 多尺寸 webp/avif）
- [ ] Next/Image 接入 sizes
- [ ] 画廊预加载策略（仅当前/下一张）

验收：
- 页面加载与切图体验明显提升；静态资源缓存生效

### EPIC: Testing
- [ ] 单元测试：windowStore、uiStore
- [ ] Playwright E2E：打开窗口/拖拽/置顶/最大化/切主题/打开项目/切图/reset
- [ ] 基础无障碍：按钮可聚焦、Esc 关闭窗口（可选）

验收：
- CI 通过；关键路径无回归

### EPIC: Production Deploy
- [ ] 服务器初始化（用户、ssh key、端口、fail2ban 可选）
- [ ] HTTPS（certbot）
- [ ] 发布流程：git pull -> docker build -> docker compose up -d
- [ ] 回滚流程（保留上一个镜像 tag）

验收：
- 线上站点稳定可访问；/api/health 可用；日志可追踪

---

## M7：AI 辅助内容工具

### EPIC: AI Guide（已完成）
- [x] 新增 `/api/ai/project-guide`
- [x] 使用项目索引生成浏览导览
- [x] ProjectsWindow 顶部展示 AI Guide
- [x] 未配置 `OPENAI_API_KEY` 时返回 fallback
- [x] 路由动态执行，避免构建期静态化

验收：
- `GET /api/ai/project-guide` 无 key 时返回 fallback JSON
- Projects 窗口不因 AI 配置缺失而报错

### EPIC: Image Studio（已完成）
- [x] 新增 `image-studio` WindowType
- [x] 新增 Image Studio 窗口组件
- [x] 新增 `/api/ai/image-generate`
- [x] 接入桌面图标、Dock、Taskbar、插画桌面
- [x] 支持 prompt 输入、生成中状态、错误状态、图片预览
- [x] 未配置 `OPENAI_API_KEY` 时显示配置提示
- [x] 不上传、不落盘、不自动写入 MDX

验收：
- `POST /api/ai/image-generate` 无 key 时返回配置提示，不返回 500
- `npm run lint` 通过
- `npm run build` 中 `/api/ai/image-generate` 显示为 Dynamic

### EPIC: 图生图与资产入库（后续）
- [ ] 支持上传参考图进行图生图 / 局部编辑
- [ ] 限制上传格式、大小与数量
- [ ] 生成图片保存到持久化位置
- [ ] 记录 prompt、model、source、createdAt 等 metadata
- [ ] 人工确认后再写入项目内容

验收：
- 上传与保存链路不暴露 API Key
- 生成资产可追踪、可回滚

---

## M8：开源维护与安全自动化

### EPIC: OSS Readiness（已完成）
- [x] 重写 README，说明定位、运行、部署、AI、安全、路线图
- [x] 新增 CHANGELOG
- [x] 新增 LICENSE（MIT）
- [x] 新增 CONTRIBUTING
- [x] 新增 SECURITY
- [x] 新增 `.env.example`
- [x] package.json 补充 description/license/repository，并设置公开包元数据

验收：
- 新人可通过 README 完成本地启动
- 环境变量在 README 与 `.env.example` 中同步

### EPIC: CI & Security Checks（已完成）
- [x] 升级 Next.js / ESLint 到当前安全版本
- [x] 迁移 ESLint flat config
- [x] 新增 GitHub Actions CI
- [x] 新增 issue templates
- [x] 新增 PR template
- [x] `npm audit --audit-level=moderate` 清零

验收：
- `npm run lint` 通过
- `npm run build` 通过
- `npm audit --audit-level=moderate` 返回 0 vulnerabilities

---

## Backlog：MinIO（未来升级，不影响 MVP）
- [ ] 增加 MinIO 服务（docker-compose）
- [ ] Stage 1：原图在 MinIO，本地/CI 拉取生成多尺寸发布到 public/media
- [ ] Stage 2：redis + worker 异步生成缩略图并回写 MinIO
