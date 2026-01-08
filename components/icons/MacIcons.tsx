// macOS 风格 SVG 图标（模拟 SF Symbols）
export const MacIcons = {
  // Finder 图标
  Finder: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="finderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6FCCF7" />
          <stop offset="100%" stopColor="#1B8CEB" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#finderGrad)" />
      <ellipse cx="32" cy="36" rx="18" ry="20" fill="white" />
      <ellipse cx="26" cy="32" rx="4" ry="5" fill="#1B8CEB" />
      <ellipse cx="38" cy="32" rx="4" ry="5" fill="#1B8CEB" />
      <path d="M24 44 Q32 50 40 44" stroke="#1B8CEB" strokeWidth="2" fill="none" />
    </svg>
  ),

  // 文件夹图标
  Folder: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#folderGrad)" />
      <path d="M12 22 L12 48 Q12 52 16 52 L48 52 Q52 52 52 48 L52 28 Q52 24 48 24 L32 24 L28 20 L16 20 Q12 20 12 24 Z" fill="white" opacity="0.9" />
    </svg>
  ),

  // 照片图标
  Photos: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="photosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#FFE66D" />
          <stop offset="100%" stopColor="#4ECDC4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#photosGrad)" />
      <circle cx="32" cy="32" r="16" fill="white" />
      <circle cx="32" cy="32" r="8" fill="#FF6B6B" />
      <circle cx="28" cy="28" r="3" fill="white" opacity="0.6" />
    </svg>
  ),

  // 设置图标
  Settings: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="settingsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B8B8D" />
          <stop offset="100%" stopColor="#636366" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#settingsGrad)" />
      <g fill="white">
        <circle cx="32" cy="32" r="10" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="32" cy="12" r="4" />
        <circle cx="32" cy="52" r="4" />
        <circle cx="12" cy="32" r="4" />
        <circle cx="52" cy="32" r="4" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="46" cy="18" r="3" />
        <circle cx="18" cy="46" r="3" />
        <circle cx="46" cy="46" r="3" />
      </g>
    </svg>
  ),

  // 播放/幻灯片图标
  Slideshow: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="playGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9500" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#playGrad)" />
      <path d="M26 20 L26 44 L46 32 Z" fill="white" />
    </svg>
  ),

  // 购物车图标
  Shop: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="shopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#shopGrad)" />
      <path d="M16 20 L20 20 L26 40 L46 40 L50 26 L24 26" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="48" r="4" fill="white" />
      <circle cx="44" cy="48" r="4" fill="white" />
    </svg>
  ),

  // 邮件图标
  Mail: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="mailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#mailGrad)" />
      <rect x="12" y="18" width="40" height="28" rx="4" fill="white" />
      <path d="M12 22 L32 36 L52 22" stroke="#3B82F6" strokeWidth="2" fill="none" />
    </svg>
  ),

  // 关于/用户图标
  About: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#aboutGrad)" />
      <circle cx="32" cy="24" r="10" fill="white" />
      <path d="M16 52 Q16 40 32 40 Q48 40 48 52" fill="white" />
    </svg>
  ),

  // Safari 图标
  Safari: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="safariGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#safariGrad)" />
      <circle cx="32" cy="32" r="18" fill="white" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#2563EB" strokeWidth="1" />
      <path d="M32 16 L34 30 L48 32 L34 34 L32 48 L30 34 L16 32 L30 30 Z" fill="#2563EB" />
      <path d="M32 16 L34 30 L32 32 L30 30 Z" fill="#EF4444" />
      <path d="M32 48 L30 34 L32 32 L34 34 Z" fill="#EF4444" />
    </svg>
  ),

  // Launchpad 图标
  Launchpad: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="launchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#launchGrad)" />
      <g fill="white">
        <circle cx="22" cy="22" r="6" />
        <circle cx="42" cy="22" r="6" />
        <circle cx="22" cy="42" r="6" />
        <circle cx="42" cy="42" r="6" />
      </g>
    </svg>
  ),

  // 垃圾桶图标
  Trash: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="trashGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#trashGrad)" />
      <path d="M20 22 L44 22 L42 50 L22 50 Z" fill="white" />
      <rect x="18" y="18" width="28" height="4" rx="2" fill="white" />
      <rect x="28" y="14" width="8" height="4" rx="1" fill="white" />
    </svg>
  ),
};
