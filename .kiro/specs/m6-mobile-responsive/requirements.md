# Requirements Document

## Introduction

M6 里程碑：实现移动端响应式适配，支持 iOS 和 Android 两种手机系统风格，以及后期的自定义插画风格。移动端采用全屏页面切换模式，而非桌面端的窗口管理模式。

## Glossary

- **Mobile_Shell**: 移动端壳层，包含导航栏和内容区域
- **Mobile_Theme**: 移动端主题类型（ios / android / illustration）
- **Tab_Bar**: iOS 风格底部标签栏
- **Bottom_Navigation**: Android 风格底部导航栏
- **Page_View**: 全屏页面视图，替代桌面端的窗口
- **Device_Detector**: 设备检测器，判断当前设备类型
- **Gesture_Handler**: 手势处理器，处理滑动等触摸手势

## Requirements

### Requirement 1: 响应式断点检测

**User Story:** 作为访客，我希望网站能自动识别我的设备类型，以便获得最佳的浏览体验。

#### Acceptance Criteria

1. THE Device_Detector SHALL 检测屏幕宽度并判断设备类型
2. WHEN 屏幕宽度 < 768px THEN THE Device_Detector SHALL 判定为移动端
3. WHEN 屏幕宽度 >= 768px THEN THE Device_Detector SHALL 判定为桌面端
4. THE Device_Detector SHALL 监听窗口大小变化并实时更新设备类型
5. THE Device_Detector SHALL 提供 isMobile 状态供组件使用

### Requirement 2: 移动端主题系统

**User Story:** 作为访客，我希望在移动端也能切换不同的系统风格，以便获得个性化的体验。

#### Acceptance Criteria

1. THE Mobile_Theme SHALL 支持 ios、android 两种系统风格
2. THE Mobile_Theme SHALL 支持 illustration 插画风格（后期实现）
3. WHEN 切换主题 THEN THE Mobile_Shell SHALL 立即更新视觉风格
4. THE Mobile_Theme SHALL 持久化到 localStorage
5. THE Mobile_Theme SHALL 与桌面端主题独立存储

### Requirement 3: iOS 风格移动端

**User Story:** 作为 iOS 用户，我希望看到熟悉的 iOS 风格界面，以便获得原生般的体验。

#### Acceptance Criteria

1. THE Mobile_Shell SHALL 显示 iOS 风格状态栏（时间、信号、电池）
2. THE Tab_Bar SHALL 固定在底部，显示主要导航项
3. THE Tab_Bar SHALL 使用 SF Symbols 风格图标
4. THE Page_View SHALL 使用 iOS 风格的圆角卡片设计
5. WHEN 左滑页面 THEN THE Gesture_Handler SHALL 返回上一页
6. THE Mobile_Shell SHALL 使用 iOS 风格的过渡动画（滑入/滑出）
7. THE Mobile_Shell SHALL 使用 iOS 风格的配色（白色背景、蓝色强调色）

### Requirement 4: Android 风格移动端

**User Story:** 作为 Android 用户，我希望看到熟悉的 Material Design 风格界面。

#### Acceptance Criteria

1. THE Mobile_Shell SHALL 显示 Android 风格状态栏
2. THE Bottom_Navigation SHALL 固定在底部，显示主要导航项
3. THE Bottom_Navigation SHALL 使用 Material Icons 风格图标
4. THE Page_View SHALL 使用 Material Design 风格的卡片设计
5. THE Mobile_Shell SHALL 使用 Material Design 风格的过渡动画（淡入/淡出、共享元素）
6. THE Mobile_Shell SHALL 使用 Material Design 配色（深色主题可选）
7. WHEN 点击返回 THEN THE Gesture_Handler SHALL 返回上一页

### Requirement 5: 移动端页面导航

**User Story:** 作为访客，我希望在移动端能方便地浏览不同内容。

#### Acceptance Criteria

1. THE Mobile_Shell SHALL 提供以下导航项：About、Projects、Photos、Settings
2. WHEN 点击导航项 THEN THE Page_View SHALL 全屏显示对应内容
3. THE Page_View SHALL 支持页面堆栈管理（push/pop）
4. WHEN 打开项目详情 THEN THE Page_View SHALL 推入新页面
5. WHEN 返回 THEN THE Page_View SHALL 弹出当前页面
6. THE Mobile_Shell SHALL 显示当前页面标题

### Requirement 6: 移动端内容适配

**User Story:** 作为访客，我希望在移动端看到适配的内容布局。

#### Acceptance Criteria

1. THE Page_View SHALL 使用单列布局显示项目列表
2. THE Page_View SHALL 使用全屏画廊显示项目图片
3. THE Page_View SHALL 使用滑动手势切换画廊图片
4. THE Page_View SHALL 适配触摸操作（点击、滑动、长按）
5. THE Page_View SHALL 禁用桌面端的窗口拖拽和调整大小功能

### Requirement 7: 移动端设置

**User Story:** 作为访客，我希望在移动端也能调整设置。

#### Acceptance Criteria

1. THE Settings_Page SHALL 显示主题切换选项（iOS/Android）
2. THE Settings_Page SHALL 显示亮度调节滑块
3. THE Settings_Page SHALL 显示滤镜效果选项
4. THE Settings_Page SHALL 使用原生风格的设置列表布局
5. WHEN 切换设置 THEN THE Mobile_Shell SHALL 立即应用更改

### Requirement 8: 桌面端与移动端切换

**User Story:** 作为访客，我希望在不同设备间切换时能保持一致的体验。

#### Acceptance Criteria

1. WHEN 从桌面端切换到移动端 THEN THE Device_Detector SHALL 自动切换到移动端布局
2. WHEN 从移动端切换到桌面端 THEN THE Device_Detector SHALL 自动切换到桌面端布局
3. THE Device_Detector SHALL 保留用户的主题偏好设置
4. THE Device_Detector SHALL 平滑过渡布局切换

