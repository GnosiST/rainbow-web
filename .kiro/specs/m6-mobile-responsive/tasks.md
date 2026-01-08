# Implementation Plan: M6 Mobile Responsive

## Overview

实现移动端响应式适配，支持 iOS 和 Android 两种系统风格。移动端采用全屏页面切换模式，通过设备检测自动切换布局。

## Tasks

- [x] 1. 实现设备检测系统
  - [x] 1.1 创建 device-store.ts
    - 定义 DeviceState 接口
    - 实现 isMobile、screenWidth、screenHeight、orientation
    - 监听 window resize 事件
    - _Requirements: 1.1, 1.4, 1.5_
  - [x] 1.2 创建 DeviceProvider 组件
    - 初始化设备检测
    - 提供 Context 给子组件
    - _Requirements: 1.2, 1.3_
  - [x] 1.3 创建 useDevice hook
    - 封装设备状态访问
    - _Requirements: 1.5_

- [ ]* 2. 设备检测属性测试
  - [ ]* 2.1 测试断点检测
    - **Property 1: 设备检测一致性**
    - **Validates: Requirements 1.2, 1.3**

- [x] 3. 实现移动端主题系统
  - [x] 3.1 创建 mobile-theme-store.ts
    - 定义 MobileTheme 类型（ios/android/illustration）
    - 实现 setTheme action
    - 使用 persist 中间件
    - _Requirements: 2.1, 2.4_
  - [x] 3.2 创建 mobile-theme-config.ts
    - 定义 MobileThemeConfig 接口
    - 配置 iOS 主题
    - 配置 Android 主题
    - 预留 illustration 主题
    - _Requirements: 2.1, 2.2_

- [x] 4. 实现页面导航系统
  - [x] 4.1 创建 page-store.ts
    - 定义 PageType 和 PageState
    - 实现 push/pop/popToRoot/replace actions
    - _Requirements: 5.3, 5.4, 5.5_
  - [x] 4.2 实现页面堆栈管理
    - 维护页面历史
    - 支持返回操作
    - _Requirements: 5.3_

- [ ]* 5. 页面堆栈属性测试
  - [ ]* 5.1 测试堆栈操作
    - **Property 2: 页面堆栈完整性**
    - **Validates: Requirements 5.4, 5.5**

- [x] 6. 实现 MobileShell 组件
  - [x] 6.1 创建基础结构
    - StatusBar 区域
    - 内容区域
    - 导航栏区域
    - _Requirements: 3.1, 4.1_
  - [x] 6.2 实现主题切换
    - 根据 mobileTheme 应用样式
    - _Requirements: 2.3_

- [x] 7. 实现 iOS 风格组件
  - [x] 7.1 创建 iOS StatusBar
    - 时间、信号、电池图标
    - iOS 风格样式
    - _Requirements: 3.1_
  - [x] 7.2 创建 iOS TabBar
    - 底部标签栏
    - SF Symbols 风格图标
    - 活动状态指示
    - _Requirements: 3.2, 3.3_
  - [x] 7.3 创建 iOS PageHeader
    - 大标题风格
    - 返回按钮
    - _Requirements: 3.4_
  - [x] 7.4 实现 iOS 过渡动画
    - 滑入/滑出效果
    - _Requirements: 3.6_

- [x] 8. 实现 Android 风格组件
  - [x] 8.1 创建 Android StatusBar
    - Android 风格状态栏
    - _Requirements: 4.1_
  - [x] 8.2 创建 Android BottomNavigation
    - Material Design 底部导航
    - Material Icons
    - _Requirements: 4.2, 4.3_
  - [x] 8.3 创建 Android AppBar
    - Material Design 应用栏
    - 返回按钮
    - _Requirements: 4.4_
  - [x] 8.4 实现 Android 过渡动画
    - 淡入/淡出效果
    - _Requirements: 4.5_

- [x] 9. 实现移动端页面视图
  - [x] 9.1 创建 PageView 容器
    - 全屏页面渲染
    - 动画过渡
    - _Requirements: 5.2_
  - [x] 9.2 创建 MobileAboutPage
    - 移动端 About 页面布局
    - _Requirements: 6.1_
  - [x] 9.3 创建 MobileProjectsPage
    - 单列项目列表
    - 点击打开详情
    - _Requirements: 6.1, 5.4_
  - [x] 9.4 创建 MobileProjectPage
    - 全屏画廊
    - 滑动切换图片
    - _Requirements: 6.2, 6.3_
  - [x] 9.5 创建 MobilePhotosPage
    - 照片网格
    - _Requirements: 6.1_
  - [x] 9.6 创建 MobileSettingsPage
    - 原生风格设置列表
    - 主题切换
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 10. 实现手势支持
  - [x] 10.1 实现左滑返回（iOS）
    - 边缘滑动检测
    - 返回动画
    - _Requirements: 3.5_
  - [x] 10.2 实现画廊滑动
    - 左右滑动切换图片
    - _Requirements: 6.3_

- [x] 11. 集成到主应用
  - [x] 11.1 更新 App 根组件
    - 添加 DeviceProvider
    - 条件渲染 MobileShell 或 DesktopShell
    - _Requirements: 8.1, 8.2_
  - [x] 11.2 实现布局切换过渡
    - 平滑过渡动画
    - _Requirements: 8.4_

- [x] 12. Checkpoint - 移动端适配验收
  - [x] 移动端自动检测正确（使用 isHydrated 解决 hydration 问题）
  - [x] iOS 风格组件正常显示
  - [x] Android 风格组件正常显示
  - [x] 页面导航正常工作（修复了根页面返回按钮问题）
  - [x] 手势操作正常（iOS 左滑返回、画廊滑动）
  - [x] 主题切换正常
  - [x] 桌面端/移动端切换平滑

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 移动端断点设为 768px
- iOS 风格参考 iOS 17 设计规范
- Android 风格参考 Material Design 3
- 插画风格后期实现
- 手势库可使用 @use-gesture/react

## 文件结构

```
components/
├── mobile/
│   ├── MobileShell.tsx
│   ├── PageView.tsx
│   ├── ios/
│   │   ├── StatusBar.tsx
│   │   ├── TabBar.tsx
│   │   ├── PageHeader.tsx
│   │   └── icons/
│   ├── android/
│   │   ├── StatusBar.tsx
│   │   ├── BottomNavigation.tsx
│   │   ├── AppBar.tsx
│   │   └── icons/
│   └── pages/
│       ├── MobileAboutPage.tsx
│       ├── MobileProjectsPage.tsx
│       ├── MobileProjectPage.tsx
│       ├── MobilePhotosPage.tsx
│       └── MobileSettingsPage.tsx
lib/
├── stores/
│   ├── device-store.ts
│   ├── mobile-theme-store.ts
│   └── page-store.ts
└── mobile-theme-config.ts
```

