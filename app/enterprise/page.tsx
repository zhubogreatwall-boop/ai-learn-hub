import { enterpriseItems } from "../data/enterprise";

export default function EnterprisePage() {
  return (
    <div className="container-site py-8">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#2563eb] uppercase mb-2">
          Enterprise AI
        </div>
        <h1 className="text-3xl font-bold tracking-tight">🏢 企业应用</h1>
        <p className="text-[15px] text-gray-500 mt-2">
          AI 在企业落地的案例、方法论与行业观察。从组织变革到最后一公里交付。
        </p>
      </div>

      <div className="space-y-3">
        {enterpriseItems.map((item) => (
          <article key={item.id} className="card">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
              <span className="tag">{item.tag}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1.5">
              {item.original ? (
                <a
                  href={item.original}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors"
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>
            <p className="summary">{item.summary}</p>
            <p className="text-[13px] text-[#2563eb]/80 mt-2 leading-relaxed">
              💡 {item.reason}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
