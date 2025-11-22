// NavOverlay.jsx
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Follow } from "./Follow";
import { goTab, goGenre } from "../hooks/navActions";
import ThemeToggle from "./ThemeToggle";

export default function NavOverlay({ open, onClose }) {
  const navigate = useNavigate();

  // Close menu on ESC key + prevent page scroll when overlay opens
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();

    if (open) {
      document.addEventListener("keydown", onKey);

      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open, onClose]);

  return createPortal(
    <div className={`nav-ovl ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="nav-ovl__background" onClick={onClose} />

      {/* Close Button */}
      <button
        type="button"
        className="nav-ovl__close"
        aria-label="Close menu"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          fill="none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6l12 12M18 6L6 18"
          />
        </svg>
      </button>

      {/* Navigation Content */}
      <nav className="nav-ovl__nav" aria-label="Main" onClick={onClose}>
        <div className="nav-ovl__panel" onClick={(e) => e.stopPropagation()}>
          <section className="nav-group">
            <div className="nav-group__title">Pages</div>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/", true)}
            >
              Home
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/search", true)}
            >
              Search
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/watchlist", true)}
            >
              Watchlist
            </button>
          </section>
          {/* EXPLORE */}
          <section className="nav-group">
            <p className="nav-group__title">EXPLORE</p>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/search?trending")}
            >
              Trending
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/search?popular")}
            >
              Popular
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/search?top")}
            >
              Top Rated
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/search?upcoming")}
            >
              Upcoming
            </button>
          </section>

          {/* GENRE */}
          <section className="nav-group">
            <p className="nav-group__title">GENRE</p>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goGenre(navigate, onClose, 28)}
            >
              Action
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goGenre(navigate, onClose, 27)}
            >
              Horror
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goGenre(navigate, onClose, 10749)}
            >
              Romance
            </button>

            <button
              className="nav-group__item nav-group__btn"
              onClick={() => goTab(navigate, onClose, "/search?trending")}
            >
              More
            </button>
          </section>

          {/* FOLLOW */}
          <section className="nav-group">
            <p className="nav-group__title">FOLLOW</p>
            <Follow className="nav-group__item" />
          </section>

          {/* THEMES */}
          <section className="nav-group">
            <div className="nav-group__title">Themes</div>

            <ThemeToggle className={"nav-group__toggle  toggle__text"} />
          </section>
        </div>
      </nav>
    </div>,
    document.body
  );
}
