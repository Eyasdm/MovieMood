// components/CastMini.jsx

const IMG_PROFILE = "https://image.tmdb.org/t/p/w185";

export default function CastMini({ person }) {
  const img = person?.profile_path
    ? `${IMG_PROFILE}${person.profile_path}`
    : "/assets/avatar.png";

  return (
    <article className="cast-mini">
      <div className="cast-mini__img-wrap">
        <img
          className="cast-mini__img"
          src={img}
          alt={person.name}
          loading="lazy"
        />
      </div>

      <div className="cast-mini__info">
        <h3 className="cast-mini__name" title={person.name}>
          {person.name}
        </h3>
        <p className="cast-mini__role" title={person.character || person.job}>
          {person.character || person.job || "—"}
        </p>
      </div>
    </article>
  );
}
