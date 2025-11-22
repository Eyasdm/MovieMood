// hooks/useWatchlist.js
import { useLocaleStorageState } from "./useLocalStorageState";

const WATCHLIST_KEY = "moviemood_watchlist";

export function useWatchlist() {
  // We store an array of movie objects in localStorage
  const [watchlist, setWatchlist] = useLocaleStorageState([], WATCHLIST_KEY);

  function addToWatchlist(movie) {
    setWatchlist((prev) => {
      // avoid duplicates
      if (prev.some((m) => m.id === movie.id)) return prev;

      const movieWithWatched = {
        ...movie,
        watched: movie.watched ?? false,
      };

      return [...prev, movieWithWatched];
    });
  }

  function removeFromWatchlist(id) {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  }

  function isInWatchlist(id) {
    return watchlist.some((m) => m.id === id);
  }

  function toggleWatched(id) {
    setWatchlist((prev) =>
      prev.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))
    );
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatched,
  };
}
