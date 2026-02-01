import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getSaved } from "../utils/storage";
import "./page.css";

export default function Library() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = getSaved();
    setMovies(saved);
  }, []);

  return (
    <div className="container">
      <Link to="/">Назад</Link>
      <h1>бібліотека</h1>
      {movies.length === 0 ? (
        <div className="empty-state">
          <p>немає збережених фільмів</p>
          
        </div>
      ) : (
        <div className="movie-grid">
          
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
