import React from "react";

/**
 * 插画风格主题接口
 * 
 * 使用步骤：
 * 1. 创建图标组件文件（如 components/icons/MyIllustrationIcons.tsx）
 * 2. 创建主题配置文件（如 lib/themes/my-illustration-theme.ts）
 * 3. 在 theme-config.ts 中注册主题
 * 4. 在设置窗口中选择主题
 */

export interface IllustrationTheme {
  /** 主题唯一标识 */
  id: string;
  /** 主题显示名称 */
  name: string;
  /** 主题描述 */
  description?: string;
  /** 预览图片 URL */
  preview?: string;
  
  /** 图标组件定义 */
  icons: {
    finder?: React.ComponentType;
    folder?: React.ComponentType;
    photos?: React.ComponentType;
    settings?: React.ComponentType;
    slideshow?: React.ComponentType;
    shop?: React.ComponentType;
    mail?: React.ComponentType;
    about?: React.ComponentType;
    safari?: React.ComponentType;
    launchpad?: React.ComponentType;
    trash?: React.ComponentType;
  };
  
  /** 背景元素（可选，用于装饰） */
  backgroundElements?: React.ComponentType[];
  
  /** 配色方案 */
  colors: {
    /** 主色 */
    primary: string;
    /** 次要色 */
    secondary: string;
    /** 背景色 */
    background: string;
    /** 强调色 */
    accent: string;
    /** 文字色 */
    text?: string;
    /** 次要文字色 */
    textSecondary?: string;
  };
  
  /** 背景样式 */
  backgroundStyle?: {
    /** CSS 背景值 */
    background: string;
    /** 纹理叠加（可选） */
    texture?: string;
  };
  
  /** 窗口样式 */
  windowStyle?: {
    /** 边框圆角 */
    borderRadius: string;
    /** 标题栏背景 */
    titleBarBg: string;
    /** 边框颜色 */
    borderColor: string;
  };
}

/**
 * 示例：如何创建一个插画主题
 * 
 * ```typescript
 * // 1. 创建图标组件 (components/icons/SketchIcons.tsx)
 * export const SketchIcons = {
 *   Finder: () => (
 *     <svg viewBox="0 0 64 64" className="w-full h-full">
 *       // 手绘风格的 SVG 路径
 *     </svg>
 *   ),
 *   // ... 其他图标
 * };
 * 
 * // 2. 创建主题配置 (lib/themes/sketch-theme.ts)
 * import { SketchIcons } from "@/components/icons/SketchIcons";
 * import { IllustrationTheme } from "./illustration-theme";
 * 
 * export const sketchTheme: IllustrationTheme = {
 *   id: "sketch",
 *   name: "Sketch Style",
 *   description: "手绘素描风格",
 *   icons: SketchIcons,
 *   colors: {
 *     primary: "#2D3436",
 *     secondary: "#636E72",
 *     background: "#FFF9F0",
 *     accent: "#E17055",
 *   },
 *   backgroundStyle: {
 *     background: "#FFF9F0",
 *     texture: "url('/textures/paper.png')",
 *   },
 * };
 * 
 * // 3. 在 theme-config.ts 中注册
 * import { sketchTheme } from "./themes/sketch-theme";
 * export const illustrationThemes = [sketchTheme];
 * ```
 */

/** 已注册的插画主题列表 */
export const illustrationThemes: IllustrationTheme[] = [];

// 动态导入并注册主题（避免循环依赖）
import("./sketch-theme").then(({ sketchTheme }) => {
  registerIllustrationTheme(sketchTheme);
});

/** 根据 ID 获取插画主题 */
export function getIllustrationTheme(id: string): IllustrationTheme | undefined {
  return illustrationThemes.find((theme) => theme.id === id);
}

/** 注册新的插画主题 */
export function registerIllustrationTheme(theme: IllustrationTheme): void {
  const existingIndex = illustrationThemes.findIndex((t) => t.id === theme.id);
  if (existingIndex >= 0) {
    illustrationThemes[existingIndex] = theme;
  } else {
    illustrationThemes.push(theme);
  }
}
