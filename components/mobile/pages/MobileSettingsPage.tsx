"use client";

import { MobileThemeConfig } from "@/lib/mobile-theme-config";
import { useMobileThemeStore, MobileTheme } from "@/lib/stores/mobile-theme-store";
import { useUIStore, BackgroundTheme, backgroundThemes } from "@/lib/stores/ui-store";

interface MobileSettingsPageProps {
  config: MobileThemeConfig;
}

export function MobileSettingsPage({ config }: MobileSettingsPageProps) {
  const { theme: mobileTheme, setTheme: setMobileTheme } = useMobileThemeStore();
  const { brightness, setBrightness, backgroundTheme, setBackgroundTheme, reset } = useUIStore();

  const mobileThemes: { id: MobileTheme; name: string; icon: string }[] = [
    { id: "ios", name: "iOS", icon: "🍎" },
    { id: "android", name: "Android", icon: "🤖" },
  ];

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ background: config.page.bg }}
    >
      {/* 移动端主题 */}
      <div className="p-4">
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
          style={{ color: config.page.secondaryTextColor }}
        >
          移动端风格
        </h3>
        <div
          className="overflow-hidden"
          style={{
            background: config.page.cardBg,
            borderRadius: config.page.cardRadius,
          }}
        >
          {mobileThemes.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setMobileTheme(t.id)}
              className="w-full flex items-center justify-between px-4 py-3 transition-colors"
              style={{
                borderTop: idx > 0 ? `1px solid ${config.page.bg}` : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{t.icon}</span>
                <span style={{ color: config.page.textColor }}>{t.name}</span>
              </div>
              {mobileTheme === t.id && (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill={config.navigation.activeColor}
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 背景主题 */}
      <div className="p-4 pt-0">
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
          style={{ color: config.page.secondaryTextColor }}
        >
          背景主题
        </h3>
        <div
          className="overflow-hidden"
          style={{
            background: config.page.cardBg,
            borderRadius: config.page.cardRadius,
          }}
        >
          {(Object.keys(backgroundThemes) as BackgroundTheme[]).map((key, idx) => (
            <button
              key={key}
              onClick={() => setBackgroundTheme(key)}
              className="w-full flex items-center justify-between px-4 py-3 transition-colors"
              style={{
                borderTop: idx > 0 ? `1px solid ${config.page.bg}` : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ background: backgroundThemes[key].css }}
                />
                <span style={{ color: config.page.textColor }}>
                  {backgroundThemes[key].name}
                </span>
              </div>
              {backgroundTheme === key && (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill={config.navigation.activeColor}
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 亮度 */}
      <div className="p-4 pt-0">
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
          style={{ color: config.page.secondaryTextColor }}
        >
          亮度
        </h3>
        <div
          className="p-4"
          style={{
            background: config.page.cardBg,
            borderRadius: config.page.cardRadius,
          }}
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill={config.page.secondaryTextColor}
            >
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
            </svg>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={brightness}
              onChange={(e) => setBrightness(parseFloat(e.target.value))}
              className="flex-1 h-1 rounded-full appearance-none"
              style={{
                background: `linear-gradient(to right, ${config.navigation.activeColor} ${
                  ((brightness - 0.7) / 0.6) * 100
                }%, ${config.page.bg} ${((brightness - 0.7) / 0.6) * 100}%)`,
              }}
            />
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill={config.page.textColor}
            >
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 重置 */}
      <div className="p-4 pt-0">
        <button
          onClick={reset}
          className="w-full py-3 text-center text-red-500 font-medium"
          style={{
            background: config.page.cardBg,
            borderRadius: config.page.cardRadius,
          }}
        >
          重置所有设置
        </button>
      </div>
    </div>
  );
}
