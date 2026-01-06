# Requirements Document

## Introduction

M3 里程碑：实现项目内容系统和项目窗口，包括项目列表、项目详情展示、图片画廊和信息面板。

## Glossary

- **Content_System**: 内容管理系统，从 MDX 文件读取项目数据
- **Projects_Window**: 项目列表窗口，展示所有项目
- **Project_Window**: 项目详情窗口，展示单个项目的图片和信息
- **Gallery**: 图片画廊组件，支持前后切换
- **Info_Panel**: 信息面板，展示项目元数据和描述

## Requirements

### Requirement 1: 内容索引生成

**User Story:** 作为开发者，我希望自动生成项目索引，以便在列表和轮播中使用。

#### Acceptance Criteria

1. THE Content_System SHALL 从 content/projects/*.mdx 读取项目文件
2. THE Content_System SHALL 解析 frontmatter 提取 slug、title、year、featured、cover、gallery
3. THE Content_System SHALL 生成 generated/projects.index.json 索引文件
4. WHEN 执行构建 THEN THE Content_System SHALL 自动更新索引

### Requirement 2: 项目列表窗口

**User Story:** 作为访客，我希望在项目列表中浏览所有项目，以便选择感兴趣的项目查看。

#### Acceptance Criteria

1. THE Projects_Window SHALL 显示所有项目的列表
2. THE Projects_Window SHALL 为每个项目显示封面图、标题、年份
3. WHEN 点击项目条目 THEN THE Projects_Window SHALL 打开对应的 Project_Window
4. THE Projects_Window SHALL 支持文件夹风格的视觉设计

### Requirement 3: 项目详情窗口

**User Story:** 作为访客，我希望查看项目详情，以便了解项目的图片和描述信息。

#### Acceptance Criteria

1. THE Project_Window SHALL 根据 payload.slug 加载对应项目数据
2. THE Project_Window SHALL 显示图片画廊区域
3. THE Project_Window SHALL 显示信息面板区域
4. THE Project_Window SHALL 在标题栏显示项目名称

### Requirement 4: 图片画廊

**User Story:** 作为访客，我希望浏览项目的所有图片，以便全面了解项目作品。

#### Acceptance Criteria

1. THE Gallery SHALL 显示当前选中的图片
2. WHEN 点击 prev 按钮 THEN THE Gallery SHALL 显示上一张图片
3. WHEN 点击 next 按钮 THEN THE Gallery SHALL 显示下一张图片
4. WHEN 到达首张图片点击 prev THEN THE Gallery SHALL 循环到最后一张
5. WHEN 到达末张图片点击 next THEN THE Gallery SHALL 循环到第一张
6. THE Gallery SHALL 显示当前图片索引（如 3/10）

### Requirement 5: 信息面板

**User Story:** 作为访客，我希望查看项目的详细信息，以便了解项目背景和描述。

#### Acceptance Criteria

1. THE Info_Panel SHALL 显示项目标题
2. THE Info_Panel SHALL 显示项目年份
3. THE Info_Panel SHALL 显示客户名称（如有）
4. THE Info_Panel SHALL 显示标签列表（如有）
5. THE Info_Panel SHALL 渲染 MDX 正文内容
