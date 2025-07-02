import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ContextProvider from "@/components/Provider/Provider";
import QueryProvider from "@/components/QueryProvider";

const pretendard = localFont({
  src: "fonts/PretendardVariable.woff2",
  display: "swap",
  preload: true,
  variable: "--font-pretendard",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
});

export const metadata: Metadata = {
  title: "HDC LABS R114 Admin System",
  description: "에이치디씨랩스 부동산114 관리자 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <QueryProvider>
          <ContextProvider>{children}</ContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
