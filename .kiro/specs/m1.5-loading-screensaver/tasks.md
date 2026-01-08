# Implementation Plan: M1.5 Loading & Screensaver

## Overview

实现页面加载动画和屏保效果，参考 marianopascual.me 的设计风格。为后续插画主题扩展预留接口。

## 已完成任务

- [x] 1. 实现加载屏幕
  - [x] 1.1 创建 loading-store.ts
    - 定义 LoadingState 接口
    - 实现 setLoading/setProgress
    - 配置 minDuration 和 showOnRefresh
    - _Requirements: 1.1, 1.5, 1.6_
  - [x] 1.2 创建 LoadingScreen 组件
    - 全屏遮罩布局
    - Logo 动画（缩放 + 淡入）
    - 可选进度条
    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 1.3 实现退出动画
    - 遮罩滑出效果
    - Logo 淡出
    - 使用 Framer Motion AnimatePresence
    - _Requirements: 1.4_
  - [x] 1.4 集成到 app/page.tsx
    - 包裹整个应用
    - 监听页面加载状态
    - _Requirements: 1.1, 1.4_

- [x] 2. 实现屏保功能
  - [x] 2.1 创建 screensaver-store.ts
    - 定义 ScreensaverState 接口
    - 实现 setEnabled/setActive/setIdleTimeout
    - 使用 persist 中间件
    - _Requirements: 2.1, 2.5_
  - [x] 2.2 创建 useIdleDetection（内置于 Screensaver 组件）
    - 监听用户交互事件
    - 计时器管理
    - 激活/退出屏保
    - _Requirements: 2.1, 2.3_
  - [x] 2.3 创建 Screensaver 组件
    - 全屏遮罩
    - 动画容器
    - _Requirements: 2.2_
  - [x] 2.4 实现 FloatingIcons 屏保
    - 桌面图标漂浮动画
    - 随机位置和速度
    - _Requirements: 2.4_
  - [x] 2.5 实现 ClockScreensaver 屏保
    - 数字时钟显示
    - 缓慢移动避免烧屏
    - _Requirements: 2.4_
  - [x] 2.6 实现 MatrixRain 屏保
    - 矩阵雨效果
    - _Requirements: 2.4_
  - [x] 2.7 集成到 app/page.tsx
    - 条件渲染屏保
    - _Requirements: 2.2_

- [x] 3. 预留插画主题接口
  - [x] 3.1 定义 IllustrationTheme 接口
    - 图标组件接口
    - 背景元素接口
    - 配色方案接口
    - _Requirements: 3.2, 3.3, 3.4_

## 待完成任务（插画主题相关 - 可延后）

- [x] 3.2 更新 theme-store.ts
  - 添加 illustrationTheme 字段
  - 支持 "illustration" 类型
  - _Requirements: 3.1_

- [x] 3.3 创建示例插画主题
  - 简单的手绘风格图标
  - 柔和配色方案
  - _Requirements: 3.5_

- [x] 3.4 更新 Desktop 组件
  - 根据主题类型选择图标组件
  - _Requirements: 3.5_

- [x] 3.5 创建插画主题配置存储
  - 创建 illustration-theme-store.ts
  - 定义 IllustrationThemeConfig 接口
  - 实现背景颜色预设
  - 实现强调色预设
  - 持久化配置
  - _Requirements: 3.5.1, 3.5.2, 3.5.4_

- [x] 3.6 更新设置窗口支持插画主题配置
  - 插画主题下显示背景颜色选择
  - 插画主题下显示强调色选择
  - _Requirements: 3.5.3_

- [x] 3.7 实现插画桌面布局（参考 marianopascual.me）
  - 左侧固定导航栏
  - 可折叠项目卡片
  - 不使用窗口系统
  - _Requirements: 3.5.5_

## 已完成任务

- [x] 4. 动画性能优化
  - [x] 4.1 添加 prefers-reduced-motion 支持
    - 检测用户偏好
    - 条件禁用动画
    - _Requirements: 4.4_

- [ ] 4.2 实现动画降级（可选）
  - 低端设备检测
  - 简化动画效果
  - _Requirements: 4.3_

- [x] 5. 更新设置窗口
  - [x] 5.1 添加屏保设置
    - 开关控制
    - 空闲时间滑块
    - 屏保类型选择
    - _Requirements: 2.5_
  - [x] 5.2 添加加载屏幕设置
    - 刷新时是否显示
    - _Requirements: 1.6_

- [x] 6. Checkpoint - 加载与屏保验收
  - [x] 加载屏幕正确显示
  - [x] 加载动画流畅
  - [x] 屏保在空闲后激活
  - [x] 用户交互退出屏保
  - [x] 设置正确保存（ui-store 持久化）

- [ ]* 7. 编写测试
  - [ ]* 7.1 LoadingScreen 组件测试
    - **Property 1: 最小显示时间**
    - **Validates: Requirements 1.5**
  - [ ]* 7.2 Screensaver 激活测试
    - **Property 2: 空闲激活条件**
    - **Validates: Requirements 2.1**
  - [ ]* 7.3 Screensaver 退出测试
    - **Property 3: 交互退出响应**
    - **Validates: Requirements 2.3**

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 加载屏幕使用 Framer Motion 实现动画
- 屏保使用 CSS 动画或 requestAnimationFrame
- 插画主题接口设计为可扩展，方便后续添加更多风格

## 添加新插画主题的步骤

1. 在 `components/icons/` 创建新的图标组件文件
2. 在 `lib/themes/` 创建主题配置文件
3. 在 `lib/theme-config.ts` 注册新主题
4. 在设置窗口中即可选择新主题

## 依赖

- framer-motion（已安装）
- zustand（已安装）
