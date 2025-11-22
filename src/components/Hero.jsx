import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarDisplay from "./StarDisplay";

function Hero({ movies }) {
  return <Movie movies={movies} />;
}

function Movie({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 7 seconds
  useEffect(() => {
    if (!Array.isArray(movies) || movies.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [movies]);

  // Loading / empty state
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="hero grid--2--cols">
        <div className="card card--loading">
          <div className="card__img skeleton" />
          <div className="card-info">
            <div className="card__title skeleton skeleton--text" />
          </div>
        </div>
        <div className="up-next">
          <div className="up-next__title">Up next</div>
          <div className="up-next__gallery"></div>
        </div>
      </div>
    );
  }

  const IMG = "https://image.tmdb.org/t/p";
  const movie = movies[currentIndex];

  const poster = movie.backdrop_path
    ? `${IMG}/original${movie.backdrop_path}`
    : movie.poster_path
    ? `${IMG}/w780${movie.poster_path}`
    : "";

  // Build up-next list: next 3 movies in order after currentIndex (circular)
  const upNext = Array.from(
    { length: Math.min(3, Math.max(0, movies.length - 1)) },
    (_, i) => {
      const index = (currentIndex + 1 + i) % movies.length;
      return { movie: movies[index], index };
    }
  );

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }

  function handlePrevious() {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  }

  function goToDetails() {
    if (!movie?.id) return;
    navigate(`/movie/${movie.id}`);
  }

  const title = movie?.title ?? movie?.name ?? "Untitled";

  const titleLength = title.length;
  let titleSizeClass = "card__title--md";

  if (titleLength <= 20) {
    titleSizeClass = "card__title--xl";
  } else if (titleLength <= 35) {
    titleSizeClass = "card__title--lg";
  } else if (titleLength <= 55) {
    titleSizeClass = "card__title--md";
  } else {
    titleSizeClass = "card__title--sm";
  }

  return (
    <div className="hero grid--2--cols">
      {/* Main hero card */}
      <div className="card">
        <div className="card__img--box">
          {poster && (
            <img
              src={poster}
              alt={`${movie?.title ?? movie?.name ?? "Movie"} poster`}
              className="card__img"
            />
          )}
        </div>

        <div className="card-info">
          <h3 className={`card__title ${titleSizeClass}`}>{title}</h3>
          <StarDisplay rating={Math.round((movie?.vote_average ?? 0) / 2)} />
        </div>

        <button
          className="card__btn card__btn--right"
          aria-label="Next"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="card__arrow card__arrow--right"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <button
          className="card__btn card__btn--left"
          aria-label="Previous"
          onClick={handlePrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="card__arrow card__arrow--left"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Play button -> go to movie details (where trailer is) */}
        <button
          className="play-btn"
          aria-label="Play trailer"
          onClick={goToDetails}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="play-btn--icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </button>
      </div>

      {/* Up next column */}
      <div className="up-next">
        <h2 className="up-next__title">Up next</h2>

        <div className="up-next__list">
          {upNext.map(({ movie: m, index }) => {
            const thumb = m.poster_path
              ? `${IMG}/w185${m.poster_path}`
              : m.backdrop_path
              ? `${IMG}/w300${m.backdrop_path}`
              : "";

            const title = m.title ?? m.name ?? "Untitled";

            return (
              <button
                key={m.id ?? index}
                type="button"
                className="up-next__item"
                onClick={() => setCurrentIndex(index)}
              >
                <div className="up-next__thumb-box">
                  {thumb && (
                    <img
                      src={thumb}
                      alt={`${title} poster`}
                      className="up-next__thumb"
                    />
                  )}
                </div>

                <div className="up-next__body">
                  <div className="up-next__top-row">
                    <span
                      className="up-next__play-btn"
                      aria-label="Play trailer"
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${m.id}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="up-next__play-btn--icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                    </span>
                  </div>

                  <p className="up-next__name">{title}</p>

                  <div
                    className="up-next__rating"
                    aria-label="Rating out of 10"
                  >
                    <span className="up-next__rating-icon">⭐</span>
                    <span className="up-next__rating-value">
                      {typeof m.vote_average === "number"
                        ? m.vote_average.toFixed(1)
                        : "—"}{" "}
                      / 10
                    </span>
                  </div>

                  <div className="up-next__stats">
                    {/* LIKE ICON + number */}
                    <span className="up-next__stat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="up-next__icon"
                      >
                        <path
                          d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3v11Zm3 0h6.764a3 3 0 0 0 2.958-2.46l1.2-6A3 3 0 0 0 17 10h-4.28l.63-3.157a2 2 0 0 0-.392-1.648L12 3l-5 6"
                          fill="#f8f8f8"
                          opacity="0.95"
                        />
                      </svg>
                      {m.vote_count ?? 0}
                    </span>

                    {/* HEART ICON + rating */}
                    <span className="up-next__stat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="up-next__icon up-next__icon--heart"
                      >
                        <path
                          d="M12 21s-6.5-4.35-9.5-8.5C-0.5 8 1.5 3.5 5.5 3.5c2.54 0 4.03 1.73 4.5 2.33C10.47 5.23 11.96 3.5 14.5 3.5c4 0 6 4.5 3 9-3 4.15-9.5 8.5-9.5 8.5Z"
                          fill="url(#heartGradient)"
                        />
                        <defs>
                          <linearGradient
                            id="heartGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#ff5c7b" />
                            <stop offset="100%" stopColor="#ffb347" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {Math.round((m.vote_average ?? 0) * 10)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Hero;
