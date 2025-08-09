import { searchMovies } from "../../api/tmdbApi";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setMovies([]);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    const fetchSearchedMovies = async () => {
      try {
        setIsLoading(true);
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchedMovies();
  }, [searchQuery]);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
