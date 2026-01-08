import { create } from "zustand";
import { persist } from "zustand/middleware";

// 桌面端主题类型
export type DesktopTheme = "macos" | "windows" | "illustration";

// 移动端主题（M6 实现）
export type MobileTheme = "ios" | "android" | "illustration";

// 插画主题 ID
export type IllustrationThemeId = "sketch" | "watercolor" | "pixel" | null;

interface ThemeState {
  // 桌面端主题
  theme: DesktopTheme;
  setTheme: (theme: DesktopTheme) => void;
  toggleTheme: () => void;
  
  // 插画主题 ID（当 theme 为 "illustration" 时使用）
  illustrationThemeId: IllustrationThemeId;
  setIllustrationThemeId: (id: IllustrationThemeId) => void;
  
  // 移动端主题
  mobileTheme: MobileTheme;
  setMobileTheme: (theme: MobileTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // 桌面端
      theme: "macos",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().theme;
        // 在 macos 和 windows 之间切换，跳过 illustration
        set({ theme: current === "macos" ? "windows" : "macos" });
      },
      
      // 插画主题
      illustrationThemeId: "sketch",
      setIllustrationThemeId: (id) => set({ illustrationThemeId: id }),
      
      // 移动端
      mobileTheme: "ios",
      setMobileTheme: (mobileTheme) => set({ mobileTheme }),
    }),
    {
      name: "desktop-theme",
    }
  )
);
