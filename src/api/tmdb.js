const KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";
export const IMG = "https://image.tmdb.org/t/p/w500";

async function get(path, params = {}) {
  const query = new URLSearchParams({ api_key: KEY, ...params });
  const res = await fetch(`${BASE}${path}?${query}`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export const getPopular = (page) => get("/movie/popular", { page });
export const searchMovies = (q, page) => get("/search/movie", { query: q, page });
export const getMovie = (id) =>
  get(`/movie/${id}`, { append_to_response: "credits,videos" });
export const getGenres = () => get("/genre/movie/list");
export const discoverMovies = (genre, page) =>
  get("/discover/movie", { with_genres: genre, sort_by: "popularity.desc", page });

export const getRandomMovie = async () => {
  const page = Math.floor(Math.random() * 50) + 1;
  const data = await get("/discover/movie", { sort_by: "vote_count.desc", page });
  return data.results[Math.floor(Math.random() * data.results.length)];
};