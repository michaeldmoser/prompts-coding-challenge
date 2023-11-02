import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/main";
import { PromptRoutes } from "@/features/prompts";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{
      path: "/",
      element: <PromptRoutes />,
    }],
  },
]);
