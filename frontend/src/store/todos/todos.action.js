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
