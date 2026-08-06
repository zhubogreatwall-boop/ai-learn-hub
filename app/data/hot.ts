export interface HotItem {
  id: string;
  title: string;
  category: "模型" | "产品" | "行业" | "论文" | "教程" | "观点";
  source: string;
  time: string;
  heat: number;
  summary: string;
  reason: string;
  original: string;
}

export const hotItems: HotItem[] = [
  {
    id: "h1",
    title: "Qwen3.8-Max 发布：开源最强编码与协作模型，2.4T 参数",
    category: "模型",
    source: "Qwen 官方博客",
    time: "08-06 10:10",
    heat: 89,
    summary:
      "阿里发布 Qwen 家族迄今最强模型，2.4T 参数（95B 激活），首次开源 Max 级权重。编码和 AI Agent 能力直接对标闭源旗舰，下周开放权重。",
    reason: "首次将 Max 级模型权重开源，为开源社区提供比肩闭源旗舰的能力。",
    original: "https://qwenlm.github.io/blog/qwen3.8-max/",
  },
  {
    id: "h2",
    title: "DeepSeek-V4-Flash 正式版上线：Agent 能力大增强",
    category: "模型",
    source: "DeepSeek 官方",
    time: "08-05 14:05",
    heat: 78,
    summary:
      "重做后训练，Terminal Bench 2.1 从 61.8 涨至 82.7，DeepSWE 从 7.3 涨至 54.4。价格只有 Claude 旗舰的 1/90，原生支持 Responses API，适配 Codex。",
    reason: "把基准提升放进生产成本的尺度上衡量，Flash 的实质突破在于让高频 Agent 任务从用不起变成用得起。",
    original: "https://api-docs.deepseek.com/",
  },
  {
    id: "h3",
    title: "MiniMax H3 正式开源：通用全模态生成系统支持 2K 视频与原生立体声",
    category: "模型",
    source: "MiniMax 官方",
    time: "08-06 10:44",
    heat: 75,
    summary:
      "可统一理解文本、图像、视频和音频，生成最高 2K 分辨率、15 秒带 32kHz 原生立体声音频的视频。2K 下每秒价格低于主流模型三分之一。",
    reason: "原生支持同步生成立体声音频，为音视频生成应用提供了更完整的开源基座。",
    original: "https://minimax.io/",
  },
  {
    id: "h4",
    title: "Anthropic 与云初创 Volta 签署 100 亿美元算力协议",
    category: "行业",
    source: "X · Rohan Paul",
    time: "08-06 07:33",
    heat: 70,
    summary:
      "Volta 成立仅数月，估值 24 亿美元，硬件几乎全为租用：算力来自比特币矿商 Bitdeer 挪威 121MW 站点。Anthropic 买的是交付速度，代价是承担交易对手风险。",
    reason: "前沿实验室为抢算力开始接受超大规模云厂商合同从未有过的风险结构。",
    original: "https://x.com/rohanpaul_ai/status/2085069151676642864",
  },
  {
    id: "h5",
    title: "欧盟《人工智能法案》透明度规则生效，违规最高罚 1500 万欧元",
    category: "行业",
    source: "The Verge",
    time: "08-06 02:32",
    heat: 73,
    summary:
      "要求公司披露用户何时与 AI 模型互动，并为合成音视频和文本添加机器可读标记。罚款上限指向全球年营业额 3%，8 月 2 日前推出的模型有 4 个月宽限期。",
    reason: "透明度规则生效意味着 AI 产品在欧盟需即时标记 AI 交互，罚款不再是可忽略的成本。",
    original: "https://www.theverge.com/ai-artificial-intelligence",
  },
  {
    id: "h6",
    title: "面壁智能 ALIGN：自动对齐智能体与环境接口",
    category: "论文",
    source: "OpenBMB",
    time: "08-05 21:29",
    heat: 75,
    summary:
      "仅改写反馈措辞即可将 Qwen2.5-7B 智能体在 ALFWorld 上的成功率从 13.4% 提升至 31.3%。四个基准上最高提升 45.67% 成功率，减少 65% 连续无效动作。",
    reason: "环境对齐是 agent 工程最被低估的隐形坑，这篇论文不仅讲透了还给了开箱即用的 wrapper。",
    original: "https://arxiv.org/abs/2607.28857",
  },
  {
    id: "h7",
    title: "OpenAI 用内部模型 Astra 以约 2000 美元证明 10 项数学难题",
    category: "行业",
    source: "Greg Brockman",
    time: "08-05 16:00",
    heat: 70,
    summary:
      "证明非 sofic 群的存在，推翻 Connes 刚性猜想，成果涵盖 von Neumann 代数、高维球堆积、电路复杂度等。已发布全部 10 项证明，附 Lean 证书与 CoT 推导。",
    reason: "理论领域可能从纯人力变成 AI 驱动的研究范式，成本才 2000 美元。",
    original: "https://x.com/gdb/status/2083457463337287721",
  },
  {
    id: "h8",
    title: "Google Agent Skills 幕后：如何构建、测试与规模化",
    category: "教程",
    source: "Google AI 开发者",
    time: "08-05 23:30",
    heat: 63,
    summary:
      "团队详解其开源技能库的构建与治理流程：标准化目录结构、CI/CD 流水线（linter、链接检查、AI 辅助清单）、提交时与每周的持续评估。发布后 GitHub 星标超 15,000。",
    reason: "标准化目录、自动化检查和持续评估的完整流程，可帮助团队避免技能库随规模扩大而失控。",
    original: "https://dev.to/googleai/behind-the-scenes-how-we-build-test-and-scale-google-agent-skills-1am5",
  },
];

export const hotRanking: HotItem[] = [...hotItems].sort((a, b) => b.heat - a.heat);
