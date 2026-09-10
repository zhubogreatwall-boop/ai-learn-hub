import Link from "next/link";
import { courses, courseSeries } from "../data/course";

const typeMeta: Record<string, { label: string; cls: string }> = {
  concept: { label: "概念", cls: "cb-concept" },
  case: { label: "案例", cls: "cb-case" },
  method: { label: "方法", cls: "cb-method" },
  pitfall: { label: "避坑", cls: "cb-pitfall" },
  keypoint: { label: "要点", cls: "cb-keypoint" },
  quote: { label: "金句", cls: "cb-quote" },
};

export default function CoursePage() {
  const lesson = courses[0];
  const pmbok8 = courseSeries.find((s) => s.id === "pmbok8");
  const pmbok8Ready = pmbok8?.lessons.filter((l) => l.status === "ready").length ?? 0;

  return (
    <div>
      <div className="page-overline">图文课程 · Course</div>
      <h1 className="page-title">🎓 图文课程</h1>
      <p className="page-desc">
        把一本书拆成一套可逐步消化的图文课。结构化展示，一讲一讲慢慢看。
      </p>

      {/* ---------- 课程系列 ---------- */}
      <h2 className="text-[18px] font-bold mt-8 mb-3">📚 课程系列</h2>
      <div className="card-grid">
        {courseSeries.map((s) => (
          <article key={s.id} className="card hoverable flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="tag">{s.meta}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1">{s.title}</h3>
            <p className="card-summary flex-1">{s.desc}</p>
          </article>
        ))}
      </div>

      {/* ---------- PMBOK 第8版 讲次列表 ---------- */}
      {pmbok8 && (
        <>
          <h2 className="text-[18px] font-bold mt-10 mb-1">📘 {pmbok8.title}</h2>
          <p className="text-[13px] text-[var(--text-muted)] mb-3">
            共 {pmbok8.lessons.length} 讲 · 已更新 {pmbok8Ready} 讲
          </p>
          <div className="card-grid">
            {pmbok8.lessons.map((l) =>
              l.status === "ready" && l.href ? (
                <Link
                  key={l.no}
                  href={l.href}
                  className="card hoverable flex flex-col no-underline"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag">第 {l.no} 讲</span>
                    <span className="tag tag-accent">已更新</span>
                  </div>
                  <h3 className="font-bold text-[16px] mb-1">{l.title}</h3>
                  <p className="card-summary flex-1">{l.summary}</p>
                </Link>
              ) : (
                <article key={l.no} className="card flex flex-col opacity-55">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag tag-gray">第 {l.no} 讲</span>
                    <span className="tag tag-gray">待更新</span>
                  </div>
                  <h3 className="font-bold text-[16px] text-[var(--text-muted)]">
                    敬请期待
                  </h3>
                </article>
              )
            )}
          </div>
        </>
      )}

      {/* ---------- 《知识炼金术》第 01 期（原有内容） ---------- */}
      <h2 id="zs-01" className="text-[18px] font-bold mt-10 mb-1">
        📖 {lesson.title}
      </h2>
      <p className="text-[13px] text-[var(--text-muted)] mb-3">
        《知识炼金术》图文系列课 · {lesson.lesson}
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
          <h3 className="font-bold text-[14px] mb-1">本期练习</h3>
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
          下一期 · {lesson.next}
        </div>
      )}
    </div>
  );
}
