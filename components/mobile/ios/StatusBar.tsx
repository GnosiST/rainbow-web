"use client";

import { useState, useEffect } from "react";

interface StatusBarProps {
  config: {
    height: string;
    bg: string;
    textColor: string;
    showTime: boolean;
    showBattery: boolean;
    showSignal: boolean;
  };
}

export function IOSStatusBar({ config }: StatusBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-6 shrink-0"
      style={{
        height: config.height,
        background: config.bg,
        color: config.textColor,
      }}
    >
      {/* 左侧：时间 */}
      <div className="flex items-center gap-1">
        {config.showTime && (
          <span className="text-sm font-semibold">{time}</span>
        )}
      </div>

      {/* 中间：刘海区域（模拟） */}
      <div className="w-28 h-7 bg-black rounded-full" />

      {/* 右侧：信号、WiFi、电池 */}
      <div className="flex items-center gap-1">
        {config.showSignal && (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="1" y="14" width="4" height="8" rx="1" />
            <rect x="7" y="10" width="4" height="12" rx="1" />
            <rect x="13" y="6" width="4" height="16" rx="1" />
            <rect x="19" y="2" width="4" height="20" rx="1" />
          </svg>
        )}
        {/* WiFi */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13 9.5 12 12 12s4.7 1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9zM2 10.9l1.4 1.4C5.4 10.4 8.5 9 12 9s6.6 1.4 8.6 3.3l1.4-1.4C19.6 8.5 16 7 12 7s-7.6 1.5-10 3.9z" />
        </svg>
        {config.showBattery && (
          <div className="flex items-center">
            <div className="w-6 h-3 border border-current rounded-sm relative">
              <div className="absolute inset-0.5 bg-current rounded-sm" style={{ width: "80%" }} />
            </div>
            <div className="w-0.5 h-1.5 bg-current rounded-r ml-px" />
          </div>
        )}
      </div>
    </div>
  );
}
