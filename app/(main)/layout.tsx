import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

// 这是你的 "L型" 布局
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* 1. 最左侧竖排 (固定) */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* 2. 最上面一排 (固定) */}
        <Header />

        {/* 3. 页面重点显示的区域 (可变/可滚动) */}
        <main className="flex-1 overflow-y-auto p-6">
          {children} {/* 页面内容会显示在这里 */}
        </main>
      </div>
    </div>
  );
}