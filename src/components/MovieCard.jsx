import { Link } from "react-router-dom";
import { IMG } from "../api/tmdb.js";

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <div className="poster">
        {movie.poster_path ? (
          <img src={IMG + movie.poster_path} alt={movie.title} loading="lazy" />
        ) : (
          <div className="noposter">No poster</div>
        )}
        <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
      </div>
      <h3>{movie.title}</h3>
      <span className="year">{year}</span>
    </Link>
  );
}