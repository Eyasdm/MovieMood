// components/Row.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Row({
  title = "Top 10 movies this week",
  items: data,
  renderItem,
  pageSize = 5,
  itemWidth = 210,
  gap = 16,
  className = "",
  tab = false,
  tabClassname = false,
}) {
  const items = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const scrollerRef = useRef(null);

  const [page, setPage] = useState(0);
  const pageWidth = pageSize * itemWidth + (pageSize - 1) * gap;
  const maxPage = Math.max(0, Math.ceil(items.length / pageSize) - 1);
  const navigate = useNavigate();

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: page * pageWidth, behavior: "smooth" });
  }, [page, pageWidth]);

  const next = () => setPage((p) => Math.min(p + 1, maxPage));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  if (!items.length) return null;

  function handleNavigate() {
    if (tab) navigate(tab);
  }

  return (
    <section
      className={`row ${className}`}
      style={{
        ["--row-item-w"]: `${itemWidth}px`,
        ["--row-gap"]: `${gap}px`,
      }}
    >
      <div
        className={`row__title ${tabClassname ? "row__home--title" : ""} `}
        onClick={handleNavigate}
      >
        <span className="row__title-line" />
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
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          className="row__nav-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="row__list" ref={scrollerRef}>
        {items.map((it) => (
          <div className="row__item" key={it.id}>
            {renderItem ? renderItem(it) : null}
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
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          className="row__nav-icon"
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
