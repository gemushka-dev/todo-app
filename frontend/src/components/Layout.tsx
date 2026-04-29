import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
export const LayOut = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};
