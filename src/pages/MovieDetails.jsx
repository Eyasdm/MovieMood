// pages/MovieDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Row from "../components/Row";
import CastMini from "../components/CastMini";
import { MiniLoader } from "../components/MiniLoader";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { useWatchlist } from "../hooks/useWatchlist";

const IMG_POSTER = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useMovieDetails(id);
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  // Set page title from movie title
  useEffect(() => {
    if (data?.title) document.title = `${data.title} – MovieMood`;
    return () => {
      document.title = "MovieMood";
    };
  }, [data?.title]);

  // Loading state
  if (isLoading || !data) {
    return (
      <>
        <Header />
        <main className="movie movie-details movie-details--loading">
          <MiniLoader />
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <div className="movie movie--error container">
          <p className="movie__error-text">Something went wrong: {error}</p>
          <button className="btn btn--ghost" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Destructure movie data
  const {
    title,
    release_date,
    runtime,
    overview,
    vote_average,
    poster_path,
    original_language,
    status,
    credits,
    videos,
    genres = [],
  } = data;

  const poster = poster_path
    ? `${IMG_POSTER}${poster_path}`
    : "/assets/placeholder.jpg";

  const rating =
    typeof vote_average === "number" ? vote_average.toFixed(1) : null;

  const cast = (credits?.cast || [])
    .filter((actor) => actor.profile_path)
    .slice(0, 18);

  const ytKey = videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;

  const watchlistMovie = {
    id: data.id,
    title,
    poster,
    rating,
    release_date,
    content_rating: null,
    genres: genres.map((g) => g.name),
  };

  const inWatchlist = isInWatchlist(data.id);

  function handleWatchlistClick() {
    if (!inWatchlist) {
      addToWatchlist(watchlistMovie);
    } else {
      navigate("/watchlist");
    }
  }

  return (
    <>
      <Header />

      <main className="movie movie-details">
        {/* Hero: poster + main meta */}
        <section className="movie-hero">
          <div className="movie-hero__poster">
            <img
              className="movie-hero__poster-img"
              src={poster}
              alt={title}
              loading="eager"
            />
          </div>

          <div className="movie-hero__meta container">
            <h1 className="movie-hero__title">
              {title}
              {release_date && (
                <span className="movie-hero__year">
                  {" "}
                  ({new Date(release_date).getFullYear()})
                </span>
              )}
            </h1>

            {genres.length > 0 && (
              <div className="movie-hero__chips">
                {genres.map((g) => (
                  <span className="chip chip--genre" key={g.id}>
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <div className="movie-hero__rating" aria-label="Rating out of 10">
              <span className="movie-hero__rating-icon">⭐</span>
              <span className="movie-hero__rating-value">
                {rating ?? "—"} / 10
              </span>
            </div>

            <div className="movie-hero__actions">
              {ytKey && (
                <a
                  className="btn btn--primary"
                  href={`https://www.youtube.com/watch?v=${ytKey}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch Trailer
                </a>
              )}

              <button
                type="button"
                className={`btn btn--ghost movie-hero__watchlist-btn ${
                  inWatchlist ? "movie-hero__watchlist-btn--active" : ""
                }`}
                onClick={handleWatchlistClick}
              >
                {inWatchlist ? "View Watchlist" : "Add to watchlist"}
              </button>
            </div>
          </div>
        </section>

        {/* Body: synopsis + info + cast */}
        <section className="movie-body container">
          {/* Synopsis block (full width under hero on all screens) */}
          <div className="section">
            <h2 className="section__title">Synopsis</h2>
            <p className="section__lead">
              {overview || "No overview available."}
            </p>
          </div>

          {/* Info grid */}
          <div className="section movie-info">
            <InfoItem label="Release Date" value={release_date || "—"} />
            <InfoItem
              label="Runtime"
              value={runtime ? `${runtime} min` : "—"}
            />
            <InfoItem
              label="Language"
              value={original_language?.toUpperCase() || "—"}
            />
            <InfoItem label="Rating" value={rating ? `${rating} / 10` : "—"} />
            <InfoItem label="Status" value={status || "—"} />
          </div>

          {/* Cast slider */}
          {cast.length > 0 && (
            <section className="section">
              <Row
                className="row--cast row-flush"
                title="Main Cast"
                items={cast}
                pageSize={6}
                itemWidth={140}
                gap={12}
                renderItem={(person) => <CastMini person={person} />}
              />
            </section>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="movie-info__item">
      <div className="movie-info__label">{label}</div>
      <div className="movie-info__value">{value}</div>
    </div>
  );
}
