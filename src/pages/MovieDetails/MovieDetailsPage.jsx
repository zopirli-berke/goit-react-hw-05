import { getMovieDetails } from "../../api/tmdbApi";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import css from "./MovieDetails.module.css";
import BackLink from "../../components/BackLink/BackLink";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const backLinkHref = location.state?.from ?? "/";

  useEffect(() => {
    setError(null);

    const getDetails = async () => {
      setIsLoading(true);

      try {
        const details = await getMovieDetails(movieId);

        setMovie(details);
      } catch (error) {
        console.error("Movie details not found:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      getDetails();
    }
  }, [movieId]);

  if (isLoading) {
    return <div>Loading details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie details not found.</div>;
  }
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  return (
    <div className={css.details}>
      <BackLink to={backLinkHref} />

      <div className={css.detailsContainer}>
        <img src={imageUrl} alt={movie.title} className={css.moviePoster} />
        <div className={css.detailsWrapper}>
          <h2 className={css.movieTitle}>{movie.title}</h2>
          <p className={css.detailsText}>{movie.overview}</p>
          <p className={css.detailsText}>
            <strong>Score:</strong> {movie.vote_average}
          </p>
          {/* Türler için kontol */}
          {movie.genres && movie.genres.length > 0 && (
            <div className={css.detailsText}>
              <strong>Genres: </strong>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </div>
          )}
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" className={css.additionalInfoText}>
              Cast
            </Link>
          </li>

          <li>
            <Link to="reviews" className={css.additionalInfoText}>
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
