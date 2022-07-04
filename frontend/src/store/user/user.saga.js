import {
  takeLatest,
  put,
  all,
  call,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";

import { toast } from "react-toastify";

import history from "../../history";

import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  setCurrentUser,
  refreshTokenSuccess,
  refreshTokenFailed,
  refreshTokenStart,
} from "./user.action";
import {
  getStorageAccessToken,
  getStorageRefreshToken,
  refreshAccessToken,
  getStorageUserId,
  getUser,
  login,
  logout,
  refreshTokenAPI,
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

function refreshTokenMonitorableAction(action) {
  return action.type.includes("START");
}
function identifyAction(action) {
  return action.type.split("_").slice(0, -1).join("_");
}
function getSuccessType(action) {
  return `${identifyAction(action)}_SUCCESS`;
}
function getFailType(action) {
  return `${identifyAction(action)}_FAILED`;
}

function* refreshTokenMonitor(monitoredAction) {
  console.log("started monitoring", monitoredAction.type);
  const { fail } = yield race({
    success: take(getSuccessType(monitoredAction)),
    fail: take(getFailType(monitoredAction)),
  });

  if (fail && fail.payload && fail.payload.response.status === 401) {
    console.log("detected 401, refreshing token");
    const refreshToken = getStorageRefreshToken();

    const response = yield call(refreshTokenAPI, refreshToken);
    yield put(refreshTokenStart());

    // const { success } = yield race({
    //   success: take(refreshTokenSuccess().type),
    //   fail: take(refreshTokenFailed().type),
    // });

    if (response?.access) {
      console.log("token refreshed, retrying", monitoredAction.type);
      yield call(refreshAccessToken, response.access)
      yield put(refreshTokenSuccess(response));
      yield put(monitoredAction);
    } else {
      console.log("token refresh failed, logging out user");
      yield put(logout());
      yield put(refreshTokenFailed({ ...response }));
    }
  }

  console.log("monitoring", monitoredAction.type, "finished");
}

export function* onSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signImWithUsername);
}

export function* onCheckUserSession() {
  yield takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION_START,
    isUserAuthenticated
  );
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onRefreshTokenStart() {
  yield takeEvery(refreshTokenMonitorableAction, refreshTokenMonitor);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onSignInStart),
    call(onSignOutStart),
    call(onRefreshTokenStart),
  ]);
}
