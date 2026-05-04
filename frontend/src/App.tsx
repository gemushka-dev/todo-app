import { Routes, Route } from "react-router-dom";
import { LayOut } from "./components/Layout";
import { HomePage } from "./pages/Homepage/Homepage";
import "./style/main.css";
import "./style/layout.css";
import { Registerpage } from "./pages/Registerpage/Registerpage";
import { Loginpage } from "./pages/Loginpage/Loginpage";
import { Todospage } from "./pages/Todospage/Todospage";
import { useAuth } from "./hooks/useAuth";
import { Error404 } from "./pages/Erorrspages/Error404";

export const App = () => {
  const { sharedData, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
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
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
};
