# Requirements Document

## Introduction

M5 里程碑：实现 Slideshow 精选项目轮播和 Photos/Gallery 可购买作品列表功能。

## Glossary

- **Slideshow_Window**: 精选项目轮播窗口
- **Photos_Window**: 可购买作品列表窗口
- **Featured_Projects**: 标记为 featured 的项目集合

## Requirements

### Requirement 1: Slideshow 数据

**User Story:** 作为开发者，我希望能够标记精选项目，以便在 Slideshow 中展示。

#### Acceptance Criteria

1. THE Content_System SHALL 支持项目 frontmatter 中的 featured 字段
2. THE Content_System SHALL 在索引中生成 featured 项目列表
3. THE Slideshow_Window SHALL 从索引读取 featured 项目

### Requirement 2: Slideshow 浏览

**User Story:** 作为访客，我希望能够浏览精选项目，以便快速了解优秀作品。

#### Acceptance Criteria

1. THE Slideshow_Window SHALL 显示当前精选项目的封面图
2. THE Slideshow_Window SHALL 显示当前项目的标题
3. WHEN 点击 prev 按钮 THEN THE Slideshow_Window SHALL 显示上一个精选项目
4. WHEN 点击 next 按钮 THEN THE Slideshow_Window SHALL 显示下一个精选项目
5. WHEN 到达首个项目点击 prev THEN THE Slideshow_Window SHALL 循环到最后一个
6. WHEN 到达末个项目点击 next THEN THE Slideshow_Window SHALL 循环到第一个

### Requirement 3: Slideshow 打开项目

**User Story:** 作为访客，我希望能够从 Slideshow 打开项目详情，以便深入了解感兴趣的项目。

#### Acceptance Criteria

1. THE Slideshow_Window SHALL 提供 Open Project 按钮
2. WHEN 点击 Open Project THEN THE Slideshow_Window SHALL 打开当前项目的 ProjectWindow

### Requirement 4: Photos 数据

**User Story:** 作为开发者，我希望能够管理可购买作品数据，以便在 Photos 窗口展示。

#### Acceptance Criteria

1. THE Content_System SHALL 支持 photos 数据（JSON 或 MDX）
2. THE Photos_Data SHALL 包含 id、title、year、image、shopUrl 字段
3. THE Photos_Data SHALL 可选包含 size 字段

### Requirement 5: Photos 列表

**User Story:** 作为访客，我希望浏览可购买作品列表，以便选择感兴趣的作品购买。

#### Acceptance Criteria

1. THE Photos_Window SHALL 显示所有作品的列表
2. THE Photos_Window SHALL 为每个作品显示图片、标题、年份
3. THE Photos_Window SHALL 为每个作品显示尺寸（如有）
4. THE Photos_Window SHALL 为每个作品提供购买链接按钮

### Requirement 6: Photos 外链

**User Story:** 作为访客，我希望能够跳转到购买页面，以便购买感兴趣的作品。

#### Acceptance Criteria

1. WHEN 点击购买按钮 THEN THE Photos_Window SHALL 在新标签页打开 shopUrl
2. IF shopUrl 为空 THEN THE Photos_Window SHALL 禁用或隐藏购买按钮
