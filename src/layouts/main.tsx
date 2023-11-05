import { Switch } from "@/components/language-selector";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="flex justify-center items-center h-screen text-center text-2xl">
      <header className="my-10">
        <h1 className="text-6xl">HELLO!</h1>
        <Switch />
      </header>
      <main className="mx-10">
        <Outlet />
      </main>
    </div>
  );
}
