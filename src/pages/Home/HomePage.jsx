import { fetchTrendingMovies } from "../../api/tmdbApi.js";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1
        style={{ justifyContent: "center", display: "flex", margin: "20px 0" }}
      >
        Trending Today
      </h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
