import type { Metadata } from "next";
import ClientShell from "./ClientShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 学习站",
  description: "AI 学习导航站：AI热点、必读书籍、FDE课程、企业应用、工具推荐、龙虾日记",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" data-theme="dark">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
