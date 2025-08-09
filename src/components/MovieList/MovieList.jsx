import css from "./MovieList.module.css";
import React, { useRef } from "react"; // useRef'i import ediyoruz
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  // 1. Düzeltme: `location` değişkenini kullanabilmek için useLocation hook'unu çağırıyoruz.
  const location = useLocation();
  // 2. Düzeltme: Klonlama hatasını önlemek için location'ı bir ref içinde saklıyoruz.
  const backLinkLocationRef = useRef(location);

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";

        return (
          <li key={movie.id} className={css.movieItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: backLinkLocationRef.current }}
            >
              <img
                src={imageUrl}
                alt={movie.title}
                className={css.moviePoster}
              />
              <h2 className={css.movieTitle}>{movie.title}</h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
