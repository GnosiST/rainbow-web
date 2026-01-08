"use client";

import { Topbar } from "@/components/desktop/Topbar";
import { Desktop } from "@/components/desktop/Desktop";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Screensaver } from "@/components/screensaver/Screensaver";
import { UIProvider } from "@/components/providers/UIProvider";
import { DeviceProvider } from "@/components/providers/DeviceProvider";
import { MobileShell } from "@/components/mobile/MobileShell";
import { useIsMobile, useIsHydrated } from "@/lib/stores/device-store";

function AppContent() {
  const isMobile = useIsMobile();
  const isHydrated = useIsHydrated();

  // 移动端视图
  if (isHydrated && isMobile) {
    return <MobileShell />;
  }

  // 桌面端视图（也是服务端渲染的默认视图）
  return (
    <>
      <LoadingScreen brandName="Rainbow" showProgress={true} />
      <Topbar />
      <Desktop />
      <Screensaver />
    </>
  );
}

export default function Home() {
  return (
    <UIProvider>
      <DeviceProvider>
        <AppContent />
      </DeviceProvider>
    </UIProvider>
  );
}
