import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";
        return (
          <li key={movie.id} className={css.movieItem}>
            <img src={imageUrl} alt={movie.title} className={css.moviePoster} />
            <h2 className={css.movieTitle}>{movie.title}</h2>
          </li>
        );
      })}
    </ul>
  );
}
