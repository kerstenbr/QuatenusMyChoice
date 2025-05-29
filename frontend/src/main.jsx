import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./context/userContext.jsx";
import ViewProvider from "./context/viewContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ViewProvider>
        <App />
      </ViewProvider>
    </UserProvider>
  </React.StrictMode>
);
