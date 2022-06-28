import { createAction } from "../../utils/reducer.utils";
import { TODOS_ACTION_TYPES } from "./todos.types";

export const fetchTodosStart = (accessToken, status, offset) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_START, {
    accessToken,
    status,
    offset,
  });

export const fetchTodosSuccess = (todos) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS, todos);

export const fetchTodosFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_FAILED, error);

export const fetchTodoStart = (id, accessToken, itemType) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODO_START, {
    id,
    accessToken,
    itemType,
  });

export const fetchTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODO_SUCCESS, todo);

export const fetchTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODO_FAILED, error);
