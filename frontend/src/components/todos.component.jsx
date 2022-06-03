import { useEffect, useContext, Fragment } from "react";

import { getCurrentTodos } from "../utils/todos.utils";

import { TodosContext } from "../context/todos.context";
import TodoItem from "./todo-item.component";
import AddTodoButton from "./add-todo-button.components";
import { TodoItemsContainer } from "../app.styles";

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
      {currentTodosCount ? (
        <Fragment>
          <h1>You have {currentTodosCount} uncompleted todos</h1>

          <TodoItemsContainer>
            {currentTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </TodoItemsContainer>
        </Fragment>
      ) : (
        <Fragment>
          <div>All todos are completed!</div>
          <AddTodoButton />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Todos;
