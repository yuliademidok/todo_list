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

export const editTodoStart = (todo, id, accessToken, itemType) =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_START, {
    todo,
    id,
    accessToken,
    itemType,
  });

export const editTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_SUCCESS, todo);

export const editTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_FAILED, error);

export const addTodoStart = (todo, accessToken, itemType, parent_id) =>
  createAction(TODOS_ACTION_TYPES.ADD_TODO_START, {
    todo,
    accessToken,
    itemType,
    parent_id,
  });

export const addTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.ADD_TODO_SUCCESS, todo);

export const addTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.ADD_TODO_FAILED, error);

export const deleteTodoStart = (id, accessToken, itemType) =>
  createAction(TODOS_ACTION_TYPES.DELETE_TODO, {
    id,
    accessToken,
    itemType,
  });

export const completeTodoStart = (id, accessToken, itemType) =>
  createAction(TODOS_ACTION_TYPES.COMPLETE_TODO_START, {
    id,
    accessToken,
    itemType,
  });

export const completeTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.COMPLETE_TODO_SUCCESS, todo);

export const completeTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.COMPLETE_TODO_FAILED, error);
