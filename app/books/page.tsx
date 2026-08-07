import { books } from "../data/books";

const levels = ["入门", "进阶", "实战"] as const;

export default function BooksPage() {
  return (
    <div>
      <div className="page-overline">Books</div>
      <h1 className="page-title">📚 必读书籍</h1>
      <p className="page-desc">
        AI 学习书单，从入门到实战。每本都写清楚适合谁、为什么读。
      </p>

      <div className="chips">
        {levels.map((lv) => (
          <span key={lv} className="chip cursor-pointer">
            {lv}
          </span>
        ))}
      </div>

      <div className="card-grid">
        {books.map((book) => (
          <article key={book.id} className="card hoverable flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="tag">{book.level}</span>
              <span className="tag tag-gray">{book.tag}</span>
            </div>
            <h3 className="font-bold text-[16px] mb-1">{book.title}</h3>
            <p className="text-[13px] text-[var(--text-muted)] mb-2">
              {book.author}
            </p>
            <p className="card-summary flex-1">{book.summary}</p>
            <p className="card-reason">💬 {book.reason}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
