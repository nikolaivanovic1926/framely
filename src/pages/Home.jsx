import { useEffect, useState } from "react";
import { getPopular, searchMovies, discoverMovies, getGenres } from "../api/tmdb.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getGenres()
      .then((d) => setGenres(d.genres))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(text.trim());
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [text]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    let request;
    if (query) request = searchMovies(query, page);
    else if (genre) request = discoverMovies(genre, page);
    else request = getPopular(page);
    request
      .then((data) => {
        if (cancelled) return;
        setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setTotalPages(Math.min(data.total_pages, 500));
      })
      .catch(() => {
        if (!cancelled) setError("Something went wrong. Check your API key.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, genre, page]);

  function pickGenre(id) {
    setText("");
    setQuery("");
    setGenre(id);
    setPage(1);
  }

  const genreName = genres.find((g) => String(g.id) === String(genre))?.name;
  const title = query
    ? `Results for "${query}"`
    : genre
    ? genreName
    : "Popular right now";

  return (
    <main className="container">
      <input
        className="search"
        placeholder="Search movies..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="chips">
        <button className={genre === "" ? "chip on" : "chip"} onClick={() => pickGenre("")}>
          All
        </button>
        {genres.map((g) => (
          <button
            key={g.id}
            className={String(genre) === String(g.id) ? "chip on" : "chip"}
            onClick={() => pickGenre(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>
      <h2>{title}</h2>
      {error && <p className="msg">{error}</p>}
      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      {loading && <p className="msg">Loading...</p>}
      {!loading && !error && movies.length === 0 && <p className="msg">No movies found.</p>}
      {!loading && page < totalPages && (
        <button className="more" onClick={() => setPage((p) => p + 1)}>
          Load more
        </button>
      )}
    </main>
  );
}