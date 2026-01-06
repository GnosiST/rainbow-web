import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rainbow Portfolio",
  description: "桌面 OS 风格作品集网站",
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
