import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, courseSeries } from "../../../data/course";

const typeMeta: Record<string, { label: string; cls: string }> = {
  concept: { label: "概念", cls: "cb-concept" },
  case: { label: "案例", cls: "cb-case" },
  method: { label: "方法", cls: "cb-method" },
  pitfall: { label: "避坑", cls: "cb-pitfall" },
  keypoint: { label: "要点", cls: "cb-keypoint" },
  quote: { label: "金句", cls: "cb-quote" },
};

export function generateStaticParams() {
  const out: { series: string; no: string }[] = [];
  for (const s of courseSeries) {
    for (const l of s.lessons) {
      if (l.status === "ready") out.push({ series: s.id, no: l.no });
    }
  }
  return out;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ series: string; no: string }>;
}) {
  const { series, no } = await params;
  const s = courseSeries.find((x) => x.id === series);
  const l = s?.lessons.find((x) => x.no === no);

  if (!s || !l || l.status !== "ready") notFound();

  /* ---------- 静态 HTML 类型：iframe 嵌入 ---------- */
  if (s.kind === "html" && l.file) {
    return (
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <Link href={`/course/${s.id}`} className="tag">
            ← {s.title}
          </Link>
          <span className="tag tag-gray">
            第 {no} 讲 / 共 {s.lessons.length} 讲
          </span>
        </div>
        <div className="page-overline">PMBOK 第 8 版课程</div>
        <h1 className="page-title">{l.title}</h1>
        <p className="page-desc">{l.summary}</p>

        <iframe
          src={`/course/${s.id}/${l.file}`}
          title={`${s.title} · 第 ${no} 讲 · ${l.title}`}
          style={{
            width: "100%",
            height: "82vh",
            minHeight: "560px",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            background: "#fff",
            marginTop: "16px",
          }}
        />
      </div>
    );
  }

  /* ---------- 图文块类型：渲染 blocks ---------- */
  const course = courses.find((c) => c.id === `${s.id}-${no}`);
  if (!course) notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <Link href={`/course/${s.id}`} className="tag">
          ← {s.title}
        </Link>
        <span className="tag tag-gray">
          第 {no} 讲 / 共 {s.lessons.length} 讲
        </span>
      </div>

      <div className="page-overline">图文课程 · {s.title}</div>
      <h1 className="page-title">{course.title}</h1>
      <p className="page-desc">{course.summary}</p>

      <div className="card mb-4 mt-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="tag tag-gray">{course.module}</span>
          <span className="tag">{course.lesson}</span>
        </div>
        <h2 className="font-bold text-[16px] leading-snug mb-1">
          {course.title}
        </h2>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
          {course.summary}
        </p>
      </div>

      <div className="space-y-3">
        {course.blocks.map((b, i) => {
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

      {course.practice && (
        <div className="card mt-4">
          <h3 className="font-bold text-[14px] mb-1">本期练习</h3>
          <div className="space-y-1">
            {course.practice.map((p, i) => (
              <p
                key={i}
                className="text-[13px] text-[var(--text-primary)] leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {course.next && (
        <div className="mt-4 text-[13px] text-[var(--text-secondary)]">
          下一期 · {course.next}
        </div>
      )}
    </div>
  );
}
