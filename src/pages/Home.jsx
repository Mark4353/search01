import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPopular } from '../api/tmdb';
import MovieList from '../components/MovieList';
import './page.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const popular = await getPopular();
        setMovies(popular);
      } catch (err) {
        console.error('Error fetching popular movies:', err);
        setError(err.message);
      }
      setLoading(false);
    };
    fetchPopular();
  }, []);

  return (
    <>
    <div className="container">
      <header>
        <h2>фільми</h2>
        <ul>
          <li><Link to="/library">Бібліотека</Link></li>
          <li><Link to="/search">Пошук</Link></li>
        </ul>
      </header>
      <main>
        <h3>Популярні фільми</h3>
        {loading && <p className="loading-text">Завантаження...</p>}
        {error && <p style={{color: 'red'}}>Помилка: {error}</p>}
        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </main>
      </div>
    </>
  );
}
