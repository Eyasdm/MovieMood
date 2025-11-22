// pages/Watchlist.jsx
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useWatchlist } from "../hooks/useWatchlist";

const FALLBACK_POSTER = "/assets/placeholder.jpg";

function Watchlist() {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist, toggleWatched } = useWatchlist();

  return (
    <div>
      <Header />

      <main className="watchlist">
        <div className="watchlist__title">Your Watchlist</div>
        <div className="watchlist__info">
          Your Watchlist is your personal space to save the movies you’re
          excited to see. Easily keep track of your picks, sort them by rating
          or popularity, and organize them in the order that fits your mood.
        </div>

        {/* ===== List section ===== */}
        <section className="watchlist__list">
          {watchlist.length === 0 && (
            <p className="watchlist__empty">
              You haven&apos;t added any movies yet. Start exploring and add
              some favorites to your Watchlist.
            </p>
          )}

          {watchlist.map((movie) => {
            const {
              id,
              title,
              poster,
              rating,
              genres = [],
              release_date,
              content_rating,
              watched,
            } = movie;

            const isWatched = !!watched;
            const posterSrc = poster || FALLBACK_POSTER;

            return (
              <article className="watchlist-card" key={id}>
                {/* Poster */}
                <div className="watchlist-card__poster">
                  <img
                    src={posterSrc}
                    alt={title}
                    className="watchlist-card__poster-img"
                  />
                </div>

                {/* Main content */}
                <div className="watchlist-card__body">
                  <h2 className="watchlist-card__title">
                    {title}{" "}
                    {release_date && (
                      <span className="watchlist-card__year">
                        ({new Date(release_date).getFullYear()})
                      </span>
                    )}
                  </h2>

                  {content_rating && (
                    <span className="watchlist-card__content-rating">
                      {content_rating}
                    </span>
                  )}

                  {/* Rating */}
                  <div className="watchlist-card__rating">
                    <span className="watchlist-card__rating-icon">★</span>
                    <span className="watchlist-card__rating-score">
                      {rating ?? "—"}
                    </span>
                    <span className="watchlist-card__rating-outof">/ 10</span>
                  </div>

                  {/* Mark as watched */}
                  <button
                    className={`btn btn--ghost watchlist-card__watched-btn ${
                      isWatched ? "watchlist-card__watched-btn--active" : ""
                    }`}
                    onClick={() => toggleWatched(id)}
                  >
                    {isWatched ? "Watched" : "Mark as watched"}
                  </button>

                  {/* Genres */}
                  {genres.length > 0 && (
                    <div className="watchlist-card__genres">
                      {genres.map((genre) => (
                        <span
                          key={genre}
                          className="watchlist-card__genre-chip"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="watchlist-card__actions">
                  <button
                    className="btn btn--ghost"
                    onClick={() => removeFromWatchlist(id)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn--primary"
                    onClick={() => navigate(`/movie/${id}`)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Watchlist;
