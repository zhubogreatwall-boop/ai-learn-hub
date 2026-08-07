import { fdeCourses } from "../data/fde";

const stages = ["基础", "进阶", "实战"] as const;

export default function FdePage() {
  return (
    <div>
      <div className="page-overline">FDE Learning Path</div>
      <h1 className="page-title">🧑‍💻 FDE 课程</h1>
      <p className="page-desc">
        前沿部署工程师（Forward-Deployed Engineer）学习路径。2026 年 AI 圈最抢手的职业，
        需求年内预计暴涨 2100%。
      </p>

      {/* 学习路径示意 */}
      <div className="card mb-6">
        <h2 className="font-bold mb-2 text-[14px]">🛤️ 学习路径</h2>
        <div className="path-steps">
          <span className="tag">① 认知入门</span>
          <span className="path-arrow">→</span>
          <span className="tag">② 技术底座</span>
          <span className="path-arrow">→</span>
          <span className="tag">③ RAG / Agent</span>
          <span className="path-arrow">→</span>
          <span className="tag">④ 客户交付</span>
          <span className="path-arrow">→</span>
          <span className="tag" style={{ background: "var(--error)", color: "#fff" }}>
            ⑤ 综合实战
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {fdeCourses.map((course) => (
          <article key={course.id} className="card hoverable">
            <div className="card-meta">
              <span className="tag">{course.stage}</span>
              <span className="tag tag-gray">{course.tag}</span>
              <span className="ml-auto">⏱ {course.duration}</span>
            </div>
            <h3 className="card-title">{course.title}</h3>
            <p className="card-summary">{course.summary}</p>
            <p className="card-reason">💬 {course.reason}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
