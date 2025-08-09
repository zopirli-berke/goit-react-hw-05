import css from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/HomePage"));
// const MoviesPage = lazy(() => import("./pages/MoviesPage"));
// const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
// const MovieCast = lazy(() => import("./components/MovieCast"));
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
              {/* <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Route> */}
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
