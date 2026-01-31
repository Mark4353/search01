import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { save, remove, getSaved } from "../utils/storage";
import "./page.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSaved().some((m) => m.id === parseInt(id)));
  }, [id]);

  useEffect(() => {
    if (movie) return;
    const fetchDetails = async () => {
      setLoading(true);
      const m = await getMovieDetails(id);
      setMovie(m);
      setLoading(false);
    };
    fetchDetails();
  }, [id, movie]);

  const handleSave = () => {
    if (saved) {
      remove(parseInt(id));
      setSaved(false);
    } else {
      save(movie);
      setSaved(true);
    }
  };

  if (loading) return <div className="container"><p className="loading-text">Завантаження...</p></div>;
  if (!movie) return (
    <div className="container">
      <p>Інформація про фільм не знайдена.</p>
      <Link to="/">Назад</Link>
    </div>
  );

  return (
    <div className="container movie-detail">
      <Link to="/">Назад</Link>
      <h1>{movie.title}</h1>
      <div className="detail-grid">
        <img src={movie.poster} alt={movie.title} className="movie-poster-large" />
        <div className="detail-info">
          <p><strong>Реліз:</strong> {movie.releaseDate}</p>
          <p><strong>Рейтинг:</strong> {movie.rating}</p>
          <p><strong>Опис:</strong></p>
          <p className="overview">{movie.overview}</p>
          <button 
            onClick={handleSave} 
            className="save-btn"
          >
            {saved ? "Видалити зі збережених" : "Зберегти фільм"}
          </button>
        </div>
      </div>
    </div>
  );
}
