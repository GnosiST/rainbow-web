import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ScreensaverType = "floating" | "clock" | "matrix" | "none";

interface ScreensaverState {
  enabled: boolean;
  active: boolean;
  idleTimeout: number; // 空闲时间（秒）
  type: ScreensaverType;
}

interface ScreensaverStore extends ScreensaverState {
  setEnabled: (enabled: boolean) => void;
  setActive: (active: boolean) => void;
  setIdleTimeout: (timeout: number) => void;
  setType: (type: ScreensaverType) => void;
}

export const useScreensaverStore = create<ScreensaverStore>()(
  persist(
    (set) => ({
      enabled: true,
      active: false,
      idleTimeout: 10, // 默认 10 秒（测试用）
      type: "floating",
      setEnabled: (enabled) => set({ enabled }),
      setActive: (active) => set({ active }),
      setIdleTimeout: (idleTimeout) => set({ idleTimeout }),
      setType: (type) => set({ type }),
    }),
    {
      name: "screensaver-settings",
      partialize: (state) => ({
        enabled: state.enabled,
        // 不持久化 idleTimeout，方便测试时修改
        type: state.type,
      }),
    }
  )
);
