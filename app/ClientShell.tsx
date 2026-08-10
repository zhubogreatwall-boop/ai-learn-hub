"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "热点", icon: "🔥" },
  { href: "/books", label: "必读书籍", icon: "📚" },
  { href: "/course", label: "图文课程", icon: "🎓" },
  { href: "/fde", label: "FDE 课程", icon: "🧑‍💻" },
  { href: "/enterprise", label: "企业应用", icon: "🏢" },
  { href: "/tools", label: "工具推荐", icon: "🧰" },
  { href: "/daily", label: "龙虾日记", icon: "🦞" },
];

const mobileTabs = [
  { href: "/", label: "热点", icon: "🔥" },
  { href: "/books", label: "书籍", icon: "📚" },
  { href: "/course", label: "课程", icon: "🎓" },
  { href: "/fde", label: "FDE", icon: "🧑‍💻" },
  { href: "/daily", label: "日记", icon: "🦞" },
];

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("aihub-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("aihub-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* 移动端顶部栏 */}
      <header className="mobile-header">
        <Link href="/" className="flex items-center gap-2 font-bold text-[15px]">
          <span className="logo-badge">AI</span>
          <span>AI 学习站</span>
        </Link>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="切换主题"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <div className="app-layout">
        {/* 桌面侧边栏 */}
        <aside className="sidebar">
          <Link href="/" className="logo">
            <span className="logo-badge">AI</span>
            <span>AI 学习站</span>
          </Link>

          <div className="nav-group">栏目</div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="sidebar-foot">
            AI 学习站 · 记录学习 AI、RAG、Agent 开发的一路收获
            <br />
            内容来源于公开资料整理
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="main">{children}</main>
      </div>

      {/* 移动端底部 Tab Bar */}
      <nav className="mobile-tabbar">
        {mobileTabs.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-tab ${pathname === item.href ? "active" : ""}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        <button className="mobile-tab" onClick={toggleTheme} aria-label="切换主题">
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
          <span>{theme === "dark" ? "亮色" : "暗色"}</span>
        </button>
      </nav>
    </>
  );
}
