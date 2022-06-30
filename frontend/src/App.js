import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

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
import ToastMessage from "./components/toast.component";
import { checkUserSession } from "./store/user/user.action";
import { ProtectedRoute, AuthorizedRoute, IndexRoute } from "./AuthRoute";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<ToastMessage />}>
          <Route element={<IndexRoute />}>
            <Route index element={<Login />} />
          </Route>

          <Route element={<AuthorizedRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="current-todos" element={<Home />} />
            <Route path="completed-todos" element={<CompletedTodos />} />
            <Route path="all-todos" element={<AllTodos />} />
            <Route path="new-todo" element={<AddTodo />} />
            <Route path="todo/:id" element={<Todo />} />
            <Route path="subtask/:id" element={<Subtask />} />
            <Route path=":parent_id/new-subtask" element={<AddSubtask />} />
            <Route path="*" element={<Navigate replace to="current-todos" />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
