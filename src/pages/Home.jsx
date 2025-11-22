// pages/Home.jsx
import Footer from "../components/Footer.jsx";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Row from "../components/Row";
import MovieCards from "../components/MovieCards";
import { useRowMovies } from "../hooks/useRowMovies";

export default function Home() {
  const { movies: trending = [] } = useRowMovies("trending/movie/week", 1);
  const { movies: nowPlaying = [] } = useRowMovies("movie/now_playing", 1);
  const { movies: topRated = [] } = useRowMovies("movie/top_rated", 1);
  const { movies: popular = [] } = useRowMovies("movie/popular", 1);
  const { movies: upcoming = [] } = useRowMovies("movie/upcoming", 1);

  const heroMovies = popular.length ? popular : trending.length ? trending : [];

  return (
    <div>
      <Header />
      <Hero movies={heroMovies} />

      {/* Each Row uses the new API: items + renderItem (MovieCards) */}
      <main className="home--rows">
        <Row
          title="🔥 Trending This Week"
          items={trending}
          renderItem={(m) => <MovieCards movie={m} />}
          tabClassname="true"
          tab="/search?tab=trending&page=1"
        />

        <Row
          title="🍿 Now Playing"
          items={nowPlaying}
          renderItem={(m) => <MovieCards movie={m} />}
          tab="/search?tab=now&page=1"
          tabClassname="true"
        />

        <Row
          title="⭐ Top Rated"
          items={topRated}
          renderItem={(m) => <MovieCards movie={m} />}
          tab="/search?tab=top&page=1"
          tabClassname="true"
        />

        <Row
          title="🌍 Popular"
          items={popular}
          renderItem={(m) => <MovieCards movie={m} />}
          tab="/search?tab=popular&page=1"
          tabClassname="true"
        />

        <Row
          title="🕒 Upcoming"
          items={upcoming}
          renderItem={(m) => <MovieCards movie={m} />}
          tab="/search?tab=upcoming&page=1"
          tabClassname="true"
        />
      </main>

      <Footer />
    </div>
  );
}
