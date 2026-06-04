"use client";

import React, { useMemo } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Dock } from "./Dock";
import { Taskbar } from "./Taskbar";
import { IllustrationDesktop } from "./IllustrationDesktop";
import { WindowLayer } from "@/components/windows/WindowLayer";
import { getDesktopIcons } from "@/lib/desktop-icons";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useUIStore, backgroundThemes } from "@/lib/stores/ui-store";
import { themeConfigs } from "@/lib/theme-config";

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const { theme } = useThemeStore();
  const { backgroundTheme } = useUIStore();

  // 根据主题动态获取图标 - 必须在条件返回之前调用
  const icons = useMemo(() => {
    return getDesktopIcons(theme);
  }, [theme]);
  
  // 插画主题使用专门的布局
  if (theme === "illustration") {
    return <IllustrationDesktop />;
  }

  // macOS / Windows 主题
  const config = themeConfigs[theme];

  // 根据主题决定图标位置
  const iconPositionClass = config.desktopIcons.position === "right" 
    ? "right-6" 
    : "left-6";

  // 根据主题决定顶部间距
  const topPadding = theme === "windows" ? "pt-4" : "pt-8";
  const bottomPadding = theme === "windows" ? "pb-14" : "pb-4";

  // 使用 UI Store 的背景主题
  const background = backgroundThemes[backgroundTheme].css;

  return (
    <div 
      className={`min-h-screen ${topPadding} ${bottomPadding} relative overflow-hidden`}
      style={{ background }}
    >
      {/* 桌面图标 */}
      <div className={`absolute top-10 ${iconPositionClass}`}>
        <div className={`flex flex-col gap-4 ${theme === "windows" ? "items-start" : "items-center"}`}>
          {icons.map((iconConfig) => (
            <DesktopIcon
              key={iconConfig.type}
              type={iconConfig.type}
              label={iconConfig.label}
              icon={iconConfig.icon}
              href={iconConfig.href}
              theme={theme}
            />
          ))}
        </div>
      </div>
      
      {/* WindowLayer - 窗口管理器 */}
      <WindowLayer />
      
      {/* 其他子组件 */}
      {children}
      
      {/* macOS Dock */}
      {config.dock.show && <Dock />}
      
      {/* Windows Taskbar */}
      {config.taskbar.show && <Taskbar />}
    </div>
  );
}
