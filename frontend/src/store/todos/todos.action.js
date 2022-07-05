import { createAction } from "../../utils/reducer.utils";
import { TODOS_ACTION_TYPES } from "./todos.types";

export const fetchTodosStart = (status, offset) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_START, {
    status,
    offset,
  });

export const fetchTodosSuccess = (todos) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS, todos);

export const fetchTodosFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_FAILED, error);

export const fetchTodoStart = (id, itemType) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODO_START, {
    id,
    itemType,
  });

export const fetchTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODO_SUCCESS, todo);

export const fetchTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODO_FAILED, error);

export const editTodoStart = (todo, id, itemType) =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_START, {
    todo,
    id,
    itemType,
  });

export const editTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_SUCCESS, todo);

export const editTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_FAILED, error);

export const addTodoStart = (todo, itemType, parent_id) =>
  createAction(TODOS_ACTION_TYPES.ADD_TODO_START, {
    todo,
    itemType,
    parent_id,
  });

export const addTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.ADD_TODO_SUCCESS, todo);

export const addTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.ADD_TODO_FAILED, error);

export const deleteTodoStart = (id, itemType) =>
  createAction(TODOS_ACTION_TYPES.DELETE_TODO, {
    id,
    itemType,
  });

export const completeTodoStart = (id, itemType) =>
  createAction(TODOS_ACTION_TYPES.COMPLETE_TODO_START, {
    id,
    itemType,
  });

export const completeTodoSuccess = (todo) =>
  createAction(TODOS_ACTION_TYPES.COMPLETE_TODO_SUCCESS, todo);

export const completeTodoFailed = (error) =>
  createAction(TODOS_ACTION_TYPES.COMPLETE_TODO_FAILED, error);
