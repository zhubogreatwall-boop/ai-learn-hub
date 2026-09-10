import Link from "next/link";
import { courseSeries } from "../data/course";

export default function CoursePage() {
  return (
    <div>
      <div className="page-overline">图文课程 · Course</div>
      <h1 className="page-title">🎓 图文课程</h1>
      <p className="page-desc">
        把一本书拆成一套可逐步消化的图文课。点进课程看目录，一讲一讲慢慢看。
      </p>

      <div className="card-grid">
        {courseSeries.map((s) => {
          const readyCount = s.lessons.filter(
            (l) => l.status === "ready"
          ).length;
          const cover = s.lessons.find((l) => l.status === "ready");
          return (
            <Link
              key={s.id}
              href={`/course/${s.id}`}
              className="card hoverable flex flex-col no-underline"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="tag">{s.meta}</span>
                <span className="tag tag-gray">
                  共 {s.lessons.length} 讲 · 已更新 {readyCount} 讲
                </span>
              </div>
              <h2 className="font-bold text-[17px] mb-1">{s.title}</h2>
              <p className="card-summary flex-1">{s.desc}</p>
              {cover && (
                <p className="text-[12px] text-[var(--text-muted)] mt-2">
                  最新 · 第 {cover.no} 讲 {cover.title}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
