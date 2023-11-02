import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="flex justify-center items-center h-screen text-center text-2xl">
      <header className="my-10">
        <h1 className="text-6xl">HELLO!</h1>
        <img
          src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/488d0ce0-11a9-498c-a483-7b83d6bea7d0/29c-rX_A/w=640,quality=80"
          alt="logo"
        />
      </header>
      <main className="mx-10">
        <Outlet />
      </main>
    </div>
  );
}
