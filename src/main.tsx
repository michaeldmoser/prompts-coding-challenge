import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@/backend";

import { AppProvider } from "./providers/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
);
