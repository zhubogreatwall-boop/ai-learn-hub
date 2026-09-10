import Link from "next/link";

/**
 * PMBOK 第 8 版课程 · 讲次详情
 * 每讲的 HTML 静态文件放在 public/course/pmbok8/ 下
 * 新增讲次：把 html 文件放进去，并在下面登记即可
 */
const pmbok8Files: Record<
  string,
  { file: string; title: string; summary: string }
> = {
  "01": {
    file: "01-overview.html",
    title: "整体结构导览",
    summary:
      "一页看懂第 8 版全书骨架：两本书装订、6 项原则、7 个绩效域、40 个流程、5 个附录。",
  },
};

export function generateStaticParams() {
  return Object.keys(pmbok8Files).map((no) => ({ no }));
}

export default async function Pmbok8LessonPage({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  const { no } = await params;
  const lesson = pmbok8Files[no];

  if (!lesson) {
    return (
      <div>
        <div className="page-overline">图文课程 · PMBOK 第 8 版</div>
        <h1 className="page-title">第 {no} 讲 · 待更新</h1>
        <p className="page-desc">这一讲还在制作中，敬请期待。</p>
        <p className="mt-4">
          <Link href="/course" className="tag">
            ← 返回课程列表
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="page-overline">PMBOK 第 8 版课程 · 第 {no} 讲</div>
        <Link href="/course" className="tag">
          ← 返回列表
        </Link>
      </div>
      <h1 className="page-title">{lesson.title}</h1>
      <p className="page-desc">{lesson.summary}</p>

      <iframe
        src={`/course/pmbok8/${lesson.file}`}
        title={`PMBOK 第 8 版 · 第 ${no} 讲 · ${lesson.title}`}
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
