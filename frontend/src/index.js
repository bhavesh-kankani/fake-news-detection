import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import { CssBaseline } from "@mui/material";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
