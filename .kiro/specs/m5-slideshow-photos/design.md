# Design Document

## Overview

Slideshow 提供精选项目的快速浏览体验，Photos/Gallery 展示可购买作品并提供外链跳转。

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Slideshow Window                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Featured Project Image                  ││
│  │                                                      ││
│  │  [◀ Prev]              Title              [Next ▶]  ││
│  │                   [Open Project]                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Photos Window                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Image   │  │  Image   │  │  Image   │              │
│  │  Title   │  │  Title   │  │  Title   │              │
│  │  2024    │  │  2023    │  │  2023    │              │
│  │  [Buy]   │  │  [Buy]   │  │  [Buy]   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Slideshow Window

**文件位置：** `components/windows/apps/SlideshowWindow.tsx`

```typescript
interface SlideshowState {
  currentIndex: number;
  featuredProjects: ProjectMeta[];
}

// 导航：prev/next
// 显示：封面图 + 标题
// 操作：Open Project 按钮
```

### 2. Photos Window

**文件位置：** `components/windows/apps/PhotosWindow.tsx`

```typescript
interface PhotosWindowProps {
  // 无需 props，从数据源读取
}

// 网格布局
// 每个卡片：图片 + 标题 + 年份 + 购买按钮
```

### 3. Photo Data Model

```typescript
// types/photo.ts
interface Photo {
  id: string;
  title: string;
  year?: number;
  size?: string;
  image: string;
  shopUrl?: string;
}
```

### 4. Photos Data Source

```typescript
// content/photos.json 或 content/photos/*.mdx
[
  {
    "id": "photo-1",
    "title": "Sunset",
    "year": 2024,
    "size": "30x40cm",
    "image": "/media/photos/sunset.webp",
    "shopUrl": "https://shop.example.com/sunset"
  }
]
```

## Data Models

### Featured Projects Index

```json
// generated/projects.index.json 中的 featured 字段
{
  "featured": ["project-1", "project-3", "project-5"]
}
```

## Correctness Properties

### Property 1: Slideshow 索引循环

*For any* featured 项目数组长度 n > 0，当前索引 i，执行 next 操作后索引应为 (i + 1) % n。

**Validates: Requirements 2.3, 2.4, 2.5, 2.6**

### Property 2: 外链行为一致性

*For any* 有效 shopUrl 的 Photo，点击购买按钮应在新标签页打开该 URL。

**Validates: Requirements 6.1**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| 无 featured 项目 | 显示空状态提示 |
| 图片加载失败 | 显示占位图 |
| shopUrl 为空 | 禁用购买按钮 |

## Testing Strategy

### Unit Tests
- Slideshow 导航逻辑测试
- Photos 列表渲染测试
- 外链按钮行为测试

### Property-Based Tests
- Property 1: 生成随机 featured 数组和索引，验证循环逻辑
