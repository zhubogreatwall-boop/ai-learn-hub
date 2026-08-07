import { toolItems } from "../data/tools";

export default function ToolsPage() {
  return (
    <div>
      <div className="page-overline">Tools</div>
      <h1 className="page-title">🧰 工具推荐</h1>
      <p className="page-desc">
        学习 AI、RAG、Agent 开发路上亲测好用的工具与技能，持续更新。
      </p>

      <div className="card-grid">
        {toolItems.map((tool) => (
          <article key={tool.id} className="card hoverable flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="tag">{tool.tag}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1.5">
              {tool.original ? (
                <a
                  href={tool.original}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  {tool.name}
                </a>
              ) : (
                tool.name
              )}
            </h3>
            <p className="card-summary flex-1">{tool.summary}</p>
            <p className="card-reason">💬 {tool.reason}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
