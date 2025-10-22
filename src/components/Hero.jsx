import StarDisplay from "./StarDisplay";

const movies = [
  {
    id: 1156594,
    title: "Our Fault",
    original_title: "Culpa nuestra",
    overview:
      "Jenna and Lion's wedding brings about the long-awaited reunion between Noah and Nick after their breakup. Will love be stronger than resentment?",
    poster_path: "/yzqHt4m1SeY9FbPrfZ0C2Hi9x1s.jpg",
    backdrop_path: "/7QirCB1o80NEFpQGlQRZerZbQEp.jpg",
    release_date: "2025-10-15",
    vote_average: 8.004,
    original_language: "es",
    popularity: 1160.9712,
    genre_ids: [10749, 18],
  },
  {
    id: 1197137,
    title: "Black Phone 2",
    original_title: "Black Phone 2",
    overview:
      "Four years after escaping The Grabber, Finney Blake is haunted again as his sister Gwen begins seeing terrifying visions.",
    poster_path: "/evbguUd1BwExQgXMjG9n9AHMQpN.jpg",
    backdrop_path: "/6zKjoOOb3OZnZuiHtQZn4Kd69Gq.jpg",
    release_date: "2025-10-15",
    vote_average: 7.338,
    original_language: "en",
    popularity: 154.1022,
    genre_ids: [27, 53],
  },
  {
    id: 575265,
    title: "Mission: Impossible - The Final Reckoning",
    original_title: "Mission: Impossible - The Final Reckoning",
    overview:
      "Ethan Hunt and his team race against time to stop a rogue AI known as the Entity from changing the world forever.",
    poster_path: "/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    backdrop_path: "/538U9snNc2fpnOmYXAPUh3zn31H.jpg",
    release_date: "2025-05-17",
    vote_average: 7.275,
    original_language: "en",
    popularity: 147.1501,
    genre_ids: [28, 12, 53],
  },
  {
    id: 533533,
    title: "TRON: Ares",
    original_title: "TRON: Ares",
    overview:
      "A highly sophisticated Program called Ares is sent from the digital world into the real one on a dangerous mission.",
    poster_path: "/chpWmskl3aKm1aTZqUHRCtviwPy.jpg",
    backdrop_path: "/np0dsehLDdbfyHFRtqCiL1GR0TQ.jpg",
    release_date: "2025-10-08",
    vote_average: 6.417,
    original_language: "en",
    popularity: 119.2987,
    genre_ids: [878, 12, 28],
  },
  {
    id: 1061474,
    title: "Superman",
    original_title: "Superman",
    overview:
      "Clark Kent embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as the iconic hero, Superman.",
    poster_path: "/wPLysNDLffQLOVebZQCbXJEv6E6.jpg",
    backdrop_path: "/eGX66zonvc4bXg3rM08RUxdYSDx.jpg",
    release_date: "2025-07-09",
    vote_average: 7.441,
    original_language: "en",
    popularity: 119.7394,
    genre_ids: [878, 12, 28],
  },
];

function Hero() {
  return (
    <>
      <Movie />
    </>
  );
}
function Movie() {
  return (
    <div className="card">
      <img
        // src={`https://image.tmdb.org/t/p/w500${movies[4].backdrop_path}`}
        src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
        alt={`${movies[0].title} poster`}
        className="card__img"
      />
      <div className="card-info">
        <h3 className="card__title">{movies[0].title}</h3>
        <StarDisplay rating={4} />
      </div>
      <div className="card__btn card__btn--right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="card__arrow--right card__arrow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      <div className="card__btn card__btn--left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="card__arrow--left card__arrow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="play-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="play-btn--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Hero;
