import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import css from "./BackLink.module.css";

export default function BackLink({ to }) {
  return (
    <Link to={to} className={css.backLink}>
      <HiArrowLeft size="24" />
      Go back
    </Link>
  );
}
