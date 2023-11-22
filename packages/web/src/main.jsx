import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  ArrayAdapter,
  BooleanAdapter,
  JSONAdapter,
  ReactFilterProvider,
  StringAdapter,
} from "react-filter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactFilterProvider
        registery={{
          query: { adapter: new StringAdapter() },
          query_value: { adapter: new StringAdapter() },
          name: { adapter: new StringAdapter() },
          min_amount: { adapter: new StringAdapter() },
          time: { adapter: new StringAdapter() },
          promo: { adapter: new BooleanAdapter() },
          status: { adapter: new ArrayAdapter() },
          keywords: { adapter: new ArrayAdapter([], new JSONAdapter()) },
        }}
      >
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </ReactFilterProvider>
    </BrowserRouter>
  </React.StrictMode>
);
