import Link from "next/link";
import { hotItems, hotRanking } from "./data/hot";

const categories = ["全部", "模型", "产品", "行业", "论文", "教程", "观点", "标准", "安全"];

export default function Home() {
  return (
    <div className="container-site py-8">
      {/* 顶部标题区 */}
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#2563eb] uppercase mb-2">
          AI Learning Hub
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          今天学点什么？
        </h1>
        <p className="text-[15px] text-gray-500 mt-2 leading-relaxed">
          精选 AI 学习路上的热点、书籍、课程与企业实践，每天进步一点点。
        </p>
      </div>

      {/* 分类标签 */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {categories.map((c) => (
          <button
            key={c}
            className={`tag ${c === "全部" ? "" : "tag-gray"} cursor-pointer`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* 左侧：最新精选列表 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">🔥 最新精选</h2>
            <Link href="/daily" className="text-sm text-[#2563eb] hover:underline">
              学习日报 →
            </Link>
          </div>

          <div className="space-y-3">
            {hotItems.map((item, i) => (
              <article key={item.id} className="card">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                  <span className="tag">{item.category}</span>
                  <span>{item.source}</span>
                  <span>·</span>
                  <span>{item.time}</span>
                  <span className="heat ml-auto">热度 {item.heat}</span>
                </div>
                <h3 className="font-semibold text-[15px] leading-snug mb-1.5">
                  <a
                    href={item.original}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563eb] transition-colors"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="summary">{item.summary}</p>
                <p className="text-[13px] text-[#2563eb]/80 mt-2 leading-relaxed">
                  💡 {item.reason}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* 右侧：热度榜 */}
        <aside>
          <div className="sticky top-20">
            <div className="card mb-4">
              <h2 className="font-bold mb-3">🏆 今日热度榜</h2>
              <ol className="space-y-2.5">
                {hotRanking.slice(0, 8).map((item, i) => (
                  <li key={item.id} className="flex items-start gap-2.5">
                    <span
                      className={`text-sm font-bold w-5 text-right shrink-0 ${
                        i < 3 ? "text-[#dc2626]" : "text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <a
                      href={item.original}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] leading-snug hover:text-[#2563eb] transition-colors line-clamp-2"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card">
              <h2 className="font-bold mb-2">📚 本周必读</h2>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                AI 学习书单持续更新中，从入门到实战，帮你在 AI 路上少走弯路。
              </p>
              <Link
                href="/books"
                className="inline-block mt-3 text-sm text-[#2563eb] font-medium hover:underline"
              >
                查看书单 →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
