import css from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const MoviesPage = lazy(() => import("./pages/Movies/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetails/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
// const MovieReviews = lazy(() => import("./components/MovieReviews"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main>
          <Suspense fallback={<div>Loading page...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />

              <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
              </Route>
              {/*<Route path="reviews" element={<MovieReviews />} />
               */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* Suspense fallback for lazy-loaded components */}
          </Suspense>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
