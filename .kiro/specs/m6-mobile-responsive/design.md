# Design Document

## Overview

移动端响应式适配采用完全不同于桌面端的交互模式。桌面端使用窗口管理器，移动端使用全屏页面切换。通过设备检测器自动切换布局，并支持 iOS 和 Android 两种系统风格。

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      App Root                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              DeviceProvider                              ││
│  │  ┌─────────────────┐  ┌─────────────────────────────┐  ││
│  │  │   isMobile?     │  │                             │  ││
│  │  │                 │  │                             │  ││
│  │  │  true ──────────┼──▶  MobileShell               │  ││
│  │  │                 │  │  ├── StatusBar             │  ││
│  │  │  false ─────────┼──▶  ├── PageView              │  ││
│  │  │                 │  │  └── TabBar/BottomNav      │  ││
│  │  │                 │  │                             │  ││
│  │  │                 │  │  DesktopShell              │  ││
│  │  │                 │  │  ├── Topbar                │  ││
│  │  │                 │  │  ├── Desktop               │  ││
│  │  │                 │  │  └── Dock/Taskbar          │  ││
│  │  └─────────────────┘  └─────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Device Store

```typescript
// lib/stores/device-store.ts
interface DeviceState {
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: "portrait" | "landscape";
}

interface DeviceStore extends DeviceState {
  updateDevice: () => void;
}
```

### 2. Mobile Theme Store

```typescript
// lib/stores/mobile-theme-store.ts
type MobileTheme = "ios" | "android" | "illustration";

interface MobileThemeState {
  theme: MobileTheme;
  setTheme: (theme: MobileTheme) => void;
}
```

### 3. Mobile Theme Config

```typescript
// lib/mobile-theme-config.ts
interface MobileThemeConfig {
  name: string;
  statusBar: {
    height: string;
    bg: string;
    textColor: string;
    showTime: boolean;
    showBattery: boolean;
    showSignal: boolean;
  };
  navigation: {
    type: "tabbar" | "bottom-nav";
    height: string;
    bg: string;
    activeColor: string;
    inactiveColor: string;
  };
  page: {
    bg: string;
    cardBg: string;
    cardRadius: string;
    headerHeight: string;
  };
  animation: {
    pageTransition: "slide" | "fade" | "none";
    duration: number;
  };
}

const mobileThemeConfigs: Record<MobileTheme, MobileThemeConfig> = {
  ios: {
    name: "iOS",
    statusBar: {
      height: "44px",
      bg: "rgba(255, 255, 255, 0.9)",
      textColor: "#000",
      showTime: true,
      showBattery: true,
      showSignal: true,
    },
    navigation: {
      type: "tabbar",
      height: "83px", // 包含 safe area
      bg: "rgba(255, 255, 255, 0.9)",
      activeColor: "#007AFF",
      inactiveColor: "#8E8E93",
    },
    page: {
      bg: "#F2F2F7",
      cardBg: "#FFFFFF",
      cardRadius: "12px",
      headerHeight: "44px",
    },
    animation: {
      pageTransition: "slide",
      duration: 300,
    },
  },
  android: {
    name: "Android",
    statusBar: {
      height: "24px",
      bg: "#1F1F1F",
      textColor: "#FFF",
      showTime: true,
      showBattery: true,
      showSignal: true,
    },
    navigation: {
      type: "bottom-nav",
      height: "56px",
      bg: "#1F1F1F",
      activeColor: "#BB86FC",
      inactiveColor: "#FFFFFF80",
    },
    page: {
      bg: "#121212",
      cardBg: "#1E1E1E",
      cardRadius: "8px",
      headerHeight: "56px",
    },
    animation: {
      pageTransition: "fade",
      duration: 200,
    },
  },
  illustration: {
    // 后期实现
    name: "Illustration",
    statusBar: { height: "0", bg: "transparent", textColor: "#000", showTime: false, showBattery: false, showSignal: false },
    navigation: { type: "tabbar", height: "60px", bg: "#FFF", activeColor: "#000", inactiveColor: "#999" },
    page: { bg: "#FFF", cardBg: "#FFF", cardRadius: "0", headerHeight: "60px" },
    animation: { pageTransition: "none", duration: 0 },
  },
};
```

### 4. Page Navigation Store

