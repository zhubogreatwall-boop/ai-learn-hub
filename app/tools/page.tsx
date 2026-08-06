import { toolItems } from "../data/tools";

export default function ToolsPage() {
  return (
    <div className="container-site py-8">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#2563eb] uppercase mb-2">
          Tools
        </div>
        <h1 className="text-3xl font-bold tracking-tight">🛠️ 工具推荐</h1>
        <p className="text-[15px] text-gray-500 mt-2">
          学习 AI、RAG、Agent 开发路上亲测好用的工具与技能，持续更新。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {toolItems.map((tool) => (
          <article key={tool.id} className="card flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="tag">{tool.tag}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1.5">
              {tool.original ? (
                <a
                  href={tool.original}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors"
                >
                  {tool.name}
                </a>
              ) : (
                tool.name
              )}
            </h3>
            <p className="summary flex-1">{tool.summary}</p>
            <p className="text-[13px] text-[#2563eb]/80 mt-3 leading-relaxed">
              💡 {tool.reason}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
