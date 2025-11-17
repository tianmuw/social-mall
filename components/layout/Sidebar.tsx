import Link from 'next/link';
import { Home, Users, MessageSquare, User } from 'lucide-react';

export function Sidebar() {
  // 侧边栏按钮的通用样式
  const iconStyle = "h-10 w-10 p-2 rounded-lg text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all";

  return (
    <aside className="w-16 flex flex-col items-center gap-4 py-4 bg-neutral-800 border-r border-neutral-700">

      {/* Logo (我们先用文字代替) */}
      <div className="h-10 w-10 flex items-center justify-center bg-blue-600 rounded-lg text-white font-bold">
        S
      </div>

      <div className="border-t border-neutral-700 w-full my-2"></div>

      {/* 1. 广场 */}
      <Link href="/" title="广场">
        <Home className={iconStyle} />
      </Link>

      {/* 2. 关注 */}
      <Link href="/follow" title="关注">
        <Users className={iconStyle} />
      </Link>

      {/* 3. 私信 */}
      <Link href="/messages" title="私信">
        <MessageSquare className={iconStyle} />
      </Link>

      {/* 4. 个人主页 */}
      <Link href="/profile/me" title="个人主页">
        <User className={iconStyle} />
      </Link>

    </aside>
  );
}