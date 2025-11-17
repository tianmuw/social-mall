"use client";
import { ReactNode } from "react";

// 这是一个空的包裹组件，用来确保 Zustand 在客户端被正确初始化
// 这是 Next.js 14+ 中使用 Zustand 的最佳实践
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};