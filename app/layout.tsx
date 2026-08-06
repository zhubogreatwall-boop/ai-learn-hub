import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 学习站",
  description: "AI 学习导航站：AI热点、必读书籍、FDE课程、企业应用、工具推荐、学习日报",
};

const navItems = [
  { href: "/", label: "热点" },
  { href: "/books", label: "必读书籍" },
  { href: "/fde", label: "FDE课程" },
  { href: "/enterprise", label: "企业应用" },
  { href: "/tools", label: "工具推荐" },
  { href: "/daily", label: "学习日报" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="site-header">
          <div className="container-site flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 font-bold text-[17px]">
              <span className="w-7 h-7 bg-[#2563eb] text-white flex items-center justify-center rounded-md text-[13px]">AI</span>
              <span>AI 学习站</span>
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container-site">
            <p>AI 学习站 · 记录学习 AI、RAG、Agent 开发的一路收获</p>
            <p className="mt-1 text-xs opacity-70">本站为个人学习导航站，内容来源于公开资料整理</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
