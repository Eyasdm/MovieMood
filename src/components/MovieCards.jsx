// components/MovieCard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useWatchlist } from "../hooks/useWatchlist"; // ✅ المسار حسب مشروعك
import StarToggle from "./StarToggle";

export default function MovieCards({ movie }) {
  const navigate = useNavigate();
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  const IMG = "https://image.tmdb.org/t/p";
  const poster = movie?.poster_path
    ? `${IMG}/w500${movie.poster_path}`
    : "/assets/placeholder.jpg";

  const rating =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—";

  const title = movie?.title || movie?.original_title || "Untitled";

  const inWatchlist = isInWatchlist(movie.id);

  // Normalize movie object we store in watchlist
  const normalizedMovie = {
    id: movie.id,
    title,
    poster: poster,
    rating,
    release_date: movie.release_date,
    content_rating: movie.certification || movie.rating, // عدّل ده لو عندك مصدر تاني
    genres: movie.genre_names || movie.genres || [], // حسب الداتا عندك
  };

  function handleWatchlistClick(e) {
    e.stopPropagation();

    if (!inWatchlist) {
      // 1) add movie
      addToWatchlist(normalizedMovie);
    } else {
      // 2) go to watchlist
      navigate("/watchlist");
    }
  }

  return (
    <div className="movie-card">
      {/* Poster */}
      <div className="movie-card__img-wrap">
        <img
          src={poster}
          alt={`${title} poster`}
          className="movie-card__img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Rating row */}
      <div className="movie-card__rate">
        <div className="movie-card__rating" aria-label="Rating out of 10">
          <span className="movie-card__rating--icon">⭐</span>
          <span className="movie-card__rating--value">{rating}</span>
        </div>
      </div>

      {/* Title (link to details) */}
      <Link
        to={`/movie/${movie.id}`}
        aria-label={`Open ${title} details`}
        className="movie-card--link"
      >
        <h3 className="movie-card__title">{title}</h3>
      </Link>

      {/* Actions */}
      <div className="movie-card__btns">
        {/* Watchlist button with two states */}
        <button
          type="button"
          className={`movie-card__btns--wathlist-btn movie-card__btns--btn ${
            inWatchlist ? "movie-card__btns--wathlist-btn--active" : ""
          }`}
          onClick={handleWatchlistClick}
          aria-label={inWatchlist ? "View Watchlist" : "Add to Watchlist"}
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="movie-card__btns--wathlist-btn--plus"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </span>{" "}
          {inWatchlist ? "View Watchlist" : "Add To Watchlist"}
        </button>

        <button
          type="button"
          className="movie-card__btns--trailer-btn movie-card__btns--btn more-details"
          onClick={() => navigate(`/movie/${movie.id}`)}
          aria-label="Movie Details"
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="movie-card__btns--trailer-btn--play"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </span>{" "}
          More Details
        </button>
      </div>
    </div>
  );
}
