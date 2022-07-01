import { takeLatest, put, all, call } from "redux-saga/effects";

import { toast } from "react-toastify";

import history from "../../history";

import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  setCurrentUser
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
    yield call(getUser, userId);
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
    yield put(setCurrentUser());
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signImWithUsername({ payload: { username, password } }) {
  try {
    yield call(login, username, password);
    yield put(signInSuccess());

    yield call(history.push, { pathname: "current-todos" });
    // document.location.reload()
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
