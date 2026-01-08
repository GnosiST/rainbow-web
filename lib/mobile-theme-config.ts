import { MobileTheme } from "./stores/mobile-theme-store";

export interface MobileThemeConfig {
  name: string;
  statusBar: {
    height: string;
    bg: string;
    textColor: string;
    showTime: boolean;
    showBattery: boolean;
    showSignal: boolean;
  };
  navigation: {
    type: "tabbar" | "bottom-nav";
    height: string;
    bg: string;
    activeColor: string;
    inactiveColor: string;
  };
  page: {
    bg: string;
    cardBg: string;
    cardRadius: string;
    headerHeight: string;
    textColor: string;
    secondaryTextColor: string;
  };
  animation: {
    pageTransition: "slide" | "fade" | "none";
    duration: number;
  };
}

export const mobileThemeConfigs: Record<MobileTheme, MobileThemeConfig> = {
  ios: {
    name: "iOS",
    statusBar: {
      height: "44px",
      bg: "rgba(255, 255, 255, 0.9)",
      textColor: "#000",
      showTime: true,
      showBattery: true,
      showSignal: true,
    },
    navigation: {
      type: "tabbar",
      height: "83px",
      bg: "rgba(255, 255, 255, 0.9)",
      activeColor: "#007AFF",
      inactiveColor: "#8E8E93",
    },
    page: {
      bg: "#F2F2F7",
      cardBg: "#FFFFFF",
      cardRadius: "12px",
      headerHeight: "44px",
      textColor: "#000000",
      secondaryTextColor: "#8E8E93",
    },
    animation: {
      pageTransition: "slide",
      duration: 300,
    },
  },
  android: {
    name: "Android",
    statusBar: {
      height: "24px",
      bg: "#1F1F1F",
      textColor: "#FFF",
      showTime: true,
      showBattery: true,
      showSignal: true,
    },
    navigation: {
      type: "bottom-nav",
      height: "56px",
      bg: "#1F1F1F",
      activeColor: "#BB86FC",
      inactiveColor: "rgba(255, 255, 255, 0.5)",
    },
    page: {
      bg: "#121212",
      cardBg: "#1E1E1E",
      cardRadius: "8px",
      headerHeight: "56px",
      textColor: "#FFFFFF",
      secondaryTextColor: "rgba(255, 255, 255, 0.6)",
    },
    animation: {
      pageTransition: "fade",
      duration: 200,
    },
  },
  illustration: {
    name: "Illustration",
    statusBar: {
      height: "0",
      bg: "transparent",
      textColor: "#000",
      showTime: false,
      showBattery: false,
      showSignal: false,
    },
    navigation: {
      type: "tabbar",
      height: "60px",
      bg: "#FFFFFF",
      activeColor: "#000000",
      inactiveColor: "#999999",
    },
    page: {
      bg: "#FFFFFF",
      cardBg: "#FFFFFF",
      cardRadius: "0",
      headerHeight: "60px",
      textColor: "#000000",
      secondaryTextColor: "#666666",
    },
    animation: {
      pageTransition: "none",
      duration: 0,
    },
  },
};
