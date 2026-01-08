# Requirements Document

## Introduction

M7 里程碑：实现 SEO 优化、图片性能优化、测试覆盖和生产部署，确保网站可被搜索引擎索引并稳定运行。

## Glossary

- **SEO**: 搜索引擎优化
- **Sitemap**: 站点地图，帮助搜索引擎发现页面
- **OG_Tags**: Open Graph 标签，用于社交媒体分享预览
- **Media_Pipeline**: 图片处理管线，生成多尺寸图片

## Requirements

### Requirement 1: 站点 SEO

**User Story:** 作为站点维护者，我希望网站能被搜索引擎正确索引，以便获得更多访问。

#### Acceptance Criteria

1. THE Next_App SHALL 配置站点级 metadata（title、description）
2. THE Next_App SHALL 配置 Open Graph 标签
3. THE Next_App SHALL 生成 robots.txt 文件
4. THE Next_App SHALL 生成 sitemap.xml 文件
5. THE Sitemap SHALL 包含首页和所有项目页面

### Requirement 2: 项目 SEO 落地页

**User Story:** 作为站点维护者，我希望每个项目有独立的 SEO 页面，以便项目能被单独索引和分享。

#### Acceptance Criteria

1. THE Next_App SHALL 提供 /p/[slug] 路由
2. THE Project_Page SHALL 渲染项目内容（可复用 ProjectWindow 内容）
3. THE Project_Page SHALL 配置项目级 metadata
4. THE Project_Page SHALL 可独立访问和分享

### Requirement 3: 图片优化

**User Story:** 作为访客，我希望图片加载快速，以便获得流畅的浏览体验。

#### Acceptance Criteria

1. THE Media_Pipeline SHALL 生成多尺寸图片（thumb、md、lg）
2. THE Media_Pipeline SHALL 生成 WebP 格式
3. THE Next_App SHALL 使用 Next/Image 组件
4. THE Gallery SHALL 仅预加载当前和下一张图片

### Requirement 4: 测试覆盖

**User Story:** 作为开发者，我希望有自动化测试，以便确保功能正确且无回归。

#### Acceptance Criteria

1. THE Test_Suite SHALL 包含 windowStore 单元测试
2. THE Test_Suite SHALL 包含 uiStore 单元测试
3. THE Test_Suite SHALL 包含 E2E 测试覆盖关键路径
4. THE E2E_Tests SHALL 测试窗口打开/拖拽/置顶/最大化
5. THE E2E_Tests SHALL 测试主题切换和 reset

### Requirement 5: 生产部署

**User Story:** 作为站点维护者，我希望能够安全稳定地部署网站，以便用户可以访问。

#### Acceptance Criteria

1. THE Server SHALL 配置 HTTPS（certbot）
2. THE Server SHALL 仅开放 80/443/22 端口
3. THE Deploy_Process SHALL 支持一键更新
4. THE Deploy_Process SHALL 支持回滚到上一版本
5. THE Production_Site SHALL 通过 /api/health 返回 200
