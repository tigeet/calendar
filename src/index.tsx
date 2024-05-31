import { createRoot } from "react-dom/client";
import App from "./app";
import React from "react";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw Error("Root Element Not Found");
}

const root = createRoot(rootEl);
root.render(<App />);
