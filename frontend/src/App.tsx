import { Routes, Route } from "react-router-dom";
import { LayOut } from "./components/Layout";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index path="/" element={<h1>Main page</h1>} />
          <Route path="/login" element={<h1>Login page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
        </Route>
      </Routes>
    </>
  );
};
