import { Link } from "react-router-dom";
import "../../style/homepage.css";

export const HomePage = () => {
  return (
    <>
      <div className="info">
        <h1 className="info__title">Organize your to-do lists from anywhere</h1>
        <h3 className="info__subtitle">
          Create clear to-do lists to easily manage your ideas and work from{" "}
          <br />
          anywhere so you never forget anything again.
        </h3>
        <Link to="/register" className="info__link">
          Get started ➡
        </Link>
      </div>
      <section className="steps">
        <h2 className="steps__title">How it works</h2>
        <div className="steps__container">
          <div className="step-card">
            <div className="step-card__number">1</div>
            <h4>Sign Up</h4>
            <p>Create your personal account to keep tasks safe.</p>
          </div>
          <div className="step-card">
            <div className="step-card__number">2</div>
            <h4>Add Tasks</h4>
            <p>Quickly jot down your ideas, goals, or daily chores.</p>
          </div>
          <div className="step-card">
            <div className="step-card__number">3</div>
            <h4>Stay Focused</h4>
            <p>Check off completed tasks and track your progress.</p>
          </div>
        </div>
      </section>
    </>
  );
};
