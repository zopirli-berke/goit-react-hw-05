import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.activeLink);
};

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={buildClassName}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildClassName}>
        Movies
      </NavLink>
    </nav>
  );
}
