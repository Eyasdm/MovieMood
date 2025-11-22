// Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import NavOverlay from "./NavOverlay";

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  function handleHome() {
    navigate("/");
  }

  function toggleMenu() {
    setMenuOpen((p) => !p);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="header">
        <div
          className={`header__logo logo ${
            isExpanded ? "header__logo--phone" : ""
          }`}
          onClick={handleHome}
        >
          Movie<span className="header__logo--mood logo--mood">Mood</span>
        </div>

        <div
          className={`header__container ${
            isExpanded ? "header__container--active" : ""
          }`}
        >
          <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

          <div className="header__menu">
            <button
              type="button"
              className={`header__menu--btn ${menuOpen ? "is-active" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              {!menuOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="header__menu--btn--icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
              {menuOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  fill="none"
                  className="header__menu--btn--icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <NavOverlay open={menuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
