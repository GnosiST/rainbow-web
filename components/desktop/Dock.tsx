"use client";

import React from "react";
import { MacIcons } from "@/components/icons/MacIcons";
import { useWindowStore, WindowType } from "@/lib/stores/window-store";

interface DockItem {
  type: WindowType | "shop" | "mail" | "finder" | "safari" | "launchpad" | "trash";
  label: string;
  icon: React.ReactNode;
  href?: string;
}

const dockItems: DockItem[] = [
  { type: "finder", label: "Finder", icon: <MacIcons.Finder /> },
  { type: "safari", label: "Safari", icon: <MacIcons.Safari /> },
  { type: "about", label: "About", icon: <MacIcons.About /> },
  { type: "projects", label: "Projects", icon: <MacIcons.Folder /> },
  { type: "photos", label: "Photos", icon: <MacIcons.Photos /> },
  { type: "slideshow", label: "Slideshow", icon: <MacIcons.Slideshow /> },
  { type: "image-studio", label: "Image Studio", icon: <MacIcons.Photos /> },
  { type: "settings", label: "Settings", icon: <MacIcons.Settings /> },
  { type: "shop", label: "Shop", icon: <MacIcons.Shop />, href: "https://shop.example.com" },
  { type: "mail", label: "Mail", icon: <MacIcons.Mail />, href: "mailto:hello@example.com" },
];

// 分隔线右侧的项目
const dockRightItems: DockItem[] = [
  { type: "launchpad", label: "Launchpad", icon: <MacIcons.Launchpad /> },
  { type: "trash", label: "Trash", icon: <MacIcons.Trash /> },
];

// 可以打开窗口的类型
const windowTypes: WindowType[] = ["about", "projects", "photos", "slideshow", "settings", "image-studio"];

export function Dock() {
  const { windows, open, focus, minimize, restore } = useWindowStore();

  const handleClick = (item: DockItem) => {
    if (item.href) {
      window.open(item.href, '_blank');
    } else if (windowTypes.includes(item.type as WindowType)) {
      // 查找该类型的窗口
      const existingWindows = windows.filter((w) => w.type === item.type);
      
      if (existingWindows.length === 0) {
        // 没有打开的窗口，打开新窗口
        open(item.type as WindowType);
      } else {
        // 找到第一个该类型的窗口
        const targetWindow = existingWindows[0];
        
        if (targetWindow.isMinimized) {
          // 如果是最小化的，恢复它
          restore(targetWindow.id);
        } else if (targetWindow.id === useWindowStore.getState().activeId) {
          // 如果是当前活动窗口，最小化它
          minimize(targetWindow.id);
        } else {
          // 否则聚焦它
          focus(targetWindow.id);
        }
      }
    } else {
      console.log(`Action not implemented: ${item.type}`);
    }
  };

  // 检查某个类型是否有打开的窗口（包括最小化的）
  const hasOpenWindow = (type: WindowType) => {
    return windows.some((w) => w.type === type);
  };

  // 检查某个类型是否有最小化的窗口
  const hasMinimizedWindow = (type: WindowType) => {
    return windows.some((w) => w.type === type && w.isMinimized);
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-end gap-1 px-2 py-1 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl">
        {/* 主要应用 */}
        {dockItems.map((item) => (
          <DockIcon 
            key={item.type} 
            item={item} 
            onClick={() => handleClick(item)}
            hasOpenWindow={windowTypes.includes(item.type as WindowType) && hasOpenWindow(item.type as WindowType)}
            hasMinimizedWindow={windowTypes.includes(item.type as WindowType) && hasMinimizedWindow(item.type as WindowType)}
          />
        ))}
        
        {/* 分隔线 */}
        <div className="w-px h-12 bg-white/30 mx-1" />
        
        {/* 右侧项目 */}
        {dockRightItems.map((item) => (
          <DockIcon key={item.type} item={item} onClick={() => handleClick(item)} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({ 
  item, 
  onClick, 
  hasOpenWindow = false,
  hasMinimizedWindow = false
}: { 
  item: DockItem; 
  onClick: () => void;
  hasOpenWindow?: boolean;
  hasMinimizedWindow?: boolean;
}) {
  return (
    <div className="relative group">
      {/* Tooltip */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {item.label}
      </div>
      
      {/* 图标 */}
      <button
        onClick={onClick}
        className="w-12 h-12 rounded-xl overflow-hidden transition-all duration-200 ease-out group-hover:scale-125 group-hover:-translate-y-2 group-active:scale-110"
      >
        {item.icon}
      </button>
      
      {/* 运行指示点 - 显示在打开的窗口下方 */}
      {hasOpenWindow && (
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
          hasMinimizedWindow ? "bg-white/40" : "bg-white/60"
        }`} />
      )}
    </div>
  );
}
