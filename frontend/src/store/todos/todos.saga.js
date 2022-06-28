import { takeLatest, put, all, call } from "redux-saga/effects";

import { TODOS_ACTION_TYPES } from "./todos.types";
import {
  fetchTodosSuccess,
  fetchTodosFailed,
  fetchTodoSuccess,
  fetchTodoFailed,
} from "./todos.action";
import { getTodos, getTodo, getSubtask } from "../../utils/todos.utils";

export function* getTodosSaga({ payload }) {
  try {
    const { accessToken, status, offset } = payload;
    const todos = yield call(getTodos, accessToken, status, offset);
    yield put(fetchTodosSuccess({ ...todos }));
  } catch (error) {
    yield put(fetchTodosFailed(error));
  }
}

function* getTodoSaga({ payload }) {
  try {
    const { accessToken, id, itemType } = payload;
    let todo = null;
    if (itemType === "todo") {
      todo = yield call(getTodo, id, accessToken);
    } else if (itemType === "subtask") {
      todo = yield call(getSubtask, id, accessToken);
    }
    yield put(fetchTodoSuccess({ ...todo }));
  } catch (error) {
    yield put(fetchTodoFailed(error));
  }
}

export function* onFetchTodos() {
  yield takeLatest(TODOS_ACTION_TYPES.FETCH_TODOS_START, getTodosSaga);
}

export function* onFetchTodo() {
  yield takeLatest(TODOS_ACTION_TYPES.FETCH_TODO_START, getTodoSaga);
}

export function* todosSagas() {
  yield all([call(onFetchTodos), call(onFetchTodo)]);
}
