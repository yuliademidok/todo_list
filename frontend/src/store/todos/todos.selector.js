import { createSelector } from "reselect";

export const selectTodosRecucer = (state) => state.todos;

export const selectTodosItems = createSelector(
  [selectTodosRecucer],
  (todos) => todos.items
);

export const selectTodosCount = createSelector(
  [selectTodosRecucer],
  (todos) => todos.count
);

export const selectTodosIsLoading = createSelector(
  [selectTodosRecucer],
  (todos) => todos.isLoading
);
