// hooks/useMovieDetails.js
import { useEffect, useState } from "react";
import { withKey } from "../lib/tmdb";

export function useMovieDetails(id) {
  const [data, setData] = useState(null); // movie + credits + videos
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const ctrl = new AbortController();

    async function fetchAll() {
      try {
        setIsLoading(true);
        setError("");

        // details + credits + videos في طلب واحد
        const url = withKey(`/movie/${id}?append_to_response=credits,videos`);
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`TMDb error ${res.status}`);

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAll();
    return () => ctrl.abort();
  }, [id]);

  return { data, isLoading, error };
}
