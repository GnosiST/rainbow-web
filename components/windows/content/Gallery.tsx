"use client";

import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function Gallery({ images, currentIndex, onIndexChange }: GalleryProps) {
  const totalImages = images.length;
  
  // 循环导航
  const goToPrev = useCallback(() => {
    onIndexChange(currentIndex === 0 ? totalImages - 1 : currentIndex - 1);
  }, [currentIndex, totalImages, onIndexChange]);
  
  const goToNext = useCallback(() => {
    onIndexChange(currentIndex === totalImages - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, totalImages, onIndexChange]);

  // 键盘导航
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  if (totalImages === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
        <div className="text-white/30 text-lg">No images</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-black/20">
      {/* 图片区域 */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            {/* 占位图 - 实际项目中替换为 Image 组件 */}
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-30">🖼️</div>
                <div className="text-white/30 text-sm">
                  {images[currentIndex]}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 导航按钮 */}
        {totalImages > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* 索引指示器 */}
      {totalImages > 1 && (
        <div className="h-12 flex items-center justify-center gap-2 bg-black/20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-4"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
          <span className="ml-4 text-white/40 text-sm">
            {currentIndex + 1} / {totalImages}
          </span>
        </div>
      )}
    </div>
  );
}
