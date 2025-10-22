import Header from "../components/Header";
import Hero from "../components/Hero";

function App() {
  // const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.results));

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

export default App;
