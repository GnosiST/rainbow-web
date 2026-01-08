# Design Document

## Overview

Settings 功能提供全局外观定制能力，包括桌面风格切换（macOS/Windows）、背景主题、亮度、滤镜的即时切换。使用 Zustand persist 中间件实现状态持久化。

## 已实现功能

### 桌面风格切换（M1 扩展）

已实现 macOS 和 Windows 两种桌面风格的切换：

**文件结构：**
- `lib/stores/theme-store.ts` - 桌面风格状态管理
- `lib/theme-config.ts` - 主题配置定义
- `components/desktop/Taskbar.tsx` - Windows 风格任务栏
- `components/desktop/Dock.tsx` - macOS 风格 Dock
- `components/desktop/Topbar.tsx` - macOS 风格顶栏

**切换方式：**
- macOS 风格：点击顶栏右侧的 🍎 图标
- Windows 风格：点击任务栏右侧的 🍎 图标

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Settings Window                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │Theme Picker │ │Brightness   │ │Filter       │       │
│  │             │ │Slider       │ │Dropdown     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│  ┌─────────────┐ ┌─────────────────────────────┐       │
│  │Screen Area  │ │    Reset Everything         │       │
│  └─────────────┘ └─────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      uiStore                             │
│  theme | brightness | filter | screenArea               │
│  ─────────────────────────────────────────────────────  │
│  persist middleware → localStorage                       │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Root Container                         │
│  data-theme="pink"                                       │
│  style="--brightness: 1.0; --filter: none"              │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 0. Theme Store（已实现）

```typescript
// lib/stores/theme-store.ts
type DesktopTheme = "macos" | "windows";

interface ThemeState {
  theme: DesktopTheme;
  setTheme: (theme: DesktopTheme) => void;
  toggleTheme: () => void;
}
```

### 0.1 Theme Config（已实现）

```typescript
// lib/theme-config.ts
interface ThemeConfig {
  name: string;
  background: string;
  topbar: { height, bg, textColor, position };
  dock: { show, position, bg, iconSize, borderRadius };
  taskbar: { show, height, bg };
  desktopIcons: { position, iconBg, labelBg };
  window: { titleBarPosition, borderRadius };
}
```

### 1. UI Store

```typescript
// stores/uiStore.ts
type Theme = "pink" | "green" | "blue" | "grid" | "space" | "minimal";
type Filter = "normal" | "bw" | "invertHue" | "negative";
type ScreenArea = "safe" | "full";

interface UIState {
  theme: Theme;
  brightness: number;
  filter: Filter;
  screenArea: ScreenArea;
}

interface UIStore extends UIState {
  setTheme: (theme: Theme) => void;
  setBrightness: (brightness: number) => void;
  setFilter: (filter: Filter) => void;
  setScreenArea: (screenArea: ScreenArea) => void;
  reset: () => void;
}

const defaultState: UIState = {
  theme: "pink",
  brightness: 1.0,
  filter: "normal",
  screenArea: "safe",
};
```

### 2. Settings Window

**文件位置：** `components/windows/apps/SettingsWindow.tsx`

```typescript
// 主题选择器：6 个色块/预览
// 亮度滑块：range input
// 滤镜下拉：select
// 屏幕区域：radio/toggle
// 重置按钮
```

### 3. CSS 实现

```css
/* globals.css */
:root {
  --brightness: 1;
  --filter: none;
  --safe-padding: 20px;
}

[data-theme="pink"] {
  --bg-primary: linear-gradient(135deg, #ffeef8, #fff5f5);
}

[data-theme="green"] {
  --bg-primary: linear-gradient(135deg, #e8f5e9, #f1f8e9);
}

/* ... 其他主题 */

.app-container {
  filter: brightness(var(--brightness)) var(--filter);
}
```

### 4. 滤镜映射

```typescript
const filterMap: Record<Filter, string> = {
  normal: "none",
  bw: "grayscale(100%)",
  invertHue: "hue-rotate(180deg)",
  negative: "invert(100%)",
};
```

## Data Models

### 主题配置

```typescript
interface ThemeConfig {
  id: Theme;
  name: string;
  preview: string; // 预览色或图片
  background: string; // CSS 背景值
}

const themes: ThemeConfig[] = [
  { id: "pink", name: "Pink", preview: "#ffeef8", background: "..." },
  { id: "green", name: "Green", preview: "#e8f5e9", background: "..." },
  // ...
];
```

## Correctness Properties

### Property 1: 持久化往返一致性

*For any* UI 状态，保存到 localStorage 后重新加载，状态应与保存前相等。

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 2: 重置恢复默认值

*For any* 修改后的 UI 状态，调用 reset() 后所有字段应等于默认值。

**Validates: Requirements 3.1, 3.2**

### Property 3: 亮度范围约束

*For any* setBrightness 调用，结果值应在 [0.7, 1.3] 范围内。

**Validates: Requirements 5.1**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| localStorage 不可用 | 降级为内存存储 |
| 存储数据损坏 | 使用默认值 |
| 亮度值超出范围 | clamp 到有效范围 |

## Testing Strategy

### Unit Tests
- uiStore actions 测试
- 持久化/恢复测试
- reset 功能测试

### Property-Based Tests
- Property 1: 生成随机状态，验证往返一致性
- Property 2: 生成随机修改序列，验证 reset 恢复默认
- Property 3: 生成随机亮度值，验证范围约束
