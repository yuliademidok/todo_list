import { TODOS_ACTION_TYPES } from "./todos.types";

export const TODOS_INITIAL_STATE = {
  todos: null,
  items: [],
  count: 0,
  isLoading: false,
  todo: null,
  error: null,
};

export const todosReducer = (state = TODOS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TODOS_ACTION_TYPES.FETCH_TODOS_START:
    case TODOS_ACTION_TYPES.FETCH_TODO_START:
    case TODOS_ACTION_TYPES.EDIT_TODO_START:
    case TODOS_ACTION_TYPES.ADD_TODO_START:
    case TODOS_ACTION_TYPES.COMPLETE_TODO_START:
      return { ...state, isLoading: true };
    case TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
        items: payload.results,
        count: payload.count,
        isLoading: false,
      };
    case TODOS_ACTION_TYPES.FETCH_TODO_SUCCESS:
    case TODOS_ACTION_TYPES.EDIT_TODO_SUCCESS:
    case TODOS_ACTION_TYPES.ADD_TODO_SUCCESS:
    case TODOS_ACTION_TYPES.DELETE_TODO:
    case TODOS_ACTION_TYPES.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        todo: payload,
        isLoading: false,
      };
    case TODOS_ACTION_TYPES.FETCH_TODOS_FAILED:
    case TODOS_ACTION_TYPES.ADD_TODO_FAILED:
    case TODOS_ACTION_TYPES.FETCH_TODO_FAILED:
    case TODOS_ACTION_TYPES.EDIT_TODO_FAILED:
    case TODOS_ACTION_TYPES.COMPLETE_TODO_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
