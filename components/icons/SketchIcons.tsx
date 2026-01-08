"use client";

import React from "react";

// 手绘素描风格图标
// 特点：不规则线条、手绘感、柔和颜色

interface IconProps {
  className?: string;
  size?: number;
}

// 通用 SVG 包装器
function IconWrapper({ children, className = "", size = 64 }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

// 文件夹图标 - 手绘风格
export function SketchFolderIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 文件夹主体 - 不规则边缘 */}
      <path
        d="M8 18c0-2 1.5-3.5 3.5-3.5h12l4 5h25c2 0 3.5 1.5 3.5 3.5v26c0 2-1.5 3.5-3.5 3.5h-41c-2 0-3.5-1.5-3.5-3.5v-31z"
        fill="#FFD93D"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
      />
      {/* 文件夹折痕 */}
      <path
        d="M8 23h48"
        stroke="#E17055"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* 手绘装饰线 */}
      <path
        d="M15 32c2 0 4 1 6 1s4-1 6-1"
        stroke="#2D3436"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </IconWrapper>
  );
}

// 照片图标 - 手绘风格
export function SketchPhotosIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 照片框 */}
      <rect
        x="10"
        y="14"
        width="44"
        height="36"
        rx="3"
        fill="#FFF9F0"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 山景 */}
      <path
        d="M10 42l12-14 8 10 6-6 18 18H10z"
        fill="#71B280"
        stroke="#2D3436"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 太阳 */}
      <circle
        cx="44"
        cy="26"
        r="6"
        fill="#FFD93D"
        stroke="#E17055"
        strokeWidth="1.5"
      />
      {/* 太阳光线 */}
      <g stroke="#FFD93D" strokeWidth="1" strokeLinecap="round" opacity="0.7">
        <line x1="44" y1="16" x2="44" y2="18" />
        <line x1="52" y1="26" x2="54" y2="26" />
        <line x1="50" y1="20" x2="51" y2="19" />
        <line x1="50" y1="32" x2="51" y2="33" />
      </g>
    </IconWrapper>
  );
}

// 设置图标 - 手绘齿轮
export function SketchSettingsIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 齿轮外圈 */}
      <path
        d="M32 12l3 4 5-1 2 4-4 3 1 5-5 1-2 4-4-3-5 1-2-4 4-3-1-5 5-1 2-4z"
        fill="#636E72"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0, 8)"
      />
      {/* 中心圆 */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="#FFF9F0"
        stroke="#2D3436"
        strokeWidth="2"
      />
      {/* 装饰点 */}
      <circle cx="32" cy="32" r="3" fill="#E17055" />
    </IconWrapper>
  );
}

// 幻灯片图标 - 手绘风格
export function SketchSlideshowIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 屏幕框 */}
      <rect
        x="8"
        y="12"
        width="48"
        height="32"
        rx="3"
        fill="#FFF9F0"
        stroke="#2D3436"
        strokeWidth="2"
      />
      {/* 播放按钮 */}
      <path
        d="M28 22l12 8-12 8z"
        fill="#E17055"
        stroke="#2D3436"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* 支架 */}
      <path
        d="M26 44v8M38 44v8M22 52h20"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconWrapper>
  );
}

// 关于图标 - 手绘人物
export function SketchAboutIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 头部 */}
      <circle
        cx="32"
        cy="20"
        r="12"
        fill="#FFEAA7"
        stroke="#2D3436"
        strokeWidth="2"
      />
      {/* 眼睛 */}
      <circle cx="28" cy="18" r="2" fill="#2D3436" />
      <circle cx="36" cy="18" r="2" fill="#2D3436" />
      {/* 微笑 */}
      <path
        d="M28 24c2 2 6 2 8 0"
        stroke="#2D3436"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* 身体 */}
      <path
        d="M20 56c0-12 6-20 12-20s12 8 12 20"
        fill="#74B9FF"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconWrapper>
  );
}

