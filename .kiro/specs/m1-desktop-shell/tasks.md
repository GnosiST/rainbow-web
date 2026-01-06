# Implementation Plan: M1 Desktop Shell

## Overview

实现桌面 OS 风格的 Desktop Shell，包括顶部菜单栏和桌面图标启动器。

## Tasks

- [ ] 1. 创建 Topbar 组件
  - [ ] 1.1 实现 Topbar 基础结构
    - 固定顶部布局
    - 菜单项渲染（File / Contact / Settings）
    - 半透明背景 + 模糊效果
    - _Requirements: 1.1, 1.2, 1.4_
  - [ ] 1.2 添加菜单项交互
    - 悬停效果
    - 点击视觉反馈（MVP 占位）
    - _Requirements: 1.3_

- [ ] 2. 创建 DesktopIcon 组件
  - [ ] 2.1 实现图标基础结构
    - 图标图形 + 标签文字
    - 网格布局
    - _Requirements: 2.5_
  - [ ] 2.2 添加交互效果
    - 悬停高亮
    - 点击反馈
    - _Requirements: 2.6_
  - [ ] 2.3 实现点击逻辑
    - 内部应用：调用 windowStore.open(type)
    - 外链：window.open(href, '_blank')
    - _Requirements: 2.3, 2.4_

- [ ] 3. 创建 Desktop 组件
  - [ ] 3.1 实现桌面布局
    - 全屏容器（减去 Topbar 高度）
    - 图标网格区域
    - _Requirements: 2.1, 2.2_
  - [ ] 3.2 配置图标数据
    - 创建 lib/desktop-icons.ts
    - 定义所有图标配置
    - _Requirements: 2.1, 2.2_

- [ ] 4. 集成到首页
  - [ ] 4.1 更新 app/page.tsx
    - 引入 Topbar 和 Desktop
    - 预留 WindowLayer 位置
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 5. Checkpoint - Desktop Shell 验收
  - 确保 Topbar 正确显示
  - 确保所有图标可见
  - 确保点击图标触发 windowStore.open()（控制台可见调用）
  - 确保外链图标在新标签页打开
  - 如有问题请提出

- [ ]* 6. 编写单元测试
  - [ ]* 6.1 Topbar 组件测试
    - 渲染验证
    - 菜单项显示
  - [ ]* 6.2 DesktopIcon 组件测试
    - **Property 1: 图标点击触发正确窗口类型**
    - **Validates: Requirements 2.3, 3.1-3.5**

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 本里程碑依赖 M2 的 windowStore，但可先用 mock 或 console.log 占位
- 图标可使用 emoji 或简单 SVG，后续可替换为设计稿图标
