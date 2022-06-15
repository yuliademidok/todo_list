import { Routes, Route } from "react-router";

import Navigation from "./components/navigation.component";
import Login from "./pages/login.page";
import SignUp from "./pages/sign-up.page";
import Home from "./pages/home.page";
import CompletedTodos from "./pages/completed-todos.page";
import AllTodos from "./pages/all-todos.page";
import AddTodo from "./pages/add-todo.page";
import AddSubtask from "./pages/add-subtask.page";
import Todo from "./pages/todo.page";
import Subtask from "./pages/subtask.page";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="current-todos" element={<Home />} />
        <Route path="completed-todos" element={<CompletedTodos />} />
        <Route path="all-todos" element={<AllTodos />} />
        <Route path="new-todo" element={<AddTodo />} />
        <Route path="todo/:id" element={<Todo />} />
        <Route path="subtask/:id" element={<Subtask />} />
        <Route path=":parent_id/new-subtask" element={<AddSubtask />} />
      </Route>
    </Routes>
  );
}

export default App;
