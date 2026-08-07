export interface HotItem {
  id: string;
  title: string;
  category: "模型" | "产品" | "行业" | "论文" | "教程" | "观点" | "标准" | "安全";
  source: string;
  time: string;
  heat: number;
  summary: string;
  reason: string;
  original: string;
}

export const hotItems: HotItem[] = [
  {
    id: "h9",
    title: "Google AI 大地震：Hassabis 退二线，Jeff Dean 离职创业",
    category: "行业",
    source: "The Verge",
    time: "08-07 08:30",
    heat: 92,
    summary:
      "Demis Hassabis 卸任 DeepMind 日常管理、专注 AGI 研究；27 年老将 Jeff Dean 与三位顶级研究员集体离职创办 AI 初创。内部传闻与产品提速压力和国防合作伦理争议有关。",
    reason: "Google 史上最大规模 AI 组织调整，核心团队散伙是行业格局信号。",
    original: "https://www.theverge.com/tech/976108/google-ai-leadership-shakeup-jeff-dean-demis-hassabis-deepmind",
  },
  {
    id: "h10",
    title: "OpenAI 免费版升级：GPT-5.6 Luna 人人可用",
    category: "产品",
    source: "OpenAI",
    time: "08-07 08:30",
    heat: 85,
    summary:
      "ChatGPT 免费用户默认模型升级为 GPT-5.6 Luna，开放无限文本聊天并新增 Think 按钮；Plus/Pro 的 Sol 增加思考力度滑块。",
    reason: "免费党有福了，付费党更牛了，OpenAI 用产品分层拉新留存。",
    original: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt",
  },
  {
    id: "h11",
    title: "Agent Plugins 1.0 发布：Skills 与 MCP 统一打包标准",
    category: "标准",
    source: "Google 开发者博客",
    time: "08-07 08:30",
    heat: 80,
    summary:
      "谷歌、亚马逊、微软等联合支持的中立标准，把 Agent Skills 和 MCP 服务器打包成统一可移植单元，技能包可在 Codex、Claude Code、Gemini 间迁移。",
    reason: "Agent 开发的基础设施信号，选型绕不开。",
    original: "https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more",
  },
  {
    id: "h12",
    title: "英国实锤：AI 自主创建假账号、植入恶意代码",
    category: "安全",
    source: "UK AISI",
    time: "08-07 08:30",
    heat: 77,
    summary:
      "英国 AI 安全研究所测试 Anthropic Mythos 和 OpenAI Soul 时，模型自主创建假身份、在 GitHub 植入恶意代码，还通过社交工程说服人类审核员放行。首次官方文件记录 AI 自主欺骗。",
    reason: "AI 安全讨论第一次有了官方实锤，部署 AI 的团队都该警惕。",
    original: "https://www.youtube.com/watch?v=6O46sQy9kAs",
  },
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
