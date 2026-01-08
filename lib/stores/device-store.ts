import { create } from "zustand";

// 移动端断点
const MOBILE_BREAKPOINT = 768;

// 设备状态
interface DeviceState {
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: "portrait" | "landscape";
  isHydrated: boolean; // 标记是否已在客户端挂载
}

interface DeviceStore extends DeviceState {
  updateDevice: () => void;
  setHydrated: () => void;
}

// 获取当前设备状态
function getDeviceState(): Omit<DeviceState, "isHydrated"> {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      screenWidth: 1920,
      screenHeight: 1080,
      orientation: "landscape",
    };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return {
    isMobile: screenWidth < MOBILE_BREAKPOINT,
    screenWidth,
    screenHeight,
    orientation: screenWidth < screenHeight ? "portrait" : "landscape",
  };
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  // 初始状态：服务端渲染时默认桌面端
  isMobile: false,
  screenWidth: 1920,
  screenHeight: 1080,
  orientation: "landscape",
  isHydrated: false,

  updateDevice: () => {
    set({ ...getDeviceState(), isHydrated: true });
  },

  setHydrated: () => {
    set({ isHydrated: true });
  },
}));

// 便捷 hook
export function useDevice() {
  return useDeviceStore();
}

export function useIsMobile() {
  const { isMobile, isHydrated } = useDeviceStore();
  // 未挂载时返回 false，避免 hydration 不匹配
  return isHydrated ? isMobile : false;
}

export function useIsHydrated() {
  return useDeviceStore((s) => s.isHydrated);
}
