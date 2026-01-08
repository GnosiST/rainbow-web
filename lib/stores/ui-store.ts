import { create } from "zustand";
import { persist } from "zustand/middleware";

// 背景主题类型
export type BackgroundTheme = 
  | "gradient-purple" 
  | "gradient-blue" 
  | "gradient-green"
  | "gradient-orange"
  | "gradient-dark"
  | "gradient-light";

// 滤镜类型
export type FilterType = "normal" | "bw" | "invertHue" | "negative";

// 屏幕区域模式
export type ScreenArea = "safe" | "full";

// 默认值
const DEFAULT_STATE = {
  backgroundTheme: "gradient-purple" as BackgroundTheme,
  brightness: 1,
  filter: "normal" as FilterType,
  screenArea: "safe" as ScreenArea,
  screensaverEnabled: true,
  screensaverTimeout: 60, // 秒
  screensaverType: "floating" as "floating" | "clock" | "matrix",
  showLoadingOnRefresh: true,
};

interface UIState {
  // 背景主题
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (theme: BackgroundTheme) => void;
  
  // 亮度 (0.7 - 1.3)
  brightness: number;
  setBrightness: (value: number) => void;
  
  // 滤镜
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  
  // 屏幕区域
  screenArea: ScreenArea;
  setScreenArea: (area: ScreenArea) => void;
  
  // 屏保设置
  screensaverEnabled: boolean;
  setScreensaverEnabled: (enabled: boolean) => void;
  screensaverTimeout: number;
  setScreensaverTimeout: (seconds: number) => void;
  screensaverType: "floating" | "clock" | "matrix";
  setScreensaverType: (type: "floating" | "clock" | "matrix") => void;
  
  // 加载屏幕设置
  showLoadingOnRefresh: boolean;
  setShowLoadingOnRefresh: (show: boolean) => void;
  
  // 重置所有设置
  reset: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // 背景主题
      backgroundTheme: DEFAULT_STATE.backgroundTheme,
      setBackgroundTheme: (theme) => set({ backgroundTheme: theme }),
      
      // 亮度
      brightness: DEFAULT_STATE.brightness,
      setBrightness: (value) => set({ 
        brightness: Math.max(0.7, Math.min(1.3, value)) 
      }),
      
      // 滤镜
      filter: DEFAULT_STATE.filter,
      setFilter: (filter) => set({ filter }),
      
      // 屏幕区域
      screenArea: DEFAULT_STATE.screenArea,
      setScreenArea: (area) => set({ screenArea: area }),
      
      // 屏保设置
      screensaverEnabled: DEFAULT_STATE.screensaverEnabled,
      setScreensaverEnabled: (enabled) => set({ screensaverEnabled: enabled }),
      screensaverTimeout: DEFAULT_STATE.screensaverTimeout,
      setScreensaverTimeout: (seconds) => set({ screensaverTimeout: seconds }),
      screensaverType: DEFAULT_STATE.screensaverType,
      setScreensaverType: (type) => set({ screensaverType: type }),
      
      // 加载屏幕
      showLoadingOnRefresh: DEFAULT_STATE.showLoadingOnRefresh,
      setShowLoadingOnRefresh: (show) => set({ showLoadingOnRefresh: show }),
      
      // 重置
      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: "ui-settings",
    }
  )
);

// 背景主题配置
export const backgroundThemes: Record<BackgroundTheme, { name: string; css: string }> = {
  "gradient-purple": {
    name: "Purple Night",
    css: `
      radial-gradient(ellipse at top, #1e3a5f 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, #4a1942 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, #0c2340 0%, transparent 50%),
      linear-gradient(180deg, #0a1628 0%, #1a0a20 50%, #0d1f3c 100%)
    `,
  },
  "gradient-blue": {
    name: "Ocean Blue",
    css: "linear-gradient(135deg, #0078D4 0%, #00BCF2 100%)",
  },
  "gradient-green": {
    name: "Forest Green",
    css: "linear-gradient(135deg, #134E5E 0%, #71B280 100%)",
  },
  "gradient-orange": {
    name: "Sunset Orange",
    css: "linear-gradient(135deg, #F37335 0%, #FDC830 100%)",
  },
  "gradient-dark": {
    name: "Dark Mode",
    css: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
  },
  "gradient-light": {
    name: "Light Mode",
    css: "linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%)",
  },
};

// 滤镜配置
export const filterStyles: Record<FilterType, string> = {
  normal: "none",
  bw: "grayscale(100%)",
  invertHue: "hue-rotate(180deg)",
  negative: "invert(100%)",
};
