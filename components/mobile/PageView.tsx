"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageStore } from "@/lib/stores/page-store";
import { useMobileThemeStore } from "@/lib/stores/mobile-theme-store";
import { mobileThemeConfigs } from "@/lib/mobile-theme-config";
import { MobileAboutPage } from "./pages/MobileAboutPage";
import { MobileProjectsPage } from "./pages/MobileProjectsPage";
import { MobileProjectPage } from "./pages/MobileProjectPage";
import { MobilePhotosPage } from "./pages/MobilePhotosPage";
import { MobileSettingsPage } from "./pages/MobileSettingsPage";
import type { Project } from "@/lib/types/project";

export function PageView() {
  const { currentPage, stack, push, pop } = usePageStore();
  const { theme } = useMobileThemeStore();
  const config = mobileThemeConfigs[theme];
  
  // 边缘滑动返回（iOS 风格）
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (theme !== "ios" || stack.length <= 1) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = Math.abs(touchEndY - touchStartY.current);
    
    // 从左边缘开始滑动，水平距离 > 100px，垂直距离 < 50px
    if (touchStartX.current < 30 && deltaX > 100 && deltaY < 50) {
      pop();
    }
  }, [theme, stack.length, pop]);
  
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  // 初始化默认页面
  useEffect(() => {
    if (stack.length === 0) {
      push("about");
    }
  }, [stack.length, push]);

  if (!currentPage) {
    return null;
  }

  // 动画变体
  const variants = {
    slide: {
      initial: { x: "100%", opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-30%", opacity: 0.5 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };

  const animationVariant = variants[config.animation.pageTransition];

  // 渲染页面内容
  const renderPage = () => {
    switch (currentPage.type) {
      case "about":
        return <MobileAboutPage config={config} />;
      case "projects":
        return <MobileProjectsPage config={config} />;
      case "project":
        return (
          <MobileProjectPage
            config={config}
            project={currentPage.data?.project as Project}
          />
        );
      case "photos":
        return <MobilePhotosPage config={config} />;
      case "settings":
        return <MobileSettingsPage config={config} />;
      default:
        return (
          <div
            className="flex-1 flex items-center justify-center"
            style={{ background: config.page.bg }}
          >
            <span style={{ color: config.page.secondaryTextColor }}>
              页面不存在
            </span>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage.id}
        className="flex-1 flex flex-col overflow-hidden"
        initial={animationVariant.initial}
        animate={animationVariant.animate}
        exit={animationVariant.exit}
        transition={{ duration: config.animation.duration / 1000 }}
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  );
}
