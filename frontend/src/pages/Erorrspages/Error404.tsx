import { Link } from "react-router-dom";
import "../../style/error.css";

export const Error404 = () => {
  return (
    <section className="error">
      <h1 className="error__code">404</h1>
      <div className="error__container">
        <h3 className="error_message">Oops!This Page Could Not Be Found</h3>
        <Link to="/" className="home">
          GO TO HOMEPAGE
        </Link>
      </div>
    </section>
  );
};
