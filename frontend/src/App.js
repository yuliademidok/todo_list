import { Routes, Route } from "react-router";

import Navigation from "./components/navigation.component";
import Login from "./pages/login.page";
import Home from "./pages/home.page";
import AddTodo from "./pages/add-todo.page";
import Todo from "./pages/todo.page";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Login />} />
        <Route path="current-todos" element={<Home />} />
        <Route path="new-todo" element={<AddTodo />} />
        <Route path="todo/:id" element={<Todo />} />
      </Route>
    </Routes>
  );
}

export default App;
