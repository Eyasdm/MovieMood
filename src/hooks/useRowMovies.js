import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // v3 api_key
const BASE_URL = "https://api.themoviedb.org/3";

export function useRowMovies(endpoint, page = 1) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  // ✅ يبدأ بـ true لو في endpoint (trending / discover / ... )
  const [isLoading, setIsLoading] = useState(() => !!endpoint);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1) normalize + skip if empty
    const ep = (endpoint || "").replace(/^\/+/, "");
    const shouldSkip = !ep;

    if (shouldSkip) {
      setMovies([]);
      setTotalPages(1);
      setIsLoading(false);
      setError("");
      return;
    }

    const ctrl = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        // 2) ابنِ العنوان بأمان — يحافظ على أي query موجودة في endpoint
        const url = new URL(`${BASE_URL}/${ep}`);
        if (API_KEY) url.searchParams.set("api_key", API_KEY);
        url.searchParams.set("page", String(page || 1));
        url.searchParams.set("language", "en-US");

        const res = await fetch(url.toString(), { signal: ctrl.signal });
        if (!res.ok) {
          throw new Error(`TMDb error ${res.status}`);
        }

        const data = await res.json();
        if (ctrl.signal.aborted) return;

        setMovies(Array.isArray(data.results) ? data.results : []);
        setTotalPages(Number(data.total_pages || 1));
      } catch (err) {
        if (ctrl.signal.aborted) return;
        setError(err?.message || "Unknown error");
        setMovies([]);
        setTotalPages(1);
      } finally {
        if (!ctrl.signal.aborted) setIsLoading(false);
      }
    }

    fetchData();
    return () => ctrl.abort();
  }, [endpoint, page]);

  return { movies, totalPages, isLoading, error };
}
