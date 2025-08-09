import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${API_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(
    `${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${API_URL}/movie/${id}?language=en-US`, options);
  return res.data;
};

export const getMovieCredits = async (id) => {
  const res = await axios.get(
    `${API_URL}/movie/${id}/credits?language=en-US`,
    options
  );
  return res.data.cast;
};

export const getMovieReviews = async (id) => {
  const res = await axios.get(
    `${API_URL}/movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  return res.data.results;
};
