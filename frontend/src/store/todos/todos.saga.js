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
  addTodoSuccess,
  addTodoFailed,
  completeTodoSuccess,
  completeTodoFailed,
} from "./todos.action";
import {
  getTodos,
  getTodo,
  getSubtask,
  editTodo,
  editSubtask,
  addTodo,
  addSubtask,
  deleteTodo,
  deleteSubtask,
  completeTodo,
} from "../../utils/todos.utils";

export function* getTodosSaga({ payload }) {
  try {
    const { status, offset } = payload;
    const todos = yield call(getTodos, status, offset);
    yield put(fetchTodosSuccess({ ...todos }));
  } catch (error) {
    yield put(fetchTodosFailed(error));
  }
}

function* getTodoSaga({ payload }) {
  try {
    const { id, itemType } = payload;
    let response = null;
    if (itemType === "todo") {
      response = yield call(getTodo, id);
    } else if (itemType === "subtask") {
      response = yield call(getSubtask, id);
    }
    yield put(fetchTodoSuccess({ ...response }));
  } catch (error) {
    yield put(fetchTodoFailed(error));
  }
}

function* editTodoSaga({ payload }) {
  const { todo, id, itemType } = payload;
  try {
    let response = null;
    if (itemType === "todo") {
      response = yield call(editTodo, todo, id);
    } else if (itemType === "subtask") {
      response = yield call(editSubtask, todo, id);
    }
    toast.success(`${itemType} is updated`);
    yield put(editTodoSuccess({ ...response }));
  } catch (error) {
    toast.error(`Error occured when updating ${itemType}`);
    yield put(editTodoFailed(error));
  }
}

function* addTodoSaga({ payload }) {
  const { todo, itemType, parent_id } = payload;
  try {
    let response = null;
    if (itemType === "todo") {
      response = yield call(addTodo, todo);
    } else if (itemType === "subtask") {
      response = yield call(addSubtask, todo, parent_id);
    }
    toast.success(`${itemType} is added successfully`);
    yield put(addTodoSuccess({ ...response }));
  } catch (error) {
    toast.error(`Error occured when adding ${itemType}`);
    yield put(addTodoFailed(error));
  }
}

function* deleteTodoSaga({ payload }) {
  const { id, itemType } = payload;
  if (itemType === "todo") {
    yield call(deleteTodo, id);
  } else if (itemType === "subtask") {
    yield call(deleteSubtask, id);
  }
  toast.success(`${itemType} is deleted successfully`);
}

function* completeTodoSaga({ payload }) {
  const { id, itemType } = payload;
  try {
    const response = yield call(completeTodo, id);
    toast.success(`${itemType} is completed`);
    yield put(completeTodoSuccess({ ...response }));
  } catch (error) {
    toast.error(`Error occured when completing ${itemType}`);
    yield put(completeTodoFailed(error));
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

export function* onAddTodo() {
  yield takeLatest(TODOS_ACTION_TYPES.ADD_TODO_START, addTodoSaga);
}

export function* onDeleteTodo() {
  yield takeLatest(TODOS_ACTION_TYPES.DELETE_TODO, deleteTodoSaga);
}

export function* onCompleteTodo() {
  yield takeLatest(TODOS_ACTION_TYPES.COMPLETE_TODO_START, completeTodoSaga);
}

export function* todosSagas() {
  yield all([
    call(onFetchTodos),
    call(onFetchTodo),
    call(onEditTodo),
    call(onAddTodo),
    call(onDeleteTodo),
    call(onCompleteTodo),
  ]);
}
