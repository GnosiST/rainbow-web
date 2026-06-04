"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "@/lib/stores/loading-store";

interface LoadingScreenProps {
  logo?: React.ReactNode;
  brandName?: string;
  showProgress?: boolean;
}

export function LoadingScreen({ 
  brandName = "Rainbow", 
  showProgress = true 
}: LoadingScreenProps) {
  const { isLoading, progress, setLoading, setProgress, showOnRefresh, hasShownInitial, setHasShownInitial } = useLoadingStore();
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // 检查是否应该显示加载屏幕
    if (hasShownInitial && !showOnRefresh) {
      setShouldShow(false);
      setLoading(false);
      return;
    }

    // 模拟加载进度
    const progressInterval = setInterval(() => {
      setProgress(Math.min(useLoadingStore.getState().progress + Math.random() * 15, 100));
    }, 200);

    // 最小显示时间后完成加载
    const minDurationTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setHasShownInitial(true);
      }, 500);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minDurationTimer);
    };
  }, [hasShownInitial, setHasShownInitial, setLoading, setProgress, showOnRefresh]);

  // 检查用户是否偏好减少动画
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: `
              radial-gradient(ellipse at top, #1e3a5f 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, #4a1942 0%, transparent 50%),
              radial-gradient(ellipse at bottom left, #0c2340 0%, transparent 50%),
              linear-gradient(180deg, #0a1628 0%, #1a0a20 50%, #0d1f3c 100%)
            `,
          }}
          initial={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Logo / Brand Name */}
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold text-white tracking-wider">
              {brandName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* 加载动画 */}
          <motion.div
            className="flex gap-2 mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-white/60"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* 进度条 */}
          {showProgress && (
            <motion.div
              className="w-48 h-1 bg-white/20 rounded-full overflow-hidden"
              initial={prefersReducedMotion ? {} : { opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}

          {/* 加载文字 */}
          <motion.p
            className="mt-4 text-white/60 text-sm"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
