import { useEffect, useContext, Fragment } from "react";

import { getTodos } from "../utils/todos.utils";

import { TodosContext } from "../context/todos.context";
import TodoItem from "./todo-item.component";
import AddTodoButton from "./add-todo-button.components";
import Pagination from "./pagination.component.jsx";
import { TodoItemsContainer, Title } from "../app.styles";

const Todos = ({ status }) => {
  const {
    currentTodos,
    setCurrentTodos,
    setCurrentTodosCount,
    currentTodosCount,
  } = useContext(TodosContext);
  const accessToken = localStorage.getItem("accessToken");

  const itemLimit = 10;

  useEffect(() => {
    const fetchTodos = (data) => {
      const { count, results } = data;
      setCurrentTodosCount(count);
      setCurrentTodos(results);
    };
    getTodos(accessToken, status, fetchTodos);
  }, []);

  const handlePagination = async (value) => {
    const fetchTodos = (data) => {
      const { results } = data;
      setCurrentTodos(results);
    };
    const offset = value.selected * itemLimit;
    getTodos(accessToken, status, fetchTodos, offset);
  };

  return (
    <Fragment>
      {currentTodosCount ? (
        <Fragment>
          <Title>
            You have {currentTodosCount} {status} todos
          </Title>

          <TodoItemsContainer>
            {currentTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </TodoItemsContainer>

          <Pagination
            currentTodosCount={currentTodosCount}
            handlePagination={handlePagination}
            itemLimit={itemLimit}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Title>All todos are completed!</Title>
          <AddTodoButton />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Todos;
