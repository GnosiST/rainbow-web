"use client";

import { usePageStore } from "@/lib/stores/page-store";

interface PageHeaderProps {
  config: {
    headerHeight: string;
    textColor: string;
  };
  showBack?: boolean;
}

export function IOSPageHeader({ config, showBack = false }: PageHeaderProps) {
  const { currentPage, pop, stack } = usePageStore();
  const canGoBack = showBack && stack.length > 1;

  return (
    <div
      className="flex items-center px-4 shrink-0 bg-white/90 backdrop-blur-xl border-b border-black/5"
      style={{ height: config.headerHeight }}
    >
      {/* 返回按钮 */}
      {canGoBack && (
        <button
          onClick={pop}
          className="flex items-center gap-1 text-[#007AFF] -ml-2 pr-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <span className="text-sm">返回</span>
        </button>
      )}

      {/* 标题 */}
      <h1
        className="flex-1 text-center font-semibold text-lg truncate"
        style={{ color: config.textColor }}
      >
        {currentPage?.title || ""}
      </h1>

      {/* 占位，保持标题居中 */}
      {canGoBack && <div className="w-14" />}
    </div>
  );
}
