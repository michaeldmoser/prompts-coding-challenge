import { AppRoutes } from "@/routes";
import { RouterProvider } from "react-router-dom";
import QueryClientProvider from "@/libs/query-client";
import { Provider as LanguageProvider } from "@/components/language-selector";

export const AppProvider = () => (
  <QueryClientProvider>
    <LanguageProvider>
      <RouterProvider router={AppRoutes} />
    </LanguageProvider>
  </QueryClientProvider>
);
