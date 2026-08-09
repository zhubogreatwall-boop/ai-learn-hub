import Link from "next/link";
import { diaryEntries } from "../../data/diary";

export function generateStaticParams() {
  return diaryEntries.map((entry) => ({ date: entry.date }));
}

export default async function DiaryDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const entry = diaryEntries.find((e) => e.date === date);

  if (!entry) {
    return (
      <div>
        <div className="page-overline">龙虾日记</div>
        <h1 className="page-title">找不到这篇日记</h1>
        <Link
          href="/daily"
          className="text-[var(--accent)] hover:underline text-[14px]"
        >
          ← 返回日记列表
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-overline">
        <Link href="/daily" className="text-[var(--text-secondary)] hover:text-[var(--accent)]">
          ← 龙虾日记
        </Link>
      </div>
      <h1 className="page-title">{entry.title}</h1>
      <div className="card-meta mb-4">
        <span className="tag tag-gray">{entry.day}</span>
        <span>{entry.date}</span>
      </div>
      <p className="text-[14px] text-[var(--text-secondary)] mb-4">
        {entry.intro}
      </p>

      <div className="space-y-4">
        {entry.sections.map((sec, si) => (
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
      </div>

      {entry.note && (
        <div className="mt-3 text-[12px] text-[var(--text-secondary)]">
          {entry.note}
        </div>
      )}
    </div>
  );
}
