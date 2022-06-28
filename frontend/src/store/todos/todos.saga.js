import { takeLatest, put, all, call } from "redux-saga/effects";

import { TODOS_ACTION_TYPES } from "./todos.types";
import { fetchTodosSuccess, fetchTodosFailed } from "./todos.action";
import { getTodos } from "../../utils/todos.utils";

export function* getTodosSaga({ payload }) {
  try {
    const { accessToken, status, offset } = payload;
    const todos = yield call(getTodos, accessToken, status, offset);
    yield put(fetchTodosSuccess({ ...todos }));
  } catch (error) {
    yield put(fetchTodosFailed(error));
  }
}

export function* onFetchTodos() {
  yield takeLatest(TODOS_ACTION_TYPES.FETCH_TODOS_START, getTodosSaga);
}

export function* todosSagas() {
  yield all([call(onFetchTodos)]);
}