// Safari/浏览器图标 - 手绘指南针
export function SketchSafariIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 圆形边框 */}
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="#74B9FF"
        stroke="#2D3436"
        strokeWidth="2"
      />
      {/* 指南针指针 */}
      <path
        d="M32 14l6 18-6 6-6-6z"
        fill="#E17055"
        stroke="#2D3436"
        strokeWidth="1.5"
      />
      <path
        d="M32 50l-6-18 6-6 6 6z"
        fill="#FFF9F0"
        stroke="#2D3436"
        strokeWidth="1.5"
      />
      {/* 中心点 */}
      <circle cx="32" cy="32" r="3" fill="#2D3436" />
    </IconWrapper>
  );
}

// 垃圾桶图标 - 手绘风格
export function SketchTrashIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 桶身 */}
      <path
        d="M16 20h32l-4 36H20z"
        fill="#636E72"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 盖子 */}
      <rect
        x="12"
        y="14"
        width="40"
        height="6"
        rx="2"
        fill="#2D3436"
        stroke="#2D3436"
        strokeWidth="1"
      />
      {/* 把手 */}
      <path
        d="M26 14v-4c0-1 1-2 2-2h8c1 0 2 1 2 2v4"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* 装饰线 */}
      <g stroke="#FFF9F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <line x1="24" y1="28" x2="22" y2="48" />
        <line x1="32" y1="28" x2="32" y2="48" />
        <line x1="40" y1="28" x2="42" y2="48" />
      </g>
    </IconWrapper>
  );
}

// 邮件图标 - 手绘信封
export function SketchMailIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 信封主体 */}
      <rect
        x="8"
        y="16"
        width="48"
        height="32"
        rx="3"
        fill="#FFF9F0"
        stroke="#2D3436"
        strokeWidth="2"
      />
      {/* 信封折线 */}
      <path
        d="M8 18l24 16 24-16"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 装饰 - 小心形 */}
      <path
        d="M30 38c-2-2-4-2-4 0s4 4 4 4 4-2 4-4-2-2-4 0z"
        fill="#E17055"
        stroke="#E17055"
        strokeWidth="1"
      />
    </IconWrapper>
  );
}

// 商店图标 - 手绘购物袋
export function SketchShopIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 购物袋主体 */}
      <path
        d="M12 24h40l-4 32H16z"
        fill="#FFEAA7"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 把手 */}
      <path
        d="M22 24v-6c0-5.5 4.5-10 10-10s10 4.5 10 10v6"
        stroke="#2D3436"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* 装饰星星 */}
      <path
        d="M32 36l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"
        fill="#E17055"
        stroke="#2D3436"
        strokeWidth="1"
      />
    </IconWrapper>
  );
}

// Launchpad 图标 - 手绘网格
export function SketchLaunchpadIcon({ className, size }: IconProps) {
  return (
    <IconWrapper className={className} size={size}>
      {/* 背景圆 */}
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="#636E72"
        stroke="#2D3436"
        strokeWidth="2"
      />
      {/* 网格点 */}
      <g fill="#FFF9F0">
        <circle cx="20" cy="20" r="4" />
        <circle cx="32" cy="20" r="4" />
        <circle cx="44" cy="20" r="4" />
        <circle cx="20" cy="32" r="4" />
        <circle cx="32" cy="32" r="4" />
        <circle cx="44" cy="32" r="4" />
        <circle cx="20" cy="44" r="4" />
        <circle cx="32" cy="44" r="4" />
        <circle cx="44" cy="44" r="4" />
      </g>
    </IconWrapper>
  );
}

// 导出所有图标
export const SketchIcons = {
  Folder: SketchFolderIcon,
  Photos: SketchPhotosIcon,
  Settings: SketchSettingsIcon,
  Slideshow: SketchSlideshowIcon,
  About: SketchAboutIcon,
  Safari: SketchSafariIcon,
  Trash: SketchTrashIcon,
  Mail: SketchMailIcon,
  Shop: SketchShopIcon,
  Launchpad: SketchLaunchpadIcon,
};
