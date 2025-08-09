// src/components/MovieCast/MovieCast.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/tmdbApi";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieCredits(movieId);

        setCast((data || []).slice(0, 12));
      } catch (err) {
        setError(err.message || "Failed to fetch cast.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  // Yüklenme, Hata ve Boş Veri kontrolleri
  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cast.length === 0)
    return <p>We don't have any cast information for this movie.</p>;

  return (
    <ul className={css.castList}>
      {cast.map(({ id, profile_path, name, character }) => {
        const imageUrl = profile_path
          ? `${IMAGE_BASE_URL}${profile_path}`
          : `https://via.placeholder.com/200x300?text=No+Photo`;

        return (
          <li key={id} className={css.castItem}>
            <img src={imageUrl} alt={name} className={css.castImage} />
            <div className={css.castInfo}>
              <p className={css.actorName}>{name}</p>

              <p className={css.characterName}>Character: {character}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
