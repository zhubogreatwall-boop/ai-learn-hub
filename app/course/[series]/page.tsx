import Link from "next/link";
import { notFound } from "next/navigation";
import { courseSeries } from "../../data/course";

export function generateStaticParams() {
  return courseSeries.map((s) => ({ series: s.id }));
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series } = await params;
  const s = courseSeries.find((x) => x.id === series);

  if (!s) notFound();

  const readyCount = s.lessons.filter((l) => l.status === "ready").length;

  return (
    <div>
      <p className="mb-2">
        <Link href="/course" className="tag">
          ← 返回课程列表
        </Link>
      </p>

      <div className="page-overline">图文课程 · 目录</div>
      <h1 className="page-title">{s.title}</h1>
      <p className="page-desc">{s.desc}</p>

      <p className="text-[13px] text-[var(--text-muted)] mb-4">
        共 {s.lessons.length} 讲 · 已更新 {readyCount} 讲
      </p>

      <div className="card-grid">
        {s.lessons.map((l) =>
          l.status === "ready" ? (
            <Link
              key={l.no}
              href={`/course/${s.id}/${l.no}`}
              className="card hoverable flex flex-col no-underline"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="tag">第 {l.no} 讲</span>
                <span className="tag tag-accent">已更新</span>
              </div>
              <h3 className="font-bold text-[15px] mb-1">{l.title}</h3>
              <p className="card-summary flex-1">{l.summary}</p>
            </Link>
          ) : (
            <article key={l.no} className="card flex flex-col opacity-55">
              <div className="flex items-center gap-2 mb-2">
                <span className="tag tag-gray">第 {l.no} 讲</span>
                <span className="tag tag-gray">待更新</span>
              </div>
              <h3 className="font-bold text-[15px] text-[var(--text-muted)]">
                敬请期待
              </h3>
            </article>
          )
        )}
      </div>
    </div>
  );
}
