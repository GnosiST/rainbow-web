"use client";

import React, { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useWindowStore, WindowState } from "@/lib/stores/window-store";
import { useThemeStore } from "@/lib/stores/theme-store";
import { ResizeHandles, ResizeDirection } from "./ResizeHandles";

// 窗口最小尺寸
const MIN_WIDTH = 200;
const MIN_HEIGHT = 150;

interface WindowFrameProps {
  window: WindowState;
}

export function WindowFrame({ window }: WindowFrameProps) {
  const { activeId, focus, close, toggleMax, minimize, updateRect } = useWindowStore();
  const { theme } = useThemeStore();
  const isActive = activeId === window.id;
  
  const frameRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rectX: 0, rectY: 0 });
  const resizeStart = useRef({ 
    x: 0, y: 0, 
    rectX: 0, rectY: 0, 
    rectW: 0, rectH: 0,
    direction: "" as ResizeDirection 
  });

  // 拖拽处理
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (window.isMax) return; // 最大化时不允许拖拽
    
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rectX: window.rect.x,
      rectY: window.rect.y,
    };
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [window.isMax, window.rect.x, window.rect.y]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    let newX = dragStart.current.rectX + deltaX;
    let newY = dragStart.current.rectY + deltaY;
    
    // 边界约束：至少保留 50px 可见区域
    const minVisible = 50;
    const maxX = (typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1920) - minVisible;
    const maxY = (typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 1080) - minVisible;
    
    newX = Math.max(-window.rect.width + minVisible, Math.min(newX, maxX));
    newY = Math.max(24, Math.min(newY, maxY)); // 24 是 Topbar 高度
    
    updateRect(window.id, { x: newX, y: newY });
  }, [isDragging, window.id, window.rect.width, updateRect]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  // 调整大小处理
  const handleResizeStart = useCallback((direction: ResizeDirection, e: React.PointerEvent) => {
    setIsResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      rectX: window.rect.x,
      rectY: window.rect.y,
      rectW: window.rect.width,
      rectH: window.rect.height,
      direction,
    };
  }, [window.rect]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!isResizing) return;
    
    const { x, y, rectX, rectY, rectW, rectH, direction } = resizeStart.current;
    const deltaX = e.clientX - x;
    const deltaY = e.clientY - y;
    
    let newX = rectX;
    let newY = rectY;
    let newW = rectW;
    let newH = rectH;
    
    // 获取屏幕尺寸
    const screenW = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1920;
    const screenH = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 1080;
    
    // 根据方向计算新尺寸
    if (direction.includes("e")) {
      newW = Math.max(MIN_WIDTH, Math.min(rectW + deltaX, screenW - rectX));
    }
    if (direction.includes("w")) {
      const maxDeltaX = rectW - MIN_WIDTH;
      const clampedDeltaX = Math.max(-rectX, Math.min(deltaX, maxDeltaX));
      newX = rectX + clampedDeltaX;
      newW = rectW - clampedDeltaX;
    }
    if (direction.includes("s")) {
      newH = Math.max(MIN_HEIGHT, Math.min(rectH + deltaY, screenH - rectY));
    }
    if (direction.includes("n")) {
      const maxDeltaY = rectH - MIN_HEIGHT;
      const clampedDeltaY = Math.max(-(rectY - 24), Math.min(deltaY, maxDeltaY));
      newY = rectY + clampedDeltaY;
      newH = rectH - clampedDeltaY;
    }
    
    updateRect(window.id, { x: newX, y: newY, width: newW, height: newH });
  }, [isResizing, window.id, updateRect]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // 双击标题栏最大化
  const handleDoubleClick = useCallback(() => {
    toggleMax(window.id);
  }, [toggleMax, window.id]);

  // 点击窗口聚焦
  const handleFocus = useCallback(() => {
    if (!isActive) {
      focus(window.id);
    }
  }, [focus, window.id, isActive]);

  // macOS 风格的窗口控制按钮
  const MacControls = () => (
    <div 
      className="flex items-center gap-2 mr-3"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => { e.stopPropagation(); close(window.id); }}
        className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 flex items-center justify-center group"
      >
        <span className="text-[8px] text-black/60 opacity-0 group-hover:opacity-100">×</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); minimize(window.id); }}
        className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 flex items-center justify-center group"
      >
        <span className="text-[8px] text-black/60 opacity-0 group-hover:opacity-100">−</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); toggleMax(window.id); }}
        className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 flex items-center justify-center group"
      >
        <span className="text-[8px] text-black/60 opacity-0 group-hover:opacity-100">+</span>
      </button>
    </div>
  );

  // Windows 风格的窗口控制按钮
  const WindowsControls = () => (
    <div 
      className="flex items-center"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => { e.stopPropagation(); minimize(window.id); }}
        className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <span className="text-white/80 text-sm">─</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); toggleMax(window.id); }}
        className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <span className="text-white/80 text-sm">{window.isMax ? "❐" : "□"}</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); close(window.id); }}
        className="w-11 h-8 flex items-center justify-center hover:bg-red-500 transition-colors"
      >
        <span className="text-white/80 text-sm">×</span>
      </button>
    </div>
  );

  // 插画风格的窗口控制按钮
  const IllustrationControls = () => (
    <div 
      className="flex items-center gap-2 mr-3"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => { e.stopPropagation(); close(window.id); }}
        className="w-5 h-5 rounded-full border-2 border-[#E17055] bg-[#E17055]/20 hover:bg-[#E17055]/40 flex items-center justify-center group transition-colors"
      >
        <span className="text-[10px] text-[#E17055] font-bold opacity-0 group-hover:opacity-100">×</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); minimize(window.id); }}
        className="w-5 h-5 rounded-full border-2 border-[#636E72] bg-[#636E72]/20 hover:bg-[#636E72]/40 flex items-center justify-center group transition-colors"
      >
        <span className="text-[10px] text-[#636E72] font-bold opacity-0 group-hover:opacity-100">−</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); toggleMax(window.id); }}
        className="w-5 h-5 rounded-full border-2 border-[#71B280] bg-[#71B280]/20 hover:bg-[#71B280]/40 flex items-center justify-center group transition-colors"
      >
        <span className="text-[10px] text-[#71B280] font-bold opacity-0 group-hover:opacity-100">+</span>
      </button>
    </div>
  );

  const isMac = theme === "macos";
  const isIllustration = theme === "illustration";

  return (
    <motion.div
      ref={frameRef}
      className="absolute pointer-events-auto"
      style={{
        left: window.rect.x,
        top: window.rect.y,
        width: window.rect.width,
        height: window.rect.height,
        zIndex: window.z,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onPointerDown={handleFocus}
    >
      {/* 调整大小手柄 */}
      <ResizeHandles
        onResizeStart={handleResizeStart}
        onResizeMove={handleResizeMove}
        onResizeEnd={handleResizeEnd}
        disabled={window.isMax}
      />
      
      <div
        className={`
          w-full h-full flex flex-col overflow-hidden
          ${isIllustration
            ? "rounded-2xl bg-[#FFF9F0] border-2 border-[#2D3436]/20"
            : isMac 
              ? "rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10" 
              : "bg-gray-800/95 backdrop-blur-xl border border-white/5"
          }
          ${isActive 
            ? isIllustration 
              ? "shadow-[4px_4px_0_rgba(45,52,54,0.2)]" 
              : "shadow-2xl shadow-black/50" 
            : isIllustration
              ? "shadow-[2px_2px_0_rgba(45,52,54,0.1)]"
              : "shadow-lg shadow-black/30"
          }
        `}
      >
        {/* 标题栏 */}
        <div
          className={`
            flex items-center h-10 select-none shrink-0
            ${isIllustration
              ? "px-3 bg-[#FFF9F0] border-b-2 border-[#2D3436]/10"
              : isMac 
                ? "px-3 bg-gradient-to-b from-gray-700/50 to-gray-800/50" 
                : "bg-gray-900/80"
            }
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          `}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleDoubleClick}
        >
          {isIllustration ? (
            <>
              <IllustrationControls />
              <span className="flex-1 text-center text-sm text-[#2D3436] font-semibold truncate pr-16">
                {window.title}
              </span>
            </>
          ) : isMac ? (
            <>
              <MacControls />
              <span className="flex-1 text-center text-sm text-white/80 font-medium truncate pr-16">
                {window.title}
              </span>
            </>
          ) : (
            <>
              <span className="flex-1 text-sm text-white/80 font-normal truncate px-3">
                {window.title}
              </span>
              <WindowsControls />
            </>
          )}
        </div>

        {/* 内容区域 */}
        <div className={`flex-1 overflow-auto ${isIllustration ? "bg-[#FFF9F0]" : "bg-gray-900/50"}`}>
          <WindowContent type={window.type} data={window.data} isIllustration={isIllustration} />
        </div>
      </div>
    </motion.div>
  );
}

