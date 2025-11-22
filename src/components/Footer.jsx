// src/components/Footer.jsx
import { Follow } from "./Follow";
import ThemeToggle from "./ThemeToggle";

function Footer() {
  return (
    <div className="footer grid--6--cols">
      {/* Column 1 — About */}
      <div className="footer__about">
        <div className="footer__about--logo logo">
          Movie<span className="logo--mood">Mood</span>
        </div>
        <div className="footer__about--section">
          MovieMood helps you find trending movies, track your watchlist, and
          watch trailers all in one place.
        </div>
      </div>
      {/* Column 6 — Pages */}
      <div className="footer__pages footer__column">
        <div className="footer__pages--title footer__column--title">Pages</div>

        <a className="footer__pages--item" href="/">
          Home
        </a>
        <a className="footer__pages--item" href="/search">
          Search
        </a>
        <a className="footer__pages--item" href="/watchlist">
          Watchlist
        </a>
      </div>

      {/* Column 2 — Explore */}
      <div className="footer__explore footer__column">
        <div className="footer__explore--title footer__column--title">
          EXPLORE
        </div>

        <a
          className="footer__explore--section"
          href="/search?tab=trending&page=1"
        >
          Trending
        </a>
        <a className="footer__explore--section" href="/search?tab=top&page=1">
          Top Rated
        </a>
        <a
          className="footer__explore--section"
          href="/search?tab=popular&page=1"
        >
          Popular
        </a>
        <a
          className="footer__explore--section"
          href="/search?tab=upcoming&page=1"
        >
          Upcoming
        </a>
      </div>

      {/* Column 3 — Genres */}
      <div className="footer__genres footer__column">
        <div className="footer__genres--title footer__column--title">GENRE</div>

        <a className="footer__genres--item" href="/search?genres=18&page=1">
          Drama
        </a>
        <a className="footer__genres--item" href="/search?genres=28&page=1">
          Action
        </a>
        <a className="footer__genres--item" href="/search?genres=35&page=1">
          Comedy
        </a>
        <a className="footer__genres--item" href="/search?genres=27&page=1">
          Horror
        </a>
      </div>

      {/* Column 4 — Follow */}
      <div className="footer__last-column footer__column">
        <div className="footer__follow">
          <div className="footer__follow--title footer__column--title">
            Follow
          </div>

          <Follow className="footer__follow--item footer__follow--gap" />
        </div>
      </div>

      {/* Column 5 — Theme toggle */}
      <div className="footer__themes footer__column">
        <div className="footer__themes--title footer__column--title">
          Themes
        </div>

        <ThemeToggle className={"toggle__text"} />
      </div>
    </div>
  );
}

export default Footer;
