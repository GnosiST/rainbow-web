# Requirements Document

## Introduction

M1 里程碑：实现桌面 OS 风格的 Desktop Shell，包括顶部菜单栏和桌面图标启动器，为用户提供类似操作系统的交互体验。本里程碑仅针对桌面端（屏幕宽度 >= 768px），移动端适配见 M7。

## Glossary

- **Desktop_Shell**: 桌面壳层，包含顶部菜单栏和桌面图标区域（仅桌面端）
- **Topbar**: 顶部菜单栏组件，显示菜单项
- **Desktop_Icon**: 桌面图标组件，可点击打开对应窗口
- **Window_Store**: Zustand 状态管理，管理窗口的打开/关闭/聚焦等

## Requirements

### Requirement 1: 顶部菜单栏

**User Story:** 作为访客，我希望看到顶部菜单栏，以便获得类似桌面操作系统的视觉体验。

#### Acceptance Criteria

1. THE Topbar SHALL 固定显示在页面顶部
2. THE Topbar SHALL 显示菜单项（File / Contact / Settings）
3. WHEN 点击菜单项 THEN THE Topbar SHALL 提供视觉反馈（MVP 可仅为 UI 占位）
4. THE Topbar SHALL 具有与桌面 OS 一致的视觉风格

### Requirement 2: 桌面图标

**User Story:** 作为访客，我希望在桌面上看到应用图标，以便通过点击图标打开对应的窗口。

#### Acceptance Criteria

1. THE Desktop_Shell SHALL 显示以下图标：About、Projects、Photos、Slideshow、Settings
2. THE Desktop_Shell SHALL 显示外链图标：Shop、Mail
3. WHEN 点击内部应用图标 THEN THE Desktop_Icon SHALL 调用 windowStore.open(type)
4. WHEN 点击外链图标 THEN THE Desktop_Icon SHALL 在新标签页打开对应链接
5. THE Desktop_Icon SHALL 显示图标图形和标签文字
6. THE Desktop_Icon SHALL 具有悬停和点击的视觉反馈

### Requirement 3: 窗口打开集成

**User Story:** 作为访客，我希望点击图标后能打开对应窗口，以便查看内容。

#### Acceptance Criteria

1. WHEN 点击 About 图标 THEN THE Window_Store SHALL 打开 about 类型窗口
2. WHEN 点击 Projects 图标 THEN THE Window_Store SHALL 打开 projects 类型窗口
3. WHEN 点击 Photos 图标 THEN THE Window_Store SHALL 打开 photos 类型窗口
4. WHEN 点击 Slideshow 图标 THEN THE Window_Store SHALL 打开 slideshow 类型窗口
5. WHEN 点击 Settings 图标 THEN THE Window_Store SHALL 打开 settings 类型窗口
