# Rainbow Web

Rainbow Web 是一个桌面 OS 风格的作品集网站。项目使用 Next.js 构建，通过窗口化交互展示个人介绍、项目、照片画廊、幻灯片和外观设置，并提供移动端适配视图。

## 功能

- 桌面壳：顶部菜单栏、桌面图标、Dock 和窗口层。
- 窗口管理：打开、关闭、聚焦置顶、拖拽移动、最大化和还原。
- 项目展示：项目内容由 `content/projects` 中的 MDX 文件驱动。
- 项目索引：构建前自动生成 `public/data/projects.index.json`。
- 照片画廊：照片数据由 `content/photos.json` 同步到公开数据目录。
- 外观设置：支持主题、亮度、滤镜和屏幕区域设置，并持久化到本地。
- 移动端视图：根据设备宽度切换到移动端 Shell。
- 自建部署：提供 Docker、Docker Compose、Nginx 反向代理和健康检查接口。

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Docker / Nginx

## 目录结构

```text
app/                  Next.js App Router 页面与接口
components/           桌面、移动端、窗口和内容组件
content/              项目 MDX 与照片数据源
lib/                  状态管理、主题配置和类型定义
public/data/          构建生成的公开索引数据
scripts/              构建辅助脚本
nginx/                Nginx 配置
```

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

访问：

```text
http://localhost:3000
```

## 常用命令

```bash
npm run dev          # 启动开发服务
npm run build:index  # 生成项目与照片索引
npm run build        # 生产构建
npm run start        # 启动生产服务
```

`npm run build` 会先执行 `scripts/build-index.js`，自动生成公开数据文件。

## 内容维护

新增或修改项目：

1. 在 `content/projects` 中添加或编辑 MDX 文件。
2. 确保 frontmatter 中包含项目列表和详情页需要的字段。
3. 运行 `npm run build:index` 或直接运行 `npm run build` 生成最新索引。

更新照片画廊：

1. 编辑 `content/photos.json`。
2. 运行 `npm run build:index` 同步到 `public/data/photos.json`。

## 生产部署

构建并启动服务：

```bash
docker compose build
docker compose up -d
```

查看服务日志：

```bash
docker compose logs -f
```

健康检查：

```bash
curl http://localhost/api/health
```

更新部署：

```bash
git pull
docker compose build
docker compose up -d
```

更多部署说明见 `DEPLOY.md`。

## 版本同步

当前仓库远端为：

```text
https://github.com/GnosiST/rainbow-web.git
```

检查本地与远端版本：

```bash
git fetch origin
git status --short --branch
```

如果显示 `main...origin/main` 且没有新增、修改或删除文件，本地和远端当前分支就是同步状态。
