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
const windowTypes: WindowType[] = ["about", "projects", "photos", "slideshow", "settings"];

export function Dock() {
  const { open } = useWindowStore();

  const handleClick = (item: DockItem) => {
    if (item.href) {
      window.open(item.href, '_blank');
    } else if (windowTypes.includes(item.type as WindowType)) {
      open(item.type as WindowType);
    } else {
      console.log(`Action not implemented: ${item.type}`);
    }
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-end gap-1 px-2 py-1 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl">
        {/* 主要应用 */}
        {dockItems.map((item) => (
          <DockIcon key={item.type} item={item} onClick={() => handleClick(item)} />
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

function DockIcon({ item, onClick }: { item: DockItem; onClick: () => void }) {
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
      
      {/* 运行指示点（可选） */}
      {/* <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full" /> */}
    </div>
  );
}
