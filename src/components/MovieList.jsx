import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="card-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}