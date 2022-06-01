import { Routes, Route } from "react-router";

import Login from "./pages/login.page";
import Home from "./pages/home.page";
import Navigation from "./components/navigation.component";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Login />} />
        <Route path="current-todos" element={<Home />} />
      </ Route>
    </Routes>
  );
}

export default App;
