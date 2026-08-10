import { courses } from "../data/course";

const typeMeta: Record<string, { label: string; cls: string; icon: string }> = {
  concept: { label: "概念", cls: "cb-concept", icon: "📖" },
  case: { label: "案例", cls: "cb-case", icon: "🟨" },
  method: { label: "方法", cls: "cb-method", icon: "🟩" },
  pitfall: { label: "避坑", cls: "cb-pitfall", icon: "🟥" },
  keypoint: { label: "要点", cls: "cb-keypoint", icon: "⭐" },
  quote: { label: "金句", cls: "cb-quote", icon: "📌" },
};

export default function CoursePage() {
  const lesson = courses[0];

  return (
    <div>
      <div className="page-overline">图文课程 · Course</div>
      <h1 className="page-title">🎓 《知识炼金术》图文系列课</h1>
      <p className="page-desc">
        把一个 19 万字的书，拆成一套可逐步消化的图文课。结构化展示 + 彩色语义框，
        不配图也能看清方法。第一期样稿，先看效果。
      </p>

      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="tag tag-gray">{lesson.module}</span>
          <span className="tag">{lesson.lesson}</span>
        </div>
        <h2 className="font-bold text-[16px] leading-snug mb-1">
          {lesson.title}
        </h2>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
          {lesson.summary}
        </p>
      </div>

      <div className="space-y-3">
        {lesson.blocks.map((b, i) => {
          const meta = typeMeta[b.type];
          return (
            <div key={i} className={`cb ${meta?.cls ?? "cb-concept"}`}>
              <div className="cb-title">
                <span className="cb-badge">{meta?.icon ?? "▪️"}</span>
                <span className="cb-label">{meta?.label ?? ""}</span>
                <span className="cb-title-text">{b.title}</span>
              </div>
              <div className="cb-body">
                {b.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {lesson.practice && (
        <div className="card mt-4">
          <h3 className="font-bold text-[14px] mb-1">✍️ 本期练习</h3>
          <div className="space-y-1">
            {lesson.practice.map((p, i) => (
              <p key={i} className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {lesson.next && (
        <div className="mt-4 text-[13px] text-[var(--text-secondary)]">
          🔗 {lesson.next}
        </div>
      )}
    </div>
  );
}
