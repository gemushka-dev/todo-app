import { useRef } from "react";
import type { FormEvent } from "react";
import "../../style/register.css";
import { Link } from "react-router-dom";

export const Loginpage = () => {
  const userEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      userEmail: userEmailRef.current?.value,
      password: passwordRef.current?.value,
    };
    const response = await fetch("http://localhost:3500/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!response.ok) {
      return alert(
        response.status == 400 ? "Incorrect data" : "Check password or email",
      );
    }
    await response.json();
    alert("Successfully loged");
  }
  return (
    <>
      <section className="register">
        <h1>Login</h1>
        <form className="register__form" onSubmit={handleSubmit}>
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
          Not a member?<Link to="/register">Sign up</Link>
        </span>
      </section>
    </>
  );
};
