// 路径: app/(main)/page.tsx
// (替换你现有的同名文件)

"use client"; // 1. 关键改动：转换为客户端组件以使用 state 和 ref

import Image from "next/image";
import Link from "next/link"; // 2. 关键改动：导入 Link
import { useState, useRef } from "react"; // 3. 关键改动：导入 hooks
import { Search, Zap, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";

// --- Mock Data (模拟数据) ---
// (这部分与之前相同)

// 1.1.2 趋势 (模拟10条)
// 增加一个类型定义，方便我们写函数
type Trend = {
  id: string;
  rank: number;
  type: "product" | "topic";
  title: string;
  imageUrl: string;
  views: string;
};

const mockTrends: Trend[] = [
  {
    id: "t1",
    rank: 1,
    type: "product",
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
  {
    id: "t4",
    rank: 4,
    type: "topic",
    title: "#周末去哪儿#",
    imageUrl: "https://images.unsplash.com/photo-1501183007986-d0d08a3c826b?q=80&w=1920&auto=format&fit=crop",
    views: "3.5M",
  },
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
  // ... (其余数据填充逻辑与之前相同)
];
for (let i = 3; i <= 30; i++) {
  mockNews.push({
    id: `n${i}`,
    tag: i % 2 === 0 ? "#商品#" : "#热议#",
    title: `这是第 ${i} 条新闻的标题，内容关于...`,
    source: `来自 @用户${i}`,
    views: `${(30 - i) * 10.1}k`,
    imageUrl: `https://source.unsplash.com/random/800x600?sig=${i}`,
  });
}

// 辅助函数：根据趋势类型生成跳转链接
const getTrendHref = (trend: Trend) => {
  // 移除标题中的#号，并编码，使其可以安全地放在URL中
  const safeTitle = encodeURIComponent(trend.title.replace(/#/g, ""));
  
  // 商家商品 -> /products/商品ID
  // 话题 -> /topics/话题标题
  return trend.type === "product"
    ? `/products/${trend.id}`
    : `/topics/${safeTitle}`;
};


// --- 广场页面 ( / ) ---
export default function PlazaPage() {
  return (
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
 * (这部分与之前相同)
 */
function SearchBar() {
  return (
    <div>
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
 * 关键改动：使用 state 和 ref 来实现按钮控制
 */
function TrendsCarousel({ trends }: { trends: Trend[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalTrends = trends.length;

  const handleScroll = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 关键改动：宽度现在是 container 的 clientWidth，确保一次只滚一个
    const slideWidth = container.clientWidth;
    let newIndex = currentIndex;

    if (direction === "next") {
      newIndex = Math.min(currentIndex + 1, totalTrends - 1);
      container.scrollTo({ left: newIndex * slideWidth, behavior: "smooth" });
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
      container.scrollTo({ left: newIndex * slideWidth, behavior: "smooth" });
    }
    
    setCurrentIndex(newIndex);
  };

  return (
    <section className="relative"> {/* 1. 添加 relative 以便定位按钮 */}
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-6 w-6 text-yellow-400" />
        <h2 className="text-2xl font-bold">今日趋势</h2>
      </div>

      {/* 轮播图容器:
        - 关键改动：移除 snap-x, snap-mandatory
        - 关键改动：添加 overflow-x-hidden (因为我们用按钮控制)
      */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-hidden pb-4" // 隐藏滚动条，禁用CSS Snap
      >
        {trends.map((trend) => (
          // 2. 关键改动：整个卡片用 <Link> 包裹
          <Link
            href={getTrendHref(trend)}
            key={trend.id}
            // 关键改动：w-full 确保一张卡片占满宽度
            className="relative h-72 w-full flex-shrink-0 overflow-hidden rounded-2xl"
          >
            {/* 背景图片 */}
            <Image
              src={trend.imageUrl}
              alt={trend.title}
              fill
              className="object-cover"
              priority={trend.rank <= 2}
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* 内容 */}
            <div className="absolute bottom-0 left-0 p-6">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold">
                TOP {trend.rank}
              </span>
              <h3 className="mt-3 text-3xl font-bold">{trend.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{trend.views} 浏览</p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* 3. 关键改动：添加控制按钮 */}
      {/* 上一张按钮 */}
      <button
        onClick={() => handleScroll("prev")}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* 下一张按钮 */}
      <button
        onClick={() => handleScroll("next")}
        disabled={currentIndex === totalTrends - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}


/**
 * 1.1.3 新闻消息 (Top 30)
 */
function NewsFeed({ news }: { news: typeof mockNews }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Newspaper className="h-6 w-6 text-neutral-300" />
        <h2 className="text-2xl font-bold">新鲜事</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {news.map((item) => (
          // 关键改动：整个卡片用 <Link> 包裹
          // 链接到 /news/新闻ID
          <Link
            href={`/news/${item.id}`}
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
          </Link>
        ))}
      </div>
    </section>
  );
}