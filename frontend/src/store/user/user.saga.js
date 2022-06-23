import { takeLatest, put, all, call } from "redux-saga/effects";

import { toast } from "react-toastify";

import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";
import {
  getStorageAccessToken,
  getStorageUserId,
  getUser,
  login,
  logout,
} from "../../utils/users.utils";

export function* getUserData(userId) {
  try {
    const userData = yield call(getUser, userId);
    yield put(signInSuccess({ ...userData }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const accessToken = getStorageAccessToken();
    if (!accessToken) return;
    const user = yield call(getStorageUserId);
    if (!user) return;
    yield call(getUserData, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signImWithUsername({ payload: { username, password } }) {
  try {
    const user = yield call(login, username, password);
    yield put(signInSuccess({ id: user.id }));
  } catch (error) {
    toast.error("Incorrect username or password");
    yield put(signInFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(logout);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signImWithUsername);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onSignInStart),
    call(onSignOutStart),
  ]);
}
