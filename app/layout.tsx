import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/global.css";
import { AuthProvider } from "@/store/AuthProvider"; // 我们稍后会创建它

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Ecommerce",
  description: "My new platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {/* 用 Provider 包裹，让全局状态生效 */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}