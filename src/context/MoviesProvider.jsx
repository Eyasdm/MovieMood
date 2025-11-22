import { useState, useEffect } from "react";
import { useRowMovies } from "../hooks/useRowMovies";
import { MovieContext } from "./MoviesContext";

export function MovieProvider({ children }) {
  const [activeTab, setActiveTab] = useState("Explore"); // Explore | Genre
  const [activeExplore, setActiveExplore] = useState("Trending");
  const [activeGenre, setActiveGenre] = useState("Drama");
  const [page, setPage] = useState(1);

  // ====== Theme state  ======
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";

    const saved = window.localStorage.getItem("moviemood-theme");
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("moviemood-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  // ==============================

  const today = new Date().toISOString().slice(0, 10);

  const endpoint =
    activeTab === "Explore"
      ? activeExplore === "Trending"
        ? "trending/movie/week"
        : activeExplore === "Top Rated"
        ? "movie/top_rated"
        : activeExplore === "Popular"
        ? "movie/popular"
        : activeExplore === "Upcoming"
        ? "movie/upcoming"
        : "movie/now_playing"
      : `discover/movie?with_genres=${getGenreId(
          activeGenre
        )}&sort_by=popularity.desc&primary_release_date.lte=${today}`;

  const { movies, totalPages, isLoading, error } = useRowMovies(endpoint, page);

  useEffect(() => setPage(1), [activeExplore, activeGenre, activeTab]);

  const handleActiveExplore = (v) => {
    setActiveTab("Explore");
    setActiveExplore(v);
  };
  const handleActiveGenre = (v) => {
    setActiveTab("Genre");
    setActiveGenre(v);
  };

  const value = {
    // movies stuff
    movies,
    totalPages,
    page,
    setPage,
    activeTab,
    activeExplore,
    activeGenre,
    handleActiveExplore,
    handleActiveGenre,
    setActiveTab,
    isLoading,
    error,

    // theme stuff
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

function getGenreId(name) {
  const map = { Drama: 18, Action: 28, Comedy: 35, Horror: 27, Romance: 10749 };
  return map[name] ?? 18;
}
