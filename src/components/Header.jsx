import { useState, useRef } from "react";

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  function handleSearchClick() {
    setIsExpanded(true);
    inputRef.current?.focus();
  }

  function handleBlur(e) {
    if (e.target.value.trim() === "") {
      setIsExpanded(false);
    }
  }

  return (
    <div className="header">
      <div className="header__logo">
        Movie<span className="header__logo--mood">Mood</span>
      </div>

      <div
        className={`header__container ${
          isExpanded ? "header__container--active" : ""
        }`}
      >
        <div
          className={`header__search ${
            isExpanded ? "header__search--active" : ""
          }`}
          onClick={handleSearchClick}
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

          <input
            ref={inputRef}
            type="text"
            className="header__search-input"
            placeholder="Search movies..."
            onBlur={handleBlur}
          />
        </div>

        <div className="header__menu">
          <div className="header__menu--btn">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
