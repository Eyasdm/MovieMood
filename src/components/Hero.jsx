//for the big screen u need to adjust the design to fit the hero image in the frame.

import { useState } from "react";
import StarDisplay from "./StarDisplay";

function Hero({ movies }) {
  return <Movie movies={movies} />;
}

function Movie({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="card card--loading">
        <div className="card__img skeleton" />
        <div className="card-info">
          <div className="card__title skeleton skeleton--text" />
        </div>
      </div>
    );
  }

  const IMG = "https://image.tmdb.org/t/p";
  const movie = movies[currentIndex];

  const poster = movie.backdrop_path
    ? `${IMG}/original${movie.backdrop_path}` // 16:9 مناسب للهيرو
    : `${IMG}/w780${movie.poster_path}`; // fallback

  function handleNext() {
    setCurrentIndex(currentIndex + 1);
  }
  function handlePrevious() {
    setCurrentIndex(currentIndex - 1);
  }

  return (
    <div className="card">
      <div className="card__img--box">
        <img
          // src={`https://image.tmdb.org/t/p/w500${movies[4].backdrop_path}`}
          src={poster}
          alt={`${movie?.title ?? "Movie"} poster`}
          className="card__img"
        />
      </div>
      {/* <img
        src={poster}
        alt={`${movie?.title ?? "Movie"} poster`}
        className="card__img"
        // loading="eager"
      /> */}
      <div className="card-info">
        <h3 className="card__title">{movie?.title ?? "Untitled"}</h3>
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

      <button className="play-btn" aria-label="Play trailer">
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
  );
}

export default Hero;
