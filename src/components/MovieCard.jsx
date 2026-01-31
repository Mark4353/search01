import { save, remove, getSaved } from "../utils/storage";
import { Link } from "react-router-dom";
import "../App.css";

export default function MovieCard({ movie }) {
  const saved = getSaved().some((m) => m.id === movie.id);

  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (saved) {
      remove(movie.id);
      window.location.reload();
    } else {
      save(movie);
      window.location.reload();
    }
  };

  const posterUrl = movie.poster ||
    (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "no-image");

  const rating = movie.vote_average || movie.rating ? (movie.vote_average || movie.rating).toFixed ? (movie.vote_average || movie.rating).toFixed(1) : (movie.vote_average || movie.rating) : "N/A";
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
