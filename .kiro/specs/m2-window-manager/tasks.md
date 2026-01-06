# Implementation Plan: M2 Window Manager

## Overview

实现窗口管理器核心功能，这是整个桌面 OS 体验的基础。包括状态管理、窗口渲染、拖拽交互和动画效果。

## Tasks

- [ ] 1. 实现 Window Store
  - [ ] 1.1 定义类型和接口
    - WindowState、WindowType、Rect 接口
    - WindowStore 接口
    - 创建 stores/windowStore.ts
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ] 1.2 实现 open action
    - 生成唯一 id（nanoid）
    - 分配递增 z 值
    - 设置 activeId
    - 使用默认 rect
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ] 1.3 实现 close action
    - 从 windows 移除
    - 更新 activeId 为最高 z 窗口或 null
    - _Requirements: 3.1, 3.2_
  - [ ] 1.4 实现 focus action
    - 更新目标窗口 z 为 ++zCounter
    - 更新 activeId
    - _Requirements: 4.1, 4.2_
  - [ ] 1.5 实现 toggleMax action
    - 保存/恢复 rect
    - 切换 isMax 状态
    - _Requirements: 6.1, 6.3_
  - [ ] 1.6 实现 updateRect action
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

- [ ] 3. Checkpoint - Window Store 验收
  - 确保所有 actions 正常工作
  - 确保状态更新正确
  - 如有问题请提出

- [ ] 4. 实现 WindowLayer 组件
  - [ ] 4.1 创建 WindowLayer
    - 遍历 windows 渲染 WindowFrame
    - 使用 AnimatePresence 包裹
    - _Requirements: 7.1_
  - [ ] 4.2 集成到 Desktop
    - 在 Desktop 组件中引入 WindowLayer
    - _Requirements: 7.1_

- [ ] 5. 实现 WindowFrame 组件
  - [ ] 5.1 创建基础结构
    - 绝对定位，使用 rect 设置位置尺寸
    - 设置 z-index
    - _Requirements: 7.2, 7.5_
  - [ ] 5.2 实现标题栏
    - 显示标题
    - 关闭按钮
    - 最大化按钮
    - _Requirements: 7.3_
  - [ ] 5.3 实现内容区域
    - 根据 type 渲染对应组件（先用占位符）
    - _Requirements: 7.4_
  - [ ] 5.4 添加聚焦交互
    - 点击窗口调用 focus
    - 聚焦状态视觉效果（阴影变化）
    - _Requirements: 4.3, 4.4_

- [ ] 6. 实现拖拽功能
  - [ ] 6.1 实现拖拽逻辑
    - pointerdown 记录起点
    - pointermove 更新位置
    - pointerup 结束拖拽
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ] 6.2 实现边界约束
    - clamp 位置确保窗口不完全拖出
    - 至少保留 50px 可见区域
    - _Requirements: 5.4_
  - [ ] 6.3 优化拖拽性能
    - 使用 requestAnimationFrame
    - 确保流畅无卡顿
    - _Requirements: 5.5_

- [ ]* 7. 拖拽边界测试
  - [ ]* 7.1 测试边界约束
    - **Property 5: 拖拽边界约束**
    - **Validates: Requirements 5.4**

- [ ] 8. 实现动画效果
  - [ ] 8.1 添加打开动画
    - scale + opacity 过渡
    - _Requirements: 2.5_
  - [ ] 8.2 添加关闭动画
    - scale + opacity 过渡
    - _Requirements: 3.3_
  - [ ] 8.3 添加聚焦动画
    - 阴影变化过渡
    - _Requirements: 4.4_

- [ ] 9. 实现最大化功能
  - [ ] 9.1 最大化尺寸计算
    - 考虑 Topbar 高度
    - 考虑 safe padding
    - _Requirements: 6.2_
  - [ ] 9.2 双击标题栏触发
    - 监听 dblclick 事件
    - _Requirements: 6.4_

- [ ] 10. Checkpoint - Window Manager 完整验收
  - 确保可打开多个窗口
  - 确保点击窗口置顶正确
  - 确保拖拽顺滑且不会完全丢失
  - 确保最大化/还原正常
  - 确保关闭窗口正常
  - 确保动画效果流畅
  - 如有问题请提出

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 建议安装 nanoid 用于生成唯一 ID
- 拖拽使用 pointer events 而非 mouse events，以支持触摸设备
- 动画使用 Framer Motion 的 AnimatePresence 处理进出动画
