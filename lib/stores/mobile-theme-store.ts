import { create } from "zustand";
import { persist } from "zustand/middleware";

// 移动端主题类型
export type MobileTheme = "ios" | "android" | "illustration";

interface MobileThemeState {
  theme: MobileTheme;
  setTheme: (theme: MobileTheme) => void;
}

export const useMobileThemeStore = create<MobileThemeState>()(
  persist(
    (set) => ({
      theme: "ios",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "mobile-theme",
    }
  )
);