// 窗口内容组件
import { ProjectsWindow } from "./content/ProjectsWindow";
import { ProjectWindow } from "./content/ProjectWindow";
import { SettingsWindow } from "./content/SettingsWindow";
import { SlideshowWindow } from "./content/SlideshowWindow";
import { PhotosWindow } from "./content/PhotosWindow";
import { ImageStudioWindow } from "./content/ImageStudioWindow";

function WindowContent({ type, data, isIllustration = false }: { type: string; data?: Record<string, unknown>; isIllustration?: boolean }) {
  // 根据类型渲染对应内容
  switch (type) {
    case "projects":
      return <ProjectsWindow />;
    case "project":
      return <ProjectWindow data={data as { slug?: string; project?: import("@/lib/types/project").Project }} />;
    case "settings":
      return <SettingsWindow />;
    case "slideshow":
      return <SlideshowWindow />;
    case "photos":
      return <PhotosWindow />;
    case "image-studio":
      return <ImageStudioWindow />;
    default:
      return (
        <div className={`w-full h-full flex items-center justify-center ${isIllustration ? "text-[#636E72]" : "text-white/50"}`}>
          <div className="text-center">
            <div className="text-4xl mb-4">
              {type === "about" && "👤"}
            </div>
            <div className={`text-lg font-medium capitalize ${isIllustration ? "text-[#2D3436]" : ""}`}>{type}</div>
            <div className={`text-sm mt-2 ${isIllustration ? "text-[#636E72]" : "text-white/30"}`}>
              内容将在后续里程碑中实现
            </div>
            {data && (
              <div className={`text-xs mt-2 ${isIllustration ? "text-[#636E72]/50" : "text-white/20"}`}>
                {JSON.stringify(data)}
              </div>
            )}
          </div>
        </div>
      );
  }
}
