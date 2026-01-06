# Implementation Plan: M5 Slideshow & Photos/Gallery

## Overview

实现 Slideshow 精选项目轮播和 Photos/Gallery 可购买作品列表功能。

## Tasks

- [ ] 1. 扩展内容系统支持 featured
  - [ ] 1.1 更新示例项目
    - 为部分项目添加 featured: true
    - _Requirements: 1.1_
  - [ ] 1.2 更新 build-index 脚本
    - 生成 featured 项目列表
    - _Requirements: 1.2_

- [ ] 2. 实现 Slideshow Window
  - [ ] 2.1 创建基础结构
    - 读取 featured 项目列表
    - 管理当前索引状态
    - _Requirements: 1.3_
  - [ ] 2.2 实现显示区域
    - 封面图展示
    - 标题显示
    - _Requirements: 2.1, 2.2_
  - [ ] 2.3 实现导航
    - prev/next 按钮
    - 循环逻辑
    - _Requirements: 2.3, 2.4, 2.5, 2.6_
  - [ ] 2.4 实现 Open Project
    - 打开当前项目的 ProjectWindow
    - _Requirements: 3.1, 3.2_

- [ ]* 3. Slideshow 属性测试
  - [ ]* 3.1 测试索引循环
    - **Property 1: Slideshow 索引循环**
    - **Validates: Requirements 2.3, 2.4, 2.5, 2.6**

- [ ] 4. 创建 Photos 数据
  - [ ] 4.1 创建数据文件
    - content/photos.json
    - 添加示例数据
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 5. 实现 Photos Window
  - [ ] 5.1 创建基础结构
    - 读取 photos 数据
    - 网格布局
    - _Requirements: 5.1_
  - [ ] 5.2 实现作品卡片
    - 图片、标题、年份、尺寸
    - _Requirements: 5.2, 5.3_
  - [ ] 5.3 实现购买按钮
    - 新标签页打开 shopUrl
    - 无 URL 时禁用
    - _Requirements: 5.4, 6.1, 6.2_

- [ ] 6. 集成到 WindowFrame
  - [ ] 6.1 更新 WindowContent
    - 添加 slideshow 和 photos 类型处理
    - _Requirements: 1.3_

- [ ] 7. Checkpoint - Slideshow & Photos 验收
  - 确保 Slideshow 可连续浏览
  - 确保 Open Project 正常打开项目窗口
  - 确保 Photos 列表正确显示
  - 确保外链在新标签页打开
  - 如有问题请提出

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Slideshow 和 Gallery 的导航逻辑与 M3 的 Gallery 类似，可复用
- 外链使用 window.open(url, '_blank') 或 <a target="_blank">
