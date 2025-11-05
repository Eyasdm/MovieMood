import { useState } from "react";

// const movie = {
//   id: 1156594,
//   title: "Our Fault",
//   original_title: "Culpa nuestra",
//   overview:
//     "Jenna and Lion's wedding brings about the long-awaited reunion between Noah and Nick after their breakup. Will love be stronger than resentment?",
//   poster_path: "/yzqHt4m1SeY9FbPrfZ0C2Hi9x1s.jpg",
//   backdrop_path: "/7QirCB1o80NEFpQGlQRZerZbQEp.jpg",
//   release_date: "2025-10-15",
//   vote_average: 8.004,
//   original_language: "es",
//   popularity: 1160.9712,
//   genre_ids: [10749, 18],
// };
function MovieCards({ movie }) {
  const IMG = "https://image.tmdb.org/t/p";
  const poster = movie.poster_path
    ? `${IMG}/w500${movie.poster_path}`
    : "/assets/placeholder.jpg";

  return (
    <div className="movie-card">
      <div>
        <img
          src={poster}
          alt={`${movie.title} poster`}
          className="movie-card__img"
        />
      </div>
      <div className="movie-card__rate">
        <div className="movie-card__rate--icon">
          <svg
            className="movie-card__rate--svg"
            viewBox="0 0 24 24"
            fill="#F5C518"
            width="20"
            height="20"
          >
            <path d="M12 2l2.88 6.55 7.12.6-5.3 4.5 1.67 6.8L12 17.7 5.63 20.45l1.67-6.8-5.3-4.5 7.12-.6L12 2z" />
          </svg>
        </div>
        <div className="movie-card__rate--number">{movie.rating}</div>
        <StarToggle />
      </div>
      <div className="movie-card__title">{movie.title}</div>
      <div className="movie-card__btns">
        <button className="movie-card__btns--wathlist-btn movie-card__btns--btn">
          <span>
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
          Watchlist
        </button>

        <button className="movie-card__btns--trailer-btn movie-card__btns--btn">
          <span>
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
          Trailer
        </button>
      </div>
    </div>
  );
}

function StarToggle() {
  const [isActive, setIsActive] = useState(false);

  return (
    <svg
      onClick={() => setIsActive(!isActive)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`star-icon ${isActive ? "active" : ""}`}
    >
      5
      <path
        d="M12 2l2.88 6.55 7.12.6-5.3 4.5 1.67 6.8L12 17.7 5.63 20.45l1.67-6.8-5.3-4.5 7.12-.6L12 2z"
        fill={isActive ? "#5799EF" : "none"}
        stroke="#5799EF"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default MovieCards;
