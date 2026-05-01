import { useRef } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import "../../style/register.css";

export const Registerpage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      username: usernameRef.current?.value,
      userEmail: userEmailRef.current?.value,
      password: passwordRef.current?.value,
    };
    const response = await fetch("http://localhost:3500/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return console.log("Error");
    }
    const dataRes = await response.json();
    alert(dataRes);
  }
  return (
    <>
      <section className="register">
        <h1>Sign up</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form__input"
            id="username"
            placeholder="username"
            required
            min={3}
            max={64}
            ref={usernameRef}
          />
          <input
            type="email"
            className="form__input"
            id="userEmail"
            placeholder="example@mail.domen"
            required
            ref={userEmailRef}
          />
          <input
            type="password"
            className="form__input"
            id="password"
            placeholder="12345678"
            required
            min={8}
            ref={passwordRef}
          />
          <button className="form__button">Sign up</button>
        </form>
        <span>
          Already have an account?<Link to="/login">Log in</Link>
        </span>
      </section>
    </>
  );
};
