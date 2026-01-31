import { useState } from "react";
import { searchMovies } from "../api/tmdb";
import "./page.css";
import MovieList from "../components/MovieList";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      console.error(err);
      alert("Помилка пошуку");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Введіть назву фільму"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Пошук</button>
      </form>
      
      {loading && <p className="loading-text">Завантаження...</p>}
      <div className="movie-grid">
        {movies.length === 0 && !loading && <p>Немає результатів</p>}
        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </div>
  );
}
