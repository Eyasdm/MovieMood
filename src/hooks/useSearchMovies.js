import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useMovies(query, page = 1) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(
    () => !!query && query.trim().length >= 3
  );
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      const trimmed = (query || "").trim();

      if (!trimmed || trimmed.length < 3) {
        setMovies([]);
        setTotalPages(0);
        setError("");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${encodeURIComponent(
          trimmed
        )}&page=${page}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch movies.");

        const data = await res.json();

        if (!Array.isArray(data.results) || data.results.length === 0) {
          setMovies([]);
          setTotalPages(0);
          return;
        }

        setMovies(data.results);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error");
          setMovies([]);
          setTotalPages(0);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
    return () => controller.abort();
  }, [query, page]);

  return { movies, isLoading, error, totalPages };
}
