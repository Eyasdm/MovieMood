// import { useState, useEffect } from "react";
import { MovieContext } from "./MoviesContext";

const movies = [
  {
    id: 604079,
    title: "The Long Walk",
    poster: "https://image.tmdb.org/t/p/w500/wobVTa99eW0ht6c1rNNzLkazPtR.jpg",
    rating: 7.0,
    release_date: "2025-09-10",
  },
  {
    id: 1197137,
    title: "Black Phone 2",
    poster: "https://image.tmdb.org/t/p/w500/evbguUd1BwExQgXMjG9n9AHMQpN.jpg",
    rating: 7.4,
    release_date: "2025-10-15",
  },
  {
    id: 1156594,
    title: "Our Fault",
    poster: "https://image.tmdb.org/t/p/w500/yzqHt4m1SeY9FbPrfZ0C2Hi9x1s.jpg",
    rating: 7.8,
    release_date: "2025-10-15",
  },
  {
    id: 1267905,
    title: "The Roses",
    poster: "https://image.tmdb.org/t/p/w500/98n5HnCJ5LnXKIMNP9SBfVNyxCE.jpg",
    rating: 7.1,
    release_date: "2025-08-27",
  },
  {
    id: 7451,
    title: "xXx",
    poster: "https://image.tmdb.org/t/p/w500/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg",
    rating: 5.9,
    release_date: "2002-08-09",
  },
  {
    id: 927254,
    title: "The Twits",
    poster: "https://image.tmdb.org/t/p/w500/izYZGeOHhPWiga8Hb5P4JYfcH8T.jpg",
    rating: 6.8,
    release_date: "2025-10-17",
  },
  {
    id: 436969,
    title: "The Suicide Squad",
    poster: "https://image.tmdb.org/t/p/w500/q61qEyssk2ku3okWICKArlAdhBn.jpg",
    rating: 7.5,
    release_date: "2021-07-28",
  },
  {
    id: 803796,
    title: "KPop Demon Hunters",
    poster: "https://image.tmdb.org/t/p/w500/AjlRXTpRLAIiuofNqKcqrpUfPCZ.jpg",
    rating: 8.3,
    release_date: "2025-06-20",
  },
  {
    id: 1038392,
    title: "The Conjuring: Last Rites",
    poster: "https://image.tmdb.org/t/p/w500/7JzOmJ1fIU43I3gLHYsY8UzNzjG.jpg",
    rating: 7.0,
    release_date: "2025-09-03",
  },
  {
    id: 617126,
    title: "The Fantastic 4: First Steps",
    poster: "https://image.tmdb.org/t/p/w500/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
    rating: 7.1,
    release_date: "2025-07-23",
  },
];

function MovieProvider({ children }) {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  //   fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.results))
  //     .catch((err) => console.error("Failed to fetch movies:", err));
  // }, []);

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
}
export { MovieProvider };
