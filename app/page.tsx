"use client";

import Link from "next/link";
import { useState } from "react";
import { hotItems, hotRanking } from "./data/hot";

const categories = ["全部", "模型", "产品", "行业", "论文", "教程", "观点", "标准", "安全"] as const;

export default function Home() {
  const [activeCat, setActiveCat] = useState<string>("全部");

  const filtered =
    activeCat === "全部"
      ? hotItems
      : hotItems.filter((item) => item.category === activeCat);

  return (
    <div>
      {/* 页面标题 */}
      <div className="page-overline">AI Learning Hub</div>
      <h1 className="page-title">今天学点什么？</h1>
      <p className="page-desc">
        精选 AI 学习路上的热点、书籍、课程与企业实践，每天进步一点点。
      </p>

      {/* 今日热度榜 Top 5 */}
      <div className="hotboard">
        <div className="hotboard-title">📊 今日热度榜</div>
        {hotRanking.slice(0, 5).map((item, i) => (
          <div className="hot-row" key={item.id}>
            <span className={`hot-rank ${i < 3 ? `r${i + 1}` : "rn"}`}>
              {i + 1}
            </span>
            <a
              href={item.original}
              target="_blank"
              rel="noopener noreferrer"
              className="hot-link"
              title={item.title}
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>

      {/* 分类 chips */}
      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${activeCat === c ? "active" : ""}`}
            onClick={() => setActiveCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 日期分隔 */}
      <div className="date-sep">8月7日 周五</div>

      {/* 信息流卡片 */}
      {filtered.map((item) => (
        <article className="card hoverable" key={item.id}>
          <div className="card-meta">
            <span className="tag">{item.category}</span>
            <span>{item.source}</span>
            <span>·</span>
            <span>{item.time}</span>
            <span
              className={`heat ${
                item.heat >= 85
                  ? "heat-hot"
                  : item.heat >= 75
                  ? "heat-warn"
                  : ""
              }`}
            >
              热度 {item.heat}
            </span>
          </div>
          <a
            href={item.original}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title"
          >
            {item.title}
          </a>
          <p className="card-summary">{item.summary}</p>
          <p className="card-reason">💬 {item.reason}</p>
        </article>
      ))}

      <div className="load-more">加载更多 ↓</div>
    </div>
  );
}
