import { MovieProvider } from "../context/MoviesProvider.jsx";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader.jsx";

function App() {
  const Home = lazy(() => import("../pages/Home.jsx"));
  const MovieDetails = lazy(() => import("../pages/MovieDetails.jsx"));
  const Search = lazy(() => import("../pages/Search.jsx"));
  const Watchlist = lazy(() => import("../pages/Watchlist.jsx"));
  const NotFound = lazy(() => import("../pages/NotFound.jsx"));

  // TODO: WHEN CLICK ON THE CARD IT SHOULD DIRECT TO MOVIE DETAILS. (EVERY CARD).
  //  TODO: WHEN CLICKING IN THE SEARCHBAR IN THE SMALLER SCREENS THE LOGO SHOULD DISAPPEAR

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return (
    <>
      <MovieProvider>
        <ScrollToTop />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MovieProvider>
    </>
  );
}

export default App;
