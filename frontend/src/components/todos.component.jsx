import { useEffect, useContext, Fragment } from "react";

import { getCurrentTodos } from "../utils/todos.utils";

import { TodosContext } from "../context/todos.context";
import TodoItem from "./todo-item.component";

const Todos = () => {
  const {
    currentTodos,
    setCurrentTodos,
    setCurrentTodosCount,
    currentTodosCount,
  } = useContext(TodosContext);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTodos = (data) => {
      const { count, results } = data;
      setCurrentTodosCount(count);
      setCurrentTodos(results);
    };
    getCurrentTodos(accessToken, fetchTodos);
  }, []);

  return (
    <Fragment>
      <div>You have {currentTodosCount} uncompleted todos</div>
      {currentTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </Fragment>
  );
};

export default Todos;
