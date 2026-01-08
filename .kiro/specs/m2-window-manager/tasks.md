# Implementation Plan: M2 Window Manager

## Overview

实现窗口管理器核心功能，这是整个桌面 OS 体验的基础。包括状态管理、窗口渲染、拖拽交互和动画效果。

## Tasks

- [x] 1. 实现 Window Store
  - [x] 1.1 定义类型和接口
    - WindowState、WindowType、Rect 接口
    - WindowStore 接口
    - 创建 stores/windowStore.ts
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [x] 1.2 实现 open action
    - 生成唯一 id（nanoid）
    - 分配递增 z 值
    - 设置 activeId
    - 使用默认 rect
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 1.3 实现 close action
    - 从 windows 移除
    - 更新 activeId 为最高 z 窗口或 null
    - _Requirements: 3.1, 3.2_
  - [x] 1.4 实现 focus action
    - 更新目标窗口 z 为 ++zCounter
    - 更新 activeId
    - _Requirements: 4.1, 4.2_
  - [x] 1.5 实现 toggleMax action
    - 保存/恢复 rect
    - 切换 isMax 状态
    - _Requirements: 6.1, 6.3_
  - [x] 1.6 实现 updateRect action
    - 更新窗口位置和尺寸
    - _Requirements: 5.2_

- [ ]* 2. Window Store 单元测试
  - [ ]* 2.1 测试 open action
    - **Property 1: 窗口 ID 唯一性**
    - **Validates: Requirements 2.2**
  - [ ]* 2.2 测试 focus action
    - **Property 2: Z-Index 单调递增**
    - **Validates: Requirements 2.3, 4.1**
  - [ ]* 2.3 测试 close action
    - **Property 3: 聚焦窗口一致性**
    - **Validates: Requirements 2.4, 3.2, 4.2**
  - [ ]* 2.4 测试 toggleMax action
    - **Property 4: 最大化还原幂等性**
    - **Validates: Requirements 6.1, 6.3**

- [x] 3. Checkpoint - Window Store 验收
  - 确保所有 actions 正常工作 ✓
  - 确保状态更新正确 ✓
  - 如有问题请提出

- [x] 4. 实现 WindowLayer 组件
  - [x] 4.1 创建 WindowLayer
    - 遍历 windows 渲染 WindowFrame
    - 使用 AnimatePresence 包裹
    - _Requirements: 7.1_
  - [x] 4.2 集成到 Desktop
    - 在 Desktop 组件中引入 WindowLayer
    - _Requirements: 7.1_

- [x] 5. 实现 WindowFrame 组件
  - [x] 5.1 创建基础结构
    - 绝对定位，使用 rect 设置位置尺寸
    - 设置 z-index
    - _Requirements: 7.2, 7.5_
  - [x] 5.2 实现标题栏
    - 显示标题
    - 关闭按钮
    - 最大化按钮
    - _Requirements: 7.3_
  - [x] 5.3 实现内容区域
    - 根据 type 渲染对应组件（先用占位符）
    - _Requirements: 7.4_
  - [x] 5.4 添加聚焦交互
    - 点击窗口调用 focus
    - 聚焦状态视觉效果（阴影变化）
    - _Requirements: 4.3, 4.4_

- [x] 6. 实现拖拽功能
  - [x] 6.1 实现拖拽逻辑
    - pointerdown 记录起点
    - pointermove 更新位置
    - pointerup 结束拖拽
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 6.2 实现边界约束
    - clamp 位置确保窗口不完全拖出
    - 至少保留 50px 可见区域
    - _Requirements: 5.4_
  - [x] 6.3 优化拖拽性能
    - 使用 requestAnimationFrame
    - 确保流畅无卡顿
    - _Requirements: 5.5_

- [ ]* 7. 拖拽边界测试
  - [ ]* 7.1 测试边界约束
    - **Property 5: 拖拽边界约束**
    - **Validates: Requirements 5.4**

- [x] 8. 实现动画效果
  - [x] 8.1 添加打开动画
    - scale + opacity 过渡
    - _Requirements: 2.5_
  - [x] 8.2 添加关闭动画
    - scale + opacity 过渡
    - _Requirements: 3.3_
  - [x] 8.3 添加聚焦动画
    - 阴影变化过渡
    - _Requirements: 4.4_

- [x] 9. 实现最大化功能
  - [x] 9.1 最大化尺寸计算
    - 考虑 Topbar 高度
    - 考虑 safe padding
    - _Requirements: 6.2_
  - [x] 9.2 双击标题栏触发
    - 监听 dblclick 事件
    - _Requirements: 6.4_

- [x] 10. 实现窗口调整大小功能
  - [x] 10.1 创建 ResizeHandles 组件
    - 8 个方向的调整手柄（上、下、左、右、四角）
    - 透明热区，hover 时显示光标
    - _Requirements: 8.1, 8.8_
  - [x] 10.2 实现调整大小逻辑
    - pointerdown 记录起点和初始尺寸
    - pointermove 计算新尺寸
    - pointerup 结束调整
    - _Requirements: 8.2, 8.3, 8.4_
  - [x] 10.3 实现尺寸约束
    - 最小尺寸 200x150
    - 最大尺寸不超过屏幕
    - _Requirements: 8.5, 8.6_
  - [x] 10.4 最大化状态禁用
    - isMax 时隐藏 resize handles
    - _Requirements: 8.7_

- [x] 11. Checkpoint - Window Manager 完整验收
  - 确保可打开多个窗口 ✓
  - 确保点击窗口置顶正确 ✓
  - 确保拖拽顺滑且不会完全丢失 ✓
  - 确保最大化/还原正常 ✓
  - 确保关闭窗口正常 ✓
  - 确保动画效果流畅 ✓
  - 确保窗口可自由调整大小 ✓
  - 如有问题请提出

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 建议安装 nanoid 用于生成唯一 ID
- 拖拽使用 pointer events 而非 mouse events，以支持触摸设备
- 动画使用 Framer Motion 的 AnimatePresence 处理进出动画
