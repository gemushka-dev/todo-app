import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<h1>Main page</h1>} />
        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
      </Routes>
    </>
  );
};
