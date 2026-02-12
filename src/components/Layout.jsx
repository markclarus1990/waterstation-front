import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-10 py-10">
        <Outlet />
      </main>
    </>
  );
}
