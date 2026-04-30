import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
export const LayOut = ({ data }: { data: object | null }) => {
  return (
    <>
      <header>
        <Navbar data={data} />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};
