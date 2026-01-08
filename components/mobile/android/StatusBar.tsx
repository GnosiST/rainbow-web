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

export function AndroidStatusBar({ config }: StatusBarProps) {
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
      className="flex items-center justify-between px-4 shrink-0"
      style={{
        height: config.height,
        background: config.bg,
        color: config.textColor,
      }}
    >
      {/* 左侧：时间 */}
      <div className="flex items-center">
        {config.showTime && <span className="text-xs">{time}</span>}
      </div>

      {/* 右侧：信号、WiFi、电池 */}
      <div className="flex items-center gap-2">
        {config.showSignal && (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 22h20V2z" opacity="0.3" />
            <path d="M2 22h20V2zm18-2H4V4.41L20 20z" />
          </svg>
        )}
        {/* WiFi */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        {config.showBattery && (
          <div className="flex items-center">
            <div className="w-5 h-2.5 border border-current rounded-sm relative">
              <div
                className="absolute inset-0.5 bg-current rounded-sm"
                style={{ width: "75%" }}
              />
            </div>
            <div className="w-0.5 h-1 bg-current ml-px" />
          </div>
        )}
      </div>
    </div>
  );
}
