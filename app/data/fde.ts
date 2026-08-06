export interface FdeCourse {
  id: string;
  title: string;
  stage: "基础" | "进阶" | "实战";
  tag: string;
  summary: string;
  reason: string;
  duration: string;
}

export const fdeCourses: FdeCourse[] = [
  {
    id: "f1",
    title: "FDE 是什么：前沿部署工程师的定位与前景",
    stage: "基础",
    tag: "认知入门",
    summary:
      "FDE（Forward-Deployed Engineer，前沿部署工程师）是 2026 年 AI 圈最抢手的职业。需求预计年内暴涨 2100%，而全美合格 FDE 只有约 2000 人。这门课讲清楚 FDE 到底是干什么的、和普通工程师有什么区别。",
    reason: "先搞清楚赛道再上路。OpenAI 的 Deployment Company 和 Anthropic 的 Ode 都在抢这种人。",
    duration: "30 分钟",
  },
  {
    id: "f2",
    title: "AI 应用开发基础：从 API 调用到 Prompt 工程",
    stage: "基础",
    tag: "技术底座",
    summary:
      "掌握调用大模型 API、设计高质量 Prompt、处理上下文窗口、函数调用等基本功，这是所有 FDE 工作的起点。",
    reason: "FDE 的技术底子不是写算法，而是把模型用明白。",
    duration: "3 小时",
  },
  {
    id: "f3",
    title: "RAG 系统实战：企业知识库问答从零搭建",
    stage: "进阶",
    tag: "核心技术",
    summary:
      "文本切分、向量化、检索排序、重排、评估，完整走一遍企业级 RAG 系统。附带生产环境的踩坑记录。",
    reason: "企业落地最高频的需求就是知识库问答，RAG 是 FDE 的看家本领。",
    duration: "6 小时",
  },
  {
    id: "f4",
    title: "Agent 开发：工具调用、记忆与多智能体协作",
    stage: "进阶",
    tag: "核心技术",
    summary:
      "从单轮对话到自主执行任务：工具调用、记忆系统、任务拆解、多智能体协作、安全护栏与可观测性。",
    reason: "企业客户要的不再是聊天机器人，而是能自己干活的 Agent。",
    duration: "8 小时",
  },
  {
    id: "f5",
    title: "客户现场交付：需求挖掘与系统集成",
    stage: "实战",
    tag: "交付能力",
    summary:
      "FDE 的核心场景：驻场客户。学习如何做需求访谈、技术范围界定、与客户现有系统集成、处理权限与合规约束。",
    reason: "技术之外，FDE 一半的功夫在沟通和交付，这门课补上这块。",
    duration: "4 小时",
  },
  {
    id: "f6",
    title: "FDE 项目实战：从需求到上线全流程",
    stage: "实战",
    tag: "综合实战",
    summary:
      "用一个完整的企业案例走通 FDE 全流程：需求发现、方案设计、开发实现、部署上线、效果度量。",
    reason: "综合演练前面所有技能，完成从学习者到 FDE 的转变。",
    duration: "2 天",
  },
];
