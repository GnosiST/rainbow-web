# Design Document

## Overview

Window Manager 是桌面 OS 体验的核心，负责管理所有窗口的生命周期、位置、层级和交互。采用 Zustand 进行状态管理，Framer Motion 实现动画效果。

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     WindowLayer                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │ windows.map(w => <WindowFrame key={w.id} {...w} />) ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    windowStore                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   windows    │  │   activeId   │  │   zCounter   │  │
│  │ WindowState[]│  │ string|null  │  │    number    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Actions: open, close, focus, toggleMax, updateRect│  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. WindowState Interface

```typescript
// stores/windowStore.ts
interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  rect: Rect;
  z: number;
  isMax: boolean;
  payload?: Record<string, unknown>;
  savedRect?: Rect; // 最大化前保存的位置
  createdAt: number;
}

type WindowType = "about" | "projects" | "project" | "photos" | "slideshow" | "settings";
```

### 2. WindowStore

```typescript
interface WindowStore {
  // State
  windows: WindowState[];
  activeId: string | null;
  zCounter: number;

  // Actions
  open: (type: WindowType, payload?: Record<string, unknown>) => string;
  close: (id: string) => void;
  focus: (id: string) => void;
  toggleMax: (id: string) => void;
  updateRect: (id: string, rect: Partial<Rect>) => void;
}
```

### 3. WindowLayer Component

**文件位置：** `components/windows/WindowLayer.tsx`

```typescript
export function WindowLayer() {
  const windows = useWindowStore((s) => s.windows);
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {windows.map((w) => (
          <WindowFrame key={w.id} window={w} />
        ))}
      </AnimatePresence>
    </div>
  );
}
```

### 4. WindowFrame Component

**文件位置：** `components/windows/WindowFrame.tsx`

```typescript
interface WindowFrameProps {
  window: WindowState;
}

export function WindowFrame({ window }: WindowFrameProps) {
  const { close, focus, toggleMax, updateRect } = useWindowStore();
  const isActive = useWindowStore((s) => s.activeId === window.id);
  
  // 拖拽逻辑
  const handleDragStart = (e: PointerEvent) => { ... };
  const handleDrag = (e: PointerEvent) => { ... };
  const handleDragEnd = () => { ... };
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{
        position: "absolute",
        left: window.rect.x,
        top: window.rect.y,
        width: window.rect.w,
        height: window.rect.h,
        zIndex: window.z,
      }}
      className={cn("window-frame", isActive && "window-active")}
      onPointerDown={() => focus(window.id)}
    >
      <Titlebar
        title={window.title}
        isMax={window.isMax}
        onClose={() => close(window.id)}
        onToggleMax={() => toggleMax(window.id)}
        onDragStart={handleDragStart}
      />
      <WindowContent type={window.type} payload={window.payload} />
    </motion.div>
  );
}
```

### 5. 窗口默认配置

```typescript
// lib/window-defaults.ts
export const windowDefaults: Record<WindowType, { title: string; rect: Rect }> = {
  about: { title: "About", rect: { x: 100, y: 100, w: 400, h: 300 } },
  projects: { title: "Projects", rect: { x: 150, y: 80, w: 600, h: 450 } },
  project: { title: "Project", rect: { x: 120, y: 60, w: 800, h: 600 } },
  photos: { title: "Photos", rect: { x: 200, y: 100, w: 500, h: 400 } },
  slideshow: { title: "Slideshow", rect: { x: 100, y: 50, w: 700, h: 500 } },
  settings: { title: "Settings", rect: { x: 250, y: 150, w: 350, h: 400 } },
};
```

## Data Models

### WindowState 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识，使用 nanoid 生成 |
| type | WindowType | 窗口类型，决定渲染内容 |
| title | string | 标题栏显示文字 |
| rect | Rect | 位置和尺寸 {x, y, w, h} |
| z | number | 层级，越大越靠前 |
| isMax | boolean | 是否最大化 |
| payload | object | 额外数据，如 { slug } |
| savedRect | Rect | 最大化前的位置，用于还原 |
| createdAt | number | 创建时间戳 |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system.*

### Property 1: 窗口 ID 唯一性

*For any* 两个窗口 w1 和 w2，如果 w1 !== w2，则 w1.id !== w2.id。

**Validates: Requirements 2.2**

### Property 2: Z-Index 单调递增

*For any* 新打开或聚焦的窗口，其 z 值应大于所有现有窗口的 z 值。

**Validates: Requirements 2.3, 4.1**

### Property 3: 聚焦窗口一致性

*For any* 时刻，activeId 要么为 null（无窗口），要么指向 windows 数组中存在的窗口。

**Validates: Requirements 2.4, 3.2, 4.2**

### Property 4: 最大化还原幂等性

*For any* 窗口，执行 toggleMax 两次后，rect 应与初始 rect 相等。

**Validates: Requirements 6.1, 6.3**

### Property 5: 拖拽边界约束

*For any* 拖拽操作后的窗口位置，窗口的可见区域应至少有 50px 在可视范围内。

**Validates: Requirements 5.4**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| close 不存在的 id | 静默忽略 |
| focus 不存在的 id | 静默忽略 |
| toggleMax 不存在的 id | 静默忽略 |
| 拖拽超出边界 | clamp 到有效范围 |

## Testing Strategy

### Unit Tests
- windowStore actions 测试
  - open 创建窗口
  - close 移除窗口
  - focus 更新 z 和 activeId
  - toggleMax 切换状态

### Integration Tests
- WindowFrame 渲染测试
- 拖拽交互测试
- 动画效果测试

### Property-Based Tests
- Property 1: 生成多个 open 操作，验证 ID 唯一
- Property 2: 生成 open/focus 序列，验证 z 单调递增
- Property 3: 生成 open/close/focus 序列，验证 activeId 一致性
- Property 4: 生成 toggleMax 序列，验证幂等性
- Property 5: 生成随机拖拽位置，验证边界约束
