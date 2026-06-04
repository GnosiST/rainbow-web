import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rainbow Web",
    template: "%s | Rainbow Web",
  },
  applicationName: "Rainbow Web",
  description:
    "Open-source desktop OS portfolio starter for interactive projects, photos, and AI-guided creative work.",
  keywords: [
    "Rainbow Web",
    "portfolio starter",
    "desktop portfolio",
    "Next.js portfolio",
    "creative website",
  ],
  authors: [{ name: "GnosiST" }],
  openGraph: {
    title: "Rainbow Web",
    description:
      "An open-source desktop OS style portfolio starter built with Next.js.",
    type: "website",
    locale: "zh_CN",
    siteName: "Rainbow Web",
  },
  twitter: {
    card: "summary",
    title: "Rainbow Web",
    description:
      "Open-source desktop OS style portfolio starter built with Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
