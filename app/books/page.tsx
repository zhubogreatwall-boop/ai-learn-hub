import { books } from "../data/books";

const levels = ["入门", "进阶", "实战"] as const;

export default function BooksPage() {
  return (
    <div className="container-site py-8">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#2563eb] uppercase mb-2">
          Books
        </div>
        <h1 className="text-3xl font-bold tracking-tight">📚 必读书籍</h1>
        <p className="text-[15px] text-gray-500 mt-2">
          AI 学习书单，从入门到实战。每本都写清楚适合谁、为什么读。
        </p>
      </div>

      {/* 分级标签 */}
      <div className="flex items-center gap-2 mb-6">
        {levels.map((lv) => (
          <span key={lv} className="tag cursor-pointer">
            {lv}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <article key={book.id} className="card flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="tag">{book.level}</span>
              <span className="tag tag-gray">{book.tag}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1">{book.title}</h3>
            <p className="text-[13px] text-gray-400 mb-2">{book.author}</p>
            <p className="summary flex-1">{book.summary}</p>
            <p className="text-[13px] text-[#2563eb]/80 mt-3 leading-relaxed">
              💡 {book.reason}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
