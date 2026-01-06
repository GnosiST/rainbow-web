# Requirements Document

## Introduction

M0 里程碑：搭建"桌面 OS 风格作品集网站"的工程与部署骨架，确保本地开发环境和服务器部署流程跑通。

## Glossary

- **Next_App**: 基于 Next.js App Router 的前端应用
- **Health_API**: 健康检查接口，返回应用状态和构建信息
- **Standalone_Build**: Next.js 的独立构建模式，输出可独立运行的生产包
- **Nginx_Proxy**: Nginx 反向代理服务，负责请求转发、缓存和压缩
- **Docker_Compose**: 容器编排工具，管理多个服务的启动和网络

## Requirements

### Requirement 1: Next.js 项目初始化

**User Story:** 作为开发者，我希望初始化一个 Next.js App Router 项目，以便开始构建桌面 OS 风格的作品集网站。

#### Acceptance Criteria

1. THE Next_App SHALL 使用 Next.js App Router 架构
2. THE Next_App SHALL 包含 TypeScript 配置
3. THE Next_App SHALL 包含 TailwindCSS 样式框架
4. THE Next_App SHALL 包含 ESLint 代码检查配置
5. WHEN 执行 `npm run dev` THEN THE Next_App SHALL 成功启动开发服务器

### Requirement 2: 核心依赖安装

**User Story:** 作为开发者，我希望安装项目所需的核心依赖，以便实现窗口管理、动画和内容处理功能。

#### Acceptance Criteria

1. THE Next_App SHALL 包含 zustand 状态管理库
2. THE Next_App SHALL 包含 framer-motion 动画库
3. THE Next_App SHALL 包含 gray-matter 用于解析 MDX frontmatter
4. THE Next_App SHALL 包含 sharp 用于图片处理

### Requirement 3: 健康检查接口

**User Story:** 作为运维人员，我希望有一个健康检查接口，以便监控应用运行状态。

#### Acceptance Criteria

1. WHEN 请求 GET /api/health THEN THE Health_API SHALL 返回 HTTP 200 状态码
2. WHEN 请求 GET /api/health THEN THE Health_API SHALL 返回包含 status 字段的 JSON 响应
3. WHEN 请求 GET /api/health THEN THE Health_API SHALL 返回包含 timestamp 字段的 JSON 响应

### Requirement 4: Docker 生产构建

**User Story:** 作为运维人员，我希望能够使用 Docker 构建和运行生产环境，以便简化部署流程。

#### Acceptance Criteria

1. THE Next_App SHALL 配置 output: "standalone" 模式
2. THE Dockerfile SHALL 基于多阶段构建优化镜像大小
3. THE Dockerfile SHALL 生成可独立运行的生产镜像
4. WHEN 执行 docker build THEN THE Docker_Image SHALL 成功构建

### Requirement 5: Docker Compose 编排

**User Story:** 作为运维人员，我希望使用 Docker Compose 管理多个服务，以便简化本地和服务器的部署。

#### Acceptance Criteria

1. THE Docker_Compose SHALL 定义 app 服务运行 Next.js 应用
2. THE Docker_Compose SHALL 定义 nginx 服务作为反向代理
3. WHEN 执行 `docker compose up -d` THEN THE Docker_Compose SHALL 成功启动所有服务
4. WHEN 服务启动后 THEN THE Nginx_Proxy SHALL 能够访问首页

### Requirement 6: Nginx 反向代理配置

**User Story:** 作为运维人员，我希望配置 Nginx 反向代理，以便提供缓存、压缩和安全功能。

#### Acceptance Criteria

1. THE Nginx_Proxy SHALL 将请求转发到 app:3000
2. THE Nginx_Proxy SHALL 对 /_next/static 路径启用长期缓存
3. THE Nginx_Proxy SHALL 对 /media 路径启用长期缓存
4. THE Nginx_Proxy SHALL 启用 gzip 压缩
5. WHEN 通过 Nginx 访问 /api/health THEN THE Nginx_Proxy SHALL 返回正确响应
