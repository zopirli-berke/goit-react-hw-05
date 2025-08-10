import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdbApi";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

  return (
    <ul className={css.reviewList}>
      {reviews.slice(0, 5).map(({ id, author, content }) => (
        <li key={id} className={css.reviewItem}>
          <h3 className={css.authorName}>Author: {author}</h3>
          <p className={css.reviewContent}>{content}</p>
        </li>
      ))}
    </ul>
  );
}
