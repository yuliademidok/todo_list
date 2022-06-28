import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.saga";
import { todosSagas } from "./todos/todos.saga";

export function* rootSaga() {
  yield all([call(userSagas), call(todosSagas)]);
}
