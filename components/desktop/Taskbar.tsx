"use client";

import React, { useState, useEffect } from "react";
import { MacIcons } from "@/components/icons/MacIcons";
import { useWindowStore, WindowType } from "@/lib/stores/window-store";

interface TaskbarItem {
  type: WindowType | "shop" | "mail" | "finder" | "start";
  label: string;
  icon: React.ReactNode;
  href?: string;
}

const taskbarItems: TaskbarItem[] = [
  { type: "finder", label: "文件资源管理器", icon: <MacIcons.Folder /> },
  { type: "about", label: "关于", icon: <MacIcons.About /> },
  { type: "projects", label: "项目", icon: <MacIcons.Folder /> },
  { type: "photos", label: "照片", icon: <MacIcons.Photos /> },
  { type: "image-studio", label: "图像工作室", icon: <MacIcons.Photos /> },
  { type: "settings", label: "设置", icon: <MacIcons.Settings /> },
];

// 可以打开窗口的类型
const windowTypes: WindowType[] = ["about", "projects", "photos", "slideshow", "settings", "image-studio"];

export function Taskbar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const { windows, open, focus, minimize, restore, activeId } = useWindowStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString("zh-CN", { month: "short", day: "numeric" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (item: TaskbarItem) => {
    if (item.href) {
      window.open(item.href, "_blank");
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
        } else if (targetWindow.id === activeId) {
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

  // 检查某个类型是否有打开的窗口
  const getOpenWindows = (type: WindowType) => {
    return windows.filter((w) => w.type === type);
  };

  // 检查窗口是否是活动窗口
  const isActiveWindow = (windowId: string) => {
    return windowId === activeId;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/85 backdrop-blur-xl z-50 flex items-center justify-between px-2">
      {/* 左侧：开始按钮和应用图标 */}
      <div className="flex items-center gap-1">
        {/* Windows 开始按钮 */}
        <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
            <path fill="currentColor" d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
          </svg>
        </button>

        {/* 搜索按钮 */}
        <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>

        {/* 分隔线 */}
        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* 应用图标 - 显示所有打开的窗口 */}
        {taskbarItems.map((item) => {
          const openWindows = getOpenWindows(item.type as WindowType);
          const hasOpenWindows = openWindows.length > 0;
          
          return (
            <button
              key={item.type}
              onClick={() => handleClick(item)}
              className={`w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors group relative ${
                hasOpenWindows ? "bg-white/5" : ""
              }`}
              title={item.label}
            >
              <div className="w-6 h-6">{item.icon}</div>
              {/* 运行指示条 */}
              {hasOpenWindows && (
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
                  openWindows.some((w) => w.isMinimized) ? "bg-white/30" : "bg-white/60"
                }`} />
              )}
            </button>
          );
        })}
      </div>

      {/* 右侧：系统托盘 */}
      <div className="flex items-center gap-2 text-white text-xs">
        {/* 系统图标 */}
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </button>
        
        {/* 网络 */}
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </button>

        {/* 音量 */}
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </button>

        {/* 时间日期 */}
        <button className="px-2 py-1 hover:bg-white/10 rounded transition-colors text-right">
          <div className="text-xs">{time}</div>
          <div className="text-xs opacity-80">{date}</div>
        </button>
      </div>
    </div>
  );
}
