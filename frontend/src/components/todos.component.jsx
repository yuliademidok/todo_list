import { useEffect, useContext, Fragment } from "react";

import { getTodos } from "../utils/todos.utils";

import { TodosContext } from "../context/todos.context";
import TodoItem from "./todo-item.component";
import AddTodoButton from "./add-todo-button.components";
import { TodoItemsContainer, Title } from "../app.styles";

const Todos = ({ status }) => {
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
    getTodos(accessToken, status, fetchTodos);
  }, []);

  let todoStatus = "";
  if (status.includes("completed")) {
    todoStatus = "completed";
  } else if (status.includes("current")) {
    todoStatus = "uncompleted";
  }

  return (
    <Fragment>
      {currentTodosCount ? (
        <Fragment>
          <Title>
            You have {currentTodosCount} {todoStatus} todos
          </Title>

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
