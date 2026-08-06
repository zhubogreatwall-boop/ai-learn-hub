export interface ToolItem {
  id: string;
  name: string;
  tag: string;
  summary: string;
  reason: string;
  original?: string;
}

export const toolItems: ToolItem[] = [
  {
    id: "t1",
    name: "AI HOT（aihot.virxact.com）",
    tag: "资讯聚合",
    summary:
      "中文 AI 资讯聚合站，多源抓取 + AI 精选摘要，有热点榜、AI 日报、Agent API 和 RSS 订阅。",
    reason: "看 AI 新闻的首选入口，还有匿名 API 可以接进自己的工具。",
    original: "https://aihot.virxact.com/",
  },
  {
    id: "t2",
    name: "活人感写作 Skill（human-writing）",
    tag: "写作",
    summary:
      "开源写作技能，治 AI 味。强制先查材料、找说话位置，带检测脚本能把冒号滥用、破折号、翻案句全部揪出来。",
    reason: "写中文长文、公众号文章必备，实测把 AI 味降到零。",
    original: "https://github.com/KKKKhazix/human-writing",
  },
  {
    id: "t3",
    name: "baoyu-skills（宝玉技能全家桶）",
    tag: "内容创作",
    summary:
      "22 个内容创作 Skill：Markdown 转公众号 HTML、公众号发布、封面图、文章配图、网页转 Markdown、视频字幕等。",
    reason: "做自媒体的完整工具箱，24.6k star，中文创作生态最成熟的工具集。",
    original: "https://github.com/JimLiu/baoyu-skills",
  },
  {
    id: "t4",
    name: "DeepSeek API",
    tag: "模型服务",
    summary:
      "便宜好用的大模型 API，价格只有 Claude 旗舰的 1/90，Agent 能力大幅升级，原生支持 Responses API。",
    reason: "个人学习、批量摘要任务的首选，成本几乎可以忽略。",
    original: "https://platform.deepseek.com/",
  },
  {
    id: "t5",
    name: "Ollama",
    tag: "本地部署",
    summary:
      "本地跑大模型的开源工具，支持 qwen、deepseek 等主流模型，一键安装，还能做本地向量嵌入。",
    reason: "隐私敏感场景、离线学习首选，配合 nomic-embed-text 还能当本地嵌入服务用。",
    original: "https://ollama.com/",
  },
  {
    id: "t6",
    name: "Tavily",
    tag: "搜索",
    summary:
      "AI 优化的搜索 API，返回结构化结果，适合给 Agent 当实时搜索工具，还有深度研究模式。",
    reason: "让 AI 拥有实时联网能力的最简单方式。",
    original: "https://tavily.com/",
  },
  {
    id: "t7",
    name: "Claude Code",
    tag: "编码助手",
    summary:
      "Anthropic 的终端编码 Agent，支持 Agent Skills、MCP，能自己读代码库、跑任务、改 bug。",
    reason: "2026 年最主流的编码 Agent 之一，Skill 生态最丰富。",
    original: "https://docs.anthropic.com/en/docs/claude-code",
  },
  {
    id: "t8",
    name: "awesome-agent-skills（李不凯）",
    tag: "技能导航",
    summary:
      "Agent Skills 终极指南，收录大量精选技能和官方教程，还有 skill 构建工具。",
    reason: "找技能、学技能的第一站，收录了 cclank 资讯抓取等实用技能。",
    original: "https://github.com/libukai/awesome-agent-skills",
  },
];
