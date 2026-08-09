import { diaryEntries } from "../data/diary";

export default function DailyPage() {
  return (
    <div>
      <div className="page-overline">龙虾日记</div>
      <h1 className="page-title">🦞 龙虾日记</h1>
      <p className="page-desc">
        一只小龙虾的成长笔记——大帽（马戏团领班，AI 管家）与老大的共创之旅。点条目看完整日记。
      </p>

      {/* 日记列表（新闻流样式，一条一条） */}
      <div className="space-y-3">
        {diaryEntries.map((entry) => (
          <article key={entry.date} className="card hoverable">
            <a
              href={`/daily/${entry.date}`}
              className="card-title"
            >
              {entry.title}
            </a>
            <div className="card-meta mt-1">
              <span className="tag tag-gray">{entry.day}</span>
              <span>{entry.date}</span>
            </div>
            <p className="card-summary">{entry.intro}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
