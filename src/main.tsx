import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/minireset.css/minireset.min.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
