import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoadingState {
  isLoading: boolean;
  progress: number;
  showOnRefresh: boolean;
  minDuration: number; // 最小显示时间（毫秒）
  hasShownInitial: boolean; // 是否已显示过初始加载
}

interface LoadingStore extends LoadingState {
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setShowOnRefresh: (show: boolean) => void;
  setHasShownInitial: (shown: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>()(
  persist(
    (set) => ({
      isLoading: true,
      progress: 0,
      showOnRefresh: false,
      minDuration: 2000,
      hasShownInitial: false,
      setLoading: (isLoading) => set({ isLoading }),
      setProgress: (progress) => set({ progress }),
      setShowOnRefresh: (showOnRefresh) => set({ showOnRefresh }),
      setHasShownInitial: (hasShownInitial) => set({ hasShownInitial }),
    }),
    {
      name: "loading-settings",
      partialize: (state) => ({
        showOnRefresh: state.showOnRefresh,
        hasShownInitial: state.hasShownInitial,
      }),
    }
  )
);
