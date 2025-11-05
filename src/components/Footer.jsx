function Footer() {
  return (
    <div className="footer grid--5--cols">
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

      {/* Column 2 — Explore */}
      <div className="footer__explore footer__column">
        <p className="footer__explore--title footer__column--title">EXPLORE</p>
        <p className="footer__explore--section">Trending</p>
        <p className="footer__explore--section">Popular</p>
        <p className="footer__explore--section">Top Rated</p>
        <p className="footer__explore--section">Upcoming</p>
      </div>

      {/* Column 3 — Genres */}
      <div className="footer__genres footer__column">
        <p className="footer__genres--title footer__column--title">GENRE</p>
        <p className="footer__genres--item">Action</p>
        <p className="footer__genres--item">Horror</p>
        <p className="footer__genres--item">Romance</p>
        <p className="footer__genres--item">More</p>
      </div>

      {/* Column 4 — Follow */}
      <div className="footer__last-column footer__column">
        <div className="footer__follow">
          <p className="footer__follow--title footer__column--title">Follow</p>
          <p className="footer__follow--item">GitHub</p>
          <p className="footer__follow--item">LinkedIn</p>
        </div>
      </div>

      {/* Column 5 — Themes */}
      <div className="footer__themes footer__column">
        <p className="footer__themes--title footer__column--title">Themes</p>
        <p className="footer__themes--item">Dark</p>
        <p className="footer__themes--item">Light</p>
      </div>
    </div>
  );
}

export default Footer;
