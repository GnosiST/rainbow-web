"use client";

import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScreensaverStore, ScreensaverType } from "@/lib/stores/screensaver-store";
import { MacIcons } from "@/components/icons/MacIcons";

// 漂浮图标屏保
function FloatingIcons() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const icons = [
    MacIcons.Finder,
    MacIcons.Folder,
    MacIcons.Photos,
    MacIcons.Settings,
    MacIcons.Safari,
    MacIcons.Mail,
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute w-16 h-16"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [null, Math.random() * (dimensions.width - 64)],
            y: [null, Math.random() * (dimensions.height - 64)],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
}

// 时钟屏保
function ClockScreensaver() {
  const [time, setTime] = React.useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: ["-50%", "-30%", "-70%", "-50%"],
        y: ["-50%", "-30%", "-70%", "-50%"],
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="text-8xl font-light text-white/80 tabular-nums">
        {time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>
      <div className="text-2xl text-white/50 text-center mt-4">
        {time.toLocaleDateString("zh-CN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </div>
    </motion.div>
  );
}

// 矩阵雨屏保
function MatrixRain() {
  const [columns, setColumns] = useState(50);

  useEffect(() => {
    setColumns(Math.floor(window.innerWidth / 20));
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden font-mono text-green-500 text-sm">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 flex flex-col"
          style={{ left: i * 20 }}
          initial={{ y: -500 }}
          animate={{ y: window.innerHeight + 500 }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {Array.from({ length: 25 }).map((_, j) => (
            <span
              key={j}
              style={{ opacity: 1 - j * 0.04 }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

const screensaverComponents: Record<ScreensaverType, React.ComponentType | null> = {
  floating: FloatingIcons,
  clock: ClockScreensaver,
  matrix: MatrixRain,
  none: null,
};

export function Screensaver() {
  const { enabled, active, idleTimeout, type, setActive } = useScreensaverStore();
  const [isClient, setIsClient] = useState(false);

  // 确保只在客户端运行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 空闲检测
  useEffect(() => {
    if (!isClient || !enabled) {
      console.log("[Screensaver] Not starting: isClient=", isClient, "enabled=", enabled);
      return;
    }

    console.log("[Screensaver] Starting idle detection, timeout:", idleTimeout, "seconds");

    let idleTimer: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      clearTimeout(idleTimer);
      console.log("[Screensaver] Timer started, will activate in", idleTimeout, "seconds");
      idleTimer = setTimeout(() => {
        console.log("[Screensaver] Timer fired! Activating screensaver");
        setActive(true);
      }, idleTimeout * 1000);
    };

    const resetTimer = () => {
      console.log("[Screensaver] Activity detected, resetting timer");
      setActive(false);
      startTimer();
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // 初始化计时器
    startTimer();

    return () => {
      console.log("[Screensaver] Cleanup");
      clearTimeout(idleTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isClient, enabled, idleTimeout, setActive]);

  const handleClick = useCallback(() => {
    setActive(false);
  }, [setActive]);

  // 调试信息
  useEffect(() => {
    if (isClient) {
      console.log("[Screensaver] State: enabled=", enabled, "active=", active, "type=", type);
    }
  }, [isClient, enabled, active, type]);

  const ScreensaverComponent = screensaverComponents[type];

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {active && enabled && ScreensaverComponent && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClick}
        >
          <ScreensaverComponent />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-sm">
            点击任意位置退出屏保
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
