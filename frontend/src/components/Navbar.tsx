import { NavData, NavDataAuth } from "../data/NavData";
import { Link } from "react-router-dom";

export const Navbar = ({ data }: { data: object | null }) => {
  return (
    <>
      <nav className="nav">
        <h2>Logo</h2>
        <ul className="nav__list">
          {data
            ? NavDataAuth.map((el) => (
                <li key={el.href} className="list__item">
                  <Link to={el.href}>{el.label}</Link>
                </li>
              ))
            : NavData.map((el) => (
                <li key={el.href} className="list__item">
                  <Link to={el.href}>{el.label}</Link>
                </li>
              ))}
        </ul>
      </nav>
    </>
  );
};
