// 路径: app/(main)/page.tsx
// (替换你现有的同名文件)

import Image from "next/image";
import { Search, Zap, Newspaper } from "lucide-react";

// --- Mock Data (模拟数据) ---
// 你之后会用 API 从后端获取这些数据

// 1.1.2 趋势 (模拟10条)
const mockTrends = [
  {
    id: "t1",
    rank: 1,
    type: "product", // 'product' 或 'topic'
    title: "新款 CyberDrone X1",
    imageUrl: "https://images.unsplash.com/photo-1507577973340-63957813a216?q=80&w=1920&auto=format&fit=crop",
    views: "5.2M",
  },
  {
    id: "t2",
    rank: 2,
    type: "topic",
    title: "#AI会取代程序员吗#",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697320f64?q=80&w=1920&auto=format&fit=crop",
    views: "4.8M",
  },
  {
    id: "t3",
    rank: 3,
    type: "product",
    title: "“时光胶囊” 智能手表",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1920&auto=format&fit=crop",
    views: "4.1M",
  },
  // ... (你可以继续添加 7 条)
];

// 1.1.3 新闻消息 (模拟30条)
const mockNews = [
  {
    id: "n1",
    tag: "#科技#",
    title: "ProDeveloper (商家) 发布了新款VR眼镜",
    source: "来自 @ProDeveloper",
    views: "150.2k",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "n2",
    tag: "#生活#",
    title: "博主 @TravelAnna 分享了她的环球旅行必备好物",
    source: "来自 @TravelAnna",
    views: "120.k",
    imageUrl: "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "n3",
    tag: "#摄影#",
    title: "索尼发布 A9 III 全局快门相机，你怎么看？",
    source: "来自 话题 #摄影#",
    views: "98.5k",
    imageUrl: "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?q=80&w=800&auto=format&fit=crop",
  },
  // ... (你可以继续添加 27 条，这里仅为示例)
];
// 填充一些数据以便展示
for (let i = 4; i <= 30; i++) {
  mockNews.push({
    id: `n${i}`,
    tag: i % 2 === 0 ? "#商品#" : "#热议#",
    title: `这是第 ${i} 条新闻的标题，内容关于...`,
    source: `来自 @用户${i}`,
    views: `${(30 - i) * 10.1}k`,
    imageUrl: `https://source.unsplash.com/random/800x600?sig=${i}`, // 随机图片
  });
}

// --- 广场页面 ( / ) ---
export default function PlazaPage() {
  return (
    // 使用 flex-col 布局，各个部分垂直排列，gap-8 制造间距
    <div className="flex flex-col gap-8 text-white">
      {/* 1.1.1 搜索框 */}
      <SearchBar />

      {/* 1.1.2 趋势轮播图 */}
      <TrendsCarousel trends={mockTrends} />

      {/* 1.1.3 新闻消息 */}
      <NewsFeed news={mockNews} />
    </div>
  );
}

// --- 页面子组件 ---

/**
 * 1.1.1 搜索框
 */
function SearchBar() {
  return (
    <div>
      {/* 我们使用一个 relative 容器，并将图标 absolute 定位在内部。
        输入框使用 pl-10 (padding-left) 来为图标腾出空间。
        bg-neutral-800 是一个比 -900 稍亮的深灰色，用于区分。
      */}
      <label htmlFor="search" className="sr-only">
        搜索
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          id="search"
          name="search"
          className="w-full rounded-full border border-neutral-700 bg-neutral-800 py-3 pl-11 pr-4 text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="搜索商品, 商家, 用户..."
          type="search"
        />
      </div>
    </div>
  );
}

/**
 * 1.1.2 趋势轮播图 (Top 10)
 * 我们使用 Tailwind 的 'overflow-x-auto' 和 'scroll-snap' 来实现一个 CSS-only 轮播图。
 */
function TrendsCarousel({ trends }: { trends: typeof mockTrends }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-6 w-6 text-yellow-400" />
        <h2 className="text-2xl font-bold">今日趋势</h2>
      </div>

      {/* 轮播图容器:
        - flex: 让子元素水平排列
        - overflow-x-auto: 允许水平滚动
        - snap-x & snap-mandatory: 开启滚动捕捉，实现"轮播"效果
        - scrollbar-hide: 一个常用的 CSS 类 (你需要在 global.css 中添加它)
          (若要添加, 在 global.css 中加入: .scrollbar-hide::-webkit-scrollbar { display: none; } 
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } )
      */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="relative h-72 w-full flex-shrink-0 snap-center overflow-hidden rounded-2xl md:w-3/4"
          >
            {/* 背景图片 */}
            <Image
              src={trend.imageUrl}
              alt={trend.title}
              fill
              className="object-cover"
              priority={trend.rank <= 2} // 优先加载前两张
            />
            {/* 渐变遮罩，让文字更清晰 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* 内容 */}
            <div className="absolute bottom-0 left-0 p-6">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold">
                TOP {trend.rank}
              </span>
              <h3 className="mt-3 text-3xl font-bold">{trend.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{trend.views} 浏览</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * 1.1.3 新闻消息 (Top 30)
 * 我们使用 Tailwind Grid 布局来实现卡片流。
 */
function NewsFeed({ news }: { news: typeof mockNews }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Newspaper className="h-6 w-6 text-neutral-300" />
        <h2 className="text-2xl font-bold">新鲜事</h2>
      </div>

      {/* Grid 布局:
        - 默认为 1 列
        - md (中等屏幕) 及以上为 2 列
        - lg (大屏幕) 及以上为 3 列
        - xl (超大屏幕) 及以上为 4 列
      */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="flex transform flex-col overflow-hidden rounded-xl bg-neutral-800 shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:-translate-y-1"
          >
            {/* 卡片图片 */}
            <div className="relative h-40 w-full">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* 卡片内容 */}
            <div className="p-4">
              <span className="text-xs font-semibold text-blue-400">
                {item.tag}
              </span>
              <h4 className="mt-1 font-semibold leading-snug">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-neutral-400">
                {item.source} · {item.views} 浏览
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}