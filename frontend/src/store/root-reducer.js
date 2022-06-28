import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { todosReducer } from "./todos/todos.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});
