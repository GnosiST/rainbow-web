# Design Document

## Overview

M0 里程碑的目标是搭建完整的工程骨架，包括 Next.js 项目初始化、核心依赖配置、Docker 容器化和 Nginx 反向代理。这为后续的 Desktop Shell、Window Manager 等功能开发奠定基础。

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client Browser                      │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP/HTTPS
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Nginx (Port 80/443)                   │
│  - 反向代理                                              │
│  - 静态资源缓存 (/_next/static, /media)                  │
│  - Gzip 压缩                                             │
└─────────────────────────┬───────────────────────────────┘
                          │ proxy_pass
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 Next.js App (Port 3000)                  │
│  - App Router                                            │
│  - API Routes (/api/health)                              │
│  - Standalone Build                                      │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Next.js Application

**目录结构：**
```
app/
├── page.tsx              # 首页（Desktop 占位）
├── layout.tsx            # 根布局
├── globals.css           # 全局样式
└── api/
    └── health/
        └── route.ts      # 健康检查接口
```

**技术栈：**
- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- Zustand (状态管理)
- Framer Motion (动画)
- gray-matter (MDX 解析)
- sharp (图片处理)

### 2. Health API

**接口定义：**
```typescript
// GET /api/health
interface HealthResponse {
  status: "ok" | "error";
  timestamp: string;
  version?: string;
}
```

### 3. Docker Configuration

**Dockerfile 多阶段构建：**
1. deps stage: 安装依赖
2. builder stage: 构建应用
3. runner stage: 运行生产镜像

**docker-compose.yml 服务：**
- app: Next.js standalone 应用
- nginx: 反向代理

### 4. Nginx Configuration

**核心配置：**
- upstream 指向 app:3000
- 静态资源长期缓存 (1 year)
- gzip 压缩启用
- 安全头配置

## Data Models

本里程碑不涉及业务数据模型。

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do.*

### Property 1: Health API 响应格式一致性

*For any* 对 /api/health 的 GET 请求，响应 SHALL 始终包含 status 和 timestamp 字段，且 status 值为 "ok" 或 "error"。

**Validates: Requirements 3.1, 3.2, 3.3**

### Property 2: Docker 构建幂等性

*For any* 相同的源代码，执行 docker build 应产生功能等价的镜像。

**Validates: Requirements 4.3, 4.4**

### Property 3: Nginx 代理透明性

*For any* 通过 Nginx 代理的请求，响应内容应与直接访问 Next.js 应用的响应内容一致（除缓存和压缩外）。

**Validates: Requirements 6.1, 6.5**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| Next.js 应用未启动 | Nginx 返回 502 Bad Gateway |
| /api/health 内部错误 | 返回 500 + { status: "error" } |
| Docker 构建失败 | 输出错误日志，退出码非 0 |

## Testing Strategy

### Unit Tests
- Health API 响应格式验证
- 环境变量读取测试

### Integration Tests
- Docker Compose 启动验证
- Nginx 代理功能验证
- 端到端健康检查

### Property-Based Tests
- Health API 响应格式一致性（Property 1）
  - 使用 fast-check 生成多种请求场景
  - 验证响应始终符合 HealthResponse 接口
