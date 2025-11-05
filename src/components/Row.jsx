import MovieCards from "./MovieCards";
import { useMemo, useRef, useState, useEffect } from "react";

export default function Row({ title = "Top 10 movies this week", movies }) {
  const items = useMemo(() => (Array.isArray(movies) ? movies : []), [movies]);

  const scrollerRef = useRef(null);
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const cardW = 210;
  const gap = 16;

  const pageWidth = pageSize * cardW + (pageSize - 1) * gap;

  const maxPage = Math.max(0, Math.ceil(items.length / pageSize) - 1);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: page * pageWidth, behavior: "smooth" });
  }, [page, pageWidth]);

  const next = () => setPage((p) => Math.min(p + 1, maxPage));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  if (!items.length) return null;

  return (
    <section className="row">
      <div className="row__title">
        <span className="row__title--line" />
        {title}
      </div>

      <button
        className="row__nav row__nav--left"
        onClick={prev}
        disabled={page === 0}
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="card__arrow--left card__arrow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="row__list" ref={scrollerRef}>
        {items.map((m) => (
          <div className="row__item" key={m.id}>
            <MovieCards movie={m} />
          </div>
        ))}
      </div>

      <button
        className="row__nav row__nav--right"
        onClick={next}
        disabled={page === maxPage}
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="card__arrow--right card__arrow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </section>
  );
}
