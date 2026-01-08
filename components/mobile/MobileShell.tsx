"use client";

import { useMobileThemeStore } from "@/lib/stores/mobile-theme-store";
import { usePageStore } from "@/lib/stores/page-store";
import { mobileThemeConfigs } from "@/lib/mobile-theme-config";
import { IOSStatusBar } from "./ios/StatusBar";
import { IOSTabBar } from "./ios/TabBar";
import { IOSPageHeader } from "./ios/PageHeader";
import { AndroidStatusBar } from "./android/StatusBar";
import { AndroidBottomNavigation } from "./android/BottomNavigation";
import { AndroidAppBar } from "./android/AppBar";
import { PageView } from "./PageView";

export function MobileShell() {
  const { theme } = useMobileThemeStore();
  const { stack } = usePageStore();
  const config = mobileThemeConfigs[theme];

  const isIOS = theme === "ios";
  const showBack = stack.length > 1;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: config.page.bg }}
    >
      {/* 状态栏 */}
      {isIOS ? (
        <IOSStatusBar config={config.statusBar} />
      ) : (
        <AndroidStatusBar config={config.statusBar} />
      )}

      {/* 页面头部 */}
      {isIOS ? (
        <IOSPageHeader config={config.page} showBack={showBack} />
      ) : (
        <AndroidAppBar
          config={{
            headerHeight: config.page.headerHeight,
            textColor: config.page.textColor,
            bg: config.statusBar.bg,
          }}
          showBack={showBack}
        />
      )}

      {/* 页面内容 */}
      <PageView />

      {/* 底部导航 */}
      {isIOS ? (
        <IOSTabBar config={config.navigation} />
      ) : (
        <AndroidBottomNavigation config={config.navigation} />
      )}
    </div>
  );
}
