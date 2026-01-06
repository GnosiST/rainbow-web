# Design Document

## Overview

Desktop Shell 是用户与网站交互的入口，模拟桌面操作系统的视觉和交互体验。包含固定在顶部的菜单栏和桌面图标区域。

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Topbar                              │
│  [File ▼] [Contact ▼] [Settings ▼]              [时间]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [About]    [Projects]   [Photos]                      │
│                                                          │
│   [Slideshow] [Settings]  [Shop↗]   [Mail↗]            │
│                                                          │
│                      Desktop Area                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Topbar Component

**文件位置：** `components/desktop/Topbar.tsx`

```typescript
interface TopbarProps {
  className?: string;
}

// 菜单项配置
const menuItems = [
  { label: "File", items: ["New Window", "Close Window"] },
  { label: "Contact", items: ["Email", "Social"] },
  { label: "Settings", items: ["Preferences"] },
];
```

**样式特点：**
- 固定高度（约 24-28px）
- 半透明背景 + 模糊效果
- 左侧菜单项，右侧可选显示时间

### 2. DesktopIcon Component

**文件位置：** `components/desktop/DesktopIcon.tsx`

```typescript
interface DesktopIconProps {
  type: WindowType | "shop" | "mail";
  label: string;
  icon: React.ReactNode;
  href?: string; // 外链地址
  onClick?: () => void;
}
```

**图标类型：**
- 内部应用：about, projects, photos, slideshow, settings
- 外链：shop, mail

### 3. Desktop Component

**文件位置：** `components/desktop/Desktop.tsx`

```typescript
interface DesktopProps {
  children?: React.ReactNode; // WindowLayer 将作为 children
}
```

**布局：**
- 图标网格布局（CSS Grid）
- 响应式间距
- 图标可配置位置（MVP 使用固定布局）

### 4. 图标配置

```typescript
// lib/desktop-icons.ts
export const desktopIcons: DesktopIconConfig[] = [
  { type: "about", label: "About", icon: "👤" },
  { type: "projects", label: "Projects", icon: "📁" },
  { type: "photos", label: "Photos", icon: "🖼️" },
  { type: "slideshow", label: "Slideshow", icon: "▶️" },
  { type: "settings", label: "Settings", icon: "⚙️" },
  { type: "shop", label: "Shop", icon: "🛒", href: "https://shop.example.com" },
  { type: "mail", label: "Mail", icon: "✉️", href: "mailto:hello@example.com" },
];
```

## Data Models

### WindowType (预定义)

```typescript
type WindowType = "about" | "projects" | "project" | "photos" | "slideshow" | "settings";
```

### DesktopIconConfig

```typescript
interface DesktopIconConfig {
  type: WindowType | "shop" | "mail";
  label: string;
  icon: string | React.ReactNode;
  href?: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system.*

### Property 1: 图标点击触发正确窗口类型

*For any* 内部应用图标点击，windowStore.open() 应被调用且参数为对应的 WindowType。

**Validates: Requirements 2.3, 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 2: 外链图标行为一致性

*For any* 外链图标（shop, mail），点击应在新标签页打开对应 href，不触发 windowStore.open()。

**Validates: Requirements 2.4**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| windowStore 未初始化 | 图标点击无响应，控制台警告 |
| 外链 href 无效 | 浏览器默认处理 |

## Testing Strategy

### Unit Tests
- Topbar 渲染测试
- DesktopIcon 点击事件测试
- 外链图标 href 验证

### Integration Tests
- 图标点击 → windowStore.open() 调用验证
- Desktop 布局响应式测试

### Property-Based Tests
- Property 1: 使用 fast-check 生成所有 WindowType，验证点击触发正确类型
