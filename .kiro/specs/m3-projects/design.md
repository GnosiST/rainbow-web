# Design Document

## Overview

项目内容系统是网站的核心数据来源，采用 MDX 文件驱动，构建时生成索引。项目窗口提供列表浏览和详情查看功能。

## Architecture

```
content/projects/*.mdx
        │
        ▼ (build time)
┌─────────────────────┐
│ scripts/build-index │
└─────────────────────┘
        │
        ▼
generated/projects.index.json
        │
        ▼ (runtime)
┌─────────────────────┐     ┌─────────────────────┐
│   ProjectsWindow    │────▶│   ProjectWindow     │
│   (项目列表)         │     │   (项目详情)         │
└─────────────────────┘     └─────────────────────┘
                                    │
                            ┌───────┴───────┐
                            ▼               ▼
                      ┌──────────┐   ┌──────────┐
                      │  Gallery │   │InfoPanel │
                      └──────────┘   └──────────┘
```

## Components and Interfaces

### 1. Project Data Model

```typescript
// types/project.ts
interface ProjectMeta {
  slug: string;
  title: string;
  year: number;
  client?: string;
  tags?: string[];
  featured?: boolean;
  cover: string;
  gallery: string[];
}

interface Project extends ProjectMeta {
  content: string; // MDX 正文
}
```

### 2. Build Index Script

**文件位置：** `scripts/build-index.mjs`

```javascript
// 读取 content/projects/*.mdx
// 解析 frontmatter
// 生成 generated/projects.index.json
```

### 3. ProjectsWindow Component

**文件位置：** `components/windows/apps/ProjectsWindow.tsx`

```typescript
interface ProjectsWindowProps {
  // 无需 props，从索引读取数据
}

// 文件夹风格 UI
// 网格布局展示项目
// 点击打开 ProjectWindow
```

### 4. ProjectWindow Component

**文件位置：** `components/windows/apps/ProjectWindow.tsx`

```typescript
interface ProjectWindowProps {
  slug: string;
}

// 左侧 Gallery
// 右侧 InfoPanel
// 或上下布局（响应式）
```

### 5. Gallery Component

**文件位置：** `components/windows/apps/project/Gallery.tsx`

```typescript
interface GalleryProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}
```

### 6. InfoPanel Component

**文件位置：** `components/windows/apps/project/InfoPanel.tsx`

```typescript
interface InfoPanelProps {
  project: Project;
}
```

## Data Models

### projects.index.json 结构

```json
{
  "projects": [
    {
      "slug": "project-1",
      "title": "Project One",
      "year": 2024,
      "featured": true,
      "cover": "/media/projects/project-1/cover@md.webp",
      "gallery": [
        "/media/projects/project-1/01@md.webp",
        "/media/projects/project-1/02@md.webp"
      ]
    }
  ],
  "featured": ["project-1", "project-3"],
  "byYear": {
    "2024": ["project-1"],
    "2023": ["project-2", "project-3"]
  }
}
```

## Correctness Properties

### Property 1: 画廊索引循环

*For any* 画廊图片数组长度 n > 0，当前索引 i，执行 next 操作后索引应为 (i + 1) % n，执行 prev 操作后索引应为 (i - 1 + n) % n。

**Validates: Requirements 4.2, 4.3, 4.4, 4.5**

### Property 2: 项目数据完整性

*For any* 项目索引条目，必须包含 slug、title、year、cover 字段。

**Validates: Requirements 1.2**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| 项目 slug 不存在 | 显示"项目未找到"提示 |
| 图片加载失败 | 显示占位图 |
| MDX 解析失败 | 显示原始文本 |

## Testing Strategy

### Unit Tests
- build-index 脚本输出验证
- Gallery 索引计算测试
- InfoPanel 渲染测试

### Property-Based Tests
- Property 1: 生成随机图片数组和索引，验证循环逻辑
