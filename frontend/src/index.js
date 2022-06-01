import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { UserProvider } from "./context/user.context";
import { TodosProvider } from "./context/todos.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TodosProvider>
          <App />
        </TodosProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
