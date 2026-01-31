const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=uk-UA`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};

export async function getPopular() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=uk-UA`
  );
  const data = await res.json();
  return data.results.map(mapMovie);
}

export async function getMovieDetails(id) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=uk-UA`
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return mapMovie(data);
  } catch (err) {
    console.error('Get movie details error:', err);
    return null;
  }
}

function mapMovie(m) {
  return {
    id: m.id,
    title: m.title,
    poster: IMG + m.poster_path,
    releaseDate: m.release_date,
    rating: m.vote_average,
    overview: m.overview
  };
}
