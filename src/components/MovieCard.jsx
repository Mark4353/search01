import { save, remove, getSaved } from "../utils/storage";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MovieCard({ movie }) {
  const [saved, setSaved] = useState(getSaved().some((m) => m.id === movie.id));

  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (saved) {
      remove(movie.id);
      setSaved(false);
    } else {
      save(movie);
      setSaved(true);
    }
  };

  const posterUrl = movie.poster || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "no-image");
  const rating = (movie.rating || movie.vote_average || 0).toFixed(1);
  const title = movie.title || movie.name;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} state={{ movie }} className="movie-link">
        <img src={posterUrl} alt={title} className="movie-poster" />
        <h3>{title}</h3>
        <p>Рейтинг: {rating}</p>
      </Link>
      <button onClick={handleSave}>{saved ? "Видалити" : "Зберегти"}</button>
    </div>
  );
}
