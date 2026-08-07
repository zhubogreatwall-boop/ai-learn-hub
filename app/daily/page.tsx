import { dailies } from "../data/daily";

export default function DailyPage() {
  const latest = dailies[0];
  const older = dailies.slice(1);

  return (
    <div>
      <div className="page-overline">Daily</div>
      <h1 className="page-title">📅 学习日报</h1>
      <p className="page-desc">
        每天精选 AI 学习圈值得看的内容，几分钟读完今天的重点。
      </p>

      {/* 最新日报 */}
      <section className="mb-8">
        <div className="hotboard mb-4">
          <h2 className="font-bold text-[15px]">{latest.title}</h2>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1">
            {latest.intro}
          </p>
        </div>
        <div className="space-y-3">
          {latest.items.map((item) => (
            <article key={item.id} className="card hoverable">
              <div className="card-meta">
                <span className="tag">{item.category}</span>
                <span>{item.source}</span>
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
            </article>
          ))}
        </div>
      </section>

      {/* 历史日报 */}
      {older.length > 0 && (
        <section>
          <h2 className="font-bold text-[15px] mb-4">📂 往期日报</h2>
          <div className="space-y-6">
            {older.map((daily) => (
              <div key={daily.date}>
                <div className="date-sep" style={{ margin: "0 0 10px" }}>
                  {daily.title}
                </div>
                <div className="space-y-2">
                  {daily.items.map((item) => (
                    <div key={item.id} className="card !py-3 hoverable">
                      <div className="card-meta">
                        <span className="tag tag-gray">{item.category}</span>
                        <span>{item.source}</span>
                      </div>
                      <p className="text-[14px] font-medium leading-snug">
                        <a
                          href={item.original || "#"}
                          target={item.original ? "_blank" : undefined}
                          rel={item.original ? "noopener noreferrer" : undefined}
                          className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                        >
                          {item.title}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
