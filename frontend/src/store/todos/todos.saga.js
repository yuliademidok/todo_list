import { takeLatest, put, all, call } from "redux-saga/effects";

import { toast } from "react-toastify";

import { TODOS_ACTION_TYPES } from "./todos.types";
import {
  fetchTodosSuccess,
  fetchTodosFailed,
  fetchTodoSuccess,
  fetchTodoFailed,
  editTodoSuccess,
  editTodoFailed,
} from "./todos.action";
import {
  getTodos,
  getTodo,
  getSubtask,
  editTodo,
  editSubtask,
} from "../../utils/todos.utils";

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
    let response = null;
    if (itemType === "todo") {
      response = yield call(getTodo, id, accessToken);
    } else if (itemType === "subtask") {
      response = yield call(getSubtask, id, accessToken);
    }
    yield put(fetchTodoSuccess({ ...response }));
  } catch (error) {
    yield put(fetchTodoFailed(error));
  }
}

function* editTodoSaga({ payload }) {
  const { todo, id, accessToken, itemType } = payload;
  try {
    let response = null;
    if (itemType === "todo") {
      response = yield call(editTodo, todo, id, accessToken);
    } else if (itemType === "subtask") {
      response = yield call(editSubtask, todo, id, accessToken);
    }
    toast.success(`${itemType} is updated`);
    yield put(editTodoSuccess({ ...response }));
  } catch (error) {
    toast.error(`Error occured when updating ${itemType}`);
    yield put(editTodoFailed(error));
  }
}

export function* onFetchTodos() {
  yield takeLatest(TODOS_ACTION_TYPES.FETCH_TODOS_START, getTodosSaga);
}

export function* onFetchTodo() {
  yield takeLatest(TODOS_ACTION_TYPES.FETCH_TODO_START, getTodoSaga);
}

export function* onEditTodo() {
  yield takeLatest(TODOS_ACTION_TYPES.EDIT_TODO_START, editTodoSaga);
}

export function* todosSagas() {
  yield all([call(onFetchTodos), call(onFetchTodo), call(onEditTodo)]);
}
