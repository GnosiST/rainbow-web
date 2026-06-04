"use client";

import React from "react";
import { useIllustrationThemeStore, type IllustrationThemeConfig } from "@/lib/stores/illustration-theme-store";
import { useWindowStore, WindowType } from "@/lib/stores/window-store";
import { WindowLayer } from "@/components/windows/WindowLayer";

// 桌面图标配置 - 与 macOS/Windows 主题保持一致
const desktopIcons: { id: WindowType; label: string; icon: string }[] = [
  { id: "about", label: "About", icon: "👤" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "photos", label: "Photos", icon: "🖼️" },
  { id: "slideshow", label: "Slideshow", icon: "▶️" },
  { id: "image-studio", label: "Image Studio", icon: "✨" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// Dock 图标配置
const dockIcons: { id: WindowType | "external"; label: string; icon: string; href?: string }[] = [
  { id: "about", label: "About", icon: "👤" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "photos", label: "Photos", icon: "🖼️" },
  { id: "slideshow", label: "Slideshow", icon: "▶️" },
  { id: "image-studio", label: "Image Studio", icon: "✨" },
  { id: "settings", label: "Settings", icon: "⚙️" },
  { id: "external", label: "Shop", icon: "🛒", href: "#" },
  { id: "external", label: "Mail", icon: "✉️", href: "mailto:hello@example.com" },
];

export function IllustrationDesktop() {
  const { config } = useIllustrationThemeStore();
  const { open } = useWindowStore();

  const handleOpenWindow = (type: WindowType) => {
    open(type);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: config.background,
        fontFamily: config.fontFamily,
      }}
    >
      {/* 网格背景 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${config.borderColor}40 1px, transparent 1px),
            linear-gradient(90deg, ${config.borderColor}40 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* 顶部菜单栏 */}
      <IllustrationMenuBar config={config} />

      {/* 右侧桌面图标 */}
      <div className="absolute right-8 top-16 flex flex-col items-center gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIconButton
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => handleOpenWindow(icon.id)}
            config={config}
          />
        ))}
      </div>

      {/* 窗口层 - 复用现有的 WindowLayer */}
      <WindowLayer />

      {/* 底部 Dock */}
      <IllustrationDock 
        icons={dockIcons} 
        onOpenWindow={handleOpenWindow}
        config={config} 
      />
    </div>
  );
}

// 顶部菜单栏
function IllustrationMenuBar({ config }: { config: IllustrationThemeConfig }) {
  const menuItems = ["File", "Edit", "View", "Window", "Help"];
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit",
    hour12: false 
  });
  const dayStr = now.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div 
      className="h-7 px-4 flex items-center justify-between border-b-2 relative z-50"
      style={{ 
        background: config.background,
        borderColor: config.textColor,
        color: config.textColor,
      }}
    >
      {/* 左侧菜单 */}
      <div className="flex items-center gap-4">
        <span className="text-base">🎨</span>
        <span className="font-bold text-xs">{config.siteName || "Rainbow"}</span>
        {menuItems.map((item) => (
          <button 
            key={item}
            className="text-xs hover:underline"
          >
            {item}
          </button>
        ))}
      </div>

      {/* 右侧状态 */}
      <div className="flex items-center gap-3 text-xs">
        <a href="mailto:hello@example.com" className="hover:underline">
          hello@example.com
        </a>
        <span>📷</span>
        <span>✉️</span>
        <span>🔔</span>
        <span>{dayStr} {timeStr}</span>
      </div>
    </div>
  );
}

// 桌面图标按钮
function DesktopIconButton({
  icon,
  label,
  onClick,
  config,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  config: IllustrationThemeConfig;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 group"
    >
      {/* 图标容器 - 手绘风格边框 */}
      <div 
        className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl
                   border-2 transition-transform group-hover:scale-110 group-active:scale-95"
        style={{ 
          borderColor: config.borderColor,
          background: config.background,
          boxShadow: `3px 3px 0 ${config.borderColor}30`,
        }}
      >
        {icon}
      </div>
      <span 
        className="text-[10px] font-medium px-1.5 py-0.5 rounded border"
        style={{ 
          borderColor: config.borderColor,
          background: config.background,
          color: config.textColor,
        }}
      >
        {label}
      </span>
    </button>
  );
}

// 底部 Dock
function IllustrationDock({
  icons,
  onOpenWindow,
  config,
}: {
  icons: { id: WindowType | "external"; label: string; icon: string; href?: string }[];
  onOpenWindow: (type: WindowType) => void;
  config: IllustrationThemeConfig;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div 
        className="flex items-end gap-1 px-3 py-2 rounded-lg border-2"
        style={{ 
          borderColor: config.borderColor,
          background: `${config.background}f0`,
          boxShadow: `4px 4px 0 ${config.borderColor}40`,
        }}
      >
        {icons.map((icon, idx) => (
          <div key={`${icon.id}-${idx}`} className="relative group">
            {/* Tooltip */}
            <div 
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded 
                         opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
              style={{ 
                background: config.textColor, 
                color: config.background,
              }}
            >
              {icon.label}
            </div>
            
            {icon.href ? (
              <a
                href={icon.href}
                target={icon.href.startsWith("http") ? "_blank" : undefined}
                rel={icon.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-10 h-10 flex items-center justify-center text-xl
                           hover:scale-125 hover:-translate-y-2 transition-all duration-200"
              >
                {icon.icon}
              </a>
            ) : (
              <button
                onClick={() => onOpenWindow(icon.id as WindowType)}
                className="w-10 h-10 flex items-center justify-center text-xl
                           hover:scale-125 hover:-translate-y-2 transition-all duration-200"
              >
                {icon.icon}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 导出配置类型
export type { IllustrationThemeConfig } from "@/lib/stores/illustration-theme-store";
