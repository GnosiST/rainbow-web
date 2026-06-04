"use client";

import React from "react";
import { useUIStore, BackgroundTheme, FilterType, backgroundThemes } from "@/lib/stores/ui-store";
import { useThemeStore } from "@/lib/stores/theme-store";
import { 
  useIllustrationThemeStore, 
  illustrationBackgrounds, 
  illustrationAccentColors,
  type IllustrationBackgroundKey,
  type IllustrationAccentKey 
} from "@/lib/stores/illustration-theme-store";

export function SettingsWindow() {
  const {
    backgroundTheme,
    setBackgroundTheme,
    brightness,
    setBrightness,
    filter,
    setFilter,
    screenArea,
    setScreenArea,
    screensaverEnabled,
    setScreensaverEnabled,
    screensaverTimeout,
    setScreensaverTimeout,
    screensaverType,
    setScreensaverType,
    showLoadingOnRefresh,
    setShowLoadingOnRefresh,
    reset,
  } = useUIStore();

  const { theme: desktopTheme, setTheme: setDesktopTheme } = useThemeStore();
  const { 
    config: illustrationConfig, 
    setBackground: setIllustrationBackground,
    setAccentColor: setIllustrationAccent,
    reset: resetIllustration 
  } = useIllustrationThemeStore();
  const isIllustration = desktopTheme === "illustration";

  const handleReset = () => {
    if (confirm("确定要重置所有设置吗？")) {
      reset();
      resetIllustration();
    }
  };

  return (
    <div className={`w-full h-full overflow-auto p-4 space-y-6 ${isIllustration ? "bg-[#FFF9F0]" : ""}`}>
      {/* 桌面风格 */}
      <SettingsSection title="桌面风格" isIllustration={isIllustration}>
        <div className="flex gap-3">
          <StyleButton
            active={desktopTheme === "macos"}
            onClick={() => setDesktopTheme("macos")}
            label="macOS"
            icon="🍎"
            isIllustration={isIllustration}
          />
          <StyleButton
            active={desktopTheme === "windows"}
            onClick={() => setDesktopTheme("windows")}
            label="Windows"
            icon="🪟"
            isIllustration={isIllustration}
          />
          <StyleButton
            active={desktopTheme === "illustration"}
            onClick={() => setDesktopTheme("illustration")}
            label="Sketch"
            icon="✏️"
            isIllustration={isIllustration}
          />
        </div>
      </SettingsSection>

      {/* 背景主题 - 仅在非插画主题时显示 */}
      {desktopTheme !== "illustration" && (
        <SettingsSection title="背景主题" isIllustration={isIllustration}>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(backgroundThemes) as BackgroundTheme[]).map((key) => (
              <button
                key={key}
                onClick={() => setBackgroundTheme(key)}
                className={`
                  h-16 rounded-lg overflow-hidden relative
                  ${backgroundTheme === key ? "ring-2 ring-blue-500" : "ring-1 ring-white/10"}
                `}
                style={{ background: backgroundThemes[key].css }}
              >
                <span className="absolute bottom-1 left-1 text-[10px] text-white/70 bg-black/30 px-1 rounded">
                  {backgroundThemes[key].name}
                </span>
              </button>
            ))}
          </div>
        </SettingsSection>
      )}

      {/* 插画主题背景 - 仅在插画主题时显示 */}
      {desktopTheme === "illustration" && (
        <SettingsSection title="背景颜色" isIllustration={isIllustration}>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(illustrationBackgrounds) as IllustrationBackgroundKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setIllustrationBackground(illustrationBackgrounds[key].value)}
                className={`
                  h-12 rounded-lg overflow-hidden relative border-2 transition-all
                  ${illustrationConfig.background === illustrationBackgrounds[key].value 
                    ? "border-[#E17055] ring-2 ring-[#E17055]/30" 
                    : "border-[#2D3436]/20 hover:border-[#2D3436]/40"}
                `}
                style={{ background: illustrationBackgrounds[key].value }}
              >
                <span className="absolute bottom-1 left-1 text-[10px] text-[#2D3436]/70 bg-white/50 px-1 rounded">
                  {illustrationBackgrounds[key].name}
                </span>
              </button>
            ))}
          </div>
        </SettingsSection>
      )}

      {/* 插画主题强调色 - 仅在插画主题时显示 */}
      {desktopTheme === "illustration" && (
        <SettingsSection title="强调色" isIllustration={isIllustration}>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(illustrationAccentColors) as IllustrationAccentKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setIllustrationAccent(illustrationAccentColors[key].value)}
                className={`
                  w-8 h-8 rounded-full transition-all
                  ${illustrationConfig.accentColor === illustrationAccentColors[key].value 
                    ? "ring-2 ring-offset-2 ring-[#2D3436]" 
                    : "hover:scale-110"}
                `}
                style={{ background: illustrationAccentColors[key].value }}
                title={illustrationAccentColors[key].name}
              />
            ))}
          </div>
        </SettingsSection>
      )}

      {/* 亮度 */}
      <SettingsSection title="亮度" isIllustration={isIllustration}>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${isIllustration ? "text-[#636E72]" : "text-white/40"}`}>🌙</span>
          <input
            type="range"
            min="0.7"
            max="1.3"
            step="0.05"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
            className={`flex-1 ${isIllustration ? "accent-[#E17055]" : "accent-blue-500"}`}
          />
          <span className={`text-sm ${isIllustration ? "text-[#636E72]" : "text-white/40"}`}>☀️</span>
          <span className={`text-sm w-12 text-right ${isIllustration ? "text-[#636E72]" : "text-white/60"}`}>
            {Math.round(brightness * 100)}%
          </span>
        </div>
      </SettingsSection>

      {/* 滤镜 */}
      <SettingsSection title="滤镜效果" isIllustration={isIllustration}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
          className={`w-full rounded-lg px-3 py-2 text-sm ${
            isIllustration 
              ? "bg-white border-2 border-[#2D3436]/20 text-[#2D3436]" 
              : "bg-white/10 border border-white/10 text-white/80"
          }`}
        >
          <option value="normal">正常</option>
          <option value="bw">黑白</option>
          <option value="invertHue">色相反转</option>
          <option value="negative">负片</option>
        </select>
      </SettingsSection>

      {/* 屏幕区域 */}
      <SettingsSection title="窗口最大化区域" isIllustration={isIllustration}>
        <div className="flex gap-3">
          <StyleButton
            active={screenArea === "safe"}
            onClick={() => setScreenArea("safe")}
            label="安全区域"
            description="保留边距"
            isIllustration={isIllustration}
          />
          <StyleButton
            active={screenArea === "full"}
            onClick={() => setScreenArea("full")}
            label="全屏"
            description="填满屏幕"
            isIllustration={isIllustration}
          />
        </div>
      </SettingsSection>

      {/* 屏保设置 */}
      <SettingsSection title="屏保" isIllustration={isIllustration}>
        <div className="space-y-3">
          <ToggleRow
            label="启用屏保"
            checked={screensaverEnabled}
            onChange={setScreensaverEnabled}
            isIllustration={isIllustration}
          />
          {screensaverEnabled && (
            <>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isIllustration ? "text-[#636E72]" : "text-white/60"}`}>空闲时间</span>
                <select
                  value={screensaverTimeout}
                  onChange={(e) => setScreensaverTimeout(parseInt(e.target.value))}
                  className={`rounded px-2 py-1 text-sm ${
                    isIllustration 
                      ? "bg-white border-2 border-[#2D3436]/20 text-[#2D3436]" 
                      : "bg-white/10 border border-white/10 text-white/80"
                  }`}
                >
                  <option value="10">10 秒</option>
                  <option value="30">30 秒</option>
                  <option value="60">1 分钟</option>
                  <option value="120">2 分钟</option>
                  <option value="300">5 分钟</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isIllustration ? "text-[#636E72]" : "text-white/60"}`}>屏保类型</span>
                <select
                  value={screensaverType}
                  onChange={(e) => setScreensaverType(e.target.value as "floating" | "clock" | "matrix")}
                  className={`rounded px-2 py-1 text-sm ${
                    isIllustration 
                      ? "bg-white border-2 border-[#2D3436]/20 text-[#2D3436]" 
                      : "bg-white/10 border border-white/10 text-white/80"
                  }`}
                >
                  <option value="floating">漂浮图标</option>
                  <option value="clock">时钟</option>
                  <option value="matrix">矩阵雨</option>
                </select>
              </div>
            </>
          )}
        </div>
      </SettingsSection>

      {/* 加载屏幕 */}
      <SettingsSection title="加载屏幕" isIllustration={isIllustration}>
        <ToggleRow
          label="刷新时显示加载动画"
          checked={showLoadingOnRefresh}
          onChange={setShowLoadingOnRefresh}
          isIllustration={isIllustration}
        />
      </SettingsSection>

      {/* 重置 */}
      <div className={`pt-4 border-t ${isIllustration ? "border-[#2D3436]/10" : "border-white/10"}`}>
        <button
          onClick={handleReset}
          className={`w-full py-2 rounded-lg text-sm transition-colors ${
            isIllustration 
              ? "bg-[#E17055]/20 hover:bg-[#E17055]/30 text-[#E17055] border-2 border-[#E17055]/30" 
              : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
          }`}
        >
          重置所有设置
        </button>
      </div>
    </div>
  );
}

// 设置分组
function SettingsSection({ title, children, isIllustration = false }: { title: string; children: React.ReactNode; isIllustration?: boolean }) {
  return (
    <div>
      <h3 className={`text-xs uppercase tracking-wider mb-2 ${isIllustration ? "text-[#636E72]" : "text-white/40"}`}>{title}</h3>
      {children}
    </div>
  );
}

// 风格按钮
function StyleButton({ 
  active, 
  onClick, 
  label, 
  icon,
  description,
  isIllustration = false
}: { 
  active: boolean; 
  onClick: () => void; 
  label: string; 
  icon?: string;
  description?: string;
  isIllustration?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-3 px-4 rounded-lg text-sm transition-all border
        ${isIllustration
          ? active 
            ? "bg-[#E17055]/20 border-[#E17055] text-[#2D3436]" 
            : "bg-white border-[#2D3436]/20 text-[#636E72] hover:bg-[#2D3436]/5"
          : active 
            ? "bg-blue-500/30 border-blue-500 text-white" 
            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
      {description && (
        <span className={`block text-xs mt-0.5 ${isIllustration ? "text-[#636E72]/60" : "text-white/40"}`}>{description}</span>
      )}
    </button>
  );
}

// 开关行
function ToggleRow({ 
  label, 
  checked, 
  onChange,
  isIllustration = false
}: { 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  isIllustration?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${isIllustration ? "text-[#636E72]" : "text-white/60"}`}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`
          w-11 h-6 rounded-full transition-colors relative
          ${isIllustration
            ? checked ? "bg-[#E17055]" : "bg-[#2D3436]/20"
            : checked ? "bg-blue-500" : "bg-white/20"
          }
        `}
      >
        <span
          className={`
            absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
            ${checked ? "left-6" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}
