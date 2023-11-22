import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ReactFilterProvider } from "react-filter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactFilterProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </ReactFilterProvider>
    </BrowserRouter>
  </React.StrictMode>
);
