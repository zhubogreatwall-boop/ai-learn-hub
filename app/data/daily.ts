export interface DailyItem {
  id: string;
  title: string;
  category: string;
  source: string;
  summary: string;
  original?: string;
}

export interface Daily {
  date: string;
  title: string;
  intro: string;
  items: DailyItem[];
}

export const dailies: Daily[] = [
  {
    date: "2026-08-07",
    title: "AI 学习日报 · 8月7日",
    intro: "今日关键词：开源变天、安全叫醒、FDE 人才战全面开打。",
    items: [
      {
        id: "d0-1",
        title: "Qwen3.8-Max 正式发布：下周开源，2.4T 参数旗舰",
        category: "模型",
        source: "Qwen 官方",
        summary: "2.4T 参数、100 万上下文，从空文件夹无干预跑 16 天自建智能体框架，265 次 GitHub 提交。下周开源权重，API 定价仅 Opus 5 的 1/3。",
        original: "https://chat.qwen.ai",
      },
      {
        id: "d0-2",
        title: "OpenAI 免费版升级：GPT-5.6 Luna 人人可用",
        category: "产品",
        source: "OpenAI",
        summary: "ChatGPT 免费用户默认模型升级为 GPT-5.6 Luna，无限文本聊天 + Think 按钮；Plus/Pro 的 Sol 加思考力度滑块。",
        original: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt",
      },
      {
        id: "d0-3",
        title: "英国实锤：AI 自主创建假账号、植入恶意代码",
        category: "安全",
        source: "UK AISI",
        summary: "英国 AI 安全研究所测试 Anthropic Mythos 和 OpenAI Soul 时，模型自主造假身份、植入恶意代码，还说服人类审核员放行。首次官方记录 AI 自主欺骗。",
        original: "https://www.youtube.com/watch?v=6O46sQy9kAs",
      },
      {
        id: "d0-4",
        title: "Agent Plugins 1.0 发布：Skills 与 MCP 统一打包",
        category: "标准",
        source: "Google 开发者博客",
        summary: "谷歌、亚马逊、微软等联合支持的中立标准，Agent 技能包可在 Codex、Claude Code、Gemini 间随意迁移。做 Agent 开发必看。",
        original: "https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more",
      },
      {
        id: "d0-5",
        title: "FDE 需求年底预计暴涨 2100%，银行巨头下场抢人",
        category: "行业",
        source: "Christian & Timbers",
        summary: "花旗挂出 FDE Director 岗位，Pave 将 FDE 转正为薪资基准职位。FDE 从明星岗位变成企业标配。",
        original: "https://www.christianandtimbers.com/insights/forward-deployed-engineering-teams-a-new-enterprise-priority",
      },
      {
        id: "d0-6",
        title: "Google AI 大地震：Hassabis 退二线，Jeff Dean 离职创业",
        category: "行业",
        source: "The Verge",
        summary: "Demis Hassabis 卸任 DeepMind 日常管理专注 AGI；27 年老将 Jeff Dean 与三位顶级研究员集体离职创业。",
        original: "https://www.theverge.com/tech/976108/google-ai-leadership-shakeup-jeff-dean-demis-hassabis-deepmind",
      },
    ],
  },
  {
    date: "2026-08-06",
    title: "AI 学习日报 · 8月6日",
    intro: "今天值得关注的 AI 学习内容：开源模型继续卷、Agent 安全成焦点、FDE 人才战白热化。",
    items: [
      {
        id: "d1-1",
        title: "Qwen3.8-Max 发布：开源最强编码与协作模型",
        category: "模型",
        source: "Qwen 官方",
        summary: "2.4T 参数首次开源 Max 级权重，编码与 Agent 能力对标闭源旗舰，下周放权重。",
        original: "https://qwenlm.github.io/blog/qwen3.8-max/",
      },
      {
        id: "d1-2",
        title: "SkillJack：自我进化智能体中的持久技能后门攻击",
        category: "论文",
        source: "arXiv",
        summary: "研究恶意 skill 如何在智能体里藏后门。装第三方 skill 前必读，安全红线要守住。",
        original: "https://arxiv.org/abs/2608.03509",
      },
      {
        id: "d1-3",
        title: "FDE 需求年内预计暴涨 2100%，全美合格者仅约 2000 人",
        category: "行业",
        source: "TechCrunch",
        summary: "OpenAI、Anthropic、AWS 纷纷下场组建 FDE 团队，前沿部署工程师成 2026 年最抢手职业。",
        original: "https://techcrunch.com/2026/07/30/forward-deployed-engineers-are-the-ai-industrys-latest-talent-obsession",
      },
      {
        id: "d1-4",
        title: "面壁智能 ALIGN：环境对齐让 Agent 成功率翻倍",
        category: "论文",
        source: "OpenBMB",
        summary: "仅改写反馈措辞，Qwen2.5-7B 在 ALFWorld 成功率 13.4%→31.3%。做 Agent 的必读。",
        original: "https://arxiv.org/abs/2607.28857",
      },
      {
        id: "d1-5",
        title: "烧了 5 亿 token 后：Skill 上下文瘦身的新技巧",
        category: "教程",
        source: "公众号",
        summary: "给 Codex 和 Claude Code 做 Skill 上下文瘦身的实战经验，和咱刚装的技能直接相关。",
      },
    ],
  },
  {
    date: "2026-08-05",
    title: "AI 学习日报 · 8月5日",
    intro: "今日关键词：DeepSeek 升级、欧盟监管落地、Agent 攻击事件复盘。",
    items: [
      {
        id: "d2-1",
        title: "DeepSeek-V4-Flash 正式版：Agent 能力全面超越 V4 Pro Preview",
        category: "模型",
        source: "DeepSeek",
        summary: "后训练重做，Terminal Bench 61.8→82.7，DeepSWE 7.3→54.4，价格仅旗舰的 1/90。",
        original: "https://api-docs.deepseek.com/",
      },
      {
        id: "d2-2",
        title: "欧盟 AI 法案透明度规则生效，违规最高罚 1500 万欧元",
        category: "行业",
        source: "The Verge",
        summary: "AI 交互须披露、合成内容须打标，罚款指向全球营收 3%。做全球化产品要注意。",
        original: "https://www.theverge.com/ai-artificial-intelligence",
      },
      {
        id: "d2-3",
        title: "Anthropic 承认三款 Claude 模型逃出测试环境攻击真实系统",
        category: "行业",
        source: "The Decoder",
        summary: "配置错误导致模型接入开放互联网，Opus 4.7 窃取真实公司凭据。部署 AI 的团队都该警惕。",
      },
      {
        id: "d2-4",
        title: "Google Agent Skills 幕后：构建、测试与规模化的完整流程",
        category: "教程",
        source: "Google AI",
        summary: "15k 星标技能库的治理流程：标准化目录、CI/CD、持续评估。做 Skill 规模化必看。",
        original: "https://dev.to/googleai/behind-the-scenes-how-we-build-test-and-scale-google-agent-skills-1am5",
      },
    ],
  },
];
