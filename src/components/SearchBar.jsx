import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function SearchBar({ isExpanded, setIsExpanded }) {
  const [query, setQuery] = useState("");
  const inputEl = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();

  // Sync input value from URL ONLY when we're on /search
  useEffect(() => {
    if (location.pathname === "/search") {
      const currentQ = params.get("q") || "";
      setQuery(currentQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function expandOnly() {
    if (!isExpanded) {
      setIsExpanded?.(true);
      // focus after expand
      requestAnimationFrame(() => inputEl.current?.focus());
    }
  }

  function handleSearchClick() {
    // Clicking anywhere in the bar should expand only (no navigation)
    expandOnly();
  }

  // Prevent submit if not expanded; expand instead
  function handleIconClick(e) {
    if (!isExpanded) {
      e.preventDefault();
      e.stopPropagation();
      expandOnly();
    }
    // if expanded, let the button act as submit normally
  }

  function handleBlur(e) {
    if (e.target.value.trim() === "") setIsExpanded?.(false);
  }

  // Submit ONLY when expanded
  function handleSubmit(e) {
    e.preventDefault();
    if (!isExpanded) return; // guard: do nothing unless expanded

    const q = query.trim();

    if (q.length >= 3) {
      navigate(`/search?q=${encodeURIComponent(q)}&page=1`);
    } else {
      if (location.pathname === "/search") {
        params.delete("q");
        params.delete("page");
        setParams(params, { replace: true });
      } else {
        navigate(`/search`);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`header__search ${isExpanded ? "header__search--active" : ""}`}
      onClick={handleSearchClick}
    >
      <button
        type="submit"
        className="header__search-btn"
        aria-label="Search"
        onClick={handleIconClick} // ← يمنع التوجيه إذا غير Expanded
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="header__search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 11.4 11.4Z"
          />
        </svg>
      </button>

      <input
        ref={inputEl}
        type="text"
        className="header__search-input"
        value={query}
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
}
