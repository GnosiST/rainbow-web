# Design Document

## Overview

M6 里程碑聚焦于网站的可发现性、性能和稳定性，包括 SEO 配置、图片优化管线、测试覆盖和生产部署流程。

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SEO Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ metadata │  │ sitemap  │  │ robots   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────────────────────────────────┐              │
│  │         /p/[slug] 项目落地页          │              │
│  └──────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Media Pipeline                          │
│  content-assets/originals                                │
│           │                                              │
│           ▼ (build-media.mjs)                           │
│  public/media/projects/<slug>/                          │
│    ├── cover@thumb.webp                                 │
│    ├── cover@md.webp                                    │
│    └── cover@lg.webp                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Test Suite                             │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │  Unit Tests  │  │   E2E Tests  │                    │
│  │  (Vitest)    │  │  (Playwright)│                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. SEO Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Rainbow Portfolio",
    template: "%s | Rainbow Portfolio",
  },
  description: "桌面 OS 风格作品集网站",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://example.com",
    siteName: "Rainbow Portfolio",
  },
};
```

### 2. Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectSlugs();
  
  return [
    { url: "https://example.com", lastModified: new Date() },
    ...projects.map((slug) => ({
      url: `https://example.com/p/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
```

### 3. Project Landing Page

```typescript
// app/p/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getProjectSlugs();
  return projects.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.slug);
  return {
    title: project.title,
    description: `${project.title} - ${project.year}`,
  };
}
```

### 4. Media Pipeline Script

```javascript
// scripts/build-media.mjs
import sharp from "sharp";
import { glob } from "glob";

const sizes = {
  thumb: { width: 200, height: 150 },
  md: { width: 800, height: 600 },
  lg: { width: 1920, height: 1440 },
};

// 读取原图 -> 生成多尺寸 WebP -> 输出到 public/media
```

### 5. Test Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
});

// playwright.config.ts
export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
  },
});
```

## Data Models

### Media Manifest

```json
// generated/media-manifest.json
{
  "projects": {
    "project-1": {
      "cover": {
        "thumb": "/media/projects/project-1/cover@thumb.webp",
        "md": "/media/projects/project-1/cover@md.webp",
        "lg": "/media/projects/project-1/cover@lg.webp"
      },
      "gallery": [...]
    }
  }
}
```

## Correctness Properties

### Property 1: Sitemap 完整性

*For any* 项目索引中的项目，sitemap.xml 应包含对应的 /p/[slug] URL。

**Validates: Requirements 1.5**

### Property 2: 图片尺寸一致性

*For any* 生成的图片，其尺寸应符合预定义的 sizes 配置。

**Validates: Requirements 3.1**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| 项目 slug 不存在 | 返回 404 页面 |
| 原图不存在 | 跳过并记录警告 |
| 测试失败 | CI 阻止部署 |

## Testing Strategy

### Unit Tests (Vitest)
- windowStore 所有 actions
- uiStore 所有 actions
- 工具函数测试

### E2E Tests (Playwright)
- 打开窗口流程
- 拖拽窗口
- 窗口置顶
- 最大化/还原
- 主题切换
- Reset 功能
- 项目浏览流程

### Property-Based Tests
- Property 1: 验证 sitemap 包含所有项目
