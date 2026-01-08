# Design Document

## Overview

实现页面加载动画和屏保效果，参考 marianopascual.me 的设计风格。使用 Framer Motion 实现流畅的动画效果，通过 Zustand 管理状态。

## 参考分析

### marianopascual.me 加载页面特点

1. **全屏遮罩**：纯色或渐变背景覆盖整个视口
2. **Logo 动画**：品牌 Logo 或名称的入场动画（缩放、淡入、描边等）
3. **进度指示**：可选的加载进度条或百分比
4. **退出动画**：遮罩向上/向下滑出或淡出
5. **时间控制**：最小显示时间确保动画完整

### 插画风格特点

1. **手绘线条**：不规则的线条和形状
2. **柔和配色**：低饱和度的色彩搭配
3. **有机形状**：圆润、不对称的图形
4. **纹理质感**：纸张、画布等纹理叠加

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    App Container                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Loading Screen (z-100)                 ││
│  │  ┌─────────────────────────────────────────────┐   ││
│  │  │  Logo Animation + Progress + Exit Animation │   ││
│  │  └─────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │              Screensaver (z-90)                     ││
│  │  ┌─────────────────────────────────────────────┐   ││
│  │  │  Floating Icons / Particles / Clock         │   ││
│  │  └─────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │              Desktop (z-0)                          ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Loading Screen Store

```typescript
// lib/stores/loading-store.ts
interface LoadingState {
  isLoading: boolean;
  progress: number;
  showOnRefresh: boolean;
  minDuration: number; // 最小显示时间（毫秒）
}

interface LoadingStore extends LoadingState {
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setShowOnRefresh: (show: boolean) => void;
}
```

### 2. Screensaver Store

```typescript
// lib/stores/screensaver-store.ts
type ScreensaverType = "floating" | "particles" | "clock" | "matrix";

interface ScreensaverState {
  enabled: boolean;
  active: boolean;
  idleTimeout: number; // 空闲时间（秒）
  type: ScreensaverType;
}

interface ScreensaverStore extends ScreensaverState {
  setEnabled: (enabled: boolean) => void;
  setActive: (active: boolean) => void;
  setIdleTimeout: (timeout: number) => void;
  setType: (type: ScreensaverType) => void;
}
```

### 3. Loading Screen Component

```typescript
// components/loading/LoadingScreen.tsx
interface LoadingScreenProps {
  logo?: React.ReactNode;
  showProgress?: boolean;
  backgroundColor?: string;
  onComplete?: () => void;
}

// 动画阶段
// 1. 入场：Logo 淡入 + 缩放
// 2. 等待：显示进度（可选）
// 3. 退出：遮罩滑出 + Logo 淡出
```

### 4. Screensaver Component

```typescript
// components/screensaver/Screensaver.tsx
interface ScreensaverProps {
  type: ScreensaverType;
}

// 子组件
// - FloatingIcons: 漂浮的桌面图标
// - ParticleEffect: 粒子效果
// - ClockScreensaver: 数字时钟
// - MatrixRain: 矩阵雨效果
```

### 5. 插画主题接口

```typescript
// lib/themes/illustration-theme.ts
interface IllustrationTheme {
  id: string;
  name: string;
  // 图标定义
  icons: {
    finder: React.ComponentType;
    folder: React.ComponentType;
    photos: React.ComponentType;
    settings: React.ComponentType;
    // ... 其他图标
  };
  // 背景元素
  backgroundElements?: React.ComponentType[];
  // 配色方案
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  // 纹理叠加（可选）
  texture?: string; // CSS background-image
}
```

### 6. 插画主题配置存储

```typescript
// lib/stores/illustration-theme-store.ts
interface IllustrationThemeConfig {
  // 基础配置
  siteName: string;
  aboutText: string;
  aboutSubtext: string;
  
  // 颜色配置
  background: string;
  textColor: string;
  secondaryTextColor: string;
  accentColor: string;
  borderColor: string;
  
  // 字体配置
  fontFamily: string;
  
  // 可扩展的自定义配置
  custom?: Record<string, unknown>;
}

// 预设背景选项
const illustrationBackgrounds = {
  white: { name: "纯白", value: "#FFFFFF" },
  cream: { name: "奶油", value: "#FFF9F0" },
  lightGray: { name: "浅灰", value: "#F5F5F5" },
  // ...
};

// 预设强调色
const illustrationAccentColors = {
  coral: { name: "珊瑚", value: "#E17055" },
  blue: { name: "蓝色", value: "#0984E3" },
  // ...
};
```

