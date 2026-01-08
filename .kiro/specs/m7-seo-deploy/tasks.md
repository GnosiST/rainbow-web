# Implementation Plan: M7 SEO、性能、测试、上线

## Overview

实现 SEO 优化、图片性能优化、测试覆盖和生产部署，确保网站可被搜索引擎索引并稳定运行。

## Tasks

- [ ] 1. 配置站点 SEO
  - [ ] 1.1 配置站点 metadata
    - title、description、openGraph
    - _Requirements: 1.1, 1.2_
  - [ ] 1.2 创建 robots.txt
    - 允许所有爬虫
    - _Requirements: 1.3_
  - [ ] 1.3 创建 sitemap.ts
    - 包含首页和项目页
    - _Requirements: 1.4, 1.5_

- [ ] 2. 实现项目 SEO 落地页
  - [ ] 2.1 创建 /p/[slug] 路由
    - generateStaticParams
    - generateMetadata
    - _Requirements: 2.1, 2.3_
  - [ ] 2.2 实现页面内容
    - 复用项目展示组件
    - _Requirements: 2.2, 2.4_

- [ ] 3. 实现图片优化管线
  - [ ] 3.1 创建 build-media 脚本
    - 读取原图
    - 生成 thumb/md/lg 尺寸
    - 输出 WebP 格式
    - _Requirements: 3.1, 3.2_
  - [ ] 3.2 配置构建流程
    - 添加 prebuild script
    - _Requirements: 3.1_
  - [ ] 3.3 更新 Gallery 组件
    - 使用 Next/Image
    - 预加载策略
    - _Requirements: 3.3, 3.4_

- [ ] 4. 配置测试框架
  - [ ] 4.1 安装 Vitest
    - 配置 vitest.config.ts
    - _Requirements: 4.1, 4.2_
  - [ ] 4.2 安装 Playwright
    - 配置 playwright.config.ts
    - _Requirements: 4.3_

- [ ]* 5. 编写单元测试
  - [ ]* 5.1 windowStore 测试
    - open/close/focus/toggleMax
    - _Requirements: 4.1_
  - [ ]* 5.2 uiStore 测试
    - 持久化/reset
    - _Requirements: 4.2_

- [ ]* 6. 编写 E2E 测试
  - [ ]* 6.1 窗口操作测试
    - 打开/拖拽/置顶/最大化
    - _Requirements: 4.4_
  - [ ]* 6.2 设置功能测试
    - 主题切换/reset
    - _Requirements: 4.5_
  - [ ]* 6.3 项目浏览测试
    - 打开项目/切图
    - _Requirements: 4.3_

- [ ] 7. Checkpoint - 测试验收
  - 确保单元测试通过
  - 确保 E2E 测试通过
  - 如有问题请提出

- [ ] 8. 配置生产部署
  - [ ] 8.1 服务器初始化
    - 创建用户、配置 SSH
    - 防火墙规则
    - _Requirements: 5.2_
  - [ ] 8.2 配置 HTTPS
    - 安装 certbot
    - 配置 SSL 证书
    - _Requirements: 5.1_
  - [ ] 8.3 创建部署脚本
    - git pull -> docker build -> docker compose up
    - _Requirements: 5.3_
  - [ ] 8.4 创建回滚脚本
    - 保留上一版本镜像
    - 一键回滚
    - _Requirements: 5.4_

- [ ] 9. 生产部署验收
  - [ ] 9.1 部署到服务器
    - 执行部署脚本
    - _Requirements: 5.3_
  - [ ] 9.2 验证功能
    - 访问首页
    - 验证 /api/health
    - 验证 HTTPS
    - _Requirements: 5.5_

- [ ] 10. Final Checkpoint - 上线验收
  - 确保站点稳定可访问
  - 确保 /api/health 返回 200
  - 确保 HTTPS 正常
  - 确保 sitemap 可访问
  - 如有问题请提出

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 图片管线使用 sharp 库
- 测试框架推荐 Vitest + Playwright
- 部署脚本可使用 shell script 或 Makefile
