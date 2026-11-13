import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import About from "./pages/About.jsx";
import Logo from "./components/Logo.jsx";
import { getRandomMovie } from "./api/tmdb.js";

export default function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  async function surprise() {
    close();
    try {
      const m = await getRandomMovie();
      navigate(`/movie/${m.id}`);
    } catch {
      alert("Could not pick a movie. Try again.");
    }
  }

  return (
    <>
      <header className="header">
  <Link to="/" className="logo" onClick={close}>
    <Logo />
    <span>FRAME<b>LY</b></span>
  </Link>
  <div className="actions">
    <button className="surprise" onClick={surprise}>Surprise me</button>
    <button
      className={open ? "burger open" : "burger"}
      onClick={() => setOpen(!open)}
      aria-label="Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>
      <nav className={open ? "menu show" : "menu"}>
        <Link to="/" onClick={close}>Home</Link>
        <button onClick={surprise}>Surprise me</button>
        <Link to="/about" onClick={close}>About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="footer">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </>
  );
}