### 7. 插画桌面布局（参考 marianopascual.me）

```
┌─────────────────────────────────────────────────────────┐
│                  Illustration Desktop                    │
│  ┌──────────┬──────────────────────────────────────────┐│
│  │   Nav    │              Content Area                ││
│  │  (固定)   │                                          ││
│  │          │  ┌────────────────────────────────────┐  ││
│  │  About   │  │  Project Title (可点击展开)         │  ││
│  │  ▶       │  ├────────────────────────────────────┤  ││
│  │          │  │  Description                       │  ││
│  │  Projects│  │  ┌─────┐ ┌─────┐ ┌─────┐          │  ││
│  │  ▼       │  │  │ Img │ │ Img │ │ Img │          │  ││
│  │          │  │  └─────┘ └─────┘ └─────┘          │  ││
│  │          │  └────────────────────────────────────┘  ││
│  │          │  ┌────────────────────────────────────┐  ││
│  │  ────    │  │  Another Project (折叠状态)        │  ││
│  │  Email   │  └────────────────────────────────────┘  ││
│  │  Insta   │                                          ││
│  └──────────┴──────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

特点：
- 左侧固定导航栏（About/Projects 可展开）
- 右侧内容区可滚动
- 项目以折叠卡片形式展示，点击标题展开详情
- 展开后显示描述和图片网格
- 纯白/浅色背景，极简设计
- 不使用窗口系统

## 添加插画主题的步骤

### 步骤 1：创建图标组件

```typescript
// components/icons/IllustrationIcons.tsx
export const IllustrationIcons = {
  Finder: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* 手绘风格的 Finder 图标 */}
    </svg>
  ),
  // ... 其他图标
};
```

### 步骤 2：定义主题配置

```typescript
// lib/themes/my-illustration-theme.ts
import { IllustrationIcons } from "@/components/icons/IllustrationIcons";

export const myIllustrationTheme: IllustrationTheme = {
  id: "my-illustration",
  name: "My Illustration",
  icons: IllustrationIcons,
  colors: {
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    background: "#FFF5E6",
    accent: "#FFE66D",
  },
};
```

### 步骤 3：注册主题

```typescript
// lib/theme-config.ts
import { myIllustrationTheme } from "./themes/my-illustration-theme";

export const illustrationThemes: IllustrationTheme[] = [
  myIllustrationTheme,
  // ... 其他插画主题
];
```

### 步骤 4：在设置中选择

Settings Window 中添加插画主题选择器，切换后更新 Theme Store。

## Data Models

### 加载状态

```typescript
interface LoadingProgress {
  loaded: number;
  total: number;
  percentage: number;
}
```

### 空闲检测

```typescript
// 监听的事件
const IDLE_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
];
```

## Correctness Properties

### Property 1: 加载屏幕最小显示时间

*For any* 加载过程，即使资源加载很快，加载屏幕也应至少显示 minDuration 时间。

**Validates: Requirements 1.5**

### Property 2: 屏保激活条件

*For any* 空闲时间超过 idleTimeout 的情况，屏保应被激活。

**Validates: Requirements 2.1**

### Property 3: 屏保退出响应

*For any* 用户交互事件，活跃的屏保应立即退出。

**Validates: Requirements 2.3**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| 资源加载失败 | 显示错误提示，允许重试 |
| 动画性能问题 | 降级为简单淡入淡出 |
| prefers-reduced-motion | 跳过动画，直接显示内容 |

## Testing Strategy

### Unit Tests
- LoadingScreen 组件渲染测试
- Screensaver 激活/退出逻辑测试
- 空闲检测 hook 测试

### Property-Based Tests
- Property 1: 生成随机加载时间，验证最小显示时间
- Property 2: 生成随机空闲时间，验证激活条件
- Property 3: 生成随机交互事件，验证退出响应
