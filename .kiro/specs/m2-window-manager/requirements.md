# Requirements Document

## Introduction

M2 里程碑：实现窗口管理器核心功能，包括多窗口管理、拖拽移动、聚焦置顶、最大化/还原、关闭和动画效果。这是整个桌面 OS 体验的核心。

## Glossary

- **Window_Manager**: 窗口管理系统，负责窗口的生命周期和状态管理
- **Window_Store**: Zustand store，存储所有窗口状态
- **Window_State**: 单个窗口的状态对象
- **Window_Frame**: 窗口框架组件，包含标题栏和内容区
- **Window_Layer**: 渲染层，负责渲染所有打开的窗口
- **Z_Index**: 窗口层级，决定窗口的前后顺序

## Requirements

### Requirement 1: 窗口状态管理

**User Story:** 作为开发者，我希望有一个集中的状态管理来控制所有窗口，以便实现复杂的窗口交互。

#### Acceptance Criteria

1. THE Window_Store SHALL 维护 windows 数组存储所有窗口状态
2. THE Window_Store SHALL 维护 activeId 标识当前聚焦窗口
3. THE Window_Store SHALL 维护 zCounter 用于分配窗口层级
4. THE Window_State SHALL 包含 id、type、title、rect、z、isMax、payload 字段

### Requirement 2: 窗口打开

**User Story:** 作为访客，我希望能够打开新窗口，以便查看不同的内容。

#### Acceptance Criteria

1. WHEN 调用 open(type, payload?) THEN THE Window_Store SHALL 创建新窗口并添加到 windows 数组
2. WHEN 打开新窗口 THEN THE Window_Store SHALL 为其分配唯一 id
3. WHEN 打开新窗口 THEN THE Window_Store SHALL 为其分配递增的 z 值
4. WHEN 打开新窗口 THEN THE Window_Store SHALL 将其设为 activeId
5. WHEN 打开新窗口 THEN THE Window_Frame SHALL 播放打开动画

### Requirement 3: 窗口关闭

**User Story:** 作为访客，我希望能够关闭窗口，以便清理不需要的内容。

#### Acceptance Criteria

1. WHEN 调用 close(id) THEN THE Window_Store SHALL 从 windows 数组移除该窗口
2. WHEN 关闭当前聚焦窗口 THEN THE Window_Store SHALL 更新 activeId 为下一个最高 z 值窗口或 null
3. WHEN 关闭窗口 THEN THE Window_Frame SHALL 播放关闭动画

### Requirement 4: 窗口聚焦

**User Story:** 作为访客，我希望点击窗口时它能置顶显示，以便我能专注于当前操作的窗口。

#### Acceptance Criteria

1. WHEN 调用 focus(id) THEN THE Window_Store SHALL 将该窗口 z 值设为 ++zCounter
2. WHEN 调用 focus(id) THEN THE Window_Store SHALL 将 activeId 设为该窗口 id
3. WHEN 点击窗口任意区域 THEN THE Window_Manager SHALL 调用 focus(id)
4. WHEN 窗口聚焦 THEN THE Window_Frame SHALL 显示聚焦状态的视觉效果（阴影变化）

### Requirement 5: 窗口拖拽移动

**User Story:** 作为访客，我希望能够拖拽移动窗口，以便自由安排窗口位置。

#### Acceptance Criteria

1. WHEN 在标题栏按下鼠标 THEN THE Window_Manager SHALL 开始拖拽模式
2. WHILE 拖拽模式 WHEN 移动鼠标 THEN THE Window_Manager SHALL 更新窗口位置
3. WHEN 释放鼠标 THEN THE Window_Manager SHALL 结束拖拽模式
4. THE Window_Manager SHALL 限制窗口位置使其不会完全拖出可视区域（clamp）
5. THE Window_Manager SHALL 确保拖拽过程流畅无卡顿

### Requirement 8: 窗口调整大小

**User Story:** 作为访客，我希望能够通过拖拽窗口边缘来调整窗口大小，以便根据内容需要自由调整窗口尺寸。

#### Acceptance Criteria

1. WHEN 鼠标悬停在窗口边缘或角落 THEN THE Window_Frame SHALL 显示对应方向的调整光标
2. WHEN 在窗口边缘按下鼠标 THEN THE Window_Manager SHALL 开始调整大小模式
3. WHILE 调整大小模式 WHEN 移动鼠标 THEN THE Window_Manager SHALL 更新窗口尺寸
4. WHEN 释放鼠标 THEN THE Window_Manager SHALL 结束调整大小模式
5. THE Window_Manager SHALL 限制窗口最小尺寸为 200x150 像素
6. THE Window_Manager SHALL 限制窗口最大尺寸不超过屏幕尺寸
7. WHEN 窗口处于最大化状态 THEN THE Window_Frame SHALL 禁用调整大小功能
8. THE Window_Frame SHALL 支持 8 个方向的调整（上、下、左、右、四个角落）

### Requirement 6: 窗口最大化

**User Story:** 作为访客，我希望能够最大化窗口，以便获得更大的内容查看区域。

#### Acceptance Criteria

1. WHEN 调用 toggleMax(id) 且 isMax=false THEN THE Window_Store SHALL 保存当前 rect 并设置 isMax=true
2. WHEN isMax=true THEN THE Window_Frame SHALL 填充可用屏幕区域（考虑 safe padding）
3. WHEN 调用 toggleMax(id) 且 isMax=true THEN THE Window_Store SHALL 恢复保存的 rect 并设置 isMax=false
4. WHEN 双击标题栏 THEN THE Window_Manager SHALL 调用 toggleMax(id)

### Requirement 7: 窗口渲染

**User Story:** 作为访客，我希望看到所有打开的窗口正确渲染，以便同时查看多个内容。

#### Acceptance Criteria

1. THE Window_Layer SHALL 遍历 windows 数组渲染所有窗口
2. THE Window_Frame SHALL 根据 z 值设置 CSS z-index
3. THE Window_Frame SHALL 显示标题栏（包含标题、关闭按钮、最大化按钮）
4. THE Window_Frame SHALL 根据 type 渲染对应的内容组件
5. THE Window_Frame SHALL 根据 isMax 状态调整尺寸和位置
