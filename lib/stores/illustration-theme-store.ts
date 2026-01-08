"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 插画风格主题配置类型
 */
export interface IllustrationThemeConfig {
  // 基础配置
  siteName: string;
  aboutText: string;
  aboutSubtext: string;
  
  // 颜色配置
  background: string;
  textColor: string;
  secondaryTextColor: string;
  accentColor: string;
  borderColor: string;
  
  // 字体配置
  fontFamily: string;
  
  // 可扩展的自定义配置
  custom?: Record<string, unknown>;
}

/**
 * 插画风格主题配置存储
 * 
 * 提供自定义配置接口，允许用户调整：
 * - 站点名称和介绍文字
 * - 颜色方案
 * - 字体
 * - 背景样式
 */

// 预设背景选项 - 更深色的配色方案
export const illustrationBackgrounds = {
  warm: {
    name: "温暖米色",
    value: "#F4F1E8",
  },
  cream: {
    name: "奶油白",
    value: "#FFF9F0",
  },
  beige: {
    name: "浅米色",
    value: "#F5F5DC",
  },
  paper: {
    name: "纸张白",
    value: "#FFFEF9",
  },
  lightGray: {
    name: "浅灰",
    value: "#F8F9FA",
  },
  warmGray: {
    name: "暖灰",
    value: "#F1F3F4",
  },
} as const;

export type IllustrationBackgroundKey = keyof typeof illustrationBackgrounds;

// 预设强调色 - 更丰富的颜色选择
export const illustrationAccentColors = {
  coral: { name: "珊瑚橙", value: "#E17055" },
  darkBlue: { name: "深蓝", value: "#2D3436" },
  forestGreen: { name: "森林绿", value: "#00B894" },
  purple: { name: "紫色", value: "#6C5CE7" },
  warmRed: { name: "暖红", value: "#E84393" },
  golden: { name: "金色", value: "#F39C12" },
  teal: { name: "青色", value: "#00CEC9" },
  brown: { name: "棕色", value: "#A0522D" },
} as const;

export type IllustrationAccentKey = keyof typeof illustrationAccentColors;

// 默认配置 - 参考 marianopascual.me 的深色配色
const defaultConfig: IllustrationThemeConfig = {
  siteName: "Rainbow",
  aboutText: "Welcome to my creative portfolio. I'm a designer and illustrator passionate about creating meaningful visual experiences.",
  aboutSubtext: "Feel free to explore my projects and get in touch if you'd like to collaborate.",
  background: "#F4F1E8", // 温暖的米色背景
  textColor: "#2D3436", // 深灰色文字
  secondaryTextColor: "#636E72", // 中灰色文字
  accentColor: "#E17055", // 珊瑚色强调
  borderColor: "#2D3436", // 深色边框
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
};

interface IllustrationThemeState {
  config: IllustrationThemeConfig;
  
  // 更新整个配置
  setConfig: (config: Partial<IllustrationThemeConfig>) => void;
  
  // 快捷方法
  setBackground: (bg: string) => void;
  setAccentColor: (color: string) => void;
  setSiteName: (name: string) => void;
  setAboutText: (text: string) => void;
  setAboutSubtext: (text: string) => void;
  setFontFamily: (font: string) => void;
  
  // 重置为默认
  reset: () => void;
}

export const useIllustrationThemeStore = create<IllustrationThemeState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      
      setConfig: (partial) =>
        set((state) => ({
          config: { ...state.config, ...partial },
        })),
      
      setBackground: (bg) =>
        set((state) => ({
          config: { ...state.config, background: bg },
        })),
      
      setAccentColor: (color) =>
        set((state) => ({
          config: { ...state.config, accentColor: color },
        })),
      
      setSiteName: (name) =>
        set((state) => ({
          config: { ...state.config, siteName: name },
        })),
      
      setAboutText: (text) =>
        set((state) => ({
          config: { ...state.config, aboutText: text },
        })),
      
      setAboutSubtext: (text) =>
        set((state) => ({
          config: { ...state.config, aboutSubtext: text },
        })),
      
      setFontFamily: (font) =>
        set((state) => ({
          config: { ...state.config, fontFamily: font },
        })),
      
      reset: () => set({ config: defaultConfig }),
    }),
    {
      name: "illustration-theme-config",
    }
  )
);
