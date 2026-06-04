import { create } from "zustand";
import { nanoid } from "nanoid";

// 窗口类型
export type WindowType = 
  | "about" 
  | "projects" 
  | "project" 
  | "photos" 
  | "slideshow" 
  | "settings"
  | "image-studio";

// 窗口位置和尺寸
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 窗口状态
export interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  rect: Rect;
  prevRect?: Rect; // 最大化前的位置，用于还原
  z: number;
  isMax: boolean;
  data?: Record<string, unknown>; // 额外数据，如 project id
}

// 默认窗口尺寸
const DEFAULT_RECT: Rect = {
  x: 100,
  y: 100,
  width: 800,
  height: 600,
};

// 窗口标题映射
const WINDOW_TITLES: Record<WindowType, string> = {
  about: "About",
  projects: "Projects",
  project: "Project",
  photos: "Photos",
  slideshow: "Slideshow",
  settings: "Settings",
  "image-studio": "Image Studio",
};

interface WindowStore {
  windows: WindowState[];
  activeId: string | null;
  zCounter: number;

  // Actions
  open: (type: WindowType, data?: Record<string, unknown>) => string;
  close: (id: string) => void;
  focus: (id: string) => void;
  toggleMax: (id: string) => void;
  updateRect: (id: string, rect: Partial<Rect>) => void;
  setTitle: (id: string, title: string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeId: null,
  zCounter: 1,

  open: (type, data) => {
    const id = nanoid();
    const { zCounter, windows } = get();
    
    // 计算新窗口位置（级联偏移）
    const offset = (windows.length % 10) * 30;
    const rect: Rect = {
      ...DEFAULT_RECT,
      x: DEFAULT_RECT.x + offset,
      y: DEFAULT_RECT.y + offset,
    };

    const newWindow: WindowState = {
      id,
      type,
      title: data?.title as string || WINDOW_TITLES[type],
      rect,
      z: zCounter,
      isMax: false,
      data,
    };

    set({
      windows: [...windows, newWindow],
      activeId: id,
      zCounter: zCounter + 1,
    });

    return id;
  },

  close: (id) => {
    const { windows, activeId } = get();
    const newWindows = windows.filter((w) => w.id !== id);
    
    // 如果关闭的是当前活动窗口，选择 z 值最高的窗口
    let newActiveId = activeId;
    if (activeId === id) {
      if (newWindows.length > 0) {
        const topWindow = newWindows.reduce((prev, curr) => 
          curr.z > prev.z ? curr : prev
        );
        newActiveId = topWindow.id;
      } else {
        newActiveId = null;
      }
    }

    set({
      windows: newWindows,
      activeId: newActiveId,
    });
  },

  focus: (id) => {
    const { windows, zCounter, activeId } = get();
    if (activeId === id) return; // 已经是活动窗口

    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, z: zCounter } : w
      ),
      activeId: id,
      zCounter: zCounter + 1,
    });
  },

  toggleMax: (id) => {
    const { windows } = get();
    
    // 动态获取 screenArea 设置
    let screenArea: "safe" | "full" = "safe";
    try {
      const uiSettings = localStorage.getItem("ui-settings");
      if (uiSettings) {
        const parsed = JSON.parse(uiSettings);
        screenArea = parsed.state?.screenArea || "safe";
      }
    } catch {
      // 使用默认值
    }
    
    set({
      windows: windows.map((w) => {
        if (w.id !== id) return w;
        
        if (w.isMax) {
          // 还原
          return {
            ...w,
            isMax: false,
            rect: w.prevRect || DEFAULT_RECT,
            prevRect: undefined,
          };
        } else {
          // 最大化
          const screenW = typeof window !== "undefined" ? window.innerWidth : 1920;
          const screenH = typeof window !== "undefined" ? window.innerHeight : 1080;
          
          // safe 模式保留边距，full 模式填满
          const padding = screenArea === "safe" ? { top: 24, bottom: 70, left: 0, right: 0 } : { top: 0, bottom: 0, left: 0, right: 0 };
          
          return {
            ...w,
            isMax: true,
            prevRect: w.rect,
            rect: {
              x: padding.left,
              y: padding.top,
              width: screenW - padding.left - padding.right,
              height: screenH - padding.top - padding.bottom,
            },
          };
        }
      }),
    });
  },

  updateRect: (id, rectUpdate) => {
    const { windows } = get();
    
    set({
      windows: windows.map((w) =>
        w.id === id
          ? { ...w, rect: { ...w.rect, ...rectUpdate }, isMax: false }
          : w
      ),
    });
  },

  setTitle: (id, title) => {
    const { windows } = get();
    
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, title } : w
      ),
    });
  },
}));
