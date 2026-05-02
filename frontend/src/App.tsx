import { Routes, Route } from "react-router-dom";
import { LayOut } from "./components/Layout";
import { HomePage } from "./pages/Homepage/Homepage";
import "./style/main.css";
import "./style/layout.css";
import { useEffect, useState } from "react";
import { Registerpage } from "./pages/Registerpage/Registerpage";
import { Loginpage } from "./pages/Loginpage/Loginpage";
import { Todospage } from "./pages/Todospage/Todospage";

export const App = () => {
  const [sharedData, setSharedData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3500/me", {
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error with cookies");
      } else {
        const data = await response.json();
        setSharedData(data);
        console.log(data);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOut data={sharedData} />}>
          <Route index path="/" element={<HomePage />} />
          {sharedData ? (
            <>
              <Route path="/todos" element={<Todospage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<Registerpage />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
};
