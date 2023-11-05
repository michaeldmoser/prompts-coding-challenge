/**
 * Seup react-query client and expose a prebuilt Provider for use in the app
 */
import { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = window.location.origin;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryClientProvider(
  { children }: PropsWithChildren<{}>,
) {
  return (
    <Provider client={queryClient}>
      {children}
    </Provider>
  );
}
