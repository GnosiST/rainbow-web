"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileThemeConfig } from "@/lib/mobile-theme-config";
import type { Project } from "@/lib/types/project";

interface MobileProjectPageProps {
  config: MobileThemeConfig;
  project: Project;
}

export function MobileProjectPage({ config, project }: MobileProjectPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = project.images.length > 0 ? project.images : [project.cover];
  
  // 滑动手势
  const touchStartX = useRef(0);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: config.page.bg }}
    >
      {/* 全屏画廊 */}
      <div 
        className="relative flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundColor: "#1a1a2e",
            }}
          />
        </AnimatePresence>

        {/* 导航按钮 */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )}

        {/* 指示器 */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 项目信息 */}
      <div
        className="p-4 shrink-0"
        style={{ background: config.page.cardBg }}
      >
        <h2
          className="font-bold text-lg mb-1"
          style={{ color: config.page.textColor }}
        >
          {project.title}
        </h2>
        <p
          className="text-sm mb-2"
          style={{ color: config.page.secondaryTextColor }}
        >
          {project.client} · {project.year}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded"
              style={{
                background: config.navigation.activeColor + "20",
                color: config.navigation.activeColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
