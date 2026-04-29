import { NavData } from "../data/NavData";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          {NavData.map((el) => (
            <li key={el.href} className="list__item">
              <Link to={el.href}>{el.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
