const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function withKey(url) {
  const joiner = url.includes("?") ? "&" : "?";
  return `${BASE_URL}${url}${joiner}api_key=${API_KEY}&language=en-US`;
}
