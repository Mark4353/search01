import { save, remove, getSaved } from "../utils/storage";
import "../app.css";

export default function MovieCard({ movie }) {
  const saved = getSaved().some((m) => m.id === movie.id);

  const handleSave = () => {
    if (saved) {
      remove(movie.id);
      window.location.reload();
    } else {
      save(movie);
      window.location.reload();
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "no-image";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const title = movie.title || movie.name;

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={title}
        
        className="movie-poster"
      />
      <h3>{title}</h3>
      <p>Рейтинг: {rating}</p>
      <button onClick={handleSave}>{saved ? "Видалити" : "Зберегти"}</button>
    </div>

  );
}
