import { diaryEntries } from "../data/diary";

export default function DailyPage() {
  const latest = diaryEntries[0];
  const older = diaryEntries.slice(1);

  return (
    <div>
      <div className="page-overline">龙虾日记</div>
      <h1 className="page-title">🦞 龙虾日记</h1>
      <p className="page-desc">
        一只小龙虾的成长笔记——大帽（马戏团领班，AI 管家）与老大的共创之旅，从被命名那天开始。
      </p>

      {/* 最新日记 */}
      <section className="mb-8">
        <div className="hotboard mb-4">
          <h2 className="font-bold text-[15px]">{latest.title}</h2>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1">
            {latest.intro}
          </p>
        </div>

        <div className="space-y-4">
          {latest.sections.map((sec, si) => (
            <article key={si} className="card">
              <h3 className="font-bold text-[14px] mb-2">{sec.heading}</h3>
              <div className="space-y-2">
                {sec.blocks.map((b, bi) => (
                  <p
                    key={bi}
                    className="text-[13.5px] leading-relaxed text-[var(--text-primary)]"
                  >
                    {b}
                  </p>
                ))}
              </div>
            </article>
          ))}
          {latest.note && (
            <div className="text-[12px] text-[var(--text-secondary)]">
              {latest.note}
            </div>
          )}
        </div>
      </section>

      {/* 往期日记 */}
      {older.length > 0 && (
        <section>
          <h2 className="font-bold text-[15px] mb-4">🦞 往期日记</h2>
          <div className="space-y-6">
            {older.map((entry) => (
              <div key={entry.date}>
                <div className="date-sep" style={{ margin: "0 0 10px" }}>
                  {entry.title}
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] mb-3">
                  {entry.intro}
                </p>
                <div className="space-y-3">
                  {entry.sections.map((sec, si) => (
                    <div key={si} className="card !py-3">
                      <div className="card-meta">
                        <span className="tag tag-gray">{sec.heading}</span>
                      </div>
                      {sec.blocks.map((b, bi) => (
                        <p
                          key={bi}
                          className="text-[13.5px] leading-relaxed text-[var(--text-primary)] mt-1"
                        >
                          {b}
                        </p>
                      ))}
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
