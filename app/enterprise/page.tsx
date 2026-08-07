import { enterpriseItems } from "../data/enterprise";

export default function EnterprisePage() {
  return (
    <div>
      <div className="page-overline">Enterprise AI</div>
      <h1 className="page-title">🏢 企业应用</h1>
      <p className="page-desc">
        AI 在企业落地的案例、方法论与行业观察。从组织变革到最后一公里交付。
      </p>

      <div className="space-y-3">
        {enterpriseItems.map((item) => (
          <article key={item.id} className="card hoverable">
            <div className="card-meta">
              <span className="tag">{item.tag}</span>
            </div>
            <a
              href={item.original || "#"}
              target={item.original ? "_blank" : undefined}
              rel={item.original ? "noopener noreferrer" : undefined}
              className="card-title"
            >
              {item.title}
            </a>
            <p className="card-summary">{item.summary}</p>
            <p className="card-reason">💬 {item.reason}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
