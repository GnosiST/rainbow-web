# Requirements Document

## Introduction

M4 里程碑：实现全局外观设置功能，包括桌面风格切换（macOS/Windows/插画风格）、背景主题、亮度、滤镜、屏幕区域设置、屏保设置，支持持久化和重置。

## Glossary

- **UI_Store**: Zustand store，管理全局外观状态
- **Theme_Store**: Zustand store，管理桌面风格状态（macOS/Windows/Illustration）
- **Settings_Window**: 设置窗口，提供外观调整界面
- **Desktop_Theme**: 桌面风格，定义整体 UI 风格（macOS/Windows/Illustration）
- **Background_Theme**: 背景主题，定义桌面背景样式
- **Illustration_Theme**: 插画风格主题，手绘风格的图标和背景
- **Filter**: 滤镜效果，应用于整个页面
- **Screensaver**: 屏保，用户空闲时显示的动画效果

## Requirements

### Requirement 1: UI 状态管理

**User Story:** 作为开发者，我希望有集中的状态管理来控制全局外观，以便在任何地方应用设置。

#### Acceptance Criteria

1. THE Theme_Store SHALL 维护 desktopTheme 字段存储当前桌面风格（macos/windows）
2. THE UI_Store SHALL 维护 backgroundTheme 字段存储当前背景主题
3. THE UI_Store SHALL 维护 brightness 字段存储亮度值（0.7-1.3）
4. THE UI_Store SHALL 维护 filter 字段存储滤镜类型
5. THE UI_Store SHALL 维护 screenArea 字段存储屏幕区域模式

### Requirement 1.5: 桌面风格切换（已实现）

**User Story:** 作为访客，我希望能够在 macOS 和 Windows 风格之间切换，以便获得熟悉的桌面体验。

#### Acceptance Criteria

1. THE Theme_Store SHALL 支持 macos 和 windows 两种桌面风格
2. WHEN 切换到 macos 风格 THEN THE Desktop_Shell SHALL 显示顶部菜单栏和底部 Dock
3. WHEN 切换到 windows 风格 THEN THE Desktop_Shell SHALL 显示底部任务栏
4. WHEN 切换风格 THEN THE Desktop_Icons SHALL 调整位置和样式
5. THE Theme_Store SHALL 将桌面风格持久化到 localStorage

### Requirement 2: 状态持久化

**User Story:** 作为访客，我希望刷新页面后设置仍然保留，以便获得一致的体验。

#### Acceptance Criteria

1. THE UI_Store SHALL 将状态持久化到 localStorage
2. WHEN 页面加载 THEN THE UI_Store SHALL 从 localStorage 恢复状态
3. WHEN 状态变更 THEN THE UI_Store SHALL 自动同步到 localStorage

### Requirement 3: 重置功能

**User Story:** 作为访客，我希望能够重置所有设置，以便恢复默认外观。

#### Acceptance Criteria

1. WHEN 调用 reset() THEN THE UI_Store SHALL 清空 localStorage 中的设置
2. WHEN 调用 reset() THEN THE UI_Store SHALL 恢复所有字段为默认值
3. THE Settings_Window SHALL 提供 Reset Everything 按钮

### Requirement 4: 背景主题

**User Story:** 作为访客，我希望能够切换背景主题，以便个性化桌面外观。

#### Acceptance Criteria

1. THE UI_Store SHALL 支持至少 6 种背景主题
2. WHEN 切换主题 THEN THE Desktop_Shell SHALL 即时更新背景
3. THE Settings_Window SHALL 提供主题选择器

### Requirement 5: 亮度调节

**User Story:** 作为访客，我希望能够调节页面亮度，以便适应不同的环境光线。

#### Acceptance Criteria

1. THE UI_Store SHALL 支持 0.7 到 1.3 范围的亮度值
2. WHEN 调节亮度 THEN THE Desktop_Shell SHALL 即时应用 CSS brightness 滤镜
3. THE Settings_Window SHALL 提供亮度滑块

### Requirement 6: 滤镜效果

**User Story:** 作为访客，我希望能够应用不同的滤镜效果，以便获得独特的视觉体验。

#### Acceptance Criteria

1. THE UI_Store SHALL 支持 normal、bw、invertHue、negative 四种滤镜
2. WHEN 切换滤镜 THEN THE Desktop_Shell SHALL 即时应用对应 CSS 滤镜
3. THE Settings_Window SHALL 提供滤镜下拉选择器

### Requirement 7: 屏幕区域

**User Story:** 作为访客，我希望能够调整屏幕区域模式，以便控制窗口最大化的范围。

#### Acceptance Criteria

1. THE UI_Store SHALL 支持 safe 和 full 两种屏幕区域模式
2. WHEN screenArea=safe THEN THE Window_Manager SHALL 在最大化时保留边距
3. THE Settings_Window SHALL 提供屏幕区域切换选项


### Requirement 8: 插画风格主题

**User Story:** 作为访客，我希望能够选择插画风格的主题，以便获得独特的手绘视觉体验。

#### Acceptance Criteria

1. THE Theme_Store SHALL 支持 illustration 类型的桌面风格
2. THE Illustration_Theme SHALL 提供自定义图标组件
3. THE Illustration_Theme SHALL 提供自定义背景元素
4. WHEN 切换到插画主题 THEN THE Desktop_Shell SHALL 使用对应的图标和背景
5. THE Settings_Window SHALL 提供插画主题选择器

### Requirement 9: 屏保设置

**User Story:** 作为访客，我希望能够配置屏保效果，以便在空闲时看到有趣的动画。

#### Acceptance Criteria

1. THE Settings_Window SHALL 提供屏保开关
2. THE Settings_Window SHALL 提供空闲时间设置（30秒-5分钟）
3. THE Settings_Window SHALL 提供屏保类型选择（漂浮图标/时钟/粒子等）
4. THE UI_Store SHALL 持久化屏保设置

### Requirement 10: 加载屏幕设置

**User Story:** 作为访客，我希望能够配置加载屏幕行为，以便控制是否在刷新时显示。

#### Acceptance Criteria

1. THE Settings_Window SHALL 提供"刷新时显示加载屏幕"开关
2. THE UI_Store SHALL 持久化加载屏幕设置
