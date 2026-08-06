import { dailies } from "../data/daily";

export default function DailyPage() {
  const latest = dailies[0];
  const older = dailies.slice(1);

  return (
    <div className="container-site py-8">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#2563eb] uppercase mb-2">
          Daily
        </div>
        <h1 className="text-3xl font-bold tracking-tight">📰 学习日报</h1>
        <p className="text-[15px] text-gray-500 mt-2">
          每天精选 AI 学习圈值得看的内容，几分钟读完今天的重点。
        </p>
      </div>

      {/* 最新日报 */}
      <section className="mb-8">
        <div className="card bg-[#f8faff] border-[#dbe7ff] mb-4">
          <h2 className="font-bold text-lg">{latest.title}</h2>
          <p className="text-[14px] text-gray-600 mt-1">{latest.intro}</p>
        </div>
        <div className="space-y-3">
          {latest.items.map((item) => (
            <article key={item.id} className="card">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                <span className="tag">{item.category}</span>
                <span>{item.source}</span>
              </div>
              <h3 className="font-semibold text-[15px] mb-1.5">
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
            </article>
          ))}
        </div>
      </section>

      {/* 历史日报 */}
      {older.length > 0 && (
        <section>
          <h2 className="font-bold text-lg mb-4">📜 往期日报</h2>
          <div className="space-y-6">
            {older.map((daily) => (
              <div key={daily.date}>
                <h3 className="font-bold text-[15px] mb-2 text-gray-700">{daily.title}</h3>
                <div className="space-y-2">
                  {daily.items.map((item) => (
                    <div key={item.id} className="card !py-3">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <span className="tag tag-gray">{item.category}</span>
                        <span>{item.source}</span>
                      </div>
                      <p className="text-[14px] font-medium leading-snug">
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
