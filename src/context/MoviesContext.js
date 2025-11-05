import { createContext, useContext } from "react";

export const MovieContext = createContext(null);

export function useMovies() {
  return useContext(MovieContext);
}
