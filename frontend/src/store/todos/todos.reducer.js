import { TODOS_ACTION_TYPES } from "./todos.types";

export const TODOS_INITIAL_STATE = {
  todos: null,
  items: [],
  count: 0,
  isLoading: false,
  error: null,
};

export const todosReducer = (state = TODOS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TODOS_ACTION_TYPES.FETCH_TODOS_START:
      return { ...state, isLoading: true };
    case TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS:
      return { ...state, todos: payload, items: payload.results, count: payload.count, isLoading: false };
    case TODOS_ACTION_TYPES.FETCH_TODOS_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
