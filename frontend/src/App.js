import { Routes, Route } from "react-router";

import Login from "./pages/login.page";
import Home from "./pages/home.page";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/current-todos" element={<Home />} />
    </Routes>
  );
}

export default App;
