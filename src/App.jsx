import clsx from "clsx";
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading page...</div>}></Suspense>
    </>
  );
}

export default App;
