import { Routes, Route } from "react-router-dom";
import { LayOut } from "./components/Layout";
import { HomePage } from "./pages/Homepage/Homepage";
import "./style/main.css";
import "./style/layout.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<h1>Login page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
        </Route>
      </Routes>
    </>
  );
};
