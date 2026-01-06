# Implementation Plan: M0 工程与部署骨架

## Overview

本任务列表覆盖 M0 里程碑的所有工作，包括 Next.js 项目初始化、核心依赖安装、Docker 容器化和 Nginx 反向代理配置。

## Tasks

- [-] 1. 初始化 Next.js 项目
  - [-] 1.1 创建 Next.js App Router 项目（TypeScript + Tailwind + ESLint）
    - 使用 create-next-app 或手动配置
    - 确保 App Router 模式
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ] 1.2 验证开发服务器启动
    - 执行 npm run dev 确认无错误
    - _Requirements: 1.5_

- [ ] 2. 安装核心依赖
  - [ ] 2.1 安装状态管理和动画库
    - zustand、framer-motion
    - _Requirements: 2.1, 2.2_
  - [ ] 2.2 安装内容和图片处理库
    - gray-matter、sharp
    - _Requirements: 2.3, 2.4_

- [ ] 3. 配置 Tailwind 和全局样式
  - [ ] 3.1 配置 tailwind.config.ts
    - 设置 content 路径
    - 添加自定义主题扩展（为后续 Settings 功能预留）
    - _Requirements: 1.3_
  - [ ] 3.2 配置 globals.css
    - 引入 Tailwind 指令
    - 添加 CSS 变量占位（--brightness, --filter）
    - _Requirements: 1.3_

- [ ] 4. 实现健康检查接口
  - [ ] 4.1 创建 /api/health 路由
    - 返回 { status, timestamp }
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ]* 4.2 编写 Health API 单元测试
    - 验证响应格式
    - **Property 1: Health API 响应格式一致性**
    - **Validates: Requirements 3.1, 3.2, 3.3**

- [ ] 5. Checkpoint - 本地开发环境验收
  - 确保 npm run dev 可运行
  - 确保 GET /api/health 返回 200
  - 如有问题请提出

- [ ] 6. 配置 Docker 生产构建
  - [ ] 6.1 配置 next.config.ts standalone 模式
    - 设置 output: "standalone"
    - _Requirements: 4.1_
  - [ ] 6.2 创建 Dockerfile
    - 多阶段构建：deps -> builder -> runner
    - 基于 node:20-alpine
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 7. 配置 Docker Compose
  - [ ] 7.1 创建 docker-compose.yml
    - 定义 app 服务
    - 定义 nginx 服务
    - 配置网络
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 8. 配置 Nginx 反向代理
  - [ ] 8.1 创建 nginx/conf.d/site.conf
    - upstream 配置
    - 反向代理规则
    - 静态资源缓存
    - gzip 压缩
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9. Checkpoint - Docker 部署验收
  - 执行 docker compose up -d
  - 验证首页可访问
  - 验证 /api/health 通过 Nginx 返回正确响应
  - 如有问题请提出

- [ ] 10. 创建部署文档
  - [ ] 10.1 编写 DEPLOY.md
    - 构建命令
    - 启动命令
    - 更新流程
    - 回滚流程
    - _Requirements: 5.3, 5.4_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 本里程碑完成后，项目具备完整的开发和部署能力
- 后续里程碑（M1-M6）将在此基础上构建功能
