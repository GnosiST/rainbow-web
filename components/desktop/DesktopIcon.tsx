"use client";

import React from "react";
import { DesktopTheme } from "@/lib/stores/theme-store";
import { useWindowStore, WindowType } from "@/lib/stores/window-store";

interface DesktopIconProps {
  type: WindowType | "shop" | "mail";
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  theme?: DesktopTheme;
}

export function DesktopIcon({ type, label, icon, href, onClick, theme = "macos" }: DesktopIconProps) {
  const { open } = useWindowStore();

  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    } else if (onClick) {
      onClick();
    } else if (type !== "shop" && type !== "mail") {
      // 打开窗口
      open(type as WindowType);
    }
  };

  // 插画风格
  if (theme === "illustration") {
    return (
      <div 
        className="flex flex-col items-center justify-center w-20 cursor-pointer group"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center w-16 h-16 bg-[#FFF9F0]/80 backdrop-blur-sm rounded-xl shadow-md border-2 border-[#2D3436]/20 group-hover:scale-110 group-hover:shadow-lg group-hover:border-[#E17055]/50 group-active:scale-95 transition-all duration-200">
          {icon}
        </div>
        <span className="mt-2 px-2 py-0.5 text-[11px] text-[#2D3436] font-medium text-center leading-tight bg-[#FFF9F0]/80 rounded backdrop-blur-sm border border-[#2D3436]/10">
          {label}
        </span>
      </div>
    );
  }

  // macOS 风格
  if (theme === "macos") {
    return (
      <div 
        className="flex flex-col items-center justify-center w-20 cursor-pointer group"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center w-16 h-16 text-3xl bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 group-hover:scale-110 group-hover:shadow-xl group-active:scale-95 transition-all duration-200">
          {icon}
        </div>
        <span className="mt-2 px-2 py-0.5 text-[11px] text-white font-medium text-center leading-tight bg-black/30 rounded backdrop-blur-sm">
          {label}
        </span>
      </div>
    );
  }

  // Windows 风格
  return (
    <div 
      className="flex flex-col items-center justify-center w-20 cursor-pointer group p-2 hover:bg-white/10 rounded"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-12 h-12 text-3xl group-hover:scale-105 group-active:scale-95 transition-all duration-150">
        {icon}
      </div>
      <span className="mt-1 text-[11px] text-white font-normal text-center leading-tight drop-shadow-lg">
        {label}
      </span>
    </div>
  );
}