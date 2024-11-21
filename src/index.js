import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./all.min.css";
import "./Pages/Dashboard/dashboard.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import UserProvider from "./Pages/Website/context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
