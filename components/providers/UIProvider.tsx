"use client";

import React, { useEffect } from "react";
import { useUIStore, backgroundThemes, filterStyles } from "@/lib/stores/ui-store";

interface UIProviderProps {
  children: React.ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const { backgroundTheme, brightness, filter } = useUIStore();

  // 应用全局效果
  useEffect(() => {
    const root = document.documentElement;
    
    // 设置 CSS 变量
    root.style.setProperty("--ui-brightness", brightness.toString());
    root.style.setProperty("--ui-filter", filterStyles[filter]);
    root.style.setProperty("--ui-background", backgroundThemes[backgroundTheme].css);
    
    // 设置 data 属性用于 CSS 选择器
    root.dataset.theme = backgroundTheme;
    root.dataset.filter = filter;
  }, [backgroundTheme, brightness, filter]);

  return (
    <div 
      className="ui-provider"
      style={{
        filter: filter !== "normal" ? filterStyles[filter] : undefined,
        // 亮度通过 brightness filter 实现
      }}
    >
      <div
        style={{
          filter: `brightness(${brightness})`,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}
