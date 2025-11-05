import Footer from "../components/Footer.jsx";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Row from "../components/Row";
import { MovieProvider } from "../context/MoviesProvider.jsx";
import { useRowMovies } from "../hooks/useRowMovies.js";

function App() {
  const { movies: upcoming } = useRowMovies("movie/upcoming");
  const { movies: nowPlaying } = useRowMovies("movie/now_playing");
  const { movies: trending } = useRowMovies("trending/movie/week");
  const { movies: topRated } = useRowMovies("movie/top_rated");
  const { movies: popular } = useRowMovies("movie/popular");

  return (
    <>
      <MovieProvider>
        <Header />
        <Hero movies={popular} />
        <Row title="🔥 Trending This Week" movies={trending} />
        <Row title="🍿 Now Playing" movies={nowPlaying} />
        <Row title="⭐ Top Rated" movies={topRated} />
        <Row title="🌍 Popular" movies={popular} />
        <Row title="🕒 Upcoming" movies={upcoming} />
        <Footer />
      </MovieProvider>
    </>
  );
}

export default App;
