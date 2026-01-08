import { DesktopTheme } from "./stores/theme-store";

export interface ThemeConfig {
  name: string;
  background: string;
  topbar: {
    height: string;
    bg: string;
    textColor: string;
    position: "top" | "bottom";
  };
  dock: {
    show: boolean;
    position: "bottom" | "left";
    bg: string;
    iconSize: string;
    borderRadius: string;
  };
  taskbar: {
    show: boolean;
    height: string;
    bg: string;
  };
  desktopIcons: {
    position: "right" | "left";
    iconBg: string;
    labelBg: string;
  };
  window: {
    titleBarPosition: "left" | "right";
    borderRadius: string;
  };
}

export const themeConfigs: Record<DesktopTheme, ThemeConfig> = {
  macos: {
    name: "macOS",
    background: `
      radial-gradient(ellipse at top, #1e3a5f 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, #4a1942 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, #0c2340 0%, transparent 50%),
      linear-gradient(180deg, #0a1628 0%, #1a0a20 50%, #0d1f3c 100%)
    `,
    topbar: {
      height: "24px",
      bg: "rgba(0, 0, 0, 0.25)",
      textColor: "white",
      position: "top",
    },
    dock: {
      show: true,
      position: "bottom",
      bg: "rgba(255, 255, 255, 0.2)",
      iconSize: "48px",
      borderRadius: "16px",
    },
    taskbar: {
      show: false,
      height: "0",
      bg: "",
    },
    desktopIcons: {
      position: "right",
      iconBg: "rgba(255, 255, 255, 0.1)",
      labelBg: "rgba(0, 0, 0, 0.3)",
    },
    window: {
      titleBarPosition: "left",
      borderRadius: "12px",
    },
  },
  windows: {
    name: "Windows",
    background: `
      linear-gradient(135deg, #0078D4 0%, #00BCF2 100%)
    `,
    topbar: {
      height: "0",
      bg: "transparent",
      textColor: "white",
      position: "top",
    },
    dock: {
      show: false,
      position: "bottom",
      bg: "",
      iconSize: "0",
      borderRadius: "0",
    },
    taskbar: {
      show: true,
      height: "48px",
      bg: "rgba(0, 0, 0, 0.85)",
    },
    desktopIcons: {
      position: "left",
      iconBg: "transparent",
      labelBg: "transparent",
    },
    window: {
      titleBarPosition: "right",
      borderRadius: "0px",
    },
  },
  illustration: {
    name: "Illustration",
    background: "#FFF9F0",
    topbar: {
      height: "0",
      bg: "transparent",
      textColor: "#2D3436",
      position: "top",
    },
    dock: {
      show: false,
      position: "bottom",
      bg: "",
      iconSize: "0",
      borderRadius: "0",
    },
    taskbar: {
      show: false,
      height: "0",
      bg: "",
    },
    desktopIcons: {
      position: "left",
      iconBg: "#FFF9F0",
      labelBg: "#FFF9F0",
    },
    window: {
      titleBarPosition: "left",
      borderRadius: "16px",
    },
  },
};
