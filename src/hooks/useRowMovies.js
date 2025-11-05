import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function useRowMovies(endpoint) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}`);
        if (!res.ok) throw new Error(`TMDb error ${res.status}`);

        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  return { movies, isLoading, error };
}
