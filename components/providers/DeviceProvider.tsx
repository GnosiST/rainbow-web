"use client";

import { useEffect } from "react";
import { useDeviceStore } from "@/lib/stores/device-store";

interface DeviceProviderProps {
  children: React.ReactNode;
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  const updateDevice = useDeviceStore((s) => s.updateDevice);

  useEffect(() => {
    // 初始化
    updateDevice();

    // 监听窗口大小变化
    const handleResize = () => {
      updateDevice();
    };

    window.addEventListener("resize", handleResize);
    
    // 监听屏幕方向变化
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [updateDevice]);

  return <>{children}</>;
}
