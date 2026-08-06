export interface Book {
  id: string;
  title: string;
  author: string;
  level: "入门" | "进阶" | "实战";
  tag: string;
  summary: string;
  reason: string;
}

export const books: Book[] = [
  {
    id: "b1",
    title: "深度学习（花书）",
    author: "Ian Goodfellow 等",
    level: "入门",
    tag: "理论基石",
    summary:
      "AI 领域的圣经级教材，从线性代数、概率论讲起，一路覆盖深度网络、正则化、优化、CNN/RNN 到生成模型。",
    reason: "想认真学 AI 的第一本书。数学基础薄也能读，后面几章可以留着用到再翻。",
  },
  {
    id: "b2",
    title: "动手学深度学习（Dive into DL）",
    author: "李沐等",
    level: "入门",
    tag: "动手实践",
    summary:
      "开源免费的中文深度学习教材，代码优先，PyTorch 实现，每章都有可运行的示例。",
    reason: "花书讲原理，这本讲动手。搭配 B 站李沐的课程视频，入门效率极高。",
  },
  {
    id: "b3",
    title: "机器学习（西瓜书）",
    author: "周志华",
    level: "入门",
    tag: "理论基石",
    summary:
      "国内最经典的机器学习教材，用通俗语言讲透传统 ML 的核心算法与数学推导。",
    reason: "和花书二选一即可，这本更亲民，适合先建立整体框架。",
  },
  {
    id: "b4",
    title: "LLM 工程实践指南",
    author: "社区开源项目",
    level: "实战",
    tag: "RAG/Agent",
    summary:
      "围绕大模型应用的工程实践合集，覆盖 Prompt 工程、RAG 检索增强、Agent 编排、评估与落地。",
    reason: "学 RAG 和 Agent 开发最对口的资料，跟着项目做一遍比看十篇教程强。",
  },
  {
    id: "b5",
    title: "Prompt Engineering 指南",
    author: "DAIR.AI",
    level: "入门",
    tag: "提示词",
    summary:
      "开源的中文提示词工程指南，从基础技巧到高级模式，配大量示例。",
    reason: "零基础入门提示词的首选，免费开源，案例丰富。",
  },
  {
    id: "b6",
    title: "AI 产品方法论",
    author: "行业实践合集",
    level: "进阶",
    tag: "产品思维",
    summary:
      "从产品视角拆解 AI 落地：需求判断、技术选型、数据飞轮、组织变革，适合做 AI 产品或咨询的人。",
    reason: "技术之外的产品与商业视角，配合老大做企业应用的背景，实践价值高。",
  },
  {
    id: "b7",
    title: "RAG 实战：构建企业级知识库问答",
    author: "社区开源项目",
    level: "实战",
    tag: "RAG/Agent",
    summary:
      "从文本切分、向量化、检索排序到重排、评估，完整走一遍企业级 RAG 系统的搭建。",
    reason: "做企业知识库问答的完整路线图，踩坑记录尤其值钱。",
  },
  {
    id: "b8",
    title: "Agent 开发实战：从零到生产",
    author: "社区开源项目",
    level: "实战",
    tag: "RAG/Agent",
    summary:
      "围绕 Agent 的工程实践：工具调用、多智能体协作、记忆系统、安全护栏、可观测性。",
    reason: "Agent 是 2026 年最热的工程方向，这本把从原型到生产的坑都踩了一遍。",
  },
];
