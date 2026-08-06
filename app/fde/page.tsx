import { fdeCourses } from "../data/fde";

const stages = ["基础", "进阶", "实战"] as const;

export default function FdePage() {
  return (
    <div className="container-site py-8">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#2563eb] uppercase mb-2">
          FDE Learning Path
        </div>
        <h1 className="text-3xl font-bold tracking-tight">🎓 FDE 课程</h1>
        <p className="text-[15px] text-gray-500 mt-2">
          前沿部署工程师（Forward-Deployed Engineer）学习路径。2026 年 AI 圈最抢手的职业，
          需求年内预计暴涨 2100%。
        </p>
      </div>

      {/* 学习路径示意 */}
      <div className="card mb-6 bg-[#f8faff] border-[#dbe7ff]">
        <h2 className="font-bold mb-2">🗺️ 学习路径</h2>
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <span className="tag">① 认知入门</span>
          <span className="text-gray-400">→</span>
          <span className="tag">② 技术底座</span>
          <span className="text-gray-400">→</span>
          <span className="tag">③ RAG / Agent</span>
          <span className="text-gray-400">→</span>
          <span className="tag">④ 客户交付</span>
          <span className="text-gray-400">→</span>
          <span className="tag tag-hot">⑤ 综合实战</span>
        </div>
      </div>

      <div className="space-y-3">
        {fdeCourses.map((course) => (
          <article key={course.id} className="card">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
              <span className="tag">{course.stage}</span>
              <span className="tag tag-gray">{course.tag}</span>
              <span className="ml-auto">⏱ {course.duration}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1.5">{course.title}</h3>
            <p className="summary">{course.summary}</p>
            <p className="text-[13px] text-[#2563eb]/80 mt-2 leading-relaxed">
              💡 {course.reason}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
