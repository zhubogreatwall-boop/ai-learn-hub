export interface EnterpriseItem {
  id: string;
  title: string;
  tag: string;
  summary: string;
  reason: string;
  original?: string;
}

export const enterpriseItems: EnterpriseItem[] = [
  {
    id: "e1",
    title: "Univé：一家保险公司怎么让几千员工每周都在重构自己的工作",
    tag: "案例",
    summary:
      "荷兰保险巨头 Univé 的 AI 转型实录：领导定方向、治理给信心、员工造势能，三支柱让 AI 变成组织能力。",
    reason: "企业 AI 落地不是买工具，是改组织。这个案例把方法论讲透了。",
    original: "https://pmo-blog.vercel.app/posts/unive-ai-workforce",
  },
  {
    id: "e2",
    title: "OpenAI Deployment Company 与 Anthropic Ode：模型厂商下场做交付",
    tag: "行业",
    summary:
      "OpenAI 成立 Deployment Company 投入 40 亿美元，Anthropic 联合 Blackstone、高盛成立 Ode，专门派 FDE 驻场企业做 AI 落地。",
    reason: "模型厂商从卖 Token 转向卖结果，这是 2026 年最明确的行业信号。",
  },
  {
    id: "e3",
    title: "AWS 10 亿美元组建 Forward Deployed Engineering 团队",
    tag: "行业",
    summary:
      "AWS 6 月宣布投入 10 亿美元，计划将数千名工程师直接派驻客户团队，共同开发和部署智能体系统。",
    reason: "云厂商也下场了。企业 AI 已经超越咨询和路线图阶段，客户要的是有人把系统直接推向生产。",
  },
  {
    id: "e4",
    title: "企业 RAG 落地：从概念验证到生产环境的五个坑",
    tag: "方法论",
    summary:
      "文本切分粒度、向量模型选型、检索质量评估、幻觉控制、权限隔离，企业 RAG 从 POC 到生产最常见的五个坑。",
    reason: "做企业知识库问答的完整路线图，踩坑记录尤其值钱。",
  },
  {
    id: "e5",
    title: "AI 时代的项目管理：PMO 如何重新证明自己的价值",
    tag: "方法论",
    summary:
      "当 AI 让执行变快，项目管理的重心从'管进度'转向'管价值'。分享从数据、流程、战略三个维度重构 PMO 价值体系。",
    reason: "老大的老本行，AI 时代项目管理的转型方向。",
    original: "https://pmo-blog.vercel.app/posts/pmo-value-proof",
  },
  {
    id: "e6",
    title: "FDE 视角：企业 AI 落地的最后一公里为什么难",
    tag: "观点",
    summary:
      "从三个转行做 FDE 的人的真实经历看企业 AI 落地：最大阻力不是技术，是决策者对 AI 的认知和组织里的配合阻力。",
    reason: "老板们以为 AI 落地是技术问题，实际上是组织问题。",
  },
];
