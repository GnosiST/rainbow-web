"use client";

import { usePageStore } from "@/lib/stores/page-store";

interface AppBarProps {
  config: {
    headerHeight: string;
    textColor: string;
    bg: string;
  };
  showBack?: boolean;
}

export function AndroidAppBar({ config, showBack = false }: AppBarProps) {
  const { currentPage, pop, stack } = usePageStore();
  const canGoBack = showBack && stack.length > 1;

  return (
    <div
      className="flex items-center px-4 shrink-0"
      style={{
        height: config.headerHeight,
        background: config.bg,
      }}
    >
      {/* 返回按钮 */}
      {canGoBack && (
        <button
          onClick={pop}
          className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors"
          style={{ color: config.textColor }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
      )}

      {/* 标题 */}
      <h1
        className="flex-1 font-medium text-xl truncate"
        style={{ color: config.textColor }}
      >
        {currentPage?.title || ""}
      </h1>
    </div>
  );
}
