import Header from "../components/Header";
import Filters from "../components/Filters";
import SearchCard from "../components/SearchCard";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

import { useMovies } from "../context/MoviesContext";
import { useSearchParams, useLocation } from "react-router-dom";

import { useMovies as useSearchMovies } from "../hooks/useSearchMovies";
import { useRowMovies } from "../hooks/useRowMovies";
import { useMemo } from "react";
import { MiniLoader } from "../components/MiniLoader";

export default function Search() {
  const {
    movies: browseMovies,
    page,
    setPage,
    totalPages,
    isLoading,
    error,
  } = useMovies();

  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const q = (params.get("q") || "").trim();
  const pageFromUrl = Math.max(1, Number(params.get("page") || 1));

  const genreParam = params.get("genres") || "";
  const sortParam = params.get("sort") || "";
  const windowParam = params.get("window") || "";
  const tab = params.get("tab") || "";

  const isOnSearchRoute = location.pathname.startsWith("/search");
  const hasQuery = q.length > 0;
  const isSearchQuery = isOnSearchRoute && q.length >= 3;
  const isShortSearch = isOnSearchRoute && hasQuery && q.length < 3;
  const isExploreTab = isOnSearchRoute && !!tab;
  const isGenreOnly =
    isOnSearchRoute && !!genreParam && !isSearchQuery && !isExploreTab;

  const {
    movies: foundMovies = [],
    isLoading: sLoading,
    error: sError,
    totalPages: sTotalPages = 1,
  } = useSearchMovies(q, pageFromUrl);

  function endpointForTab(t) {
    switch (t) {
      case "trending":
        return "trending/movie/week";
      case "popular":
        return "movie/popular";
      case "top":
        return "movie/top_rated";
      case "upcoming":
        return "movie/upcoming";
      case "now":
        return "movie/now_playing";
      default:
        return "";
    }
  }

  const tabEndpoint = endpointForTab(tab);
  const {
    movies: tabMovies = [],
    isLoading: tLoading,
    error: tError,
    totalPages: tTotalPages = 1,
  } = useRowMovies(isExploreTab ? tabEndpoint : "", pageFromUrl);

  const discoverPath = `discover/movie?with_genres=${
    genreParam || ""
  }&sort_by=popularity.desc`;
  const {
    movies: gMovies = [],
    isLoading: gLoading,
    error: gError,
    totalPages: gTotalPages = 1,
  } = useRowMovies(isGenreOnly ? discoverPath : "", pageFromUrl);

  const baseMovies = useMemo(() => {
    if (isSearchQuery) return foundMovies;
    if (isExploreTab) return tabMovies;
    if (isGenreOnly) return gMovies;
    return browseMovies || [];
  }, [
    isSearchQuery,
    isExploreTab,
    isGenreOnly,
    foundMovies,
    tabMovies,
    gMovies,
    browseMovies,
  ]);

  const gridMovies = useMemo(() => {
    if (!isSearchQuery) return baseMovies;

    let list = baseMovies;

    if (windowParam) {
      const now = Date.now();
      if (windowParam === "upcoming") {
        list = list.filter(
          (m) => new Date(m.release_date || "1900-01-01").getTime() > now
        );
      } else if (windowParam === "now") {
        const ninety = 90 * 24 * 60 * 60 * 1000;
        list = list.filter((m) => {
          const t = new Date(m.release_date || "1900-01-01").getTime();
          return t <= now && t >= now - ninety;
        });
      }
    }

    if (genreParam) {
      const gid = Number(genreParam);
      list = list.filter(
        (m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(gid)
      );
    }

    if (sortParam) {
      const [field, dir] = sortParam.split(".");
      list = [...list].sort((a, b) => {
        const av =
          field === "popularity"
            ? a.popularity
            : field === "vote_average"
            ? a.vote_average
            : field === "release_date"
            ? new Date(a.release_date || "1900-01-01").getTime()
            : 0;
        const bv =
          field === "popularity"
            ? b.popularity
            : field === "vote_average"
            ? b.vote_average
            : field === "release_date"
            ? new Date(b.release_date || "1900-01-01").getTime()
            : 0;
        return dir === "asc" ? av - bv : bv - av;
      });
    }

    return list;
  }, [isSearchQuery, baseMovies, genreParam, sortParam, windowParam]);

  const loading = isSearchQuery
    ? sLoading
    : isExploreTab
    ? tLoading
    : isGenreOnly
    ? gLoading
    : isLoading;

  const err = isSearchQuery
    ? sError
    : isExploreTab
    ? tError
    : isGenreOnly
    ? gError
    : error;

  const pages = isSearchQuery
    ? sTotalPages
    : isExploreTab
    ? tTotalPages
    : isGenreOnly
    ? gTotalPages
    : totalPages;

  function handlePageChange(nextPage) {
    const maxP = Math.min(pages || 1, 500);
    const p = Math.max(1, Math.min(nextPage, maxP));

    params.set("page", String(p));
    setParams(params, { replace: false });

    if (!(isSearchQuery || isExploreTab || isGenreOnly)) {
      setPage(p);
    }
  }

  if (loading && !isShortSearch) {
    return (
      <div className="search__container">
        <Header />
        <Filters />
        <MiniLoader
          message={
            isSearchQuery ? `Searching for "${q}"...` : "Loading movies..."
          }
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="search__container">
      <Header />
      <Filters />

      {isShortSearch ? (
        <div className="search__helper">
          <p className="search__helper-text">
            Type at least <strong>3 characters</strong> to search for a movie.
          </p>
        </div>
      ) : err ? (
        <p className="search__error">{String(err)}</p>
      ) : (
        <SearchGrid movies={gridMovies} />
      )}

      <Pagination
        currentPage={
          isSearchQuery || isExploreTab || isGenreOnly ? pageFromUrl : page
        }
        totalPages={Math.min(pages || 1, 500)}
        onPageChange={handlePageChange}
      />

      <Footer />
    </div>
  );
}

function SearchGrid({ movies = [] }) {
  const filtered = movies.filter((m) => m.poster_path || m.backdrop_path);

  return (
    <div className="search__grid">
      {filtered.map((m) => (
        <div className="row__item" key={m.id}>
          <SearchCard
            movie={m}
            onDetails={(mm) => console.log("go to details", mm.id)}
            onToggleWatchlist={(mm) => console.log("toggle watchlist", mm.id)}
          />
        </div>
      ))}
    </div>
  );
}
