# Implementation Plan: M3 Projects & ProjectWindow

## Overview

实现项目内容系统，包括索引生成、项目列表窗口和项目详情窗口。

## Tasks

- [x] 1. 创建内容索引系统
  - [x] 1.1 创建示例项目 MDX 文件
    - 创建 content/projects/ 目录
    - 添加至少 3 个示例项目
    - 包含完整 frontmatter
    - _Requirements: 1.1_
  - [x] 1.2 实现 build-index 脚本
    - 读取 MDX 文件
    - 解析 frontmatter（gray-matter）
    - 生成 projects.index.json
    - _Requirements: 1.2, 1.3_
  - [x] 1.3 配置构建流程
    - 添加 prebuild script
    - 确保构建前自动执行
    - _Requirements: 1.4_

- [x] 2. 实现 ProjectsWindow
  - [x] 2.1 创建基础组件
    - 读取项目索引
    - 网格布局
    - _Requirements: 2.1_
  - [x] 2.2 实现项目卡片
    - 封面图、标题、年份
    - 文件夹风格设计
    - _Requirements: 2.2, 2.4_
  - [x] 2.3 实现点击打开
    - 调用 windowStore.open("project", { slug })
    - _Requirements: 2.3_

- [x] 3. 实现 ProjectWindow
  - [x] 3.1 创建基础结构
    - 接收 slug 参数
    - 加载项目数据
    - _Requirements: 3.1_
  - [x] 3.2 实现布局
    - Gallery 区域
    - InfoPanel 区域
    - _Requirements: 3.2, 3.3_
  - [x] 3.3 更新标题栏
    - 显示项目名称
    - _Requirements: 3.4_

- [x] 4. 实现 Gallery 组件
  - [x] 4.1 创建基础结构
    - 显示当前图片
    - 图片索引显示
    - _Requirements: 4.1, 4.6_
  - [x] 4.2 实现导航
    - prev/next 按钮
    - 循环逻辑
    - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ]* 5. Gallery 属性测试
  - [ ]* 5.1 测试索引循环
    - **Property 1: 画廊索引循环**
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.5**

- [x] 6. 实现 InfoPanel 组件
  - [x] 6.1 创建基础结构
    - 标题、年份、客户、标签
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [x] 6.2 渲染 MDX 内容
    - 使用 react-markdown 或类似库
    - _Requirements: 5.5_

- [x] 7. 集成到 WindowFrame
  - [x] 7.1 更新 WindowContent
    - 添加 projects 和 project 类型处理
    - 传递 payload 参数
    - _Requirements: 3.1_

- [x] 8. Checkpoint - Projects 功能验收
  - 确保项目列表正确显示 ✓
  - 确保点击项目打开详情窗口 ✓
  - 确保画廊导航正常 ✓
  - 确保信息面板显示完整 ✓
  - 至少 6 个项目可完整浏览 ✓
  - 如有问题请提出

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 图片路径暂时使用占位图，M6 会实现完整图片管线
- MDX 渲染可使用 react-markdown + remark-gfm