```typescript
// lib/stores/page-store.ts
type PageType = "home" | "about" | "projects" | "project" | "photos" | "settings";

interface PageState {
  id: string;
  type: PageType;
  title: string;
  data?: Record<string, unknown>;
}

interface PageStore {
  stack: PageState[];
  currentPage: PageState | null;
  
  push: (type: PageType, data?: Record<string, unknown>) => void;
  pop: () => void;
  popToRoot: () => void;
  replace: (type: PageType, data?: Record<string, unknown>) => void;
}
```

### 5. MobileShell Component

```typescript
// components/mobile/MobileShell.tsx
interface MobileShellProps {
  children?: React.ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  const { theme } = useMobileThemeStore();
  const config = mobileThemeConfigs[theme];
  
  return (
    <div className="mobile-shell">
      <StatusBar config={config.statusBar} />
      <main className="mobile-content">
        <PageView />
      </main>
      {config.navigation.type === "tabbar" ? (
        <TabBar config={config.navigation} />
      ) : (
        <BottomNavigation config={config.navigation} />
      )}
    </div>
  );
}
```

### 6. iOS TabBar Component

```typescript
// components/mobile/ios/TabBar.tsx
const tabs = [
  { id: "about", icon: "person.fill", label: "About" },
  { id: "projects", icon: "folder.fill", label: "Projects" },
  { id: "photos", icon: "photo.fill", label: "Photos" },
  { id: "settings", icon: "gear", label: "Settings" },
];

export function TabBar({ config }: TabBarProps) {
  const { push } = usePageStore();
  const currentPage = usePageStore((s) => s.currentPage);
  
  return (
    <nav className="ios-tabbar" style={{ height: config.height, background: config.bg }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => push(tab.id as PageType)}
          className={currentPage?.type === tab.id ? "active" : ""}
        >
          <SFSymbol name={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
```

### 7. Android BottomNavigation Component

```typescript
// components/mobile/android/BottomNavigation.tsx
const navItems = [
  { id: "about", icon: "person", label: "About" },
  { id: "projects", icon: "folder", label: "Projects" },
  { id: "photos", icon: "photo_library", label: "Photos" },
  { id: "settings", icon: "settings", label: "Settings" },
];

export function BottomNavigation({ config }: BottomNavProps) {
  const { push } = usePageStore();
  const currentPage = usePageStore((s) => s.currentPage);
  
  return (
    <nav className="android-bottom-nav" style={{ height: config.height, background: config.bg }}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => push(item.id as PageType)}
          className={currentPage?.type === item.id ? "active" : ""}
        >
          <MaterialIcon name={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
```

## Data Models

### Device State

| 字段 | 类型 | 说明 |
|------|------|------|
| isMobile | boolean | 是否为移动端 |
| screenWidth | number | 屏幕宽度 |
| screenHeight | number | 屏幕高度 |
| orientation | string | 屏幕方向 |

### Page State

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 页面唯一 ID |
| type | PageType | 页面类型 |
| title | string | 页面标题 |
| data | object | 额外数据 |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system.*

### Property 1: 设备检测一致性

*For any* 屏幕宽度 w，如果 w < 768 则 isMobile = true，否则 isMobile = false。

**Validates: Requirements 1.2, 1.3**

### Property 2: 页面堆栈完整性

*For any* 页面堆栈操作序列，pop 操作后堆栈长度应减 1（除非堆栈为空）。

**Validates: Requirements 5.4, 5.5**

### Property 3: 主题持久化往返

*For any* 移动端主题设置，刷新页面后应恢复相同的主题。

**Validates: Requirements 2.4**

## Error Handling

| 场景 | 处理方式 |
|------|----------|
| 堆栈为空时 pop | 静默忽略 |
| 无效的页面类型 | 显示 404 页面 |
| 主题加载失败 | 使用默认 iOS 主题 |

## Testing Strategy

### Unit Tests
- Device Store 断点检测测试
- Page Store 堆栈操作测试
- Mobile Theme Store 持久化测试

### Integration Tests
- 设备切换布局测试
- 页面导航流程测试
- 主题切换效果测试

### Property-Based Tests
- Property 1: 生成随机屏幕宽度，验证设备检测
- Property 2: 生成随机 push/pop 序列，验证堆栈完整性
- Property 3: 生成随机主题设置，验证持久化

