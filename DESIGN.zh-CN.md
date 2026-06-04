# DESIGN.zh-CN.md（中文架构与详细设计）

## 1. 总体架构
- 前端：Next.js App Router + React
- 状态：Zustand（windowStore、uiStore）
- 样式：TailwindCSS + 自定义 CSS（背景/滤镜/窗口边框）
- 动画：Framer Motion
- 内容：MDX/Markdown + 索引 JSON（推荐 Contentlayer）
- 图片：构建期 sharp 生成多尺寸 + Next/Image
- AI：Next.js API Route 调用 OpenAI，前端只调用站内接口
- 部署：Docker（Next standalone）+ Nginx 反代 + HTTPS
- 开源维护：GitHub Actions 执行 lint/build/audit

## 2. 目录结构（建议）
.
├── app/
│   ├── page.tsx                  # Desktop
│   ├── p/[slug]/page.tsx         # 可选 SEO 落地页
│   ├── api/health/route.ts
│   ├── api/ai/project-guide/route.ts
│   ├── api/ai/image-generate/route.ts
│   └── sitemap.ts                # Next sitemap（或自定义）
├── components/
│   ├── desktop/
│   ├── windows/
│   │   ├── WindowFrame.tsx
│   │   ├── WindowLayer.tsx       # 渲染所有窗口
│   │   └── content/              # About/Projects/Project/Settings/ImageStudio...
│   └── ui/
├── stores/
│   ├── windowStore.ts
│   └── uiStore.ts
├── content/
│   ├── pages/about.mdx
│   └── projects/*.mdx
├── scripts/
│   └── build-index.js            # 生成 projects.index.json / photos.json
├── public/
│   └── data/                     # 构建生成的公开 JSON
├── styles/
│   └── globals.css
├── Dockerfile
├── docker-compose.yml
└── nginx/conf.d/site.conf

## 3. 数据模型

### 3.1 Project（从 MDX frontmatter 读取）
- slug: string（唯一）
- title: string
- year: number
- client?: string
- tags?: string[]
- featured?: boolean
- cover: string（指向 public/media）
- gallery: string[]（指向 public/media）
- body: MDX（描述/链接/排版）

### 3.2 Photos（JSON 或 MDX）
- id/slug
- title
- year?
- size?
- image
- shopUrl

## 4. Window Manager 设计

### 4.1 WindowState
- id: string
- type: "about" | "projects" | "project" | "photos" | "slideshow" | "settings" | "image-studio"
- title: string
- rect: { x, y, w, h }
- z: number
- isMax: boolean
- isMin: boolean（MVP 可不实现 UI）
- payload?: any（例如 { slug }）
- createdAt: number

### 4.2 windowStore（Zustand）
- state:
  - windows: WindowState[]
  - activeId: string | null
  - zCounter: number
- actions:
  - open(type, payload?): string（返回 id）
  - close(id)
  - focus(id)
  - move(id, x, y) 或 moveBy(id, dx, dy)
  - toggleMax(id)
  - updateRect(id, rect)

### 4.3 行为细节
- focus：将目标窗口 z 设置为 ++zCounter，并更新 activeId
- drag：
  - pointerdown：记录起点与窗口初始 rect
  - pointermove：更新 rect，clamp 到可视范围（避免完全拖出）
  - pointerup：结束
- maximize：
  - 保存 oldRect 到 payload 或独立 map
  - isMax=true 时 rect=viewportRect（含 padding/safe area）

## 5. UI Store（Settings 全局外观）

### 5.1 uiStore（Zustand + persist）
- theme: string（pink/green/grid/space/...）
- brightness: number（0.7–1.3）
- filter: "normal" | "bw" | "invertHue" | "negative"
- screenArea: "safe" | "full"
- actions:
  - setTheme/setBrightness/setFilter/setScreenArea
  - reset()

### 5.2 CSS 实现建议
- root 容器设置 CSS 变量：
  - --brightness
  - --filter（组合 filter 字符串）
- 将全局效果应用在最外层容器：
  - filter: brightness(var(--brightness)) <+ 自定义滤镜>
- 背景主题：
  - data-theme="pink" 等切换背景层（纯 CSS 渐变/网格）
  - 若使用贴图：public/backgrounds/*.png

## 6. Contentlayer（推荐）
- 自动把 MDX 转换为类型安全数据
- 构建时生成索引（featured、year 排序等）

如果不使用 Contentlayer：
- scripts/build-index.mjs 读取 frontmatter 生成 generated/projects.index.json

## 7. 图片管线（构建期）
- scripts/build-media.mjs
  - 输入：content-assets/originals 下的原图
  - 输出：public/media/projects/<slug>/
  - 生成：
    - *@thumb.webp（列表/缩略图）
    - *@md.webp（窗口画廊默认）
    - *@lg.webp（全屏/大图）
  - 生成 generated/media-manifest.json（映射关系）

Next/Image 使用：
- gallery 渲染 md，最大化时使用 lg（可根据 isMax 切换）

## 8. SEO 设计
- 站点级 metadata（title/description/og）
- /p/[slug]：
  - SSR/SSG 渲染项目内容
  - 生成项目级 OG（可先用通用 OG）
- sitemap：
  - 포함 / 与 /p/[slug] 列表

## 9. 部署设计（自建）
- Next.js：output="standalone"
- Nginx：
  - 反代到 app:3000
  - /_next/static 与 /media 长缓存
  - gzip 开启
- 监控：
  - /api/health
  - （可选）Uptime Kuma/Prometheus 后续加

## 10. AI 设计

### 10.1 环境变量
- `OPENAI_API_KEY`：服务端 OpenAI API Key；不传给浏览器。
- `OPENAI_MODEL`：AI Guide 模型，默认 `gpt-4.1-mini`。
- `OPENAI_IMAGE_MODEL`：Image Studio 文生图模型，默认 `gpt-image-2`。

### 10.2 AI Guide
- 路由：`GET /api/ai/project-guide`
- 输入来源：`public/data/projects.index.json`
- 处理流程：
  1. 读取项目索引中的公开元数据。
  2. 拼接导览 prompt。
  3. 使用 OpenAI Responses API 生成简短浏览建议。
  4. 返回 `{ guide, source }`。
- 失败策略：
  - 未配置 key：返回本地 fallback。
  - API 异常：返回 fallback + error 字段。
  - 路由使用 `dynamic = "force-dynamic"`，避免构建期静态化。

### 10.3 Image Studio
- 路由：`POST /api/ai/image-generate`
- 窗口组件：`components/windows/content/ImageStudioWindow.tsx`
- 输入：
  - `prompt: string`
  - 最长 1200 字符
- 输出：
  - `{ image: "data:image/png;base64,...", model }`
  - 或 `{ error }`
- 处理流程：
  1. 前端收集 prompt。
  2. 服务端校验 prompt 和 `OPENAI_API_KEY`。
  3. 调用 OpenAI Images API `/v1/images/generations`。
  4. 返回 base64 图片 data URL 供前端预览。
- 边界：
  - 不支持图生图。
  - 不接收文件上传。
  - 不保存生成文件。
  - 不自动修改 `content/projects/*.mdx`。

### 10.4 安全边界
- API Key 仅在服务端读取。
- AI 错误转为用户可读信息，不返回内部堆栈。
- Image Studio 第一版仅维护者预览使用，避免公开无限制生图带来的成本和滥用风险。

## 11. 开源维护设计
- README：面向开源使用者说明定位、运行、部署、AI 能力与安全边界。
- CHANGELOG：记录 AI Guide、Image Studio、CI/security 等可见变更。
- CONTRIBUTING：约束 PR 范围、AI 功能边界和验证要求。
- SECURITY：定义私下漏洞报告路径。
- GitHub Actions：
  - `npm ci`
  - `npm run lint`
  - `npm run build`
  - `npm audit --audit-level=moderate`

## 12. MinIO 未来升级路径（不影响 MVP）
Stage 1（推荐先做）：
- 原图放 MinIO，本地/CI 拉取原图 -> 生成多尺寸 -> 发布到服务器 public/media
Stage 2：
- 上 redis + worker（BullMQ）进行异步缩略图生成并回写 MinIO
- Nginx 反代 MinIO 作为静态资源域（可选）
