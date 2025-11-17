// 这是你的 "广场" 页面 ( / )
export default function PlazaPage() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">广场</h1>
      <p>这里是广场页面。内容区域是可滚动的。</p>
      {/* 我们可以放很多内容来测试滚动 */}
      <div className="h-[2000px] bg-neutral-700 rounded-lg mt-4 flex items-center justify-center">
        一个很高很高，用来测试滚动的div
      </div>
    </div>
  );
}