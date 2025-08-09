import React, { useState } from "react";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const { query, setQuery } = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      alert("Please enter a movie title to search");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search a movies..."
        className={css.input}
      />
      <button type="submit" className={css.btn}>
        Search
      </button>
    </form>
  );
}
