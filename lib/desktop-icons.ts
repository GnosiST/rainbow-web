import React from "react";
import { MacIcons } from "@/components/icons/MacIcons";
import { SketchIcons } from "@/components/icons/SketchIcons";
import type { DesktopTheme } from "@/lib/stores/theme-store";

type WindowType = "about" | "projects" | "project" | "photos" | "slideshow" | "settings";

export interface DesktopIconConfig {
  type: WindowType | "shop" | "mail";
  label: string;
  icon: React.ReactNode;
  href?: string;
}

// 图标映射类型
type IconKey = "about" | "folder" | "photos" | "slideshow" | "settings" | "shop" | "mail";

// Sketch 图标 Props 类型
interface SketchIconProps {
  className?: string;
  size?: number;
}

// 获取图标组件
function getIconComponent(
  key: IconKey,
  theme: DesktopTheme
): React.ReactNode {
  // 插画主题
  if (theme === "illustration") {
    const iconMap: Record<IconKey, React.ComponentType<SketchIconProps> | undefined> = {
      about: SketchIcons.About,
      folder: SketchIcons.Folder,
      photos: SketchIcons.Photos,
      slideshow: SketchIcons.Slideshow,
      settings: SketchIcons.Settings,
      shop: SketchIcons.Shop,
      mail: SketchIcons.Mail,
    };
    
    const IconComponent = iconMap[key];
    if (IconComponent) {
      return React.createElement(IconComponent, { size: 48 });
    }
  }
  
  // macOS / Windows 主题使用默认图标
  const defaultIconMap: Record<IconKey, React.ComponentType> = {
    about: MacIcons.About,
    folder: MacIcons.Folder,
    photos: MacIcons.Photos,
    slideshow: MacIcons.Slideshow,
    settings: MacIcons.Settings,
    shop: MacIcons.Shop,
    mail: MacIcons.Mail,
  };
  
  return React.createElement(defaultIconMap[key]);
}

// 获取桌面图标配置
export function getDesktopIcons(
  theme: DesktopTheme
): DesktopIconConfig[] {
  return [
    { 
      type: "about", 
      label: "About", 
      icon: getIconComponent("about", theme) 
    },
    { 
      type: "projects", 
      label: "Projects", 
      icon: getIconComponent("folder", theme) 
    },
    { 
      type: "photos", 
      label: "Photos", 
      icon: getIconComponent("photos", theme) 
    },
    { 
      type: "slideshow", 
      label: "Slideshow", 
      icon: getIconComponent("slideshow", theme) 
    },
    { 
      type: "settings", 
      label: "Settings", 
      icon: getIconComponent("settings", theme) 
    },
    { 
      type: "shop", 
      label: "Shop", 
      icon: getIconComponent("shop", theme),
      href: "https://shop.example.com" 
    },
    { 
      type: "mail", 
      label: "Mail", 
      icon: getIconComponent("mail", theme),
      href: "mailto:hello@example.com" 
    },
  ];
}

// 保留旧的导出以兼容现有代码
export const desktopIcons: DesktopIconConfig[] = [
  { type: "about", label: "About", icon: React.createElement(MacIcons.About) },
  { type: "projects", label: "Projects", icon: React.createElement(MacIcons.Folder) },
  { type: "photos", label: "Photos", icon: React.createElement(MacIcons.Photos) },
  { type: "slideshow", label: "Slideshow", icon: React.createElement(MacIcons.Slideshow) },
  { type: "settings", label: "Settings", icon: React.createElement(MacIcons.Settings) },
  { type: "shop", label: "Shop", icon: React.createElement(MacIcons.Shop), href: "https://shop.example.com" },
  { type: "mail", label: "Mail", icon: React.createElement(MacIcons.Mail), href: "mailto:hello@example.com" },
];
