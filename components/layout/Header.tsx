"use client"; // 因为它需要读取 "大脑" 状态，所以是客户端组件

import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

export function Header() {
  // 从 "大脑" 读取状态
  const { isLoggedIn, user, login, logout } = useAuthStore();

  return (
    <header className="h-16 flex items-center justify-end px-6 bg-neutral-800 border-b border-neutral-700">

      {/* TODO: 全局搜索框 (我们先留空) */}

      {/* 登录/用户头像区域 */}
      <div className="ml-auto">
        {isLoggedIn ? (
          // 登录后: 显示头像和登出
          <div className="flex items-center gap-4">
            <Image
              src={user?.avatarUrl || ''}
              alt={user?.username || 'avatar'}
              width={32}
              height={32}
              className="rounded-full"
            />
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              登出
            </button>
          </div>
        ) : (
          // 登录前: 显示登录按钮
          <button
            onClick={login}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            模拟登录
          </button>
        )}
      </div>
    </header>
  );
}