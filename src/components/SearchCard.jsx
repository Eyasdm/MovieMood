import { useMemo } from "react";
import StarToggle from "./StarToggle";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../hooks/useWatchlist";

const IMG_BASE = "https://image.tmdb.org/t/p";
const FALLBACK = "/assets/placeholder.jpg";

const buildImg = (path, size = "w342") =>
  path
    ? `${IMG_BASE}/${size}${path.startsWith("/") ? path : `/${path}`}`
    : FALLBACK;

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function to5Stars(avg = 0) {
  const val = Math.max(0, Math.min(10, Number(avg || 0))) / 2;
  return Math.round(val * 2) / 2;
}

function Stars({ value = 0 }) {
  const nodes = [];
  for (let i = 1; i <= 5; i++) {
    const full = value >= i;
    const half = value === i - 0.5;
    nodes.push(
      <span
        key={i}
        className={`vcard__star ${full ? "is-full" : ""} ${
          half ? "is-half" : ""
        }`}
        aria-hidden="true"
      />
    );
  }
  return (
    <div className="vcard__stars" aria-label={`Rating ${value} of 5`}>
      {nodes}
    </div>
  );
}

export default function ThumbCardMeta({ movie = {} }) {
  const {
    title,
    name,
    poster_path,
    backdrop_path,
    release_date,
    first_air_date,
    vote_average = 0,
    genre_ids = [],
    id,
  } = movie;

  const displayTitle = title || name || "Untitled";
  const poster = buildImg(poster_path || backdrop_path, "w342");
  const year = (release_date || first_air_date || "").slice(0, 4) || "—";
  const rating5 = useMemo(() => to5Stars(vote_average), [vote_average]);
  const genres = (genre_ids || [])
    .map((gid) => GENRE_MAP[gid])
    .filter(Boolean)
    .slice(0, 3);

  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const inWatchlist = id ? isInWatchlist(id) : false;

  function handleToggleWatchlist(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!id) return;

    if (inWatchlist) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(movie);
    }
  }

  function handleOpenDetails() {
    if (!id) return;
    navigate(`/movie/${id}`);
  }

  return (
    <article
      className="vcard"
      aria-label={displayTitle}
      onClick={handleOpenDetails}
    >
      <main className="vcard--meta">
        <div className="vcard__poster">
          <img src={poster} alt={`${displayTitle} poster`} loading="lazy" />
        </div>

        <aside className="vcard__rail" aria-label="meta">
          <div className="vcard__year">{year}</div>

          <StarToggle
            className="vcard__fav"
            active={inWatchlist}
            onClick={handleToggleWatchlist}
          />
        </aside>
      </main>

      <footer className="vcard__footer">
        <h4 className="vcard__title" title={displayTitle}>
          {displayTitle}
        </h4>

        <div className="vcard__meta">
          <Stars value={rating5} />
          <span className="vcard__year-badge vcard__year-badge--mobile">
            {year}
          </span>
        </div>

        <ul className="vcard__genres vcard__genres--row">
          {genres.map((g) => (
            <li key={g} className="vcard__genre-chip">
              {g}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
