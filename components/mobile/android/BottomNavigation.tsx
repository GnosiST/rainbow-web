"use client";

import { usePageStore, PageType } from "@/lib/stores/page-store";

interface BottomNavProps {
  config: {
    height: string;
    bg: string;
    activeColor: string;
    inactiveColor: string;
  };
}

const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
  {
    id: "about",
    label: "About",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
      </svg>
    ),
  },
  {
    id: "photos",
    label: "Photos",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    ),
  },
];

export function AndroidBottomNavigation({ config }: BottomNavProps) {
  const { replace, currentPage } = usePageStore();

  return (
    <nav
      className="flex items-center justify-around shrink-0"
      style={{
        height: config.height,
        background: config.bg,
      }}
    >
      {navItems.map((item) => {
        const isActive = currentPage?.type === item.id;
        return (
          <button
            key={item.id}
            onClick={() => replace(item.id)}
            className="flex flex-col items-center gap-0.5 px-4 py-2 transition-colors relative"
            style={{
              color: isActive ? config.activeColor : config.inactiveColor,
            }}
          >
            {/* 活动指示器 */}
            {isActive && (
              <div
                className="absolute top-1 w-16 h-8 rounded-full opacity-20"
                style={{ background: config.activeColor }}
              />
            )}
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
