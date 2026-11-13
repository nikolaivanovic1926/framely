import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, IMG } from "../api/tmdb.js";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setMovie(null);
    setError("");
    getMovie(id)
      .then(setMovie)
      .catch(() => setError("Could not load this movie."));
  }, [id]);

  if (error) return <p className="msg">{error}</p>;
  if (!movie) return <p className="msg">Loading...</p>;

  const trailer = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const director = movie.credits.crew.find((c) => c.job === "Director");
  const cast = movie.credits.cast.slice(0, 12);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;
  const bg = movie.backdrop_path
    ? `linear-gradient(90deg,#0d0d10 20%,rgba(13,13,16,.3)),url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
    : "none";

  return (
    <div>
      <div className="hero" style={{ backgroundImage: bg }}>
        <Link to="/" className="back">← Back to all movies</Link>
      </div>
      <div className="detail">
        {movie.poster_path ? (
          <img className="big-poster" src={IMG + movie.poster_path} alt={movie.title} />
        ) : (
          <div className="big-poster noposter">No poster</div>
        )}
        <div className="info">
          <h1>{movie.title}</h1>
          <div className="meta">
            <span className="rate">★ {movie.vote_average.toFixed(1)}</span>
            {year}
            {movie.runtime > 0 && ` · ${hours}h ${mins}min`}
            {director && ` · Directed by ${director.name}`}
          </div>
          <div className="tags">
            {movie.genres.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
          <h3>Plot</h3>
          <p>{movie.overview || "No description available."}</p>
          {trailer && (
            <a
              className="btn"
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch trailer
            </a>
          )}
        </div>
      </div>
      <h2 className="cast-title">Cast</h2>
      <div className="cast">
        {cast.map((a) => (
          <div key={a.id}>
            {a.profile_path ? (
              <img src={IMG + a.profile_path} alt={a.name} />
            ) : (
              <i />
            )}
            <b>{a.name}</b>
            <span>{a.character}</span>
          </div>
        ))}
      </div>
    </div>
  );
}