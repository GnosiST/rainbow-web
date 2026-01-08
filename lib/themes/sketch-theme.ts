import {
  SketchFolderIcon,
  SketchPhotosIcon,
  SketchSettingsIcon,
  SketchSlideshowIcon,
  SketchAboutIcon,
  SketchSafariIcon,
  SketchTrashIcon,
  SketchMailIcon,
  SketchShopIcon,
  SketchLaunchpadIcon,
} from "@/components/icons/SketchIcons";
import type { IllustrationTheme } from "./illustration-theme";

/**
 * 素描手绘风格主题
 * 
 * 特点：
 * - 不规则线条，模拟手绘效果
 * - 柔和的暖色调配色
 * - 纸张质感背景
 */
export const sketchTheme: IllustrationTheme = {
  id: "sketch",
  name: "Sketch Style",
  description: "手绘素描风格，温暖柔和的配色",
  
  icons: {
    folder: SketchFolderIcon,
    photos: SketchPhotosIcon,
    settings: SketchSettingsIcon,
    slideshow: SketchSlideshowIcon,
    about: SketchAboutIcon,
    safari: SketchSafariIcon,
    trash: SketchTrashIcon,
    mail: SketchMailIcon,
    shop: SketchShopIcon,
    launchpad: SketchLaunchpadIcon,
  },
  
  colors: {
    primary: "#2D3436",      // 深灰色 - 主要线条
    secondary: "#636E72",    // 中灰色 - 次要元素
    background: "#FFF9F0",   // 米白色 - 纸张背景
    accent: "#E17055",       // 珊瑚红 - 强调色
    text: "#2D3436",         // 深灰色 - 文字
    textSecondary: "#636E72", // 中灰色 - 次要文字
  },
  
  backgroundStyle: {
    background: `
      linear-gradient(180deg, #FFF9F0 0%, #F5EDE0 100%)
    `,
    // 可选：添加纸张纹理
    // texture: "url('/textures/paper.png')",
  },
  
  windowStyle: {
    borderRadius: "12px",
    titleBarBg: "#FFF9F0",
    borderColor: "#2D3436",
  },
};
