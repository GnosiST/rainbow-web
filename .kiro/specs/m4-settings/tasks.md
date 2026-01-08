# Implementation Plan: M4 Settings

## Overview

实现全局外观设置功能，包括桌面风格切换、状态管理、持久化、背景主题切换、亮度调节、滤镜效果和设置窗口。

## 已完成任务

- [x] 0. 桌面风格切换（macOS/Windows）
  - [x] 0.1 创建 theme-store.ts
    - 实现 DesktopTheme 类型
    - 实现 setTheme/toggleTheme
    - 使用 persist 中间件持久化
    - _Requirements: 1.5.1, 1.5.5_
  - [x] 0.2 创建 theme-config.ts
    - 定义 ThemeConfig 接口
    - 配置 macOS 和 Windows 主题
    - _Requirements: 1.5.1_
  - [x] 0.3 创建 Taskbar 组件
    - Windows 风格任务栏
    - 开始按钮、应用图标、系统托盘
    - _Requirements: 1.5.3_
  - [x] 0.4 更新 Desktop 组件
    - 根据主题显示 Dock 或 Taskbar
    - 调整图标位置
    - _Requirements: 1.5.2, 1.5.3, 1.5.4_
  - [x] 0.5 更新 Topbar 组件
    - 添加主题切换按钮
    - Windows 风格下隐藏
    - _Requirements: 1.5.2_
  - [x] 0.6 更新 DesktopIcon 组件
    - 支持 macOS 和 Windows 两种样式
    - _Requirements: 1.5.4_

## Tasks

- [x] 1. 实现 UI Store
  - [x] 1.1 创建基础 store
    - 定义 UIState 接口
    - 实现 setTheme/setBrightness/setFilter/setScreenArea
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [x] 1.2 添加持久化
    - 使用 zustand persist 中间件
    - 配置 localStorage 存储
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 1.3 实现 reset 功能
    - 清空 localStorage
    - 恢复默认值
    - _Requirements: 3.1, 3.2_

- [ ]* 2. UI Store 属性测试
  - [ ]* 2.1 测试持久化
    - **Property 1: 持久化往返一致性**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  - [ ]* 2.2 测试 reset
    - **Property 2: 重置恢复默认值**
    - **Validates: Requirements 3.1, 3.2**
  - [ ]* 2.3 测试亮度范围
    - **Property 3: 亮度范围约束**
    - **Validates: Requirements 5.1**

- [x] 3. 实现 CSS 主题系统
  - [x] 3.1 定义 CSS 变量
    - --brightness, --filter, --safe-padding
    - _Requirements: 5.2, 6.2_
  - [x] 3.2 实现 6 种背景主题
    - data-theme 属性切换
    - 渐变/网格/图案背景
    - _Requirements: 4.1, 4.2_
  - [x] 3.3 实现滤镜效果
    - normal/bw/invertHue/negative
    - _Requirements: 6.1, 6.2_

- [x] 4. 实现全局效果应用
  - [x] 4.1 创建 ThemeProvider 组件
    - 读取 uiStore 状态
    - 设置 data-theme 和 CSS 变量
    - _Requirements: 4.2, 5.2, 6.2_
  - [x] 4.2 集成到根布局
    - 包裹整个应用
    - _Requirements: 4.2, 5.2, 6.2_

- [x] 5. 实现 Settings Window
  - [x] 5.1 创建基础结构
    - 分组布局
    - _Requirements: 4.3, 5.3, 6.3, 7.3_
  - [x] 5.2 实现主题选择器
    - 6 个主题预览块
    - 点击切换
    - _Requirements: 4.3_
  - [x] 5.3 实现亮度滑块
    - range input
    - 实时预览
    - _Requirements: 5.3_
  - [x] 5.4 实现滤镜下拉
    - select 组件
    - 4 种选项
    - _Requirements: 6.3_
  - [x] 5.5 实现屏幕区域切换
    - safe/full 选项
    - _Requirements: 7.3_
  - [x] 5.6 实现 Reset 按钮
    - 调用 uiStore.reset()
    - 确认提示（可选）
    - _Requirements: 3.3_

- [x] 6. 集成屏幕区域到 Window Manager
  - [x] 6.1 更新最大化逻辑
    - 读取 screenArea 状态
    - safe 模式保留边距
    - _Requirements: 7.2_

- [x] 7. Checkpoint - Settings 功能验收
  - 确保主题切换即时生效 ✓
  - 确保亮度调节即时生效 ✓
  - 确保滤镜切换即时生效 ✓
  - 确保刷新后设置保留 ✓
  - 确保 Reset 恢复默认 ✓
  - 如有问题请提出

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 桌面风格切换已实现（macOS/Windows），可通过顶栏或任务栏切换
- 主题可先用纯色渐变，后续可替换为设计稿背景
- 亮度和滤镜使用 CSS filter 属性实现

## 已创建文件

- `lib/stores/theme-store.ts` - 桌面风格状态管理
- `lib/theme-config.ts` - 主题配置定义
- `components/desktop/Taskbar.tsx` - Windows 风格任务栏
