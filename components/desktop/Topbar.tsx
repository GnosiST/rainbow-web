"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/stores/theme-store";

interface TopbarProps {
  className?: string;
}

const menuItems = [
  { label: "Finder" },
  { label: "File" },
  { label: "Edit" },
  { label: "View" },
  { label: "Go" },
  { label: "Window" },
  { label: "Help" },
];

export function Topbar({ className = "" }: TopbarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const { theme } = useThemeStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("zh-CN", { weekday: "short", month: "short", day: "numeric" }) +
        " " +
        now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Windows 风格和插画风格不显示顶栏
  if (theme === "windows" || theme === "illustration") {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-6 bg-black/30 backdrop-blur-xl ${className}`}>
      <div className="flex items-center justify-between h-full px-3">
        {/* 左侧：苹果 logo + 菜单项 */}
        <div className="flex items-center space-x-4">
          {/* Apple Logo */}
          <button className="text-white/90 hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </button>
          
          {/* 菜单项 */}
          {menuItems.map((menu, index) => (
            <button
              key={menu.label}
              className={`text-[13px] ${index === 0 ? 'font-semibold' : 'font-normal'} text-white/90 hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors`}
            >
              {menu.label}
            </button>
          ))}
        </div>
        
        {/* 右侧：系统图标 + 时间 */}
        <div className="flex items-center space-x-3">
          {/* 电池图标 */}
          <span className="text-white/80 text-sm">🔋</span>
          {/* WiFi 图标 */}
          <span className="text-white/80 text-sm">📶</span>
          {/* 搜索图标 */}
          <span className="text-white/80 text-sm">🔍</span>
          {/* 控制中心 */}
          <span className="text-white/80 text-sm">⚙️</span>
          {/* 时间 */}
          <span className="text-[13px] text-white/90 font-normal">
            {currentTime}
          </span>
        </div>
      </div>
    </div>
  );
}