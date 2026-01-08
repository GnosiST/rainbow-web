# Requirements Document

## Introduction

M1.5 里程碑：实现页面加载动画和屏保效果，参考 [marianopascual.me](https://www.marianopascual.me) 的设计风格。包括首次访问的加载过渡动画、空闲状态的屏保效果，以及为后续插画风格主题预留扩展接口。

## Glossary

- **Loading_Screen**: 加载屏幕组件，首次访问时显示的全屏过渡动画
- **Screensaver**: 屏保组件，用户空闲一段时间后显示的动画效果
- **Illustration_Theme**: 插画风格主题，手绘风格的图标和背景元素
- **Theme_Store**: 主题状态管理 store

## Requirements

### Requirement 1: 加载屏幕

**User Story:** 作为访客，我希望首次访问时看到精美的加载动画，以便获得良好的第一印象。

#### Acceptance Criteria

1. WHEN 页面首次加载 THEN THE Loading_Screen SHALL 显示全屏遮罩
2. THE Loading_Screen SHALL 显示 Logo 或品牌名称动画
3. THE Loading_Screen SHALL 显示加载进度指示（可选：进度条或百分比）
4. WHEN 页面资源加载完成 THEN THE Loading_Screen SHALL 以动画形式消失
5. THE Loading_Screen SHALL 支持自定义动画时长（最小 1.5 秒，确保动画完整）
6. WHEN 用户刷新页面 THEN THE Loading_Screen SHALL 可配置是否再次显示

### Requirement 2: 屏保效果

**User Story:** 作为访客，我希望在空闲时看到有趣的屏保动画，以便增加网站的趣味性。

#### Acceptance Criteria

1. WHEN 用户空闲超过设定时间（默认 60 秒）THEN THE Screensaver SHALL 激活
2. THE Screensaver SHALL 显示全屏动画效果
3. WHEN 用户移动鼠标或按下键盘 THEN THE Screensaver SHALL 立即消失
4. THE Screensaver SHALL 支持多种动画效果（如：漂浮图标、粒子效果、时钟等）
5. THE Settings_Window SHALL 提供屏保开关和空闲时间设置

### Requirement 3: 插画风格主题扩展

**User Story:** 作为开发者，我希望能够方便地添加插画风格主题，以便后续扩展更多视觉风格。

#### Acceptance Criteria

1. THE Theme_Store SHALL 支持 "illustration" 类型的主题
2. THE Illustration_Theme SHALL 定义自定义图标组件接口
3. THE Illustration_Theme SHALL 定义自定义背景元素接口
4. THE Illustration_Theme SHALL 支持 SVG 或图片格式的图标
5. WHEN 切换到插画主题 THEN THE Desktop_Shell SHALL 使用对应的图标和背景

### Requirement 3.5: 插画主题自定义配置

**User Story:** 作为用户，我希望能够自定义插画主题的外观，以便个性化我的作品集展示。

#### Acceptance Criteria

1. THE Illustration_Theme SHALL 提供背景颜色选择（白色、奶油色、浅灰等预设）
2. THE Illustration_Theme SHALL 提供强调色选择（珊瑚、蓝色、绿色等预设）
3. THE Settings_Window SHALL 在插画主题下显示背景和强调色选项
4. THE Illustration_Theme_Store SHALL 持久化用户的自定义配置
5. THE Illustration_Desktop SHALL 使用左侧固定导航 + 可折叠项目卡片布局（参考 marianopascual.me）
6. THE Illustration_Theme SHALL 预留扩展接口用于后续添加更多自定义选项

### Requirement 4: 动画性能

**User Story:** 作为访客，我希望动画流畅不卡顿，以便获得良好的用户体验。

#### Acceptance Criteria

1. THE Loading_Screen SHALL 使用 CSS 动画或 Framer Motion 实现
2. THE Screensaver SHALL 使用 requestAnimationFrame 或 CSS 动画
3. THE 动画 SHALL 在低端设备上可降级或禁用
4. THE 动画 SHALL 尊重用户的 prefers-reduced-motion 设置
