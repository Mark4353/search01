import MovieCard from "./MovieCard";
import "../App.css";

export default function MovieList({ movies }) {
  return (
    <div className="card-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}