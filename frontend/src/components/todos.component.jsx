import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectTodosItems,
  selectTodosCount,
  selectTodosIsLoading,
} from "../store/todos/todos.selector";
import { fetchTodosStart } from "../store/todos/todos.action";
import TodoItem from "./todo-item.component";
import AddTodoButton from "./add-todo-button.components";
import Pagination from "./pagination.component.jsx";
import Spinner from "./spinner.component";
import { TodoItemsContainer, Title } from "../app.styles";

const Todos = ({ status }) => {
  const dispatch = useDispatch();

  const todosItems = useSelector(selectTodosItems);
  const todosCount = useSelector(selectTodosCount);
  const isLoading = useSelector(selectTodosIsLoading);

  const itemLimit = 10;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(fetchTodosStart(accessToken, status));
  }, [accessToken, dispatch, status]);

  const handlePagination = async (value) => {
    const offset = value.selected * itemLimit;
    dispatch(fetchTodosStart(accessToken, status, offset));
  };

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {todosCount ? (
            <Fragment>
              <Title>
                You have {todosCount} {status} todos
              </Title>

              <TodoItemsContainer>
                {todosItems.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </TodoItemsContainer>

              <Pagination
                todosCount={todosCount}
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
      )}
    </Fragment>
  );
};

export default Todos;
