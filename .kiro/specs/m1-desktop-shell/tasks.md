# Implementation Plan: M1 Desktop Shell

## Overview

实现桌面 OS 风格的 Desktop Shell，包括顶部菜单栏、桌面图标启动器、底部 Dock 栏，支持 macOS 和 Windows 两种风格切换。

## Tasks

- [x] 1. 创建 Topbar 组件
  - [x] 1.1 实现 Topbar 基础结构
    - 固定顶部布局
    - 菜单项渲染（File / Contact / Settings）
    - 半透明背景 + 模糊效果
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 1.2 添加菜单项交互
    - 悬停效果
    - 点击视觉反馈（MVP 占位）
    - _Requirements: 1.3_
  - [x] 1.3 macOS 风格优化
    - Apple logo + Finder 菜单
    - 系统图标（电池、WiFi、搜索）
    - 日期时间显示
    - 主题切换按钮

- [x] 2. 创建 DesktopIcon 组件
  - [x] 2.1 实现图标基础结构
    - 图标图形 + 标签文字
    - 网格布局
    - _Requirements: 2.5_
  - [x] 2.2 添加交互效果
    - 悬停高亮
    - 点击反馈
    - _Requirements: 2.6_
  - [x] 2.3 实现点击逻辑
    - 内部应用：调用 windowStore.open(type)
    - 外链：window.open(href, '_blank')
    - _Requirements: 2.3, 2.4_
  - [x] 2.4 支持多主题样式
    - macOS 风格：圆角、阴影、毛玻璃
    - Windows 风格：简洁、透明悬停

- [x] 3. 创建 Desktop 组件
  - [x] 3.1 实现桌面布局
    - 全屏容器（减去 Topbar 高度）
    - 图标网格区域
    - _Requirements: 2.1, 2.2_
  - [x] 3.2 配置图标数据
    - 创建 lib/desktop-icons.ts
    - 定义所有图标配置
    - _Requirements: 2.1, 2.2_
  - [x] 3.3 支持主题切换
    - 根据主题显示 Dock 或 Taskbar
    - 调整图标位置（右侧/左侧）
    - macOS Sonoma 风格渐变壁纸

- [x] 4. 创建 Dock 组件（macOS 风格）
  - [x] 4.1 实现 Dock 基础结构
    - 底部居中固定
    - 毛玻璃背景
    - 应用图标 + 分隔线 + 系统图标
  - [x] 4.2 添加交互效果
    - 悬停放大动画
    - 悬停上移
    - Tooltip 显示应用名称

- [x] 5. 创建 Taskbar 组件（Windows 风格）
  - [x] 5.1 实现 Taskbar 基础结构
    - 底部全宽固定
    - 深色半透明背景
    - 开始按钮 + 搜索 + 应用图标 + 系统托盘
  - [x] 5.2 添加系统托盘
    - 网络、音量图标
    - 时间日期显示
    - 主题切换按钮

- [x] 6. 创建 MacIcons 图标库
  - [x] 6.1 实现 SVG 图标组件
    - Finder、Folder、Photos、Settings
    - Slideshow、Shop、Mail、About
    - Safari、Launchpad、Trash

- [x] 7. 集成到首页
  - [x] 7.1 更新 app/page.tsx
    - 引入 Topbar 和 Desktop
    - 预留 WindowLayer 位置
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 8. Checkpoint - Desktop Shell 验收
  - 确保 Topbar 正确显示（macOS 风格）
  - 确保 Dock 正确显示（macOS 风格）
  - 确保 Taskbar 正确显示（Windows 风格）
  - 确保主题切换功能正常
  - 确保所有图标可见
  - 确保点击图标触发 windowStore.open()（控制台可见调用）
  - 确保外链图标在新标签页打开
  - 如有问题请提出

- [ ]* 9. 编写单元测试
  - [ ]* 9.1 Topbar 组件测试
    - 渲染验证
    - 菜单项显示
  - [ ]* 9.2 DesktopIcon 组件测试
    - **Property 1: 图标点击触发正确窗口类型**
    - **Validates: Requirements 2.3, 3.1-3.5**

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 本里程碑依赖 M2 的 windowStore，但可先用 mock 或 console.log 占位
- 已使用 SVG 图标替代 emoji

## 已创建文件

- `lib/stores/theme-store.ts` - 桌面风格状态管理
- `lib/theme-config.ts` - 主题配置定义
- `components/desktop/Dock.tsx` - macOS 风格 Dock
- `components/desktop/Taskbar.tsx` - Windows 风格任务栏
- `components/icons/MacIcons.tsx` - macOS 风格 SVG 图标
